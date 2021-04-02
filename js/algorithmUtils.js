// leetcode 刷算法自用函数

class TreeNode {
  constructor(val, { left, right } = {}) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class ListNode {
  constructor(val, next) {
    this.val = val;
    this.next = next;
  }
}

// 根据 数组生成 二叉树
function makeTreeNode(arr) {
  const len = arr.length;
  const treeArr = [];
  for (let i = 0; i < len; i++) {
    treeArr.push(arr[i] && new TreeNode(arr[i]));
  }

  for (let j = 0; j < len / 2; j++) {
    if (treeArr[j]) {
      treeArr[j].left = treeArr[2 * j + 1];
      treeArr[j].right = treeArr[2 * j + 2];
    }
  }

  return treeArr[0];
}

// 数组生成 链表
function makeListNode(arr) {
  const head = new TreeNode();
  let cur = head;
  arr.forEach((item) => {
    cur.next = new ListNode(item);
    cur = cur.next;
  });
  return head.next;
}
