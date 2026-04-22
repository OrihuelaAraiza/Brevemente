import { SectionHeader } from "@/components/layout/SectionHeader";
import { PacientesHoy } from "@/components/inicio/PacientesHoy";
import { AccesosRapidos } from "@/components/inicio/AccesosRapidos";

export default function InicioPage() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SectionHeader title="Inicio" />
      <div className="flex-1 grid grid-cols-2 gap-4 p-5 min-h-0">
        <PacientesHoy />
        <AccesosRapidos />
      </div>
    </div>
  );
}
