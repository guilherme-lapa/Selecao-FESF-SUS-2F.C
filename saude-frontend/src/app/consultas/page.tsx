"use client";

import { useEffect, useState } from "react";
import { consultasService } from "@/services/api";
import { Consulta, StatusConsulta } from "@/types";
import ConsultaCard from "@/components/ConsultaCard";

const STATUS_FILTROS: { label: string; value: StatusConsulta | "todas" }[] = [
  { label: "Todas", value: "todas" },
  { label: "Agendadas", value: "agendada" },
  { label: "Realizadas", value: "realizada" },
  { label: "Canceladas", value: "cancelada" },
];

export default function ConsultasPage() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [filtro, setFiltro] = useState<StatusConsulta | "todas">("todas");
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  async function carregarConsultas() {
    try {
      setErro(null);
      const data = await consultasService.listar();
      setConsultas(data);
    } catch (err: unknown) {
      setErro(err instanceof Error ? err.message : "Erro ao carregar consultas.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAtualizarStatus(id: number, status: StatusConsulta) {
    try {
      const atualizada = await consultasService.atualizar(id, { status });
      setConsultas((prev) => prev.map((c) => (c.id === id ? atualizada : c)));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Erro ao atualizar consulta.");
    }
  }

  const consultasFiltradas =
    filtro === "todas" ? consultas : consultas.filter((c) => c.status === filtro);

  useEffect(() => {
    carregarConsultas();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Consultas</h1>
        <span className="text-sm text-gray-500">{consultasFiltradas.length} resultado(s)</span>
      </div>

      {/* Filtros por status */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {STATUS_FILTROS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setFiltro(value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              filtro === value
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="text-center text-gray-400 py-12">Carregando consultas...</div>
      )}

      {erro && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded p-4 mb-4">
          {erro}
        </div>
      )}

      {!isLoading && consultasFiltradas.length === 0 && !erro && (
        <div className="text-center text-gray-400 py-12">
          Nenhuma consulta encontrada para este filtro.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {consultasFiltradas.map((consulta) => (
          <ConsultaCard
            key={consulta.id}
            consulta={consulta}
            onAtualizarStatus={handleAtualizarStatus}
          />
        ))}
      </div>
    </div>
  );
}
