import { GridSpec, GridState } from "../types";
import { idOf } from "../id";

export interface BuildOptions {
  start?: number;
  finish?: number;
  walls?: Iterable<number>;
}

export const buildGrid = (
  spec: GridSpec,
  options?: BuildOptions
): GridState => {
  const { rows, cols } = spec;

  const defaultStart = idOf(Math.floor(rows / 2), Math.floor(cols / 4), cols);
  const defaultFinish = idOf(
    Math.floor(rows / 2),
    Math.floor((3 * cols) / 4),
    cols
  );

  return {
    spec,
    walls: new Set(options?.walls ?? []),
    startId: options?.start ?? defaultStart,
    finishId: options?.finish ?? defaultFinish,
  };
};

export const withWalls = (
  grid: GridState,
  walls: Iterable<number>
): GridState => {
  return {
    ...grid,
    walls: new Set(walls),
  };
};

export const withStartFinish = (
  grid: GridState,
  start: number,
  finish: number
): GridState => {
  return {
    ...grid,
    startId: start,
    finishId: finish,
  };
};

export const clearWalls = (grid: GridState): GridState => {
  return {
    ...grid,
    walls: new Set(),
  };
};

export const toggleWall = (grid: GridState, id: number): GridState => {
  if (id === grid.startId || id === grid.finishId) {
    return grid;
  }

  const newWalls = new Set(grid.walls);
  if (newWalls.has(id)) {
    newWalls.delete(id);
  } else {
    newWalls.add(id);
  }

  return {
    ...grid,
    walls: newWalls,
  };
};
