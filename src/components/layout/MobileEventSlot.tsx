// src/components/layout/MobileEventSlot.tsx
// Chỉ dùng trên mobile.
// - Event card chính: luôn hiển thị event ưu tiên cao nhất
// - Queue banner: slide xuống từ top, giữ nguyên khi có event đang chờ, ẩn khi hàng đợi trống

import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGameStore } from "../../store/gameStore";
import { DAYS_CONFIG, DIFFICULTY_CONFIGS } from "../../data";
import EventCard from "../event/EventCard";
import { useEventTimer } from "../../hooks/useEventTimer";
import { soundManager } from "../../utils/soundManager";
import type { GameEvent } from "../../types/event.types";

const PRIORITY_ORDER: Record<string, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
};

const PRIORITY_ICON: Record<string, string> = {
  critical: "🚨",
  high: "⚠️",
  medium: "📧",
  low: "📋",
};

// ── Queue Banner — slide từ top, giữ nguyên khi có hàng đợi ─────────────────
function QueueBanner({
  queuedCount,
  nextEvent,
}: {
  queuedCount: number;
  nextEvent: GameEvent | null;
}) {
  const priority = nextEvent?.priority ?? "medium";

  const borderColor =
    priority === "critical"
      ? "border-red-500/50"
      : priority === "high"
      ? "border-orange-500/40"
      : "border-zinc-700/50";

  const bgColor =
    priority === "critical"
      ? "bg-red-950/85"
      : priority === "high"
      ? "bg-orange-950/85"
      : "bg-zinc-900/90";

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -80, opacity: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 32 }}
      className={`
        fixed top-3 left-3 right-3 z-[200]
        flex items-center gap-3 px-4 py-3
        rounded-2xl border shadow-2xl backdrop-blur-xl
        ${borderColor} ${bgColor}
      `}
      style={{ WebkitBackdropFilter: "blur(20px)" }}
    >
      <span className="text-lg shrink-0">
        {PRIORITY_ICON[priority]}
      </span>
      <div className="flex-1 min-w-0">
        {nextEvent ? (
          <>
            <p className="text-[10px] font-extrabold text-zinc-300 truncate">
              {nextEvent.title}
            </p>
            <p className="text-[9px] opacity-60 mt-0.5">
              ⏳ Đang chờ xử lý • còn {queuedCount} việc
            </p>
          </>
        ) : (
          <p className="text-[10px] font-bold text-zinc-300">
            ⚡ {queuedCount} việc đang chờ trong hàng đợi
          </p>
        )}
      </div>
      {/* Live pulse indicator */}
      <span className="w-2 h-2 rounded-full bg-current opacity-60 animate-pulse shrink-0" />
    </motion.div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function MobileEventSlot() {
  const {
    activeEvents,
    eventQueue,
    currentDay,
    currentTimeSlot,
    stats,
    selectAction,
    handleTimeout,
    pushNextActiveEvent,
    nextTimeSlot,
    skipOvertime,
    difficulty,
  } = useGameStore();

  const dayConfig = DAYS_CONFIG.find((d) => d.day === currentDay);
  const baseEventTimer = dayConfig?.eventTimer ?? 20;
  const newEventInterval = dayConfig?.newEventInterval ?? 10;

  const diffConfig = DIFFICULTY_CONFIGS.find((d) => d.id === difficulty) ?? DIFFICULTY_CONFIGS[1];
  const eventTimer = Math.round(baseEventTimer * diffConfig.timerMultiplier);


  const isBreakSlot = currentTimeSlot === "lunch";
  const isOvertimeSlot = currentTimeSlot === "overtime";
  const canSkipOvertime =
    isOvertimeSlot &&
    dayConfig?.timeSlots.find((s) => s.slot === "overtime")?.canSkip;

  // ── Push events interval ──
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const nextSlotCalledRef = useRef(false);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    nextSlotCalledRef.current = false;

    if (isBreakSlot) return;

    if (eventQueue.length === 0 && activeEvents.length === 0) {
      if (!nextSlotCalledRef.current) {
        nextSlotCalledRef.current = true;
        nextTimeSlot();
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      pushNextActiveEvent();
    }, newEventInterval * 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentTimeSlot, eventQueue.length, isBreakSlot]);

  // ── Sort, lấy event ưu tiên cao nhất ──
  const sortedActive = [...activeEvents].sort(
    (a, b) =>
      (PRIORITY_ORDER[a.priority ?? "medium"] ?? 2) -
      (PRIORITY_ORDER[b.priority ?? "medium"] ?? 2)
  );
  const topEvent = sortedActive[0] ?? null;

  // Events đang chờ = active[1..n] + eventQueue
  const waitingActive = sortedActive.slice(1); // active nhưng không phải top
  const queuedCount = waitingActive.length + eventQueue.length;

  // Event tiếp theo trong hàng chờ — lấy title thật luôn
  const nextWaiting: GameEvent | null = waitingActive[0] ?? eventQueue[0] ?? null;

  const isHighStress = stats.stress >= 90;

  return (
    <>
      {/* ── Queue Banner: chỉ hiện khi có hàng đợi, giữ nguyên ── */}
      <AnimatePresence>
        {queuedCount > 0 && (
          <QueueBanner queuedCount={queuedCount} nextEvent={nextWaiting} />
        )}
      </AnimatePresence>

      {/* ── Event slot ── */}
      <div className="flex-shrink-0 px-2.5 pt-2 pb-1">
        {/* Overtime banner */}
        {canSkipOvertime && (
          <div className="mb-2 rounded-xl border border-amber-500/40 bg-amber-500/10 p-2.5 flex items-center justify-between gap-2">
            <p className="text-[11px] text-amber-300 font-semibold">
              🌙 Overtime — Bạn có muốn về nhà không?
            </p>
            <button
              onClick={() => {
                soundManager.playClick();
                skipOvertime();
              }}
              className="text-[11px] rounded-lg border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-amber-200 hover:bg-amber-400/20 transition-colors whitespace-nowrap"
            >
              🏠 Về thôi
            </button>
          </div>
        )}

        {/* High stress warning */}
        {isHighStress && (
          <div className="mb-2 rounded-xl border border-red-500/60 bg-red-500/10 px-3 py-1.5 text-xs text-red-300 animate-pulse">
            ⚠️ Stress cực cao! Cẩn thận burnout!
          </div>
        )}

        {/* Main event card — trực tiếp, không dùng notification style */}
        <AnimatePresence mode="wait">
          {topEvent ? (
            <motion.div
              key={topEvent.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <MobileEventCardWrapper
                event={topEvent}
                eventTimer={eventTimer}
                onSelectAction={selectAction}
                onTimeout={handleTimeout}
              />
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-zinc-800 bg-zinc-900/40"
            >
              <span className="text-lg">☕</span>
              <p className="text-xs text-zinc-500">Không có việc cấp bách</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

// ── Event card wrapper với timer riêng ─────────────────────────────────────────
interface WrapperProps {
  event: GameEvent;
  eventTimer: number;
  onSelectAction: (eventId: string, actionId: string) => void;
  onTimeout: (eventId: string) => void;
}

function MobileEventCardWrapper({
  event,
  eventTimer,
  onSelectAction,
  onTimeout,
}: WrapperProps) {
  const stableTimeout = useCallback(() => {
    onTimeout(event.id);
  }, [event.id, onTimeout]);

  const { timeLeft, progress } = useEventTimer({
    duration: eventTimer,
    isRunning: true,
    onTimeout: stableTimeout,
  });

  return (
    <EventCard
      event={event}
      timeLeft={timeLeft}
      progress={progress}
      onSelectAction={onSelectAction}
      isFirst={true}
    />
  );
}
