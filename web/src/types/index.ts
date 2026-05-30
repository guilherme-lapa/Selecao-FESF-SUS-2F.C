// ============================================================
// Tipos TypeScript que espelham os schemas da Saúde API
// ============================================================

export type StatusConsulta = "agendada" | "realizada" | "cancelada";

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

export interface PacienteCreate {
  nome: string;
  cpf: string;
  data_nascimento: string;
  telefone?: string;
  email?: string;
  endereco?: string;
}

export interface PacienteUpdate {
  nome?: string;
  telefone?: string;
  email?: string;
  endereco?: string;
}

export interface Consulta {
  id: number;
  paciente_id: number;
  data_hora: string;
  especialidade: string;
  medico: string | null;
  observacoes: string | null;
  status: StatusConsulta;
  criado_em: string;
  atualizado_em: string;
}

export interface ConsultaCreate {
  paciente_id: number;
  data_hora: string;
  especialidade: string;
  medico?: string;
  observacoes?: string;
}

export interface ConsultaUpdate {
  data_hora?: string;
  especialidade?: string;
  medico?: string;
  observacoes?: string;
  status?: StatusConsulta;
}

export interface ApiError {
  detail: string;
}

export interface PaginationParams {
  skip?: number;
  limit?: number;
}
