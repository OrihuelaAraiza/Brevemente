import type { Role } from "@/lib/auth";

// Route → which roles can see it in the sidebar
export const ROLE_ROUTES: Record<Role, string[]> = {
  ADMIN: [
    "/inicio", "/pacientes", "/agenda", "/expedientes",
    "/brifi", "/desempeno", "/beneficios", "/suscripcion",
    "/notificaciones", "/cuenta", "/soporte", "/configuracion", "/salir",
    "/biblioteca", "/reportes", "/bitacora",
  ],
  PROFESSIONAL: [
    "/inicio", "/pacientes", "/agenda", "/expedientes",
    "/brifi", "/desempeno", "/beneficios", "/suscripcion",
    "/notificaciones", "/cuenta", "/soporte", "/configuracion", "/salir",
    "/biblioteca", "/reportes", "/bitacora",
  ],
  ASSISTANT: [
    "/inicio", "/pacientes", "/agenda", "/expedientes",
    "/notificaciones", "/cuenta", "/soporte", "/salir",
    "/biblioteca", "/reportes", "/bitacora",
  ],
  PATIENT: [
    "/inicio", "/agenda",
    "/notificaciones", "/cuenta", "/soporte", "/salir",
  ],
};

export function canAccess(role: Role, pathname: string): boolean {
  const allowed = ROLE_ROUTES[role];
  return allowed.some((r) => pathname === r || pathname.startsWith(r + "/"));
}
