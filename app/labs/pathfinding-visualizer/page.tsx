import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";

const PathfindingVisualizer = dynamic(
  () => import("../../../components/labs/path-finding-v2/Visualizer"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Pathfinding Visualizer | Interactive Algorithm Demo",
  description:
    "Interactive pathfinding algorithm visualizer supporting Dijkstra, A*, BFS, DFS with Square and Hexagon grids. Create mazes and visualize how different algorithms find the shortest path.",
  keywords:
    "pathfinding, algorithm, visualization, Dijkstra, A*, BFS, DFS, maze, shortest path",
};

export default function PathfindingVisualizerPage() {
  return (
    <Container maxW='container.xl' py={8}>
      <VStack spacing={6} align='stretch'>
        <Box textAlign='center' mb={2}>
          <Heading
            as='h1'
            size='2xl'
            mb={3}
            bgGradient='linear(to-r, blue.500, purple.500)'
            bgClip='text'>
            Pathfinding Algorithm Visualizer
          </Heading>
          <Text fontSize='md' color='gray.600' maxW='3xl' mx='auto'>
            Visualize how different algorithms find the shortest path. Draw
            walls, generate mazes, and compare Dijkstra, A*, BFS, and DFS in
            real-time!
          </Text>
        </Box>

        <PathfindingVisualizer />
      </VStack>
    </Container>
  );
}
