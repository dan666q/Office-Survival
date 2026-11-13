// src/StageHost.tsx
// Một cảnh văn phòng 3D duy nhất nằm sau mọi màn hình. Mỗi màn chỉ đổi góc máy, ánh sáng và trạng thái phòng.

import { lazy, Suspense, useCallback, useMemo } from 'react'
import { useGameStore } from './store/gameStore'
import { PRIORITY_ORDER } from './ui/format'
import { useEventAnchors, useIsMobile } from './ui/hooks'
import { useUiStore } from './ui/uiStore'
import { MOBILE_SHEET_RATIO, SHEET_WIDTH } from './ui/Sheet'
import type { StageProps } from './scene/OfficeStage'
import type { AnchorId } from './scene/eventLocation'

const OfficeStage = lazy(() => import('./scene/OfficeStage'))

type Screen = ReturnType<typeof useGameStore.getState>['screen']

/** Nền khi chưa tải xong cảnh 3D hoặc máy không có WebGL: tường kem + gạch caro */
export function StageBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        backgroundColor: '#2b2620',
        backgroundImage:
          'linear-gradient(45deg, rgba(181,84,58,.18) 25%, transparent 25%, transparent 75%, rgba(181,84,58,.18) 75%), linear-gradient(45deg, rgba(181,84,58,.18) 25%, transparent 25%, transparent 75%, rgba(181,84,58,.18) 75%)',
        backgroundSize: '56px 56px',
        backgroundPosition: '0 0, 28px 28px',
      }}
    />
  )
}

export function StageHost({ screen }: { screen: Screen }) {
  const profession = useGameStore((s) => s.profession)
  const isLunch = useGameStore((s) => s.currentTimeSlot === 'lunch')
  const previewProfession = useUiStore((s) => s.previewProfession)
  const focusedEventId = useUiStore((s) => s.focusedEventId)
  const panel = useUiStore((s) => s.panel)
  const mobile = useIsMobile()
  const { byEvent, alerts } = useEventAnchors()

  const inGame = screen === 'game'

  const focus: AnchorId | null = !inGame
    ? null
    : panel === 'canteen'
      ? 'canteen'
      : focusedEventId
        ? (byEvent.get(focusedEventId) ?? null)
        : null

  const sheetOpen = inGame && (!!focusedEventId || panel === 'canteen')
  const focusInset = useMemo(
    () =>
      sheetOpen
        ? mobile
          ? { right: 0, bottom: window.innerHeight * MOBILE_SHEET_RATIO }
          : { right: SHEET_WIDTH + 20, bottom: 0 }
        : { right: 0, bottom: 0 },
    [sheetOpen, mobile]
  )

  const onAnchor = useCallback(
    (anchor: AnchorId) => {
      const ui = useUiStore.getState()
      if (anchor === 'canteen' && useGameStore.getState().currentTimeSlot === 'lunch') {
        ui.openPanel('canteen')
        return
      }
      const events = useGameStore
        .getState()
        .activeEvents.filter((e) => byEvent.get(e.id) === anchor)
        .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])
      if (events.length > 0) ui.focusEvent(events[0].id)
    },
    [byEvent]
  )

  const onBackgroundClick = useCallback(() => {
    if (inGame) useUiStore.getState().closeAll()
  }, [inGame])

  // Các màn có tờ giấy lớn (ScreenPaper): bên trái trên desktop, dưới đáy trên điện thoại
  const paperInset = mobile ? { right: 0, bottom: window.innerHeight * 0.55 } : { right: -600, bottom: 0 }

  let props: StageProps
  switch (screen) {
    case 'start':
      props = { mode: 'empty', professionId: 'it', focus: null, focusInset: paperInset, slotOverride: 'morning_start', live: false }
      break
    case 'profession':
      props = { mode: 'work', professionId: previewProfession ?? 'it', focus: null, focusInset: paperInset, slotOverride: 'morning', live: false }
      break
    case 'daily_summary':
      props = { mode: 'evening', professionId: profession, focus: null, focusInset: paperInset, slotOverride: 'end_of_day', live: true }
      break
    case 'game_over':
      props = { mode: 'evening', professionId: profession, focus: null, focusInset: paperInset, slotOverride: 'overtime', moodOverride: 'slump', live: true }
      break
    case 'victory':
      props = { mode: 'work', professionId: profession, focus: null, focusInset: paperInset, slotOverride: 'end_of_day', moodOverride: 'cheer', live: false }
      break
    default:
      props = {
        mode: 'work',
        professionId: profession,
        focus,
        focusInset,
        interactive: inGame,
        alerts: inGame ? alerts : undefined,
        onAnchor,
        onBackgroundClick,
        live: true,
        // giờ trưa: shipper đứng chờ ở pantry
        highlightCanteen: inGame && isLunch,
      }
  }

  return (
    <Suspense fallback={<StageBackdrop />}>
      <OfficeStage {...props} />
    </Suspense>
  )
}
