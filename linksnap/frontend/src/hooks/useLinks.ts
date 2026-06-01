"use client";

/**
 * Hook que encapsula o estado da listagem de links.
 */

import { useCallback, useEffect, useState } from "react";

import { linksApi } from "@/lib/api/links";
import type { Link } from "@/types/link";

export function useLinks(busca: string) {
  const [links, setLinks] = useState<Link[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      setLinks(await linksApi.listar(busca));
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Falha ao carregar links.");
    } finally {
      setCarregando(false);
    }
  }, [busca]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return { links, carregando, erro, recarregar: carregar };
}
