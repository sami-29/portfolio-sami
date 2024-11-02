import {
  Box,
  VStack,
  Heading,
  Text,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { StaticImageData } from "next/image";

interface Props {
  src: StaticImageData;
  title: string;
  description: string;
}

export default function AboutCard({ src, title, description }: Props) {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const titleColor = useColorModeValue("gray.800", "white");
  const descriptionColor = useColorModeValue("gray.600", "gray.400");
  const hoverBgColor = "brand.200";
  const hoverTextColor = "gray.800";

  return (
    <Box
      cursor='pointer'
      bg={bgColor}
      _hover={{
        borderColor: hoverBgColor,
        color: hoverTextColor,
        transform: "translateY(-2px)",
        boxShadow: "lg",
      }}
      borderWidth={2}
      borderColor={borderColor}
      borderRadius='lg'
      overflow='hidden'
      transition='all 0.3s'>
      <VStack spacing={4} p={4}>
        <Image src={src.src} alt={title} boxSize='100px' objectFit='contain' />
        <VStack spacing={2} align='start' w='full'>
          <Heading as='h3' size='md' color={titleColor}>
            {title}
          </Heading>
          <Text fontSize='sm' color={descriptionColor}>
            {description}
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
}
