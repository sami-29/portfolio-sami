export type { Geometry } from "./types";
export { squareGeometry } from "./square";
export { hexGeometry } from "./hex";

import { squareGeometry } from "./square";
import { hexGeometry } from "./hex";
import type { Geometry } from "./types";

export const getGeometry = (gridType: "Square" | "Hexagon"): Geometry => {
  return gridType === "Square" ? squareGeometry : hexGeometry;
};
