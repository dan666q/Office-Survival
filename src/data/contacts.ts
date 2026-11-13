// src/data/contacts.ts
// Danh bạ đồng nghiệp: dùng chung cho Zalo (2D) và nhân vật trong văn phòng (3D)

import type { ChatReply } from '../types/event.types'

export type ContactId = ChatReply['senderId']

export interface Contact {
  id: ContactId
  name: string
  role: string
  initials: string
  /** Màu áo — cũng là màu avatar trong Zalo */
  shirt: string
  hair: string
  /** Chi tiết nhận dạng khi dựng nhân vật 3D */
  look: 'vest' | 'glasses' | 'cap' | 'longhair' | 'bun' | 'plain' | 'headset'
}

export const CONTACTS: Record<ContactId, Contact> = {
  sep: { id: 'sep', name: 'Sếp Messi', role: 'Giám đốc', initials: 'SM', shirt: '#2f3b52', hair: '#3a2a1e', look: 'vest' },
  pm: { id: 'pm', name: 'PM Jisoo', role: 'Quản lý dự án', initials: 'PJ', shirt: '#d9707f', hair: '#1d1712', look: 'longhair' },
  hr: { id: 'hr', name: 'HR J97', role: 'Nhân sự', initials: 'HR', shirt: '#d99a3e', hair: '#1d1712', look: 'cap' },
  intern: { id: 'intern', name: 'Intern CR7', role: 'Thực tập sinh', initials: 'CR', shirt: '#5f9e6e', hair: '#2b1f15', look: 'plain' },
  cto: { id: 'cto', name: 'CTO Elon Musk', role: 'Giám đốc công nghệ', initials: 'EM', shirt: '#3d3d46', hair: '#5a4632', look: 'plain' },
  mkt: { id: 'mkt', name: 'Sơn Tùng M-TP', role: 'Marketing', initials: 'ST', shirt: '#e0b84a', hair: '#1d1712', look: 'plain' },
  design: { id: 'design', name: 'Lisa Designer', role: 'Thiết kế', initials: 'LD', shirt: '#4fa3a0', hair: '#e8d29b', look: 'longhair' },
  ba: { id: 'ba', name: 'Negav BA', role: 'Phân tích nghiệp vụ', initials: 'NB', shirt: '#c97a4a', hair: '#1d1712', look: 'glasses' },
  sales: { id: 'sales', name: 'Hieuthuhai Sales', role: 'Kinh doanh', initials: 'HS', shirt: '#4d7fb8', hair: '#1d1712', look: 'vest' },
  it_dev: { id: 'it_dev', name: 'Độ Mixi IT', role: 'Lập trình viên', initials: 'ĐM', shirt: '#55606e', hair: '#1d1712', look: 'headset' },
  accounting: { id: 'accounting', name: 'Pháo Kế Toán', role: 'Kế toán', initials: 'PK', shirt: '#b5543a', hair: '#1d1712', look: 'bun' },
  seo: { id: 'seo', name: 'Dương Lâm SEO', role: 'SEO', initials: 'DL', shirt: '#7d9c3e', hair: '#1d1712', look: 'cap' },
  legal: { id: 'legal', name: 'Trấn Thành Pháp Chế', role: 'Pháp chế', initials: 'TT', shirt: '#5b5e9e', hair: '#1d1712', look: 'glasses' },
  admin: { id: 'admin', name: 'ViruSs Admin', role: 'Hành chính', initials: 'VA', shirt: '#c96f9b', hair: '#1d1712', look: 'glasses' },
  self: { id: 'self', name: 'Tôi', role: 'Bạn', initials: 'TÔI', shirt: '#1f3a93', hair: '#1d1712', look: 'plain' },
}

export function getContact(id: string | undefined): Contact {
  return (id && CONTACTS[id as ContactId]) || CONTACTS.pm
}
