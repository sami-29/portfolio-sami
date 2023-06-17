import PostPreview from "../../components/PostPreview";
import getPostMetadata from "../../utils/GetPostMetadata";

export default function Blogs() {
  const postMetadata = getPostMetadata();
  const postPreviews = postMetadata.map((post, i) => (
    <PostPreview key={post.slug} {...post} />
  ));
  return (
    <main className='dark:text-white'>
      <div className='flex flex-col px-4 mt-24 ml-auto mr-auto font-mono sm:px:0 sm:w-3/4 xl:w-1/2'>
        <h1 className='mb-10 text-4xl sm:text-5xl md:text-5xl lg:text-6xl'>
          Blog posts
        </h1>

        <div className='flex flex-col gap-6'>{postPreviews}</div>
      </div>
    </main>
  );
}
