import { GridState } from "../types";
import { idOf, rcOf } from "../id";
import { Geometry } from "./types";

const HEX_DIRECTIONS = [
  { name: "N", dr: -1, dcEven: 0, dcOdd: 0 },
  { name: "S", dr: 1, dcEven: 0, dcOdd: 0 },
  { name: "NE", dr: -1, dcEven: 0, dcOdd: 1 },
  { name: "SE", dr: 1, dcEven: 0, dcOdd: 1 },
  { name: "SW", dr: 1, dcEven: -1, dcOdd: 0 },
  { name: "NW", dr: -1, dcEven: -1, dcOdd: 0 },
];

const offsetToCube = (row: number, col: number) => {
  const x = col - (row - (row & 1)) / 2;
  const z = row;
  const y = -x - z;
  return { x, y, z };
};

const cubeToOffset = (x: number, z: number) => {
  const col = x + (z - (z & 1)) / 2;
  const row = z;
  return { row, col };
};

const cubeRound = (fx: number, fy: number, fz: number) => {
  let rx = Math.round(fx);
  let ry = Math.round(fy);
  let rz = Math.round(fz);

  const xDiff = Math.abs(rx - fx);
  const yDiff = Math.abs(ry - fy);
  const zDiff = Math.abs(rz - fz);

  if (xDiff > yDiff && xDiff > zDiff) {
    rx = -ry - rz;
  } else if (yDiff > zDiff) {
    ry = -rx - rz;
  } else {
    rz = -rx - ry;
  }

  return { x: rx, y: ry, z: rz };
};

export const hexGeometry: Geometry = {
  neighbors(id: number, grid: GridState): number[] {
    const { rows, cols } = grid.spec;
    const [row, col] = rcOf(id, cols);
    const isEvenRow = row % 2 === 0;
    const result: number[] = [];

    for (const dir of HEX_DIRECTIONS) {
      const newRow = row + dir.dr;
      const newCol = col + (isEvenRow ? dir.dcEven : dir.dcOdd);

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

    const cubeA = offsetToCube(rowA, colA);
    const cubeB = offsetToCube(rowB, colB);

    return (
      (Math.abs(cubeA.x - cubeB.x) +
        Math.abs(cubeA.y - cubeB.y) +
        Math.abs(cubeA.z - cubeB.z)) /
      2
    );
  },

  pixelCenterOf(id: number, grid: GridState): { x: number; y: number } {
    const { cols, nodeSize } = grid.spec;
    const [row, col] = rcOf(id, cols);

    const hexWidth = (nodeSize * Math.sqrt(3)) / 2;
    const hexHeight = nodeSize * 0.75;
    const isEvenRow = row % 2 === 0;

    return {
      x: col * hexWidth + (isEvenRow ? 0 : hexWidth / 2) + nodeSize / 2,
      y: row * hexHeight + nodeSize / 2,
    };
  },

  idAtPixel(x: number, y: number, grid: GridState): number | null {
    const { rows, cols, nodeSize } = grid.spec;
    const hexWidth = (nodeSize * Math.sqrt(3)) / 2;
    const hexHeight = nodeSize * 0.75;

    const approxRow = Math.floor(y / hexHeight);
    const isEvenRow = approxRow % 2 === 0;
    const approxCol = Math.floor(
      (x - (isEvenRow ? 0 : hexWidth / 2)) / hexWidth
    );

    const candidates: Array<{ row: number; col: number }> = [
      { row: approxRow, col: approxCol },
      { row: approxRow - 1, col: approxCol },
      { row: approxRow + 1, col: approxCol },
      { row: approxRow, col: approxCol - 1 },
      { row: approxRow, col: approxCol + 1 },
    ];

    let closestId: number | null = null;
    let closestDist = Infinity;

    for (const { row, col } of candidates) {
      if (row >= 0 && row < rows && col >= 0 && col < cols) {
        const id = idOf(row, col, cols);
        const center = this.pixelCenterOf(id, grid);
        const dist = Math.hypot(x - center.x, y - center.y);

        if (dist < closestDist && dist < nodeSize * 0.5) {
          closestDist = dist;
          closestId = id;
        }
      }
    }

    return closestId;
  },
};
