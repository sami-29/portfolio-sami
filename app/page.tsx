"use client";

import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  useColorModeValue,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import Project from "../components/Project";
import projectsData from "./projects/projectsData";
import { Link } from "@chakra-ui/next-js";
import { Github, Linkedin, Copy } from "lucide-react";
import SEO from "../components/SEO";
import { FaDiscord } from "react-icons/fa";
import { portfolioConfig } from "../utils/config";
import {
  CONTENT_WIDTHS,
  SECTION_SPACING,
  SOCIAL_LINKS,
  YEARS_OF_EXPERIENCE,
} from "../utils/constants";

export default function Home() {
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.300");
  const toast = useToast();

  const copyDiscordUsername = () => {
    navigator.clipboard.writeText(SOCIAL_LINKS.discord);
    toast({
      title: "Discord username copied!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <>
      <SEO
        title='Home'
        description='Fullstack web developer creating interactive and responsive websites.'
        path='/'
      />
      <Box as='main' mb={10}>
        <VStack
          w={["90%", "75%", "60%"]}
          mx='auto'
          mt={{ base: 8, md: 16 }}
          spacing={{ base: 6, md: 8 }}
          align='start'>
          <Heading as='h1' fontSize={["4xl", "5xl", "6xl"]} color={textColor}>
            Hey! I&apos;m Sami a Full-stack Web Developer
          </Heading>
          <Text fontSize={["md", "lg", "xl"]} color={subTextColor}>
            Welcome to my portfolio. I&apos;m a full-stack web developer with
            over {YEARS_OF_EXPERIENCE} years of experience in freelancing and
            personal projects. My expertise lies in creating interactive
            websites, startups, and web applications. I specialize in both
            front-end and back-end technologies, as well as general programming
            skills ensuring efficient and user-friendly digital solutions from
            concept to deployment.
          </Text>
          <HStack spacing={4} flexWrap='wrap'>
            {portfolioConfig.social.showGithub && (
              <Link
                color={textColor}
                href={SOCIAL_LINKS.github}
                isExternal
                aria-label='Visit my GitHub profile'>
                <Github size={32} />
              </Link>
            )}
            <Link
              color={textColor}
              href={SOCIAL_LINKS.linkedin}
              isExternal
              aria-label='Connect with me on LinkedIn'>
              <Linkedin size={32} />
            </Link>
            <Tooltip label='Click to copy Discord username' hasArrow>
              <Button
                onClick={copyDiscordUsername}
                rightIcon={<Copy size={16} />}
                colorScheme='blue'
                variant='outline'>
                <FaDiscord size={32} />
              </Button>
            </Tooltip>
            <Tooltip label='Click to send an email' hasArrow>
              <Button
                as={Link}
                href={`mailto:${SOCIAL_LINKS.email}`}
                isExternal
                colorScheme='gray'
                variant='outline'
                px={6}
                py={2}
                borderRadius='full'>
                Email me
              </Button>
            </Tooltip>
          </HStack>
        </VStack>

        <VStack
          w='full'
          spacing={8}
          mt={{ base: 4, md: 6 }}
          maxW={"container.lg"}
          mx={"auto"}>
          <Heading as='h2' fontSize={["3xl", "4xl"]} color={textColor}>
            Featured Projects
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w='full' px={4}>
            {projectsData.slice(0, 2).map((project, index) => {
              const clientFocusedTags = project.tags?.filter(
                (tag) => !tag.label.toLowerCase().includes("github")
              );

              return (
                <Project
                  key={index}
                  images={project.images}
                  title={project.title}
                  description={project.description}
                  slug={project.slug}
                  tags={clientFocusedTags}
                />
              );
            })}
          </SimpleGrid>
          <Button as={Link} href='/projects' size='lg' variant='outline' mt={4}>
            See More Projects
          </Button>
        </VStack>
      </Box>
    </>
  );
}
