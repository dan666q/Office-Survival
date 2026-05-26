// src/components/layout/SystemSettingsPanel.tsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "../../store/gameStore";
import { soundManager } from "../../utils/soundManager";
import { PROFESSIONS_CONFIG } from "../../store/professionRegistry";
import { DIFFICULTY_CONFIGS } from "../../data";

const DAY_LABELS: Record<string, string> = {
  monday: "Thứ Hai Kinh Hoàng 💀",
  tuesday: "Thứ Ba Vật Vờ 🥱",
  wednesday: "Thứ Tư Hơi Ảo 🌀",
  thursday: "Thứ Năm Sắp Trôi 🍻",
  friday: "Thứ Sáu Quẩy Lên 🎉",
  saturday: "Thứ Bảy OT Báo Thủ 😭",
};

const TIMESLOT_LABELS: Record<string, string> = {
  morning_start: "🌅 Vào ca sáng (08:00)",
  morning: "☕ Làm việc sáng (09:00)",
  lunch: "🍱 Nghỉ trưa ăn uống (12:00)",
  afternoon: "💻 Làm việc chiều (13:00)",
  end_of_day: "🌇 Hết giờ hành chính (17:00)",
  overtime: "🌙 Ca tối OT (19:00)",
};

interface SystemSettingsPanelProps {
  onClose?: () => void;
}

export default function SystemSettingsPanel({ onClose }: SystemSettingsPanelProps) {
  const {
    profession,
    difficulty,
    currentDay,
    currentTimeSlot,
    achievements,
  } = useGameStore();

  const [isMuted, setIsMuted] = useState(soundManager.getMuteState());
  const [showConfirm, setShowConfirm] = useState(false);

  const profConfig = PROFESSIONS_CONFIG.find((p) => p.id === profession);
  const diffConfig = DIFFICULTY_CONFIGS.find((d) => d.id === difficulty);

  const handleToggleMute = () => {
    const nextMuted = soundManager.toggleMute();
    setIsMuted(nextMuted);
    soundManager.playClick();
  };

  const handleWipeData = () => {
    soundManager.playClick();
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="w-full flex flex-col gap-4 font-sans text-zinc-100 select-none">
      {/* ⚙️ Header (For inline view or modal title) */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <h2 className="text-base font-black tracking-wide text-cyan-400 flex items-center gap-2">
          <span>⚙️</span> CÀI ĐẶT HỆ THỐNG
        </h2>
        {onClose && (
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-7 h-7 rounded-full bg-zinc-800 hover:bg-zinc-700 hover:text-white text-zinc-400 flex items-center justify-center text-xs font-bold transition-all border border-zinc-700/50 active:scale-90"
          >
            ✕
          </button>
        )}
      </div>

      {/* 📊 Current Gameplay Status Panel */}
      {profession && (
        <div className="bg-zinc-950/50 border border-zinc-800/80 rounded-2xl p-4 flex flex-col gap-3">
          <p className="text-[10px] uppercase font-extrabold tracking-wider text-zinc-500">
            Tiến trình ca làm việc hiện tại
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#171b26]/50 border border-white/5 rounded-xl p-2.5">
              <span className="text-[9px] text-zinc-500 block font-bold">VAI TRÒ & CẤP BẬC</span>
              <span className="text-xs font-extrabold text-white flex items-center gap-1.5 mt-0.5">
                <span>{profConfig?.emoji || "💼"}</span>
                <span className="truncate">{profConfig?.name || profession}</span>
              </span>
              <span className="inline-block text-[8px] px-1.5 py-0.2 mt-1 rounded bg-zinc-800 border border-zinc-750 text-zinc-400 font-extrabold">
                {diffConfig?.emoji} {diffConfig?.name}
              </span>
            </div>

            <div className="bg-[#171b26]/50 border border-white/5 rounded-xl p-2.5">
              <span className="text-[9px] text-zinc-500 block font-bold">THỜI GIAN HIỆN TẠI</span>
              <span className="text-xs font-extrabold text-cyan-400 block truncate mt-0.5">
                {currentDay ? DAY_LABELS[currentDay] : "Thứ Hai"}
              </span>
              <span className="text-[9px] text-zinc-400 block mt-0.5">
                {currentTimeSlot ? TIMESLOT_LABELS[currentTimeSlot] : ""}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-zinc-800/50 pt-2 text-xs">
            <span className="text-zinc-400 font-medium">Thành tựu đã mở khóa:</span>
            <span className="font-extrabold text-yellow-400 flex items-center gap-1 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full text-[10px]">
              🏅 {achievements.length} Đạt được
            </span>
          </div>
        </div>
      )}

      {/* 🔊 Audio Toggle Section */}
      <div className="bg-zinc-950/50 border border-zinc-800/80 rounded-2xl p-4 flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold text-zinc-200">Âm thanh & Nhạc nền</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5 font-medium">Bật/tắt tất cả nhạc và hiệu ứng trong game</p>
        </div>
        <button
          onClick={handleToggleMute}
          className={`
            px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all active:scale-95 border
            ${
              isMuted
                ? "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-300"
                : "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20"
            }
          `}
        >
          <span>{isMuted ? "🔇 Tắt tiếng" : "🔊 Bật tiếng"}</span>
        </button>
      </div>

      {/* 🧭 Action Controls Grid */}
      <div className="grid grid-cols-1 gap-2.5">
        {/* Resign Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            setShowConfirm(true);
          }}
          className="w-full h-11 rounded-xl bg-red-950/20 border border-red-500/10 hover:border-red-500/30 hover:bg-red-950/30 text-red-400 text-xs font-black transition-all flex items-center justify-center gap-2 active:scale-99"
        >
          <span>📄</span> Nộp Đơn Xin Nghỉ Việc
        </button>
      </div>

      {/* ⚠️ Glassmorphic Confirmation Popups */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-55 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="bg-[#171b26] border border-white/10 w-full max-w-sm rounded-2xl p-5 shadow-2xl flex flex-col gap-4 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center text-xl mx-auto">
                📄
              </div>
              <div>
                <h4 className="text-sm font-black text-red-400">NỘP ĐƠN XIN NGHỈ VIỆC?</h4>
                <p className="text-xs text-zinc-400 leading-relaxed mt-2 font-medium">
                  Bạn có chắc chắn muốn nộp đơn xin nghỉ việc? Hành động này sẽ xóa sạch TOÀN BỘ dữ liệu bao gồm tất cả tiến trình và các Thành tựu (Achievements) đã gặt hái được.
                </p>
                <p className="text-[10px] text-red-550 bg-red-500/5 border border-red-500/10 rounded-lg p-2 leading-relaxed mt-2.5 font-extrabold">
                  CẢNH BÁO: Sếp sẽ duyệt ngay lập tức! Bạn sẽ quay trở lại màn hình chính và bắt đầu lại cuộc sống công sở từ một con số không tròn trĩnh.
                </p>
              </div>
              <div className="flex gap-2.5 mt-2">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setShowConfirm(false);
                  }}
                  className="flex-1 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition-all animate-pulse-once"
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={handleWipeData}
                  className="flex-1 h-10 rounded-xl bg-red-600 text-white hover:bg-red-500 text-xs font-black transition-all shadow-[0_4px_12px_rgba(239,68,68,0.2)]"
                >
                  Nộp đơn và nghỉ!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
