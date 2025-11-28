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
  const subtitleColor = useColorModeValue("gray.600", "gray.300");
  const dateColor = useColorModeValue("gray.500", "gray.400");
  const hoverBorderColor = useColorModeValue("brand.300", "brand.400");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const estimateReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const wordCount = text.split(" ").length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  return (
    <Box
      as={Link}
      href={`/blog/${props.slug}`}
      display='block'
      py={6}
      borderBottomWidth={1}
      borderColor={borderColor}
      position='relative'
      transition='all 0.2s ease'
      _after={{
        content: "''",
        position: "absolute",
        width: "100%",
        transform: "scaleX(0)",
        height: "2px",
        bottom: 0,
        left: 0,
        backgroundColor: hoverBorderColor,
        transformOrigin: "bottom right",
        transition: "transform 0.3s ease-out",
      }}
      _hover={{
        textDecoration: "none",
        _after: {
          transform: "scaleX(1)",
          transformOrigin: "bottom left",
        },
      }}
      w='full'>
      <VStack align='start' spacing={3}>
        <Heading
          as='h2'
          fontSize='xl'
          fontWeight='semibold'
          color={titleColor}
          lineHeight='1.4'>
          {props.title}
        </Heading>
        <Text color={subtitleColor} fontSize='md' lineHeight='1.5'>
          {props.subtitle}
        </Text>
        <Text fontSize='sm' color={dateColor}>
          {formatDate(props.date)} • {estimateReadingTime(props.content)} min
          read
        </Text>
      </VStack>
    </Box>
  );
});

PostPreview.displayName = "PostPreview";

export default PostPreview;
