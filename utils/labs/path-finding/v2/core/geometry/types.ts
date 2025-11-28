import { GridState } from "../types";

export interface Geometry {
  neighbors(id: number, grid: GridState): number[];
  distance(idA: number, idB: number, grid: GridState): number;
  pixelCenterOf(id: number, grid: GridState): { x: number; y: number };
  idAtPixel(x: number, y: number, grid: GridState): number | null;
}
