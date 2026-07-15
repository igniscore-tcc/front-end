"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Loader2 } from "lucide-react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    senha: "",
    confirmarSenha: "",
  });

  const [errors, setErrors] = useState({
    senha: "",
    confirmarSenha: "",
    geral: "",
  });

  const validate = () => {
    const newErrors = { senha: "", confirmarSenha: "", geral: "" };
    let isValid = true;

    if (!token) {
      newErrors.geral = "Token de recuperação inválido ou expirado.";
      isValid = false;
    }

    if (!formData.senha) {
      newErrors.senha = "Senha obrigatória";
      isValid = false;
    } else if (formData.senha.length < 6) {
      newErrors.senha = "A senha deve ter pelo menos 6 caracteres";
      isValid = false;
    }

    if (!formData.confirmarSenha) {
      newErrors.confirmarSenha = "Confirmação de senha obrigatória";
      isValid = false;
    } else if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = "As senhas não coincidem";
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
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          newPassword: formData.senha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors((prev) => ({
          ...prev,
          geral: data.error || "Erro ao redefinir a senha",
        }));
        return;
      }

      setSuccessMessage("Senha alterada com sucesso!");

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch {
      setErrors((prev) => ({
        ...prev,
        geral: "Erro ao conectar com o servidor",
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
          Nova Senha
        </h2>
      </div>

      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit}
        noValidate
      >
        {errors.geral && (
          <p className="text-xs font-semibold text-red-500 px-1">
            {errors.geral}
          </p>
        )}

        <Input
          type="password"
          placeholder="Nova senha"
          value={formData.senha}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, senha: e.target.value });
            removeError("senha");
          }}
          error={errors.senha}
          disabled={isLoading || !!successMessage}
        />

        <Input
          type="password"
          placeholder="Confirmar nova senha"
          value={formData.confirmarSenha}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, confirmarSenha: e.target.value });
            removeError("confirmarSenha");
          }}
          error={errors.confirmarSenha}
          disabled={isLoading || !!successMessage}
        />

        {successMessage && (
          <p className="text-xs font-semibold text-green-600 px-1">
            {successMessage} Redirecionando...
          </p>
        )}

        <Button
          type="submit"
          disabled={isLoading || !!successMessage}
          className="w-full mt-2 h-12 bg-[#FF5A1F] text-white rounded-lg font-semibold hover:bg-[#FF5A1F]/80 transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Salvando...</span>
            </>
          ) : (
            "Alterar Senha"
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

export default function ResetPassword() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#FF5A1F]" />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
