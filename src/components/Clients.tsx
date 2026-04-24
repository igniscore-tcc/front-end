"use client";

import {
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddClientModal } from "./AddClientModal";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { formatCnpj, formatPhone, formatCpf } from "@/lib/validators";
import { useClients } from "@/hooks/useClients";
import { useRouter } from "next/navigation";

export default function Clients() {
  const router = useRouter();
  const {
  pageData,
  loading,
  total,
  totalPages,
  hasNextPage,
  from,
  to,
  search,
  setSearch,
  sort,
  handleSort,
  page,
  setPage,
  perPage,
  setPerPage,
  showModal,
  setShowModal,
  addClient,
  editing,
  setEditing,
  saveEdit,
  removeClient,
  deleting,
  setDeleting,
  filterTipo,
  setFilterTipo,
} = useClients();

  const sortIcon = (key: "id" | "nome") => {
    if (sort.key !== key) return <ArrowUpDown size={14} />;
    return sort.dir === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="text-gray-500">Carregando clientes...</span>
    </div>
  );
}

  return (
    <div className="p-8 min-h-screen bg-white font-sans text-base">
      <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <h1 className="text-3xl font-bold text-[#1a1a1a] font-sans">
          Clientes
        </h1>

        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Procurar"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full bg-gray-100/80 border-none rounded-full py-2.5 px-6 pl-12 focus:ring-2 focus:ring-[#FF5A1F]/20 focus:bg-white transition-all outline-none text-gray-700 font-medium font-sans"
          />
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>

        <Button
          onClick={() => setShowModal(true)}
          className="bg-[#FF5A1F] hover:bg-[#E64D17] text-white rounded-full w-12 h-12 flex items-center justify-center transition-all shrink-0 p-0 cursor-pointer"
        >
          <Plus size={24} />
        </Button>
      </header>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-4 mb-8 font-sans">
        <button
          onClick={() => handleSort("id")}
          className={`flex items-center justify-center gap-2 px-6 py-2 rounded-full text-sm font-bold border transition-all cursor-pointer min-w-[90px] ${
            sort.key === "id"
              ? "bg-[#FF5A1F]/10 text-[#FF5A1F] border-[#FF5A1F]/20 shadow-sm"
              : "bg-gray-100/50 text-gray-500 border-transparent hover:bg-gray-100 hover:text-gray-700"
          }`}
        >
          ID {sortIcon("id")}
        </button>
        <button
          onClick={() => handleSort("nome")}
          className={`flex items-center justify-center gap-2 px-6 py-2 rounded-full text-sm font-bold border transition-all cursor-pointer min-w-[120px] ${
            sort.key === "nome"
              ? "bg-[#FF5A1F]/10 text-[#FF5A1F] border-[#FF5A1F]/20 shadow-sm"
              : "bg-gray-100/50 text-gray-500 border-transparent hover:bg-gray-100 hover:text-gray-700"
          }`}
        >
          Nome {sortIcon("nome")}
        </button>

        <div className="flex bg-gray-100/50 rounded-full p-1 border border-gray-100 ml-auto">
          {(["ALL", "PF", "PJ"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilterTipo(t)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                filterTipo === t
                  ? "bg-white text-[#FF5A1F] shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t === "ALL" ? "Todos" : t === "PF" ? "Pessoa Física" : "Pessoa Jurídica"}
            </button>
          ))}
        </div>
      </div>

      {/* Tabelas */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 font-sans">
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                  CNPJ/CPF
                </th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                  Inscrição estadual
                </th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                  Telefone
                </th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider text-center">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pageData.length > 0 ? (
                pageData.map((client) => (
                  <tr
                    key={client.id}
                    className="group hover:bg-gray-50/80 transition-colors cursor-pointer"
                    onClick={() => router.push(`/clientes/${client.id}`)}
                  >
                    <td className="px-6 py-5 text-sm font-medium text-gray-500">
                      {client.id}
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-gray-800">
                      {client.nome}
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-600">
                      {client.tipo === "PF"
                        ? formatCpf(client.cpf)
                        : formatCnpj(client.cnpj)}
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-600">
                      {client.tipo === "PJ" ? client.inscricao : "-"}
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-600">
                      {client.email}
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-gray-800">
                      {formatPhone(client.telefone)}
                    </td>
                    <td className="px-6 py-5 text-sm text-center">
                      <div className="flex items-center justify-center gap-4 opacity-70 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditing(client);
                          }}
                          className="text-[#FF5A1F] hover:text-[#E64D17] transition-colors p-1.5 hover:bg-[#FF5A1F]/10 rounded-lg"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleting(client);
                          }}
                          className="text-[#FF5A1F] hover:text-[#E64D17] transition-colors p-1.5 hover:bg-[#FF5A1F]/10 rounded-lg"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    Nenhum cliente encontrado para "{search}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Páginação */}
      <footer className="mt-8 flex flex-col md:flex-row items-center justify-center gap-8 text-sm font-medium text-gray-500 font-sans">
        <div className="flex items-center gap-2">
          <span>Linhas por página</span>
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setPage(1);
            }}
            className="bg-transparent border-none focus:ring-0 cursor-pointer font-bold text-gray-800 outline-none"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <span>
            {from}-{to} de {total}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={!hasNextPage}
              className="p-1.5 rounded-lg bg-[#FF5A1F] hover:bg-[#E64D17] text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </footer>

      {/* Adicionar cliente */}
      <AddClientModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={addClient}
      />

      {/* Editar cliente */}
      <AddClientModal
        isOpen={!!editing}
        onClose={() => setEditing(null)}
        onSave={saveEdit}
        clientToEdit={editing}
      />

      {/* Confirmar exclusão */}
      <DeleteConfirmModal
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={() => deleting && removeClient(deleting.id)}
        client={deleting}
      />
    </div>
  );
}
