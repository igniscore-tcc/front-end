import { useState, useEffect } from "react";
import type { Product, ProductFormData } from "@/types/product";

interface UseProductFormProps {
  isOpen: boolean;
  productToEdit?: Product | null;
  onSave: (data: ProductFormData & { id?: number }) => void;
  onClose: () => void;
}

const EMPTY_FORM: ProductFormData = {
  nome: "",
  tipo: "",
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

  useEffect(() => {
    if (isOpen) {
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
    }
  }, [isOpen, productToEdit]);

  const validate = () => {
    const next: Record<string, string> = {};

    if (!form.nome.trim()) next.nome = "Nome é obrigatório";
    if (!form.tipo) next.tipo = "Tipo é obrigatório";
    if (!form.validade) next.validade = "Validade é obrigatória";
    if (!form.lote.trim()) next.lote = "Lote é obrigatório";
    if (form.preco < 0) next.preco = "Preço não pode ser negativo";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const submitData = {
      ...form,
      id: productToEdit?.id,
    };

    onSave(submitData);
    onClose();
  };

  const setField = (field: keyof ProductFormData, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return {
    form,
    setField,
    errors,
    isEditing,
    handleSubmit,
  };
}
