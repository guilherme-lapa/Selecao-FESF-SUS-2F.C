"use client";

/**
 * Hook que encapsula a busca de clima: estado de carregamento, erro
 * e o resultado. Exclui a lógica de requisição dos componentes.
 */

import { useCallback, useState } from "react";

import { buscarClima } from "@/lib/api/clima";
import type { Clima } from "@/types/clima";

export function useClima() {
  const [clima, setClima] = useState<Clima | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const buscar = useCallback(async (cidade: string) => {
    if (!cidade.trim()) return;
    setCarregando(true);
    setErro(null);
    try {
      setClima(await buscarClima(cidade.trim()));
    } catch (e) {
      setClima(null);
      setErro(e instanceof Error ? e.message : "Erro ao buscar o clima.");
    } finally {
      setCarregando(false);
    }
  }, []);

  return { clima, carregando, erro, buscar };
}
