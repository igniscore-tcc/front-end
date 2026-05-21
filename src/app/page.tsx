import Challenges from "@/components/home/challenges";
import Contact from "@/components/home/contact";
import Footer from "@/components/home/footer";
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

      <Footer />
    </div>
  );
}
