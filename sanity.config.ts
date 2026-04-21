import { defineConfig, defineField, defineType } from "sanity";
import { structureTool } from "sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error("Missing Sanity Studio environment variables");
}

const createReadableSlug = (value: string) =>
  value
    .normalize("NFKC")
    .replace(/(?<=\d),(?=\d)/g, "")
    .replace(/[【】「」『』（）()［］[\]{}]/g, "")
    .replace(/[&/_,.:;!?]+/g, " ")
    .replace(/[ー―‐‑‒–—―]+/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}-]/gu, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase()
    .slice(0, 96) || "post";

const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});

const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        slugify: createReadableSlug,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
    defineField({
      name: "markdownBody",
      title: "Body (Markdown)",
      type: "text",
      rows: 24,
      description: "Obsidian などで書いた Markdown をそのまま貼り付ける本文欄",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      description: "旧本文。Markdown 本文がある場合はそちらが優先表示されます。",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "author.name",
    },
  },
});

const about = defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "About ComfyLabo",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [
        defineField({
          name: "socialLink",
          title: "Social link",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "href",
              title: "URL",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "href",
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});

export default defineConfig({
  name: "default",
  title: "ComfyLabo Blog Studio",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool()],
  schema: {
    types: [post, author, about],
  },
});
