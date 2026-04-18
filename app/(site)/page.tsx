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
    <main className="mx-auto w-full max-w-4xl px-5 py-14 sm:py-20">
      <div className="max-w-2xl">
        <p className="text-sm tracking-[0.18em] text-stone-500 uppercase">Blog</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
          シンプルに読めるブログ
        </h1>
        <p className="mt-4 text-base leading-8 text-stone-600">
          Sanity で管理している記事を、余計な装飾を抑えて読みやすく一覧表示しています。
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="mt-16 text-stone-500">まだ記事がありません。</p>
      ) : (
        <ul className="mt-14 divide-y divide-stone-200 border-y border-stone-200">
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
