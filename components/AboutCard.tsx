"use client";

import { Box, VStack, Heading, Text, Image } from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
import { StaticImageData } from "next/image";

interface Props {
  src: StaticImageData;
  title: string;
  description: string;
  website?: string;
}

export default function AboutCard({ src, title, description, website }: Props) {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const titleColor = useColorModeValue("gray.800", "white");
  const descriptionColor = useColorModeValue("gray.600", "gray.300");
  const hoverBorderColor = useColorModeValue("brand.400", "brand.300");
  const hoverShadow = useColorModeValue("lg", "dark-lg");

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
        <Heading as="h3" size="sm" color={titleColor} textAlign="center">
          {title}
        </Heading>
        <Text
          fontSize="xs"
          color={descriptionColor}
          textAlign="center"
          lineHeight="1.4"
          lineClamp={3}>
          {description}
        </Text>
      </VStack>
    </VStack>
  );

  const sharedBoxProps = {
    bg: bgColor,
    _hover: {
      borderColor: hoverBorderColor,
      transform: "translateY(-4px)",
      boxShadow: hoverShadow,
    },
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: "xl" as const,
    overflow: "hidden" as const,
    transition: "all 0.3s ease",
    height: "100%",
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
