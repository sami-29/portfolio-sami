"use client";

import { Box, Heading, Text, Button, VStack, HStack, SimpleGrid } from "@chakra-ui/react";
import { motion, AnimatePresence } from "motion/react";
import { toaster } from "../components/ui/toaster";
import { Tooltip } from "../components/ui/tooltip";
import Project from "../components/Project";
import projectsData from "./projects/projectsData";
import Link from "next/link";
import { Copy, Mail, Check } from "lucide-react";
import { FaDiscord, FaLinkedin } from "react-icons/fa";
import { portfolioConfig } from "../utils/config";
import { SOCIAL_LINKS } from "../utils/constants";
import { easing, stagger } from "../utils/motion";
import { useState, useEffect } from "react";
import ShaderBackground from "../components/ShaderBackground";

// ─── Animation variants ────────────────────────────────────────────────────────

const heroContainer = {
  initial: {},
  animate: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: stagger.normal,
    },
  },
};

const heroItem = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
};

const heroItemTransition = { duration: 0.65, ease: easing.outQuart };

const cardContainer = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: stagger.fast, delayChildren: 0.05 },
  },
  viewport: { once: true, margin: "-60px" },
};

const cardItem = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: easing.outQuart },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function HomeContent() {
  const [copied, setCopied] = useState(false);

  // Console easter egg
  useEffect(() => {
    console.log(
      "%cLooking under the hood? %cLet's talk.",
      "color: #FFB300; font-size: 16px; font-weight: bold; font-family: 'Space Grotesk', sans-serif;",
      "color: #a1a1ac; font-size: 14px; font-family: 'Inter', sans-serif;"
    );
    console.log(
      "%csami.bentaleb@live.fr",
      "color: #FFD54F; font-size: 13px; font-family: 'JetBrains Mono', monospace;"
    );
  }, []);

  const copyDiscordUsername = () => {
    try {
      navigator.clipboard.writeText(SOCIAL_LINKS.discord);
      setCopied(true);
      toaster.success({
        title: "Discord username copied!",
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toaster.error({
        title: "Failed to copy",
        duration: 2000,
      });
    }
  };

  const featuredProjects = projectsData.filter((p) => p.featured);

  return (
    <Box as="main" id="main-content" mb={16}>
      {/* ── Hero (with scroll-driven parallax via CSS class) ── */}
      <Box className="hero-parallax-content" position="relative" overflow="hidden">
        <ShaderBackground />
        <motion.div
          variants={heroContainer}
          initial="initial"
          animate="animate"
          style={{ position: "relative", zIndex: 1 }}>
          <VStack
            w={["90%", "75%", "60%"]}
            mx="auto"
            mt={{ base: 10, md: 20 }}
            gap={{ base: 5, md: 6 }}
            align="start">
            {/* Eyebrow label */}
            <motion.div
              variants={heroItem}
              transition={heroItemTransition}
              style={{ width: "100%" }}>
              <Text
                fontSize="sm"
                fontWeight="600"
                color="brand.400"
                letterSpacing="widest"
                textTransform="uppercase"
                fontFamily="heading">
                Full-Stack Engineer
              </Text>
            </motion.div>

            {/* Name */}
            <motion.div
              variants={heroItem}
              transition={heroItemTransition}
              style={{ width: "100%" }}>
              <Heading
                as="h1"
                fontSize={["4xl", "5xl", "6xl"]}
                color="gray.100"
                lineHeight="1.05"
                letterSpacing="-0.03em"
                fontFamily="heading"
                fontWeight="700">
                Sami Bentaleb
              </Heading>
            </motion.div>

            {/* Description */}
            <motion.div
              variants={heroItem}
              transition={heroItemTransition}
              style={{ width: "100%" }}>
              <Text
                fontSize={["lg", "xl"]}
                color="gray.400"
                maxW="2xl"
                lineHeight="1.75"
                fontFamily="body">
                I build websites and web apps. Most of what I work on is data-heavy: dashboards
                where the data model matters as much as the interface, internal tools with real
                workflows, and platforms that stay usable when the data gets large.
              </Text>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={heroItem}
              transition={heroItemTransition}
              style={{ width: "100%" }}>
              <HStack gap={3} flexWrap="wrap" pt={1}>
                {portfolioConfig.social.showGithub && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    aria-label="GitHub"
                    borderColor="gray.700"
                    color="gray.300"
                    _hover={{
                      borderColor: "brand.400",
                      color: "brand.400",
                      transform: "translateY(-2px)",
                    }}
                    transition="transform 0.2s var(--ease-out-quart), color 0.2s, border-color 0.2s">
                    <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  </Button>
                )}

                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  borderColor="gray.700"
                  color="gray.300"
                  _hover={{
                    borderColor: "brand.400",
                    color: "brand.400",
                    transform: "translateY(-2px)",
                  }}
                  transition="transform 0.2s var(--ease-out-quart), color 0.2s, border-color 0.2s">
                  <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                    LinkedIn
                  </a>
                </Button>

                <Tooltip content="Click to copy Discord username" showArrow>
                  <Button
                    onClick={copyDiscordUsername}
                    variant="outline"
                    size="sm"
                    borderColor="gray.700"
                    color="gray.300"
                    _hover={{
                      borderColor: "brand.400",
                      color: "brand.400",
                      transform: "translateY(-2px)",
                    }}
                    transition="transform 0.2s var(--ease-out-quart), color 0.2s, border-color 0.2s">
                    <FaDiscord />
                    Discord
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={copied ? "check" : "copy"}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.18, ease: easing.outQuart }}
                        style={{ display: "inline-flex", alignItems: "center" }}>
                        {copied ? <Check size={14} color="#FFC107" /> : <Copy size={14} />}
                      </motion.span>
                    </AnimatePresence>
                  </Button>
                </Tooltip>

                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  color="gray.400"
                  _hover={{
                    color: "brand.400",
                    transform: "translateY(-2px)",
                  }}
                  transition="transform 0.2s var(--ease-out-quart), color 0.2s">
                  <a href={`mailto:${SOCIAL_LINKS.email}`}>
                    <Mail size={14} />
                    {SOCIAL_LINKS.email}
                  </a>
                </Button>
              </HStack>
            </motion.div>
          </VStack>
        </motion.div>
      </Box>

      {/* ── Featured Projects ── */}
      <VStack
        w="full"
        gap={8}
        mt={{ base: 20, md: 32 }}
        maxW="container.xl"
        mx="auto"
        px={{ base: 4, md: 8 }}>
        {/* Section header */}
        <motion.div
          style={{ width: "100%" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easing.outQuart }}>
          <HStack w="full" justify="space-between" align="baseline">
            <Heading
              as="h2"
              fontSize={["2xl", "3xl"]}
              color="gray.100"
              fontFamily="heading"
              fontWeight="700"
              letterSpacing="-0.02em">
              Featured Projects
            </Heading>
            <Link href="/projects" style={{ fontSize: "0.875rem", fontWeight: 600 }}>
              <Text
                color="brand.400"
                _hover={{ color: "brand.300", textDecoration: "underline" }}
                transition="color 0.2s">
                All projects →
              </Text>
            </Link>
          </HStack>
        </motion.div>

        <motion.div
          style={{ width: "100%" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: easing.outQuart, delay: 0.08 }}>
          <Text fontSize="md" color="gray.500" maxW="2xl">
            Maritime risk analysis, pharmacy automation, a city data platform, and personal tools.
          </Text>
        </motion.div>

        {/* Cards with stagger */}
        <motion.div
          style={{ width: "100%" }}
          variants={cardContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-60px" }}>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} w="full">
            {featuredProjects.slice(0, 4).map((project) => (
              <motion.div key={project.slug} variants={cardItem}>
                <Project
                  images={project.images}
                  title={project.title}
                  subtitle={project.subtitle}
                  description={project.description}
                  slug={project.slug}
                  tags={project.tags}
                />
              </motion.div>
            ))}
          </SimpleGrid>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: easing.outQuart }}>
          <Button
            asChild
            size="lg"
            variant="outline"
            mt={2}
            borderColor="gray.700"
            color="gray.300"
            _hover={{
              borderColor: "brand.400",
              color: "brand.400",
              transform: "translateY(-2px)",
            }}
            transition="transform 0.2s var(--ease-out-quart), color 0.2s, border-color 0.2s">
            <Link href="/projects">See all projects</Link>
          </Button>
        </motion.div>
      </VStack>
    </Box>
  );
}
