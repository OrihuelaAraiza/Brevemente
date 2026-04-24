# BreveMente

Plataforma clínica BreveMente en una sola aplicación Next.js 16. Sin backend — todo corre con datos hardcodeados persistidos en `localStorage`.

## Requisitos

- Node.js ≥ 20.9

## Correr

```bash
nvm use 20.20.1
npm install
npm run dev    # http://localhost:3000
```

## Dos superficies en la misma app

### 1. Marketing/demo Brevemente

Páginas Next.js App Router bajo `app/(dashboard)/`:
`/inicio`, `/agenda`, `/pacientes`, `/expedientes/*`, `/brifi`, `/biblioteca`, `/reportes`, `/desempeno`, `/configuracion`, `/cuenta`, `/bitacora`, `/beneficios`, etc.

Stack: TypeScript · Tailwind v4 · shadcn/ui (base-ui) · FullCalendar · Framer Motion.

### 2. Plataforma clínica Klinia (SPA) bajo `/platform/*`

SPA React + React Router v7 que vive en `src/`, montada como catch-all en `app/platform/[[...slug]]/page.tsx`.

Rutas principales:

| Ruta | Quién entra |
|---|---|
| `/platform/login` | pública |
| `/platform/dashboard` | admin / profesional / asistente / paciente |
| `/platform/patients` · `/platform/patients/:id` | staff + paciente |
| `/platform/sessions` · `/platform/sessions/calendar` | staff + paciente |
| `/platform/patients/:id/notes/*` | staff clínico |
| `/platform/prescriptions` · `/platform/prescriptions/:id` | profesional / admin |
| `/platform/reports` | staff |
| `/platform/supervision` | admin |
| `/platform/patient/dashboard` · `/platform/patient/clinical-history` · `/platform/patient/notes` · `/platform/patient/sessions` · `/platform/patient/prescriptions` · `/platform/patient/documents` · `/platform/patient/profile` | paciente |

## Usuarios demo

Desde el login hay una tarjeta por rol — click para autocompletar.

| Rol | Email | Password |
|---|---|---|
| Admin | `admin@brevemente.mx` | `admin123` |
| Profesional | `profesional@brevemente.mx` | `pro123` |
| Asistente | `asistente@brevemente.mx` | `asis123` |
| Paciente | `paciente@brevemente.mx` | `pac123` |

## Datos mock persistentes

- Semilla en [src/mocks/data.js](src/mocks/data.js)
- Tienda con persistencia en `localStorage` en [src/mocks/store.js](src/mocks/store.js)
- Adaptador HTTP en [src/services/apiClient.js](src/services/apiClient.js) que simula los endpoints REST y ruta a la tienda

Lo que creas durante la demo (pacientes, sesiones, notas, recetas, reportes, órdenes, firmas de consentimiento, historia clínica) **se guarda** y sigue ahí al refrescar.

**Resetear demo**: botón "Restablecer demo" en el login o en consola:

```js
window.__BREVE_DEMO__.reset();
location.reload();
```

## Aliases TypeScript

- `@/*` → raíz del repo (código Brevemente TS)
- `@src/*` → `./src/*` (código Klinia JS)

## Scripts

```bash
npm run dev      # Turbopack dev server
npm run build    # Compila y typechecks
npm run start    # Sirve el build
npm run lint     # ESLint
```
