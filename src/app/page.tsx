import Challenges from "@/components/home/challenges";
import Contact from "@/components/home/contact";
import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import Hero from "@/components/home/hero";
import InteractionDashboard from "@/components/home/interaction-dashboard";
import Market from "@/components/home/market";
import { Pricing } from "@/components/home/Pricing";
import Result from "@/components/home/results";
import Solutions from "@/components/home/solutions";
import Timeline from "@/components/home/timeline";

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

            <Pricing />

            <Contact />

            <Footer />
        </div>
    );
}
