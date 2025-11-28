import React from "react";
import {
  Box,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
} from "@chakra-ui/react";
import { SearchResult } from "../../../utils/labs/path-finding/v2/core/types";

interface StatsProps {
  result: SearchResult | null;
}

const Stats: React.FC<StatsProps> = ({ result }) => {
  if (!result) return null;

  const efficiency =
    result.nodesExplored > 0
      ? ((result.pathOrder.length / result.nodesExplored) * 100).toFixed(1)
      : "0";

  return (
    <Box
      p={4}
      bg='gradient.to-br'
      bgGradient='linear(to-br, blue.50, purple.50)'
      borderRadius='xl'
      border='1px'
      borderColor='blue.200'
      w='full'
      shadow='sm'>
      <Text fontSize='sm' fontWeight='bold' mb={3} color='blue.700'>
        📊 Performance Metrics
      </Text>
      <StatGroup>
        <Stat>
          <StatLabel fontSize='xs' color='gray.600'>
            Path Length
          </StatLabel>
          <StatNumber fontSize='2xl' color='blue.600' fontWeight='bold'>
            {result.pathOrder.length}
          </StatNumber>
        </Stat>
        <Stat>
          <StatLabel fontSize='xs' color='gray.600'>
            Nodes Explored
          </StatLabel>
          <StatNumber fontSize='2xl' color='purple.600' fontWeight='bold'>
            {result.nodesExplored}
          </StatNumber>
        </Stat>
      </StatGroup>
      <StatGroup mt={3}>
        <Stat>
          <StatLabel fontSize='xs' color='gray.600'>
            Time (ms)
          </StatLabel>
          <StatNumber fontSize='lg' color='green.600'>
            {result.executionTimeMs.toFixed(2)}
          </StatNumber>
        </Stat>
        <Stat>
          <StatLabel fontSize='xs' color='gray.600'>
            Efficiency
          </StatLabel>
          <StatNumber fontSize='lg' color='orange.600'>
            {efficiency}%
          </StatNumber>
        </Stat>
      </StatGroup>
    </Box>
  );
};

export default Stats;
