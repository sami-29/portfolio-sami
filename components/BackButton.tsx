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
      color="gray.400"
      _hover={{ color: "brand.400", bg: "gray.850", transform: "translateX(-2px)" }}
      transition="color 0.2s, background 0.2s, transform 0.2s var(--ease-out-quart)"
      mb={4}>
      <ArrowLeft size={16} />
      {label}
    </Button>
  );
};

export default BackButton;
