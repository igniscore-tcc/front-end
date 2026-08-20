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
        min-h-screen
        flex-col
        items-center
        justify-between
        gap-16
        overflow-hidden
        border-b
        border-border
        mx-6
        pt-32
        pb-16
        md:mx-10
        lg:mx-16
        lg:flex-row
      "
    >
      <div className="relative z-10 flex max-w-3xl flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p
            className="
              text-sm
              font-semibold
              uppercase
              tracking-[0.02em]
              text-muted-foreground
              md:text-base
            "
          >
            Plataforma SaaS para empresas de extintores
          </p>

          <h1
            className="
              text-4xl
              font-medium
              leading-[1.2]
              tracking-[0.01em]
              text-foreground
              md:text-5xl
              lg:text-6xl
            "
          >
            <span className="text-primary">Gestão inteligente</span> para
            empresas de extintores
          </h1>

          <p
            className="
              max-w-2xl
              text-lg
              leading-relaxed
              text-foreground
              md:text-xl
            "
          >
            Controle vendas, vencimentos, clientes e ordens de serviço em uma
            única plataforma moderna para empresas de manutenção e revenda de
            extintores.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <Link
            href="https://wa.me/5519996779283?text=Olá,%20quero%20agendar%20uma%20demonstração%20do%20IgnisCore"
            target="_blank"
            className="
              group
              flex
              items-center
              justify-center
              gap-3
              border
              border-primary
              bg-primary
              px-6
              py-4
              font-semibold
              text-primary-foreground
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-primary/90
              hover:shadow-[0_0_30px_rgba(255,90,31,0.25)]
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
              flex
              items-center
              justify-center
              gap-3
              border
              border-primary
              bg-transparent
              px-6
              py-4
              font-semibold
              text-primary
              transition-all
              duration-300
              hover:bg-primary
              hover:text-primary-foreground
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
            <div className="size-2.5 rounded-full bg-primary" />

            <p className="text-sm text-muted-foreground">
              Gestão centralizada
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="size-2.5 rounded-full bg-primary" />

            <p className="text-sm text-muted-foreground">
              Controle de vencimentos
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="size-2.5 rounded-full bg-primary" />

            <p className="text-sm text-muted-foreground">
              Dashboard em tempo real
            </p>
          </div>
        </div>
      </div>

      <div className="relative flex w-full max-w-4xl justify-center">
        <div
          className="
            absolute
            h-[80%]
            w-[80%]
            rounded-full
            bg-primary/10
            blur-3xl
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
            w-full
            max-w-225
            object-contain
            transition-transform
            duration-500
            hover:scale-[1.02]
            lg:max-w-275
            xl:max-w-312.5
          "
        />
      </div>
    </section>
  );
}