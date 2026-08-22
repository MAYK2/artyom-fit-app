"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ui/ProductCard";
import { Producto } from "@/types";
import { Search } from "lucide-react";

interface CatalogoGridProps {
  productos: Producto[];
  categorias: string[];
}

export default function CatalogoGrid({ productos, categorias }: CatalogoGridProps) {
  const [categoria, setCategoria] = useState("Todos");
  const [marca, setMarca] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("");
  const marcas = ["Todas", "ENA", "Star Nutrition"];

  const filtrados = useMemo(() => {
    let lista = productos;
    if (categoria !== "Todos") lista = lista.filter((p) => p.categoria === categoria);
    if (marca !== "Todas") lista = lista.filter((p) => p.marca === marca);
    if (busqueda.trim()) lista = lista.filter((p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    if (orden === "asc") lista = [...lista].sort((a, b) => a.precioArtyom - b.precioArtyom);
    if (orden === "desc") lista = [...lista].sort((a, b) => b.precioArtyom - a.precioArtyom);
    return lista;
  }, [productos, categoria, marca, busqueda, orden]);

  return (
    <div>
      {/* ── BARRA DE FILTROS ── */}
      <div style={{
        position: "sticky", top: 64, zIndex: 40,
        background: "#020617",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "14px 0",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", display: "flex", flexDirection: "column", gap: 12 }}>

          {/* Fila 1: search + orden */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <div className="search-input" style={{ flex: "1 1 200px", maxWidth: 320 }}>
              <Search size={15} color="#64748b" />
              <input
                type="text"
                placeholder="Buscar producto..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              style={{
                background: "#1e293b",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#94a3b8",
                borderRadius: 8,
                padding: "8px 12px",
                fontSize: "0.8rem",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="">Ordenar por precio</option>
              <option value="asc">Menor precio primero</option>
              <option value="desc">Mayor precio primero</option>
            </select>
          </div>

          {/* Fila 2: categorías */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: "0.7rem", color: "#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginRight: 4 }}>Categoría</span>
            {categorias.map((cat) => (
              <button
                key={cat}
                className={`filter-pill ${categoria === cat ? "active" : ""}`}
                onClick={() => setCategoria(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Fila 3: marcas */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: "0.7rem", color: "#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginRight: 4 }}>Marca</span>
            {marcas.map((m) => (
              <button
                key={m}
                className={`filter-pill ${marca === m ? "active" : ""}`}
                onClick={() => setMarca(m)}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── GRID ── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 20px 60px" }}>
        <p style={{ fontSize: "0.8rem", color: "#475569", marginBottom: 20 }}>
          <span style={{ color: "#0dcaf0", fontWeight: 700 }}>{filtrados.length}</span> producto{filtrados.length !== 1 ? "s" : ""} encontrado{filtrados.length !== 1 ? "s" : ""}
        </p>

        {filtrados.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#475569" }}>
            <p style={{ fontSize: "3rem", marginBottom: 16 }}>🔍</p>
            <p style={{ fontSize: "1rem", fontWeight: 500 }}>Sin resultados para tu búsqueda</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 16,
          }}>
            {filtrados.map((p) => (
              <ProductCard key={p.id} producto={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
