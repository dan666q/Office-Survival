import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "../store/gameStore";
import { formatSalary } from "../utils/statCalculator";
import { soundManager } from "../utils/soundManager";
import { CONTACTS, parseFeedEntry } from "../components/layout/LeftPanel";

const DAY_LABELS: Record<string, string> = {
  monday: "Thứ Hai Kinh Hoàng 💀",
  tuesday: "Thứ Ba Vật Vờ 🥱",
  wednesday: "Thứ Tư Hơi Ảo 🌀",
  thursday: "Thứ Năm Sắp Trôi 🍻",
  friday: "Thứ Sáu Quẩy Lên 🎉",
  saturday: "Thứ Bảy OT Báo Thủ 😭",
};

const REST_OPTIONS = [
  {
    id: "sleep",
    title: "😴 Ngủ sớm",
    description: "An toàn, hồi phục tốt và hoàn toàn miễn phí.",
    effects: ["+45% Energy", "-25% Stress", "Miễn phí"],
    color: "from-emerald-500/20 to-green-500/10",
    border: "border-emerald-500/40",
  },
  {
    id: "beer",
    title: "🍻 Uống bia giải sầu",
    description: "Giải tỏa stress cực tốt nhưng tốn kém. 30% cơ hội xảy ra drama sáng mai.",
    effects: ["+10% Energy", "-20% Stress", "-150k"],
    color: "from-amber-500/20 to-orange-500/10",
    border: "border-amber-500/40",
  },
  {
    id: "overtime",
    title: "💻 Làm thêm ban đêm",
    description: "Tăng thêm thu nhập (+250k) nhưng bào mòn sức khỏe và tăng stress.",
    effects: ["-15% Energy", "+25% Stress", "+250k"],
    color: "from-red-500/20 to-rose-500/10",
    border: "border-red-500/40",
  },
] as const;

export default function DailySummaryScreen() {
  const { currentDay, stats, dayHistory, nextDay } = useGameStore();
  const latestDay = dayHistory[dayHistory.length - 1];
  const feedLog = useGameStore((s) => s.feedLog);
  const displayMessages = feedLog.flatMap((entry) => parseFeedEntry(entry));

  const [activeMobileTab, setActiveMobileTab] = useState<"plan" | "zalo">("plan");

  useEffect(() => {
    soundManager.playDayPass();
  }, []);

  return (
    <div className="min-h-screen bg-[#060816] text-white px-4 py-6 md:px-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl"
      >
        {/* HEADER */}
        <div className="mb-4 md:mb-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-cyan-300/70 mb-2">
                Daily Summary
              </p>
              <h1 className="text-2xl sm:text-5xl font-black">
                Kết thúc{" "}
                <span className="text-cyan-300">
                  {DAY_LABELS[currentDay ?? ""] ?? currentDay}
                </span>
              </h1>
              <p className="text-xs sm:text-white/60 mt-2 max-w-2xl">
                Bạn vẫn còn sống sót sau một ngày công sở đầy deadline, drama và
                những cuộc họp đáng lẽ chỉ cần email.
              </p>
            </div>

            <div className="rounded-xl sm:rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 sm:px-5 sm:py-4">
              <p className="text-xs text-cyan-200/70 mb-0.5 sm:mb-1">
                Tình trạng hiện tại
              </p>
              <p className="text-lg sm:text-2xl font-black">
                {stats.stress >= 80
                  ? "💀 Sắp burnout"
                  : stats.energy <= 20
                  ? "😵 Kiệt sức"
                  : "😌 Tạm ổn"}
              </p>
            </div>
          </div>
        </div>

        {/* Sleek Topbar-style Status Bar */}
        <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3 sm:px-6 flex items-center gap-4 flex-wrap justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-[200px]">
            <span className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-widest font-black shrink-0">
              📊 Chỉ số hôm nay:
            </span>
            <div className="w-px h-4 bg-zinc-700 hidden sm:block" />
          </div>

          <div className="flex items-center gap-6 sm:gap-8 flex-wrap flex-[2]">
            {/* Stress Indicator */}
            <div className="flex items-center gap-2 flex-1 min-w-[140px]">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wide shrink-0 font-bold">
                Stress
              </span>
              <div className="flex-1 h-2 sm:h-2.5 rounded-full bg-zinc-900 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    stats.stress >= 80 ? "bg-red-500 animate-pulse" : "bg-red-400"
                  }`}
                  style={{ width: `${stats.stress}%` }}
                />
              </div>
              <span className={`text-xs font-black shrink-0 w-8 text-right ${stats.stress >= 80 ? "text-red-400 animate-pulse" : "text-zinc-300"}`}>
                {stats.stress}%
              </span>
            </div>

            {/* Energy Indicator */}
            <div className="flex items-center gap-2 flex-1 min-w-[140px]">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wide shrink-0 font-bold">
                Energy
              </span>
              <div className="flex-1 h-2 sm:h-2.5 rounded-full bg-zinc-900 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    stats.energy <= 20 ? "bg-blue-500 animate-pulse" : "bg-emerald-400"
                  }`}
                  style={{ width: `${stats.energy}%` }}
                />
              </div>
              <span className={`text-xs font-black shrink-0 w-8 text-right ${stats.energy <= 20 ? "text-blue-400 animate-pulse" : "text-zinc-300"}`}>
                {stats.energy}%
              </span>
            </div>

            {/* Salary Indicator */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wide font-bold">
                Lương lũy kế
              </span>
              <span className={`text-sm sm:text-base font-black ${stats.salary <= 0 ? "text-red-400" : "text-yellow-300"}`}>
                {formatSalary(stats.salary)}
              </span>
            </div>
          </div>
        </div>

        {/* ── DESKTOP CONTENT VIEW (3 Columns) ── */}
        <div className="hidden lg:grid lg:grid-cols-[380px_1fr_340px] gap-6 mb-8">
          
          {/* CỘT 1: XEM LẠI LIVE CHAT ZALO (TRÁI) */}
          <div className="order-1 lg:order-1 rounded-3xl border border-white/10 bg-[#161a23]/90 backdrop-blur-xl flex flex-col h-[520px] overflow-hidden shadow-2xl">
            {/* 🔵 Zalo Header */}
            <div className="flex items-center justify-between px-3.5 py-3.5 bg-[#0068ff] text-white flex-shrink-0 shadow-md">
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold font-sans tracking-wide truncate">
                  Văn phòng Bão Táp 🔥 (Đọc lại)
                </span>
                <span className="text-[9px] opacity-85 font-sans leading-none mt-0.5">
                  Lưu trữ đối thoại và thị phi trong ngày
                </span>
              </div>
              <span className="text-[9px] bg-red-500/20 border border-red-500/30 text-red-300 font-black px-2 py-0.5 rounded-full select-none shrink-0 uppercase tracking-wider">
                Đã khóa 🔒
              </span>
            </div>

            {/* Zalo Chat History Viewport */}
            <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-3.5 bg-[#161a23] scrollbar-thin">
              {displayMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-2 opacity-50">
                  <span className="text-xl">💬</span>
                  <p className="text-[10px] font-sans text-zinc-500">Chưa có cuộc hội thoại nào hôm nay...</p>
                </div>
              ) : (
                displayMessages.map((msg) => {
                  if (msg.isInfo) {
                    return (
                      <div key={msg.id} className="flex justify-center my-1">
                        <span className="text-[9px] text-zinc-400 bg-zinc-900/60 border border-zinc-800/80 px-2.5 py-1 rounded-full font-sans tracking-wide text-center">
                          📢 {msg.message}
                        </span>
                      </div>
                    );
                  }

                  if (msg.isSelf) {
                    return (
                      <div key={msg.id} className="flex justify-end gap-2 my-1 pl-10">
                        <div className="flex flex-col items-end">
                          <span className="text-[9px] text-cyan-400 font-bold mb-0.5">{CONTACTS.self.name}</span>
                          <div className="bg-[#1c354e] text-sky-100 border border-[#2b4c6f] rounded-[18px] rounded-tr-none px-3.5 py-2 text-xs leading-relaxed shadow-sm">
                            <p className="break-words font-sans text-[11px]">{msg.message}</p>
                            <span className="text-[8px] opacity-45 mt-1 block text-right font-mono">
                              {msg.timestamp}
                            </span>
                          </div>
                        </div>
                        <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center text-xs self-start shrink-0 font-sans shadow select-none">
                          {CONTACTS.self.avatar}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div key={msg.id} className="flex justify-start gap-2 my-1 pr-10">
                      <span className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs self-start shrink-0 font-sans shadow select-none">
                        {msg.sender.avatar}
                      </span>
                      <div className="flex flex-col items-start">
                        <span className={`text-[9px] font-bold mb-0.5 ${msg.sender.color}`}>{msg.sender.name}</span>
                        <div className={`
                          rounded-[18px] rounded-tl-none px-3.5 py-2 text-[11px] leading-relaxed shadow-sm border bg-[#20242e] border-zinc-800
                          ${
                            msg.type === "danger"
                              ? "text-red-200 border-red-500/20 bg-red-950/15"
                              : msg.type === "warning"
                              ? "text-amber-200 border-amber-500/20 bg-amber-950/15"
                              : "text-zinc-200"
                          }
                        `}>
                          <p className="break-words font-sans">{msg.message}</p>
                          <span className="text-[8px] opacity-45 mt-1 block font-mono">
                            {msg.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Zalo Input Box (Locked) */}
            <div className="border-t border-zinc-800 bg-zinc-900/40 p-2.5 flex items-center justify-center gap-1.5 flex-shrink-0 select-none">
              <span className="text-[10px] text-zinc-500 font-sans text-center font-medium leading-relaxed px-2">
                🔒 Đã hết ca làm việc. Kênh chat tạm khóa, lo đi nghỉ ngơi hồi sức thôi bạn ơi!
              </span>
            </div>
          </div>

          {/* CỘT 2: BẢN TIN TỔNG KẾT HÔM NAY (GIỮA) */}
          <div className="order-2 lg:order-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 flex flex-col justify-between h-[520px]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-bold">📋 Tổng kết hôm nay</h2>
                <span className="text-xs text-white/50 font-mono">HR đang theo dõi 👀</span>
              </div>

              <div className="space-y-3">
                <SummaryRow
                  label="Events đã xử lý"
                  value={`${latestDay?.eventsHandled ?? 0}`}
                />
                <SummaryRow
                  label="Lương kiếm được"
                  value={formatSalary(latestDay?.salaryEarned ?? 0)}
                />
                <SummaryRow
                  label="Tình trạng tâm lý"
                  value={
                    stats.stress >= 80
                      ? "Rất đáng báo động 😡"
                      : stats.stress >= 50
                      ? "Bắt đầu cọc rồi nhe 😤"
                      : "Vẫn chill nhẹ nhàng 🧘"
                  }
                />
                <SummaryRow
                  label="Khả năng OT tiếp"
                  value={
                    stats.energy <= 20
                      ? "Hết hơi (0%) 😵"
                      : stats.energy <= 50
                      ? "Có thể bị ép 😰"
                      : "Còn sống tốt 💪"
                  }
                />
              </div>
            </div>

            <div className="mt-4 sm:mt-0">
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-3.5 text-[11px] leading-relaxed text-red-200">
                ⚠️ **Cảnh báo công sở:** Chỉ số Stress và Energy sẽ mang nguyên vẹn sang ngày hôm sau. Không có cơ chế tự động reset! Hãy phân bổ năng lượng hợp lý.
              </div>
            </div>
          </div>

          {/* CỘT 3: TỐI NAY LÀM GÌ? (PHẢI) */}
          <div className="order-3 lg:order-3 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 flex flex-col justify-between h-[520px] overflow-y-auto">
            <div>
              <h2 className="text-xl font-bold mb-4">🌙 Kế hoạch tối nay</h2>
              
              <div className="space-y-3">
                {REST_OPTIONS.map((option) => {
                  let disabled = false;
                  let disabledReason = "";

                  if (option.id === "beer") {
                    if (stats.energy < 15) {
                      disabled = true;
                      disabledReason = "Cần ≥ 15% Energy";
                    } else if (stats.stress >= 95) {
                      disabled = true;
                      disabledReason = "Stress quá cao (≥ 95%)";
                    } else if (stats.salary < 150000) {
                      disabled = true;
                      disabledReason = "Không đủ tiền (Cần ≥ 150k)";
                    }
                  } else if (option.id === "overtime") {
                    if (stats.energy < 30) {
                      disabled = true;
                      disabledReason = "Cần ≥ 30% Energy";
                    } else if (stats.stress >= 80) {
                      disabled = true;
                      disabledReason = "Stress quá cao (≥ 80%)";
                    }
                  }

                  return (
                    <motion.button
                      key={option.id}
                      disabled={disabled}
                      whileHover={disabled ? {} : { scale: 1.015 }}
                      whileTap={disabled ? {} : { scale: 0.98 }}
                      onClick={() => {
                        if (disabled) return;
                        soundManager.playClick();
                        nextDay(option.id as "sleep" | "beer" | "overtime");
                      }}
                      className={`
                        w-full rounded-2xl border p-3.5 text-left transition-all duration-200
                        ${
                          disabled
                            ? "border-zinc-800 bg-zinc-900/30 text-zinc-500 opacity-50 cursor-not-allowed"
                            : `bg-gradient-to-br ${option.color} ${option.border} hover:border-white/30`
                        }
                      `}
                    >
                      <div className="flex items-start justify-between gap-2.5">
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-sm font-extrabold mb-0.5 ${disabled ? "text-zinc-500" : ""}`}>
                            {option.title}
                          </h3>
                          <p className={`text-[10px] leading-relaxed mb-2.5 ${disabled ? "text-zinc-600" : "text-white/65"}`}>
                            {option.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {option.effects.map((effect) => (
                              <span
                                key={effect}
                                className={`rounded-full border px-2 py-0.5 text-[9px] font-bold ${
                                  disabled
                                    ? "border-zinc-800 bg-zinc-900/50 text-zinc-600"
                                    : "border-white/10 bg-white/10 text-white"
                                }`}
                              >
                                {effect}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {disabled ? (
                          <span className="text-[8px] font-extrabold text-red-400 bg-red-950/40 border border-red-500/20 px-1.5 py-0.5 rounded flex items-center gap-0.5 shrink-0 self-center">
                            <span>🔒</span>
                            <span>{disabledReason}</span>
                          </span>
                        ) : (
                          <div className="text-white/40 text-sm shrink-0 self-center">→</div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Content Area */}
        <div className="lg:hidden">
          {activeMobileTab === "plan" ? (
            <div className="space-y-6 pb-20">
              
              {/* KẾ HOẠCH TỐI NAY (PHẢI) - PRIORITIZED AT THE TOP */}
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 flex flex-col justify-between h-auto">
                <div>
                  <h2 className="text-xl font-bold mb-4">🌙 Kế hoạch tối nay</h2>
                  
                  <div className="space-y-3">
                    {REST_OPTIONS.map((option) => {
                      let disabled = false;
                      let disabledReason = "";

                      if (option.id === "beer") {
                        if (stats.energy < 15) {
                          disabled = true;
                          disabledReason = "Cần ≥ 15% Energy";
                        } else if (stats.stress >= 95) {
                          disabled = true;
                          disabledReason = "Stress quá cao (≥ 95%)";
                        } else if (stats.salary < 150000) {
                          disabled = true;
                          disabledReason = "Không đủ tiền (Cần ≥ 150k)";
                        }
                      } else if (option.id === "overtime") {
                        if (stats.energy < 30) {
                          disabled = true;
                          disabledReason = "Cần ≥ 30% Energy";
                        } else if (stats.stress >= 80) {
                          disabled = true;
                          disabledReason = "Stress quá cao (≥ 80%)";
                        }
                      }

                      return (
                        <motion.button
                          key={option.id}
                          disabled={disabled}
                          whileHover={disabled ? {} : { scale: 1.015 }}
                          whileTap={disabled ? {} : { scale: 0.98 }}
                          onClick={() => {
                            if (disabled) return;
                            soundManager.playClick();
                            nextDay(option.id as "sleep" | "beer" | "overtime");
                          }}
                          className={`
                            w-full rounded-2xl border p-3.5 text-left transition-all duration-200
                            ${
                              disabled
                                ? "border-zinc-800 bg-zinc-900/30 text-zinc-500 opacity-50 cursor-not-allowed"
                                : `bg-gradient-to-br ${option.color} ${option.border} hover:border-white/30`
                            }
                          `}
                        >
                          <div className="flex items-start justify-between gap-2.5">
                            <div className="flex-1 min-w-0">
                              <h3 className={`text-sm font-extrabold mb-0.5 ${disabled ? "text-zinc-500" : ""}`}>
                                {option.title}
                              </h3>
                              <p className={`text-[10px] leading-relaxed mb-2.5 ${disabled ? "text-zinc-600" : "text-white/65"}`}>
                                {option.description}
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {option.effects.map((effect) => (
                                  <span
                                    key={effect}
                                    className={`rounded-full border px-2 py-0.5 text-[9px] font-bold ${
                                      disabled
                                        ? "border-zinc-800 bg-zinc-900/50 text-zinc-600"
                                        : "border-white/10 bg-white/10 text-white"
                                    }`}
                                  >
                                    {effect}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            {disabled ? (
                              <span className="text-[8px] font-extrabold text-red-400 bg-red-950/40 border border-red-500/20 px-1.5 py-0.5 rounded flex items-center gap-0.5 shrink-0 self-center">
                                <span>🔒</span>
                                <span>{disabledReason}</span>
                              </span>
                            ) : (
                              <div className="text-white/40 text-sm shrink-0 self-center">→</div>
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* BẢN TIN TỔNG KẾT HÔM NAY (GIỮA) - PLACED AT THE BOTTOM */}
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 flex flex-col justify-between h-auto">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">📋 Tổng kết hôm nay</h2>
                    <span className="text-xs text-white/50 font-mono">HR đang theo dõi 👀</span>
                  </div>

                  <div className="space-y-3">
                    <SummaryRow
                      label="Events đã xử lý"
                      value={`${latestDay?.eventsHandled ?? 0}`}
                    />
                    <SummaryRow
                      label="Lương kiếm được"
                      value={formatSalary(latestDay?.salaryEarned ?? 0)}
                    />
                    <SummaryRow
                      label="Tình trạng tâm lý"
                      value={
                        stats.stress >= 80
                          ? "Rất đáng báo động 😡"
                          : stats.stress >= 50
                          ? "Bắt đầu cọc rồi nhe 😤"
                          : "Vẫn chill nhẹ nhàng 🧘"
                      }
                    />
                    <SummaryRow
                      label="Khả năng OT tiếp"
                      value={
                        stats.energy <= 20
                          ? "Hết hơi (0%) 😵"
                          : stats.energy <= 50
                          ? "Có thể bị ép 😰"
                          : "Còn sống tốt 💪"
                      }
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-3.5 text-[11px] leading-relaxed text-red-200">
                    ⚠️ **Cảnh báo công sở:** Chỉ số Stress và Energy sẽ mang nguyên vẹn sang ngày hôm sau. Không có cơ chế tự động reset! Hãy phân bổ năng lượng hợp lý.
                  </div>
                </div>
              </div>

            </div>
          ) : (
            
            /* CỘT 1: XEM LẠI LIVE CHAT ZALO (TRÁI) - FULLSCREEN ON MOBILE SUMMARY */
            <div className="fixed inset-0 z-40 bg-[#161a23] flex flex-col pb-16 select-text">
              {/* 🔵 Zalo Header */}
              <div className="flex items-center justify-between px-3.5 py-3.5 bg-[#0068ff] text-white flex-shrink-0 shadow-md">
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold font-sans tracking-wide truncate">
                    Văn phòng Bão Táp 🔥 (Đọc lại)
                  </span>
                  <span className="text-[9px] opacity-85 font-sans leading-none mt-0.5">
                    Lưu trữ đối thoại và thị phi trong ngày
                  </span>
                </div>
                <span className="text-[9px] bg-red-500/20 border border-red-500/30 text-red-300 font-black px-2 py-0.5 rounded-full select-none shrink-0 uppercase tracking-wider">
                  Đã khóa 🔒
                </span>
              </div>

              {/* Zalo Chat History Viewport */}
              <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-3.5 bg-[#161a23] scrollbar-thin">
                {displayMessages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full gap-2 opacity-50">
                    <span className="text-xl">💬</span>
                    <p className="text-[10px] font-sans text-zinc-500">Chưa có cuộc hội thoại nào hôm nay...</p>
                  </div>
                ) : (
                  displayMessages.map((msg) => {
                    if (msg.isInfo) {
                      return (
                        <div key={msg.id} className="flex justify-center my-1">
                          <span className="text-[9px] text-zinc-400 bg-zinc-900/60 border border-zinc-800/80 px-2.5 py-1 rounded-full font-sans tracking-wide text-center">
                            📢 {msg.message}
                          </span>
                        </div>
                      );
                    }

                    if (msg.isSelf) {
                      return (
                        <div key={msg.id} className="flex justify-end gap-2 my-1 pl-10">
                          <div className="flex flex-col items-end">
                            <span className="text-[9px] text-cyan-400 font-bold mb-0.5">{CONTACTS.self.name}</span>
                            <div className="bg-[#1c354e] text-sky-100 border border-[#2b4c6f] rounded-[18px] rounded-tr-none px-3.5 py-2 text-xs leading-relaxed shadow-sm">
                              <p className="break-words font-sans text-[11px]">{msg.message}</p>
                              <span className="text-[8px] opacity-45 mt-1 block text-right font-mono">
                                {msg.timestamp}
                              </span>
                            </div>
                          </div>
                          <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center text-xs self-start shrink-0 font-sans shadow select-none">
                            {CONTACTS.self.avatar}
                          </span>
                        </div>
                      );
                    }

                    return (
                      <div key={msg.id} className="flex justify-start gap-2 my-1 pr-10">
                        <span className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs self-start shrink-0 font-sans shadow select-none">
                          {msg.sender.avatar}
                        </span>
                        <div className="flex flex-col items-start">
                          <span className={`text-[9px] font-bold mb-0.5 ${msg.sender.color}`}>{msg.sender.name}</span>
                          <div className={`
                            rounded-[18px] rounded-tl-none px-3.5 py-2 text-[11px] leading-relaxed shadow-sm border bg-[#20242e] border-zinc-800
                            ${
                              msg.type === "danger"
                                ? "text-red-200 border-red-500/20 bg-red-950/15"
                                : msg.type === "warning"
                                ? "text-amber-200 border-amber-500/20 bg-amber-950/15"
                                : "text-zinc-200"
                            }
                          `}>
                            <p className="break-words font-sans">{msg.message}</p>
                            <span className="text-[8px] opacity-45 mt-1 block font-mono">
                              {msg.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Zalo Input Box (Locked) */}
              <div className="border-t border-zinc-800 bg-zinc-900/40 p-2.5 flex items-center justify-center gap-1.5 flex-shrink-0 select-none">
                <span className="text-[10px] text-zinc-500 font-sans text-center font-medium leading-relaxed px-2">
                  🔒 Đã hết ca làm việc. Kênh chat tạm khóa, lo đi nghỉ ngơi hồi sức thôi bạn ơi!
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ── MOBILE BOTTOM NAVIGATION (DAILY SUMMARY) ── */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-md flex items-center justify-between safe-bottom pb-safe select-none">
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveMobileTab("plan");
            }}
            className={`flex-1 py-3.5 text-center text-xs font-black transition-all relative flex flex-col items-center justify-center gap-1 ${
              activeMobileTab === "plan" ? "text-cyan-400" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <span className="text-lg">🌙</span>
            <span className="text-[10px] font-bold">Kế Hoạch</span>
            {activeMobileTab === "plan" && (
              <motion.div
                layoutId="activeDailyTabIndicator"
                className="absolute top-0 left-4 right-4 h-0.5 bg-cyan-400 rounded-full"
              />
            )}
          </button>
          
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveMobileTab("zalo");
            }}
            className={`flex-1 py-3.5 text-center text-xs font-black transition-all relative flex flex-col items-center justify-center gap-1 ${
              activeMobileTab === "zalo" ? "text-cyan-400" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <span className="text-lg">💬</span>
            <span className="text-[10px] font-bold">Thị Phi Zép Lào</span>
            {activeMobileTab === "zalo" && (
              <motion.div
                layoutId="activeDailyTabIndicator"
                className="absolute top-0 left-4 right-4 h-0.5 bg-cyan-400 rounded-full"
              />
            )}
          </button>
        </div>

      </motion.div>
    </div>
  );
}

interface SummaryRowProps {
  label: string;
  value: string;
}

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
      <span className="text-white/60">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
