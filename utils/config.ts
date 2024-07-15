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
    authorName: "Sami Bentaleb",
    siteDescription:
      "Full-stack engineer offering website development, web app development, dashboard development, and complex data-driven interfaces with React, Next.js, and TypeScript.",
    keywords: [
      "Sami Bentaleb",
      "full-stack engineer",
      "full-stack developer",
      "website development",
      "website building",
      "web development",
      "web app development",
      "dashboard development",
      "React developer",
      "Next.js developer",
      "TypeScript developer",
      "portfolio website",
    ],
    defaultOgImage: "/og-image.jpg",
  },

  // Layout configuration
  layout: {
    maxContentWidth: ["90%", "75%", "60%"],
    sectionSpacing: { base: 8, md: 16 },
  },
} as const;

export type PortfolioConfig = typeof portfolioConfig;
