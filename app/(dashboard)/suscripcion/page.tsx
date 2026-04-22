import { SectionHeader } from "@/components/layout/SectionHeader";

export default function Page() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SectionHeader title="ususcripcion" />
      <div className="flex-1 flex items-center justify-center">
        <p className="text-white/60 text-lg font-medium">Próximamente</p>
      </div>
    </div>
  );
}
