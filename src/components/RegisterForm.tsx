"use client";

import Link from "next/link";
import { useState } from "react";
import { RegisterFormData } from "@/types/auth";
import { Input } from "@/components/ui/Input";

export default function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });
  
  const [erroSenha, setErroSenha] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErroSenha("");

    if (formData.senha !== formData.confirmarSenha) {
      setErroSenha("As senhas não coincidem!");
      return;
    }

    console.log("Dados prontos para o back-end:", formData);
  }

  return (
    <div className="w-full max-w-sm flex flex-col items-center gap-8 py-12 px-6">
      <h1 className="text-4xl font-bold text-[#CC2A2A] text-center mb-4">
        Registro
      </h1>

      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          placeholder="Nome"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          required
        />
        
        <Input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <Input
          type="password"
          placeholder="Senha"
          value={formData.senha}
          onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
          required
        />

        <Input
          type="password"
          placeholder="Confirmar senha"
          value={formData.confirmarSenha}
          onChange={(e) => setFormData({ ...formData, confirmarSenha: e.target.value })}
          error={erroSenha}
          required
        />

        <button
          type="submit"
          className="w-full mt-4 py-3 px-4 bg-[#CC2A2A] text-white rounded-lg font-semibold hover:bg-[#B32424]
          transition-all duration-200 active:scale-[0.98]"
        >
          Continuar
        </button>

        <div className="flex justify-center text-sm text-gray-400 mt-2">
          <p>
            Já possui uma conta?{" "}
            <Link href="/login" className="hover:text-[#CC2A2A] transition-colors font-medium">
              Entre agora
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}