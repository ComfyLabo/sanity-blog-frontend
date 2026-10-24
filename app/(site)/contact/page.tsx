import type { Metadata } from "next";
import { siteUrl } from "@/lib/site-url";

export function generateMetadata(): Metadata {
  const canonical = siteUrl("/contact");
  return {
    title: "お問い合わせ | ComfyLabo",
    description: "ComfyLaboへのご質問やご依頼はこちらからご連絡ください。",
    ...(canonical ? { alternates: { canonical } } : {}),
  };
}

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-14">
      <h1 className="mb-8 text-3xl font-semibold">お問い合わせ</h1>
      <p className="mb-4">ComfyLaboへのご質問やご依頼は、メールでご連絡ください。</p>
      <a className="break-all underline underline-offset-4" href="mailto:info@comfylabo.com">info@comfylabo.com</a>
      <p className="mt-4 text-sm text-stone-600">リンクを押すとメールアプリが開きます。開かない場合は、アドレスをコピーしてご利用ください。</p>
    </main>
  );
}
