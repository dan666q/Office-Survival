// src/screens/DayTransitionScreen.tsx
// Xé tờ lịch bloc sang ngày mới.

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { DAYS_CONFIG } from '../data'
import { DAY_LABELS, DAY_NUMBER, stripEmoji } from '../ui/format'
import type { DayOfWeek } from '../types/game.types'

interface DayTransitionScreenProps {
  onComplete: () => void
}

const PREV: Record<DayOfWeek, DayOfWeek> = {
  monday: 'monday',
  tuesday: 'monday',
  wednesday: 'tuesday',
  thursday: 'wednesday',
  friday: 'thursday',
  saturday: 'friday',
}

function CalendarPage({ day }: { day: DayOfWeek }) {
  return (
    <div className="paper flex h-full w-full flex-col overflow-hidden rounded-sm">
      <div className="bg-stamp py-2 text-center text-lg font-bold text-paper">THÁNG 10</div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <span className={`text-[120px] leading-none font-extrabold ${day === 'saturday' ? 'text-stamp' : 'text-ink'}`}>{DAY_NUMBER[day] + 18}</span>
        <span className="mt-1 text-2xl font-semibold text-ink">{DAY_LABELS[day]}</span>
      </div>
    </div>
  )
}

export default function DayTransitionScreen({ onComplete }: DayTransitionScreenProps) {
  const currentDay = useGameStore((s) => s.currentDay) ?? 'monday'
  const config = DAYS_CONFIG.find((d) => d.day === currentDay)

  useEffect(() => {
    const timer = setTimeout(onComplete, 2200)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-6 bg-night/55 px-6" onClick={onComplete}>
      <div className="relative h-[300px] w-[240px]">
        <CalendarPage day={currentDay} />
        {/* tờ hôm qua bị xé */}
        <motion.div
          className="absolute inset-0"
          initial={{ rotate: 0, y: 0, opacity: 1 }}
          animate={{ rotate: -24, y: 420, x: -60, opacity: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.5, 0, 0.75, 0] }}
          style={{ transformOrigin: '10% 0%' }}
        >
          <CalendarPage day={PREV[currentDay]} />
        </motion.div>
        <span className="absolute -top-2 left-1/2 h-4 w-28 -translate-x-1/2 rounded-sm bg-ink" />
      </div>
      {config && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="text-center">
          <p className="text-2xl font-extrabold text-paper">{config.title}</p>
          <p className="hand mt-1 text-xl text-note">{stripEmoji(config.description)}</p>
        </motion.div>
      )}
    </div>
  )
}
