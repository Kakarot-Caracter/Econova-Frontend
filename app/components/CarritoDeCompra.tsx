import { Car, Minus, Plus, ShoppingBag, VenetianMask, X } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import Link from "next/link";
import { useProducts } from "../hooks/products/useProducts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CarritoDeCompras({}: {}) {
  const router = useRouter();

  const { setIsOpenCarrito } = useCartStore();

  //Extrae los datos del carrito (Ids de los productos)
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  //Llama a la función para obtener los productos
  const { data: productos } = useProducts();
  if (!productos) return null;

  //Filtra los productos que están en el carrito
  const itemsData = items.map((item) => ({
    ...item,
    product: productos.find((producto) => producto.id === item.id),
  }));

  //Total de los productos en el carrito
  const total = itemsData.reduce(
    (acc, item) => acc + (item.product?.price ?? 0) * item.quantity,
    0,
  );

  const handlePayButton = async () => {
    const payload = {
      items: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    const res = await fetch("/api/payments/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    router.push(data.url);
  };

  return (
    <div>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={() => setIsOpenCarrito(false)}
      />

      <div
        className="fixed inset-y-0 right-0 bg-white w-full sm:max-w-lg p-6 border-l shadow-lg z-50
                      transform transition-transform duration-300 ease-in-out translate-x-0 flex flex-col h-full"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Carrito ({items.length})</h2>
          <button
            onClick={() => setIsOpenCarrito(false)}
            className="opacity-70 hover:opacity-100"
          >
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ||
          (itemsData.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
              <Link
                href="/productos"
                className="inline-block"
                onClick={() => setIsOpenCarrito(false)}
              >
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md">
                  Explorar Productos
                </button>
              </Link>
            </div>
          ) : (
            <div>
              {itemsData.map((item) => (
                <Card className="w-full relative" key={item.product?.id}>
                  <CardContent className="flex">
                    <div key={item.id} className="flex gap-4">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border bg-muted">
                        <Image
                          src={item.product?.image || ""}
                          alt={item.product?.name || ""}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="font-medium leading-tight">
                            {item.product?.name}
                          </h3>

                          <p className="text-sm text-muted-foreground">
                            Cantidad: {item.quantity}
                          </p>
                        </div>

                        <p className="text-sm font-medium">
                          {(item.product?.price ?? 0) * item.quantity} $
                        </p>
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1),
                            )
                          }
                          className="px-2 py-2 bg-gray-200 rounded inline-flex items-center justify-center"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="w-4 h-4" />
                        </button>

                        <span className="select-none">{item.quantity}</span>

                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 py-2 bg-gray-200 rounded inline-flex items-center justify-center"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="absolute top-0 right-0 m-2 text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="mt-auto pt-4 border-t flex justify-between items-center">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold">{total}$</span>
              </div>

              <div className="mt-4 flex gap-2">
                <Button onClick={() => clearCart()}>Vaciar Carrito</Button>
                <Button onClick={() => handlePayButton()} className="flex-1">
                  Pagar
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
