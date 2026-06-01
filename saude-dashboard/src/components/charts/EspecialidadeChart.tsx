"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { pacientesPorEspecialidade } from "@/data/mock";

export default function EspecialidadeChart() {
  const total = pacientesPorEspecialidade.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h2 className="text-base font-semibold text-gray-800">
          Pacientes por Especialidade
        </h2>
        <p className="text-sm text-gray-400">Distribuição total: {total} pacientes</p>
      </div>

      <div className="flex items-center gap-6">
        <ResponsiveContainer width="50%" height={200}>
          <PieChart>
            <Pie
              data={pacientesPorEspecialidade}
              dataKey="total"
              nameKey="especialidade"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              strokeWidth={2}
            >
              {pacientesPorEspecialidade.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: "12px", border: "1px solid #E5E7EB" }}
              formatter={(value: number) => [`${value} pacientes`, ""]}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="flex-1 space-y-3">
          {pacientesPorEspecialidade.map((item) => (
            <div key={item.especialidade} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-gray-600">{item.especialidade}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-800">{item.total}</span>
                <span className="text-xs text-gray-400">
                  {Math.round((item.total / total) * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
