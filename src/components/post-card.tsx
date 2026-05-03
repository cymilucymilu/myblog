"use client";

import Link from "next/link";
import { Calendar, Clock, Tag } from "lucide-react";
import { Post } from "@/lib/mdx";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group border rounded-lg p-6 hover:shadow-md transition-shadow">
      <Link href={`/posts/${post.slug}/`}>
        <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {post.title}
        </h2>
      </Link>
      
      <p className="text-muted-foreground mb-4 line-clamp-2">
        {post.description}
      </p>
      
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <time>{new Date(post.date).toLocaleDateString("zh-CN")}</time>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{post.readingTime} 分钟阅读</span>
        </div>
        <div className="flex items-center gap-1">
          <Tag className="h-3 w-3" />
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
              className="text-xs px-2 py-1 bg-secondary rounded-md hover:bg-secondary/80 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
