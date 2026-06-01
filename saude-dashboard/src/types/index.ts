export interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: string;
  color: string;
}

export interface ConsultaPorMes {
  mes: string;
  agendadas: number;
  realizadas: number;
  canceladas: number;
}

export interface PacientesPorEspecialidade {
  especialidade: string;
  total: number;
  color: string;
}

export interface ConsultaRecente {
  id: number;
  paciente: string;
  especialidade: string;
  medico: string;
  data: string;
  status: "agendada" | "realizada" | "cancelada";
}

export interface AtividadeRecente {
  id: number;
  tipo: "cadastro" | "consulta" | "cancelamento";
  descricao: string;
  tempo: string;
}
