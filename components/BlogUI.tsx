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
    <Box as='main'>
      <VStack
        spacing={8}
        align='start'
        w={["90%", "75%", "50%"]}
        mx='auto'
        mt={24}>
        <Heading
          as='h1'
          fontSize={["4xl", "5xl", "6xl"]}
          color={textColor}
          mb={10}>
          Blog posts
        </Heading>
        <Text fontSize='lg' color={subTextColor}>
          Explore my thoughts and insights on various topics related to web
          development and technology.
        </Text>
        <VStack spacing={6} w='full'>
          {postMetadata.map((post) => (
            <PostPreview key={post.slug} {...post} />
          ))}
        </VStack>
      </VStack>
    </Box>
  );
}
