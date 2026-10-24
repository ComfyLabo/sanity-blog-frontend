import type { MetadataRoute } from "next";
import { client } from "@/lib/sanity";
import { siteUrl } from "@/lib/site-url";

export const revalidate = 60;

type PublishedPost = { slug: string; updatedAt: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const home = siteUrl("/");
  if (!home) return [];
  const posts = await client.withConfig({ perspective: "published", token: undefined }).fetch<PublishedPost[]>(
    `*[_type == "post" && !(_id in path("drafts.**")) && !(_id in path("versions.**")) && defined(slug.current) && slug.current != ""]{"slug": slug.current, "updatedAt": _updatedAt}`,
  );
  const entries: MetadataRoute.Sitemap = [{ url: home }, { url: siteUrl("/about")! }, { url: siteUrl("/contact")! }];
  const seen = new Set<string>();
  for (const post of posts) {
    if (seen.has(post.slug)) continue;
    seen.add(post.slug);
    const date = new Date(post.updatedAt);
    entries.push({
      url: siteUrl(`/posts/${encodeURIComponent(post.slug)}`)!,
      ...(!Number.isNaN(date.getTime()) ? { lastModified: date } : {}),
    });
  }
  return entries;
}
