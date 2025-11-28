// Portfolio configuration
export const portfolioConfig = {
  // Social links configuration
  social: {
    showGithub: false,
  },

  // SEO configuration
  seo: {
    baseUrl: "https://portfolio-sami.vercel.app",
    siteName: "Sami Bentaleb Portfolio",
    defaultOgImage: "/og-image.jpg",
  },

  // Layout configuration
  layout: {
    maxContentWidth: ["90%", "75%", "60%"],
    sectionSpacing: { base: 8, md: 16 },
  },
} as const;

export type PortfolioConfig = typeof portfolioConfig;
