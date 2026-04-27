"use client";

import { X, CheckCircle2, MapPin, Mail, Phone } from "lucide-react";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import { formatCnpj, cleanCnpj, formatPhone, cleanPhone, formatCpf, cleanCpf } from "@/lib/validators";
import { useClientForm } from "@/hooks/useClientForm";
import type { Cliente, TipoCliente, ClienteFormData } from "@/types/cliente";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ClienteFormData & { id?: number }) => void;
  clientToEdit?: Cliente | null;
}

const UF_OPTIONS = [
  { value: "AC", label: "AC" }, { value: "AL", label: "AL" }, { value: "AP", label: "AP" },
  { value: "AM", label: "AM" }, { value: "BA", label: "BA" }, { value: "CE", label: "CE" },
  { value: "DF", label: "DF" }, { value: "ES", label: "ES" }, { value: "GO", label: "GO" },
  { value: "MA", label: "MA" }, { value: "MT", label: "MT" }, { value: "MS", label: "MS" },
  { value: "MG", label: "MG" }, { value: "PA", label: "PA" }, { value: "PB", label: "PB" },
  { value: "PR", label: "PR" }, { value: "PE", label: "PE" }, { value: "PI", label: "PI" },
  { value: "RJ", label: "RJ" }, { value: "RN", label: "RN" }, { value: "RS", label: "RS" },
  { value: "RO", label: "RO" }, { value: "RR", label: "RR" }, { value: "SC", label: "SC" },
  { value: "SP", label: "SP" }, { value: "SE", label: "SE" }, { value: "TO", label: "TO" },
];

export function AddClientModal({ isOpen, onClose, onSave, clientToEdit }: Props) {
  const { tipo, setTipo, form, setField, errors, isEditing, handleSubmit } = useClientForm({
    isOpen,
    clientToEdit,
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
            {isEditing ? "Editar cliente" : "Adicionar cliente"}
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

            {/* escolha entre PJ | PF */}
            <div className="flex justify-center">
              <div className="inline-flex p-1 bg-gray-100 rounded-xl">
                {(["PJ", "PF"] as TipoCliente[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTipo(t)}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                      tipo === t ? "bg-white text-[#FF5A1F] shadow-sm" : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {t === "PJ" ? "Pessoa Jurídica" : "Pessoa Física"}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Input
                placeholder="Nome"
                value={form.nome}
                onChange={(e) => setField("nome", e.target.value)}
                error={errors.nome}
              />
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className={`col-span-12 ${tipo === "PJ" ? "md:col-span-5" : "md:col-span-10"}`}>
                {tipo === "PJ" ? (
                  <Input
                    placeholder="CNPJ"
                    value={formatCnpj(form.cnpj)}
                    onChange={(e) => setField("cnpj", cleanCnpj(e.target.value))}
                    error={errors.cnpj}
                    suffixIcon={<CheckCircle2 size={18} className={errors.cnpj ? "text-red-400" : "text-gray-400"} />}
                  />
                ) : (
                  <Input
                    placeholder="CPF"
                    value={formatCpf(form.cpf)}
                    onChange={(e) => setField("cpf", cleanCpf(e.target.value))}
                    error={errors.cpf}
                    suffixIcon={<CheckCircle2 size={18} className={errors.cpf ? "text-red-400" : "text-gray-400"} />}
                  />
                )}
              </div>

              {tipo === "PJ" && (
                <div className="col-span-12 md:col-span-5">
                  <Input
                    placeholder="Inscrição estadual"
                    value={form.inscricao}
                    onChange={(e) => setField("inscricao", e.target.value)}
                    suffixIcon={<MapPin size={18} className="text-gray-400" />}
                  />
                </div>
              )}

              <div className="col-span-12 md:col-span-2">
                <Select
                  placeholder="UF"
                  value={form.uf}
                  onChange={(e) => setField("uf", e.target.value)}
                  options={UF_OPTIONS}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                error={errors.email}
                suffixIcon={<Mail size={18} className={errors.email ? "text-red-400" : "text-gray-400"} />}
              />
              <Input
                placeholder="Telefone"
                value={formatPhone(form.telefone)}
                onChange={(e) => setField("telefone", cleanPhone(e.target.value))}
                error={errors.telefone}
                suffixIcon={<Phone size={18} className={errors.telefone ? "text-red-400" : "text-gray-400"} />}
              />
            </div>

            <Input
              placeholder="Observação"
              isTextarea
              value={form.observacao}
              onChange={(e) => setField("observacao", e.target.value)}
            />
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