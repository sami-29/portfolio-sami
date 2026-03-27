"use client";

import { Box, VStack, Heading, Text } from "@chakra-ui/react";
import PostPreview from "./PostPreview";
import { PostMetadata } from "../utils/postTypes";

interface BlogUIProps {
  postMetadata: PostMetadata[];
}

export default function BlogUI({ postMetadata }: BlogUIProps) {
  return (
    <Box as="main" mb={10}>
      <VStack gap={8} align="start" w={["90%", "75%", "60%"]} mx="auto" mt={{ base: 8, md: 16 }}>
        <Heading
          as="h1"
          fontSize={["4xl", "5xl", "6xl"]}
          color={{ base: "gray.800", _dark: "white" }}
          lineHeight="shorter">
          Blog
        </Heading>
        <Text fontSize="lg" color={{ base: "gray.600", _dark: "gray.300" }}>
          Thoughts and insights on website development, website building, web performance, and
          technology.
        </Text>

        {postMetadata.length > 0 ? (
          <VStack gap={6} w="full" mt={8}>
            {postMetadata.map((post) => (
              <PostPreview key={post.slug} {...post} />
            ))}
          </VStack>
        ) : (
          <VStack gap={4} py={8} align="start" w="full">
            <Text color={{ base: "gray.600", _dark: "gray.300" }}>
              I&apos;m working on some exciting blog posts. Check back soon!
            </Text>
          </VStack>
        )}
      </VStack>
    </Box>
  );
}
