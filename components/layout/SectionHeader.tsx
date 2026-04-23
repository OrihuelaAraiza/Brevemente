import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  titleClassName?: string;
}

export function SectionHeader({ title, subtitle, right, titleClassName }: SectionHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
      <div>
        <h1 className={cn("text-[#1E2A3A] font-bold text-lg leading-tight", titleClassName)}>{title}</h1>
        {subtitle && <p className="text-gray-500 text-xs mt-0.5">{subtitle}</p>}
      </div>
      {right && <div className="flex items-center gap-2">{right}</div>}
    </div>
  );
}

