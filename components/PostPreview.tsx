import Link from "next/link";
import { PostMetadata } from "../utils/GetPostMetadata";

const PostPreview = (props: PostMetadata) => {
  return (
    <div>
      <Link href={"./blog/" + props.slug}>
        <h2 className='text-xl sm:text-2xl lg:text-2xl dark:text-white'>
          {props.title}
        </h2>
        <h3 className='text-sm md:text-base  dark:text-gray-400'>
          {props.subtitle}
        </h3>
      </Link>
    </div>
  );
};

export default PostPreview;
