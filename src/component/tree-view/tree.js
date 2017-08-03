/**
 * Created by zonebond on 2017/5/1.
 */
// style
import './tree.less'
// library
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {observer, PropTypes as mobxPropTypes} from 'mobx-react'
// common
import {block} from '../../common'
// tools
import {isArray, asProps, isFunc} from './tools'
// views
import TreeNode from './tree-node'
// store
import TreeStore  from './tree.store'

const optionProps = {
  itemRender: PropTypes.object,
  depthField: PropTypes.string,
  depthIndent: PropTypes.number,
  itemGap: PropTypes.number,
  itemStyle: PropTypes.string,
  showLine: PropTypes.bool,
};
const hookProps   = {onItemChange: PropTypes.func};

@observer @block.box_model
export default class TreeView extends Component {
  static PropTypes = {
    provider: mobxPropTypes.arrayOrObservableArray,
    ...optionProps,
    ...hookProps
  };

  store = null;

  constructor(props) {
    super(props);
    this.store = new TreeStore(props.depthField ? props.depthField : 'children');
  }

  set provider(value) {
    const primitive     = (isArray(value) || !value) ? value : [value];
    this.store.provider = primitive;
  }

  get provider() {
    return this.store.provider;
  }

  componentWillMount() {
    this.provider = this.props.provider;
  }

  componentWillReceiveProps(nextProps) {
    this.provider = nextProps.provider;
  }

  optionValueCheckAndPolicy(option, value) {
    if (option === 'depthIndent') {
      if (isNaN(value)) {
        value = 20;
      }
      if (!isNaN(value) && value < 15) {
        this._not_enough_show_line = true;
      }
    }
    if (option === 'showLine' && value && this._not_enough_show_line) {
      value = false;
    }
    return value;
  }

  renderTree(provider) {
    if (!isArray(provider) || !provider.length) return null;

    const props     = this.props;
    const options   = asProps(optionProps, props, this.optionValueCheckAndPolicy.bind(this));
    const hooks     = asProps(hookProps, props);
    const lastIndex = provider.length - 1;

    const list = provider.map((node, idx) => (
        <TreeNode key={idx} isRoot
                  item={node} isFirstNode={idx === 0} isLastNode={idx === lastIndex}
                  options={options} hooks={hooks} store={this.store}/>
    ));

    return (
        <ul style={{padding: 0, margin: 0}}>{list}</ul>
    )
  }

  render() {
    return (
        <div style={this.committedStyle}>
          {this.renderTree(this.provider)}
        </div>
    )
  }

  static searchInNodes(nodes, depthField, compare) {

    if (!isArray(nodes) || !isFunc(compare))return;

    TreeView.searchWithScope(nodes, compare, depthField || 'children', TreeStore.ExtensionProps.SEARCHED);
  }

  static searchWithScope(provider, func, field, tag) {
    let matched = false;
    provider.forEach(item => {
      let hasMatched = false;
      const children = item[field];
      if (isArray(children)) {
        hasMatched = TreeView.searchWithScope(children, func, field, tag);
      }

      if (!matched && matched !== hasMatched) {
        matched = hasMatched;
      }

      if (func(item) || hasMatched) {
        item[tag] = matched = true;
      } else {
        item[tag] = false;
      }
    });

    return matched;
  }
}
