import { GridState, SearchResult } from "../types";
import { getGeometry } from "../geometry";

export const runDFS = (
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
  const stack: number[] = [startId];

  const visitedOrder: number[] = [];

  while (stack.length > 0) {
    const currentId = stack.pop()!;

    if (visited[currentId] === 1) continue;
    if (grid.walls.has(currentId)) continue;

    visited[currentId] = 1;
    visitedOrder.push(currentId);

    if (currentId === finishId) break;

    const neighbors = geometry.neighbors(currentId, grid);
    for (const neighborId of neighbors) {
      if (visited[neighborId] === 0 && !grid.walls.has(neighborId)) {
        if (predecessor[neighborId] === -1) {
          predecessor[neighborId] = currentId;
        }
        stack.push(neighborId);
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
