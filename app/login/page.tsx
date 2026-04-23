"use client";

import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DEMO_ACCOUNTS,
  ROLE_LABEL,
  homeForRole,
  useAuth,
} from "@/lib/auth";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { user, ready, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (ready && user) {
      const next = params.get("next");
      router.replace(next && next.startsWith("/") ? next : homeForRole(user.role));
    }
  }, [ready, user, router, params]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    const result = login(email, password);
    if (!result.ok) {
      toast.error(result.error);
      setSubmitting(false);
      return;
    }
    toast.success("Bienvenido a BreveMente");
  }

  function fillDemo(account: (typeof DEMO_ACCOUNTS)[number]) {
    setEmail(account.email);
    setPassword(account.password);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1E2A3A] via-[#22304a] to-[#5BC8E8] px-4 py-10">
      <div className="w-full max-w-5xl grid md:grid-cols-[1.1fr_1fr] gap-8 items-stretch">
        {/* Left: Brand panel */}
        <div className="hidden md:flex flex-col justify-between rounded-2xl bg-[#1E2A3A] text-white p-10 shadow-2xl relative overflow-hidden">
          <Image
            src="/brand/doctor-login.jpg"
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 0px"
            className="object-cover opacity-20"
            priority
          />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <Image
              src="/brand/logo-brevemente-horizontal-on-blue.png"
              alt="BreveMente"
              width={240}
              height={48}
              priority
              style={{ height: "auto" }}
              className="w-auto max-h-12 object-contain"
            />

            <div className="space-y-4">
              <h2 className="text-3xl font-semibold leading-tight">
                Terapia Breve Estratégica, ahora más simple.
              </h2>
              <p className="text-white/70">
                Gestiona pacientes, sesiones, expedientes y reportes en un solo lugar.
                Todo asistido por Brifi.
              </p>
            </div>

            <div className="text-xs text-white/40">© {new Date().getFullYear()} BreveMente</div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 flex flex-col">
          <div className="flex items-center md:hidden mb-6">
            <Image
              src="/brand/logo-brevemente-horizontal-dark.png"
              alt="BreveMente"
              width={180}
              height={36}
              style={{ height: "auto" }}
              className="w-auto max-h-9 object-contain"
            />
          </div>

          <h1 className="text-2xl font-bold text-[#1E2A3A]">Iniciar sesión</h1>
          <p className="text-sm text-gray-500 mt-1">
            Ingresa tus credenciales para acceder a tu panel.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tucorreo@dominio.com"
                className="mt-1.5 h-10"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1.5 h-10"
              />
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full h-11 bg-[#F5A623] text-white hover:bg-[#e09615] font-semibold text-base"
            >
              {submitting ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="animate-spin" size={16} /> Entrando…
                </span>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>

          <div className="mt-8">
            <div className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
              Cuentas demo
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {DEMO_ACCOUNTS.map((a) => (
                <button
                  key={a.email}
                  type="button"
                  onClick={() => fillDemo(a)}
                  className="text-left rounded-md border border-gray-200 hover:border-[#5BC8E8] hover:bg-[#5BC8E8]/5 transition-colors px-3 py-2"
                >
                  <div className="text-xs font-semibold text-[#1E2A3A]">
                    {ROLE_LABEL[a.role]}
                  </div>
                  <div className="text-[11px] text-gray-500 truncate">{a.email}</div>
                </button>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-gray-400">
              Haz clic en una cuenta para precargar el formulario.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#1E2A3A] text-white/70 text-sm">
          Cargando…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
