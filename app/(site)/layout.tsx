import Link from "next/link";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="text-lg font-semibold text-slate-900 transition-colors hover:text-blue-600"
          >
            ComfyLabo Blog
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
            <Link href="/" className="transition-colors hover:text-blue-600">
              Home
            </Link>
            <Link href="/about" className="transition-colors hover:text-blue-600">
              About
            </Link>
            <Link href="/studio" className="transition-colors hover:text-blue-600">
              Studio
            </Link>
          </nav>
        </div>
      </header>

      <div className="flex-1">{children}</div>

      <footer className="border-t bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 py-6 text-center text-sm text-slate-500">© 2025 ComfyLabo</div>
      </footer>
    </div>
  );
}
