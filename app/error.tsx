"use client";

import { Heading, Text, Button, VStack, Container } from "@chakra-ui/react";
import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorProps) {
  return (
    <Container as="main" maxW="container.lg" h="calc(100vh - 100px)">
      <VStack gap={8} justify="center" align="center" h="full" textAlign="center">
        <Heading
          as="h1"
          fontSize={["4xl", "5xl", "6xl"]}
          color="gray.100"
          fontWeight="700"
          letterSpacing="-0.03em"
          fontFamily="heading">
          Something went wrong
        </Heading>
        <Text fontSize={["md", "lg"]} color="gray.400" maxW="600px" fontFamily="body">
          An unexpected error occurred. You can try again or go back to the home page.
        </Text>
        <VStack gap={4}>
          <Button
            onClick={reset}
            size="lg"
            variant="outline"
            borderColor="gray.700"
            color="gray.300"
            _hover={{ borderColor: "brand.400", color: "brand.400", transform: "translateY(-2px)" }}
            transition="transform 0.2s var(--ease-out-quart), color 0.2s, border-color 0.2s">
            <RefreshCw size={20} />
            Try Again
          </Button>
          <Button
            asChild
            size="lg"
            variant="ghost"
            color="gray.400"
            _hover={{ color: "brand.400" }}
            transition="color 0.2s">
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
