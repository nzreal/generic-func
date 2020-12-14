function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

const getChildIndex = (index, direction) => 2 * index + direction;

const getLastNodeNorLeaf = (arrLen) => Math.floor(arrLen / 2);

class PriorityQueue {
  constructor(arr, compare) {
    this.heap = arr;
    this.sortedLength = 0;
    this.compare = (a, b) => compare(a, b) > 0;
    this.makeHeap();
  }

  size() {
    return this.heap.length;
  }

  add(item) {
    this.heap.unshift(item);
    this.heapify(this.heap, getLastNodeNorLeaf(0));
  }

  remove() {
    const heap = this.heap;
    swap(heap, 0, this.size() - 1);
    const res = heap.pop();
    this.heapify(heap, 0);
    return res;
  }

  sortOut() {
    const sortedArr = this.heap.concat([]);
    const length = this.size();

    for (let i = length - 1; i > 0; i--) {
      swap(sortedArr, i, 0);
      this.sortedLength++;
      this.heapify(sortedArr, 0);
    }

    this.sortedLength = 0;

    return sortedArr;
  }

  // 构建初始 大/小顶堆
  makeHeap() {
    const lastLeafIdx = getLastNodeNorLeaf(this.size());
    for (let leafIdx = lastLeafIdx; leafIdx >= 0; leafIdx--) {
      this.heapify(this.heap, leafIdx);
    }
  }

  // 堆结构调整
  heapify(heap, leafIdx) {
    const left = getChildIndex(leafIdx, 1),
      right = getChildIndex(leafIdx, 2);
    let maxIdx = leafIdx;

    const unSortedLength = this.size() - this.sortedLength;

    if (left < unSortedLength && this.compare(heap[left], heap[maxIdx])) {
      maxIdx = left;
    }

    if (right < unSortedLength && this.compare(heap[right], heap[maxIdx])) {
      maxIdx = right;
    }

    if (maxIdx !== leafIdx) {
      swap(heap, leafIdx, maxIdx);
      this.heapify(heap, maxIdx);
    }
  }
}

export default class {
  constructor(arr, compare = (a, b) => a - b) {
    this.queue = new PriorityQueue(arr, compare);

    return this.queue.arr;
  }

  offer(item) {
    this.queue.add(item);
  }

  poll() {
    return this.queue.remove();
  }

  entry() {
    return this.queue.sortOut();
  }
}
