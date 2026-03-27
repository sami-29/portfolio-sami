"use client";
import { usePathname } from "next/navigation";
import { Box, Flex, Text, Stack, IconButton, Collapsible } from "@chakra-ui/react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = usePathname();

  const onToggle = () => setIsOpen((prev) => !prev);

  return (
    <Box position="fixed" top={0} left={0} right={0} zIndex={1000}>
      <Flex
        bg="transparent"
        color="white"
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4, md: 8 }}
        align={"center"}
        justify={"space-between"}>
        <Flex align={"center"}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Text fontFamily={"heading"} color="white" fontWeight="bold" fontSize="xl">
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
          {isOpen ? <X size={12} /> : <Menu size={20} />}
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
  const linkColor = "white";
  const linkHoverColor = "brand.200";
  const activeColor = "brand.200";

  return (
    <Stack direction={"row"} gap={8}>
      {NAV_ITEMS.map((navItem) => (
        <Link key={navItem.label} href={navItem.href} style={{ textDecoration: "none" }}>
          <Text
            p={2}
            fontSize={"md"}
            fontWeight={600}
            color={currentPath === navItem.href ? activeColor : linkColor}
            position="relative"
            _after={{
              content: "''",
              position: "absolute",
              width: "100%",
              transform: currentPath === navItem.href ? "scaleX(1)" : "scaleX(0)",
              height: "2px",
              bottom: 0,
              left: 0,
              backgroundColor: activeColor,
              transformOrigin: "bottom right",
              transition: "transform 0.3s ease-out",
            }}
            _hover={{
              color: linkHoverColor,
              _after: {
                transform: "scaleX(1)",
                transformOrigin: "bottom left",
              },
            }}>
            {navItem.label}
          </Text>
        </Link>
      ))}
    </Stack>
  );
};

const MobileNav = ({ currentPath, onToggle }: { currentPath: string; onToggle: () => void }) => {
  return (
    <Stack bg="transparent" p={4} ml={"auto"} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem
          key={navItem.label}
          {...navItem}
          isActive={currentPath === navItem.href}
          onToggle={onToggle}
        />
      ))}
    </Stack>
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
  const activeColor = "brand.200";
  const inactiveColor = "white";

  return (
    <Stack gap={4}>
      <Flex py={2} justify={"space-between"} align={"center"} onClick={onToggle}>
        <Link
          href={href}
          style={{ marginLeft: "auto", paddingRight: "0.5rem", textDecoration: "none" }}>
          <Text
            fontWeight={600}
            color={isActive ? activeColor : inactiveColor}
            position="relative"
            _hover={{
              color: activeColor,
            }}
            _after={{
              content: "''",
              position: "absolute",
              width: "100%",
              transform: isActive ? "scaleX(1)" : "scaleX(0)",
              height: "2px",
              bottom: "-4px",
              left: 0,
              backgroundColor: activeColor,
              transformOrigin: "bottom right",
              transition: "transform 0.3s ease-out",
            }}>
            {label}
          </Text>
        </Link>
      </Flex>
    </Stack>
  );
};
