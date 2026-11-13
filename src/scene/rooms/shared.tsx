// src/scene/rooms/shared.tsx
// Phần dùng chung giữa các văn phòng: đế diorama, tường, chỗ ngồi làm việc, vùng bấm

import { useMemo, type ReactNode } from 'react'
import type { ThreeEvent } from '@react-three/fiber'
import { Box, Group, type Vec3 } from '../props/basic'
import { Desk, OfficeChair, Monitor, Keyboard, Mug, PcTower } from '../props/furniture'
import { Person, type Mood } from '../characters/Person'
import type { Contact } from '../../data/contacts'
import { PALETTE } from '../palette'
import { floorTileTexture } from '../textures'

/** Đế diorama + sàn gạch + 2 bức tường phía sau (tường trước để trống cho camera) */
export function RoomShell({ width, depth, wallHeight = 3, children }: { width: number; depth: number; wallHeight?: number; children?: ReactNode }) {
  const tex = useMemo(() => floorTileTexture(width / 1.2, depth / 1.2), [width, depth])
  const hw = width / 2
  const hd = depth / 2
  return (
    <group>
      {/* đế gỗ */}
      <Box size={[width + 0.3, 0.4, depth + 0.3]} position={[0, -0.2, 0]} color={PALETTE.woodDark} shadow={false} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial map={tex} roughness={0.55} />
      </mesh>

      {/* tường sau */}
      <Box size={[width + 0.15, wallHeight, 0.15]} position={[-0.075, wallHeight / 2, -hd - 0.075]} color={PALETTE.wall} />
      <Box size={[width, 1.0, 0.02]} position={[0, 0.5, -hd + 0.01]} color={PALETTE.wallLower} shadow={false} />
      <Box size={[width, 0.06, 0.04]} position={[0, 1.02, -hd + 0.02]} color={PALETTE.skirting} shadow={false} />
      {/* tường trái */}
      <Box size={[0.15, wallHeight, depth]} position={[-hw - 0.075, wallHeight / 2, 0]} color={PALETTE.wall} />
      <Box size={[0.02, 1.0, depth]} position={[-hw + 0.01, 0.5, 0]} color={PALETTE.wallLower} shadow={false} />
      <Box size={[0.04, 0.06, depth]} position={[-hw + 0.02, 1.02, 0]} color={PALETTE.skirting} shadow={false} />
      {children}
    </group>
  )
}

/** Vùng bấm được cho đồ vật — phóng to nhẹ khi rê chuột */
export function Clickable({ onSelect, children }: { onSelect?: () => void; children: ReactNode }) {
  if (!onSelect) return <>{children}</>
  return (
    <group
      onClick={(e: ThreeEvent<MouseEvent>) => {
        if (e.delta > 6) return
        e.stopPropagation()
        onSelect()
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        document.body.style.cursor = ''
      }}
    >
      {children}
    </group>
  )
}

interface WorkstationProps {
  position: Vec3
  rotationY?: number
  person?: Contact | null
  mood?: Mood
  alert?: boolean
  onSelectPerson?: () => void
  onSelectDesk?: () => void
  seed?: number
  monitors?: 1 | 2
  wideMonitor?: boolean
  keyboardColor?: string
  premiumChair?: boolean
  tone?: 'code' | 'chart' | 'mail'
  children?: ReactNode
}

/**
 * Bàn làm việc + ghế + người. Hệ toạ độ cục bộ: người ngồi phía +Z nhìn về -Z (về phía màn hình).
 * Đồ thêm (children) đặt trên mặt bàn ở y=0.76.
 */
export function Workstation({
  position,
  rotationY = 0,
  person,
  mood = 'normal',
  alert = false,
  onSelectPerson,
  onSelectDesk,
  seed = 1,
  monitors = 1,
  wideMonitor = false,
  keyboardColor,
  premiumChair = false,
  tone = 'code',
  children,
}: WorkstationProps) {
  return (
    <Group position={position} rotationY={rotationY}>
      <Clickable onSelect={onSelectDesk}>
        <Desk position={[0, 0, 0]} length={1.5} depth={0.75} />
        {wideMonitor ? (
          <Monitor position={[0, 0.76, -0.18]} seed={seed} tone={tone} wide />
        ) : monitors === 2 ? (
          <>
            <Monitor position={[-0.28, 0.76, -0.16]} rotationY={0.18} seed={seed} tone={tone} />
            <Monitor position={[0.28, 0.76, -0.16]} rotationY={-0.18} seed={seed + 7} tone={tone === 'code' ? 'mail' : tone} />
          </>
        ) : (
          <Monitor position={[0, 0.76, -0.16]} seed={seed} tone={tone} />
        )}
        <Keyboard position={[0, 0.76, 0.12]} color={keyboardColor} />
        <Mug position={[0.55, 0.76, 0.05]} color={seed % 2 ? '#f2efe8' : '#e3b35a'} />
        <PcTower position={[0.55, 0, -0.1]} />
      </Clickable>
      <group position={[0, 0.76, 0]}>{children}</group>
      <OfficeChair position={[0, 0, 0.62]} rotationY={Math.PI} premium={premiumChair} />
      {person && (
        <Person contact={person} position={[0, 0, 0.62]} rotationY={Math.PI} pose="sit" mood={mood} alert={alert} onSelect={onSelectPerson} />
      )}
    </Group>
  )
}
