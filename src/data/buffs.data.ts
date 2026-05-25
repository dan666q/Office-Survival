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
    id: 'dau_gio_xanh_thien_thao',
    name: 'Dầu gió xanh Thiên Thảo',
    description: 'Huyền thoại dầu gió xanh Thiên Thảo. Hít một hơi ấm lòng mát phổi. Cung cấp phục hồi năng lượng và xả stress thụ động vĩnh viễn suốt tuần.',
    cost: 500000,
    icon: '🧴',
    duration: 'permanent',
    effects: [
      { stat: 'stress', value: -15 },
      { stat: 'energy', value: +10 },
    ],
  },
  {
    id: 'salonpas_dan_lung',
    name: 'Cả hộp Salonpas dán lưng',
    description: 'Cứu cánh tối thượng của chiếc cột sống thoái hóa văn phòng. Phục hồi và giảm stress thụ động vĩnh viễn cực mạnh suốt cả tuần.',
    cost: 900000,
    icon: '🩹',
    duration: 'permanent',
    effects: [
      { stat: 'stress', value: -30 },
      { stat: 'energy', value: +25 },
    ],
  },
  {
    id: 'tra_sua_koi_the',
    name: 'Trà sữa KOI Thé',
    description: 'Lục trà sữa trân châu hoàng kim 100% đường 100% đá ngọt ngào xoa dịu tâm hồn. Liều thuốc xả stress cực hạn tức thời.',
    cost: 650000,
    icon: '🥤',
    duration: 'timeslot',
    effects: [
      { stat: 'stress', value: -35 },
      { stat: 'energy', value: +10 },
    ],
  },
  {
    id: 'nuoc_tang_luc',
    name: 'Bò Húc Thái',
    description: 'Nước tăng lực lon vàng huyền thoại. Nốc một hơi tim đập thình thịch gánh deadline.',
    cost: 150000,
    icon: '🐂',
    duration: 'timeslot',
    effects: [
      { stat: 'energy', value: +30 },
      { stat: 'stress', value: +15 },
    ],
  },
]