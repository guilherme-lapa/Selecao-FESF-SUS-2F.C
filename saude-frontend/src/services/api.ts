/**
 * Camada de serviço para comunicação com a Saúde API.
 * Centraliza todas as chamadas HTTP e tratamento de erros.
 */

import {
  Consulta,
  ConsultaCreate,
  ConsultaUpdate,
  Paciente,
  PacienteCreate,
  PacienteUpdate,
  PaginationParams,
} from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Erro desconhecido" }));
    throw new Error(error.detail || `Erro HTTP: ${response.status}`);
  }
  // 204 No Content não tem body
  if (response.status === 204) {
    return undefined as unknown as T;
  }
  return response.json();
}

// ============================================================
// Pacientes
// ============================================================

export const pacientesService = {
  async listar(params: PaginationParams = {}): Promise<Paciente[]> {
    const query = new URLSearchParams();
    if (params.skip !== undefined) query.set("skip", String(params.skip));
    if (params.limit !== undefined) query.set("limit", String(params.limit));

    const response = await fetch(`${API_BASE_URL}/pacientes/?${query}`);
    return handleResponse<Paciente[]>(response);
  },

  async buscarPorId(id: number): Promise<Paciente> {
    const response = await fetch(`${API_BASE_URL}/pacientes/${id}`);
    return handleResponse<Paciente>(response);
  },

  async criar(data: PacienteCreate): Promise<Paciente> {
    const response = await fetch(`${API_BASE_URL}/pacientes/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<Paciente>(response);
  },

  async atualizar(id: number, data: PacienteUpdate): Promise<Paciente> {
    const response = await fetch(`${API_BASE_URL}/pacientes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<Paciente>(response);
  },

  async remover(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/pacientes/${id}`, {
      method: "DELETE",
    });
    return handleResponse<void>(response);
  },
};

// ============================================================
// Consultas
// ============================================================

export const consultasService = {
  async listar(params: PaginationParams = {}): Promise<Consulta[]> {
    const query = new URLSearchParams();
    if (params.skip !== undefined) query.set("skip", String(params.skip));
    if (params.limit !== undefined) query.set("limit", String(params.limit));

    const response = await fetch(`${API_BASE_URL}/consultas/?${query}`);
    return handleResponse<Consulta[]>(response);
  },

  async buscarPorId(id: number): Promise<Consulta> {
    const response = await fetch(`${API_BASE_URL}/consultas/${id}`);
    return handleResponse<Consulta>(response);
  },

  async listarPorPaciente(pacienteId: number): Promise<Consulta[]> {
    const response = await fetch(
      `${API_BASE_URL}/consultas/paciente/${pacienteId}`
    );
    return handleResponse<Consulta[]>(response);
  },

  async agendar(data: ConsultaCreate): Promise<Consulta> {
    const response = await fetch(`${API_BASE_URL}/consultas/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<Consulta>(response);
  },

  async atualizar(id: number, data: ConsultaUpdate): Promise<Consulta> {
    const response = await fetch(`${API_BASE_URL}/consultas/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<Consulta>(response);
  },

  async remover(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/consultas/${id}`, {
      method: "DELETE",
    });
    return handleResponse<void>(response);
  },
};
