import Challenges from "@/components/home/challenges";
import Contact from "@/components/home/contact";
import Header from "@/components/home/header";
import Hero from "@/components/home/Hero";
import InteractionDashboard from "@/components/home/interaction-dashboard";
import Market from "@/components/home/market";
import Result from "@/components/home/results";
import Solutions from "@/components/home/solutions";
import Timeline from "@/components/home/timeline";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Header />

      <Hero />

      <Challenges />

      <Solutions />

      <InteractionDashboard />

      <Result />

      <Timeline />

      <Market />

      <Contact />

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
