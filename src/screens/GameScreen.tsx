import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGameStore } from "../store/gameStore";
import TopBar from "../components/layout/TopBar";
import TimeSlotBar from "../components/layout/TimeSlotBar";
import LeftPanel, { parseFeedEntry } from "../components/layout/LeftPanel";
import CenterPanel from "../components/layout/CenterPanel";
import RightPanel from "../components/layout/RightPanel";
import { ACHIEVEMENTS } from "../utils/achievementChecker";
import { soundManager } from "../utils/soundManager";
import { getBuffsForProfession } from "../store/gameHelpers";
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
  const feedLog = useGameStore((s) => s.feedLog);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const availableBuffs = getBuffsForProfession(profession);

  const activeBuffData = availableBuffs.filter((b) =>
    activeBuffs.includes(b.id)
  );

  // Achievement toast
  const prevAchievementsRef = useRef<string[]>(achievements);
  const [toast, setToast] = useState<AchievementToast | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mobile Tab State
  const [activeMobileTab, setActiveMobileTab] = useState<"work" | "chat">("work");
  
  // Notification Badge for Mobile
  const [lastReadFeedLength, setLastReadFeedLength] = useState(feedLog.length);
  
  // Zalo Canteen Bottom Sheet State
  const [isCanteenOpen, setIsCanteenOpen] = useState(false);

  // Zalo Bubble Preview Toast State
  const [bubbleNotification, setBubbleNotification] = useState<{
    id: string;
    sender: { name: string; avatar: string; color: string };
    message: string;
  } | null>(null);

  // Reset Canteen Bottom Sheet if lunch ends
  useEffect(() => {
    if (currentTimeSlot !== "lunch") {
      setIsCanteenOpen(false);
    }
  }, [currentTimeSlot]);

  // Update last seen feed length to clear badge when switching to chat tab
  useEffect(() => {
    if (activeMobileTab === "chat") {
      setLastReadFeedLength(feedLog.length);
    }
  }, [activeMobileTab, feedLog.length]);

  // Zalo Bubble Preview Notification Trigger
  const prevFeedLogLengthRef = useRef(feedLog.length);
  useEffect(() => {
    const prevLength = prevFeedLogLengthRef.current;
    prevFeedLogLengthRef.current = feedLog.length;

    // Show colleague chat bubble preview only when in work tab, new entries are added, AND on mobile screen (< 1024px)
    if (
      window.innerWidth < 1024 &&
      activeMobileTab === "work" && 
      feedLog.length > prevLength && 
      feedLog.length > 0
    ) {
      const newEntries = feedLog.slice(prevLength);
      
      // Search from the latest added in this batch backwards to find the first colleague response
      for (let i = newEntries.length - 1; i >= 0; i--) {
        const entry = newEntries[i];
        const parsed = parseFeedEntry(entry);
        
        const lastColleagueMsg = [...parsed].reverse().find((m) => !m.isSelf && !m.isInfo);
        if (lastColleagueMsg) {
          setBubbleNotification({
            id: lastColleagueMsg.id,
            sender: lastColleagueMsg.sender,
            message: lastColleagueMsg.message,
          });
 
          const timer = setTimeout(() => {
            setBubbleNotification(null);
          }, 2800);
          return () => clearTimeout(timer);
        }
      }
    }
  }, [feedLog, activeMobileTab]);

  // Calculate unread message badge count
  const unreadCount = activeMobileTab === "work" ? Math.max(0, feedLog.length - lastReadFeedLength) : 0;

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

      {/* Desktop Achievement toast */}
      {toast && (
        <div
          className="hidden lg:flex fixed top-16 right-4 z-50 items-center gap-3 rounded-2xl border border-yellow-400/40 bg-zinc-900/95 px-4 py-3 shadow-2xl backdrop-blur-md"
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
 
      {/* Mobile Top Notification Stacking Container */}
      <div className="lg:hidden fixed top-14 left-4 right-4 z-[999] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {bubbleNotification && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={() => {
                soundManager.playClick();
                setActiveMobileTab("chat");
                setBubbleNotification(null);
              }}
              className="pointer-events-auto flex items-start gap-3 rounded-2xl border border-blue-500/30 bg-zinc-900/95 p-3.5 shadow-2xl backdrop-blur-md cursor-pointer active:scale-98 select-none"
            >
              <span className="text-2xl shrink-0 bg-blue-600/10 w-9 h-9 rounded-full flex items-center justify-center border border-blue-500/20">
                {bubbleNotification.sender.avatar}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className={`text-xs font-black truncate ${bubbleNotification.sender.color}`}>
                    {bubbleNotification.sender.name}
                  </p>
                  <span className="text-[8px] uppercase tracking-wider text-blue-400 font-bold bg-blue-500/10 px-1.5 py-0.5 rounded-full border border-blue-500/20 shrink-0">
                    Zép Lào Chat
                  </span>
                </div>
                <p className="text-[11px] text-zinc-300 font-medium leading-normal line-clamp-2">
                  {bubbleNotification.message}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {toast && (
          <div
            className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-yellow-400/40 bg-zinc-900/95 px-4 py-3 shadow-2xl backdrop-blur-md w-full"
            style={{ animation: "slideInRight 0.4s ease-out" }}
          >
            <span className="text-2xl shrink-0">🏅</span>
            <div className="flex-1 min-w-0">
              <p className="text-[9px] uppercase tracking-widest text-yellow-400/70 mb-0.5 font-bold">
                Achievement mới!
              </p>
              <p className="text-xs font-black text-white truncate">{toast.emoji} {toast.label}</p>
            </div>
          </div>
        )}
      </div>

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
      <div className="lg:hidden flex flex-col flex-1 min-h-0 overflow-hidden relative">
        
        {/* Main content display viewport */}
        <div className="flex-1 min-h-0 flex flex-col overflow-y-auto pb-4 relative">
          {/* Gameplay tab */}
          <div className={`flex-1 min-h-0 flex flex-col ${activeMobileTab === "work" ? "" : "hidden"}`}>
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
          </div>

          {/* Chat Zalo tab */}
          <div className={`flex-1 min-h-0 flex flex-col bg-zinc-950/40 ${activeMobileTab === "chat" ? "" : "hidden"}`}>
            <LeftPanel />
          </div>
        </div>

        {/* Floating GrabFood Button on Mobile */}
        {currentTimeSlot === "lunch" && activeMobileTab === "work" && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              soundManager.playClick();
              setIsCanteenOpen(true);
            }}
            className="fixed bottom-20 right-4 z-40 flex items-center gap-1.5 rounded-full bg-yellow-500 text-zinc-950 px-4 py-3 font-extrabold text-xs shadow-[0_8px_24px_rgba(234,179,8,0.3)] border border-yellow-400/20 active:scale-95 transition-all"
          >
            <span className="text-base animate-bounce">🍱</span>
            <span>Đặt Trưa</span>
            {2 - lunchBuffsBought > 0 && (
              <span className="bg-red-600 text-white rounded-full text-[9px] px-1.5 py-0.5 min-w-[16px] h-4 flex items-center justify-center font-bold">
                {2 - lunchBuffsBought}
              </span>
            )}
          </motion.button>
        )}

        {/* GrabFood Bottom Sheet on Mobile */}
        <AnimatePresence>
          {isCanteenOpen && currentTimeSlot === "lunch" && (
            <>
              {/* Dark backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCanteenOpen(false)}
                className="fixed inset-0 z-45 bg-black"
              />

              {/* Bottom Sheet Drawer */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="fixed bottom-0 left-0 right-0 z-50 rounded-t-[28px] border-t border-zinc-800 bg-zinc-900/95 p-5 pb-8 shadow-[0_-8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl max-h-[80vh] flex flex-col"
              >
                {/* Drag handle decorator */}
                <div className="w-12 h-1.5 bg-zinc-700 rounded-full mx-auto mb-4 cursor-pointer shrink-0" onClick={() => setIsCanteenOpen(false)} />

                <div className="flex items-center justify-between mb-4 shrink-0">
                  <div>
                    <h3 className="text-base font-black text-yellow-400 flex items-center gap-1.5">
                      <span>🍱</span> GrabFood Cứu Mạng
                    </h3>
                    <p className="text-[10px] text-zinc-400 mt-0.5 font-medium">
                      Mua tối đa 2 món nạp stats khẩn cấp cho buổi chiều!
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <button
                      onClick={() => setIsCanteenOpen(false)}
                      className="w-7 h-7 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center text-xs font-bold hover:text-zinc-200 active:scale-90 transition-all border border-zinc-700/50"
                    >
                      ✕
                    </button>
                    <span className="text-[9px] text-zinc-400 font-bold bg-zinc-850 px-2 py-0.5 rounded-full border border-zinc-800 shrink-0">
                      Còn: {2 - lunchBuffsBought} lượt
                    </span>
                  </div>
                </div>

                {/* Items list viewport */}
                <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 scrollbar-thin">
                  {availableBuffs.filter(b => !activeBuffs.includes(b.id)).map((buff) => {
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
                          rounded-2xl border p-3.5 transition-all duration-200 flex flex-col gap-2
                          ${
                            disabled
                              ? "border-zinc-800/60 bg-zinc-950/20 opacity-40 cursor-not-allowed"
                              : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 cursor-pointer active:scale-99"
                          }
                        `}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-xl bg-zinc-800 w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-zinc-700">
                              {buff.icon}
                            </span>
                            <div className="min-w-0">
                              <span className="text-xs font-black text-zinc-200 block truncate">
                                {buff.name}
                              </span>
                              <span className="text-[9px] text-zinc-400 leading-normal block mt-0.5 font-medium">
                                {buff.description}
                              </span>
                            </div>
                          </div>
                          <span className={`text-[10px] font-black px-2.5 py-1 rounded-full shrink-0 ${canAfford ? "text-yellow-400 bg-yellow-500/10 border border-yellow-500/20" : "text-red-400 bg-red-500/10 border border-red-500/20"}`}>
                            {formatSalary(buff.cost)}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1 border-t border-zinc-800/60 pt-2">
                          {buff.effects.map((e, idx) => (
                            <span
                              key={idx}
                              className={`text-[8px] px-2 py-0.5 rounded-full border font-bold ${
                                e.value > 0
                                  ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                                  : "border-red-500/20 bg-red-500/10 text-red-400"
                              }`}
                            >
                              {e.value > 0 ? "+" : ""}{e.value} {e.stat === 'stress' ? 'Stress' : e.stat === 'energy' ? 'Energy' : e.stat}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Thumb-friendly Bottom Navigation Bar */}
        <div className="flex-shrink-0 flex border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-md select-none safe-bottom pb-safe z-30">
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveMobileTab("work");
            }}
            className={`flex-1 py-3.5 text-center text-xs font-black transition-all relative flex flex-col items-center justify-center gap-1 ${
              activeMobileTab === "work" ? "text-cyan-400" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <span className="text-lg">💻</span>
            <span className="text-[10px] tracking-wide font-bold">Công Việc</span>
            {activeMobileTab === "work" && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute top-0 left-4 right-4 h-0.5 bg-cyan-400 rounded-full"
              />
            )}
          </button>
          
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveMobileTab("chat");
            }}
            className={`flex-1 py-3.5 text-center text-xs font-black transition-all relative flex flex-col items-center justify-center gap-1 ${
              activeMobileTab === "chat" ? "text-cyan-400" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <span className="text-lg">💬</span>
            <span className="text-[10px] tracking-wide font-bold">Nhóm Zép Lào</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-1/3 bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 min-w-[16px] h-4 rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(239,68,68,0.4)] animate-pulse">
                {unreadCount}
              </span>
            )}
            {activeMobileTab === "chat" && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute top-0 left-4 right-4 h-0.5 bg-cyan-400 rounded-full"
              />
            )}
          </button>
        </div>
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
