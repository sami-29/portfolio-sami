"use client";
import { useColorMode, IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

export default function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  console.log(colorMode);

  return (
    <IconButton
      aria-label='Toggle theme'
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      position='absolute'
      top={20}
      right={4}
      size={"lg"}
      variant='ghost'
    />
  );
}
