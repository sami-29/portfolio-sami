import type { Metadata } from "next";
import { buildMetadata } from "../../utils/buildMetadata";
import { BIRTH_DATE } from "../../utils/constants";
import { getAge } from "../../utils/formatters";
import AboutContent from "./AboutContent";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: `About Sami Bentaleb, a ${getAge(BIRTH_DATE)}-year-old full-stack developer from Algeria. CS graduate of Badji Mokhtar University, building data-heavy web apps with React, Next.js, and TypeScript.`,
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
