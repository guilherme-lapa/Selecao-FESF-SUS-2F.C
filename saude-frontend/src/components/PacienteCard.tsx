import Link from "next/link";
import { Paciente } from "@/types";

interface PacienteCardProps {
  paciente: Paciente;
  onDelete?: (id: number) => void;
}

function formatarCPF(cpf: string) {
  return cpf; // CPF já vem formatado da API
}

function calcularIdade(dataNascimento: string): number {
  const nascimento = new Date(dataNascimento);
  const hoje = new Date();
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
}

export default function PacienteCard({ paciente, onDelete }: PacienteCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{paciente.nome}</h3>
          <p className="text-sm text-gray-500">CPF: {formatarCPF(paciente.cpf)}</p>
        </div>
        <span className="text-sm bg-blue-100 text-blue-700 font-medium px-2 py-1 rounded-full">
          {calcularIdade(paciente.data_nascimento)} anos
        </span>
      </div>

      <div className="text-sm text-gray-600 space-y-1 mb-4">
        {paciente.telefone && (
          <p>📞 {paciente.telefone}</p>
        )}
        {paciente.email && (
          <p>✉️ {paciente.email}</p>
        )}
        {paciente.endereco && (
          <p>📍 {paciente.endereco}</p>
        )}
      </div>

      <div className="flex gap-2">
        <Link
          href={`/pacientes/${paciente.id}`}
          className="flex-1 text-center text-sm bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 transition-colors"
        >
          Ver detalhes
        </Link>
        {onDelete && (
          <button
            onClick={() => onDelete(paciente.id)}
            className="text-sm bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded hover:bg-red-100 transition-colors"
          >
            Remover
          </button>
        )}
      </div>
    </div>
  );
}
