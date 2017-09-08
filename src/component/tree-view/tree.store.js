/**
 * Created by zonebond on 2017/5/7.
 */
// library
import {observable, action} from 'mobx'

export default class TreeStore {
  static ExtensionProps = {
    SELECTED: '__selected__',
    SEARCHED: '__searched__'
  };

  constructor(depthField) {
    this.depthField = depthField;
  }

  lastSelectedItem = null;

  @observable provider = null;

  isNodeItemSelected(item) {
    return item[TreeStore.ExtensionProps.SELECTED];
  }

  isNodeItemMatched(item) {
    return this.seaching ? item[TreeStore.ExtensionProps.SEARCHED] : true;
  }

  @action trackNodeItem(item) {

  }

  @action selectedItem(item) {
    if (!this.isSelectedChange(item)) return false;

    this.lastSelectedItem && (this.lastSelectedItem[TreeStore.ExtensionProps.SELECTED] = false);

    item[TreeStore.ExtensionProps.SELECTED] = true;
    this.lastSelectedItem                   = item;

    return true;
  }

  isSelectedChange(item) {
    return this.lastSelectedItem === item ? false : true;
  }

  @action expandItem(item, bool) {
    item.expand = bool === undefined ? !item.expand : bool;
  }
}
