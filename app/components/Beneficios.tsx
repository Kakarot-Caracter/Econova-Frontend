import { Beneficios } from "../data/beneficios";

export default function BeneficiosCompra() {
  return (
    <section className=" mx-auto  px-4">
      <h2 className="text-2xl text-center font-semibold mb-4">
        Beneficios de la compra
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Beneficios.map((beneficio) => (
          <div
            key={beneficio.id}
            className="flex flex-col items-center text-center p-6 "
          >
            <div className="p-3 bg-black rounded-full mb-4">
              <beneficio.icon className="w-10 h-10 text-white" />
            </div>

            <h3 className="text-lg font-semibold mb-2">{beneficio.titulo}</h3>
            <p className=" text-muted-foreground">{beneficio.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
