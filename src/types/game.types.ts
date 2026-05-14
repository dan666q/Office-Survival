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
  stress: number      // 0–100
  energy: number      // 0–100
  reputation: number  // 0–100
  salary: number
  bugCount: number
}

export interface DaySummary {
  day: DayOfWeek
  survived: boolean
  statsSnapshot: GameStats
  eventsHandled: number
}

export interface GameState {
  profession: Profession | null
  currentDay: DayOfWeek | null
  currentTimeSlot: TimeSlot | null
  stats: GameStats
  activeBuffs: string[]
  feedLog: FeedEntry[]
  achievements: string[]
  dayHistory: DaySummary[]
  isGameOver: boolean
  gameOverReason?: string
}

export interface FeedEntry {
  id: string
  message: string
  timestamp: string
  type: 'info' | 'warning' | 'danger' | 'success'
}