import type { GameStats, DaySummary, DayOfWeek } from '../types/game.types'

interface AchievementCheck {
  id: string
  label: string
  emoji: string
  check: (params: {
    stats: GameStats
    dayHistory: DaySummary[]
    currentDay: DayOfWeek | null
    actionsChosen: string[]
  }) => boolean
}

export const ACHIEVEMENTS: AchievementCheck[] = [
  {
    id: 'survive_monday',
    label: 'Sống sót qua Thứ Hai',
    emoji: '💪',
    check: ({ dayHistory }) =>
      dayHistory.some(d => d.day === 'monday' && d.survived),
  },
  {
    id: 'survive_week',
    label: 'Sống sót cả tuần',
    emoji: '🏆',
    check: ({ dayHistory }) =>
      dayHistory.filter(d => d.survived).length >= 6,
  },
  {
    id: 'low_stress',
    label: 'Giữ stress dưới 30% cả ngày',
    emoji: '🧘',
    check: ({ stats }) => stats.stress < 30,
  },
  {
    id: 'rich',
    label: 'Kiếm được 3 triệu',
    emoji: '💰',
    check: ({ stats }) => stats.salary >= 3000000,
  },
  {
    id: 'ok_em_10',
    label: 'Đồng ý 10 lần',
    emoji: '🤝',
    check: ({ actionsChosen }) =>
      actionsChosen.filter(a =>
        ['attend', 'agree', 'accept', 'reply_yes', 'agree_7am'].includes(a)
      ).length >= 10,
  },
  {
    id: 'full_energy',
    label: 'Kết thúc ngày với energy > 80%',
    emoji: '⚡',
    check: ({ stats }) => stats.energy > 80,
  },
]

export function checkNewAchievements(
  params: Parameters<AchievementCheck['check']>[0],
  existing: string[]
): string[] {
  return ACHIEVEMENTS
    .filter(a => !existing.includes(a.id) && a.check(params))
    .map(a => a.id)
}