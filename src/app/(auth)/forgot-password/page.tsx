"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { normalizeEmail, validateEmail } from "@/lib/validators";

export default function ForgotPassword() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    const newErrors = {
      email: "",
    };

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
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizeEmail(formData.email),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors((prev) => ({
          ...prev,
          email: data.error || "Email não encontrado",
        }));

        return;
      }

      setSuccessMessage(
        data.requestPasswordRecovery ||
          "Link de recuperação enviado com sucesso!",
      );

      setTimeout(() => {
        router.push("/login");
      }, 3000);
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
        <h2 className="mb-3 text-2xl font-semibold text-primary">
          Recuperar Senha
        </h2>
      </div>

      <form
        className="flex w-full flex-col gap-4"
        onSubmit={handleSubmit}
        noValidate
      >
        <Input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({
              ...formData,
              email: e.target.value,
            });

            removeError("email");
          }}
          error={errors.email}
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
              <span>Enviando...</span>
            </>
          ) : (
            "Enviar Link"
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
