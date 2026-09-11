"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Tag, Package } from "lucide-react";
import { Producto } from "@/types";
import { getWALink } from "./WhatsAppButton"; // Assuming WhatsAppButton is in the same folder

interface Props {
  producto: Producto;
}

function formatPrecio(n: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function ProductDetailClient({ producto }: Props) {
  const hasSabores = producto.sabores && producto.sabores.length > 0;
  const [saborSeleccionado, setSaborSeleccionado] = useState(
    hasSabores ? producto.sabores![0] : null
  );

  const imagenMostrada = saborSeleccionado?.imagen || producto.imagen;
  
  const mensajeWA = hasSabores
    ? `Hola! Me interesa comprar: ${producto.nombre} (${producto.marca}) - Sabor: ${saborSeleccionado?.nombre}. ¿Está disponible?`
    : `Hola! Me interesa comprar: ${producto.nombre} (${producto.marca}). ¿Está disponible?`;

  return (
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
        {imagenMostrada ? (
          <Image
            src={imagenMostrada}
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
          <Tag size={20} color="#eab308" />
          <div>
            <p style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Precio Artyom</p>
            <p style={{ fontSize: "2rem", fontWeight: 900, color: "#eab308", lineHeight: 1 }}>
              {formatPrecio(producto.precioArtyom || (producto as any).precio)}
            </p>
          </div>
        </div>

        {/* Sabores */}
        {hasSabores && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
            <span style={{ fontSize: "0.9rem", color: "#f1f5f9", fontWeight: 600 }}>Selecciona un sabor:</span>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {producto.sabores!.map((sabor, idx) => (
                <button
                  key={idx}
                  onClick={() => setSaborSeleccionado(sabor)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 8,
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    border: saborSeleccionado?.nombre === sabor.nombre ? "1px solid #0dcaf0" : "1px solid rgba(255,255,255,0.15)",
                    background: saborSeleccionado?.nombre === sabor.nombre ? "rgba(13,202,240,0.1)" : "transparent",
                    color: saborSeleccionado?.nombre === sabor.nombre ? "#0dcaf0" : "#94a3b8",
                    transition: "all 0.2s ease"
                  }}
                >
                  {sabor.nombre}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CTA WhatsApp */}
        <Link
          href={getWALink(mensajeWA)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ padding: "14px 28px", fontSize: "1rem", justifyContent: "center", marginTop: 10 }}
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
