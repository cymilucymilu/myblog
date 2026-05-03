import { Globe, MessageCircle, Mail, MapPin, Briefcase } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "关于",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-32 h-32 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-4xl">&#128104;</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">关于我</h1>
          <p className="text-muted-foreground">全栈开发者 / 技术博主</p>
        </div>

        <div className="space-y-6">
          <section className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">简介</h2>
            <p className="text-muted-foreground leading-relaxed">
              你好！我是一名热爱技术的开发者，喜欢探索新技术并分享学习心得。
              这个博客是我记录技术成长和生活感悟的地方，希望能给你带来一些启发。
            </p>
          </section>

          <section className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">技能栈</h2>
            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "TypeScript", "Node.js", "Python", "Go", "Docker", "Kubernetes"].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-secondary rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">联系方式</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>中国 · 北京</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                <span>某互联网公司</span>
              </div>
              <Link
                href="https://github.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span>GitHub</span>
              </Link>
              <Link
                href="https://twitter.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>MessageCircle</span>
              </Link>
              <Link
                href="mailto:email@example.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>email@example.com</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
