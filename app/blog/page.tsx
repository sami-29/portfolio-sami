import getPostMetadata from "../../utils/GetPostMetadata";
import BlogUI from "../../components/BlogUI";
import SEO from "../../components/SEO";

export default function Blogs() {
  const postMetadata = getPostMetadata();

  return (
    <>
      <SEO
        title='Blog'
        description='Explore thoughts and insights on web development and technology by Sami Bentaleb.'
        path='/blog'
      />
      <BlogUI postMetadata={postMetadata} />
    </>
  );
}
