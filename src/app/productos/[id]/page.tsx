import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductoPorId, getProductos } from "@/services/productos";
import { getWALink } from "@/components/ui/WhatsAppButton";
import { MessageCircle, ArrowLeft, Tag, Package } from "lucide-react";

// Genera las rutas estáticas para todos los productos
export async function generateStaticParams() {
  const productos = getProductos();
  return productos.map((p) => ({ id: p.id }));
}

// Metadata dinámica por producto
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const producto = getProductoPorId(id);
  if (!producto) return { title: "Producto no encontrado" };
  return {
    title: `${producto.nombre} — ${producto.marca} | Artyom Suplementos`,
    description: producto.descripcion?.slice(0, 155),
  };
}

function formatPrecio(n: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
}

export default async function ProductoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const producto = getProductoPorId(id);
  if (!producto) notFound();

  const waMsg = `Hola! Me interesa comprar: ${producto.nombre} (${producto.marca}). ¿Está disponible?`;

  return (
    <div style={{ minHeight: "100vh", background: "#020617" }}>
      {/* Breadcrumb */}
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "24px 20px 0",
      }}>
        <Link
          href="/"
          className="back-link"
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            color: "#64748b", fontSize: "0.85rem", textDecoration: "none",
          }}
        >
          <ArrowLeft size={15} /> Volver al catálogo
        </Link>
        <style>{`.back-link:hover { color: #0dcaf0; }`}</style>
      </div>

      {/* Contenido principal */}
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        padding: "32px 20px 80px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 48,
        alignItems: "start",
      }}
        className="producto-grid"
      >
        {/* Imagen */}
        <div style={{
          borderRadius: 16,
          overflow: "hidden",
          background: "#1e293b",
          border: "1px solid rgba(255,255,255,0.07)",
          aspectRatio: "1 / 1",
          position: "relative",
        }}>
          {producto.imagen ? (
            <Image
              src={producto.imagen}
              alt={producto.nombre}
              fill
              priority
              style={{ objectFit: "contain", padding: 40 }}
              sizes="(max-width: 768px) 90vw, 500px"
            />
          ) : (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              height: "100%", fontSize: "5rem", opacity: 0.15,
            }}>💊</div>
          )}
        </div>

        {/* Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Marca + categoría */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span className="chip">{producto.marca}</span>
            {producto.categoria && (
              <span className="chip" style={{ borderColor: "rgba(255,255,255,0.15)", color: "#94a3b8" }}>
                {producto.categoria}
              </span>
            )}
          </div>

          {/* Nombre */}
          <h1 style={{
            fontSize: "clamp(1.4rem, 3vw, 2rem)",
            fontWeight: 900,
            color: "#f1f5f9",
            lineHeight: 1.2,
          }}>
            {producto.nombre}
          </h1>

          {/* Precio */}
          <div style={{
            background: "rgba(13,202,240,0.06)",
            border: "1px solid rgba(13,202,240,0.2)",
            borderRadius: 12,
            padding: "18px 22px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}>
            <Tag size={20} color="#0dcaf0" />
            <div>
              <p style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Precio Artyom</p>
              <p style={{ fontSize: "2rem", fontWeight: 900, color: "#0dcaf0", lineHeight: 1 }}>
                {formatPrecio(producto.precioArtyom)}
              </p>
            </div>
          </div>

          {/* CTA WhatsApp */}
          <Link
            href={getWALink(waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: "14px 28px", fontSize: "1rem", justifyContent: "center" }}
          >
            <MessageCircle size={20} />
            Consultar por WhatsApp
          </Link>

          {/* Info extra */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            color: "#475569", fontSize: "0.8rem",
          }}>
            <Package size={15} />
            <span>Envíos a todo el país · Producto original garantizado</span>
          </div>

          {/* Separador */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20 }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#f1f5f9", marginBottom: 12 }}>
              Descripción del producto
            </h2>
            <p style={{
              fontSize: "0.9rem",
              color: "#94a3b8",
              lineHeight: 1.8,
              whiteSpace: "pre-wrap",
            }}>
              {producto.descripcion ?? "Sin descripción disponible."}
            </p>
          </div>
        </div>
      </div>

      {/* CSS responsive para el grid */}
      <style>{`
        @media (max-width: 680px) {
          .producto-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
