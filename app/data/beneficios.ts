import { DollarSign, LucideIcon, RotateCcw, Truck } from "lucide-react";

export interface Beneficio {
  id: string;
  icon: LucideIcon;
  titulo: string;
  descripcion: string;
}

export const Beneficios: Beneficio[] = [
  {
    id: "competitive-prices",
    icon: DollarSign,
    titulo: "Precios Competitivos",
    descripcion:
      "Ofrecemos los mejores precios del mercado sin comprometer la calidad.",
  },
  {
    id: "fast-shipping",
    icon: Truck,
    titulo: "Envío Rápido",
    descripcion: "Recibe tus productos en 24-48 horas en todo el país.",
  },
  {
    id: "easy-return",
    icon: RotateCcw,
    titulo: "Devolución Fácil",
    descripcion: "10 días para devolver cualquier producto.",
  },
];
