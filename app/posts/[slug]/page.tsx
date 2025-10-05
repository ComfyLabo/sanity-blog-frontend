import { client } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function PostPage({ params }: Props): Promise<JSX.Element> {
  const { slug } = await params;

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      body,
      "authorName": author->name,
      publishedAt
    }`,
    { slug }
  );

  if (!post) {
    return <div className="p-8 text-center text-gray-500">記事が見つかりません。</div>;
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 mb-6">
        {post.authorName} ・ {new Date(post.publishedAt).toLocaleDateString()}
      </p>
      <div className="prose prose-gray max-w-none">
        <PortableText value={post.body} />
      </div>
    </main>
  );
}
