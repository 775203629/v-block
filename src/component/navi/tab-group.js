import React, {Component, PropTypes, Children} from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import uuid from 'uuid'

// vendors
import {Tab, TabItem} from 'react-weui'

// commons
import {block} from '../../common'

// components
import {VGroup, HGroup} from '../../component'

class TabItemWrapper extends Component {
  render() {
    const {selected, handleClick} = this.props;
    return <div className="tab-item-wrapper" style={{background: selected ? 'red' : 'transparent'}} onClick={handleClick}>{this.props.children}</div>;
  }
}

class TabContentWrapper extends Component {
  render() {
    return (
      <HGroup horizontalAlign="space-around" verticalAlign="center" style={{border: '1px solid red'}} gap="10">
        {this.props.children}
      </HGroup>
    )
  }
}

@block.box_model
class TabGroupItem extends Component{
  static propTypes = {
    tab: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    content: PropTypes.element
  }
}

@observer @block.box_model
export default class TabGroup extends Component {
  static propTypes = {selectedIndex: PropTypes.number}
  static Item = TabGroupItem;

  @observable selectedIndex = 0;

  tabItems    = [];
  tabContents = [];

  componentWillMount() {
    const {children, selectedIndex} = this.props;
    this.parseItems(children);
    this.selectedIndex = selectedIndex || 0;
  }

  handleTabItemClick = index => evt => {
    this.selectedIndex = index;
    const {onChange} = this.props;
    if(typeof onChange === 'function'){
      onChange(index);
    }
  }

  renderTabItems() {
    const {children} = this.props;
    return children;
  }

  parseItems(children) {
    return Children.forEach(children, child => {
      const {type, props: {tab, content}} = child;
      if(type === TabGroupItem) {
        this.tabItems.push(tab);
        this.tabContents.push(content);
      }
    });
  }

  renderTabGroupItems(selectedIndex) {
    return (
      <TabContentWrapper>
        {this.tabItems.map((child, index) => <TabItemWrapper key={uuid.v1()} selected={index === selectedIndex} handleClick={this.handleTabItemClick(index)}>{child}</TabItemWrapper>)}
      </TabContentWrapper>
    )
  }

  renderTabGroupContent(selectedIndex) {
    return (
      <VGroup style={{border: '1px solid yellow'}} flex>
        {this.tabContents[selectedIndex]}
      </VGroup>
    )
  }

  render() {
    const selectedIndex = this.selectedIndex;

    return (
      <VGroup className="tab-group" horizontalAlign="stretch" verticalAlign="flex-start" flex>
        {this.renderTabGroupItems(selectedIndex)}
        {this.renderTabGroupContent(selectedIndex)}
      </VGroup>
    )
  }
}
