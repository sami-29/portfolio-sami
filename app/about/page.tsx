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
        path='/about'
      />
      <Box as='main' mb={10}>
        <VStack
          spacing={8}
          align='start'
          w={["90%", "75%", "60%"]}
          mx='auto'
          mt={{ base: 8, md: 16 }}>
          <Heading as='h1' fontSize={["4xl", "5xl", "6xl"]} color={textColor}>
            About Me
          </Heading>
          <Text fontSize='lg' color={subTextColor}>
            I&apos;m Bentaleb Sami, a full-stack web developer with over five
            years of experience crafting comprehensive and user-centric web
            solutions. My passion for development has led me to work on a
            variety of exciting projects, allowing me to build a robust skill
            set in both front-end and back-end technologies.
            <br />
            <br />
            Some of my recent projects include:
            <br />
            <br />
            <ul
              style={{
                marginLeft: 32,
              }}>
              <li>
                <b>2scl:</b> An in-development platform designed to help cities
                track and manage their sustainable development goals, featuring
                AI assistance, budget and resource tracking, and both automated
                and manual data integration.
              </li>
              <li>
                <b>MARE (Maritime Risk Assessment Engine):</b> A sophisticated
                data visualization tool for the maritime industry, built with
                Mapbox, Turf, and D3.js.
              </li>
              <li>
                <b>TrackTalk:</b> A music streaming platform with user accounts
                and playlist management, developed using Next.js and Supabase.
              </li>
              <li>
                <b>E-TASC:</b> An annotation and text analysis platform for a
                research institution, featuring NLP capabilities.
              </li>
            </ul>
            <br />
            <br />
            I thrive on creating intuitive user interfaces, architecting
            efficient back-end systems, and ensuring seamless integration
            between them. My goal is to deliver web solutions that are not only
            visually appealing but also high-performing and scalable. With a
            solid foundation in Computer Science, I am committed to staying at
            the forefront of web development trends and best practices.
            <br />
            <br />I invite you to explore my portfolio to see these projects and
            more. Whether you have an idea for a new website, need to enhance an
            existing one, or are looking for a custom web application, I&apos;m
            ready to help bring your vision to life. Let&apos;s collaborate to
            create a powerful web presence for your business or project.
          </Text>
          <Heading
            as='h2'
            fontSize={["3xl", "4xl", "5xl"]}
            color={textColor}
            mt={8}>
            Mostly Used Tools
          </Heading>
          <Text fontSize='lg' color={textColor}>
            Here are some of the key technologies and tools I frequently use in
            my development process:
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
              website={card.website}
            />
          ))}
        </SimpleGrid>
        <VStack
          spacing={8}
          align='start'
          w={["90%", "75%", "60%"]}
          mx='auto'
          mt={24}>
          <Heading as='h2' fontSize={["3xl", "4xl", "5xl"]} color={textColor}>
            Other Technologies
          </Heading>
          <Text fontSize='lg' color={textColor}>
            Other technologies that I&apos;ve worked with or currently learning:
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
              website={card.website}
            />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
}
