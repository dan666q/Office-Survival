import type { Profession, TimeSlot } from './game.types'

export type StatKey = 'stress' | 'energy' | 'salary'
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

export interface StatRequirement {
  stat: StatKey
  op: 'gt' | 'lt' | 'gte' | 'lte'
  value: number
}

export interface Requirements {
  stats?: StatRequirement[]
  flags?: Record<string, boolean>
  days?: import('./game.types').DayOfWeek[]
}

export interface ChatReply {
  senderId: 'sep' | 'pm' | 'hr' | 'intern' | 'cto' | 'mkt' | 'design' | 'ba' | 'sales' | 'it_dev' | 'accounting' | 'seo' | 'legal' | 'admin' | 'self'
  message: string
}

export interface Action {
  id: string
  label: string
  effects: StatEffect[]
  chainEvents?: ChainEvent[]
  feedMessage: string
  // Dynamic RPG coupling features:
  requirements?: Omit<Requirements, 'days'>
  setFlags?: Record<string, boolean>
  chatReplies?: ChatReply[]
}

export interface GameEvent {
  id: string
  title: string
  description: string
  priority: Priority
  professions: Profession[]
  timeSlots?: TimeSlot[]
  actions: Action[]
  // Dynamic event requirements:
  requirements?: Requirements
}