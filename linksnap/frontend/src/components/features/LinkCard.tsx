"use client";

import Link from "next/link";

import { Button } from "@/components/ui";
import { useCopiar } from "@/hooks/useCopiar";
import type { Link as LinkTipo } from "@/types/link";
import { montarUrlCurta, truncarUrl } from "@/utils/formatadores";

interface LinkCardProps {
  link: LinkTipo;
  aoRemover: (codigo: string) => void;
}

/** Cartão de um link na listagem, com copiar, ver estatísticas e remover. */
export function LinkCard({ link, aoRemover }: LinkCardProps) {
  const { copiado, copiar } = useCopiar();
  const urlCurta = montarUrlCurta(link.codigo);

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-tinta-900/10 bg-papel-cartao p-4 shadow-suave transition hover:border-eletrico/40 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-semibold text-eletrico">
            /{link.codigo}
          </span>
          <span className="rounded-full bg-eletrico-fundo px-2 py-0.5 text-xs font-medium text-eletrico">
            {link.total_cliques} {link.total_cliques === 1 ? "clique" : "cliques"}
          </span>
        </div>
        <p className="mt-1 truncate text-sm text-tinta-500" title={link.url_original}>
          {truncarUrl(link.url_original)}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button variante="secundario" onClick={() => copiar(urlCurta)}>
          {copiado ? "Copiado!" : "Copiar"}
        </Button>
        <Link href={`/links/${link.codigo}`}>
          <Button variante="secundario">Estatísticas</Button>
        </Link>
        <Button variante="perigo" onClick={() => aoRemover(link.codigo)}>
          Remover
        </Button>
      </div>
    </div>
  );
}
