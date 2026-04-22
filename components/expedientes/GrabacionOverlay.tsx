"use client";

import { useEffect, useState, useRef } from "react";
import { Square, Share2, Download, Settings, MoreHorizontal } from "lucide-react";

interface GrabacionOverlayProps {
  sesionNumero: number;
  onComplete: () => void;
}

function Waveform() {
  const bars = Array.from({ length: 40 }, (_, i) => ({
    height: 20 + Math.random() * 60,
    delay: (i * 0.05).toFixed(2),
  }));

  return (
    <div className="flex items-center gap-[3px] h-16">
      {bars.map((b, i) => (
        <div
          key={i}
          className="w-1 rounded-full bg-white/70 animate-pulse"
          style={{
            height: `${b.height}%`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${0.6 + Math.random() * 0.8}s`,
          }}
        />
      ))}
    </div>
  );
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function GrabacionOverlay({ sesionNumero, onComplete }: GrabacionOverlayProps) {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  function handleStop() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    onComplete();
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#5BC8E8] flex flex-col items-center justify-center">
      {/* Header band */}
      <div className="bg-white rounded-xl px-8 py-3 mb-10 text-center shadow">
        <p className="font-bold text-[#1E2A3A] text-sm">Expedientes - TX Psicoterapia TBE</p>
      </div>

      {/* Waveform */}
      <div className="w-full max-w-lg bg-black/10 rounded-2xl px-6 py-4 mb-6">
        <Waveform />
      </div>

      {/* Info */}
      <p className="text-white font-semibold mb-1">Grabación sesión {sesionNumero}</p>
      <p className="text-white/80 text-sm mb-10">
        Tiempo: <span className="font-mono font-bold">{formatTime(seconds)} min</span>
      </p>

      {/* STOP button */}
      <button
        onClick={handleStop}
        className="w-24 h-24 rounded-full bg-[#E74C3C] hover:bg-[#C0392B] flex items-center justify-center shadow-2xl transition-all active:scale-95"
      >
        <Square className="w-10 h-10 text-white fill-white" />
      </button>

      {/* Action icons */}
      <div className="flex gap-6 mt-10 text-white/50">
        <Share2    size={22} className="cursor-pointer hover:text-white transition-colors" />
        <Download  size={22} className="cursor-pointer hover:text-white transition-colors" />
        <Settings  size={22} className="cursor-pointer hover:text-white transition-colors" />
        <MoreHorizontal size={22} className="cursor-pointer hover:text-white transition-colors" />
      </div>
    </div>
  );
}
