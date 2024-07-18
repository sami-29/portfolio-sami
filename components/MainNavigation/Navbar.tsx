"use client";
import { useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Flex,
  Text,
  Stack,
  IconButton,
  Button,
  Collapse,
  Link,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Projects", href: "/projects" },
];

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const currentPath = usePathname();

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}>
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
            fontWeight='bold'>
            Sami
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav currentPath={currentPath} />
          </Flex>
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav currentPath={currentPath} />
      </Collapse>
    </Box>
  );
}

const DesktopNav = ({ currentPath }: { currentPath: string }) => {
  const linkColor = useColorModeValue("gray.600", "gray.300");
  const linkHoverColor = useColorModeValue("brand.600", "brand.200");
  const activeColor = useColorModeValue("brand.500", "brand.200");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Link
          as={NextLink}
          key={navItem.label}
          href={navItem.href}
          p={2}
          fontSize={"sm"}
          fontWeight={500}
          color={currentPath === navItem.href ? activeColor : linkColor}
          _hover={{
            textDecoration: "none",
            color: linkHoverColor,
          }}>
          {navItem.label}
        </Link>
      ))}
    </Stack>
  );
};

const MobileNav = ({ currentPath }: { currentPath: string }) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem
          key={navItem.label}
          {...navItem}
          isActive={currentPath === navItem.href}
        />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({
  label,
  href,
  isActive,
}: {
  label: string;
  href: string;
  isActive: boolean;
}) => {
  const activeColor = useColorModeValue("blue.500", "blue.200");
  const inactiveColor = useColorModeValue("gray.600", "gray.200");

  return (
    <Stack spacing={4}>
      <NextLink href={href} passHref>
        <Flex
          py={2}
          justify={"space-between"}
          align={"center"}
          _hover={{
            textDecoration: "none",
          }}>
          <Text fontWeight={600} color={isActive ? activeColor : inactiveColor}>
            {label}
          </Text>
        </Flex>
      </NextLink>
    </Stack>
  );
};
