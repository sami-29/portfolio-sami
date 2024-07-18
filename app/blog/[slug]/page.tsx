import getPostContent from "../../../utils/GetPostContent";
import getPostMetadata from "../../../utils/GetPostMetadata";
import { urlParamType } from "./UrlType";
import BlogPost from "../../../components/BlogPost";

export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

export default function Post(props: urlParamType) {
  const slug = props.params.slug;
  const post = getPostContent(slug);

  return (
    <BlogPost
      title={post.data.title}
      subtitle={post.data.subtitle}
      date={post.data.date}
      content={post.content}
    />
  );
}
