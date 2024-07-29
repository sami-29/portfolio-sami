"use client";

import {
  Box,
  VStack,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Project from "../../components/Project";
import projectsData from "./projectsData";
import SEO from "../../components/SEO";

export default function Projects() {
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.300");

  return (
    <>
      <SEO
        title='Projects'
        description='Explore a selection of recent projects and experiences by Sami Bentaleb, a fullstack web developer.'
        canonical='https://portfolio-sami.vercel.app/projects'
        ogImage='https://portfolio-sami.vercel.app/og-image.jpg'
      />
      <Box as='main'>
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
      </Box>
    </>
  );
}
