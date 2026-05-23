import { useGameStore } from "../../store/gameStore";
import { getMood, formatSalary } from "../../utils/statCalculator";
import { getBuffsForProfession } from "../../store/professionRegistry";
import { soundManager } from "../../utils/soundManager";

const LUNCH_BUFF_LIMIT = 2;

// Thông báo nghèo ngẫu nhiên 😭
const BROKE_MESSAGES = [
  "💸 Tài khoản âm tinh thần. Ví rỗng, buff khóa.",
  "🤑 Không đủ tiền mua một ly trà sữa, nói gì buff.",
  "😭 Lương chưa về mà shop đã muốn tiền.",
  "💀 Broke tier. Mở shop ra chỉ để xem thôi.",
  "🥲 Nhìn buff mà không mua được. Đau lòng.",
];

export default function RightPanel() {
  const {
    stats,
    activeBuffs,
    profession,
    currentTimeSlot,
    lunchBuffsBought,
    buyBuff,
  } = useGameStore();
  const mood = getMood(stats);



  const isLunchTime = currentTimeSlot === "lunch";
  const canBuyMore = isLunchTime && lunchBuffsBought < LUNCH_BUFF_LIMIT;

  const availableBuffs = getBuffsForProfession(profession);

  const activeBuffData = availableBuffs.filter((b) =>
    activeBuffs.includes(b.id)
  );
  const shopBuffs = availableBuffs
    .filter((b) => !activeBuffs.includes(b.id))
    .slice(0, 6);

  // Kiểm tra có đủ tiền mua bất kỳ buff nào không
  const canAffordAny = isLunchTime && shopBuffs.some((b) => stats.salary >= b.cost);
  const isBroke = isLunchTime && !canAffordAny && shopBuffs.length > 0 && lunchBuffsBought === 0;
  const brokeMessage = BROKE_MESSAGES[Math.floor(Date.now() / 10000) % BROKE_MESSAGES.length];

  return (
    <div className="flex flex-col h-full min-h-0 divide-y divide-zinc-800">
      {/* Mood */}
      <div className="px-3 py-3 flex-shrink-0">
        <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-2">
          Tâm trạng
        </p>
        <p className={`text-sm font-bold ${mood.color}`}>{mood.label}</p>
        <p className="text-[10px] text-zinc-500 mt-0.5">{mood.sub}</p>
      </div>

      {/* Salary */}
      <div className="px-3 py-3 flex-shrink-0">
        <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-2">
          Lương tích lũy
        </p>
        <p className={`text-xl font-black transition-colors duration-300 ${stats.salary <= 0 ? "text-red-400" : "text-yellow-300"}`}>
          {formatSalary(stats.salary)}
        </p>
        {stats.salary <= 0 && (
          <p className="text-[10px] text-red-500/70 mt-0.5">
            Âm tài khoản rồi đó 😬
          </p>
        )}
      </div>



      {/* Active buffs */}
      {activeBuffData.length > 0 && (
        <div className="px-3 py-3 flex-shrink-0">
          <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-2">
            Buffs đang active
          </p>
          <div className="space-y-1.5">
            {activeBuffData.map((buff) => (
              <div
                key={buff.id}
                className="flex items-center gap-2 rounded-lg bg-emerald-500/5 border border-emerald-500/20 px-2 py-1.5"
              >
                <span className="text-sm">{buff.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-medium text-emerald-300 truncate">
                    {buff.name}
                  </p>
                  <p className="text-[10px] text-zinc-600">{buff.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Buff shop */}
      <div className="px-3 py-3 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] uppercase tracking-widest text-zinc-600">
            Buff shop
          </p>
          {isLunchTime ? (
            <span className="text-[10px] text-yellow-400 font-medium">
              ☕ Còn mua {LUNCH_BUFF_LIMIT - lunchBuffsBought} món
            </span>
          ) : (
            <span className="text-[10px] text-zinc-600">
              Mở lúc 12:00 – 13:00
            </span>
          )}
        </div>

        {/* Locked (không phải lunch) */}
        {!isLunchTime && (
          <div className="rounded-lg border border-dashed border-zinc-800 p-4 text-center">
            <p className="text-2xl mb-2">🔒</p>
            <p className="text-[11px] text-zinc-600 leading-relaxed">
              Shop chỉ mở trong giờ ăn trưa
              <br />
              <span className="text-zinc-700">12:00 – 13:00</span>
            </p>
          </div>
        )}

        {/* Broke notice */}
        {isBroke && (
          <div className="mb-3 rounded-xl border border-red-500/30 bg-red-500/5 px-3 py-2.5">
            <p className="text-[11px] text-red-300 font-medium leading-relaxed">
              {brokeMessage}
            </p>
          </div>
        )}

        {isLunchTime && (
          <div className="space-y-2">
            {shopBuffs.length === 0 && (
              <p className="text-[11px] text-zinc-600 text-center py-4">
                Đã mua hết buff rồi 😎
              </p>
            )}
            {shopBuffs.map((buff) => {
              const canAfford = stats.salary >= buff.cost;
              const disabled = !canAfford || !canBuyMore;
              return (
                <div
                  key={buff.id}
                  onClick={() => {
                    if (!disabled) {
                      soundManager.playClick();
                      buyBuff(buff.id);
                    }
                  }}
                  className={`
                    rounded-lg border px-2.5 py-2 transition-all duration-200
                    ${
                      disabled
                        ? "border-zinc-800 bg-zinc-900/50 opacity-40 cursor-not-allowed"
                        : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-500 cursor-pointer active:scale-95"
                    }
                  `}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">{buff.icon}</span>
                      <span className="text-[11px] font-medium text-zinc-200 truncate">
                        {buff.name}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-bold whitespace-nowrap ${
                        canAfford ? "text-yellow-400" : "text-red-400"
                      }`}
                    >
                      {formatSalary(buff.cost)}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-relaxed line-clamp-2">
                    {buff.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {buff.effects.map((e, i) => (
                      <span
                        key={i}
                        className={`text-[9px] px-1.5 py-0.5 rounded-full border ${
                          e.value > 0
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                            : "border-red-500/30 bg-red-500/10 text-red-400"
                        }`}
                      >
                        {e.value > 0 ? "+" : ""}
                        {e.value} {e.stat}
                      </span>
                    ))}
                  </div>
                  {/* Không đủ tiền indicator */}
                  {!canAfford && isLunchTime && canBuyMore && (
                    <p className="text-[9px] text-red-400/70 mt-1">
                      Thiếu {formatSalary(buff.cost - stats.salary)}
                    </p>
                  )}
                  {!canBuyMore && canAfford && (
                    <p className="text-[9px] text-yellow-600 mt-1">
                      Đã mua đủ 2 món hôm nay
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
