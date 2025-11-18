"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
      <XCircle className="w-20 h-20 text-red-600 mb-4" />
      <h1 className="text-2xl font-semibold mb-2">Pago cancelado</h1>
      <p className="text-gray-600 mb-6">No se completó el pago de tu compra.</p>

      <div className="flex gap-3">
        <Link href="/productos">
          <Button variant="outline">Volver a productos</Button>
        </Link>

        <Link href="/">
          <Button>Volver al inicio</Button>
        </Link>
      </div>
    </section>
  );
}
