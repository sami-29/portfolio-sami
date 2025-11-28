"use client";

import { Button, Icon, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  href?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
}

const BackButton = ({
  href = "/labs",
  label = "Back to Labs",
  size = "sm",
}: BackButtonProps) => {
  const router = useRouter();
  const buttonBg = useColorModeValue("gray.100", "gray.700");
  const buttonHoverBg = useColorModeValue("gray.200", "gray.600");

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <Button
      leftIcon={<Icon as={ArrowLeft} />}
      onClick={handleClick}
      size={size}
      variant='ghost'
      bg={buttonBg}
      _hover={{ bg: buttonHoverBg }}
      mb={4}>
      {label}
    </Button>
  );
};

export default BackButton;
