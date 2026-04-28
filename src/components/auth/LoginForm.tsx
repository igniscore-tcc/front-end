"use client";

import Link from "next/link";
import { useState } from "react";
import { LoginFormData } from "@/types/auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Loader2 } from "lucide-react";

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

  const emailRegex = /\S+@\S+\.\S+/;

  const validate = () => {
    const newErrors = { email: "", senha: "" };
    let isValid = true;

    if (!formData.email.trim()) {
      newErrors.email = "Email obrigatório";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
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
      setErrors((prev) => ({ ...prev, [field]: "" }));
    };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.senha,
        }),
      });

      if (!response.ok) {
        setErrors((prev) => ({ ...prev, senha: "Email ou senha inválidos" }));
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } catch {
      setErrors((prev) => ({ ...prev, senha: "Erro ao conectar com o servidor" }));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col min-h-[600px] px-4 sm:px-0">
      <div className="flex items-center justify-center gap-2 mb-8">
        <Image src="/igniscore.png" alt="IgnisCore Logo" width={38} height={52} className="object-contain" />
        <span className="text-[35px] font-bold text-[#FF5A1F]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          IgnisCore
        </span>
      </div>

      <div className="w-full border-t border-gray-100 mb-6"></div>

      <div className="mb-8">
        <h2 className="text-[25px] font-semibold text-[#FF5A1F] mb-3">Login</h2>
      </div>

      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
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

        <Input
          type="password"
          placeholder="Senha"
          value={formData.senha}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, senha: e.target.value });
            removeError("senha");
          }}
          error={errors.senha}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 h-12 bg-[#FF5A1F] text-white rounded-lg font-semibold hover:bg-[#FF5A1F]/80 transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
          <p className="text-xs font-medium text-[#4A4A4A]">
            Não possui uma conta?{" "}
            <Link href="/register" className="hover:text-[#FF5A1F] hover:underline transition-colors">
              Crie uma
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}