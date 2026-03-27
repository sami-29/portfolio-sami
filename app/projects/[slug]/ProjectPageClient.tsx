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
import { motion } from "motion/react";
import Image from "next/image";
import {
  DialogRoot,
  DialogContent,
  DialogBody,
  DialogCloseTrigger,
} from "../../../components/ui/dialog";
import type { Project } from "../types";
import { useState } from "react";
import { easing, stagger } from "../../../utils/motion";

interface ProjectPageClientProps {
  project: Project;
}

const sectionReveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: easing.outQuart },
};

const galleryContainer = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: stagger.fast, delayChildren: 0.05 },
  },
  viewport: { once: true, margin: "-60px" },
};

const galleryItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: easing.outQuart },
};

export default function ProjectPageClient({ project }: ProjectPageClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsOpen(true);
  };

  return (
    <Container maxW="4xl" py={10}>
      {/* Back link */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easing.outQuart }}>
        <Box asChild mb={10} display="inline-block">
          <NextLink href="/projects">
            <Text
              fontSize="md"
              fontWeight={600}
              color="gray.400"
              position="relative"
              transition="color 0.2s"
              _after={{
                content: "''",
                position: "absolute",
                width: "100%",
                transform: "scaleX(0)",
                height: "2px",
                bottom: "-2px",
                left: 0,
                backgroundColor: "brand.400",
                transformOrigin: "bottom right",
                transition: "transform 0.3s var(--ease-out-quart)",
              }}
              _hover={{
                textDecoration: "none",
                color: "brand.400",
                _after: {
                  transform: "scaleX(1)",
                  transformOrigin: "bottom left",
                },
              }}>
              ← Back to Projects
            </Text>
          </NextLink>
        </Box>
      </motion.div>

      {/* Title + subtitle */}
      <Box mb={6}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: easing.outQuart, delay: 0.1 }}>
          <Heading
            as="h1"
            fontSize="3xl"
            mb={3}
            lineHeight="shorter"
            fontFamily="heading"
            fontWeight="700"
            letterSpacing="-0.02em">
            {project.title}
          </Heading>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: easing.outQuart, delay: 0.2 }}>
          <Text fontSize="xl" color="gray.400" mb={5} fontFamily="body">
            {project.subtitle}
          </Text>
        </motion.div>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easing.outQuart, delay: 0.25 }}>
            <Flex gap={2} flexWrap="wrap" mb={6}>
              {project.tags.map((tag, index) => (
                <Box
                  key={`${tag.label}-${index}`}
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="xs"
                  fontWeight="semibold"
                  bg={`${tag.colorScheme}.700`}
                  color="gray.100">
                  {tag.label}
                </Box>
              ))}
            </Flex>
          </motion.div>
        )}

        {/* Links */}
        {(project.siteUrl || project.githubUrl) && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easing.outQuart, delay: 0.3 }}>
            <Flex gap={3} flexWrap="wrap" mb={6}>
              {project.siteUrl && (
                <Button
                  asChild
                  size="md"
                  variant="outline"
                  borderColor="gray.700"
                  color="gray.300"
                  _hover={{
                    borderColor: "brand.400",
                    color: "brand.400",
                    transform: "translateY(-2px)",
                  }}
                  transition="transform 0.2s var(--ease-out-quart), color 0.2s, border-color 0.2s">
                  <a href={project.siteUrl} target="_blank" rel="noopener noreferrer">
                    View Live Site →
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  asChild
                  size="md"
                  variant="outline"
                  borderColor="gray.700"
                  color="gray.300"
                  _hover={{
                    borderColor: "brand.400",
                    color: "brand.400",
                    transform: "translateY(-2px)",
                  }}
                  transition="transform 0.2s var(--ease-out-quart), color 0.2s, border-color 0.2s">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    View on GitHub
                  </a>
                </Button>
              )}
            </Flex>
          </motion.div>
        )}
      </Box>

      {/* Video showcase */}
      {project.videoUrl && (
        <motion.div {...sectionReveal}>
          <Box mb={10} borderRadius="xl" overflow="hidden" boxShadow="xl">
            <video
              src={project.videoUrl}
              controls
              style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }}
              poster={project.images[0]?.src.src || ""}
            />
          </Box>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}>
        <Separator mb={8} borderColor="gray.800" />
      </motion.div>

      {/* Structured sections */}
      {project.problem && (
        <motion.div {...sectionReveal}>
          <Box mb={8}>
            <Heading
              as="h2"
              fontSize="xs"
              color="brand.400"
              mb={3}
              textTransform="uppercase"
              letterSpacing="widest"
              fontFamily="heading"
              fontWeight="700">
              The Problem
            </Heading>
            <Text fontSize="lg" color="gray.300" lineHeight="1.8" fontFamily="body">
              {project.problem}
            </Text>
          </Box>
        </motion.div>
      )}

      {project.architecture && project.architecture.length > 0 && (
        <motion.div {...sectionReveal}>
          <Box
            mb={8}
            bg="gray.900"
            border="1px solid"
            borderColor="gray.800"
            p={6}
            borderRadius="xl">
            <Heading
              as="h2"
              fontSize="xs"
              color="brand.400"
              mb={4}
              textTransform="uppercase"
              letterSpacing="widest"
              fontFamily="heading"
              fontWeight="700">
              Architecture
            </Heading>
            <List.Root gap={3} listStyle="none">
              {project.architecture.map((item, i) => (
                <List.Item key={i} display="flex" alignItems="flex-start" gap={3}>
                  <Box as="span" color="brand.400" fontWeight="700" mt={1} flexShrink={0}>
                    →
                  </Box>
                  <Text fontSize="md" color="gray.300" lineHeight="1.7" fontFamily="body">
                    {item}
                  </Text>
                </List.Item>
              ))}
            </List.Root>
          </Box>
        </motion.div>
      )}

      {project.challenges && project.challenges.length > 0 && (
        <motion.div {...sectionReveal}>
          <Box mb={8}>
            <Heading
              as="h2"
              fontSize="xs"
              color="brand.400"
              mb={4}
              textTransform="uppercase"
              letterSpacing="widest"
              fontFamily="heading"
              fontWeight="700">
              Technical Challenges
            </Heading>
            <List.Root gap={3} listStyle="none">
              {project.challenges.map((item, i) => (
                <List.Item key={i} display="flex" alignItems="flex-start" gap={3}>
                  <Box as="span" color="brand.400" fontWeight="700" mt={1} flexShrink={0}>
                    →
                  </Box>
                  <Text fontSize="md" color="gray.300" lineHeight="1.7" fontFamily="body">
                    {item}
                  </Text>
                </List.Item>
              ))}
            </List.Root>
          </Box>
        </motion.div>
      )}

      {project.results && project.results.length > 0 && (
        <motion.div {...sectionReveal}>
          <Box
            mb={8}
            bg="gray.900"
            border="1px solid"
            borderColor="gray.800"
            p={6}
            borderRadius="xl">
            <Heading
              as="h2"
              fontSize="xs"
              color="brand.400"
              mb={4}
              textTransform="uppercase"
              letterSpacing="widest"
              fontFamily="heading"
              fontWeight="700">
              Results
            </Heading>
            <List.Root gap={3} listStyle="none">
              {project.results.map((item, i) => (
                <List.Item key={i} display="flex" alignItems="flex-start" gap={3}>
                  <Box as="span" color="brand.400" fontWeight="700" mt={1} flexShrink={0}>
                    ✓
                  </Box>
                  <Text fontSize="md" color="gray.300" lineHeight="1.7" fontFamily="body">
                    {item}
                  </Text>
                </List.Item>
              ))}
            </List.Root>
          </Box>
        </motion.div>
      )}

      {!project.problem && (
        <motion.div {...sectionReveal}>
          <Box mb={8}>
            <Text fontSize="lg" color="gray.300" lineHeight="1.8" fontFamily="body">
              {project.description}
            </Text>
          </Box>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}>
        <Separator mb={8} borderColor="gray.800" />
      </motion.div>

      {/* Image gallery */}
      <motion.div
        variants={galleryContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-60px" }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
          {project.images.map((image, index) => (
            <motion.div key={`${image.alt}-${index}`} variants={galleryItem}>
              <Box
                position="relative"
                borderRadius="xl"
                overflow="hidden"
                cursor="zoom-in"
                transition="transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)"
                _hover={{ transform: "scale(1.01)" }}
                onClick={() => handleImageClick(image.src.src)}
                style={index === 0 ? { viewTransitionName: `project-${project.slug}` } : undefined}>
                <Image
                  src={image.src}
                  alt={`${project.title} - ${image.alt || `Image ${index + 1}`}`}
                  width={image.src.width}
                  height={image.src.height}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </Box>
            </motion.div>
          ))}
        </SimpleGrid>
      </motion.div>

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
