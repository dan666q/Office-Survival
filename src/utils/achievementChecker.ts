// src/utils/achievementChecker.ts
import type { GameStats, DaySummary, DayOfWeek } from '../types/game.types'

export interface AchievementReward {
  stat: 'stress' | 'energy' | 'salary'
  value: number
}

export interface Achievement {
  id: string
  label: string
  emoji: string
  description: string
  rewards?: AchievementReward[]
  check: (params: {
    stats: GameStats
    dayHistory: DaySummary[]
    currentDay: DayOfWeek | null
    actionsChosen: string[]
  }) => boolean
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'survive_monday',
    label: 'Sống sót qua Thứ Hai Kinh Hoàng',
    emoji: '💪',
    description: 'Vượt qua ngày làm việc đầu tiên đầy bão táp.',
    rewards: [
      { stat: 'salary', value: 300000 },
      { stat: 'stress', value: -10 }
    ],
    check: ({ dayHistory }) =>
      dayHistory.some(d => d.day === 'monday' && d.survived),
  },
  {
    id: 'survive_week',
    label: 'Vương giả công sở (Sống sót cả tuần)',
    emoji: '🏆',
    description: 'Hoàn thành xuất sắc tuần làm việc từ Thứ Hai đến Thứ Bảy.',
    rewards: [
      { stat: 'salary', value: 1000000 },
      { stat: 'stress', value: -30 },
      { stat: 'energy', value: +20 }
    ],
    check: ({ dayHistory }) =>
      dayHistory.filter(d => d.survived).length >= 6,
  },
  {
    id: 'low_stress',
    label: 'Tâm bất biến giữa dòng đời vạn biến',
    emoji: '🧘',
    description: 'Giữ chỉ số Stress luôn ở mức cực kỳ an toàn (< 30%).',
    rewards: [
      { stat: 'salary', value: 200000 },
      { stat: 'energy', value: +10 }
    ],
    check: ({ stats }) => stats.stress < 30,
  },
  {
    id: 'rich',
    label: 'Triệu phú công sở',
    emoji: '💰',
    description: 'Tích lũy tổng điểm lương đạt từ 3 triệu trở lên.',
    rewards: [
      { stat: 'energy', value: +20 },
      { stat: 'stress', value: -15 }
    ],
    check: ({ stats }) => stats.salary >= 3000000,
  },
  {
    id: 'ok_em_10',
    label: 'Chiến thần "Dạ vâng sếp" (Yes-man)',
    emoji: '🤝',
    description: 'Đồng ý và làm theo yêu cầu của sếp hoặc khách hàng 10 lần.',
    rewards: [
      { stat: 'salary', value: 400000 },
      { stat: 'stress', value: 15 } // Đồng ý nhiều thì stress tăng nhẹ do ôm đồm việc
    ],
    check: ({ actionsChosen }) =>
      actionsChosen.filter(a =>
        ['attend', 'agree', 'accept', 'reply_yes', 'agree_7am', 'agree_migrate', 'approve_petty_cash', 'accept_change', 'approve_advance_exception'].includes(a)
      ).length >= 10,
  },
  {
    id: 'full_energy',
    label: 'Tràn trề sinh lực văn phòng',
    emoji: '⚡',
    description: 'Giữ sức khỏe thể chất cực kỳ sung mãn (> 80% Energy).',
    rewards: [
      { stat: 'salary', value: 150000 },
      { stat: 'stress', value: -10 }
    ],
    check: ({ stats }) => stats.energy > 80,
  },
  {
    id: 'survive_ot',
    label: 'Chiến binh làm thêm xuyên màn đêm',
    emoji: '🌙',
    description: 'Chọn làm thêm Overtime vào buổi tối để cày tiền.',
    rewards: [
      { stat: 'salary', value: 200000 },
      { stat: 'energy', value: 10 }
    ],
    check: ({ actionsChosen }) => actionsChosen.includes('overtime'),
  },
  {
    id: 'burnout_survivor',
    label: 'Vượt qua cửa tử burnout',
    emoji: '🔥',
    description: 'Tiếp tục làm việc khi Stress chạm ngưỡng nguy kịch (≥ 90%).',
    rewards: [
      { stat: 'salary', value: 500000 },
      { stat: 'energy', value: +30 },
      { stat: 'stress', value: -20 }
    ],
    check: ({ stats }) => stats.stress >= 90 && stats.stress < 100,
  },
  {
    id: 'shopaholic',
    label: 'Người tiêu dùng thông thái',
    emoji: '🛒',
    description: 'Đã order đồ ăn uống ngon lành tại GrabFood Cứu Mạng.',
    rewards: [
      { stat: 'stress', value: -15 },
      { stat: 'energy', value: +10 }
    ],
    check: ({ stats }) => stats.salary < 500000, // Đã tiêu tiền mua buff
  },
  {
    id: 'no_drama',
    label: 'Người của hòa bình',
    emoji: '🕊️',
    description: 'Từ chối tham gia hóng chuyện drama trong pantry để giữ đầu óc sạch sẽ.',
    rewards: [
      { stat: 'stress', value: -20 },
      { stat: 'salary', value: 100000 }
    ],
    check: ({ actionsChosen }) => actionsChosen.includes('leave_quietly'),
  },
]

export function checkNewAchievements(
  params: Parameters<Achievement['check']>[0],
  existing: string[]
): string[] {
  return ACHIEVEMENTS
    .filter(a => !existing.includes(a.id) && a.check(params))
    .map(a => a.id)
}