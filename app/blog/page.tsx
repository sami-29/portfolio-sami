import getPostMetadata from "../../utils/GetPostMetadata";
import BlogUI from "../../components/BlogUI";

export default function Blogs() {
  const postMetadata = getPostMetadata();

  return (
    <>
      <head>
        <title>Blog</title>
        <meta
          name='description'
          content='Blog posts by Sami
        Bentaleb.'
        />
        <link rel='icon' href='/favicon.ico' />
      </head>
      <BlogUI postMetadata={postMetadata} />
    </>
  );
}
