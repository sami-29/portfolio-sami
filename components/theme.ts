import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

const colors = {
  brand: {
    50: "#E6FFFA",
    100: "#B2F5EA",
    200: "#81E6D9",
    300: "#4FD1C5",
    400: "#38B2AC",
    500: "#319795",
    600: "#2C7A7B",
    700: "#285E61",
    800: "#234E52",
    900: "#1D4044",
  },
};

const theme = extendTheme({
  config,
  colors,
  styles: {
    global: (props: { colorMode: string }) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
        overflowY: "scroll",
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "full",
      },
      variants: {
        solid: (props: { colorMode: string }) => ({
          bg: "brand.200",
          color: props.colorMode === 'dark' ? 'gray.800' : 'gray.900',
          _hover: {
            bg: "brand.300",
          },
        }),
        outline: (props: { colorMode: string }) => ({
          borderColor: "brand.200",
          color: "brand.200",
          _hover: {
            bg: "brand.200",
            color: props.colorMode === 'dark' ? 'gray.800' : 'gray.900',
          },
        }),
      },
    },
    Link: {
      baseStyle: {
        color: "brand.200",
        _hover: {
          textDecoration: "none",
          color: "brand.300",
        },
      },
    },
  },
});

export default theme;
