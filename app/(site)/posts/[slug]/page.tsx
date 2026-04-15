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
  body,
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
    <article className="mx-auto max-w-none px-4">
      <h1>{post.title}</h1>
      <p className="text-sm text-gray-500">
        {authorName} ・ {formattedDate}
      </p>
      <PostBody body={body} />
    </article>
  );
}
