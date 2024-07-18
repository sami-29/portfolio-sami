"use client";

import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { Github, Linkedin } from "lucide-react";

export default function Home() {
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.300");

  return (
    <>
      <head>
        <title>Sami Bentaleb</title>
        <meta
          name='description'
          content='Fullstack web developer creating interactive and responsive websites.'
        />
        <link rel='icon' href='/favicon.ico' />
      </head>
      <Box as='main' mb={10}>
        <VStack
          w={["90%", "75%", "50%"]}
          mx='auto'
          mt={24}
          spacing={8}
          align='start'>
          <Heading as='h1' fontSize={["4xl", "5xl", "6xl"]} color={textColor}>
            Fullstack web developer creating interactive and responsive
            websites.
          </Heading>
          <Text fontSize={["md", "lg", "xl"]} color={subTextColor}>
            Welcome to my portfolio! I am Bentaleb Sami, a full-stack web
            developer with a passion for creating interactive and responsive
            websites. With 4 years of experience in both building projects and
            freelancing, I am a dedicated and skilled developer. As a computer
            science student at the University of Badji Moukhtar Annaba, I am
            constantly expanding my knowledge and experience in the field.
            Let&apos;s work together to bring your next project to life!
          </Text>
          <HStack spacing={6}>
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
          </HStack>
        </VStack>
      </Box>
    </>
  );
}
