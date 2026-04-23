"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Role = "ADMIN" | "PROFESSIONAL" | "ASSISTANT" | "PATIENT";

export const ROLE_LABEL: Record<Role, string> = {
  ADMIN: "Administrador",
  PROFESSIONAL: "Profesional",
  ASSISTANT: "Asistente",
  PATIENT: "Paciente",
};

export type User = {
  email: string;
  name: string;
  role: Role;
};

type DemoAccount = User & { password: string };

export const DEMO_ACCOUNTS: DemoAccount[] = [
  { email: "admin@brevemente.com",     password: "admin123",     name: "Ana Admin",         role: "ADMIN" },
  { email: "pro@brevemente.com",       password: "pro123",       name: "Dra. Paola Rivas",  role: "PROFESSIONAL" },
  { email: "asistente@brevemente.com", password: "asistente123", name: "Luis Asistente",    role: "ASSISTANT" },
  { email: "paciente@brevemente.com",  password: "paciente123",  name: "Mario Paciente",    role: "PATIENT" },
];

const STORAGE_KEY = "bm.auth.user";

type AuthContextValue = {
  user: User | null;
  ready: boolean;
  login: (email: string, password: string) => { ok: true } | { ok: false; error: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw) as User);
    } catch {
      // ignore corrupt storage
    }
    setReady(true);
  }, []);

  const login = useCallback<AuthContextValue["login"]>((email, password) => {
    const normalized = email.trim().toLowerCase();
    const match = DEMO_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === normalized && a.password === password
    );
    if (!match) return { ok: false, error: "Credenciales inválidas" };
    const next: User = { email: match.email, name: match.name, role: match.role };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setUser(next);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, ready, login, logout }),
    [user, ready, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}

export function homeForRole(role: Role): string {
  switch (role) {
    case "PATIENT":
      return "/inicio";
    case "ASSISTANT":
      return "/pacientes";
    case "PROFESSIONAL":
    case "ADMIN":
    default:
      return "/inicio";
  }
}
