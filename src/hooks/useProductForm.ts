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

    if (!form.nome.trim()) {
      next.nome = "Nome é obrigatório";
    }

    if (!form.tipo) {
      next.tipo = "Tipo é obrigatório";
    }

    if (!form.validade) {
      next.validade = "Validade é obrigatória";
    }

    if (!form.lote.trim()) {
      next.lote = "Lote é obrigatório";
    }

    if (form.preco < 0) {
      next.preco = "Preço não pode ser negativo";
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
