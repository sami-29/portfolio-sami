"use client";

import { Box, Heading, Text, Button, VStack, HStack, SimpleGrid } from "@chakra-ui/react";
import { toaster } from "../components/ui/toaster";
import { Tooltip } from "../components/ui/tooltip";
import Project from "../components/Project";
import projectsData from "./projects/projectsData";
import Link from "next/link";
import { Copy, Mail } from "lucide-react";
import { FaDiscord, FaLinkedin } from "react-icons/fa";
import { portfolioConfig } from "../utils/config";
import { SOCIAL_LINKS } from "../utils/constants";

export default function HomeContent() {
  const copyDiscordUsername = () => {
    try {
      navigator.clipboard.writeText(SOCIAL_LINKS.discord);
      toaster.success({
        title: "Discord username copied!",
        duration: 2000,
      });
    } catch {
      toaster.error({
        title: "Failed to copy",
        duration: 2000,
      });
    }
  };

  const featuredProjects = projectsData.filter((p) => p.featured);

  return (
    <Box as="main" mb={16}>
      {/* Hero */}
      <VStack
        w={["90%", "75%", "60%"]}
        mx="auto"
        mt={{ base: 10, md: 20 }}
        gap={{ base: 5, md: 6 }}
        align="start">
        <Text
          fontSize="sm"
          fontWeight="semibold"
          color={{ base: "blue.600", _dark: "blue.300" }}
          letterSpacing="widest"
          textTransform="uppercase">
          Full-Stack Engineer
        </Text>

        <Heading
          as="h1"
          fontSize={["4xl", "5xl", "6xl"]}
          color={{ base: "gray.900", _dark: "white" }}
          lineHeight="shorter">
          Sami Bentaleb
        </Heading>

        <Text
          fontSize={["lg", "xl"]}
          color={{ base: "gray.600", _dark: "gray.300" }}
          maxW="2xl"
          lineHeight="tall">
          I do website development and web app development: interfaces for complex data and
          dashboards where the data model matters as much as the UI, internal tools with real
          workflows, and platforms that stay usable when data gets messy or large. From website
          building for businesses to dashboard development, I focus on clean architecture and usable
          products.
        </Text>

        {/* Social links */}
        <HStack gap={4} flexWrap="wrap" pt={1}>
          {portfolioConfig.social.showGithub && (
            <Button asChild variant="outline" size="sm" aria-label="GitHub">
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </Button>
          )}
          <Button asChild variant="outline" size="sm">
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
              LinkedIn
            </a>
          </Button>
          <Tooltip content="Click to copy Discord username" showArrow>
            <Button onClick={copyDiscordUsername} variant="outline" size="sm">
              <FaDiscord />
              Discord
              <Copy size={14} />
            </Button>
          </Tooltip>
          <Button asChild variant="ghost" size="sm">
            <a href={`mailto:${SOCIAL_LINKS.email}`}>
              <Mail size={14} />
              {SOCIAL_LINKS.email}
            </a>
          </Button>
        </HStack>
      </VStack>

      {/* Featured projects */}
      <VStack
        w="full"
        gap={8}
        mt={{ base: 16, md: 24 }}
        maxW="container.xl"
        mx="auto"
        px={{ base: 4, md: 8 }}>
        <HStack w="full" justify="space-between" align="baseline">
          <Heading as="h2" fontSize={["2xl", "3xl"]} color={{ base: "gray.900", _dark: "white" }}>
            Featured Projects
          </Heading>
          <Link href="/projects" style={{ fontSize: "0.875rem", fontWeight: 600 }}>
            <Text
              color={{ base: "blue.600", _dark: "blue.300" }}
              _hover={{ textDecoration: "underline" }}>
              All projects →
            </Text>
          </Link>
        </HStack>
        <Text fontSize="md" color={{ base: "gray.600", _dark: "gray.300" }} maxW="2xl">
          Smart city platforms, pharmacy automation, dashboards, and web applications.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} w="full">
          {featuredProjects.slice(0, 4).map((project) => (
            <Project
              key={project.slug}
              images={project.images}
              title={project.title}
              subtitle={project.subtitle}
              description={project.description}
              slug={project.slug}
              tags={project.tags}
            />
          ))}
        </SimpleGrid>

        <Button asChild size="lg" variant="outline" mt={2}>
          <Link href="/projects">See all projects</Link>
        </Button>
      </VStack>
    </Box>
  );
}
