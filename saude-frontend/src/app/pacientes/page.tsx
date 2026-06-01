"use client";

import { useEffect, useState } from "react";
import PacienteCard from "@/components/PacienteCard";
import PacienteForm from "@/components/PacienteForm";
import { pacientesService } from "@/services/api";
import { Paciente, PacienteCreate } from "@/types";

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function carregarPacientes() {
    try {
      setErro(null);
      const data = await pacientesService.listar();
      setPacientes(data);
    } catch (err: unknown) {
      setErro(err instanceof Error ? err.message : "Erro ao carregar pacientes.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCriar(data: PacienteCreate) {
    setIsSubmitting(true);
    try {
      await pacientesService.criar(data);
      await carregarPacientes();
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeletar(id: number) {
    if (!confirm("Deseja remover este paciente? Todas as consultas serão removidas.")) return;
    try {
      await pacientesService.remover(id);
      setPacientes((prev) => prev.filter((p) => p.id !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Erro ao remover paciente.");
    }
  }

  useEffect(() => {
    carregarPacientes();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Pacientes</h1>
        <span className="text-sm text-gray-500">{pacientes.length} cadastrado(s)</span>
      </div>

      <div className="mb-8">
        <PacienteForm onSubmit={handleCriar} isLoading={isSubmitting} />
      </div>

      {isLoading && (
        <div className="text-center text-gray-400 py-12">Carregando pacientes...</div>
      )}

      {erro && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded p-4 mb-4">
          {erro}
        </div>
      )}

      {!isLoading && pacientes.length === 0 && !erro && (
        <div className="text-center text-gray-400 py-12">
          Nenhum paciente cadastrado ainda.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pacientes.map((paciente) => (
          <PacienteCard
            key={paciente.id}
            paciente={paciente}
            onDelete={handleDeletar}
          />
        ))}
      </div>
    </div>
  );
}
