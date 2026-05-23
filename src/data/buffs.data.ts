import type { Buff } from '../types/game.types'

export const BUFFS: Buff[] = [
  // ===== CHUNG =====
  {
    id: 'ca_phe_sua_da',
    name: 'Cà phê sữa đá',
    description: 'Nhiên liệu quốc dân. Không có cà phê không làm được gì.',
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
    name: 'Cơm trưa xịn',
    description: 'Bữa trưa đàng hoàng thay vì cơm hộp 30k. Não hoạt động tốt hơn hẳn.',
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
    name: 'Tai nghe chống ồn',
    description: 'Thế giới bên ngoài không tồn tại. Chỉ có bạn và công việc.',
    cost: 500000,
    icon: '🎧',
    duration: 'day',
    effects: [
      { stat: 'stress', value: -20 },
      { stat: 'energy', value: +15 },
    ],
  },
  {
    id: 'sep_di_cong_tac',
    name: 'Sếp đi công tác',
    description: 'Phép màu hiếm gặp. Văn phòng thở phào tập thể.',
    cost: 1000000,
    icon: '✈️',
    duration: 'day',
    effects: [
      { stat: 'stress', value: -25 },
      { stat: 'energy', value: +15 },
    ],
  },
  {
    id: 'friday_mode',
    name: 'Friday Mode',
    description: 'Tâm lý cuối tuần kích hoạt. Mọi thứ đều dễ chịu hơn 20%.',
    cost: 800000,
    icon: '🕶️',
    duration: 'day',
    effects: [
      { stat: 'stress', value: -20 },
      { stat: 'energy', value: +15 },
    ],
  },
  {
    id: 'nuoc_tang_luc',
    name: 'Nước tăng lực',
    description: 'Vị khủng khiếp. Hiệu quả không thể phủ nhận. Dùng lúc desperate.',
    cost: 100000,
    icon: '⚡',
    duration: 'timeslot',
    effects: [
      { stat: 'energy', value: +30 },
      { stat: 'stress', value: +10 },
    ],
  },
]