import {
  ArrowRight,
  CalendarClock,
  ChartBarIncreasingIcon,
  ClipboardListIcon,
  UserX,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <header className="px-6 md:px-10 lg:px-16 py-6 md:py-8 flex justify-between items-center fixed w-full bg-white z-50">
        <div className="flex gap-4 items-center">
          <Image
            src="/igniscore.png"
            alt="Igniscore Logo"
            width={36}
            height={48}
            className="object-contain"
            priority
          />

          <p className="text-[#FF5A1F] font-bold text-2xl tracking-[0.01em] leading-[1.3]">
            IgnisCore
          </p>
        </div>

        <nav className="hidden lg:block">
          <ul className="flex gap-6 items-center">
            <li>
              <Link href="/">Recursos</Link>
            </li>
            <li>
              <Link href="">Soluções</Link>
            </li>
            <li>
              <Link href="">Preços</Link>
            </li>
            <li>
              <Link href="">Contato</Link>
            </li>
          </ul>
        </nav>

        <button className="hidden md:block border border-[#FF5A1F] px-4 py-3 text-[#FF5A1F]">
          Solicitar Demonstração
        </button>
      </header>

      <section className="flex flex-col lg:flex-row justify-between mx-16 pb-8 md:px-10 lg:px-16 items-center min-h-screen border-b border-[#B1B4B8] gap-16 pt-32 lg:pt-0">
        <div className="flex flex-col gap-8">
          <p className="text-sm md:text-base text-[#B1B4B8] font-semibold leading-normal tracking-[0.02em]">
            Plataforma SaaS para Empresas de Extintores
          </p>

          <article className="flex flex-col gap-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#B1B4B8] font-medium leading-[1.3] tracking-[0.01em]">
              <span className="text-[#FF5A1F]">Gestão inteligente</span> para
              empresas <span className="block">de extintores</span>
            </h1>

            <p className="text-lg md:text-xl text-[#0B0F19] leading-normal tracking-[0.02em]">
              Controle vendas, vencimentos e ordens de serviço em uma única
              plataforma.
            </p>
          </article>

          <article className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <button className="px-4 py-3 bg-[#FF5A1F] text-white border border-[#FF5A1F] font-semibold">
              Solicitar demonstração
            </button>

            <button className="px-4 py-3 border border-[#FF5A1F] text-[#FF5A1F] flex items-center justify-center gap-4 font-semibold">
              Ver plataforma <ArrowRight width={16} height={16} />
            </button>
          </article>
        </div>

        <Image
          src="/next.svg"
          alt="Hero Image"
          width={600}
          height={400}
          className="object-contain w-full max-w-150"
        />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 px-6 md:px-10 lg:px-16 py-24">
        <h2 className="text-4xl md:text-5xl text-[#B1B4B8] font-medium leading-[1.3] tracking-[0.01em]">
          <span className="text-[#FF5A1F]">Sua operação</span> ainda depende de{" "}
          <span className="block">planilhas e processos manuais?</span>
        </h2>

        <div className="flex flex-col gap-8">
          <article className="w-full border border-[#B1B4B8] p-6 md:p-8 flex justify-between items-center gap-6">
            <p className="text-lg md:text-xl text-[#0B0F19] leading-normal tracking-[0.02em]">
              Controle manual de vencimentos
            </p>

            <CalendarClock
              width={48}
              height={48}
              className="text-[#FF5A1F] min-w-12"
            />
          </article>

          <article className="w-full border border-[#B1B4B8] p-6 md:p-8 flex justify-between items-center gap-6">
            <p className="text-lg md:text-xl text-[#0B0F19] leading-normal tracking-[0.02em]">
              Perda de clientes
            </p>

            <UserX width={48} height={48} className="text-[#FF5A1F] min-w-12" />
          </article>

          <article className="w-full border border-[#B1B4B8] p-6 md:p-8 flex justify-between items-center gap-6">
            <p className="text-lg md:text-xl text-[#0B0F19] leading-normal tracking-[0.02em]">
              Ordens de serviço desorganizadas
            </p>

            <ClipboardListIcon
              width={48}
              height={48}
              className="text-[#FF5A1F] min-w-12"
            />
          </article>

          <article className="w-full border border-[#B1B4B8] p-6 md:p-8 flex justify-between items-center gap-6">
            <p className="text-lg md:text-xl text-[#0B0F19] leading-normal tracking-[0.02em]">
              Controle manual de indicadores
            </p>

            <ChartBarIncreasingIcon
              width={48}
              height={48}
              className="text-[#FF5A1F] min-w-12"
            />
          </article>
        </div>
      </section>
    </div>
  );
}
