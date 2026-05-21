import Challenges from "@/components/home/challenges";
import Header from "@/components/home/header";
import Hero from "@/components/home/Hero";
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
      <Header />

      <Hero />

      <Challenges />

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
            <div className="flex flex-col gap-4 py-6 border-b border[#B1B4B8]">
              <h4 className="text-2xl text-[#FF5A1F] font-medium">
                Redução de atrasos
              </h4>
              <p>
                Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
              </p>
            </div>
            <div className="py-6 border-b border[#B1B4B8]">
              <h4 className="text-xl text-[#B1B4B8] font-medium">
                Mais produtividade
              </h4>
            </div>
            <div className="py-6 border-b border[#B1B4B8]">
              <h4 className="text-xl text-[#B1B4B8] font-medium">
                Melhor atendimento
              </h4>
            </div>
            <div className="py-6 border-b border[#B1B4B8]">
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

              <div className="relative left-[12.5%] z-10 flex flex-col items-center">
                <div className="w-4 h-4 bg-[#FF5A1F] rounded-full"></div>
              </div>
              <div className="relative left-4 z-10 flex flex-col items-center">
                <div className="w-4 h-4 bg-[#FF5A1F] rounded-full"></div>
              </div>

              <div className="relative -left-8 z-10 flex flex-col items-center">
                <div className="w-4 h-4 bg-[#FF5A1F] rounded-full"></div>
              </div>

              <div className="relative -left-[12.5%] z-10 flex flex-col items-center">
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

      <section className="grid justify-center w-full grid-cols-1 gap-12 mt-16 px-6 md:px-10 lg:px-16">
        <div className="flex w-full justify-center">
          <h2 className="text-4xl md:text-5xl text-[#B1B4B8] font-medium leading-[1.3] tracking-[0.01em] max-w-full text-center">
            <span className="text-[#FF5A1F]">Desenvolvido</span> para quem vive
            esse
            <span className="block">mercado</span>
          </h2>
        </div>

        <div className="grid grid-cols-3 mt-12 border-l border[#B1B4B8]">
          <article className="flex flex-col justify-center gap-12">
            <Image
              src="/payments.svg"
              alt="Hero Image"
              width={0}
              height={0}
              className="w-full h-80"
            />

            <div className="flex gap-6 flex-col text-center">
              <h5 className="text-2xl font-medium text-[#B1B4B8]">
                Revendas de Extintores
              </h5>
              <p className="text-[#B1B4B8]">
                Norem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </article>

          <article className="flex flex-col justify-center gap-12 border-x border[#B1B4B8]">
            <Image
              src="/contract.svg"
              alt="Hero Image"
              width={0}
              height={0}
              className="w-full h-80"
            />

            <div className="flex gap-6 flex-col text-center">
              <h5 className="text-2xl font-medium text-[#B1B4B8]">
                Empresas de Manutenção
              </h5>
              <p className="text-[#B1B4B8]">
                Norem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </article>

          <article className="flex flex-col justify-center gap-12 border-r border[#B1B4B8]">
            <Image
              src="/brief.svg"
              alt="Hero Image"
              width={0}
              height={0}
              className="w-full h-80"
            />

            <div className="flex gap-6 flex-col text-center">
              <h5 className="text-2xl font-medium text-[#B1B4B8]">
                Prestadores de Serviços
              </h5>
              <p className="text-[#B1B4B8]">
                Norem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section
        className="grid justify-center w-full grid-cols-1 gap-12 mt-16 px-6 md:px-10 lg:px-16 py-16 bg-cover bg-center bg-no-repeat relative overflow-hidden"
        style={{
          backgroundImage: `
      linear-gradient(
        135deg,
        rgba(255,90,31,0.95) 0%,
        rgba(109,40,217,0.85) 100%
      ),
      url('/backgroud-gradient.svg')
    `,
        }}
      >
        <div className="flex w-full justify-center flex-col gap-6 relative z-10">
          <h2 className="text-4xl md:text-5xl text-white/50 font-medium leading-[1.3] tracking-[0.01em] max-w-full text-center">
            <span className="text-white">Modernize sua</span> operação com o
            <span className="block">IgnisCore</span>
          </h2>

          <p className="text-lg md:text-xl text-white leading-normal tracking-[0.02em] text-center">
            Controle vendas, vencimentos e ordens de serviço em uma única
            plataforma.
          </p>
        </div>

        <Link
          href="/login"
          className="px-4 py-3 border border-white text-white flex items-center justify-center gap-4 font-semibold w-max mx-auto relative z-10"
        >
          Agendar demonstração
        </Link>
      </section>

      <footer className="w-full grid-cols-1 gap-12 mt-16 px-6 md:px-10 lg:px-16">
        <div className="flex gap-32">
          <ul className="flex flex-col gap-6">
            <h5 className="text-xl text-[#B1B4B8] font-medium">Links</h5>
            <div className="flex flex-col gap-4">
              <li>
                <Link href="/">Recursos</Link>
              </li>

              <li>
                <Link href="/">Soluções</Link>
              </li>

              <li>
                <Link href="/">Preços</Link>
              </li>

              <li>
                <Link href="/">Contato</Link>
              </li>
            </div>
          </ul>

          <ul className="flex flex-col gap-6">
            <h5 className="text-xl text-[#B1B4B8] font-medium">Sobre</h5>
            <div className="flex flex-col gap-4">
              <li>
                <Link href="/">Termos de uso</Link>
              </li>

              <li>
                <Link href="/">Dúvidas frequentes</Link>
              </li>
            </div>
          </ul>

          <ul className="flex flex-col gap-6">
            <h5 className="text-xl text-[#B1B4B8] font-medium">Contato</h5>
            <div className="flex flex-col gap-4">
              <li>
                <Link href="/">Email: suporte@igniscore.com</Link>
              </li>

              <li>
                <Link href="/">Telefone: (19) 9967-79283</Link>
              </li>
            </div>
          </ul>
        </div>

        <div className="mt-8 border-t border-[#B1B4B8] py-8">
          <p className="text-lg leading-normal tracking-[0.02em] text-center">
            © {new Date().getFullYear()} IgnisCore. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
