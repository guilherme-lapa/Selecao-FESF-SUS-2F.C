"use client";

import { useState } from "react";

interface BuscaCidadeProps {
  aoBuscar: (cidade: string) => void;
  carregando: boolean;
}

/** Campo de busca de cidade com botão. */
export function BuscaCidade({ aoBuscar, carregando }: BuscaCidadeProps) {
  const [cidade, setCidade] = useState("");

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && aoBuscar(cidade)}
        placeholder="Digite uma cidade…"
        className="w-full rounded-2xl border border-white/30 bg-white/20 px-5 py-3.5 text-white placeholder:text-white/60 outline-none backdrop-blur transition focus:border-white/60 focus:bg-white/30"
      />
      <button
        onClick={() => aoBuscar(cidade)}
        disabled={carregando}
        className="shrink-0 rounded-2xl bg-white/90 px-6 py-3.5 font-semibold text-ceu-escuro transition hover:bg-white disabled:opacity-60"
      >
        {carregando ? "…" : "Buscar"}
      </button>
    </div>
  );
}
