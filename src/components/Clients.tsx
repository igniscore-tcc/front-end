"use client";

import { useState, useMemo } from "react";
import { 
  Search, 
  Plus, 
  Pencil, 
  Trash2, 
  ArrowUp,
  ArrowDown,
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddClientModal } from "./AddClientModal";
import { formatCnpj, formatPhone, formatCpf } from "@/lib/validators";

const mockClients = [
  { id: 1, nome: "Cliente", cnpj: "88.774.678/0001-49", inscricao: "989314321", email: "clientesupremo@gmail.com", numero: "00 00000-0000" },
  { id: 2, nome: "IgnisCore Systems", cnpj: "12.345.678/0001-99", inscricao: "987654321", email: "contato@igniscore.com", numero: "11 98765-4321" },
  { id: 3, nome: "NASA", cnpj: "44.555.666/0001-11", inscricao: "123456789", email: "NASA@gmail.com", numero: "21 99999-8888" },
  { id: 4, nome: "Empresa de Teste", cnpj: "00.000.000/0001-00", inscricao: "ISENTO", email: "teste@empresa.com", numero: "00 00000-0000" },
  { id: 5, nome: "Cliente Exemplo", cnpj: "11.111.111/0001-11", inscricao: "654321987", email: "exemplo@cliente.com", numero: "31 97777-6666" },
  { id: 6, nome: "Serviços Alpha", cnpj: "22.222.222/0001-22", inscricao: "456123789", email: "alpha@servicos.com", numero: "41 96666-5555" },
  { id: 7, nome: "Beta Tech", cnpj: "33.333.333/0001-33", inscricao: "789456123", email: "beta@tech.io", numero: "51 95555-4444" },
  { id: 8, nome: "Gamma Solutions", cnpj: "44.444.444/0001-44", inscricao: "321654987", email: "gamma@solutions.br", numero: "61 94444-3333" },
  { id: 9, nome: "Delta Group", cnpj: "55.555.555/0001-55", inscricao: "159357486", email: "contato@delta.com", numero: "71 93333-2222" },
  { id: 10, nome: "Epsilon Ltda", cnpj: "66.666.666/0001-66", inscricao: "753159486", email: "adm@epsilon.com", numero: "81 92222-1111" },
  { id: 11, nome: "Zeta Logistics", cnpj: "77.777.777/0001-77", inscricao: "852963147", email: "log@zeta.com", numero: "11 91111-0000" },
  { id: 12, nome: "Omega Force", cnpj: "88.888.888/0001-88", inscricao: "963852741", email: "hq@omega.force", numero: "11 92222-3333" },
  { id: 13, nome: "Sigma Retail", cnpj: "99.999.999/0001-99", inscricao: "147258369", email: "sigma@retail.net", numero: "13 94444-5555" },
  { id: 14, nome: "Theta Consulting", cnpj: "10.101.101/0001-10", inscricao: "258369147", email: "info@theta.consulting", numero: "14 96666-7777" },
  { id: 15, nome: "Iota Innovations", cnpj: "20.202.202/0001-20", inscricao: "369147258", email: "innov@iota.io", numero: "15 98888-9999" },
  { id: 16, nome: "Kappa Kitchens", cnpj: "30.303.303/0001-30", inscricao: "159753468", email: "cook@kappa.com", numero: "16 90000-1111" },
  { id: 17, nome: "Lambda Labs", cnpj: "40.404.404/0001-40", inscricao: "357159264", email: "research@lambda.org", numero: "17 92222-4444" },
  { id: 18, nome: "Mu Media", cnpj: "50.505.505/0001-50", inscricao: "951753852", email: "press@mu.media", numero: "18 93333-6666" },
  { id: 19, nome: "Nu Net", cnpj: "60.606.606/0001-60", inscricao: "456789123", email: "support@nu.net", numero: "19 94444-8888" },
  { id: 20, nome: "Xi Xports", cnpj: "70.707.707/0001-70", inscricao: "321987456", email: "shipping@xi.com", numero: "21 95555-0000" },
  { id: 21, nome: "Omicron Optics", cnpj: "80.808.808/0001-80", inscricao: "654123987", email: "vision@omicron.com", numero: "22 96666-2222" },
  { id: 22, nome: "Pi Planes", cnpj: "90.909.909/0001-90", inscricao: "123789456", email: "cargo@pi.air", numero: "23 97777-4444" },
  { id: 23, nome: "Rho Resorts", cnpj: "01.010.101/0001-01", inscricao: "456456456", email: "stay@rho.com", numero: "24 98888-6666" },
  { id: 24, nome: "Tau Tires", cnpj: "12.121.212/0001-12", inscricao: "789789789", email: "service@tau.tires", numero: "25 99999-8888" },
  { id: 25, nome: "Upsilon Utilities", cnpj: "23.232.232/0001-23", inscricao: "101010101", email: "help@upsilon.com", numero: "27 91111-2222" },
  { id: 26, nome: "Phi Pharmatics", cnpj: "34.343.343/0001-34", inscricao: "202020202", email: "rx@phi.com", numero: "28 92222-4444" },
  { id: 27, nome: "Chi Chemicals", cnpj: "45.454.454/0001-45", inscricao: "303030303", email: "lab@chi.com", numero: "29 93333-6666" },
  { id: 28, nome: "Psi Psych", cnpj: "56.565.565/0001-56", inscricao: "404040404", email: "care@psi.com", numero: "31 94444-8888" },
  { id: 29, nome: "Omega Plus", cnpj: "67.676.676/0001-67", inscricao: "505050505", email: "premium@omega.com", numero: "32 95555-0000" },
  { id: 30, nome: "Aurora Brands", cnpj: "78.787.787/0001-78", inscricao: "606060606", email: "sales@aurora.com", numero: "33 96666-2222" },
  { id: 31, nome: "Borealis Inc", cnpj: "89.898.898/0001-89", inscricao: "707070707", email: "ceo@borealis.net", numero: "34 97777-4444" },
  { id: 32, nome: "Celestial Corp", cnpj: "90.909.090/0001-90", inscricao: "808080808", email: "stars@celestial.com", numero: "35 98888-6666" },
  { id: 33, nome: "Dynasty Digital", cnpj: "11.223.344/0001-55", inscricao: "909090909", email: "web@dynasty.io", numero: "37 99999-8888" },
  { id: 34, nome: "Everest Energy", cnpj: "22.334.455/0001-66", inscricao: "010101010", email: "power@everest.com", numero: "38 91111-2222" },
  { id: 35, nome: "Fusion Foods", cnpj: "33.445.566/0001-77", inscricao: "202020202", email: "eat@fusion.foo", numero: "39 92222-4444" },
];

type SortKey = "id" | "nome";
type SortDirection = "asc" | "desc";

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({
    key: "id",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [clients, setClients] = useState(mockClients);

  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return clients.filter((client) => 
      client.nome.toLowerCase().includes(term) ||
      client.email.toLowerCase().includes(term) ||
      client.cnpj.toLowerCase().includes(term)
    );
  }, [searchTerm, clients]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const handleSort = (key: SortKey) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
    setCurrentPage(1);
  };

  const handleAddClient = (newClient: any) => {
    const nextId = clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1;
    setClients([...clients, { ...newClient, id: nextId, numero: newClient.telefone }]);
  };

  const startRecord = totalItems === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endRecord = Math.min(currentPage * rowsPerPage, totalItems);

  const getSortIcon = (key: SortKey) => {
    if (sortConfig.key !== key) return <ArrowUpDown size={14} />;
    return sortConfig.direction === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  const handleDeleteClient = (id: number) => {
    setClients(prev => prev.filter(client => client.id !== id));
  }

  return (
    <div className="p-8 min-h-screen bg-white font-sans text-base">
      <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <h1 className="text-3xl font-bold text-[#1a1a1a] font-sans">Clientes</h1>
        
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Procurar"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); 
            }}
            className="w-full bg-gray-100/80 border-none rounded-full py-2.5 px-6 pl-12 focus:ring-2 focus:ring-[#FF5A1F]/20 focus:bg-white transition-all outline-none text-gray-700 font-medium font-sans"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>

        <Button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#FF5A1F] hover:bg-[#E64D17] text-white rounded-full w-12 h-12 flex items-center justify-center transition-all shrink-0 p-0 cursor-pointer"
        >
          <Plus size={24} />
        </Button>
      </header>

      <div className="flex flex-wrap items-center gap-4 mb-8 font-sans">
        <button 
          onClick={() => handleSort("id")}
          className={`flex items-center justify-center gap-2 px-6 py-2 rounded-full text-sm font-bold border transition-all cursor-pointer min-w-[90px] ${
            sortConfig.key === "id" 
              ? "bg-[#FF5A1F]/10 text-[#FF5A1F] border-[#FF5A1F]/20 shadow-sm" 
              : "bg-gray-100/50 text-gray-500 border-transparent hover:bg-gray-100 hover:text-gray-700"
          }`}
        >
          ID {getSortIcon("id")}
        </button>
        <button 
          onClick={() => handleSort("nome")}
          className={`flex items-center justify-center gap-2 px-6 py-2 rounded-full text-sm font-bold border transition-all cursor-pointer min-w-[120px] ${
            sortConfig.key === "nome" 
              ? "bg-[#FF5A1F]/10 text-[#FF5A1F] border-[#FF5A1F]/20 shadow-sm" 
              : "bg-gray-100/50 text-gray-500 border-transparent hover:bg-gray-100 hover:text-gray-700"
          }`}
        >
          Nome {getSortIcon("nome")}
        </button>
        <button className="flex items-center gap-2 px-6 py-2 bg-gray-100/50 text-gray-500 border border-transparent rounded-full text-sm font-bold hover:bg-gray-100 hover:text-gray-700 transition-all cursor-pointer">
          Outros filtros <Plus size={14} />
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 font-sans">
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">CNPJ/CPF</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Inscrição estadual</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Numero</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedData.length > 0 ? (
                paginatedData.map((client) => (
                  <tr key={client.id} className="group hover:bg-gray-50/80 transition-colors cursor-pointer">
                    <td className="px-6 py-5 text-sm font-medium text-gray-500">{client.id}</td>
                    <td className="px-6 py-5 text-sm font-bold text-gray-800">{client.nome}</td>
                    <td className="px-6 py-5 text-sm text-gray-600">
                      {client.cnpj.replace(/\D/g, "").length === 11 
                        ? formatCpf(client.cnpj) 
                        : formatCnpj(client.cnpj)}
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-600">{client.inscricao}</td>
                    <td className="px-6 py-5 text-sm text-gray-600">{client.email}</td>
                    <td className="px-6 py-5 text-sm font-bold text-gray-800">{formatPhone(client.numero)}</td>
                    <td className="px-6 py-5 text-sm text-center">
                      <div className="flex items-center justify-center gap-4 opacity-70 group-hover:opacity-100 transition-opacity">
                        <button className="text-[#FF5A1F] hover:text-[#E64D17] transition-colors p-1.5 hover:bg-[#FF5A1F]/10 rounded-lg">
                          <Pencil size={18} />
                        </button>
                        <button onClick={() => handleDeleteClient(client.id)} className="text-[#FF5A1F] hover:text-[#E64D17] transition-colors p-1.5 hover:bg-[#FF5A1F]/10 rounded-lg">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                    Nenhum cliente encontrado para "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="mt-8 flex flex-col md:flex-row items-center justify-center gap-8 text-sm font-medium text-gray-500 font-sans">
        <div className="flex items-center gap-2">
          <span>Linhas por página</span>
          <select 
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
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
          <span>{startRecord}-{endRecord} de {totalItems}</span>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer disabled:cursor-default"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1.5 rounded-lg bg-[#FF5A1F] hover:bg-[#E64D17] text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer disabled:cursor-default"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </footer>

      <AddClientModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddClient}
      />
    </div>
  );
}
