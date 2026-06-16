/**
 * Formatação de datas para a previsão.
 */

const DIAS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

/** Retorna o dia da semana abreviado a partir de uma data ISO (YYYY-MM-DD). */
export function diaDaSemana(iso: string): string {
  // Interpreta como data local (sem fuso) para evitar deslocamento de dia.
  const [ano, mes, dia] = iso.split("-").map(Number);
  const data = new Date(ano, mes - 1, dia);
  return DIAS[data.getDay()];
}

/** Retorna "Hoje" para o primeiro dia, senão o dia da semana. */
export function rotuloDia(iso: string, indice: number): string {
  return indice === 0 ? "Hoje" : diaDaSemana(iso);
}
