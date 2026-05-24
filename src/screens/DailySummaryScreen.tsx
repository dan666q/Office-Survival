import { useEffect } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "../store/gameStore";
import { formatSalary } from "../utils/statCalculator";
import { soundManager } from "../utils/soundManager";

const DAY_LABELS: Record<string, string> = {
  monday: "Thứ Hai",
  tuesday: "Thứ Ba",
  wednesday: "Thứ Tư",
  thursday: "Thứ Năm",
  friday: "Thứ Sáu",
  saturday: "Thứ Bảy",
};

const REST_OPTIONS = [
  {
    id: "sleep",
    title: "😴 Ngủ sớm",
    description: "An toàn, hồi phục tốt và hoàn toàn miễn phí.",
    effects: ["+45% Energy", "-25% Stress", "Miễn phí"],
    color: "from-emerald-500/20 to-green-500/10",
    border: "border-emerald-500/40",
  },
  {
    id: "beer",
    title: "🍻 Uống bia giải sầu",
    description: "Giải tỏa stress cực tốt nhưng tốn kém. 30% cơ hội xảy ra drama sáng mai.",
    effects: ["+10% Energy", "-20% Stress", "-150k"],
    color: "from-amber-500/20 to-orange-500/10",
    border: "border-amber-500/40",
  },
  {
    id: "overtime",
    title: "💻 Làm thêm ban đêm",
    description: "Tăng thêm thu nhập (+250k) nhưng bào mòn sức khỏe và tăng stress.",
    effects: ["-15% Energy", "+25% Stress", "+250k"],
    color: "from-red-500/20 to-rose-500/10",
    border: "border-red-500/40",
  },
] as const;

export default function DailySummaryScreen() {
  const { currentDay, stats, dayHistory, nextDay } = useGameStore();
  const latestDay = dayHistory[dayHistory.length - 1];

  useEffect(() => {
    soundManager.playDayPass();
  }, []);

  return (
    <div className="min-h-screen bg-[#060816] text-white px-4 py-6 md:px-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl"
      >
        {/* HEADER */}
        <div className="mb-4 md:mb-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-cyan-300/70 mb-2">
                Daily Summary
              </p>
              <h1 className="text-2xl sm:text-5xl font-black">
                Kết thúc{" "}
                <span className="text-cyan-300">
                  {DAY_LABELS[currentDay ?? ""] ?? currentDay}
                </span>
              </h1>
              <p className="text-xs sm:text-white/60 mt-2 max-w-2xl">
                Bạn vẫn còn sống sót sau một ngày công sở đầy deadline, drama và
                những cuộc họp đáng lẽ chỉ cần email.
              </p>
            </div>

            <div className="rounded-xl sm:rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 sm:px-5 sm:py-4">
              <p className="text-xs text-cyan-200/70 mb-0.5 sm:mb-1">
                Tình trạng hiện tại
              </p>
              <p className="text-lg sm:text-2xl font-black">
                {stats.stress >= 80
                  ? "💀 Sắp burnout"
                  : stats.energy <= 20
                  ? "😵 Kiệt sức"
                  : "😌 Tạm ổn"}
              </p>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mb-4 md:mb-8">
          <StatCard
            label="Stress"
            value={`${stats.stress}%`}
            glow="from-red-500/30 to-transparent"
          />
          <StatCard
            label="Energy"
            value={`${stats.energy}%`}
            glow="from-emerald-500/30 to-transparent"
          />
          <StatCard
            label="Lương"
            value={formatSalary(stats.salary)}
            glow="from-yellow-500/30 to-transparent"
          />
        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 mb-8">
          {/* LEFT */}
          <div className="order-2 lg:order-1 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold">📋 Tổng kết hôm nay</h2>
              <div className="text-sm text-white/50">HR đang theo dõi 👀</div>
            </div>

            <div className="space-y-4">
              <SummaryRow
                label="Events xử lý"
                value={`${latestDay?.eventsHandled ?? 0}`}
              />
              <SummaryRow
                label="Lương kiếm được"
                value={formatSalary(latestDay?.salaryEarned ?? 0)}
              />
              <SummaryRow
                label="Mental stability"
                value={
                  stats.stress >= 80
                    ? "Rất đáng báo động"
                    : stats.stress >= 50
                    ? "Không ổn lắm"
                    : "Tạm ổn"
                }
              />
              <SummaryRow
                label="Khả năng OT tiếp"
                value={
                  stats.energy <= 20
                    ? "0%"
                    : stats.energy <= 50
                    ? "Có thể bị ép"
                    : "Còn sống được"
                }
              />
            </div>

            <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-100">
              ⚠️ Stress và Energy mang sang ngày tiếp theo. Công sở không reset
              theo ngày.
            </div>
          </div>

          {/* RIGHT */}
          <div className="order-1 lg:order-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-5">🌙 Tối nay làm gì?</h2>

            <div className="space-y-4">
              {REST_OPTIONS.map((option) => {
                let disabled = false;
                let disabledReason = "";

                if (option.id === "beer") {
                  if (stats.energy < 15) {
                    disabled = true;
                    disabledReason = "Cần ≥ 15% Energy";
                  } else if (stats.stress >= 95) {
                    disabled = true;
                    disabledReason = "Stress quá cao (≥ 95%)";
                  } else if (stats.salary < 150000) {
                    disabled = true;
                    disabledReason = "Không đủ tiền (Cần ≥ 150k)";
                  }
                } else if (option.id === "overtime") {
                  if (stats.energy < 30) {
                    disabled = true;
                    disabledReason = "Cần ≥ 30% Energy";
                  } else if (stats.stress >= 80) {
                    disabled = true;
                    disabledReason = "Stress quá cao (≥ 80%)";
                  }
                }

                return (
                  <motion.button
                    key={option.id}
                    disabled={disabled}
                    whileHover={disabled ? {} : { scale: 1.015 }}
                    whileTap={disabled ? {} : { scale: 0.98 }}
                    onClick={() => {
                      if (disabled) return;
                      soundManager.playClick();
                      nextDay(option.id as "sleep" | "beer" | "overtime");
                    }}
                    className={`
                      w-full rounded-2xl border p-5 text-left transition-all duration-200
                      ${
                        disabled
                          ? "border-zinc-800 bg-zinc-900/30 text-zinc-500 opacity-50 cursor-not-allowed"
                          : `bg-gradient-to-br ${option.color} ${option.border} hover:border-white/30`
                      }
                    `}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className={`text-lg font-bold mb-1 ${disabled ? "text-zinc-500" : ""}`}>
                          {option.title}
                        </h3>
                        <p className={`text-sm mb-3 ${disabled ? "text-zinc-600" : "text-white/65"}`}>
                          {option.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {option.effects.map((effect) => (
                            <span
                              key={effect}
                              className={`rounded-full border px-3 py-1 text-xs ${
                                disabled
                                  ? "border-zinc-800 bg-zinc-900/50 text-zinc-600"
                                  : "border-white/10 bg-white/10 text-white"
                              }`}
                            >
                              {effect}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {disabled ? (
                        <span className="text-[10px] font-extrabold text-red-400 bg-red-950/40 border border-red-500/20 px-2 py-1 rounded-full flex items-center gap-1 shrink-0 self-center">
                          <span>🔒</span>
                          <span>{disabledReason}</span>
                        </span>
                      ) : (
                        <div className="text-white/40 text-xl">→</div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  glow: string;
}

function StatCard({ label, value, glow }: StatCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-5">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${glow} opacity-60`}
      />
      <div className="relative">
        <p className="text-xs sm:text-sm text-white/55 mb-1 sm:mb-2">{label}</p>
        <h3 className="text-base sm:text-2xl font-black break-words">{value}</h3>
      </div>
    </div>
  );
}

interface SummaryRowProps {
  label: string;
  value: string;
}

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
      <span className="text-white/60">{label}</span>
      <span className="font-semibold text-right">{value}</span>
    </div>
  );
}
