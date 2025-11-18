import Link from "next/link";
import { secciones } from "../data/secciones-footer";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-4 w-full mt-10">
      <div className="flex flex-col md:flex-row mx-auto ">
        <div className="text-center self-center md:text-left md:w-1/2">
          <h3 className="text-xl  font-bold mb-2">Econova</h3>
          <p className="text-sm text-muted-foreground ">
            Productos de calidad a precios competitivos. Compramos inteligente,
            vivimos mejor.
          </p>
        </div>

        <div className=" grid grid-cols-1  md:grid-cols-3 gap-y-10 w-full">
          {secciones.map((seccion) => (
            <div key={seccion.titulo}>
              <h4 className="font-semibold mb-2 text-white">
                {seccion.titulo}
              </h4>
              <ul className="space-y-1">
                {seccion.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Derechos */}
      <div className="md:col-span-4 mt-12 pt-8 border-t border-gray-800 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Econova. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
