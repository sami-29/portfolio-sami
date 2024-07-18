import getPostMetadata from "../../utils/GetPostMetadata";
import BlogUI from "../../components/BlogUI";

export default function Blogs() {
  const postMetadata = getPostMetadata();

  return <BlogUI postMetadata={postMetadata} />;
}
