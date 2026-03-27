import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#FFF8E1" },
          100: { value: "#FFECB3" },
          200: { value: "#FFD54F" },
          300: { value: "#FFCA28" },
          400: { value: "#FFC107" },
          500: { value: "#FFB300" },
          600: { value: "#FF8F00" },
          700: { value: "#FF6F00" },
          800: { value: "#E65100" },
          900: { value: "#BF360C" },
          950: { value: "#8C2700" },
        },
        gray: {
          50: { value: "#fafafa" },
          100: { value: "#f5f5f8" },
          200: { value: "#e5e5ec" },
          300: { value: "#d4d4dc" },
          400: { value: "#a1a1ac" },
          500: { value: "#71717c" },
          600: { value: "#52525c" },
          700: { value: "#3a3a42" },
          750: { value: "#27272c" },
          800: { value: "#1e1e22" },
          850: { value: "#18181b" },
          900: { value: "#111113" },
          950: { value: "#0a0a0b" },
        },
      },
      fonts: {
        heading: { value: "var(--font-heading), sans-serif" },
        body: { value: "var(--font-body), sans-serif" },
        mono: { value: "var(--font-mono), monospace" },
      },
    },
  },
  globalCss: {
    body: {
      overflowY: "scroll",
      bg: "gray.950",
      color: "gray.300",
    },
  },
});

export const system = createSystem(defaultConfig, config);
