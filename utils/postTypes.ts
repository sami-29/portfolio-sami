export interface PostFrontmatter {
  title: string;
  date: string;
  subtitle: string;
  keywords?: string[];
  tags?: string[];
  ogImage?: string;
  author?: string;
  speeedyUrl?: string;
}

export interface PostMetadata extends PostFrontmatter {
  slug: string;
  content: string;
}
