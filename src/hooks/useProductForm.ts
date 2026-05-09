import { useState, useEffect } from "react";
import type { Product, ProductFormData } from "@/types/product";
import { ProductType } from "@/types/product";

interface UseProductFormProps {
  isOpen: boolean;
  productToEdit?: Product | null;
  onSave: (data: ProductFormData & { id?: number }) => Promise<void>;
  onClose: () => void;
}

const EMPTY_FORM: ProductFormData = {
  nome: "",
  tipo: ProductType.EXTINGUISHER,
  validade: "",
  lote: "",
  preco: 0,
};

function isValidIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(`${value}T00:00:00`);
  return !Number.isNaN(d.getTime());
}

function isPastDate(value: string): boolean {
  if (!isValidIsoDate(value)) return false;
  const selected = new Date(`${value}T00:00:00`);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return selected.getTime() < today.getTime();
}

export function useProductForm({
  isOpen,
  productToEdit,
  onSave,
  onClose,
}: UseProductFormProps) {
  const isEditing = !!productToEdit;

  const [form, setForm] = useState<ProductFormData>(EMPTY_FORM);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    if (productToEdit) {
      setForm({
        nome: productToEdit.nome,
        tipo: productToEdit.tipo,
        validade: productToEdit.validade,
        lote: productToEdit.lote,
        preco: productToEdit.preco,
      });
    } else {
      setForm(EMPTY_FORM);
    }

    setErrors({});
  }, [isOpen, productToEdit]);

  const validate = () => {
    const next: Record<string, string> = {};

    const nome = form.nome.trim();
    if (!nome) {
      next.nome = "Nome é obrigatório";
    } else if (nome.length < 2) {
      next.nome = "Nome deve ter pelo menos 2 caracteres";
    } else if (nome.length > 120) {
      next.nome = "Nome deve ter no máximo 120 caracteres";
    }

    if (!form.tipo) {
      next.tipo = "Tipo é obrigatório";
    }

    if (!form.validade) {
      next.validade = "Validade é obrigatória";
    } else if (!isValidIsoDate(form.validade)) {
      next.validade = "Validade inválida";
    } else if (isPastDate(form.validade)) {
      next.validade = "Validade não pode ser no passado";
    }

    const lote = form.lote.trim();
    if (!lote) {
      next.lote = "Lote é obrigatório";
    } else if (lote.length < 2) {
      next.lote = "Lote deve ter pelo menos 2 caracteres";
    } else if (lote.length > 40) {
      next.lote = "Lote deve ter no máximo 40 caracteres";
    } else if (!/^[A-Za-z0-9._\-\/]+$/.test(lote)) {
      next.lote = "Lote deve conter apenas letras, números e . _ - /";
    }

    if (!Number.isFinite(form.preco) || form.preco === 0) {
      next.preco = "Preço é obrigatório";
    } else if (form.preco < 0) {
      next.preco = "Preço não pode ser negativo";
    } else if (form.preco > 999999999) {
      next.preco = "Preço inválido (valor muito alto)";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate() || submitting) {
      return;
    }

    const payload = {
      ...form,
      id: productToEdit?.id,
    };

    setSubmitting(true);

    try {
      await onSave(payload);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  const setField = <K extends keyof ProductFormData>(
    field: K,
    value: ProductFormData[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  return {
    form,
    setField,
    errors,
    isEditing,
    submitting,
    handleSubmit,
  };
}
