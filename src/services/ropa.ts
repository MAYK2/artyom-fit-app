import ropaData from "../../data/ropa.json";

export interface ItemRopa {
  id: string;
  nombre: string;
  precio: number;
  imagen: string | null;
  categoria: string;
  stock: boolean;
  talles: string[];
  colores: string[];
  descripcion: string;
}

// Lee directamente del JSON — editá data/ropa.json para actualizar el catálogo de ropa
export function getRopa(): ItemRopa[] {
  return (ropaData as any[]).filter((p) => p.stock !== false);
}

export function getRopaPorId(id: string): ItemRopa | undefined {
  return getRopa().find((p) => p.id === id);
}

export function getCategoriasRopa(): string[] {
  const cats = new Set(getRopa().map((p) => p.categoria));
  return ["Todos", ...Array.from(cats).sort()];
}
