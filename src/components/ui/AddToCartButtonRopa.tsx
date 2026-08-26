"use client";

import { useState } from "react";
import { ShoppingCart, Check, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { ItemRopa } from "@/services/ropa";

interface Props {
  item: ItemRopa;
}

export default function AddToCartButtonRopa({ item }: Props) {
  const { addToCart } = useCart();
  const [talleSeleccionado, setTalleSeleccionado] = useState<string>(
    item.talles?.[0] ?? ""
  );
  const [added, setAdded] = useState(false);
  const [showTalles, setShowTalles] = useState(false);

  const hasTalles = item.talles && item.talles.length > 0;

  function handleAdd() {
    addToCart({
      id: item.id,
      nombre: item.nombre,
      precio: item.precio,
      imagen: item.imagen,
      tipo: "ropa",
      variante: hasTalles ? talleSeleccionado : undefined,
    });
    setAdded(true);
    setShowTalles(false);
    setTimeout(() => setAdded(false), 1800);
  }

  // Si no hay múltiples talles, agregar directo
  if (!hasTalles || item.talles.length === 1) {
    return (
      <button
        onClick={handleAdd}
        style={{
          width: "100%",
          marginTop: 4,
          background: added ? "rgba(34,197,94,0.15)" : "rgba(13,202,240,0.1)",
          border: `1px solid ${added ? "#22c55e" : "rgba(13,202,240,0.3)"}`,
          color: added ? "#22c55e" : "#eab308",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          padding: "8px 12px",
          borderRadius: 8,
          fontSize: "0.8rem",
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.25s",
        }}
      >
        {added ? <><Check size={14} /> Agregado ✓</> : <><ShoppingCart size={14} /> Agregar al carrito</>}
      </button>
    );
  }

  // Con selector de talle
  return (
    <div style={{ marginTop: 4, width: "100%" }}>
      {showTalles ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {/* Selector de talles */}
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {item.talles.map((t) => (
              <button
                key={t}
                onClick={() => setTalleSeleccionado(t)}
                style={{
                  padding: "4px 10px",
                  borderRadius: 6,
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: `1px solid ${talleSeleccionado === t ? "#eab308" : "rgba(255,255,255,0.2)"}`,
                  background: talleSeleccionado === t ? "rgba(13,202,240,0.15)" : "transparent",
                  color: talleSeleccionado === t ? "#eab308" : "#94a3b8",
                  transition: "all 0.15s",
                }}
              >
                {t}
              </button>
            ))}
          </div>
          {/* Botón confirmar */}
          <button
            onClick={handleAdd}
            style={{
              width: "100%",
              background: "rgba(13,202,240,0.15)",
              border: "1px solid rgba(13,202,240,0.4)",
              color: "#eab308",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: "8px 12px",
              borderRadius: 8,
              fontSize: "0.8rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <ShoppingCart size={14} />
            Agregar talle {talleSeleccionado}
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowTalles(true)}
          style={{
            width: "100%",
            background: added ? "rgba(34,197,94,0.15)" : "rgba(13,202,240,0.1)",
            border: `1px solid ${added ? "#22c55e" : "rgba(13,202,240,0.3)"}`,
            color: added ? "#22c55e" : "#eab308",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "8px 12px",
            borderRadius: 8,
            fontSize: "0.8rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.25s",
          }}
        >
          {added ? (
            <><Check size={14} /> Agregado ✓</>
          ) : (
            <><ShoppingCart size={14} /> Agregar al carrito <ChevronDown size={12} /></>
          )}
        </button>
      )}
    </div>
  );
}
