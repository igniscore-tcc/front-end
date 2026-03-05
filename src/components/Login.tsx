"use client";

import Link from "next/link";

export default function Login() {
  return (
    <div className="w-full max-w-sm flex flex-col items-center gap-8 py-12 px-6">
      <h1 className="text-4xl font-bold text-[#CC2A2A] text-center mb-4">
        Login
      </h1>
      
      <form className="w-full flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 bg-[#E5E5E5] border-none rounded-lg text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#CC2A2A]/20 transition-all"
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full px-4 py-3 bg-[#E5E5E5] border-none rounded-lg text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#CC2A2A]/20 transition-all"
        />
        
        <button
          type="submit"
          className="w-full mt-4 py-3 px-4 bg-[#CC2A2A] text-white rounded-lg font-semibold hover:bg-[#B32424] transition-all duration-200 active:scale-[0.98]"
        >
          Entrar
        </button>

        <div className="flex justify-center text-sm text-gray-400 mt-2">
          <p>
            Não possui uma conta?{" "}
            <Link href="/register" className="hover:text-gray-600 transition-colors">
              Registre-se agora
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}