import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "../store/gameStore";
import { soundManager } from "../utils/soundManager";
import { PROFESSIONS_CONFIG } from "../store/professionRegistry";
import SystemSettingsPanel from "../components/layout/SystemSettingsPanel";

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
    startGame,
  } = useGameStore();

  const profConfig = PROFESSIONS_CONFIG.find((p) => p.id === profession);
  const [isSystemMenuOpen, setIsSystemMenuOpen] = useState(false);

  useEffect(() => {
    soundManager.playBurnout();
  }, []);

  const survivedDays = dayHistory.length;

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-4 py-8 overflow-hidden relative">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,0,0,0.15),transparent_45%)]" />

      {/* Floating Settings button on top-right */}
      <button
        onClick={() => {
          soundManager.playClick();
          setIsSystemMenuOpen(true);
        }}
        className="absolute top-4 right-4 z-40 flex items-center gap-1.5 bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 rounded-full px-3 py-1.5 text-xs text-zinc-400 hover:text-white font-bold uppercase tracking-wide cursor-pointer transition-all active:scale-95 shadow-lg backdrop-blur-md select-none"
        title="Cài đặt hệ thống"
      >
        <span>⚙️</span>
        <span>Hệ thống</span>
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="relative z-10 w-full max-w-5xl"
      >
        {/* HEADER */}
        <div className="rounded-3xl border border-red-500/20 bg-red-500/10 backdrop-blur-xl p-4 sm:p-8 mb-4 sm:mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
            <div>
              <p className="uppercase tracking-[0.3em] text-red-300/70 text-xs sm:text-sm mb-1.5 sm:mb-3">
                Game Over
              </p>

              <h1 className="text-3xl sm:text-7xl font-black mb-2 sm:mb-4">
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

        {/* Sleek Topbar-style Status Bar */}
        <div className="mb-3 sm:mb-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-3 py-2.5 sm:px-6 flex flex-col md:flex-row md:items-center gap-2.5 md:gap-4 justify-between">
          {/* Title and Mobile Salary Row */}
          <div className="flex items-center justify-between w-full md:w-auto md:justify-start gap-3 shrink-0">
            <span className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-widest font-black shrink-0">
              📊 Chỉ số cuối cùng:
            </span>
            <div className="w-px h-4 bg-zinc-700 hidden md:block" />
            
            {/* Inline Salary on Mobile */}
            <div className="flex items-center gap-1.5 md:hidden">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">💰 Lương:</span>
              <span className="text-xs font-black text-yellow-300">
                {formatMoney(stats.salary)}đ
              </span>
            </div>
          </div>

          {/* Stats Indicators Grid on Mobile */}
          <div className="grid grid-cols-2 md:flex items-center gap-3 md:gap-8 w-full md:w-auto md:flex-[2]">
            {/* Stress Indicator */}
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-wide shrink-0 font-bold">
                😤 Stress
              </span>
              <div className="flex-1 h-1.5 sm:h-2 rounded-full bg-zinc-900 overflow-hidden border border-zinc-800">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    stats.stress >= 80 ? "bg-red-500 animate-pulse" : "bg-red-400"
                  }`}
                  style={{ width: `${stats.stress}%` }}
                />
              </div>
              <span className={`text-[10px] font-black shrink-0 w-6 text-right ${stats.stress >= 80 ? "text-red-400 animate-pulse" : "text-zinc-300"}`}>
                {stats.stress}%
              </span>
            </div>

            {/* Energy Indicator */}
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-wide shrink-0 font-bold">
                ⚡ Energy
              </span>
              <div className="flex-1 h-1.5 sm:h-2 rounded-full bg-zinc-900 overflow-hidden border border-zinc-800">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    stats.energy <= 20 ? "bg-blue-500 animate-pulse" : "bg-emerald-400"
                  }`}
                  style={{ width: `${stats.energy}%` }}
                />
              </div>
              <span className={`text-[10px] font-black shrink-0 w-6 text-right ${stats.energy <= 20 ? "text-blue-400 animate-pulse" : "text-zinc-300"}`}>
                {stats.energy}%
              </span>
            </div>

            {/* Desktop Salary Indicator */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wide font-bold">
                Tổng lương
              </span>
              <span className={`text-sm sm:text-base font-black ${stats.salary <= 0 ? "text-red-400" : "text-yellow-300"}`}>
                {formatMoney(stats.salary)}đ
              </span>
            </div>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          {/* LEFT */}
          <div className="order-2 lg:order-1 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-6">
            <h2 className="text-2xl font-bold mb-6">📋 Báo cáo tử trận</h2>

            <div className="space-y-4">
              <SummaryRow
                label="Nghề nghiệp"
                value={
                  profConfig
                    ? `${profConfig.emoji} ${profConfig.name}`
                    : "Vô danh"
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
                label="Khả năng quay lại công ty"
                value={
                  stats.energy <= 10
                    ? "Không thể hồi phục"
                    : "Cần nghỉ phép dài hạn"
                }
              />
            </div>

            <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-100/90">
              “Bạn không thất bại. Bạn chỉ bị meeting lúc 5:30 PM.”
            </div>
          </div>

          {/* RIGHT */}
          <div className="order-1 lg:order-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-6 flex flex-col">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-6">🔁 Tiếp theo?</h2>

            <div className="space-y-4 flex-1">
              <ActionCard
                title="🔄 Chơi lại nghề này"
                description="Chơi lại ngay lập tức với nghề hiện tại."
                onClick={() => startGame(profession!)}
              />

              <ActionCard
                title="💼 Đổi nghề nghiệp"
                description="Trở lại màn hình chọn nghề để đổi gió."
                onClick={() => {
                  restartGame();
                  goToScreen("profession");
                }}
              />
            </div>

            <div className="mt-6 text-xs text-white/40 text-center">
              SỐNG SÓT CÔNG SỞ™ — Corporate suffering simulator
            </div>
          </div>
        </div>
      </motion.div>

      {/* Settings Modal (Desktop & Mobile) */}
      <AnimatePresence>
        {isSystemMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSystemMenuOpen(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 select-none"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#171b26] border border-white/10 w-full max-w-md rounded-3xl p-6 shadow-2xl backdrop-blur-xl relative text-left"
            >
              <SystemSettingsPanel onClose={() => setIsSystemMenuOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
