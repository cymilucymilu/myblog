import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { Calendar } from "lucide-react";

export default function ArchivePage() {
  const posts = getAllPosts();
  
  const groupedPosts = posts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {} as Record<number, typeof posts>);

  const years = Object.keys(groupedPosts)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">归档</h1>
      <div className="space-y-12">
        {years.map((year) => (
          <section key={year}>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {year} ({groupedPosts[year].length} 篇)
            </h2>
            <div className="space-y-4">
              {groupedPosts[year].map((post) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}/`}
                  className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <time className="text-sm text-muted-foreground shrink-0 w-24">
                    {new Date(post.date).toLocaleDateString("zh-CN", {
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <div>
                    <h3 className="font-medium">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{post.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
