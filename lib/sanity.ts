import type { PortableTextBlock } from "@portabletext/types";
import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiReadToken = process.env.SANITY_API_READ_TOKEN;
const isDevelopment = process.env.NODE_ENV === "development";

if (!projectId || !dataset) {
  throw new Error("Missing Sanity environment variables");
}

export type SanityPortableText = PortableTextBlock[];
export type SanityPostBody = string | SanityPortableText;

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2023-01-01", // 固定でOK
  useCdn: !isDevelopment,
  token: isDevelopment ? apiReadToken : undefined,
  perspective: isDevelopment && apiReadToken ? "drafts" : "published",
});
