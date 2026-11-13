// src/ui/ZaloPhone.tsx
// Điện thoại cầm tay mở nhóm Zalo "Văn phòng Bão Táp"

import { useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { parseFeedEntry } from './feed'
import { stripEmoji } from './format'
import { useIsMobile } from './hooks'
import { CloseIcon } from './icons'

function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
      style={{ backgroundColor: color }}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}

export function ZaloPhone({ onClose, side = 'left' }: { onClose: () => void; side?: 'left' | 'right' }) {
  const feedLog = useGameStore((s) => s.feedLog)
  const messages = useMemo(() => feedLog.flatMap(parseFeedEntry), [feedLog])
  const bottom = useRef<HTMLDivElement>(null)
  const mobile = useIsMobile()

  useEffect(() => {
    bottom.current?.scrollIntoView({ block: 'end' })
  }, [messages.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.section
      role="dialog"
      aria-label="Nhóm Zalo công ty"
      initial={mobile ? { y: '100%' } : { y: 80, opacity: 0, rotate: -4 }}
      animate={mobile ? { y: 0 } : { y: 0, opacity: 1, rotate: -1.5 }}
      exit={mobile ? { y: '100%' } : { y: 80, opacity: 0, rotate: -4 }}
      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      className={
        mobile
          ? 'fixed inset-x-0 bottom-0 z-40 h-[78dvh] rounded-t-[26px] bg-[#1c1c1e] p-2 pb-0'
          : `fixed bottom-24 ${side === 'left' ? 'left-5' : 'right-5'} z-40 h-[min(640px,calc(100dvh-140px))] w-[360px] rounded-[34px] bg-[#1c1c1e] p-2.5 shadow-[0_24px_40px_-12px_rgb(0_0_0/0.6)]`
      }
    >
      <div className={`flex h-full flex-col overflow-hidden bg-[#eef0f3] ${mobile ? 'rounded-t-[20px]' : 'rounded-[26px]'}`}>
        <div className="flex items-center gap-3 bg-zalo px-4 py-3 text-white">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">Văn phòng Bão Táp (15)</p>
            <p className="truncate text-[11px] opacity-80">Sếp Messi, PM Jisoo, HR J97, Độ Mixi…</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Cất điện thoại" className="rounded-full p-1.5 hover:bg-white/15">
            <CloseIcon size={20} />
          </button>
        </div>

        <div className="flex-1 space-y-2.5 overflow-y-auto overscroll-contain px-3 py-3">
          {messages.length === 0 && <p className="mt-10 text-center text-sm text-ink-faint">Chưa ai nhắn gì. Lạ thật.</p>}
          {messages.map((m) => {
            if (m.isInfo) {
              return (
                <p key={m.id} className="mx-auto w-fit max-w-[90%] rounded-full bg-black/10 px-3 py-1 text-center text-[11px] text-ink-soft">
                  {stripEmoji(m.message)}
                </p>
              )
            }
            if (m.isSelf) {
              return (
                <div key={m.id} className="flex justify-end pl-10">
                  <div className="rounded-2xl rounded-tr-sm bg-[#d5e8ff] px-3 py-2 text-sm leading-snug text-ink">
                    {m.message}
                    <span className="mt-0.5 block text-right font-mono text-[10px] text-ink-faint">{m.timestamp}</span>
                  </div>
                </div>
              )
            }
            return (
              <div key={m.id} className="flex gap-2 pr-8">
                <Avatar initials={m.sender.initials} color={m.sender.shirt} />
                <div className="min-w-0">
                  <p className="mb-0.5 text-[11px] font-semibold text-ink-soft">{m.sender.name}</p>
                  <div
                    className={`rounded-2xl rounded-tl-sm px-3 py-2 text-sm leading-snug text-ink ${
                      m.type === 'danger' ? 'bg-[#fde2e0]' : m.type === 'warning' ? 'bg-[#fdf1cf]' : 'bg-white'
                    }`}
                  >
                    {m.message}
                    <span className="mt-0.5 block font-mono text-[10px] text-ink-faint">{m.timestamp}</span>
                  </div>
                </div>
              </div>
            )
          })}
          <div ref={bottom} />
        </div>

        <div className="flex items-center gap-2 border-t border-black/10 bg-white px-3 py-2.5 pb-[max(0.6rem,env(safe-area-inset-bottom))]">
          <span className="flex-1 rounded-full bg-[#eef0f3] px-3 py-1.5 text-sm text-ink-faint">Đang bận, nhắn sau…</span>
        </div>
      </div>
    </motion.section>
  )
}
