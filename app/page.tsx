import type { Metadata } from "next";
import { buildMetadata } from "../utils/buildMetadata";
import HomeContent from "./HomeContent";
import JsonLd from "../components/JsonLd";
import { portfolioConfig } from "../utils/config";
import { SOCIAL_LINKS } from "../utils/constants";

export const metadata: Metadata = buildMetadata({
  title: "Home",
  description:
    "Full-stack engineer building websites, web apps, and data-heavy dashboards with React, Next.js, and TypeScript.",
  path: "/",
  keywords: [
    "website development",
    "website building",
    "web development",
    "web app development",
    "dashboard development",
    "full-stack engineer",
    "React developer",
    "Next.js developer",
    "TypeScript developer",
  ],
});

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolioConfig.seo.authorName,
    url: portfolioConfig.seo.baseUrl,
    jobTitle: "Full-Stack Engineer",
    description: portfolioConfig.seo.siteDescription,
    sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.github],
    knowsAbout: portfolioConfig.seo.keywords,
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <HomeContent />
    </>
  );
}
