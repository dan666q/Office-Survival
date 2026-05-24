import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGameStore } from "../../store/gameStore";

interface Contact {
  name: string;
  avatar: string;
  color: string;
}

const CONTACTS: Record<string, Contact> = {
  sep: { name: "Sếp Tổng 👔", avatar: "👨‍💼", color: "text-red-400" },
  pm: { name: "PM Hùng 💼", avatar: "🧑‍💼", color: "text-amber-400" },
  hr: { name: "HR Linh Chi 🎀", avatar: "👩‍💼", color: "text-pink-400" },
  intern: { name: "Intern Bảo 👶", avatar: "🧑‍💻", color: "text-emerald-400" },
  self: { name: "Tôi (Bạn) 🧑‍💻", avatar: "👨‍💻", color: "text-cyan-400" },
};

function getSenderDetails(message: string, type: "info" | "success" | "warning" | "danger"): Contact {
  if (type === "success") {
    return CONTACTS.self;
  }
  const lowercase = message.toLowerCase();
  if (lowercase.includes("sếp") || lowercase.includes("giám đốc") || lowercase.includes("thanh tra") || lowercase.includes("phạt")) {
    return CONTACTS.sep;
  }
  if (lowercase.includes("hr") || lowercase.includes("lương") || lowercase.includes("hợp đồng") || lowercase.includes("linh chi")) {
    return CONTACTS.hr;
  }
  if (lowercase.includes("intern") || lowercase.includes("bảo")) {
    return CONTACTS.intern;
  }
  if (type === "danger" || type === "warning") {
    return CONTACTS.pm;
  }
  return CONTACTS.sep; // Default fallback
}

interface MockMessage {
  id: string;
  sender: Contact;
  message: string;
  timestamp: string;
  isSelf: boolean;
  isInfo: boolean;
  type: "success" | "danger" | "warning" | "info";
}

function getColleagueReactions(entryMessage: string, entryId: string, timestamp: string): MockMessage[] {
  const reactions: MockMessage[] = [];
  const lowercase = entryMessage.toLowerCase();

  // 1. Canteen purchases reactions
  if (lowercase.includes("đã mua") || lowercase.includes("buff")) {
    const charCodeSum = entryId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    if (charCodeSum % 2 === 0) {
      reactions.push({
        id: `${entryId}-r1`,
        sender: CONTACTS.hr,
        message: "Chúc bạn ngon miệng nhé! Cơm nước đầy đủ mới cày KPI được chứ 🌸🍱",
        timestamp,
        isSelf: false,
        isInfo: false,
        type: "info"
      });
    } else {
      reactions.push({
        id: `${entryId}-r1`,
        sender: CONTACTS.intern,
        message: "Anh chị uống gì cho em ké ly sữa đá size L Highlands với nhé 🥤🔥",
        timestamp,
        isSelf: false,
        isInfo: false,
        type: "info"
      });
    }
  } 
  // 2. Successful resolutions
  else if (lowercase.includes("thành công") || lowercase.includes("hoàn thành") || lowercase.includes("giải quyết")) {
    if (lowercase.includes("code") || lowercase.includes("it") || lowercase.includes("server") || lowercase.includes("lỗi") || lowercase.includes("bug")) {
      reactions.push({
        id: `${entryId}-r1`,
        sender: CONTACTS.intern,
        message: "Code chạy mượt rồi! Anh gánh còng lưng em luôn á cứu tinh đời em 😭🙏",
        timestamp,
        isSelf: false,
        isInfo: false,
        type: "info"
      });
      reactions.push({
        id: `${entryId}-r2`,
        sender: CONTACTS.pm,
        message: "Tốt lắm, push code lên staging rồi báo anh review nhé. KPI ++ 👍",
        timestamp,
        isSelf: false,
        isInfo: false,
        type: "info"
      });
    } else if (lowercase.includes("sổ sách") || lowercase.includes("thuế") || lowercase.includes("kế toán") || lowercase.includes("hóa đơn") || lowercase.includes("tiền")) {
      reactions.push({
        id: `${entryId}-r1`,
        sender: CONTACTS.sep,
        message: "Quy trình khớp số tốt. Phòng kế toán cứ xử lý chính xác như vậy.",
        timestamp,
        isSelf: false,
        isInfo: false,
        type: "info"
      });
    } else {
      reactions.push({
        id: `${entryId}-r1`,
        sender: CONTACTS.hr,
        message: "Xuất sắc cả nhà ơi! Group chat rộn ràng hẳn 🎉✨",
        timestamp,
        isSelf: false,
        isInfo: false,
        type: "info"
      });
    }
  } 
  // 3. Penalty / Warning logs
  else if (lowercase.includes("phạt") || lowercase.includes("trừ lương") || lowercase.includes("burnout") || lowercase.includes("stress") || lowercase.includes("timeout")) {
    reactions.push({
      id: `${entryId}-r1`,
      sender: CONTACTS.intern,
      message: "Hic, sếp tổng đang gõ phím rầm rầm bên kia kìa, mọi người né né giùm 😰",
      timestamp,
      isSelf: false,
      isInfo: false,
      type: "info"
    });
    const charCodeSum = entryId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    if (charCodeSum % 2 === 0) {
      reactions.push({
        id: `${entryId}-r2`,
        sender: CONTACTS.pm,
        message: "Căng đấy! Tập trung giải quyết gấp kẻo trôi deadline nhé cả nhà 🚨",
        timestamp,
        isSelf: false,
        isInfo: false,
        type: "info"
      });
    }
  }

  return reactions;
}

export default function CenterPanel() {
  const feedLog = useGameStore((s) => s.feedLog);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll xuống khi có feed mới
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [feedLog.length]);

  // Flatten feedLog entries with their dynamic reaction comments
  const displayMessages: MockMessage[] = [];
  feedLog.forEach((entry) => {
    const isInfo = entry.type === "info";
    const isSelf = entry.type === "success";
    const sender = getSenderDetails(entry.message, entry.type);

    displayMessages.push({
      id: entry.id,
      sender,
      message: entry.message,
      timestamp: entry.timestamp,
      isSelf,
      isInfo,
      type: entry.type
    });

    // Add colleague reactions deterministically
    if (!isInfo) {
      const reacts = getColleagueReactions(entry.message, entry.id, entry.timestamp);
      displayMessages.push(...reacts);
    }
  });

  return (
    <div className="flex flex-col h-full min-h-0 bg-[#161a23]">
      
      {/* 🔵 Solid Blue Zalo Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#0068ff] text-white flex-shrink-0 shadow-md">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold font-sans tracking-wide truncate">
              Văn phòng Bão Táp 🏢 (5)
            </span>
            <span className="text-[9px] opacity-85 font-sans leading-none mt-0.5">
              Sếp Tổng, PM Hùng, HR Linh Chi, Intern Bảo...
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm shrink-0">
          <span className="cursor-default opacity-80 hover:opacity-100 transition-opacity">📞</span>
          <span className="cursor-default opacity-80 hover:opacity-100 transition-opacity">📹</span>
          <span className="cursor-default opacity-80 hover:opacity-100 transition-opacity font-bold font-mono">🔍</span>
          <span className="cursor-default opacity-85 hover:opacity-100 transition-opacity font-bold">☰</span>
        </div>
      </div>

      {/* Zalo Chat History Viewport */}
      <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-3 scrollbar-thin">
        {feedLog.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-2 opacity-50">
            <span className="text-xl">💬</span>
            <p className="text-[10px] font-sans text-zinc-500">Chưa có tin nhắn trong nhóm...</p>
          </div>
        )}

        <AnimatePresence initial={false}>
          {displayMessages.map((msg) => {
            if (msg.isInfo) {
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="flex justify-center my-1"
                >
                  <span className="text-[9px] text-zinc-400 bg-zinc-900/60 border border-zinc-800/80 px-2.5 py-1 rounded-full font-sans tracking-wide">
                    📢 {msg.message}
                  </span>
                </motion.div>
              );
            }

            if (msg.isSelf) {
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: 15, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="flex justify-end gap-2 my-1 pl-10"
                >
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] text-cyan-400 font-bold mb-0.5">{CONTACTS.self.name}</span>
                    <div className="bg-[#1c354e] text-sky-100 border border-[#2b4c6f] rounded-[18px] rounded-tr-none px-3.5 py-2 text-xs leading-relaxed shadow-sm">
                      <p className="break-words font-sans">{msg.message}</p>
                      <span className="text-[8px] opacity-45 mt-1 block text-right font-mono">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                  <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center text-xs self-start shrink-0 font-sans shadow select-none">
                    {CONTACTS.self.avatar}
                  </span>
                </motion.div>
              );
            }

            // Other contacts (Sếp, PM, HR, Intern)
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: -15, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="flex justify-start gap-2 my-1 pr-10"
              >
                <span className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs self-start shrink-0 font-sans shadow select-none">
                  {msg.sender.avatar}
                </span>
                <div className="flex flex-col items-start">
                  <span className={`text-[9px] font-bold mb-0.5 ${msg.sender.color}`}>{msg.sender.name}</span>
                  <div className={`
                    rounded-[18px] rounded-tl-none px-3.5 py-2 text-xs leading-relaxed shadow-sm border bg-[#20242e] border-zinc-800
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
              </motion.div>
            );
          })}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* Zalo Input Box at the Bottom */}
      <div className="border-t border-zinc-850 bg-zinc-900/40 p-2 flex items-center gap-2 flex-shrink-0">
        <span className="text-zinc-500 text-sm cursor-default hover:text-zinc-300 ml-1">📎</span>
        <div className="flex-1 rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-sans py-0.5">
            <span>Nhập tin nhắn...</span>
            <span className="w-1.5 h-3 bg-cyan-400 animate-pulse rounded-sm" />
          </div>
          <span className="text-xs cursor-default">😊</span>
        </div>
        <button className="w-6 h-6 rounded-full bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-[10px] active:scale-95 transition-all mr-1">
          ➤
        </button>
      </div>
    </div>
  );
}
