import Image from "next/image";
import Link from "next/link";
import { Producto } from "@/types";
import AddToCartButton from "@/components/ui/AddToCartButton";

interface ProductCardProps {
  producto: Producto;
}

function formatPrecio(n: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function ProductCard({ producto }: ProductCardProps) {
  return (
    <article className="product-card">
      {/* Imagen clickeable */}
      <Link href={`/productos/${producto.id}`} style={{ display: "block", textDecoration: "none" }}>
        <div className="product-card__img">
          {producto.imagen ? (
            <Image
              src={producto.imagen}
              alt={producto.nombre}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              style={{ objectFit: "contain", padding: 16 }}
            />
          ) : (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              height: "100%", fontSize: "3rem", opacity: 0.15,
            }}>💊</div>
          )}
          {/* Badge marca */}
          <div style={{ position: "absolute", top: 10, left: 10 }}>
            <span className="chip">{producto.marca}</span>
          </div>
        </div>
      </Link>

      {/* Contenido */}
      <div className="product-card__body">
        <p className="product-card__name">{producto.nombre}</p>
        <p className="product-card__price">{formatPrecio(producto.precioArtyom)}</p>
        <AddToCartButton producto={producto} />
      </div>
    </article>
  );
}
