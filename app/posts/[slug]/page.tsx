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
      author->{
        name
      },
      publishedAt
    }`,
    { slug }
  );

  if (!post) {
    return <div>記事が見つかりませんでした。</div>;
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <article className="bg-white rounded-2xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-500 text-sm mb-8">
          {post.author?.name} ・{" "}
          {new Date(post.publishedAt).toLocaleDateString("ja-JP")}
        </div>
        <div className="prose prose-lg max-w-none">
          <PortableText value={post.body} />
        </div>
      </article>
    </main>
  );
}