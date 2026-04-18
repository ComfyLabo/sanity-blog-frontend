import Link from "next/link";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-stone-50 text-stone-900">
      <header className="border-b border-stone-200 bg-stone-50/95">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-5 py-5">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-stone-900"
          >
            ComfyLabo Blog
          </Link>
          <nav className="flex items-center gap-5 text-sm text-stone-600">
            <Link href="/" className="transition-colors hover:text-stone-900">
              Home
            </Link>
            <Link href="/about" className="transition-colors hover:text-stone-900">
              About
            </Link>
          </nav>
        </div>
      </header>

      <div className="flex-1">{children}</div>

      <footer className="border-t border-stone-200">
        <div className="mx-auto max-w-4xl px-5 py-6 text-sm text-stone-500">© 2025 ComfyLabo</div>
      </footer>
    </div>
  );
}
