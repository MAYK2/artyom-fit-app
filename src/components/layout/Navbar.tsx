"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Suplementos", href: "/#catalogo" },
  { label: "Ropa", href: "/ropa" },
  { label: "Promos", href: "/#promos" },
  { label: "Contacto", href: "https://wa.me/5492645085444?text=Hola%2C+quiero+hacer+una+consulta" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();
  const headerRef = useRef<HTMLElement>(null);

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Cerrar menú al hacer scroll, al presionar Escape o al redimensionar la ventana
  useEffect(() => {
    if (!menuOpen) return;

    const handleScroll = () => {
      setMenuOpen(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

  // Cerrar menú al hacer clic fuera del header
  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [menuOpen]);

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
              onClick={() => setMenuOpen(false)}
              style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0, textDecoration: "none" }}
            >
              <Image
                src="/logo-artyom.png"
                alt="Artyom"
                width={64}
                height={64}
                style={{ width: 64, height: 64, objectFit: "contain" }}
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

          {/* Lado Derecho: Buscador + Carrito + Hamburguesa */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div className="search-input nav-search" style={{ maxWidth: 200 }}>
              <label htmlFor="navbar-search" className="sr-only">Buscar productos</label>
              <Search size={14} color="#64748b" />
              <input id="navbar-search" type="text" aria-label="Buscar productos" placeholder="Buscar..." />
            </div>

            <Link
              href="/carrito"
              onClick={() => setMenuOpen(false)}
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

            <button
              id="nav-menu-button"
              onClick={() => setMenuOpen(!menuOpen)}
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

        {/* Menú mobile */}
        {menuOpen && (
          <div
            id="mobile-nav-menu"
            style={{
              background: "#0f172a",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              padding: "16px 20px",
              display: "flex", flexDirection: "column", gap: 8,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)",
              animation: "mobileMenuSlideDown 0.2s ease-out",
            }}
          >
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
          @media (min-width: 769px) {
            .nav-hamburger { display: none !important; }
            .nav-backdrop { display: none !important; }
          }
          @media (max-width: 768px) {
            .nav-links-desktop { display: none !important; }
            .nav-search { display: none !important; }
          }
          @media (max-width: 639px) {
            .hidden.sm\\:block { display: none !important; }
          }
        `}</style>
      </header>

      {/* Backdrop overlay para mobile cuando el menú está abierto */}
      {menuOpen && (
        <div
          className="nav-backdrop"
          onClick={() => setMenuOpen(false)}
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
