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

const priorityBadgeStyles = {
  low: "bg-zinc-700/80 text-zinc-300",
  medium: "bg-yellow-500/20 text-yellow-300",
  high: "bg-orange-500/20 text-orange-300",
  critical: "bg-red-500/30 text-red-200",
};

const priorityLabel: Record<string, string> = {
  low: "⚪ Thường",
  medium: "🟡 Quan trọng",
  high: "🟠 Khẩn",
  critical: "🔴 CRITICAL",
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

export default function EventCard({
  event,
  timeLeft,
  progress,
  onSelectAction,
}: EventCardProps) {
  const stats = useGameStore((s) => s.stats);
  const flags = useGameStore((s) => s.flags || {});

  return (
    <div
      className={`
        flex flex-col gap-4 rounded-2xl border p-4 shadow-lg backdrop-blur-sm
        transition-all duration-300
        ${priorityStyles[event.priority]}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Priority badge */}
          <div
            className={`
              mb-2 inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide
              ${priorityBadgeStyles[event.priority]}
            `}
          >
            {priorityLabel[event.priority]}
          </div>

          <h2 className="text-base font-bold text-white leading-snug">
            {event.title}
          </h2>
        </div>

        <div className="min-w-[110px] flex-shrink-0">
          <EventTimer timeLeft={timeLeft} progress={progress} />
        </div>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed text-zinc-300">
        {event.description}
      </p>

      {/* Actions */}
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
                group relative rounded-xl border px-4 py-3 text-left text-sm font-medium
                transition-all duration-200
                ${
                  isUnlocked
                    ? "border-zinc-700 bg-zinc-800/80 text-zinc-100 hover:scale-[1.02] hover:border-zinc-500 hover:bg-zinc-700 active:scale-[0.98]"
                    : "border-zinc-800/50 bg-zinc-900/30 text-zinc-500 opacity-60 cursor-not-allowed"
                }
              `}
            >
              <div className="flex items-center justify-between gap-4">
                <span>{action.label}</span>
                {!isUnlocked && (
                  <span className="text-[10px] font-extrabold text-red-500/80 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                    <span>🔒</span>
                    <span>Khóa ({formatRequirements(action.requirements)})</span>
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
