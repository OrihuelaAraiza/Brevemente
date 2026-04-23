// Mock apiClient: devuelve datos hardcodeados (sin backend)
// Mantiene la misma interfaz que el apiClient real para no tocar services.

import {
  USERS,
  PATIENTS,
  SESSIONS,
  NOTES,
  PRESCRIPTIONS,
  REPORTS,
  ORDERS,
  CONSENTS,
  DASHBOARD_STATS,
  AUDIT_LOGS,
  CLINICAL_HISTORY,
  findUserByCredentials,
  findUserByEmail,
} from "../mocks/data";

function delay(ms = 120) {
  return new Promise((r) => setTimeout(r, ms));
}

function token(user) {
  return `mock-token.${user.id}.${Date.now()}`;
}

function trimBody(body) {
  if (!body) return {};
  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return body;
}

function matchPath(pattern, path) {
  const p = path.split("?")[0].replace(/\/$/, "");
  const pat = pattern.replace(/\/$/, "");
  const patParts = pat.split("/").filter(Boolean);
  const pParts = p.split("/").filter(Boolean);
  if (patParts.length !== pParts.length) return null;
  const params = {};
  for (let i = 0; i < patParts.length; i++) {
    if (patParts[i].startsWith(":")) {
      params[patParts[i].slice(1)] = pParts[i];
    } else if (patParts[i] !== pParts[i]) {
      return null;
    }
  }
  return params;
}

function firstMatch(path, routes) {
  for (const [pattern, handler] of routes) {
    const params = matchPath(pattern, path);
    if (params !== null) return { handler, params };
  }
  return null;
}

// ---------- handlers por método ----------

const GET_ROUTES = [
  ["/health", () => ({ ok: true, version: "mock-demo" })],
  ["/dashboard/stats", () => DASHBOARD_STATS],
  ["/dashboard", () => ({ stats: DASHBOARD_STATS, sessions: SESSIONS.slice(0, 5) })],
  ["/patients", () => ({ items: PATIENTS, total: PATIENTS.length })],
  [
    "/patients/:id",
    (p) => PATIENTS.find((x) => x.id === p.id) || { id: p.id, name: "Paciente", notFound: true },
  ],
  [
    "/patients/:id/history",
    (p) => CLINICAL_HISTORY[p.id] || { patientId: p.id, data: {} },
  ],
  [
    "/patients/:id/sessions",
    (p) => ({ items: SESSIONS.filter((s) => s.patientId === p.id) }),
  ],
  [
    "/patients/:id/notes",
    (p) => ({ items: NOTES.filter((n) => n.patientId === p.id) }),
  ],
  [
    "/patients/:id/consents",
    (p) => ({ items: CONSENTS.filter((c) => c.patientId === p.id) }),
  ],
  [
    "/patients/:id/reports",
    (p) => ({ items: REPORTS.filter((r) => r.patientId === p.id) }),
  ],
  [
    "/patients/:id/prescriptions",
    (p) => ({ items: PRESCRIPTIONS.filter((x) => x.patientId === p.id) }),
  ],
  [
    "/patients/:id/documents",
    () => ({ items: [] }),
  ],
  ["/sessions", () => ({ items: SESSIONS })],
  ["/sessions/calendar", () => ({ items: SESSIONS })],
  [
    "/sessions/:id",
    (p) => SESSIONS.find((s) => s.id === p.id) || null,
  ],
  ["/notes", () => ({ items: NOTES })],
  ["/notes/:id", (p) => NOTES.find((n) => n.id === p.id) || null],
  ["/prescriptions", () => ({ items: PRESCRIPTIONS })],
  [
    "/prescriptions/:id",
    (p) => PRESCRIPTIONS.find((x) => x.id === p.id) || null,
  ],
  ["/reports", () => ({ items: REPORTS })],
  [
    "/reports/:id",
    (p) => REPORTS.find((r) => r.id === p.id) || null,
  ],
  ["/orders", () => ({ items: ORDERS })],
  [
    "/orders/:id",
    (p) => ORDERS.find((o) => o.id === p.id) || null,
  ],
  ["/consents", () => ({ items: CONSENTS })],
  ["/audit/logs", () => ({ items: AUDIT_LOGS })],
  ["/supervision/logs", () => ({ items: AUDIT_LOGS })],
  ["/professional/me", () => USERS.find((u) => u.role === "PROFESSIONAL")],
  ["/me", () => USERS.find((u) => u.role === "PROFESSIONAL")],
];

const POST_ROUTES = [
  [
    "/auth/login",
    (_params, body) => {
      const user = findUserByCredentials(body.email, body.password);
      if (!user) {
        const err = new Error("Credenciales inválidas");
        err.status = 401;
        throw err;
      }
      const { password: _pwd, ...safe } = user;
      return { token: token(user), user: safe };
    },
  ],
  [
    "/auth/microsoft",
    (_params, body) => {
      if (!body.idToken) {
        const err = new Error("Token inválido");
        err.status = 400;
        throw err;
      }
      const user = USERS.find((u) => u.role === "PROFESSIONAL");
      const { password: _pwd, ...safe } = user;
      return { status: "LOGIN_SUCCESS", token: token(user), user: safe };
    },
  ],
  [
    "/auth/register",
    (_params, body) => {
      if (!body.email) {
        const err = new Error("Correo requerido");
        err.status = 400;
        throw err;
      }
      return { ok: true, message: "Registro recibido (demo)." };
    },
  ],
  [
    "/auth/register/complete",
    (_params, body) => {
      const existing = findUserByEmail(body.email);
      const user = existing || USERS.find((u) => u.role === "PATIENT");
      const { password: _pwd, ...safe } = user;
      return { token: token(user), user: safe };
    },
  ],
  [
    "/auth/register-msal",
    () => {
      const user = USERS.find((u) => u.role === "PROFESSIONAL");
      const { password: _pwd, ...safe } = user;
      return { token: token(user), user: safe };
    },
  ],
  ["/auth/logout", () => ({ ok: true })],
  ["/auth/forgot-password", () => ({ ok: true, message: "Demo: correo enviado." })],
  ["/auth/reset-password", () => ({ ok: true })],
  ["/audit/log", () => ({ ok: true })],
  [
    "/patients",
    (_params, body) => ({
      id: `p-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
      status: "ACTIVE",
    }),
  ],
  [
    "/sessions",
    (_params, body) => ({
      id: `s-${Date.now()}`,
      ...body,
      status: body.status || "SCHEDULED",
    }),
  ],
  [
    "/notes",
    (_params, body) => ({
      id: `n-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
    }),
  ],
  [
    "/prescriptions",
    (_params, body) => ({
      id: `rx-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
      status: "ACTIVE",
    }),
  ],
  [
    "/reports",
    (_params, body) => ({
      id: `r-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
      status: "FINAL",
    }),
  ],
  [
    "/orders",
    (_params, body) => ({
      id: `o-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
      status: "PENDING",
    }),
  ],
];

async function request(path, options = {}) {
  const method = (options.method || "GET").toUpperCase();
  const body = trimBody(options.body);

  await delay();

  const routes =
    method === "POST" || method === "PUT" || method === "PATCH"
      ? POST_ROUTES
      : GET_ROUTES;

  const match = firstMatch(path, routes);
  if (!match) {
    if (method === "DELETE") return { ok: true };
    // Por default regresa objeto vacío
    return {};
  }
  try {
    return match.handler(match.params, body);
  } catch (err) {
    // Simula fetch fail
    throw err;
  }
}

export const api = {
  get: (path, opts) => request(path, { ...(opts || {}), method: "GET" }),
  post: (path, body, opts) =>
    request(path, { ...(opts || {}), method: "POST", body }),
  put: (path, body, opts) =>
    request(path, { ...(opts || {}), method: "PUT", body }),
  patch: (path, body, opts) =>
    request(path, { ...(opts || {}), method: "PATCH", body }),
  delete: (path, opts) => request(path, { ...(opts || {}), method: "DELETE" }),
};

export default api;
