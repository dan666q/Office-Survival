// src/ui/EventTray.tsx
// Khay hồ sơ ở đáy màn hình: điện thoại Zalo, các phiếu việc đang chờ, nút hệ thống.
// Giờ trưa và giờ tăng ca, khay hiện thêm lựa chọn tương ứng.
// Khi máy không có WebGL, khay này mở rộng thành danh sách đầy đủ để vẫn chơi được.

import { motion } from 'framer-motion'
import type { GameEvent } from '../types/event.types'
import { PRIORITY_ORDER, PRIORITY_STAMP, stripEmoji } from './format'
import { useRemaining } from './hooks'
import { BagIcon, GearIcon, HomeIcon, PhoneIcon, ArrowIcon } from './icons'

function Slip({ event, active, onOpen, large }: { event: GameEvent; active: boolean; onOpen: () => void; large: boolean }) {
  const { ratio, seconds } = useRemaining(event.id)
  const stamp = PRIORITY_STAMP[event.priority]
  const urgent = ratio < 0.3
  return (
    <motion.button
      layout
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 30, opacity: 0 }}
      type="button"
      onClick={onOpen}
      className={`paper relative shrink-0 border-l-4 text-left transition-transform hover:-translate-y-1 ${
        stamp.tone === 'stamp' ? 'border-stamp' : stamp.tone === 'pen' ? 'border-pen' : 'border-ink-faint'
      } ${active ? '-translate-y-1 outline-2 outline-pen' : ''} ${large ? 'w-full px-4 py-3' : 'w-44 px-3 py-2 md:w-52'}`}
    >
      <span className={`block text-[11px] font-bold ${stamp.tone === 'stamp' ? 'text-stamp' : 'text-ink-soft'}`}>
        {stamp.text}
        <span className={`ml-1 font-mono ${urgent ? 'text-stamp' : 'text-ink-faint'}`}>· {Math.ceil(seconds)}s</span>
      </span>
      <span className={`font-semibold text-ink ${large ? 'block text-base' : 'line-clamp-1 text-sm'}`}>{stripEmoji(event.title)}</span>
      <span className="mt-1.5 block h-1 w-full bg-ink/10">
        <span className={`block h-full ${urgent ? 'bg-stamp' : 'bg-ink'}`} style={{ width: `${ratio * 100}%` }} />
      </span>
    </motion.button>
  )
}

function RoundButton({ label, onClick, children, badge }: { label: string; onClick: () => void; children: React.ReactNode; badge?: number }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="btn-ink pointer-events-auto relative h-14 w-14 shrink-0 flex-col gap-0 rounded-xl !p-0 text-[10px]"
    >
      {children}
      <span className="mt-0.5 leading-none font-semibold">{label}</span>
      {!!badge && (
        <span className="absolute -top-2 -right-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-stamp px-1.5 font-mono text-xs font-bold text-paper">
          {badge > 9 ? '9+' : badge}
        </span>
      )}
    </button>
  )
}

interface EventTrayProps {
  events: GameEvent[]
  queued: number
  focusedEventId: string | null
  unread: number
  isLunch: boolean
  lunchLeft: number
  canSkipOvertime: boolean
  /** Không có cảnh 3D → hiện danh sách lớn */
  expanded: boolean
  onOpenEvent: (id: string) => void
  onOpenZalo: () => void
  onOpenSettings: () => void
  onOpenCanteen: () => void
  onFinishLunch: () => void
  onGoHome: () => void
}

export function EventTray(props: EventTrayProps) {
  const sorted = [...props.events].sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])

  const special = props.isLunch ? (
    <div className="paper pointer-events-auto flex shrink-0 items-center gap-3 px-3 py-2">
      <div className="hidden sm:block">
        <p className="text-sm font-bold text-ink">Giờ nghỉ trưa</p>
        <p className="text-xs text-ink-soft">Còn gọi được {props.lunchLeft} món</p>
      </div>
      <button type="button" className="btn-ink !px-3 !py-1.5 text-sm" onClick={props.onOpenCanteen}>
        <BagIcon size={18} /> Căn-tin <span className="font-mono text-xs text-ink-soft">({props.lunchLeft})</span>
      </button>
      <button type="button" className="btn-ink btn-stamp !px-3 !py-1.5 text-sm" onClick={props.onFinishLunch}>
        Vào ca chiều <ArrowIcon size={18} />
      </button>
    </div>
  ) : props.canSkipOvertime ? (
    <div className="paper pointer-events-auto flex shrink-0 items-center gap-3 px-3 py-2">
      <p className="text-sm font-bold text-ink">
        Tăng ca<span className="block text-xs font-normal text-ink-soft">Ở lại hay về?</span>
      </p>
      <button type="button" className="btn-ink !px-3 !py-1.5 text-sm" onClick={props.onGoHome}>
        <HomeIcon size={18} /> Về nhà
      </button>
    </div>
  ) : null

  if (props.expanded) {
    return (
      <div className="pointer-events-auto fixed inset-x-0 top-24 bottom-0 z-20 overflow-y-auto px-3 pb-24 md:mx-auto md:max-w-xl">
        <p className="hand mb-2 text-xl text-paper">Khay hồ sơ hôm nay</p>
        <div className="flex flex-col gap-3">
          {special}
          {sorted.map((e) => (
            <Slip key={e.id} event={e} active={e.id === props.focusedEventId} onOpen={() => props.onOpenEvent(e.id)} large />
          ))}
          {sorted.length === 0 && !special && <p className="text-sm text-paper/70">Khay trống. Việc mới sắp tới…</p>}
          {props.queued > 0 && <p className="text-sm text-paper/70">Còn {props.queued} việc đang chờ trong hộp thư.</p>}
        </div>
        <div className="fixed inset-x-0 bottom-0 flex justify-between p-3">
          <RoundButton label="Zalo" onClick={props.onOpenZalo} badge={props.unread}>
            <PhoneIcon size={22} />
          </RoundButton>
          <RoundButton label="Hệ thống" onClick={props.onOpenSettings}>
            <GearIcon size={22} />
          </RoundButton>
        </div>
      </div>
    )
  }

  return (
    <footer className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex flex-col gap-2 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:p-4">
      {special && <div className="flex justify-center">{special}</div>}
      <div className="flex items-end gap-2 md:gap-3">
      <RoundButton label="Zalo" onClick={props.onOpenZalo} badge={props.unread}>
        <PhoneIcon size={22} />
      </RoundButton>

      <div className="pointer-events-auto flex min-w-0 flex-1 items-end gap-2 overflow-x-auto pt-3 pb-1 [scrollbar-width:none] md:justify-center">
        {sorted.map((e) => (
          <Slip key={e.id} event={e} active={e.id === props.focusedEventId} onOpen={() => props.onOpenEvent(e.id)} large={false} />
        ))}
        {props.queued > 0 && (
          <span className="paper hand shrink-0 -rotate-2 px-2 py-1 text-base text-ink-soft">+{props.queued} việc chờ</span>
        )}
      </div>

      <RoundButton label="Hệ thống" onClick={props.onOpenSettings}>
        <GearIcon size={22} />
      </RoundButton>
      </div>
    </footer>
  )
}
