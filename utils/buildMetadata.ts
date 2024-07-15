import type { Metadata } from "next";
import { portfolioConfig } from "./config";

export interface BuildMetadataOptions {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  keywords?: string[];
}

export function buildMetadata({
  title,
  description,
  path = "",
  ogImage,
  keywords = [],
}: BuildMetadataOptions): Metadata {
  const { seo } = portfolioConfig;
  const fullTitle = `${title} | ${seo.siteName}`;
  const canonical = `${seo.baseUrl}${path}`;
  const socialImage = ogImage
    ? (ogImage.startsWith("http") ? ogImage : `${seo.baseUrl}${ogImage}`)
    : `${seo.baseUrl}${seo.defaultOgImage}`;
  const metadataKeywords = Array.from(new Set([...seo.keywords, ...keywords]));

  return {
    title: fullTitle,
    description,
    keywords: metadataKeywords,
    metadataBase: new URL(seo.baseUrl),
    alternates: path ? { canonical } : undefined,
    openGraph: {
      type: "website",
      title: fullTitle,
      description,
      siteName: seo.siteName,
      url: canonical,
      images: [{ url: socialImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [socialImage],
    },
  };
}
