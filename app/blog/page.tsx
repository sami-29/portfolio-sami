import PostPreview from "../../components/PostPreview";
import getPostMetadata from "../../utils/GetPostMetadata";

export default function Blogs() {
  const postMetadata = getPostMetadata();
  const postPreviews = postMetadata.map((post, i) => (
    <PostPreview key={post.slug} {...post} />
  ));
  return (
    <main className='dark:text-white'>
      <div className='flex flex-col font-mono ml-auto mr-auto mt-24 px-4 sm:px:0 sm:w-3/4 xl:w-1/2'>
        <h1 className='text-4xl sm:text-5xl md:text-5xl lg:text-6xl mb-10'>
          Blog posts
        </h1>

        <div className='border  border-black dark:border-zinc-400 dark:hover:border-red-400 hover:border-red-400 flex place-content-center '>
          {postPreviews}
        </div>
      </div>
    </main>
  );
}
