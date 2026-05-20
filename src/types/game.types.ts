export type Profession = 'it' | 'seo_bds' | 'ke_toan'

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
}