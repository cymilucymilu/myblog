import { getAllPosts } from "@/lib/mdx";

export const dynamic = "force-static";

export async function GET() {
  const posts = getAllPosts();
  const baseUrl = "https://your-blog.vercel.app";

  const rss = `\u003c?xml version="1.0" encoding="UTF-8"?\u003e
\u003crss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"\u003e
  \u003cchannel\u003e
    \u003ctitle\u003e我的博客\u003c/title\u003e
    \u003clink\u003e${baseUrl}\u003c/link\u003e
    \u003cdescription\u003e一个基于 Next.js 的个人博客\u003c/description\u003e
    \u003clanguage\u003ezh-CN\u003c/language\u003e
    \u003clastBuildDate\u003e${new Date().toUTCString()}\u003c/lastBuildDate\u003e
    \u003catom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" /\u003e
    ${posts
      .map(
        (post) => `
    \u003citem\u003e
      \u003ctitle\u003e${post.title}\u003c/title\u003e
      \u003clink\u003e${baseUrl}/posts/${post.slug}/\u003c/link\u003e
      \u003cguid\u003e${baseUrl}/posts/${post.slug}/\u003c/guid\u003e
      \u003cpubDate\u003e${new Date(post.date).toUTCString()}\u003c/pubDate\u003e
      \u003cdescription\u003e${post.description}\u003c/description\u003e
    \u003c/item\u003e`
      )
      .join("")}
  \u003c/channel\u003e
\u003c/rss\u003e`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
