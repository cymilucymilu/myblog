import Link from "next/link";
import { GitBranch, ExternalLink } from "lucide-react";

export const metadata = {
  title: "项目",
};

const projects = [
  {
    name: "个人博客",
    description: "基于 Next.js 15 + MDX 的静态博客系统，支持全文搜索、暗黑模式、评论系统",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/your-username/blog",
    demo: "https://your-blog.vercel.app",
  },
  {
    name: "工具集",
    description: "常用开发工具的集合，包含 JSON 格式化、Base64 编解码、正则测试等",
    tags: ["React", "Vite", "TypeScript"],
    github: "https://github.com/your-username/tools",
    demo: "https://your-tools.vercel.app",
  },
  {
    name: "API 服务",
    description: "基于 Node.js 的 RESTful API 服务，使用 Prisma + PostgreSQL",
    tags: ["Node.js", "Prisma", "PostgreSQL"],
    github: "https://github.com/your-username/api",
    demo: null,
  },
];

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">项目展示</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.name} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
            <p className="text-muted-foreground mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 bg-secondary rounded-md">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <GitBranch className="h-4 w-4" />
                源码
              </Link>
              {project.demo && (
                <Link
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  演示
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
