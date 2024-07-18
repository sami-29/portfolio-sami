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
        canonical='https://www.samibentaleb.com/blog'
        ogImage='https://www.samibentaleb.com/blog-og-image.jpg'
      />
      <BlogUI postMetadata={postMetadata} />
    </>
  );
}
