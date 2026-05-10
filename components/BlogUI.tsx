"use client";

import { Box, VStack, Heading, Text } from "@chakra-ui/react";
import { motion } from "motion/react";
import PostPreview from "./PostPreview";
import { PostMetadata } from "../utils/postTypes";
import { easing, stagger } from "../utils/motion";

interface BlogUIProps {
  postMetadata: PostMetadata[];
}

const listContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: stagger.fast, delayChildren: 0.35 },
  },
};

const listItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: easing.outQuart },
};

export default function BlogUI({ postMetadata }: BlogUIProps) {
  return (
    <Box as="main" id="main-content" mb={10}>
      <VStack gap={8} align="start" w={["90%", "75%", "60%"]} mx="auto" mt={{ base: 8, md: 16 }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: easing.outQuart }}>
          <Heading
            as="h1"
            fontSize={["4xl", "5xl", "6xl"]}
            color="gray.100"
            lineHeight="1.05"
            letterSpacing="-0.03em"
            fontFamily="heading"
            fontWeight="700">
            Blog
          </Heading>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: easing.outQuart, delay: 0.15 }}>
          <Text fontSize="lg" color="gray.400" fontFamily="body">
            Articles on website development, web performance, and projects I&apos;ve built.
          </Text>
        </motion.div>

        {postMetadata.length > 0 ? (
          <motion.div
            style={{ width: "100%" }}
            variants={listContainer}
            initial="initial"
            animate="animate">
            <VStack gap={0} w="full" mt={4}>
              {postMetadata.map((post) => (
                <motion.div key={post.slug} variants={listItem} style={{ width: "100%" }}>
                  <PostPreview {...post} />
                </motion.div>
              ))}
            </VStack>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}>
            <VStack gap={4} py={8} align="start" w="full">
              <Text color="gray.500" fontFamily="body">
                Posts incoming. Check back soon
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}>
                  ...
                </motion.span>
              </Text>
            </VStack>
          </motion.div>
        )}
      </VStack>
    </Box>
  );
}
