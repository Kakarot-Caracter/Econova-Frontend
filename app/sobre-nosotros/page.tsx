import Link from "next/link";

export default function NuestraHistoria() {
  return (
    <main className="py-20">
      <div className="max-w-5xl mx-auto px-6 text-center ">
        <Link href="/" className="text-primary hover:underline">
          Volver
        </Link>

        {/* Título */}
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 mt-10">
          Nuestra Historia
        </h2>

        {/* Subtítulo */}
        <p className="text-lg text-primary mb-12 max-w-3xl mx-auto">
          Econova nació con una idea simple pero poderosa: hacer que comprar de
          forma inteligente sea accesible para todos.
        </p>

        {/* Cuerpo de la historia */}
        <div className="bg-white shadow-lg rounded-3xl p-8 md:p-12 border border-gray-100">
          <p className="text-primary leading-relaxed text-justify mb-6">
            Todo comenzó en 2023, cuando un pequeño grupo de entusiastas de la
            tecnología y el comercio electrónico se dio cuenta de algo evidente:
            comprar online se estaba volviendo cada vez más caro, complicado y
            poco transparente. Fue entonces cuando nació{" "}
            <span className="font-semibold text-primary">Econova</span> — una
            tienda digital pensada para quienes buscan calidad, confianza y
            buenos precios sin rodeos.
          </p>

          <p className="text-primary leading-relaxed text-justify mb-6">
            El nombre “Econova” combina dos ideas que nos definen:
            <span className="font-semibold text-primary"> “Eco” </span> de
            económico, porque creemos que el ahorro no debería ser un lujo; y{" "}
            <span className="font-semibold text-primary"> “Nova” </span>, de
            nuevo y brillante, porque buscamos innovar y ofrecer una experiencia
            moderna, ágil y responsable con nuestros clientes.
          </p>

          <p className="text-primary leading-relaxed text-justify mb-6">
            Hoy, Econova es mucho más que una tienda: es una comunidad de
            compradores conscientes, que valoran la transparencia, la tecnología
            y el buen servicio. Nos impulsa la misión de acercar lo mejor del
            comercio digital a todos los rincones, ofreciendo productos
            cuidadosamente seleccionados con precios realmente competitivos.
          </p>

          <p className="text-primary leading-relaxed text-justify">
            Y esto es solo el comienzo. Cada día seguimos creciendo, aprendiendo
            y mejorando, con un objetivo claro: que cada compra en{" "}
            <span className="font-semibold text-primary">Econova</span> sea una
            experiencia positiva, sencilla y, sobre todo, inteligente.
          </p>
        </div>
      </div>
    </main>
  );
}
