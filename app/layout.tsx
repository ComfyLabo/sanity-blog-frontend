import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ComfyLabo Blog",
  description: "ComfyLabo のブログ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gray-50 antialiased`}
      >
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
                <Link
                  href="/"
                  className="transition-colors hover:text-blue-600"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="transition-colors hover:text-blue-600"
                >
                  About
                </Link>
              </nav>
            </div>
          </header>

          <div className="flex-1">{children}</div>

          <footer className="border-t bg-gray-50">
            <div className="mx-auto max-w-3xl px-4 py-6 text-center text-sm text-slate-500">
              © 2025 ComfyLabo
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
