import Link from "next/link";
import { groq } from "next-sanity";

import { client } from "@/lib/sanity";

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
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center bg-slate-50 px-4 py-16">
      <h1 className="text-center text-4xl font-bold text-slate-900">ComfyLabo Blog</h1>

      {posts.length === 0 ? (
        <p className="mt-12 text-center text-slate-500">まだ記事がありません。</p>
      ) : (
        <ul className="mt-12 w-full space-y-6">
          {posts.map((post) => (
            <li key={post._id} className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md">
              <Link
                href={`/posts/${post.slug?.current ?? ""}`}
                className="text-2xl font-semibold text-blue-600 hover:text-blue-700"
              >
                {post.title}
              </Link>
              <p className="mt-2 text-sm text-slate-500">
                {post.authorName ?? "不明な投稿者"} ・ {formatDate(post.publishedAt)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
