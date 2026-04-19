"use client";

import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { formatCnpj, validateCnpj, extractNumbers } from "@/lib/validators";

export default function EmployeeInviteForm() {
  const [cnpj, setCnpj] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    setError("");
    let isValid = true;
    
    const plainCnpj = extractNumbers(cnpj);

    if (!plainCnpj) {
      setError("O CNPJ é obrigatório.");
      isValid = false;
    } else if (plainCnpj.length !== 14 || !validateCnpj(plainCnpj)) {
      setError("CNPJ inválido ou inexistente.");
      isValid = false;
    }

    return isValid;
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
  }

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col min-h-[600px] px-4 sm:px-0">
      <div className="flex items-center justify-center gap-2 mb-8 mt-10">
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
        <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#FF5A1F] mb-3">
          Convite de funcionário
        </h2>
        <p className="text-sm text-[#4A4A4A] leading-relaxed mb-2 font-medium">
          Rorem ipsum dolor sit amet, consectetur adipiscing.
        </p>
      </div>

      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <Input
          placeholder="CNPJ"
          inputMode="numeric"
          autoComplete="off"
          maxLength={18}
          value={cnpj}
          onChange={(e) => {
            setCnpj(formatCnpj(e.target.value));
            setError("");
          }}
          error={error}
        />

        <Button
          type="submit"
          className="w-full mt-2 h-12 bg-[#FF5A1F] text-white rounded-lg font-semibold hover:bg-[#FF5A1F]/80 transition-all duration-200 cursor-pointer"
        >
          Enviar convite
        </Button>

        <div className="mt-4 text-center">
          <Link 
            href="/register" 
            className="text-xs font-medium text-[#4A4A4A] hover:text-[#FF5A1F] hover:underline transition-colors"
          >
            Voltar
          </Link>
        </div>
      </form>
    </div>
  );
}
