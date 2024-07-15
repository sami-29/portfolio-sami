"use client";

import { useParams } from "next/navigation";
import NextLink from "next/link";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  IconButton,
  List,
  ListItem,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import Image from "next/image";
import { CloseIcon } from "@chakra-ui/icons";
import projectsData from "../projectsData";
import { useState } from "react";
import { Link } from "@chakra-ui/next-js";

export default function ProjectPageClient() {
  const params = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState("");

  const sectionHeadingColor = useColorModeValue("gray.700", "gray.200");
  const sectionTextColor = useColorModeValue("gray.600", "gray.300");
  const sectionBg = useColorModeValue("gray.50", "gray.800");
  const bulletColor = useColorModeValue("blue.500", "blue.300");

  const project = projectsData.find((p) => p.slug === params.slug);
  if (!project) return null;

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    onOpen();
  };

  return (
    <Container maxW='4xl' py={10}>
      <Link
        as={NextLink}
        href='/projects'
        mb={10}
        display='inline-block'
        fontSize='md'
        fontWeight={600}
        color='gray.500'
        _dark={{ color: "gray.400" }}
        position='relative'
        _after={{
          content: "''",
          position: "absolute",
          width: "100%",
          transform: "scaleX(0)",
          height: "2px",
          bottom: "-2px",
          left: 0,
          backgroundColor: "brand.500",
          transformOrigin: "bottom right",
          transition: "transform 0.3s ease-out",
          _dark: { backgroundColor: "brand.200" },
        }}
        _hover={{
          textDecoration: "none",
          color: "brand.600",
          _dark: { color: "brand.200" },
          _after: {
            transform: "scaleX(1)",
            transformOrigin: "bottom left",
          },
        }}>
        ← Back to Projects
      </Link>

      {/* Title + subtitle */}
      <Box mb={6}>
        <Heading as='h1' size='2xl' mb={3} lineHeight='shorter'>
          {project.title}
        </Heading>
        <Text fontSize='xl' color={sectionTextColor} mb={5}>
          {project.subtitle}
        </Text>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <Flex gap={2} flexWrap='wrap' mb={6}>
            {project.tags.map((tag) => (
              <Box
                key={tag.label}
                px={3}
                py={1}
                borderRadius='full'
                fontSize='xs'
                fontWeight='semibold'
                bg={`${tag.colorScheme}.500`}
                color='white'
                _dark={{ bg: `${tag.colorScheme}.300`, color: "gray.900" }}>
                {tag.label}
              </Box>
            ))}
          </Flex>
        )}

        {/* Links */}
        {(project.siteUrl || project.githubUrl) && (
          <Flex gap={3} flexWrap='wrap' mb={6}>
            {project.siteUrl && (
              <Button
                as='a'
                href={project.siteUrl}
                target='_blank'
                rel='noopener noreferrer'
                size='md'
                colorScheme='blue'
                variant='outline'>
                View Live Site →
              </Button>
            )}
            {project.githubUrl && (
              <Button
                as='a'
                href={project.githubUrl}
                target='_blank'
                rel='noopener noreferrer'
                size='md'
                variant='outline'>
                View on GitHub
              </Button>
            )}
          </Flex>
        )}
      </Box>

      {/* Video showcase */}
      {project.videoUrl && (
        <Box mb={10} borderRadius='xl' overflow='hidden' boxShadow='xl'>
          <video
            src={project.videoUrl}
            controls
            style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }}
            poster={project.images[0]?.src.src || ""}
          />
        </Box>
      )}

      <Divider mb={8} />

      {/* Structured sections for featured projects */}
      {project.problem && (
        <Box mb={8}>
          <Heading as='h2' size='md' color={sectionHeadingColor} mb={3} textTransform='uppercase' letterSpacing='wide' fontSize='sm'>
            The Problem
          </Heading>
          <Text fontSize='lg' color={sectionTextColor} lineHeight='tall'>
            {project.problem}
          </Text>
        </Box>
      )}

      {project.architecture && project.architecture.length > 0 && (
        <Box mb={8} bg={sectionBg} p={6} borderRadius='xl'>
          <Heading as='h2' size='md' color={sectionHeadingColor} mb={4} textTransform='uppercase' letterSpacing='wide' fontSize='sm'>
            Architecture
          </Heading>
          <List spacing={3}>
            {project.architecture.map((item, i) => (
              <ListItem key={i} display='flex' alignItems='flex-start' gap={3}>
                <Box as='span' color={bulletColor} fontWeight='bold' mt={1} flexShrink={0}>
                  →
                </Box>
                <Text fontSize='md' color={sectionTextColor}>
                  {item}
                </Text>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {project.challenges && project.challenges.length > 0 && (
        <Box mb={8}>
          <Heading as='h2' size='md' color={sectionHeadingColor} mb={4} textTransform='uppercase' letterSpacing='wide' fontSize='sm'>
            Technical Challenges
          </Heading>
          <List spacing={3}>
            {project.challenges.map((item, i) => (
              <ListItem key={i} display='flex' alignItems='flex-start' gap={3}>
                <Box as='span' color={bulletColor} fontWeight='bold' mt={1} flexShrink={0}>
                  →
                </Box>
                <Text fontSize='md' color={sectionTextColor}>
                  {item}
                </Text>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {project.results && project.results.length > 0 && (
        <Box mb={8} bg={sectionBg} p={6} borderRadius='xl'>
          <Heading as='h2' size='md' color={sectionHeadingColor} mb={4} textTransform='uppercase' letterSpacing='wide' fontSize='sm'>
            Results
          </Heading>
          <List spacing={3}>
            {project.results.map((item, i) => (
              <ListItem key={i} display='flex' alignItems='flex-start' gap={3}>
                <Box as='span' color={bulletColor} fontWeight='bold' mt={1} flexShrink={0}>
                  ✓
                </Box>
                <Text fontSize='md' color={sectionTextColor}>
                  {item}
                </Text>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Fallback description for non-featured projects */}
      {!project.problem && (
        <Box mb={8}>
          <Text fontSize='lg' color={sectionTextColor} lineHeight='tall'>
            {project.description}
          </Text>
        </Box>
      )}

      <Divider mb={8} />

      {/* Image gallery */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {project.images.map((image, index) => (
          <Box
            key={`${image.alt}-${index}`}
            position='relative'
            borderRadius='xl'
            overflow='hidden'
            cursor='zoom-in'
            transition='transform 0.2s'
            _hover={{ transform: "scale(1.01)" }}
            onClick={() => handleImageClick(image.src.src)}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.src.width}
              height={image.src.height}
              sizes='(max-width: 768px) 100vw, 50vw'
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </Box>
        ))}
      </SimpleGrid>

      {/* Lightbox */}
      <Modal isOpen={isOpen} onClose={onClose} size='full'>
        <ModalOverlay bg='blackAlpha.900' />
        <ModalContent bg='transparent' boxShadow='none'>
          <ModalBody
            p={0}
            display='flex'
            alignItems='center'
            justifyContent='center'>
            <IconButton
              aria-label='Close'
              icon={<CloseIcon />}
              position='fixed'
              top={4}
              right={4}
              onClick={onClose}
              colorScheme='whiteAlpha'
              _focusVisible={{ boxShadow: "outline" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage}
              alt='Full size image'
              style={{ maxHeight: "90vh", maxWidth: "90vw", objectFit: "contain" }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
}
