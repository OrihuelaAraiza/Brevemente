"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { BrifiLogo } from "./BrifiLogo";
import { brifiMockResponses, mockConversaciones } from "@/lib/mock-data";

interface Message {
  role: "user" | "assistant" | "thinking";
  content: string;
}

export function BrifiChat() {
  const [input, setInput]         = useState("");
  const [messages, setMessages]   = useState<Message[]>([]);
  const [thinking, setThinking]   = useState(false);
  const [respIdx, setRespIdx]     = useState(0);
  const endRef                    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  function handleSend() {
    const text = input.trim();
    if (!text || thinking) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setThinking(true);

    setTimeout(() => {
      setThinking(false);
      const resp = brifiMockResponses[respIdx % brifiMockResponses.length];
      setRespIdx((i) => i + 1);
      setMessages((m) => [...m, { role: "assistant", content: resp }]);
    }, 1500);
  }

  const isEmpty = messages.length === 0;

  return (
    <div className="flex h-full min-h-0">
      {/* Left panel - historial */}
      <div className="w-52 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-xs font-bold text-[#1E2A3A] uppercase tracking-wide">Historial consultas</p>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {mockConversaciones.map((c) => (
            <button
              key={c.id}
              className="w-full text-left px-3 py-2 rounded-lg text-xs text-gray-600 hover:bg-gray-50 transition-colors truncate"
            >
              {c.titulo}
            </button>
          ))}
        </div>
      </div>

      {/* Right panel - chat */}
      <div className="flex-1 flex flex-col bg-[#5BC8E8] min-w-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col">
          {isEmpty ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <BrifiLogo size={90} />
              <p className="text-white font-semibold text-lg">En qué te puedo ayudar?</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 max-w-2xl mx-auto w-full">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm max-w-[80%] leading-relaxed ${
                      m.role === "user"
                        ? "bg-[#1E2A3A] text-white rounded-br-sm"
                        : "bg-white text-[#1E2A3A] rounded-bl-sm shadow-sm"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {thinking && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-400 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm text-sm animate-pulse">
                    Brifi está pensando...
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-white/20 backdrop-blur-sm">
          <div className="flex gap-2 max-w-2xl mx-auto">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder="Escribe tu consulta clínica..."
              className="flex-1 bg-white rounded-xl px-4 py-3 text-sm text-[#1E2A3A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F5A623] shadow-sm"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || thinking}
              className="w-11 h-11 rounded-xl bg-[#F5A623] hover:bg-[#E09515] disabled:opacity-40 flex items-center justify-center shadow transition-colors"
            >
              <Send size={16} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
