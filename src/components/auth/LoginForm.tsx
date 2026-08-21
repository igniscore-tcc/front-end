"use client";

import Link from "next/link";
import { useState } from "react";
import { LoginFormData } from "@/types/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { normalizeEmail, validateEmail } from "@/lib/validators";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    senha: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    senha: "",
  });

  const validate = () => {
    const newErrors = {
      email: "",
      senha: "",
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

    if (!formData.senha.trim()) {
      newErrors.senha = "Senha obrigatória";
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
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizeEmail(formData.email),
          password: formData.senha,
        }),
      });

      if (!response.ok) {
        setErrors((prev) => ({
          ...prev,
          senha: "Email ou senha inválidos",
        }));

        return;
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);

      window.location.href = "/dashboard";
    } catch {
      setErrors((prev) => ({
        ...prev,
        senha: "Erro ao conectar com o servidor",
      }));
    } finally {
      setIsLoading(false);
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
        <h2 className="mb-3 text-2xl font-semibold text-primary">Login</h2>
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
          onChange={(e) => {
            setFormData({
              ...formData,
              email: e.target.value,
            });

            removeError("email");
          }}
          error={errors.email}
        />

        <div>
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

          <div className="mt-1.5 flex justify-end">
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary hover:underline"
            >
              Esqueceu a senha?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="mt-2 h-12 w-full cursor-pointer gap-2 rounded-lg transition-all disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Entrando...</span>
            </>
          ) : (
            "Entrar"
          )}
        </Button>

        <div className="mt-4 text-center">
          <p className="text-xs font-medium text-muted-foreground">
            Não possui uma conta?{" "}
            <Link
              href="/register"
              className="text-foreground transition-colors hover:text-primary hover:underline"
            >
              Crie uma
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
