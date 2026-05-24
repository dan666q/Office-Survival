// src/components/event/EventCard.tsx
import EventTimer from "./EventTimer";
import type { GameEvent } from "../../types/event.types";
import { useGameStore } from "../../store/gameStore";
import { checkRequirement } from "../../store/gameHelpers";

interface EventCardProps {
  event: GameEvent;
  timeLeft: number;
  progress: number;
  onSelectAction: (eventId: string, actionId: string) => void;
  isFirst?: boolean;
}

const priorityStyles = {
  low: "border-zinc-700 bg-zinc-900",
  medium: "border-yellow-500/40 bg-yellow-500/5",
  high: "border-orange-500/40 bg-orange-500/5",
  critical: "border-red-500/50 bg-red-500/10 animate-pulse",
};


const FLAG_LABELS: Record<string, string> = {
  gossip_spread: "Đã hóng drama",
  printer_broken: "Máy in bị hỏng",
  betrayer_tag: "Bị mang tiếng mách lẻo",
  migrated_legacy: "Đã đồng ý migrate hệ thống",
  intern_cried: "Làm intern khóc",
  team_hates_you: "Bị đồng nghiệp cô lập",
  has_hidden_error: "Sổ sách có sai số",
  tax_audit_triggered: "Đang bị thanh tra Thuế",
  audit_discrepancy: "Lệch số dư tiền mặt",
  boss_pleased: "Được lòng sếp",
  vip_client_found: "Chăm sóc khách VIP",
  client_impressed: "Khách VIP ấn tượng",
  deal_pending: "Chờ khách ký Penthouse",
  color_changed: "Đã đổi màu phong thủy",
  ds_deadline_approaching: "Đang chạy vội deadline",
};

const FLAG_LABELS_FALSE: Record<string, string> = {
  gossip_spread: "Chưa hóng drama",
  printer_broken: "Máy in bình thường",
  betrayer_tag: "Không mách lẻo",
  migrated_legacy: "Chưa migrate hệ thống",
  intern_cried: "Chưa làm intern khóc",
  team_hates_you: "Không bị cô lập",
  has_hidden_error: "Sổ sách sạch sẽ",
  tax_audit_triggered: "Không bị thanh tra Thuế",
  audit_discrepancy: "Không lệch quỹ",
  boss_pleased: "Chưa được sếp duyệt",
  vip_client_found: "Chưa gặp khách VIP",
  client_impressed: "Khách VIP chưa ấn tượng",
  deal_pending: "Chưa có deal pending",
  color_changed: "Chưa đổi màu phong thủy",
  ds_deadline_approaching: "Không chạy deadline gấp",
};

const STAT_NAMES: Record<string, string> = {
  salary: "Lương",
  stress: "Stress",
  energy: "Energy",
};

function formatRequirements(requirements: any): string {
  const parts: string[] = [];

  if (requirements.stats) {
    for (const r of requirements.stats) {
      const name = STAT_NAMES[r.stat] ?? r.stat;
      let opStr = "";
      if (r.op === "gt") opStr = ">";
      else if (r.op === "gte") opStr = "≥";
      else if (r.op === "lt") opStr = "<";
      else if (r.op === "lte") opStr = "≤";

      let valStr = "";
      if (r.stat === "salary") {
        valStr = `${(r.value / 1000).toFixed(0)}k`;
      } else {
        valStr = `${r.value}%`;
      }
      parts.push(`${name} ${opStr} ${valStr}`);
    }
  }

  if (requirements.flags) {
    for (const [flag, val] of Object.entries(requirements.flags)) {
      if (val) {
        parts.push(FLAG_LABELS[flag] ?? `Đã có: ${flag}`);
      } else {
        parts.push(FLAG_LABELS_FALSE[flag] ?? `Không có: ${flag}`);
      }
    }
  }

  return parts.join(", ");
}

function getEmailSender(title: string, priority: string) {
  const lowercase = title.toLowerCase();
  if (lowercase.includes("sếp") || lowercase.includes("giám đốc") || priority === "critical") {
    return { name: "Sếp Tổng 👔", email: "sep.tong@officeos.com" };
  }
  if (lowercase.includes("khách") || lowercase.includes("deal") || lowercase.includes("bds") || lowercase.includes("client")) {
    return { name: "Khách Hàng VIP 👑", email: "khach.vip@corporation.com" };
  }
  if (lowercase.includes("hr") || lowercase.includes("linh chi") || lowercase.includes("hợp đồng")) {
    return { name: "HR Linh Chi 🎀", email: "hr.linhchi@officeos.com" };
  }
  if (lowercase.includes("intern") || lowercase.includes("bảo")) {
    return { name: "Thực tập sinh Bảo 👶", email: "intern.bao@officeos.com" };
  }
  return { name: "Đồng nghiệp Hùng 💼", email: "hung.pm@officeos.com" };
}

export default function EventCard({
  event,
  timeLeft,
  progress,
  onSelectAction,
}: EventCardProps) {
  const stats = useGameStore((s) => s.stats);
  const flags = useGameStore((s) => s.flags || {});

  const sender = getEmailSender(event.title, event.priority);

  return (
    <div
      className={`
        flex flex-col gap-3 rounded-2xl border p-4 shadow-lg backdrop-blur-sm
        transition-all duration-300 font-sans bg-zinc-950/20
        ${priorityStyles[event.priority]}
      `}
    >
      {/* Sender & Deadline Header */}
      <div className="flex items-start justify-between gap-3 border-b border-zinc-800 pb-2.5">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-zinc-300">
              From: {sender.name}
            </span>
            <span className="text-[9px] text-zinc-500 font-mono">
              &lt;{sender.email}&gt;
            </span>
          </div>

          <h2 className="text-sm font-extrabold text-white leading-snug mt-1 select-text">
            Subject: {event.title}
          </h2>
        </div>

        <div className="min-w-[110px] flex-shrink-0">
          <EventTimer timeLeft={timeLeft} progress={progress} />
        </div>
      </div>

      {/* Email Body Message Container */}
      <div className="bg-zinc-900/60 border border-zinc-800 p-3 rounded-xl text-zinc-300 text-xs leading-relaxed select-text shadow-inner font-sans">
        <p className="whitespace-pre-wrap">{event.description}</p>
      </div>

      {/* Choice actions as Email Replies */}
      <div className="mt-1 space-y-2">
        <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-1 flex items-center gap-1">
          <span>↩️ Trả lời nhanh:</span>
        </div>

        <div className="grid gap-2">
          {event.actions.map((action) => {
            const isUnlocked =
              !action.requirements ||
              checkRequirement(action.requirements, stats, flags);

            return (
              <button
                key={action.id}
                disabled={!isUnlocked}
                onClick={() => isUnlocked && onSelectAction(event.id, action.id)}
                className={`
                  group relative rounded-xl border px-3.5 py-2.5 text-left text-xs font-semibold
                  transition-all duration-200 font-sans
                  ${
                    isUnlocked
                      ? "border-zinc-700 bg-zinc-900/80 text-zinc-200 hover:scale-[1.01] hover:border-cyan-500/50 hover:bg-cyan-950/25 active:scale-[0.99] cursor-pointer"
                      : "border-zinc-800 bg-zinc-950/30 text-zinc-650 opacity-60 cursor-not-allowed"
                  }
                `}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="text-zinc-500 group-hover:text-cyan-400 transition-colors">↩️</span>
                    <span className="text-zinc-300 font-medium group-hover:text-zinc-100 transition-colors">{action.label}</span>
                  </span>
                  {!isUnlocked && (
                    <span className="text-[8px] font-extrabold text-red-500/80 bg-red-500/10 border border-red-500/20 px-1.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                      <span>🔒 Yêu cầu: {formatRequirements(action.requirements)}</span>
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
