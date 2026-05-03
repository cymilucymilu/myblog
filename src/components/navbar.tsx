"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Menu, X, Rss } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { SearchModal } from "./search";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/posts/", label: "文章" },
  { href: "/archive/", label: "归档" },
  { href: "/about/", label: "关于" },
  { href: "/projects/", label: "项目" },
  { href: "/friends/", label: "友链" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          我的博客
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 hover:bg-accent rounded-md transition-colors"
            aria-label="搜索"
          >
            <Search className="h-4 w-4" />
          </button>
          <Link
            href="/rss.xml"
            className="p-2 hover:bg-accent rounded-md transition-colors hidden sm:flex"
            aria-label="RSS"
          >
            <Rss className="h-4 w-4" />
          </Link>
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-accent rounded-md transition-colors"
            aria-label="菜单"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
