import { GridState, SearchResult } from "../types";
import { getGeometry } from "../geometry";

class MinHeap {
  private heap: Array<{ id: number; priority: number }> = [];

  push(id: number, priority: number): void {
    this.heap.push({ id, priority });
    this.bubbleUp(this.heap.length - 1);
  }

  pop(): number | undefined {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop()!.id;

    const min = this.heap[0].id;
    this.heap[0] = this.heap.pop()!;
    this.bubbleDown(0);
    return min;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index].priority >= this.heap[parentIndex].priority) break;
      [this.heap[index], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[index],
      ];
      index = parentIndex;
    }
  }

  private bubbleDown(index: number): void {
    while (true) {
      let smallest = index;
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;

      if (
        leftChild < this.heap.length &&
        this.heap[leftChild].priority < this.heap[smallest].priority
      ) {
        smallest = leftChild;
      }
      if (
        rightChild < this.heap.length &&
        this.heap[rightChild].priority < this.heap[smallest].priority
      ) {
        smallest = rightChild;
      }

      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }
}

export const runDijkstra = (
  grid: GridState,
  startId: number,
  finishId: number
): SearchResult => {
  const startTime = performance.now();
  const geometry = getGeometry(grid.spec.gridType);
  const { rows, cols } = grid.spec;
  const totalNodes = rows * cols;

  const distance = new Float64Array(totalNodes).fill(Infinity);
  const predecessor = new Int32Array(totalNodes).fill(-1);
  const visited = new Uint8Array(totalNodes);

  distance[startId] = 0;
  const pq = new MinHeap();
  pq.push(startId, 0);

  const visitedOrder: number[] = [];

  while (!pq.isEmpty()) {
    const currentId = pq.pop()!;

    if (visited[currentId] === 1) continue;
    visited[currentId] = 1;
    visitedOrder.push(currentId);

    if (currentId === finishId) break;

    const neighbors = geometry.neighbors(currentId, grid);
    for (const neighborId of neighbors) {
      if (visited[neighborId] === 0 && !grid.walls.has(neighborId)) {
        const newDistance = distance[currentId] + 1;
        if (newDistance < distance[neighborId]) {
          distance[neighborId] = newDistance;
          predecessor[neighborId] = currentId;
          pq.push(neighborId, newDistance);
        }
      }
    }
  }

  const pathOrder: number[] = [];
  if (visited[finishId] === 1) {
    let current = finishId;
    while (current !== -1) {
      pathOrder.unshift(current);
      current = predecessor[current];
    }
  }

  const executionTimeMs = performance.now() - startTime;

  return {
    visitedOrder,
    pathOrder,
    nodesExplored: visitedOrder.length,
    executionTimeMs,
  };
};
