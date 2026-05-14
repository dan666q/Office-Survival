import type { Profession } from '../types/game.types'
import type { GameStats } from '../types/game.types'

export interface ProfessionConfig {
  id: Profession
  name: string
  emoji: string
  tagline: string
  difficulty: 'Dễ' | 'Trung bình' | 'Khó'
  enemy: string
  startingStats: GameStats
  uniqueBuffIds: string[]
}

export const PROFESSIONS_CONFIG: ProfessionConfig[] = [
  {
    id: 'it',
    name: 'IT Dev',
    emoji: '💻',
    tagline: 'Bug không tự fix. Nhưng bạn cũng không muốn fix lúc 5pm.',
    difficulty: 'Trung bình',
    enemy: 'Bug, deadline, PM phi lý, intern nguy hiểm',
    startingStats: {
      stress: 20,
      energy: 100,
      reputation: 60,
      salary: 0,
      bugCount: 0,
    },
    uniqueBuffIds: ['stackoverflow', 'dark_mode', 'dual_monitor'],
  },
  {
    id: 'seo_bds',
    name: 'Sales BĐS',
    emoji: '🏠',
    tagline: 'Khách nào cũng tiềm năng. Cho đến khi họ block bạn.',
    difficulty: 'Khó',
    enemy: 'Khách ảo, leads rác, sếp thúc chốt deal',
    startingStats: {
      stress: 30,
      energy: 90,
      reputation: 50,
      salary: 0,
      bugCount: 0,
    },
    uniqueBuffIds: ['chot_deal', 'crm_pro', 'sales_script'],
  },
  {
    id: 'ke_toan',
    name: 'Kế Toán',
    emoji: '📊',
    tagline: 'Số không bao giờ sai. Trừ khi Excel quyết định khác.',
    difficulty: 'Dễ',
    enemy: 'Số liệu sai, audit bất ngờ, deadline báo cáo',
    startingStats: {
      stress: 40,
      energy: 85,
      reputation: 70,
      salary: 0,
      bugCount: 0,
    },
    uniqueBuffIds: ['excel_than_thanh', 'may_tinh_bo_tui', 'ca_phe_den'],
  },
]