import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Scanner from "@/components/Scanner";
import EmailScanner from "@/components/EmailScanner";
import VoiceScanner from "@/components/VoiceScanner";
import Dashboard from "@/components/Dashboard";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#0a0a0b] text-neutral-300">
      <Navbar />
      <Hero />
      <Features />
      <Scanner />
      <EmailScanner />
      <VoiceScanner />
      <Dashboard />
      <Footer />
    </main>
  );
}
