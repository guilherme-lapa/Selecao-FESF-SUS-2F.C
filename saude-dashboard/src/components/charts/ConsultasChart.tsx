"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { consultasPorMes } from "@/data/mock";

export default function ConsultasChart() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h2 className="text-base font-semibold text-gray-800">
          Consultas por Mês
        </h2>
        <p className="text-sm text-gray-400">Evolução anual de consultas</p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={consultasPorMes} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorAgendadas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorRealizadas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorCanceladas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
          <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: "12px", border: "1px solid #E5E7EB", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}
            labelStyle={{ fontWeight: 600, color: "#111827" }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: "12px", paddingTop: "16px" }}
          />
          <Area type="monotone" dataKey="agendadas" name="Agendadas" stroke="#3B82F6" strokeWidth={2} fill="url(#colorAgendadas)" />
          <Area type="monotone" dataKey="realizadas" name="Realizadas" stroke="#10B981" strokeWidth={2} fill="url(#colorRealizadas)" />
          <Area type="monotone" dataKey="canceladas" name="Canceladas" stroke="#EF4444" strokeWidth={2} fill="url(#colorCanceladas)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
