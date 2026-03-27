"use client";

import { Heading, Text, Button, VStack, Container } from "@chakra-ui/react";
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <Container as="main" maxW="container.lg" h="calc(100vh - 100px)">
      <VStack gap={8} justify="center" align="center" h="full" textAlign="center">
        <Heading
          as="h1"
          fontSize={["6xl", "7xl", "8xl"]}
          color="brand.400"
          fontWeight="700"
          letterSpacing="-0.04em"
          fontFamily="heading">
          404
        </Heading>
        <Heading
          as="h2"
          fontSize={["2xl", "3xl", "4xl"]}
          color="gray.100"
          mb={2}
          fontWeight="700"
          letterSpacing="-0.02em"
          fontFamily="heading">
          Page Not Found
        </Heading>
        <Text fontSize={["md", "lg", "xl"]} color="gray.400" maxW="600px" fontFamily="body">
          This page doesn&apos;t exist or has moved.
        </Text>
        <Button
          asChild
          size="lg"
          variant="outline"
          mt={4}
          borderColor="gray.700"
          color="gray.300"
          _hover={{ borderColor: "brand.400", color: "brand.400", transform: "translateY(-2px)" }}
          transition="transform 0.2s var(--ease-out-quart), color 0.2s, border-color 0.2s">
          <Link href="/">
            <Home size={20} />
            Back to Home
          </Link>
        </Button>
      </VStack>
    </Container>
  );
}
