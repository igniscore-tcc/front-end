/**
 * Extrai apenas os números de um texto.
 * Remove qualquer caractere que não seja número (útil para limpar máscaras antes de enviar para o backend).
 */
export function extractNumbers(value: string): string {
  return value.replace(/\D/g, "");
}

const CNPJ_MAX_LEN = 14;

/** Máximo 14 dígitos */
export function cleanCnpj(value: string): string {
  return extractNumbers(value).slice(0, CNPJ_MAX_LEN);
}

/* Aplica a formatação visual padrão do CNPJ: 00.000.000/0001-00 */
export function formatCnpj(digits: string): string {
  const d = extractNumbers(digits).slice(0, CNPJ_MAX_LEN);
  if (d.length === 0) return "";
  if (d.length <= 2) return d;
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
  if (d.length <= 8) {
    return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  }
  if (d.length <= 12) {
    return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
  }
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12, 14)}`;
}

const PHONE_NATIONAL_MAX = 11;

/**
 * Limpa o número de telefone, mantendo apenas os números.
 * Remove também o código de discagem do Brasil (55) caso o usuário cole o número completo com DDI.
 */
export function cleanPhone(value: string): string {
  let d = extractNumbers(value);
  if (d.startsWith("55") && d.length >= 12) {
    d = d.slice(2);
  }
  return d.slice(0, PHONE_NATIONAL_MAX);
}

/**
 * Formatação dinâmica para telefones.
 * Ajusta automaticamente a máscara em tempo real entre telefone fixo (8 dígitos) e celular (9 dígitos).
 */
export function formatPhone(digits: string): string {
  const d = extractNumbers(digits).slice(0, PHONE_NATIONAL_MAX);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;

  const ddd = d.slice(0, 2);
  const rest = d.slice(2);

  const mobile = rest[0] === "9";

  if (mobile) {
    if (rest.length <= 5) return `(${ddd}) ${rest}`;
    return `(${ddd}) ${rest.slice(0, 5)}-${rest.slice(5, 9)}`;
  }

  if (rest.length <= 4) return `(${ddd}) ${rest}`;
  return `(${ddd}) ${rest.slice(0, 4)}-${rest.slice(4, 8)}`;
}

/**
 * Validação rigorosa de CNPJ usando o algoritmo oficial (módulo 11 da Receita Federal).
 * Verifica do início ao fim se a matemática dos dois últimos dígitos verificadores está correta.
 */
export function validateCnpj(raw: string): boolean {
  const cnpj = extractNumbers(raw);
  if (cnpj.length !== 14) return false;
  
  // Bloqueia combinações falsas clássicas que passam no módulo matemático (ex: 11.111.111/1111-11)
  if (/^(\d)\1{13}$/.test(cnpj)) return false;

  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  const verifier = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += Number(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== Number(verifier.charAt(0))) return false;

  size += 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += Number(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  return result === Number(verifier.charAt(1));
}

/** 
 * Avalia se o telefone digitado possui o comprimento brasileiro válido (10 para fixos ou 11 para celulares). 
 */
export function validatePhoneLength(raw: string): boolean {
  const d = extractNumbers(raw);
  if (d.length === 10 || d.length === 11) return true;
  if (d.startsWith("55")) {
    const national = d.slice(2);
    return national.length === 10 || national.length === 11;
  }
  return false;
}
