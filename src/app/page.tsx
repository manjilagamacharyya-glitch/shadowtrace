import Particles from "@/components/Particles";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Scanner from "@/components/Scanner";
import UrlScanner from "@/components/UrlScanner";
import VoiceScanner from "@/components/VoiceScanner";
import DeepfakeScanner from "@/components/DeepfakeScanner";
import Dashboard from "@/components/Dashboard";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <main className="bg-black text-white">
      <Particles />
      <Navbar />
      <Hero />
      <Features />
      <Scanner />
      <UrlScanner />
      <VoiceScanner />
      <DeepfakeScanner />
      <Dashboard />
      <Footer />
    </main>
  );
}