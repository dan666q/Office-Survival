// src/screens/StartScreen.tsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "../store/gameStore";
import { soundManager } from "../utils/soundManager";
import InteractiveGuide from "../components/ui/InteractiveGuide";

export default function StartScreen() {
  const goToScreen = useGameStore((s) => s.goToScreen);
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div className="min-h-screen bg-[#0f1117] text-white relative flex items-center justify-center py-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-cyan-500/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-[-150px] right-[-100px] w-[350px] h-[350px] bg-purple-500/20 blur-3xl rounded-full pointer-events-none" />

      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="
            w-full
            bg-[#171b26]
            border border-white/10
            rounded-3xl
            shadow-2xl
            p-5
            md:p-10
            backdrop-blur-xl
          "
        >
          {/* Top badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-[10px] sm:text-xs mb-6">
            ⚠️ Corporate Survival Simulator
          </div>

          {/* Title */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none">
              SỐNG SÓT
              <br />
              <span className="text-cyan-400">CÔNG SỞ</span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-zinc-400 leading-relaxed max-w-xl">
              Một game mô phỏng nơi làm việc đầy deadline, drama nội bộ, bug
              production và những cuộc họp đáng lẽ chỉ cần email.
            </p>
          </div>

          {/* Fake dashboard */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 text-center">
            <div className="bg-[#0f1117] border border-white/5 rounded-2xl p-3 sm:p-4">
              <p className="text-zinc-500 text-[10px] sm:text-xs flex items-center gap-1 justify-center">😤 Stress</p>
              <p className="text-red-400 text-xl sm:text-2xl font-bold">87%</p>
              <p className="text-[9px] text-red-500/80 mt-0.5 font-medium">Sắp tăng xông</p>
            </div>

            <div className="bg-[#0f1117] border border-white/5 rounded-2xl p-3 sm:p-4">
              <p className="text-zinc-500 text-[10px] sm:text-xs flex items-center gap-1 justify-center">⚡ Energy</p>
              <p className="text-yellow-300 text-xl sm:text-2xl font-bold">24%</p>
              <p className="text-[9px] text-yellow-500/80 mt-0.5 font-medium">Sắp sập nguồn</p>
            </div>

            <div className="bg-[#0f1117] border border-white/5 rounded-2xl p-3 sm:p-4">
              <p className="text-zinc-500 text-[10px] sm:text-xs flex items-center gap-1 justify-center">💰 Ví Lương</p>
              <p className="text-emerald-400 text-xl sm:text-2xl font-bold">500kđ</p>
              <p className="text-[9px] text-emerald-500/80 mt-0.5 font-medium">Khởi nghiệp</p>
            </div>

            <div className="bg-[#0f1117] border border-white/5 rounded-2xl p-3 sm:p-4">
              <p className="text-zinc-500 text-[10px] sm:text-xs flex items-center gap-1 justify-center">🎭 Drama</p>
              <p className="text-purple-400 text-xl sm:text-2xl font-bold">∞ Vô cực</p>
              <p className="text-[9px] text-purple-500/80 mt-0.5 font-medium font-semibold">Hít mỗi ngày</p>
            </div>
          </div>

          {/* Quote */}
          <div className="mt-6 border border-yellow-500/10 bg-yellow-500/5 rounded-2xl p-3.5 sm:p-4">
            <p className="text-xs sm:text-sm text-yellow-100/90 italic leading-relaxed">
              "Em check giúp anh cái này gấp nha."
            </p>

            <p className="text-[10px] sm:text-xs text-yellow-500 mt-1.5 font-medium">
              — tin nhắn khiến cuộc đời bạn rẽ sang hướng khác
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                soundManager.playClick();
                goToScreen("profession");
              }}
              className="
                flex-1
                h-12 sm:h-14
                rounded-2xl
                bg-cyan-400
                hover:bg-cyan-300
                transition-all
                text-black
                font-bold
                text-base sm:text-lg
                shadow-lg
                shadow-cyan-500/20
                active:scale-95
              "
            >
              Bắt đầu tuần làm việc 💀
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setShowGuide(true);
              }}
              className="
                h-12 sm:h-14
                px-5 sm:px-6
                rounded-2xl
                bg-white/5
                hover:bg-white/10
                border border-white/10
                transition-all
                text-zinc-300
                font-bold
                text-sm sm:text-base
                active:scale-95
              "
            >
              📖 Hướng dẫn chơi
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 flex items-center justify-between text-[10px] sm:text-xs text-zinc-500 border-t border-white/5 pt-4">
            <p>hãy nhớ giữ gìn sức khỏe nhé ❤️</p>
            <p>ver 1.0 by @dan666q</p>
          </div>
        </motion.div>
      </div>

      {/* Glassmorphic Guide Modal */}
      <AnimatePresence>
        {showGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => { soundManager.playClick(); setShowGuide(false); }}
          >
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl">
              <InteractiveGuide onClose={() => setShowGuide(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
