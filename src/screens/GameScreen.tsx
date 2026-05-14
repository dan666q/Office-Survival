// src/screens/GameScreen.tsx

import { useEffect, useMemo } from "react";

import { useGameStore } from "../store/gameStore";
import { DAYS_CONFIG } from "../data";

import EventCard from "../components/event/EventCard";

import { useEventTimer } from "../hooks/useEventTimer";

export default function GameScreen() {
  const {
    currentDay,
    currentTimeSlot,
    activeEvents,
    stats,

    selectAction,
    nextEvent,
    applyStatEffects,
    addFeedEntry,
  } = useGameStore();

  const activeEvent = activeEvents[0];

  // =========================
  // DAY CONFIG
  // =========================
  const dayConfig = useMemo(() => {
    return DAYS_CONFIG.find((d) => d.day === currentDay);
  }, [currentDay]);

  const eventDuration = dayConfig?.eventTimer ?? 30;

  // =========================
  // TIMEOUT HANDLER
  // =========================
  const handleTimeout = () => {
    if (!activeEvent) return;

    applyStatEffects([
      {
        stat: "stress",
        value: 15,
      },
      {
        stat: "reputation",
        value: -10,
      },
    ]);

    addFeedEntry(
      "Bạn đứng hình quá lâu. PM escalated issue lên management 💀",
      "danger"
    );

    nextEvent();
  };

  // =========================
  // TIMER
  // =========================
  const { timeLeft, progress, reset } = useEventTimer({
    duration: eventDuration,
    isRunning: !!activeEvent,
    onTimeout: handleTimeout,
  });

  // =========================
  // RESET TIMER WHEN EVENT CHANGES
  // =========================
  useEffect(() => {
    if (activeEvent) {
      reset(eventDuration);
    }
  }, [activeEvent?.id]);

  // =========================
  // EMPTY STATE
  // =========================
  if (!activeEvent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-100">
        <div className="text-center">
          <p className="mb-3 text-lg font-semibold">Không còn event nào...</p>

          <p className="text-sm text-zinc-400">Có gì đó đáng sợ sắp tới 😶</p>
        </div>
      </div>
    );
  }

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* TOP BAR */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-900/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          {/* LEFT */}
          <div>
            <h1 className="text-xl font-bold">🏢 Sống Sót Công Sở</h1>

            <p className="text-sm text-zinc-400">
              {currentDay} • {currentTimeSlot}
            </p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            <StatCard
              label="Stress"
              value={`${stats.stress}%`}
              danger={stats.stress >= 80}
            />

            <StatCard
              label="Energy"
              value={`${stats.energy}%`}
              danger={stats.energy <= 20}
            />

            <StatCard label="Rep" value={stats.reputation} />

            <StatCard label="Bug" value={stats.bugCount} />

            <StatCard
              label="Salary"
              value={`${Math.floor(stats.salary / 1000)}k`}
            />
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto grid max-w-7xl gap-6 p-4 lg:grid-cols-[1fr_320px]">
        {/* EVENT */}
        <section>
          <EventCard
            event={activeEvent}
            timeLeft={timeLeft}
            progress={progress}
            onSelectAction={selectAction}
          />
        </section>

        {/* FEED */}
        <aside className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-400">
              Live Feed
            </h2>

            <span className="text-xs text-zinc-500">realtime</span>
          </div>

          <div className="flex max-h-[70vh] flex-col gap-3 overflow-y-auto">
            {useGameStore
              .getState()
              .feedLog.slice()
              .reverse()
              .map((feed) => (
                <div
                  key={feed.id}
                  className={`
                    rounded-xl border px-3 py-2 text-sm
                    ${
                      feed.type === "danger"
                        ? "border-red-500/30 bg-red-500/10 text-red-200"
                        : feed.type === "warning"
                        ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-200"
                        : feed.type === "success"
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                        : "border-zinc-700 bg-zinc-800/80 text-zinc-300"
                    }
                  `}
                >
                  <div className="mb-1 text-xs text-zinc-500">
                    {feed.timestamp}
                  </div>

                  <p>{feed.message}</p>
                </div>
              ))}
          </div>
        </aside>
      </main>
    </div>
  );
}

// =========================
// SMALL COMPONENT
// =========================

interface StatCardProps {
  label: string;
  value: string | number;
  danger?: boolean;
}

function StatCard({ label, value, danger }: StatCardProps) {
  return (
    <div
      className={`
        rounded-xl border px-3 py-2
        ${
          danger
            ? "border-red-500/40 bg-red-500/10"
            : "border-zinc-700 bg-zinc-800/80"
        }
      `}
    >
      <p className="text-xs uppercase tracking-wide text-zinc-400">{label}</p>

      <p
        className={`
          mt-1 text-sm font-bold
          ${danger ? "text-red-300" : "text-zinc-100"}
        `}
      >
        {value}
      </p>
    </div>
  );
}
