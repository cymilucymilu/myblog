import Link from "next/link";
import { ExternalLink } from "lucide-react";

export const metadata = {
  title: "友链",
};

const friends = [
  {
    name: "示例博客",
    description: "一个优秀的技术博客",
    url: "https://example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=example",
  },
];

export default function FriendsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">友情链接</h1>
        <p className="text-muted-foreground mb-8">
          这里是我关注的一些优秀博主和网站，欢迎互访交流。
        </p>

        <div className="grid gap-4">
          {friends.map((friend) => (
            <Link
              key={friend.name}
              href={friend.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent transition-colors"
            >
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-medium">{friend.name}</h2>
                  <ExternalLink className="h-3 w-3 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">{friend.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-6 border rounded-lg bg-muted/50">
          <h2 className="font-semibold mb-2">交换友链</h2>
          <p className="text-sm text-muted-foreground">
            如果你想交换友链，请通过邮件联系我，附上你的网站名称、描述和链接。
          </p>
        </div>
      </div>
    </div>
  );
}
