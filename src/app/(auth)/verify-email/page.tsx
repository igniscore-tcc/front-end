"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

function VerifyEmailForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  const [errors, setErrors] = useState({
    code: "",
  });

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");

    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    if (resendCountdown <= 0) return;

    const timer = setTimeout(
      () => setResendCountdown(resendCountdown - 1),
      1000,
    );

    return () => clearTimeout(timer);
  }, [resendCountdown]);

  const validate = () => {
    const newErrors = {
      code: "",
    };

    let isValid = true;

    if (!code) {
      newErrors.code = "Por favor, insira o código de verificação";
      isValid = false;
    } else if (code.length < 6) {
      newErrors.code = "O código deve conter 6 dígitos";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    setErrors({ code: "" });

    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Código inválido ou expirado");
        return;
      }

      toast.success("E-mail verificado com sucesso! Redirecionando...");

      setTimeout(() => {
        router.push("/company");
      }, 2000);
    } catch {
      toast.error("Erro ao conectar com o servidor");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResendCode() {
    if (resendCountdown > 0 || isResending) return;

    setIsResending(true);
    setErrors({ code: "" });

    try {
      const response = await fetch("/api/auth/resend-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      if (!response.ok) {
        const data = await response.json();

        toast.error(data.error || "Erro ao reenviar o código");
        return;
      }

      toast.success("Novo código enviado para seu e-mail!");
      setResendCountdown(60);
    } catch {
      toast.error("Erro ao conectar com o servidor");
    } finally {
      setIsResending(false);
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
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold text-primary">
          Verifique seu E-mail
        </h2>

        <p className="text-sm text-muted-foreground">
          Digite o código de 6 dígitos enviado para{" "}
          <span className="font-semibold text-foreground">
            {email || "seu e-mail"}
          </span>
          .
        </p>
      </div>

      <form
        className="flex w-full flex-col gap-4"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Código */}
        <div className="my-2 flex flex-col items-center justify-center gap-2">
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            value={code}
            onChange={(value) => {
              setCode(value);
              setErrors((prev) => ({
                ...prev,
                code: "",
              }));
            }}
            disabled={isLoading}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} className="h-16 w-16 text-lg" />
              <InputOTPSlot index={1} className="h-16 w-16 text-lg" />
              <InputOTPSlot index={2} className="h-16 w-16 text-lg" />
              <InputOTPSlot index={3} className="h-16 w-16 text-lg" />
              <InputOTPSlot index={4} className="h-16 w-16 text-lg" />
              <InputOTPSlot index={5} className="h-16 w-16 text-lg" />
            </InputOTPGroup>
          </InputOTP>

          {errors.code && (
            <p className="mt-1 w-full text-center text-xs font-semibold text-red-500">
              {errors.code}
            </p>
          )}
        </div>

        {/* Botão */}
        <Button
          type="submit"
          disabled={isLoading}
          className="mt-2 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg transition-all disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Verificando...</span>
            </>
          ) : (
            "Confirmar Código"
          )}
        </Button>

        {/* Ações */}
        <div className="mt-4 flex flex-col gap-2 text-center">
          <p className="text-xs font-medium text-muted-foreground">
            Não recebeu o código?{" "}
            <button
              type="button"
              onClick={handleResendCode}
              disabled={resendCountdown > 0 || isResending}
              className="cursor-pointer font-semibold text-foreground transition-colors hover:text-primary hover:underline disabled:cursor-not-allowed disabled:opacity-50 disabled:no-underline"
            >
              {isResending
                ? "Enviando..."
                : resendCountdown > 0
                  ? `Reenviar em ${resendCountdown}s`
                  : "Reenviar código"}
            </button>
          </p>

          <Link
            href="/login"
            className="mt-2 text-xs font-medium text-muted-foreground transition-colors hover:text-primary hover:underline"
          >
            Voltar para o Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default function VerifyEmail() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <VerifyEmailForm />
    </Suspense>
  );
}
