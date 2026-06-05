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
    context:
      "Types everywhere. Shared interfaces between API and client so things break in the editor, not in prod.",
    src: typescript,
    website: "https://www.typescriptlang.org",
  },
  {
    title: "React",
    context: "SPAs and dashboards with a lot of state on screen at once.",
    src: react,
    website: "https://react.dev",
  },
  {
    title: "Next.js",
    context: "Full-stack apps. App Router, server actions, API routes when I need them.",
    src: NextJs,
    website: "https://nextjs.org",
  },
  {
    title: "Node.js",
    context: "Backend APIs, serverless functions, build scripts.",
    src: node,
    website: "https://nodejs.org",
  },
  {
    title: "Prisma",
    context: "ORM of choice. Schema first, migrations I don't hate.",
    src: prisma,
    website: "https://www.prisma.io",
  },
  {
    title: "tRPC",
    context: "Type-safe APIs without maintaining a separate OpenAPI spec.",
    src: tRPC,
    website: "https://trpc.io",
  },
  {
    title: "Tailwind CSS",
    context: "Utility CSS for apps where I don't want a giant stylesheet.",
    src: tailwind,
    website: "https://tailwindcss.com",
  },
  {
    title: "Git",
    context: "Branches, PRs, commits future me can actually read.",
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
