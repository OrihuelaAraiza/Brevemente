"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MoreHorizontal } from "lucide-react";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockProtocolos } from "@/lib/mock-data";

function BrifiIconSmall() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="bG3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="40%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </radialGradient>
      </defs>
      {[0,45,90,135,180,225,270,315].map((deg, i) => (
        <ellipse key={i} cx="12" cy="12" rx="3" ry="6.5" fill="url(#bG3)" fillOpacity="0.75"
          transform={`rotate(${deg} 12 12)`} />
      ))}
      <circle cx="12" cy="12" r="3" fill="white" fillOpacity="0.9" />
    </svg>
  );
}

export default function BibliotecaPage() {
  const router = useRouter();
  const [search, setSearch]           = useState("");
  const [selectedProtocolo, setSelected] = useState<(typeof mockProtocolos)[0] | null>(null);

  const filtrados = mockProtocolos.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SectionHeader title="Inicio - Biblioteca digital - Protocolos TBE" />

      <div className="flex-1 overflow-auto p-5 min-h-0">
        {/* Toolbar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4 flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍 Buscar Protocolos TBE"
              className="pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#5BC8E8]"
            />
          </div>

          <button
            onClick={() => router.push("/brifi")}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors"
          >
            <BrifiIconSmall />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-50 bg-white transition-colors">
              <MoreHorizontal size={14} /> Ir a
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push("/expedientes")}>
                → Expediente nuevo
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/expedientes")}>
                → Expediente archivado
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/reportes")}>
                → Reportes y Constancias
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/reportes")}>
                → Bitácora supervisión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Table */}
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
              {filtrados.map((p) => (
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
              {filtrados.length === 0 && (
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

      {/* Protocol detail dialog */}
      <Dialog open={!!selectedProtocolo} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-[#1E2A3A] text-base leading-snug pr-4">
              {selectedProtocolo?.nombre}
            </DialogTitle>
          </DialogHeader>
          <div className="text-sm text-gray-600 leading-relaxed space-y-3">
            <p>{selectedProtocolo?.descripcion}</p>
            <p className="text-gray-400 italic text-xs">
              Para acceder al contenido completo del protocolo, descargue el manual TBE correspondiente o consulte con Brifi.
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
