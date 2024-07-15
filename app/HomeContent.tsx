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
import { Linkedin, Copy, Mail } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { portfolioConfig } from "../utils/config";
import { SOCIAL_LINKS } from "../utils/constants";

export default function HomeContent() {
  const textColor = useColorModeValue("gray.900", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.300");
  const labelColor = useColorModeValue("blue.600", "blue.300");
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

  const featuredProjects = projectsData.filter((p) => p.featured);

  return (
    <Box as='main' mb={16}>
      {/* Hero */}
      <VStack
        w={["90%", "75%", "60%"]}
        mx='auto'
        mt={{ base: 10, md: 20 }}
        spacing={{ base: 5, md: 6 }}
        align='start'>

        <Text
          fontSize='sm'
          fontWeight='semibold'
          color={labelColor}
          letterSpacing='widest'
          textTransform='uppercase'>
          Full-Stack Engineer
        </Text>

        <Heading
          as='h1'
          fontSize={["4xl", "5xl", "6xl"]}
          color={textColor}
          lineHeight='shorter'>
          Sami Bentaleb
        </Heading>

        <Text fontSize={["lg", "xl"]} color={subTextColor} maxW='2xl' lineHeight='tall'>
          I do website development and web app development: interfaces for complex data and
          dashboards where the data model matters as much as the UI, internal tools with real
          workflows, and platforms that stay usable when data gets messy or large. From website
          building for businesses to dashboard development, I focus on clean architecture and
          usable products.
        </Text>

        {/* Social links */}
        <HStack spacing={4} flexWrap='wrap' pt={1}>
          {portfolioConfig.social.showGithub && (
            <Button
              as={Link}
              href={SOCIAL_LINKS.github}
              isExternal
              variant='outline'
              size='sm'
              aria-label='GitHub'>
              GitHub
            </Button>
          )}
          <Button
            as={Link}
            href={SOCIAL_LINKS.linkedin}
            isExternal
            variant='outline'
            size='sm'
            leftIcon={<Linkedin size={14} />}>
            LinkedIn
          </Button>
          <Tooltip label='Click to copy Discord username' hasArrow>
            <Button
              onClick={copyDiscordUsername}
              variant='outline'
              size='sm'
              rightIcon={<Copy size={14} />}
              leftIcon={<FaDiscord />}>
              Discord
            </Button>
          </Tooltip>
          <Button
            as={Link}
            href={`mailto:${SOCIAL_LINKS.email}`}
            isExternal
            variant='ghost'
            size='sm'
            leftIcon={<Mail size={14} />}>
            {SOCIAL_LINKS.email}
          </Button>
        </HStack>
      </VStack>

      {/* Featured projects */}
      <VStack
        w='full'
        spacing={8}
        mt={{ base: 16, md: 24 }}
        maxW='container.xl'
        mx='auto'
        px={{ base: 4, md: 8 }}>
        <HStack w='full' justify='space-between' align='baseline'>
          <Heading as='h2' fontSize={["2xl", "3xl"]} color={textColor}>
            Featured Projects
          </Heading>
          <Link
            href='/projects'
            fontSize='sm'
            fontWeight='600'
            color={labelColor}
            _hover={{ textDecoration: "underline" }}>
            All projects →
          </Link>
        </HStack>
        <Text fontSize='md' color={subTextColor} maxW='2xl'>
          Smart city platforms, pharmacy automation, dashboards, and web applications.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w='full'>
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

        <Button as={Link} href='/projects' size='lg' variant='outline' mt={2}>
          See all projects
        </Button>
      </VStack>
    </Box>
  );
}
