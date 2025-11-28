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
} from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";
import Project from "../../components/Project";
import projectsData from "./projectsData";
import SEO from "../../components/SEO";
import { useState, useEffect } from "react";

export default function Projects() {
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.300");
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

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
    <>
      <SEO
        title='Projects'
        description='Explore a selection of recent projects and experiences by Sami Bentaleb, a fullstack web developer.'
        path='/projects'
      />
      <Box as='main' position='relative' pb={16}>
        <Container maxW='7xl' px={{ base: 4, md: 8 }} mt={{ base: 8, md: 16 }}>
          <Heading
            as='h1'
            fontSize={["4xl", "5xl", "6xl"]}
            color={textColor}
            mb={4}>
            Projects
          </Heading>
          <Text fontSize='lg' color={subTextColor} mb={8}>
            Here&apos;s a small selection of some of my recent projects and
            experiences.
          </Text>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={{ base: 8, lg: 10 }}>
            {projectsData.map((project, index) => (
              <Project
                key={index}
                images={project.images}
                title={project.title}
                description={project.description}
                slug={project.slug}
                tags={project.tags}
              />
            ))}
          </SimpleGrid>
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
              boxShadow='lg'>
              <ArrowUpIcon w={7} h={7} />
            </Button>
          </Tooltip>
        )}
      </Box>
    </>
  );
}
