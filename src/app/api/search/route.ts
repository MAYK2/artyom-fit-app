import { NextResponse } from "next/server";
import { getProductos } from "@/services/productos";
import { getRopa } from "@/services/ropa";

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";

  if (!q.trim()) {
    return NextResponse.json({ results: [], total: 0 });
  }

  const terms = normalize(q).split(/\s+/).filter(Boolean);

  const suplementos = getProductos();
  const ropa = getRopa();

  // Buscar en suplementos
  const matchedSuplementos = suplementos
    .filter((p) => {
      const saboresText = (p.sabores || []).map((s) => s.nombre).join(" ");
      const fullText = normalize(
        `${p.nombre} ${p.marca || ""} ${p.categoria || ""} ${p.descripcion || ""} ${saboresText}`
      );
      return terms.every((term) => fullText.includes(term));
    })
    .map((p) => ({
      id: p.id,
      nombre: p.nombre,
      marca: p.marca,
      categoria: p.categoria || "Suplemento",
      precio: p.precioArtyom,
      imagen: p.imagen || null,
      tipo: "suplemento" as const,
      url: `/productos/${p.id}`,
    }));

  // Buscar en indumentaria
  const matchedRopa = ropa
    .filter((item) => {
      const fullText = normalize(
        `${item.nombre} ${item.categoria || ""} ${item.genero || ""} ${item.descripcion || ""}`
      );
      return terms.every((term) => fullText.includes(term));
    })
    .map((item) => ({
      id: item.id,
      nombre: item.nombre,
      marca: "Artyom Wear",
      categoria: item.categoria || "Indumentaria",
      precio: item.precio,
      imagen: item.imagen || null,
      tipo: "ropa" as const,
      url: `/ropa`,
    }));

  const allMatches = [...matchedSuplementos, ...matchedRopa];

  // Ordenar por relevancia: coincidencias exactas en el nombre primero
  const qNorm = normalize(q.trim());
  allMatches.sort((a, b) => {
    const aName = normalize(a.nombre);
    const bName = normalize(b.nombre);
    const aStarts = aName.startsWith(qNorm);
    const bStarts = bName.startsWith(qNorm);
    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;

    const aContains = aName.includes(qNorm);
    const bContains = bName.includes(qNorm);
    if (aContains && !bContains) return -1;
    if (!aContains && bContains) return 1;

    return 0;
  });

  return NextResponse.json({
    results: allMatches.slice(0, 8),
    total: allMatches.length,
  });
}
