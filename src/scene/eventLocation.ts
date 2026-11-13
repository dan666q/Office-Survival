// src/scene/eventLocation.ts
// Quyết định một sự kiện "xảy ra ở đâu" trong văn phòng.
// Thứ tự: event.location → từ khóa trong tiêu đề/mô tả → người hay nhắn nhất trong chatReplies → máy tính của người chơi.

import type { GameEvent } from '../types/event.types'

export type AnchorId =
  | 'computer'
  | 'boss'
  | 'pm'
  | 'cto'
  | 'it_dev'
  | 'intern'
  | 'hr'
  | 'server'
  | 'printer'
  | 'canteen'
  | 'meeting'

// Từ khóa tiêu đề quan trọng hơn mô tả; mỗi luật thử tiêu đề trước rồi mới tới mô tả
const KEYWORD_RULES: { anchor: AnchorId; re: RegExp }[] = [
  { anchor: 'printer', re: /máy in|kẹt giấy|photocopy|mực in/ },
  { anchor: 'server', re: /server|production|database|deploy|sập|downtime|data center|backup|ổ cứng|mạng lag|wifi/ },
  { anchor: 'boss', re: /sếp|giám đốc|\bceo\b|boss|ban lãnh đạo|tổng tài/ },
  { anchor: 'intern', re: /intern|thực tập|học việc/ },
  { anchor: 'hr', re: /\bhr\b|nhân sự|tuyển dụng|hợp đồng|quỹ|bảo hiểm|team ?building|liên hoan|sinh nhật|đánh giá năng lực|kpi cá nhân|nghỉ phép/ },
  { anchor: 'cto', re: /\bcto\b|kiến trúc|framework|công nghệ mới|migrate|tech stack|microservice/ },
  { anchor: 'canteen', re: /pantry|ăn trưa|cà phê|trà sữa|đồ ăn|tủ lạnh|bánh|hóng chuyện|tám chuyện/ },
  { anchor: 'meeting', re: /họp|meeting|sprint|daily|retro|thuyết trình|slide/ },
  { anchor: 'pm', re: /\bpm\b|deadline|estimate|requirement|yêu cầu|scope|jira|task|khách hàng|client/ },
  { anchor: 'it_dev', re: /code review|pull request|\bpr\b|bug|legacy|refactor|merge|git/ },
]

const SENDER_TO_ANCHOR: Partial<Record<string, AnchorId>> = {
  sep: 'boss',
  pm: 'pm',
  cto: 'cto',
  it_dev: 'it_dev',
  intern: 'intern',
  hr: 'hr',
}

export function resolveEventAnchor(event: GameEvent, available: ReadonlySet<AnchorId>): AnchorId {
  const explicit = event.location as AnchorId | undefined
  if (explicit && available.has(explicit)) return explicit

  const title = event.title.toLowerCase()
  const description = event.description.toLowerCase()
  for (const text of [title, description]) {
    for (const rule of KEYWORD_RULES) {
      if (available.has(rule.anchor) && rule.re.test(text)) return rule.anchor
    }
  }

  const counts = new Map<AnchorId, number>()
  for (const action of event.actions) {
    for (const reply of action.chatReplies ?? []) {
      const anchor = SENDER_TO_ANCHOR[reply.senderId]
      if (anchor && available.has(anchor)) counts.set(anchor, (counts.get(anchor) ?? 0) + 1)
    }
  }
  let best: AnchorId | null = null
  let bestCount = 0
  for (const [anchor, n] of counts) {
    if (n > bestCount) {
      best = anchor
      bestCount = n
    }
  }
  return best ?? 'computer'
}
