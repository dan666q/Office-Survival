// src/ui/format.ts
import type { DayOfWeek, TimeSlot } from '../types/game.types'
import type { Priority } from '../types/event.types'

export const DAY_LABELS: Record<DayOfWeek, string> = {
  monday: 'Thứ Hai',
  tuesday: 'Thứ Ba',
  wednesday: 'Thứ Tư',
  thursday: 'Thứ Năm',
  friday: 'Thứ Sáu',
  saturday: 'Thứ Bảy',
}

export const DAY_NUMBER: Record<DayOfWeek, number> = {
  monday: 2,
  tuesday: 3,
  wednesday: 4,
  thursday: 5,
  friday: 6,
  saturday: 7,
}

export const SLOT_LABELS: Record<TimeSlot, string> = {
  morning_start: 'Vào ca',
  morning: 'Buổi sáng',
  lunch: 'Nghỉ trưa',
  afternoon: 'Buổi chiều',
  end_of_day: 'Tan ca',
  overtime: 'Tăng ca',
}

export const PRIORITY_STAMP: Record<Priority, { text: string; tone: 'stamp' | 'pen' | 'ink' }> = {
  critical: { text: 'HỎA TỐC', tone: 'stamp' },
  high: { text: 'KHẨN', tone: 'stamp' },
  medium: { text: 'CẦN XỬ LÝ', tone: 'pen' },
  low: { text: 'ĐỂ SAU CŨNG ĐƯỢC', tone: 'ink' },
}

export const PRIORITY_ORDER: Record<Priority, number> = { critical: 0, high: 1, medium: 2, low: 3 }

/** 1250000 → "1.250.000đ" */
export function formatMoney(value: number): string {
  const sign = value < 0 ? '-' : ''
  return `${sign}${Math.abs(Math.round(value)).toLocaleString('vi-VN')}đ`
}

/** 1250000 → "1,25tr", 150000 → "150k" — dùng ở chỗ chật */
export function formatMoneyShort(value: number): string {
  const abs = Math.abs(value)
  const sign = value < 0 ? '-' : ''
  if (abs >= 1_000_000) return `${sign}${(abs / 1_000_000).toFixed(abs >= 10_000_000 ? 0 : 2).replace(/\.?0+$/, '').replace('.', ',')}tr`
  if (abs >= 1000) return `${sign}${Math.round(abs / 1000)}k`
  return `${sign}${abs}đ`
}

// Bỏ emoji khỏi chuỗi hệ thống (tiêu đề, thông báo). Lời thoại Zalo thì giữ nguyên.
const EMOJI_RE = /(\p{Extended_Pictographic}|\p{Emoji_Modifier}|\p{Regional_Indicator}|‍|️|⃣)/gu

export function stripEmoji(text: string): string {
  return text.replace(EMOJI_RE, '').replace(/\s{2,}/g, ' ').trim()
}

export function statLabel(stat: 'stress' | 'energy' | 'salary'): string {
  return stat === 'stress' ? 'stress' : stat === 'energy' ? 'sức' : 'lương'
}

export function formatEffect(stat: 'stress' | 'energy' | 'salary', value: number): string {
  const sign = value > 0 ? '+' : ''
  if (stat === 'salary') return `${sign}${formatMoneyShort(value)} ${statLabel(stat)}`
  return `${sign}${value} ${statLabel(stat)}`
}
