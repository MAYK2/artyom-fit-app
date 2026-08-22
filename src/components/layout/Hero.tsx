import Link from "next/link";
import { ArrowRight, Zap, Shield, Truck } from "lucide-react";

const beneficios = [
  { icon: Zap,    texto: "Productos 100% originales" },
  { icon: Shield, texto: "Pagos seguros" },
  { icon: Truck,  texto: "Envíos a todo el país" },
];

export default function Hero() {
  return (
    <section
      style={{
        background: "linear-gradient(160deg, #020617 0%, #0f172a 55%, #020617 100%)",
        paddingTop: "clamp(80px, 15vw, 140px)",
        paddingBottom: "clamp(60px, 10vw, 100px)",
        paddingInline: "1rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow central */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 700, height: 400,
        background: "radial-gradient(ellipse, rgba(13,202,240,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative" }}>
        {/* Tagline pill */}
        <span className="chip" style={{ marginBottom: 24, display: "inline-block" }}>
          ⚡ Suplementos premium al mejor precio
        </span>

        <h1 style={{
          fontSize: "clamp(2rem, 6vw, 4rem)",
          fontWeight: 900,
          lineHeight: 1.1,
          color: "#f1f5f9",
          marginTop: 16,
          marginBottom: 20,
        }}>
          Potenciá tu{" "}
          <span style={{ color: "#0dcaf0" }}>rendimiento</span>
          <br />con Artyom
        </h1>

        <p style={{
          fontSize: "clamp(0.95rem, 2vw, 1.125rem)",
          color: "#94a3b8",
          maxWidth: 560,
          margin: "0 auto 36px",
          lineHeight: 1.7,
        }}>
          Las mejores marcas — <strong style={{ color: "#f1f5f9" }}>Star Nutrition</strong> y{" "}
          <strong style={{ color: "#f1f5f9" }}>ENA</strong> — con precios directos al consumidor.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="#catalogo" className="btn-primary" style={{ padding: "12px 28px", fontSize: "1rem" }}>
            Ver catálogo <ArrowRight size={18} />
          </Link>
          <Link href="https://wa.me/5492645085444?text=Hola%2C+quiero+hacer+una+consulta" target="_blank" className="btn-outline" style={{ padding: "12px 28px", fontSize: "1rem" }}>
            Contactar
          </Link>
        </div>

        {/* Beneficios */}
        <div style={{
          display: "flex", gap: 28, justifyContent: "center", flexWrap: "wrap",
          marginTop: 48, color: "#64748b",
        }}>
          {beneficios.map(({ icon: Icon, texto }) => (
            <div key={texto} style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <Icon size={16} color="#0dcaf0" />
              <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>{texto}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
