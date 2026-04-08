"use client";

import { useState } from "react";
import { CompanyFormData } from "@/types/auth";
import { Button } from "./ui/button";
import { Input } from "./ui/Input";
import Image from "next/image";
import Link from "next/link";
import {
  formatPhone,
  formatCnpj,
  validatePhoneLength,
  validateCnpj,
  extractNumbers,
  cleanPhone,
  cleanCnpj,
} from "@/lib/validators";

export default function CompanyForm() {
  const [formData, setFormData] = useState<CompanyFormData>({
    nome: "",
    cnpj: "",
    email: "",
    telefone: "",
  });

  const [errors, setErrors] = useState({
    nome: "",
    cnpj: "",
    email: "",
    telefone: "",
  });

  const emailRegex = /\S+@\S+\.\S+/;

  const validate = () => {
    const newErrors = {
      nome: "",
      cnpj: "",
      email: "",
      telefone: "",
    };

    let isValid = true;

    if (!formData.nome.trim()) {
      newErrors.nome = "Nome da empresa obrigatório";
      isValid = false;
    }

    const cnpjDigits = extractNumbers(formData.cnpj);
    if (!cnpjDigits.length) {
      newErrors.cnpj = "CNPJ obrigatório";
      isValid = false;
    } else if (cnpjDigits.length !== 14) {
      newErrors.cnpj = "CNPJ deve ter 14 dígitos";
      isValid = false;
    } else if (!validateCnpj(formData.cnpj)) {
      newErrors.cnpj = "CNPJ inválido";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email obrigatório";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email inválido";
      isValid = false;
    }

    if (!extractNumbers(formData.telefone).length) {
      newErrors.telefone = "Telefone obrigatório";
      isValid = false;
    } else if (!validatePhoneLength(formData.telefone)) {
      newErrors.telefone = "Telefone inválido (use DDD + número)";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const removeError = (field: keyof typeof errors) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const calculateProgress = () => {
    let filledFields = 0;
    
    if (formData.nome.trim().length >= 3) filledFields++;
    if (extractNumbers(formData.cnpj).length === 14 && validateCnpj(formData.cnpj)) filledFields++;
    if (formData.email.includes("@") && formData.email.includes(".")) filledFields++;
    if (extractNumbers(formData.telefone).length >= 10 && validatePhoneLength(formData.telefone)) filledFields++;
    
    return 50 + (filledFields * 12.5);
  };
  const progressPercentage = calculateProgress();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
  }

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col min-h-[600px] px-4 sm:px-0">
      <div className="flex items-center justify-center gap-2 mb-8">
        <Image
          src="/igniscore.png"
          alt="IgnisCore Logo"
          width={47}
          height={64}
          className="object-contain"
        />
        <span
          className="text-[35px] font-bold text-[#FF5A1F]"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          IgnisCore
        </span>
      </div>

      <div className="w-full border-t border-gray-100 mb-6"></div>
      <div className="mb-8">
        <h2 className="text-[25px] font-semibold text-[#FF5A1F] mb-3">
          Cadastrar sua empresa
        </h2>
        <div className="flex w-full h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
          <div 
            className="bg-[#FF5A1F] h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit}
        noValidate
      >
        <Input
          placeholder="Nome"
          autoComplete="organization"
          value={formData.nome}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, nome: e.target.value });
            removeError("nome");
          }}
          error={errors.nome}
        />

        <Input
          placeholder="CNPJ"
          inputMode="numeric"
          autoComplete="off"
          name="cnpj"
          value={formatCnpj(formData.cnpj)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({
              ...formData,
              cnpj: cleanCnpj(e.target.value),
            });
            removeError("cnpj");
          }}
          error={errors.cnpj}
        />

        <Input
          type="text"
          inputMode="email"
          placeholder="Email"
          autoComplete="email"
          name="email"
          value={formData.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, email: e.target.value });
            removeError("email");
          }}
          error={errors.email}
        />

        <Input
          type="tel"
          placeholder="Telefone"
          inputMode="tel"
          autoComplete="tel"
          name="telefone"
          value={formatPhone(formData.telefone)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({
              ...formData,
              telefone: cleanPhone(e.target.value),
            });
            removeError("telefone");
          }}
          error={errors.telefone}
        />

        <Button
          type="submit"
          className="w-full mt-2 h-12 bg-[#FF5A1F] text-white rounded-lg font-semibold hover:bg-[#FF5A1F]/80 transition-all duration-200 cursor-pointer"
        >
          Cadastrar
        </Button>

        <div className="mt-4 text-center">
          <p className="text-xs font-medium text-[#4A4A4A]">
            Você é funcionário?{" "}
            <Link href="/invite" className="hover:text-[#FF5A1F] hover:underline transition-colors">
              Enviar convite
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
