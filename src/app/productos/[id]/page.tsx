import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductoPorId, getProductos } from "@/services/productos";
import { getWALink } from "@/components/ui/WhatsAppButton";
import { MessageCircle, ArrowLeft, Tag, Package } from "lucide-react";

import ProductDetailClient from "@/components/ui/ProductDetailClient";

// Genera las rutas estáticas para todos los productos
export async function generateStaticParams() {
  const productos = getProductos();
  return productos.map((p) => ({ id: p.id }));
}

// Metadata dinámica por producto
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const producto = getProductoPorId(id);
  if (!producto) return { title: "Producto no encontrado" };
  return {
    title: `${producto.nombre} — ${producto.marca} | Artyom Suplementos`,
    description: producto.descripcion?.slice(0, 155),
  };
}

export default async function ProductoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const producto = getProductoPorId(id);
  if (!producto) notFound();

  return (
    <div style={{ minHeight: "100vh", background: "#020617" }}>
      {/* Breadcrumb */}
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "24px 20px 0",
      }}>
        <Link
          href="/"
          className="back-link"
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            color: "#64748b", fontSize: "0.85rem", textDecoration: "none",
          }}
        >
          <ArrowLeft size={15} /> Volver al catálogo
        </Link>
        <style>{`.back-link:hover { color: #eab308; }`}</style>
      </div>

      <ProductDetailClient producto={producto} getWALink={getWALink} />
    </div>
  );
}
