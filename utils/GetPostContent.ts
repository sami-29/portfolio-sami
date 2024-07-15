import fs from "fs";
import matter from "gray-matter";

const getPostContent = (slug: string) => {
  const folder = "posts";
  const normalizedSlug = slug.replace(/%20/g, "-");
  const file = `${folder}/${normalizedSlug}.md`;

  try {
    const content = fs.readFileSync(file, "utf8");
    return matter(content);
  } catch {
    return null;
  }
};

export default getPostContent;
