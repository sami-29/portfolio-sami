"use client";

import {
  Box,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import SEO from "../../components/SEO";

const LabsPage = () => {
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.300");

  return (
    <>
      <SEO
        title='Labs - Coming Soon'
        description='Interactive tools, games, and creative experiments - currently in development.'
        path='/labs'
      />
      <Container maxW='container.md' mt={{ base: 20, md: 32 }}>
        <VStack spacing={8} align='center' textAlign='center' py={16}>
          <Heading
            as='h1'
            fontSize={["4xl", "5xl", "6xl"]}
            color={textColor}
            mb={4}>
            🚧 Under Construction
          </Heading>
          <Text fontSize={["lg", "xl", "2xl"]} color={subTextColor} maxW='2xl'>
            The Labs section is currently being developed. Check back soon for
            interactive tools, games, and creative experiments!
          </Text>
          <Box mt={8}>
            <Link
              href='/projects'
              bg='blue.500'
              color='white'
              px={8}
              py={3}
              borderRadius='lg'
              fontWeight='semibold'
              _hover={{ bg: "blue.600" }}
              transition='all 0.3s'>
              View My Projects Instead
            </Link>
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default LabsPage;
