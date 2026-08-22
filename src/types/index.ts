// Producto de suplementos
export interface Producto {
  id: string;
  marca: "ENA" | "Star Nutrition" | "Xtrenght Nutrition" | string;
  nombre: string;
  precioArtyom: number;
  categoria?: string;
  imagen?: string;
  sabor?: string;
  peso?: string;
  stock?: number;
  descripcion?: string;
}

// Variante para indumentaria (preparado para el futuro)
export interface VarianteIndumentaria {
  id: string;
  talle: "XS" | "S" | "M" | "L" | "XL" | "XXL";
  color: string;
  stock: number;
}

// Ítem del carrito
export interface CartItem {
  producto: Producto;
  cantidad: number;
}
