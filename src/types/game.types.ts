export type Profession = string

export interface Buff {
  id: string
  name: string
  description: string
  cost: number
  professions?: Profession[]
  effects: {
    stat: 'stress' | 'energy' | 'salary'
    value: number
  }[]
  duration: 'permanent' | 'day' | 'timeslot'
  icon: string
  chatReplies?: import('./event.types').ChatReply[]
}

export interface ProfessionConfig {
  id: string
  name: string
  emoji: string
  tagline: string
  difficulty: 'Dễ' | 'Trung bình' | 'Khó'
  enemy: string
  startingStats: GameStats
  dailySalary: number
  uniqueBuffIds: string[]
}

export interface ProfessionPack {
  config: Omit<ProfessionConfig, 'uniqueBuffIds'> & { uniqueBuffIds?: string[] }
  buffs: Buff[]
  events: import('./event.types').GameEvent[]
}

export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'

export type TimeSlot =
  | 'morning_start'
  | 'morning'
  | 'lunch'
  | 'afternoon'
  | 'end_of_day'
  | 'overtime'

export interface GameStats {
  stress: number   // 0–100, thua khi = 100
  energy: number   // 0–100, thua khi = 0
  salary: number   // tổng lương tích lũy
}

export interface DaySummary {
  day: DayOfWeek
  survived: boolean
  statsSnapshot: GameStats
  salaryEarned: number
  eventsHandled: number
}

export interface FeedEntry {
  id: string
  message: string
  timestamp: string
  type: 'info' | 'warning' | 'danger' | 'success'
  chatReplies?: import('./event.types').ChatReply[]
}