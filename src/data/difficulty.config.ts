import type { DifficultyLevel } from '../types/game.types'

export interface DifficultyConfig {
  id: DifficultyLevel
  name: string
  emoji: string
  title: string
  description: string
  timerMultiplier: number
  stressMultiplier: number
  energyMultiplier: number
  startingSalaryOffset: number
  buffCostMultiplier: number
  penaltyMultiplier: number
}

export const DIFFICULTY_CONFIGS: DifficultyConfig[] = [
  {
    id: 'intern',
    name: 'Thực tập sinh',
    emoji: '👶',
    title: 'Thực tập sinh (Intern)',
    description: 'Ít áp lực, nhiều thời gian xử lý drama. Lương khởi điểm cao (được gia đình hỗ trợ). Giá buff siêu rẻ.',
    timerMultiplier: 1.5,
    stressMultiplier: 0.7,
    energyMultiplier: 0.7,
    startingSalaryOffset: 200000,
    buffCostMultiplier: 0.8,
    penaltyMultiplier: 0.5,
  },
  {
    id: 'junior',
    name: 'Nhân viên chính thức',
    emoji: '🧑‍💻',
    title: 'Nhân viên (Junior)',
    description: 'Trải nghiệm tiêu chuẩn, nhịp độ vừa phải, dễ thở hơn một chút so với bản gốc.',
    timerMultiplier: 1.2,
    stressMultiplier: 0.9,
    energyMultiplier: 0.9,
    startingSalaryOffset: 100000,
    buffCostMultiplier: 0.9,
    penaltyMultiplier: 0.8,
  },
  {
    id: 'senior',
    name: 'Lão làng gánh team',
    emoji: '🧙‍♂️',
    title: 'Lão làng (Senior)',
    description: 'Áp lực và tốc độ gốc của game. Deadline dồn dập, gánh team còng lưng.',
    timerMultiplier: 1.0,
    stressMultiplier: 1.0,
    energyMultiplier: 1.0,
    startingSalaryOffset: 0,
    buffCostMultiplier: 1.0,
    penaltyMultiplier: 1.0,
  },
  {
    id: 'ceo',
    name: 'Kẻ hủy diệt deadline',
    emoji: '💀',
    title: 'Hủy diệt (CEO)',
    description: 'Nợ thẻ tín dụng bủa vây, sếp Messi dí gắt gao. Phản xạ cực nhanh, một lỗi là bay màu.',
    timerMultiplier: 0.8,
    stressMultiplier: 1.25,
    energyMultiplier: 1.2,
    startingSalaryOffset: -150000,
    buffCostMultiplier: 1.3,
    penaltyMultiplier: 1.5,
  },
]
