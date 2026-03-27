"use client";

import { Box, SimpleGrid, Heading, Text, Button, Container, Separator } from "@chakra-ui/react";
import { Tooltip } from "../../components/ui/tooltip";
import { ArrowUp } from "lucide-react";
import Project from "../../components/Project";
import projectsData from "./projectsData";
import { useState, useEffect } from "react";

export default function ProjectsContent() {
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  const featuredProjects = projectsData.filter((p) => p.featured);
  const otherProjects = projectsData.filter((p) => !p.featured && !p.clientSite);
  const clientSites = projectsData.filter((p) => p.clientSite);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTopButton(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box as="main" position="relative" pb={16}>
      <Container maxW="7xl" px={{ base: 4, md: 8 }} mt={{ base: 8, md: 16 }}>
        <Heading
          as="h1"
          fontSize={["4xl", "5xl", "6xl"]}
          color={{ base: "gray.900", _dark: "white" }}
          mb={3}>
          Projects
        </Heading>
        <Text fontSize="lg" color={{ base: "gray.600", _dark: "gray.300" }} mb={12}>
          Selected work across website development, smart city platforms, pharmacy automation, and
          dashboard tools.
        </Text>

        {/* Featured tier */}
        <Text
          fontSize="xs"
          fontWeight="700"
          color={{ base: "gray.400", _dark: "gray.500" }}
          letterSpacing="widest"
          textTransform="uppercase"
          mb={6}>
          Featured
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: 6, lg: 8 }} mb={16}>
          {featuredProjects.map((project) => (
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

        {/* Other work tier */}
        {otherProjects.length > 0 && (
          <>
            <Separator mb={10} />
            <Text
              fontSize="xs"
              fontWeight="700"
              color={{ base: "gray.400", _dark: "gray.500" }}
              letterSpacing="widest"
              textTransform="uppercase"
              mb={6}>
              Other Work
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: 6, lg: 8 }} mb={16}>
              {otherProjects.map((project) => (
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
          </>
        )}

        {/* Client sites tier */}
        {clientSites.length > 0 && (
          <>
            <Separator mb={10} />
            <Text
              fontSize="xs"
              fontWeight="700"
              color={{ base: "gray.400", _dark: "gray.500" }}
              letterSpacing="widest"
              textTransform="uppercase"
              mb={2}>
              Client Sites
            </Text>
            <Text fontSize="sm" color={{ base: "gray.600", _dark: "gray.300" }} mb={8}>
              Shipped frontend work for real clients.
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: 6, lg: 8 }}>
              {clientSites.map((project) => (
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
          </>
        )}
      </Container>

      {showScrollTopButton && (
        <Tooltip content="Scroll to top" positioning={{ placement: "left" }}>
          <Button
            position="fixed"
            bottom="40px"
            right="40px"
            onClick={scrollToTop}
            w={14}
            h={14}
            borderRadius="full"
            boxShadow="lg"
            aria-label="Scroll to top"
            _focusVisible={{ boxShadow: "outline" }}>
            <ArrowUp size={28} />
          </Button>
        </Tooltip>
      )}
    </Box>
  );
}
