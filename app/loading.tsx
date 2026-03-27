import { Box } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      height="2px"
      zIndex={9999}
      background="linear-gradient(to right, #FF8F00, #FFC107, #FFD54F, #FFC107, #FF8F00)"
      backgroundSize="300% 100%"
      animation="loading-shimmer 1.4s linear infinite"
      css={{
        "@keyframes loading-shimmer": {
          "0%": { backgroundPosition: "100% 0" },
          "100%": { backgroundPosition: "-100% 0" },
        },
      }}
    />
  );
}
