// src/store/gameStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Profession, DayOfWeek, TimeSlot, GameStats, FeedEntry, DaySummary } from '../types/game.types'
import type { GameEvent } from '../types/event.types'
import { IT_EVENTS, SEO_EVENTS, KETOAN_EVENTS } from '../data'
import { DAYS_CONFIG } from '../data'
import { BUFFS } from '../data/buffs.data'
import { PROFESSIONS_CONFIG } from '../data/professions.config'

const DAY_ORDER: DayOfWeek[] = [
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'
]

const TIMESLOT_ORDER: TimeSlot[] = [
  'morning_start', 'morning', 'lunch', 'afternoon', 'end_of_day', 'overtime'
]

const DEFAULT_STATS: GameStats = {
  stress: 0,
  energy: 100,
  reputation: 60,
  salary: 0,
  bugCount: 0,
}

// ==================== HELPERS ====================
function getEventsForProfession(profession: Profession): GameEvent[] {
  switch (profession) {
    case 'it': return IT_EVENTS
    case 'seo_bds': return SEO_EVENTS
    case 'ke_toan': return KETOAN_EVENTS
    default: return []
  }
}

function getStartingStats(profession: Profession): GameStats {
  const config = PROFESSIONS_CONFIG.find(p => p.id === profession)
  return config?.startingStats ?? DEFAULT_STATS
}

function randomEvents(
  allEvents: GameEvent[],
  timeSlot: TimeSlot,
  count: number | [number, number]
): GameEvent[] {
  const eligible = allEvents.filter(e =>
    !e.timeSlots || e.timeSlots.includes(timeSlot)
  )

  const n = Array.isArray(count)
    ? Math.floor(Math.random() * (count[1] - count[0] + 1)) + count[0]
    : count

  const shuffled = [...eligible].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(n, shuffled.length))
}

function getNextDay(current: DayOfWeek | null): DayOfWeek | null {
  if (!current) return 'monday'
  const idx = DAY_ORDER.indexOf(current)
  return idx < DAY_ORDER.length - 1 ? DAY_ORDER[idx + 1] : null
}

function getNextTimeSlot(current: TimeSlot | null): TimeSlot | null {
  if (!current) return 'morning_start'
  const idx = TIMESLOT_ORDER.indexOf(current)
  return idx < TIMESLOT_ORDER.length - 1 ? TIMESLOT_ORDER[idx + 1] : null
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 9)
}

function getCurrentTime(): string {
  const hours = ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18']
  const mins = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55']
  return `${hours[Math.floor(Math.random() * hours.length)]}:${mins[Math.floor(Math.random() * mins.length)]}`
}

function clampStat(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value))
}

// ==================== STORE ====================
interface GameStore {
  screen: 'start' | 'profession' | 'game' | 'daily_summary' | 'game_over' | 'victory'
  profession: Profession | null
  currentDay: DayOfWeek | null
  currentTimeSlot: TimeSlot | null
  stats: GameStats
  activeBuffs: string[]
  eventQueue: GameEvent[]
  activeEvents: GameEvent[]
  feedLog: FeedEntry[]
  achievements: string[]
  dayHistory: DaySummary[]
  isGameOver: boolean
  gameOverReason?: string
  slotEventsRemaining: number

  goToScreen: (screen: GameStore['screen']) => void
  startGame: (profession: Profession) => void
  restartGame: () => void

  selectAction: (eventId: string, actionId: string) => void
  nextEvent: () => void
  nextTimeSlot: () => void
  nextDay: (restChoice: 'sleep' | 'beer' | 'overtime') => void

  applyStatEffects: (effects: { stat: keyof GameStats; value: number }[]) => void
  addFeedEntry: (message: string, type?: FeedEntry['type']) => void
  buyBuff: (buffId: string) => void
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      screen: 'start',
      profession: null,
      currentDay: null,
      currentTimeSlot: null,
      stats: DEFAULT_STATS,
      activeBuffs: [],
      eventQueue: [],
      activeEvents: [],
      feedLog: [],
      achievements: [],
      dayHistory: [],
      isGameOver: false,
      gameOverReason: undefined,
      slotEventsRemaining: 0,

      goToScreen: (screen) => set({ screen }),

      startGame: (profession) => {
        // ... (giữ nguyên logic startGame của bạn)
        const stats = getStartingStats(profession)
        const firstDay: DayOfWeek = 'monday'
        const firstSlot: TimeSlot = 'morning_start'
        const dayConfig = DAYS_CONFIG.find(d => d.day === firstDay)!
        const slotConfig = dayConfig.timeSlots.find(s => s.slot === firstSlot)!
        const allEvents = getEventsForProfession(profession)
        const queue = randomEvents(allEvents, firstSlot, slotConfig.eventCount)

        set({
          screen: 'game',
          profession,
          currentDay: firstDay,
          currentTimeSlot: firstSlot,
          stats,
          activeBuffs: [],
          eventQueue: queue.slice(1),
          activeEvents: [queue[0]].filter(Boolean),
          feedLog: [{
            id: generateId(),
            message: 'Tuần làm việc bắt đầu. Chúc may mắn. Bạn sẽ cần nó. 🙂',
            timestamp: '08:00',
            type: 'info',
          }],
          achievements: [],
          dayHistory: [],
          isGameOver: false,
          gameOverReason: undefined,
          slotEventsRemaining: queue.length,
        })
      },

      restartGame: () => set({
        screen: 'start',
        profession: null,
        currentDay: null,
        currentTimeSlot: null,
        stats: DEFAULT_STATS,
        activeBuffs: [],
        eventQueue: [],
        activeEvents: [],
        feedLog: [],
        achievements: [],
        dayHistory: [],
        isGameOver: false,
        gameOverReason: undefined,
        slotEventsRemaining: 0,
      }),

      buyBuff: (buffId: string) => {
        const { stats, activeBuffs } = get()
        const buff = BUFFS.find(b => b.id === buffId)
        if (!buff) return

        if (stats.salary < buff.cost) {
          get().addFeedEntry(`Không đủ tiền mua ${buff.name}`, 'warning')
          return
        }

        const newStats = { ...stats }
        buff.effects.forEach(({ stat, value }) => {
          if (stat === 'salary' || stat === 'bugCount') {
            (newStats as any)[stat] += value
          } else {
            (newStats as any)[stat] = clampStat((newStats as any)[stat] + value)
          }
        })

        set({
          stats: newStats,
          activeBuffs: [...activeBuffs, buffId],
        })

        get().addFeedEntry(`Đã mua ${buff.name} thành công!`, 'success')
      },

      applyStatEffects: (effects) => {
        const { stats } = get()
        const newStats = { ...stats }

        effects.forEach(({ stat, value }) => {
          if (stat === 'salary' || stat === 'bugCount') {
            newStats[stat] = Math.max(0, newStats[stat] + value)
          } else {
            newStats[stat] = clampStat(newStats[stat] + value)
          }
        })

        if (newStats.stress >= 100) {
          set({
            stats: newStats,
            screen: 'game_over',
            isGameOver: true,
            gameOverReason: 'Stress đạt 100%. Bạn burnout hoàn toàn 💀',
          })
          return
        }
        if (newStats.energy <= 0) {
          set({
            stats: newStats,
            screen: 'game_over',
            isGameOver: true,
            gameOverReason: 'Năng lượng cạn kiệt. Bạn ngủ gục tại bàn làm việc 😴',
          })
          return
        }

        set({ stats: newStats })
      },

      addFeedEntry: (message: string, type: FeedEntry['type'] = 'info') => {
        const { feedLog } = get()
        const entry: FeedEntry = {
          id: generateId(),
          message,
          timestamp: getCurrentTime(),
          type,
        }
        set({ feedLog: [...feedLog, entry].slice(-50) })
      },

      selectAction: (eventId, actionId) => {
        // ... giữ nguyên code của bạn (đã ổn)
        const { activeEvents, profession } = get()
        const event = activeEvents.find(e => e.id === eventId)
        if (!event) return

        const action = event.actions.find(a => a.id === actionId)
        if (!action) return

        get().applyStatEffects(action.effects)
        get().addFeedEntry(action.feedMessage, 'info')

        const remaining = activeEvents.filter(e => e.id !== eventId)
        set({ activeEvents: remaining })

        if (action.chainEvents && action.chainEvents.length > 0) {
          const allEvents = getEventsForProfession(profession!)
          const chained = action.chainEvents
            .map(c => allEvents.find(e => e.id === c.eventId))
            .filter(Boolean) as GameEvent[]

          if (chained.length > 0) {
            setTimeout(() => {
              set({ eventQueue: [...chained, ...get().eventQueue] })
              get().nextEvent()
            }, action.chainEvents[0].delay ?? 1500)
            return
          }
        }

        if (remaining.length === 0) get().nextEvent()
      },

      nextEvent: () => {
        const { eventQueue, slotEventsRemaining } = get()
        if (eventQueue.length > 0) {
          const [next, ...rest] = eventQueue
          set({
            activeEvents: [next],
            eventQueue: rest,
            slotEventsRemaining: slotEventsRemaining - 1,
          })
        } else {
          get().nextTimeSlot()
        }
      },

      nextTimeSlot: () => {
        const { currentDay, currentTimeSlot, profession, stats } = get()
        if (!currentDay || !currentTimeSlot || !profession) return

        const nextSlot = getNextTimeSlot(currentTimeSlot)

        if (!nextSlot || currentTimeSlot === 'end_of_day') {
          const summary: DaySummary = {
            day: currentDay,
            survived: true,
            statsSnapshot: { ...stats },
            eventsHandled: 0,
          }
          set({
            screen: 'daily_summary',
            dayHistory: [...get().dayHistory, summary],
          })
          return
        }

        const dayConfig = DAYS_CONFIG.find(d => d.day === currentDay)!
        const slotConfig = dayConfig.timeSlots.find(s => s.slot === nextSlot)!
        const allEvents = getEventsForProfession(profession)
        const newQueue = randomEvents(allEvents, nextSlot, slotConfig.eventCount)

        const newEnergy = clampStat(stats.energy - slotConfig.energyDrain)
        const newStats = { ...stats, energy: newEnergy }

        if (newEnergy <= 0) {
          set({
            stats: newStats,
            screen: 'game_over',
            isGameOver: true,
            gameOverReason: 'Năng lượng cạn kiệt. Bạn ngủ gục tại bàn làm việc. 😴',
          })
          return
        }

        get().addFeedEntry(`Bước vào khung giờ: ${slotConfig.displayName}`, 'info')

        set({
          currentTimeSlot: nextSlot,
          stats: newStats,
          eventQueue: newQueue.slice(1),
          activeEvents: [newQueue[0]].filter(Boolean),
          slotEventsRemaining: newQueue.length,
        })
      },

      nextDay: (restChoice) => {
        // ... giữ nguyên code nextDay của bạn
        const { currentDay, stats, profession } = get()
        if (!currentDay || !profession) return

        const restEffects = {
          sleep:    { energy: +30, stress: -15 },
          beer:     { energy: +15, stress: +10 },
          overtime: { energy: +5,  stress: +15, salary: +500000 },
        }
        const effect = restEffects[restChoice]
        const newStats: GameStats = {
          ...stats,
          energy: clampStat(stats.energy + effect.energy),
          stress: clampStat(stats.stress + (effect.stress ?? 0)),
          salary: stats.salary + (restChoice === 'overtime' ? 500000 : 0),
        }

        const nextDay = getNextDay(currentDay)

        if (!nextDay) {
          set({ screen: 'victory', stats: newStats })
          return
        }

        const firstSlot: TimeSlot = 'morning_start'
        const dayConfig = DAYS_CONFIG.find(d => d.day === nextDay)!
        const slotConfig = dayConfig.timeSlots.find(s => s.slot === firstSlot)!
        const allEvents = getEventsForProfession(profession)
        const queue = randomEvents(allEvents, firstSlot, slotConfig.eventCount)

        get().addFeedEntry(`${dayConfig.title} bắt đầu. Tiếp tục thôi. 💪`, 'info')

        set({
          screen: 'game',
          currentDay: nextDay,
          currentTimeSlot: firstSlot,
          stats: newStats,
          eventQueue: queue.slice(1),
          activeEvents: [queue[0]].filter(Boolean),
          slotEventsRemaining: queue.length,
        })
      },
    }),

    {
      name: 'song-sot-cong-so-save',
      partialize: (state) => ({
        profession: state.profession,
        currentDay: state.currentDay,
        currentTimeSlot: state.currentTimeSlot,
        stats: state.stats,
        activeBuffs: state.activeBuffs,
        feedLog: state.feedLog,
        achievements: state.achievements,
        dayHistory: state.dayHistory,
        isGameOver: state.isGameOver,
        screen: state.screen,
      }),
    }
  )
)