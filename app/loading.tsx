import { Box } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      height="2px"
      bgGradient="to-r"
      gradientFrom="indigo.500"
      gradientTo="cyan.500"
      backgroundSize="400% 400%"
      animation="wiggle 1s linear infinite"
      css={{
        "@keyframes wiggle": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      }}
    />
  );
}
