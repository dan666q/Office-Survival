// src/hooks/useEventDirector.ts
// Vòng điều phối sự kiện, không có giao diện. Trước đây nằm lặp lại trong CenterPanel/MobileEventSlot.
// Hành vi giữ nguyên: mỗi newEventInterval giây đẩy thêm sự kiện từ hàng chờ,
// hết sự kiện thì sang khung giờ kế (trừ giờ nghỉ trưa), mỗi sự kiện có hạn chót riêng.

import { useEffect } from 'react'
import { useGameStore } from '../store/gameStore'
import { DAYS_CONFIG, DIFFICULTY_CONFIGS } from '../data'
import { useTimerStore } from '../game/timers'

export function getEventDurationSeconds(day: string | null, difficulty: string): number {
  const dayConfig = DAYS_CONFIG.find((d) => d.day === day)
  const base = dayConfig?.eventTimer ?? 20
  const diff = DIFFICULTY_CONFIGS.find((d) => d.id === difficulty) ?? DIFFICULTY_CONFIGS[1]
  return Math.round(base * diff.timerMultiplier)
}

export function useEventDirector() {
  const currentDay = useGameStore((s) => s.currentDay)
  const currentTimeSlot = useGameStore((s) => s.currentTimeSlot)
  const difficulty = useGameStore((s) => s.difficulty)
  const queueLength = useGameStore((s) => s.eventQueue.length)
  const activeEvents = useGameStore((s) => s.activeEvents)

  const isBreakSlot = currentTimeSlot === 'lunch'
  const newEventInterval = DAYS_CONFIG.find((d) => d.day === currentDay)?.newEventInterval ?? 10
  const durationMs = getEventDurationSeconds(currentDay, difficulty) * 1000

  // Đẩy sự kiện mới / sang khung giờ kế
  useEffect(() => {
    if (isBreakSlot) return

    const { eventQueue, activeEvents: active, nextTimeSlot } = useGameStore.getState()
    if (eventQueue.length === 0 && active.length === 0) {
      nextTimeSlot()
      return
    }

    const id = setInterval(() => {
      useGameStore.getState().pushNextActiveEvent()
    }, newEventInterval * 1000)
    return () => clearInterval(id)
  }, [currentTimeSlot, queueLength, isBreakSlot, newEventInterval])

  // Gắn hạn chót cho sự kiện mới xuất hiện
  useEffect(() => {
    useTimerStore.getState().sync(
      activeEvents.map((e) => e.id),
      durationMs
    )
  }, [activeEvents, durationMs])

  // Hết giờ → phạt
  useEffect(() => {
    const id = setInterval(() => {
      const { deadlines } = useTimerStore.getState()
      const now = performance.now()
      for (const [eventId, d] of Object.entries(deadlines)) {
        if (now < d.startedAt + d.durationMs) continue
        useTimerStore.setState((s) => {
          const next = { ...s.deadlines }
          delete next[eventId]
          return { deadlines: next }
        })
        useGameStore.getState().handleTimeout(eventId)
      }
    }, 200)
    return () => {
      clearInterval(id)
      useTimerStore.getState().clear()
    }
  }, [])
}
