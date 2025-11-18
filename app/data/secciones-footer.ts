type LinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

type Seccion = {
  titulo: string;
  links: LinkItem[];
};

export const secciones: Seccion[] = [
  {
    titulo: "Empresa",
    links: [
      { label: "Sobre Nosotros", href: "/sobre-nosotros" },
      { label: "Contacto", href: "/contacto" },
    ],
  },
  {
    titulo: "Soporte",
    links: [
      { label: "Centro de Ayuda", href: "/soporte" },
      { label: "Términos", href: "/terminos" },
    ],
  },
];
