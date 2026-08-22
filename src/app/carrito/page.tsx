"use client";

import { useCart, itemKey } from "@/context/CartContext";
import { ShoppingBag, Trash2, Plus, Minus, MessageCircle, ArrowLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const WA_NUMBER = "5492645085444";

function fmtPrecio(n: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function CarritoPage() {
  const { items, totalPrice, totalItems, removeFromCart, setQuantity, clearCart, buildWhatsappMessage } = useCart();

  function handlePedidoWA() {
    const msg = buildWhatsappMessage();
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  }

  // ── Carrito vacío ─────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div style={{
        minHeight: "80vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 20, padding: "40px 20px",
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: "rgba(13,202,240,0.08)", border: "1px solid rgba(13,202,240,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <ShoppingCart size={32} color="#0dcaf0" opacity={0.5} />
        </div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f1f5f9", margin: 0 }}>
          Tu carrito está vacío
        </h1>
        <p style={{ color: "#64748b", margin: 0, textAlign: "center" }}>
          Agregá suplementos o ropa para empezar tu pedido.
        </p>
        <Link href="/" style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "12px 24px", borderRadius: 10,
          background: "rgba(13,202,240,0.1)", border: "1px solid rgba(13,202,240,0.3)",
          color: "#0dcaf0", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem",
        }}>
          <ArrowLeft size={16} /> Ver suplementos
        </Link>
      </div>
    );
  }

  // ── Carrito con items ─────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 20px" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <ShoppingBag size={24} color="#0dcaf0" />
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#f1f5f9", margin: 0 }}>
            Mi carrito
          </h1>
          <span style={{
            background: "rgba(13,202,240,0.15)", border: "1px solid rgba(13,202,240,0.3)",
            color: "#0dcaf0", borderRadius: 20, padding: "2px 10px", fontSize: "0.75rem", fontWeight: 700,
          }}>
            {totalItems} {totalItems === 1 ? "ítem" : "ítems"}
          </span>
        </div>

        <button
          onClick={clearCart}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
            color: "#ef4444", borderRadius: 8, padding: "8px 14px",
            fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
          }}
        >
          <Trash2 size={14} /> Vaciar carrito
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>

        {/* Lista de items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((item) => {
            const key = itemKey(item.producto);
            const subtotal = item.producto.precio * item.cantidad;
            return (
              <div key={key} style={{
                display: "flex", alignItems: "center", gap: 16,
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 12, padding: "16px",
                transition: "border-color 0.2s",
              }}>
                {/* Imagen */}
                <div style={{
                  width: 72, height: 72, flexShrink: 0, borderRadius: 8,
                  background: "rgba(255,255,255,0.05)", position: "relative", overflow: "hidden",
                }}>
                  {item.producto.imagen ? (
                    <Image src={item.producto.imagen} alt={item.producto.nombre} fill
                      style={{ objectFit: "contain", padding: 6 }} sizes="72px" />
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: "1.8rem", opacity: 0.3 }}>
                      {item.producto.tipo === "ropa" ? "👕" : "💊"}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 700, color: "#f1f5f9", margin: 0, fontSize: "0.9rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {item.producto.nombre}
                  </p>
                  {item.producto.variante && (
                    <span style={{
                      fontSize: "0.7rem", color: "#0dcaf0", fontWeight: 600,
                      background: "rgba(13,202,240,0.1)", padding: "1px 7px", borderRadius: 4, marginTop: 2, display: "inline-block",
                    }}>
                      {item.producto.variante}
                    </span>
                  )}
                  <p style={{ color: "#64748b", margin: "4px 0 0", fontSize: "0.8rem" }}>
                    {fmtPrecio(item.producto.precio)} c/u
                  </p>
                </div>

                {/* Controles cantidad */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  <button
                    onClick={() => setQuantity(key, item.cantidad - 1)}
                    style={{
                      width: 28, height: 28, borderRadius: 6, border: "1px solid rgba(255,255,255,0.12)",
                      background: "rgba(255,255,255,0.05)", color: "#94a3b8", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <Minus size={12} />
                  </button>
                  <span style={{ minWidth: 20, textAlign: "center", fontWeight: 700, color: "#f1f5f9", fontSize: "0.9rem" }}>
                    {item.cantidad}
                  </span>
                  <button
                    onClick={() => setQuantity(key, item.cantidad + 1)}
                    style={{
                      width: 28, height: 28, borderRadius: 6, border: "1px solid rgba(13,202,240,0.3)",
                      background: "rgba(13,202,240,0.1)", color: "#0dcaf0", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <Plus size={12} />
                  </button>
                </div>

                {/* Subtotal + eliminar */}
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ fontWeight: 800, color: "#0dcaf0", margin: 0, fontSize: "0.95rem" }}>
                    {fmtPrecio(subtotal)}
                  </p>
                  <button
                    onClick={() => removeFromCart(key)}
                    style={{
                      background: "none", border: "none", color: "#475569", cursor: "pointer",
                      padding: "4px 0", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: 3, marginTop: 4,
                    }}
                  >
                    <Trash2 size={11} /> quitar
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Resumen del pedido */}
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16, padding: "24px", display: "flex", flexDirection: "column", gap: 16,
        }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#f1f5f9", margin: 0 }}>
            Resumen del pedido
          </h2>

          {/* Detalle items */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {items.map((item) => (
              <div key={itemKey(item.producto)} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                <span style={{ color: "#64748b" }}>
                  {item.cantidad}x {item.producto.nombre}
                  {item.producto.variante ? ` (${item.producto.variante})` : ""}
                </span>
                <span style={{ color: "#94a3b8", fontWeight: 600 }}>
                  {fmtPrecio(item.producto.precio * item.cantidad)}
                </span>
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: "rgba(255,255,255,0.07)" }} />

          {/* Total */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, color: "#f1f5f9", fontSize: "1rem" }}>Total</span>
            <span style={{ fontWeight: 900, color: "#0dcaf0", fontSize: "1.3rem" }}>
              {fmtPrecio(totalPrice)}
            </span>
          </div>

          {/* Info pago */}
          <div style={{
            background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)",
            borderRadius: 8, padding: "10px 12px", fontSize: "0.78rem", color: "#86efac", lineHeight: 1.5,
          }}>
            💳 Pagá por <strong>transferencia bancaria</strong> o <strong>Mercado Pago (dinero en cuenta)</strong> — sin comisiones extra.
          </div>

          {/* CTA WhatsApp */}
          <button
            onClick={handlePedidoWA}
            style={{
              width: "100%", padding: "14px", borderRadius: 12,
              background: "linear-gradient(135deg, #25D366, #128C7E)",
              border: "none", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              fontWeight: 800, fontSize: "1rem", cursor: "pointer",
              boxShadow: "0 4px 20px rgba(37,211,102,0.3)",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 6px 28px rgba(37,211,102,0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,211,102,0.3)";
            }}
          >
            <MessageCircle size={20} />
            Hacer pedido por WhatsApp
          </button>

          <Link href="/" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            color: "#64748b", textDecoration: "none", fontSize: "0.82rem",
          }}>
            <ArrowLeft size={14} /> Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
