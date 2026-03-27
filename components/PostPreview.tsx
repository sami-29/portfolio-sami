"use client";

import { Box, VStack, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { PostMetadata } from "../utils/postTypes";
import { formatDate, estimateReadingTime } from "../utils/formatters";

export default function PostPreview({ title, subtitle, date, slug, content }: PostMetadata) {
  return (
    <Box
      asChild
      display="block"
      py={6}
      borderBottomWidth={1}
      borderColor={{ base: "gray.200", _dark: "gray.600" }}
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
        backgroundColor: { base: "brand.300", _dark: "brand.400" },
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
          <Heading
            as="h2"
            fontSize="xl"
            fontWeight="semibold"
            color={{ base: "gray.800", _dark: "white" }}
            lineHeight="1.4">
            {title}
          </Heading>
          <Text color={{ base: "gray.600", _dark: "gray.300" }} fontSize="md" lineHeight="1.5">
            {subtitle}
          </Text>
          <Text fontSize="sm" color={{ base: "gray.500", _dark: "gray.400" }}>
            {formatDate(date)} · {estimateReadingTime(content)} min read
          </Text>
        </VStack>
      </Link>
    </Box>
  );
}
