import { AlgorithmName, GridState, SearchResult } from "../types";
import { runBFS } from "./bfs";
import { runDijkstra } from "./dijkstra";
import { runAStar } from "./astar";
import { runDFS } from "./dfs";

export { runBFS } from "./bfs";
export { runDijkstra } from "./dijkstra";
export { runAStar } from "./astar";
export { runDFS } from "./dfs";

export const runAlgorithm = (
  name: AlgorithmName,
  grid: GridState,
  startId: number,
  finishId: number
): SearchResult => {
  switch (name) {
    case "BFS":
      return runBFS(grid, startId, finishId);
    case "Dijkstra":
      return runDijkstra(grid, startId, finishId);
    case "A*":
      return runAStar(grid, startId, finishId);
    case "DFS":
      return runDFS(grid, startId, finishId);
    default:
      return runDijkstra(grid, startId, finishId);
  }
};
