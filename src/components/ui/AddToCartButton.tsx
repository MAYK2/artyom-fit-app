"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Producto } from "@/types";

interface Props {
  producto: Producto;
}

export default function AddToCartButton({ producto }: Props) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addToCart({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precioArtyom,
      imagen: producto.imagen,
      tipo: "suplemento",
      variante: producto.sabor,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <button
      id={`btn-agregar-${producto.id}`}
      onClick={handleAdd}
      aria-label={added ? `${producto.nombre} agregado al carrito` : `Agregar ${producto.nombre} al carrito`}
      className="btn-cart"
      style={{
        width: "100%",
        marginTop: 4,
        background: added ? "rgba(34,197,94,0.15)" : "rgba(13,202,240,0.1)",
        border: `1px solid ${added ? "#22c55e" : "rgba(13,202,240,0.3)"}`,
        color: added ? "#22c55e" : "#0dcaf0",
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
        letterSpacing: "0.03em",
      }}
    >
      {added ? (
        <>
          <Check size={14} />
          Agregado ✓
        </>
      ) : (
        <>
          <ShoppingCart size={14} />
          Agregar al carrito
        </>
      )}
    </button>
  );
}
