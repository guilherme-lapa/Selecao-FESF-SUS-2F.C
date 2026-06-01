"use client";

/**
 * Hook que copia texto para a área de transferência e expõe um
 * estado "copiado" temporário para feedback visual no botão.
 */

import { useCallback, useState } from "react";

export function useCopiar(duracaoMs = 1800) {
  const [copiado, setCopiado] = useState(false);

  const copiar = useCallback(
    async (texto: string) => {
      try {
        await navigator.clipboard.writeText(texto);
        setCopiado(true);
        setTimeout(() => setCopiado(false), duracaoMs);
      } catch {
        setCopiado(false);
      }
    },
    [duracaoMs],
  );

  return { copiado, copiar };
}
