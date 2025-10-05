import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";

import { client } from "@/lib/sanity";

type Post = {
  title: string;
  authorName?: string;
  publishedAt?: string;
  body?: any;
};

const postQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  title,
  "authorName": author->name,
  publishedAt,
  body
}`;

async function getPost(slug: string): Promise<Post | null> {
  return client.fetch(postQuery, { slug });
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

type Props = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params }: Props): Promise<JSX.Element> {
  const { slug } = params;
  const post = await getPost(slug);

  if (!post) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center bg-slate-50 px-4 py-16">
        <p className="text-lg text-slate-600">記事が見つかりません。</p>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl bg-slate-50 px-4 py-16">
      <article className="prose prose-lg max-w-none rounded-2xl bg-white p-8 text-gray-800 shadow-sm">
        <h1 className="mb-2 text-4xl font-bold text-slate-900">{post.title}</h1>
        <p className="mt-0 text-sm text-slate-500">
          {post.authorName ?? "不明な投稿者"} ・ {formatDate(post.publishedAt)}
        </p>
        <div className="mt-8">
          {post.body ? <PortableText value={post.body} /> : <p>本文がありません。</p>}
        </div>
      </article>
    </main>
  );
}
