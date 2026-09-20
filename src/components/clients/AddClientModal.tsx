"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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

import { Textarea } from "@/components/ui/textarea";

import {
  formatCnpj,
  cleanCnpj,
  formatPhone,
  cleanPhone,
  formatCpf,
  cleanCpf,
} from "@/lib/validators";

import { useClientForm } from "@/hooks/useClientForm";

import type { TipoCliente, ClienteModalProps } from "@/types/cliente";

import { UF_OPTIONS } from "@/lib/constants";

export function AddClientModal({
  isOpen,
  onClose,
  onSave,
  clientToEdit,
}: ClienteModalProps) {
  const {
    tipo,
    setTipo,
    form,
    setField,
    errors,
    isEditing,
    submitting,
    handleSubmit,
  } = useClientForm({
    isOpen,
    clientToEdit,
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
        {/* Header */}
        <DialogHeader className="border-b px-6 py-5 sm:px-8">
          <DialogTitle className="text-xl font-semibold">
            {isEditing ? "Editar cliente" : "Adicionar cliente"}
          </DialogTitle>

          <DialogDescription>
            {isEditing
              ? "Atualize as informações do cliente."
              : "Preencha os dados abaixo para cadastrar um novo cliente."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          {/* Conteúdo */}
          <div className="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
            {/* Tipo de cliente */}
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium">Tipo de cliente</p>

                <p className="text-xs text-muted-foreground">
                  Selecione se o cliente é pessoa física ou jurídica.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted p-1">
                {(["PJ", "PF"] as TipoCliente[]).map((t) => {
                  const active = tipo === t;

                  return (
                    <Button
                      key={t}
                      data-testid="buttonTypePerson"
                      type="button"
                      variant={active ? "default" : "ghost"}
                      onClick={() => setTipo(t)}
                      className={
                        active
                          ? "bg-background text-foreground shadow-sm hover:bg-background"
                          : "text-muted-foreground"
                      }
                    >
                      {t === "PJ" ? "Pessoa Jurídica" : "Pessoa Física"}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Nome */}
            <div className="space-y-2">
              <label htmlFor="client-name" className="text-sm font-medium">
                Nome
              </label>

              <Input
                id="client-name"
                placeholder={tipo === "PJ" ? "Razão social" : "Nome completo"}
                data-testid="inputName"
                value={form.nome}
                onChange={(e) => setField("nome", e.target.value)}
              />
            </div>

            {/* Documento */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="client-document"
                  className="text-sm font-medium"
                >
                  {tipo === "PJ" ? "CNPJ" : "CPF"}
                </label>

                {tipo === "PJ" ? (
                  <Input
                    id="client-document"
                    placeholder="00.000.000/0000-00"
                    data-testid="inputCNPJ"
                    value={formatCnpj(form.cnpj)}
                    onChange={(e) =>
                      setField("cnpj", cleanCnpj(e.target.value))
                    }
                  />
                ) : (
                  <Input
                    id="client-document"
                    placeholder="000.000.000-00"
                    data-testid="inputCPF"
                    value={formatCpf(form.cpf)}
                    onChange={(e) => setField("cpf", cleanCpf(e.target.value))}
                  />
                )}
              </div>

              {/* UF */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Estado</label>

                <Select
                  value={form.uf || undefined}
                  onValueChange={(value) => setField("uf", value)}
                >
                  <SelectTrigger
                    data-testid="selectUF"
                    className={`w-full h-10 mt-0 ${
                      errors.uf ? "border-destructive" : ""
                    }`}
                  >
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>

                  <SelectContent className="w-[var(--radix-select-trigger-width)]">
                    {UF_OPTIONS.map((uf) => (
                      <SelectItem key={uf.value} value={uf.value}>
                        {uf.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.uf && (
                  <p className="text-xs text-destructive">{errors.uf}</p>
                )}
              </div>
            </div>

            {/* Contato */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Inscrição estadual */}
              {tipo === "PJ" && (
                <div className="space-y-2">
                  <label htmlFor="client-ie" className="text-sm font-medium">
                    Inscrição estadual
                  </label>

                  <Input
                    id="client-ie"
                    placeholder="Digite a inscrição estadual"
                    data-testid="inputIE"
                    value={form.inscricao}
                    onChange={(e) => setField("inscricao", e.target.value)}
                  />
                </div>
              )}
              <div className="space-y-2">
                <label htmlFor="client-phone" className="text-sm font-medium">
                  Telefone
                </label>

                <Input
                  id="client-phone"
                  placeholder="(00) 00000-0000"
                  data-testid="inputTelefone"
                  value={formatPhone(form.telefone)}
                  onChange={(e) =>
                    setField("telefone", cleanPhone(e.target.value))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="client-email" className="text-sm font-medium">
                E-mail
              </label>

              <Input
                id="client-email"
                placeholder="email@exemplo.com"
                data-testid="inputEmail"
                type="email"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
              />
            </div>

            {/* Observação */}
            <div className="space-y-2">
              <label
                htmlFor="client-observation"
                className="text-sm font-medium"
              >
                Observação
              </label>

              <Textarea
                id="client-observation"
                placeholder="Adicione alguma observação sobre o cliente..."
                data-testid="inputObs"
                value={form.observacao}
                onChange={(e) => setField("observacao", e.target.value)}
                className="min-h-28 resize-y"
              />
            </div>
          </div>

          {/* Footer */}
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
                  : "Adicionar cliente"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
