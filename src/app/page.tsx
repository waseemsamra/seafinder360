import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Fleet from "@/components/Fleet";
import Showcase from "@/components/Showcase";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import CtaBanner from "@/components/CtaBanner";
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
        <Fleet />
        <Showcase />
        <Stats />
        <Testimonials />
        <CtaBanner />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
