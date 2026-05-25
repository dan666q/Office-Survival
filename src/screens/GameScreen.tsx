import { useEffect, useRef, useState } from "react";
import { useGameStore } from "../store/gameStore";
import TopBar from "../components/layout/TopBar";
import TimeSlotBar from "../components/layout/TimeSlotBar";
import LeftPanel from "../components/layout/LeftPanel";
import CenterPanel from "../components/layout/CenterPanel";
import RightPanel from "../components/layout/RightPanel";
import { ACHIEVEMENTS } from "../utils/achievementChecker";
import { soundManager } from "../utils/soundManager";
import { BUFFS } from "../data/buffs.data";
import { formatSalary } from "../utils/statCalculator";

// Achievement toast hiển thị trong 3 giây
interface AchievementToast {
  id: string;
  emoji: string;
  label: string;
}

export default function GameScreen() {
  const stats = useGameStore((s) => s.stats);
  const achievements = useGameStore((s) => s.achievements);
  const consecutiveTimeouts = useGameStore((s) => s.consecutiveTimeouts);
  const activeEvents = useGameStore((s) => s.activeEvents);
  const activeBuffs = useGameStore((s) => s.activeBuffs);
  const currentTimeSlot = useGameStore((s) => s.currentTimeSlot);
  const lunchBuffsBought = useGameStore((s) => s.lunchBuffsBought);
  const buyBuff = useGameStore((s) => s.buyBuff);
  const profession = useGameStore((s) => s.profession);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const availableBuffs = BUFFS.filter(
    (b) => !b.professions || (profession && b.professions.includes(profession))
  );

  const activeBuffData = availableBuffs.filter((b) =>
    activeBuffs.includes(b.id)
  );

  // Achievement toast
  const prevAchievementsRef = useRef<string[]>(achievements);
  const [toast, setToast] = useState<AchievementToast | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mobile Tab State
  const [activeMobileTab, setActiveMobileTab] = useState<"work" | "chat">("work");

  // Shake khi stress tăng qua ngưỡng 80
  const prevStressRef = useRef(stats.stress);
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

  // Shake khi timeout tăng (bị phạt)
  const prevTimeoutsRef = useRef(consecutiveTimeouts);
  useEffect(() => {
    const prev = prevTimeoutsRef.current;
    prevTimeoutsRef.current = consecutiveTimeouts;

    if (consecutiveTimeouts > prev && wrapperRef.current) {
      wrapperRef.current.classList.add("animate-shake");
      const timer = setTimeout(() => {
        wrapperRef.current?.classList.remove("animate-shake");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [consecutiveTimeouts]);

  // Shake khi có sự kiện Critical mới xuất hiện
  const prevActiveEventsRef = useRef<string[]>([]);
  useEffect(() => {
    const criticalEventIds = activeEvents
      .filter((e) => e.priority === "critical")
      .map((e) => e.id);
    const newCritical = criticalEventIds.find(
      (id) => !prevActiveEventsRef.current.includes(id)
    );
    prevActiveEventsRef.current = activeEvents.map((e) => e.id);

    if (newCritical && wrapperRef.current) {
      wrapperRef.current.classList.add("animate-shake");
      const timer = setTimeout(() => {
        wrapperRef.current?.classList.remove("animate-shake");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [activeEvents]);

  // Detect new achievements → show toast
  useEffect(() => {
    const newIds = achievements.filter(
      (id) => !prevAchievementsRef.current.includes(id)
    );
    prevAchievementsRef.current = achievements;

    if (newIds.length > 0) {
      const found = ACHIEVEMENTS.find((a) => a.id === newIds[0]);
      if (found) {
        if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
        setToast({ id: found.id, emoji: found.emoji, label: found.label });
        toastTimerRef.current = setTimeout(() => setToast(null), 3500);
      }
    }
  }, [achievements]);



  useEffect(() => {
    soundManager.setTension(stats.stress >= 80);
  }, [stats.stress]);

  useEffect(() => {
    soundManager.setEventCount(activeEvents.length);
  }, [activeEvents.length]);

  // Stress overlay opacity: 80–100 → 0–0.25 opacity red
  const stressOverlayOpacity =
    stats.stress >= 80
      ? Math.min(0.3, ((stats.stress - 80) / 20) * 0.3)
      : 0;

  // Energy overlay opacity: 0–25 → 0–0.25 opacity gray
  const energyOverlayOpacity =
    stats.energy <= 25
      ? Math.min(0.3, ((25 - stats.energy) / 25) * 0.3)
      : 0;

  // Pulse speed tùy mức độ stress
  const stressPulse =
    stats.stress >= 95
      ? "animate-[pulse_0.6s_ease-in-out_infinite]"
      : stats.stress >= 85
      ? "animate-[pulse_1s_ease-in-out_infinite]"
      : "animate-[pulse_1.5s_ease-in-out_infinite]";

  const energyPulse =
    stats.energy <= 10
      ? "animate-[pulse_0.7s_ease-in-out_infinite]"
      : "animate-[pulse_1.5s_ease-in-out_infinite]";

  return (
    <div
      ref={wrapperRef}
      className="relative flex flex-col h-screen bg-zinc-950 text-zinc-100 overflow-hidden transition-colors duration-700"
    >
      {/* 🔴 Stress overlay — nháy đỏ toàn màn hình */}
      {stressOverlayOpacity > 0 && (
        <div
          className={`pointer-events-none fixed inset-0 z-40 ${stressPulse}`}
          style={{
            background: `radial-gradient(ellipse at center, rgba(239,68,68,${stressOverlayOpacity * 1.5}) 0%, rgba(239,68,68,${stressOverlayOpacity}) 100%)`,
            boxShadow: `inset 0 0 80px rgba(239,68,68,${stressOverlayOpacity * 2})`,
          }}
        />
      )}

      {/* 🩶 Energy overlay — nháy xám khi kiệt sức */}
      {energyOverlayOpacity > 0 && (
        <div
          className={`pointer-events-none fixed inset-0 z-40 ${energyPulse}`}
          style={{
            background: `radial-gradient(ellipse at center, transparent 30%, rgba(100,116,139,${energyOverlayOpacity * 1.5}) 100%)`,
            boxShadow: `inset 0 0 100px rgba(100,116,139,${energyOverlayOpacity * 2})`,
          }}
        />
      )}

      {/* 🏅 Achievement toast */}
      {toast && (
        <div
          className="fixed top-16 right-4 z-50 flex items-center gap-3 rounded-2xl border border-yellow-400/40 bg-zinc-900/95 px-4 py-3 shadow-2xl backdrop-blur-md"
          style={{ animation: "slideInRight 0.4s ease-out" }}
        >
          <span className="text-3xl">{toast.emoji}</span>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-yellow-400/70 mb-0.5">
              🏅 Achievement mới!
            </p>
            <p className="text-sm font-bold text-white">{toast.label}</p>
          </div>
        </div>
      )}

      {/* Top bar */}
      <TopBar />

      {/* Timeslot bar */}
      <TimeSlotBar />

      {/* Desktop — 3 cột */}
      <div className="hidden lg:grid lg:grid-cols-[380px_1fr_320px] flex-1 min-h-0 divide-x divide-zinc-800 overflow-hidden">
        <LeftPanel />
        <CenterPanel />
        <RightPanel />
      </div>

      {/* Mobile / Responsive layout (below lg) */}
      <div className="lg:hidden flex flex-col flex-1 min-h-0 divide-y divide-zinc-800">
        {/* Mobile Tab Switcher */}
        <div className="flex-shrink-0 flex border-b border-zinc-800 bg-zinc-950 select-none">
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveMobileTab("work");
            }}
            className={`flex-1 py-3 text-center text-xs font-black transition-all relative flex items-center justify-center gap-1.5 ${
              activeMobileTab === "work" ? "text-cyan-400 bg-cyan-950/25" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <span>💻</span>
            <span>Công Việc</span>
            {activeMobileTab === "work" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
            )}
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveMobileTab("chat");
            }}
            className={`flex-1 py-3 text-center text-xs font-black transition-all relative flex items-center justify-center gap-1.5 ${
              activeMobileTab === "chat" ? "text-cyan-400 bg-cyan-950/25" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <span>💬</span>
            <span>Nhóm Zalo</span>
            {activeMobileTab === "chat" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
            )}
          </button>
        </div>

        {activeMobileTab === "work" ? (
          <div className="flex-1 min-h-0 flex flex-col overflow-y-auto">
            {/* Active buffs row on mobile (quick glance) */}
            {activeBuffData.length > 0 && (
              <div className="flex-shrink-0 bg-zinc-950/40 px-3 py-1.5 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-2 border-b border-zinc-900">
                <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold mr-1">Buffs:</span>
                {activeBuffData.map((buff) => (
                  <span
                    key={buff.id}
                    className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full"
                  >
                    <span>{buff.icon}</span>
                    <span className="font-semibold">{buff.name}</span>
                  </span>
                ))}
              </div>
            )}

            {/* Gameplay Area (CenterPanel) */}
            <div className="flex-1 min-h-0 flex flex-col">
              <CenterPanel />
            </div>

            {/* GrabFood Canteen during Lunch Slot on Mobile */}
            {currentTimeSlot === "lunch" && (
              <div className="flex-shrink-0 bg-zinc-900/50 p-3 border-t border-b border-zinc-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-widest text-yellow-400 font-bold">
                    🍱 GrabFood Cứu Mạng (Trưa)
                  </span>
                  <span className="text-[10px] text-zinc-400 font-medium">
                    Còn mua được: {2 - lunchBuffsBought} món
                  </span>
                </div>
                {/* GrabFood Canteen grid inside play area */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {availableBuffs.filter(b => !activeBuffs.includes(b.id)).slice(0, 6).map((buff) => {
                    const canAfford = stats.salary >= buff.cost;
                    const disabled = !canAfford || lunchBuffsBought >= 2;
                    return (
                      <div
                        key={buff.id}
                        onClick={() => {
                          if (!disabled) {
                            soundManager.playClick();
                            buyBuff(buff.id);
                          }
                        }}
                        className={`
                          rounded-xl border p-2.5 transition-all duration-200
                          ${
                            disabled
                              ? "border-zinc-800 bg-zinc-950/40 opacity-40 cursor-not-allowed"
                              : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 cursor-pointer active:scale-95"
                          }
                        `}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm">{buff.icon}</span>
                            <span className="text-[11px] font-bold text-zinc-200 truncate">
                              {buff.name}
                            </span>
                          </div>
                          <span className={`text-[10px] font-extrabold ${canAfford ? "text-yellow-400" : "text-red-400"}`}>
                            {formatSalary(buff.cost)}
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-500 leading-relaxed line-clamp-1">{buff.description}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {buff.effects.map((e, idx) => (
                            <span
                              key={idx}
                              className={`text-[8px] px-1.5 py-0.5 rounded-full border ${
                                e.value > 0
                                  ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                                  : "border-red-500/20 bg-red-500/10 text-red-400"
                              }`}
                            >
                              {e.value > 0 ? "+" : ""}{e.value} {e.stat}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 min-h-0 flex flex-col bg-zinc-950/40">
            <LeftPanel />
          </div>
        )}
      </div>

      {/* Visual animations & styles */}
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(120%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translate(0, 0); }
          10%, 30%, 50%, 70%, 90% { transform: translate(-3px, -1px); }
          20%, 40%, 60%, 80% { transform: translate(3px, 1px); }
        }
        .animate-shake {
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}
