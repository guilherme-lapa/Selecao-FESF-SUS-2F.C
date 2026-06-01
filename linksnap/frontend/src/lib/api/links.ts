/**
 * Funções de acesso à API para o recurso Link.
 */

import type { Link, LinkDetalhe, LinkInput } from "@/types/link";

import { apiClient } from "./client";

export const linksApi = {
  listar: (busca = "") =>
    apiClient.get<Link[]>(
      `/links${busca ? `?busca=${encodeURIComponent(busca)}` : ""}`,
    ),

  detalhar: (codigo: string) =>
    apiClient.get<LinkDetalhe>(`/links/${codigo}`),

  criar: (dados: LinkInput) => apiClient.post<Link>("/links", dados),

  remover: (codigo: string) => apiClient.delete(`/links/${codigo}`),
};
