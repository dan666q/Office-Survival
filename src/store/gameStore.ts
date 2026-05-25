import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Profession, DayOfWeek, TimeSlot, GameStats, FeedEntry, DaySummary } from '../types/game.types'
import type { GameEvent } from '../types/event.types'
import { DAYS_CONFIG } from '../data'
import { checkNewAchievements, ACHIEVEMENTS } from '../utils/achievementChecker'
import { soundManager } from '../utils/soundManager'
import {
  DEFAULT_STATS,
  LUNCH_BUFF_LIMIT,
  MAX_ACTIVE_EVENTS,
  TIMEOUT_STRESS,
  TIMEOUT_ENERGY,
  TIMEOUT_SALARY,
  initSlotTime,
  getNextTime,
  getEventsForProfession,
  getStartingStats,
  randomEvents,
  getNextDay,
  getNextTimeSlot,
  generateId,
  clampStat,
  PROFESSIONS_CONFIG,
  getBuffsForProfession
} from './gameHelpers'

// ==================== STORE INTERFACE ====================

interface GameStore {
  screen: 'start' | 'profession' | 'game' | 'daily_summary' | 'day_transition' | 'game_over' | 'victory'
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
  usedEventIds: string[]
  weeklyEventCounts: Record<string, number>
  flags: Record<string, boolean>
  consecutiveTimeouts: number
  dailyEventsHandled: number
  actionsChosen: string[]
  flashEffect: 'success' | 'danger' | null

  goToScreen: (screen: GameStore['screen']) => void
  startGame: (profession: Profession) => void
  restartGame: () => void

  selectAction: (eventId: string, actionId: string) => void
  nextEvent: () => void
  nextTimeSlot: () => void
  nextDay: (restChoice: 'sleep' | 'beer' | 'overtime') => void
  handleTimeout: (eventId: string) => void
  pushNextActiveEvent: () => void
  skipOvertime: () => void

  applyStatEffects: (effects: { stat: keyof GameStats; value: number }[], stressRate?: number) => void
  addFeedEntry: (message: string, type?: FeedEntry['type'], chatReplies?: import('../types/event.types').ChatReply[]) => void
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
      usedEventIds: [],
      weeklyEventCounts: {},
      flags: {},
      consecutiveTimeouts: 0,
      dailyEventsHandled: 0,
      actionsChosen: [],
      flashEffect: null,

      // ==================== NAVIGATION ====================

      goToScreen: (screen) => set({ screen }),

      startGame: (profession) => {
        const stats = getStartingStats(profession)
        const firstDay: DayOfWeek = 'monday'
        const firstSlot: TimeSlot = 'morning_start'
        const dayConfig = DAYS_CONFIG.find(d => d.day === firstDay)!
        const slotConfig = dayConfig.timeSlots.find(s => s.slot === firstSlot)!
        const allEvents = getEventsForProfession(profession)
        const queue = randomEvents(allEvents, firstSlot, slotConfig.eventCount, [], {}, stats, {}, firstDay)

        initSlotTime(firstSlot)

        const counts: Record<string, number> = {}
        queue.forEach(e => { counts[e.id] = (counts[e.id] ?? 0) + 1 })

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
          usedEventIds: queue.map(e => e.id),
          weeklyEventCounts: counts,
          flags: {},
          consecutiveTimeouts: 0,
          dailyEventsHandled: 0,
          actionsChosen: [],
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
          usedEventIds: [],
          weeklyEventCounts: {},
          flags: {},
          consecutiveTimeouts: 0,
          dailyEventsHandled: 0,
          actionsChosen: [],
        })
      },

      // ==================== GAMEPLAY ====================

      pushNextActiveEvent: () => {
        const { eventQueue, activeEvents } = get()
        if (eventQueue.length === 0) return
        if (activeEvents.length >= MAX_ACTIVE_EVENTS) return

        // 30% chance to push 2 events at once if queue has enough and there is room
        const doubleSpawn = Math.random() < 0.3 && eventQueue.length >= 2 && activeEvents.length + 2 <= MAX_ACTIVE_EVENTS

        if (doubleSpawn) {
          const [first, second, ...rest] = eventQueue
          set({
            activeEvents: [...activeEvents, first, second],
            eventQueue: rest,
          })
        } else {
          const [next, ...rest] = eventQueue
          set({
            activeEvents: [...activeEvents, next],
            eventQueue: rest,
          })
        }
      },

      handleTimeout: (eventId) => {
        const { activeEvents, currentDay, consecutiveTimeouts } = get()
        const event = activeEvents.find(e => e.id === eventId)
        if (!event) return

        const dayConfig = DAYS_CONFIG.find(d => d.day === currentDay)
        const stressRate = dayConfig?.statModifiers.stressRate ?? 1

        // Penalty nặng hơn nếu timeout liên tiếp
        const penaltyMultiplier = consecutiveTimeouts >= 1 ? 1.5 : 1

        get().applyStatEffects([
          { stat: 'stress', value: Math.round(TIMEOUT_STRESS * penaltyMultiplier) },
          { stat: 'energy', value: Math.round(TIMEOUT_ENERGY * penaltyMultiplier) },
          { stat: 'salary', value: Math.round(TIMEOUT_SALARY * penaltyMultiplier) },
        ], stressRate)

        soundManager.playDanger();

        get().addFeedEntry(
          consecutiveTimeouts >= 1
            ? 'Lại đứng hình nữa rồi! PM escalate lên director. Tình hình căng lắm 💀'
            : 'Bạn đứng hình quá lâu. PM escalate lên management rồi 💀',
          'danger'
        )

        // Chain event nếu timeout 2 lần liên tiếp
        let nextWeeklyCounts = get().weeklyEventCounts;
        if (consecutiveTimeouts >= 1) {
          const allEvents = getEventsForProfession(get().profession!)
          const escalateEvent = allEvents.find(e => e.id === 'it_boss_message' || e.id === 'seo_boss_pressure' || e.id === 'kt_q4_report')
          if (escalateEvent) {
            nextWeeklyCounts = {
              ...nextWeeklyCounts,
              [escalateEvent.id]: (nextWeeklyCounts[escalateEvent.id] ?? 0) + 1
            }
            set({ eventQueue: [escalateEvent, ...get().eventQueue] })
          }
        }

        const remaining = activeEvents.filter(e => e.id !== eventId)
        set({
          activeEvents: remaining,
          consecutiveTimeouts: consecutiveTimeouts + 1,
          dailyEventsHandled: get().dailyEventsHandled + 1,
          weeklyEventCounts: nextWeeklyCounts,
        })

        if (remaining.length === 0) get().nextEvent()
      },

      selectAction: (eventId, actionId) => {
        const { activeEvents, profession, achievements, stats, dayHistory, currentDay, actionsChosen } = get()

        const event = activeEvents.find(e => e.id === eventId)
        if (!event) return
        const action = event.actions.find(a => a.id === actionId)
        if (!action) return

        const dayConfig = DAYS_CONFIG.find(d => d.day === currentDay)
        const stressRate = dayConfig?.statModifiers.stressRate ?? 1

        const isRisky = action.effects.some(e => e.stat === 'salary' && e.value < 0) ||
          (action.setFlags && Object.entries(action.setFlags).some(([flag, val]) =>
            val === true && ['has_hidden_error', 'team_hates_you', 'betrayer_tag', 'audit_discrepancy', 'intern_cried', 'intern_hates_you', 'tax_audit_triggered', 'crack_installed'].includes(flag)
          ))

        get().applyStatEffects(action.effects, stressRate)
        
        if (isRisky) {
          soundManager.playDanger()
          set({ flashEffect: 'danger' })
        } else {
          soundManager.playSuccess()
          set({ flashEffect: 'success' })
        }

        setTimeout(() => {
          set({ flashEffect: null })
        }, 400)

        get().addFeedEntry(action.feedMessage, 'info', action.chatReplies)

        const nextActionsChosen = [...actionsChosen, actionId]
        const nextFlags = action.setFlags ? { ...get().flags, ...action.setFlags } : get().flags

        // Reset consecutive timeouts khi chọn action
        set({
          activeEvents: activeEvents.filter(e => e.id !== eventId),
          consecutiveTimeouts: 0,
          dailyEventsHandled: get().dailyEventsHandled + 1,
          actionsChosen: nextActionsChosen,
          flags: nextFlags,
        })

        // Check achievements
        const newUnlocked = checkNewAchievements(
          { stats, dayHistory, currentDay, actionsChosen: nextActionsChosen },
          achievements
        )
        if (newUnlocked.length > 0) {
          set({ achievements: [...get().achievements, ...newUnlocked] })
          newUnlocked.forEach(id => {
            const found = ACHIEVEMENTS.find(a => a.id === id)
            if (found) {
              get().addFeedEntry(
                `🏅 Achievement mới: ${found.emoji} ${found.label}`,
                'success'
              )
              if (found.rewards) {
                get().applyStatEffects(found.rewards)
                const rewardsText = found.rewards.map(r => {
                  const name = r.stat === 'salary' ? 'Lương' : r.stat === 'stress' ? 'Stress' : 'Energy';
                  const val = r.stat === 'salary' ? `${r.value > 0 ? '+' : ''}${(r.value / 1000).toFixed(0)}k` : `${r.value > 0 ? '+' : ''}${r.value}%`;
                  return `${val} ${name}`;
                }).join(', ');
                get().addFeedEntry(`🎁 Nhận thưởng: ${rewardsText}`, 'success');
              }
            }
          })
        }

        // Chain events
        if (action.chainEvents && action.chainEvents.length > 0) {
          const allEvents = getEventsForProfession(profession!)
          const chained = action.chainEvents
            .map(c => allEvents.find(e => e.id === c.eventId))
            .filter(Boolean) as GameEvent[]

          if (chained.length > 0) {
            const counts = { ...get().weeklyEventCounts }
            chained.forEach(e => { counts[e.id] = (counts[e.id] ?? 0) + 1 })

            setTimeout(() => {
              set({
                eventQueue: [...chained, ...get().eventQueue],
                weeklyEventCounts: counts,
              })
              if (get().activeEvents.length === 0) get().nextEvent()
            }, action.chainEvents[0].delay ?? 1500)
            return
          }
        }

        if (get().activeEvents.length === 0) get().nextEvent()
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
        const { currentDay, currentTimeSlot, profession, stats, activeBuffs, usedEventIds } = get()
        if (!currentDay || !currentTimeSlot || !profession) return

        const nextSlot = getNextTimeSlot(currentTimeSlot)

        // Hết ngày → daily summary + cộng lương
        if (!nextSlot || currentTimeSlot === 'overtime') {
          const profConfig = PROFESSIONS_CONFIG.find(p => p.id === profession)
          const dailySalary = profConfig?.dailySalary ?? 0
          const salaryEarned = get().dailySalaryEarned + dailySalary
          const newStats = { ...stats, salary: stats.salary + dailySalary }

          const summary: DaySummary = {
            day: currentDay,
            survived: true,
            statsSnapshot: { ...newStats },
            salaryEarned,
            eventsHandled: get().dailyEventsHandled,
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
            dailyEventsHandled: 0,
          })
          return
        }

        // Apply buff passives
        const buffEffects: { stat: keyof GameStats; value: number }[] = []
        const currentBuffList = getBuffsForProfession(profession)
        activeBuffs.forEach(buffId => {
          const buff = currentBuffList.find(b => b.id === buffId)
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

        // Dùng usedEventIds để tránh lặp event trong ngày
        const newQueue = randomEvents(allEvents, nextSlot, slotConfig.eventCount, usedEventIds, get().weeklyEventCounts, stats, get().flags, currentDay)
        const newUsedIds = [...usedEventIds, ...newQueue.map(e => e.id)]
        const nextWeeklyCounts = { ...get().weeklyEventCounts }
        newQueue.forEach(e => { nextWeeklyCounts[e.id] = (nextWeeklyCounts[e.id] ?? 0) + 1 })

        let newStats = {
          ...stats,
          energy: clampStat(stats.energy - Math.round(slotConfig.energyDrain * dayConfig.statModifiers.energyDrainRate)),
        }

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
          const buff = currentBuffList.find(b => b.id === buffId)
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
          usedEventIds: newUsedIds,
          weeklyEventCounts: nextWeeklyCounts,
          consecutiveTimeouts: 0,
        })
      },

      skipOvertime: () => {
        // Người chơi chọn về nhà thay vì OT
        const { currentDay, stats, profession } = get()
        if (!currentDay || !profession) return
        const profConfig = PROFESSIONS_CONFIG.find(p => p.id === profession)
        const dailySalary = profConfig?.dailySalary ?? 0
        const salaryEarned = get().dailySalaryEarned + dailySalary
        const newStats = { ...stats, salary: stats.salary + dailySalary }
        const summary: DaySummary = {
          day: currentDay,
          survived: true,
          statsSnapshot: { ...newStats },
          salaryEarned,
          eventsHandled: get().dailyEventsHandled,
        }
        get().addFeedEntry(`Bạn quyết định về nhà. Người khôn ngoan. 🏠`, 'success')
        set({
          screen: 'daily_summary',
          stats: newStats,
          dayHistory: [...get().dayHistory, summary],
          dailySalaryEarned: salaryEarned,
          dailyEventsHandled: 0,
        })
      },

      nextDay: (restChoice) => {
        const { currentDay, stats, profession, activeBuffs } = get()
        if (!currentDay || !profession) return

        const restEffects = {
          sleep:    { energy: +45, stress: -25, salary: 0 },
          beer:     { energy: +5, stress: -45, salary: -150000 },
          overtime: { energy: -15, stress: +25, salary: +250000 },
        }

        const effect = restEffects[restChoice]

        // Overtime penalty nếu stress cao
        const extraStress = restChoice === 'overtime' && stats.stress > 70 ? 10 : 0

        const newStats: GameStats = {
          ...stats,
          energy: clampStat(stats.energy + effect.energy),
          stress: clampStat(stats.stress + effect.stress + extraStress),
          salary: Math.max(0, stats.salary + effect.salary),
        }

        // 30% chance drama nếu uống bia
        if (restChoice === 'beer' && Math.random() < 0.3) {
          get().addFeedEntry('Tối qua uống hơi nhiều. Sáng nay đồng nghiệp nhìn bạn với ánh mắt lạ 👀', 'warning')
          newStats.stress = clampStat(newStats.stress + 10)
        }

        const nextDay = getNextDay(currentDay)

        if (!nextDay) {
          set({ screen: 'victory', stats: newStats })
          return
        }

        const currentBuffList = getBuffsForProfession(profession)
        const remainingBuffs = activeBuffs.filter(buffId => {
          const buff = currentBuffList.find(b => b.id === buffId)
          return buff?.duration === 'permanent'
        })

        const firstSlot: TimeSlot = 'morning_start'
        const dayConfig = DAYS_CONFIG.find(d => d.day === nextDay)!
        const slotConfig = dayConfig.timeSlots.find(s => s.slot === firstSlot)!
        const allEvents = getEventsForProfession(profession)
        const queue = randomEvents(allEvents, firstSlot, slotConfig.eventCount, [], get().weeklyEventCounts, newStats, get().flags, nextDay)

        initSlotTime(firstSlot)
        get().addFeedEntry(`${dayConfig.title} bắt đầu. Tiếp tục thôi. 💪`, 'info')

        const nextWeeklyCounts = { ...get().weeklyEventCounts }
        queue.forEach(e => { nextWeeklyCounts[e.id] = (nextWeeklyCounts[e.id] ?? 0) + 1 })

        set({
          screen: 'day_transition',
          currentDay: nextDay,
          currentTimeSlot: firstSlot,
          stats: newStats,
          activeBuffs: remainingBuffs,
          eventQueue: queue.slice(1),
          activeEvents: [queue[0]].filter(Boolean),
          slotEventsRemaining: queue.length,
          lunchBuffsBought: 0,
          dailySalaryEarned: 0,
          usedEventIds: queue.map(e => e.id),
          weeklyEventCounts: nextWeeklyCounts,
          consecutiveTimeouts: 0,
          dailyEventsHandled: 0,
        })

        // #7: Check achievements sau khi sang ngày mới
        const newAchievements = checkNewAchievements(
          { stats: newStats, dayHistory: [...get().dayHistory], currentDay: nextDay, actionsChosen: get().actionsChosen },
          get().achievements
        )
        if (newAchievements.length > 0) {
          set({ achievements: [...get().achievements, ...newAchievements] })
          newAchievements.forEach(id => {
            const found = ACHIEVEMENTS.find(a => a.id === id)
            if (found) {
              get().addFeedEntry(`🏅 Achievement mới: ${found.emoji} ${found.label}`, 'success')
              if (found.rewards) {
                get().applyStatEffects(found.rewards)
                const rewardsText = found.rewards.map(r => {
                  const name = r.stat === 'salary' ? 'Lương' : r.stat === 'stress' ? 'Stress' : 'Energy';
                  const val = r.stat === 'salary' ? `${r.value > 0 ? '+' : ''}${(r.value / 1000).toFixed(0)}k` : `${r.value > 0 ? '+' : ''}${r.value}%`;
                  return `${val} ${name}`;
                }).join(', ');
                get().addFeedEntry(`🎁 Nhận thưởng: ${rewardsText}`, 'success');
              }
            }
          })
        }
      },

      // ==================== STATS ====================

      applyStatEffects: (effects, stressRate = 1) => {
        const { stats } = get()
        const newStats = { ...stats }

        effects.forEach(({ stat, value }) => {
          if (stat === 'salary') {
            newStats.salary = Math.max(0, newStats.salary + value)
          } else if (stat === 'stress') {
            // Nhân stress với stressRate của ngày
            newStats.stress = clampStat(newStats.stress + Math.round(value * stressRate))
          } else {
            newStats[stat] = clampStat(newStats[stat] + value)
          }
        })

        if (newStats.stress >= 100) {
          set({
            stats: newStats,
            screen: 'game_over',
            isGameOver: true,
            gameOverReason: 'Stress đạt 100%. Bạn burnout hoàn toàn và nộp đơn xin nghỉ việc. 💀',
          })
          return
        }
        if (newStats.energy <= 0) {
          set({
            stats: newStats,
            screen: 'game_over',
            isGameOver: true,
            gameOverReason: 'Năng lượng cạn kiệt. Bạn ngủ gục tại bàn làm việc. 😴',
          })
          return
        }

        set({ stats: newStats })
      },

      // ==================== FEED ====================

      addFeedEntry: (message, type = 'info', chatReplies) => {
        const { feedLog, currentTimeSlot } = get()
        const entry: FeedEntry = {
          id: generateId(),
          message,
          timestamp: getNextTime(currentTimeSlot),
          type,
          chatReplies,
        }
        set({ feedLog: [...feedLog, entry].slice(-50) })
      },

      // ==================== BUFFS ====================

      buyBuff: (buffId) => {
        const { stats, activeBuffs, currentTimeSlot, lunchBuffsBought, profession } = get()
        const currentBuffList = getBuffsForProfession(profession)
        const buff = currentBuffList.find(b => b.id === buffId)
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

        const nextBought = lunchBuffsBought + 1;
        set({
          stats: newStats,
          activeBuffs: [...activeBuffs, buffId],
          lunchBuffsBought: nextBought,
        })

        soundManager.playSuccess();
        get().addFeedEntry(`Đã mua ${buff.icon} ${buff.name}!`, 'success', buff.chatReplies)
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
        usedEventIds: state.usedEventIds,
        weeklyEventCounts: state.weeklyEventCounts,
        flags: state.flags,
        consecutiveTimeouts: state.consecutiveTimeouts,
        dailyEventsHandled: state.dailyEventsHandled,
        actionsChosen: state.actionsChosen,
      }),
    }
  )
)