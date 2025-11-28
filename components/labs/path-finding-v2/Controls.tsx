import React from "react";
import {
  VStack,
  HStack,
  Box,
  Text,
  Button,
  Select,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  AlgorithmName,
  GridType,
  MazeType,
  Speed,
} from "../../../utils/labs/path-finding/v2/core/types";

interface ControlsProps {
  algorithm: AlgorithmName;
  gridType: GridType;
  maze: MazeType;
  speed: Speed;
  isRunning: boolean;
  isPaused: boolean;
  onAlgorithmChange: (algorithm: AlgorithmName) => void;
  onGridTypeChange: (gridType: GridType) => void;
  onMazeChange: (maze: MazeType) => void;
  onSpeedChange: (speed: Speed) => void;
  onVisualize: () => void;
  onPauseResume: () => void;
  onStop: () => void;
  onClearGrid: () => void;
  onGenerateMaze: () => void;
  onClearWalls: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  algorithm,
  gridType,
  maze,
  speed,
  isRunning,
  isPaused,
  onAlgorithmChange,
  onGridTypeChange,
  onMazeChange,
  onSpeedChange,
  onVisualize,
  onPauseResume,
  onStop,
  onClearGrid,
  onGenerateMaze,
  onClearWalls,
}) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box
      p={5}
      bg={bgColor}
      borderRadius='xl'
      border='1px'
      borderColor={borderColor}
      h='fit-content'
      shadow='md'>
      <VStack spacing={5} align='stretch'>
        <Text
          fontSize='lg'
          fontWeight='bold'
          textAlign='center'
          color='blue.600'>
          Controls
        </Text>

        <Divider />

        <Box>
          <Text fontSize='sm' fontWeight='semibold' mb={2} color='gray.700'>
            Algorithm
          </Text>
          <Select
            value={algorithm}
            onChange={(e) => onAlgorithmChange(e.target.value as AlgorithmName)}
            isDisabled={isRunning}
            size='sm'
            focusBorderColor='blue.400'>
            <option value='Dijkstra'>Dijkstra's Algorithm</option>
            <option value='A*'>A* Search</option>
            <option value='BFS'>Breadth-First Search</option>
            <option value='DFS'>Depth-First Search</option>
          </Select>
        </Box>

        <Box>
          <Text fontSize='md' fontWeight='semibold' mb={2}>
            Maze Pattern
          </Text>
          <Select
            value={maze}
            onChange={(e) => onMazeChange(e.target.value as MazeType)}
            isDisabled={isRunning}
            size='sm'>
            <option value='None'>None</option>
            <option value='Random Walls'>Random Walls</option>
            <option value='Recursive Division'>Recursive Division</option>
            <option value='Binary Tree'>Binary Tree</option>
            <option value="Prim's Algorithm">Prim's Algorithm</option>
            <option value="Kruskal's Algorithm">Kruskal's Algorithm</option>
            <option value='Spiral'>Spiral</option>
          </Select>
        </Box>

        <Box>
          <Text fontSize='sm' fontWeight='semibold' mb={2} color='gray.700'>
            Visualization Speed
          </Text>
          <Select
            value={speed}
            onChange={(e) => onSpeedChange(e.target.value as Speed)}
            isDisabled={isRunning}
            size='sm'
            focusBorderColor='blue.400'>
            <option value='Slow'>Slow</option>
            <option value='Medium'>Medium</option>
            <option value='Fast'>Fast</option>
            <option value='Instant'>Instant</option>
          </Select>
        </Box>

        <Divider />

        <VStack spacing={2.5}>
          <Button
            colorScheme='blue'
            size='md'
            w='full'
            onClick={onVisualize}
            isDisabled={isRunning}
            leftIcon={<span>▶</span>}
            fontWeight='semibold'>
            Visualize
          </Button>

          {isRunning && (
            <HStack w='full' spacing={2}>
              <Button
                colorScheme={isPaused ? "green" : "orange"}
                size='sm'
                flex={1}
                onClick={onPauseResume}>
                {isPaused ? "▶ Resume" : "⏸ Pause"}
              </Button>
              <Button colorScheme='red' size='sm' flex={1} onClick={onStop}>
                ⏹ Stop
              </Button>
            </HStack>
          )}

          <Button
            size='sm'
            w='full'
            colorScheme='purple'
            variant='outline'
            onClick={onGenerateMaze}
            isDisabled={isRunning || maze === "None"}>
            Generate Maze
          </Button>

          <HStack w='full' spacing={2}>
            <Button
              size='sm'
              flex={1}
              variant='ghost'
              onClick={onClearWalls}
              isDisabled={isRunning}>
              Clear Walls
            </Button>
            <Button
              size='sm'
              flex={1}
              variant='ghost'
              onClick={onClearGrid}
              isDisabled={isRunning}>
              Reset Grid
            </Button>
          </HStack>
        </VStack>

        <Divider />

        <Box
          fontSize='xs'
          color='gray.600'
          bg='gray.50'
          p={3}
          borderRadius='md'>
          <Text fontWeight='semibold' mb={1.5} color='gray.700'>
            How to Use:
          </Text>
          <VStack align='start' spacing={0.5}>
            <Text>🖱 Click/drag to draw walls</Text>
            <Text>🟢 Green = Start</Text>
            <Text>🔴 Red = Finish</Text>
            <Text>🟣 Purple = Explored</Text>
            <Text>🟡 Yellow = Path</Text>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default Controls;
