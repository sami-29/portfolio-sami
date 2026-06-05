import type { Metadata } from "next";
import { buildMetadata } from "../../utils/buildMetadata";
import { BIRTH_DATE } from "../../utils/constants";
import { getAge } from "../../utils/formatters";
import AboutContent from "./AboutContent";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: `About Sami Bentaleb, ${getAge(BIRTH_DATE)}, from Algeria. CS grad from Badji Mokhtar University. Full-stack developer working in React, Next.js, and TypeScript.`,
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
