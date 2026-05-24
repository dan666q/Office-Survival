import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGameStore } from "../../store/gameStore";
import { getMood, formatSalary } from "../../utils/statCalculator";

const DAY_LABELS: Record<string, string> = {
  monday: "Thứ Hai",
  tuesday: "Thứ Ba",
  wednesday: "Thứ Tư",
  thursday: "Thứ Năm",
  friday: "Thứ Sáu",
  saturday: "Thứ Bảy",
};

interface StatIndicator {
  id: string;
  stat: "stress" | "energy" | "salary";
  value: number;
}

function getAvatarEmoji(stress: number, energy: number) {
  if (stress >= 80) return "🤯";
  if (energy <= 20) return "💀";
  if (stress >= 50) return "😰";
  if (energy <= 50) return "🥱";
  return "👨‍💻";
}

export default function TopBar() {
  const { stats, currentDay } = useGameStore();
  const mood = getMood(stats);

  const stressDanger = stats.stress >= 80;
  const energyDanger = stats.energy <= 20;

  const [indicators, setIndicators] = useState<StatIndicator[]>([]);
  const prevStatsRef = useRef(stats);

  useEffect(() => {
    const prev = prevStatsRef.current;
    const newInds: StatIndicator[] = [];

    if (stats.stress !== prev.stress) {
      newInds.push({
        id: Math.random().toString(),
        stat: "stress",
        value: stats.stress - prev.stress,
      });
    }
    if (stats.energy !== prev.energy) {
      newInds.push({
        id: Math.random().toString(),
        stat: "energy",
        value: stats.energy - prev.energy,
      });
    }
    if (stats.salary !== prev.salary) {
      newInds.push({
        id: Math.random().toString(),
        stat: "salary",
        value: stats.salary - prev.salary,
      });
    }

    if (newInds.length > 0) {
      setIndicators((prevList) => [...prevList, ...newInds]);
      newInds.forEach((ind) => {
        setTimeout(() => {
          setIndicators((prevList) => prevList.filter((x) => x.id !== ind.id));
        }, 1200);
      });
    }

    prevStatsRef.current = stats;
  }, [stats]);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur select-none font-sans">

      {/* ── Desktop layout ── */}
      <div className="hidden sm:flex mx-auto max-w-7xl px-3 py-1.5 items-center justify-between">
        {/* Left: Title + Day */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-black tracking-wider text-zinc-100 flex items-center gap-1">
            🏢 SỐNG SÓT CÔNG SỞ
          </span>
          {currentDay && (
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-300 font-extrabold whitespace-nowrap font-mono">
              {DAY_LABELS[currentDay]}
            </span>
          )}
        </div>

        {/* Center: Avatar */}
        <div className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800 rounded-full px-3 py-0.5 shadow-inner">
          <span className="text-sm animate-[bounce_2s_infinite]">{getAvatarEmoji(stats.stress, stats.energy)}</span>
          <span className={`text-[10px] font-extrabold tracking-wide ${mood.color} uppercase`}>{mood.label}</span>
        </div>

        {/* Right: Stats */}
        <div className="flex items-center gap-4">
          {/* Stress */}
          <div className="flex items-center gap-1.5 relative">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">😤 Stress:</span>
            <span className={`text-xs font-bold ${stressDanger ? "text-red-400 animate-pulse" : "text-zinc-300"}`}>{stats.stress}%</span>
            <div className="w-12 h-2 rounded bg-zinc-900 overflow-hidden border border-zinc-800">
              <div className={`h-full transition-all duration-500 ${stressDanger ? "bg-red-500 animate-pulse" : "bg-red-400"}`} style={{ width: `${stats.stress}%` }} />
            </div>
            <AnimatePresence>
              {indicators.filter((i) => i.stat === "stress").map((ind) => (
                <motion.span key={ind.id} initial={{ opacity: 0, y: 5, scale: 0.8 }} animate={{ opacity: 1, y: -20, scale: 1.15 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.9, ease: "easeOut" }} className={`absolute right-0 text-[10px] font-black z-30 pointer-events-none ${ind.value > 0 ? "text-red-400" : "text-emerald-400"}`}>
                  {ind.value > 0 ? `+${ind.value}%` : `${ind.value}%`}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>

          {/* Energy */}
          <div className="flex items-center gap-1.5 relative">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">⚡ Thể lực:</span>
            <span className={`text-xs font-bold ${energyDanger ? "text-red-400 animate-pulse" : "text-zinc-300"}`}>{stats.energy}%</span>
            <div className="w-12 h-2 rounded bg-zinc-900 overflow-hidden border border-zinc-800">
              <div className={`h-full transition-all duration-500 ${energyDanger ? "bg-red-500 animate-pulse" : "bg-emerald-400"}`} style={{ width: `${stats.energy}%` }} />
            </div>
            <AnimatePresence>
              {indicators.filter((i) => i.stat === "energy").map((ind) => (
                <motion.span key={ind.id} initial={{ opacity: 0, y: 5, scale: 0.8 }} animate={{ opacity: 1, y: -20, scale: 1.15 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.9, ease: "easeOut" }} className={`absolute right-0 text-[10px] font-black z-30 pointer-events-none ${ind.value > 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {ind.value > 0 ? `+${ind.value}%` : `${ind.value}%`}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>

          {/* Salary */}
          <div className="flex items-center gap-1.5 relative bg-zinc-900/50 border border-zinc-800 rounded px-2 py-0.5">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">💰 Lương:</span>
            <span className="text-xs font-black text-yellow-300">{formatSalary(stats.salary)}</span>
            <AnimatePresence>
              {indicators.filter((i) => i.stat === "salary").map((ind) => (
                <motion.span key={ind.id} initial={{ opacity: 0, y: 5, scale: 0.8 }} animate={{ opacity: 1, y: -20, scale: 1.15 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.9, ease: "easeOut" }} className={`absolute right-0 text-[10px] font-black z-30 pointer-events-none ${ind.value > 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {ind.value > 0 ? `+${(ind.value / 1000).toFixed(0)}k` : `${(ind.value / 1000).toFixed(0)}k`}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Mobile layout ── */}
      <div className="flex sm:hidden flex-col px-3 pt-1.5 pb-1 gap-1">
        {/* Row 1: Day badge | Avatar mood | Salary */}
        <div className="flex items-center justify-between">
          {/* Day */}
          {currentDay ? (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-300 font-extrabold font-mono">
              {DAY_LABELS[currentDay]}
            </span>
          ) : <span />}

          {/* Avatar mood */}
          <div className="flex items-center gap-1.5 bg-zinc-900/60 border border-zinc-800 rounded-full px-2.5 py-0.5">
            <span className="text-xs animate-[bounce_2s_infinite]">{getAvatarEmoji(stats.stress, stats.energy)}</span>
            <span className={`text-[9px] font-extrabold tracking-wide ${mood.color} uppercase`}>{mood.label}</span>
          </div>

          {/* Salary */}
          <div className="flex items-center gap-1 relative bg-zinc-900/50 border border-zinc-800 rounded px-2 py-0.5">
            <span className="text-[9px] text-zinc-500 font-bold">💰</span>
            <span className="text-[10px] font-black text-yellow-300">{formatSalary(stats.salary)}</span>
            <AnimatePresence>
              {indicators.filter((i) => i.stat === "salary").map((ind) => (
                <motion.span key={ind.id} initial={{ opacity: 0, y: 5, scale: 0.8 }} animate={{ opacity: 1, y: -20, scale: 1.15 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.9, ease: "easeOut" }} className={`absolute right-0 text-[9px] font-black z-30 pointer-events-none ${ind.value > 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {ind.value > 0 ? `+${(ind.value / 1000).toFixed(0)}k` : `${(ind.value / 1000).toFixed(0)}k`}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Row 2: Stress bar | Energy bar */}
        <div className="flex items-center gap-3">
          {/* Stress */}
          <div className="flex-1 flex items-center gap-1.5 relative">
            <span className="text-[9px] text-zinc-500 font-bold shrink-0">😤</span>
            <div className="flex-1 h-2 rounded bg-zinc-900 overflow-hidden border border-zinc-800">
              <div className={`h-full transition-all duration-500 ${stressDanger ? "bg-red-500 animate-pulse" : "bg-red-400"}`} style={{ width: `${stats.stress}%` }} />
            </div>
            <span className={`text-[9px] font-bold shrink-0 w-6 text-right ${stressDanger ? "text-red-400 animate-pulse" : "text-zinc-400"}`}>{stats.stress}%</span>
            <AnimatePresence>
              {indicators.filter((i) => i.stat === "stress").map((ind) => (
                <motion.span key={ind.id} initial={{ opacity: 0, y: 5, scale: 0.8 }} animate={{ opacity: 1, y: -16, scale: 1.1 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.9, ease: "easeOut" }} className={`absolute right-0 text-[9px] font-black z-30 pointer-events-none ${ind.value > 0 ? "text-red-400" : "text-emerald-400"}`}>
                  {ind.value > 0 ? `+${ind.value}%` : `${ind.value}%`}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>

          <div className="w-px h-3 bg-zinc-700 shrink-0" />

          {/* Energy */}
          <div className="flex-1 flex items-center gap-1.5 relative">
            <span className="text-[9px] text-zinc-500 font-bold shrink-0">⚡</span>
            <div className="flex-1 h-2 rounded bg-zinc-900 overflow-hidden border border-zinc-800">
              <div className={`h-full transition-all duration-500 ${energyDanger ? "bg-red-500 animate-pulse" : "bg-emerald-400"}`} style={{ width: `${stats.energy}%` }} />
            </div>
            <span className={`text-[9px] font-bold shrink-0 w-6 text-right ${energyDanger ? "text-red-400 animate-pulse" : "text-zinc-400"}`}>{stats.energy}%</span>
            <AnimatePresence>
              {indicators.filter((i) => i.stat === "energy").map((ind) => (
                <motion.span key={ind.id} initial={{ opacity: 0, y: 5, scale: 0.8 }} animate={{ opacity: 1, y: -16, scale: 1.1 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.9, ease: "easeOut" }} className={`absolute right-0 text-[9px] font-black z-30 pointer-events-none ${ind.value > 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {ind.value > 0 ? `+${ind.value}%` : `${ind.value}%`}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

    </header>
  );
}
