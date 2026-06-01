/**
 * Cliente HTTP genérico para comunicação com a API.
 * Centraliza base URL, headers e tratamento de erros.
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

/** Expõe a base URL para montar links curtos exibidos na interface. */
export const URL_BASE_API = API_BASE_URL;

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface RequestOptions extends RequestInit {
  semCorpo?: boolean;
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { semCorpo, headers, ...rest } = options;

  const resposta = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...headers },
    cache: "no-store",
    ...rest,
  });

  if (!resposta.ok) {
    let detalhe = `Erro ${resposta.status}`;
    try {
      const corpo = await resposta.json();
      detalhe = corpo.detail ?? detalhe;
    } catch {
      // resposta sem corpo JSON
    }
    throw new ApiError(resposta.status, detalhe);
  }

  if (semCorpo || resposta.status === 204) {
    return undefined as T;
  }
  return resposta.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(endpoint: string) => request<T>(endpoint, { method: "GET" }),
  post: <T>(endpoint: string, dados: unknown) =>
    request<T>(endpoint, { method: "POST", body: JSON.stringify(dados) }),
  delete: (endpoint: string) =>
    request<void>(endpoint, { method: "DELETE", semCorpo: true }),
};
