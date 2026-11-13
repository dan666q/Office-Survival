// src/ui/hooks.ts
import { useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import { useGameStore } from '../store/gameStore'
import { useTimerStore, remainingOf } from '../game/timers'
import { getRoomLayout } from '../scene/rooms/layouts'
import { resolveEventAnchor, type AnchorId } from '../scene/eventLocation'

const MOBILE_QUERY = '(max-width: 767px)'

function subscribeMedia(cb: () => void) {
  const mq = window.matchMedia(MOBILE_QUERY)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

export function useIsMobile() {
  return useSyncExternalStore(subscribeMedia, () => window.matchMedia(MOBILE_QUERY).matches)
}

/** Thời gian còn lại của một sự kiện, cập nhật ~6 lần/giây */
export function useRemaining(eventId: string | null) {
  const deadline = useTimerStore((s) => (eventId ? s.deadlines[eventId] : undefined))
  const [now, setNow] = useState(() => performance.now())
  useEffect(() => {
    if (!deadline) return
    const id = setInterval(() => setNow(performance.now()), 160)
    return () => clearInterval(id)
  }, [deadline])
  return remainingOf(deadline, now)
}

/** Sự kiện → điểm neo trong văn phòng của nghề hiện tại */
export function useEventAnchors() {
  const profession = useGameStore((s) => s.profession)
  const activeEvents = useGameStore((s) => s.activeEvents)
  return useMemo(() => {
    const room = getRoomLayout(profession)
    const available = new Set(Object.keys(room.anchors) as AnchorId[])
    const byEvent = new Map<string, AnchorId>()
    for (const e of activeEvents) byEvent.set(e.id, resolveEventAnchor(e, available))
    return { room, byEvent, alerts: new Set(byEvent.values()) as ReadonlySet<AnchorId> }
  }, [profession, activeEvents])
}

let webglCache: boolean | null = null
export function hasWebGL(): boolean {
  if (webglCache !== null) return webglCache
  try {
    const c = document.createElement('canvas')
    webglCache = !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    webglCache = false
  }
  return webglCache
}
