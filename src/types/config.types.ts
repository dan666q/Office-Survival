import type { DayOfWeek, TimeSlot } from './game.types'

export interface TimeSlotConfig {
  slot: TimeSlot
  label: string
  displayName: string
  eventCount: number | [number, number]
  energyDrain: number
  canSkip?: boolean
}

export interface DayConfig {
  day: DayOfWeek
  title: string
  description: string
  eventTimer: number
  newEventInterval: number
  concurrent: boolean
  timeSlots: TimeSlotConfig[]
  statModifiers: {
    stressRate: number
    energyDrainRate: number
  }
}