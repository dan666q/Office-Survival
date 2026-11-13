// src/ui/CanteenMenu.tsx
// Tờ thực đơn căn-tin dán tường: tên món ....... giá, gạch món đã gọi.

import { useGameStore } from '../store/gameStore'
import { getBuffsForProfession, LUNCH_BUFF_LIMIT } from '../store/gameHelpers'
import { DIFFICULTY_CONFIGS } from '../data'
import { soundManager } from '../utils/soundManager'
import { Sheet, CloseButton } from './Sheet'
import { formatEffect, formatMoney, stripEmoji } from './format'

const DURATION_NOTE = {
  timeslot: 'dùng ngay',
  day: 'cả ngày',
  permanent: 'cả tuần',
} as const

// Câu than khi hết tiền — chọn theo ngày cho ổn định, không đổi mỗi lần render
const BROKE_LINES = [
  'Ví mỏng hơn tờ A4. Ngắm thực đơn cho đỡ đói vậy.',
  'Lương chưa về mà căn-tin đã đòi tiền.',
  'Nhìn thì thèm, mua thì không nổi.',
  'Hôm nay ăn mì gói của công ty cho lành.',
]

export function CanteenMenu({ onClose }: { onClose: () => void }) {
  const profession = useGameStore((s) => s.profession)
  const stats = useGameStore((s) => s.stats)
  const activeBuffs = useGameStore((s) => s.activeBuffs)
  const bought = useGameStore((s) => s.lunchBuffsBought)
  const difficulty = useGameStore((s) => s.difficulty)
  const dayIndex = useGameStore((s) => s.dayHistory.length)
  const buyBuff = useGameStore((s) => s.buyBuff)

  const costMult = (DIFFICULTY_CONFIGS.find((d) => d.id === difficulty) ?? DIFFICULTY_CONFIGS[1]).buffCostMultiplier
  // Giữ đúng như bản cũ: thực đơn chỉ bày 6 món đầu chưa mua
  const items = getBuffsForProfession(profession)
    .filter((b) => !activeBuffs.includes(b.id))
    .slice(0, 6)
  const left = LUNCH_BUFF_LIMIT - bought
  const broke = left > 0 && items.length > 0 && items.every((b) => stats.salary < Math.round(b.cost * costMult))

  return (
    <Sheet onClose={onClose} label="Thực đơn căn-tin" tilt={0.8}>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-ink">Căn-tin Cứu Mạng</h2>
          <p className="hand text-lg text-pen">Gọi tối đa {LUNCH_BUFF_LIMIT} món · còn {left}</p>
        </div>
        <CloseButton onClick={onClose} />
      </div>

      {broke && <p className="mt-3 border-l-4 border-stamp pl-3 text-sm text-stamp">{BROKE_LINES[dayIndex % BROKE_LINES.length]}</p>}

      <ul className="mt-4 divide-y divide-dashed divide-paper-line">
        {items.map((buff) => {
          const cost = Math.round(buff.cost * costMult)
          const affordable = stats.salary >= cost
          const disabled = !affordable || left <= 0
          return (
            <li key={buff.id}>
              <button
                type="button"
                disabled={disabled}
                onClick={() => {
                  soundManager.playClick()
                  buyBuff(buff.id)
                }}
                className="group w-full py-3 text-left disabled:cursor-not-allowed disabled:opacity-45"
              >
                <span className="flex items-baseline gap-2">
                  <span className="font-bold text-ink group-enabled:group-hover:underline">{stripEmoji(buff.name)}</span>
                  <span className="mb-1 flex-1 border-b-2 border-dotted border-ink-faint" />
                  <span className={`font-mono text-sm font-bold ${affordable ? 'text-ink' : 'text-stamp'}`}>{formatMoney(cost)}</span>
                </span>
                <span className="mt-0.5 block text-sm leading-snug text-ink-soft">{stripEmoji(buff.description)}</span>
                <span className="hand mt-1 block text-base text-pen">
                  {buff.effects.map((e) => formatEffect(e.stat, e.value)).join(', ')} · {DURATION_NOTE[buff.duration]}
                </span>
              </button>
            </li>
          )
        })}
        {items.length === 0 && <li className="py-6 text-center text-ink-soft">Gọi hết thực đơn rồi. Đại gia.</li>}
      </ul>

      {activeBuffs.length > 0 && (
        <p className="mt-4 text-xs text-ink-faint">Món đã gọi đang nằm trên bàn bạn. Đồ dùng lâu dài giữ hiệu lực qua các ca.</p>
      )}
    </Sheet>
  )
}
