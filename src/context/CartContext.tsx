"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  ReactNode,
} from "react";
import { CartItem, CartProduct } from "@/types";

// ─── Helpers ────────────────────────────────────────────────────────────────

function itemKey(p: CartProduct) {
  return `${p.id}__${p.variante ?? ""}`;
}

function fmtPrecio(n: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
}

// ─── Reducer ────────────────────────────────────────────────────────────────

type Action =
  | { type: "ADD"; producto: CartProduct }
  | { type: "REMOVE"; key: string }
  | { type: "SET_QTY"; key: string; cantidad: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] };

function reducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case "ADD": {
      const key = itemKey(action.producto);
      const idx = state.findIndex((i) => itemKey(i.producto) === key);
      if (idx >= 0) {
        return state.map((i, k) =>
          k === idx ? { ...i, cantidad: i.cantidad + 1 } : i
        );
      }
      return [...state, { producto: action.producto, cantidad: 1 }];
    }
    case "REMOVE":
      return state.filter((i) => itemKey(i.producto) !== action.key);
    case "SET_QTY":
      if (action.cantidad <= 0)
        return state.filter((i) => itemKey(i.producto) !== action.key);
      return state.map((i) =>
        itemKey(i.producto) === action.key
          ? { ...i, cantidad: action.cantidad }
          : i
      );
    case "CLEAR":
      return [];
    case "HYDRATE":
      return action.items;
    default:
      return state;
  }
}

// ─── Context ────────────────────────────────────────────────────────────────

interface CartCtx {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (p: CartProduct) => void;
  removeFromCart: (key: string) => void;
  setQuantity: (key: string, qty: number) => void;
  clearCart: () => void;
  buildWhatsappMessage: () => string;
}

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, []);

  // Hidratación desde localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("artyom-cart");
      if (raw) dispatch({ type: "HYDRATE", items: JSON.parse(raw) });
    } catch {}
  }, []);

  // Persistencia
  useEffect(() => {
    localStorage.setItem("artyom-cart", JSON.stringify(items));
  }, [items]);

  const totalItems = items.reduce((s, i) => s + i.cantidad, 0);
  const totalPrice = items.reduce(
    (s, i) => s + i.producto.precio * i.cantidad,
    0
  );

  function addToCart(p: CartProduct) {
    dispatch({ type: "ADD", producto: p });
  }

  function removeFromCart(key: string) {
    dispatch({ type: "REMOVE", key });
  }

  function setQuantity(key: string, qty: number) {
    dispatch({ type: "SET_QTY", key, cantidad: qty });
  }

  function clearCart() {
    dispatch({ type: "CLEAR" });
  }

  function buildWhatsappMessage() {
    const lineas = items.map((i) => {
      const v = i.producto.variante ? ` (${i.producto.variante})` : "";
      return `• ${i.cantidad}x ${i.producto.nombre}${v} — ${fmtPrecio(
        i.producto.precio * i.cantidad
      )}`;
    });
    return [
      "🛒 *Pedido Artyom*",
      "─────────────────────",
      ...lineas,
      "─────────────────────",
      `💰 *Total: ${fmtPrecio(totalPrice)}*`,
      "",
      "Quiero coordinar el pago por transferencia 💳",
    ].join("\n");
  }

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        setQuantity,
        clearCart,
        buildWhatsappMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}

export { itemKey };
