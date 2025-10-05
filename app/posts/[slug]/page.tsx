import { ReactElement } from "react";
import { client } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";

type Props = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params }: Props): Promise<ReactElement> {
  const { slug } = params;

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      body
    }`,
    { slug }
  );

  return (
    <main className="prose mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
      <PortableText value={post.body} />
    </main>
  );
}
