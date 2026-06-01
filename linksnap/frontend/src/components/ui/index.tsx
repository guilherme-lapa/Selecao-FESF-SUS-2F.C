import { type ButtonHTMLAttributes, type InputHTMLAttributes, forwardRef } from "react";

type Variante = "primario" | "secundario" | "perigo";

const estilosBotao: Record<Variante, string> = {
  primario: "bg-eletrico text-white hover:bg-eletrico-claro shadow-suave",
  secundario:
    "bg-papel-cartao text-tinta-700 border border-tinta-900/10 hover:bg-eletrico-fundo",
  perigo: "bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variante = "primario", className = "", ...props }, ref) => (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${estilosBotao[variante]} ${className}`}
      {...props}
    />
  ),
);
Button.displayName = "Button";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  rotulo?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ rotulo, id, className = "", ...props }, ref) => (
    <div className="flex w-full flex-col gap-1.5">
      {rotulo && (
        <label htmlFor={id} className="text-xs font-semibold text-tinta-500">
          {rotulo}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={`w-full rounded-xl border border-tinta-900/10 bg-papel-cartao px-3.5 py-2.5 text-sm text-tinta-900 outline-none transition placeholder:text-tinta-500/60 focus:border-eletrico focus:shadow-realce ${className}`}
        {...props}
      />
    </div>
  ),
);
Input.displayName = "Input";

export function Spinner({ texto = "Carregando…" }: { texto?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-tinta-500">
      <div className="h-7 w-7 animate-spin rounded-full border-2 border-eletrico-fundo border-t-eletrico" />
      <p className="text-sm">{texto}</p>
    </div>
  );
}

export function EstadoVazio({ mensagem }: { mensagem: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-tinta-900/10 bg-papel-cartao py-14 text-center text-tinta-500">
      {mensagem}
    </div>
  );
}

export function EstadoErro({
  mensagem,
  aoTentarNovamente,
}: {
  mensagem: string;
  aoTentarNovamente?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 py-10 text-center">
      <p className="text-rose-600">{mensagem}</p>
      {aoTentarNovamente && (
        <button
          onClick={aoTentarNovamente}
          className="mt-2 text-sm text-tinta-500 underline hover:text-tinta-900"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
