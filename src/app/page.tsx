import Calendar from "@/components/Calendar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Reviews from "@/components/Reviews";
import Stats from "@/components/Stats";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <Header />
      <Hero />
      <Stats />
      <Calendar />
      <Reviews />
      <Footer />
    </main>
  );
}
