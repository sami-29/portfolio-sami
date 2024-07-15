import type { Metadata } from "next";
import { buildMetadata } from "../../utils/buildMetadata";
import AboutContent from "./AboutContent";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "About Sami Bentaleb, a full-stack developer focused on React, Next.js, TypeScript, website development, and data-heavy product interfaces for businesses and client projects.",
  path: "/about",
  keywords: [
    "full-stack developer portfolio",
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "hire web developer",
    "website developer",
    "web application developer",
  ],
});

export default function About() {
  return <AboutContent />;
}
