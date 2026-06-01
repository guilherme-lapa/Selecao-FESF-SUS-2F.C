"use client";

import { useEffect, useState } from "react";
import MetricCard from "@/components/ui/MetricCard";
import StatusBadge from "@/components/ui/StatusBadge";
import ConsultasChart from "@/components/charts/ConsultasChart";
import EspecialidadeChart from "@/components/charts/EspecialidadeChart";
import { pacientesService, consultasService, Consulta, Paciente } from "@/services/api";
import { atividadesRecentes } from "@/data/mock";

const ATIVIDADE_ICONS: Record<string, string> = {
  cadastro: "🟢",
  consulta: "🔵",
  cancelamento: "🔴",
};

export default function DashboardPage() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [p, c] = await Promise.all([
          pacientesService.listar(),
          consultasService.listar(),
        ]);
        setPacientes(p);
        setConsultas(c);
      } catch {
        setErro("Não foi possível conectar à Saúde API. Certifique-se que ela está rodando em http://localhost:8000");
      } finally {
        setIsLoading(false);
      }
    }
    carregarDados();
  }, []);

  const agendadas = consultas.filter((c) => c.status === "agendada").length;
  const realizadas = consultas.filter((c) => c.status === "realizada").length;
  const canceladas = consultas.filter((c) => c.status === "cancelada").length;
  const taxaRealizacao = consultas.length > 0
    ? ((realizadas / consultas.length) * 100).toFixed(1)
    : "0.0";

  const metrics = [
    { title: "Total de Pacientes", value: isLoading ? "..." : pacientes.length, change: 12, changeLabel: "cadastrados no sistema", icon: "👤", color: "#3B82F6" },
    { title: "Total de Consultas", value: isLoading ? "..." : consultas.length, change: 8, changeLabel: `${agendadas} agendadas`, icon: "📋", color: "#10B981" },
    { title: "Taxa de Realização", value: isLoading ? "..." : `${taxaRealizacao}%`, change: 3, changeLabel: `${realizadas} realizadas`, icon: "✅", color: "#8B5CF6" },
    { title: "Cancelamentos", value: isLoading ? "..." : canceladas, change: -5, changeLabel: "consultas canceladas", icon: "❌", color: "#EF4444" },
  ];

  const consultasRecentes = consultas.slice(-6).reverse();

  function formatarDataHora(iso: string) {
    return new Date(iso).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Visão Geral</h1>
        <p className="text-sm text-gray-400 mt-1">Bem-vindo ao painel de gestão de saúde</p>
      </div>

      {erro && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-4">
          ⚠️ {erro}
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Charts (dados simulados para demonstração) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2">
          <ConsultasChart />
        </div>
        <div>
          <EspecialidadeChart />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Consultas Recentes */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-800">Consultas Recentes</h2>
            <p className="text-sm text-gray-400">Últimas consultas registradas</p>
          </div>
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="text-center py-12 text-gray-400 text-sm">Carregando...</div>
            ) : consultasRecentes.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-sm">Nenhuma consulta registrada ainda.</div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400">Paciente ID</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400">Especialidade</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 hidden md:table-cell">Médico</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 hidden lg:table-cell">Data/Hora</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {consultasRecentes.map((consulta) => (
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
          </div>
        </div>

        {/* Atividade Recente */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-gray-800">Atividade Recente</h2>
            <p className="text-sm text-gray-400">Últimas ações no sistema</p>
          </div>
          <div className="space-y-4">
            {atividadesRecentes.map((atividade) => (
              <div key={atividade.id} className="flex items-start gap-3">
                <span className="text-base mt-0.5">{ATIVIDADE_ICONS[atividade.tipo]}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 leading-snug">{atividade.descricao}</p>
                  <p className="text-xs text-gray-400 mt-1">{atividade.tempo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
