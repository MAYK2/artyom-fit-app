# Artyom Suplementos - E-commerce Platform

Plataforma de e-commerce desarrollada para **Artyom**, tienda de suplementos deportivos y ropa deportiva.

## Arquitectura del Proyecto

El proyecto está construido con una arquitectura moderna, rápida y escalable:
- **Framework:** Next.js (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS + CSS Vanilla (Tokens globales en `globals.css`)
- **Iconos:** Lucide React

## Sistema de Datos (Sin Base de Datos Externa)

Para simplificar la gestión y permitir que el dueño del negocio pueda actualizar precios y stock sin depender de bases de datos complejas o un panel de administración, el proyecto utiliza **archivos JSON locales como fuente de la verdad**.

### ¿Cómo actualizar el stock o los precios?

No necesitas tocar el código fuente. Solo debes editar los archivos dentro de la carpeta `data/`:

1. **Suplementos (`data/suplementos.json`)**
   - Aquí se encuentran todos los productos como proteínas, creatinas, pre-entrenos, etc.
   - Para cambiar un precio, simplemente busca el producto y edita el campo `"precio": 90000`.
   - Para ocultar un producto sin borrarlo, puedes cambiar `"stock": true` a `"stock": false`.

2. **Ropa Deportiva (`data/ropa.json`)**
   - Aquí se encuentra la indumentaria.
   - Tiene campos adicionales como `"talles": ["S", "M", "L"]` y `"colores": ["Negro", "Blanco"]`.

Una vez editados y guardados estos archivos JSON, los cambios se reflejan automáticamente en la web.

### Imágenes
- Las imágenes de suplementos deben guardarse en `public/productos/`.
- Las imágenes de indumentaria deben guardarse en `public/ropa/`.
- Luego, se referencia la ruta en el JSON (ej. `"/productos/mi-foto.jpg"`). Si un producto no tiene foto, se debe colocar `null` para que aparezca un icono por defecto y evitar errores 404.

## Estructura de Carpetas

- `/data`: Archivos JSON con la base de datos (Suplementos y Ropa).
- `/public`: Assets estáticos. Logos, imágenes de productos (`/productos`) y de ropa (`/ropa`).
- `/src/app`: Rutas de Next.js.
  - `/`: Catálogo principal (Suplementos).
  - `/ropa`: Catálogo de indumentaria.
  - `/productos/[id]`: Página de detalle dinámico de cada suplemento.
  - `/ropa/[id]`: (Futuro) Página de detalle de indumentaria.
- `/src/components`: Componentes reutilizables de UI.
  - `/layout`: Navbar, Hero, etc.
  - `/ui`: ProductCards, botones de WhatsApp, Grillas.
- `/src/services`: Funciones para leer los archivos JSON de la carpeta `data/` y pasarlos a los componentes.
- `/src/types`: Definiciones de interfaces TypeScript para el tipado estricto.

## Estilo y Diseño

El diseño está basado en una estética oscura, elegante e "high-contrast" (estilo Matrix/tecnológico):
- **Fondo:** Dark Deep (`#020617`) a Slate (`#0f172a`).
- **Acentos:** Cyan (`#0dcaf0`), utilizado para botones primarios, badges, precios y glows.
- **Tipografía:** Inter (limpia y legible).
- Toda la configuración base y tokens están en `src/app/globals.css`.

## Integración con WhatsApp

No hay carrito de compras complejo con pasarela de pago. Cuando un cliente quiere un producto, hace clic en "Consultar" o en el botón flotante.
Esto abre directamente WhatsApp con un mensaje pre-armado incluyendo el nombre del producto, enviando el mensaje al número oficial del negocio.
