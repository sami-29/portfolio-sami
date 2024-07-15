"use client";

import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  useColorModeValue,
  Button,
  Tooltip,
  Container,
  Divider,
} from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";
import Project from "../../components/Project";
import projectsData from "./projectsData";
import { useState, useEffect } from "react";

export default function ProjectsContent() {
  const textColor = useColorModeValue("gray.900", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.300");
  const sectionLabelColor = useColorModeValue("gray.400", "gray.500");
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
    <Box as='main' position='relative' pb={16}>
      <Container maxW='7xl' px={{ base: 4, md: 8 }} mt={{ base: 8, md: 16 }}>
        <Heading as='h1' fontSize={["4xl", "5xl", "6xl"]} color={textColor} mb={3}>
          Projects
        </Heading>
        <Text fontSize='lg' color={subTextColor} mb={12}>
          Selected work across website development, smart city platforms, pharmacy
          automation, and dashboard tools.
        </Text>

        {/* Featured tier */}
        <Text
          fontSize='xs'
          fontWeight='700'
          color={sectionLabelColor}
          letterSpacing='widest'
          textTransform='uppercase'
          mb={6}>
          Featured
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 6, lg: 8 }} mb={16}>
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
            <Divider mb={10} />
            <Text
              fontSize='xs'
              fontWeight='700'
              color={sectionLabelColor}
              letterSpacing='widest'
              textTransform='uppercase'
              mb={6}>
              Other Work
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 6, lg: 8 }} mb={16}>
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
            <Divider mb={10} />
            <Text
              fontSize='xs'
              fontWeight='700'
              color={sectionLabelColor}
              letterSpacing='widest'
              textTransform='uppercase'
              mb={2}>
              Client Sites
            </Text>
            <Text fontSize='sm' color={subTextColor} mb={8}>
              Shipped frontend work for real clients.
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 6, lg: 8 }}>
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
        <Tooltip label='Scroll to top' placement='left'>
          <Button
            position='fixed'
            bottom='40px'
            right='40px'
            onClick={scrollToTop}
            w={14}
            h={14}
            borderRadius='full'
            boxShadow='lg'
            aria-label='Scroll to top'
            _focusVisible={{ boxShadow: "outline" }}>
            <ArrowUpIcon w={7} h={7} />
          </Button>
        </Tooltip>
      )}
    </Box>
  );
}
