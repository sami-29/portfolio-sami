"use client";

import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  href?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
}

const BackButton = ({
  href = "/projects",
  label = "Back to Projects",
  size = "sm",
}: BackButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <Button
      onClick={handleClick}
      size={size}
      variant="ghost"
      bg={{ base: "gray.100", _dark: "gray.700" }}
      _hover={{ bg: { base: "gray.200", _dark: "gray.600" } }}
      mb={4}>
      <ArrowLeft size={16} />
      {label}
    </Button>
  );
};

export default BackButton;
