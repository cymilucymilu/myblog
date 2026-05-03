import { notFound } from "next/navigation";
import { getAllCategories, getPostsByCategory } from "@/lib/mdx";
import { PostCard } from "@/components/post-card";
import { Folder } from "lucide-react";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  return {
    title: `分类: ${decodeURIComponent(category)}`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const posts = getPostsByCategory(decodedCategory);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-2 mb-8">
        <Folder className="h-6 w-6" />
        <h1 className="text-3xl font-bold">分类: {decodedCategory}</h1>
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
