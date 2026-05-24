import type { Buff } from '../types/game.types'

export const BUFFS: Buff[] = [
  // ===== CHUNG =====
  {
    id: 'ca_phe_sua_da',
    name: 'Highlands Phin Sữa Đá',
    description: 'Cà phê phin sữa đá size L quốc dân. Làm ngụm để giật tưng tưng suốt cả ca làm việc.',
    cost: 150000,
    icon: '☕',
    duration: 'timeslot',
    effects: [
      { stat: 'energy', value: +25 },
      { stat: 'stress', value: +5 },
    ],
  },
  {
    id: 'com_trua_xin',
    name: 'Cơm tấm sườn bì chả',
    description: 'Dĩa cơm tấm full-option thơm lừng mỡ hành. Đủ năng lượng để chiến drama chiều nay.',
    cost: 300000,
    icon: '🍱',
    duration: 'timeslot',
    effects: [
      { stat: 'energy', value: +35 },
      { stat: 'stress', value: -10 },
    ],
  },
  {
    id: 'tai_nghe_chong_on',
    name: 'Dầu gió xanh Thiên Thảo',
    description: 'Huyền thoại dầu gió xanh. Hít một hơi ấm lòng mát phổi, xoa vào thái dương quét sạch stress.',
    cost: 500000,
    icon: '🧴',
    duration: 'day',
    effects: [
      { stat: 'stress', value: -20 },
      { stat: 'energy', value: +15 },
    ],
  },
  {
    id: 'sep_di_cong_tac',
    name: 'Cả hộp Salonpas dán lưng',
    description: 'Cứu cánh của chiếc cột sống thoái hóa. Dán từ vai gáy xuống thắt lưng, nóng ran cực sướng.',
    cost: 1000000,
    icon: '🩹',
    duration: 'day',
    effects: [
      { stat: 'stress', value: -25 },
      { stat: 'energy', value: +15 },
    ],
  },
  {
    id: 'friday_mode',
    name: 'Trà sữa KOI Thé',
    description: 'Lục trà sữa trân châu hoàng kim 100% đường 100% đá. Ngọt ngào xoa dịu tâm hồn.',
    cost: 800000,
    icon: '🥤',
    duration: 'day',
    effects: [
      { stat: 'stress', value: -20 },
      { stat: 'energy', value: +15 },
    ],
  },
  {
    id: 'nuoc_tang_luc',
    name: 'Bò Húc Thái',
    description: 'Nước tăng lực lon vàng huyền thoại. Nốc một hơi tim đập thình thịch gánh deadline.',
    cost: 100000,
    icon: '🐂',
    duration: 'timeslot',
    effects: [
      { stat: 'energy', value: +30 },
      { stat: 'stress', value: +10 },
    ],
  },
]