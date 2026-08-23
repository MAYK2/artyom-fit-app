"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Suplementos", href: "/" },
  { label: "Ropa", href: "/ropa" },
  { label: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: "rgba(2,6,23,0.95)",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      backdropFilter: "blur(12px)",
    }}>
      <nav style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "0 20px",
        height: 72,
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }}>

        {/* Lado Izquierdo: Logo + Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 32, flex: 1 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0, textDecoration: "none" }}>
            <Image
              src="/logo-artyom.png"
              alt="Artyom"
              width={52}
              height={52}
              style={{ width: 52, height: 52, objectFit: "contain" }}
            />
            <span style={{
              fontFamily: "var(--font-orbitron), sans-serif",
              fontWeight: 800,
              fontSize: "1.15rem",
              letterSpacing: "0.15em",
              color: "#f1f5f9",
              textTransform: "uppercase"
            }} className="hidden sm:block">
              Artyom
            </span>
          </Link>

          <ul style={{
            display: "flex", alignItems: "center", gap: 8,
            listStyle: "none", margin: 0, padding: 0,
          }} className="nav-links-desktop">
            {navLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link href={l.href} style={{
                    padding: "8px 16px",
                    borderRadius: 8,
                    fontSize: "0.85rem",
                    fontWeight: active ? 700 : 500,
                    textDecoration: "none",
                    color: active ? "#0dcaf0" : "#94a3b8",
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

          <Link href="/carrito" aria-label="Carrito de compras" style={{
            display: "flex", alignItems: "center",
            padding: 8, color: "#94a3b8", transition: "color 0.2s",
            position: "relative",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#0dcaf0")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span style={{
                position: "absolute", top: 2, right: 2,
                background: "#0dcaf0", color: "#020617",
                borderRadius: "50%", width: 17, height: 17,
                fontSize: "0.6rem", fontWeight: 800,
                display: "flex", alignItems: "center", justifyContent: "center",
                lineHeight: 1,
              }}>{totalItems > 9 ? "9+" : totalItems}</span>
            )}
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: "#94a3b8", background: "none", border: "none", cursor: "pointer", padding: 8 }}
            className="nav-hamburger"
            aria-label="Menú"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Menú mobile */}
      {menuOpen && (
        <div style={{
          background: "#0f172a",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          padding: "16px 20px",
          display: "flex", flexDirection: "column", gap: 8,
        }}>
          {navLinks.map((l) => {
            const active = pathname === l.href;
            return (
              <Link key={l.href} href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: "12px 16px", borderRadius: 8,
                  color: active ? "#0dcaf0" : "#94a3b8",
                  background: active ? "rgba(13,202,240,0.08)" : "transparent",
                  textDecoration: "none",
                  fontSize: "1rem", fontWeight: active ? 700 : 500,
                }}
              >
                {l.label}
              </Link>
            )
          })}
        </div>
      )}

      <style>{`
        @media (min-width: 769px) { .nav-hamburger { display: none !important; } }
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-search { display: none !important; }
        }
        @media (max-width: 639px) {
          .hidden.sm\\:block { display: none !important; }
        }
      `}</style>
    </header>
  );
}
