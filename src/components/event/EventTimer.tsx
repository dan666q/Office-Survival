// src/components/event/EventTimer.tsx

interface EventTimerProps {
  timeLeft: number;
  progress: number;
}

export default function EventTimer({ timeLeft, progress }: EventTimerProps) {
  const isDanger = progress <= 30;
  const isCritical = progress <= 15;

  return (
    <div className="w-full">
      {/* Top row */}
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-400">
          Deadline
        </span>

        <div
          className={`
              rounded-md px-2 py-1 text-sm font-bold transition-all duration-300
              ${
                isCritical
                  ? "animate-pulse bg-red-500/20 text-red-400"
                  : isDanger
                  ? "bg-yellow-500/20 text-yellow-300"
                  : "bg-emerald-500/20 text-emerald-300"
              }
            `}
        >
          ⏳ {timeLeft}s
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
        <div
          className={`
              h-full rounded-full transition-all duration-1000
              ${
                isCritical
                  ? "bg-red-500"
                  : isDanger
                  ? "bg-yellow-400"
                  : "bg-emerald-400"
              }
            `}
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      {/* Warning text */}
      {isCritical && (
        <p className="mt-2 animate-pulse text-xs font-medium text-red-400">
          PM đang bắt đầu spam tin nhắn 💀
        </p>
      )}
    </div>
  );
}
