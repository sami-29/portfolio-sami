"use client";

import { Box, VStack, Heading, Text, Code, Button, Grid } from "@chakra-ui/react";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Markdown from "markdown-to-jsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import TableOfContents, { Heading as HeadingType } from "./TableOfContents";
import ReadingProgress from "./ReadingProgress";
import { formatDate, estimateReadingTime } from "../utils/formatters";
import { easing } from "../utils/motion";
import { useEffect } from "react";

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
  // Console easter egg
  useEffect(() => {
    console.log("%c👋 Hey there!", "color: #FFC107; font-size: 1.2rem; font-weight: bold;");
    console.log(
      "%cLooking under the hood? I like your style.\nLet's talk → sami.bentaleb29@gmail.com",
      "color: #a1a1ac; font-size: 0.875rem; line-height: 1.6;"
    );
  }, []);

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
      <ReadingProgress />
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
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easing.outQuart }}>
            <Button asChild variant="ghost" size="sm" mb={4}>
              <Link href="/blog">
                <ArrowLeft size={16} />
                Back to Blog
              </Link>
            </Button>
          </motion.div>

          <VStack gap={4} align="start" w="full">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: easing.outQuart, delay: 0.1 }}
              style={{
                viewTransitionName: "blog-title",
              }}>
              <Heading
                as="h1"
                fontSize={["3xl", "4xl", "5xl"]}
                color="gray.100"
                lineHeight="1.1"
                letterSpacing="-0.03em"
                fontFamily="heading"
                fontWeight="700">
                {title}
              </Heading>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: easing.outQuart, delay: 0.2 }}>
              <Text fontSize="lg" color="gray.400" lineHeight="1.6" fontFamily="body">
                {subtitle}
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}>
              <Text fontSize="sm" color="gray.600" fontFamily="body">
                {formatDate(date)} · {estimateReadingTime(content)} min read
              </Text>
            </motion.div>
          </VStack>

          {speeedyUrl && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easing.outQuart, delay: 0.35 }}
              style={{ width: "100%" }}>
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
                borderColor="gray.800"
                bg="gray.900"
                _hover={{
                  borderColor: "brand.400",
                  bg: "gray.850",
                  textDecoration: "none",
                }}
                transition="background 0.2s var(--ease-out-quart), border-color 0.2s">
                <a href={speeedyUrl} target="_blank" rel="noopener noreferrer">
                  <Box>
                    <Text fontSize="sm" fontWeight="600" color="gray.200" fontFamily="body">
                      Read this in Speeedy
                    </Text>
                    <Text fontSize="xs" color="gray.500" mt={0.5} fontFamily="body">
                      Speed-read this article in your browser — no account needed
                    </Text>
                  </Box>
                  <Text fontSize="lg" ml={4} flexShrink={0}>
                    ⚡
                  </Text>
                </a>
              </Box>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ width: "100%" }}>
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
                          mt={8}
                          mb={3}
                          fontFamily="heading"
                          fontWeight="700"
                          letterSpacing="-0.02em"
                          color="gray.100">
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
                          mt={6}
                          mb={2}
                          fontFamily="heading"
                          fontWeight="600"
                          color="gray.200">
                          {children}
                        </Heading>
                      );
                    },
                    p: ({ children }: { children?: React.ReactNode }) => (
                      <Text
                        mb={5}
                        color="gray.300"
                        lineHeight="1.85"
                        fontFamily="body"
                        fontSize="1.0625rem">
                        {children}
                      </Text>
                    ),
                    ul: ({ children }: React.HTMLAttributes<HTMLUListElement>) => (
                      <Box
                        as="ul"
                        pl={6}
                        mb={5}
                        color="gray.300"
                        listStyleType="disc"
                        fontFamily="body">
                        {children}
                      </Box>
                    ),
                    ol: ({ children }: React.HTMLAttributes<HTMLOListElement>) => (
                      <Box
                        as="ol"
                        pl={6}
                        mb={5}
                        color="gray.300"
                        listStyleType="decimal"
                        fontFamily="body">
                        {children}
                      </Box>
                    ),
                    li: ({ children }: React.HTMLAttributes<HTMLLIElement>) => (
                      <Box as="li" mb={2} lineHeight="1.75" fontFamily="body">
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
                        <Box
                          overflow="hidden"
                          borderRadius="lg"
                          my={6}
                          border="1px solid"
                          borderColor="gray.800">
                          <SyntaxHighlighter
                            language={match[1]}
                            style={a11yDark}
                            customStyle={{
                              margin: 0,
                              padding: "1.5rem",
                              borderRadius: "0.5rem",
                              background: "#111113",
                              fontFamily: "var(--font-mono), 'Courier New', monospace",
                              fontSize: "0.875rem",
                            }}>
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        </Box>
                      ) : (
                        <Code
                          colorPalette="gray"
                          px={2}
                          py={0.5}
                          borderRadius="md"
                          fontSize="0.875em"
                          fontFamily="mono"
                          bg="gray.850"
                          color="brand.300">
                          {children}
                        </Code>
                      );
                    },
                  },
                }}>
                {content}
              </Markdown>
            </Box>
          </motion.div>
        </VStack>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: easing.outQuart, delay: 0.5 }}
          style={{ position: "sticky", top: "8rem" }}>
          <Box display={{ base: "none", lg: "block" }}>
            <TableOfContents headings={headings} />
          </Box>
        </motion.div>
      </Grid>
    </Box>
  );
}
