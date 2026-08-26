import Hero from "@/components/layout/Hero";
import { getProductos, getCategorias } from "@/services/productos";
import { getRopa } from "@/services/ropa";
import CatalogoGrid from "@/components/ui/CatalogoGrid";
import RopaCard from "@/components/ui/RopaCard";
import Link from "next/link";

export default function HomePage() {
  const productos = getProductos();
  const categorias = getCategorias();

  return (
    <>
      <Hero />

      {/* Sección Suplementos */}
      <section id="catalogo" style={{ background: "#020617" }}>
        <div className="max-w-7xl mx-auto px-4 pt-12 pb-4 text-center">
          <h2 className="text-3xl font-black mb-2" style={{ color: "#f1f5f9" }}>
            Suplementos <span style={{ color: "#0dcaf0" }}>Deportivos</span>
          </h2>
          <div className="cyan-line mt-3 mb-1" />
        </div>
        <CatalogoGrid productos={productos} categorias={categorias} />
      </section>

      {/* Sección Ropa Destacada */}
      <section style={{ background: "#0f172a", borderTop: "1px solid rgba(13,202,240,0.1)", paddingBottom: "80px" }}>
        <div className="max-w-7xl mx-auto px-4 pt-16 pb-8 text-center">
          <h2 className="text-3xl font-black mb-2" style={{ color: "#f1f5f9" }}>
            Indumentaria <span style={{ color: "#0dcaf0" }}>Premium</span>
          </h2>
          <div className="cyan-line mt-3 mb-8" />
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 16,
            maxWidth: 1280,
            margin: "0 auto",
            textAlign: "left"
          }}>
            {getRopa().slice(0, 5).map((item) => (
              <RopaCard key={item.id} item={item} />
            ))}
          </div>

          <div style={{ marginTop: 40 }}>
            <Link href="/ropa" className="btn-primary" style={{ padding: "12px 32px", fontSize: "1.1rem" }}>
              Ver toda la Ropa
            </Link>
          </div>
        </div>
      </section>

      {/* Footer mínimo */}
      <footer
        className="text-center py-8 text-sm"
        style={{ borderTop: "1px solid #1e3a4a", color: "#475569" }}
      >
        © 2026 Artyom Suplementos · Todos los derechos reservados
      </footer>
    </>
  );
}
