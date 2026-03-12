"use client";

import Link from "next/link";
import { useState } from "react";
import { LoginFormData } from "@/types/auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    senha: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    console.log("Enviando login para o back-end:", formData);
  }

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col min-h-[600px] px-4 sm:px-0">

      <div className="flex items-center justify-center gap-2 mb-8">
        <Image src="/igniscore.png" alt="IgnisCore Logo" width={47} height={64} className="object-contain" />
        <span className="text-[35px] font-bold text-[#FF5A1F]" style={{ fontFamily: "var(--font-space-grotesk)" }}>IgnisCore</span>
      </div>

      <div className="w-full border-t border-gray-100 mb-6"></div>

      <div className="mb-8">
        <h2 className="text-[25px] font-semibold text-[#FF5A1F] mb-3">
          Login
        </h2>
      </div>
      
      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        
        <Input
          type="password"
          placeholder="Senha"
          value={formData.senha}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, senha: e.target.value })}
          required
        />
        
        <Button
          type="submit"
          className="w-full mt-2 h-12 bg-[#FF5A1F] text-white rounded-lg font-semibold hover:bg-[#FF5A1F]/80 transition-all duration-200 cursor-pointer"
        >
          Entrar
        </Button>

        <div className="mt-4 text-center">
          <p className="text-xs font-medium text-[#4A4A4A]">
            Não possui uma conta?{" "}
            <Link href="/register" className="hover:underline">
              Crie uma
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}