/**
 * Created by zonebond on 2017/5/7.
 */
// library
import React, {Component} from 'react'
import {observer} from 'mobx-react'
// common
import {block, pixels, assignment, classnames} from '../../common'
// component
import {HGroup} from '../group'
// style
import TreeStyleSheet from './tree.style'
// tools
import {isArray, isFunc} from './tools'
// views
import SVGPath from './svg-path'
import TreeItemIndicator from './indicator'

class TreeNodeLine {
  static ChildLine      = props => <SVGPath d="M $HW 0 L $HW $HH L $FW $HH M $HW $HH L $HW $FH" {...props}/>;
  static ChildLineLast  = props => <SVGPath d="M $HW 0 L $HW $HH L $FW $HH" {...props}/>;
  static ChildNodesWell = props => <SVGPath d="M $HW 0 L $HW 9999" {...props}/>;
}


@observer @block.box_model
export default class TreeNode extends Component {
  static Retrieve = node => () => node;

  constructor(props) {
    super(props);
    this.store = props.store;

    const defExpand = this.props.item.expand;
    this.state      = {expand: defExpand ? defExpand : false};
  }

  set expand(value) {
    this.setState({expand: value});
  }

  get expand() {
    return this.state.expand;
  }

  componentWillMount() {
    this.store.trackNodeItem(this.item);
    this.hooks = this.props.hooks;
  }

  get item() {
    return this.props.item;
  }

  handleIndicatorClick = evt => {
    this.itemDoubleClick();
  };

  handleNodeItemClick = evt => {
    if (evt.isPropagationStopped()) {
      return;
    }

    this.itemClick();

    if (this.__target__ === evt.target && this.__ticker__) {
      this.__target__ = this.__ticker__ = clearTimeout(this.__ticker__);
      // todo double click
      this.itemDoubleClick();
    } else {
      this.__ticker__ && (this.__ticker__ = clearTimeout(this.__ticker__));
      this.__target__ = evt.target;
      this.__ticker__ = setTimeout(() => {
        this.__target__ = this.__ticker__ = clearTimeout(this.__ticker__)
        // todo click
      }, 260);
    }

  };

  itemClick() {
    const item = this.item;
    if (this.store.selectedItem(item)) {
      const {onItemChange} = this.hooks;
      isFunc(onItemChange) && onItemChange(item);
    }
  }

  itemDoubleClick() {
    this.expand = !this.expand;
  }

  initLineProps(optionsBin) {
    const {depthIndent, itemGap} = optionsBin;

    const indent = depthIndent;

    const lineProps = assignment({}, {
      width: pixels(indent),
      gap: itemGap,
      style: assignment(null, {
        left: pixels(-indent)
      })
    });

    this.lines = {
      cast: TreeNodeLine.ChildLine(lineProps),
      last: TreeNodeLine.ChildLineLast(lineProps),
      well: TreeNodeLine.ChildNodesWell({...lineProps, style: {...lineProps.style, top: 0, height: '100%'}}),
    }
  }

  itemToLabel(item, options, style) {
    const {itemRender} = options;
    return typeof itemRender === 'function' ? itemRender(item, options, style) : item.label;
  }

  renderLines(isRoot, isLastNode, options) {
    if (isRoot) return null;
    if (options.showLine === false) return null;

    return isLastNode ? this.lines.last : this.lines.cast;
  }

  calcMaxHeight(nums, expand) {
    const size = 60;
    const calc = (nums + 1) * size;
    return {maxHeight: expand ? calc + 'px' : 0};
  }

  renderItems(item, isLastNode, optionsBin) {
    const defaultOpts               = this.props.options;
    const {depthField, depthIndent} = optionsBin;
    const expand                    = this.expand;
    const children                  = item[depthField];

    if (!isArray(children))
      return null;

    const numbers   = children.length;
    const lastIndex = numbers - 1;

    const className = classnames('node-children', expand ? 'expand' : '');

    const styleMark = this.calcMaxHeight(item.measuredDepthChildCount, expand);

    const items = tween => {
      return (
          <ul style={{...TreeStyleSheet.treeNodeChild, paddingLeft: depthIndent, ...styleMark}}
              ref={self => this.__child_list_ul__ = self}>
            {children.map((child, idx) =>
                <TreeNode key={idx} item={child}
                          options={defaultOpts} hooks={this.hooks} store={this.store}
                          depthField={depthField} isFirstNode={idx === 0} isLastNode={idx === lastIndex}/>)}
          </ul>
      )
    };

    return (
        <div className={className} style={{position: 'relative'}}>
          {isLastNode || !children.length || optionsBin.showLine === false ? null : this.lines.well}
          {items()}
        </div>
    )
  }

  render() {
    const store = this.store;
    const item  = this.item;

    if (!store.isNodeItemMatched(item)) return null;

    let dynamic_style = {};

    const expand = this.expand;

    const {isRoot, isLastNode, options} = this.props;

    const optionsBin = {...options};
    const itemRender = this.itemToLabel(item, optionsBin, dynamic_style);
    this.initLineProps(optionsBin);

    const half_gap = pixels(optionsBin.itemGap ? optionsBin.itemGap * 0.5 : null);

    return (
        <li style={assignment(TreeStyleSheet.treeNode, isRoot ? null : {
          marginTop: half_gap,
          marginBottom: isLastNode ? 0 : half_gap,
          ...dynamic_style
        })}>
          <HGroup style={TreeStyleSheet.treeNodeItem}>
            {this.renderLines(isRoot, isLastNode, optionsBin)}
            <TreeItemIndicator expand={expand} item={item} opts={optionsBin}
                               onClick={this.handleIndicatorClick}/>
            <div style={{...TreeStyleSheet.treeNodeItemContent}}
                 onClick={this.handleNodeItemClick}>{itemRender}</div>
            <div style={TreeStyleSheet.treeNodeItemAction}></div>
          </HGroup>
          {this.renderItems(item, isLastNode, optionsBin)}
        </li>
    )
  }
}
