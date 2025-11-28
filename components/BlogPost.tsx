"use client";

import {
  Box,
  VStack,
  Heading,
  Text,
  useColorModeValue,
  Code,
  chakra,
  Button,
  HStack,
  Flex,
  Grid,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
import Markdown from "markdown-to-jsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import TableOfContents, { Heading as HeadingType } from "./TableOfContents";

interface BlogPostProps {
  title: string;
  subtitle: string;
  date: string;
  content: string;
}

const ChakraMarkdown = chakra(Markdown);

// Function to create a URL-friendly slug
const createSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

export default function BlogPost({
  title,
  subtitle,
  date,
  content,
}: BlogPostProps) {
  const textColor = useColorModeValue("gray.800", "gray.200");
  const subtitleColor = useColorModeValue("gray.600", "gray.400");
  const dateColor = useColorModeValue("gray.500", "gray.400");
  const bgColor = useColorModeValue("gray.50", "gray.700");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const estimateReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const wordCount = text.split(" ").length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  // Extract headings from the markdown content
  const headings =
    content.match(/^(##)\s(.+)/gm)?.map((heading): HeadingType => {
      const level = 2; // Always level 2 for h2
      const text = heading.replace(/^(##)\s/, "").trim();
      const slug = createSlug(text);
      return { level, text, slug };
    }) || [];

  return (
    <Box as='main' mb={10}>
      <Grid
        templateColumns={{ base: "1fr", lg: "1fr 300px" }}
        gap={12}
        w={["90%", "85%", "80%"]}
        maxW='1200px'
        mx='auto'
        mt={{ base: 8, md: 16 }}
        pb={{ base: 16, md: 20 }}
        alignItems='start'>
        <VStack spacing={8} align='start'>
          <Button
            as={Link}
            href='/blog'
            variant='ghost'
            leftIcon={<ArrowBackIcon />}
            size='sm'
            mb={4}>
            Back to Blog
          </Button>
          <VStack spacing={4} align='start' w='full'>
            <Heading
              as='h1'
              fontSize={["3xl", "4xl", "5xl"]}
              color={textColor}
              lineHeight='1.2'>
              {title}
            </Heading>
            <Text fontSize='lg' color={subtitleColor} lineHeight='1.5'>
              {subtitle}
            </Text>
            <Text fontSize='sm' color={dateColor}>
              {formatDate(date)} • {estimateReadingTime(content)} min read
            </Text>
          </VStack>

          <Box w='full' pt={8}>
            <ChakraMarkdown
              options={{
                overrides: {
                  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
                    const text = props.children?.toString() || "";
                    const slug = createSlug(text);
                    return (
                      <Heading
                        as='h2'
                        id={slug}
                        size='lg'
                        mt={6}
                        mb={3}
                        color={textColor}
                        {...props}
                      />
                    );
                  },
                  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
                    const text = props.children?.toString() || "";
                    const slug = createSlug(text);
                    return (
                      <Heading
                        as='h3'
                        id={slug}
                        size='md'
                        mt={4}
                        mb={2}
                        color={textColor}
                        {...props}
                      />
                    );
                  },
                  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
                    <Text
                      mb={4}
                      color={textColor}
                      lineHeight='1.7'
                      {...props}
                    />
                  ),
                  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
                    <chakra.ul pl={6} mb={4} color={textColor} {...props} />
                  ),
                  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
                    <chakra.ol pl={6} mb={4} color={textColor} {...props} />
                  ),
                  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
                    <chakra.li mb={2} {...props} />
                  ),
                  code: ({
                    className,
                    children,
                  }: {
                    className?: string;
                    children: React.ReactNode;
                  }) => {
                    const match = /language-(\w+)/.exec(className || "");
                    return match ? (
                      <Box overflow='hidden' borderRadius='md' my={6}>
                        <SyntaxHighlighter
                          language={match[1]}
                          style={a11yDark}
                          customStyle={{
                            margin: 0,
                            padding: "1.5rem",
                            borderRadius: "0.375rem",
                          }}>
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      </Box>
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
          </Box>
        </VStack>
        <Box
          position='sticky'
          top='8rem'
          display={{ base: "none", lg: "block" }}>
          <TableOfContents headings={headings} />
        </Box>
      </Grid>
    </Box>
  );
}
