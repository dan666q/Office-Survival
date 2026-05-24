// src/screens/StartScreen.tsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "../store/gameStore";
import { soundManager } from "../utils/soundManager";

export default function StartScreen() {
  const goToScreen = useGameStore((s) => s.goToScreen);
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div className="min-h-screen bg-[#0f1117] text-white overflow-y-auto relative flex items-center justify-center py-8">
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
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
            <div className="bg-[#0f1117] border border-white/5 rounded-2xl p-3 sm:p-4">
              <p className="text-zinc-500 text-[10px] sm:text-xs">Stress</p>
              <p className="text-red-400 text-xl sm:text-2xl font-bold">87%</p>
            </div>

            <div className="bg-[#0f1117] border border-white/5 rounded-2xl p-3 sm:p-4">
              <p className="text-zinc-500 text-[10px] sm:text-xs">Energy</p>
              <p className="text-yellow-300 text-xl sm:text-2xl font-bold">24%</p>
            </div>

            <div className="bg-[#0f1117] border border-white/5 rounded-2xl p-3 sm:p-4">
              <p className="text-zinc-500 text-[10px] sm:text-xs">Meetings</p>
              <p className="text-purple-400 text-xl sm:text-2xl font-bold">12</p>
            </div>

            <div className="bg-[#0f1117] border border-white/5 rounded-2xl p-3 sm:p-4">
              <p className="text-zinc-500 text-[10px] sm:text-xs">Bugs</p>
              <p className="text-cyan-400 text-xl sm:text-2xl font-bold">34</p>
            </div>
          </div>

          {/* Quote */}
          <div className="mt-6 border border-yellow-500/10 bg-yellow-500/5 rounded-2xl p-3.5 sm:p-4">
            <p className="text-xs sm:text-sm text-yellow-100/90 italic leading-relaxed">
              “Em check giúp anh cái này gấp nha.”
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
            <p>Phiên bản 0.3 - cảm ơn Antigravity và Claude Code</p>
            <p>by @dan666q</p>
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
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-lg bg-[#171b26] border border-white/15 rounded-3xl p-5 sm:p-7 shadow-2xl relative max-h-[85vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  soundManager.playClick();
                  setShowGuide(false);
                }}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full w-8 h-8 flex items-center justify-center text-sm transition-colors"
              >
                ✕
              </button>

              <h2 className="text-xl sm:text-2xl font-black text-cyan-400 mb-4 sm:mb-5">
                📖 Hướng dẫn sống sót công sở
              </h2>

              <div className="space-y-4 text-zinc-300 text-xs sm:text-sm leading-relaxed">
                <div>
                  <h3 className="font-extrabold text-white text-sm sm:text-base mb-1.5">
                    🎯 Mục tiêu sống sót
                  </h3>
                  <p>
                    Vượt qua tuần làm việc đầy khắc nghiệt từ **Thứ Hai đến Thứ Bảy**. Quản lý sát sao các chỉ số tinh thần và thể chất để không bị sa thải hoặc ngã gục.
                  </p>
                </div>

                <div>
                  <h3 className="font-extrabold text-white text-sm sm:text-base mb-1.5">
                    📊 Hệ thống chỉ số
                  </h3>
                  <ul className="list-disc pl-4 space-y-1 text-zinc-400">
                    <li>
                      <strong className="text-red-400">Stress (Căng thẳng):</strong> Tăng khi gặp sự cố, deadline hoặc áp lực. Đạt **100%** ➔ <span className="text-red-300">Burnout & Thua cuộc</span>.
                    </li>
                    <li>
                      <strong className="text-yellow-400">Energy (Thể lực):</strong> Tiêu hao theo thời gian làm việc. Giảm về **0%** ➔ <span className="text-yellow-300">Kiệt sức & Thua cuộc</span>.
                    </li>
                    <li>
                      <strong className="text-emerald-400">Salary (Lương tích lũy):</strong> Cộng dồn mỗi cuối ngày. Dùng để chi tiêu trong giờ nghỉ trưa.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-extrabold text-white text-sm sm:text-base mb-1.5">
                    💡 Hậu quả quyết định (Cờ cốt truyện)
                  </h3>
                  <p>
                    Các hành động bạn chọn sẽ ghi dấu vĩnh viễn (ví dụ: *làm khóc intern*, *xào nấu số liệu*, *hóng drama*). Quyết định lười biếng lúc sáng có thể **khóa chặt** con đường an toàn của bạn vào buổi chiều, đòi hỏi bạn phải trả giá cực đắt!
                  </p>
                </div>

                <div>
                  <h3 className="font-extrabold text-white text-sm sm:text-base mb-1.5">
                    🏪 Shop trưa & Lựa chọn đêm
                  </h3>
                  <p>
                    - **Nghỉ trưa (Lunch):** Hãy dùng Lương mua các vật phẩm xịn (Buffs) ở Shop để hồi phục chỉ số và nâng cấp kỹ năng.
                    <br />
                    - **Lựa chọn tối (Night):** Cân đối giữa *Ngủ sớm* (hồi phục an toàn), *Đi nhậu* (tăng tiền nhưng tăng stress), và *Làm thêm OT* (nhận cực nhiều tiền nhưng tốn sức và stress lớn). **OT và Nhậu sẽ bị khóa nếu thể lực quá yếu hoặc stress quá sát ngưỡng chết!**
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setShowGuide(false);
                }}
                className="mt-6 w-full h-12 rounded-xl bg-cyan-400 text-black font-bold text-sm sm:text-base hover:bg-cyan-300 transition-colors"
              >
                Đã rõ, chiến game ngay 🎮
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
