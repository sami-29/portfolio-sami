import { Box, VStack, Heading, useColorModeValue } from "@chakra-ui/react";
import PostPreview from "../../components/PostPreview";
import getPostMetadata from "../../utils/GetPostMetadata";

export default function Blogs() {
  const postMetadata = getPostMetadata();
  const postPreviews = postMetadata.map((post) => (
    <PostPreview key={post.slug} {...post} />
  ));

  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Box as="main">
      <VStack spacing={8} align="start" w={["90%", "75%", "50%"]} mx="auto" mt={24}>
        <Heading as="h1" fontSize={["4xl", "5xl", "6xl"]} color={textColor} mb={10}>
          Blog posts
        </Heading>
        <VStack spacing={6} align="stretch" w="full">
          {postPreviews}
        </VStack>
      </VStack>
    </Box>
  );
}
