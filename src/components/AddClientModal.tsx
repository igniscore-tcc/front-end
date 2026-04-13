"use client";

import { useEffect, useState } from "react";
import { X, CheckCircle2, MapPin, Mail, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import { 
  formatCnpj, 
  cleanCnpj, 
  formatPhone, 
  cleanPhone, 
  validateCnpj, 
  validatePhoneLength,
  extractNumbers,
  formatCpf,
  cleanCpf,
  validateCpf
} from "@/lib/validators";

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (client: any) => void;
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

const INITIAL_FORM_STATE = {
  nome: "",
  cnpj: "",
  cpf: "",
  inscricao: "",
  uf: "SP",
  email: "",
  telefone: "",
  observacao: "",
};

export function AddClientModal({ isOpen, onClose, onAdd }: AddClientModalProps) {
  const [clientType, setClientType] = useState<"PJ" | "PF">("PJ");
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
    setClientType("PJ");
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      resetForm();
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /\S+@\S+\.\S+/;

    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";
    
    if (clientType === "PJ") {
      const cnpjDigits = extractNumbers(formData.cnpj);
      if (!cnpjDigits) {
        newErrors.cnpj = "CNPJ é obrigatório";
      } else if (cnpjDigits.length !== 14) {
        newErrors.cnpj = "CNPJ deve ter 14 dígitos";
      } else if (!validateCnpj(formData.cnpj)) {
        newErrors.cnpj = "CNPJ inválido";
      }
    } else {
      const cpfDigits = extractNumbers(formData.cpf);
      if (!cpfDigits) {
        newErrors.cpf = "CPF é obrigatório";
      } else if (cpfDigits.length !== 11) {
        newErrors.cpf = "CPF deve ter 11 dígitos";
      } else if (!validateCpf(formData.cpf)) {
        newErrors.cpf = "CPF inválido";
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!extractNumbers(formData.telefone)) {
      newErrors.telefone = "Telefone é obrigatório";
    } else if (!validatePhoneLength(formData.telefone)) {
      newErrors.telefone = "Telefone incompleto";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const payload = {
        ...formData,
        cnpj: clientType === "PJ" ? formData.cnpj : formData.cpf,
        type: clientType
      };
      onAdd(payload);
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">
            Adicionar cliente
          </h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
          >
            <X className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="p-8 space-y-6">
            {/* PJ/PF Toggle */}
            <div className="flex justify-center mb-2">
              <div className="inline-flex p-1 bg-gray-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setClientType("PJ")}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                    clientType === "PJ" 
                      ? "bg-white text-[#FF5A1F] shadow-sm" 
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Pessoa Jurídica
                </button>
                <button
                  type="button"
                  onClick={() => setClientType("PF")}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                    clientType === "PF" 
                      ? "bg-white text-[#FF5A1F] shadow-sm" 
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Pessoa Física
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Input
                placeholder="Nome"
                value={formData.nome}
                onChange={(e) => {
                  setFormData({ ...formData, nome: e.target.value });
                  if (errors.nome) setErrors({ ...errors, nome: "" });
                }}
                error={errors.nome}
              />
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className={`col-span-12 ${clientType === "PJ" ? "md:col-span-5" : "md:col-span-10"}`}>
                {clientType === "PJ" ? (
                  <Input
                    placeholder="CNPJ"
                    value={formatCnpj(formData.cnpj)}
                    onChange={(e) => {
                      setFormData({ ...formData, cnpj: cleanCnpj(e.target.value) });
                      if (errors.cnpj) setErrors({ ...errors, cnpj: "" });
                    }}
                    error={errors.cnpj}
                    suffixIcon={<CheckCircle2 size={18} className={errors.cnpj ? "text-red-400" : "text-gray-400"} />}
                  />
                ) : (
                  <Input
                    placeholder="CPF"
                    value={formatCpf(formData.cpf)}
                    onChange={(e) => {
                      setFormData({ ...formData, cpf: cleanCpf(e.target.value) });
                      if (errors.cpf) setErrors({ ...errors, cpf: "" });
                    }}
                    error={errors.cpf}
                    suffixIcon={<CheckCircle2 size={18} className={errors.cpf ? "text-red-400" : "text-gray-400"} />}
                  />
                )}
              </div>
              
              {clientType === "PJ" && (
                <div className="col-span-12 md:col-span-5">
                  <Input
                    placeholder="Inscrição estadual"
                    value={formData.inscricao}
                    onChange={(e) => setFormData({ ...formData, inscricao: e.target.value })}
                    suffixIcon={<MapPin size={18} className="text-gray-400" />}
                  />
                </div>
              )}

              <div className="col-span-12 md:col-span-2">
                <Select
                  placeholder="UF"
                  value={formData.uf}
                  onChange={(e) => setFormData({ ...formData, uf: e.target.value })}
                  options={UF_OPTIONS}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                error={errors.email}
                suffixIcon={<Mail size={18} className={errors.email ? "text-red-400" : "text-gray-400"} />}
              />
              <Input
                placeholder="Telefone"
                value={formatPhone(formData.telefone)}
                onChange={(e) => {
                  setFormData({ ...formData, telefone: cleanPhone(e.target.value) });
                  if (errors.telefone) setErrors({ ...errors, telefone: "" });
                }}
                error={errors.telefone}
                suffixIcon={<Phone size={18} className={errors.telefone ? "text-red-400" : "text-gray-400"} />}
              />
            </div>

            <div className="grid grid-cols-1">
              <Input
                placeholder="Observação"
                isTextarea
                value={formData.observacao}
                onChange={(e) => setFormData({ ...formData, observacao: e.target.value })}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50/50 border-t border-dashed border-gray-200 flex items-center justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="px-8 py-2.5 h-auto text-sm font-bold rounded-lg bg-[#E5E7EB] text-gray-700 hover:bg-gray-300 border-none transition-colors"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="px-8 py-2.5 h-auto text-sm font-bold rounded-lg bg-[#FF5A1F] text-white hover:bg-[#E64D17] transition-colors shadow-sm"
            >
              Adicionar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

