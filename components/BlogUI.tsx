"use client";

import {
  Box,
  VStack,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import PostPreview from "./PostPreview";
import { PostMetadata } from "../utils/GetPostMetadata";

interface BlogUIProps {
  postMetadata: PostMetadata[];
}

export default function BlogUI({ postMetadata }: BlogUIProps) {
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box as='main' mb={10}>
      <VStack
        spacing={8}
        align='start'
        w={["90%", "75%", "60%"]}
        mx='auto'
        mt={{ base: 8, md: 16 }}>
        <Heading as='h1' fontSize={["4xl", "5xl", "6xl"]} color={textColor}>
          Blog
        </Heading>
        <Text fontSize='lg' color={subTextColor}>
          Thoughts and insights on web development and technology.
        </Text>

        {postMetadata.length > 0 ? (
          <VStack spacing={6} w='full' mt={8}>
            {postMetadata.map((post) => (
              <PostPreview key={post.slug} {...post} />
            ))}
          </VStack>
        ) : (
          <VStack spacing={4} py={8} align='start' w='full'>
            <Text color={subTextColor}>
              I&apos;m working on some exciting blog posts. Check back soon!
            </Text>
          </VStack>
        )}
      </VStack>
    </Box>
  );
}
