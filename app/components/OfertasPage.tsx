import { useProducts } from "../hooks/products/useProducts";
import ProductCard from "../productos/components/productCard";

export default function OfertasPage() {
  const { data: products, isLoading, isError } = useProducts();

  return (
    <section className="flex flex-col justify-center items-center gap-y-6">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          Ofertas Destacadas
        </h2>
        <p className="text-secondary-foreground">
          Descubre los mejores precios en productos seleccionados.
        </p>
      </div>

      {isLoading && <div className="text-center">Cargando...</div>}
      {isError && (
        <div className="text-center text-red-600">
          No se pudo cargar los productos.
        </div>
      )}

      {products && (
        <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 place-items-center gap-5 items-stretch">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
