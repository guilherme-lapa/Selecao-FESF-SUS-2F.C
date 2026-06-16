/**
 * Comunicação com a nossa API de clima (que por sua vez consome o
 * Open-Meteo). Centraliza base URL e tratamento de erros.
 */

import type { Clima } from "@/types/clima";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function buscarClima(cidade: string): Promise<Clima> {
  const url = `${API_BASE_URL}/clima?cidade=${encodeURIComponent(cidade)}`;
  const resposta = await fetch(url, { cache: "no-store" });

  if (!resposta.ok) {
    let detalhe = `Erro ${resposta.status}`;
    try {
      const corpo = await resposta.json();
      detalhe = corpo.detail ?? detalhe;
    } catch {
      // sem corpo JSON
    }
    throw new ApiError(resposta.status, detalhe);
  }

  return resposta.json() as Promise<Clima>;
}
