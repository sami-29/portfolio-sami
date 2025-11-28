export type AlgorithmName = "Dijkstra" | "A*" | "BFS" | "DFS";
export type GridType = "Square" | "Hexagon";
export type Speed = "Slow" | "Medium" | "Fast" | "Instant";
export type MazeType =
  | "None"
  | "Random Walls"
  | "Recursive Division"
  | "Binary Tree"
  | "Prim's Algorithm"
  | "Kruskal's Algorithm"
  | "Spiral";

export interface GridSpec {
  rows: number;
  cols: number;
  gridType: GridType;
  nodeSize: number;
}

export interface GridState {
  spec: GridSpec;
  walls: ReadonlySet<number>;
  startId: number;
  finishId: number;
}

export interface SearchResult {
  visitedOrder: number[];
  pathOrder: number[];
  nodesExplored: number;
  executionTimeMs: number;
}

export interface MazeOptions {
  density?: number;
  bias?: "horizontal" | "vertical" | "none";
}
