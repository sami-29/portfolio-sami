import { GridState, SearchResult } from "../types";
import { getGeometry } from "../geometry";

export const runBFS = (
  grid: GridState,
  startId: number,
  finishId: number
): SearchResult => {
  const startTime = performance.now();
  const geometry = getGeometry(grid.spec.gridType);
  const { rows, cols } = grid.spec;
  const totalNodes = rows * cols;

  const visited = new Uint8Array(totalNodes);
  const predecessor = new Int32Array(totalNodes).fill(-1);
  const queue: number[] = [startId];

  visited[startId] = 1;
  const visitedOrder: number[] = [];

  while (queue.length > 0) {
    const currentId = queue.shift()!;
    visitedOrder.push(currentId);

    if (currentId === finishId) {
      break;
    }

    const neighbors = geometry.neighbors(currentId, grid);
    for (const neighborId of neighbors) {
      if (visited[neighborId] === 0 && !grid.walls.has(neighborId)) {
        visited[neighborId] = 1;
        predecessor[neighborId] = currentId;
        queue.push(neighborId);
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
