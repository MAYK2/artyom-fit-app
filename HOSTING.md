# 🚀 Artyom App — Guía de Hosting y Dominio

## 📌 Información del Proyecto

| Campo | Detalle |
|---|---|
| **Dominio** | www.artyom.com.ar |
| **Framework** | Next.js 14 (TypeScript) |
| **Estado** | Desarrollo Local |

---

## 🆓 Opciones de Hosting Gratuito (Recomendadas)

### ✅ 1. Vercel — **MEJOR OPCIÓN para Next.js**
> Creado por los mismos autores de Next.js. Soporte nativo perfecto.

- **URL:** https://vercel.com
- **Plan gratuito incluye:**
  - Deploy automático desde GitHub
  - HTTPS gratuito (SSL automático)
  - CDN global
  - Dominio personalizado (conectar www.artyom.com.ar)
  - 100 GB de ancho de banda/mes
  - Funciones serverless (API routes de Next.js funcionan perfecto)
- **Límites del plan free:** Proyectos hobby, sin SLA comercial
- **Cómo conectar el dominio:**
  1. En Vercel → Settings → Domains → agregar `artyom.com.ar`
  2. En tu registrador de dominio (.com.ar), apuntar los nameservers o DNS a Vercel

---

### ✅ 2. Netlify — Alternativa sólida
> Muy buena para apps Next.js, pero requiere plugin adicional.

- **URL:** https://netlify.com
- **Plan gratuito incluye:**
  - 100 GB de ancho de banda/mes
  - HTTPS gratuito
  - Dominio personalizado
  - Deploy desde GitHub
- **Nota:** Necesita el plugin `@netlify/plugin-nextjs` para soporte completo de SSR

---

### ✅ 3. Railway — Para cuando necesités backend/DB
> Ideal si después agregás base de datos o API propia.

- **URL:** https://railway.app
- **Plan gratuito:** $5 USD de crédito/mes (suficiente para proyectos chicos)
- **Útil cuando:** quieras agregar PostgreSQL, MongoDB, etc.

---

### ⚠️ 4. Render — Alternativa a Railway
- **URL:** https://render.com
- **Plan free:** Servicio se "duerme" tras 15 min de inactividad (mala UX)
- **No recomendado** para un e-commerce en producción

---

## 🎯 Recomendación Final

```
Para Artyom App → Usar VERCEL (gratuito)
Dominio: www.artyom.com.ar → conectar via DNS a Vercel
```

**¿Por qué Vercel?**
- Next.js fue creado por Vercel → compatibilidad 100%
- Las API Routes, SSR y Server Components funcionan sin configuración extra
- Deploy automático: cada `git push` → nuevo deploy en segundos
- El plan gratuito es más que suficiente para empezar

---

## 📋 Pasos para Deployar en Vercel

### 1. Preparar el repositorio
```bash
# Asegurarse de tener Git inicializado
cd /home/mayco/Work/artyom-app
git init
git add .
git commit -m "Initial commit - Artyom App"
```

### 2. Subir a GitHub
```bash
# Crear repo en github.com/new (nombre: artyom-app)
git remote add origin https://github.com/TU_USUARIO/artyom-app.git
git push -u origin main
```

### 3. Conectar con Vercel
1. Ir a https://vercel.com → "Sign up" con cuenta de GitHub
2. "New Project" → seleccionar repositorio `artyom-app`
3. Vercel detecta Next.js automáticamente → **Deploy**
4. En 2 minutos tenés la app online en `artyom-app.vercel.app`

### 4. Conectar dominio propio
1. En Vercel → tu proyecto → **Settings → Domains**
2. Agregar: `artyom.com.ar` y `www.artyom.com.ar`
3. Vercel te da los DNS records (tipo A o CNAME)
4. En el panel de NIC Argentina (registrador del .com.ar):
   - Agregar los registros DNS que te indica Vercel
5. Esperar propagación DNS: 15 min — 24 hs

---

## 🔑 Variables de Entorno (si las hay)

Si el proyecto usa variables en `.env.local`, agregarlas en:
**Vercel → Settings → Environment Variables**

---

## 📌 Registrador del dominio .com.ar

Los dominios `.com.ar` son administrados por **NIC Argentina**:
- **URL:** https://nic.ar
- Para configurar DNS: buscar la sección "Modificar Delegación" del dominio

---

*Documentación generada: 2026-08-22*
