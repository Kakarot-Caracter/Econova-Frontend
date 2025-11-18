"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PagoCompletadoPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [verified, setVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const session_id = params.get("session_id");
    if (!session_id) {
      router.replace("/");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(
          `/api/payments/verify?session_id=${session_id}`,
        );
        const data = await res.json();

        if (data.paid) setVerified(true);
        else router.replace("/");
      } catch (error) {
        console.error(error);
        router.replace("/");
      }
    };

    verify();
  }, [params, router]);

  if (verified === null) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Verificando pago...</p>
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
      <CheckCircle className="w-20 h-20 text-green-600 mb-4" />
      <h1 className="text-2xl font-semibold mb-2">¡Pago completado!</h1>
      <p className="text-gray-600 mb-6">Tu compra se ha realizado con éxito.</p>

      <div className="flex gap-3">
        <Link href="/productos">
          <Button variant="outline">Seguir comprando</Button>
        </Link>

        <Link href="/">
          <Button>Volver al inicio</Button>
        </Link>
      </div>
    </section>
  );
}
