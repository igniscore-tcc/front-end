"use client";

import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TermsModal } from "@/components/shared/TermsModal";
import { Check, Loader2 } from "lucide-react";

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
    const emailRegex = /\S+@\S+\.\S+/;

    if (!formData.nome.trim()) {
      newErrors.nome = "Nome obrigatório";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email obrigatório";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
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

  const removeError = (field: string) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const calculateProgress = () => {
    let filledFields = 0;
    if (formData.nome.trim().length >= 3) filledFields++;
    if (formData.email.includes("@") && formData.email.includes("."))
      filledFields++;
    if (formData.senha.length >= 6) filledFields++;
    if (
      formData.confirmarSenha.length >= 6 &&
      formData.confirmarSenha === formData.senha
    )
      filledFields++;
    return filledFields * 12.5;
  };

  const progressPercentage = calculateProgress();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.nome,
          email: formData.email,
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
      localStorage.setItem("token", data.token);
      window.location.href = "/company";
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
      <div className="w-full max-w-sm mx-auto flex flex-col min-h-[600px] px-4 sm:px-0">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Image
            src="/igniscore.png"
            alt="IgnisCore Logo"
            width={38}
            height={52}
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
            Registro
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
            value={formData.nome}
            onChange={(e) => {
              setFormData({ ...formData, nome: e.target.value });
              removeError("nome");
            }}
            error={errors.nome}
          />
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              removeError("email");
            }}
            error={errors.email}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={formData.senha}
            onChange={(e) => {
              setFormData({ ...formData, senha: e.target.value });
              removeError("senha");
            }}
            error={errors.senha}
          />
          <Input
            type="password"
            placeholder="Confirmar senha"
            value={formData.confirmarSenha}
            onChange={(e) => {
              setFormData({ ...formData, confirmarSenha: e.target.value });
              removeError("confirmarSenha");
            }}
            error={errors.confirmarSenha}
          />

          <div className="relative mb-2 mt-1">
            <label className="flex items-center gap-3 cursor-pointer group w-max">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  className="peer appearance-none w-[18px] h-[18px] border-2 border-gray-300 rounded-[4px] checked:bg-[#FF5A1F] checked:border-[#FF5A1F] transition-all cursor-pointer outline-none focus:ring-2 focus:ring-[#FF5A1F]/30"
                  checked={aceitouTermos}
                  onChange={(e) => {
                    setAceitouTermos(e.target.checked);
                    removeError("termos");
                  }}
                />
                <Check
                  className="absolute w-[12px] h-[12px] text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                  strokeWidth={3.5}
                />
              </div>
              <span className="text-[13px] font-medium text-gray-700">
                Li e aceito os{" "}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsTermsModalOpen(true);
                  }}
                  className="text-gray-900 font-semibold hover:text-[#FF5A1F] transition-colors"
                >
                  termos de serviços
                </button>
              </span>
            </label>
            <span
              className={`absolute left-0 -bottom-5 text-[11px] font-medium text-red-500 transition-all duration-300 ${
                errors.termos
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
              role="alert"
            >
              {errors.termos || " "}
            </span>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 h-12 bg-[#FF5A1F] text-white rounded-lg font-semibold hover:bg-[#FF5A1F]/80 transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

          <div className="mt-4 text-center">
            <p className="text-xs font-medium text-[#4A4A4A]">
              Já possui uma conta?{" "}
              <Link
                href="/login"
                className="hover:text-[#FF5A1F] hover:underline transition-colors"
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
