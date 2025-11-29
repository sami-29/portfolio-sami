/* eslint-disable react-hooks/exhaustive-deps */
// TODO: Complete this labs component - currently under development
"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { Box, Flex, VStack, useToast } from "@chakra-ui/react";
import {
  AlgorithmName,
  GridType,
  MazeType,
  Speed,
  GridState,
  SearchResult,
} from "../../../utils/labs/path-finding/v2/core/types";
import {
  buildGrid,
  toggleWall,
  clearWalls,
} from "../../../utils/labs/path-finding/v2/core/grid/build";
import { generateMaze } from "../../../utils/labs/path-finding/v2/core/grid/maze";
import { runAlgorithm } from "../../../utils/labs/path-finding/v2/core/algorithms";
import { createAnimator } from "../../../utils/labs/path-finding/v2/core/animator";
import Controls from "./Controls";
import CanvasGrid from "./CanvasGrid";
import Stats from "./Stats";

const Visualizer: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<AlgorithmName>("Dijkstra");
  const [gridType, setGridType] = useState<GridType>("Square");
  const [maze, setMaze] = useState<MazeType>("None");
  const [speed, setSpeed] = useState<Speed>("Medium");
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);

  const [grid, setGrid] = useState<GridState>(() =>
    buildGrid({
      rows: 25,
      cols: 55,
      gridType: "Square",
      nodeSize: 25,
    })
  );

  const [renderState, setRenderState] = useState<
    Map<number, { visited: boolean; path: boolean }>
  >(new Map());

  const animatorRef = useRef<ReturnType<typeof createAnimator> | null>(null);
  const toast = useToast();

  useEffect(() => {
    setGrid(
      buildGrid({
        rows: 25,
        cols: 55,
        gridType: "Square",
        nodeSize: 25,
      })
    );
    setRenderState(new Map());
    setResult(null);
  }, [gridType]);

  const handleNodeClick = useCallback(
    (id: number) => {
      if (isRunning) return;
      setGrid((prev) => toggleWall(prev, id));
      setRenderState(new Map());
      setResult(null);
    },
    [isRunning]
  );

  const handleClearGrid = useCallback(() => {
    if (isRunning) return;
    setGrid(
      buildGrid({
        rows: 25,
        cols: 55,
        gridType: "Square",
        nodeSize: 25,
      })
    );
    setRenderState(new Map());
    setResult(null);
  }, [isRunning, gridType]);

  const handleClearWalls = useCallback(() => {
    if (isRunning) return;
    setGrid((prev) => clearWalls(prev));
    setRenderState(new Map());
    setResult(null);
  }, [isRunning]);

  const handleGenerateMaze = useCallback(() => {
    if (isRunning || maze === "None") return;

    const emptyGrid = clearWalls(grid);
    const mazeGrid = generateMaze(emptyGrid, maze);
    setGrid(mazeGrid);
    setRenderState(new Map());
    setResult(null);

    toast({
      title: "Maze Generated",
      description: `${maze} maze created with random start/finish positions`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }, [isRunning, maze, grid, toast]);

  const handleVisualize = useCallback(async () => {
    if (isRunning) return;

    setIsRunning(true);
    setIsPaused(false);
    setRenderState(new Map());

    const searchResult = runAlgorithm(
      algorithm,
      grid,
      grid.startId,
      grid.finishId
    );
    setResult(searchResult);

    const animator = createAnimator(speed, {
      onVisit: (id) => {
        setRenderState((prev) => {
          const next = new Map(prev);
          next.set(id, { visited: true, path: false });
          return next;
        });
      },
      onPath: (id) => {
        setRenderState((prev) => {
          const next = new Map(prev);
          const current = next.get(id) || { visited: false, path: false };
          next.set(id, { ...current, path: true });
          return next;
        });
      },
      onDone: () => {
        setIsRunning(false);
        setIsPaused(false);
      },
      onStop: () => {
        setIsRunning(false);
        setIsPaused(false);
      },
    });

    animatorRef.current = animator;
    await animator.play(searchResult.visitedOrder, searchResult.pathOrder);
  }, [isRunning, algorithm, grid, speed]);

  const handlePauseResume = useCallback(() => {
    if (!animatorRef.current) return;

    if (isPaused) {
      animatorRef.current.resume();
      setIsPaused(false);
    } else {
      animatorRef.current.pause();
      setIsPaused(true);
    }
  }, [isPaused]);

  const handleStop = useCallback(() => {
    if (animatorRef.current) {
      animatorRef.current.stop();
    }
    setIsRunning(false);
    setIsPaused(false);
    setRenderState(new Map());
  }, []);

  return (
    <Box w='full' maxW='container.xl' mx='auto' p={4}>
      <Flex direction={{ base: "column", lg: "row" }} gap={6}>
        <Box w={{ base: "full", lg: "350px" }} flexShrink={0}>
          <VStack spacing={4}>
            <Controls
              algorithm={algorithm}
              gridType={gridType}
              maze={maze}
              speed={speed}
              isRunning={isRunning}
              isPaused={isPaused}
              onAlgorithmChange={setAlgorithm}
              onGridTypeChange={setGridType}
              onMazeChange={setMaze}
              onSpeedChange={setSpeed}
              onVisualize={handleVisualize}
              onPauseResume={handlePauseResume}
              onStop={handleStop}
              onClearGrid={handleClearGrid}
              onGenerateMaze={handleGenerateMaze}
              onClearWalls={handleClearWalls}
            />
            <Stats result={result} />
          </VStack>
        </Box>

        <Box flex={1}>
          <CanvasGrid
            grid={grid}
            renderState={renderState}
            onNodeClick={handleNodeClick}
            isRunning={isRunning}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default Visualizer;
