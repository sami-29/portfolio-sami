"use client";

import {
  Box,
  VStack,
  Heading,
  Text,
  useColorModeValue,
  Code,
  chakra,
} from "@chakra-ui/react";
import Markdown from "markdown-to-jsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

interface BlogPostProps {
  title: string;
  subtitle: string;
  date: string;
  content: string;
}

const ChakraMarkdown = chakra(Markdown);

export default function BlogPost({
  title,
  subtitle,
  date,
  content,
}: BlogPostProps) {
  const textColor = useColorModeValue("gray.800", "gray.200");
  const subtitleColor = useColorModeValue("gray.600", "gray.400");
  const bgColor = useColorModeValue("gray.50", "gray.700");

  return (
    <Box as='main' py={8}>
      <VStack
        spacing={8}
        align='start'
        w={["90%", "75%", "50%"]}
        mx='auto'
        mt={24}>
        <Heading as='h1' fontSize={["4xl", "5xl", "6xl"]} color={textColor}>
          {title}
        </Heading>
        <Text fontSize='xl' color={subtitleColor}>
          {subtitle}
        </Text>
        <Text fontSize='md' color={subtitleColor}>
          {new Date(date).toDateString()}
        </Text>
        <ChakraMarkdown
          options={{
            overrides: {
              h1: (props) => (
                <Heading as='h1' size='2xl' mt={8} mb={4} {...props} />
              ),
              h2: (props) => (
                <Heading as='h2' size='xl' mt={6} mb={3} {...props} />
              ),
              h3: (props) => (
                <Heading as='h3' size='lg' mt={4} mb={2} {...props} />
              ),
              p: (props) => <Text mb={4} {...props} />,
              ul: (props) => <chakra.ul pl={4} mb={4} {...props} />,
              ol: (props) => <chakra.ol pl={4} mb={4} {...props} />,
              li: (props) => <chakra.li mb={2} {...props} />,
              code: ({ className, children }) => {
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    language={match[1]}
                    style={tomorrow}
                    customStyle={{
                      margin: "1.5rem 0",
                      borderRadius: "0.375rem",
                    }}>
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <Code
                    colorScheme='gray'
                    px={2}
                    py={1}
                    borderRadius='md'
                    fontSize='0.875em'
                    bg={bgColor}>
                    {children}
                  </Code>
                );
              },
            },
          }}>
          {content}
        </ChakraMarkdown>
      </VStack>
    </Box>
  );
}
