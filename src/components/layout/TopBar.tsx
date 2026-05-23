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
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-900/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-3 py-2">
        {/* Row 1 */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-base font-black tracking-tight whitespace-nowrap">
              🏢 SỐNG SÓT
            </span>
            {currentDay && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 whitespace-nowrap">
                {DAY_LABELS[currentDay]}
              </span>
            )}
          </div>
          <span className={`hidden sm:block text-xs font-medium ${mood.color}`}>
            {mood.label}
          </span>
        </div>

        {/* Row 2 — stats */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Stress */}
          <div className="flex items-center gap-1.5 flex-1 min-w-[120px] relative">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wide whitespace-nowrap">
              Stress
            </span>
            <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  stressDanger ? "bg-red-500 animate-pulse" : "bg-red-400"
                }`}
                style={{ width: `${stats.stress}%` }}
              />
            </div>
            <span
              className={`text-[10px] font-bold w-7 text-right ${
                stressDanger ? "text-red-400" : "text-zinc-400"
              }`}
            >
              {stats.stress}%
            </span>

            {/* Floating Indicators */}
            <AnimatePresence>
              {indicators
                .filter((ind) => ind.stat === "stress")
                .map((ind) => (
                  <motion.span
                    key={ind.id}
                    initial={{ opacity: 0, y: 5, scale: 0.8 }}
                    animate={{ opacity: 1, y: -22, scale: 1.15 }}
                    exit={{ opacity: 0, y: -35 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className={`absolute right-8 text-xs font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-30 pointer-events-none ${
                      ind.value > 0 ? "text-red-400" : "text-emerald-400"
                    }`}
                  >
                    {ind.value > 0 ? `+${ind.value}%` : `${ind.value}%`}
                  </motion.span>
                ))}
            </AnimatePresence>
          </div>

          {/* Energy */}
          <div className="flex items-center gap-1.5 flex-1 min-w-[120px] relative">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wide whitespace-nowrap">
              Energy
            </span>
            <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  energyDanger ? "bg-blue-500 animate-pulse" : "bg-emerald-400"
                }`}
                style={{ width: `${stats.energy}%` }}
              />
            </div>
            <span
              className={`text-[10px] font-bold w-7 text-right ${
                energyDanger ? "text-blue-400" : "text-zinc-400"
              }`}
            >
              {stats.energy}%
            </span>

            {/* Floating Indicators */}
            <AnimatePresence>
              {indicators
                .filter((ind) => ind.stat === "energy")
                .map((ind) => (
                  <motion.span
                    key={ind.id}
                    initial={{ opacity: 0, y: 5, scale: 0.8 }}
                    animate={{ opacity: 1, y: -22, scale: 1.15 }}
                    exit={{ opacity: 0, y: -35 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className={`absolute right-8 text-xs font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-30 pointer-events-none ${
                      ind.value > 0 ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {ind.value > 0 ? `+${ind.value}%` : `${ind.value}%`}
                  </motion.span>
                ))}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-4 bg-zinc-700" />

          {/* Salary */}
          <div className="flex items-center gap-1.5 relative">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wide">
              Lương
            </span>
            <span className="text-sm font-bold text-yellow-300">
              {formatSalary(stats.salary)}
            </span>

            {/* Floating Indicators */}
            <AnimatePresence>
              {indicators
                .filter((ind) => ind.stat === "salary")
                .map((ind) => (
                  <motion.span
                    key={ind.id}
                    initial={{ opacity: 0, y: 5, scale: 0.8 }}
                    animate={{ opacity: 1, y: -22, scale: 1.15 }}
                    exit={{ opacity: 0, y: -35 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className={`absolute right-0 text-xs font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-30 pointer-events-none ${
                      ind.value > 0 ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {ind.value > 0 ? `+${(ind.value / 1000).toFixed(0)}k` : `${(ind.value / 1000).toFixed(0)}k`}
                  </motion.span>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
