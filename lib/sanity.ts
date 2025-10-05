import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error("Missing Sanity environment variables");
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2023-01-01", // 固定でOK
  useCdn: true, // キャッシュを使って高速化
});