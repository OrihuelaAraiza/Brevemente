"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, MoreHorizontal, ArrowLeft } from "lucide-react";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockProtocolos } from "@/lib/mock-data";

function Protocolos() {
  const router = useRouter();
  const params = useSearchParams();
  const initialQuery = params.get("q") ?? "";

  const [search, setSearch] = useState(initialQuery);
  const [selected, setSelected] = useState<(typeof mockProtocolos)[0] | null>(null);

  const filtered = mockProtocolos.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SectionHeader title="Inicio - Biblioteca digital - Protocolos TBE" />

      <div className="flex-1 overflow-auto p-5 min-h-0">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4 flex items-center gap-3">
          <button
            onClick={() => router.push("/biblioteca")}
            className="text-gray-500 hover:text-[#1E2A3A] flex items-center gap-1 text-xs"
          >
            <ArrowLeft size={14} /> Biblioteca
          </button>
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar Protocolos TBE"
              className="pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#5BC8E8]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-50 bg-white transition-colors">
              <MoreHorizontal size={14} /> Ir a
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push("/biblioteca/manuales")}>→ Manuales TBE</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/biblioteca/cie11")}>→ CIE-11</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/biblioteca/dsm5tr")}>→ DSM-5TR</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/reportes")}>→ Reportes</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-12">Nº</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Protocolo</th>
                <th className="px-5 py-3 w-28" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-blue-50/40 transition-colors">
                  <td className="px-5 py-3 text-gray-400 font-mono text-xs">{p.id}</td>
                  <td className="px-5 py-3 text-[#1E2A3A]">{p.nombre}</td>
                  <td className="px-5 py-3 text-right">
                    <Button
                      size="sm"
                      onClick={() => setSelected(p)}
                      className="bg-[#5BC8E8] hover:bg-[#3DAFD0] text-white text-xs border-0 h-7"
                    >
                      Consultar
                    </Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-5 py-8 text-center text-gray-400 text-sm">
                    No se encontraron protocolos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-[#1E2A3A] text-base leading-snug pr-4">
              {selected?.nombre}
            </DialogTitle>
          </DialogHeader>
          <div className="text-sm text-gray-600 leading-relaxed space-y-3">
            <p>{selected?.descripcion}</p>
            <p className="text-gray-400 italic text-xs">
              Para acceder al contenido completo del protocolo, descarga el manual TBE correspondiente o consulta con Brifi.
            </p>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setSelected(null)}>Cerrar</Button>
            <Button
              size="sm"
              className="bg-[#F5A623] hover:bg-[#E09515] text-white border-0"
              onClick={() => { setSelected(null); router.push("/brifi"); }}
            >
              Consultar con Brifi →
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function ProtocolosPage() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center text-white/70">Cargando…</div>}>
      <Protocolos />
    </Suspense>
  );
}
