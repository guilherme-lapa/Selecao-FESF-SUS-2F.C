/**
 * Tipos do domínio — espelham o contrato da nossa API de clima.
 */

export interface Localizacao {
  nome: string;
  pais: string | null;
  latitude: number;
  longitude: number;
}

export interface ClimaAtual {
  temperatura: number;
  umidade: number;
  vento: number;
  descricao: string;
  icone: string;
}

export interface PrevisaoDia {
  data: string;
  temp_min: number;
  temp_max: number;
  descricao: string;
  icone: string;
}

export interface Clima {
  local: Localizacao;
  atual: ClimaAtual;
  previsao: PrevisaoDia[];
}
