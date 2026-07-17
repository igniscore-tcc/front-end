"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
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
  const [successMessage, setSuccessMessage] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);

  const [errors, setErrors] = useState({
    code: "",
    geral: "",
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
    const newErrors = { code: "", geral: "" };
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
    setSuccessMessage("");
    setErrors({ code: "", geral: "" });

    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors((prev) => ({
          ...prev,
          geral: data.error || "Código inválido ou expirado",
        }));
        return;
      }

      setSuccessMessage("E-mail verificado com sucesso!");

      setTimeout(() => {
        router.push("/company");
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

  async function handleResendCode() {
    if (resendCountdown > 0 || isResending) return;

    setIsResending(true);
    setErrors({ code: "", geral: "" });

    try {
      const response = await fetch("/api/auth/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        setErrors((prev) => ({
          ...prev,
          geral: data.error || "Erro ao reenviar o código",
        }));
        return;
      }

      setSuccessMessage("Novo código enviado para seu e-mail!");
      setResendCountdown(60);
    } catch {
      setErrors((prev) => ({
        ...prev,
        geral: "Erro ao conectar com o servidor",
      }));
    } finally {
      setIsResending(false);
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

      <div className="mb-6">
        <h2 className="text-[25px] font-semibold text-[#FF5A1F] mb-2">
          Verifique seu E-mail
        </h2>
        <p className="text-sm text-gray-500">
          Digite o código de 6 dígitos enviado para{" "}
          <span className="font-semibold text-gray-700">
            {email || "seu e-mail"}
          </span>
          .
        </p>
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

        <div className="flex flex-col items-center justify-center my-2 gap-2">
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            value={code}
            onChange={(value) => {
              setCode(value);
              setErrors((prev) => ({ ...prev, code: "" }));
            }}
            disabled={isLoading || !!successMessage}
          >
            <InputOTPGroup className="">
              <InputOTPSlot index={0} className="w-16 h-16 text-lg" />
              <InputOTPSlot index={1} className="w-16 h-16 text-lg" />
              <InputOTPSlot index={2} className="w-16 h-16 text-lg" />

              <InputOTPSlot index={3} className="w-16 h-16 text-lg" />
              <InputOTPSlot index={4} className="w-16 h-16 text-lg" />
              <InputOTPSlot index={5} className="w-16 h-16 text-lg" />
            </InputOTPGroup>
          </InputOTP>

          {errors.code && (
            <p className="text-xs font-semibold text-red-500 w-full text-center mt-1">
              {errors.code}
            </p>
          )}
        </div>

        {successMessage && (
          <p className="text-xs font-semibold text-green-600 px-1 text-center">
            {successMessage} {resendCountdown === 60 ? "" : "Redirecionando..."}
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
              <span>Verificando...</span>
            </>
          ) : (
            "Confirmar Código"
          )}
        </Button>

        <div className="mt-4 text-center flex flex-col gap-2">
          <p className="text-xs font-medium text-[#4A4A4A]">
            Não recebeu o código?{" "}
            <button
              type="button"
              onClick={handleResendCode}
              disabled={resendCountdown > 0 || isResending || !!successMessage}
              className="text-[#FF5A1F] font-semibold hover:underline transition-all disabled:opacity-50 disabled:no-underline cursor-pointer disabled:cursor-not-allowed"
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
            className="text-xs font-medium text-gray-400 hover:text-[#FF5A1F] hover:underline transition-colors mt-2"
          >
            Voltar para o Registro
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
          <Loader2 className="h-8 w-8 animate-spin text-[#FF5A1F]" />
        </div>
      }
    >
      <VerifyEmailForm />
    </Suspense>
  );
}
