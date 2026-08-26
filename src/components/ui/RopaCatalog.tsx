"use client";

import { useState } from "react";
import { ItemRopa } from "@/services/ropa";
import RopaCard from "@/components/ui/RopaCard";

interface Props {
  items: ItemRopa[];
}

export default function RopaCatalog({ items }: Props) {
  const [categoria, setCategoria] = useState<string>("Todos");
  const [genero, setGenero] = useState<string>("Todos");

  // Get unique categories and genders for the filters
  const categorias = ["Todos", ...Array.from(new Set(items.map(i => i.categoria)))];
  const generos = ["Todos", "Hombre", "Mujer", "Unisex"];

  const filteredItems = items.filter(item => {
    const matchCat = categoria === "Todos" || item.categoria === categoria;
    const matchGen = genero === "Todos" || item.genero === genero;
    return matchCat && matchGen;
  });

  return (
    <div style={{
      maxWidth: 1400, margin: "0 auto", padding: "32px 20px 80px",
      display: "flex", gap: 32, flexDirection: "row", flexWrap: "wrap",
    }}>
      {/* Sidebar Filters */}
      <aside style={{
        flex: "0 0 240px",
        display: "flex", flexDirection: "column", gap: 24,
      }}>
        <div style={{ background: "rgba(15,23,42,0.6)", padding: 20, borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)" }}>
          <h3 style={{ color: "#f8fafc", fontSize: "1.1rem", fontWeight: 700, marginBottom: 16 }}>Filtros</h3>
          
          <div style={{ marginBottom: 20 }}>
            <h4 style={{ color: "#94a3b8", fontSize: "0.85rem", fontWeight: 600, marginBottom: 12, textTransform: "uppercase" }}>Categoría</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {categorias.map(cat => (
                <label key={cat} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", color: categoria === cat ? "#eab308" : "#cbd5e1" }}>
                  <input type="radio" name="categoria" checked={categoria === cat} onChange={() => setCategoria(cat)} style={{ accentColor: "#eab308" }} />
                  <span style={{ fontSize: "0.9rem" }}>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ color: "#94a3b8", fontSize: "0.85rem", fontWeight: 600, marginBottom: 12, textTransform: "uppercase" }}>Género</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {generos.map(gen => (
                <label key={gen} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", color: genero === gen ? "#eab308" : "#cbd5e1" }}>
                  <input type="radio" name="genero" checked={genero === gen} onChange={() => setGenero(gen)} style={{ accentColor: "#eab308" }} />
                  <span style={{ fontSize: "0.9rem" }}>{gen}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Product Grid */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {filteredItems.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#475569", background: "rgba(15,23,42,0.4)", borderRadius: 12 }}>
            <p style={{ fontSize: "3rem", marginBottom: 16 }}>👕</p>
            <p style={{ fontWeight: 500 }}>No hay productos para esta selección</p>
          </div>
        ) : (
          <>
            <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: 20 }}>
              Mostrando <strong style={{ color: "#eab308" }}>{filteredItems.length}</strong> artículos
            </p>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 16,
            }}>
              {filteredItems.map((item) => (
                <RopaCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}
      </div>
      
      {/* Estilos responsive básicos para Sidebar */}
      <style>{`
        @media (max-width: 768px) {
          aside { flex: 1 1 100% !important; }
        }
      `}</style>
    </div>
  );
}
