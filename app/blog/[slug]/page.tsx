import {
  Box,
  VStack,
  Heading,
  Text,
  useColorModeValue,
} from "../../../components/ChakraComponents";
import getPostContent from "../../../utils/GetPostContent";
import Markdown from "markdown-to-jsx";
import getPostMetadata from "../../../utils/GetPostMetadata";
import { urlParamType } from "./UrlType";

export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

export default function Post(props: urlParamType) {
  const slug = props.params.slug;
  const post = getPostContent(slug);

  return (
    <Box as='main'>
      <VStack
        spacing={8}
        align='start'
        w={["90%", "75%", "50%"]}
        mx='auto'
        mt={24}>
        <Heading as='h1' fontSize={["4xl", "5xl", "6xl"]} color='gray.200'>
          {post.data.title}
        </Heading>
        <Text fontSize='xl' color='gray.600'>
          {post.data.subtitle}
        </Text>
        <Text fontSize='md' color='gray.600'>
          {new Date(post.data.date).toDateString()}
        </Text>
        <Box
          className='markdown-body'
          color='gray.800'
          fontSize='lg'
          lineHeight='tall'>
          <Markdown>{post.content}</Markdown>
        </Box>
      </VStack>
    </Box>
  );
}
