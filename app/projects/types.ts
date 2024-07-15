import { StaticImageData } from "next/image";

export interface ProjectImage {
  src: StaticImageData;
  alt: string;
  isSpecial?: boolean;
  isCustomStyles?: boolean;
}

export interface ProjectTag {
  label: string;
  colorScheme: string;
}

export interface Project {
  images: ProjectImage[];
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  keywords?: string[];
  problem?: string;
  architecture?: string[];
  challenges?: string[];
  results?: string[];
  tags?: ProjectTag[];
  siteUrl: string | null;
  githubUrl: string | null;
  featured?: boolean;
  clientSite?: boolean;
  videoUrl?: string;
}
