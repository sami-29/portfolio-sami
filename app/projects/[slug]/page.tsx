import { notFound } from "next/navigation";
import projectsData from "../projectsData";
import ProjectPageClient from "./ProjectPageClient";
import JsonLd from "../../../components/JsonLd";
import { portfolioConfig } from "../../../utils/config";

type Props = {
  params: Promise<{ slug: string }>;
};

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
      <ProjectPageClient />
    </>
  );
}
