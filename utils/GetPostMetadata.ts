import fs from "fs";
import matter from "gray-matter";
import { PostFrontmatter, PostMetadata } from "./postTypes";

export type { PostMetadata } from "./postTypes";

export default function getPostMetadata(): PostMetadata[] {
  const folder = "posts/";
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith(".md"));
  const posts = markdownPosts.map((filename) => {
    const fileContents = fs.readFileSync(`posts/${filename}`, "utf8");
    const matterResult = matter(fileContents);
    const data = matterResult.data as Partial<PostFrontmatter>;

    return {
      title: data.title ?? "",
      date: data.date ?? "",
      subtitle: data.subtitle ?? "",
      keywords: data.keywords ?? [],
      tags: data.tags ?? [],
      ogImage: data.ogImage,
      author: data.author ?? "Sami Bentaleb",
      slug: filename.replace(".md", ""),
      content: matterResult.content,
    };
  });

  posts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  return posts;
}
