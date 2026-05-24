// src/screens/ProfessionScreen.tsx

import { PROFESSIONS_CONFIG } from "../store/professionRegistry";
import { useGameStore } from "../store/gameStore";
import { soundManager } from "../utils/soundManager";

export default function ProfessionScreen() {
  const startGame = useGameStore((s) => s.startGame);
  const goToScreen = useGameStore((s) => s.goToScreen);

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

        {/* Profession cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {PROFESSIONS_CONFIG.map((job) => (
            <div
              key={job.id}
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
                    startGame(job.id);
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
          ))}
        </div>
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
