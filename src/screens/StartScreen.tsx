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
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => { soundManager.playClick(); setShowGuide(false); }}
          >
            <motion.div
              initial={{ scale: 0.92, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="w-full max-w-lg bg-[#13161f] border border-white/10 rounded-3xl shadow-2xl relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 bg-[#13161f]/95 backdrop-blur-sm border-b border-white/5 px-5 sm:px-7 pt-5 sm:pt-7 pb-4 flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                  📖 <span className="text-cyan-400">Hướng dẫn</span> sống sót
                </h2>
                <button
                  onClick={() => { soundManager.playClick(); setShowGuide(false); }}
                  className="text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full w-8 h-8 flex items-center justify-center text-sm transition-colors shrink-0"
                >
                  ✕
                </button>
              </div>

              <div className="px-5 sm:px-7 py-5 space-y-5 text-xs sm:text-sm">

                {/* Goal */}
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-4">
                  <h3 className="font-extrabold text-cyan-300 mb-2 flex items-center gap-1.5">
                    🎯 Mục tiêu
                  </h3>
                  <p className="text-zinc-300 leading-relaxed">
                    Sống sót qua <strong className="text-white">6 ngày làm việc</strong> (Thứ Hai → Thứ Bảy) mà không bị <span className="text-red-400 font-bold">burnout</span> hay <span className="text-yellow-400 font-bold">kiệt sức</span>.
                    Mỗi ngày sẽ có nhiều sự kiện bất ngờ ập đến — bạn phải ra quyết định nhanh trước khi hết giờ!
                  </p>
                </div>

                {/* Stats */}
                <div>
                  <h3 className="font-extrabold text-white mb-3 flex items-center gap-1.5">
                    📊 Ba chỉ số cần theo dõi
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                      <span className="text-lg shrink-0">😤</span>
                      <div>
                        <p className="font-bold text-red-400">Stress (Căng thẳng)</p>
                        <p className="text-zinc-400 mt-0.5">Tăng khi gặp sự cố, áp lực, deadline, hoặc chọn phương án rủi ro. Nếu chạm <strong className="text-red-300">100%</strong> → bạn burnout và thua cuộc ngay.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3">
                      <span className="text-lg shrink-0">⚡</span>
                      <div>
                        <p className="font-bold text-yellow-300">Energy (Thể lực)</p>
                        <p className="text-zinc-400 mt-0.5">Hao dần theo thời gian và sự kiện. Nếu về <strong className="text-yellow-200">0%</strong> → bạn gục ngã và thua cuộc. Phải ngủ đủ giấc mỗi đêm để hồi phục.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
                      <span className="text-lg shrink-0">💰</span>
                      <div>
                        <p className="font-bold text-emerald-400">Salary (Lương)</p>
                        <p className="text-zinc-400 mt-0.5">Cộng dồn mỗi ngày, dùng mua đồ hồi phục trong <strong className="text-white">Shop giờ trưa</strong>. Các lựa chọn tốt hoặc làm thêm OT sẽ tăng lương.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Daily Flow */}
                <div>
                  <h3 className="font-extrabold text-white mb-3 flex items-center gap-1.5">
                    🕐 Một ngày diễn ra thế nào?
                  </h3>
                  <div className="space-y-2">
                    {[
                      { icon: "🌅", time: "Sáng", color: "orange", desc: "Sự kiện bắt đầu xuất hiện. Mỗi sự kiện có đồng hồ đếm ngược — chọn nhanh trước khi hết giờ! Nếu hết giờ mà không chọn, game tự chọn phương án mặc định (thường không tốt lắm)." },
                      { icon: "☀️", time: "Trưa", color: "yellow", desc: "Sự kiện dồn dập hơn và khó hơn. Bạn sẽ có giờ nghỉ trưa để vào Shop mua đồ hồi phục bằng lương tích lũy." },
                      { icon: "🌆", time: "Chiều", color: "purple", desc: "Giai đoạn căng thẳng nhất. Sự kiện có thể xuất hiện 2 cái cùng lúc! Giữ bình tĩnh, ưu tiên xử lý sự kiện nào có timer ngắn hơn trước." },
                      { icon: "🌙", time: "Tối", color: "blue", desc: "Kết thúc ngày — bạn chọn cách nghỉ ngơi để chuẩn bị cho ngày mai." },
                    ].map((item) => (
                      <div key={item.time} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-3">
                        <span className="text-base shrink-0">{item.icon}</span>
                        <div>
                          <p className="font-bold text-white">{item.time}</p>
                          <p className="text-zinc-400 mt-0.5 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Events */}
                <div>
                  <h3 className="font-extrabold text-white mb-3 flex items-center gap-1.5">
                    ⚡ Sự kiện hoạt động thế nào?
                  </h3>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2 text-zinc-300 leading-relaxed">
                    <p>🃏 Mỗi sự kiện có <strong className="text-white">2–3 lựa chọn</strong>, mỗi lựa chọn ảnh hưởng khác nhau đến Stress, Energy và Salary.</p>
                    <p>⏱️ Mỗi sự kiện có <strong className="text-white">đồng hồ đếm ngược</strong>. Không chọn kịp → game tự xử lý (thường ảnh hưởng xấu).</p>
                    <p>🎭 Sự kiện có 3 mức độ ưu tiên: <span className="text-zinc-300">Thường</span>, <span className="text-yellow-400">Quan trọng</span>, <span className="text-red-400">Khẩn cấp</span>. Sự kiện khẩn cấp xuất hiện nhiều hơn ở cuối tuần.</p>
                    <p>🔗 Một số quyết định sẽ để lại <strong className="text-purple-300">cờ trạng thái</strong> — ảnh hưởng đến các sự kiện sau trong ngày hoặc những ngày tới.</p>
                  </div>
                </div>

                {/* Night choices */}
                <div>
                  <h3 className="font-extrabold text-white mb-3 flex items-center gap-1.5">
                    🌙 Lựa chọn cuối ngày
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/20 rounded-xl p-3">
                      <span className="text-base shrink-0">😴</span>
                      <div>
                        <p className="font-bold text-blue-300">Ngủ sớm <span className="text-zinc-500 font-normal">(Miễn phí)</span></p>
                        <p className="text-zinc-400 mt-0.5">Hồi phục <strong>+45 Energy</strong>, giảm <strong>-25 Stress</strong>. Lựa chọn an toàn nhất, luôn luôn khả dụng.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-orange-500/10 border border-orange-500/20 rounded-xl p-3">
                      <span className="text-base shrink-0">🍻</span>
                      <div>
                        <p className="font-bold text-orange-300">Đi nhậu <span className="text-zinc-500 font-normal">(-150,000₫)</span></p>
                        <p className="text-zinc-400 mt-0.5">+10 Energy, giảm -20 Stress. Tốn tiền nhưng giải stress tốt. <strong className="text-orange-200">Bị khóa</strong> nếu ví không đủ 150k hoặc stress ≥ 85.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
                      <span className="text-base shrink-0">💼</span>
                      <div>
                        <p className="font-bold text-emerald-300">Làm thêm OT <span className="text-zinc-500 font-normal">(+250,000₫)</span></p>
                        <p className="text-zinc-400 mt-0.5">Kiếm thêm tiền nhưng <strong>-15 Energy</strong> và <strong>+25 Stress</strong>. <strong className="text-red-300">Bị khóa</strong> nếu energy ≤ 25 hoặc stress ≥ 80.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Win / Lose */}
                <div>
                  <h3 className="font-extrabold text-white mb-3 flex items-center gap-1.5">
                    🏆 Thắng & Thua
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-emerald-500/8 border border-emerald-500/20 rounded-xl p-3">
                      <p className="font-bold text-emerald-400 mb-1">🎉 Thắng khi:</p>
                      <p className="text-zinc-400">Hoàn thành cả 6 ngày mà Stress &lt; 100% và Energy &gt; 0%</p>
                    </div>
                    <div className="bg-red-500/8 border border-red-500/20 rounded-xl p-3">
                      <p className="font-bold text-red-400 mb-1">💀 Thua khi:</p>
                      <p className="text-zinc-400">Stress đạt 100% <em>hoặc</em> Energy về 0% bất kỳ lúc nào</p>
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-yellow-500/5 border border-yellow-500/15 rounded-2xl p-4">
                  <h3 className="font-extrabold text-yellow-300 mb-2 flex items-center gap-1.5">
                    💡 Mẹo sinh tồn
                  </h3>
                  <ul className="space-y-1.5 text-zinc-300">
                    <li>🎯 Ưu tiên xử lý sự kiện <span className="text-red-400 font-bold">Khẩn cấp</span> trước — bỏ qua có thể mất nhiều điểm chỉ số.</li>
                    <li>💊 Ghé Shop trưa thường xuyên nếu Stress hoặc Energy đang nguy hiểm.</li>
                    <li>😴 Nếu cả 2 chỉ số đều thấp, hãy <strong>ngủ sớm</strong> thay vì cố OT.</li>
                    <li>🔮 Đọc kỹ mô tả sự kiện — một số lựa chọn nghe hay nhưng hậu quả về sau rất nặng.</li>
                    <li>📅 Cuối tuần (Thứ 5–7) khó hơn nhiều, hãy tích trữ Energy từ đầu tuần.</li>
                  </ul>
                </div>

              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-[#13161f]/95 backdrop-blur-sm border-t border-white/5 px-5 sm:px-7 py-4">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setShowGuide(false);
                  }}
                  className="w-full h-11 rounded-xl bg-cyan-400 text-black font-bold text-sm sm:text-base hover:bg-cyan-300 active:scale-95 transition-all"
                >
                  Đã hiểu rồi, chiến thôi! 🎮
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
