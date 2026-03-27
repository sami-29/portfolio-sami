import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";
import type { Project as ProjectType } from "../app/projects/types";

type Props = Pick<ProjectType, "images" | "title" | "subtitle" | "description" | "slug" | "tags">;

export default function Project({ images, title, subtitle, slug, tags }: Props) {
  if (!images || images.length === 0) return null;

  return (
    <Box
      asChild
      position="relative"
      overflow="hidden"
      borderRadius="xl"
      transition="all 0.3s"
      _hover={{
        transform: "scale(1.02)",
        "& > .overlay": {
          opacity: 1,
        },
      }}>
      <NextLink href={`/projects/${slug}`}>
        <Box position="relative" width="100%" height="300px">
          <Image
            src={images[0].src}
            alt={images[0].alt || `${title} image`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
        </Box>
        <Box
          className="overlay"
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(0, 0, 0, 0.82)"
          opacity={{ base: 0.65, md: 0 }}
          transition="opacity 0.3s"
          p={6}
          display="flex"
          flexDirection="column"
          justifyContent="flex-end">
          <Heading as="h2" fontSize="xl" color="white" mb={1} lineClamp={2}>
            {title}
          </Heading>
          <Text fontSize="sm" color="gray.300" lineClamp={3} mb={3} lineHeight="short">
            {subtitle}
          </Text>
          {tags && tags.length > 0 && (
            <Flex gap={1.5} flexWrap="wrap">
              {tags.map((tag, index) => (
                <Box
                  key={`${tag.label}-${index}`}
                  px={2}
                  py={0.5}
                  borderRadius="full"
                  fontSize="xs"
                  fontWeight="semibold"
                  bg={`${tag.colorScheme}.600`}
                  color="white">
                  {tag.label}
                </Box>
              ))}
            </Flex>
          )}
        </Box>
      </NextLink>
    </Box>
  );
}
