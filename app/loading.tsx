import { Box, keyframes } from "@chakra-ui/react";

const wiggle = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export default function Loading() {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      height="2px"
      bgGradient="linear(to-r, indigo.500, cyan.500)"
      backgroundSize="400% 400%"
      animation={`${wiggle} 1s linear infinite`}
    />
  );
}
