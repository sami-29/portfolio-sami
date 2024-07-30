"use client";

import {
  Box,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import AboutCard from "../../components/AboutCard";
import cards from "./aboutData";
import SEO from "../../components/SEO";

export default function About() {
  const mostlyUsed = cards.filter((card) => card.MostlyUsed === true);
  const otherTechnologies = cards.filter((card) => card.MostlyUsed === false);
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.300");

  return (
    <>
      <SEO
        title='About'
        description='Learn about Sami Bentaleb, a fullstack web developer with 4 years of experience in building projects and freelancing.'
        canonical='https://www.samibentaleb.com/about'
        ogImage='https://www.samibentaleb.com/about-og-image.jpg'
      />
      <Box as='main' mb={10}>
        <VStack
          spacing={8}
          align='start'
          w={["90%", "75%", "50%"]}
          mx='auto'
          mt={24}>
          <Heading as='h1' fontSize={["4xl", "5xl", "6xl"]} color={textColor}>
            About Me
          </Heading>
          <Text fontSize='lg' color={subTextColor}>
            I&apos;m Bentaleb Sami, a full stack web developer with more than 4
            years of experience in creating comprehensive web solutions. My
            journey in web development has led me to work on a diverse range of
            projects, honing my skills in both front-end and back-end
            technologies.
            <br />
            <br />
            Some of the notable projects I&apos;ve worked on include: • A
            dynamic music platform with user accounts and playlist management •
            A portfolio website for an architect with an image viewer, 3D
            viewing capabilities, flipbook integration and a music player • A
            Maritime Risk Assessment Engine with complex data visualization and
            filtering • An annotation and text analysis platform for a research
            institution
            <br />
            <br />
            I approach each project with a focus on creating intuitive user
            interfaces, efficient backend systems, and seamless integration
            between the two. My goal is always to deliver web solutions that not
            only look great but also perform exceptionally well.
            <br />
            <br />
            With a background in Computer Science, I continually expand my
            knowledge to stay current with the latest web development trends and
            best practices. This allows me to provide innovative and efficient
            solutions to meet diverse client needs.
            <br />
            <br />I invite you to explore my portfolio to see examples of my
            work. Whether you need a new website, want to upgrade an existing
            one, or have a custom web application in mind, I&apos;m here to help
            bring your vision to reality. Let&apos;s collaborate and create a
            standout web presence for your business or project.
          </Text>
          <Heading
            as='h2'
            fontSize={["3xl", "4xl", "5xl"]}
            color={textColor}
            mt={8}>
            Mostly Used Tools
          </Heading>
          <Text fontSize='lg' color={textColor}>
            The tools I most frequently use while developing.
          </Text>
        </VStack>
        <SimpleGrid
          columns={[1, 2, 3, 4]}
          spacing={10}
          px={4}
          mx='auto'
          maxW='container.xl'
          mt={8}>
          {mostlyUsed.map((card, index) => (
            <AboutCard
              key={index}
              src={card.src}
              title={card.title}
              description={card.description}
            />
          ))}
        </SimpleGrid>
        <VStack
          spacing={8}
          align='start'
          w={["90%", "75%", "50%"]}
          mx='auto'
          mt={24}>
          <Heading as='h2' fontSize={["3xl", "4xl", "5xl"]} color={textColor}>
            Other Technologies I Work With/Learning
          </Heading>
          <Text fontSize='lg' color={textColor}>
            Other tools and technologies that I am capable of working with or
            currently learning.
          </Text>
        </VStack>
        <SimpleGrid
          columns={[1, 2, 3, 4]}
          spacing={10}
          px={4}
          mx='auto'
          maxW='container.xl'
          mt={8}>
          {otherTechnologies.map((card, index) => (
            <AboutCard
              key={index}
              src={card.src}
              title={card.title}
              description={card.description}
            />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
}
