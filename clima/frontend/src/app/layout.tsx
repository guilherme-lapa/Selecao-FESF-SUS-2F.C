import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Clima — Previsão do Tempo",
  description: "Busque o clima atual e a previsão de qualquer cidade.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">
        <div className="mx-auto flex min-h-screen max-w-md flex-col px-4 py-10">
          {children}
        </div>
      </body>
    </html>
  );
}
