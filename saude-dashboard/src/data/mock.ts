import {
  AtividadeRecente,
  ConsultaPorMes,
  ConsultaRecente,
  PacientesPorEspecialidade,
} from "@/types";

export const consultasPorMes: ConsultaPorMes[] = [
  { mes: "Jan", agendadas: 65, realizadas: 58, canceladas: 7 },
  { mes: "Fev", agendadas: 72, realizadas: 65, canceladas: 9 },
  { mes: "Mar", agendadas: 88, realizadas: 79, canceladas: 11 },
  { mes: "Abr", agendadas: 95, realizadas: 87, canceladas: 8 },
  { mes: "Mai", agendadas: 110, realizadas: 98, canceladas: 12 },
  { mes: "Jun", agendadas: 102, realizadas: 94, canceladas: 10 },
  { mes: "Jul", agendadas: 120, realizadas: 108, canceladas: 14 },
  { mes: "Ago", agendadas: 135, realizadas: 121, canceladas: 16 },
  { mes: "Set", agendadas: 128, realizadas: 115, canceladas: 13 },
  { mes: "Out", agendadas: 142, realizadas: 130, canceladas: 15 },
  { mes: "Nov", agendadas: 155, realizadas: 140, canceladas: 18 },
  { mes: "Dez", agendadas: 148, realizadas: 133, canceladas: 17 },
];

export const pacientesPorEspecialidade: PacientesPorEspecialidade[] = [
  { especialidade: "Clínica Geral", total: 420, color: "#3B82F6" },
  { especialidade: "Cardiologia", total: 280, color: "#EF4444" },
  { especialidade: "Pediatria", total: 240, color: "#10B981" },
  { especialidade: "Ortopedia", total: 190, color: "#F59E0B" },
  { especialidade: "Ginecologia", total: 175, color: "#8B5CF6" },
  { especialidade: "Outros", total: 145, color: "#6B7280" },
];

export const consultasRecentes: ConsultaRecente[] = [
  { id: 1, paciente: "Maria da Silva", especialidade: "Cardiologia", medico: "Dr. Carlos Souza", data: "17/04/2026 09:00", status: "realizada" },
  { id: 2, paciente: "João Pereira", especialidade: "Clínica Geral", medico: "Dra. Ana Lima", data: "17/04/2026 10:30", status: "agendada" },
  { id: 3, paciente: "Fernanda Costa", especialidade: "Pediatria", medico: "Dr. Rafael Melo", data: "17/04/2026 11:00", status: "realizada" },
  { id: 4, paciente: "Carlos Oliveira", especialidade: "Ortopedia", medico: "Dr. Bruno Alves", data: "17/04/2026 14:00", status: "cancelada" },
  { id: 5, paciente: "Patrícia Santos", especialidade: "Ginecologia", medico: "Dra. Juliana Neves", data: "17/04/2026 15:30", status: "agendada" },
  { id: 6, paciente: "Roberto Lima", especialidade: "Clínica Geral", medico: "Dra. Ana Lima", data: "17/04/2026 16:00", status: "realizada" },
];

export const atividadesRecentes: AtividadeRecente[] = [
  { id: 1, tipo: "cadastro", descricao: "Novo paciente cadastrado: Marcos Almeida", tempo: "há 5 min" },
  { id: 2, tipo: "consulta", descricao: "Consulta realizada: Maria da Silva - Cardiologia", tempo: "há 12 min" },
  { id: 3, tipo: "cadastro", descricao: "Novo paciente cadastrado: Luciana Ferreira", tempo: "há 28 min" },
  { id: 4, tipo: "cancelamento", descricao: "Consulta cancelada: Carlos Oliveira - Ortopedia", tempo: "há 45 min" },
  { id: 5, tipo: "consulta", descricao: "Consulta realizada: Fernanda Costa - Pediatria", tempo: "há 1h" },
];
