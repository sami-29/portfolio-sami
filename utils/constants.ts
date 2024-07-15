// Layout constants
export const CONTENT_WIDTHS = ["90%", "75%", "60%"] as const;
export const SECTION_SPACING = { base: 8, md: 16 } as const;

// Animation constants
export const TRANSITIONS = {
  fast: "all 0.2s ease",
  normal: "all 0.3s ease",
  slow: "all 0.5s ease",
} as const;

// Shadow constants
export const SHADOWS = {
  light: "lg",
  dark: "dark-lg",
} as const;

// Social links
export const SOCIAL_LINKS = {
  github: "https://www.github.com/sami-29",
  linkedin: "https://www.linkedin.com/in/sami-bentaleb-a96293221/",
  email: "sami.bentaleb.dev@gmail.com",
  discord: "lasang.",
} as const;

// Experience constants
export const YEARS_OF_EXPERIENCE = new Date().getFullYear() - 2020;
