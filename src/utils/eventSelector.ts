import type { GameEvent } from '../types/event.types'
import type { TimeSlot } from '../types/game.types'

export function selectEvents(
  allEvents: GameEvent[],
  timeSlot: TimeSlot,
  count: number | [number, number],
  exclude: string[] = []
): GameEvent[] {
  const eligible = allEvents.filter(e =>
    !e.timeSlots || e.timeSlots.includes(timeSlot)
  ).filter(e => !exclude.includes(e.id))

  const n = Array.isArray(count)
    ? Math.floor(Math.random() * (count[1] - count[0] + 1)) + count[0]
    : count

  return [...eligible]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(n, eligible.length))
}