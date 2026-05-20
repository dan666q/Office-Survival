import { useEffect } from "react";
import { useGameStore } from "../../store/gameStore";
import { DAYS_CONFIG } from "../../data";
import EventCard from "../event/EventCard";
import { useEventTimer } from "../../hooks/useEventTimer";

export default function LeftPanel() {
  const {
    activeEvents,
    currentDay,
    selectAction,
    nextEvent,
    applyStatEffects,
    addFeedEntry,
  } = useGameStore();

  const activeEvent = activeEvents[0];

  const dayConfig = DAYS_CONFIG.find((d) => d.day === currentDay);
  const eventDuration = dayConfig?.eventTimer ?? 30;

  const handleTimeout = () => {
    if (!activeEvent) return;
    applyStatEffects([
      { stat: "stress", value: 15 },
      { stat: "salary", value: -50000 },
    ]);
    addFeedEntry(
      "Bạn đứng hình quá lâu. PM escalate lên management rồi 💀",
      "danger"
    );
    nextEvent();
  };

  const { timeLeft, progress, reset } = useEventTimer({
    duration: eventDuration,
    isRunning: !!activeEvent,
    onTimeout: handleTimeout,
  });

  useEffect(() => {
    if (activeEvent) reset(eventDuration);
  }, [activeEvent?.id]);

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800 flex-shrink-0">
        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-medium">
          Sự kiện
        </span>
        <span className="text-[10px] text-zinc-600">
          {activeEvents.length} đang chờ
        </span>
      </div>

      {/* Event hoặc empty */}
      <div className="flex-1 overflow-y-auto p-3">
        {activeEvent ? (
          <EventCard
            event={activeEvent}
            timeLeft={timeLeft}
            progress={progress}
            onSelectAction={selectAction}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-center">
            <span className="text-2xl">☕</span>
            <p className="text-xs text-zinc-500">
              Không có event nào.
              <br />
              Tận hưởng sự bình yên hiếm có này.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
