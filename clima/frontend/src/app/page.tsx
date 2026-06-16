"use client";

import { BuscaCidade } from "@/components/features/BuscaCidade";
import {
  ClimaAtualCard,
  PrevisaoLista,
} from "@/components/features/ClimaCards";
import { useClima } from "@/hooks/useClima";

export default function HomePage() {
  const { clima, carregando, erro, buscar } = useClima();

  return (
    <div className="flex flex-1 flex-col gap-6">
      <header className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight">Clima</h1>
        <p className="mt-1 text-white/70">
          Previsão do tempo para qualquer cidade
        </p>
      </header>

      <BuscaCidade aoBuscar={buscar} carregando={carregando} />

      {erro && (
        <div className="rounded-2xl border border-white/20 bg-white/10 p-4 text-center text-white/90 backdrop-blur">
          {erro}
        </div>
      )}

      {!clima && !erro && !carregando && (
        <div className="mt-10 text-center text-white/60">
          <div className="text-6xl">🌤️</div>
          <p className="mt-4">Busque uma cidade para ver o clima.</p>
        </div>
      )}

      {clima && (
        <div className="flex flex-col gap-4">
          <div className="animar-flutuar">
            <ClimaAtualCard clima={clima} />
          </div>
          <div className="animar-flutuar" style={{ animationDelay: "80ms" }}>
            <h3 className="mb-2 px-1 text-sm font-semibold text-white/80">
              Próximos dias
            </h3>
            <PrevisaoLista clima={clima} />
          </div>
        </div>
      )}

      <footer className="mt-auto pt-8 text-center text-xs text-white/50">
        Dados por Open-Meteo · FastAPI + Next.js
      </footer>
    </div>
  );
}
