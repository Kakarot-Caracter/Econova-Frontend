import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col justify-center items-center text-center gap-3">
      <h1 className="text-4xl md:text-5xl">
        Compra <br className="min-[425px]:hidden" />
        <span className="font-semibold text-primary">Inteligente</span>
      </h1>

      <p className="text-lg md:text-xl text-secondary-foreground">
        Descubre productos de calidad a precios que realmente importan.
        <br className="hidden min-[320px]:block" /> Misma calidad, mejor precio.
      </p>

      <div className="flex flex-col items-center sm:flex-row gap-4">
        <Button variant={"default"} size={"lg"} asChild>
          <Link href={"/productos"}> Explorar Productos</Link>
        </Button>

        <Button variant={"secondary"} size={"lg"} asChild>
          <Link href={"/sobre-nosotros"}> Nuestra Historia</Link>
        </Button>
      </div>
    </section>
  );
}
