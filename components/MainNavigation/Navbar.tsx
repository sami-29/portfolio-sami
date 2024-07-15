"use client";
import { usePathname } from "next/navigation";
import {
  Box,
  Flex,
  Text,
  Stack,
  IconButton,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  // { label: "Labs", href: "/labs" }, // Temporarily disabled - in development
];

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const currentPath = usePathname();

  return (
    <Box position='fixed' top={0} left={0} right={0} zIndex={1000}>
      <Flex
        bg='transparent'
        color='white'
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4, md: 8 }}
        align={"center"}
        justify={"space-between"}>
        <Flex align={"center"}>
          <Link href='/' _hover={{ textDecoration: "none" }}>
            <Text
              fontFamily={"heading"}
              color='white'
              fontWeight='bold'
              fontSize='xl'>
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
          icon={
            isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
          }
          variant={"ghost"}
          aria-label={"Toggle Navigation"}
        />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav currentPath={currentPath} onToggle={onToggle} />
      </Collapse>
    </Box>
  );
}

const DesktopNav = ({ currentPath }: { currentPath: string }) => {
  const linkColor = "white";
  const linkHoverColor = "brand.200";
  const activeColor = "brand.200";

  return (
    <Stack direction={"row"} spacing={8}>
      {NAV_ITEMS.map((navItem) => (
        <Link
          key={navItem.label}
          href={navItem.href}
          p={2}
          fontSize={"md"}
          fontWeight={600}
          color={currentPath === navItem.href ? activeColor : linkColor}
          position='relative'
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
            textDecoration: "none",
            color: linkHoverColor,
            _after: {
              transform: "scaleX(1)",
              transformOrigin: "bottom left",
            },
          }}>
          {navItem.label}
        </Link>
      ))}
    </Stack>
  );
};

const MobileNav = ({
  currentPath,
  onToggle,
}: {
  currentPath: string;
  onToggle: () => void;
}) => {
  return (
    <Stack bg='transparent' p={4} ml={"auto"} display={{ md: "none" }}>
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
    <Stack spacing={4}>
      <Flex
        py={2}
        justify={"space-between"}
        align={"center"}
        onClick={onToggle}>
        <Link
          href={href}
          ml={"auto"}
          pr={2}
          _hover={{ textDecoration: "none" }}>
          <Text
            fontWeight={600}
            color={isActive ? activeColor : inactiveColor}
            position='relative'
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
