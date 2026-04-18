import { PortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

import { type SanityPostBody } from "@/lib/sanity";

type PostBodyProps = {
  body?: SanityPostBody;
  className?: string;
};

const DEFAULT_CLASS_NAME =
  "prose prose-neutral max-w-none";

const paragraphClassName = "mb-6 whitespace-pre-line last:mb-0";

const markdownComponents: Components = {
  p: (props) => <p className={paragraphClassName} {...props} />,
};

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className={paragraphClassName}>{children}</p>,
  },
};

export function PostBody({ body, className }: PostBodyProps) {
  const mergedClassName = className ? `${DEFAULT_CLASS_NAME} ${className}` : DEFAULT_CLASS_NAME;

  if (typeof body === "string") {
    return (
      <div className={mergedClassName}>
        <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
          {body}
        </ReactMarkdown>
      </div>
    );
  }

  if (Array.isArray(body)) {
    return (
      <div className={mergedClassName}>
        <PortableText components={portableTextComponents} value={body} />
      </div>
    );
  }

  return null;
}
