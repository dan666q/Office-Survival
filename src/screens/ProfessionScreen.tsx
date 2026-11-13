// src/screens/ProfessionScreen.tsx
// Chọn nghề: lật qua từng "hồ sơ vị trí", văn phòng 3D phía sau đổi theo. Chọn xong thì ký hợp đồng (chọn cấp bậc).

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { PROFESSIONS_CONFIG } from '../store/professionRegistry'
import { DIFFICULTY_CONFIGS } from '../data'
import type { DifficultyLevel } from '../types/game.types'
import { soundManager } from '../utils/soundManager'
import { ScreenPaper } from '../ui/ScreenPaper'
import { useUiStore } from '../ui/uiStore'
import { formatMoney, stripEmoji } from '../ui/format'
import { hasOwnRoom } from '../scene/rooms/layouts'
import { ArrowIcon, BatteryIcon, CashIcon, ThermometerIcon } from '../ui/icons'

const DIFFICULTY_TONE: Record<string, string> = {
  Dễ: 'text-mint-dark border-mint-dark',
  'Trung bình': 'text-pen border-pen',
  Khó: 'text-stamp border-stamp',
}

export default function ProfessionScreen() {
  const startGame = useGameStore((s) => s.startGame)
  const goToScreen = useGameStore((s) => s.goToScreen)
  const setPreview = useUiStore((s) => s.setPreviewProfession)

  const [index, setIndex] = useState(() => Math.max(0, PROFESSIONS_CONFIG.findIndex((p) => p.id === 'it')))
  const [step, setStep] = useState<'browse' | 'contract'>('browse')
  const [level, setLevel] = useState<DifficultyLevel>('junior')
  const [signing, setSigning] = useState(false)

  const job = PROFESSIONS_CONFIG[index]

  // Văn phòng 3D phía sau đổi theo hồ sơ đang xem (đồng bộ ra store ngoài React)
  useEffect(() => {
    setPreview(job?.id ?? null)
  }, [job?.id, setPreview])
  useEffect(() => () => setPreview(null), [setPreview])

  const move = (d: number) => {
    soundManager.playClick()
    setIndex((i) => (i + d + PROFESSIONS_CONFIG.length) % PROFESSIONS_CONFIG.length)
  }

  useEffect(() => {
    if (step !== 'browse') return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') move(1)
      if (e.key === 'ArrowLeft') move(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (!job) return null

  const sign = () => {
    if (signing) return
    soundManager.playClick()
    setSigning(true)
    window.setTimeout(() => startGame(job.id, level), 900)
  }

  return (
    <ScreenPaper width={480} tilt={-0.6}>
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          className="text-sm font-semibold text-ink-soft hover:text-ink"
          onClick={() => {
            soundManager.playClick()
            if (step === 'contract') setStep('browse')
            else goToScreen('start')
          }}
        >
          ← {step === 'contract' ? 'Xem vị trí khác' : 'Về sảnh'}
        </button>
        <p className="font-mono text-sm text-ink-faint">
          Hồ sơ {index + 1}/{PROFESSIONS_CONFIG.length}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {step === 'browse' ? (
          <motion.div key={`job-${job.id}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.18 }}>
            <p className="mt-4 text-sm font-semibold text-ink-soft">Tuyển gấp · Vị trí</p>
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-4xl leading-tight font-extrabold text-ink">{stripEmoji(job.name)}</h1>
              <span className={`stamp mt-2 shrink-0 text-sm ${DIFFICULTY_TONE[job.difficulty] ?? ''}`}>{job.difficulty.toUpperCase()}</span>
            </div>
            <p className="mt-2 text-base leading-relaxed text-ink">{stripEmoji(job.tagline)}</p>
            <p className="mt-3 text-sm text-ink-soft">
              <b className="text-ink">Kẻ thù:</b> {stripEmoji(job.enemy)}
            </p>

            <div className="mt-5 grid grid-cols-3 gap-3 border-y-2 border-ink py-3 text-sm">
              <div>
                <ThermometerIcon size={20} level={job.startingStats.stress / 100} />
                <p className="text-ink-soft">Stress đầu tuần</p>
                <p className="font-mono text-lg font-bold">{job.startingStats.stress}%</p>
              </div>
              <div>
                <BatteryIcon size={20} level={job.startingStats.energy / 100} />
                <p className="text-ink-soft">Sức đầu tuần</p>
                <p className="font-mono text-lg font-bold">{job.startingStats.energy}%</p>
              </div>
              <div>
                <CashIcon size={20} />
                <p className="text-ink-soft">Lương/ngày</p>
                <p className="font-mono text-lg font-bold">{formatMoney(job.dailySalary)}</p>
              </div>
            </div>

            {!hasOwnRoom(job.id) && (
              <p className="hand mt-4 -rotate-1 bg-note px-3 py-2 text-base text-ink">
                Văn phòng của vị trí này đang sửa chữa. Tạm ngồi chung tầng với team IT nhé.
              </p>
            )}

            <div className="mt-6 flex items-center gap-2">
              <button type="button" aria-label="Hồ sơ trước" className="btn-ink !px-3" onClick={() => move(-1)}>
                <ArrowIcon size={20} className="rotate-180" />
              </button>
              <button type="button" aria-label="Hồ sơ sau" className="btn-ink !px-3" onClick={() => move(1)}>
                <ArrowIcon size={20} />
              </button>
              <button
                type="button"
                className="btn-ink btn-stamp ml-auto"
                onClick={() => {
                  soundManager.playClick()
                  setStep('contract')
                }}
              >
                Nhận việc này
              </button>
            </div>

            {/* dãy tab hồ sơ */}
            <div className="mt-5 flex flex-wrap gap-1.5">
              {PROFESSIONS_CONFIG.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    soundManager.playClick()
                    setIndex(i)
                  }}
                  className={`rounded-sm border-2 px-2 py-1 text-xs font-semibold ${
                    i === index ? 'border-ink bg-ink text-paper' : 'border-paper-line text-ink-soft hover:border-ink hover:text-ink'
                  }`}
                >
                  {stripEmoji(p.name)}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="contract" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <p className="mt-4 text-center text-sm font-bold text-ink">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
            <p className="text-center text-xs text-ink-soft">Độc lập – Tự do – Hạnh phúc (trừ thứ Bảy)</p>
            <h1 className="mt-4 text-center text-2xl font-extrabold text-ink">HỢP ĐỒNG LAO ĐỘNG</h1>
            <p className="mt-1 text-center text-sm text-ink-soft">Vị trí: {stripEmoji(job.name)}</p>

            <p className="mt-5 text-sm font-semibold text-ink">Điều 1. Cấp bậc (đánh dấu một ô)</p>
            <div className="mt-2 space-y-2" role="radiogroup">
              {DIFFICULTY_CONFIGS.map((d) => {
                const checked = level === d.id
                return (
                  <button
                    key={d.id}
                    type="button"
                    role="radio"
                    aria-checked={checked}
                    onClick={() => {
                      soundManager.playClick()
                      setLevel(d.id)
                    }}
                    className={`flex w-full items-start gap-3 rounded-md border-2 px-3 py-2 text-left ${checked ? 'border-pen bg-paper-shade' : 'border-transparent hover:border-ink'}`}
                  >
                    <span className="relative mt-0.5 h-5 w-5 shrink-0 border-2 border-ink">
                      {checked && (
                        <svg viewBox="0 0 24 24" className="absolute -top-2 -right-2 h-7 w-7 text-pen" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                          <path d="M4 13l5 5L21 4" />
                        </svg>
                      )}
                    </span>
                    <span>
                      <span className="block font-bold text-ink">{d.name}</span>
                      <span className="block text-sm leading-snug text-ink-soft">{stripEmoji(d.description)}</span>
                    </span>
                  </button>
                )
              })}
            </div>

            <p className="mt-5 text-sm font-semibold text-ink">Điều 2. Người lao động cam kết sống sót đến hết ca thứ Bảy.</p>

            <div className="mt-6 flex items-end justify-between gap-4">
              <div className="flex-1">
                <p className="text-xs text-ink-soft">Người lao động ký tên</p>
                <div className="relative h-12 border-b-2 border-dotted border-ink">
                  {signing && (
                    <motion.span
                      initial={{ clipPath: 'inset(0 100% 0 0)' }}
                      animate={{ clipPath: 'inset(0 0% 0 0)' }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                      className="hand absolute bottom-1 left-2 text-3xl text-pen"
                    >
                      Nhân Viên Mới
                    </motion.span>
                  )}
                </div>
              </div>
              <button type="button" className="btn-ink btn-stamp" onClick={sign} disabled={signing}>
                Ký hợp đồng
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenPaper>
  )
}
