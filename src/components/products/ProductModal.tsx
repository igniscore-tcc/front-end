"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DatePicker } from "@/components/ui/DatePicker";

import { PRODUCT_TYPE_OPTIONS } from "@/lib/constants";
import { useProductForm } from "@/hooks/useProductForm";
import { maskCurrency, parseCurrencyToNumber } from "@/lib/validators";

import type { ProductModalProps, ProductType } from "@/types/product";

export function ProductModal({
  isOpen,
  onClose,
  onSave,
  productToEdit,
}: ProductModalProps) {
  const { form, setField, errors, isEditing, submitting, handleSubmit } =
    useProductForm({
      isOpen,
      productToEdit,
      onSave,
      onClose,
    });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent
        className="
          w-[calc(100%-1.5rem)]
          max-w-2xl
          max-h-[90vh]
          overflow-y-auto
          p-0
          gap-0
          rounded-xl
        "
      >
        {/* HEADER */}
        <DialogHeader className="border-b px-6 py-5 sm:px-8">
          <DialogTitle className="text-xl font-semibold">
            {isEditing ? "Editar produto" : "Adicionar produto"}
          </DialogTitle>

          <DialogDescription>
            {isEditing
              ? "Atualize as informações do produto."
              : "Preencha os dados abaixo para cadastrar um novo produto."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
            <div className="space-y-2">
              <label htmlFor="product-name" className="text-sm font-medium">
                Nome
              </label>

              <Input
                id="product-name"
                placeholder="Digite o nome do produto"
                data-testid="inputName"
                value={form.nome}
                onChange={(e) => setField("nome", e.target.value)}
                error={errors.nome}
              />
            </div>

            {/* Tipo */}
            <div className="space-y-2">
              <label htmlFor="product-type" className="text-sm font-medium">
                Tipo
              </label>

              <Select
                value={form.tipo || undefined}
                onValueChange={(value) =>
                  setField("tipo", value as ProductType)
                }
              >
                <SelectTrigger
                  id="product-type"
                  data-testid="selectType"
                  className={`w-full ${
                    errors.tipo ? "border-destructive" : ""
                  }`}
                >
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>

                <SelectContent>
                  {PRODUCT_TYPE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {errors.tipo && (
                <p className="text-xs text-destructive">{errors.tipo}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="product-validity"
                  className="text-sm font-medium"
                >
                  Validade
                </label>

                <DatePicker
                  placeholder="Selecione a validade"
                  data-testid="datePickerValidity"
                  date={form.validade}
                  setDate={(date) => setField("validade", date)}
                  error={errors.validade}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="product-lot" className="text-sm font-medium">
                  Lote
                </label>

                <Input
                  id="product-lot"
                  placeholder="Digite o lote"
                  data-testid="inputLot"
                  value={form.lote}
                  onChange={(e) => setField("lote", e.target.value)}
                  error={errors.lote}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="product-price" className="text-sm font-medium">
                Preço
              </label>

              <Input
                id="product-price"
                placeholder="0,00"
                data-testid="inputPrice"
                type="text"
                value={
                  form.preco === 0
                    ? ""
                    : maskCurrency(form.preco.toFixed(2).replace(".", ""))
                }
                onChange={(e) =>
                  setField("preco", parseCurrencyToNumber(e.target.value))
                }
                error={errors.preco}
              />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-2 border-t bg-muted/30 px-6 py-4 sm:flex-row sm:justify-end sm:px-8">
            <Button
              type="button"
              data-testid="buttonCancelar"
              variant="outline"
              onClick={onClose}
              disabled={submitting}
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              data-testid="buttonSalvar"
              disabled={submitting}
              className="w-full sm:w-auto"
            >
              {submitting
                ? "Salvando..."
                : isEditing
                  ? "Salvar alterações"
                  : "Adicionar produto"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
