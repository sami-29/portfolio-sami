import getPostContent from "../../../utils/GetPostContent";
import Markdown from "markdown-to-jsx";
import getPostMetadata from "../../../utils/GetPostMetadata";
import { urlParamType } from "./UrlType";

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
    <div className='prose dark:prose-invert flex flex-col font-mono ml-auto mr-auto mt-24 px-4 sm:px:0 sm:w-3/4 xl:w-1/2'>
      <h1 className='text-4xl sm:text-5xl md:text-5xl lg:text-6xl'>
        {post.data.title}
      </h1>
      <Markdown>{post.content}</Markdown>
    </div>
  );
}
