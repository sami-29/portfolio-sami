"use client";

import NextLink from "next/link";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Flex,
  List,
  Separator,
} from "@chakra-ui/react";
import Image from "next/image";
import {
  DialogRoot,
  DialogContent,
  DialogBody,
  DialogCloseTrigger,
} from "../../../components/ui/dialog";
import { useColorModeValue } from "../../../components/ui/color-mode";
import type { Project } from "../types";
import { useState } from "react";

interface ProjectPageClientProps {
  project: Project;
}

export default function ProjectPageClient({ project }: ProjectPageClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const sectionHeadingColor = useColorModeValue("gray.700", "gray.200");
  const sectionTextColor = useColorModeValue("gray.600", "gray.300");
  const sectionBg = useColorModeValue("gray.50", "gray.800");
  const bulletColor = useColorModeValue("blue.500", "blue.300");

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsOpen(true);
  };

  return (
    <Container maxW="4xl" py={10}>
      <Box asChild mb={10} display="inline-block">
        <NextLink href="/projects">
          <Text
            fontSize="md"
            fontWeight={600}
            color={{ base: "gray.500", _dark: "gray.400" }}
            position="relative"
            _after={{
              content: "''",
              position: "absolute",
              width: "100%",
              transform: "scaleX(0)",
              height: "2px",
              bottom: "-2px",
              left: 0,
              backgroundColor: { base: "brand.500", _dark: "brand.200" },
              transformOrigin: "bottom right",
              transition: "transform 0.3s ease-out",
            }}
            _hover={{
              textDecoration: "none",
              color: { base: "brand.600", _dark: "brand.200" },
              _after: {
                transform: "scaleX(1)",
                transformOrigin: "bottom left",
              },
            }}>
            ← Back to Projects
          </Text>
        </NextLink>
      </Box>

      {/* Title + subtitle */}
      <Box mb={6}>
        <Heading as="h1" fontSize="3xl" mb={3} lineHeight="shorter">
          {project.title}
        </Heading>
        <Text fontSize="xl" color={sectionTextColor} mb={5}>
          {project.subtitle}
        </Text>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <Flex gap={2} flexWrap="wrap" mb={6}>
            {project.tags.map((tag, index) => (
              <Box
                key={`${tag.label}-${index}`}
                px={3}
                py={1}
                borderRadius="full"
                fontSize="xs"
                fontWeight="semibold"
                bg={{ base: `${tag.colorScheme}.500`, _dark: `${tag.colorScheme}.300` }}
                color={{ base: "white", _dark: "gray.900" }}>
                {tag.label}
              </Box>
            ))}
          </Flex>
        )}

        {/* Links */}
        {(project.siteUrl || project.githubUrl) && (
          <Flex gap={3} flexWrap="wrap" mb={6}>
            {project.siteUrl && (
              <Button asChild size="md" colorPalette="blue" variant="outline">
                <a href={project.siteUrl} target="_blank" rel="noopener noreferrer">
                  View Live Site →
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button asChild size="md" variant="outline">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </Button>
            )}
          </Flex>
        )}
      </Box>

      {/* Video showcase */}
      {project.videoUrl && (
        <Box mb={10} borderRadius="xl" overflow="hidden" boxShadow="xl">
          <video
            src={project.videoUrl}
            controls
            style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }}
            poster={project.images[0]?.src.src || ""}
          />
        </Box>
      )}

      <Separator mb={8} />

      {/* Structured sections for featured projects */}
      {project.problem && (
        <Box mb={8}>
          <Heading
            as="h2"
            fontSize="sm"
            color={sectionHeadingColor}
            mb={3}
            textTransform="uppercase"
            letterSpacing="wide">
            The Problem
          </Heading>
          <Text fontSize="lg" color={sectionTextColor} lineHeight="tall">
            {project.problem}
          </Text>
        </Box>
      )}

      {project.architecture && project.architecture.length > 0 && (
        <Box mb={8} bg={sectionBg} p={6} borderRadius="xl">
          <Heading
            as="h2"
            fontSize="sm"
            color={sectionHeadingColor}
            mb={4}
            textTransform="uppercase"
            letterSpacing="wide">
            Architecture
          </Heading>
          <List.Root gap={3} listStyle="none">
            {project.architecture.map((item, i) => (
              <List.Item key={i} display="flex" alignItems="flex-start" gap={3}>
                <Box as="span" color={bulletColor} fontWeight="bold" mt={1} flexShrink={0}>
                  →
                </Box>
                <Text fontSize="md" color={sectionTextColor}>
                  {item}
                </Text>
              </List.Item>
            ))}
          </List.Root>
        </Box>
      )}

      {project.challenges && project.challenges.length > 0 && (
        <Box mb={8}>
          <Heading
            as="h2"
            fontSize="sm"
            color={sectionHeadingColor}
            mb={4}
            textTransform="uppercase"
            letterSpacing="wide">
            Technical Challenges
          </Heading>
          <List.Root gap={3} listStyle="none">
            {project.challenges.map((item, i) => (
              <List.Item key={i} display="flex" alignItems="flex-start" gap={3}>
                <Box as="span" color={bulletColor} fontWeight="bold" mt={1} flexShrink={0}>
                  →
                </Box>
                <Text fontSize="md" color={sectionTextColor}>
                  {item}
                </Text>
              </List.Item>
            ))}
          </List.Root>
        </Box>
      )}

      {project.results && project.results.length > 0 && (
        <Box mb={8} bg={sectionBg} p={6} borderRadius="xl">
          <Heading
            as="h2"
            fontSize="sm"
            color={sectionHeadingColor}
            mb={4}
            textTransform="uppercase"
            letterSpacing="wide">
            Results
          </Heading>
          <List.Root gap={3} listStyle="none">
            {project.results.map((item, i) => (
              <List.Item key={i} display="flex" alignItems="flex-start" gap={3}>
                <Box as="span" color={bulletColor} fontWeight="bold" mt={1} flexShrink={0}>
                  ✓
                </Box>
                <Text fontSize="md" color={sectionTextColor}>
                  {item}
                </Text>
              </List.Item>
            ))}
          </List.Root>
        </Box>
      )}

      {/* Fallback description for non-featured projects */}
      {!project.problem && (
        <Box mb={8}>
          <Text fontSize="lg" color={sectionTextColor} lineHeight="tall">
            {project.description}
          </Text>
        </Box>
      )}

      <Separator mb={8} />

      {/* Image gallery */}
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
        {project.images.map((image, index) => (
          <Box
            key={`${image.alt}-${index}`}
            position="relative"
            borderRadius="xl"
            overflow="hidden"
            cursor="zoom-in"
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.01)" }}
            onClick={() => handleImageClick(image.src.src)}>
            <Image
              src={image.src}
              alt={`${project.title} - ${image.alt || `Image ${index + 1}`}`}
              width={image.src.width}
              height={image.src.height}
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </Box>
        ))}
      </SimpleGrid>

      {/* Lightbox */}
      <DialogRoot open={isOpen} onOpenChange={(e) => setIsOpen(e.open)} size="full">
        <DialogContent bg="transparent" boxShadow="none" backdrop={true}>
          <DialogBody p={0} display="flex" alignItems="center" justifyContent="center">
            <DialogCloseTrigger position="fixed" top={4} right={4} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage}
              alt={`${project.title} - full size`}
              style={{ maxHeight: "90vh", maxWidth: "90vw", objectFit: "contain" }}
            />
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </Container>
  );
}
