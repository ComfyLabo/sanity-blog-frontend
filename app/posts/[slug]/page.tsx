import type { ReactElement } from "react";
import type { PortableTextBlock } from "@portabletext/types";
import { PortableText } from "@portabletext/react";

import { client } from "@/lib/sanity";

type Params = { slug: string };

type Props = {
  params: Promise<Params>;
  searchParams: Promise<Record<string, string | string[]>>;
};

type Post = {
  title: string;
  body: PortableTextBlock[];
  authorName?: string;
  publishedAt?: string;
};

const postQuery = `*[_type == "post" && slug.current == $slug][0]{
  title,
  body,
  "authorName": author->name,
  publishedAt
}`;

export default async function PostPage({
  params,
}: Props): Promise<ReactElement> {
  const { slug } = await params;

  const post = await client.fetch<Post | null>(postQuery, { slug });

  if (!post) {
    return (
      <div className="p-8 text-center text-gray-500">記事が見つかりません。</div>
    );
  }

  const formattedDate = post.publishedAt
    ? new Intl.DateTimeFormat("ja-JP", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date(post.publishedAt))
    : "日付不明";

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-2 text-3xl font-bold">{post.title}</h1>
      <p className="mb-6 text-gray-500">
        {post.authorName ?? "不明な投稿者"} ・ {formattedDate}
      </p>
      <div className="prose prose-gray max-w-none">
        <PortableText value={post.body} />
      </div>
    </main>
  );
}
