"use client";

import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  useColorModeValue,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { Github, Linkedin, Copy } from "lucide-react";
import SEO from "../components/SEO";
import { FaDiscord } from "react-icons/fa";

export default function Home() {
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.300");
  const toast = useToast();

  const copyDiscordUsername = () => {
    navigator.clipboard.writeText("lasang.");
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
        canonical='https://portfolio-sami.vercel.app/favicon.ico'
        ogImage='https://portfolio-sami.vercel.app/favicon.ico'
      />
      <Box as='main' mb={10}>
        <VStack
          w={["90%", "75%", "50%"]}
          mx='auto'
          mt={24}
          spacing={8}
          align='start'>
          <Heading as='h1' fontSize={["4xl", "5xl", "6xl"]} color={textColor}>
            Hey! I&apos;m Sami a Full Stack Web Developer
          </Heading>
          <Text fontSize={["md", "lg", "xl"]} color={subTextColor}>
            Welcome to my portfolio. I&apos;m a full stack web developer with
            over 4 years of experience in freelancing and personal projects. My
            expertise lies in creating interactive websites, e-commerce
            platforms, and web applications. I specialize in both front-end and
            back-end technologies, as well as general programming skills
            ensuring efficient and user-friendly digital solutions from concept
            to deployment.
          </Text>
          <HStack spacing={6} flexWrap='wrap'>
            <Link
              color={textColor}
              href='https://www.github.com/sami-29'
              isExternal>
              <Github size={32} />
            </Link>
            <Link
              color={textColor}
              href='https://www.linkedin.com/in/sami-bentaleb-a96293221/'
              isExternal>
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
                href='mailto:sami.bentaleb.dev@gmail.com'
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
      </Box>
    </>
  );
}
