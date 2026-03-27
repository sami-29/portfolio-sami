"use client";

import { Box, VStack, Heading, Text } from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
import Link from "next/link";
import { PostMetadata } from "../utils/postTypes";
import { formatDate, estimateReadingTime } from "../utils/formatters";

export default function PostPreview({ title, subtitle, date, slug, content }: PostMetadata) {
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const titleColor = useColorModeValue("gray.800", "white");
  const subtitleColor = useColorModeValue("gray.600", "gray.300");
  const dateColor = useColorModeValue("gray.500", "gray.400");
  const hoverBorderColor = useColorModeValue("brand.300", "brand.400");

  return (
    <Box
      asChild
      display="block"
      py={6}
      borderBottomWidth={1}
      borderColor={borderColor}
      position="relative"
      transition="all 0.2s ease"
      _after={{
        content: "''",
        position: "absolute",
        width: "100%",
        transform: "scaleX(0)",
        height: "2px",
        bottom: 0,
        left: 0,
        backgroundColor: hoverBorderColor,
        transformOrigin: "bottom right",
        transition: "transform 0.3s ease-out",
      }}
      _hover={{
        textDecoration: "none",
        _after: {
          transform: "scaleX(1)",
          transformOrigin: "bottom left",
        },
      }}
      w="full">
      <Link href={`/blog/${slug}`}>
        <VStack align="start" gap={3}>
          <Heading as="h2" fontSize="xl" fontWeight="semibold" color={titleColor} lineHeight="1.4">
            {title}
          </Heading>
          <Text color={subtitleColor} fontSize="md" lineHeight="1.5">
            {subtitle}
          </Text>
          <Text fontSize="sm" color={dateColor}>
            {formatDate(date)} · {estimateReadingTime(content)} min read
          </Text>
        </VStack>
      </Link>
    </Box>
  );
}
