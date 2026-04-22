"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { mockCalendarEvents } from "@/lib/mock-data";

interface CalendarioProps {
  onDateClick?: (date: Date) => void;
}

export function CalendarioFullCalendar({ onDateClick }: CalendarioProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex-1 min-h-0 overflow-auto">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        locale={esLocale}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={mockCalendarEvents}
        height="auto"
        editable={false}
        selectable
        dateClick={(info) => onDateClick?.(info.date)}
        eventContent={(info) => (
          <div className="px-1 py-0.5 text-xs font-medium text-white truncate">
            {info.event.title}
          </div>
        )}
      />
    </div>
  );
}
