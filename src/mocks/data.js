// Datos hardcodeados para demo sin backend
// Credenciales de login — un usuario por cada rol

export const USERS = [
  {
    id: "u-admin",
    name: "Sofía Admin",
    email: "admin@romimente.mx",
    password: "admin123",
    role: "ADMIN",
    phone: "+52 55 0000 0001",
  },
  {
    id: "u-pro",
    name: "Dra. Ana García",
    email: "profesional@romimente.mx",
    password: "pro123",
    role: "PROFESSIONAL",
    phone: "+52 55 0000 0002",
    license: "CED-9876543",
    specialty: "Psicología clínica",
  },
  {
    id: "u-asis",
    name: "Luis Asistente",
    email: "asistente@romimente.mx",
    password: "asis123",
    role: "ASSISTANT",
    phone: "+52 55 0000 0003",
  },
  {
    id: "u-pac",
    name: "Mariana Paciente",
    email: "paciente@romimente.mx",
    password: "pac123",
    role: "PATIENT",
    phone: "+52 55 0000 0004",
  },
];

export function findUserByCredentials(email, password) {
  const e = String(email || "").trim().toLowerCase();
  return USERS.find(
    (u) => u.email.toLowerCase() === e && u.password === password,
  );
}

export function findUserByEmail(email) {
  const e = String(email || "").trim().toLowerCase();
  return USERS.find((u) => u.email.toLowerCase() === e);
}

export const PATIENTS = [
  {
    id: "p-1",
    name: "Carlos Ruiz Mendoza",
    email: "carlos.ruiz@mail.com",
    phone: "+52 55 1234 5678",
    birthDate: "1992-04-15",
    gender: "M",
    civilStatus: "SOLTERO",
    address: "Av. Reforma 123, CDMX",
    activeConsent: true,
    createdAt: "2025-01-10T10:00:00Z",
    status: "ACTIVE",
    nextSession: "2026-04-29T16:00:00Z",
  },
  {
    id: "p-2",
    name: "Laura Jiménez Torres",
    email: "laura.jimenez@mail.com",
    phone: "+52 55 2345 6789",
    birthDate: "1988-08-22",
    gender: "F",
    civilStatus: "CASADO",
    address: "Calle Sol 45, Guadalajara",
    activeConsent: true,
    createdAt: "2025-02-05T09:30:00Z",
    status: "ACTIVE",
    nextSession: "2026-04-24T17:00:00Z",
  },
  {
    id: "p-3",
    name: "Ricardo Pérez López",
    email: "ricardo.perez@mail.com",
    phone: "+52 55 3456 7890",
    birthDate: "1975-12-01",
    gender: "M",
    civilStatus: "DIVORCIADO",
    address: "Av. Hidalgo 89, Monterrey",
    activeConsent: false,
    createdAt: "2024-11-20T14:15:00Z",
    status: "ACTIVE",
    nextSession: null,
  },
  {
    id: "p-4",
    name: "Elena Torres Navarro",
    email: "elena.torres@mail.com",
    phone: "+52 55 4567 8901",
    birthDate: "2001-03-10",
    gender: "F",
    civilStatus: "SOLTERO",
    address: "Calle Luna 12, Puebla",
    activeConsent: true,
    createdAt: "2025-03-18T11:00:00Z",
    status: "ACTIVE",
    nextSession: "2026-04-26T15:00:00Z",
  },
];

export const SESSIONS = [
  {
    id: "s-1",
    patientId: "p-1",
    patientName: "Carlos Ruiz Mendoza",
    professionalId: "u-pro",
    professionalName: "Dra. Ana García",
    scheduledAt: "2026-04-29T16:00:00Z",
    duration: 50,
    modality: "IN_PERSON",
    status: "SCHEDULED",
    notes: "",
  },
  {
    id: "s-2",
    patientId: "p-2",
    patientName: "Laura Jiménez Torres",
    professionalId: "u-pro",
    professionalName: "Dra. Ana García",
    scheduledAt: "2026-04-24T17:00:00Z",
    duration: 50,
    modality: "TELEMEDICINE",
    status: "CONFIRMED",
    notes: "Sesión 3 de 12 — Marcador progreso",
  },
  {
    id: "s-3",
    patientId: "p-1",
    patientName: "Carlos Ruiz Mendoza",
    professionalId: "u-pro",
    professionalName: "Dra. Ana García",
    scheduledAt: "2026-04-15T16:00:00Z",
    duration: 50,
    modality: "IN_PERSON",
    status: "COMPLETED",
    notes: "Avance en objetivos terapéuticos.",
  },
  {
    id: "s-4",
    patientId: "p-4",
    patientName: "Elena Torres Navarro",
    professionalId: "u-pro",
    professionalName: "Dra. Ana García",
    scheduledAt: "2026-04-26T15:00:00Z",
    duration: 50,
    modality: "IN_PERSON",
    status: "SCHEDULED",
    notes: "",
  },
];

export const NOTES = [
  {
    id: "n-1",
    patientId: "p-1",
    sessionId: "s-3",
    createdAt: "2026-04-15T17:00:00Z",
    author: "Dra. Ana García",
    title: "Nota sesión 15 abr",
    content:
      "Paciente reporta mejora en regulación emocional. Se mantiene plan terapéutico.",
  },
  {
    id: "n-2",
    patientId: "p-2",
    sessionId: null,
    createdAt: "2026-04-10T11:30:00Z",
    author: "Dra. Ana García",
    title: "Revisión trimestral",
    content: "Se observa disminución en frecuencia de crisis de ansiedad.",
  },
];

export const PRESCRIPTIONS = [
  {
    id: "rx-1",
    patientId: "p-1",
    patientName: "Carlos Ruiz Mendoza",
    createdAt: "2026-03-28T10:00:00Z",
    issuedBy: "Dra. Ana García",
    status: "ACTIVE",
    items: [
      {
        substance: "Sertralina",
        form: "Tableta",
        dose: "50 mg",
        route: "Oral",
        frequency: "1 vez al día",
        duration: "30 días",
        notes: "Tomar por la mañana.",
      },
    ],
  },
];

export const REPORTS = [
  {
    id: "r-1",
    patientId: "p-1",
    patientName: "Carlos Ruiz Mendoza",
    createdAt: "2026-03-20T09:00:00Z",
    author: "Dra. Ana García",
    type: "CONSTANCIA",
    title: "Constancia de tratamiento",
    status: "FINAL",
  },
];

export const ORDERS = [
  {
    id: "o-1",
    patientId: "p-1",
    patientName: "Carlos Ruiz Mendoza",
    createdAt: "2026-03-25T10:30:00Z",
    type: "LAB",
    description: "Biometría hemática",
    status: "PENDING",
  },
];

export const CONSENTS = [
  {
    id: "c-1",
    patientId: "p-1",
    type: "attention",
    signed: true,
    signedAt: "2025-01-10T10:05:00Z",
  },
  {
    id: "c-2",
    patientId: "p-1",
    type: "recording",
    signed: true,
    signedAt: "2025-01-10T10:05:00Z",
  },
  {
    id: "c-3",
    patientId: "p-1",
    type: "ai_use",
    signed: false,
    signedAt: null,
  },
];

export const DASHBOARD_STATS = {
  totalPatients: PATIENTS.length,
  activeSessionsToday: 2,
  pendingReports: 1,
  activePrescriptions: 1,
  completedSessionsMonth: 18,
};

export const AUDIT_LOGS = [
  {
    id: "a-1",
    at: "2026-04-22T08:30:00Z",
    user: "Dra. Ana García",
    action: "LOGIN",
    detail: "Inicio de sesión",
  },
  {
    id: "a-2",
    at: "2026-04-22T09:15:00Z",
    user: "Dra. Ana García",
    action: "PATIENT_VIEW",
    detail: "Consultó expediente de Carlos Ruiz Mendoza",
  },
];

export const CLINICAL_HISTORY = {
  "p-1": {
    patientId: "p-1",
    updatedAt: "2026-02-10T15:00:00Z",
    data: {
      motivoConsulta: "Ansiedad generalizada y problemas de sueño.",
      antecedentesFamiliares: "Madre con historial de ansiedad.",
      antecedentesPersonales: "Sin antecedentes médicos relevantes.",
      medicacionActual: "Ninguna",
      diagnostico: "F41.1 — Trastorno de ansiedad generalizada",
    },
  },
};

function genId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

export const mockDb = {
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
  genId,
};

export default mockDb;
