# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build (also runs TypeScript check)
npm run lint     # ESLint
```

## Architecture

**BreveMente** is a frontend-only demo (no backend, no auth) for a clinical SaaS for psychologists. All data is mocked in [lib/mock-data.ts](lib/mock-data.ts).

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui (base-ui primitives) · FullCalendar · Framer Motion · Lucide icons

### Route structure

All pages live under the `(dashboard)` route group which provides the Sidebar + Topbar layout. The root `/` redirects to `/inicio`.

Key routes:
- `/inicio` — dashboard with today's patients and quick-access cards
- `/agenda` — FullCalendar with create-appointment modals
- `/pacientes` — searchable patient table
- `/expedientes/[id]` — expedition sub-section selector
- `/expedientes/[id]/sesiones` — session grid with criterio dropdowns, recording overlay, and Brifi AI fill animation
- `/expedientes/[id]/valoracion` — Valoración del Cambio with criterio dropdowns
- `/brifi` — AI chat assistant with mock responses
- `/biblioteca` — 32 TBE protocol table with search
- `/reportes` — constancias with empty state and drawer form

### Visual identity — never change these values

```
Sidebar bg:       #1E2A3A   (active item: #2D3E50)
Main content bg:  #5BC8E8
Yellow button:    #F5A623   (CTA: "Crear cita", "Guardar")
Red button:       #E74C3C   (Destructive: STOP, "Crear nueva sesión")
Green criterio:   #27AE60
Gray criterio:    #9CA3AF
Red criterio:     #E74C3C
```

These colors are registered in [app/globals.css](app/globals.css) under `@theme inline` as `--color-bm-*` and can be used as Tailwind classes like `bg-bm-sidebar`, `bg-bm-amarillo`, etc. Direct hex values `bg-[#1E2A3A]` are also used throughout components.

### Critical business rule

In **Sesión 1**: only "Marcador de inicio" is available in `CriterioDropdown`.
From **Sesión 2+**: all 7 criteria are available.
This logic lives in [components/expedientes/CriterioDropdown.tsx](components/expedientes/CriterioDropdown.tsx).

### shadcn/ui version note

This project uses the new shadcn/ui with **base-ui primitives** (not Radix UI). These primitives do **not** support the `asChild` prop — use `render` prop or apply classNames directly to the trigger components instead.

### FullCalendar

Must be loaded client-side only. In any server component or page using it, wrap with:
```ts
const CalendarioFullCalendar = dynamic(() => import("@/components/agenda/CalendarioFullCalendar").then(m => m.CalendarioFullCalendar), { ssr: false })
```
