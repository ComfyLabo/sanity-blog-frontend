import { notFound } from "next/navigation";

import { PostBody } from "@/components/post-body";
import { client, type SanityPostBody } from "@/lib/sanity";

export const revalidate = 60;

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

type Post = {
  title: string;
  body?: SanityPostBody;
  author?: string;
  publishedAt?: string;
};

const postQuery = `*[_type == "post" && slug.current == $slug][0]{
  title,
  "body": coalesce(markdownBody, body),
  "author": author->name,
  publishedAt
}`;

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await client.fetch<Post | null>(postQuery, { slug });

  if (!post) {
    notFound();
  }

  const authorName = post.author ?? "不明な投稿者";
  const formattedDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "日付不明";
  const body = post.body;

  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-14 sm:py-20">
      <header className="border-b border-stone-200 pb-8">
        <p className="text-sm text-stone-500">
          {formattedDate}
          {" ・ "}
          {authorName}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
          {post.title}
        </h1>
      </header>
      <PostBody body={body} className="mt-10" />
    </article>
  );
}
