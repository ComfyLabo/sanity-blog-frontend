import { PortableText } from "@portabletext/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { type SanityPostBody } from "@/lib/sanity";

type PostBodyProps = {
  body?: SanityPostBody;
  className?: string;
};

const DEFAULT_CLASS_NAME =
  "prose prose-neutral max-w-none [&_p]:mb-6 [&_p]:whitespace-pre-line [&_p:last-child]:mb-0";

export function PostBody({ body, className }: PostBodyProps) {
  const mergedClassName = className ? `${DEFAULT_CLASS_NAME} ${className}` : DEFAULT_CLASS_NAME;

  if (typeof body === "string") {
    return (
      <div className={mergedClassName}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
      </div>
    );
  }

  if (Array.isArray(body)) {
    return (
      <div className={mergedClassName}>
        <PortableText value={body} />
      </div>
    );
  }

  return null;
}
