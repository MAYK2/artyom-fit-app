import { getRopa, getCategoriasRopa } from "@/services/ropa";
import RopaCard from "@/components/ui/RopaCard";
import RopaCatalog from "@/components/ui/RopaCatalog";

export const metadata = {
  title: "Ropa Deportiva | Artyom",
  description: "Indumentaria deportiva de alta performance — remeras dry fit, shorts y más.",
};

export default function RopaPage() {
  const items = getRopa();
  const categorias = getCategoriasRopa();

  return (
    <div style={{ minHeight: "100vh", background: "#020617" }}>
      {/* Header de sección */}
      <div style={{
        background: "linear-gradient(160deg, #020617 0%, #0f172a 60%, #020617 100%)",
        padding: "60px 20px 40px",
        textAlign: "center",
      }}>
        <span className="chip" style={{ marginBottom: 16, display: "inline-block" }}>
          👕 Indumentaria deportiva
        </span>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, color: "#f1f5f9", marginTop: 12 }}>
          Ropa <span style={{ color: "#eab308" }}>Deportiva</span>
        </h1>
        <p style={{ color: "#64748b", marginTop: 12, fontSize: "0.95rem" }}>
          Performance y estilo para tus entrenamientos
        </p>
      </div>

      {/* Catálogo con Filtros */}
      <RopaCatalog items={items} />
    </div>
  );
}
