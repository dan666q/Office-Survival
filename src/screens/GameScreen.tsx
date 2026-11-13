// src/screens/GameScreen.tsx
// Màn chơi: cảnh văn phòng 3D nằm phía sau (StageHost), màn này chỉ dựng lớp giấy tờ 2D phía trên.

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { LUNCH_BUFF_LIMIT } from '../store/gameHelpers'
import { DAYS_CONFIG } from '../data'
import { ACHIEVEMENTS } from '../utils/achievementChecker'
import { soundManager } from '../utils/soundManager'
import { useEventDirector } from '../hooks/useEventDirector'
import { useUiStore } from '../ui/uiStore'
import { useEventAnchors, hasWebGL } from '../ui/hooks'
import { PRIORITY_ORDER } from '../ui/format'
import { Hud } from '../ui/Hud'
import { EventTray } from '../ui/EventTray'
import { EventSheet } from '../ui/EventSheet'
import { EventPins, ChatBubbles } from '../ui/ScenePins'
import { ZaloPhone } from '../ui/ZaloPhone'
import { CanteenMenu } from '../ui/CanteenMenu'
import { SettingsSheet } from '../ui/SettingsSheet'
import { Handbook } from '../ui/Handbook'

interface Toast {
  id: string
  label: string
  description: string
}

/** Rung màn hình khi bị phạt quá hạn hoặc có việc hỏa tốc mới */
function useShake(root: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    let prevTimeouts = useGameStore.getState().consecutiveTimeouts
    let prevIds = new Set(useGameStore.getState().activeEvents.map((e) => e.id))
    let timer = 0
    const shake = () => {
      const el = root.current
      if (!el) return
      el.classList.remove('shake')
      void el.offsetWidth
      el.classList.add('shake')
      window.clearTimeout(timer)
      timer = window.setTimeout(() => el.classList.remove('shake'), 500)
    }
    const unsub = useGameStore.subscribe((s) => {
      if (s.consecutiveTimeouts > prevTimeouts) shake()
      prevTimeouts = s.consecutiveTimeouts
      const ids = new Set(s.activeEvents.map((e) => e.id))
      if (s.activeEvents.some((e) => e.priority === 'critical' && !prevIds.has(e.id))) shake()
      prevIds = ids
    })
    return () => {
      unsub()
      window.clearTimeout(timer)
    }
  }, [root])
}

/** Giấy khen khi mở thành tựu mới */
function useAchievementToast() {
  const [toast, setToast] = useState<Toast | null>(null)
  useEffect(() => {
    let prev = useGameStore.getState().achievements
    let timer = 0
    const unsub = useGameStore.subscribe((s) => {
      if (s.achievements === prev) return
      const fresh = s.achievements.find((id) => !prev.includes(id))
      prev = s.achievements
      const found = fresh && ACHIEVEMENTS.find((a) => a.id === fresh)
      if (!found) return
      setToast({ id: found.id, label: found.label, description: found.description })
      window.clearTimeout(timer)
      timer = window.setTimeout(() => setToast(null), 3800)
    })
    return () => {
      unsub()
      window.clearTimeout(timer)
    }
  }, [])
  return toast
}

export default function GameScreen() {
  useEventDirector()
  const webgl = hasWebGL()
  const root = useRef<HTMLDivElement>(null)
  useShake(root)
  const toast = useAchievementToast()

  const activeEvents = useGameStore((s) => s.activeEvents)
  const queued = useGameStore((s) => s.eventQueue.length)
  const slot = useGameStore((s) => s.currentTimeSlot)
  const currentDay = useGameStore((s) => s.currentDay)
  const lunchBought = useGameStore((s) => s.lunchBuffsBought)
  const stress = useGameStore((s) => s.stats.stress)
  const feedLog = useGameStore((s) => s.feedLog)
  const selectAction = useGameStore((s) => s.selectAction)

  const focusedId = useUiStore((s) => s.focusedEventId)
  const panel = useUiStore((s) => s.panel)
  const focusEvent = useUiStore((s) => s.focusEvent)
  const openPanel = useUiStore((s) => s.openPanel)
  const closeAll = useUiStore((s) => s.closeAll)

  const { room, byEvent } = useEventAnchors()

  // Zalo: đếm tin chưa đọc theo id dòng đã xem (feedLog bị cắt còn 50 dòng)
  const [seenId, setSeenId] = useState<string | undefined>(() => feedLog.at(-1)?.id)
  const seenIdx = seenId ? feedLog.findIndex((f) => f.id === seenId) : -1
  const unread = panel === 'zalo' ? 0 : feedLog.length - 1 - seenIdx
  const markSeen = useCallback(() => setSeenId(useGameStore.getState().feedLog.at(-1)?.id), [])

  const sorted = [...activeEvents].sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])
  const focused = activeEvents.find((e) => e.id === focusedId) ?? null
  const isLunch = slot === 'lunch'
  const canSkipOvertime =
    slot === 'overtime' && !!DAYS_CONFIG.find((d) => d.day === currentDay)?.timeSlots.find((s) => s.slot === 'overtime')?.canSkip

  // Âm thanh nền theo tình hình
  useEffect(() => {
    soundManager.setTension(stress >= 80)
  }, [stress])
  useEffect(() => {
    soundManager.setEventCount(activeEvents.length)
  }, [activeEvents.length])

  // Rời màn chơi thì đóng hết bảng
  useEffect(() => () => useUiStore.getState().closeAll(), [])

  const choose = (eventId: string, actionId: string) => {
    selectAction(eventId, actionId)
    // Còn việc khác trên bàn thì mở luôn việc gấp nhất
    const rest = useGameStore
      .getState()
      .activeEvents.filter((e) => e.id !== eventId)
      .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])
    if (useGameStore.getState().screen === 'game' && rest.length > 0) focusEvent(rest[0].id)
    else focusEvent(null)
  }

  const nextFocused = () => {
    if (sorted.length < 2) return
    const idx = sorted.findIndex((e) => e.id === focusedId)
    focusEvent(sorted[(idx + 1) % sorted.length].id)
  }

  const closePanel = useCallback(() => {
    if (useUiStore.getState().panel === 'zalo') markSeen()
    closeAll()
  }, [closeAll, markSeen])

  return (
    <div ref={root} className="pointer-events-none fixed inset-0">
      {/* Stress cao: viền đỏ con dấu quanh màn hình */}
      {stress >= 80 && (
        <div
          aria-hidden="true"
          className={`pointer-events-none fixed inset-0 z-10 ${stress >= 90 ? 'animate-pulse' : ''}`}
          style={{ boxShadow: `inset 0 0 0 ${stress >= 90 ? 8 : 5}px var(--color-stamp)` }}
        />
      )}

      {webgl && (
        <>
          <EventPins room={room} events={activeEvents} anchorOf={byEvent} focusedEventId={focusedId} onOpen={(id) => focusEvent(id)} />
          <ChatBubbles room={room} muted={panel === 'zalo'} />
        </>
      )}

      <Hud />

      <EventTray
        events={activeEvents}
        queued={queued}
        focusedEventId={focusedId}
        unread={unread}
        isLunch={isLunch}
        lunchLeft={LUNCH_BUFF_LIMIT - lunchBought}
        canSkipOvertime={canSkipOvertime}
        expanded={!webgl}
        onOpenEvent={(id) => focusEvent(id)}
        onOpenZalo={() => {
          soundManager.playClick()
          if (panel === 'zalo') closePanel()
          else {
            markSeen()
            openPanel('zalo')
          }
        }}
        onOpenSettings={() => {
          soundManager.playClick()
          openPanel(panel === 'settings' ? null : 'settings')
        }}
        onOpenCanteen={() => {
          soundManager.playClick()
          openPanel('canteen')
        }}
        onFinishLunch={() => {
          soundManager.playClick()
          closeAll()
          useGameStore.getState().nextTimeSlot()
        }}
        onGoHome={() => {
          soundManager.playClick()
          closeAll()
          useGameStore.getState().skipOvertime()
        }}
      />

      <div className="pointer-events-auto">
        <AnimatePresence>
          {focused && (
            <EventSheet
              key={focused.id}
              event={focused}
              anchor={byEvent.get(focused.id) ?? 'computer'}
              queueIndex={Math.max(0, sorted.findIndex((e) => e.id === focused.id))}
              queueTotal={sorted.length}
              onChoose={(actionId) => choose(focused.id, actionId)}
              onClose={() => focusEvent(null)}
              onNext={nextFocused}
            />
          )}
          {panel === 'zalo' && <ZaloPhone key="zalo" onClose={closePanel} />}
          {panel === 'canteen' && isLunch && <CanteenMenu key="canteen" onClose={closeAll} />}
          {panel === 'settings' && <SettingsSheet key="settings" onClose={closeAll} />}
          {panel === 'handbook' && <Handbook key="handbook" onClose={closeAll} />}
        </AnimatePresence>
      </div>

      {/* Giấy khen */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ y: -40, opacity: 0, rotate: -4 }}
            animate={{ y: 0, opacity: 1, rotate: -1.5 }}
            exit={{ y: -40, opacity: 0 }}
            className="paper pointer-events-none fixed top-24 left-1/2 z-50 w-[min(340px,90vw)] -translate-x-1/2 border-4 border-double border-stamp px-5 py-3 text-center"
          >
            <p className="text-xs font-bold text-stamp">GIẤY KHEN</p>
            <p className="mt-0.5 text-lg leading-tight font-extrabold text-ink">{toast.label}</p>
            <p className="hand mt-1 text-base text-pen">{toast.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
