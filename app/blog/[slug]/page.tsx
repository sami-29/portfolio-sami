import getPostContent from "../../../utils/GetPostContent";
import getPostMetadata from "../../../utils/GetPostMetadata";
import { urlParamType } from "./UrlType";
import BlogPost from "../../../components/BlogPost";
import SEO from "../../../components/SEO";

export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

export default function Post(props: urlParamType) {
  const slug = props.params.slug;
  const post = getPostContent(slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <SEO 
        title={post.data.title || "Blog Post"}
        description={post.data.subtitle || "Read this blog post by Sami Bentaleb"}
        canonical={`https://www.samibentaleb.com/blog/${slug}`}
        ogImage={post.data.ogImage || "https://www.samibentaleb.com/default-blog-og-image.jpg"}
      />
      <BlogPost
        title={post.data.title || ""}
        subtitle={post.data.subtitle || ""}
        date={post.data.date || ""}
        content={post.content || ""}
      />
    </>
  );
}
