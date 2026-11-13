// src/ui/ScenePins.tsx
// Giấy note ghim trên đầu đồng nghiệp/đồ vật đang có việc, và bong bóng chat khi ai đó nhắn nhóm.

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { GameEvent, Priority } from '../types/event.types'
import type { AnchorId } from '../scene/eventLocation'
import type { RoomLayout } from '../scene/rooms/layouts'
import type { Vec3 } from '../scene/props/basic'
import { registerPin } from '../scene/pins'
import { useGameStore } from '../store/gameStore'
import { parseFeedEntry } from './feed'
import { PRIORITY_ORDER, stripEmoji } from './format'
import { useRemaining } from './hooks'
import type { ContactId } from '../data/contacts'

const NOTE_COLOR: Record<Priority, string> = {
  critical: 'bg-note-pink',
  high: 'bg-note',
  medium: 'bg-note',
  low: 'bg-note-green',
}

/** Phần tử DOM bám theo một điểm 3D */
function Pinned({ pinKey, world, clampToEdge, children, className = '' }: { pinKey: string; world: Vec3; clampToEdge: boolean; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [x, y, z] = world
  useEffect(() => {
    if (!ref.current) return
    return registerPin(pinKey, { el: ref.current, world: [x, y, z], clampToEdge })
  }, [pinKey, x, y, z, clampToEdge])
  return (
    <div ref={ref} className={`group absolute top-0 left-0 will-change-transform ${className}`} style={{ transform: 'translate3d(-999px,-999px,0)' }}>
      {children}
    </div>
  )
}

function NoteTimerBar({ eventId }: { eventId: string }) {
  const { ratio } = useRemaining(eventId)
  return (
    <span className="mt-1 block h-1 w-full bg-ink/15">
      <span className={`block h-full ${ratio < 0.3 ? 'bg-stamp' : 'bg-ink'}`} style={{ width: `${ratio * 100}%` }} />
    </span>
  )
}

interface EventPinsProps {
  room: RoomLayout
  events: GameEvent[]
  anchorOf: Map<string, AnchorId>
  focusedEventId: string | null
  onOpen: (eventId: string) => void
}

export function EventPins({ room, events, anchorOf, focusedEventId, onOpen }: EventPinsProps) {
  const groups = new Map<AnchorId, GameEvent[]>()
  for (const e of events) {
    const a = anchorOf.get(e.id)
    if (!a) continue
    const list = groups.get(a) ?? []
    list.push(e)
    groups.set(a, list)
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {[...groups.entries()].map(([anchor, list]) => {
        const world = room.anchors[anchor]
        if (!world) return null
        const sorted = [...list].sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])
        const top = sorted[0]
        const isFocused = sorted.some((e) => e.id === focusedEventId)
        return (
          <Pinned key={anchor} pinKey={`event-${anchor}`} world={world} clampToEdge>
            <button
              type="button"
              onClick={() => onOpen(top.id)}
              className={`pointer-events-auto relative block w-40 -translate-x-1/2 -translate-y-full text-left transition-transform duration-150 hover:-rotate-1 hover:scale-105 group-data-[off=true]:w-28 ${
                isFocused ? 'scale-105' : ''
              }`}
              style={{ rotate: `${(anchor.length % 5) - 2}deg` }}
            >
              {/* mũi tên chỉ hướng khi nằm ngoài khung nhìn */}
              <span
                className="absolute top-1/2 left-1/2 hidden h-0 w-0 group-data-[off=true]:block"
                style={{ transform: 'rotate(var(--arrow-angle, 0rad)) translateX(64px)' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" className="-translate-y-1/2 text-stamp" fill="currentColor">
                  <path d="M4 4l16 8-16 8 4-8Z" />
                </svg>
              </span>
              <span className={`paper block px-2.5 pt-3 pb-2 ${NOTE_COLOR[top.priority]} ${top.priority === 'critical' ? 'animate-pulse' : ''}`}>
                <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-stamp shadow" />
                <span className="hand line-clamp-2 block text-[15px] leading-tight text-ink group-data-[off=true]:line-clamp-1">
                  {stripEmoji(top.title)}
                </span>
                <NoteTimerBar eventId={top.id} />
                {sorted.length > 1 && <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-ink text-xs font-bold text-paper">{sorted.length}</span>}
              </span>
              <span className="mx-auto block h-3 w-px bg-ink/60 group-data-[off=true]:hidden" />
            </button>
          </Pinned>
        )
      })}
    </div>
  )
}

// ===================== BONG BÓNG CHAT =====================

const CONTACT_ANCHOR: Partial<Record<ContactId, AnchorId>> = {
  sep: 'boss',
  pm: 'pm',
  cto: 'cto',
  it_dev: 'it_dev',
  intern: 'intern',
  hr: 'hr',
}

interface Bubble {
  id: string
  anchor: AnchorId | null
  name: string
  color: string
  text: string
}

/** Nghe feedLog: tin nhắn mới của đồng nghiệp hiện thành bong bóng trên đầu họ (hoặc góc màn hình nếu họ không ở trong phòng) */
export function ChatBubbles({ room, muted }: { room: RoomLayout; muted: boolean }) {
  const [bubbles, setBubbles] = useState<Bubble[]>([])

  useEffect(() => {
    // feedLog bị cắt còn 50 dòng — so theo id dòng cuối thay vì độ dài
    let lastId = useGameStore.getState().feedLog.at(-1)?.id
    const timers: number[] = []
    const unsub = useGameStore.subscribe((s) => {
      const feed = s.feedLog
      const tail = feed.at(-1)?.id
      if (tail === lastId) return
      const idx = feed.findIndex((f) => f.id === lastId)
      const added = idx >= 0 ? feed.slice(idx + 1) : feed.slice(-2)
      lastId = tail
      const msgs = added.flatMap(parseFeedEntry).filter((m) => !m.isSelf && !m.isInfo).slice(-2)
      if (msgs.length === 0) return
      const next: Bubble[] = msgs.map((m, i) => {
        const anchor = CONTACT_ANCHOR[m.sender.id] ?? null
        return {
          id: `${m.id}-${i}`,
          anchor: anchor && room.anchors[anchor] ? anchor : null,
          name: m.sender.name,
          color: m.sender.shirt,
          text: m.message,
        }
      })
      setBubbles((cur) => [...cur.filter((b) => !next.some((n) => n.anchor && n.anchor === b.anchor)), ...next].slice(-4))
      next.forEach((b, i) => {
        timers.push(
          window.setTimeout(() => setBubbles((cur) => cur.filter((x) => x.id !== b.id)), 3600 + i * 600)
        )
      })
    })
    return () => {
      unsub()
      timers.forEach(clearTimeout)
    }
  }, [room])

  if (muted) return null
  const loose = bubbles.filter((b) => !b.anchor)

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {bubbles
        .filter((b) => b.anchor)
        .map((b) => (
          <Pinned key={b.id} pinKey={`bubble-${b.id}`} world={offsetUp(room.anchors[b.anchor!]!)} clampToEdge={false} className="data-[off=true]:hidden">
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="relative max-w-[220px] -translate-x-1/2 -translate-y-full rounded-lg border-2 border-ink bg-paper px-3 py-2 text-sm leading-snug text-ink shadow-[3px_3px_0_var(--color-ink)]"
            >
              <span className="block text-xs font-bold" style={{ color: b.color }}>
                {b.name}
              </span>
              <span className="line-clamp-3">{b.text}</span>
              <span className="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-r-2 border-b-2 border-ink bg-paper" />
            </motion.div>
          </Pinned>
        ))}

      <div className="absolute top-24 left-4 flex w-64 flex-col gap-2 md:top-28">
        <AnimatePresence>
          {loose.map((b) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="rounded-lg border-2 border-ink bg-paper px-3 py-2 text-sm leading-snug text-ink shadow-[3px_3px_0_var(--color-ink)]"
            >
              <span className="block text-xs font-bold" style={{ color: b.color }}>
                {b.name} <span className="font-normal text-ink-faint">· Zalo nhóm</span>
              </span>
              <span className="line-clamp-2">{b.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

function offsetUp(v: Vec3): Vec3 {
  return [v[0], v[1] + 0.85, v[2]]
}
