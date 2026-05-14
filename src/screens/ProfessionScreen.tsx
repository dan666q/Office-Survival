// src/screens/ProfessionScreen.tsx

import { PROFESSIONS_CONFIG } from "../data/professions.config";
import { useGameStore } from "../store/gameStore";

export default function ProfessionScreen() {
  const startGame = useGameStore((s) => s.startGame);
  const goToScreen = useGameStore((s) => s.goToScreen);

  return (
    <div className="min-h-screen bg-[#0f1117] text-white relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-cyan-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-purple-500/20 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 md:py-16">
        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => goToScreen("start")}
            className="
              mb-6
              text-sm
              text-zinc-400
              hover:text-white
              transition-colors
            "
          >
            ← Quay lại
          </button>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300">
              🧠 Chọn class nhân vật
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight">
              Chọn nghề nghiệp
            </h1>

            <p className="text-zinc-400 max-w-2xl leading-relaxed">
              Mỗi nghề có độ khó, kiểu đau khổ và phương thức burnout riêng. Hãy
              chọn con đường mà bạn muốn hối hận.
            </p>
          </div>
        </div>

        {/* Profession cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
              "
            >
              {/* top glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-cyan-400/5" />

              <div className="p-6">
                {/* Emoji */}
                <div className="text-5xl mb-5">{job.emoji}</div>

                {/* Title */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-2xl font-bold">{job.name}</h2>

                    <span
                      className={`
                        text-xs
                        px-3 py-1 rounded-full border
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

                  <p className="text-sm text-zinc-400 leading-relaxed min-h-[60px]">
                    {job.tagline}
                  </p>
                </div>

                {/* Enemy */}
                <div className="mt-6">
                  <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
                    Kẻ thù chính
                  </p>

                  <div className="rounded-2xl bg-[#0f1117] border border-white/5 p-4 text-sm text-zinc-300">
                    {job.enemy}
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-6 space-y-3">
                  <p className="text-xs uppercase tracking-wider text-zinc-500">
                    Chỉ số khởi đầu
                  </p>

                  <div className="space-y-3">
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

                    {/* Reputation */}
                    <StatBar
                      label="Reputation"
                      value={job.startingStats.reputation}
                      color="bg-cyan-400"
                    />
                  </div>
                </div>

                {/* Buffs */}
                <div className="mt-6">
                  <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
                    Buff đặc trưng
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {job.uniqueBuffIds.map((buff) => (
                      <div
                        key={buff}
                        className="
                          px-3 py-2
                          rounded-xl
                          bg-white/5
                          border border-white/5
                          text-xs
                          text-zinc-300
                        "
                      >
                        {buff.replaceAll("_", " ")}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => startGame(job.id)}
                  className="
                    mt-8
                    w-full
                    h-14
                    rounded-2xl
                    bg-cyan-400
                    hover:bg-cyan-300
                    text-black
                    font-bold
                    transition-all
                    shadow-lg
                    shadow-cyan-500/20
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
      <div className="flex items-center justify-between mb-1">
        <p className="text-sm text-zinc-300">{label}</p>

        <p className="text-sm text-zinc-500">{value}</p>
      </div>

      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
