import type { Profession } from '../types/game.types'

export interface Buff {
  id: string
  name: string
  description: string
  cost: number
  professions?: Profession[]
  effects: {
    stat: 'stress' | 'energy' | 'reputation' | 'salary' | 'bugCount'
    value: number
    perSlot?: boolean
  }[]
  duration: 'permanent' | 'day' | 'timeslot'
  icon: string
}

export const BUFFS: Buff[] = [
  // ===== BUFF CHUNG (Gen Z Office) =====
  {
    id: 'ca_phe_sua_da',
    name: 'Cà phê sữa đá',
    description: 'Nhiên liệu quốc dân. Uống cái là sống lại được 3 tiếng.',
    cost: 200000,
    icon: '☕',
    duration: 'timeslot',
    effects: [
      { stat: 'energy', value: +20 },
      { stat: 'stress', value: +5 },
    ],
  },
  {
    id: 'koi_the',
    name: 'KOI Thé Trà Sữa',
    description: 'Trà sữa signature, Gen Z uống là phải check-in story liền.',
    cost: 65000,
    icon: '🧋',
    duration: 'timeslot',
    effects: [
      { stat: 'energy', value: +22 },
      { stat: 'stress', value: +6 },
    ],
  },
  {
    id: 'phuc_long_tra_chanh',
    name: 'Trà Chanh Phúc Long',
    description: 'Chua ngọt vừa miệng, detox fake nhưng tâm hồn thì tươi tỉnh.',
    cost: 45000,
    icon: '🍋',
    duration: 'timeslot',
    effects: [
      { stat: 'energy', value: +18 },
      { stat: 'stress', value: -12 },
    ],
  },
  {
    id: 'starbucks_matcha',
    name: 'Matcha Latte Starbucks',
    description: 'Đắt nhưng aesthetic, uống xong là lên story "living my best life".',
    cost: 95000,
    icon: '🍵',
    duration: 'timeslot',
    effects: [
      { stat: 'energy', value: +20 },
      { stat: 'stress', value: -8 },
      { stat: 'reputation', value: +5 },
    ],
  },
  {
    id: 'nuoc_tang_luc',
    name: 'Nước tăng lực',
    description: 'Vị đắng kinh khủng nhưng desperate times call for desperate drinks.',
    cost: 150000,
    icon: '⚡',
    duration: 'timeslot',
    effects: [
      { stat: 'energy', value: +30 },
      { stat: 'stress', value: +12 },
    ],
  },

  // ===== IT DEV =====
  {
    id: 'claude_pro',
    name: 'Claude 3.5 Sonnet Pro',
    description: 'Gói Claude code pro, anh ấy code thay bạn, bạn chỉ việc merge thôi.',
    cost: 550000,
    icon: '🤖',
    duration: 'day',
    professions: ['it'],
    effects: [
      { stat: 'energy', value: +25 },
      { stat: 'bugCount', value: -3 },
    ],
  },
  {
    id: 'dark_mode',
    name: 'Dark Mode + OLED',
    description: 'Mắt không còn bị thiêu cháy, vibe hacker Gen Z full option.',
    cost: 100000,
    icon: '🌙',
    duration: 'day',
    professions: ['it'],
    effects: [
      { stat: 'stress', value: -12 },
      { stat: 'energy', value: +8 },
    ],
  },
  {
    id: 'dual_monitor',
    name: 'Setup Dual Monitor 4K',
    description: 'Code bên trái, Claude + TikTok bên phải. Peak productivity.',
    cost: 600000,
    icon: '🖥️',
    duration: 'day',
    professions: ['it'],
    effects: [
      { stat: 'energy', value: +15 },
      { stat: 'bugCount', value: -1 },
      { stat: 'reputation', value: +8 },
    ],
  },

  // ===== SEO BĐS =====
  {
    id: 'vest_sang_chanh',
    name: 'Vest Sang Chảnh',
    description: 'Mặc vào khách tự tin chuyển khoản, outfit clean girl/boy energy.',
    cost: 800000,
    icon: '🕴️',
    duration: 'day',
    professions: ['seo_bds'],
    effects: [
      { stat: 'reputation', value: +25 },
      { stat: 'salary', value: +2500000 },
    ],
  },
  {
    id: 'chot_deal',
    name: 'Kịch bản chốt deal Gen Z',
    description: 'Nói chuyện kiểu TikTok, khách hàng Gen Z nghe xong muốn cọc liền.',
    cost: 500000,
    icon: '💰',
    duration: 'day',
    professions: ['seo_bds'],
    effects: [
      { stat: 'reputation', value: +15 },
      { stat: 'salary', value: +1500000 },
    ],
  },
  {
    id: 'hot_listing',
    name: 'Hot Listing Viral',
    description: 'Căn hộ đẹp lung linh, story lên là khách inbox tùm lum.',
    cost: 1000000,
    icon: '🏠',
    duration: 'day',
    professions: ['seo_bds'],
    effects: [
      { stat: 'salary', value: +3500000 },
      { stat: 'reputation', value: +20 },
      { stat: 'stress', value: -10 },
    ],
  },

  // ===== KẾ TOÁN (Đã bổ sung thêm) =====
  {
    id: 'excel_than_thanh',
    name: 'Excel Thần Thánh',
    description: 'Macro + Power Query auto, excel run một phát xong việc.',
    cost: 400000,
    icon: '📗',
    duration: 'day',
    professions: ['ke_toan'],
    effects: [
      { stat: 'energy', value: +20 },
      { stat: 'stress', value: -18 },
      { stat: 'bugCount', value: -2 },
    ],
  },
  {
    id: 'power_bi_god',
    name: 'Power BI God Mode',
    description: 'Dashboard tự động, sếp xem là khen hết nước chấm.',
    cost: 650000,
    icon: '📊',
    duration: 'day',
    professions: ['ke_toan'],
    effects: [
      { stat: 'reputation', value: +25 },
      { stat: 'stress', value: -20 },
      { stat: 'energy', value: +12 },
    ],
  },
  {
    id: 'accounting_ai',
    name: 'Accounting AI Assistant',
    description: 'AI hỗ trợ hạch toán, check chứng từ, nhắc deadline thuế.',
    cost: 550000,
    icon: '🧠',
    duration: 'day',
    professions: ['ke_toan'],
    effects: [
      { stat: 'energy', value: +22 },
      { stat: 'bugCount', value: -3 },
      { stat: 'stress', value: -15 },
    ],
  },
  {
    id: 'notion_finance',
    name: 'Notion Finance Template',
    description: 'Template Notion xịn, mọi thứ từ sổ sách đến báo cáo đều đẹp lung linh.',
    cost: 350000,
    icon: '📋',
    duration: 'day',
    professions: ['ke_toan'],
    effects: [
      { stat: 'energy', value: +15 },
      { stat: 'stress', value: -12 },
      { stat: 'reputation', value: +10 },
    ],
  },
]

export const getBuffById = (id: string) => BUFFS.find(b => b.id === id)
export const getBuffsByProfession = (profession: Profession) =>
  BUFFS.filter(b => !b.professions || b.professions.includes(profession))