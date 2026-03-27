import { notFound } from "next/navigation";
import type { Metadata } from "next";
import getPostContent from "../../../utils/getPostContent";
import getPostMetadata from "../../../utils/getPostMetadata";
import { urlParamType } from "./UrlType";
import BlogPost from "../../../components/BlogPost";
import { buildMetadata } from "../../../utils/buildMetadata";
import { portfolioConfig } from "../../../utils/config";
import { PostFrontmatter } from "../../../utils/postTypes";
import JsonLd from "../../../components/JsonLd";

export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

export async function generateMetadata(props: urlParamType): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostContent(slug);
  if (!post) return {};
  const postData = post.data as Partial<PostFrontmatter>;

  return buildMetadata({
    title: postData.title || "Blog Post",
    description:
      postData.subtitle ||
      "Read this article by Sami Bentaleb on website development, product engineering, and real-world software projects.",
    path: `/blog/${slug}`,
    ogImage: postData.ogImage || portfolioConfig.seo.defaultOgImage,
    keywords: postData.keywords ?? [],
  });
}

export default async function Post(props: urlParamType) {
  const { slug } = await props.params;
  const post = getPostContent(slug);

  if (!post) {
    notFound();
  }

  const postData = post.data as Partial<PostFrontmatter>;
  const postUrl = `${portfolioConfig.seo.baseUrl}/blog/${slug}`;
  const postImage = postData.ogImage
    ? postData.ogImage.startsWith("http")
      ? postData.ogImage
      : `${portfolioConfig.seo.baseUrl}${postData.ogImage}`
    : `${portfolioConfig.seo.baseUrl}${portfolioConfig.seo.defaultOgImage}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: postData.title || "Blog Post",
    description:
      postData.subtitle ||
      "Article by Sami Bentaleb on software engineering, websites, and product development.",
    datePublished: postData.date,
    dateModified: postData.date,
    author: {
      "@type": "Person",
      name: postData.author || portfolioConfig.seo.authorName,
      url: portfolioConfig.seo.baseUrl,
    },
    mainEntityOfPage: postUrl,
    url: postUrl,
    image: postImage,
    keywords: postData.keywords?.join(", "),
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <BlogPost
        title={postData.title || ""}
        subtitle={postData.subtitle || ""}
        date={postData.date || ""}
        content={post.content || ""}
        speeedyUrl={postData.speeedyUrl}
      />
    </>
  );
}
