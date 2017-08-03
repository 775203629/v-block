/**
 * Created by zonebond on 2017/3/31.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {observer} from 'mobx-react'

import {VGroup} from '../../component'
import ListViewItemRender from './list-view-item-render'

@observer
export default class ListView extends Component {
  static propTypes = {
    provider: PropTypes.array,
    itemRender: PropTypes.func.isRequired,
    onItemClick: PropTypes.func
  };

  static defaultProps = {
    provider: []
  };

  renderItems(provider, itemRender) {

    if (typeof itemRender === 'function') {
      if (ListViewItemRender.isListViewItemRender(itemRender) || itemRender === ListViewItemRender) {
        return provider.map((item, index) => {
          const instance     = new itemRender();
          instance.item      = item;
          instance.itemClick = this.handleClick;
          return instance.itemToLabelWrapper(index);
        });
      }
      return provider.map((item, index) => itemRender(item, index))
    }

    return null;
  }

  handleClick = (item, key, evt) => {
    const {onItemClick} = this.props;
    if (typeof onItemClick === 'function') {
      onItemClick(item, key, evt);
    }
  };

  render() {
    const {provider, itemRender, style} = this.props;

    return (
        <VGroup style={style} horizontalAlign="stretch"
                verticalAlign="flex-start" flex gap="10px">
          {this.renderItems(provider, itemRender)}
        </VGroup>
    )
  }
}
