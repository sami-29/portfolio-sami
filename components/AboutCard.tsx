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
  website?: string;
}

export default function AboutCard({ src, title, description, website }: Props) {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const titleColor = useColorModeValue("gray.800", "white");
  const descriptionColor = useColorModeValue("gray.600", "gray.300");
  const hoverBorderColor = useColorModeValue("brand.400", "brand.300");
  const hoverShadow = useColorModeValue("lg", "dark-lg");

  const handleClick = () => {
    if (website) {
      window.open(website, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Box
      bg={bgColor}
      _hover={{
        borderColor: hoverBorderColor,
        transform: "translateY(-4px)",
        boxShadow: hoverShadow,
      }}
      borderWidth={1}
      borderColor={borderColor}
      borderRadius='xl'
      overflow='hidden'
      transition='all 0.3s ease'
      height='100%'
      position='relative'
      cursor={website ? "pointer" : "default"}
      onClick={handleClick}>
      <VStack spacing={4} p={6} align='center' height='100%'>
        <Box position='relative'>
          <Image
            src={src.src}
            alt={`${title} technology logo`}
            boxSize='80px'
            objectFit='contain'
            filter='drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
          />
        </Box>
        <VStack spacing={2} align='center' flex={1} justify='center'>
          <Heading as='h3' size='sm' color={titleColor} textAlign='center'>
            {title}
          </Heading>
          <Text
            fontSize='xs'
            color={descriptionColor}
            textAlign='center'
            lineHeight='1.4'
            noOfLines={3}>
            {description}
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
}
