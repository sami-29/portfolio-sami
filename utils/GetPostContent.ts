import fs from "fs";
import matter from "gray-matter";

const getPostContent = (slug: string) => {
  const folder = "posts";
  slug = slug.replace(/%20/g, "-");

  const file = `${folder}/${slug}.md`;

  console.log(`Slug: ${slug}`);
  console.log(`Attempting to read file: ${file}`);

  const content = fs.readFileSync(file, "utf8");
  const matterResult = matter(content);

  return matterResult;
};

export default getPostContent;
