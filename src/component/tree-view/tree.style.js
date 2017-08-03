/**
 * Created by zonebond on 2017/5/5.
 */

const treeNode = {
  position: 'relative',
  listStyle: 'none',
  outline: 'none',
  userSelect: 'none'
};

const treeNodeItem = {
  position: 'relative',
  display: 'inline-flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  cursor: 'pointer'
};

const treeNodeItemIndicator = {
  cursor: 'pointer'
};

const treeNodeItemContent = {
  position: 'relative'
};

const treeNodeItemAction = {};

const treeNodeChild = {
  position: 'relative',
  display: 'block',
  listStyle: 'none',
  padding: '0 0 0 40px',
  overflow: 'hidden'
};


const TreeStyleSheet = {
  treeNode, treeNodeItem, treeNodeItemIndicator, treeNodeItemContent, treeNodeItemAction, treeNodeChild
};

export default TreeStyleSheet;