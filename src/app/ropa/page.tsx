import { getRopa, getCategoriasRopa } from "@/services/ropa";
import RopaCard from "@/components/ui/RopaCard";

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
          Ropa <span style={{ color: "#0dcaf0" }}>Deportiva</span>
        </h1>
        <p style={{ color: "#64748b", marginTop: 12, fontSize: "0.95rem" }}>
          Performance y estilo para tus entrenamientos
        </p>
      </div>

      {/* Grilla */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 20px 80px" }}>
        {items.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#475569" }}>
            <p style={{ fontSize: "3rem", marginBottom: 16 }}>👕</p>
            <p style={{ fontWeight: 500 }}>Próximamente — estamos cargando el stock</p>
          </div>
        ) : (
          <>
            <p style={{ fontSize: "0.8rem", color: "#475569", marginBottom: 24 }}>
              <span style={{ color: "#0dcaf0", fontWeight: 700 }}>{items.length}</span> artículos disponibles
            </p>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 16,
            }}>
              {items.map((item) => (
                <RopaCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
