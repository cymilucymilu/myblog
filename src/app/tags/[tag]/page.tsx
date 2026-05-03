import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/mdx";
import { PostCard } from "@/components/post-card";
import { Tag } from "lucide-react";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

export async function generateMetadata({ params }: Props) {
  const { tag } = await params;
  return {
    title: `标签: ${decodeURIComponent(tag)}`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-2 mb-8">
        <Tag className="h-6 w-6" />
        <h1 className="text-3xl font-bold">标签: {decodedTag}</h1>
        <span className="text-muted-foreground">({posts.length} 篇)</span>
      </div>
      <div className="grid gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
