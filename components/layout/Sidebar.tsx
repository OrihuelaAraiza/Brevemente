"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, CalendarDays, FolderOpen, BarChart2,
  Smile, Trophy, Bell, User, Wrench, Settings, LogOut,
  type LucideIcon,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { ROLE_ROUTES } from "@/lib/nav";

type NavEntry =
  | { divider: true }
  | { href: string; icon: LucideIcon | null; label: string; isBrifi?: boolean };

const ALL_NAV_ITEMS: NavEntry[] = [
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
];

function LogoIcon() {
  return (
    <Image
      src="/brand/romiface.png"
      alt="Romi"
      width={32}
      height={32}
      priority
      className="object-contain"
    />
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
  const { user } = useAuth();

  function isActive(href: string) {
    if (href === "/expedientes") return pathname.startsWith("/expedientes");
    return pathname === href || pathname.startsWith(href + "/");
  }

  // Filter nav by the current user's role and collapse consecutive dividers.
  const allowed = user ? new Set(ROLE_ROUTES[user.role]) : null;
  const filtered: NavEntry[] = [];
  for (const item of ALL_NAV_ITEMS) {
    if ("divider" in item) {
      if (filtered.length > 0 && !("divider" in filtered[filtered.length - 1])) {
        filtered.push(item);
      }
      continue;
    }
    if (!allowed || allowed.has(item.href)) filtered.push(item);
  }
  while (filtered.length > 0 && "divider" in filtered[filtered.length - 1]) filtered.pop();
  const navItems = filtered;

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-[#1E2A3A] text-white transition-all duration-300 flex-shrink-0",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-center px-4 py-4 border-b border-white/10 h-16">
        {collapsed ? (
          <LogoIcon />
        ) : (
          <Image
            src="/brand/romi-horizontal-on-blue.png"
            alt="Romi Mente"
            width={180}
            height={36}
            priority
            style={{ height: "auto" }}
            className="w-auto max-h-9 object-contain"
          />
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 px-2">
        {navItems.map((item, i) => {
          if ("divider" in item) {
            return <div key={`div-${i}`} className="my-2 border-t border-white/15" />;
          }

          const active = isActive(item.href);
          const Icon = item.icon;

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
              {item.isBrifi ? (
                <BrifiIcon size={18} />
              ) : Icon ? (
                <Icon size={18} className="flex-shrink-0" />
              ) : null}
              {!collapsed && <span className="truncate">{item.label}</span>}

              {/* Notification dot */}
              {item.label === "Notificaciones" && (
                <span className={cn(
                  "absolute bg-[#F97316] rounded-full ring-2 ring-[#1E2A3A]",
                  collapsed ? "top-1.5 right-2 w-2.5 h-2.5" : "top-2 left-[1.6rem] w-2 h-2"
                )} />
              )}
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
