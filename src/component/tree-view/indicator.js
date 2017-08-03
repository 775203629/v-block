/**
 * Created by zonebond on 2017/5/7.
 */
// library
import React, {Component} from 'react'
// common
import {block, classnames} from '../../common'

class Icon extends Component {
  render() {
    return <div {...this.props}></div>
  }
}

@block.box_model
export default class TreeItemIndicator extends Component {
  renderIndicator() {
    const {expand} = this.props;
    return expand ? (<Icon name="caret down" color="grey"/>) : <Icon name="caret right" color="grey"/>
  }

  render() {
    const {item, opts, onClick, expand} = this.props;

    const children = item[opts.depthField];
    const spacer   = opts.depthIndent < 15 ? <Icon style={{width: 20}}/> : null;

    return (
        children && children.length ?
            <Icon className={classnames("tree-node-indicator", expand ? "expand" : null)}
                  name="caret right" color="grey" onClick={onClick}/>
            : spacer
    )
  }
}
