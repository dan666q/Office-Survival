import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGameStore } from "../../store/gameStore";
import { DAYS_CONFIG } from "../../data";
import EventCard from "../event/EventCard";
import { useEventTimer } from "../../hooks/useEventTimer";
import { soundManager } from "../../utils/soundManager";

const PRIORITY_ORDER = { critical: 0, high: 1, medium: 2, low: 3 };

export default function CenterPanel() {
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
  } = useGameStore();

  const dayConfig = DAYS_CONFIG.find((d) => d.day === currentDay);
  const eventTimer = dayConfig?.eventTimer ?? 20;
  const newEventInterval = dayConfig?.newEventInterval ?? 10;

  // Ref guard để tránh gọi nextTimeSlot nhiều lần (fix #1)
  const nextSlotCalledRef = useRef(false);

  // Interval để push event mới vào activeEvents
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Lunch là break slot — không có event, không auto-advance
  const isBreakSlot = currentTimeSlot === "lunch";

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    nextSlotCalledRef.current = false;

    // Break slot (lunch): không auto-advance, để người chơi đặt GrabFood cứu mạng
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

  // Sort events: critical → high → medium → low (fix #10)
  const sortedEvents = [...activeEvents].sort(
    (a, b) =>
      (PRIORITY_ORDER[a.priority ?? "medium"] ?? 2) -
      (PRIORITY_ORDER[b.priority ?? "medium"] ?? 2)
  );

  // #9: stress > 90% → border đỏ pulse
  const isHighStress = stats.stress >= 90;
  const isOvertimeSlot = currentTimeSlot === "overtime";
  const canSkipOvertime =
    isOvertimeSlot && dayConfig?.timeSlots.find((s) => s.slot === "overtime")?.canSkip;

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800 flex-shrink-0">
        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-medium">
          {isBreakSlot ? "Nghỉ trưa" : "Sự kiện"}
        </span>
        {!isBreakSlot && (
          <span className="text-[10px] text-zinc-600">
            {activeEvents.length} đang hiển thị • {eventQueue.length} chờ
          </span>
        )}
      </div>

      {/* Overtime banner: cho người chơi chọn về hay ở lại (fix #5) */}
      {canSkipOvertime && (
        <div className="mx-3 mt-3 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 flex-shrink-0">
          <p className="text-xs text-amber-300 font-semibold mb-1">🌙 Overtime — Bạn có muốn ở lại không?</p>
          <p className="text-[11px] text-amber-200/70 mb-2">Ở lại để xử lý event, hoặc về nhà nghỉ ngơi.</p>
          <button
            onClick={() => {
              soundManager.playClick();
              skipOvertime();
            }}
            className="text-[11px] rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-amber-200 hover:bg-amber-400/20 transition-colors"
          >
            🏠 Về nhà thôi
          </button>
        </div>
      )}

      {/* Lunch break UI — không có event, người chơi phải bấm để tiếp tục */}
      {isBreakSlot && (
        <div className="flex-1 flex flex-col items-center justify-center p-4 gap-4">
          <span className="text-4xl">🍱</span>
          <div className="text-center">
            <p className="text-sm font-semibold text-zinc-200 mb-1">Giờ ăn trưa</p>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              Hộp thư trống trơn. Tranh thủ order GrabFood bên phải đi bạn ơi.
            </p>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              nextTimeSlot();
            }}
            className="mt-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-5 py-2.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-colors"
          >
            ✅ Xong, vào buổi chiều →
          </button>
        </div>
      )}

      {/* Events list (chỉ hiện khi không phải break slot) */}
      {!isBreakSlot && <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* #9: High stress warning border */}
        {isHighStress && (
          <div className="rounded-xl border border-red-500/60 bg-red-500/10 px-3 py-2 text-xs text-red-300 animate-pulse flex-shrink-0">
            ⚠️ Stress cực cao! Cẩn thận burnout!
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {sortedEvents.length > 0 ? (
            sortedEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 30, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 350, damping: 26 }}
                layout
                className="w-full"
              >
                <EventCardWrapper
                  event={event}
                  eventTimer={eventTimer}
                  onSelectAction={selectAction}
                  onTimeout={handleTimeout}
                  isFirst={idx === 0}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full gap-2 text-center"
            >
              <span className="text-2xl">☕</span>
              <p className="text-xs text-zinc-500">
                Không có event nào.
                <br />
                Tận hưởng sự bình yên hiếm có này.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>}

      {/* #9: Stress > 90% — pulsing red border overlay */}
      {isHighStress && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            boxShadow: "inset 0 0 0 2px rgba(239,68,68,0.6)",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      )}
    </div>
  );
}

// Wrapper để mỗi EventCard có timer riêng
interface EventCardWrapperProps {
  event: import("../../types/event.types").GameEvent;
  eventTimer: number;
  onSelectAction: (eventId: string, actionId: string) => void;
  onTimeout: (eventId: string) => void;
  isFirst: boolean;
}

function EventCardWrapper({
  event,
  eventTimer,
  onSelectAction,
  onTimeout,
  isFirst,
}: EventCardWrapperProps) {
  // Fix #3: stable callback để tránh useEventTimer restart khi re-render
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
      isFirst={isFirst}
    />
  );
}
