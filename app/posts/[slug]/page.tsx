import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { client, type SanityPostBody } from "@/lib/sanity";

type PostPageProps = {
  params: { slug: string };
};

type Post = {
  title: string;
  body?: SanityPostBody;
  author?: string;
  publishedAt?: string;
};

const postQuery = `*[_type == "post" && slug.current == $slug][0]{
  title,
  body,
  "author": author->name,
  publishedAt
}`;

export default async function PostPage({ params }: PostPageProps) {
  const post = await client.fetch<Post | null>(postQuery, { slug: params.slug });

  if (!post) {
    notFound();
  }

  const authorName = post.author ?? "不明な投稿者";
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString()
    : "日付不明";
  const body = post.body;

  return (
    <article className="prose prose-neutral max-w-none mx-auto px-4">
      <h1>{post.title}</h1>
      <p className="text-gray-500 text-sm">
        {authorName} ・ {formattedDate}
      </p>
      {typeof body === "string" ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
      ) : Array.isArray(body) ? (
        <PortableText value={body} />
      ) : null}
    </article>
  );
}
