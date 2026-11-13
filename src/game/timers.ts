// src/game/timers.ts
// Hạn chót của từng sự kiện đang mở. Không lưu vào localStorage: reload thì đếm lại từ đầu (giống bản cũ).

import { create } from 'zustand'

export interface EventDeadline {
  startedAt: number
  durationMs: number
}

interface TimerState {
  deadlines: Record<string, EventDeadline>
  sync: (eventIds: string[], durationMs: number) => void
  clear: () => void
}

export const useTimerStore = create<TimerState>()((set, get) => ({
  deadlines: {},
  sync: (eventIds, durationMs) => {
    const current = get().deadlines
    const next: Record<string, EventDeadline> = {}
    let changed = Object.keys(current).length !== eventIds.length
    const now = performance.now()
    for (const id of eventIds) {
      if (current[id]) {
        next[id] = current[id]
      } else {
        next[id] = { startedAt: now, durationMs }
        changed = true
      }
    }
    if (changed) set({ deadlines: next })
  },
  clear: () => set({ deadlines: {} }),
}))

/** Thời gian còn lại (giây, có phần lẻ) và tỉ lệ 0..1 */
export function remainingOf(deadline: EventDeadline | undefined, now = performance.now()) {
  if (!deadline) return { seconds: 0, ratio: 0 }
  const leftMs = Math.max(0, deadline.startedAt + deadline.durationMs - now)
  return { seconds: leftMs / 1000, ratio: leftMs / deadline.durationMs }
}
