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
        title="About"
        description="Learn about Sami Bentaleb, a fullstack web developer with 4 years of experience in building projects and freelancing."
        canonical="https://www.samibentaleb.com/about"
        ogImage="https://www.samibentaleb.com/about-og-image.jpg"
      />
      <Box as='main' mb={10}>
        <VStack
          spacing={8}
          align='start'
          w={["90%", "75%", "50%"]}
          mx='auto'
          mt={24}>
          <Heading as='h1' fontSize={["4xl", "5xl", "6xl"]} color={textColor}>
            About me
          </Heading>
          <Text fontSize='lg' color={subTextColor}>
            Welcome to my portfolio! My name is Bentaleb Sami, a full-stack web
            developer with a passion for creating visually appealing and
            user-friendly websites. With 4 years of experience in both building
            projects and freelancing, I am a dedicated and skilled developer who
            is always looking for new challenges. As a computer science student
            at the University of Badji Moukhtar Annaba, I am constantly
            expanding my knowledge and experience in the field.
            <br />
            <br />
            I specialize in creating interactive and responsive websites that
            are not only visually stunning, but also easy to navigate and use. I
            have a strong understanding of web development technologies such as
            HTML, CSS, JavaScript, and various frameworks and libraries. I also
            have experience working with various back-end technologies such as
            Node.js and PHP, ensuring that your website not only looks great but
            also functions smoothly.
            <br />
            <br />
            I take pride in my attention to detail and strive to deliver
            high-quality work. I am a strong collaborator and communicator, and
            I enjoy working with clients to understand their needs and bring
            their vision to life.
            <br />
            <br />
            Take a look at my portfolio to see some of my previous work and
            don&apos;t hesitate to contact me if you have any questions or are
            interested in working together. Let&apos;s bring your next project
            to life!
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
