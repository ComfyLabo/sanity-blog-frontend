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
  "prose prose-stone max-w-none text-[17px] leading-8 prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-stone-900 prose-p:text-stone-700 prose-strong:text-stone-900 prose-a:text-stone-900 prose-a:no-underline hover:prose-a:text-stone-600 prose-hr:border-stone-200";

const paragraphClassName = "mb-6 whitespace-pre-line last:mb-0";
const h2ClassName = "mt-12 mb-5 text-2xl font-semibold tracking-tight text-stone-900";
const h3ClassName = "mt-10 mb-4 text-xl font-semibold tracking-tight text-stone-900";
const listClassName = "mb-6 pl-6 text-stone-700";
const listItemClassName = "mb-2";
const blockquoteClassName = "mb-6 border-l-4 border-stone-300 pl-4 text-stone-600";
const linkClassName = "text-stone-900 underline underline-offset-4 transition-colors hover:text-stone-600";
const codeClassName = "rounded bg-stone-100 px-1.5 py-0.5 font-mono text-[0.9em] text-stone-800";

const markdownComponents: Components = {
  p: (props) => <p className={paragraphClassName} {...props} />,
  h2: (props) => <h2 className={h2ClassName} {...props} />,
  h3: (props) => <h3 className={h3ClassName} {...props} />,
  ul: (props) => <ul className={`${listClassName} list-disc`} {...props} />,
  ol: (props) => <ol className={`${listClassName} list-decimal`} {...props} />,
  li: (props) => <li className={listItemClassName} {...props} />,
  blockquote: (props) => <blockquote className={blockquoteClassName} {...props} />,
  a: (props) => <a className={linkClassName} {...props} />,
  code: (props) => <code className={codeClassName} {...props} />,
};

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className={paragraphClassName}>{children}</p>,
    h2: ({ children }) => <h2 className={h2ClassName}>{children}</h2>,
    h3: ({ children }) => <h3 className={h3ClassName}>{children}</h3>,
    blockquote: ({ children }) => <blockquote className={blockquoteClassName}>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className={`${listClassName} list-disc`}>{children}</ul>,
    number: ({ children }) => <ol className={`${listClassName} list-decimal`}>{children}</ol>,
  },
  listItem: ({ children }) => <li className={listItemClassName}>{children}</li>,
  marks: {
    link: ({ children, value }) => (
      <a
        className={linkClassName}
        href={typeof value?.href === "string" ? value.href : undefined}
        rel="noreferrer noopener"
        target="_blank"
      >
        {children}
      </a>
    ),
    code: ({ children }) => <code className={codeClassName}>{children}</code>,
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
