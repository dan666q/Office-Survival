import { motion } from "framer-motion";
import { useGameStore } from "../store/gameStore";
import { PROFESSIONS_CONFIG } from "../store/professionRegistry";
import { ACHIEVEMENTS } from "../utils/achievementChecker";

const formatMoney = (value: number) => {
  return new Intl.NumberFormat("vi-VN").format(value);
};

export default function VictoryScreen() {
  const { profession, stats, achievements, restartGame, goToScreen, startGame } =
    useGameStore();

  const profConfig = PROFESSIONS_CONFIG.find((p) => p.id === profession);

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,170,0.15),transparent_40%)]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-6xl"
      >
        {/* HEADER */}
        <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 backdrop-blur-xl p-4 sm:p-8 mb-4 sm:mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
            <div>
              <p className="uppercase tracking-[0.3em] text-emerald-200/70 text-xs sm:text-sm mb-1.5 sm:mb-3">
                Victory
              </p>

              <h1 className="text-3xl sm:text-7xl font-black mb-2 sm:mb-4">
                🏆 Sống sót thành công
              </h1>

              <p className="text-emerald-50/80 text-lg leading-relaxed max-w-3xl">
                Bạn đã sống sót qua toàn bộ tuần làm việc. Không ai biết bằng
                cách nào. Nhưng bạn đã làm được.
              </p>
            </div>

            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.5,
              }}
              className="rounded-3xl border border-emerald-300/20 bg-black/30 px-8 py-6 text-center"
            >
              <p className="text-sm text-emerald-100/70 mb-2">Trạng thái</p>

              <div className="text-4xl font-black">VẪN CÒN SỐNG</div>
            </motion.div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mb-6">
          <StatCard label="Stress" value={`${stats.stress}%`} />

          <StatCard label="Energy" value={`${stats.energy}%`} />

          <StatCard label="Salary" value={`${formatMoney(stats.salary)}đ`} />
        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          {/* LEFT */}
          <div className="order-2 lg:order-1 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-6">
            <h2 className="text-2xl font-bold mb-6">📈 Tổng kết sự nghiệp</h2>

            <div className="space-y-4">
              <SummaryRow
                label="Nghề nghiệp"
                value={
                  profConfig
                    ? `${profConfig.emoji} ${profConfig.name}`
                    : "Vô danh"
                }
              />

              <SummaryRow label="Tuần làm việc" value="Hoàn thành" />

              <SummaryRow
                label="Tình trạng tinh thần"
                value={
                  stats.stress >= 80
                    ? "💀 Sống nhưng không ổn"
                    : stats.stress >= 50
                    ? "😵 Hơi mất nhân tính"
                    : "😌 Tạm thời ổn"
                }
              />

              <SummaryRow
                label="Năng lượng còn lại"
                value={
                  stats.energy <= 20
                    ? "😴 Kiệt sức"
                    : stats.energy <= 50
                    ? "😵 Đuối dần"
                    : "⚡ Vẫn chiến được"
                }
              />
            </div>

            <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-50/90">
              “Cuối cùng thì... tới Thứ Hai tiếp theo.”
            </div>
          </div>

          {/* RIGHT */}
          <div className="order-1 lg:order-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-6 flex flex-col">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-5">🏅 Achievements</h2>

            <div className="space-y-3 flex-1 overflow-auto max-h-[400px] pr-1">
              {achievements.length > 0 ? (
                achievements.map((id) => {
                  const found = ACHIEVEMENTS.find((a) => a.id === id);
                  if (!found) return null;

                  const rewardsText = found.rewards
                    ? found.rewards
                        .map((r) => {
                          const name =
                            r.stat === "salary"
                              ? "Lương"
                              : r.stat === "stress"
                              ? "Stress"
                              : "Energy";
                          const val =
                            r.stat === "salary"
                              ? `${r.value > 0 ? "+" : ""}${(
                                  r.value / 1000
                                ).toFixed(0)}k`
                              : `${r.value > 0 ? "+" : ""}${r.value}%`;
                          return `${val} ${name}`;
                        })
                        .join(", ")
                    : "";

                  return (
                    <div
                      key={id}
                      className="
                        rounded-2xl border border-emerald-400/20
                        bg-emerald-500/10
                        px-4 py-3
                      "
                    >
                      <div className="font-bold flex items-center gap-1.5">
                        <span className="text-lg">{found.emoji}</span>
                        <span>{found.label}</span>
                      </div>
                      <p className="text-xs text-emerald-200/70 mt-1">
                        {found.description}
                      </p>
                      {rewardsText && (
                        <div className="text-[10px] font-extrabold text-emerald-300 bg-emerald-500/20 border border-emerald-500/20 px-2 py-0.5 rounded-full inline-block mt-2">
                          🎁 Nhận: {rewardsText}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="rounded-2xl border border-dashed border-white/10 p-5 text-white/50 text-sm">
                  Chưa unlock achievement nào 😭
                </div>
              )}
            </div>

            <div className="mt-6 space-y-4">
              <ActionButton
                title="🔄 Chơi lại nghề này"
                onClick={() => startGame(profession!)}
              />

              <ActionButton
                title="💼 Đổi nghề"
                onClick={() => {
                  restartGame();
                  goToScreen("profession");
                }}
              />
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
    <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-5">
      <p className="text-xs sm:text-sm text-white/55 mb-1 sm:mb-2">{label}</p>

      <h3 className="text-base sm:text-2xl font-black break-words">{value}</h3>
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

interface ActionButtonProps {
  title: string;
  onClick: () => void;
}

function ActionButton({ title, onClick }: ActionButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="
        w-full rounded-2xl border border-white/10
        bg-white/5 px-5 py-4
        font-semibold
        hover:border-emerald-400/30
        hover:bg-emerald-500/10
        transition-all duration-200
      "
    >
      {title}
    </motion.button>
  );
}
