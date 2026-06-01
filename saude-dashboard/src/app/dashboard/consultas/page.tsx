"use client";

import { useEffect, useState } from "react";
import StatusBadge from "@/components/ui/StatusBadge";
import { consultasService, Consulta } from "@/services/api";

type Filtro = "todas" | "agendada" | "realizada" | "cancelada";

const filtros: { label: string; value: Filtro }[] = [
  { label: "Todas", value: "todas" },
  { label: "Agendadas", value: "agendada" },
  { label: "Realizadas", value: "realizada" },
  { label: "Canceladas", value: "cancelada" },
];

function formatarDataHora(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

export default function ConsultasPage() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregar() {
      try {
        const data = await consultasService.listar();
        setConsultas(data);
      } catch {
        setErro("Não foi possível conectar à Saúde API. Certifique-se que ela está rodando em http://localhost:8000");
      } finally {
        setIsLoading(false);
      }
    }
    carregar();
  }, []);

  const filtradas =
    filtro === "todas" ? consultas : consultas.filter((c) => c.status === filtro);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Consultas</h1>
          <p className="text-sm text-gray-400 mt-1">
            {isLoading ? "Carregando..." : `${filtradas.length} resultado(s)`}
          </p>
        </div>
      </div>

      {erro && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-4">
          ⚠️ {erro}
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {filtros.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setFiltro(value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
              filtro === value
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="text-center py-12 text-gray-400 text-sm">Carregando consultas...</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400">Paciente</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400">Especialidade</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 hidden md:table-cell">Médico</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 hidden lg:table-cell">Data/Hora</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtradas.map((consulta) => (
                  <tr key={consulta.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">Paciente #{consulta.paciente_id}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{consulta.especialidade}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">{consulta.medico ?? "—"}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden lg:table-cell">{formatarDataHora(consulta.data_hora)}</td>
                    <td className="px-6 py-4"><StatusBadge status={consulta.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!isLoading && filtradas.length === 0 && !erro && (
            <div className="text-center py-12 text-gray-400 text-sm">
              Nenhuma consulta encontrada para este filtro.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
