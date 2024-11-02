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
  description: string;
  siteUrl: string | null;
  githubUrl: string | null;
  tags?: ProjectTag[];
}
