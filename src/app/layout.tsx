import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "Artyom Suplementos | Proteínas, Creatina y más",
  description:
    "Tienda online de suplementos deportivos. Las mejores marcas al mejor precio: Star Nutrition, ENA y más.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${orbitron.variable} h-full`}>
      <body className="min-h-full bg-neutral-950 text-white antialiased">
        <CartProvider>
          <Navbar />
          <main className="pt-[110px]">{children}</main>
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
