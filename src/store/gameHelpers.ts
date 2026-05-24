// src/store/gameHelpers.ts

import type { DayOfWeek, TimeSlot, GameStats } from '../types/game.types'
import type { GameEvent, StatRequirement } from '../types/event.types'
import {
  PROFESSIONS_CONFIG,
  getEventsForProfession,
  getStartingStats
} from './professionRegistry'

export { PROFESSIONS_CONFIG, getEventsForProfession, getStartingStats }

export const DAY_ORDER: DayOfWeek[] = [
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'
]

export const TIMESLOT_ORDER: TimeSlot[] = [
  'morning_start', 'morning', 'lunch', 'afternoon', 'end_of_day', 'overtime'
]

export const DEFAULT_STATS: GameStats = {
  stress: 0,
  energy: 100,
  salary: 500000,
}

export const LUNCH_BUFF_LIMIT = 2
export const MAX_ACTIVE_EVENTS = 3
export const TIMEOUT_STRESS = 25
export const TIMEOUT_ENERGY = -15
export const TIMEOUT_SALARY = -200000

export const SLOT_START_MINUTES: Record<string, number> = {
  morning_start: 8 * 60,
  morning:       9 * 60,
  lunch:         12 * 60,
  afternoon:     13 * 60,
  end_of_day:    17 * 60,
  overtime:      19 * 60,
}

export const SLOT_END_MINUTES: Record<string, number> = {
  morning_start: 9 * 60,
  morning:       12 * 60,
  lunch:         13 * 60,
  afternoon:     17 * 60,
  end_of_day:    19 * 60,
  overtime:      22 * 60,
}

let currentMinutes = 8 * 60

export function initSlotTime(slot: string) {
  currentMinutes = SLOT_START_MINUTES[slot] ?? 8 * 60
}

export function getNextTime(slot: string | null): string {
  const max = SLOT_END_MINUTES[slot ?? 'morning_start'] ?? 9 * 60
  currentMinutes += Math.floor(Math.random() * 10) + 5
  if (currentMinutes > max) currentMinutes = max
  const h = Math.floor(currentMinutes / 60)
  const m = currentMinutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

// Handled dynamically by re-exports from ./professionRegistry

export function checkRequirement(
  reqs: { stats?: StatRequirement[]; flags?: Record<string, boolean> },
  stats: GameStats,
  flags: Record<string, boolean>
): boolean {
  if (reqs.stats) {
    for (const r of reqs.stats) {
      const val = stats[r.stat]
      if (r.op === 'gt' && !(val > r.value)) return false
      if (r.op === 'lt' && !(val < r.value)) return false
      if (r.op === 'gte' && !(val >= r.value)) return false
      if (r.op === 'lte' && !(val <= r.value)) return false
    }
  }
  if (reqs.flags) {
    for (const [f, val] of Object.entries(reqs.flags)) {
      if (!!flags[f] !== val) return false
    }
  }
  return true
}

export function randomEvents(
  allEvents: GameEvent[],
  timeSlot: TimeSlot,
  count: number | [number, number],
  usedEventIds: string[] = [],
  weeklyEventCounts: Record<string, number> = {},
  stats?: GameStats,
  flags?: Record<string, boolean>,
  currentDay?: DayOfWeek | null
): GameEvent[] {
  const n = Array.isArray(count)
    ? Math.floor(Math.random() * (count[1] - count[0] + 1)) + count[0]
    : count

  if (n <= 0) return []

  const selectedEvents: GameEvent[] = []
  const selectedIds = new Set<string>(usedEventIds)

  // Step 1: Relax weekly limits step-by-step to fill the required count (from < 2 to < 10)
  for (let limit = 2; limit <= 10; limit++) {
    if (selectedEvents.length >= n) break

    const eligible = allEvents.filter(e => {
      if (selectedIds.has(e.id)) return false
      
      const matchesSlot = !e.timeSlots || e.timeSlots.includes(timeSlot)
      const notWeeklyDepleted = (weeklyEventCounts[e.id] ?? 0) < limit
      if (!matchesSlot || !notWeeklyDepleted) return false

      if (e.requirements) {
        if (currentDay && e.requirements.days && !e.requirements.days.includes(currentDay)) return false
        if (stats && flags && !checkRequirement(e.requirements, stats, flags)) return false
      }
      return true
    })

    const shuffled = [...eligible].sort(() => Math.random() - 0.5)
    const needed = n - selectedEvents.length
    const pool = shuffled.slice(0, needed)
    
    pool.forEach(e => {
      selectedEvents.push(e)
      selectedIds.add(e.id)
    })
  }

  // Step 2: Last-resort fallback — ignore stats/flags requirements if still not enough
  if (selectedEvents.length < n) {
    const eligibleWithoutReqs = allEvents.filter(e => {
      if (selectedIds.has(e.id)) return false
      const matchesSlot = !e.timeSlots || e.timeSlots.includes(timeSlot)
      if (!matchesSlot) return false
      
      if (e.requirements && currentDay && e.requirements.days && !e.requirements.days.includes(currentDay)) return false
      return true
    })

    const shuffled = [...eligibleWithoutReqs].sort(() => Math.random() - 0.5)
    const needed = n - selectedEvents.length
    const pool = shuffled.slice(0, needed)
    
    pool.forEach(e => {
      selectedEvents.push(e)
      selectedIds.add(e.id)
    })
  }

  return selectedEvents
}

export function getNextDay(current: DayOfWeek | null): DayOfWeek | null {
  if (!current) return 'monday'
  const idx = DAY_ORDER.indexOf(current)
  return idx < DAY_ORDER.length - 1 ? DAY_ORDER[idx + 1] : null
}

export function getNextTimeSlot(current: TimeSlot | null): TimeSlot | null {
  if (!current) return 'morning_start'
  const idx = TIMESLOT_ORDER.indexOf(current)
  return idx < TIMESLOT_ORDER.length - 1 ? TIMESLOT_ORDER[idx + 1] : null
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 9)
}

export function clampStat(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value))
}
