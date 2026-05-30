"use client";

import { useState } from "react";
import { PacienteCreate } from "@/types";

interface PacienteFormProps {
  onSubmit: (data: PacienteCreate) => Promise<void>;
  isLoading?: boolean;
}

const initialState: PacienteCreate = {
  nome: "",
  cpf: "",
  data_nascimento: "",
  telefone: "",
  email: "",
  endereco: "",
};

export default function PacienteForm({ onSubmit, isLoading }: PacienteFormProps) {
  const [form, setForm] = useState<PacienteCreate>(initialState);
  const [erro, setErro] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    try {
      await onSubmit(form);
      setForm(initialState);
    } catch (err: unknown) {
      setErro(err instanceof Error ? err.message : "Erro ao salvar paciente.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Novo Paciente</h2>

      {erro && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded p-3">
          {erro}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome completo *
          </label>
          <input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
            placeholder="Maria da Silva"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CPF *
          </label>
          <input
            name="cpf"
            value={form.cpf}
            onChange={handleChange}
            required
            placeholder="123.456.789-00"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data de Nascimento *
          </label>
          <input
            name="data_nascimento"
            type="date"
            value={form.data_nascimento}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Telefone
          </label>
          <input
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
            placeholder="(71) 99999-9999"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            E-mail
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="maria@email.com"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Endereço
          </label>
          <input
            name="endereco"
            value={form.endereco}
            onChange={handleChange}
            placeholder="Rua das Flores, 123 - Salvador, BA"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-2 rounded text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {isLoading ? "Salvando..." : "Cadastrar Paciente"}
        </button>
      </div>
    </form>
  );
}
