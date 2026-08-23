import Hero from "@/components/layout/Hero";
import { getProductos, getCategorias } from "@/services/productos";
import CatalogoGrid from "@/components/ui/CatalogoGrid";

export default function HomePage() {
  const productos = getProductos();
  const categorias = getCategorias();

  return (
    <>
      <Hero />

      {/* Sección catálogo */}
      <section id="catalogo" style={{ background: "#020617" }}>
        <div className="max-w-7xl mx-auto px-4 pt-12 pb-4 text-center">
          <h2 className="text-3xl font-black mb-2" style={{ color: "#f1f5f9" }}>
            Nuestro <span style={{ color: "#0dcaf0" }}>Catálogo</span>
          </h2>
          <div className="cyan-line mt-3 mb-1" />
        </div>
        <CatalogoGrid productos={productos} categorias={categorias} />
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
