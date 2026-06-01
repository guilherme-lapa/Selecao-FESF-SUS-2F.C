"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Button, EstadoErro, Spinner } from "@/components/ui";
import { useCopiar } from "@/hooks/useCopiar";
import { linksApi } from "@/lib/api/links";
import type { LinkDetalhe } from "@/types/link";
import { formatarDataHora, montarUrlCurta } from "@/utils/formatadores";

export default function EstatisticasPage() {
  const params = useParams();
  const codigo = String(params.codigo);
  const { copiado, copiar } = useCopiar();

  const [link, setLink] = useState<LinkDetalhe | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;
    linksApi
      .detalhar(codigo)
      .then((dados) => ativo && setLink(dados))
      .catch((e) => ativo && setErro(e.message))
      .finally(() => ativo && setCarregando(false));
    return () => {
      ativo = false;
    };
  }, [codigo]);

  if (carregando) return <Spinner />;
  if (erro) return <EstadoErro mensagem={erro} />;
  if (!link) return null;

  const urlCurta = montarUrlCurta(link.codigo);

  return (
    <div className="flex flex-col gap-6">
      <Link href="/" className="text-sm text-tinta-500 hover:text-tinta-900">
        ← Voltar
      </Link>

      {/* Resumo do link */}
      <div className="rounded-2xl border border-tinta-900/10 bg-papel-cartao p-5 shadow-suave">
        <p className="font-mono text-lg font-semibold text-eletrico">
          /{link.codigo}
        </p>
        <p className="mt-1 break-all text-sm text-tinta-500">
          {link.url_original}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button variante="secundario" onClick={() => copiar(urlCurta)}>
            {copiado ? "Copiado!" : "Copiar link curto"}
          </Button>
          <span className="text-xs text-tinta-500">
            Criado em {formatarDataHora(link.criado_em)}
          </span>
        </div>
      </div>

      {/* Total de cliques */}
      <div className="rounded-2xl border border-tinta-900/10 bg-eletrico p-6 text-center text-white shadow-suave">
        <p className="text-sm font-medium opacity-80">Total de cliques</p>
        <p className="mt-1 text-5xl font-bold">{link.total_cliques}</p>
      </div>

      {/* Histórico de acessos */}
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-tinta-700">
          Histórico de acessos
        </h2>
        {link.cliques.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-tinta-900/10 bg-papel-cartao py-10 text-center text-tinta-500">
            Nenhum acesso registrado ainda.
          </div>
        ) : (
          <ul className="divide-y divide-tinta-900/5 overflow-hidden rounded-2xl border border-tinta-900/10 bg-papel-cartao shadow-suave">
            {link.cliques.map((clique, i) => (
              <li
                key={clique.id}
                className="flex items-center justify-between px-5 py-3 text-sm"
              >
                <span className="text-tinta-700">Acesso #{link.cliques.length - i}</span>
                <span className="font-mono text-tinta-500">
                  {formatarDataHora(clique.acessado_em)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
