import {
  Box,
  VStack,
  Text,
  useColorModeValue,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

export interface Heading {
  level: number;
  text: string;
  slug: string;
}

interface TableOfContentsProps {
  headings: Heading[];
}

const TableOfContents = ({ headings }: TableOfContentsProps) => {
  const textColor = useColorModeValue("gray.700", "gray.300");
  const hoverColor = useColorModeValue("brand.500", "brand.300");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const bgColor = useColorModeValue("white", "gray.800");

  if (headings.length === 0) {
    return null;
  }

  return (
    <Box
      as='nav'
      p={6}
      borderWidth={1}
      borderColor={borderColor}
      borderRadius='lg'
      bg={bgColor}
      boxShadow='sm'>
      <Text fontSize='lg' fontWeight='semibold' mb={4}>
        On This Page
      </Text>
      <VStack align='start' spacing={3}>
        {headings.map((heading) => (
          <ChakraLink
            as={Link}
            href={`#${heading.slug}`}
            key={heading.slug}
            display='block'
            fontSize='sm'
            color={textColor}
            fontWeight={"medium"}
            pl={heading.level === 3 ? 4 : 0}
            _hover={{
              color: hoverColor,
              textDecoration: "underline",
            }}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(`#${heading.slug}`)?.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
              // Update URL without reloading page
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
