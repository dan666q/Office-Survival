import type { DayOfWeek, TimeSlot } from './game.types'

export interface TimeSlotConfig {
  slot: TimeSlot
  label: string           // "08:00 – 09:00"
  displayName: string     // "Vào ca"
  eventCount: number | [number, number]  // số cố định hoặc [min, max]
  energyDrain: number
  canSkip?: boolean
}

export interface DayConfig {
  day: DayOfWeek
  title: string           // "Thứ Hai Kinh Hoàng"
  description: string
  eventTimer: number      // giây mỗi event
  concurrent: boolean     // có 2 event cùng lúc không
  timeSlots: TimeSlotConfig[]
  statModifiers: {
    stressRate: number
    energyDrainRate: number
  }
}