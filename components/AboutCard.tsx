import { Box, VStack, Heading, Text } from "@chakra-ui/react";
import NextImage, { StaticImageData } from "next/image";

interface Props {
  src: StaticImageData;
  title: string;
  description: string;
  website?: string;
}

export default function AboutCard({ src, title, description, website }: Props) {
  const cardContent = (
    <VStack gap={4} p={6} align="center" height="100%">
      <Box position="relative" width="80px" height="80px">
        <NextImage
          src={src}
          alt={`${title} technology logo`}
          width={80}
          height={80}
          style={{ objectFit: "contain" }}
        />
      </Box>
      <VStack gap={2} align="center" flex={1} justify="center">
        <Heading as="h3" size="sm" color="gray.100" textAlign="center" fontFamily="heading">
          {title}
        </Heading>
        <Text
          fontSize="xs"
          color="gray.500"
          textAlign="center"
          lineHeight="1.5"
          lineClamp={3}
          fontFamily="body">
          {description}
        </Text>
      </VStack>
    </VStack>
  );

  const sharedBoxProps = {
    bg: "gray.900",
    _hover: {
      borderColor: "brand.400",
      transform: "translateY(-4px)",
      boxShadow: "0 12px 40px -8px rgba(255, 179, 0, 0.15)",
    },
    borderWidth: "1px" as const,
    borderColor: "gray.800",
    borderRadius: "xl" as const,
    overflow: "hidden" as const,
    transition: "transform 0.25s var(--ease-out-quart), border-color 0.25s, box-shadow 0.25s",
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
