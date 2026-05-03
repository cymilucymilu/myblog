import { MetadataRoute } from "next";
import { getAllPosts, getAllTags, getAllCategories } from "@/lib/mdx";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://your-blog.vercel.app";
  
  const routes = [
    "",
    "posts/",
    "archive/",
    "about/",
    "projects/",
    "friends/",
  ].map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const posts = getAllPosts().map((post) => ({
    url: `${baseUrl}/posts/${post.slug}/`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const tags = getAllTags().map((tag) => ({
    url: `${baseUrl}/tags/${encodeURIComponent(tag)}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  const categories = getAllCategories().map((category) => ({
    url: `${baseUrl}/categories/${encodeURIComponent(category)}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...routes, ...posts, ...tags, ...categories];
}
