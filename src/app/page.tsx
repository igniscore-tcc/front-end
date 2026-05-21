import {
  ArrowRight,
  CalendarClock,
  ChartBarIncreasingIcon,
  ClipboardListIcon,
  Package,
  ShoppingCartIcon,
  UsersIcon,
  UserX,
} from "lucide-react";
import { redirect } from "next/dist/server/api-utils";
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

        <Link
          href="/login"
          className="hidden md:block border border-[#FF5A1F] px-4 py-3 text-[#FF5A1F]"
        >
          Solicitar Demonstração
        </Link>
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
            <Link
              href="/login"
              className="px-4 py-3 bg-[#FF5A1F] text-white border border-[#FF5A1F] font-semibold"
            >
              Solicitar demonstração
            </Link>

            <Link
              href="/login"
              className="px-4 py-3 border border-[#FF5A1F] text-[#FF5A1F] flex items-center justify-center gap-4 font-semibold"
            >
              Ver plataforma <ArrowRight width={16} height={16} />
            </Link>
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

      <section className="grid justify-center w-full grid-cols-1 gap-12 mt-16 px-6 md:px-10 lg:px-16">
        <div className="flex justify-center w-full">
          <h2 className="text-4xl md:text-5xl text-[#B1B4B8] font-medium leading-[1.3] tracking-[0.01em] max-w-full lg:max-w-[50dvw] text-center">
            <span className="text-[#FF5A1F]">Gerencie toda</span> a operação da
            sua empresa em uma única plataforma.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
          <article
            className="
        group
        text-[#B1B4B8]
        border-x
        border-b
        border-[#B1B4B8]
        p-8
        flex
        flex-col
        gap-6
        transition-all
        duration-300
        hover:border-[#FF5A1F]
        hover:text-[#FF5A1F]
      "
          >
            <div className="flex gap-4 items-center">
              <UsersIcon
                width={32}
                height={32}
                className="transition-colors duration-300 group-hover:text-[#FF5A1F]"
              />

              <h3 className="text-2xl transition-colors duration-300 group-hover:text-[#FF5A1F]">
                Gestão de Clientes
              </h3>
            </div>

            <p className="transition-colors duration-300 group-hover:text-[#FF5A1F]">
              Norem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </article>

          <article
            className="
        group
        text-[#B1B4B8]
        border-b
        border-[#B1B4B8]
        p-8
        flex
        flex-col
        gap-6
        transition-all
        duration-300
        hover:border-[#FF5A1F]
        hover:text-[#FF5A1F]
      "
          >
            <div className="flex gap-4 items-center">
              <Package
                width={32}
                height={32}
                className="transition-colors duration-300 group-hover:text-[#FF5A1F]"
              />

              <h3 className="text-2xl transition-colors duration-300 group-hover:text-[#FF5A1F]">
                Controle de Produtos
              </h3>
            </div>

            <p className="transition-colors duration-300 group-hover:text-[#FF5A1F]">
              Norem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </article>

          <article
            className="
        group
        text-[#B1B4B8]
        border-x
        border-b
        border-[#B1B4B8]
        p-8
        flex
        flex-col
        gap-6
        transition-all
        duration-300
        hover:border-[#FF5A1F]
        hover:text-[#FF5A1F]
      "
          >
            <div className="flex gap-4 items-center">
              <ShoppingCartIcon
                width={32}
                height={32}
                className="transition-colors duration-300 group-hover:text-[#FF5A1F]"
              />

              <h3 className="text-2xl transition-colors duration-300 group-hover:text-[#FF5A1F]">
                Vendas Inteligentes
              </h3>
            </div>

            <p className="transition-colors duration-300 group-hover:text-[#FF5A1F]">
              Norem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </article>

          <article
            className="
        group
        text-[#B1B4B8]
        border-x
        border-[#B1B4B8]
        p-8
        flex
        flex-col
        gap-6
        transition-all
        duration-300
        hover:border-[#FF5A1F]
        hover:text-[#FF5A1F]
      "
          >
            <div className="flex gap-4 items-center">
              <ClipboardListIcon
                width={32}
                height={32}
                className="transition-colors duration-300 group-hover:text-[#FF5A1F]"
              />

              <h3 className="text-2xl transition-colors duration-300 group-hover:text-[#FF5A1F]">
                Ordens de Serviço
              </h3>
            </div>

            <p className="transition-colors duration-300 group-hover:text-[#FF5A1F]">
              Norem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </article>

          <article
            className="
        group
        text-[#B1B4B8]
        border-[#B1B4B8]
        p-8
        flex
        flex-col
        gap-6
        transition-all
        duration-300
        hover:border-[#FF5A1F]
        hover:text-[#FF5A1F]
      "
          >
            <div className="flex gap-4 items-center">
              <CalendarClock
                width={32}
                height={32}
                className="transition-colors duration-300 group-hover:text-[#FF5A1F]"
              />

              <h3 className="text-2xl transition-colors duration-300 group-hover:text-[#FF5A1F]">
                Controle de Vencimentos
              </h3>
            </div>

            <p className="transition-colors duration-300 group-hover:text-[#FF5A1F]">
              Norem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </article>

          <article
            className="
        group
        text-[#B1B4B8]
        border-x
        border-[#B1B4B8]
        p-8
        flex
        flex-col
        gap-6
        transition-all
        duration-300
        hover:border-[#FF5A1F]
        hover:text-[#FF5A1F]
      "
          >
            <div className="flex gap-4 items-center">
              <ChartBarIncreasingIcon
                width={32}
                height={32}
                className="transition-colors duration-300 group-hover:text-[#FF5A1F]"
              />

              <h3 className="text-2xl transition-colors duration-300 group-hover:text-[#FF5A1F]">
                Dashboard Gerencial
              </h3>
            </div>

            <p className="transition-colors duration-300 group-hover:text-[#FF5A1F]">
              Norem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </article>
        </div>
      </section>

      <section className="grid justify-center w-full grid-cols-1 gap-12 mt-16 px-6 md:px-10 lg:px-16">
        <div className="flex justify-center w-full">
          <h2 className="text-4xl md:text-5xl text-[#B1B4B8] font-medium leading-[1.3] tracking-[0.01em] max-w-full lg:max-w-[50dvw] text-center">
            <span className="text-[#FF5A1F]">Visualize sua</span> operação em
            <span className="block">tempo real</span>
          </h2>
        </div>

        <Image
          src="/next.svg"
          alt="Hero Image"
          width={0}
          height={0}
          className="object-contain w-full mt-12"
        ></Image>
      </section>

      <section className="grid justify-center w-full grid-cols-1 gap-12 mt-16 px-6 md:px-10 lg:px-16">
        <div className="flex w-full">
          <h2 className="text-4xl md:text-5xl text-[#B1B4B8] font-medium leading-[1.3] tracking-[0.01em] max-w-full">
            <span className="text-[#FF5A1F]">Resultados</span> que impactam sua
            <span className="block">operação</span>
          </h2>
        </div>

        <div className="flex gap-16">
          <article className="w-110">
            <div className="flex flex-col gap-4 pb-6">
              <h4 className="text-2xl text-[#FF5A1F] font-medium">
                Redução de atrasos
              </h4>
              <p>
                Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
              </p>
            </div>
            <div className="py-6 border-y border[#B1B4B8]">
              <h4 className="text-xl text-[#B1B4B8] font-medium">
                Mais produtividade
              </h4>
            </div>
            <div className="py-6 border-y border[#B1B4B8]">
              <h4 className="text-xl text-[#B1B4B8] font-medium">
                Melhor atendimento
              </h4>
            </div>
            <div className="py-6 border-y border[#B1B4B8]">
              <h4 className="text-xl text-[#B1B4B8] font-medium">
                Gestão centralizada
              </h4>
            </div>
          </article>

          <article>
            <Image
              src="/next.svg"
              alt="Hero Image"
              width={1287}
              height={771}
              className="h-192.75"
            ></Image>
          </article>
        </div>
      </section>

      <section className="grid justify-center w-full grid-cols-1 gap-12 mt-16 px-6 md:px-10 lg:px-16">
        <div className="flex justify-center w-full">
          <h2 className="text-4xl md:text-5xl text-[#B1B4B8] font-medium leading-[1.3] tracking-[0.01em] max-w-full lg:max-w-[50dvw] text-center">
            <span className="text-[#FF5A1F]">Comece</span> em poucos passos
          </h2>
        </div>

        <div>
          <article>
            <div className="flex gap-32">
              <div className="flex gap-6 p-8 border border-[#B1B4B8]">
                <div className="flex gap-6 flex-col">
                  <div className="flex gap-4">
                    <Package
                      width={32}
                      height={32}
                      className="text-[#B1B4B8]"
                    />
                    <h5 className="text-2xl font-medium text-[#B1B4B8]">
                      Cadastre sua empresa
                    </h5>
                  </div>
                  <p className="text-[#B1B4B8]">
                    Norem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
                <div>
                  <p className="text-5xl text-[#B1B4B8] font-medium border-l pl-6 border-[#B1B4B8] h-full flex items-center">
                    1
                  </p>
                </div>
              </div>

              <div className="flex gap-6 p-8 border border-[#B1B4B8]">
                <div className="flex gap-6 flex-col">
                  <div className="flex gap-4">
                    <Package
                      width={32}
                      height={32}
                      className="text-[#B1B4B8]"
                    />
                    <h5 className="text-2xl font-medium text-[#B1B4B8]">
                      Automatize vencimentos
                    </h5>
                  </div>
                  <p className="text-[#B1B4B8]">
                    Norem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
                <div>
                  <p className="text-5xl text-[#B1B4B8] font-medium border-l pl-6 border-[#B1B4B8] h-full flex items-center">
                    3
                  </p>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-between mx-auto my-6">
              <div className="absolute top-2 left-0 w-full h-px bg-[#B1B4B8]"></div>

              <div className="relative left-50 z-10 flex flex-col items-center">
                <div className="w-4 h-4 bg-[#FF5A1F] rounded-full"></div>
              </div>
              <div className="relative left-30 z-10 flex flex-col items-center">
                <div className="w-4 h-4 bg-[#FF5A1F] rounded-full"></div>
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-4 h-4 bg-[#FF5A1F] rounded-full"></div>
              </div>

              <div className="relative -left-50 z-10 flex flex-col items-center">
                <div className="w-4 h-4 bg-[#FF5A1F] rounded-full"></div>
              </div>
            </div>

            <div className="flex gap-32 justify-end">
              <div className="flex gap-6 p-8 border border-[#B1B4B8]">
                <div className="flex gap-6 flex-col">
                  <div className="flex gap-4">
                    <Package
                      width={32}
                      height={32}
                      className="text-[#B1B4B8]"
                    />
                    <h5 className="text-2xl font-medium text-[#B1B4B8]">
                      Cadastre sua empresa
                    </h5>
                  </div>
                  <p className="text-[#B1B4B8]">
                    Norem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
                <div>
                  <p className="text-5xl text-[#B1B4B8] font-medium border-l pl-6 border-[#B1B4B8] h-full flex items-center">
                    2
                  </p>
                </div>
              </div>

              <div className="flex gap-6 p-8 border border-[#B1B4B8]">
                <div className="flex gap-6 flex-col">
                  <div className="flex gap-4">
                    <Package
                      width={32}
                      height={32}
                      className="text-[#B1B4B8]"
                    />
                    <h5 className="text-2xl font-medium text-[#B1B4B8]">
                      Automatize vencimentos
                    </h5>
                  </div>
                  <p className="text-[#B1B4B8]">
                    Norem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
                <div>
                  <p className="text-5xl text-[#B1B4B8] font-medium border-l pl-6 border-[#B1B4B8] h-full flex items-center">
                    4
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
