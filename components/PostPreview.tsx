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
      borderColor="gray.800"
      position="relative"
      transition="transform 0.2s var(--ease-out-quart)"
      _after={{
        content: "''",
        position: "absolute",
        width: "100%",
        transform: "scaleX(0)",
        height: "1px",
        bottom: "-1px",
        left: 0,
        backgroundColor: "brand.400",
        transformOrigin: "bottom right",
        transition: "transform 0.3s var(--ease-out-quart)",
      }}
      _hover={{
        textDecoration: "none",
        transform: "translateX(6px)",
        _after: {
          transform: "scaleX(1)",
          transformOrigin: "bottom left",
        },
      }}
      w="full">
      <Link href={`/blog/${slug}`} style={{ viewTransitionName: `blog-post-${slug}` }}>
        <VStack align="start" gap={3}>
          <Heading
            as="h2"
            fontSize="xl"
            fontWeight="600"
            color="gray.100"
            lineHeight="1.35"
            fontFamily="heading"
            style={{ viewTransitionName: `blog-title-${slug}` }}>
            {title}
          </Heading>
          <Text color="gray.400" fontSize="md" lineHeight="1.6" fontFamily="body">
            {subtitle}
          </Text>
          <Text fontSize="sm" color="gray.600" fontFamily="body">
            {formatDate(date)} · {estimateReadingTime(content)} min read
          </Text>
        </VStack>
      </Link>
    </Box>
  );
}
