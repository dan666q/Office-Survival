// src/store/gameHelpers.ts

import type { DayOfWeek, TimeSlot, GameStats } from '../types/game.types'
import type { GameEvent } from '../types/event.types'
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

export function randomEvents(
  allEvents: GameEvent[],
  timeSlot: TimeSlot,
  count: number | [number, number],
  usedEventIds: string[] = []
): GameEvent[] {
  const eligible = allEvents.filter(e =>
    (!e.timeSlots || e.timeSlots.includes(timeSlot)) &&
    !usedEventIds.includes(e.id)
  )
  const n = Array.isArray(count)
    ? Math.floor(Math.random() * (count[1] - count[0] + 1)) + count[0]
    : count
  const shuffled = [...eligible].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(n, shuffled.length))
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
