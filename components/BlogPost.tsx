"use client";

import { Box, VStack, Heading, Text, Code, Button, Grid } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Markdown from "markdown-to-jsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import TableOfContents, { Heading as HeadingType } from "./TableOfContents";
import { formatDate, estimateReadingTime } from "../utils/formatters";

interface BlogPostProps {
  title: string;
  subtitle: string;
  date: string;
  content: string;
  speeedyUrl?: string;
}

const createSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

export default function BlogPost({ title, subtitle, date, content, speeedyUrl }: BlogPostProps) {
  const headingLines = content.match(/^#{2,3}\s+.+$/gm) || [];
  const headings: HeadingType[] = headingLines.map((line): HeadingType => {
    const isH3 = line.startsWith("###");
    const level = isH3 ? 3 : 2;
    const text = line.replace(/^#{2,3}\s+/, "").trim();
    const slug = createSlug(text);
    return { level, text, slug };
  });

  return (
    <Box as="main" mb={10}>
      <Grid
        templateColumns={{ base: "1fr", lg: "1fr 300px" }}
        gap={12}
        w={["90%", "85%", "80%"]}
        maxW="1200px"
        mx="auto"
        mt={{ base: 8, md: 16 }}
        pb={{ base: 16, md: 20 }}
        alignItems="start">
        <VStack gap={8} align="start">
          <Button asChild variant="ghost" size="sm" mb={4}>
            <Link href="/blog">
              <ArrowLeft size={16} />
              Back to Blog
            </Link>
          </Button>
          <VStack gap={4} align="start" w="full">
            <Heading
              as="h1"
              fontSize={["3xl", "4xl", "5xl"]}
              color={{ base: "gray.800", _dark: "gray.200" }}
              lineHeight="1.2">
              {title}
            </Heading>
            <Text fontSize="lg" color={{ base: "gray.600", _dark: "gray.400" }} lineHeight="1.5">
              {subtitle}
            </Text>
            <Text fontSize="sm" color={{ base: "gray.500", _dark: "gray.400" }}>
              {formatDate(date)} · {estimateReadingTime(content)} min read
            </Text>
          </VStack>

          {speeedyUrl && (
            <Box
              asChild
              w="full"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              px={4}
              py={3}
              borderRadius="lg"
              border="1px solid"
              borderColor={{ base: "purple.200", _dark: "purple.700" }}
              bg={{ base: "purple.50", _dark: "purple.900" }}
              _hover={{
                bg: { base: "purple.100", _dark: "purple.800" },
                borderColor: { base: "purple.400", _dark: "purple.500" },
                textDecoration: "none",
              }}
              transition="all 0.15s ease">
              <a href={speeedyUrl} target="_blank" rel="noopener noreferrer">
                <Box>
                  <Text
                    fontSize="sm"
                    fontWeight="semibold"
                    color={{ base: "purple.700", _dark: "purple.300" }}>
                    Read this in Speeedy
                  </Text>
                  <Text fontSize="xs" color={{ base: "purple.500", _dark: "purple.400" }} mt={0.5}>
                    Speed-read this article in your browser — no account needed
                  </Text>
                </Box>
                <Text
                  fontSize="lg"
                  color={{ base: "purple.600", _dark: "purple.300" }}
                  ml={4}
                  flexShrink={0}>
                  ⚡
                </Text>
              </a>
            </Box>
          )}

          <Box w="full" pt={8}>
            <Markdown
              options={{
                forceBlock: true,
                overrides: {
                  h2: ({ children }: { children?: React.ReactNode }) => {
                    const text = children?.toString() || "";
                    const slug = createSlug(text);
                    return (
                      <Heading
                        as="h2"
                        id={slug}
                        fontSize="2xl"
                        mt={6}
                        mb={3}
                        color={{ base: "gray.800", _dark: "gray.200" }}>
                        {children}
                      </Heading>
                    );
                  },
                  h3: ({ children }: { children?: React.ReactNode }) => {
                    const text = children?.toString() || "";
                    const slug = createSlug(text);
                    return (
                      <Heading
                        as="h3"
                        id={slug}
                        fontSize="xl"
                        mt={4}
                        mb={2}
                        color={{ base: "gray.800", _dark: "gray.200" }}>
                        {children}
                      </Heading>
                    );
                  },
                  p: ({ children }: { children?: React.ReactNode }) => (
                    <Text mb={4} color={{ base: "gray.800", _dark: "gray.200" }} lineHeight="1.7">
                      {children}
                    </Text>
                  ),
                  ul: ({ children }: React.HTMLAttributes<HTMLUListElement>) => (
                    <Box
                      as="ul"
                      pl={6}
                      mb={4}
                      color={{ base: "gray.800", _dark: "gray.200" }}
                      listStyleType="disc">
                      {children}
                    </Box>
                  ),
                  ol: ({ children }: React.HTMLAttributes<HTMLOListElement>) => (
                    <Box
                      as="ol"
                      pl={6}
                      mb={4}
                      color={{ base: "gray.800", _dark: "gray.200" }}
                      listStyleType="decimal">
                      {children}
                    </Box>
                  ),
                  li: ({ children }: React.HTMLAttributes<HTMLLIElement>) => (
                    <Box as="li" mb={2}>
                      {children}
                    </Box>
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
                      <Box overflow="hidden" borderRadius="md" my={6}>
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
                        colorPalette="gray"
                        px={2}
                        py={1}
                        borderRadius="md"
                        fontSize="0.875em"
                        bg={{ base: "gray.50", _dark: "gray.700" }}>
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
        <Box position="sticky" top="8rem" display={{ base: "none", lg: "block" }}>
          <TableOfContents headings={headings} />
        </Box>
      </Grid>
    </Box>
  );
}
