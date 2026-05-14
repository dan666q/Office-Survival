// src/components/event/EventCard.tsx

import EventTimer from "./EventTimer";
import type { GameEvent } from "../../types/event.types";

interface EventCardProps {
  event: GameEvent;
  timeLeft: number;
  progress: number;
  onSelectAction: (eventId: string, actionId: string) => void;
}

const priorityStyles = {
  low: "border-zinc-700 bg-zinc-900",
  medium: "border-yellow-500/40 bg-yellow-500/5",
  high: "border-orange-500/40 bg-orange-500/5",
  critical: "border-red-500/50 bg-red-500/10 animate-pulse",
};

const priorityBadgeStyles = {
  low: "bg-zinc-700 text-zinc-200",
  medium: "bg-yellow-500/20 text-yellow-300",
  high: "bg-orange-500/20 text-orange-300",
  critical: "bg-red-500/20 text-red-300",
};

export default function EventCard({
  event,
  timeLeft,
  progress,
  onSelectAction,
}: EventCardProps) {
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
        <div>
          <div
            className={`
              mb-2 inline-flex rounded-md px-2 py-1 text-xs font-bold uppercase tracking-wide
              ${priorityBadgeStyles[event.priority]}
            `}
          >
            {event.priority}
          </div>

          <h2 className="text-lg font-bold text-white">{event.title}</h2>
        </div>

        <div className="min-w-[110px]">
          <EventTimer timeLeft={timeLeft} progress={progress} />
        </div>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed text-zinc-300">
        {event.description}
      </p>

      {/* Actions */}
      <div className="grid gap-2">
        {event.actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onSelectAction(event.id, action.id)}
            className="
              rounded-xl border border-zinc-700 bg-zinc-800/80
              px-4 py-3 text-left text-sm font-medium text-zinc-100
              transition-all duration-200
              hover:scale-[1.02]
              hover:border-zinc-500
              hover:bg-zinc-700
              active:scale-[0.98]
            "
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
