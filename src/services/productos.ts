import suplementosData from "../../data/suplementos.json";
import { Producto } from "@/types";

// Lee directamente del JSON — editá data/suplementos.json para actualizar el catálogo
export function getProductos(): Producto[] {
  return (suplementosData as any[])
    .filter((p) => p.stock !== false)
    .map((p) => ({
      id: p.id,
      marca: p.marca,
      nombre: p.nombre,
      precioArtyom: p.precio,
      imagen: p.imagen ?? null,
      categoria: p.categoria,
      descripcion: p.descripcion,
    }));
}

export function getProductoPorId(id: string): Producto | undefined {
  return getProductos().find((p) => p.id === id);
}

export function getCategorias(): string[] {
  const cats = new Set(getProductos().map((p) => p.categoria!));
  return ["Todos", ...Array.from(cats).sort()];
}
