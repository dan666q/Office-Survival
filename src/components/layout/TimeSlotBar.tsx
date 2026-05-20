import { useGameStore } from "../../store/gameStore";
import type { TimeSlot } from "../../types/game.types";

const SLOTS: { key: TimeSlot; label: string; short: string }[] = [
  { key: "morning_start", label: "Vào ca", short: "8h" },
  { key: "morning", label: "Buổi sáng", short: "9h" },
  { key: "lunch", label: "Ăn trưa", short: "12h" },
  { key: "afternoon", label: "Buổi chiều", short: "13h" },
  { key: "end_of_day", label: "Tan ca", short: "17h" },
  { key: "overtime", label: "OT", short: "OT" },
];

const SLOT_ORDER = SLOTS.map((s) => s.key);

export default function TimeSlotBar() {
  const currentTimeSlot = useGameStore((s) => s.currentTimeSlot);

  const currentIdx = currentTimeSlot ? SLOT_ORDER.indexOf(currentTimeSlot) : -1;

  return (
    <div className="border-b border-zinc-800 bg-zinc-900/80">
      <div className="mx-auto max-w-7xl px-3">
        <div className="flex items-stretch overflow-x-auto scrollbar-none">
          {SLOTS.map((slot, idx) => {
            const isDone = idx < currentIdx;
            const isActive = idx === currentIdx;
            const isFuture = idx > currentIdx;

            return (
              <div
                key={slot.key}
                className={`
                  relative flex flex-col items-center justify-center
                  px-3 py-2 min-w-[60px] flex-1
                  text-center transition-all duration-300
                  border-b-2
                  ${isActive ? "border-cyan-400" : "border-transparent"}
                `}
              >
                {/* Dot indicator */}
                <div
                  className={`
                  w-1.5 h-1.5 rounded-full mb-1 transition-all duration-300
                  ${isDone ? "bg-emerald-400" : ""}
                  ${
                    isActive
                      ? "bg-cyan-400 shadow-[0_0_6px_2px_rgba(34,211,238,0.4)]"
                      : ""
                  }
                  ${isFuture ? "bg-zinc-700" : ""}
                `}
                />

                {/* Label — short trên mobile, đầy đủ trên desktop */}
                <span
                  className={`
                  text-[10px] font-medium whitespace-nowrap transition-colors duration-300
                  sm:hidden
                  ${isDone ? "text-emerald-400" : ""}
                  ${isActive ? "text-cyan-300" : ""}
                  ${isFuture ? "text-zinc-600" : ""}
                `}
                >
                  {slot.short}
                </span>

                <span
                  className={`
                  hidden sm:block text-[10px] font-medium whitespace-nowrap transition-colors duration-300
                  ${isDone ? "text-emerald-400" : ""}
                  ${isActive ? "text-cyan-300" : ""}
                  ${isFuture ? "text-zinc-600" : ""}
                `}
                >
                  {slot.label}
                </span>

                {/* Connector line */}
                {idx < SLOTS.length - 1 && (
                  <div
                    className={`
                    absolute right-0 top-1/2 -translate-y-1/2
                    w-px h-3
                    ${isDone ? "bg-emerald-800" : "bg-zinc-800"}
                  `}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
