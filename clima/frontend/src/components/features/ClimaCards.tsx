import type { Clima } from "@/types/clima";
import { rotuloDia } from "@/lib/data";

/** Painel principal com o clima atual da cidade. */
export function ClimaAtualCard({ clima }: { clima: Clima }) {
  const { local, atual } = clima;

  return (
    <div className="rounded-3xl border border-white/20 bg-white/15 p-8 text-center text-white backdrop-blur-md">
      <h2 className="text-xl font-semibold">
        {local.nome}
        {local.pais && (
          <span className="font-normal text-white/70">, {local.pais}</span>
        )}
      </h2>

      <div className="my-4 text-7xl">{atual.icone}</div>

      <div className="text-6xl font-bold">{Math.round(atual.temperatura)}°</div>
      <p className="mt-1 text-lg text-white/80">{atual.descricao}</p>

      <div className="mt-6 flex justify-center gap-8 text-sm text-white/80">
        <div className="flex flex-col">
          <span className="text-white/60">Umidade</span>
          <span className="text-base font-semibold">{atual.umidade}%</span>
        </div>
        <div className="flex flex-col">
          <span className="text-white/60">Vento</span>
          <span className="text-base font-semibold">{atual.vento} km/h</span>
        </div>
      </div>
    </div>
  );
}

/** Tira horizontal com a previsão dos próximos dias. */
export function PrevisaoLista({ clima }: { clima: Clima }) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {clima.previsao.map((dia, i) => (
        <div
          key={dia.data}
          className="flex flex-col items-center gap-1 rounded-2xl border border-white/15 bg-white/10 p-3 text-center text-white backdrop-blur"
        >
          <span className="text-xs font-medium text-white/70">
            {rotuloDia(dia.data, i)}
          </span>
          <span className="text-2xl">{dia.icone}</span>
          <span className="text-sm font-semibold">
            {Math.round(dia.temp_max)}°
          </span>
          <span className="text-xs text-white/60">
            {Math.round(dia.temp_min)}°
          </span>
        </div>
      ))}
    </div>
  );
}
