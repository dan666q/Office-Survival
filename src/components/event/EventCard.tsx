// src/components/event/EventCard.tsx
import { useEffect } from "react";
import EventTimer from "./EventTimer";
import type { GameEvent } from "../../types/event.types";

interface EventCardProps {
  event: GameEvent;
  timeLeft: number;
  progress: number;
  onSelectAction: (eventId: string, actionId: string) => void;
  isFirst?: boolean;
}

const priorityStyles = {
  low: "border-zinc-700 bg-zinc-900",
  medium: "border-yellow-500/40 bg-yellow-500/5",
  high: "border-orange-500/40 bg-orange-500/5",
  critical: "border-red-500/50 bg-red-500/10 animate-pulse",
};

function getEmailSender(title: string, priority: string) {
  const lowercase = title.toLowerCase();
  if (lowercase.includes("sếp") || lowercase.includes("giám đốc") || priority === "critical") {
    return { name: "Sếp Messi 👑", email: "messi.sep@officeos.com" };
  }
  if (lowercase.includes("khách") || lowercase.includes("deal") || lowercase.includes("bds") || lowercase.includes("client")) {
    return { name: "Hieuthuhai Sales 👑", email: "hieuthuhai.sales@officeos.com" };
  }
  if (lowercase.includes("hr") || lowercase.includes("tuyển dụng") || lowercase.includes("hợp đồng") || lowercase.includes("quỹ")) {
    return { name: "HR J97 🎸", email: "j97.hr@officeos.com" };
  }
  if (lowercase.includes("intern") || lowercase.includes("học việc")) {
    return { name: "Intern CR7 ⚡", email: "cr7.intern@officeos.com" };
  }
  if (lowercase.includes("code") || lowercase.includes("it") || lowercase.includes("server") || lowercase.includes("lỗi") || lowercase.includes("bug") || lowercase.includes("mạng") || lowercase.includes("kẹt giấy")) {
    return { name: "CTO Elon Musk 🚀", email: "elon.cto@officeos.com" };
  }
  return { name: "PM Jisoo 🌸", email: "jisoo.pm@officeos.com" };
}

export default function EventCard({
  event,
  timeLeft,
  progress,
  onSelectAction,
  isFirst = false,
}: EventCardProps) {
  // Keyboard shortcut: 1/2/3 → chọn action khi card này là card đầu tiên
  useEffect(() => {
    if (!isFirst) return;
    const handler = (e: KeyboardEvent) => {
      // Chỉ kích hoạt nếu không đang gõ input
      if (document.activeElement?.tagName === "INPUT") return;
      const idx = parseInt(e.key) - 1;
      if (idx >= 0 && idx < event.actions.length) {
        onSelectAction(event.id, event.actions[idx].id);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [event.id, event.actions, onSelectAction, isFirst]);

  const sender = getEmailSender(event.title, event.priority);

  return (
    <div
      className={`
        flex flex-col gap-3 rounded-2xl border p-4 shadow-lg backdrop-blur-sm
        transition-all duration-300 font-sans bg-zinc-950/20
        ${priorityStyles[event.priority]}
      `}
    >
      {/* Sender & Deadline Header */}
      <div className="flex items-start justify-between gap-3 border-b border-zinc-800 pb-2.5">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-zinc-300">
              From: {sender.name}
            </span>
            <span className="text-[9px] text-zinc-500 font-mono">
              &lt;{sender.email}&gt;
            </span>
          </div>
 
          <h2 className="text-sm font-extrabold text-white leading-snug mt-1 select-text">
            Subject: {event.title}
          </h2>
        </div>
 
        <div className="min-w-[110px] flex-shrink-0">
          <EventTimer timeLeft={timeLeft} progress={progress} />
        </div>
      </div>
 
      {/* Email Body Message Container */}
      <div className="bg-zinc-900/60 border border-zinc-800 p-3 rounded-xl text-zinc-300 text-xs leading-relaxed select-text shadow-inner font-sans">
        <p className="whitespace-pre-wrap">{event.description}</p>
      </div>
 
      {/* Choice actions as Email Replies */}
      <div className="mt-1 space-y-2">
        <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-1 flex items-center gap-1">
          <span>↩️ Trả lời nhanh:</span>
        </div>
 
        <div className="grid gap-2">
          {event.actions.map((action) => (
            <button
              key={action.id}
              onClick={() => onSelectAction(event.id, action.id)}
              className="
                group relative rounded-xl border border-zinc-700 bg-zinc-900/80
                px-3.5 py-2.5 text-left text-xs font-semibold text-zinc-200
                transition-all duration-200 font-sans cursor-pointer
                hover:scale-[1.01]
                hover:border-cyan-500/50
                hover:bg-cyan-950/25
                active:scale-[0.99]
              "
            >
              <span className="flex items-center gap-1.5">
                <span className="text-zinc-500 group-hover:text-cyan-400 transition-colors">↩️</span>
                <span className="text-zinc-300 font-medium group-hover:text-zinc-100 transition-colors">{action.label}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
