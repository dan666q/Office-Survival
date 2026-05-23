import { useEffect } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "../store/gameStore";

const DAY_LABELS: Record<string, string> = {
  monday: "Thứ Hai",
  tuesday: "Thứ Ba",
  wednesday: "Thứ Tư",
  thursday: "Thứ Năm",
  friday: "Thứ Sáu",
  saturday: "Thứ Bảy",
};

const DAY_ICONS: Record<string, string> = {
  monday: "😱",
  tuesday: "📅",
  wednesday: "⚠️",
  thursday: "🔥",
  friday: "🚀",
  saturday: "💀",
};

interface DayTransitionScreenProps {
  onComplete: () => void;
}

export default function DayTransitionScreen({ onComplete }: DayTransitionScreenProps) {
  const { currentDay } = useGameStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const dayLabel = DAY_LABELS[currentDay ?? ""] ?? currentDay;
  const icon = DAY_ICONS[currentDay ?? ""] ?? "📅";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#060816]">
      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.8) 0%, transparent 70%)",
          }}
        />
      </div>

      <motion.div
        className="text-center relative z-10"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Icon */}
        <motion.div
          className="text-7xl mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {icon}
        </motion.div>

        {/* Day label */}
        <motion.p
          className="text-sm uppercase tracking-[0.4em] text-indigo-300/70 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Bắt đầu
        </motion.p>
        <motion.h1
          className="text-5xl md:text-7xl font-black text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          {dayLabel}
        </motion.h1>

        {/* Progress bar */}
        <motion.div
          className="mt-10 w-48 h-1 bg-white/10 rounded-full overflow-hidden mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <motion.div
            className="h-full bg-indigo-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.8, duration: 1.4, ease: "linear" }}
          />
        </motion.div>

        <motion.p
          className="mt-4 text-xs text-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          Đang chuẩn bị...
        </motion.p>
      </motion.div>
    </div>
  );
}
