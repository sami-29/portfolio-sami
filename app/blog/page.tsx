import type { Metadata } from "next";
import getPostMetadata from "../../utils/GetPostMetadata";
import BlogUI from "../../components/BlogUI";
import { buildMetadata } from "../../utils/buildMetadata";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Read blog posts by Sami Bentaleb on website development, website SEO, web performance, mobile-first design, TypeScript, and real-world product engineering.",
  path: "/blog",
  keywords: [
    "website development blog",
    "website building blog",
    "web development articles",
    "SEO blog",
    "TypeScript blog",
    "web performance blog",
  ],
});

export default function Blogs() {
  const postMetadata = getPostMetadata();
  return <BlogUI postMetadata={postMetadata} />;
}
