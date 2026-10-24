import type { Metadata } from "next";
import Link from "next/link";
import { PostBody } from "@/components/post-body";
import { siteUrl } from "@/lib/site-url";

export function generateMetadata(): Metadata {
  const canonical = siteUrl("/about");
  return {
    title: "運営者情報 | ComfyLabo",
    description: "ComfyLaboの運営者green_bambooと、ブログのテーマ・発信方針をご紹介します。",
    ...(canonical ? { alternates: { canonical } } : {}),
  };
}

const body = `こんにちは、green_bambooです。

当ブログ「ComfyLabo」をご覧いただきありがとうございます。
私はサラリーマンとして働きながら、少額で暗号資産投資を続けています。

ComfyLaboでは、仮想通貨・暗号資産、AI活用、ガジェット、ライフスタイル、業務効率化をテーマに、実際に体験したことや学んだことを発信しています。
専門家としてではなく、一人の実践者として初心者にも分かりやすい情報発信を心掛けています。

## このブログについて

ComfyLaboは「少しでも快適な毎日をつくる実験室」をコンセプトに運営しています。
仮想通貨やAIなどの新しい技術を、難しい専門用語だけでなく実体験を交えながら発信しています。

## 投資に関する注意事項

当ブログは投資助言を目的としたものではありません。
投資に関する最終的な判断は、ご自身の責任でお願いいたします。

運営者：green_bamboo

ブログ名：ComfyLabo`;

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-14">
      <h1 className="mb-8 text-3xl font-semibold">運営者情報</h1>
      <PostBody body={body} />
      <h2 className="mb-4 mt-8 text-2xl font-semibold">お問い合わせ</h2>
      <p>ご質問やご依頼は、<Link className="underline underline-offset-4" href="/contact">お問い合わせページ</Link>からメールでご連絡ください。</p>
    </main>
  );
}
