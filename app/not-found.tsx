"use client";

import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { Home } from "lucide-react";
import SEO from "../components/SEO";

export default function NotFound() {
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.300");

  return (
    <>
      <SEO
        title='404 - Page Not Found'
        description="The page you're looking for doesn't exist."
        canonical='https://portfolio-sami.vercel.app/404'
        ogImage='https://portfolio-sami.vercel.app/favicon.ico'
      />
      <Container maxW='container.lg' h='calc(100vh - 100px)'>
        <VStack
          spacing={8}
          justify='center'
          align='center'
          h='full'
          textAlign='center'>
          <Heading
            as='h1'
            fontSize={["6xl", "7xl", "8xl"]}
            color={textColor}
            fontWeight='bold'>
            404
          </Heading>
          <Heading
            as='h2'
            fontSize={["2xl", "3xl", "4xl"]}
            color={textColor}
            mb={2}>
            Page Not Found
          </Heading>
          <Text fontSize={["md", "lg", "xl"]} color={subTextColor} maxW='600px'>
            Oops! It seems you&apos;ve ventured into uncharted territory. The
            page you&apos;re looking for might have moved or doesn&apos;t exist.
          </Text>
          <Button
            as={Link}
            href='/'
            size='lg'
            variant='outline'
            leftIcon={<Home size={20} />}
            mt={4}>
            Back to Home
          </Button>
        </VStack>
      </Container>
    </>
  );
}
