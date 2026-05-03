import { getAllPosts } from "@/lib/mdx";
import { PostCard } from "@/components/post-card";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">全部文章</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
