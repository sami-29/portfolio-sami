import Link from "next/link";
import { PostMetadata } from "../utils/GetPostMetadata";

const PostPreview = (props: PostMetadata) => {
  return (
    <div className='p-2 border border-black dark:border-zinc-400 dark:hover:border-red-400 hover:border-red-400 place-content-center min-h-[6rem]'>
      <Link href={"./blog/" + props.slug}>
        <h2 className='text-xl font-bold sm:text-2xl lg:text-2xl dark:text-white'>
          {props.title}
        </h2>
        <h3 className='text-sm md:text-base dark:text-gray-400'>
          {props.subtitle}
        </h3>
      </Link>
    </div>
  );
};

export default PostPreview;
