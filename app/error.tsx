"use client";

import { Heading, Text, Button, VStack, Container } from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorProps) {
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Container as="main" maxW="container.lg" h="calc(100vh - 100px)">
      <VStack gap={8} justify="center" align="center" h="full" textAlign="center">
        <Heading as="h1" fontSize={["4xl", "5xl", "6xl"]} color={textColor} fontWeight="bold">
          Something went wrong
        </Heading>
        <Text fontSize={["md", "lg"]} color={subTextColor} maxW="600px">
          An unexpected error occurred. You can try again or go back to the home page.
        </Text>
        <VStack gap={4}>
          <Button onClick={reset} size="lg" variant="outline">
            <RefreshCw size={20} />
            Try Again
          </Button>
          <Button asChild size="lg" variant="ghost">
            <Link href="/">
              <Home size={20} />
              Back to Home
            </Link>
          </Button>
        </VStack>
      </VStack>
    </Container>
  );
}
