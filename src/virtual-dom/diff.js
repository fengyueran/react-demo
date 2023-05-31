import { StateEnums, isString } from './util';

import { Element } from './element';

const getKeys = (list) => {
  let keys = [];
  if (list) {
    keys = list.map((item) => {
      if (isString(item)) return item;
      return item.key;
    });
  }
  return keys;
};

const listDiff = (oldChild, newChild, index, patches) => {
  const oldKeys = getKeys(oldChild);
  const newKeys = getKeys(newChild);
  const changes = [];
};

const diffChildren = (oldChild, newChild, index, patches) => {};
const dfs = (oldNode, newNode, index, patches) => {
  const curPatches = [];
  if (!newNode) {
  } else if (newNode.tag === oldNode.tag && newNode.key === oldNode.key) {
    diffChildren(oldNode.children, newNode.children, index, patches);
  } else {
    // 节点不同，直接替换
    curPatches.push({ type: StateEnums.Replace, node: newNode });
  }
};

export const diff = (oldDomTree, newDomTree) => {};
