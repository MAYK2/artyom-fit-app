"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ui/ProductCard";
import { Producto } from "@/types";
import { Search, X, RotateCcw } from "lucide-react";

interface CatalogoGridProps {
  productos: Producto[];
  categorias: string[];
}

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function CatalogoGrid({ productos, categorias }: CatalogoGridProps) {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") || searchParams.get("busqueda") || "";

  const [categoria, setCategoria] = useState("Todos");
  const [marca, setMarca] = useState("Todas");
  const [busqueda, setBusqueda] = useState(urlQuery);
  const [orden, setOrden] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Sincronizar cuando cambia la URL
  useEffect(() => {
    if (urlQuery !== undefined) {
      setBusqueda(urlQuery);
      if (urlQuery) {
        setCategoria("Todos");
        setMarca("Todas");
      }
    }
  }, [urlQuery]);

  // Lista dinámica de marcas a partir de los productos disponibles
  const marcas = useMemo(() => {
    const list = Array.from(new Set(productos.map((p) => p.marca).filter(Boolean)));
    return ["Todas", ...list.sort()];
  }, [productos]);

  // Filtrado inteligente: normaliza acentos y busca por palabras (tokens)
  const filtrados = useMemo(() => {
    let lista = productos;

    if (categoria !== "Todos") {
      lista = lista.filter((p) => p.categoria === categoria);
    }
    if (marca !== "Todas") {
      lista = lista.filter((p) => p.marca === marca);
    }

    if (busqueda.trim()) {
      const terms = normalizeText(busqueda).split(/\s+/).filter(Boolean);
      lista = lista.filter((p) => {
        const saboresText = (p.sabores || []).map((s) => s.nombre).join(" ");
        const searchable = normalizeText(
          `${p.nombre} ${p.marca || ""} ${p.categoria || ""} ${p.descripcion || ""} ${saboresText}`
        );
        return terms.every((t) => searchable.includes(t));
      });
    }

    if (orden === "asc") lista = [...lista].sort((a, b) => a.precioArtyom - b.precioArtyom);
    if (orden === "desc") lista = [...lista].sort((a, b) => b.precioArtyom - a.precioArtyom);
    return lista;
  }, [productos, categoria, marca, busqueda, orden]);

  // Total de coincidencias si se quitan filtros de categoría y marca
  const totalCoincidenciasGenerales = useMemo(() => {
    if (!busqueda.trim()) return productos.length;
    const terms = normalizeText(busqueda).split(/\s+/).filter(Boolean);
    return productos.filter((p) => {
      const saboresText = (p.sabores || []).map((s) => s.nombre).join(" ");
      const searchable = normalizeText(
        `${p.nombre} ${p.marca || ""} ${p.categoria || ""} ${p.descripcion || ""} ${saboresText}`
      );
      return terms.every((t) => searchable.includes(t));
    }).length;
  }, [productos, busqueda]);

  const limpiarFiltros = () => {
    setCategoria("Todos");
    setMarca("Todas");
    setBusqueda("");
    setOrden("");
  };

  return (
    <div>
      {/* ── BARRA DE FILTROS ── */}
      <div
        className="catalogo-filter-bar"
        style={{
          background: "rgba(2, 6, 23, 0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "12px 0",
          zIndex: 30,
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 16px", display: "flex", flexDirection: "column", gap: 10 }}>

          {/* Fila 1: Búsqueda + Selects de Marca y Orden */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                inputRef.current?.blur();
              }}
              style={{ flex: "1 1 200px", minWidth: 180, margin: 0 }}
            >
              <div className="search-input" style={{ width: "100%", maxWidth: "100%", padding: "7px 12px" }}>
                <label htmlFor="catalogo-busqueda" className="sr-only">Buscar producto</label>
                <button
                  type="submit"
                  aria-label="Buscar producto"
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    margin: 0,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    color: busqueda.trim() ? "#eab308" : "#64748b",
                    transition: "color 0.2s",
                  }}
                  title="Buscar"
                >
                  <Search size={15} />
                </button>
                <input
                  ref={inputRef}
                  id="catalogo-busqueda"
                  type="text"
                  aria-label="Buscar producto"
                  placeholder="Buscar producto, marca..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  style={{ fontSize: "0.82rem" }}
                />
                {busqueda && (
                  <button
                    type="button"
                    onClick={() => {
                      setBusqueda("");
                      inputRef.current?.focus();
                    }}
                    aria-label="Limpiar búsqueda"
                    style={{
                      background: "none",
                      border: "none",
                      padding: 2,
                      cursor: "pointer",
                      color: "#94a3b8",
                      display: "flex",
                      alignItems: "center",
                      borderRadius: 4,
                      transition: "color 0.15s",
                    }}
                    title="Limpiar búsqueda"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </form>

            {/* Select Marca */}
            <select
              id="catalogo-marca"
              aria-label="Filtrar por marca"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              style={{
                background: "#1e293b",
                border: marca !== "Todas" ? "1px solid #eab308" : "1px solid rgba(255,255,255,0.08)",
                color: marca !== "Todas" ? "#eab308" : "#94a3b8",
                borderRadius: 8,
                padding: "8px 10px",
                fontSize: "0.78rem",
                outline: "none",
                cursor: "pointer",
                fontWeight: marca !== "Todas" ? 700 : 500,
                flex: "1 1 auto",
                minWidth: 120,
              }}
            >
              {marcas.map((m) => (
                <option key={m} value={m}>
                  {m === "Todas" ? "Todas las marcas" : `Marca: ${m}`}
                </option>
              ))}
            </select>

            {/* Select Orden */}
            <select
              id="catalogo-orden"
              aria-label="Ordenar productos por precio"
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              style={{
                background: "#1e293b",
                border: orden ? "1px solid #eab308" : "1px solid rgba(255,255,255,0.08)",
                color: orden ? "#eab308" : "#94a3b8",
                borderRadius: 8,
                padding: "8px 10px",
                fontSize: "0.78rem",
                outline: "none",
                cursor: "pointer",
                fontWeight: orden ? 700 : 500,
                flex: "1 1 auto",
                minWidth: 130,
              }}
            >
              <option value="">Ordenar por precio</option>
              <option value="asc">Menor precio primero</option>
              <option value="desc">Mayor precio primero</option>
            </select>

            {/* Botón reset filtros si hay algo activo */}
            {(busqueda || categoria !== "Todos" || marca !== "Todas" || orden) && (
              <button
                onClick={limpiarFiltros}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  background: "rgba(234, 179, 8, 0.1)",
                  border: "1px solid rgba(234, 179, 8, 0.3)",
                  color: "#eab308",
                  padding: "7px 10px",
                  borderRadius: 8,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  whiteSpace: "nowrap",
                }}
                title="Limpiar todos los filtros"
              >
                <RotateCcw size={12} /> Limpiar
              </button>
            )}
          </div>

          {/* Fila 2: Categorías con scroll horizontal deslizable táctil (Swipe) */}
          <div className="categories-scroll-wrapper" style={{ position: "relative" }}>
            <div
              className="categories-scroll"
              style={{
                display: "flex",
                gap: 8,
                overflowX: "auto",
                whiteSpace: "nowrap",
                padding: "2px 0 4px 0",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
              }}
            >
              {categorias.map((cat) => {
                const active = categoria === cat;
                return (
                  <button
                    key={cat}
                    id={`filtro-categoria-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                    aria-pressed={active}
                    className={`filter-pill ${active ? "active" : ""}`}
                    onClick={() => setCategoria(cat)}
                    style={{
                      flexShrink: 0,
                      padding: "6px 14px",
                      fontSize: "0.78rem",
                      borderRadius: 999,
                      border: active ? "1px solid #eab308" : "1px solid rgba(255,255,255,0.1)",
                      background: active ? "#eab308" : "rgba(15, 23, 42, 0.7)",
                      color: active ? "#020617" : "#cbd5e1",
                      fontWeight: active ? 800 : 500,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <style>{`
          .categories-scroll::-webkit-scrollbar {
            display: none;
          }
          @media (min-width: 769px) {
            .catalogo-filter-bar {
              position: sticky;
              top: 80px;
            }
          }
          @media (max-width: 768px) {
            .catalogo-filter-bar {
              position: static !important;
            }
          }
        `}</style>
      </div>

      {/* ── GRID ── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 20px 60px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 8 }}>
          <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>
            Mostrando <span style={{ color: "#eab308", fontWeight: 700 }}>{filtrados.length}</span> producto{filtrados.length !== 1 ? "s" : ""}
            {busqueda.trim() && (
              <span> para <strong style={{ color: "#f1f5f9" }}>"{busqueda}"</strong></span>
            )}
          </p>
        </div>

        {filtrados.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            background: "rgba(15, 23, 42, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            borderRadius: 16,
            maxWidth: 600,
            margin: "0 auto",
          }}>
            <p style={{ fontSize: "3rem", marginBottom: 12 }}>🔍</p>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f1f5f9", marginBottom: 8 }}>
              Sin resultados para tu búsqueda
            </h3>
            {busqueda && (
              <p style={{ fontSize: "0.9rem", color: "#94a3b8", marginBottom: 16 }}>
                No encontramos productos que coincidan con <strong style={{ color: "#eab308" }}>"{busqueda}"</strong>
                {categoria !== "Todos" && ` en la categoría "${categoria}"`}
                {marca !== "Todas" && ` para la marca "${marca}"`}.
              </p>
            )}

            {/* Sugerencia inteligente si hay coincidencias en otras categorías */}
            {(categoria !== "Todos" || marca !== "Todas") && totalCoincidenciasGenerales > 0 ? (
              <div style={{ marginTop: 16 }}>
                <p style={{ fontSize: "0.85rem", color: "#cbd5e1", marginBottom: 12 }}>
                  ¡Encontramos <strong>{totalCoincidenciasGenerales}</strong> producto{totalCoincidenciasGenerales > 1 ? "s" : ""} coincidente{totalCoincidenciasGenerales > 1 ? "s" : ""} en otras categorías!
                </p>
                <button
                  onClick={() => {
                    setCategoria("Todos");
                    setMarca("Todas");
                  }}
                  className="btn-primary"
                  style={{ padding: "8px 20px", fontSize: "0.85rem" }}
                >
                  Buscar en todo el catálogo
                </button>
              </div>
            ) : (
              <button
                onClick={limpiarFiltros}
                className="btn-primary"
                style={{ padding: "8px 20px", fontSize: "0.85rem", marginTop: 8 }}
              >
                Ver todos los productos
              </button>
            )}
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
