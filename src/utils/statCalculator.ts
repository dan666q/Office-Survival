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
  if (stats.stress >= 90) return { label: '💀 Sắp xong rồi', sub: 'Burnout gần kề', color: 'text-red-400' }
  if (stats.stress >= 75) return { label: '🔥 Căng lắm rồi', sub: 'Stress nguy hiểm', color: 'text-orange-400' }
  if (stats.stress >= 50) return { label: '⚡ Căng thẳng', sub: 'Cần cẩn thận', color: 'text-yellow-400' }
  if (stats.energy <= 20) return { label: '😴 Kiệt sức', sub: 'Energy thấp nguy hiểm', color: 'text-blue-400' }
  if (stats.energy >= 80 && stats.stress <= 30) return { label: '😎 Đang ngon', sub: 'Tiếp tục phát huy', color: 'text-emerald-400' }
  return { label: '😐 Bình thường', sub: 'Tạm ổn, cẩn thận nha', color: 'text-zinc-300' }
}

export function formatSalary(salary: number): string {
  if (salary >= 1000000) return `${(salary / 1000000).toFixed(1)}tr`
  if (salary >= 1000) return `${Math.floor(salary / 1000)}k`
  return `${salary}đ`
}