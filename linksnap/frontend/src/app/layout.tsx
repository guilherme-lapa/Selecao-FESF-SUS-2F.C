import type { Metadata } from "next";
import Link from "next/link";

import "./globals.css";

export const metadata: Metadata = {
  title: "LinkSnap — Encurtador de Links",
  description: "Encurte links e acompanhe estatísticas de acesso.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen font-sans antialiased">
        <header className="border-b border-tinta-900/5 bg-papel/80 backdrop-blur">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-eletrico font-mono text-sm font-bold text-white">
                ↳
              </span>
              <span className="text-lg font-bold tracking-tight">
                Link<span className="text-eletrico">Snap</span>
              </span>
            </Link>
            <span className="text-xs font-medium text-tinta-500">
              FastAPI + Next.js
            </span>
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-4 py-8">{children}</main>

        <footer className="mt-16 border-t border-tinta-900/5 py-6 text-center text-xs text-tinta-500">
          LinkSnap · Encurtador de links com estatísticas
        </footer>
      </body>
    </html>
  );
}
