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
      transition="transform 0.3s var(--ease-out-quart), box-shadow 0.3s var(--ease-out-quart)"
      _hover={{
        transform: "translateY(-4px) scale(1.01)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
        "& > a > .overlay": {
          opacity: 1,
        },
      }}>
      <NextLink
        href={`/projects/${slug}`}
        style={{ viewTransitionName: `project-card-${slug}`, display: "block" }}>
        <Box
          position="relative"
          width="100%"
          height="280px"
          style={{ viewTransitionName: `project-image-${slug}` }}>
          <Image
            src={images[0].src}
            alt={images[0].alt || `${title} image`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
          bg="linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.1) 100%)"
          opacity={{ base: 0.85, md: 0 }}
          transition="opacity 0.3s var(--ease-out-quart)"
          p={5}
          display="flex"
          flexDirection="column"
          justifyContent="flex-end">
          <Heading
            as="h2"
            fontSize="lg"
            color="gray.100"
            mb={1}
            lineClamp={2}
            fontFamily="heading"
            fontWeight="700">
            {title}
          </Heading>
          <Text fontSize="sm" color="gray.400" lineClamp={2} mb={3} lineHeight="1.5">
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
                  fontWeight="600"
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
