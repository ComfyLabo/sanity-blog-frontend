import Image from "next/image";
import Link from "next/link";
import { groq } from "next-sanity";

import { client } from "@/lib/sanity";

export const revalidate = 60;

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  authorName?: string;
  publishedAt?: string;
};

const postsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  "authorName": author->name,
  publishedAt
}`;

async function getPosts(): Promise<Post[]> {
  return client.fetch(postsQuery);
}

const formatDate = (value?: string) => {
  if (!value) return "日付不明";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "日付不明";

  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main className="mx-auto w-full max-w-4xl px-5 py-14 sm:py-16">
      <header className="relative mb-10 overflow-hidden border border-stone-300 bg-stone-100 px-5 py-5 sm:px-6">
        <Image
          src="/comfy-labo-logo.png"
          alt=""
          width={320}
          height={320}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 object-contain opacity-10 sm:h-56 sm:w-56"
        />
        <div className="relative">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-stone-500">
            Crypto Log Interface
          </p>
          <h1 className="mt-3 font-mono text-2xl font-semibold uppercase tracking-[0.14em] text-stone-900 sm:text-5xl">
            Hello Crypto Investment!
          </h1>
        </div>
      </header>

      {posts.length === 0 ? (
        <p className="text-stone-500">まだ記事がありません。</p>
      ) : (
        <ul className="divide-y divide-stone-200 border-y border-stone-200">
          {posts.map((post) => (
            <li key={post._id} className="py-7">
              <p className="text-sm text-stone-500">
                {formatDate(post.publishedAt)}
                {" ・ "}
                {post.authorName ?? "不明な投稿者"}
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900">
                <Link href={`/posts/${post.slug?.current ?? ""}`} className="transition-colors hover:text-stone-600">
                  {post.title}
                </Link>
              </h2>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
