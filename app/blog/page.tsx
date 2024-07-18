import PostPreview from "../../components/PostPreview";
import getPostMetadata from "../../utils/GetPostMetadata";

export default function Blogs() {
  const postMetadata = getPostMetadata();
  const postPreviews = postMetadata.map((post) => (
    <PostPreview key={post.slug} {...post} />
  ));

  return (
    <main>
      <div className="max-w-2xl mx-auto mt-24 px-4">
        <h1 className="text-4xl font-bold mb-10">Blog posts</h1>
        <div className="space-y-6">
          {postPreviews}
        </div>
      </div>
    </main>
  );
}
