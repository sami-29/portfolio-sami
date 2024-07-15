import type { StaticImageData } from "next/image";
import git from "../../public/assets/about/git.webp";
import NextJs from "../../public/assets/about/NextJs.webp";
import node from "../../public/assets/about/node.webp";
import tailwind from "../../public/assets/about/tailwind.webp";
import typescript from "../../public/assets/about/typescript.webp";
import react from "../../public/assets/about/react.webp";
import prisma from "../../public/assets/about/Prisma.png";
import tRPC from "../../public/assets/about/tRPC.webp";

export interface PrimaryTool {
  title: string;
  context: string;
  src: StaticImageData;
  website: string;
}

export const primaryStack: PrimaryTool[] = [
  {
    title: "TypeScript",
    context: "Typed throughoutshared interfaces between API and client, catches issues before they ship.",
    src: typescript,
    website: "https://www.typescriptlang.org",
  },
  {
    title: "React",
    context: "SPAs, data-heavy dashboards, complex interactive UIs.",
    src: react,
    website: "https://react.dev",
  },
  {
    title: "Next.js",
    context: "Full-stack apps with App Router, server actions, and API routes.",
    src: NextJs,
    website: "https://nextjs.org",
  },
  {
    title: "Node.js",
    context: "APIs, serverless functions, build tooling.",
    src: node,
    website: "https://nodejs.org",
  },
  {
    title: "Prisma",
    context: "Schema-first ORM. Strongly typed queries, clean migrations.",
    src: prisma,
    website: "https://www.prisma.io",
  },
  {
    title: "tRPC",
    context: "End-to-end type-safe APIs; no schema drift between server and client.",
    src: tRPC,
    website: "https://trpc.io",
  },
  {
    title: "Tailwind CSS",
    context: "Fast, consistent styling for applications and dashboards.",
    src: tailwind,
    website: "https://tailwindcss.com",
  },
  {
    title: "Git",
    context: "Version control and collaborative workflows.",
    src: git,
    website: "https://git-scm.com",
  },
];

export const otherTools: string[] = [
  "JavaScript",
  "Python",
  "Go",
  "SQL / PostgreSQL",
  "MongoDB",
  "Supabase",
  "Astro",
  "Vite",
  "Mapbox GL JS",
  "Turf.js",
  "D3.js",
  "Framer Motion",
  "HTMX",
  "Flask",
  "PHP",
  "Vue",
  "Nuxt",
  "Cloudflare Workers",
  "AWS",
  "Linux",
  "Playwright",
  "BAML",
  "Three.js",
];
