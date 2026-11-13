// src/scene/rooms/types.ts
import type { AnchorId } from '../eventLocation'
import type { Mood } from '../characters/Person'
import type { TimeSlot } from '../../types/game.types'

export interface RoomState {
  /** 'empty' = văn phòng sáng sớm chưa ai đến (màn Start) */
  mode: 'empty' | 'work' | 'evening'
  slot: TimeSlot
  stress: number
  energy: number
  buffIds: string[]
  dayNumber: string
  weekday: string
  clock: string
  playerMood: Mood
  /** Điểm neo đang có việc chờ */
  alerts: ReadonlySet<AnchorId>
  onAnchor?: (anchor: AnchorId) => void
}
