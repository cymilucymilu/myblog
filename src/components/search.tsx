"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import Fuse from "fuse.js";
import { Post } from "@/lib/mdx";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (open) {
      fetch("/posts.json")
        .then((res) => res.json())
        .then((data) => setPosts(data))
        .catch(() => setPosts([]));
    }
  }, [open]);

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ["title", "description", "tags", "category"],
        threshold: 0.3,
      }),
    [posts]
  );

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).map((result) => result.item);
  }, [query, fuse]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="fixed left-1/2 top-1/4 -translate-x-1/2 w-full max-w-lg bg-background rounded-lg shadow-lg border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 p-4 border-b">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="搜索文章..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
            autoFocus
          />
          <button onClick={onClose} className="p-1 hover:bg-accent rounded">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-2">
          {results.length === 0 && query.trim() && (
            <p className="text-sm text-muted-foreground text-center py-8">
              未找到相关文章
            </p>
          )}
          {results.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}/`}
              onClick={onClose}
              className="block p-3 hover:bg-accent rounded-md transition-colors"
            >
              <h3 className="font-medium text-sm">{post.title}</h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
