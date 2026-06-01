"use client";

import { useEffect, useState } from "react";
import { pacientesService, Paciente } from "@/services/api";

function calcularIdade(dataNascimento: string): number {
  const nascimento = new Date(dataNascimento);
  const hoje = new Date();
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) idade--;
  return idade;
}

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [busca, setBusca] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregar() {
      try {
        const data = await pacientesService.listar();
        setPacientes(data);
      } catch {
        setErro("Não foi possível conectar à Saúde API. Certifique-se que ela está rodando em http://localhost:8000");
      } finally {
        setIsLoading(false);
      }
    }
    carregar();
  }, []);

  const filtrados = pacientes.filter(
    (p) =>
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.cpf.includes(busca)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pacientes</h1>
          <p className="text-sm text-gray-400 mt-1">
            {isLoading ? "Carregando..." : `${pacientes.length} pacientes cadastrados`}
          </p>
        </div>
      </div>

      {erro && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-4">
          ⚠️ {erro}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <input
            type="text"
            placeholder="Buscar por nome ou CPF..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full max-w-sm border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="text-center py-12 text-gray-400 text-sm">Carregando pacientes...</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400">Nome</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 hidden md:table-cell">CPF</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 hidden lg:table-cell">Idade</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 hidden lg:table-cell">Telefone</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((paciente) => (
                  <tr key={paciente.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{paciente.nome}</p>
                        <p className="text-xs text-gray-400">{paciente.email ?? "—"}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">{paciente.cpf}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden lg:table-cell">
                      {calcularIdade(paciente.data_nascimento)} anos
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden lg:table-cell">{paciente.telefone ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!isLoading && filtrados.length === 0 && !erro && (
            <div className="text-center py-12 text-gray-400 text-sm">
              {busca ? `Nenhum paciente encontrado para "${busca}"` : "Nenhum paciente cadastrado ainda."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
