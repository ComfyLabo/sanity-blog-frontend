import { FaXTwitter, FaGithub, FaGlobe } from "react-icons/fa6";

const socials = [
  {
    name: "X",
    href: "https://x.com/yourhandle",
    icon: FaXTwitter,
  },
  {
    name: "GitHub",
    href: "https://github.com/yourhandle",
    icon: FaGithub,
  },
  {
    name: "Blog",
    href: "https://comfylabo.com",
    icon: FaGlobe,
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto flex min-h-[80vh] w-full max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      <div className="space-y-6 rounded-2xl bg-white p-10 shadow-sm">
        <h1 className="text-4xl font-semibold text-slate-900">About ComfyLabo</h1>
        <p className="text-base leading-relaxed text-gray-700">
          ComfyLabo は「ゆったり・楽しく・学べる空間」をテーマに、日々の暮らしや学びをより心地よくするヒントをお届けするブログです。運営者はデザインとプロダクトが大好きなクリエイターで、プログラミングやライフスタイル、ツール活用など幅広いテーマを発信しています。
        </p>
        <p className="text-base leading-relaxed text-gray-700">
          ゆるやかな時間のなかで、ふっと気持ちが軽くなるようなアイデアや、挑戦を後押しするナレッジを届けたい。そんな想いで、ComfyLabo はこれからもみなさんの日常に寄り添うコンテンツを紡いでいきます。
        </p>

        <div className="pt-4">
          <h2 className="text-lg font-medium text-slate-800">SNS Links</h2>
          <div className="mt-4 flex justify-center gap-6">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="text-2xl text-gray-600 transition-colors hover:text-blue-600"
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
