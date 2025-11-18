"use client";

import { useState, useMemo } from "react";
import { useProducts } from "../../hooks/products/useProducts";
import ProductCard from "../components/productCard";

export default function ProductsPage() {
  const { data: products } = useProducts();

  // Estados de filtros
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  if (!products) {
    return <div>Loading...</div>;
  }

  // Obtener categorías únicas
  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category));
    return ["all", ...unique];
  }, [products]);

  // Filtrar productos
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchName = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory = category === "all" || product.category === category;

      return matchName && matchCategory;
    });
  }, [products, search, category]);

  return (
    <main className="flex flex-col justify-center items-center w-full px-4">
      {/* Encabezado */}
      <div className="text-center mt-10">
        <h1 className="text-3xl md:text-4xl font-semibold text-primary mb-2">
          Todos los Productos
        </h1>
        <p className="text-gray-600">
          Encuentra lo que buscas entre nuestras categorías y ofertas.
        </p>
      </div>

      {/* Filtros */}
      <div className="mt-6 w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Buscar */}
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />

        {/* Categoría */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "Todas las categorías" : cat}
            </option>
          ))}
        </select>
      </div>

      {/* Productos */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 w-full place-items-center">
        {filteredProducts.length === 0 ? (
          <p className="text-gray-500">No se encontraron productos.</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </main>
  );
}
