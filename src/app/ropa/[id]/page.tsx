import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRopaPorId, getRopa } from "@/services/ropa";
import { getWALink } from "@/components/ui/WhatsAppButton";
import { MessageCircle, ArrowLeft, Tag, Package } from "lucide-react";
import AddToCartButtonRopa from "@/components/ui/AddToCartButtonRopa";

export async function generateStaticParams() {
  const items = getRopa();
  return items.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = getRopaPorId(id);
  if (!item) return { title: "Ropa no encontrada" };
  return {
    title: `${item.nombre} | Artyom Suplementos`,
    description: item.descripcion?.slice(0, 155),
  };
}

function formatPrecio(n: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
}

export default async function RopaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = getRopaPorId(id);
  if (!item) notFound();

  const waMsg = `Hola! Me interesa comprar ropa: ${item.nombre}. ¿Está disponible?`;

  return (
    <div style={{ minHeight: "100vh", background: "#020617" }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "24px 20px 0",
      }}>
        <Link
          href="/ropa"
          className="back-link"
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            color: "#64748b", fontSize: "0.85rem", textDecoration: "none",
          }}
        >
          <ArrowLeft size={15} /> Volver a Ropa
        </Link>
        <style>{`.back-link:hover { color: #0dcaf0; }`}</style>
      </div>

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
        <div style={{
          borderRadius: 16,
          overflow: "hidden",
          background: "#1e293b",
          border: "1px solid rgba(255,255,255,0.07)",
          aspectRatio: "1 / 1",
          position: "relative",
        }}>
          {item.imagen ? (
            <Image
              src={item.imagen}
              alt={item.nombre}
              fill
              priority
              style={{ objectFit: "contain", padding: 40 }}
              sizes="(max-width: 768px) 90vw, 500px"
            />
          ) : (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              height: "100%", fontSize: "5rem", opacity: 0.15,
            }}>👕</div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span className="chip">Ropa</span>
            {item.categoria && (
              <span className="chip" style={{ borderColor: "rgba(255,255,255,0.15)", color: "#94a3b8" }}>
                {item.categoria}
              </span>
            )}
          </div>

          <h1 style={{
            fontSize: "clamp(1.4rem, 3vw, 2rem)",
            fontWeight: 900,
            color: "#f1f5f9",
            lineHeight: 1.2,
          }}>
            {item.nombre}
          </h1>

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
                {formatPrecio(item.precio)}
              </p>
            </div>
          </div>

          {/* Talles disponibles */}
          {item.talles?.length > 0 && (
            <div>
              <p style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: 8 }}>Talles disponibles:</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {item.talles.map((t) => (
                  <span key={t} style={{
                    fontSize: "0.8rem", fontWeight: 700, padding: "4px 10px",
                    borderRadius: 6, border: "1px solid rgba(255,255,255,0.15)",
                    color: "#f1f5f9", background: "rgba(255,255,255,0.05)"
                  }}>{t}</span>
                ))}
              </div>
            </div>
          )}

          {/* Colores disponibles */}
          {item.colores?.length > 0 && (
            <div>
              <p style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: 8 }}>Colores:</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {item.colores.map((c) => (
                  <span key={c} style={{
                    fontSize: "0.8rem", fontWeight: 500, padding: "4px 10px",
                    borderRadius: 6, border: "1px solid rgba(255,255,255,0.15)",
                    color: "#f1f5f9", background: "rgba(255,255,255,0.05)"
                  }}>{c}</span>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
             <AddToCartButtonRopa item={item} />
             <Link
               href={getWALink(waMsg)}
               target="_blank"
               rel="noopener noreferrer"
               className="btn-outline"
               style={{ padding: "14px 28px", fontSize: "1rem", justifyContent: "center" }}
             >
               <MessageCircle size={20} />
               Consultar por WhatsApp
             </Link>
          </div>

          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            color: "#475569", fontSize: "0.8rem",
          }}>
            <Package size={15} />
            <span>Envíos a todo el país</span>
          </div>

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
              {item.descripcion ?? "Sin descripción disponible."}
            </p>
          </div>
        </div>
      </div>

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
