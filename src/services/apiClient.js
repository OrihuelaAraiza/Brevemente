// Mock apiClient respaldado por tienda con persistencia en localStorage.
// Mantiene la misma firma que el apiClient real para no tocar services.
// Cualquier mutación (crear paciente, nota, sesión, etc.) persiste al refrescar.

import store, {
  hydrateFromStorage,
  getAll,
  createPatient,
  updatePatient,
  deletePatient,
  createSession,
  updateSession,
  updateSessionStatus,
  createNote,
  updateNote,
  closeNote,
  signNote,
  appendNoteAddendum,
  createPrescription,
  suspendPrescription,
  createReport,
  createOrder,
  cancelOrder,
  signConsent,
  setClinicalHistory,
  getClinicalHistoryFor,
  USERS,
} from "../mocks/store";
import { findUserByCredentials, findUserByEmail } from "../mocks/data";

function delay(ms = 80) {
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

function splitPath(path) {
  const [pathname, qs = ""] = String(path || "").split("?");
  const query = {};
  qs.split("&")
    .filter(Boolean)
    .forEach((pair) => {
      const [k, v = ""] = pair.split("=");
      query[decodeURIComponent(k)] = decodeURIComponent(v);
    });
  return { pathname: pathname.replace(/\/$/, ""), query };
}

function matchPath(pattern, pathname) {
  const pat = pattern.replace(/\/$/, "");
  const patParts = pat.split("/").filter(Boolean);
  const pParts = pathname.split("/").filter(Boolean);
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

function firstMatch(pathname, routes) {
  for (const [pattern, handler] of routes) {
    const params = matchPath(pattern, pathname);
    if (params !== null) return { handler, params };
  }
  return null;
}

// ---------- Dashboard derivados ----------
function buildStats() {
  const patients = getAll.patients();
  const sessions = getAll.sessions();
  const reports = getAll.reports();
  const prescriptions = getAll.prescriptions();

  const today = new Date().toISOString().slice(0, 10);
  const isToday = (iso) =>
    iso && String(iso).slice(0, 10) === today;

  return {
    patientsActive: patients.filter((p) => p.status === "ACTIVE").length,
    sessionsToday: sessions.filter(
      (s) => isToday(s.scheduledAt) && s.status !== "CANCELLED",
    ).length,
    sessionsCancelledToday: sessions.filter(
      (s) => isToday(s.scheduledAt) && s.status === "CANCELLED",
    ).length,
    prescriptionsActive: prescriptions.filter((p) => p.status === "ACTIVE")
      .length,
    lastPrescriptionTime: prescriptions[0]?.createdAt || null,
    reportsGenerated: reports.length,
    reportsProgress: 65,
  };
}

function todaySessionsList() {
  return getAll
    .sessions()
    .filter((s) => s.status === "SCHEDULED" || s.status === "CONFIRMED")
    .slice(0, 8)
    .map((s) => ({
      id: s.id,
      time: s.scheduledAt,
      patientName: s.patientName,
      status: s.status,
    }));
}

function recentNotesList() {
  return getAll
    .notes()
    .slice(0, 8)
    .map((n) => ({
      id: n.id,
      patientId: n.patientId,
      patientName:
        getAll.patients().find((p) => p.id === n.patientId)?.name ||
        "Paciente",
      closedAt: n.closedAt || n.createdAt,
    }));
}

function recentPrescriptionsList() {
  return getAll
    .prescriptions()
    .slice(0, 8)
    .map((rx) => ({
      id: rx.id,
      patientId: rx.patientId,
      patientName: rx.patientName,
      folio: rx.folio || `RX-${rx.id.slice(-4).toUpperCase()}`,
      signedAt: rx.createdAt,
    }));
}

function incompleteHistoriesList() {
  const patients = getAll.patients();
  const history = getAll.history();
  return patients
    .filter((p) => !history[p.id])
    .slice(0, 5)
    .map((p, i) => ({
      id: p.id,
      patientId: p.id,
      patientName: p.name,
      completionPercentage: 30 + i * 10,
      missingFieldsCount: 6 - i,
      lastUpdated: p.createdAt,
    }));
}

// ---------- RUTAS GET ----------
const GET_ROUTES = [
  ["/health", () => ({ ok: true, version: "mock-demo" })],

  // Dashboard
  ["/dashboard/stats", () => buildStats()],
  ["/dashboard/sessions/today", () => todaySessionsList()],
  ["/dashboard/notes/recent", () => recentNotesList()],
  ["/dashboard/prescriptions/recent", () => recentPrescriptionsList()],
  ["/dashboard/histories/incomplete", () => incompleteHistoriesList()],
  [
    "/dashboard",
    () => ({ stats: buildStats(), sessions: todaySessionsList() }),
  ],

  // Patients
  ["/patients", () => ({ items: getAll.patients(), total: getAll.patients().length })],
  ["/patients/global/search", () => ({ items: getAll.patients() })],
  [
    "/patients/:id",
    (p) =>
      getAll.patients().find((x) => x.id === p.id) || {
        id: p.id,
        name: "Paciente",
        notFound: true,
      },
  ],
  [
    "/patients/:id/history",
    (p) => getClinicalHistoryFor(p.id) || { patientId: p.id, data: {} },
  ],
  [
    "/patients/:id/sessions",
    (p) => ({ items: getAll.sessions().filter((s) => s.patientId === p.id) }),
  ],
  [
    "/patients/:id/notes",
    (p) => ({ items: getAll.notes().filter((n) => n.patientId === p.id) }),
  ],
  [
    "/patients/:id/consents",
    (p) => ({ items: getAll.consents().filter((c) => c.patientId === p.id) }),
  ],
  [
    "/patients/:id/reports",
    (p) => ({ items: getAll.reports().filter((r) => r.patientId === p.id) }),
  ],
  [
    "/patients/:id/prescriptions",
    (p) => ({
      items: getAll.prescriptions().filter((x) => x.patientId === p.id),
    }),
  ],
  [
    "/patients/:id/orders",
    (p) => ({ items: getAll.orders().filter((o) => o.patientId === p.id) }),
  ],
  [
    "/patients/:id/bundle",
    (p) => ({
      patient: getAll.patients().find((x) => x.id === p.id) || null,
      history: getClinicalHistoryFor(p.id),
      notes: getAll.notes().filter((n) => n.patientId === p.id),
      sessions: getAll.sessions().filter((s) => s.patientId === p.id),
      prescriptions: getAll
        .prescriptions()
        .filter((x) => x.patientId === p.id),
      consents: getAll.consents().filter((c) => c.patientId === p.id),
    }),
  ],
  ["/patients/:id/documents", () => ({ items: [] })],
  ["/patients/:id/attachments", () => ({ items: [] })],

  // Histories
  [
    "/histories/patient/:patientId",
    (p) => getClinicalHistoryFor(p.patientId) || { patientId: p.patientId, data: {} },
  ],

  // Sessions
  ["/sessions", () => ({ items: getAll.sessions() })],
  ["/sessions/calendar", () => ({ items: getAll.sessions() })],
  [
    "/sessions/today-counts",
    () => {
      const today = todaySessionsList();
      return {
        total: today.length,
        scheduled: today.filter((s) => s.status === "SCHEDULED").length,
        confirmed: today.filter((s) => s.status === "CONFIRMED").length,
        cancelled: 0,
      };
    },
  ],
  [
    "/sessions/patient/:patientId",
    (p) => ({
      items: getAll.sessions().filter((s) => s.patientId === p.patientId),
    }),
  ],
  [
    "/sessions/:id",
    (p) => getAll.sessions().find((s) => s.id === p.id) || null,
  ],
  ["/sessions/:id/ics", () => "BEGIN:VCALENDAR\nEND:VCALENDAR"],

  // Notes
  ["/notes", () => ({ items: getAll.notes() })],
  [
    "/notes/patient/:patientId",
    (p) => ({ items: getAll.notes().filter((n) => n.patientId === p.patientId) }),
  ],
  ["/notes/:id", (p) => getAll.notes().find((n) => n.id === p.id) || null],

  // Prescriptions
  ["/prescriptions", (_p, _b, q) => {
    const items = getAll.prescriptions();
    if (q?.id) return items.filter((x) => x.patientId === q.id);
    return items;
  }],
  ["/prescriptions/my-prescriptions", () => getAll.prescriptions()],
  [
    "/prescriptions/detail/:id",
    (p) => getAll.prescriptions().find((x) => x.id === p.id) || null,
  ],
  [
    "/prescriptions/:id",
    (p) => getAll.prescriptions().find((x) => x.id === p.id) || null,
  ],

  // Reports & Orders
  ["/reports", () => ({ items: getAll.reports() })],
  ["/reports/:id", (p) => getAll.reports().find((r) => r.id === p.id) || null],
  ["/orders", () => ({ items: getAll.orders() })],
  ["/orders/:id", (p) => getAll.orders().find((o) => o.id === p.id) || null],

  // Consents / Audit / Supervision
  ["/consents", () => ({ items: getAll.consents() })],
  ["/audit/logs", () => ({ items: getAll.audit() })],
  ["/audit/professional", () => ({ items: getAll.audit() })],
  ["/supervision", () => ({ items: getAll.audit() })],
  ["/supervision/logs", () => ({ items: getAll.audit() })],
  ["/supervision/:id", (p) => getAll.audit().find((a) => a.id === p.id) || null],

  // Profiles / Me
  ["/professional/me", () => USERS.find((u) => u.role === "PROFESSIONAL")],
  ["/professional/profile", () => USERS.find((u) => u.role === "PROFESSIONAL")],
  ["/me", () => USERS.find((u) => u.role === "PROFESSIONAL")],
  [
    "/profiles/list-professionals",
    () => ({ items: USERS.filter((u) => u.role === "PROFESSIONAL") }),
  ],
  ["/delegates/count", () => ({ count: 0 })],

  // Paciente
  [
    "/patient/my-therapists",
    () => ({ items: USERS.filter((u) => u.role === "PROFESSIONAL") }),
  ],
  ["/patient/profile", () => USERS.find((u) => u.role === "PATIENT")],
];

// ---------- RUTAS POST ----------
const POST_ROUTES = [
  // Auth
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
  ["/auth/register", () => ({ ok: true, message: "Registro recibido (demo)." })],
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
  ["/audit/log", (_p, body) => ({ ok: true, logged: body })],

  // Patients
  ["/patients", (_p, body) => createPatient(body)],
  [
    "/patients/:id/discharge",
    (p, body) =>
      updatePatient(p.id, {
        status: "DISCHARGED",
        dischargeReason: body.reason,
        dischargedAt: new Date().toISOString(),
      }),
  ],
  [
    "/patients/:id/re-entry",
    (p) => updatePatient(p.id, { status: "ACTIVE" }),
  ],
  [
    "/patients/:id/consents",
    (p, body) => signConsent(p.id, body.type),
  ],

  // Histories
  [
    "/histories/patient/:patientId",
    (p, body) => setClinicalHistory(p.patientId, body),
  ],

  // Sessions
  ["/sessions", (_p, body) => createSession(body)],
  ["/sessions/:id/status", (p, body) => updateSessionStatus(p.id, body.status)],
  ["/sessions/:id/link-note", () => ({ ok: true })],

  // Notes
  ["/notes", (_p, body) => createNote(body)],
  ["/notes/:patientId/:noteId/close", (p) => closeNote(p.noteId)],
  ["/notes/:patientId/:noteId/sign", (p) => signNote(p.noteId)],
  [
    "/notes/:patientId/:noteId/addendum",
    (p, body) => appendNoteAddendum(p.noteId, body.text),
  ],

  // Prescriptions
  ["/prescriptions", (_p, body) => createPrescription(body)],
  [
    "/prescriptions/detail/:id/suspend",
    (p) => suspendPrescription(p.id),
  ],

  // Reports & Orders
  ["/reports", (_p, body) => createReport(body)],
  [
    "/reports/:id/lock",
    (p) => ({ id: p.id, status: "LOCKED", lockedAt: new Date().toISOString() }),
  ],
  ["/orders", (_p, body) => createOrder(body)],
  ["/patients/:patientId/orders", (p, body) =>
    createOrder({ ...body, patientId: p.patientId }),
  ],
  [
    "/patients/:patientId/reports",
    (p, body) => createReport({ ...body, patientId: p.patientId }),
  ],
  ["/orders/:id/cancel", (p) => cancelOrder(p.id)],
];

// ---------- RUTAS PUT ----------
const PUT_ROUTES = [
  ["/patients/:id", (p, body) => updatePatient(p.id, body)],
  ["/sessions/:id", (p, body) => updateSession(p.id, body)],
  ["/notes/:id", (p, body) => updateNote(p.id, body)],
];

// ---------- RUTAS DELETE ----------
const DELETE_ROUTES = [
  ["/patients/:id", (p) => deletePatient(p.id)],
];

async function request(path, options = {}) {
  if (typeof window !== "undefined") {
    hydrateFromStorage();
  }

  const method = (options.method || "GET").toUpperCase();
  const body = trimBody(options.body);
  const { pathname, query } = splitPath(path);

  await delay();

  let routes;
  if (method === "GET") routes = GET_ROUTES;
  else if (method === "POST" || method === "PATCH") routes = POST_ROUTES;
  else if (method === "PUT") routes = PUT_ROUTES;
  else if (method === "DELETE") routes = DELETE_ROUTES;
  else routes = [];

  const match = firstMatch(pathname, routes);
  if (!match) {
    if (method === "DELETE") return { ok: true };
    if (method === "POST" || method === "PUT" || method === "PATCH") {
      return { ok: true };
    }
    return {};
  }
  try {
    return match.handler(match.params, body, query);
  } catch (err) {
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

export { store };
export default api;
