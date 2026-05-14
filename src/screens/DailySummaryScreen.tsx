// src/screens/DailySummaryScreen.tsx

import { motion } from "framer-motion";
import { useGameStore } from "../store/gameStore";

const REST_OPTIONS = [
  {
    id: "sleep",
    title: "😴 Ngủ sớm",
    description: "An toàn, hồi phục ổn định",
    effects: ["+30 Energy", "-15 Stress"],
    color: "from-emerald-500/20 to-green-500/10",
    border: "border-emerald-500/40",
  },
  {
    id: "beer",
    title: "🍻 Uống bia với đồng nghiệp",
    description: "Vui lúc đó, mệt hôm sau",
    effects: ["+15 Energy", "+10 Stress", "+ Reputation"],
    color: "from-amber-500/20 to-orange-500/10",
    border: "border-amber-500/40",
  },
  {
    id: "overtime",
    title: "💻 Làm thêm ở nhà",
    description: "Có tiền nhưng đánh đổi sức khỏe",
    effects: ["+500k Salary", "+15 Stress", "+5 Energy"],
    color: "from-red-500/20 to-rose-500/10",
    border: "border-red-500/40",
  },
] as const;

const formatMoney = (value: number) => {
  return new Intl.NumberFormat("vi-VN").format(value);
};

export default function DailySummaryScreen() {
  const { currentDay, stats, dayHistory, nextDay } = useGameStore();

  const latestDay = dayHistory[dayHistory.length - 1];

  return (
    <div className="min-h-screen bg-[#060816] text-white px-4 py-6 md:px-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl"
      >
        {/* HEADER */}
        <div className="mb-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70 mb-2">
                Daily Summary
              </p>

              <h1 className="text-3xl md:text-5xl font-black">
                Kết thúc <span className="text-cyan-300">{currentDay}</span>
              </h1>

              <p className="text-white/60 mt-3 max-w-2xl">
                Bạn vẫn còn sống sót sau một ngày công sở đầy deadline, drama và
                những cuộc họp đáng lẽ chỉ cần email.
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-4">
              <p className="text-sm text-cyan-200/70 mb-1">
                Tình trạng hiện tại
              </p>

              <p className="text-2xl font-black">
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
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
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
            label="Reputation"
            value={`${stats.reputation}`}
            glow="from-cyan-500/30 to-transparent"
          />

          <StatCard
            label="Salary"
            value={`${formatMoney(stats.salary)}đ`}
            glow="from-yellow-500/30 to-transparent"
          />

          <StatCard
            label="Bug Count"
            value={`${stats.bugCount}`}
            glow="from-orange-500/30 to-transparent"
          />
        </div>

        {/* DAY PERFORMANCE */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 mb-8">
          {/* LEFT */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold">📋 Tổng kết hôm nay</h2>

              <div className="text-sm text-white/50">HR đang theo dõi 👀</div>
            </div>

            <div className="space-y-4">
              <SummaryRow
                label="Events xử lý"
                value={`${latestDay?.eventsHandled ?? 0}`}
              />

              <SummaryRow label="Tỉ lệ sống sót" value="100%" />

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
              ⚠️ Reminder: Những chỉ số hiện tại sẽ được mang sang ngày tiếp
              theo. Công sở không reset theo ngày.
            </div>
          </div>

          {/* RIGHT */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
            <h2 className="text-2xl font-bold mb-5">
              🌙 Bạn muốn làm gì tối nay?
            </h2>

            <div className="space-y-4">
              {REST_OPTIONS.map((option) => (
                <motion.button
                  key={option.id}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    nextDay(option.id as "sleep" | "beer" | "overtime")
                  }
                  className={`
                    w-full rounded-2xl border p-5 text-left
                    bg-gradient-to-br ${option.color}
                    ${option.border}
                    hover:border-white/30
                    transition-all duration-200
                  `}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold mb-1">{option.title}</h3>

                      <p className="text-sm text-white/65 mb-3">
                        {option.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {option.effects.map((effect) => (
                          <span
                            key={effect}
                            className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs"
                          >
                            {effect}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-white/40 text-xl">→</div>
                  </div>
                </motion.button>
              ))}
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
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${glow} opacity-60`}
      />

      <div className="relative">
        <p className="text-sm text-white/55 mb-2">{label}</p>

        <h3 className="text-2xl font-black break-words">{value}</h3>
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
