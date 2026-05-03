import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Calendar, Clock, Tag } from "lucide-react";
import Link from "next/link";
import { getAllPosts, getPostBySlug, serializeMdx } from "@/lib/mdx";
import { TableOfContents } from "@/components/toc";
import { GiscusComments } from "@/components/giscus-comments";
import { ReadingProgress } from "@/components/reading-progress";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const mdxSource = await serializeMdx(post.content);

  return (
    <>
      <ReadingProgress />
      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-8">
          <article className="flex-1 max-w-3xl">
            <header className="mb-8">
              <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <time>{new Date(post.date).toLocaleDateString("zh-CN")}</time>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readingTime} 分钟阅读</span>
                </div>
                <div className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  <Link 
                    href={`/categories/${post.category}/`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.category}
                  </Link>
                </div>
              </div>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${tag}/`}
                      className="text-sm px-3 py-1 bg-secondary rounded-full hover:bg-secondary/80 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
            </header>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <MDXRemote 
                source={post.content}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeHighlight],
                  },
                }}
              />
            </div>

            <GiscusComments />
          </article>

          <TableOfContents />
        </div>
      </div>
    </>
  );
}
