import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import YachtCarousels from "@/components/YachtCarousels";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export default function Page() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <Hero />
        <Services />
        <YachtCarousels />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
