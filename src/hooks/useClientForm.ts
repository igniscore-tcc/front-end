import { useState, useEffect } from "react";
import {
  validateCnpj,
  validatePhoneLength,
  extractNumbers,
  validateCpf,
} from "@/lib/validators";
import type { Cliente, TipoCliente, ClienteFormData } from "@/types/cliente";

type FormState = {
  nome: string;
  cnpj: string;
  cpf: string;
  inscricao: string;
  uf: string;
  email: string;
  telefone: string;
  observacao: string;
};

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

interface UseClientFormProps {
  isOpen: boolean;
  clientToEdit?: Cliente | null;
  onSave: (data: ClienteFormData & { id?: number }) => void;
  onClose: () => void;
}

export function useClientForm({
  isOpen,
  clientToEdit,
  onSave,
  onClose,
}: UseClientFormProps) {
  const isEditing = !!clientToEdit;

  const [tipo, setTipo] = useState<TipoCliente>("PJ");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Inicializa ou reseta o formulário quando o modal abre/fecha
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      if (clientToEdit) {
        setTipo(clientToEdit.tipo);
        setForm({
          nome: clientToEdit.nome ?? "",
          cnpj: clientToEdit.tipo === "PJ" ? extractNumbers(clientToEdit.cnpj) : "",
          cpf: clientToEdit.tipo === "PF" ? extractNumbers(clientToEdit.cpf) : "",
          inscricao: (clientToEdit.tipo === "PJ" ? clientToEdit.inscricao : "") ?? "",
          uf: clientToEdit.uf ?? "SP",
          email: clientToEdit.email ?? "",
          telefone: extractNumbers(clientToEdit.telefone ?? ""),
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
  }, [isOpen, clientToEdit]);

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

    let submitData: ClienteFormData & { id?: number };

    if (tipo === "PF") {
      submitData = {
        tipo: "PF",
        nome: form.nome,
        cpf: form.cpf,
        email: form.email,
        telefone: form.telefone,
        observacao: form.observacao,
        uf: form.uf,
      };
    } else {
      submitData = {
        tipo: "PJ",
        nome: form.nome,
        cnpj: form.cnpj,
        inscricao: form.inscricao,
        email: form.email,
        telefone: form.telefone,
        observacao: form.observacao,
        uf: form.uf,
      };
    }

    if (clientToEdit?.id !== undefined) {
      submitData.id = clientToEdit.id;
    }

    onSave(submitData);
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
