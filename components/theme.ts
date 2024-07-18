import { extendTheme, type ThemeConfig } from "@chakra-ui/react"

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
}

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
}

const theme = extendTheme({ 
  config,
  colors,
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.800" : "white",
        color: props.colorMode === "dark" ? "white" : "gray.800",
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
        solid: (props) => ({
          bg: props.colorMode === "dark" ? "brand.200" : "brand.500",
          color: props.colorMode === "dark" ? "gray.800" : "white",
          _hover: {
            bg: props.colorMode === "dark" ? "brand.300" : "brand.600",
          },
        }),
        outline: (props) => ({
          borderColor: props.colorMode === "dark" ? "brand.200" : "brand.500",
          color: props.colorMode === "dark" ? "brand.200" : "brand.500",
          _hover: {
            bg: props.colorMode === "dark" ? "brand.200" : "brand.500",
            color: props.colorMode === "dark" ? "gray.800" : "white",
          },
        }),
      },
    },
    Link: {
      baseStyle: (props) => ({
        color: props.colorMode === "dark" ? "brand.200" : "brand.500",
        _hover: {
          textDecoration: "none",
          color: props.colorMode === "dark" ? "brand.300" : "brand.600",
        },
      }),
    },
  },
})

export default theme
