import { useState, useEffect } from "react";
import {
  validateCnpj,
  validatePhoneLength,
  extractNumbers,
  validateCpf,
  validateEmail,
  normalizeEmail,
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
  nomeFantasia: string;
  endereco: string;
  numero: string;
  cep: string;
  bairro: string;
  cidade: string;
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
  nomeFantasia: "",
  endereco: "",
  numero: "",
  cep: "",
  bairro: "",
  cidade: "",
};

interface UseClientFormProps {
  isOpen: boolean;
  clientToEdit?: Cliente | null;
  onSave: (data: ClienteFormData & { id?: number }) => Promise<void>;
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
  const [submitting, setSubmitting] = useState(false);

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
          nomeFantasia: clientToEdit.nomeFantasia ?? "",
          endereco: clientToEdit.endereco ?? "",
          numero: clientToEdit.numero ?? "",
          cep: clientToEdit.cep ?? "",
          bairro: clientToEdit.bairro ?? "",
          cidade: clientToEdit.cidade ?? "",
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
    const email = normalizeEmail(form.email);

    const nome = form.nome.trim();
    if (nome && nome.length < 2) next.nome = "Nome deve ter pelo menos 2 caracteres";
    else if (nome && nome.length > 120) next.nome = "Nome deve ter no máximo 120 caracteres";

    const uf = (form.uf ?? "").trim().toUpperCase();
    if (uf && !/^[A-Z]{2}$/.test(uf)) next.uf = "UF inválida";

    if (tipo === "PJ") {
      const d = extractNumbers(form.cnpj);
      if (d && d.length !== 14) next.cnpj = "CNPJ deve ter 14 dígitos";
      else if (d && !validateCnpj(form.cnpj)) next.cnpj = "CNPJ inválido";
    } else {
      const d = extractNumbers(form.cpf);
      if (d && d.length !== 11) next.cpf = "CPF deve ter 11 dígitos";
      else if (d && !validateCpf(form.cpf)) next.cpf = "CPF inválido";
    }

    if (email && !validateEmail(email)) next.email = "Email inválido";

    const phoneDigits = extractNumbers(form.telefone);
    if (phoneDigits) {
      if (phoneDigits.length !== 10 && phoneDigits.length !== 11) {
        next.telefone = "Telefone incompleto";
      } else {
        const ddd = Number(phoneDigits.slice(0, 2));

        if (ddd < 11 || ddd > 99) {
          next.telefone = "DDD inválido";
        } else if (phoneDigits.length === 11 && phoneDigits[2] !== "9") {
          next.telefone = "Telefone inválido";
        } else if (
          phoneDigits.length === 10 &&
          !/^[2-5]/.test(phoneDigits[2])
        ) {
          next.telefone = "Telefone inválido";
        }
      }
    }

    const obs = (form.observacao ?? "").trim();
    if (obs.length > 500) next.observacao = "Observação deve ter no máximo 500 caracteres";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || submitting) return;

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
        nomeFantasia: form.nomeFantasia,
        endereco: form.endereco,
        numero: form.numero,
        cep: form.cep,
        bairro: form.bairro,
        cidade: form.cidade,
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
        nomeFantasia: form.nomeFantasia,
        endereco: form.endereco,
        numero: form.numero,
        cep: form.cep,
        bairro: form.bairro,
        cidade: form.cidade,
      };
    }

    if (clientToEdit?.id !== undefined) {
      submitData.id = clientToEdit.id;
    }

    setSubmitting(true);
    try {
      await onSave(submitData);
      onClose();
    } finally {
      setSubmitting(false);
    }
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
    submitting,
    handleSubmit,
  };
}
