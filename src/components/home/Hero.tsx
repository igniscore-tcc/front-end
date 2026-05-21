"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="
        relative
        flex
        flex-col
        lg:flex-row
        justify-between
        items-center
        gap-16
        min-h-screen
        mx-16
        md:mx-10
        lg:mx-16
        pt-32
        pb-16
        border-b
        border-[#B1B4B8]
        overflow-hidden
      "
    >
      <div className="flex flex-col gap-8 max-w-3xl relative z-10">
        <div className="flex flex-col gap-4">
          <p
            className="
              text-sm
              md:text-base
              text-[#B1B4B8]
              font-semibold
              tracking-[0.02em]
              uppercase
            "
          >
            Plataforma SaaS para empresas de extintores
          </p>

          <h1
            className="
              text-4xl
              md:text-5xl
              lg:text-6xl
              text-[#B1B4B8]
              font-medium
              leading-[1.2]
              tracking-[0.01em]
            "
          >
            <span className="text-[#FF5A1F]">Gestão inteligente</span> para
            empresas de extintores
          </h1>

          <p
            className="
              text-lg
              md:text-xl
              text-[#0B0F19]
              leading-relaxed
              max-w-2xl
            "
          >
            Controle vendas, vencimentos, clientes e ordens de serviço em uma
            única plataforma moderna para empresas de manutenção e revenda de
            extintores.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <Link
            href="https://wa.me/5519996779283?text=Olá,%20quero%20agendar%20uma%20demonstração%20do%20IgnisCore"
            target="_blank"
            className="
              group
              px-6
              py-4
              bg-[#FF5A1F]
              text-white
              border
              border-[#FF5A1F]
              font-semibold
              flex
              items-center
              justify-center
              gap-3
              transition-all
              duration-300
              hover:shadow-[0_0_30px_rgba(255,90,31,0.25)]
              hover:-translate-y-0.5
            "
          >
            Solicitar demonstração
            <ArrowRight
              width={18}
              height={18}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </Link>

          <Link
            href="/#dashboard"
            className="
              group
              px-6
              py-4
              border
              border-[#FF5A1F]
              text-[#FF5A1F]
              flex
              items-center
              justify-center
              gap-3
              font-semibold
              transition-all
              duration-300
              hover:bg-[#FF5A1F]
              hover:text-white
            "
          >
            Ver plataforma
            <ArrowRight
              width={18}
              height={18}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </Link>
        </div>

        <div className="flex flex-wrap gap-6 pt-2">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5A1F]" />

            <p className="text-sm text-[#B1B4B8]">Gestão centralizada</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5A1F]" />

            <p className="text-sm text-[#B1B4B8]">Controle de vencimentos</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5A1F]" />

            <p className="text-sm text-[#B1B4B8]">Dashboard em tempo real</p>
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-4xl flex justify-center">
        <div
          className="
            absolute
            w-[80%]
            h-[80%]
            bg-[#FF5A1F]/10
            blur-3xl
            rounded-full
          "
        />

        <Image
          src="/dashboard.svg"
          alt="Dashboard da plataforma IgnisCore para gestão de empresas de extintores"
          width={1400}
          height={1000}
          priority
          className="
            relative
            object-contain
            w-full
            max-w-225
            lg:max-w-275
            xl:max-w-312.5
            transition-transform
            duration-500
            hover:scale-[1.02]
        "
        />
      </div>
    </section>
  );
}
