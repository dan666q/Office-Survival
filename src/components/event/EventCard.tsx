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

const priorityBadgeStyles = {
  low: "bg-zinc-700/80 text-zinc-300",
  medium: "bg-yellow-500/20 text-yellow-300",
  high: "bg-orange-500/20 text-orange-300",
  critical: "bg-red-500/30 text-red-200",
};

const priorityLabel: Record<string, string> = {
  low: "⚪ Thường",
  medium: "🟡 Quan trọng",
  high: "🟠 Khẩn",
  critical: "🔴 CRITICAL",
};

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

  return (
    <div
      className={`
        flex flex-col gap-4 rounded-2xl border p-4 shadow-lg backdrop-blur-sm
        transition-all duration-300
        ${priorityStyles[event.priority]}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Priority badge */}
          <div
            className={`
              mb-2 inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide
              ${priorityBadgeStyles[event.priority]}
            `}
          >
            {priorityLabel[event.priority]}
          </div>

          <h2 className="text-base font-bold text-white leading-snug">
            {event.title}
          </h2>
        </div>

        <div className="min-w-[110px] flex-shrink-0">
          <EventTimer timeLeft={timeLeft} progress={progress} />
        </div>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed text-zinc-300">
        {event.description}
      </p>

      {/* Actions */}
      <div className="grid gap-2">
        {event.actions.map((action, idx) => (
          <button
            key={action.id}
            onClick={() => onSelectAction(event.id, action.id)}
            className="
              group relative rounded-xl border border-zinc-700 bg-zinc-800/80
              px-4 py-3 text-left text-sm font-medium text-zinc-100
              transition-all duration-200
              hover:scale-[1.02]
              hover:border-zinc-500
              hover:bg-zinc-700
              active:scale-[0.98]
            "
          >
            {/* Keyboard shortcut badge */}
            {isFirst && (
              <span className="absolute top-2 right-2 hidden sm:inline-flex items-center justify-center w-4 h-4 rounded text-[9px] font-bold text-zinc-600 border border-zinc-700 bg-zinc-900 group-hover:text-zinc-400 group-hover:border-zinc-600 transition-colors">
                {idx + 1}
              </span>
            )}
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
