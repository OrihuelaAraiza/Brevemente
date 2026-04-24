# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
nvm use 20.20.1  # Next.js 16 requires Node ≥ 20.9
npm run dev      # localhost:3000
npm run build    # production build (type-checks)
npm run lint
```

## App shape

This repo combines two fronts inside a single Next.js 16 app:

1. **Brevemente marketing/demo app** — Next.js App Router pages under `app/(dashboard)/` (`/inicio`, `/agenda`, `/pacientes`, `/expedientes/*`, `/brifi`, `/biblioteca`, `/reportes`, etc.). TypeScript + Tailwind v4 + shadcn/ui (base-ui primitives) + FullCalendar. All data mocked in `lib/mock-data.ts`.
2. **Klinia clinical platform SPA** — React Router v7 app mounted under `/platform/*` via a catch-all route (`app/platform/[[...slug]]/page.tsx`). All klinia code lives under `src/` (JS, not TS). Providers (Theme, Toast) wrap `<BrowserRouter basename="/platform">` inside `src/PlatformShell.jsx`. Dynamic-imported with `ssr: false` so browser-only libs (MSAL, BrowserRouter) never touch the server.

Routes under `/platform`: `/`, `/login`, `/register`, `/dashboard`, `/patients`, `/patients/:id`, `/sessions`, `/notes`, `/prescriptions`, `/reports`, `/supervision`, `/patient/dashboard`, `/patient/clinical-history`, `/patient/notes`, `/patient/sessions`, `/patient/prescriptions`, `/patient/documents`, `/patient/profile`. Full list in `src/routes/AppRoutes.jsx`.

## No backend — demo data is hardcoded and persisted in localStorage

`src/services/apiClient.js` implements the full `api.get/post/put/patch/delete` surface against a mock store (`src/mocks/store.js`). Seed data lives in `src/mocks/data.js`. Mutations (create patient, create session, sign note, suspend prescription, etc.) persist to `localStorage` under keys `brevemente.demo.*`. Reload does not lose state.

To reset the demo: click "Restablecer demo" on the login screen, or in devtools run `window.__BREVE_DEMO__.reset(); location.reload()`.

## Demo users (hardcoded, login at `/platform/login`)

| Role | Email | Password |
|---|---|---|
| ADMIN | `admin@brevemente.mx` | `admin123` |
| PROFESSIONAL | `profesional@brevemente.mx` | `pro123` |
| ASSISTANT | `asistente@brevemente.mx` | `asis123` |
| PATIENT | `paciente@brevemente.mx` | `pac123` |

Defined in `src/mocks/data.js → USERS`. Click any of the four cards on the login screen to autofill credentials.

## Role access

`src/components/ProtectedRoute.jsx` wraps klinia routes. Each route group declares `allow=[...]`:

- ADMIN-only: `/auth/debug`, `/supervision`
- PATIENT-only: `/patient/*`
- ADMIN|PROFESSIONAL|ASSISTANT|PATIENT (shared): `/dashboard`, `/patients`, `/sessions`, `/reports`, `/patients/:id`, `/patients/:id/history|sessions`
- ADMIN|PROFESSIONAL|ASSISTANT (clinical staff): `/patients/:id/notes(/new|/:noteId)`, `/prescriptions`, `/orders`, `/patients/:id/discharge`, reports CRUD
- ADMIN|PROFESSIONAL: `/ProfileProfessional`

On login, `resolveDestination(role)` routes PATIENT → `/patient/dashboard`, everyone else → `/dashboard` or `/patients`.

## Visual identity (Brevemente side — never change)

```
Sidebar bg:       #1E2A3A   (active item: #2D3E50)
Main content bg:  #5BC8E8
Yellow CTA:       #F5A623
Red destructive:  #E74C3C
Green criterio:   #27AE60
Gray criterio:    #9CA3AF
Red criterio:     #E74C3C
```

Registered in `app/globals.css` under `@theme inline` as `--color-bm-*`. Klinia's global CSS (`src/styles/global.css`, `src/styles/theme.css`) is only imported inside `PlatformShell` so it does not bleed into Brevemente routes.

## Critical klinia business rule

In **Sesión 1**: only "Marcador de inicio" is available in `CriterioDropdown`. From **Sesión 2+**: all 7 criteria. Lives in `components/expedientes/CriterioDropdown.tsx` (Brevemente side).

## Paths, env, aliases

- `@/*` → repo root (Brevemente TS code)
- `@src/*` → `./src/*` (Klinia JS code)
- No `VITE_*` env vars — all migrated to `NEXT_PUBLIC_*`. MSAL is disabled unless `NEXT_PUBLIC_MSAL_CLIENT_ID` is set.

## Known quirks

- **Two routers coexist**: Next.js App Router at the top level + React Router v7 inside `/platform`. Use `next/link` / `useRouter` on Brevemente pages, `react-router-dom` `Link` / `useNavigate` inside `/platform` SPA.
- **`src/pages` was renamed to `src/views`** — Next.js auto-detects any `pages/` folder as the Pages Router and conflicts with `app/`.
- **No SSR inside `/platform`** — the shell uses `dynamic({ ssr: false })`. First load shows "Cargando plataforma…" before hydration.
- **FullCalendar** (Brevemente side) must be loaded client-side only:
  ```ts
  const CalendarioFullCalendar = dynamic(() => import("@/components/agenda/CalendarioFullCalendar").then(m => m.CalendarioFullCalendar), { ssr: false })
  ```
- **shadcn/ui** on Brevemente side uses **base-ui primitives** (not Radix UI). These primitives do **not** support `asChild` — use `render` prop or apply classNames directly.
