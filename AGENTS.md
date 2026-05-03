# AGENTS.md

## 技术栈

- **框架**: Next.js 16 (App Router, Static Export)
- **语言**: TypeScript
- **样式**: Tailwind CSS v4 + shadcn/ui
- **内容**: MDX (本地 Markdown 文件)
- **搜索**: Fuse.js (客户端全文搜索)
- **评论**: Giscus (GitHub Discussions)
- **部署**: 静态导出 (Vercel / 任意静态托管)

## 关键命令

```bash
# 开发
npm run dev          # 启动开发服务器 localhost:3000

# 构建
npm run build        # 生成静态文件到 dist/ 目录
# 注意：构建前会自动运行 scripts/generate-search-data.js 生成搜索数据

# 检查
npm run lint         # ESLint 检查
```

## 项目结构

```
blog/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # 首页（最新文章 + 简介）
│   │   ├── layout.tsx         # 根布局（导航 + 页脚 + SEO）
│   │   ├── globals.css        # 全局样式 + 代码高亮
│   │   ├── posts/
│   │   │   ├── page.tsx       # 文章列表
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # 文章详情（MDX + 目录 + 评论）
│   │   ├── tags/[tag]/
│   │   │   └── page.tsx       # 标签过滤
│   │   ├── categories/[category]/
│   │   │   └── page.tsx       # 分类过滤
│   │   ├── archive/
│   │   │   └── page.tsx       # 时间线归档
│   │   ├── about/
│   │   │   └── page.tsx       # 关于页
│   │   ├── projects/
│   │   │   └── page.tsx       # 项目展示
│   │   ├── friends/
│   │   │   └── page.tsx       # 友链
│   │   ├── sitemap.ts         # 动态 Sitemap
│   │   ├── robots.ts          # 搜索引擎配置
│   │   └── rss.xml/
│   │       └── route.ts       # RSS 订阅
│   ├── components/
│   │   ├── ui/               # shadcn/ui 组件
│   │   ├── navbar.tsx        # 导航栏（响应式 + 搜索入口）
│   │   ├── footer.tsx        # 页脚
│   │   ├── post-card.tsx     # 文章卡片
│   │   ├── search.tsx        # 搜索弹窗（Fuse.js 模糊搜索）
│   │   ├── toc.tsx           # 文章目录（自动提取 H2/H3）
│   │   ├── theme-toggle.tsx  # 暗黑模式切换
│   │   ├── giscus-comments.tsx # 评论区
│   │   └── reading-progress.tsx # 阅读进度条
│   └── lib/
│       ├── mdx.ts           # MDX 解析工具（核心）
│       └── utils.ts         # 通用工具
├── content/
│   └── posts/               # MDX 文章存放目录
├── scripts/
│   └── generate-search-data.js  # 构建时生成搜索数据
├── public/
│   └── posts.json           # 构建生成的搜索数据
├── next.config.ts           # Next.js 配置（静态导出）
└── package.json
```

## 核心约定

### 1. 文章格式

在 `content/posts/` 创建 `.mdx` 文件，Frontmatter 格式：

```mdx
---
title: "文章标题"
date: "2026-05-03"
description: "文章描述"
tags: ["标签1", "标签2"]
category: "分类"
---

# 正文内容
```

- **slug**: 文件名（不含扩展名）
- **必需**: title, date, description
- **可选**: tags, category, cover

### 2. 静态导出限制

- 配置 `output: "export"`，所有页面构建时生成
- API 路由不可用（已用构建脚本替代）
- 搜索数据通过 `scripts/generate-search-data.js` 在构建时生成到 `public/posts.json`
- 图片必须放 `public/` 目录，配置 `images.unoptimized: true`
- 动态路由（RSS/Sitemap/Robots）需添加 `export const dynamic = "force-static"`

### 3. 搜索实现

- 构建时生成 `public/posts.json`（标题/描述/标签/分类）
- 客户端 Fuse.js 模糊搜索，阈值 0.3
- 搜索组件挂载时异步加载 posts.json

### 4. 评论系统 (Giscus)

- 基于 GitHub Discussions，零成本
- 需在 `src/components/giscus-comments.tsx` 配置：
  - `data-repo`: 你的 GitHub 仓库
  - `data-repo-id`: 仓库 ID
  - `data-category-id`: Discussion 分类 ID
- 获取配置：https://giscus.app/zh-CN

### 5. 主题切换

- CSS class `.dark` 控制暗黑模式
- 状态保存在 `localStorage`（key: `theme`）
- 默认跟随系统偏好（`prefers-color-scheme`）
- `layout.tsx` 已添加 `suppressHydrationWarning`

### 6. lucide-react 图标

当前版本无 `Github`/`Twitter` 图标，已替换为：
- `Globe` 替代 GitHub 链接
- `MessageCircle` 替代 Twitter 链接
- `GitBranch` 替代项目页的 GitHub

## SEO 配置

- `layout.tsx` 基础元数据（OpenGraph, Twitter Card, robots）
- 文章页自动生成 title/description/keywords
- Sitemap 包含所有文章、标签、分类（自动生成）
- RSS: `/rss.xml`
- Robots: `/robots.txt`

## 部署

### Vercel (推荐)

1. 连接 GitHub 仓库
2. 构建命令：`npm run build`（已包含搜索数据生成）
3. 输出目录：`dist`
4. 自动部署

### 其他静态托管

```bash
npm run build
# 部署 dist/ 目录到任意静态托管（GitHub Pages / Netlify / Cloudflare Pages）
```

## 环境要求

- **Node.js**: 20+（Next.js 16 + shadcn/ui 4.6+ 要求）
- **包管理器**: npm 10+（Node.js 20 自带）

## 已知问题与注意事项

1. **Turbopack**: Next.js 16 默认启用，不支持自定义 webpack 配置，因此使用独立脚本生成搜索数据
2. **Tailwind CSS v4**: 使用 `@import "tailwindcss"` 语法，与 v3 的 `@tailwind` 指令不同
3. **静态导出**: 不支持 `next/headers`, `next/cookies`, API Routes 等动态功能
4. **图片优化**: 静态导出下 `next/image` 优化不可用，使用 `unoptimized: true`

## 扩展建议

- **分析**: Vercel Analytics 或 Google Analytics
- **图片**: Cloudinary / Vercel Blob 优化
- **CMS**: Notion API / Strapi / Sanity（替代本地 MDX）
- **多语言**: next-intl 添加 i18n
- **CI/CD**: GitHub Actions 自动构建部署
