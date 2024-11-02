import { Box, Heading, Text, Image, Flex } from "@chakra-ui/react";
import NextLink from "next/link";
import type { Project as ProjectType } from "../app/projects/types";

type Props = Pick<ProjectType, "images" | "title" | "description" | "slug" | "tags">;

export default function Project({ images, title, description, slug, tags }: Props) {
  return (
    <Box
      as={NextLink}
      href={`/projects/${slug}`}
      position="relative"
      overflow="hidden"
      borderRadius="xl"
      transition="all 0.3s"
      _hover={{
        transform: 'scale(1.02)',
        '& > .overlay': {
          opacity: 1
        }
      }}
    >
      <Image
        src={images[0].src.src}
        alt={images[0].alt || `${title} image`}
        width="100%"
        height="300px"
        objectFit="cover"
      />
      <Box
        className="overlay"
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(0, 0, 0, 0.7)"
        opacity={{ base: 0.5, md: 0 }}
        transition="opacity 0.3s"
        p={6}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Heading
          as="h2"
          fontSize="xl"
          color="white"
          mb={2}
          noOfLines={2}
        >
          {title}
        </Heading>
        <Text
          fontSize="sm"
          color="gray.200"
          noOfLines={{ base: 4, md: 3 }}
          mb={2}
        >
          {description}
        </Text>
        {tags && tags.length > 0 && (
          <Flex gap={2} flexWrap="wrap">
            {tags.map((tag, index) => (
              <Box
                key={index}
                px={2}
                py={1}
                borderRadius="full"
                fontSize="xs"
                fontWeight="semibold"
                bg={`${tag.colorScheme}.500`}
                color="white"
                _dark={{
                  bg: `${tag.colorScheme}.200`,
                  color: "gray.800"
                }}
              >
                {tag.label}
              </Box>
            ))}
          </Flex>
        )}
      </Box>
    </Box>
  );
}
