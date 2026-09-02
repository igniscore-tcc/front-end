"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
    const newErrors = {
      senha: "",
      confirmarSenha: "",
      geral: "",
    };

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
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    setSuccessMessage("");

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    <div className="mx-auto flex min-h-screen w-full max-w-sm flex-col justify-center px-4 sm:px-0">
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
        <h2 className="mb-3 text-2xl font-semibold text-primary">Nova Senha</h2>
      </div>

      <form
        className="flex w-full flex-col gap-4"
        onSubmit={handleSubmit}
        noValidate
      >
        {errors.geral && (
          <p className="px-1 text-xs font-semibold text-red-500">
            {errors.geral}
          </p>
        )}

        <Input
          type="password"
          placeholder="Nova senha"
          value={formData.senha}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({
              ...formData,
              senha: e.target.value,
            });

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
            setFormData({
              ...formData,
              confirmarSenha: e.target.value,
            });

            removeError("confirmarSenha");
          }}
          error={errors.confirmarSenha}
          disabled={isLoading || !!successMessage}
        />

        {successMessage && (
          <p className="px-1 text-xs font-semibold text-green-600">
            {successMessage} Redirecionando...
          </p>
        )}

        <Button
          type="submit"
          disabled={isLoading || !!successMessage}
          className="mt-2 h-12 w-full cursor-pointer gap-2 rounded-lg transition-all disabled:cursor-not-allowed disabled:opacity-70"
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
          <p className="text-xs font-medium text-muted-foreground">
            Lembrou sua senha?{" "}
            <Link
              href="/login"
              className="text-foreground transition-colors hover:text-primary hover:underline"
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
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
