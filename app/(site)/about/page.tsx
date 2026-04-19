import { FaGithub, FaGlobe, FaXTwitter } from "react-icons/fa6";

import { PostBody } from "@/components/post-body";
import { client, type SanityPostBody } from "@/lib/sanity";

export const revalidate = 60;

const fallbackSocials = [
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

type SocialLink = {
  name: string;
  href: string;
};

type AboutContent = {
  title?: string;
  body?: SanityPostBody;
  socialLinks?: SocialLink[];
};

const aboutQuery = `*[_type == "about"][0]{
  title,
  body,
  socialLinks[]{
    name,
    href
  }
}`;

const fallbackBody = [
  {
    _type: "block",
    _key: "fallback-body-1",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "fallback-span-1",
        text: "ComfyLabo は「ゆったり・楽しく・学べる空間」をテーマに、日々の暮らしや学びをより心地よくするヒントをお届けするブログです。運営者はデザインとプロダクトが大好きなクリエイターで、プログラミングやライフスタイル、ツール活用など幅広いテーマを発信しています。",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "fallback-body-2",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "fallback-span-2",
        text: "ゆるやかな時間のなかで、ふっと気持ちが軽くなるようなアイデアや、挑戦を後押しするナレッジを届けたい。そんな想いで、ComfyLabo はこれからもみなさんの日常に寄り添うコンテンツを紡いでいきます。",
        marks: [],
      },
    ],
  },
] satisfies SanityPostBody;

const socialIconMap = {
  X: FaXTwitter,
  GitHub: FaGithub,
  Blog: FaGlobe,
} as const;

export default async function AboutPage() {
  const about = await client.fetch<AboutContent | null>(aboutQuery);
  const title = about?.title ?? "About ComfyLabo";
  const body = about?.body ?? fallbackBody;
  const socials = (about?.socialLinks?.length ? about.socialLinks : fallbackSocials).map((social) => ({
    ...social,
    icon: socialIconMap[social.name as keyof typeof socialIconMap] ?? FaGlobe,
  }));

  return (
    <main className="mx-auto flex min-h-[80vh] w-full max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      <div className="space-y-6 rounded-2xl bg-white p-10 shadow-sm">
        <h1 className="text-4xl font-semibold text-slate-900">{title}</h1>
        <PostBody body={body} className="mx-auto text-left" />

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
