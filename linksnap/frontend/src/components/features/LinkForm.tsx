"use client";

import { useState } from "react";

import { Button, Input } from "@/components/ui";
import { linksApi } from "@/lib/api/links";
import type { Link } from "@/types/link";

interface LinkFormProps {
  aoCriar: (link: Link) => void;
}

/**
 * Formulário de encurtamento. Permite escolher entre código aleatório
 * (padrão) ou um alias personalizado, ativado por um toggle.
 */
export function LinkForm({ aoCriar }: LinkFormProps) {
  const [url, setUrl] = useState("");
  const [usarAlias, setUsarAlias] = useState(false);
  const [alias, setAlias] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function enviar() {
    setErro(null);

    if (!url.trim()) {
      setErro("Informe uma URL para encurtar.");
      return;
    }

    setEnviando(true);
    try {
      const link = await linksApi.criar({
        url_original: url.trim(),
        alias: usarAlias && alias.trim() ? alias.trim() : undefined,
      });
      aoCriar(link);
      setUrl("");
      setAlias("");
      setUsarAlias(false);
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao encurtar o link.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="rounded-2xl border border-tinta-900/10 bg-papel-cartao p-5 shadow-suave">
      <div className="flex flex-col gap-4">
        <Input
          id="url"
          rotulo="Cole a URL longa"
          placeholder="https://exemplo.com/uma-pagina-bem-comprida"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !usarAlias && enviar()}
        />

        <label className="flex cursor-pointer items-center gap-2 text-sm text-tinta-700">
          <input
            type="checkbox"
            checked={usarAlias}
            onChange={(e) => setUsarAlias(e.target.checked)}
            className="h-4 w-4 accent-eletrico"
          />
          Usar um nome personalizado
        </label>

        {usarAlias && (
          <Input
            id="alias"
            rotulo="Nome personalizado"
            placeholder="meu-link"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && enviar()}
          />
        )}

        {erro && <p className="text-sm text-rose-600">{erro}</p>}

        <Button onClick={enviar} disabled={enviando} className="self-start">
          {enviando ? "Encurtando…" : "Encurtar link"}
        </Button>
      </div>
    </div>
  );
}
