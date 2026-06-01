"use client";

import { useState } from "react";

import { LinkCard } from "@/components/features/LinkCard";
import { LinkForm } from "@/components/features/LinkForm";
import { EstadoErro, EstadoVazio, Input, Spinner } from "@/components/ui";
import { useLinks } from "@/hooks/useLinks";
import { linksApi } from "@/lib/api/links";

export default function HomePage() {
  const [busca, setBusca] = useState("");
  const { links, carregando, erro, recarregar } = useLinks(busca);

  async function remover(codigo: string) {
    if (!confirm(`Remover o link /${codigo}?`)) return;
    try {
      await linksApi.remover(codigo);
      recarregar();
    } catch {
      alert("Não foi possível remover o link.");
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Encurte qualquer link
        </h1>
        <p className="mt-2 text-tinta-500">
          Gere um link curto e acompanhe cada acesso em tempo real.
        </p>
      </section>

      <LinkForm aoCriar={recarregar} />

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-sm font-semibold text-tinta-700">
            Seus links {links.length > 0 && `(${links.length})`}
          </h2>
          <div className="w-48">
            <Input
              id="busca"
              placeholder="Buscar…"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>

        {carregando && <Spinner />}
        {!carregando && erro && (
          <EstadoErro mensagem={erro} aoTentarNovamente={recarregar} />
        )}
        {!carregando && !erro && links.length === 0 && (
          <EstadoVazio mensagem="Nenhum link ainda. Encurte o primeiro acima!" />
        )}
        {!carregando &&
          !erro &&
          links.map((link, i) => (
            <div
              key={link.id}
              className="animar-surgir"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <LinkCard link={link} aoRemover={remover} />
            </div>
          ))}
      </section>
    </div>
  );
}
