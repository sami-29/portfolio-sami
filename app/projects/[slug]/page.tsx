"use client";

import { useParams } from "next/navigation";
// import type { Project } from "../types"; // TODO: Use for TypeScript type checking in future enhancements
import NextLink from "next/link";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Image,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import projectsData from "../projectsData";
import { useState } from "react";
import { Link } from "@chakra-ui/next-js";

export default function ProjectPage() {
  const params = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState("");

  const project = projectsData.find((p) => p.slug === params.slug);

  if (!project) {
    return (
      <Container maxW='7xl' py={20}>
        <Heading>Project not found</Heading>
        <Link
          as={NextLink}
          href='/projects'
          display='inline-block'
          mt={4}
          fontSize='md'
          fontWeight={600}
          color='gray.600'
          position='relative'
          _dark={{ color: "gray.300" }}
          _hover={{
            textDecoration: "none",
            color: "brand.600",
            _dark: { color: "brand.200" },
          }}>
          ← Back to Projects
        </Link>
      </Container>
    );
  }

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    onOpen();
  };

  return (
    <Container maxW='7xl' py={10}>
      <Link
        as={NextLink}
        href='/projects'
        mb={8}
        display='inline-block'
        fontSize='md'
        fontWeight={600}
        color='gray.600'
        position='relative'
        _dark={{ color: "gray.300" }}
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

      <Box mb={10}>
        <Heading as='h1' size='2xl' mb={4}>
          {project.title}
        </Heading>
        <Text fontSize='xl' mb={4}>
          {project.description}
        </Text>

        {project.tags && project.tags.length > 0 && (
          <Flex gap={2} flexWrap='wrap' mb={6}>
            {project.tags.map((tag, index) => (
              <Box
                key={index}
                px={2}
                py={1}
                borderRadius='full'
                fontSize='xs'
                fontWeight='semibold'
                bg={`${tag.colorScheme}.500`}
                color='white'
                _dark={{
                  bg: `${tag.colorScheme}.200`,
                  color: "gray.800",
                }}>
                {tag.label}
              </Box>
            ))}
          </Flex>
        )}

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={6}>
          {project.siteUrl && (
            <Button
              as='a'
              href={project.siteUrl}
              target='_blank'
              rel='noopener noreferrer'
              size='md'
              variant='outline'
              width='auto'
              transition='all 0.2s'>
              Visit Live Site
            </Button>
          )}
          {project.githubUrl && (
            <Button
              as='a'
              href={project.githubUrl}
              target='_blank'
              rel='noopener noreferrer'
              size='md'
              variant='outline'
              width='auto'
              transition='all 0.2s'>
              View on GitHub
            </Button>
          )}
        </SimpleGrid>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {project.images.map((image, index) => (
          <Box
            key={index}
            position='relative'
            className={image.isSpecial ? "special-image" : ""}
            sx={
              image.isCustomStyles
                ? {
                    // Add any custom styles here based on isCustomStyles
                  }
                : {}
            }>
            <Image
              src={image.src.src}
              alt={image.alt}
              borderRadius='xl'
              cursor='pointer'
              onClick={() => handleImageClick(image.src.src)}
              w='100%'
              h='auto'
            />
          </Box>
        ))}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose} size='full'>
        <ModalOverlay />
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
            />
            <Image
              src={selectedImage}
              alt='Full size image'
              maxH='90vh'
              objectFit='contain'
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
}
