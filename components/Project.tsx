import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  HStack,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { StaticImageData } from "next/image";

interface ButtonLinkProps {
  link: string | null;
  text: string;
}

function ButtonLink({ link, text }: ButtonLinkProps) {
  return (
    <Button
      as={Link}
      href={link || "#"}
      isExternal
      isDisabled={!link}
      onClick={(e) => !link && e.preventDefault()}
      cursor={link ? "pointer" : "not-allowed"}
      colorScheme={link ? "brand" : "gray"}
      variant={link ? "outline" : "solid"}
      size='md'
      rel='noopener noreferrer'
      borderRadius='full'>
      {text}
    </Button>
  );
}

interface Props {
  img: StaticImageData;
  title: string;
  description: string;
  siteUrl: string | null;
  githubUrl: string | null;
}

export default function Project({
  img,
  title,
  description,
  siteUrl,
  githubUrl,
}: Props) {
  const borderColor = useColorModeValue("brand.200", "brand.300");
  const titleColor = useColorModeValue("gray.800", "gray.200");
  const descriptionColor = useColorModeValue("gray.600", "gray.400");

  return (
    <VStack spacing={6} align='start' mb={16}>
      <Box
        borderColor={borderColor}
        borderWidth={[0, 0, 2]}
        borderRadius='xl'
        overflow='hidden'
        w='full'>
        <Image
          src={img.src}
          alt={`${title} image`}
          width='100%'
          height='auto'
          objectFit='cover'
        />
      </Box>

      <VStack align='start' spacing={4} w='full'>
        <Heading as='h2' fontSize={["2xl", "3xl", "4xl"]} color={titleColor}>
          {title}
        </Heading>
        <Text fontSize='lg' color={descriptionColor}>
          {description}
        </Text>
        <HStack spacing={4}>
          <ButtonLink link={siteUrl} text='Live Site' />
          <ButtonLink link={githubUrl} text='Github repo' />
        </HStack>
      </VStack>
    </VStack>
  );
}
