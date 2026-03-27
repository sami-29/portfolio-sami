"use client";
import { usePathname } from "next/navigation";
import { Box, Flex, Text, Stack, IconButton, Collapsible } from "@chakra-ui/react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const currentPath = usePathname();

  const onToggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box position="fixed" top={0} left={0} right={0} zIndex={1000}>
      <Flex
        bg={scrolled ? "rgba(10, 10, 11, 0.8)" : "transparent"}
        backdropFilter={scrolled ? "blur(12px)" : "none"}
        borderBottom={scrolled ? "1px solid" : "1px solid transparent"}
        borderColor={scrolled ? "gray.800" : "transparent"}
        color="gray.100"
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4, md: 8 }}
        align={"center"}
        justify={"space-between"}
        transition="background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease">
        <Flex align={"center"}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Text
              fontFamily={"heading"}
              color="gray.100"
              fontWeight="bold"
              fontSize="xl"
              transition="color 0.2s ease"
              _hover={{ color: "brand.400" }}>
              Sami
            </Text>
          </Link>
        </Flex>

        <Flex display={{ base: "none", md: "flex" }}>
          <DesktopNav currentPath={currentPath} />
        </Flex>

        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onToggle}
          variant={"ghost"}
          aria-label={"Toggle Navigation"}
          aria-expanded={isOpen}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </IconButton>
      </Flex>

      <Collapsible.Root open={isOpen}>
        <Collapsible.Content>
          <MobileNav currentPath={currentPath} onToggle={onToggle} />
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
}

const DesktopNav = ({ currentPath }: { currentPath: string }) => {
  return (
    <Stack direction="row" gap={1}>
      {NAV_ITEMS.map((navItem) => {
        const isActive = currentPath === navItem.href;
        return (
          <Link
            key={navItem.label}
            href={navItem.href}
            style={{ textDecoration: "none" }}
            aria-current={isActive ? "page" : undefined}>
            <Box position="relative" px={3} py={2}>
              <Text
                fontSize="sm"
                fontWeight="600"
                color={isActive ? "brand.400" : "gray.300"}
                transition="color 0.2s"
                _hover={{ color: "brand.400" }}>
                {navItem.label}
              </Text>
              {isActive && (
                <motion.div
                  layoutId="nav-underline"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "12px",
                    right: "12px",
                    height: "2px",
                    background: "#FFC107",
                    borderRadius: "1px",
                  }}
                  transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
                />
              )}
            </Box>
          </Link>
        );
      })}
    </Stack>
  );
};

const MobileNav = ({ currentPath, onToggle }: { currentPath: string; onToggle: () => void }) => {
  return (
    <Box
      bg="rgba(10, 10, 11, 0.95)"
      backdropFilter="blur(12px)"
      px={4}
      pb={4}
      display={{ md: "none" }}
      borderBottom="1px solid"
      borderColor="gray.800">
      <Stack gap={1}>
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem
            key={navItem.label}
            {...navItem}
            isActive={currentPath === navItem.href}
            onToggle={onToggle}
          />
        ))}
      </Stack>
    </Box>
  );
};

const MobileNavItem = ({
  label,
  href,
  isActive,
  onToggle,
}: {
  label: string;
  href: string;
  isActive: boolean;
  onToggle: () => void;
}) => {
  return (
    <Link
      href={href}
      style={{ textDecoration: "none" }}
      onClick={onToggle}
      aria-current={isActive ? "page" : undefined}>
      <Box
        px={3}
        py={2.5}
        borderRadius="md"
        bg={isActive ? "rgba(255, 193, 7, 0.08)" : "transparent"}
        borderLeft={isActive ? "2px solid #FFC107" : "2px solid transparent"}
        transition="background 0.2s, border-color 0.2s">
        <Text
          fontWeight="600"
          fontSize="md"
          color={isActive ? "brand.400" : "gray.300"}
          transition="color 0.2s"
          _hover={{ color: "brand.400" }}>
          {label}
        </Text>
      </Box>
    </Link>
  );
};
