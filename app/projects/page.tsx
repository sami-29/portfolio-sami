"use client";

import {
  Box,
  VStack,
  Heading,
  Text,
  useColorModeValue,
  Button,
  Tooltip,
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
        canonical='https://portfolio-sami.vercel.app/projects'
        ogImage='https://portfolio-sami.vercel.app/og-image.jpg'
      />
      <Box as='main' position='relative' pb={16}>
        <VStack
          spacing={8}
          align='start'
          w={["90%", "75%", "50%"]}
          mx='auto'
          mt={24}>
          <Heading as='h1' fontSize={["4xl", "5xl", "6xl"]} color={textColor}>
            Projects
          </Heading>
          <Text fontSize='lg' color={subTextColor}>
            Here&apos;s a small selection of some of my recent projects and
            experiences.
          </Text>
          {projectsData.map((project, index) => (
            <Project
              key={index}
              img={project.img}
              title={project.title}
              description={project.description}
              siteUrl={project.siteUrl}
              githubUrl={project.githubUrl}
            />
          ))}
        </VStack>
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
