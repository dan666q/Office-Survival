import type { ProfessionConfig, ProfessionPack, Buff } from '../types/game.types'
import type { GameEvent } from '../types/event.types'
import { BUFFS as COMMON_BUFFS } from '../data/buffs.data'

import { COMMON_EVENTS } from '../data/events/common.events'

// Eager load all profession files under the src/data/professions/ directory
const modules = import.meta.glob<any>('../data/professions/*.ts', { eager: true })

export const PROFESSION_PACKS: ProfessionPack[] = Object.values(modules).map(
  (m) => m.default || m
)

export const PROFESSIONS_CONFIG: ProfessionConfig[] = PROFESSION_PACKS.map((pack) => ({
  ...pack.config,
  uniqueBuffIds: pack.buffs.map((b) => b.id),
}))

export function getEventsForProfession(profession: string): GameEvent[] {
  const pack = PROFESSION_PACKS.find((p) => p.config.id === profession)
  const profEvents = pack ? pack.events : []
  return [
    ...profEvents,
    ...COMMON_EVENTS.map(e => ({ ...e, professions: [profession] }))
  ]
}

export function getBuffsForProfession(profession: string | null): Buff[] {
  if (!profession) return COMMON_BUFFS
  const pack = PROFESSION_PACKS.find((p) => p.config.id === profession)
  const uniqueBuffs = pack ? pack.buffs : []
  
  return [
    ...uniqueBuffs.map(b => ({ ...b, professions: [profession] })),
    ...COMMON_BUFFS
  ]
}

export function getStartingStats(profession: string): any {
  const config = PROFESSIONS_CONFIG.find((p) => p.id === profession)
  return config?.startingStats
}
