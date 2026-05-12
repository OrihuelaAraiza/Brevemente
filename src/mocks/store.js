// Tienda mock con persistencia en localStorage.
// Primer arranque siembra los arrays desde data.js; después vive sólo en localStorage.
// Las mutaciones (crear/editar/borrar) se guardan para que al refrescar la demo no pierda cambios.

import {
  USERS as SEED_USERS,
  PATIENTS as SEED_PATIENTS,
  SESSIONS as SEED_SESSIONS,
  NOTES as SEED_NOTES,
  PRESCRIPTIONS as SEED_PRESCRIPTIONS,
  REPORTS as SEED_REPORTS,
  ORDERS as SEED_ORDERS,
  CONSENTS as SEED_CONSENTS,
  CLINICAL_HISTORY as SEED_CLINICAL_HISTORY,
  AUDIT_LOGS as SEED_AUDIT_LOGS,
} from "./data";

const KEY_PREFIX = "romimente.demo.";

const KEYS = {
  patients: KEY_PREFIX + "patients",
  sessions: KEY_PREFIX + "sessions",
  notes: KEY_PREFIX + "notes",
  prescriptions: KEY_PREFIX + "prescriptions",
  reports: KEY_PREFIX + "reports",
  orders: KEY_PREFIX + "orders",
  consents: KEY_PREFIX + "consents",
  history: KEY_PREFIX + "history",
  audit: KEY_PREFIX + "audit",
};

const isBrowser = () => typeof window !== "undefined";

// Cache en memoria para que el apiClient sea síncrono aun antes de hidratar.
const memory = {
  patients: structuredClone(SEED_PATIENTS),
  sessions: structuredClone(SEED_SESSIONS),
  notes: structuredClone(SEED_NOTES),
  prescriptions: structuredClone(SEED_PRESCRIPTIONS),
  reports: structuredClone(SEED_REPORTS),
  orders: structuredClone(SEED_ORDERS),
  consents: structuredClone(SEED_CONSENTS),
  history: structuredClone(SEED_CLINICAL_HISTORY),
  audit: structuredClone(SEED_AUDIT_LOGS),
};

function load(key, fallback) {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function save(key, value) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota / privacy mode — ignoramos
  }
}

let hydrated = false;
export function hydrateFromStorage() {
  if (!isBrowser() || hydrated) return;
  memory.patients = load(KEYS.patients, memory.patients);
  memory.sessions = load(KEYS.sessions, memory.sessions);
  memory.notes = load(KEYS.notes, memory.notes);
  memory.prescriptions = load(KEYS.prescriptions, memory.prescriptions);
  memory.reports = load(KEYS.reports, memory.reports);
  memory.orders = load(KEYS.orders, memory.orders);
  memory.consents = load(KEYS.consents, memory.consents);
  memory.history = load(KEYS.history, memory.history);
  memory.audit = load(KEYS.audit, memory.audit);
  hydrated = true;
}

export function resetStore() {
  memory.patients = structuredClone(SEED_PATIENTS);
  memory.sessions = structuredClone(SEED_SESSIONS);
  memory.notes = structuredClone(SEED_NOTES);
  memory.prescriptions = structuredClone(SEED_PRESCRIPTIONS);
  memory.reports = structuredClone(SEED_REPORTS);
  memory.orders = structuredClone(SEED_ORDERS);
  memory.consents = structuredClone(SEED_CONSENTS);
  memory.history = structuredClone(SEED_CLINICAL_HISTORY);
  memory.audit = structuredClone(SEED_AUDIT_LOGS);
  if (isBrowser()) {
    Object.values(KEYS).forEach((k) => window.localStorage.removeItem(k));
  }
}

function persist(collectionKey) {
  if (!isBrowser()) return;
  const storageKey = KEYS[collectionKey];
  if (!storageKey) return;
  save(storageKey, memory[collectionKey]);
}

// ---------- Getters ----------
export const getAll = {
  patients: () => memory.patients,
  sessions: () => memory.sessions,
  notes: () => memory.notes,
  prescriptions: () => memory.prescriptions,
  reports: () => memory.reports,
  orders: () => memory.orders,
  consents: () => memory.consents,
  audit: () => memory.audit,
  history: () => memory.history,
};

// ---------- Helpers ----------
function genId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now()
    .toString(36)
    .slice(-3)}`;
}

function pushAudit(entry) {
  memory.audit.unshift({
    id: genId("a"),
    at: new Date().toISOString(),
    ...entry,
  });
  persist("audit");
}

// ---------- Mutaciones ----------

export function createPatient(data) {
  const patient = {
    id: genId("p"),
    name: data.name || `${data.firstName || ""} ${data.lastName || ""}`.trim(),
    email: data.email || "",
    phone: data.phone || "",
    birthDate: data.birthDate || null,
    gender: data.gender || "",
    civilStatus: data.civilStatus || "",
    address: data.address || "",
    activeConsent: Boolean(data.activeConsent),
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    nextSession: null,
    ...data,
  };
  memory.patients.unshift(patient);
  persist("patients");
  pushAudit({ user: "demo", action: "PATIENT_CREATE", detail: patient.name });
  return patient;
}

export function updatePatient(id, patch) {
  const idx = memory.patients.findIndex((p) => p.id === id);
  if (idx < 0) return null;
  memory.patients[idx] = { ...memory.patients[idx], ...patch, id };
  persist("patients");
  pushAudit({ user: "demo", action: "PATIENT_UPDATE", detail: id });
  return memory.patients[idx];
}

export function deletePatient(id) {
  memory.patients = memory.patients.filter((p) => p.id !== id);
  persist("patients");
  pushAudit({ user: "demo", action: "PATIENT_DELETE", detail: id });
  return { ok: true };
}

export function createSession(data) {
  const patient = memory.patients.find((p) => p.id === data.patientId);
  const session = {
    id: genId("s"),
    patientId: data.patientId,
    patientName: patient?.name || data.patientName || "Paciente",
    professionalId: data.professionalId || "u-pro",
    professionalName: data.professionalName || "Dra. Ana García",
    scheduledAt: data.scheduledAt || data.datetime || new Date().toISOString(),
    duration: Number(data.duration || 50),
    modality: data.modality || "IN_PERSON",
    status: data.status || "SCHEDULED",
    notes: data.notes || "",
    ...data,
  };
  memory.sessions.unshift(session);
  persist("sessions");
  pushAudit({
    user: "demo",
    action: "SESSION_CREATE",
    detail: session.patientName,
  });
  return session;
}

export function updateSession(id, patch) {
  const idx = memory.sessions.findIndex((s) => s.id === id);
  if (idx < 0) return null;
  memory.sessions[idx] = { ...memory.sessions[idx], ...patch, id };
  persist("sessions");
  return memory.sessions[idx];
}

export function updateSessionStatus(id, status) {
  return updateSession(id, { status });
}

export function createNote(data) {
  const patient = memory.patients.find((p) => p.id === data.patientId);
  const note = {
    id: genId("n"),
    patientId: data.patientId,
    sessionId: data.sessionId || null,
    createdAt: new Date().toISOString(),
    author: data.author || "Dra. Ana García",
    title: data.title || "Nota",
    content: data.content || "",
    status: "DRAFT",
    ...data,
  };
  memory.notes.unshift(note);
  persist("notes");
  pushAudit({
    user: note.author,
    action: "NOTE_CREATE",
    detail: patient?.name || "",
  });
  return note;
}

export function updateNote(id, patch) {
  const idx = memory.notes.findIndex((n) => n.id === id);
  if (idx < 0) return null;
  memory.notes[idx] = { ...memory.notes[idx], ...patch, id };
  persist("notes");
  return memory.notes[idx];
}

export function closeNote(id) {
  return updateNote(id, { status: "CLOSED", closedAt: new Date().toISOString() });
}

export function signNote(id) {
  return updateNote(id, {
    status: "SIGNED",
    signedAt: new Date().toISOString(),
  });
}

export function appendNoteAddendum(id, text) {
  const idx = memory.notes.findIndex((n) => n.id === id);
  if (idx < 0) return null;
  const current = memory.notes[idx];
  const addendums = [
    ...(current.addendums || []),
    { text, at: new Date().toISOString(), author: current.author },
  ];
  memory.notes[idx] = { ...current, addendums };
  persist("notes");
  return memory.notes[idx];
}

export function createPrescription(data) {
  const patient = memory.patients.find(
    (p) => p.id === data.patientId || p.id === data.patientRecordId,
  );
  const rx = {
    id: genId("rx"),
    patientId: data.patientId || data.patientRecordId,
    patientName: patient?.name || "Paciente",
    createdAt: new Date().toISOString(),
    issuedBy: data.issuedBy || "Dra. Ana García",
    folio: `RX-${Date.now().toString(36).toUpperCase()}`,
    status: "ACTIVE",
    items: data.items || [],
    ...data,
  };
  memory.prescriptions.unshift(rx);
  persist("prescriptions");
  pushAudit({
    user: rx.issuedBy,
    action: "PRESCRIPTION_CREATE",
    detail: rx.patientName,
  });
  return rx;
}

export function suspendPrescription(id) {
  const idx = memory.prescriptions.findIndex((x) => x.id === id);
  if (idx < 0) return null;
  memory.prescriptions[idx] = {
    ...memory.prescriptions[idx],
    status: "SUSPENDED",
    suspendedAt: new Date().toISOString(),
  };
  persist("prescriptions");
  return memory.prescriptions[idx];
}

export function createReport(data) {
  const report = {
    id: genId("r"),
    createdAt: new Date().toISOString(),
    author: data.author || "Dra. Ana García",
    status: "FINAL",
    ...data,
  };
  memory.reports.unshift(report);
  persist("reports");
  return report;
}

export function createOrder(data) {
  const order = {
    id: genId("o"),
    createdAt: new Date().toISOString(),
    status: "PENDING",
    ...data,
  };
  memory.orders.unshift(order);
  persist("orders");
  return order;
}

export function cancelOrder(id) {
  const idx = memory.orders.findIndex((o) => o.id === id);
  if (idx < 0) return null;
  memory.orders[idx] = {
    ...memory.orders[idx],
    status: "CANCELLED",
    cancelledAt: new Date().toISOString(),
  };
  persist("orders");
  return memory.orders[idx];
}

export function signConsent(patientId, type) {
  const existing = memory.consents.find(
    (c) => c.patientId === patientId && c.type === type,
  );
  if (existing) {
    existing.signed = true;
    existing.signedAt = new Date().toISOString();
  } else {
    memory.consents.push({
      id: genId("c"),
      patientId,
      type,
      signed: true,
      signedAt: new Date().toISOString(),
    });
  }
  persist("consents");
  return { ok: true };
}

export function setClinicalHistory(patientId, data) {
  memory.history[patientId] = {
    patientId,
    updatedAt: new Date().toISOString(),
    data,
  };
  persist("history");
  return memory.history[patientId];
}

export function getClinicalHistoryFor(patientId) {
  return memory.history[patientId] || null;
}

// ---------- Exponer helper genérico para devtools ----------
if (isBrowser()) {
  window.__ROMI_DEMO__ = {
    reset: resetStore,
    dump: () => structuredClone(memory),
  };
}

export { SEED_USERS as USERS };

export default {
  hydrateFromStorage,
  resetStore,
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
};
