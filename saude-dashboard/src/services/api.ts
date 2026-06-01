/**
 * Camada de serviço para comunicação com a Saúde API.
 * Certifique-se que a saude-api está rodando em http://localhost:8000
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export interface Paciente {
  id: number;
  nome: string;
  cpf: string;
  data_nascimento: string;
  telefone: string | null;
  email: string | null;
  endereco: string | null;
  criado_em: string;
  atualizado_em: string;
}

export interface Consulta {
  id: number;
  paciente_id: number;
  data_hora: string;
  especialidade: string;
  medico: string | null;
  observacoes: string | null;
  status: "agendada" | "realizada" | "cancelada";
  criado_em: string;
  atualizado_em: string;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Erro HTTP: ${response.status}`);
  }
  return response.json();
}

export const pacientesService = {
  async listar(): Promise<Paciente[]> {
    const response = await fetch(`${API_BASE_URL}/pacientes/?limit=500`);
    return handleResponse<Paciente[]>(response);
  },
};

export const consultasService = {
  async listar(): Promise<Consulta[]> {
    const response = await fetch(`${API_BASE_URL}/consultas/?limit=500`);
    return handleResponse<Consulta[]>(response);
  },
};
