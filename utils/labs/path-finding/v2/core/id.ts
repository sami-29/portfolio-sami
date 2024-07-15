export const idOf = (row: number, col: number, cols: number): number => {
  return row * cols + col;
};

export const rcOf = (id: number, cols: number): readonly [number, number] => {
  return [Math.floor(id / cols), id % cols];
};
