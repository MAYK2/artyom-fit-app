# REGLAS DEL PROYECTO ARTYOM (AI GUIDELINES)

Esta es la guía maestra para cualquier IA que edite este proyecto. Antes de hacer cualquier cambio, debes leer y respetar estrictamente estas reglas.

## 1. Arquitectura y Stack
- **Framework:** Next.js (App Router).
- **Estilos:** Tailwind CSS + Tokens globales definidos en `src/app/globals.css`.
- **Iconos:** `lucide-react`.
- **Tipado:** TypeScript estricto (no uses `any` a menos que sea inevitable, tipar todo en `src/types/index.ts`).

## 2. Sistema de Base de Datos (JSON)
- **NO** se debe usar Prisma, Drizzle, Postgres ni ninguna DB externa a menos que el usuario lo pida explícitamente.
- La fuente de la verdad son los archivos JSON en la carpeta `data/`:
  - `data/suplementos.json`: Catálogo de suplementos.
  - `data/ropa.json`: Catálogo de indumentaria.
- Los componentes **nunca** deben hacer fetch a APIs externas para obtener los productos. Deben usar las funciones definidas en `src/services/productos.ts` y `src/services/ropa.ts` que importan y parsean los JSON localmente.

## 3. Manejo de Imágenes
- Las imágenes físicas van en `public/productos/` (para suplementos) y `public/ropa/` (para ropa).
- En los archivos JSON, el campo `"imagen"` debe ser la ruta absoluta desde public, ej: `"/productos/whey.jpg"`.
- Si un producto NO tiene imagen, en el JSON el valor debe ser `null`.
- En la UI (Tarjetas, página de detalle), siempre debes validar: `if (producto.imagen)` mostrar `<Image />`, `else` mostrar un div placeholder (un icono o emoji representativo). Esto previene errores 404.

## 4. Estilos y Estética (Matrix / Cyberpunk / Dark)
- El diseño debe ser oscuro y premium. 
- Fondo primario: `--bg-deep` (`#020617`).
- Acento principal: `--cyan` (`#0dcaf0`). Usarlo para destacar elementos importantes, precios y botones primarios.
- No uses colores genéricos como `red-500` o `blue-500`. Mantente dentro de la paleta de Tailwind Slate (`slate-900`, `slate-400`) combinada con el cyan.
- Usa los tokens de CSS en `globals.css` como `.btn-primary`, `.chip`, `.product-card`. No llenes los componentes de 50 clases de Tailwind repetidas si ya existe un componente en el CSS global.

## 5. Cero Errores 400/404 y Client Components
- Nunca pases funciones u `onClick` (Event Handlers) desde componentes del Servidor (Server Components) a props. Si necesitas interactividad, asegúrate de que el archivo tenga `"use client";` arriba del todo.
- Los `<Image>` de Next.js fallan feo si se les pasa `src={null}` o una cadena vacía. Asegúrate de condicionar el renderizado como se explica en la regla 3.

## 6. Integración WhatsApp
- El modelo de negocio se basa en cerrar ventas por WhatsApp.
- El CTA principal en todas las tarjetas de producto y páginas de detalle es "Consultar", el cual redirecciona usando la función `getWALink` de `src/components/ui/WhatsAppButton.tsx` con un mensaje predefinido.
