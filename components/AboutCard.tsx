import { Box, VStack, Heading, Text, Image } from "@chakra-ui/react";
import { StaticImageData } from "next/image";

interface Props {
  src: StaticImageData;
  title: string;
  description: string;
  website?: string;
}

export default function AboutCard({ src, title, description, website }: Props) {
  const cardContent = (
    <VStack gap={4} p={6} align="center" height="100%">
      <Box position="relative">
        <Image
          src={src.src}
          alt={`${title} technology logo`}
          boxSize="80px"
          objectFit="contain"
          filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
        />
      </Box>
      <VStack gap={2} align="center" flex={1} justify="center">
        <Heading as="h3" size="sm" color={{ base: "gray.800", _dark: "white" }} textAlign="center">
          {title}
        </Heading>
        <Text
          fontSize="xs"
          color={{ base: "gray.600", _dark: "gray.300" }}
          textAlign="center"
          lineHeight="1.4"
          lineClamp={3}>
          {description}
        </Text>
      </VStack>
    </VStack>
  );

  const sharedBoxProps = {
    bg: { base: "white", _dark: "gray.800" },
    _hover: {
      borderColor: { base: "brand.400", _dark: "brand.300" },
      transform: "translateY(-4px)",
      boxShadow: { base: "lg", _dark: "dark-lg" },
    },
    borderWidth: 1 as const,
    borderColor: { base: "gray.200", _dark: "gray.600" },
    borderRadius: "xl" as const,
    overflow: "hidden" as const,
    transition: "all 0.3s ease",
    height: "100%" as const,
    position: "relative" as const,
  };

  if (website) {
    return (
      <Box {...sharedBoxProps} asChild cursor="pointer">
        <a href={website} target="_blank" rel="noopener noreferrer">
          {cardContent}
        </a>
      </Box>
    );
  }

  return <Box {...sharedBoxProps}>{cardContent}</Box>;
}
