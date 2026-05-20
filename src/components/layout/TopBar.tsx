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

export default function TopBar() {
  const { stats, currentDay } = useGameStore();
  const mood = getMood(stats);

  const stressDanger = stats.stress >= 80;
  const energyDanger = stats.energy <= 20;

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
          <div className="flex items-center gap-1.5 flex-1 min-w-[120px]">
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
          </div>

          {/* Energy */}
          <div className="flex items-center gap-1.5 flex-1 min-w-[120px]">
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
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-4 bg-zinc-700" />

          {/* Salary */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wide">
              Lương
            </span>
            <span className="text-sm font-bold text-yellow-300">
              {formatSalary(stats.salary)}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
