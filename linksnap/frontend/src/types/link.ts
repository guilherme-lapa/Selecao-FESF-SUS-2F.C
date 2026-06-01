/**
 * Tipos do domínio — espelham o contrato da API FastAPI.
 */

export interface Link {
  id: number;
  codigo: string;
  url_original: string;
  criado_em: string;
  total_cliques: number;
}

export interface Clique {
  id: number;
  acessado_em: string;
}

export interface LinkDetalhe extends Link {
  cliques: Clique[];
}

/** Dados enviados na criação de um link. */
export interface LinkInput {
  url_original: string;
  alias?: string;
}
