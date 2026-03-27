"use client";

import { Box, VStack, Heading, Text, SimpleGrid, Flex, Separator } from "@chakra-ui/react";
import { useColorModeValue } from "../../components/ui/color-mode";
import AboutCard from "../../components/AboutCard";
import { primaryStack, otherTools } from "./aboutData";

export default function AboutContent() {
  const textColor = useColorModeValue("gray.900", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.300");
  const sectionLabelColor = useColorModeValue("gray.400", "gray.500");
  const tagBg = useColorModeValue("gray.100", "gray.700");
  const tagColor = useColorModeValue("gray.700", "gray.200");

  return (
    <Box as="main" mb={16}>
      <VStack gap={6} align="start" w={["90%", "75%", "60%"]} mx="auto" mt={{ base: 10, md: 20 }}>
        <Text
          fontSize="sm"
          fontWeight="700"
          color={sectionLabelColor}
          letterSpacing="widest"
          textTransform="uppercase">
          About
        </Text>

        <Heading as="h1" fontSize={["4xl", "5xl", "6xl"]} color={textColor} lineHeight="shorter">
          Sami Bentaleb
        </Heading>

        <Text fontSize={["lg", "xl"]} color={subTextColor} lineHeight="tall" maxW="2xl">
          I do full-stack website development and web app development. Most of my work sits in the
          space where the data model and the UI both matter: dashboards that represent real
          workflows, internal tools where interaction design is as hard as the backend, and
          platforms where messy or large data has to stay usable without hiding what&apos;s actually
          going on. I work with React, TypeScript, and Next.js.
        </Text>
        <Text fontSize={["lg", "xl"]} color={subTextColor} lineHeight="tall" maxW="2xl">
          That tends to mean strong frontend work—complex forms, data-dense views,
          performance-sensitive rendering—plus enough backend depth to model things right from the
          start. I&apos;ve shipped a smart city platform (2SCL), pharmacy automation and sig
          management systems, maritime data visualization tools, and client projects across website
          building and custom web applications.
        </Text>
      </VStack>

      <Separator my={12} w={["90%", "75%", "80%"]} mx="auto" />

      {/* Primary stack */}
      <VStack gap={6} align="start" w={["90%", "75%", "80%"]} mx="auto" mb={8}>
        <Text
          fontSize="xs"
          fontWeight="700"
          color={sectionLabelColor}
          letterSpacing="widest"
          textTransform="uppercase">
          Primary Stack
        </Text>
        <Text fontSize="md" color={subTextColor}>
          What I reach for on every serious project and why:
        </Text>
      </VStack>

      <SimpleGrid columns={[1, 2, 3, 4]} gap={6} px={4} mx="auto" maxW="container.xl" mb={16}>
        {primaryStack.map((item) => (
          <AboutCard
            key={item.title}
            src={item.src}
            title={item.title}
            description={item.context}
            website={item.website}
          />
        ))}
      </SimpleGrid>

      <Separator mb={12} w={["90%", "75%", "80%"]} mx="auto" />

      {/* Also worked with */}
      <VStack gap={6} align="start" w={["90%", "75%", "80%"]} mx="auto">
        <Text
          fontSize="xs"
          fontWeight="700"
          color={sectionLabelColor}
          letterSpacing="widest"
          textTransform="uppercase">
          Also Worked With
        </Text>
        <Flex gap={2} flexWrap="wrap">
          {otherTools.map((name) => (
            <Box
              key={name}
              px={3}
              py={1.5}
              borderRadius="md"
              bg={tagBg}
              color={tagColor}
              fontSize="sm"
              fontWeight="500">
              {name}
            </Box>
          ))}
        </Flex>
      </VStack>
    </Box>
  );
}
