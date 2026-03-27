"use client";

import { Box, VStack, Text, Link as ChakraLink } from "@chakra-ui/react";

export interface Heading {
  level: number;
  text: string;
  slug: string;
}

interface TableOfContentsProps {
  headings: Heading[];
}

const TableOfContents = ({ headings }: TableOfContentsProps) => {
  if (headings.length === 0) {
    return null;
  }

  return (
    <Box
      as="nav"
      p={6}
      borderWidth={1}
      borderColor={{ base: "gray.200", _dark: "gray.700" }}
      borderRadius="lg"
      bg={{ base: "white", _dark: "gray.800" }}
      boxShadow="sm">
      <Text fontSize="lg" fontWeight="semibold" mb={4}>
        On This Page
      </Text>
      <VStack align="start" gap={3}>
        {headings.map((heading) => (
          <ChakraLink
            href={`#${heading.slug}`}
            key={heading.slug}
            display="block"
            fontSize="sm"
            color={{ base: "gray.700", _dark: "gray.300" }}
            fontWeight="medium"
            pl={heading.level === 3 ? 4 : 0}
            _hover={{
              color: { base: "brand.500", _dark: "brand.300" },
              textDecoration: "underline",
            }}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(`#${heading.slug}`)?.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
              window.history.pushState(null, "", `#${heading.slug}`);
            }}>
            {heading.text}
          </ChakraLink>
        ))}
      </VStack>
    </Box>
  );
};

export default TableOfContents;
