import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { siteUrl } from "@/lib/site-url";

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
  seoDescription?: string;
  imageUrl?: string;
  imageAlt?: string;
};

const postQuery = `*[_type == "post" && slug.current == $slug][0]{
  title,
  seoDescription,
  "imageUrl": mainImage.asset->url,
  "imageAlt": mainImage.alt,
  "body": coalesce(markdownBody, body),
  "author": author->name,
  publishedAt
}`;

const getPost = cache((slug: string) => client.fetch<Post | null>(postQuery, { slug }));

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const title = `${post.title} | ComfyLabo`;
  const description = post.seoDescription?.trim() || `${post.title}。ComfyLaboの体験・解説記事です。`;
  const images = post.imageUrl ? [{ url: post.imageUrl, alt: post.imageAlt || post.title }] : [];

  const canonical = siteUrl(`/posts/${encodeURIComponent(slug)}`);
  return {
    ...(canonical ? { alternates: { canonical } } : {}),
    title,
    description,
    openGraph: {
      type: "article",
      ...(canonical ? { url: canonical } : {}),
      locale: "ja_JP",
      siteName: "ComfyLabo",
      title,
      description,
      images,
      ...(post.publishedAt ? { publishedTime: post.publishedAt } : {}),
    },
    twitter: { card: images.length ? "summary_large_image" : "summary", title, description, images },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

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
