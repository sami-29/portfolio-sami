import type { Metadata } from "next";
import { buildMetadata } from "../../../utils/buildMetadata";
import projectsData from "../projectsData";

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return {};

  const derivedKeywords = [
    project.title,
    project.slug,
    ...(project.tags?.map((tag) => tag.label) ?? []),
    ...(project.keywords ?? []),
  ];

  return buildMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${slug}`,
    ogImage: project.images[0]?.src.src,
    keywords: Array.from(new Set(derivedKeywords)),
  });
}

export default function ProjectLayout({ children }: Props) {
  return children;
}
