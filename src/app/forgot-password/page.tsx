"use client";

import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { normalizeEmail, validateEmail } from "@/lib/validators";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    const newErrors = { email: "" };
    let isValid = true;
    const email = normalizeEmail(formData.email);

    if (!email) {
      newErrors.email = "Email obrigatório";
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Email inválido";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const removeError = (field: keyof typeof errors) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setSuccessMessage("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizeEmail(formData.email),
        }),
      });

      if (!response.ok) {
        setErrors((prev) => ({ ...prev, email: "Email não encontrado" }));
        return;
      }

      setSuccessMessage("Link de recuperação enviado com sucesso!");
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
    <div className="w-full max-w-sm mx-auto flex flex-col justify-center min-h-screen px-4 sm:px-0">
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
          Recuperar Senha
        </h2>
      </div>

      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit}
        noValidate
      >
        <Input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, email: e.target.value });
            removeError("email");
          }}
          error={errors.email}
        />

        {successMessage && (
          <p className="text-xs font-semibold text-green-600 px-1">
            {successMessage}
          </p>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 h-12 bg-[#FF5A1F] text-white rounded-lg font-semibold hover:bg-[#FF5A1F]/80 transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Enviando...</span>
            </>
          ) : (
            "Enviar Link"
          )}
        </Button>

        <div className="mt-4 text-center">
          <p className="text-xs font-medium text-[#4A4A4A]">
            Lembrou sua senha?{" "}
            <Link
              href="/login"
              className="hover:text-[#FF5A1F] hover:underline transition-colors"
            >
              Voltar para o Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
