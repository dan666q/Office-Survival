import type { Profession, TimeSlot } from "./game.types"

export type StatKey = 'stress' | 'energy' | 'reputation' | 'salary' | 'bugCount'
export type Priority = 'low' | 'medium' | 'high' | 'critical'

export interface StatEffect {
  stat: StatKey
  value: number
  reason?: string
}

export interface ChainEvent {
  eventId: string
  delay?: number
}

export interface Action {
  id: string
  label: string
  effects: StatEffect[]
  chainEvents?: ChainEvent[]
  feedMessage: string
}

export interface GameEvent {
  id: string
  title: string
  description: string
  priority: Priority
  professions: Profession[]
  timeSlots?: TimeSlot[]
  actions: Action[]
}