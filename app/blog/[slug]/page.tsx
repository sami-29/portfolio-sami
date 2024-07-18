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
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

export default function Post(props: urlParamType) {
  const slug = props.params.slug;
  const post = getPostContent(slug);
  const textColor = useColorModeValue("gray.800", "gray.200");
  const subtitleColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Box as='main'>
      <VStack
        spacing={8}
        align='start'
        w={["90%", "75%", "50%"]}
        mx='auto'
        mt={24}>
        <Heading as='h1' fontSize={["4xl", "5xl", "6xl"]} color={textColor}>
          {post.data.title}
        </Heading>
        <Text fontSize='xl' color={subtitleColor}>
          {post.data.subtitle}
        </Text>
        <Text fontSize='md' color={subtitleColor}>
          {new Date(post.data.date).toDateString()}
        </Text>
        <Box
          className='markdown-body'
          color={textColor}
          fontSize='lg'
          lineHeight='tall'>
          <Markdown
            options={{
              overrides: {
                code: ({ children }) => {
                  return (
                    <SyntaxHighlighter language="javascript" style={atomOneDark}>
                      {children}
                    </SyntaxHighlighter>
                  );
                },
              },
            }}
          >
            {post.content}
          </Markdown>
        </Box>
      </VStack>
    </Box>
  );
}
