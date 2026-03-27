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
    <Box as="nav" p={6} borderWidth="1px" borderColor="gray.800" borderRadius="lg" bg="gray.900">
      <Text
        fontSize="xs"
        fontWeight="700"
        color="brand.400"
        letterSpacing="widest"
        textTransform="uppercase"
        fontFamily="heading"
        mb={4}>
        On This Page
      </Text>
      <VStack align="start" gap={2.5}>
        {headings.map((heading) => (
          <ChakraLink
            href={`#${heading.slug}`}
            key={heading.slug}
            display="block"
            fontSize="sm"
            color="gray.500"
            fontWeight="500"
            fontFamily="body"
            pl={heading.level === 3 ? 4 : 0}
            transition="color 0.2s"
            _hover={{
              color: "brand.400",
              textDecoration: "none",
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
