// src/ui/EventSheet.tsx
// Tờ A4 giao việc: người gửi, con dấu mức độ, nội dung, các lựa chọn dạng ô đánh dấu.

import { useEffect, useState } from 'react'
import type { GameEvent } from '../types/event.types'
import type { AnchorId } from '../scene/eventLocation'
import { CONTACTS, type Contact } from '../data/contacts'
import { PRIORITY_STAMP, stripEmoji } from './format'
import { CountdownRing } from './Countdown'
import { Sheet, CloseButton } from './Sheet'
import { soundManager } from '../utils/soundManager'

const ANCHOR_SOURCE: Record<AnchorId, { contact?: Contact; place: string }> = {
  computer: { place: 'Email trên máy tính của bạn' },
  boss: { contact: CONTACTS.sep, place: 'Phòng giám đốc' },
  pm: { contact: CONTACTS.pm, place: 'Bàn PM' },
  cto: { contact: CONTACTS.cto, place: 'Cạnh tủ server' },
  it_dev: { contact: CONTACTS.it_dev, place: 'Bàn bên cạnh' },
  intern: { contact: CONTACTS.intern, place: 'Bàn thực tập sinh' },
  hr: { contact: CONTACTS.hr, place: 'Phòng nhân sự' },
  server: { place: 'Tủ server' },
  printer: { place: 'Máy in tầng 3' },
  canteen: { place: 'Pantry' },
  meeting: { place: 'Phòng họp' },
}

interface EventSheetProps {
  event: GameEvent
  anchor: AnchorId
  queueIndex: number
  queueTotal: number
  onChoose: (actionId: string) => void
  onClose: () => void
  onNext: () => void
}

export function EventSheet({ event, anchor, queueIndex, queueTotal, onChoose, onClose, onNext }: EventSheetProps) {
  const [picked, setPicked] = useState<string | null>(null)
  const source = ANCHOR_SOURCE[anchor]
  const stamp = PRIORITY_STAMP[event.priority]
  const stampColor = stamp.tone === 'stamp' ? 'text-stamp' : stamp.tone === 'pen' ? 'text-pen' : 'text-ink-soft'

  const choose = (actionId: string) => {
    if (picked) return
    setPicked(actionId)
    soundManager.playClick()
    // để kịp thấy dấu tick rồi mới gửi
    window.setTimeout(() => onChoose(actionId), 220)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) return
      const idx = Number.parseInt(e.key, 10) - 1
      if (idx >= 0 && idx < event.actions.length) {
        e.preventDefault()
        choose(event.actions[idx].id)
      } else if (e.key === 'Tab' && queueTotal > 1) {
        e.preventDefault()
        onNext()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <Sheet onClose={onClose} label={stripEmoji(event.title)}>
      <div className="relative">
        {/* đầu phiếu */}
        <div className="flex items-start justify-between gap-3 border-b-2 border-ink pb-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-ink-soft">
              {source.contact ? (
                <>
                  <span className="text-ink">{source.contact.name}</span> · {source.contact.role}
                </>
              ) : (
                source.place
              )}
            </p>
            {queueTotal > 1 && (
              <p className="mt-0.5 text-xs text-ink-faint">
                Việc {queueIndex + 1}/{queueTotal} trên bàn ·{' '}
                <button type="button" onClick={onNext} className="font-semibold text-pen underline-offset-2 hover:underline">
                  xem việc khác (Tab)
                </button>
              </p>
            )}
          </div>
          <div className="flex items-center gap-1">
            <CountdownRing eventId={event.id} />
            <CloseButton onClick={onClose} label="Để sau" />
          </div>
        </div>

        <span className={`stamp absolute top-16 right-1 text-sm ${stampColor}`}>{stamp.text}</span>

        <h2 className="mt-4 pr-24 text-xl leading-snug font-extrabold text-ink">{stripEmoji(event.title)}</h2>
        <p className="mt-3 text-[15px] leading-relaxed whitespace-pre-wrap text-ink">{stripEmoji(event.description)}</p>

        <p className="hand mt-5 text-lg text-pen">Xử lý thế nào đây?</p>
        <ol className="mt-1 space-y-2">
          {event.actions.map((action, i) => {
            const isPicked = picked === action.id
            return (
              <li key={action.id}>
                <button
                  type="button"
                  onClick={() => choose(action.id)}
                  disabled={!!picked}
                  className={`group flex w-full items-start gap-3 rounded-md border-2 px-3 py-2.5 text-left transition-colors ${
                    isPicked ? 'border-pen bg-paper-shade' : 'border-transparent hover:border-ink hover:bg-paper-shade'
                  } disabled:cursor-default`}
                >
                  <span className="relative mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border-2 border-ink bg-paper">
                    {isPicked && (
                      <svg viewBox="0 0 24 24" className="absolute -top-2 -right-2 h-8 w-8 text-pen" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                        <path d="M4 13l5 5L21 4" />
                      </svg>
                    )}
                  </span>
                  <span className="flex-1 text-[15px] leading-snug font-semibold text-ink">
                    <span className="mr-1.5 font-mono text-sm text-ink-faint">{i + 1}.</span>
                    {stripEmoji(action.label)}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
        <p className="mt-4 text-xs text-ink-faint">Bấm phím 1–{event.actions.length} để chọn nhanh. Đóng phiếu thì đồng hồ vẫn chạy.</p>
      </div>
    </Sheet>
  )
}
