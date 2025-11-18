"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useFavoritesStore } from "@/app/stores/useFavoriteStore";
import { useProduct } from "@/app/hooks/products/useProduct";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Minus, Plus, Share2, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/app/stores/useCartStore";
import { it } from "zod/v4/locales";

export default function ProductDetailPage() {
  const params = useParams() as { slug: string; id: string };
  const { id } = params;

  const { data: product, isLoading, isError, error } = useProduct(id);

  //Sistema de cantidad
  const [quantity, setQuantity] = useState(1);
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const { addItem, items } = useCartStore();

  //Store zustand de favoritos
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const { setIsOpenCarrito } = useCartStore();

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error al cargar el producto
          </h2>
          <p className="text-gray-600">{error?.message}</p>
        </div>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Producto no encontrado
          </h2>
          <p className="text-gray-600">
            El producto que buscas no existe o ha sido eliminado.
          </p>
        </div>
      </div>
    );

  return (
    <div className="mt-10">
      <Card className="max-w-6xl mx-auto">
        <div className="flex items-start gap-8 p-6">
          <div className="flex-shrink-0 w-64 h-64 md:w-150 md:h-150 rounded-xl overflow-hidden relative">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="text-gray-400 text-6xl">📷</div>
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col gap-5">
            <h2 className="text-4xl font-bold mb-2">{product.name}</h2>

            <Card className="w-full bg-gray-50">
              <CardContent className="w-full">
                <div className="flex gap-x-5 w-full items-center">
                  <h2 className="text-3xl font-bold mb-2">${product.price}</h2>
                  <span className="text-lg text-gray-500 line-through">
                    €{(parseFloat(product.price.toString()) * 1.2).toFixed(2)}
                  </span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-medium">
                    -20%
                  </span>
                </div>
                <div className="flex gap-x-1 items-center">
                  <span>IVA incluido</span>
                  <div>·</div>
                  <span>Envío depende de la distancia.</span>
                </div>
              </CardContent>
            </Card>

            <div className="w-full">
              <h2 className="text-lg font-bold">Descripción</h2>
              <p className="break-words whitespace-normal overflow-auto">
                {product.description}
              </p>
            </div>

            <div className="space-y-4">
              {/* Selector cantidad */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cantidad
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={decrementQuantity}
                    className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-semibold min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Botones */}
              <div className="flex space-x-3">
                {/* Añadir al carrito */}
                <button
                  onClick={() => addItem(product.id, quantity)}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Añadir al carrito</span>
                </button>

                {/* Favorito ❤️ */}
                <button
                  onClick={() => toggleFavorite(product.id.toString())}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-xl transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite(product.id.toString())
                        ? "text-red-500 fill-red-500"
                        : "text-gray-600"
                    }`}
                  />
                </button>
              </div>
              <button
                onClick={() => {
                  if (items.length === 0) {
                    addItem(product.id, quantity);
                  }

                  setIsOpenCarrito(true);
                }}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Comprar ahora
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
