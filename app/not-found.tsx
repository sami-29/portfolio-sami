"use client";

import { Heading, Text, Button, VStack, Container } from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Container as="main" maxW="container.lg" h="calc(100vh - 100px)">
      <VStack gap={8} justify="center" align="center" h="full" textAlign="center">
        <Heading as="h1" fontSize={["6xl", "7xl", "8xl"]} color={textColor} fontWeight="bold">
          404
        </Heading>
        <Heading as="h2" fontSize={["2xl", "3xl", "4xl"]} color={textColor} mb={2}>
          Page Not Found
        </Heading>
        <Text fontSize={["md", "lg", "xl"]} color={subTextColor} maxW="600px">
          Oops! It seems you&apos;ve ventured into uncharted territory. The page you&apos;re looking
          for might have moved or doesn&apos;t exist.
        </Text>
        <Button asChild size="lg" variant="outline" mt={4}>
          <Link href="/">
            <Home size={20} />
            Back to Home
          </Link>
        </Button>
      </VStack>
    </Container>
  );
}
