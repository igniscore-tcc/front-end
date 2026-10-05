import Challenges from "@/components/home/challenges";
import Contact from "@/components/home/contact";
import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import Hero from "@/components/home/hero";
import InteractionDashboard from "@/components/home/interaction-dashboard";
import Market from "@/components/home/market";
import Result from "@/components/home/results";
import Solutions from "@/components/home/solutions";
import Timeline from "@/components/home/timeline";
import { Button } from "@/components/ui/button";

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

      <section className="px-6 py-20 lg:px-16 lg:py-32 md:px-10">
      <div className="flex justify-between items-end">
        <article>
          <h2
          className="
            max-w-3xl
            text-4xl
            font-medium
            leading-[1.2]
            text-foreground
            md:text-5xl
          "
        >
          <span className="text-primary">Planos</span> e preços
        </h2>

        <p
          className="
            max-w-2xl
            text-lg
            leading-relaxed
            text-muted-foreground
            md:text-xl
          "
        >
          Veja o melhor plano para a usa operação
        </p>
        </article>

        <article className="flex gap-4">
          <Button variant={"secondary"}>Mensal</Button>
          <Button>Anual</Button>
        </article>
      </div>

      <div className="grid grid-cols-3 gap-8 mt-16 w-4xl">
        <article className="p-6 border border-primary">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl">Inicial</h3>
            <p className="text-muted-foreground leading-relaxed">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt omnis illo nostrum molestiae maiores deleniti.</p>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <h2 className="text-4xl">Grátis</h2>
            <p className="text-muted-foreground leading-relaxed">14 dias</p>
          </div>

          <div className="mt-8 text-muted-foreground leading-relaxed">
            <ul>
              <li>item 1</li>
              <li>item 2</li>
              <li>item 3</li>
              <li>item 4</li>
            </ul>
          </div>

          <div className="mt-8">
            <Button className="w-full p-6">Escolher Plano</Button>
          </div>
        </article>

        <article className="p-6 border border-primary">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl">Inicial</h3>
            <p className="text-muted-foreground leading-relaxed">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt omnis illo nostrum molestiae maiores deleniti.</p>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <h2 className="text-4xl">Grátis</h2>
            <p className="text-muted-foreground leading-relaxed">14 dias</p>
          </div>

          <div className="mt-8 text-muted-foreground leading-relaxed">
            <ul>
              <li>item 1</li>
              <li>item 2</li>
              <li>item 3</li>
              <li>item 4</li>
            </ul>
          </div>

          <div className="mt-8">
            <Button className="w-full p-6">Escolher Plano</Button>
          </div>
        </article>

        <article className="p-6 border border-primary">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl">Inicial</h3>
            <p className="text-muted-foreground leading-relaxed">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt omnis illo nostrum molestiae maiores deleniti.</p>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <h2 className="text-4xl">Grátis</h2>
            <p className="text-muted-foreground leading-relaxed">14 dias</p>
          </div>

          <div className="mt-8 text-muted-foreground leading-relaxed">
            <ul>
              <li>item 1</li>
              <li>item 2</li>
              <li>item 3</li>
              <li>item 4</li>
            </ul>
          </div>

          <div className="mt-8">
            <Button className="w-full p-6">Escolher Plano</Button>
          </div>
        </article>
      </div>


      </section>

      <Contact />

      <Footer />
    </div>
  );
}
