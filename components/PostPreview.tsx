import Link from "next/link";
import { PostMetadata } from "../utils/GetPostMetadata";

const PostPreview = (props: PostMetadata) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors duration-200">
      <Link href={`/blog/${props.slug}`} className="block">
        <h2 className="text-xl font-bold mb-2">{props.title}</h2>
        <p className="text-gray-600">{props.subtitle}</p>
        <p className="text-sm text-gray-500 mt-2">{props.date.toDateString()}</p>
      </Link>
    </div>
  );
};

export default PostPreview;
