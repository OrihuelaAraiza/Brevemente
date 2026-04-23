import { Suspense, lazy, useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import ErrorBoundary from "../components/ErrorBoundary";
import auditService from "../services/auditService";
import storage from "../services/storage";
import { ROLES, ROUTES } from "../utils/constants";
import PageSkeleton from "../components/PageSkeleton";
import PatientRegister from "../views/PatientRegister";
import PatientDashboard from "../views/PatientDashboard";
const PatientDashboardNew = lazy(() => import("../views/patient/Dashboard"));
const PatientClinicalHistory = lazy(() => import("../views/patient/ClinicalHistory"));
const PatientNotesView = lazy(() => import("../views/patient/Notes"));
const PatientSessionsView = lazy(() => import("../views/patient/Sessions"));
const PatientPrescriptionsView = lazy(() => import("../views/patient/Prescriptions"));
const PatientDocumentsView = lazy(() => import("../views/patient/Documents"));
const PatientProfile = lazy(() => import("../views/patient/Profile"));

const Home = lazy(() => import("../views/Home"));
const Login = lazy(() => import("../views/Login"));
const Register = lazy(() => import("../views/Register"));
const ForgotPassword = lazy(() => import("../views/ForgotPassword"));
const ResetPassword = lazy(() => import("../views/ResetPassword"));
const Dashboard = lazy(() => import("../views/Dashboard"));
const Health = lazy(() => import("../views/Health"));
const Patients = lazy(() => import("../views/Patients"));
const PatientDetail = lazy(() => import("../views/PatientDetail"));
const History = lazy(() => import("../views/History"));
const AuthDebug = lazy(() => import("../views/AuthDebug"));
const Notes = lazy(() => import("../views/Notes"));
const NoteDetail = lazy(() => import("../views/NoteDetail"));
const NoteEditor = lazy(() => import("../views/NoteEditor"));
const Sessions = lazy(() => import("../views/Sessions"));
const PatientSessions = lazy(() => import("../views/PatientSessions"));
const SessionsCalendar = lazy(() => import("../views/SessionsCalendar"));
const Consents = lazy(() => import("../views/Consents"));
const Prescriptions = lazy(() => import("../views/Prescriptions"));
const PrescriptionDetail = lazy(() => import("../views/PrescriptionDetail"));
const Reports = lazy(() => import("../views/Reports"));
const OrderForm = lazy(() => import("../views/OrderForm"));
const OrderDetail = lazy(() => import("../views/OrderDetail"));
const ReportForm = lazy(() => import("../views/ReportForm"));
const ReportDetail = lazy(() => import("../views/ReportDetail"));
const NotFound = lazy(() => import("../views/NotFound"));
const PatientReportsList = lazy(() => import("../components/PatientReportList"));
const PatientDocuments = lazy(() => import("../views/PatientDocument"));
const ProfileProfessional = lazy(() => import("../views/Professional/ProfessionalProfile"));
const DisblePatient = lazy(()=> import("../views/Professional/PatientDischarge"))
const SupervisionLog = lazy(() => import("../views/SupervisionLog"));

function RouteAuditor() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (storage.getToken()) {
      auditService.logAudit("route", { path: location.pathname });
    }
  }, [location.pathname]);

  useEffect(() => {
    const token = storage.getToken();
    const role = storage.getRole();
    if (!token || !role) return;

    if (
      location.pathname === ROUTES.home ||
      location.pathname === ROUTES.login ||
      location.pathname === ROUTES.register
    ) {
      navigate(
        role === ROLES.PATIENT ? ROUTES.patientDashboard : ROUTES.dashboard,
        { replace: true }
      );
    }
  }, [location.pathname, navigate]);

  return null;
}

export default function AppRoutes() {
  return (
    <>
      <RouteAuditor />
      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          {/* PÚBLICAS */}
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.login} element={<Login />} />
          <Route path={ROUTES.register} element={<Register />} />
          <Route path="/register/patient" element={<PatientRegister />} />
          <Route path="/health" element={<Health />} />

          {/* RESET PASSWORD */}
          <Route path={ROUTES.forgotPassword} element={<ForgotPassword />} />
          <Route path={ROUTES.resetPassword} element={<ResetPassword />} />

          {/* SÓLO ADMIN */}
          <Route element={<ProtectedRoute allow={[ROLES.ADMIN]} />}>
            <Route path="/auth/debug" element={<AuthDebug />} />
            <Route path="/supervision" element={<SupervisionLog />} />
          </Route>

          {/* PLATAFORMA DEL PACIENTE */}
          <Route
            element={<ProtectedRoute allow={[ROLES.PATIENT]} />}
          >
            <Route path={ROUTES.patientDashboard} element={<PatientDashboardNew />} />
            <Route path={ROUTES.patientClinicalHistory} element={<PatientClinicalHistory />} />
            <Route path={ROUTES.patientNotes} element={<PatientNotesView />} />
            <Route path={ROUTES.patientSessions} element={<PatientSessionsView />} />
            <Route path={ROUTES.patientPrescriptions} element={<PatientPrescriptionsView />} />
            <Route path={ROUTES.patientDocuments} element={<PatientDocumentsView />} />
            <Route path={ROUTES.patientProfile} element={<PatientProfile />} />
          </Route>

          {/* PANEL COMPARTIDO (MÉDICO, ASISTENTE Y PACIENTE) */}
          <Route
            element={
              <ProtectedRoute
                allow={[
                  ROLES.ADMIN,
                  ROLES.PROFESSIONAL,
                  ROLES.ASSISTANT,
                  ROLES.PATIENT,
                ]}
              />
            }
          >
            <Route path={ROUTES.dashboard} element={<Dashboard />} />
            <Route path={ROUTES.patients} element={<Patients />} />
            <Route path={`${ROUTES.patients}/:id`} element={<PatientDetail />} />
            <Route path={`${ROUTES.patients}/:id/history`} element={<History />} />
            <Route path={ROUTES.sessions} element={<Sessions />} />
            <Route path={ROUTES.sessionsCalendar} element={<SessionsCalendar />} />
            <Route path="/patients/:id/sessions" element={<PatientSessions />} />
            {/* El asistente usualmente puede ver los reportes pero no crearlos (depende de tu regla) */}
            <Route path={ROUTES.reports} element={<Reports />} />
          </Route>

          {/* HERRAMIENTAS CLÍNICAS (SÓLO STAFF MÉDICO: PROFESIONAL Y ASISTENTE) */}
          <Route
            element={
              <ProtectedRoute
                allow={[ROLES.ADMIN, ROLES.PROFESSIONAL, ROLES.ASSISTANT]}
              />
            }
          >
            {/* Gestión de Notas */}
            <Route path="/patients/:id/notes" element={<ErrorBoundary><Notes /></ErrorBoundary>} />
            <Route path="/patients/:id/notes/new" element={<ErrorBoundary><NoteEditor /></ErrorBoundary>} />
            <Route path="/patients/:id/notes/:noteId" element={<ErrorBoundary><NoteDetail /></ErrorBoundary>} />
            <Route path="/notes/:noteId" element={<ErrorBoundary><NoteDetail /></ErrorBoundary>} />
            
            {/* Recetas y Órdenes */}
            <Route path={ROUTES.prescriptions} element={<Prescriptions />} />
            <Route path={ROUTES.prescriptionsNew} element={<Prescriptions />} />
            <Route path="/prescriptions/:id" element={<PrescriptionDetail />} />
            <Route path={ROUTES.orderNew} element={<OrderForm />} />
            <Route path={ROUTES.orderDetail} element={<OrderDetail />} />

            {/* Alta de Paciente */}
            <Route path={ROUTES.DisblePatient} element={<DisblePatient />} />
            
            {/* Gestión de Reportes y Documentos */}
            <Route path="/patients/:patientId/reports" element={<PatientReportsList />} />
            <Route path="/patients/:patientId/reports/:reportId" element={<ReportForm />} />
            <Route path="/patients/:id/documents" element={<PatientDocuments />} />
            <Route path={ROUTES.reportNew} element={<ReportForm />} />
            <Route path={ROUTES.reportDetail} element={<ReportDetail />} />

            {/* Dashboard médico base */}
            <Route path={ROUTES.dashboard} element={<Dashboard />} />
          </Route>

          {/* EXCLUSIVO DEL PROFESIONAL (CONFIGURACIÓN Y STAFF) */}
          <Route
            element={
              <ProtectedRoute allow={[ROLES.ADMIN, ROLES.PROFESSIONAL]} />
            }
          >
             <Route path="/ProfileProfessional" element={<ProfileProfessional/>} />
             {/* Si tuvieras una página de gestión de suscripción o finanzas, iría aquí */}
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}
