"use client";

import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TermsModal } from "@/components/shared/TermsModal";
import { Check, Loader2 } from "lucide-react";
import { normalizeEmail, validateEmail } from "@/lib/validators";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    termos: "",
  });

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const validate = () => {
    const newErrors = {
      nome: "",
      email: "",
      senha: "",
      confirmarSenha: "",
      termos: "",
    };

    let isValid = true;

    const email = normalizeEmail(formData.email);

    if (!formData.nome.trim()) {
      newErrors.nome = "Nome obrigatório";
      isValid = false;
    }

    if (!email) {
      newErrors.email = "Email obrigatório";
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Email inválido";
      isValid = false;
    }

    if (formData.senha.length < 6) {
      newErrors.senha = "Mínimo 6 caracteres";
      isValid = false;
    }

    if (!formData.confirmarSenha.trim()) {
      if (formData.senha.length >= 6) {
        newErrors.confirmarSenha = "Confirme sua senha";
        isValid = false;
      }
    } else if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = "Senhas não coincidem";
      isValid = false;
    }

    if (!aceitouTermos) {
      newErrors.termos = "Você precisa aceitar os termos de serviço";
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
    if (validateEmail(normalizeEmail(formData.email))) filledFields++;
    if (formData.senha.length >= 6) filledFields++;

    if (
      formData.confirmarSenha.length >= 6 &&
      formData.confirmarSenha === formData.senha
    ) {
      filledFields++;
    }

    return filledFields * 25;
  };

  const progressPercentage = calculateProgress();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.nome,
          email: normalizeEmail(formData.email),
          password: formData.senha,
          role: "OWNER",
        }),
      });

      if (!response.ok) {
        setErrors((prev) => ({
          ...prev,
          email: "Erro ao criar conta. Tente outro email.",
        }));

        return;
      }

      const data = await response.json();

      localStorage.setItem("email", data.email);

      window.location.href = "/verify-email";
    } catch {
      setErrors((prev) => ({
        ...prev,
        email: "Erro ao conectar com o servidor",
      }));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
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
          <h2 className="mb-3 text-2xl font-semibold text-primary">Registro</h2>

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
            value={formData.nome}
            onChange={(e) => {
              setFormData({
                ...formData,
                nome: e.target.value,
              });

              removeError("nome");
            }}
            error={errors.nome}
          />

          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => {
              setFormData({
                ...formData,
                email: e.target.value,
              });

              removeError("email");
            }}
            error={errors.email}
          />

          <Input
            type="password"
            placeholder="Senha"
            value={formData.senha}
            onChange={(e) => {
              setFormData({
                ...formData,
                senha: e.target.value,
              });

              removeError("senha");
            }}
            error={errors.senha}
          />

          <Input
            type="password"
            placeholder="Confirmar senha"
            value={formData.confirmarSenha}
            onChange={(e) => {
              setFormData({
                ...formData,
                confirmarSenha: e.target.value,
              });

              removeError("confirmarSenha");
            }}
            error={errors.confirmarSenha}
          />

          {/* Termos */}
          <div className="relative mb-2 mt-1">
            <label className="group flex w-max cursor-pointer items-center gap-3">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  className="peer h-[18px] w-[18px] cursor-pointer appearance-none rounded-[4px] border-2 border-input outline-none transition-all checked:border-primary checked:bg-primary focus:ring-2 focus:ring-primary/30"
                  checked={aceitouTermos}
                  onChange={(e) => {
                    setAceitouTermos(e.target.checked);
                    removeError("termos");
                  }}
                />

                <Check
                  className="pointer-events-none absolute h-[12px] w-[12px] text-white opacity-0 transition-opacity peer-checked:opacity-100"
                  strokeWidth={3.5}
                />
              </div>

              <span className="text-xs font-medium text-muted-foreground">
                Li e aceito os{" "}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsTermsModalOpen(true);
                  }}
                  className="cursor-pointer font-semibold text-foreground transition-colors hover:text-primary hover:underline"
                >
                  termos de serviços
                </button>
              </span>
            </label>

            <span
              className={`absolute left-0 -bottom-5 text-[11px] font-medium text-red-500 transition-all duration-300 ${
                errors.termos
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              }`}
              role="alert"
            >
              {errors.termos || " "}
            </span>
          </div>

          {/* Botão */}
          <Button
            type="submit"
            disabled={isLoading}
            className="mt-2 h-12 w-full cursor-pointer gap-2 rounded-lg transition-all disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Registrando...</span>
              </>
            ) : (
              "Continuar"
            )}
          </Button>

          {/* Link para Login */}
          <div className="mt-4 text-center">
            <p className="text-xs font-medium text-muted-foreground">
              Já possui uma conta?{" "}
              <Link
                href="/login"
                className="text-foreground transition-colors hover:text-primary hover:underline"
              >
                Entre agora
              </Link>
            </p>
          </div>
        </form>
      </div>

      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        isChecked={aceitouTermos}
        onCheckedChange={(val) => {
          setAceitouTermos(val);
          removeError("termos");
        }}
        onAcceptAndContinue={() => setIsTermsModalOpen(false)}
      />
    </>
  );
}
