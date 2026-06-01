import { Consulta, StatusConsulta } from "@/types";

interface ConsultaCardProps {
  consulta: Consulta;
  onAtualizarStatus?: (id: number, status: StatusConsulta) => void;
}

const STATUS_CONFIG: Record<StatusConsulta, { label: string; classes: string }> = {
  agendada: { label: "Agendada", classes: "bg-yellow-100 text-yellow-700" },
  realizada: { label: "Realizada", classes: "bg-green-100 text-green-700" },
  cancelada: { label: "Cancelada", classes: "bg-red-100 text-red-600" },
};

function formatarDataHora(isoString: string): string {
  return new Date(isoString).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export default function ConsultaCard({ consulta, onAtualizarStatus }: ConsultaCardProps) {
  const statusConfig = STATUS_CONFIG[consulta.status];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-base font-semibold text-gray-800">
            {consulta.especialidade}
          </h3>
          {consulta.medico && (
            <p className="text-sm text-gray-500">{consulta.medico}</p>
          )}
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusConfig.classes}`}>
          {statusConfig.label}
        </span>
      </div>

      <div className="text-sm text-gray-600 space-y-1 mb-4">
        <p>📅 {formatarDataHora(consulta.data_hora)}</p>
        <p>👤 Paciente #{consulta.paciente_id}</p>
        {consulta.observacoes && (
          <p className="text-gray-500 italic">"{consulta.observacoes}"</p>
        )}
      </div>

      {onAtualizarStatus && consulta.status === "agendada" && (
        <div className="flex gap-2">
          <button
            onClick={() => onAtualizarStatus(consulta.id, "realizada")}
            className="flex-1 text-center text-sm bg-green-600 text-white py-1.5 rounded hover:bg-green-700 transition-colors"
          >
            Marcar como Realizada
          </button>
          <button
            onClick={() => onAtualizarStatus(consulta.id, "cancelada")}
            className="text-sm bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded hover:bg-red-100 transition-colors"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}
