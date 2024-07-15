import { GridState } from "../types";
import { idOf, rcOf } from "../id";
import { Geometry } from "./types";

const DIRECTIONS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

export const squareGeometry: Geometry = {
  neighbors(id: number, grid: GridState): number[] {
    const { rows, cols } = grid.spec;
    const [row, col] = rcOf(id, cols);
    const result: number[] = [];

    for (const [dr, dc] of DIRECTIONS) {
      const newRow = row + dr;
      const newCol = col + dc;

      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
        result.push(idOf(newRow, newCol, cols));
      }
    }

    return result;
  },

  distance(idA: number, idB: number, grid: GridState): number {
    const { cols } = grid.spec;
    const [rowA, colA] = rcOf(idA, cols);
    const [rowB, colB] = rcOf(idB, cols);
    return Math.abs(rowA - rowB) + Math.abs(colA - colB);
  },

  pixelCenterOf(id: number, grid: GridState): { x: number; y: number } {
    const { cols, nodeSize } = grid.spec;
    const [row, col] = rcOf(id, cols);
    return {
      x: col * nodeSize + nodeSize / 2,
      y: row * nodeSize + nodeSize / 2,
    };
  },

  idAtPixel(x: number, y: number, grid: GridState): number | null {
    const { rows, cols, nodeSize } = grid.spec;
    const col = Math.floor(x / nodeSize);
    const row = Math.floor(y / nodeSize);

    if (row >= 0 && row < rows && col >= 0 && col < cols) {
      return idOf(row, col, cols);
    }

    return null;
  },
};
