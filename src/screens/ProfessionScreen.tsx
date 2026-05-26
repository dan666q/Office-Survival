// src/screens/ProfessionScreen.tsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROFESSIONS_CONFIG } from "../store/professionRegistry";
import { useGameStore } from "../store/gameStore";
import { soundManager } from "../utils/soundManager";
import { DIFFICULTY_CONFIGS } from "../data";

export default function ProfessionScreen() {
  const startGame = useGameStore((s) => s.startGame);
  const goToScreen = useGameStore((s) => s.goToScreen);
  const [activeJobId, setActiveJobId] = useState(PROFESSIONS_CONFIG[0]?.id || "");
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [selectedDifficultyTab, setSelectedDifficultyTab] = useState<string>("junior");

  const handleSelectJob = (job: any) => {
    setSelectedDifficultyTab("junior");
    setSelectedJob(job);
  };


  return (
    <div className="min-h-screen bg-[#0f1117] text-white relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-cyan-500/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-purple-500/20 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 py-6 md:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => {
              soundManager.playClick();
              goToScreen("start");
            }}
            className="
              mb-4 sm:mb-6
              text-xs sm:text-sm
              text-zinc-400
              hover:text-white
              transition-colors
              flex items-center gap-1
            "
          >
            ← Quay lại
          </button>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs text-zinc-300">
              🧠 Chọn class nhân vật
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Chọn nghề nghiệp
            </h1>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Mỗi nghề có độ khó, kiểu đau khổ và phương thức burnout riêng. Hãy
              chọn con đường mà bạn muốn hối hận.
            </p>
          </div>
        </div>

        {/* Mobile Tabs Selector */}
        <div className="flex md:hidden gap-2 overflow-x-auto pb-4 mb-4 no-scrollbar scroll-smooth snap-x snap-mandatory">
          {PROFESSIONS_CONFIG.map((job) => {
            const isActive = activeJobId === job.id;
            return (
              <button
                key={job.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveJobId(job.id);
                }}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-2xl border shrink-0 transition-all duration-200 snap-start active:scale-95
                  ${
                    isActive
                      ? "bg-cyan-500/10 border-cyan-400 text-cyan-400 font-black shadow-lg shadow-cyan-500/10"
                      : "bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10"
                  }
                `}
              >
                <span className="text-lg">{job.emoji}</span>
                <span className="text-xs font-bold tracking-wide">{job.name}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile active card view with transitions */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            {PROFESSIONS_CONFIG.filter((j) => j.id === activeJobId).map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
              >
                <ProfessionCard job={job} onSelectJob={handleSelectJob} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Desktop grid layout showing all cards */}
        <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {PROFESSIONS_CONFIG.map((job) => (
            <ProfessionCard key={job.id} job={job} onSelectJob={handleSelectJob} />
          ))}
        </div>
      </div>


      {/* Glassmorphic Difficulty Selection Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => { soundManager.playClick(); setSelectedJob(null); }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              onClick={(e) => e.stopPropagation()}
              className="
                w-full max-w-3xl
                bg-[#171b26]
                border border-white/10
                rounded-3xl
                shadow-2xl
                p-4 sm:p-7
                backdrop-blur-xl
                relative
                my-4 sm:my-8
              "
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  soundManager.playClick();
                  setSelectedJob(null);
                }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white flex items-center justify-center text-sm transition-colors active:scale-90"
              >
                ✕
              </button>

              {/* Modal Title */}
              <div className="text-center mb-4 sm:mb-6 pr-6 pl-6">
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-cyan-400">Độ Khó / Cấp Bậc</span>
                <h2 className="text-lg sm:text-3xl font-black mt-0.5 sm:mt-1">Chọn cấp bậc của bạn</h2>
                <p className="text-[10px] sm:text-xs text-zinc-400 mt-1 sm:mt-2 max-w-xl mx-auto leading-relaxed">
                  Gia nhập văn phòng dưới tư cách nghề <span className="text-cyan-300 font-bold">{selectedJob.emoji} {selectedJob.name}</span> ở cấp bậc nào? Hãy chọn mức độ chịu đựng.
                </p>
              </div>

              {/* Helper variables and helper functions */}
              {(() => {
                const getTimerMultiplierText = (mult: number) => {
                  if (mult > 1.0) return `+${Math.round((mult - 1) * 100)}% thời gian`;
                  if (mult < 1.0) return `-${Math.round((1 - mult) * 100)}% thời gian`;
                  return "Thời gian đọc gốc";
                };

                const getStressText = (mult: number) => {
                  if (mult < 1.0) return `Giảm ${Math.round((1 - mult) * 100)}% stress nhận`;
                  if (mult > 1.0) return `Tăng ${Math.round((mult - 1) * 100)}% stress nhận`;
                  return "Stress tiêu chuẩn";
                };

                const getSalaryOffset = (offset: number) => {
                  if (offset > 0) return `+${offset / 1000}kđ lương ban đầu`;
                  if (offset < 0) return `Nợ -${Math.abs(offset) / 1000}kđ khởi nghiệp`;
                  return "Lương cơ bản gốc";
                };

                const getBuffCostText = (mult: number) => {
                  if (mult < 1.0) return `Căn-tin rẻ hơn ${Math.round((1 - mult) * 100)}%`;
                  if (mult > 1.0) return `Căn-tin đắt hơn ${Math.round((mult - 1) * 100)}%`;
                  return "Giá Căn-tin niêm yết";
                };

                return (
                  <>
                    {/* Mobile View: Segmented Tab Selector + Active Detail Card (Fits Screen Perfectly, NO SCROLL) */}
                    <div className="flex md:hidden flex-col gap-3.5">
                      {/* Segmented Control / Tabs */}
                      <div className="flex bg-[#0f1117]/80 p-0.5 rounded-xl border border-white/5">
                        {DIFFICULTY_CONFIGS.map((level) => {
                          const isActive = selectedDifficultyTab === level.id;
                          return (
                            <button
                              key={level.id}
                              onClick={() => {
                                soundManager.playClick();
                                setSelectedDifficultyTab(level.id);
                              }}
                              className={`
                                flex-1 flex flex-col items-center justify-center py-1.5 rounded-lg transition-all duration-200
                                ${
                                  isActive
                                    ? "bg-cyan-500/10 text-cyan-400 font-bold shadow-md border border-cyan-500/15"
                                    : "text-zinc-500 hover:text-zinc-300 border border-transparent"
                                }
                              `}
                            >
                              <span className="text-base">{level.emoji}</span>
                              <span className="text-[8px] font-bold tracking-tight whitespace-nowrap mt-0.5">{level.name.split(" ")[0]}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Active Level Detail Content Card */}
                      <div className="min-h-[170px]">
                        {DIFFICULTY_CONFIGS.filter((l) => l.id === selectedDifficultyTab).map((level) => (
                          <motion.div
                            key={level.id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.15 }}
                            className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-4 flex flex-col justify-between h-full"
                          >
                            <div>
                              {/* Emoji & Name */}
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className="text-lg">{level.emoji}</span>
                                <h3 className="font-extrabold text-xs text-cyan-300">
                                  {level.title}
                                </h3>
                              </div>

                              {/* Description */}
                              <p className="text-[10px] text-zinc-300 leading-relaxed mb-3 font-medium">
                                {level.description}
                              </p>

                              {/* Modifiers Badges grid */}
                              <div className="grid grid-cols-2 gap-1.5 mb-4">
                                <div className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-900/60 border border-white/5">
                                  <span className="text-[10px]">⏳</span>
                                  <span className="text-[8px] font-bold text-zinc-300 truncate">
                                    {getTimerMultiplierText(level.timerMultiplier)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-900/60 border border-white/5">
                                  <span className="text-[10px]">😤</span>
                                  <span className="text-[8px] font-bold text-zinc-300 truncate">
                                    {getStressText(level.stressMultiplier)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-900/60 border border-white/5">
                                  <span className="text-[10px]">💰</span>
                                  <span className="text-[8px] font-bold text-zinc-300 truncate">
                                    {getSalaryOffset(level.startingSalaryOffset)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-900/60 border border-white/5">
                                  <span className="text-[10px]">🍱</span>
                                  <span className="text-[8px] font-bold text-zinc-300 truncate">
                                    {getBuffCostText(level.buffCostMultiplier)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Select Button */}
                            <button
                              onClick={() => {
                                soundManager.playClick();
                                startGame(selectedJob.id, level.id);
                                setSelectedJob(null);
                              }}
                              className="
                                w-full h-10 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-[10px] uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-1 shrink-0
                              "
                            >
                              <span>Vào vai {level.name} ngay</span>
                              <span>➔</span>
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Desktop View: Grid layout showing all cards at once (hidden on mobile) */}
                    <div className="hidden md:grid grid-cols-2 gap-4">
                      {DIFFICULTY_CONFIGS.map((level) => (
                        <div
                          key={level.id}
                          onClick={() => {
                            soundManager.playClick();
                            startGame(selectedJob.id, level.id);
                            setSelectedJob(null);
                          }}
                          className="
                            group/item
                            relative
                            rounded-2xl
                            border border-white/5
                            bg-[#0f1117]/60
                            hover:bg-cyan-500/5
                            hover:border-cyan-400/30
                            p-4.5 sm:p-5
                            transition-all duration-200
                            cursor-pointer
                            flex flex-col justify-between
                            h-full
                          "
                        >
                          <div>
                            {/* Emoji & Name */}
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="text-xl">{level.emoji}</span>
                              <h3 className="font-extrabold text-sm sm:text-base group-hover/item:text-cyan-300 transition-colors">
                                {level.name}
                              </h3>
                            </div>

                            {/* Description */}
                            <p className="text-[11px] text-zinc-400 leading-normal mb-3 font-medium min-h-[32px]">
                              {level.description}
                            </p>

                            {/* Badges/Modifiers list */}
                            <div className="flex flex-wrap gap-1 mb-4">
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border bg-zinc-800 border-zinc-700 text-zinc-300`}>
                                ⏳ {getTimerMultiplierText(level.timerMultiplier)}
                              </span>
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border bg-zinc-800 border-zinc-700 text-zinc-300`}>
                                😤 {getStressText(level.stressMultiplier)}
                              </span>
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border bg-zinc-800 border-zinc-700 text-zinc-300`}>
                                💰 {getSalaryOffset(level.startingSalaryOffset)}
                              </span>
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border bg-zinc-800 border-zinc-700 text-zinc-300`}>
                                🍱 {getBuffCostText(level.buffCostMultiplier)}
                              </span>
                            </div>
                          </div>

                          {/* Select Action */}
                          <div className="w-full text-center py-2 rounded-xl bg-white/5 border border-white/5 font-extrabold text-[10px] group-hover/item:bg-cyan-400 group-hover/item:text-black group-hover/item:border-cyan-400 transition-all duration-200">
                            Vào vai {level.name} ngay ➔
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


interface ProfessionCardProps {
  job: typeof PROFESSIONS_CONFIG[number];
  onSelectJob: (job: any) => void;
}

function ProfessionCard({ job, onSelectJob }: ProfessionCardProps) {
  return (
    <div
      className="
        group
        relative
        rounded-3xl
        border border-white/10
        bg-[#171b26]
        hover:border-cyan-400/40
        transition-all
        overflow-hidden
        flex flex-col
        h-full
      "
    >
      {/* top glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-cyan-400/5" />

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {/* Emoji */}
        <div className="text-4xl sm:text-5xl mb-4">{job.emoji}</div>

        {/* Title */}
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl sm:text-2xl font-bold">{job.name}</h2>

            <span
              className={`
                text-[10px]
                px-2.5 py-0.5 rounded-full border font-bold
                ${
                  job.difficulty === "Dễ"
                    ? "bg-green-500/10 text-green-300 border-green-500/20"
                    : job.difficulty === "Trung bình"
                    ? "bg-yellow-500/10 text-yellow-300 border-yellow-500/20"
                    : "bg-red-500/10 text-red-300 border-red-500/20"
                }
              `}
            >
              {job.difficulty}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed min-h-[48px] sm:min-h-[60px]">
            {job.tagline}
          </p>
        </div>

        {/* Enemy */}
        <div className="mt-4">
          <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5">
            Kẻ thù chính
          </p>

          <div className="rounded-xl bg-[#0f1117] border border-white/5 p-3 text-xs sm:text-sm text-zinc-300 min-h-[56px]">
            {job.enemy}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 space-y-2.5">
          <p className="text-[10px] uppercase tracking-wider text-zinc-500">
            Chỉ số khởi đầu
          </p>

          <div className="space-y-2.5">
            {/* Stress */}
            <StatBar
              label="Stress"
              value={job.startingStats.stress}
              color="bg-red-400"
            />

            {/* Energy */}
            <StatBar
              label="Energy"
              value={job.startingStats.energy}
              color="bg-yellow-300"
            />

            {/* Salary */}
            <StatBar
              label="Salary"
              value={Math.min(
                Math.floor(job.startingStats.salary / 100000),
                100
              )}
              color="bg-emerald-400"
            />
          </div>
        </div>

        {/* Buffs */}
        <div className="mt-4">
          <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5">
            Buff đặc trưng
          </p>

          <div className="flex flex-wrap gap-1.5">
            {job.uniqueBuffIds.map((buff) => (
              <div
                key={buff}
                className="
                  px-2 py-1
                  rounded-lg
                  bg-white/5
                  border border-white/5
                  text-[10px] sm:text-xs
                  text-zinc-400
                "
              >
                {buff.replaceAll("_", " ")}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => {
            soundManager.playClick();
            onSelectJob(job);
          }}
          className="
            mt-6
            w-full
            h-12 sm:h-14
            rounded-2xl
            bg-cyan-400
            hover:bg-cyan-300
            text-black
            font-bold
            text-sm sm:text-base
            transition-all
            shadow-lg
            shadow-cyan-500/20
            active:scale-95
          "
        >
          Chọn nghề này →
        </button>
      </div>
    </div>
  );
}

interface StatBarProps {
  label: string;
  value: number;
  color: string;
}

function StatBar({ label, value, color }: StatBarProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-0.5 sm:mb-1">
        <p className="text-xs sm:text-sm text-zinc-300">{label}</p>

        <p className="text-xs sm:text-sm text-zinc-500">{value}</p>
      </div>

      <div className="h-1.5 sm:h-2 rounded-full bg-white/5 overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    </div>
  );
}

