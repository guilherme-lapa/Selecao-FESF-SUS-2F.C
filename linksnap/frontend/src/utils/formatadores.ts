/**
 * Funções utilitárias puras de formatação.
 */

import { URL_BASE_API } from "@/lib/api/client";

/** Monta a URL curta completa a partir do código. */
export function montarUrlCurta(codigo: string): string {
  return `${URL_BASE_API}/${codigo}`;
}

/** Formata uma data ISO para o padrão brasileiro com hora. */
export function formatarDataHora(iso: string): string {
  const data = new Date(iso);
  return data.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Encurta uma URL longa para exibição, preservando o início. */
export function truncarUrl(url: string, max = 48): string {
  return url.length > max ? `${url.slice(0, max)}…` : url;
}
