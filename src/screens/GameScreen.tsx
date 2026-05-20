import { useEffect, useRef, useState } from "react";
import { useGameStore } from "../store/gameStore";
import TopBar from "../components/layout/TopBar";
import TimeSlotBar from "../components/layout/TimeSlotBar";
import LeftPanel from "../components/layout/LeftPanel";
import CenterPanel from "../components/layout/CenterPanel";
import RightPanel from "../components/layout/RightPanel";

const TABS = [
  { key: "event", label: "⚡ Event" },
  { key: "feed", label: "📡 Feed" },
  { key: "stats", label: "📊 Stats" },
] as const;

type MobileTab = (typeof TABS)[number]["key"];

export default function GameScreen() {
  const stats = useGameStore((s) => s.stats);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [mobileTab, setMobileTab] = useState<MobileTab>("event");
  const prevStressRef = useRef(stats.stress);

  // Shake khi stress tăng qua ngưỡng 80
  useEffect(() => {
    const prev = prevStressRef.current;
    const curr = stats.stress;
    prevStressRef.current = curr;

    if (curr >= 80 && prev < 80 && wrapperRef.current) {
      wrapperRef.current.classList.add("animate-shake");
      setTimeout(() => {
        wrapperRef.current?.classList.remove("animate-shake");
      }, 500);
    }
  }, [stats.stress]);

  return (
    <div
      ref={wrapperRef}
      className={`
        flex flex-col h-screen bg-zinc-950 text-zinc-100 overflow-hidden
        transition-colors duration-700
        ${stats.stress >= 90 ? "bg-red-950/10" : ""}
      `}
    >
      {/* Top bar */}
      <TopBar />

      {/* Timeslot bar */}
      <TimeSlotBar />

      {/* Desktop — 3 cột */}
      <div className="hidden lg:grid lg:grid-cols-[320px_1fr_240px] flex-1 min-h-0 divide-x divide-zinc-800 overflow-hidden">
        <LeftPanel />
        <CenterPanel />
        <RightPanel />
      </div>

      {/* Mobile — tabs */}
      <div className="lg:hidden flex flex-col flex-1 min-h-0 overflow-hidden">
        {/* Tab bar */}
        <div className="flex border-b border-zinc-800 bg-zinc-900/80 flex-shrink-0">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setMobileTab(t.key)}
              className={`
                flex-1 py-2.5 text-xs font-medium
                transition-colors duration-200
                border-b-2
                ${
                  mobileTab === t.key
                    ? "border-cyan-400 text-cyan-300"
                    : "border-transparent text-zinc-500 hover:text-zinc-300"
                }
              `}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 min-h-0 overflow-hidden">
          {mobileTab === "event" && <LeftPanel />}
          {mobileTab === "feed" && <CenterPanel />}
          {mobileTab === "stats" && <RightPanel />}
        </div>
      </div>
    </div>
  );
}
