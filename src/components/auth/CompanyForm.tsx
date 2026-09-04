"use client";

import { useState } from "react";
import { CompanyFormData } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import {
  formatPhone,
  formatCnpj,
  validatePhoneLength,
  validateCnpj,
  extractNumbers,
  cleanPhone,
  cleanCnpj,
  normalizeEmail,
  validateEmail,
} from "@/lib/validators";
import { useCreateCompany } from "@/hooks/useCompany";

export default function CompanyForm() {
  const { createCompany, loading } = useCreateCompany();

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

  const validate = () => {
    const newErrors = {
      nome: "",
      cnpj: "",
      email: "",
      telefone: "",
    };

    let isValid = true;

    const email = normalizeEmail(formData.email);

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

    if (!email) {
      newErrors.email = "Email obrigatório";
      isValid = false;
    } else if (!validateEmail(email)) {
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
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const calculateProgress = () => {
    let filledFields = 0;

    if (formData.nome.trim().length >= 3) filledFields++;

    if (
      extractNumbers(formData.cnpj).length === 14 &&
      validateCnpj(formData.cnpj)
    ) {
      filledFields++;
    }

    if (validateEmail(normalizeEmail(formData.email))) {
      filledFields++;
    }

    if (
      extractNumbers(formData.telefone).length >= 10 &&
      validatePhoneLength(formData.telefone)
    ) {
      filledFields++;
    }

    return 50 + filledFields * 12.5;
  };

  const progressPercentage = calculateProgress();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    try {
      const company = await createCompany({
        name: formData.nome,
        cnpj: formData.cnpj,
        email: normalizeEmail(formData.email),
        phone: formData.telefone,
      });

      alert(`Empresa ${company.name} cadastrada com sucesso.`);

      setFormData({
        nome: "",
        cnpj: "",
        email: "",
        telefone: "",
      });

      window.location.href = "/dashboard";
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Erro ao cadastrar empresa.",
      );
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col px-4 sm:px-0">
      {/* Logo */}
      <div className="mb-8 flex items-center justify-center gap-2">
        <div
          className="h-[52px] w-[38px] bg-primary"
          role="img"
          aria-label="IgnisCore Logo"
          style={{
            maskImage: "url('/igniscore.svg')",
            WebkitMaskImage: "url('/igniscore.svg')",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            maskSize: "contain",
            WebkitMaskSize: "contain",
          }}
        />

        <span
          className="text-4xl font-bold text-primary"
          style={{
            fontFamily: "var(--font-space-grotesk)",
          }}
        >
          IgnisCore
        </span>
      </div>

      {/* Título */}
      <div className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold text-primary">
          Cadastrar sua empresa
        </h2>

        {/* Progresso */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{
              width: `${progressPercentage}%`,
            }}
          />
        </div>
      </div>

      <form
        className="flex w-full flex-col gap-4"
        onSubmit={handleSubmit}
        noValidate
      >
        <Input
          placeholder="Nome"
          autoComplete="organization"
          value={formData.nome}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({
              ...formData,
              nome: e.target.value,
            });

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
            setFormData({
              ...formData,
              email: e.target.value,
            });

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
          disabled={loading}
          className="mt-2 h-12 w-full cursor-pointer gap-2 rounded-lg transition-all disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Cadastrando...</span>
            </>
          ) : (
            "Cadastrar"
          )}
        </Button>
      </form>
    </div>
  );
}
