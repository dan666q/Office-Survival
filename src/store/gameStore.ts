import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Profession, DayOfWeek, TimeSlot, GameStats, FeedEntry, DaySummary } from '../types/game.types'
import type { GameEvent } from '../types/event.types'
import { IT_EVENTS, SEO_EVENTS, KETOAN_EVENTS } from '../data'
import { DAYS_CONFIG } from '../data'
import { BUFFS } from '../data/buffs.data'
import { PROFESSIONS_CONFIG } from '../data/professions.config'
import { checkNewAchievements, ACHIEVEMENTS } from '../utils/achievementChecker'

const DAY_ORDER: DayOfWeek[] = [
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'
]

const TIMESLOT_ORDER: TimeSlot[] = [
  'morning_start', 'morning', 'lunch', 'afternoon', 'end_of_day', 'overtime'
]

const DEFAULT_STATS: GameStats = {
  stress: 0,
  energy: 100,
  salary: 100000,
}

const LUNCH_BUFF_LIMIT = 2

// ==================== TIMESTAMP ====================

const SLOT_START_MINUTES: Record<string, number> = {
  morning_start: 8 * 60,
  morning: 9 * 60,
  lunch: 12 * 60,
  afternoon: 13 * 60,
  end_of_day: 17 * 60,
  overtime: 19 * 60,
}

const SLOT_END_MINUTES: Record<string, number> = {
  morning_start: 9 * 60,
  morning: 12 * 60,
  lunch: 13 * 60,
  afternoon: 17 * 60,
  end_of_day: 19 * 60,
  overtime: 22 * 60,
}

let currentMinutes = 8 * 60

function initSlotTime(slot: string) {
  currentMinutes = SLOT_START_MINUTES[slot] ?? 8 * 60
}

function getNextTime(slot: string | null): string {
  const max = SLOT_END_MINUTES[slot ?? 'morning_start'] ?? 9 * 60
  currentMinutes += Math.floor(Math.random() * 10) + 5
  if (currentMinutes > max) currentMinutes = max
  const h = Math.floor(currentMinutes / 60)
  const m = currentMinutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
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

function clampStat(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value))
}

// ==================== STORE INTERFACE ====================

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
  lunchBuffsBought: number
  dailySalaryEarned: number

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

// ==================== STORE ====================

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
      lunchBuffsBought: 0,
      dailySalaryEarned: 0,

      goToScreen: (screen) => set({ screen }),

      startGame: (profession) => {
        const stats = getStartingStats(profession)
        const firstDay: DayOfWeek = 'monday'
        const firstSlot: TimeSlot = 'morning_start'
        const dayConfig = DAYS_CONFIG.find(d => d.day === firstDay)!
        const slotConfig = dayConfig.timeSlots.find(s => s.slot === firstSlot)!
        const allEvents = getEventsForProfession(profession)
        const queue = randomEvents(allEvents, firstSlot, slotConfig.eventCount)

        initSlotTime(firstSlot)

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
          lunchBuffsBought: 0,
          dailySalaryEarned: 0,
        })
      },

      restartGame: () => {
        initSlotTime('morning_start')
        set({
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
          lunchBuffsBought: 0,
          dailySalaryEarned: 0,
        })
      },

      selectAction: (eventId, actionId) => {
        const { activeEvents, profession, achievements, stats, dayHistory, currentDay } = get()

        const event = activeEvents.find(e => e.id === eventId)
        if (!event) return
        const action = event.actions.find(a => a.id === actionId)
        if (!action) return

        get().applyStatEffects(action.effects)
        get().addFeedEntry(action.feedMessage, 'info')

        const remaining = activeEvents.filter(e => e.id !== eventId)
        set({ activeEvents: remaining })

        // Check achievements
        const newUnlocked = checkNewAchievements(
          { stats, dayHistory, currentDay, actionsChosen: [actionId] },
          achievements
        )
        if (newUnlocked.length > 0) {
          set({ achievements: [...get().achievements, ...newUnlocked] })
          newUnlocked.forEach(id => {
            const found = ACHIEVEMENTS.find(a => a.id === id)
            if (found) get().addFeedEntry(
              `🏅 Achievement mới: ${found.emoji} ${found.label}`,
              'success'
            )
          })
        }

        // Chain events
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
        const { currentDay, currentTimeSlot, profession, stats, activeBuffs } = get()
        if (!currentDay || !currentTimeSlot || !profession) return

        const nextSlot = getNextTimeSlot(currentTimeSlot)

        // Hết ngày → daily summary + cộng lương ngày
        if (!nextSlot || currentTimeSlot === 'end_of_day') {
          const profConfig = PROFESSIONS_CONFIG.find(p => p.id === profession)
          const dailySalary = profConfig?.dailySalary ?? 0
          const salaryEarned = get().dailySalaryEarned + dailySalary
          const newStats = {
            ...stats,
            salary: stats.salary + dailySalary,
          }

          const summary: DaySummary = {
            day: currentDay,
            survived: true,
            statsSnapshot: { ...newStats },
            salaryEarned,
            eventsHandled: 0,
          }

          get().addFeedEntry(
            `Hết giờ làm việc! Lương hôm nay: +${(dailySalary / 1000).toFixed(0)}k 💰`,
            'success'
          )

          set({
            screen: 'daily_summary',
            stats: newStats,
            dayHistory: [...get().dayHistory, summary],
            dailySalaryEarned: salaryEarned,
          })
          return
        }

        // Apply buff passives
        const buffEffects: { stat: keyof GameStats; value: number }[] = []
        activeBuffs.forEach(buffId => {
          const buff = BUFFS.find(b => b.id === buffId)
          if (!buff) return
          if (buff.duration === 'permanent' || buff.duration === 'day') {
            buff.effects.forEach(e => {
              buffEffects.push({
                stat: e.stat as keyof GameStats,
                value: Math.round(e.value / 5),
              })
            })
          }
        })

        const dayConfig = DAYS_CONFIG.find(d => d.day === currentDay)!
        const slotConfig = dayConfig.timeSlots.find(s => s.slot === nextSlot)!
        const allEvents = getEventsForProfession(profession)
        const newQueue = randomEvents(allEvents, nextSlot, slotConfig.eventCount)

        let newStats = { ...stats, energy: clampStat(stats.energy - slotConfig.energyDrain) }

        buffEffects.forEach(({ stat, value }) => {
          if (stat === 'salary') {
            newStats.salary = Math.max(0, newStats.salary + value)
          } else {
            newStats[stat] = clampStat(newStats[stat] + value)
          }
        })

        if (newStats.energy <= 0) {
          set({
            stats: newStats,
            screen: 'game_over',
            isGameOver: true,
            gameOverReason: 'Năng lượng cạn kiệt. Bạn ngủ gục tại bàn làm việc. 😴',
          })
          return
        }

        const remainingBuffs = activeBuffs.filter(buffId => {
          const buff = BUFFS.find(b => b.id === buffId)
          return buff?.duration !== 'timeslot'
        })

        const lunchBuffsBought = nextSlot === 'lunch' ? 0 : get().lunchBuffsBought

        initSlotTime(nextSlot)
        get().addFeedEntry(`Bước vào khung giờ: ${slotConfig.displayName}`, 'info')

        set({
          currentTimeSlot: nextSlot,
          stats: newStats,
          activeBuffs: remainingBuffs,
          eventQueue: newQueue.slice(1),
          activeEvents: [newQueue[0]].filter(Boolean),
          slotEventsRemaining: newQueue.length,
          lunchBuffsBought,
        })
      },

      nextDay: (restChoice) => {
        const { currentDay, stats, profession, activeBuffs } = get()
        if (!currentDay || !profession) return

        const restEffects = {
          sleep:    { energy: +30, stress: -15 },
          beer:     { energy: +15, stress: +10 },
          overtime: { energy: +5,  stress: +15 },
        }
        const effect = restEffects[restChoice]
        const newStats: GameStats = {
          ...stats,
          energy: clampStat(stats.energy + effect.energy),
          stress: clampStat(stats.stress + effect.stress),
          salary: stats.salary + (restChoice === 'overtime' ? 500000 : 0),
        }

        const nextDay = getNextDay(currentDay)

        if (!nextDay) {
          set({ screen: 'victory', stats: newStats })
          return
        }

        const remainingBuffs = activeBuffs.filter(buffId => {
          const buff = BUFFS.find(b => b.id === buffId)
          return buff?.duration === 'permanent'
        })

        const firstSlot: TimeSlot = 'morning_start'
        const dayConfig = DAYS_CONFIG.find(d => d.day === nextDay)!
        const slotConfig = dayConfig.timeSlots.find(s => s.slot === firstSlot)!
        const allEvents = getEventsForProfession(profession)
        const queue = randomEvents(allEvents, firstSlot, slotConfig.eventCount)

        initSlotTime(firstSlot)
        get().addFeedEntry(`${dayConfig.title} bắt đầu. Tiếp tục thôi. 💪`, 'info')

        set({
          screen: 'game',
          currentDay: nextDay,
          currentTimeSlot: firstSlot,
          stats: newStats,
          activeBuffs: remainingBuffs,
          eventQueue: queue.slice(1),
          activeEvents: [queue[0]].filter(Boolean),
          slotEventsRemaining: queue.length,
          lunchBuffsBought: 0,
          dailySalaryEarned: 0,
        })
      },

      applyStatEffects: (effects) => {
        const { stats } = get()
      
        const newStats = { ...stats }
      
        effects.forEach(({ stat, value }) => {
          if (stat === 'salary') {
            newStats.salary = Math.max(0, newStats.salary + value)
          } else {
            newStats[stat] = clampStat(newStats[stat] + value)
          }
        })
      
        // =========================
        // GAME OVER: HẾT TIỀN
        // =========================
        const salaryEffect = effects.find(e => e.stat === 'salary')
      
        if (
          stats.salary <= 0 &&
          salaryEffect &&
          salaryEffect.value < 0
        ) {
          set({
            stats: newStats,
            screen: 'game_over',
            isGameOver: true,
            gameOverReason:
              'Bạn tiếp tục làm thất thoát tiền công ty khi tài khoản đã cạn sạch. HR mời bạn lên phòng họp lúc 8:00 sáng. 💸',
          })
      
          return
        }
      
        // =========================
        // GAME OVER: STRESS
        // =========================
        if (newStats.stress >= 100) {
          set({
            stats: newStats,
            screen: 'game_over',
            isGameOver: true,
            gameOverReason:
              'Stress đạt 100%. Bạn burnout hoàn toàn và nộp đơn xin nghỉ việc. 💀',
          })
      
          return
        }
      
        // =========================
        // GAME OVER: ENERGY
        // =========================
        if (newStats.energy <= 0) {
          set({
            stats: newStats,
            screen: 'game_over',
            isGameOver: true,
            gameOverReason:
              'Năng lượng cạn kiệt. Bạn ngủ gục tại bàn làm việc. 😴',
          })
      
          return
        }
      
        set({ stats: newStats })
      },

      addFeedEntry: (message, type = 'info') => {
        const { feedLog, currentTimeSlot } = get()
        const entry: FeedEntry = {
          id: generateId(),
          message,
          timestamp: getNextTime(currentTimeSlot),
          type,
        }
        set({ feedLog: [...feedLog, entry].slice(-50) })
      },

      buyBuff: (buffId) => {
        const { stats, activeBuffs, currentTimeSlot, lunchBuffsBought } = get()
        const buff = BUFFS.find(b => b.id === buffId)
        if (!buff) return

        if (currentTimeSlot !== 'lunch') {
          get().addFeedEntry('Shop chỉ mở trong giờ ăn trưa 🔒', 'warning')
          return
        }
        if (lunchBuffsBought >= LUNCH_BUFF_LIMIT) {
          get().addFeedEntry('Đã mua đủ 2 món rồi, nghỉ trưa đi 😄', 'warning')
          return
        }
        if (stats.salary < buff.cost) {
          get().addFeedEntry(`Không đủ tiền mua ${buff.name} 💸`, 'warning')
          return
        }

        const newStats = { ...stats, salary: stats.salary - buff.cost }
        buff.effects.forEach(({ stat, value }) => {
          if (stat === 'salary') {
            newStats.salary = Math.max(0, newStats.salary + value)
          } else {
            (newStats as any)[stat] = clampStat((newStats as any)[stat] + value)
          }
        })

        set({
          stats: newStats,
          activeBuffs: [...activeBuffs, buffId],
          lunchBuffsBought: lunchBuffsBought + 1,
        })

        get().addFeedEntry(`Đã mua ${buff.icon} ${buff.name}!`, 'success')
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
        lunchBuffsBought: state.lunchBuffsBought,
        dailySalaryEarned: state.dailySalaryEarned,
      }),
    }
  )
)