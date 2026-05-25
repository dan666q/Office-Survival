import type { GameStats } from '../types/game.types'

export function clampStat(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value))
}

export function applyEffects(
  stats: GameStats,
  effects: { stat: keyof GameStats; value: number }[]
): GameStats {
  const newStats = { ...stats }
  effects.forEach(({ stat, value }) => {
    if (stat === 'salary') {
      newStats.salary = Math.max(0, newStats.salary + value)
    } else {
      newStats[stat] = clampStat(newStats[stat] + value)
    }
  })
  return newStats
}

export function isGameOver(stats: GameStats): {
  over: boolean
  reason: string
} {
  if (stats.stress >= 100) {
    return {
      over: true,
      reason: 'Stress đạt 100%. Bạn burnout hoàn toàn và nộp đơn xin nghỉ việc. 💀',
    }
  }
  if (stats.energy <= 0) {
    return {
      over: true,
      reason: 'Năng lượng cạn kiệt. Bạn ngủ gục tại bàn làm việc. 😴',
    }
  }
  return { over: false, reason: '' }
}

export function getMood(stats: GameStats): {
  label: string
  sub: string
  color: string
} {
  if (stats.stress >= 90) return { label: '💀 Sụp hầm vcl', sub: 'Burnout đỉnh điểm, cứu tui!', color: 'text-red-400 animate-pulse' }
  if (stats.stress >= 75) return { label: '🔥 Cọc điên lên á', sub: 'Stress nguy hiểm, sếp sắp ăn diss', color: 'text-orange-400 font-bold' }
  if (stats.stress >= 50) return { label: '⚡ Căng thẳng nhẹ', sub: 'Deadline dí, đéo thấy bình yên', color: 'text-yellow-400' }
  if (stats.energy <= 20) return { label: '🥱 Lờ đờ cmnr', sub: 'Pin cạn kiệt, thèm boba/highlands gấp', color: 'text-blue-400 animate-pulse' }
  if (stats.energy >= 80 && stats.stress <= 30) return { label: '😎 Slay vcl', sub: 'Out trình công sở, gánh team!', color: 'text-emerald-400 font-black' }
  if (stats.energy >= 50 && stats.stress <= 30) return { label: '😌 Chill phết nhe', sub: 'Mọi thứ trong tầm tay hihi', color: 'text-emerald-300' }
  return { label: '😐 Vô cảm', sub: 'Tâm bất biến giữa dòng đời vạn biến', color: 'text-zinc-300' }
}

export function formatSalary(salary: number): string {
  if (salary >= 1000000) return `${(salary / 1000000).toFixed(1)}tr`
  if (salary >= 1000) return `${Math.floor(salary / 1000)}k`
  return `${salary}đ`
}