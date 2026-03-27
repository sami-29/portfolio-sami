import { notFound } from "next/navigation";
import type { Metadata } from "next";
import projectsData from "../projectsData";
import ProjectPageClient from "./ProjectPageClient";
import JsonLd from "../../../components/JsonLd";
import { portfolioConfig } from "../../../utils/config";
import { buildMetadata } from "../../../utils/buildMetadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projectsData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return {};

  return buildMetadata({
    title: project.title,
    description: project.subtitle || project.description,
    path: `/projects/${slug}`,
    keywords: project.keywords ?? [],
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) {
    notFound();
  }

  const projectUrl = `${portfolioConfig.seo.baseUrl}/projects/${project.slug}`;
  const imageUrl = project.images[0]?.src.src
    ? `${portfolioConfig.seo.baseUrl}${project.images[0].src.src}`
    : `${portfolioConfig.seo.baseUrl}${portfolioConfig.seo.defaultOgImage}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    url: projectUrl,
    image: imageUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    author: {
      "@type": "Person",
      name: portfolioConfig.seo.authorName,
      url: portfolioConfig.seo.baseUrl,
    },
    keywords: project.keywords?.join(", "),
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <ProjectPageClient project={project} />
    </>
  );
}
