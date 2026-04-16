import { useState, useEffect } from "react";
import {
  validateCnpj,
  validatePhoneLength,
  extractNumbers,
  validateCpf,
} from "@/lib/validators";
import type { Cliente, TipoCliente } from "@/types/cliente";

interface FormState {
  nome: string;
  cnpj: string;
  cpf: string;
  inscricao: string;
  uf: string;
  email: string;
  telefone: string;
  observacao: string;
}

const EMPTY_FORM: FormState = {
  nome: "",
  cnpj: "",
  cpf: "",
  inscricao: "",
  uf: "SP",
  email: "",
  telefone: "",
  observacao: "",
};

function detectType(cnpj?: string): TipoCliente {
  if (!cnpj) return "PJ";
  return extractNumbers(cnpj).length === 11 ? "PF" : "PJ";
}

interface UseClientFormProps {
  isOpen: boolean;
  clientToEdit?: Cliente | null;
  onSave: (data: any) => void;
  onClose: () => void;
}

export function useClientForm({
  isOpen,
  clientToEdit,
  onSave,
  onClose,
}: UseClientFormProps) {
  const isEditing = !!clientToEdit;

  const [tipo, setTipo] = useState<TipoCliente>(() =>
    detectType(clientToEdit?.cnpj),
  );
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Inicializa ou reseta o formulário quando o modal abre/fecha
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      if (clientToEdit) {
        const t = detectType(clientToEdit.cnpj);
        setTipo(t);
        setForm({
          nome: clientToEdit.nome ?? "",
          cnpj: t === "PJ" ? extractNumbers(clientToEdit.cnpj) : "",
          cpf: t === "PF" ? extractNumbers(clientToEdit.cnpj) : "",
          inscricao: clientToEdit.inscricao ?? "",
          uf: clientToEdit.uf ?? "SP",
          email: clientToEdit.email ?? "",
          telefone: extractNumbers(clientToEdit.numero ?? ""),
          observacao: clientToEdit.observacao ?? "",
        });
      } else {
        setForm(EMPTY_FORM);
        setTipo("PJ");
      }
      setErrors({});
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const validate = () => {
    const next: Record<string, string> = {};
    const emailRegex = /\S+@\S+\.\S+/;

    if (!form.nome.trim()) next.nome = "Nome é obrigatório";

    if (tipo === "PJ") {
      const d = extractNumbers(form.cnpj);
      if (!d) next.cnpj = "CNPJ é obrigatório";
      else if (d.length !== 14) next.cnpj = "CNPJ deve ter 14 dígitos";
      else if (!validateCnpj(form.cnpj)) next.cnpj = "CNPJ inválido";
    } else {
      const d = extractNumbers(form.cpf);
      if (!d) next.cpf = "CPF é obrigatório";
      else if (d.length !== 11) next.cpf = "CPF deve ter 11 dígitos";
      else if (!validateCpf(form.cpf)) next.cpf = "CPF inválido";
    }

    if (!form.email.trim()) next.email = "Email é obrigatório";
    else if (!emailRegex.test(form.email)) next.email = "Email inválido";

    if (!extractNumbers(form.telefone))
      next.telefone = "Telefone é obrigatório";
    else if (!validatePhoneLength(form.telefone))
      next.telefone = "Telefone incompleto";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...form,
      cnpj: tipo === "PJ" ? form.cnpj : form.cpf,
      type: tipo,
      ...(clientToEdit?.id !== undefined && { id: clientToEdit.id }),
    });
    onClose();
  };

  const setField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return {
    tipo,
    setTipo,
    form,
    setField,
    errors,
    isEditing,
    handleSubmit,
  };
}
