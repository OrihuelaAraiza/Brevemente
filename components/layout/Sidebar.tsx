"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, CalendarDays, FolderOpen, BarChart2,
  Smile, Trophy, Bell, User, Wrench, Settings, LogOut,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/inicio",     icon: LayoutDashboard, label: "Inicio"              },
  { href: "/pacientes",  icon: Users,           label: "Pacientes"           },
  { href: "/agenda",     icon: CalendarDays,    label: "Agenda"              },
  { href: "/expedientes",icon: FolderOpen,      label: "Expedientes"         },
  { divider: true },
  { href: "/brifi",      icon: null,            label: "Pregúntale a Brifi", isBrifi: true },
  { href: "/desempeno",  icon: BarChart2,       label: "Tu desempeño"        },
  { href: "/beneficios", icon: Smile,           label: "Beneficios"          },
  { href: "/suscripcion",icon: Trophy,          label: "Mejorar suscripción" },
  { href: "/notificaciones", icon: Bell,        label: "Notificaciones"      },
  { href: "/cuenta",     icon: User,            label: "Cuenta"              },
  { href: "/soporte",    icon: Wrench,          label: "Soporte Técnico"     },
  { href: "/configuracion", icon: Settings,     label: "Configuración"       },
  { href: "/salir",      icon: LogOut,          label: "Salir"               },
] as const;

// SVG sphere/neuron logo icon
function LogoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sphereGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="50%" stopColor="#5BC8E8" />
          <stop offset="100%" stopColor="#34D399" />
        </radialGradient>
      </defs>
      <circle cx="14" cy="14" r="13" fill="url(#sphereGrad)" />
      <circle cx="14" cy="14" r="4" fill="white" fillOpacity="0.9" />
      <line x1="14" y1="2"  x2="14" y2="8"  stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="20" x2="14" y2="26" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="2"  y1="14" x2="8"  y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="14" x2="26" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4.9" y1="4.9" x2="9.2" y2="9.2" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="18.8" y1="18.8" x2="23.1" y2="23.1" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// Brifi mandala icon (small inline)
function BrifiIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="brifiG" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="40%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </radialGradient>
      </defs>
      {[0,45,90,135,180,225,270,315].map((deg, i) => (
        <ellipse
          key={i}
          cx="12" cy="12"
          rx="3" ry="6.5"
          fill="url(#brifiG)"
          fillOpacity="0.75"
          transform={`rotate(${deg} 12 12)`}
        />
      ))}
      <circle cx="12" cy="12" r="3" fill="white" fillOpacity="0.9" />
    </svg>
  );
}

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/expedientes") return pathname.startsWith("/expedientes");
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-[#1E2A3A] text-white transition-all duration-300 flex-shrink-0",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
        <LogoIcon />
        {!collapsed && (
          <span className="font-bold text-lg tracking-tight whitespace-nowrap">BreveMente</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 px-2">
        {navItems.map((item, i) => {
          if ("divider" in item) {
            return <div key={`div-${i}`} className="my-2 border-t border-white/15" />;
          }

          const active = isActive(item.href);
          const Icon = (item as any).icon;

          const inner = (
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors relative",
                active
                  ? "bg-[#2D3E50] text-white font-medium"
                  : "text-white/70 hover:bg-white/10 hover:text-white",
                collapsed && "justify-center px-2"
              )}
            >
              {active && !collapsed && (
                <span className="absolute left-0 top-1 bottom-1 w-0.5 bg-[#F5A623] rounded-full" />
              )}
              {(item as any).isBrifi ? (
                <BrifiIcon size={18} />
              ) : Icon ? (
                <Icon size={18} className="flex-shrink-0" />
              ) : null}
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );

          if (collapsed) {
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger className="block w-full">{inner}</TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            );
          }

          return <div key={item.href}>{inner}</div>;
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="flex items-center justify-center py-3 border-t border-white/10 text-white/50 hover:text-white transition-colors text-xs gap-1"
        title={collapsed ? "Expandir" : "Colapsar"}
      >
        {collapsed ? "▶" : "◀"}
        {!collapsed && <span>Colapsar</span>}
      </button>
    </aside>
  );
}
