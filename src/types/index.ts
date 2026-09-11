// Producto de suplementos
export interface Producto {
  id: string;
  marca: "ENA" | "Star Nutrition" | "Xtrenght Nutrition" | string;
  nombre: string;
  precioArtyom: number;
  categoria?: string;
  imagen?: string;
  sabor?: string; // Sabor por defecto o único
  sabores?: { nombre: string; imagen: string | null }[]; // Lista de variantes de sabor
  peso?: string;
  stock?: boolean | number; // boolean en suplementos.json
  descripcion?: string;
}

// Variante para indumentaria (preparado para el futuro)
export interface VarianteIndumentaria {
  id: string;
  talle: "XS" | "S" | "M" | "L" | "XL" | "XXL";
  color: string;
  stock: number;
}

// Producto unificado para el carrito (suplementos + ropa)
export interface CartProduct {
  id: string;
  nombre: string;
  precio: number;
  imagen?: string | null;
  tipo: "suplemento" | "ropa";
  variante?: string; // talle (ropa) o sabor (suplemento)
}

// Ítem del carrito
export interface CartItem {
  producto: CartProduct;
  cantidad: number;
}
