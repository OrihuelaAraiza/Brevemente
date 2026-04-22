import { SectionHeader } from "@/components/layout/SectionHeader";
import { BrifiChat } from "@/components/brifi/BrifiChat";

export default function BrifiPage() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SectionHeader title="Brifi" />
      <div className="flex-1 min-h-0">
        <BrifiChat />
      </div>
    </div>
  );
}
