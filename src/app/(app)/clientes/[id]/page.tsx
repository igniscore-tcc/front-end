"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, User, Building, Phone, Mail, Pencil, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ClientDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  return (
    <div className="p-8 min-h-screen bg-white font-sans text-base">
      <header className="flex items-center gap-4 mb-8">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="rounded-full w-10 h-10 p-0 flex items-center justify-center hover:bg-gray-100 text-gray-500 cursor-pointer transition-colors"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-3xl font-bold text-[#1a1a1a]">
          Detalhes do Cliente
        </h1>
      </header>

      <div className="flex flex-col gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col gap-6 relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#FF5A1F]/10 flex items-center justify-center text-[#FF5A1F] shrink-0">
                <User size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Carregando Cliente...</h2>
                <p className="text-gray-500">ID: {id}</p>
              </div>
            </div>
            
            <Button className="bg-[#FF5A1F] hover:bg-[#E64D17] text-white rounded-full px-6 py-2 flex items-center gap-2 transition-all cursor-pointer">
              <Pencil size={16} />
              <span className="font-bold">Editar</span>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400">
                <Receipt size={16} />
                <span className="text-sm font-medium">CNPJ/CPF</span>
              </div>
              <div className="h-6 bg-gray-100 rounded w-3/4 animate-pulse"></div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400">
                <Building size={16} />
                <span className="text-sm font-medium">Inscrição Estadual</span>
              </div>
              <div className="h-6 bg-gray-100 rounded w-2/3 animate-pulse"></div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400">
                <Mail size={16} />
                <span className="text-sm font-medium">E-mail</span>
              </div>
              <div className="h-6 bg-gray-100 rounded w-full animate-pulse"></div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400">
                <Phone size={16} />
                <span className="text-sm font-medium">Telefone</span>
              </div>
              <div className="h-6 bg-gray-100 rounded w-2/3 animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-2">
          <div className="flex gap-8 px-8 border-b border-gray-100 overflow-x-auto">
            <button className="py-4 text-[#FF5A1F] font-bold border-b-2 border-[#FF5A1F] transition-all cursor-pointer whitespace-nowrap">
              Vendas
            </button>
            <button className="py-4 text-gray-500 font-bold hover:text-gray-800 transition-all cursor-pointer border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap">
              Pendências
            </button>
            <button className="py-4 text-gray-500 font-bold hover:text-gray-800 transition-all cursor-pointer border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap">
              Contatos
            </button>
          </div>

          <div className="p-8 pt-6 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80">
                  <th className="px-6 py-4 text-sm font-bold text-gray-600 first:rounded-l-xl">ID</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-600">Total</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-600">Desconto</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-600">Data</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-600">Tipo</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-600 last:rounded-r-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5 text-sm font-medium text-gray-500">1</td>
                  <td className="px-6 py-5 text-sm font-bold text-gray-800">R$ 3.600,99</td>
                  <td className="px-6 py-5 text-sm text-gray-600">5%</td>
                  <td className="px-6 py-5 text-sm text-gray-600">05/04/2026</td>
                  <td className="px-6 py-5 text-sm text-gray-600">Cartão</td>
                  <td className="px-6 py-5 text-sm">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold bg-[#E8F5E9] text-[#2E7D32]">
                      Paga
                    </span>
                  </td>
                </tr>

                <tr className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5 text-sm font-medium text-gray-500">2</td>
                  <td className="px-6 py-5 text-sm font-bold text-gray-800">R$ 3.600,99</td>
                  <td className="px-6 py-5 text-sm text-gray-600">5%</td>
                  <td className="px-6 py-5 text-sm text-gray-600">05/04/2026</td>
                  <td className="px-6 py-5 text-sm text-gray-600">PIX</td>
                  <td className="px-6 py-5 text-sm">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold bg-[#FFF3E0] text-[#E65100]">
                      Pendente
                    </span>
                  </td>
                </tr>

                <tr className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5 text-sm font-medium text-gray-500">3</td>
                  <td className="px-6 py-5 text-sm font-bold text-gray-800">R$ 3.600,99</td>
                  <td className="px-6 py-5 text-sm text-gray-600">5%</td>
                  <td className="px-6 py-5 text-sm text-gray-600">05/04/2026</td>
                  <td className="px-6 py-5 text-sm text-gray-600">PIX</td>
                  <td className="px-6 py-5 text-sm">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold bg-[#FFEBEE] text-[#C62828]">
                      Cancelada
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
