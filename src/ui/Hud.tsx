// src/ui/Hud.tsx
// Thanh trên cùng: thẻ ngày/giờ như tờ lịch, ba chỉ số vẽ thành nhiệt kế – pin – xấp tiền.

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import type { GameStats } from '../types/game.types'
import { DIFFICULTY_CONFIGS } from '../data'
import { getMood } from '../utils/statCalculator'
import { DAY_LABELS, SLOT_LABELS, formatMoney, formatMoneyShort, stripEmoji } from './format'
import { BatteryIcon, CashIcon, ThermometerIcon } from './icons'

interface Delta {
  id: number
  stat: keyof GameStats
  value: number
}

let deltaSeq = 0

function useStatDeltas() {
  const [deltas, setDeltas] = useState<Delta[]>([])
  useEffect(() => {
    let prev = useGameStore.getState().stats
    const timers: number[] = []
    const unsub = useGameStore.subscribe((s) => {
      if (s.stats === prev) return
      const next: Delta[] = []
      for (const stat of ['stress', 'energy', 'salary'] as const) {
        const d = s.stats[stat] - prev[stat]
        if (d !== 0) next.push({ id: ++deltaSeq, stat, value: d })
      }
      prev = s.stats
      if (next.length === 0) return
      setDeltas((cur) => [...cur, ...next].slice(-6))
      timers.push(window.setTimeout(() => setDeltas((cur) => cur.filter((d) => !next.includes(d))), 1600))
    })
    return () => {
      unsub()
      timers.forEach(clearTimeout)
    }
  }, [])
  return deltas
}

function DeltaFloat({ deltas, stat }: { deltas: Delta[]; stat: keyof GameStats }) {
  return (
    <span className="pointer-events-none absolute -bottom-5 left-1/2 -translate-x-1/2">
      <AnimatePresence>
        {deltas
          .filter((d) => d.stat === stat)
          .map((d) => {
            // stress tăng là xấu, energy/lương tăng là tốt
            const good = stat === 'stress' ? d.value < 0 : d.value > 0
            return (
              <motion.span
                key={d.id}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 6 }}
                exit={{ opacity: 0, y: 14 }}
                className={`hand absolute left-0 -translate-x-1/2 text-lg font-bold whitespace-nowrap ${good ? 'text-mint-dark' : 'text-stamp'}`}
              >
                {d.value > 0 ? '+' : ''}
                {stat === 'salary' ? formatMoneyShort(d.value) : d.value}
              </motion.span>
            )
          })}
      </AnimatePresence>
    </span>
  )
}

function Meter({ value, danger }: { value: number; danger: boolean }) {
  return (
    <span className="mt-1 block h-1.5 w-full overflow-hidden bg-ink/10">
      <span className={`block h-full transition-[width] duration-500 ${danger ? 'bg-stamp' : 'bg-ink'}`} style={{ width: `${value}%` }} />
    </span>
  )
}

export function Hud() {
  const stats = useGameStore((s) => s.stats)
  const currentDay = useGameStore((s) => s.currentDay)
  const slot = useGameStore((s) => s.currentTimeSlot)
  const difficulty = useGameStore((s) => s.difficulty)
  const clock = useGameStore((s) => s.feedLog.at(-1)?.timestamp ?? '08:00')
  const deltas = useStatDeltas()

  const mood = getMood(stats)
  const diff = DIFFICULTY_CONFIGS.find((d) => d.id === difficulty)
  const stressDanger = stats.stress >= 80
  const energyDanger = stats.energy <= 20

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-start justify-between gap-2 p-2 md:p-4">
      {/* thẻ ngày giờ */}
      <div className="paper pointer-events-auto -rotate-1 px-3 py-2 md:px-4">
        <p className="text-sm leading-none font-extrabold text-ink md:text-base">
          {currentDay ? DAY_LABELS[currentDay] : ''}
          <span className="ml-2 font-mono text-stamp">{clock}</span>
        </p>
        <p className="mt-1 text-xs text-ink-soft">
          {slot ? SLOT_LABELS[slot] : ''}
          {diff && <span className="hidden md:inline"> · {diff.name}</span>}
        </p>
      </div>

      {/* chỉ số */}
      <div className="paper pointer-events-auto flex items-stretch gap-2 px-2 py-2 md:gap-5 md:px-4">
        <div className={`relative w-16 md:w-24 ${stressDanger ? 'animate-flicker text-stamp' : 'text-ink'}`}>
          <div className="flex items-center gap-1">
            <ThermometerIcon level={stats.stress / 100} size={20} />
            <span className="text-xs font-semibold text-ink-soft">Stress</span>
          </div>
          <p className="font-mono text-base leading-tight font-bold">{stats.stress}%</p>
          <Meter value={stats.stress} danger={stressDanger} />
          <DeltaFloat deltas={deltas} stat="stress" />
        </div>
        <div className={`relative w-16 md:w-24 ${energyDanger ? 'text-stamp' : 'text-ink'}`}>
          <div className="flex items-center gap-1">
            <BatteryIcon level={stats.energy / 100} size={20} />
            <span className="text-xs font-semibold text-ink-soft">Sức</span>
          </div>
          <p className="font-mono text-base leading-tight font-bold">{stats.energy}%</p>
          <Meter value={stats.energy} danger={energyDanger} />
          <DeltaFloat deltas={deltas} stat="energy" />
        </div>
        <div className="relative w-[72px] md:w-32">
          <div className="flex items-center gap-1 text-ink">
            <CashIcon size={20} />
            <span className="text-xs font-semibold text-ink-soft">Ví</span>
          </div>
          <p className={`font-mono text-base leading-tight font-bold ${stats.salary <= 0 ? 'text-stamp' : 'text-ink'}`}>
            <span className="md:hidden">{formatMoneyShort(stats.salary)}</span>
            <span className="hidden md:inline">{formatMoney(stats.salary)}</span>
          </p>
          <p className="hand mt-0.5 hidden truncate text-sm leading-none text-pen md:block">{stripEmoji(mood.label)}</p>
          <DeltaFloat deltas={deltas} stat="salary" />
        </div>
      </div>
    </header>
  )
}
