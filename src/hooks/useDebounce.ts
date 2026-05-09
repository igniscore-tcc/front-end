import { useState, useEffect } from "react";

/**
 * Hook que atrasa a atualização de um valor até que o usuário pare de digitar.
 * Útil para campos de busca que disparam requests ou re-renderizações pesadas.
 *
 * @param value - Valor a ser "debounced"
 * @param delay - Tempo de espera em milissegundos (padrão: 300ms)
 * @returns O valor atualizado somente após o delay
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
