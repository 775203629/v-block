/**
 * Created by zonebond on 2017/3/31.
 */
import React from 'react';
import uuid from 'uuid';
import {ClassSymbol} from '../../common'

@ClassSymbol('ListViewItemRender')
class ListViewItemRender {
  constructor() {
    this._uuid_ = uuid.v1();
  }

  set item(value) {
    this._item_ = value;
  }

  get item() {
    return this._item_;
  }

  _handleWrapperClick_ = evt => {
    if (evt.isDefaultPrevented()) return;
    this.itemClick(this.item, this.index, evt);
  };

  itemToLabelWrapper(index) {
    this.index = index;
    return <div key={index} onClick={this._handleWrapperClick_}>{this.itemToLabel(this.item)}</div>
  }

  itemToLabel(item) {
    return null;
  }
}
export default ListViewItemRender
