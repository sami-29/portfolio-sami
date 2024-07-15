import { GridState, MazeType, MazeOptions } from "../types";
import { idOf, rcOf } from "../id";
import { getGeometry } from "../geometry";

const floodFill = (
  grid: GridState,
  startId: number,
  finishId: number
): boolean => {
  const { rows, cols } = grid.spec;
  const visited = new Uint8Array(rows * cols);
  const queue: number[] = [startId];
  visited[startId] = 1;

  const geometry = getGeometry(grid.spec.gridType);

  while (queue.length > 0) {
    const currentId = queue.shift()!;
    if (currentId === finishId) return true;

    const neighbors = geometry.neighbors(currentId, grid);
    for (const neighborId of neighbors) {
      if (visited[neighborId] === 0 && !grid.walls.has(neighborId)) {
        visited[neighborId] = 1;
        queue.push(neighborId);
      }
    }
  }

  return false;
};

const ensureConnectivity = (grid: GridState): GridState => {
  if (floodFill(grid, grid.startId, grid.finishId)) {
    return grid;
  }

  const { rows, cols } = grid.spec;
  const [startRow, startCol] = rcOf(grid.startId, cols);
  const [finishRow, finishCol] = rcOf(grid.finishId, cols);

  const newWalls = new Set(grid.walls);
  let currentRow = startRow;
  let currentCol = startCol;

  while (currentRow !== finishRow || currentCol !== finishCol) {
    const id = idOf(currentRow, currentCol, cols);
    newWalls.delete(id);

    if (currentRow < finishRow) currentRow++;
    else if (currentRow > finishRow) currentRow--;
    else if (currentCol < finishCol) currentCol++;
    else if (currentCol > finishCol) currentCol--;
  }

  newWalls.delete(grid.finishId);

  return { ...grid, walls: newWalls };
};

const generateSimpleRandom = (
  grid: GridState,
  options?: MazeOptions
): GridState => {
  const density = options?.density ?? 0.3;
  const { rows, cols } = grid.spec;
  const walls = new Set<number>();

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const id = idOf(row, col, cols);
      if (
        id !== grid.startId &&
        id !== grid.finishId &&
        Math.random() < density
      ) {
        walls.add(id);
      }
    }
  }

  let newGrid = { ...grid, walls };
  return ensureConnectivity(newGrid);
};

const generateRecursiveDivision = (
  grid: GridState,
  options?: MazeOptions
): GridState => {
  const { rows, cols } = grid.spec;
  const walls = new Set<number>();

  for (let row = 0; row < rows; row++) {
    walls.add(idOf(row, 0, cols));
    walls.add(idOf(row, cols - 1, cols));
  }
  for (let col = 0; col < cols; col++) {
    walls.add(idOf(0, col, cols));
    walls.add(idOf(rows - 1, col, cols));
  }

  const divide = (
    x: number,
    width: number,
    y: number,
    height: number,
    orientation: "horizontal" | "vertical"
  ) => {
    if (width < 3 || height < 3) return;

    const horizontal = orientation === "horizontal";
    const wx = x + (horizontal ? 0 : Math.floor(Math.random() * (width - 1)));
    const wy = y + (horizontal ? Math.floor(Math.random() * (height - 1)) : 0);
    const px = wx + (horizontal ? Math.floor(Math.random() * width) : 0);
    const py = wy + (horizontal ? 0 : Math.floor(Math.random() * height));
    const dx = horizontal ? 1 : 0;
    const dy = horizontal ? 0 : 1;
    const length = horizontal ? width : height;

    for (let i = 0; i < length; i++) {
      const wallX = wx + dx * i;
      const wallY = wy + dy * i;
      const wallId = idOf(wallY, wallX, cols);

      if (
        (wallX !== px || wallY !== py) &&
        wallId !== grid.startId &&
        wallId !== grid.finishId
      ) {
        walls.add(wallId);
      }
    }

    const nextOrientation =
      width < height
        ? "horizontal"
        : height < width
        ? "vertical"
        : Math.random() < 0.5
        ? "horizontal"
        : "vertical";

    if (horizontal) {
      if (wy - y > 2) divide(x, width, y, wy - y, nextOrientation);
      if (height - (wy - y) - 1 > 2)
        divide(x, width, wy + 1, height - (wy - y) - 1, nextOrientation);
    } else {
      if (wx - x > 2) divide(x, wx - x, y, height, nextOrientation);
      if (width - (wx - x) - 1 > 2)
        divide(wx + 1, width - (wx - x) - 1, y, height, nextOrientation);
    }
  };

  const orientation =
    cols < rows
      ? "horizontal"
      : rows < cols
      ? "vertical"
      : Math.random() < 0.5
      ? "horizontal"
      : "vertical";

  if (cols > 4 && rows > 4) {
    divide(1, cols - 2, 1, rows - 2, orientation);
  }

  let newGrid = { ...grid, walls };
  return ensureConnectivity(newGrid);
};

const generateBinaryTree = (
  grid: GridState,
  options?: MazeOptions
): GridState => {
  const { rows, cols } = grid.spec;
  const walls = new Set<number>();

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      walls.add(idOf(row, col, cols));
    }
  }

  for (let row = 1; row < rows - 1; row += 2) {
    for (let col = 1; col < cols - 1; col += 2) {
      walls.delete(idOf(row, col, cols));

      const directions: Array<{ row: number; col: number }> = [];
      if (row > 1) directions.push({ row: row - 1, col });
      if (col < cols - 2) directions.push({ row, col: col + 1 });

      if (directions.length > 0) {
        const direction =
          directions[Math.floor(Math.random() * directions.length)];
        walls.delete(idOf(direction.row, direction.col, cols));
      }
    }
  }

  let newGrid = { ...grid, walls };
  return ensureConnectivity(newGrid);
};

const generatePrim = (grid: GridState, options?: MazeOptions): GridState => {
  const { rows, cols } = grid.spec;
  const walls = new Set<number>();

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      walls.add(idOf(row, col, cols));
    }
  }

  const startRow = Math.floor(rows / 2);
  const startCol = Math.floor(cols / 2);
  const startId = idOf(startRow, startCol, cols);
  walls.delete(startId);

  const wallList: Array<{ id: number; row: number; col: number }> = [];
  const addWalls = (row: number, col: number) => {
    const directions = [
      [-2, 0],
      [2, 0],
      [0, -2],
      [0, 2],
    ];
    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
        const id = idOf(newRow, newCol, cols);
        if (walls.has(id)) {
          wallList.push({ id, row: newRow, col: newCol });
        }
      }
    }
  };

  addWalls(startRow, startCol);

  while (wallList.length > 0) {
    const randomIndex = Math.floor(Math.random() * wallList.length);
    const wall = wallList.splice(randomIndex, 1)[0];

    if (!walls.has(wall.id)) continue;

    const directions = [
      [-2, 0],
      [2, 0],
      [0, -2],
      [0, 2],
    ];
    let connectedCells = 0;

    for (const [dr, dc] of directions) {
      const newRow = wall.row + dr;
      const newCol = wall.col + dc;
      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
        const id = idOf(newRow, newCol, cols);
        if (!walls.has(id)) {
          connectedCells++;
        }
      }
    }

    if (connectedCells === 1) {
      walls.delete(wall.id);
      for (const [dr, dc] of directions) {
        const newRow = wall.row + dr;
        const newCol = wall.col + dc;
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
          const id = idOf(newRow, newCol, cols);
          if (!walls.has(id)) {
            const betweenRow = wall.row + dr / 2;
            const betweenCol = wall.col + dc / 2;
            walls.delete(idOf(betweenRow, betweenCol, cols));
            break;
          }
        }
      }
      addWalls(wall.row, wall.col);
    }
  }

  let newGrid = { ...grid, walls };
  return ensureConnectivity(newGrid);
};

const generateKruskal = (grid: GridState, options?: MazeOptions): GridState => {
  const { rows, cols } = grid.spec;
  const walls = new Set<number>();

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      walls.add(idOf(row, col, cols));
    }
  }

  const sets: Map<number, Set<number>> = new Map();
  const cells: number[] = [];

  for (let row = 1; row < rows - 1; row += 2) {
    for (let col = 1; col < cols - 1; col += 2) {
      const id = idOf(row, col, cols);
      cells.push(id);
      sets.set(id, new Set([id]));
      walls.delete(id);
    }
  }

  const edges: Array<{
    cell1: number;
    cell2: number;
    wall: number;
  }> = [];

  for (let row = 1; row < rows - 1; row += 2) {
    for (let col = 1; col < cols - 1; col += 2) {
      const cell1 = idOf(row, col, cols);

      if (col + 2 < cols) {
        const cell2 = idOf(row, col + 2, cols);
        const wall = idOf(row, col + 1, cols);
        edges.push({ cell1, cell2, wall });
      }

      if (row + 2 < rows) {
        const cell2 = idOf(row + 2, col, cols);
        const wall = idOf(row + 1, col, cols);
        edges.push({ cell1, cell2, wall });
      }
    }
  }

  edges.sort(() => Math.random() - 0.5);

  for (const edge of edges) {
    const set1 = sets.get(edge.cell1);
    const set2 = sets.get(edge.cell2);

    if (!set1 || !set2 || set1 === set2) continue;

    walls.delete(edge.wall);

    const mergedSet = new Set<number>();
    set1.forEach(cell => mergedSet.add(cell));
    set2.forEach(cell => mergedSet.add(cell));
    
    mergedSet.forEach(cell => {
      sets.set(cell, mergedSet);
    });
  }

  let newGrid = { ...grid, walls };
  return ensureConnectivity(newGrid);
};

const generateSpiral = (grid: GridState, options?: MazeOptions): GridState => {
  const { rows, cols } = grid.spec;
  const walls = new Set<number>();

  let top = 2;
  let bottom = rows - 3;
  let left = 2;
  let right = cols - 3;

  while (top <= bottom && left <= right) {
    for (let col = left; col <= right; col++) {
      walls.add(idOf(top, col, cols));
    }
    top += 3;

    for (let row = top; row <= bottom; row++) {
      walls.add(idOf(row, right, cols));
    }
    right -= 3;

    if (top <= bottom) {
      for (let col = right; col >= left; col--) {
        walls.add(idOf(bottom, col, cols));
      }
      bottom -= 3;
    }

    if (left <= right) {
      for (let row = bottom; row >= top; row--) {
        walls.add(idOf(row, left, cols));
      }
      left += 3;
    }
  }

  let newGrid = { ...grid, walls };
  return ensureConnectivity(newGrid);
};

export const generateMaze = (
  grid: GridState,
  type: MazeType,
  options?: MazeOptions
): GridState => {
  switch (type) {
    case "Random Walls":
      return generateSimpleRandom(grid, options);
    case "Recursive Division":
      return generateRecursiveDivision(grid, options);
    case "Binary Tree":
      return generateBinaryTree(grid, options);
    case "Prim's Algorithm":
      return generatePrim(grid, options);
    case "Kruskal's Algorithm":
      return generateKruskal(grid, options);
    case "Spiral":
      return generateSpiral(grid, options);
    case "None":
    default:
      return grid;
  }
};
