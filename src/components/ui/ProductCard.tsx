import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Producto } from "@/types";
import { getWALink } from "@/components/ui/WhatsAppButton";

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
        <Link
          href={getWALink(`Hola! Me interesa: ${producto.nombre}. ¿Está disponible?`)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ width: "100%", marginTop: 4 }}
        >
          <MessageCircle size={15} />
          Consultar
        </Link>
      </div>
    </article>
  );
}
