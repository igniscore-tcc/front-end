export default function Dashboard() {
  return (
    <div className="bg-[#F6F8FA] min-h-screen">
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

        <p className="text-sm text-gray-500 mt-1">Visão geral do sistema</p>
      </div>

      <div className="p-6 grid grid-cols-5 gap-5">
        <div className="bg-white p-5 rounded-xl min-h-[150px] text-[#6B7280]">
          Vendas do mês
          <div className="text-black mt-4 font-semibold text-4xl">400k</div>
        </div>

        <div className="bg-white p-5 rounded-xl min-h-[150px] text-[#6B7280]">
          Clientes ativos
          <div className="text-black mt-4 font-semibold text-4xl">20k</div>
        </div>

        <div className="bg-white p-5 rounded-xl min-h-[150px] text-[#6B7280]">
          Ordens em aberto
          <div className="text-black mt-4 font-semibold text-4xl">10</div>
        </div>

        <div className="bg-white p-5 rounded-xl min-h-[150px] text-[#6B7280]">
          Vencimentos próximos
          <div className="text-black mt-4 font-semibold text-4xl">2</div>
        </div>

        <div className="bg-white p-5 rounded-xl min-h-[150px] text-[#6B7280]">
          Vencidos
          <div className="text-black mt-4 font-semibold text-4xl">10</div>
        </div>
      </div>
    </div>
  );
}
