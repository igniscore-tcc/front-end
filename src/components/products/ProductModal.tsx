"use client";

import { X, Hash, DollarSign } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { DatePicker } from "@/components/ui/DatePicker";
import { PRODUCT_TYPE_OPTIONS } from "@/lib/constants";
import { useProductForm } from "@/hooks/useProductForm";
import type { ProductModalProps, ProductType } from "@/types/product";

export function ProductModal({
  isOpen,
  onClose,
  onSave,
  productToEdit,
}: ProductModalProps) {
  const { form, setField, errors, isEditing, handleSubmit } = useProductForm({
    isOpen,
    productToEdit,
    onSave,
    onClose,
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditing ? "Editar produto" : "Adicionar produto"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <Input
                placeholder="Nome"
                value={form.nome}
                onChange={(e) => setField("nome", e.target.value)}
                error={errors.nome}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                placeholder="Tipo"
                value={form.tipo}
                onChange={(e) =>
                  setField("tipo", e.target.value as ProductType)
                }
                options={PRODUCT_TYPE_OPTIONS}
                error={errors.tipo}
              />
              <DatePicker
                placeholder="Validade"
                date={form.validade}
                setDate={(date) => setField("validade", date)}
                error={errors.validade}
              />
              <Input
                placeholder="Lote"
                value={form.lote}
                onChange={(e) => setField("lote", e.target.value)}
                error={errors.lote}
                suffixIcon={<Hash size={18} className="text-gray-400" />}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Input
                placeholder="Preço"
                type="number"
                step="0.01"
                value={form.preco === 0 ? "" : form.preco}
                onChange={(e) =>
                  setField("preco", parseFloat(e.target.value) || 0)
                }
                error={errors.preco}
                suffixIcon={<DollarSign size={18} className="text-gray-400" />}
              />
            </div>
          </div>

          <div className="p-6 bg-gray-50/50 border-t border-dashed border-gray-200 flex items-center justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-8 py-2.5 h-auto text-sm font-bold rounded-lg bg-[#E5E7EB] text-gray-700 hover:bg-gray-300 border-none transition-colors cursor-pointer"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="px-8 py-2.5 h-auto text-sm font-bold rounded-lg bg-[#FF5A1F] text-white hover:bg-[#E64D17] transition-colors shadow-sm cursor-pointer"
            >
              {isEditing ? "Salvar alterações" : "Adicionar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
