"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X, Search, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Suplementos", href: "/#catalogo" },
  { label: "Ropa", href: "/ropa" },
  { label: "Promos", href: "/#promos" },
  { label: "Contacto", href: "https://wa.me/5492645085444?text=Hola%2C+quiero+hacer+una+consulta" },
];

interface SearchResultItem {
  id: string;
  nombre: string;
  marca?: string;
  categoria: string;
  precio: number;
  imagen: string | null;
  tipo: "suplemento" | "ropa";
  url: string;
}

function formatARS(num: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(num);
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems } = useCart();
  const headerRef = useRef<HTMLElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  // Estados del buscador
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Cerrar menú y búsqueda al cambiar de ruta
  useEffect(() => {
    setMenuOpen(false);
    setMobileSearchOpen(false);
    setIsDropdownOpen(false);
  }, [pathname]);

  // Cerrar al hacer scroll, al presionar Escape o al redimensionar la ventana
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setMobileSearchOpen(false);
        setIsDropdownOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
        setMobileSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Cerrar menú o dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (headerRef.current && !headerRef.current.contains(target)) {
        setMenuOpen(false);
        setMobileSearchOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Búsqueda en vivo (Live search / autocomplete)
  useEffect(() => {
    const q = searchQuery.trim();
    if (q.length < 2) {
      setSearchResults([]);
      setIsDropdownOpen(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data.results || []);
          setIsDropdownOpen(true);
        }
      } catch (err) {
        console.error("Error buscando productos:", err);
      } finally {
        setIsSearching(false);
      }
    }, 180);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Ejecutar búsqueda y redirigir
  const executeSearch = (rawQuery?: string) => {
    const q = (rawQuery !== undefined ? rawQuery : searchQuery).trim();
    if (!q) {
      desktopInputRef.current?.focus();
      return;
    }

    setIsDropdownOpen(false);
    setMenuOpen(false);
    setMobileSearchOpen(false);

    if (pathname === "/") {
      const el = document.getElementById("catalogo");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      router.push(`/?q=${encodeURIComponent(q)}#catalogo`);
    } else {
      router.push(`/?q=${encodeURIComponent(q)}#catalogo`);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch();
  };

  const toggleMobileSearch = () => {
    const nextState = !mobileSearchOpen;
    setMobileSearchOpen(nextState);
    if (nextState) {
      setMenuOpen(false);
      setTimeout(() => {
        mobileInputRef.current?.focus();
      }, 100);
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: "rgba(2,6,23,0.95)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Announcement Bar */}
        <div style={{
          background: "linear-gradient(90deg, #1e3a8a 0%, #eab308 50%, #1e3a8a 100%)",
          color: "#020617",
          textAlign: "center",
          padding: "6px 20px",
          fontSize: "0.75rem",
          fontWeight: 800,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}>
          🚀 ¡ENVÍO GRATIS A RIVADAVIA, SANTA LUCIA Y CAPITAL EN COMPRAS MAYORES A $25.000! 🚀
        </div>

        <nav style={{
          maxWidth: 1280, margin: "0 auto",
          padding: "0 20px",
          height: 80,
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}>

          {/* Lado Izquierdo: Logo + Links */}
          <div style={{ display: "flex", alignItems: "center", gap: 32, flex: 1 }}>
            <Link
              href="/"
              onClick={() => {
                setMenuOpen(false);
                setMobileSearchOpen(false);
              }}
              style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0, textDecoration: "none" }}
            >
              <Image
                src="/logo-artyom.png"
                alt="Artyom"
                width={64}
                height={64}
                style={{ width: 64, height: 64, objectFit: "contain" }}
                priority
              />
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }} className="hidden sm:flex">
                <span style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontWeight: 600,
                  fontSize: "1.7rem",
                  letterSpacing: "0.1em",
                  background: "linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}>
                  ARTYOM
                </span>
              </div>
            </Link>

            <ul style={{
              display: "flex", alignItems: "center", gap: 8,
              listStyle: "none", margin: 0, padding: 0,
            }} className="nav-links-desktop">
              {navLinks.map((l) => {
                const active = pathname === l.href;
                return (
                  <li key={l.href}>
                    <Link href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} style={{
                      padding: "8px 16px",
                      borderRadius: 8,
                      fontSize: "0.85rem",
                      fontWeight: active ? 700 : 500,
                      textDecoration: "none",
                      color: active ? "#eab308" : "#94a3b8",
                      background: active ? "rgba(13,202,240,0.08)" : "transparent",
                      transition: "all 0.18s",
                      display: "block",
                    }}>
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Lado Derecho: Buscador Desktop + Carrito + Lupita Mobile + Hamburguesa */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            
            {/* Buscador Desktop con Autocompletado y botón interactivo */}
            <div ref={searchContainerRef} className="desktop-search-container" style={{ position: "relative" }}>
              <form
                onSubmit={handleSearchSubmit}
                className="search-input nav-search"
                style={{ maxWidth: 220, position: "relative" }}
              >
                <label htmlFor="navbar-search" className="sr-only">Buscar productos</label>
                <button
                  type="submit"
                  aria-label="Buscar en la tienda"
                  title="Buscar"
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    margin: 0,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    color: searchQuery.trim() ? "#eab308" : "#64748b",
                    transition: "color 0.2s, transform 0.1s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#eab308")}
                  onMouseLeave={(e) => {
                    if (!searchQuery.trim()) e.currentTarget.style.color = "#64748b";
                  }}
                >
                  <Search size={15} />
                </button>
                <input
                  ref={desktopInputRef}
                  id="navbar-search"
                  type="text"
                  aria-label="Buscar productos"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    if (searchResults.length > 0) setIsDropdownOpen(true);
                  }}
                  autoComplete="off"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSearchResults([]);
                      setIsDropdownOpen(false);
                      desktopInputRef.current?.focus();
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
                    title="Limpiar"
                  >
                    <X size={14} />
                  </button>
                )}
              </form>

              {/* Menú desplegable con resultados instantáneos */}
              {isDropdownOpen && searchQuery.trim().length >= 2 && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    width: 340,
                    background: "rgba(15, 23, 42, 0.98)",
                    border: "1px solid rgba(234, 179, 8, 0.3)",
                    borderRadius: 12,
                    boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(234, 179, 8, 0.1)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    zIndex: 100,
                    overflow: "hidden",
                    animation: "fadeInDropdown 0.18s ease-out",
                  }}
                >
                  <div style={{
                    padding: "10px 14px",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                    <span style={{ fontSize: "0.72rem", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Resultados
                    </span>
                    {isSearching ? (
                      <span style={{ fontSize: "0.72rem", color: "#eab308" }}>Buscando...</span>
                    ) : (
                      <span style={{ fontSize: "0.72rem", color: "#64748b" }}>{searchResults.length} encontradas</span>
                    )}
                  </div>

                  {searchResults.length === 0 ? (
                    !isSearching && (
                      <div style={{ padding: "24px 16px", textAlign: "center", color: "#94a3b8" }}>
                        <p style={{ fontSize: "1.5rem", margin: "0 0 6px" }}>🔍</p>
                        <p style={{ fontSize: "0.85rem", margin: 0, fontWeight: 500, color: "#f1f5f9" }}>
                          Sin resultados para "{searchQuery}"
                        </p>
                        <p style={{ fontSize: "0.75rem", color: "#64748b", margin: "4px 0 0" }}>
                          Probá con "creatina", "whey", "star" o "remera"
                        </p>
                      </div>
                    )
                  ) : (
                    <div style={{ maxHeight: 300, overflowY: "auto", padding: "6px" }}>
                      {searchResults.map((item) => (
                        <Link
                          key={`${item.tipo}-${item.id}`}
                          href={item.url}
                          onClick={() => {
                            setIsDropdownOpen(false);
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            padding: "8px 10px",
                            borderRadius: 8,
                            textDecoration: "none",
                            transition: "background 0.15s",
                          }}
                          className="search-result-item"
                        >
                          <div style={{
                            width: 38,
                            height: 38,
                            borderRadius: 6,
                            background: "#020617",
                            position: "relative",
                            flexShrink: 0,
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid rgba(255,255,255,0.06)",
                          }}>
                            {item.imagen ? (
                              <Image
                                src={item.imagen}
                                alt={item.nombre}
                                fill
                                sizes="38px"
                                style={{ objectFit: "contain", padding: 3 }}
                              />
                            ) : (
                              <span style={{ fontSize: "1.1rem" }}>💊</span>
                            )}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{
                              margin: 0,
                              fontSize: "0.82rem",
                              fontWeight: 600,
                              color: "#f8fafc",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}>
                              {item.nombre}
                            </p>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                              <span style={{ fontSize: "0.72rem", color: "#eab308", fontWeight: 700 }}>
                                {formatARS(item.precio)}
                              </span>
                              <span style={{ fontSize: "0.65rem", color: "#64748b" }}>•</span>
                              <span style={{ fontSize: "0.68rem", color: "#94a3b8" }}>
                                {item.marca || item.categoria}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {searchResults.length > 0 && (
                    <button
                      type="button"
                      onClick={() => executeSearch()}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        background: "rgba(234, 179, 8, 0.08)",
                        border: "none",
                        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                        color: "#eab308",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        textAlign: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(234, 179, 8, 0.16)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(234, 179, 8, 0.08)")}
                    >
                      Ver en el catálogo <ArrowRight size={13} />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Botón lupa para mobile (abre el buscador móvil) */}
            <button
              onClick={toggleMobileSearch}
              className="mobile-search-btn"
              style={{
                color: mobileSearchOpen ? "#eab308" : "#94a3b8",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 8,
                display: "flex",
                alignItems: "center",
                transition: "color 0.2s",
              }}
              aria-label="Abrir buscador"
              aria-expanded={mobileSearchOpen}
            >
              <Search size={22} />
            </button>

            {/* Carrito */}
            <Link
              href="/carrito"
              onClick={() => {
                setMenuOpen(false);
                setMobileSearchOpen(false);
              }}
              aria-label="Carrito de compras"
              style={{
                display: "flex", alignItems: "center",
                padding: 8, color: "#94a3b8", transition: "color 0.2s",
                position: "relative",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#eab308")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span style={{
                  position: "absolute", top: 2, right: 2,
                  background: "#eab308", color: "#020617",
                  borderRadius: "50%", width: 17, height: 17,
                  fontSize: "0.6rem", fontWeight: 800,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  lineHeight: 1,
                }}>{totalItems > 9 ? "9+" : totalItems}</span>
              )}
            </Link>

            {/* Botón Menú Hamburguesa */}
            <button
              id="nav-menu-button"
              onClick={() => {
                setMenuOpen(!menuOpen);
                setMobileSearchOpen(false);
              }}
              style={{ color: "#94a3b8", background: "none", border: "none", cursor: "pointer", padding: 8 }}
              className="nav-hamburger"
              aria-label="Menú"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Barra de búsqueda expandible en Mobile */}
        {mobileSearchOpen && (
          <div
            className="mobile-search-bar"
            style={{
              background: "#0b1329",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              borderBottom: "1px solid rgba(234, 179, 8, 0.25)",
              padding: "12px 20px",
              animation: "mobileMenuSlideDown 0.2s ease-out",
            }}
          >
            <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div className="search-input" style={{ flex: 1, maxWidth: "100%", background: "#1e293b" }}>
                <button
                  type="submit"
                  aria-label="Buscar"
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    color: searchQuery.trim() ? "#eab308" : "#64748b",
                  }}
                >
                  <Search size={16} />
                </button>
                <input
                  ref={mobileInputRef}
                  type="text"
                  placeholder="Buscar productos, marcas, suplementos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: "100%" }}
                  autoComplete="off"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    style={{ background: "none", border: "none", color: "#94a3b8", padding: 2, cursor: "pointer" }}
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="btn-primary"
                style={{ padding: "8px 14px", fontSize: "0.85rem", whiteSpace: "nowrap" }}
              >
                Buscar
              </button>
            </form>

            {/* Resultados rápidos en mobile */}
            {searchResults.length > 0 && searchQuery.trim().length >= 2 && (
              <div style={{ marginTop: 12, maxHeight: 220, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
                {searchResults.slice(0, 4).map((item) => (
                  <Link
                    key={`mob-${item.tipo}-${item.id}`}
                    href={item.url}
                    onClick={() => {
                      setMobileSearchOpen(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "8px 10px",
                      background: "rgba(255, 255, 255, 0.04)",
                      borderRadius: 8,
                      textDecoration: "none",
                    }}
                  >
                    <span style={{ fontSize: "0.8rem", color: "#f1f5f9", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.nombre}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "#eab308", fontWeight: 700 }}>
                      {formatARS(item.precio)}
                    </span>
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={() => executeSearch()}
                  style={{
                    background: "rgba(234, 179, 8, 0.1)",
                    border: "none",
                    color: "#eab308",
                    padding: "8px",
                    borderRadius: 6,
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    textAlign: "center",
                    marginTop: 4,
                  }}
                >
                  Ver todos los resultados en el catálogo →
                </button>
              </div>
            )}
          </div>
        )}

        {/* Menú mobile */}
        {menuOpen && (
          <div
            id="mobile-nav-menu"
            style={{
              background: "#0f172a",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              padding: "16px 20px",
              display: "flex", flexDirection: "column", gap: 12,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)",
              animation: "mobileMenuSlideDown 0.2s ease-out",
            }}
          >
            {/* Buscador dentro del menú móvil */}
            <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <div className="search-input" style={{ flex: 1, background: "#1e293b", maxWidth: "100%" }}>
                <button
                  type="submit"
                  aria-label="Buscar"
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    color: searchQuery.trim() ? "#eab308" : "#64748b",
                  }}
                >
                  <Search size={15} />
                </button>
                <input
                  type="text"
                  placeholder="Buscar en el catálogo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: "100%" }}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    style={{ background: "none", border: "none", color: "#94a3b8", padding: 2, cursor: "pointer" }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="btn-primary"
                style={{ padding: "8px 12px", fontSize: "0.8rem", whiteSpace: "nowrap" }}
              >
                Ir
              </button>
            </form>

            {navLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <Link key={l.href} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    padding: "12px 16px", borderRadius: 8,
                    color: active ? "#eab308" : "#94a3b8",
                    background: active ? "rgba(13,202,240,0.08)" : "transparent",
                    textDecoration: "none",
                    fontSize: "1rem", fontWeight: active ? 700 : 500,
                    transition: "all 0.15s ease-in-out",
                  }}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        )}

        <style>{`
          @keyframes mobileMenuSlideDown {
            from {
              opacity: 0;
              transform: translateY(-8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fadeInDropdown {
            from {
              opacity: 0;
              transform: translateY(-6px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .search-result-item:hover {
            background: rgba(234, 179, 8, 0.12) !important;
          }
          @media (min-width: 769px) {
            .nav-hamburger { display: none !important; }
            .nav-backdrop { display: none !important; }
            .mobile-search-btn { display: none !important; }
            .mobile-search-bar { display: none !important; }
          }
          @media (max-width: 768px) {
            .nav-links-desktop { display: none !important; }
            .desktop-search-container { display: none !important; }
          }
          @media (max-width: 639px) {
            .hidden.sm\\:block { display: none !important; }
          }
        `}</style>
      </header>

      {/* Backdrop overlay para mobile cuando el menú está abierto */}
      {(menuOpen || mobileSearchOpen) && (
        <div
          className="nav-backdrop"
          onClick={() => {
            setMenuOpen(false);
            setMobileSearchOpen(false);
          }}
          aria-hidden="true"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 40,
            background: "rgba(2, 6, 23, 0.65)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            animation: "mobileBackdropFadeIn 0.2s ease-out",
          }}
        />
      )}
    </>
  );
}
