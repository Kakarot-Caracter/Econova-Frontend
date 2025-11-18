import BeneficiosCompra from "./components/Beneficios";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Ofertas from "./components/Ofertas";

export default function Home() {
  return (
    <>
      <main className="flex flex-col gap-y-20 mt-20">
        <Hero />
        <Ofertas />
        <BeneficiosCompra />
      </main>
      <Footer />
    </>
  );
}
