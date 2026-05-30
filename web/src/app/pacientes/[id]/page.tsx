"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { consultasService, pacientesService } from "@/services/api";
import { Consulta, Paciente, StatusConsulta } from "@/types";
import ConsultaCard from "@/components/ConsultaCard";

export default function PacienteDetalhePage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function carregarDados() {
    try {
      const [pacienteData, consultasData] = await Promise.all([
        pacientesService.buscarPorId(id),
        consultasService.listarPorPaciente(id),
      ]);
      setPaciente(pacienteData);
      setConsultas(consultasData);
    } catch {
      router.push("/pacientes");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAtualizarStatus(consultaId: number, status: StatusConsulta) {
    try {
      const atualizada = await consultasService.atualizar(consultaId, { status });
      setConsultas((prev) =>
        prev.map((c) => (c.id === consultaId ? atualizada : c))
      );
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Erro ao atualizar status.");
    }
  }

  useEffect(() => {
    carregarDados();
  }, [id]);

  if (isLoading) {
    return <div className="text-center text-gray-400 py-20">Carregando...</div>;
  }

  if (!paciente) return null;

  return (
    <div>
      <Link
        href="/pacientes"
        className="text-sm text-blue-600 hover:underline mb-6 inline-block"
      >
        ← Voltar para Pacientes
      </Link>

      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">{paciente.nome}</h1>
        <p className="text-gray-500 text-sm mb-4">CPF: {paciente.cpf}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium text-gray-700">Nascimento:</span>
            <p>{new Date(paciente.data_nascimento).toLocaleDateString("pt-BR")}</p>
          </div>
          {paciente.telefone && (
            <div>
              <span className="font-medium text-gray-700">Telefone:</span>
              <p>{paciente.telefone}</p>
            </div>
          )}
          {paciente.email && (
            <div>
              <span className="font-medium text-gray-700">E-mail:</span>
              <p>{paciente.email}</p>
            </div>
          )}
          {paciente.endereco && (
            <div className="md:col-span-2">
              <span className="font-medium text-gray-700">Endereço:</span>
              <p>{paciente.endereco}</p>
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Consultas ({consultas.length})
        </h2>

        {consultas.length === 0 ? (
          <p className="text-gray-400 text-sm">Nenhuma consulta registrada para este paciente.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {consultas.map((consulta) => (
              <ConsultaCard
                key={consulta.id}
                consulta={consulta}
                onAtualizarStatus={handleAtualizarStatus}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
