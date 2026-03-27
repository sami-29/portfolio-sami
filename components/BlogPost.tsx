"use client";

import { Box, VStack, Heading, Text, Code, Button, Grid } from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
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
  const textColor = useColorModeValue("gray.800", "gray.200");
  const subtitleColor = useColorModeValue("gray.600", "gray.400");
  const dateColor = useColorModeValue("gray.500", "gray.400");
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const speeedyBorder = useColorModeValue("purple.200", "purple.700");
  const speeedyBg = useColorModeValue("purple.50", "purple.900");
  const speeedyBgHover = useColorModeValue("purple.100", "purple.800");
  const speeedyBorderHover = useColorModeValue("purple.400", "purple.500");
  const speeedyHeading = useColorModeValue("purple.700", "purple.300");
  const speeedySubtext = useColorModeValue("purple.500", "purple.400");
  const speeedyIcon = useColorModeValue("purple.600", "purple.300");

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
            <Heading as="h1" fontSize={["3xl", "4xl", "5xl"]} color={textColor} lineHeight="1.2">
              {title}
            </Heading>
            <Text fontSize="lg" color={subtitleColor} lineHeight="1.5">
              {subtitle}
            </Text>
            <Text fontSize="sm" color={dateColor}>
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
              borderColor={speeedyBorder}
              bg={speeedyBg}
              _hover={{
                bg: speeedyBgHover,
                borderColor: speeedyBorderHover,
                textDecoration: "none",
              }}
              transition="all 0.15s ease">
              <a href={speeedyUrl} target="_blank" rel="noopener noreferrer">
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" color={speeedyHeading}>
                    Read this in Speeedy
                  </Text>
                  <Text fontSize="xs" color={speeedySubtext} mt={0.5}>
                    Speed-read this article in your browser — no account needed
                  </Text>
                </Box>
                <Text fontSize="lg" color={speeedyIcon} ml={4} flexShrink={0}>
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
                      <Heading as="h2" id={slug} fontSize="2xl" mt={6} mb={3} color={textColor}>
                        {children}
                      </Heading>
                    );
                  },
                  h3: ({ children }: { children?: React.ReactNode }) => {
                    const text = children?.toString() || "";
                    const slug = createSlug(text);
                    return (
                      <Heading as="h3" id={slug} fontSize="xl" mt={4} mb={2} color={textColor}>
                        {children}
                      </Heading>
                    );
                  },
                  p: ({ children }: { children?: React.ReactNode }) => (
                    <Text mb={4} color={textColor} lineHeight="1.7">
                      {children}
                    </Text>
                  ),
                  ul: ({ children }: React.HTMLAttributes<HTMLUListElement>) => (
                    <Box as="ul" pl={6} mb={4} color={textColor} listStyleType="disc">
                      {children}
                    </Box>
                  ),
                  ol: ({ children }: React.HTMLAttributes<HTMLOListElement>) => (
                    <Box as="ol" pl={6} mb={4} color={textColor} listStyleType="decimal">
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
                        bg={bgColor}>
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
