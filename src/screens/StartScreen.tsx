// src/screens/StartScreen.tsx

import { motion } from "framer-motion";
import { useGameStore } from "../store/gameStore";

export default function StartScreen() {
  const goToScreen = useGameStore((s) => s.goToScreen);

  return (
    <div className="min-h-screen bg-[#0f1117] text-white overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-cyan-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-[-150px] right-[-100px] w-[350px] h-[350px] bg-purple-500/20 blur-3xl rounded-full" />

      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="
            w-full
            max-w-2xl
            bg-[#171b26]
            border border-white/10
            rounded-3xl
            shadow-2xl
            p-6
            md:p-10
            backdrop-blur-xl
          "
        >
          {/* Top badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-xs mb-6">
            ⚠️ Corporate Survival Simulator
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
              SỐNG SÓT
              <br />
              <span className="text-cyan-400">CÔNG SỞ</span>
            </h1>

            <p className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-xl">
              Một game mô phỏng nơi làm việc đầy deadline, drama nội bộ, bug
              production và những cuộc họp đáng lẽ chỉ cần email.
            </p>
          </div>

          {/* Fake dashboard */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-[#0f1117] border border-white/5 rounded-2xl p-4">
              <p className="text-zinc-500 text-xs">Stress</p>
              <p className="text-red-400 text-2xl font-bold">87%</p>
            </div>

            <div className="bg-[#0f1117] border border-white/5 rounded-2xl p-4">
              <p className="text-zinc-500 text-xs">Energy</p>
              <p className="text-yellow-300 text-2xl font-bold">24%</p>
            </div>

            <div className="bg-[#0f1117] border border-white/5 rounded-2xl p-4">
              <p className="text-zinc-500 text-xs">Meetings</p>
              <p className="text-purple-400 text-2xl font-bold">12</p>
            </div>

            <div className="bg-[#0f1117] border border-white/5 rounded-2xl p-4">
              <p className="text-zinc-500 text-xs">Bugs</p>
              <p className="text-cyan-400 text-2xl font-bold">34</p>
            </div>
          </div>

          {/* Quote */}
          <div className="mt-8 border border-yellow-500/10 bg-yellow-500/5 rounded-2xl p-4">
            <p className="text-sm text-yellow-100/90 italic">
              “Em check giúp anh cái này gấp nha.”
            </p>

            <p className="text-xs text-yellow-500 mt-2">
              — tin nhắn khiến cuộc đời bạn rẽ sang hướng khác
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-col md:flex-row gap-4">
            <button
              onClick={() => goToScreen("profession")}
              className="
                flex-1
                h-14
                rounded-2xl
                bg-cyan-400
                hover:bg-cyan-300
                transition-all
                text-black
                font-bold
                text-lg
                shadow-lg
                shadow-cyan-500/20
              "
            >
              Bắt đầu tuần làm việc 💀
            </button>

            <button
              className="
                h-14
                px-6
                rounded-2xl
                bg-white/5
                hover:bg-white/10
                border border-white/10
                transition-all
                text-zinc-300
                font-medium
              "
            >
              Thành tích
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 flex items-center justify-between text-xs text-zinc-500">
            <p>Phiên bản 0.1 - nào pro hơn thì có update </p>
            <p>by @dan666q</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
