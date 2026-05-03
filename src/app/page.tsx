import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/mdx";
import { PostCard } from "@/components/post-card";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4">欢迎来到我的博客</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          分享技术、记录生活、探索未知。这里是我思考和学习的空间。
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <Link
            href="/posts/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            浏览文章
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/about/"
            className="inline-flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-accent transition-colors"
          >
            了解更多
          </Link>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">最新文章</h2>
          <Link
            href="/posts/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            查看全部 →
          </Link>
        </div>
        <div className="grid gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
