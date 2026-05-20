import { useEffect, useRef } from "react";
import { useGameStore } from "../../store/gameStore";

const typeStyles = {
  info: "border-zinc-700/50 bg-zinc-800/50 text-zinc-300",
  warning: "border-yellow-500/20 bg-yellow-500/5 text-yellow-200",
  danger: "border-red-500/20 bg-red-500/5 text-red-300",
  success: "border-emerald-500/20 bg-emerald-500/5 text-emerald-300",
};

const typeIcons = {
  info: "›",
  warning: "⚠",
  danger: "✕",
  success: "✓",
};

export default function CenterPanel() {
  const feedLog = useGameStore((s) => s.feedLog);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll xuống khi có feed mới
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [feedLog.length]);

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-medium">
            Live Feed
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-emerald-500">LIVE</span>
          </span>
        </div>
        <span className="text-[10px] text-zinc-600">
          {feedLog.length} entries
        </span>
      </div>

      {/* Feed list */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1.5 font-mono">
        {feedLog.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-xs text-zinc-600">Chưa có gì xảy ra...</p>
          </div>
        )}

        {feedLog.map((entry) => (
          <div
            key={entry.id}
            className={`
              flex gap-2 rounded-lg border px-2.5 py-2
              text-xs leading-relaxed
              ${typeStyles[entry.type]}
            `}
          >
            {/* Icon */}
            <span className="flex-shrink-0 font-bold mt-0.5 opacity-60">
              {typeIcons[entry.type]}
            </span>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="break-words">{entry.message}</p>
              <span className="text-[10px] opacity-40 mt-0.5 block">
                {entry.timestamp}
              </span>
            </div>
          </div>
        ))}

        {/* Blinking cursor */}
        <div className="flex items-center gap-1 px-2 py-1">
          <span className="text-xs text-zinc-600 font-mono">›</span>
          <span className="w-1.5 h-3.5 bg-zinc-600 animate-pulse rounded-sm" />
        </div>

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
