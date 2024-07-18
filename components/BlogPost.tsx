"use client";

import {
  Box,
  VStack,
  Heading,
  Text,
  useColorModeValue,
  Code,
} from "@chakra-ui/react";
import Markdown from "markdown-to-jsx";

interface BlogPostProps {
  title: string;
  subtitle: string;
  date: string;
  content: string;
}

export default function BlogPost({
  title,
  subtitle,
  date,
  content,
}: BlogPostProps) {
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
          {title}
        </Heading>
        <Text fontSize='xl' color={subtitleColor}>
          {subtitle}
        </Text>
        <Text fontSize='md' color={subtitleColor}>
          {new Date(date).toDateString()}
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
                    <Code
                      colorScheme='gray'
                      p={2}
                      borderRadius='md'
                      whiteSpace='pre-wrap'>
                      {children}
                    </Code>
                  );
                },
              },
            }}>
            {content}
          </Markdown>
        </Box>
      </VStack>
    </Box>
  );
}
