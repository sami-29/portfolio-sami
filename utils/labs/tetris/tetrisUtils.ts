export interface Position {
  x: number;
  y: number;
}

export interface TetrominoShape {
  shape: number[][];
  color: string;
  name: string;
}

export interface GamePiece {
  shape: number[][];
  position: Position;
  color: string;
  name: string;
  type: string;
}

export interface GameConfig {
  lockDelay: number; // milliseconds
  softDropMultiplier: number;
  hardDropEnabled: boolean;
  ghostPieceEnabled: boolean;
  holdEnabled: boolean;
  autoRepeatDelay: number; // DAS (Delayed Auto Shift)
  autoRepeatRate: number; // ARR (Auto Repeat Rate)
  bagRandomizer: boolean;
  showNextPieces: number; // 1-6 pieces
  boardBrightness: number; // 0.1 - 1.0
  enableSounds: boolean;
  soundVolume: number;
  visualEffects: boolean;
  // Sound file paths (can be empty strings if no files available)
  sounds: {
    move: string;
    rotate: string;
    softDrop: string;
    hardDrop: string;
    hold: string;
    lineClear: string;
    tetris: string; // 4 lines cleared
    levelUp: string;
    gameOver: string;
    pieceLock: string;
  };
}

export interface GameState {
  board: (string | 0)[][];
  currentPiece: GamePiece | null;
  nextPieces: GamePiece[];
  holdPiece: GamePiece | null;
  canHold: boolean;
  score: number;
  level: number;
  lines: number;
  dropTime: number;
  lastDrop: number;
  lockTimer: number;
  lockDelay: number;
  isPaused: boolean;
  isGameOver: boolean;
  pieceBag: string[];
  nextBag: string[];
  config: GameConfig;
  visualEffects: VisualEffect[];
  events: GameEvent[];
}

export interface GameStats {
  totalLines: number;
  totalScore: number;
  level: number;
  piecesPlaced: number;
  gameTime: number;
  linesPerMinute: number;
  scorePerMinute: number;
  tetrises: number;
  tspins: number;
}

export interface HighScore {
  score: number;
  level: number;
  lines: number;
  date: string;
  duration: number; // in seconds
}

export interface GameEvent {
  type:
    | "move"
    | "rotate"
    | "softDrop"
    | "hardDrop"
    | "hold"
    | "lineClear"
    | "tetris"
    | "levelUp"
    | "gameOver"
    | "pieceLock";
  data?: any;
}

export interface VisualEffect {
  type: "lineClear" | "tetris" | "levelUp" | "gameOver";
  position?: { x: number; y: number };
  duration: number;
  startTime: number;
}

// Tetromino shapes (Standard Tetris pieces with correct colors)
export const TETROMINO_SHAPES: { [key: string]: TetrominoShape } = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "#00f0f0", // Cyan
    name: "I-Piece (Line)",
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "#f0f000", // Yellow
    name: "O-Piece (Square)",
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "#a000f0", // Purple
    name: "T-Piece",
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: "#00f000", // Green
    name: "S-Piece",
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: "#f00000", // Red
    name: "Z-Piece",
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "#0000f0", // Blue
    name: "J-Piece",
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "#f0a000", // Orange
    name: "L-Piece",
  },
};

// Game constants following Tetris Guidelines
export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const BUFFER_HEIGHT = 20; // Hidden area above visible board
export const TOTAL_HEIGHT = BOARD_HEIGHT + BUFFER_HEIGHT;
export const CELL_SIZE = 30;
export const INITIAL_DROP_TIME = 1000; // 1 second
export const LEVEL_SPEED_INCREASE = 100; // ms faster per level
export const MIN_DROP_TIME = 50; // minimum drop time
export const LOCK_DELAY = 500; // 500ms lock delay (Tetris Guideline)

// Default configuration
export const DEFAULT_CONFIG: GameConfig = {
  lockDelay: 500,
  softDropMultiplier: 20, // 20x faster
  hardDropEnabled: true,
  ghostPieceEnabled: true,
  holdEnabled: true,
  autoRepeatDelay: 100, // DAS
  autoRepeatRate: 50, // ARR
  bagRandomizer: true,
  showNextPieces: 1,
  boardBrightness: 0.8,
  enableSounds: true,
  soundVolume: 0.8,
  visualEffects: true,
  sounds: {
    move: "",
    rotate: "",
    softDrop: "",
    hardDrop: "",
    hold: "",
    lineClear: "",
    tetris: "",
    levelUp: "",
    gameOver: "",
    pieceLock: "",
  },
};

const DEBUG_7BAG = true;

// 7-bag randomizer implementation (Official Tetris) with improved randomization
export function createNewBag(): string[] {
  const pieces = ["I", "O", "T", "S", "Z", "J", "L"];

  // Enhanced Fisher-Yates shuffle for better randomization
  for (let i = pieces.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
  }

  // Debug: Log the new bag
  if (DEBUG_7BAG) {
    console.log("New 7-bag created:", pieces.join(""));
  }
  return pieces;
}

// Test function to verify 7-bag system
export function test7BagSystem(iterations: number = 3): void {
  console.log(`\n🧪 Testing 7-bag system for ${iterations} complete bags:`);

  let currentBag = createNewBag();
  let nextBag = createNewBag();
  let allPieces: string[] = [];

  for (let bag = 0; bag < iterations; bag++) {
    console.log(`\n📦 Bag ${bag + 1}:`);
    const bagPieces: string[] = [];

    // Draw all 7 pieces from this bag
    for (let i = 0; i < 7; i++) {
      const result = getNextPieceFromBag(currentBag, nextBag);
      bagPieces.push(result.piece.type);
      allPieces.push(result.piece.type);
      currentBag = result.newCurrentBag;
      nextBag = result.newNextBag;
    }

    const bagStr = bagPieces.join("");
    console.log(`   Sequence: ${bagStr}`);

    // Verify all 7 pieces appeared exactly once
    const uniquePieces = new Set(bagPieces);
    const allSevenPresent =
      uniquePieces.size === 7 &&
      ["I", "O", "T", "S", "Z", "J", "L"].every((p) => uniquePieces.has(p));

    console.log(`   ✅ Valid 7-bag: ${allSevenPresent ? "YES" : "NO"}`);
  }

  console.log(`\n📊 Overall sequence: ${allPieces.join("")}`);
  console.log("🔍 Checking for consecutive duplicates...");

  let consecutiveDuplicates = 0;
  for (let i = 1; i < allPieces.length; i++) {
    if (allPieces[i] === allPieces[i - 1]) {
      consecutiveDuplicates++;
      console.log(
        `   ⚠️  Duplicate found: ${allPieces[i]} at positions ${i - 1}-${i}`
      );
    }
  }

  console.log(`📈 Total consecutive duplicates: ${consecutiveDuplicates}`);
  console.log(
    "Note: Duplicates at bag boundaries (positions 6-7, 13-14, etc.) are normal and expected!\n"
  );
}

// Get next piece from bag using 7-bag system
export function getNextPieceFromBag(
  currentBag: string[],
  nextBag: string[]
): {
  piece: GamePiece;
  newCurrentBag: string[];
  newNextBag: string[];
} {
  let bagToUse = [...currentBag];
  let nextBagToUse = [...nextBag];

  // If current bag is empty, move to next bag
  if (bagToUse.length === 0) {
    if (DEBUG_7BAG) {
      console.log("Bag depleted! Moving to next bag:", nextBagToUse.join(""));
    }
    bagToUse = nextBagToUse;
    nextBagToUse = createNewBag();
  }

  const pieceType = bagToUse.shift()!;
  if (DEBUG_7BAG) {
    console.log(
      `Generated piece: ${pieceType}, remaining in bag: ${bagToUse.join("")}`
    );
  }

  const tetromino = TETROMINO_SHAPES[pieceType];

  const piece: GamePiece = {
    shape: tetromino.shape.map((row) => [...row]),
    position: {
      x:
        Math.floor(BOARD_WIDTH / 2) - Math.floor(tetromino.shape[0].length / 2),
      y: pieceType === "I" ? BUFFER_HEIGHT - 1 : BUFFER_HEIGHT, // Adjust Y to show piece fully at top of visible board
    },
    color: tetromino.color,
    name: tetromino.name,
    type: pieceType,
  };

  return {
    piece,
    newCurrentBag: bagToUse,
    newNextBag: nextBagToUse,
  };
}

// Create empty board
export function createEmptyBoard(): (string | 0)[][] {
  return Array.from({ length: TOTAL_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => 0)
  );
}

// Generate initial next pieces using 7-bag
export function generateInitialPieces(count: number = 5): {
  pieces: GamePiece[];
  currentBag: string[];
  nextBag: string[];
} {
  let currentBag = createNewBag();
  let nextBag = createNewBag();
  const pieces: GamePiece[] = [];

  if (DEBUG_7BAG) {
    console.log(`Generating ${count} initial pieces from bags:`);
    console.log(`Current bag: ${currentBag.join("")}`);
    console.log(`Next bag: ${nextBag.join("")}`);
  }

  for (let i = 0; i < count; i++) {
    const result = getNextPieceFromBag(currentBag, nextBag);
    pieces.push(result.piece);
    currentBag = result.newCurrentBag;
    nextBag = result.newNextBag;
  }

  if (DEBUG_7BAG) {
    const pieceSequence = pieces.map((p) => p.type).join("");
    console.log(`Initial piece sequence: ${pieceSequence}`);
  }

  return { pieces, currentBag, nextBag };
}

// Rotate piece 90 degrees clockwise
export function rotatePiece(piece: GamePiece): GamePiece {
  const rotated = piece.shape[0].map((_, index) =>
    piece.shape.map((row) => row[index]).reverse()
  );

  return {
    ...piece,
    shape: rotated,
  };
}

// Check if piece position is valid
export function isValidPosition(
  board: (string | 0)[][],
  piece: GamePiece,
  offset: Position = { x: 0, y: 0 }
): boolean {
  const newX = piece.position.x + offset.x;
  const newY = piece.position.y + offset.y;

  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x] !== 0) {
        const boardX = newX + x;
        const boardY = newY + y;

        // Check boundaries (including buffer zone)
        if (
          boardX < 0 ||
          boardX >= BOARD_WIDTH ||
          boardY >= TOTAL_HEIGHT ||
          (boardY >= 0 && board[boardY][boardX] !== 0)
        ) {
          return false;
        }
      }
    }
  }
  return true;
}

// Place piece on board
export function placePieceOnBoard(
  board: (string | 0)[][],
  piece: GamePiece
): (string | 0)[][] {
  const newBoard = board.map((row) => [...row]);

  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x] !== 0) {
        const boardX = piece.position.x + x;
        const boardY = piece.position.y + y;

        if (boardY >= 0 && boardY < TOTAL_HEIGHT) {
          newBoard[boardY][boardX] = piece.type;
        }
      }
    }
  }

  return newBoard;
}

// Clear completed lines and return updated board with visual effects
export function clearCompletedLines(board: (string | 0)[][]): {
  newBoard: (string | 0)[][];
  linesCleared: number;
  clearedLineIndices: number[];
} {
  const newBoard = board.map((row) => [...row]);
  const clearedLineIndices: number[] = [];

  for (let y = TOTAL_HEIGHT - 1; y >= 0; y--) {
    const isComplete = newBoard[y].every((cell) => cell !== 0);
    if (isComplete) {
      clearedLineIndices.push(y);
      newBoard.splice(y, 1);
      newBoard.unshift(Array(BOARD_WIDTH).fill(0));
      y++; // Check the same row again since we removed one
    }
  }

  return {
    newBoard,
    linesCleared: clearedLineIndices.length,
    clearedLineIndices,
  };
}

// Calculate score based on Tetris Guidelines
export function calculateScore(
  linesCleared: number,
  level: number,
  isTSpin: boolean = false
): number {
  const baseScores = [0, 40, 100, 300, 1200]; // 0, 1, 2, 3, 4 lines
  let score = baseScores[linesCleared] * (level + 1);

  // T-Spin bonus
  if (isTSpin && linesCleared > 0) {
    const tSpinBonus = [0, 800, 1200, 1600]; // T-Spin Single, Double, Triple
    score = tSpinBonus[linesCleared] * (level + 1);
  }

  return score;
}

// Calculate level based on lines cleared
export function calculateLevel(totalLines: number): number {
  return Math.floor(totalLines / 10);
}

// Calculate drop time based on level (Tetris Guidelines speed curve)
export function calculateDropTime(level: number): number {
  // More accurate to Tetris Guidelines speed curve
  const speedCurve = [
    1000, 793, 618, 473, 355, 262, 190, 135, 94, 64, 43, 28, 18, 11, 7, 4, 3, 2,
    1, 1,
  ];

  if (level < speedCurve.length) {
    return speedCurve[level];
  }

  return speedCurve[speedCurve.length - 1];
}

// Initialize game state
export function createInitialGameState(
  config: GameConfig = DEFAULT_CONFIG
): GameState {
  const { pieces, currentBag, nextBag } = generateInitialPieces(
    config.showNextPieces + 1
  );
  const currentPiece = pieces.shift()!;
  const nextPieces = pieces;

  return {
    board: createEmptyBoard(),
    currentPiece,
    nextPieces,
    holdPiece: null,
    canHold: true,
    score: 0,
    level: 0,
    lines: 0,
    isGameOver: false,
    isPaused: false,
    dropTime: INITIAL_DROP_TIME,
    lastDrop: Date.now(),
    lockTimer: 0,
    lockDelay: config.lockDelay,
    pieceBag: currentBag,
    nextBag: nextBag,
    config,
    visualEffects: [],
    events: [],
  };
}

// Create game event
export function createGameEvent(
  type: GameEvent["type"],
  data?: any
): GameEvent {
  return { type, data };
}

// Add event to game state
export function addGameEvent(
  gameState: GameState,
  event: GameEvent
): GameState {
  return {
    ...gameState,
    events: [...gameState.events, event],
  };
}

// Clear events (typically called after processing)
export function clearGameEvents(gameState: GameState): GameState {
  return {
    ...gameState,
    events: [],
  };
}

// Updated movement function with sound events
export function movePiece(
  gameState: GameState,
  direction: "left" | "right" | "down"
): GameState {
  if (!gameState.currentPiece || gameState.isPaused || gameState.isGameOver) {
    return gameState;
  }

  const offset = {
    x: direction === "left" ? -1 : direction === "right" ? 1 : 0,
    y: direction === "down" ? 1 : 0,
  };

  if (isValidPosition(gameState.board, gameState.currentPiece, offset)) {
    const newState = {
      ...gameState,
      currentPiece: {
        ...gameState.currentPiece,
        position: {
          x: gameState.currentPiece.position.x + offset.x,
          y: gameState.currentPiece.position.y + offset.y,
        },
      },
      lockTimer: direction !== "down" ? 0 : gameState.lockTimer, // Reset lock timer on horizontal movement
    };

    // Add sound event
    const eventType = direction === "down" ? "softDrop" : "move";
    return addGameEvent(newState, createGameEvent(eventType));
  }

  return gameState;
}

// SRS Wall Kick implementation (simplified)
const WALL_KICK_DATA_JLSTZ = {
  "0->1": [
    { x: 0, y: 0 },
    { x: -1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: -2 },
    { x: -1, y: -2 },
  ],
  "1->0": [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: -1 },
    { x: 0, y: 2 },
    { x: 1, y: 2 },
  ],
  "1->2": [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: -1 },
    { x: 0, y: 2 },
    { x: 1, y: 2 },
  ],
  "2->1": [
    { x: 0, y: 0 },
    { x: -1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: -2 },
    { x: -1, y: -2 },
  ],
  "2->3": [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: -2 },
    { x: 1, y: -2 },
  ],
  "3->2": [
    { x: 0, y: 0 },
    { x: -1, y: 0 },
    { x: -1, y: -1 },
    { x: 0, y: 2 },
    { x: -1, y: 2 },
  ],
  "3->0": [
    { x: 0, y: 0 },
    { x: -1, y: 0 },
    { x: -1, y: -1 },
    { x: 0, y: 2 },
    { x: -1, y: 2 },
  ],
  "0->3": [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: -2 },
    { x: 1, y: -2 },
  ],
};

// Rotate current piece with SRS
export function rotatePieceInGame(
  gameState: GameState,
  clockwise: boolean = true
): GameState {
  if (!gameState.currentPiece || gameState.isPaused || gameState.isGameOver) {
    return gameState;
  }

  // O-piece doesn't rotate
  if (gameState.currentPiece.type === "O") {
    return gameState;
  }

  const rotatedPiece = rotatePiece(gameState.currentPiece);

  // Try basic rotation first
  if (isValidPosition(gameState.board, rotatedPiece)) {
    const newState = {
      ...gameState,
      currentPiece: rotatedPiece,
      lockTimer: 0, // Reset lock timer on successful rotation
    };
    return addGameEvent(newState, createGameEvent("rotate"));
  }

  // Try basic wall kicks (simplified SRS)
  const wallKicks = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: -1 },
  ];

  for (const kick of wallKicks) {
    const kickedPiece = {
      ...rotatedPiece,
      position: {
        x: rotatedPiece.position.x + kick.x,
        y: rotatedPiece.position.y + kick.y,
      },
    };

    if (isValidPosition(gameState.board, kickedPiece)) {
      const newState = {
        ...gameState,
        currentPiece: kickedPiece,
        lockTimer: 0, // Reset lock timer on successful rotation
      };
      return addGameEvent(newState, createGameEvent("rotate"));
    }
  }

  return gameState; // Rotation failed
}

// Drop piece to bottom
export function hardDrop(gameState: GameState): GameState {
  if (!gameState.currentPiece || gameState.isPaused || gameState.isGameOver) {
    return gameState;
  }

  let droppedPiece = { ...gameState.currentPiece };
  let dropDistance = 0;

  // Move down until we can't
  while (isValidPosition(gameState.board, droppedPiece, { x: 0, y: 1 })) {
    droppedPiece = {
      ...droppedPiece,
      position: { ...droppedPiece.position, y: droppedPiece.position.y + 1 },
    };
    dropDistance++;
  }

  const newState = {
    ...gameState,
    currentPiece: droppedPiece,
    lockTimer: gameState.lockDelay, // Force immediate lock
    score: gameState.score + dropDistance * 2, // Hard drop scoring
  };

  return addGameEvent(newState, createGameEvent("hardDrop", { dropDistance }));
}

// Hold piece functionality
export function holdPiece(gameState: GameState): GameState {
  if (
    !gameState.config.holdEnabled ||
    !gameState.canHold ||
    !gameState.currentPiece
  ) {
    return gameState;
  }

  let newState: GameState;

  if (gameState.holdPiece) {
    // Swap current and hold pieces - fix spawning position
    const heldPieceType = gameState.holdPiece.type;
    const tetromino = TETROMINO_SHAPES[heldPieceType];

    const properlySpawnedPiece: GamePiece = {
      shape: tetromino.shape.map((row) => [...row]),
      position: {
        x:
          Math.floor(BOARD_WIDTH / 2) -
          Math.floor(tetromino.shape[0].length / 2),
        y: heldPieceType === "I" ? BUFFER_HEIGHT - 1 : BUFFER_HEIGHT,
      },
      color: tetromino.color,
      name: tetromino.name,
      type: heldPieceType,
    };

    newState = {
      ...gameState,
      currentPiece: properlySpawnedPiece,
      holdPiece: { ...gameState.currentPiece, position: { x: 0, y: 0 } },
      canHold: false,
      lockTimer: 0,
    };
  } else {
    // Put current piece in hold, get next piece from existing sequence
    // Don't generate new bags - use the existing next pieces queue
    const {
      piece: nextPiece,
      newCurrentBag,
      newNextBag,
    } = getNextPieceFromBag(gameState.pieceBag, gameState.nextBag);

    newState = {
      ...gameState,
      currentPiece: gameState.nextPieces[0],
      nextPieces: [...gameState.nextPieces.slice(1), nextPiece],
      holdPiece: { ...gameState.currentPiece, position: { x: 0, y: 0 } },
      canHold: false,
      pieceBag: newCurrentBag,
      nextBag: newNextBag,
      lockTimer: 0,
    };
  }

  return addGameEvent(newState, createGameEvent("hold"));
}

// Update game state (main game loop logic)
export function updateGameState(gameState: GameState): GameState {
  if (gameState.isGameOver || gameState.isPaused) {
    return gameState;
  }

  const now = Date.now();
  let newState = { ...gameState };

  // Update visual effects - remove expired ones
  newState.visualEffects = newState.visualEffects.filter(
    (effect) => now - effect.startTime < effect.duration
  );

  // Handle automatic dropping
  if (now - gameState.lastDrop >= gameState.dropTime) {
    if (
      gameState.currentPiece &&
      isValidPosition(gameState.board, gameState.currentPiece, { x: 0, y: 1 })
    ) {
      newState = movePiece(newState, "down");
      newState.lastDrop = now;
    } else {
      // Start lock delay
      newState.lockTimer = Math.min(
        newState.lockTimer + (now - gameState.lastDrop),
        newState.lockDelay
      );
      newState.lastDrop = now;
    }
  }

  // Handle lock delay
  if (newState.currentPiece && newState.lockTimer >= newState.lockDelay) {
    // Lock the piece
    const newBoard = placePieceOnBoard(newState.board, newState.currentPiece);
    const {
      newBoard: clearedBoard,
      linesCleared,
      clearedLineIndices,
    } = clearCompletedLines(newBoard);

    const newLines = newState.lines + linesCleared;
    const newLevel = calculateLevel(newLines);
    const oldLevel = gameState.level;
    const newScore = newState.score + calculateScore(linesCleared, newLevel);
    const newDropTime = calculateDropTime(newLevel);

    // Add piece lock event
    newState = addGameEvent(newState, createGameEvent("pieceLock"));

    // Add visual effects and sound events for line clears
    if (linesCleared > 0) {
      // Add line clear visual effects
      if (newState.config.visualEffects) {
        clearedLineIndices.forEach((lineIndex) => {
          const effect: VisualEffect = {
            type: linesCleared === 4 ? "tetris" : "lineClear",
            position: { x: 0, y: lineIndex },
            duration: 500,
            startTime: now,
          };
          newState.visualEffects.push(effect);
        });
      }

      // Add sound events
      if (linesCleared === 4) {
        newState = addGameEvent(
          newState,
          createGameEvent("tetris", { lines: 4 })
        );
      } else {
        newState = addGameEvent(
          newState,
          createGameEvent("lineClear", { lines: linesCleared })
        );
      }
    }

    // Add level up effect and sound
    if (newLevel > oldLevel) {
      newState = addGameEvent(
        newState,
        createGameEvent("levelUp", { newLevel })
      );
      if (newState.config.visualEffects) {
        const levelUpEffect: VisualEffect = {
          type: "levelUp",
          position: { x: BOARD_WIDTH / 2, y: BOARD_HEIGHT / 2 },
          duration: 1000,
          startTime: now,
        };
        newState.visualEffects.push(levelUpEffect);
      }
    }

    // Get next piece
    const {
      piece: nextPiece,
      newCurrentBag,
      newNextBag,
    } = getNextPieceFromBag(newState.pieceBag, newState.nextBag);

    // Add new piece to next pieces queue
    const updatedNextPieces = [...newState.nextPieces.slice(1), nextPiece];
    const newCurrentPiece = newState.nextPieces[0];

    // Check for game over (piece spawns overlapping existing blocks)
    const isGameOver = !isValidPosition(clearedBoard, newCurrentPiece);

    newState = {
      ...newState,
      board: clearedBoard,
      currentPiece: isGameOver ? null : newCurrentPiece,
      nextPieces: updatedNextPieces,
      score: newScore,
      level: newLevel,
      lines: newLines,
      dropTime: newDropTime,
      lastDrop: now,
      lockTimer: 0,
      pieceBag: newCurrentBag,
      nextBag: newNextBag,
      canHold: true,
      isGameOver,
    };

    // Add game over event
    if (isGameOver) {
      newState = addGameEvent(newState, createGameEvent("gameOver"));
      if (newState.config.visualEffects) {
        const gameOverEffect: VisualEffect = {
          type: "gameOver",
          position: { x: BOARD_WIDTH / 2, y: BOARD_HEIGHT / 2 },
          duration: 2000,
          startTime: now,
        };
        newState.visualEffects.push(gameOverEffect);
      }
    }
  }

  return newState;
}

// Get ghost piece (preview of where piece will land)
export function getGhostPiece(gameState: GameState): GamePiece | null {
  if (!gameState.currentPiece || !gameState.config.ghostPieceEnabled)
    return null;

  let ghostPiece = { ...gameState.currentPiece };

  // Move down until we can't
  while (isValidPosition(gameState.board, ghostPiece, { x: 0, y: 1 })) {
    ghostPiece = {
      ...ghostPiece,
      position: {
        ...ghostPiece.position,
        y: ghostPiece.position.y + 1,
      },
    };
  }

  return ghostPiece;
}

// Pause/unpause game
export function togglePause(gameState: GameState): GameState {
  return {
    ...gameState,
    isPaused: !gameState.isPaused,
    lastDrop: Date.now(), // Reset drop timer
  };
}

// Reset game
export function resetGame(config?: GameConfig): GameState {
  return createInitialGameState(config);
}

// Get game statistics
export function getGameStats(
  gameState: GameState,
  gameStartTime: number
): GameStats {
  const gameTime = (Date.now() - gameStartTime) / 1000 / 60; // minutes

  return {
    totalLines: gameState.lines,
    totalScore: gameState.score,
    level: gameState.level,
    piecesPlaced: Math.floor(gameState.score / 10), // Rough estimate
    gameTime,
    linesPerMinute: gameTime > 0 ? gameState.lines / gameTime : 0,
    scorePerMinute: gameTime > 0 ? gameState.score / gameTime : 0,
    tetrises: Math.floor(gameState.lines / 4), // Rough estimate
    tspins: 0, // Would need T-spin detection
  };
}

// High score management
export function saveHighScore(score: HighScore): void {
  try {
    const scores = getHighScores();
    scores.push(score);
    scores.sort((a, b) => b.score - a.score);
    scores.splice(10); // Keep only top 10
    localStorage.setItem("tetris-high-scores", JSON.stringify(scores));
  } catch (error) {
    console.error("Failed to save high score:", error);
  }
}

export function getHighScores(): HighScore[] {
  try {
    const scores = localStorage.getItem("tetris-high-scores");
    return scores ? JSON.parse(scores) : [];
  } catch (error) {
    console.error("Failed to load high scores:", error);
    return [];
  }
}

// Configuration management
export function saveGameConfig(config: GameConfig): void {
  try {
    localStorage.setItem("tetris-config", JSON.stringify(config));
  } catch (error) {
    console.error("Failed to save config:", error);
  }
}

export function loadGameConfig(): GameConfig {
  try {
    const config = localStorage.getItem("tetris-config");
    return config
      ? { ...DEFAULT_CONFIG, ...JSON.parse(config) }
      : DEFAULT_CONFIG;
  } catch (error) {
    console.error("Failed to load config:", error);
    return DEFAULT_CONFIG;
  }
}

// Educational information about game mechanics
export const TETRIS_MECHANICS = {
  scoring: {
    title: "Scoring System",
    description: "Points are awarded based on lines cleared and level",
    details: [
      "Single line: 40 × (level + 1) points",
      "Double line: 100 × (level + 1) points",
      "Triple line: 300 × (level + 1) points",
      "Tetris (4 lines): 1200 × (level + 1) points",
      "Hard drop: 2 points per cell dropped",
      "T-Spins award bonus points",
    ],
  },
  leveling: {
    title: "Level Progression",
    description: "Speed increases every 10 lines cleared",
    details: [
      "Level = floor(total_lines / 10)",
      "Drop speed follows official Tetris Guidelines curve",
      "Higher levels = more points per line",
      "Maximum speed reached at level 19",
    ],
  },
  pieces: {
    title: "7-Bag Randomizer",
    description: "Official Tetris piece generation system",
    details: [
      "All 7 pieces appear exactly once per bag",
      "No droughts longer than 12 pieces for I-piece",
      "S/Z sequences limited to maximum of 4",
      "More predictable than pure random generation",
    ],
  },
  mechanics: {
    title: "Game Mechanics",
    description: "Official Tetris Guidelines implementation",
    details: [
      "500ms lock delay after piece can't fall",
      "SRS (Super Rotation System) with wall kicks",
      "Hold function with one-piece buffer",
      "Ghost piece shows landing position",
      "DAS/ARR for smooth movement",
    ],
  },
};

// Canvas drawing utilities with improved visibility
export function drawBoard(
  ctx: CanvasRenderingContext2D,
  gameState: GameState,
  cellSize: number,
  brightness: number = 0.8,
  tetrominoShapes: { [key: string]: TetrominoShape }
): void {
  ctx.strokeStyle = "#666";
  ctx.lineWidth = 1;

  // Only draw visible portion (exclude buffer)
  for (let y = BUFFER_HEIGHT; y < TOTAL_HEIGHT; y++) {
    for (let x = 0; x < BOARD_WIDTH; x++) {
      const posX = x * cellSize;
      const posY = (y - BUFFER_HEIGHT) * cellSize;

      if (gameState.board[y][x] === 0) {
        ctx.fillStyle = "#000"; // Pure black
      } else {
        // Placed pieces - use their original color
        const pieceType = gameState.board[y][x];
        if (typeof pieceType === "string" && tetrominoShapes[pieceType]) {
          ctx.fillStyle = tetrominoShapes[pieceType].color;
        } else {
          ctx.fillStyle = `rgba(150, 150, 150, ${brightness})`; // Fallback
        }
      }

      ctx.fillRect(posX, posY, cellSize, cellSize);
      ctx.strokeRect(posX, posY, cellSize, cellSize);
    }
  }
}

export function drawPiece(
  ctx: CanvasRenderingContext2D,
  piece: GamePiece,
  cellSize: number,
  opacity: number = 1,
  bufferOffset: number = BUFFER_HEIGHT
): void {
  ctx.globalAlpha = opacity;
  ctx.fillStyle = piece.color;

  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x] !== 0) {
        const posX = (piece.position.x + x) * cellSize;
        const posY = (piece.position.y + y - bufferOffset) * cellSize;

        // Only draw if within visible area
        if (piece.position.y + y >= bufferOffset) {
          ctx.fillRect(posX, posY, cellSize, cellSize);
          ctx.strokeStyle = "#000";
          ctx.strokeRect(posX, posY, cellSize, cellSize);
        }
      }
    }
  }

  ctx.globalAlpha = 1;
}

export function drawNextPiece(
  ctx: CanvasRenderingContext2D,
  piece: GamePiece,
  cellSize: number,
  offsetX: number = 0,
  offsetY: number = 0
): void {
  ctx.fillStyle = piece.color;

  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x] !== 0) {
        const posX = offsetX + x * cellSize;
        const posY = offsetY + y * cellSize;

        ctx.fillRect(posX, posY, cellSize, cellSize);
        ctx.strokeStyle = "#000";
        ctx.strokeRect(posX, posY, cellSize, cellSize);
      }
    }
  }
}

// Draw visual effects on the canvas
export function drawVisualEffects(
  ctx: CanvasRenderingContext2D,
  visualEffects: VisualEffect[],
  cellSize: number,
  bufferOffset: number = BUFFER_HEIGHT
): void {
  const now = Date.now();

  visualEffects.forEach((effect) => {
    const progress = Math.min(1, (now - effect.startTime) / effect.duration);
    const alpha = 1 - progress; // Fade out over time

    ctx.save();
    ctx.globalAlpha = alpha;

    switch (effect.type) {
      case "lineClear":
        if (effect.position) {
          // Flash effect for cleared line
          const y = (effect.position.y - bufferOffset) * cellSize;
          if (y >= 0) {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, y, BOARD_WIDTH * cellSize, cellSize);

            // Sparkle effect
            const sparkles = 10;
            for (let i = 0; i < sparkles; i++) {
              const x = (i / sparkles) * BOARD_WIDTH * cellSize;
              const sparkleAlpha = Math.sin(progress * Math.PI * 4) * alpha;
              ctx.globalAlpha = sparkleAlpha;
              ctx.fillStyle = "#ffff00";
              ctx.fillRect(x, y, 4, 4);
            }
          }
        }
        break;

      case "tetris":
        if (effect.position) {
          // Special effect for Tetris (4 lines)
          const y = (effect.position.y - bufferOffset) * cellSize;
          if (y >= 0) {
            ctx.fillStyle = "#ff6b00";
            ctx.fillRect(0, y, BOARD_WIDTH * cellSize, cellSize);

            // Pulsing effect
            const pulse = Math.sin(progress * Math.PI * 6) * 0.5 + 0.5;
            ctx.globalAlpha = pulse * alpha;
            ctx.fillStyle = "#ffff00";
            ctx.fillRect(0, y - cellSize, BOARD_WIDTH * cellSize, cellSize * 4);
          }
        }
        break;

      case "levelUp":
        if (effect.position) {
          // Level up text effect
          const centerX = effect.position.x * cellSize;
          const centerY = (effect.position.y - bufferOffset) * cellSize;

          ctx.font = "bold 24px Arial";
          ctx.textAlign = "center";
          ctx.fillStyle = "#00ff00";
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 2;

          const scale = 1 + progress * 0.5; // Grow effect
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.scale(scale, scale);

          ctx.strokeText("LEVEL UP!", 0, 0);
          ctx.fillText("LEVEL UP!", 0, 0);

          ctx.restore();
        }
        break;

      case "gameOver":
        if (effect.position) {
          // Game over effect
          const centerX = effect.position.x * cellSize;
          const centerY = (effect.position.y - bufferOffset) * cellSize;

          ctx.font = "bold 32px Arial";
          ctx.textAlign = "center";
          ctx.fillStyle = "#ff0000";
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 3;

          const shake = Math.sin(progress * Math.PI * 20) * 2; // Shake effect

          ctx.strokeText("GAME OVER", centerX + shake, centerY);
          ctx.fillText("GAME OVER", centerX + shake, centerY);
        }
        break;
    }

    ctx.restore();
  });
}

// Sound playing function
export function playGameSound(soundType: string, config: GameConfig): void {
  if (!config.enableSounds) return;

  const soundPath = (config.sounds as any)[soundType];
  if (!soundPath) return;

  try {
    const audio = new Audio(soundPath);
    audio.volume = config.soundVolume;
    audio.play().catch((error) => {
      console.warn(`Could not play sound ${soundType}:`, error);
    });
  } catch (error) {
    console.warn(`Error creating audio for ${soundType}:`, error);
  }
}

export function isPieceFloating(
  board: (string | 0)[][],
  piece: GamePiece
): boolean {
  if (!piece) return false;

  // Check if piece can move down - if it can, it might be floating
  const canMoveDown = isValidPosition(board, piece, { x: 0, y: 1 });

  if (!canMoveDown) {
    return false; // Piece is properly supported
  }

  // Check if there's actually empty space directly below the piece
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x] !== 0) {
        const boardX = piece.position.x + x;
        const boardY = piece.position.y + y + 1; // Check cell below

        // If we're checking within board bounds
        if (
          boardX >= 0 &&
          boardX < BOARD_WIDTH &&
          boardY >= 0 &&
          boardY < TOTAL_HEIGHT
        ) {
          // Check if there are multiple empty rows below this piece
          let emptyRowsBelow = 0;
          for (let checkY = boardY; checkY < TOTAL_HEIGHT; checkY++) {
            if (board[checkY][boardX] === 0) {
              emptyRowsBelow++;
            } else {
              break;
            }
          }

          // If there are more than 1 empty rows below, it might be floating
          if (emptyRowsBelow > 1) {
            console.warn(
              `⚠️  Potential floating piece detected at (${boardX}, ${boardY}) with ${emptyRowsBelow} empty rows below`
            );
            return true;
          }
        }
      }
    }
  }

  return false;
}

// Enhanced movePiece with floating check
export function movePieceWithGravityCheck(
  gameState: GameState,
  direction: "left" | "right" | "down"
): GameState {
  const newState = movePiece(gameState, direction);

  // After moving, check if piece should continue falling
  if (newState.currentPiece && direction !== "down") {
    // Force piece to fall if it's floating
    let fallingState = newState;
    while (
      fallingState.currentPiece &&
      isValidPosition(fallingState.board, fallingState.currentPiece, {
        x: 0,
        y: 1,
      })
    ) {
      fallingState = movePiece(fallingState, "down");
    }

    if (fallingState !== newState) {
      console.log("🎯 Applied gravity to prevent floating piece");
      return fallingState;
    }
  }

  return newState;
}
