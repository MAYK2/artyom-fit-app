import Link from "next/link";
import { Laptop, MapPin, Navigation, Truck, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #020617 100%)",
        padding: "clamp(60px, 10vw, 100px) 1rem clamp(40px, 8vw, 80px)",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid rgba(13, 202, 240, 0.15)",
      }}
    >
      {/* Luces de fondo */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: "100%", height: "100%", maxWidth: 1000,
        background: "radial-gradient(circle, rgba(13,202,240,0.08) 0%, transparent 60%)",
        pointerEvents: "none", zIndex: 0
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 10 }}>
        
        {/* TOP HEADING */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{
            fontFamily: "var(--font-orbitron), sans-serif",
            fontSize: "clamp(1.5rem, 4vw, 3rem)",
            fontWeight: 900,
            color: "#f8fafc",
            textTransform: "uppercase",
            lineHeight: 1.2,
            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          }}>
            TENEMOS PUNTOS DE VENTA EN <br/>
            <span style={{ color: "#eab308" }}>RIVADAVIA Y SANTA LUCIA</span>
          </h1>
        </div>

        {/* MIDDLE CONTENT: LAPTOP MAP & SHIPPING INFO */}
        <div style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(2rem, 5vw, 4rem)",
          margin: "0 auto",
        }}>
          
          {/* Left: Graphic (Laptop & Map) */}
          <div style={{
            flex: "1 1 350px",
            maxWidth: 500,
            display: "flex",
            justifyContent: "center",
          }}>
            <div style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16/10",
              background: "#1e293b",
              border: "4px solid #334155",
              borderRadius: "12px 12px 0 0",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.8)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}>
              {/* Pantalla de mapa simulado */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.2, backgroundImage: "linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
              
              <MapPin size={48} color="#eab308" style={{ position: "relative", zIndex: 2, marginBottom: 8 }} />
              <div style={{
                background: "rgba(2,6,23,0.8)", padding: "8px 16px", borderRadius: 8,
                border: "1px solid rgba(13,202,240,0.3)", position: "relative", zIndex: 2
              }}>
                <p style={{ margin: 0, fontWeight: 800, fontSize: "0.9rem", color: "#f1f5f9" }}>📍 Artyom Suplementos</p>
                <p style={{ margin: 0, fontSize: "0.75rem", color: "#94a3b8" }}>San Juan, Argentina</p>
              </div>

              {/* Base de la laptop */}
              <div style={{
                position: "absolute",
                bottom: -20, left: "-5%", width: "110%", height: 20,
                background: "#475569",
                borderRadius: "0 0 16px 16px",
              }} />
            </div>
          </div>

          {/* Right: Big Typography for Shipping */}
          <div style={{
            flex: "1 1 400px",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}>
            <h2 style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
              fontWeight: 900,
              color: "#f1f5f9",
              lineHeight: 1.1,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              margin: 0,
            }}>
              Despachamos a toda <br/> la Argentina <Truck size={36} color="#eab308" style={{ display: "inline", verticalAlign: "middle", marginLeft: 8 }}/>
            </h2>
            
            <p style={{
              fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
              fontWeight: 700,
              color: "#94a3b8",
              margin: "12px 0",
              lineHeight: 1.2,
              textTransform: "uppercase",
            }}>
              ¿Vivís en <strong style={{ color: "#f8fafc" }}>San Juan Capital?</strong>...
            </p>

            <div style={{
              background: "linear-gradient(90deg, #eab308 0%, #3b82f6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 900,
              lineHeight: 1,
              textTransform: "uppercase",
              textShadow: "0px 10px 30px rgba(13,202,240,0.3)",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              Entrega express <br/> en el día
            </div>
          </div>
        </div>

        {/* BOTTOM URL */}
        <div style={{ textAlign: "center", marginTop: "clamp(40px, 8vw, 60px)" }}>
          <p style={{
            fontFamily: "var(--font-orbitron), sans-serif",
            fontSize: "clamp(1.2rem, 3vw, 2.5rem)",
            fontWeight: 800,
            color: "#e2e8f0",
            letterSpacing: "0.1em",
            margin: 0,
            background: "rgba(15,23,42,0.6)",
            display: "inline-block",
            padding: "12px 32px",
            borderRadius: 50,
            border: "1px solid rgba(13,202,240,0.2)",
            boxShadow: "0 0 20px rgba(13,202,240,0.1)",
          }}>
            WWW.ARTYOM.COM.AR
          </p>
        </div>

      </div>
    </section>
  );
}

