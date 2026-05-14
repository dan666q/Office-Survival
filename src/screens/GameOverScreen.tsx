// src/screens/GameOverScreen.tsx

import { motion } from "framer-motion";
import { useGameStore } from "../store/gameStore";

const formatMoney = (value: number) => {
  return new Intl.NumberFormat("vi-VN").format(value);
};

export default function GameOverScreen() {
  const {
    profession,
    stats,
    dayHistory,
    gameOverReason,
    restartGame,
    goToScreen,
  } = useGameStore();

  const survivedDays = dayHistory.length;

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-4 py-8 overflow-hidden relative">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,0,0,0.15),transparent_45%)]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="relative z-10 w-full max-w-5xl"
      >
        {/* HEADER */}
        <div className="rounded-3xl border border-red-500/20 bg-red-500/10 backdrop-blur-xl p-8 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="uppercase tracking-[0.3em] text-red-300/70 text-sm mb-3">
                Game Over
              </p>

              <h1 className="text-5xl md:text-7xl font-black mb-4">
                💀 Burnout
              </h1>

              <p className="text-red-100/80 max-w-2xl text-lg leading-relaxed">
                {gameOverReason ?? "Bạn đã bị công sở nuốt chửng."}
              </p>
            </div>

            <motion.div
              animate={{
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="rounded-3xl border border-red-400/20 bg-black/30 px-8 py-6 text-center"
            >
              <p className="text-sm text-red-200/70 mb-2">
                Trạng thái hiện tại
              </p>

              <div className="text-4xl font-black">KIỆT SỨC</div>
            </motion.div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <StatCard label="Stress" value={`${stats.stress}%`} />

          <StatCard label="Energy" value={`${stats.energy}%`} />

          <StatCard label="Reputation" value={`${stats.reputation}`} />

          <StatCard label="Salary" value={`${formatMoney(stats.salary)}đ`} />

          <StatCard label="Bug Count" value={`${stats.bugCount}`} />
        </div>

        {/* SUMMARY */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          {/* LEFT */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
            <h2 className="text-2xl font-bold mb-6">📋 Báo cáo tử trận</h2>

            <div className="space-y-4">
              <SummaryRow
                label="Nghề nghiệp"
                value={
                  profession === "it"
                    ? "💻 IT Dev"
                    : profession === "seo_bds"
                    ? "🏠 Sales BĐS"
                    : "📊 Kế Toán"
                }
              />

              <SummaryRow
                label="Số ngày sống sót"
                value={`${survivedDays}/6`}
              />

              <SummaryRow
                label="Tình trạng tinh thần"
                value={
                  stats.stress >= 100
                    ? "💀 Burnout hoàn toàn"
                    : "😴 Hết năng lượng"
                }
              />

              <SummaryRow
                label="Đánh giá HR"
                value={
                  stats.reputation >= 70
                    ? "Nhân viên tận tụy"
                    : stats.reputation >= 40
                    ? "Cần cải thiện thái độ"
                    : "Khó hòa nhập tập thể"
                }
              />
            </div>

            <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-100/90">
              “Bạn không thất bại. Bạn chỉ bị meeting lúc 5:30 PM.”
            </div>
          </div>

          {/* RIGHT */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 flex flex-col">
            <h2 className="text-2xl font-bold mb-6">🔁 Tiếp theo?</h2>

            <div className="space-y-4 flex-1">
              <ActionCard
                title="🔄 Chơi lại từ đầu"
                description="Quay lại Thứ Hai Kinh Hoàng."
                onClick={restartGame}
              />

              <ActionCard
                title="💼 Đổi nghề nghiệp"
                description="Biết đâu nghề khác còn tệ hơn."
                onClick={() => goToScreen("profession")}
              />
            </div>

            <div className="mt-6 text-xs text-white/40 text-center">
              SỐNG SÓT CÔNG SỞ™ — Corporate suffering simulator
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
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <p className="text-sm text-white/55 mb-2">{label}</p>

      <h3 className="text-2xl font-black break-words">{value}</h3>
    </div>
  );
}

interface SummaryRowProps {
  label: string;
  value: string;
}

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-4 gap-4">
      <span className="text-white/60">{label}</span>

      <span className="font-semibold text-right">{value}</span>
    </div>
  );
}

interface ActionCardProps {
  title: string;
  description: string;
  onClick: () => void;
}

function ActionCard({ title, description, onClick }: ActionCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="
        w-full rounded-2xl border border-white/10
        bg-white/5 p-5 text-left
        hover:border-red-400/30
        hover:bg-red-500/10
        transition-all duration-200
      "
    >
      <h3 className="font-bold text-lg mb-2">{title}</h3>

      <p className="text-sm text-white/60">{description}</p>
    </motion.button>
  );
}
