import {
  Box,
  VStack,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { forwardRef } from "react";
import { PostMetadata } from "../utils/GetPostMetadata";

const PostPreview = forwardRef<HTMLDivElement, PostMetadata>((props, ref) => {
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const titleColor = useColorModeValue("gray.800", "white");
  const subtitleColor = useColorModeValue("gray.600", "white");
  const dateColor = useColorModeValue("gray.500", "gray.300");
  const bgColor = useColorModeValue("white", "gray.700");
  const hoverBgColor = "brand.200";
  const hoverTextColor = "gray.800";

  return (
    <Box
      p={4}
      borderWidth={1}
      borderColor={borderColor}
      borderRadius='lg'
      transition='all 0.2s'
      _hover={{
        borderColor: hoverBgColor,
        color: hoverTextColor,
        transform: "translateY(-2px)",
        boxShadow: "lg",
      }}
      w='full'
      bg={bgColor}>
      <Link href={`/blog/${props.slug}`} _hover={{ textDecoration: "none" }}>
        <VStack align='start' spacing={2}>
          <Heading as='h2' fontSize='xl' fontWeight='bold' color={titleColor}>
            {props.title}
          </Heading>
          <Text color={subtitleColor}>{props.subtitle}</Text>
          <Text fontSize='sm' color={dateColor} mt={2}>
            {new Date(props.date).toDateString()}
          </Text>
        </VStack>
      </Link>
    </Box>
  );
});

PostPreview.displayName = "PostPreview";

export default PostPreview;
