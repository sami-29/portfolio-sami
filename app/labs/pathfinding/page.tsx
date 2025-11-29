/* eslint-disable no-unused-vars, react-hooks/exhaustive-deps */
// TODO: This labs feature is under development and currently disabled
// Remove the eslint-disable comment above when ready to complete this feature
"use client";
import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import SEO from "../../../components/SEO";
import PathfindingVisualizer from "../../../components/labs/path-finding-v2/Visualizer";
import BackButton from "../../../components/BackButton";

const PathfindingPage: React.FC = () => {
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.300");

  return (
    <>
      <SEO
        title='Pathfinding Visualizer'
        description='Interactive pathfinding algorithm visualizer with support for different grid shapes (square, hexagonal, triangular) and algorithms (Dijkstra, A*). Generate mazes and watch algorithms find the shortest path in real-time.'
        path='/labs/pathfinding'
      />
      <Box as='main' minH='100vh' py={8}>
        <VStack spacing={6} align='start' maxW='container.xl' mx='auto' px={4}>
          {/* Header */}
          <Box w='full'>
            <BackButton href='/labs' />
            <VStack align='start' spacing={4} mt={4}>
              <Heading
                as='h1'
                fontSize={["3xl", "4xl", "5xl"]}
                color={textColor}>
                Pathfinding Visualizer
              </Heading>
            </VStack>
          </Box>

          {/* Visualizer */}
          <PathfindingVisualizer />
        </VStack>
      </Box>
    </>
  );
};

export default PathfindingPage;
