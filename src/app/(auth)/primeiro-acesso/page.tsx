"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function FirstAccessPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    senha: "",
    confirmarSenha: "",
  });

  const [errors, setErrors] = useState({
    senha: "",
    confirmarSenha: "",
  });

  const validate = () => {
    const newErrors = {
      senha: "",
      confirmarSenha: "",
    };

    let isValid = true;

    if (!formData.senha) {
      newErrors.senha = "Senha obrigatória";
      isValid = false;
    } else if (formData.senha.length < 8) {
      newErrors.senha = "A senha deve ter pelo menos 8 caracteres";
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

    try {
      const response = await fetch("/api/auth/change-temporary-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword: formData.senha,
          confirmPassword: formData.confirmarSenha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Erro ao alterar a senha");
        return;
      }

      toast.success("Senha alterada com sucesso!");

      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 1000);
    } catch {
      toast.error("Erro ao conectar com o servidor");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-sm flex-col justify-center px-4 sm:px-0">
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

      <div className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold text-primary">
          Primeiro acesso
        </h2>

        <p className="text-sm leading-6 text-muted-foreground">
          Por segurança, defina uma nova senha para continuar usando o
          IgnisCore.
        </p>
      </div>

      <form
        className="flex w-full flex-col gap-4"
        onSubmit={handleSubmit}
        noValidate
      >
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
          disabled={isLoading}
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
          disabled={isLoading}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="mt-2 h-12 w-full cursor-pointer gap-2 transition-all disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Salvando...</span>
            </>
          ) : (
            "Definir nova senha"
          )}
        </Button>
      </form>
    </div>
  );
}
