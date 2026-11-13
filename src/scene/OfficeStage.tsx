// src/scene/OfficeStage.tsx
// Sân khấu 3D: Canvas + camera isometric + ánh sáng theo khung giờ + văn phòng theo nghề.
// File này được lazy-load để màn đầu tải nhanh.

import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MapControls, OrthographicCamera } from '@react-three/drei'
import * as THREE from 'three'
import type { MapControls as MapControlsImpl } from 'three-stdlib'
import { useGameStore } from '../store/gameStore'
import type { TimeSlot } from '../types/game.types'
import { RoomView } from './rooms/RoomView'
import { getRoomLayout } from './rooms/layouts'
import type { RoomState } from './rooms/types'
import type { AnchorId } from './eventLocation'
import type { Mood } from './characters/Person'
import { pinRegistry, pinSafeArea } from './pins'
import { DAY_LABELS, DAY_NUMBER } from '../ui/format'

export interface StageProps {
  mode: RoomState['mode']
  professionId: string | null
  focus: AnchorId | null
  /** Phần màn hình bị hộp thoại che (px) để camera đẩy điểm neo ra chỗ trống */
  focusInset?: { right: number; bottom: number }
  interactive?: boolean
  alerts?: ReadonlySet<AnchorId>
  onAnchor?: (anchor: AnchorId) => void
  onBackgroundClick?: () => void
  moodOverride?: Mood
  /** Ép khung giờ (màn Start dùng sáng sớm, tổng kết dùng chạng vạng) */
  slotOverride?: TimeSlot
  /** Dùng chỉ số thật của ván đang chơi (stress làm đèn chập chờn...) hay để phòng ở trạng thái bình thường */
  live: boolean
  /** Shipper ở pantry vẫy tay (giờ trưa) */
  highlightCanteen?: boolean
}

const EMPTY_ALERTS: ReadonlySet<AnchorId> = new Set()
const ISO_DIR = new THREE.Vector3(1, 0.92, 1).normalize()
const CAM_DIST = 30
const OVERVIEW_TARGET = new THREE.Vector3(0, 0.6, 0)
// Vector tạm dùng lại mỗi khung hình (chỉ có một sân khấu tại một thời điểm)
const SCRATCH = {
  target: new THREE.Vector3(),
  right: new THREE.Vector3(),
  up: new THREE.Vector3(),
  cur: new THREE.Vector3(),
  pin: new THREE.Vector3(),
}

// ===================== ÁNH SÁNG =====================

interface LightPreset {
  sun: string
  sunIntensity: number
  sunPos: [number, number, number]
  sky: string
  ground: string
  hemi: number
  bg: string
  lamps: number
}

const LIGHTS: Record<TimeSlot, LightPreset> = {
  morning_start: { sun: '#ffe1b8', sunIntensity: 2.0, sunPos: [10, 7, 6], sky: '#e6ecf2', ground: '#9a7d5e', hemi: 1.15, bg: '#2f2a24', lamps: 0 },
  morning: { sun: '#fff1d8', sunIntensity: 2.4, sunPos: [7, 11, 6], sky: '#eef1f2', ground: '#a08462', hemi: 1.25, bg: '#2f2a24', lamps: 0 },
  lunch: { sun: '#fff8ea', sunIntensity: 2.6, sunPos: [3, 13, 5], sky: '#f4f1ea', ground: '#a8896a', hemi: 1.3, bg: '#302a24', lamps: 0 },
  afternoon: { sun: '#ffdcaa', sunIntensity: 2.3, sunPos: [9, 9, 2], sky: '#f2e8d8', ground: '#9e7c58', hemi: 1.15, bg: '#2f2822', lamps: 0 },
  end_of_day: { sun: '#ffb070', sunIntensity: 1.8, sunPos: [11, 4.5, 1], sky: '#e9cfb0', ground: '#7d5c40', hemi: 0.95, bg: '#2a221c', lamps: 0.4 },
  overtime: { sun: '#7f93c4', sunIntensity: 0.35, sunPos: [6, 9, 8], sky: '#4a5878', ground: '#2a2420', hemi: 0.55, bg: '#16151a', lamps: 1 },
}

function Lights({ slot, energy }: { slot: TimeSlot; energy: number }) {
  const p = LIGHTS[slot]
  // Kiệt sức: cả phòng xám đi
  const tired = energy <= 25 ? 0.65 + (energy / 25) * 0.35 : 1
  const sky = useMemo(() => {
    const c = new THREE.Color(p.sky)
    if (tired < 1) c.lerp(new THREE.Color('#9aa0a6'), 1 - tired)
    return c
  }, [p.sky, tired])
  return (
    <>
      <color attach="background" args={[p.bg]} />
      <hemisphereLight args={[sky, p.ground, p.hemi * tired]} />
      <directionalLight
        position={p.sunPos}
        color={p.sun}
        intensity={p.sunIntensity * tired}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-near={0.5}
        shadow-camera-far={40}
        shadow-bias={-0.0006}
        shadow-normalBias={0.02}
      />
      {p.lamps > 0 && (
        <>
          <pointLight position={[-1.2, 2.5, -3.6]} color="#e8f4ff" intensity={6 * p.lamps} distance={9} decay={1.6} />
          <pointLight position={[1.9, 2.5, -3.6]} color="#e8f4ff" intensity={6 * p.lamps} distance={9} decay={1.6} />
          <pointLight position={[-5.2, 2.5, 2.2]} color="#e8f4ff" intensity={4 * p.lamps} distance={8} decay={1.6} />
          <pointLight position={[1.0, 1.4, 1.2]} color="#9fd8c6" intensity={2.5 * p.lamps} distance={4} decay={1.8} />
        </>
      )}
    </>
  )
}

// ===================== CAMERA =====================

function fitZoom(width: number, height: number, room: [number, number], portrait: boolean) {
  const [w, d] = room
  const isoWidth = (w + d) / Math.SQRT2 + 1
  const isoHeight = isoWidth * 0.62 + 3
  const fit = Math.min(width / isoWidth, height / isoHeight)
  // Màn dọc (điện thoại): phóng to hơn, người chơi kéo để xem phần còn lại
  return portrait ? fit * 1.45 : fit
}

function CameraRig({
  focusPoint,
  focusInset,
  roomSize,
  interactive,
  drift,
}: {
  focusPoint: THREE.Vector3 | null
  focusInset: { right: number; bottom: number }
  roomSize: [number, number]
  interactive: boolean
  drift: boolean
}) {
  const controls = useThree((s) => s.controls) as unknown as MapControlsImpl | null
  const size = useThree((s) => s.size)
  const animating = useRef(true)
  const baseZoom = fitZoom(size.width - Math.abs(focusInset.right), size.height - focusInset.bottom * 0.6, roomSize, size.width < size.height)

  // Mỗi lần đổi điểm nhìn hoặc kích thước → bay lại
  const focusKey = focusPoint ? focusPoint.toArray().join(',') : 'overview'
  useEffect(() => {
    animating.current = true
  }, [focusKey, size.width, size.height, focusInset.right, focusInset.bottom])

  // Người chơi tự kéo/zoom thì thôi bay
  useEffect(() => {
    if (!controls) return
    const stop = () => {
      animating.current = false
    }
    controls.addEventListener('start', stop)
    return () => controls.removeEventListener('start', stop)
  }, [controls])

  useFrame((state, dt) => {
    const controls = state.controls as unknown as MapControlsImpl | null
    const cam = state.camera as THREE.OrthographicCamera
    const target = controls ? controls.target : SCRATCH.cur
    const k = 1 - Math.pow(0.0015, dt) // nội suy mượt, không phụ thuộc fps

    if (animating.current || !interactive) {
      const desiredZoom = focusPoint ? Math.max(baseZoom * 1.75, 48) : baseZoom
      SCRATCH.target.copy(focusPoint ?? OVERVIEW_TARGET)

      // Đẩy điểm nhìn ra khỏi vùng bị giấy tờ che (phiếu việc bên phải, tờ giấy bên trái, bottom sheet)
      SCRATCH.right.set(1, 0, 0).applyQuaternion(cam.quaternion)
      SCRATCH.up.set(0, 1, 0).applyQuaternion(cam.quaternion)
      SCRATCH.target.addScaledVector(SCRATCH.right, focusInset.right / 2 / desiredZoom)
      SCRATCH.target.addScaledVector(SCRATCH.up, -focusInset.bottom / 2 / desiredZoom)
      if (!focusPoint && drift) {
        const t = state.clock.getElapsedTime()
        SCRATCH.target.x += Math.sin(t * 0.12) * 0.8
        SCRATCH.target.z += Math.cos(t * 0.1) * 0.5
      }

      target.lerp(SCRATCH.target, k)
      cam.zoom = THREE.MathUtils.lerp(cam.zoom, desiredZoom, k)
      if (!drift && target.distanceTo(SCRATCH.target) < 0.01 && Math.abs(cam.zoom - desiredZoom) < 0.2) {
        animating.current = false
      }
    } else {
      // Giới hạn vùng kéo
      const [w, d] = roomSize
      target.x = THREE.MathUtils.clamp(target.x, -w / 2, w / 2)
      target.z = THREE.MathUtils.clamp(target.z, -d / 2, d / 2)
    }

    cam.position.copy(target).addScaledVector(ISO_DIR, CAM_DIST)
    cam.lookAt(target)
    cam.updateProjectionMatrix()
  })

  return null
}

// ===================== GHIM DOM =====================

function PinTracker() {
  useFrame((state) => {
    const { camera, size } = state
    const { top, bottom, left, right } = pinSafeArea
    const v = SCRATCH.pin
    for (const pin of pinRegistry.values()) {
      v.set(pin.world[0], pin.world[1], pin.world[2]).project(camera)
      const sx = (v.x * 0.5 + 0.5) * size.width
      const sy = (-v.y * 0.5 + 0.5) * size.height
      const x = pin.clampToEdge ? THREE.MathUtils.clamp(sx, left + 40, size.width - right - 40) : sx
      const y = pin.clampToEdge ? THREE.MathUtils.clamp(sy, top + 100, size.height - bottom - 20) : sy
      const off = pin.clampToEdge ? x !== sx || y !== sy : sx < 0 || sx > size.width || sy < 0 || sy > size.height
      pin.el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
      if (pin.el.dataset.off !== String(off)) pin.el.dataset.off = String(off)
      if (off) pin.el.style.setProperty('--arrow-angle', `${Math.atan2(sy - size.height / 2, sx - size.width / 2)}rad`)
    }
  })
  return null
}

// ===================== SÂN KHẤU =====================

function StageContent(props: StageProps) {
  const room = getRoomLayout(props.professionId)
  const stats = useGameStore((s) => s.stats)
  const storeSlot = useGameStore((s) => s.currentTimeSlot)
  const currentDay = useGameStore((s) => s.currentDay)
  const activeBuffs = useGameStore((s) => s.activeBuffs)
  const lastTime = useGameStore((s) => s.feedLog[s.feedLog.length - 1]?.timestamp)

  const slot: TimeSlot = props.slotOverride ?? storeSlot ?? 'morning_start'
  const day = currentDay ?? 'monday'
  const stress = props.live ? stats.stress : 0
  const energy = props.live ? stats.energy : 100
  const mood: Mood = props.moodOverride ?? (energy <= 25 ? 'slump' : stress >= 80 ? 'panic' : 'normal')

  const alerts = useMemo(() => {
    if (!props.highlightCanteen) return props.alerts ?? EMPTY_ALERTS
    return new Set<AnchorId>([...(props.alerts ?? []), 'canteen'])
  }, [props.alerts, props.highlightCanteen])

  const focusPoint = useMemo(() => {
    if (!props.focus) return null
    const a = room.anchors[props.focus]
    return a ? new THREE.Vector3(a[0], a[1] - 0.9, a[2]) : null
  }, [props.focus, room])

  const interactive = props.interactive ?? false

  return (
    <>
      <OrthographicCamera makeDefault position={[ISO_DIR.x * CAM_DIST, ISO_DIR.y * CAM_DIST, ISO_DIR.z * CAM_DIST]} zoom={40} near={0.1} far={120} />
      <MapControls
        makeDefault
        enableRotate={false}
        enablePan={interactive}
        enableZoom={interactive}
        enableDamping
        dampingFactor={0.12}
        minZoom={18}
        maxZoom={140}
        screenSpacePanning={false}
      />
      <CameraRig
        focusPoint={focusPoint}
        focusInset={props.focusInset ?? { right: 0, bottom: 0 }}
        roomSize={room.size}
        interactive={interactive}
        drift={!interactive}
      />
      <Lights slot={slot} energy={energy} />
      <group>
        <RoomView
          professionId={props.professionId}
          mode={props.mode}
          slot={slot}
          stress={stress}
          energy={energy}
          buffIds={props.live ? activeBuffs : []}
          dayNumber={String(DAY_NUMBER[day] + 18)}
          weekday={DAY_LABELS[day]}
          clock={props.mode === 'empty' ? '07:05' : (lastTime ?? '08:00')}
          playerMood={mood}
          alerts={alerts}
          onAnchor={interactive ? props.onAnchor : undefined}
        />
      </group>
      <PinTracker />
    </>
  )
}

export default function OfficeStage(props: StageProps) {
  // Kéo để pan thì không tính là "bấm ra ngoài"
  const down = useRef<{ x: number; y: number } | null>(null)
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      onPointerDown={(e) => {
        down.current = { x: e.clientX, y: e.clientY }
      }}
      onPointerMissed={(e) => {
        const d = down.current
        if (d && Math.hypot(e.clientX - d.x, e.clientY - d.y) > 6) return
        props.onBackgroundClick?.()
      }}
      style={{ position: 'absolute', inset: 0, touchAction: 'none' }}
    >
      <StageContent {...props} />
    </Canvas>
  )
}
