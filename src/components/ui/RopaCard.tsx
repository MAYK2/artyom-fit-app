import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { getWALink } from "@/components/ui/WhatsAppButton";
import { ItemRopa } from "@/services/ropa";

function formatPrecio(n: number) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);
}

export default function RopaCard({ item }: { item: ItemRopa }) {
  return (
    <article className="product-card">
      <Link href={`/ropa/${item.id}`} style={{ display: "block", textDecoration: "none" }}>
        <div className="product-card__img">
          {item.imagen ? (
            <Image src={item.imagen} alt={item.nombre} fill
              style={{ objectFit: "contain", padding: 16 }}
              sizes="(max-width: 640px) 50vw, 25vw" />
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: "3rem", opacity: 0.15 }}>👕</div>
          )}
          <div style={{ position: "absolute", top: 10, left: 10 }}>
            <span className="chip">Ropa</span>
          </div>
        </div>
      </Link>

      <div className="product-card__body">
        <p className="product-card__name">{item.nombre}</p>

        {/* Talles disponibles */}
        {item.talles?.length > 0 && (
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {item.talles.map((t) => (
              <span key={t} style={{
                fontSize: "0.65rem", fontWeight: 700, padding: "2px 7px",
                borderRadius: 4, border: "1px solid rgba(255,255,255,0.15)",
                color: "#94a3b8",
              }}>{t}</span>
            ))}
          </div>
        )}

        <p className="product-card__price">{formatPrecio(item.precio)}</p>

        <Link
          href={getWALink(`Hola! Me interesa: ${item.nombre}. ¿Está disponible?`)}
          target="_blank" rel="noopener noreferrer"
          className="btn-primary"
          style={{ width: "100%", marginTop: 4 }}
        >
          <MessageCircle size={15} /> Consultar
        </Link>
      </div>
    </article>
  );
}
