import { addDays, startOfWeek, setHours, setMinutes } from "date-fns";

// ─── Criterios de Evaluación ────────────────────────────────────────────────
export const criterios = [
  { id: "marcador_inicio",        label: "Marcador de inicio",      color: "#27AE60", soloSesion1: true  },
  { id: "mejoria_significativa",  label: "Mejoría significativa",   color: "#27AE60", soloSesion1: false },
  { id: "mejoria_leve",           label: "Mejoría leve",            color: "#9CA3AF", soloSesion1: false },
  { id: "sin_cambios",            label: "Sin cambios",             color: "#9CA3AF", soloSesion1: false },
  { id: "empeoramiento",          label: "Empeoramiento",           color: "#E74C3C", soloSesion1: false },
  { id: "nuevo_patron",           label: "Nuevo patrón",            color: "#E74C3C", soloSesion1: false },
  { id: "recaida",                label: "Recaída",                 color: "#E74C3C", soloSesion1: false },
];

export function getCriterioColor(id: string): string {
  return criterios.find((c) => c.id === id)?.color ?? "#9CA3AF";
}

// ─── Pacientes ───────────────────────────────────────────────────────────────
export const mockPacientes = [
  { id: "1", nombre: "Rosa María",  apellido: "Espinosa García",  folio: "247890", fechaInicio: "2025-02-01", protocolo: "Ataque de Pánico",              estado: "activo"    },
  { id: "2", nombre: "Alberto",     apellido: "Gómez Sánchez",    folio: "247891", fechaInicio: "2025-03-15", protocolo: "Trastorno Depresivo tipo 1",     estado: "activo"    },
  { id: "3", nombre: "Olga",        apellido: "Sánchez Ruíz",     folio: "247892", fechaInicio: "2025-01-10", protocolo: "Paranoia tipo 1",                estado: "activo"    },
  { id: "4", nombre: "Mía",         apellido: "Vázquez Torres",   folio: "247893", fechaInicio: "2025-04-05", protocolo: "Trastorno Obsesivo",             estado: "activo"    },
  { id: "5", nombre: "Martha",      apellido: "Ruíz Mendoza",     folio: "247894", fechaInicio: "2024-11-20", protocolo: "Trastorno Depresivo tipo 2",     estado: "activo"    },
  { id: "6", nombre: "Carlos",      apellido: "Fuentes López",    folio: "247895", fechaInicio: "2025-02-28", protocolo: "Trastorno por Angustia",         estado: "archivado" },
  { id: "7", nombre: "Elena",       apellido: "Morales Pérez",    folio: "247896", fechaInicio: "2024-09-15", protocolo: "Paranoia tipo 1",                estado: "archivado" },
  { id: "8", nombre: "Fernando",    apellido: "Castro Ibáñez",    folio: "247897", fechaInicio: "2025-05-01", protocolo: "Ataque de Pánico",              estado: "activo"    },
];

// ─── Citas del día (para Dashboard) ─────────────────────────────────────────
export const mockCitasHoy = [
  { id: "c1", pacienteId: "1", nombre: "Rosa María Espinosa",  hora: "9:00 am"  },
  { id: "c2", pacienteId: "2", nombre: "Alberto Gómez",         hora: "10:00 am" },
  { id: "c3", pacienteId: "3", nombre: "Olga Sánchez",          hora: "11:00 am" },
  { id: "c4", pacienteId: "4", nombre: "Mía Vázquez",           hora: "12:00 pm" },
  { id: "c5", pacienteId: "5", nombre: "Martha Ruíz",           hora: "1:00 pm"  },
  { id: "c6", pacienteId: "5", nombre: "Martha Ruíz",           hora: "4:00 pm"  },
  { id: "c7", pacienteId: "5", nombre: "Martha Ruíz",           hora: "5:00 pm"  },
];

// ─── Eventos FullCalendar ────────────────────────────────────────────────────
function todayAt(h: number, m = 0) {
  return setMinutes(setHours(new Date(), h), m).toISOString();
}
function dayAt(offset: number, h: number, m = 0) {
  return setMinutes(setHours(addDays(new Date(), offset), h), m).toISOString();
}

export const mockCalendarEvents = [
  {
    id: "e1", title: "Rosa M. Espinosa",
    start: todayAt(9), end: todayAt(10),
    backgroundColor: "#27AE60", borderColor: "#1E8449",
    extendedProps: { tipo: "consulta" },
  },
  {
    id: "e2", title: "Alberto Gómez",
    start: todayAt(10), end: todayAt(11),
    backgroundColor: "#27AE60", borderColor: "#1E8449",
    extendedProps: { tipo: "consulta" },
  },
  {
    id: "e3", title: "Supervisión grupal",
    start: todayAt(12), end: todayAt(14),
    backgroundColor: "#E74C3C", borderColor: "#C0392B",
    extendedProps: { tipo: "supervision" },
  },
  {
    id: "e4", title: "Olga Sánchez",
    start: dayAt(1, 9), end: dayAt(1, 10),
    backgroundColor: "#27AE60", borderColor: "#1E8449",
    extendedProps: { tipo: "consulta" },
  },
  {
    id: "e5", title: "Martha Ruíz",
    start: dayAt(2, 11), end: dayAt(2, 12),
    backgroundColor: "#27AE60", borderColor: "#1E8449",
    extendedProps: { tipo: "consulta" },
  },
  {
    id: "e6", title: "Fernando Castro",
    start: dayAt(3, 16), end: dayAt(3, 17),
    backgroundColor: "#27AE60", borderColor: "#1E8449",
    extendedProps: { tipo: "consulta" },
  },
];

// ─── Sesiones del Expediente ─────────────────────────────────────────────────
export type CampoKey =
  | "percepcion_control" | "percepcion_vergüenza"
  | "pensamiento_catastrofico" | "pensamiento_anticipacion"
  | "sensacion_miedo" | "sensacion_vergüenza"
  | "reaccion_evitacion" | "reaccion_precauciones"
  | "reaccion_prueba" | "reaccion_hipervigilancia"
  | "reaccion_distraerse" | "reaccion_hablar" | "reaccion_ayuda";

export type Sesion = {
  id: string;
  numero: number;
  fecha: string;
  fase: number;
  completada: boolean;
  campos: Partial<Record<CampoKey, string>>;
};

export const mockSesiones: Sesion[] = [
  {
    id: "s1", numero: 1, fecha: "2026-03-04", fase: 1, completada: true,
    campos: {
      percepcion_control: "marcador_inicio",
      percepcion_vergüenza: "marcador_inicio",
      pensamiento_catastrofico: "marcador_inicio",
      pensamiento_anticipacion: "marcador_inicio",
      sensacion_miedo: "marcador_inicio",
      sensacion_vergüenza: "marcador_inicio",
      reaccion_evitacion: "marcador_inicio",
      reaccion_precauciones: "marcador_inicio",
      reaccion_prueba: "marcador_inicio",
      reaccion_hipervigilancia: "marcador_inicio",
      reaccion_distraerse: "marcador_inicio",
      reaccion_hablar: "marcador_inicio",
      reaccion_ayuda: "marcador_inicio",
    },
  },
  {
    id: "s2", numero: 2, fecha: "2026-03-11", fase: 1, completada: true,
    campos: {
      percepcion_control: "mejoria_leve",
      percepcion_vergüenza: "sin_cambios",
      pensamiento_catastrofico: "mejoria_leve",
      pensamiento_anticipacion: "sin_cambios",
      sensacion_miedo: "sin_cambios",
      sensacion_vergüenza: "mejoria_leve",
      reaccion_evitacion: "sin_cambios",
      reaccion_precauciones: "mejoria_leve",
      reaccion_prueba: "sin_cambios",
      reaccion_hipervigilancia: "sin_cambios",
      reaccion_distraerse: "mejoria_leve",
      reaccion_hablar: "sin_cambios",
      reaccion_ayuda: "sin_cambios",
    },
  },
  {
    id: "s3", numero: 3, fecha: "2026-03-18", fase: 2, completada: false,
    campos: {},
  },
];

// ─── Items del Expediente (estructura de campos) ─────────────────────────────
export const expedienteSecciones = [
  {
    id: "percepcion",
    label: "Percepción",
    items: [
      { key: "percepcion_control" as CampoKey, label: "Miedo a perder el control / enloquecer" },
      { key: "percepcion_vergüenza" as CampoKey, label: "Vergüenza / Humillación pública" },
    ],
  },
  {
    id: "pensamientos",
    label: "Pensamientos",
    items: [
      { key: "pensamiento_catastrofico" as CampoKey, label: "Anticipaciones catastróficas" },
      { key: "pensamiento_anticipacion" as CampoKey, label: "Anticipación de rechazo social" },
    ],
  },
  {
    id: "sensaciones",
    label: "Sensaciones",
    items: [
      { key: "sensacion_miedo" as CampoKey, label: "Miedo primario" },
      { key: "sensacion_vergüenza" as CampoKey, label: "Vergüenza secundaria" },
    ],
  },
  {
    id: "reacciones",
    label: "Reacciones",
    items: [
      { key: "reaccion_evitacion" as CampoKey, label: "Evitación progresiva situaciones externas" },
      { key: "reaccion_precauciones" as CampoKey, label: "Tomar precauciones" },
      { key: "reaccion_prueba" as CampoKey, label: "Ponerse a prueba" },
      { key: "reaccion_hipervigilancia" as CampoKey, label: "Hipervigilancia somática" },
      { key: "reaccion_distraerse" as CampoKey, label: "Distraerse" },
      { key: "reaccion_hablar" as CampoKey, label: "Hablar del problema" },
      { key: "reaccion_ayuda" as CampoKey, label: "Petición de ayuda" },
    ],
  },
];

export const allCampoKeys = expedienteSecciones.flatMap((s) => s.items.map((i) => i.key));

// ─── Protocolos TBE ───────────────────────────────────────────────────────────
export const mockProtocolos = [
  { id: 1,  nombre: "Protocolo Ataque de Pánico",                                             descripcion: "Tratamiento para el trastorno de pánico con o sin agorafobia. Incluye psicoeducación, exposición interoceptiva y técnicas de manejo de ansiedad." },
  { id: 2,  nombre: "Protocolo Miedo a perder el control tipo 1: hablar en público",           descripcion: "Aborda el miedo específico a perder el control en situaciones de exposición social. Énfasis en reestructuración cognitiva y exposición gradual." },
  { id: 3,  nombre: "Protocolo Miedo a perder el control tipo 2: enloquecer",                  descripcion: "Para pacientes con miedo a la locura o pérdida de control mental. Incluye normalización del pensamiento intrusivo y técnicas de defusión cognitiva." },
  { id: 4,  nombre: "Protocolo Trastorno Obsesivo: pensamiento y comportamiento",              descripcion: "Tratamiento para TOC con componentes de exposición y prevención de respuesta (EPR). Adaptado al modelo TBE con análisis funcional detallado." },
  { id: 5,  nombre: "Protocolo Trastorno por Angustia: miedo a fracasar",                      descripcion: "Para pacientes con angustia anticipatoria centrada en el fracaso. Incluye identificación de creencias nucleares y trabajo de autoestima." },
  { id: 6,  nombre: "Protocolo Trastorno por Angustia: miedo a la inadecuación",               descripcion: "Aborda el miedo a ser inadecuado o insuficiente. Trabajo con esquemas cognitivos de incompetencia y estrategias de aceptación." },
  { id: 7,  nombre: "Protocolo Paranoia tipo 1: paranoia hacia uno mismo",                     descripcion: "Para trastornos paranoicos focalizados en percepciones sobre uno mismo. Trabajo con hipersensibilidad perceptual y reencuadre narrativo." },
  { id: 8,  nombre: "Protocolo Trastorno Depresivo tipo 1: deprimido radical",                 descripcion: "Depresión caracterizada por negativismo radical y desesperanza. Activación conductual, trabajo con pensamientos automáticos y reconstrucción de sentido." },
  { id: 9,  nombre: "Protocolo Trastorno Depresivo tipo 2: iluso desilusionado",               descripcion: "Depresión post-decepción con ruptura de expectativas irreales. Trabajo con el ciclo ilusión-desilusión y construcción de expectativas realistas." },
  { id: 10, nombre: "Protocolo Trastorno Depresivo tipo 3: de los demás",                      descripcion: "Depresión reactiva a conductas de otros. Trabajo con límites, assertividad y regulación emocional interpersonal." },
  { id: 11, nombre: "Protocolo Trastorno Depresivo tipo 4: deprimido moralista",               descripcion: "Depresión con fuerte componente moral y autojuicio. Trabajo con reglas rígidas, perfeccionismo y autocompasión." },
  { id: 12, nombre: "Protocolo Paranoia tipo 1: miedo a fracasar",                             descripcion: "Paranoia centrada en anticipación de fracaso y evaluación negativa. Exposición cognitiva y trabajo con sesgos atribucionales." },
  { id: 13, nombre: "Protocolo Paranoia tipo 2: paranoia hacia los demás",                     descripcion: "Para desconfianza crónica hacia el entorno social. Trabajo con esquemas de traición y técnicas de verificación de evidencia." },
  { id: 14, nombre: "Protocolo Fobia Social tipo 1: miedo al ridículo",                        descripcion: "Fobia social centrada en el ridículo y la vergüenza pública. Exposición graduada y reestructuración de creencias sobre evaluación social." },
  { id: 15, nombre: "Protocolo Fobia Social tipo 2: miedo al rechazo",                         descripcion: "Para pacientes con sensibilidad extrema al rechazo interpersonal. Trabajo con apego, tolerancia a la frustración y conductas de búsqueda de aprobación." },
  { id: 16, nombre: "Protocolo Fobia Específica: objetos y situaciones",                       descripcion: "Tratamiento para fobias específicas con modelo de exposición sistemática y desensibilización. Incluye jerarquía de situaciones temidas." },
  { id: 17, nombre: "Protocolo Trastorno de Ansiedad Generalizada tipo 1",                     descripcion: "TAGs con preocupación crónica y difusa. Trabajo con intolerancia a la incertidumbre, preocupación metacognitiva y relajación aplicada." },
  { id: 18, nombre: "Protocolo Trastorno de Ansiedad Generalizada tipo 2",                     descripcion: "TAGs con componente somático predominante. Técnicas de regulación autonómica, psicoeducación sobre ansiedad y exposición cognitiva." },
  { id: 19, nombre: "Protocolo Estrés Postraumático tipo 1: trauma simple",                    descripcion: "TEPT con evento traumático único. Procesamiento del recuerdo traumático, reducción de evitación y reconstrucción de significado." },
  { id: 20, nombre: "Protocolo Estrés Postraumático tipo 2: trauma complejo",                  descripcion: "TEPT complejo con trauma acumulativo o crónico. Fases de estabilización, procesamiento y reintegración. Trabajo con disociación." },
  { id: 21, nombre: "Protocolo Duelo patológico tipo 1: duelo por pérdida",                    descripcion: "Duelo complicado por muerte o pérdida significativa. Trabajo con tareas del duelo, rituales terapéuticos y reconstrucción del mundo de supuestos." },
  { id: 22, nombre: "Protocolo Duelo patológico tipo 2: duelo por separación",                 descripcion: "Duelo por separación amorosa o ruptura vincular. Trabajo con dependencia emocional, identidad y construcción de nueva narrativa." },
  { id: 23, nombre: "Protocolo Trastorno de Personalidad: rasgos evitadores",                  descripcion: "Para rasgos de personalidad evitadora. Trabajo gradual con exposición social, construcción de autoimagen y desarrollo de habilidades interpersonales." },
  { id: 24, nombre: "Protocolo Trastorno de Personalidad: rasgos dependientes",                descripcion: "Rasgos de personalidad dependiente. Trabajo con autonomía, toma de decisiones y desactivación de conductas de búsqueda de seguridad." },
  { id: 25, nombre: "Protocolo Hipocondría y Ansiedad por la Salud tipo 1",                    descripcion: "Para preocupación excesiva por enfermedad con comprobaciones somáticas. Trabajo con interpretaciones catastrofistas de síntomas y conductas de reaseguramiento." },
  { id: 26, nombre: "Protocolo Hipocondría y Ansiedad por la Salud tipo 2",                    descripcion: "Ansiedad por salud con evitación de información médica. Exposición gradual, psicoeducación y diferenciación síntoma-catástrofe." },
  { id: 27, nombre: "Protocolo Disfunción Sexual: ansiedad de desempeño",                      descripcion: "Para disfunciones sexuales mediadas por ansiedad. Trabajo con foco sensorial, reducción de presión de desempeño y comunicación de pareja." },
  { id: 28, nombre: "Protocolo Trastorno Alimentario: conductas restrictivas",                  descripcion: "Para restrictores con distorsión de imagen corporal. Trabajo con reglas alimentarias, exposición a alimentos temidos y reconstrucción de imagen corporal." },
  { id: 29, nombre: "Protocolo Insomnio y Trastornos del Sueño",                               descripcion: "Insomnio crónico con ansiedad de rendimiento. Control de estímulos, restricción de sueño, higiene del sueño y trabajo cognitivo sobre el sueño." },
  { id: 30, nombre: "Protocolo Manejo del Enojo y Agresividad",                                descripcion: "Para problemas de regulación de la ira. Identificación de disparadores, trabajo con interpretaciones hostiles y habilidades de afrontamiento asertivo." },
  { id: 31, nombre: "Protocolo Adicciones: dependencia a sustancias",                          descripcion: "Para dependencia a alcohol o drogas. Trabajo motivacional, identificación de cravings, manejo de situaciones de alto riesgo y prevención de recaídas." },
  { id: 32, nombre: "Protocolo Adicciones: conductas compulsivas digitales",                   descripcion: "Para uso problemático de pantallas, redes sociales y videojuegos. Trabajo con refuerzo variable, identidad digital y regulación de dopamina comportamental." },
];

// ─── Conversaciones Brifi ─────────────────────────────────────────────────────
export const mockConversaciones = [
  { id: "conv1", titulo: "PX del paranoico" },
  { id: "conv2", titulo: "Diferencia entre TAGs..." },
  { id: "conv3", titulo: "SPR OBS característ..." },
];

export const brifiMockResponses = [
  "Según el Protocolo de Ataque de Pánico TBE, la percepción de pérdida de control es un marcador central en la primera sesión. Es importante diferenciar entre el miedo primario (la sensación fisiológica) y la vergüenza secundaria (el juicio sobre la sensación). En sesiones tempranas, el énfasis debe estar en la psicoeducación sobre la naturaleza del pánico.",
  "En el modelo TBE, la distinción entre Marcador de Inicio y Mejoría Leve es clínica y no solo cuantitativa. El Marcador de Inicio registra la presencia del síntoma al inicio del tratamiento, mientras que Mejoría Leve indica que el paciente reporta menos intensidad o frecuencia, pero el síntoma sigue presente con impacto funcional.",
  "Las conductas de reaseguramiento (como pedir ayuda, hablar del problema) son parte de las Reacciones del tipo Combatir en el protocolo TBE. Aunque se perciben como alivio a corto plazo, mantienen el ciclo de ansiedad. La intervención debe orientarse a la exposición sin reaseguramiento progresivo desde la sesión 2.",
];
