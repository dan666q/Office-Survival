// src/scene/props/furniture.tsx
// Nội thất văn phòng Việt Nam: bàn gỗ ép, ghế xoay, màn hình, bình Lavie, quạt trần...

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Box, Cyl, Ball, Group, type Vec3 } from './basic'
import { PALETTE } from '../palette'
import { codeScreenTexture, whiteboardTexture, companySignTexture } from '../textures'

interface Placed {
  position: Vec3
  rotationY?: number
}

/** Bàn gỗ ép mặt kem, chân panel — trục dài theo X cục bộ */
export function Desk({ position, rotationY, length = 1.5, depth = 0.75 }: Placed & { length?: number; depth?: number }) {
  const h = 0.74
  return (
    <Group position={position} rotationY={rotationY}>
      <Box size={[length, 0.04, depth]} position={[0, h, 0]} color={PALETTE.desk} />
      <Box size={[length, 0.012, depth]} position={[0, h - 0.026, 0]} color={PALETTE.deskEdge} shadow={false} />
      <Box size={[0.04, h - 0.02, depth - 0.06]} position={[-length / 2 + 0.03, (h - 0.02) / 2, 0]} color={PALETTE.deskEdge} />
      <Box size={[0.04, h - 0.02, depth - 0.06]} position={[length / 2 - 0.03, (h - 0.02) / 2, 0]} color={PALETTE.deskEdge} />
      <Box size={[length - 0.1, 0.35, 0.02]} position={[0, 0.48, -depth / 2 + 0.06]} color={PALETTE.deskEdge} />
    </Group>
  )
}

/** Ghế xoay lưới — mặt trước hướng +Z cục bộ */
export function OfficeChair({ position, rotationY, color = PALETTE.black, premium = false }: Placed & { color?: string; premium?: boolean }) {
  const seat = premium ? '#1b1c1f' : color
  return (
    <Group position={position} rotationY={rotationY}>
      <Cyl radius={0.26} height={0.04} position={[0, 0.06, 0]} color={PALETTE.metalDark} segments={5} />
      <Cyl radius={0.025} height={0.36} position={[0, 0.25, 0]} color={PALETTE.metal} metalness={0.6} roughness={0.4} />
      <Box size={[0.46, 0.07, 0.44]} position={[0, 0.45, 0]} color={seat} />
      <Box size={[0.44, premium ? 0.62 : 0.5, 0.06]} position={[0, premium ? 0.8 : 0.74, -0.22]} rotation={[-0.12, 0, 0]} color={seat} />
      {premium && <Box size={[0.3, 0.12, 0.08]} position={[0, 1.16, -0.25]} color={seat} />}
    </Group>
  )
}

/** Màn hình máy tính — màn quay về +Z cục bộ */
export function Monitor({
  position,
  rotationY,
  seed = 1,
  tone = 'code',
  wide = false,
}: Placed & { seed?: number; tone?: 'code' | 'chart' | 'mail'; wide?: boolean }) {
  const tex = useMemo(() => codeScreenTexture(seed, tone), [seed, tone])
  const w = wide ? 0.82 : 0.5
  return (
    <Group position={position} rotationY={rotationY}>
      <Box size={[0.18, 0.015, 0.14]} position={[0, 0.008, 0]} color={PALETTE.black} />
      <Box size={[0.04, 0.2, 0.03]} position={[0, 0.11, -0.03]} color={PALETTE.black} />
      <Box size={[w, 0.32, 0.03]} position={[0, 0.33, 0]} color={PALETTE.black} />
      <mesh position={[0, 0.33, 0.016]}>
        <planeGeometry args={[w - 0.04, 0.28]} />
        <meshStandardMaterial map={tex} emissive="#ffffff" emissiveMap={tex} emissiveIntensity={0.55} roughness={0.4} />
      </mesh>
    </Group>
  )
}

export function Keyboard({ position, rotationY, color = '#3a3d42' }: Placed & { color?: string }) {
  return (
    <Group position={position} rotationY={rotationY}>
      <Box size={[0.42, 0.02, 0.14]} position={[0, 0.01, 0]} color={color} />
      <Box size={[0.07, 0.02, 0.1]} position={[0.3, 0.01, 0]} color={PALETTE.plastic} />
    </Group>
  )
}

export function Mug({ position, color = '#f2efe8' }: { position: Vec3; color?: string }) {
  return (
    <group position={position}>
      <Cyl radius={0.045} height={0.1} position={[0, 0.05, 0]} color={color} />
      <Cyl radius={0.038} height={0.005} position={[0, 0.098, 0]} color="#5a3820" shadow={false} />
    </group>
  )
}

export function PcTower({ position, rotationY }: Placed) {
  return (
    <Group position={position} rotationY={rotationY}>
      <Box size={[0.2, 0.42, 0.42]} position={[0, 0.21, 0]} color={PALETTE.black} />
      <Box size={[0.012, 0.03, 0.03]} position={[0.101, 0.36, 0.15]} color="#7dffb0" emissive="#7dffb0" shadow={false} />
    </Group>
  )
}

/** Chồng giấy tờ — cao theo mức stress */
export function PaperStack({ position, count }: { position: Vec3; count: number }) {
  const sheets = Array.from({ length: count })
  return (
    <group position={position}>
      {sheets.map((_, i) => (
        <Box
          key={i}
          size={[0.24, 0.05, 0.32]}
          position={[Math.sin(i * 2.1) * 0.02, 0.025 + i * 0.05, Math.cos(i * 1.7) * 0.02]}
          rotation={[0, Math.sin(i * 3.3) * 0.15, 0]}
          color={i % 3 === 2 ? '#f0e6cf' : PALETTE.paper}
        />
      ))}
    </group>
  )
}

/** Quạt cây đứng — quay nhanh hơn khi stress cao. Mặt quạt hướng +Z cục bộ */
export function StandingFan({ position, rotationY, speed }: Placed & { speed: number }) {
  const blades = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (blades.current) blades.current.rotation.z += dt * speed
  })
  return (
    <Group position={position} rotationY={rotationY}>
      <Cyl radius={0.2} height={0.04} position={[0, 0.02, 0]} color={PALETTE.plastic} segments={20} />
      <Cyl radius={0.02} height={1.0} position={[0, 0.52, 0]} color={PALETTE.plastic} />
      <Box size={[0.14, 0.12, 0.18]} position={[0, 1.05, -0.06]} color={PALETTE.plastic} />
      <group position={[0, 1.08, 0.06]} rotation={[0.1, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.22, 0.012, 6, 24]} />
          <meshStandardMaterial color="#7fb7d4" />
        </mesh>
        <group ref={blades}>
          {[0, 1, 2].map((i) => (
            <group key={i} rotation={[0, 0, (i * Math.PI * 2) / 3]}>
              <Box size={[0.08, 0.18, 0.01]} position={[0, 0.1, 0]} color="#a8d4ec" shadow={false} transparent opacity={0.85} />
            </group>
          ))}
        </group>
        <Cyl radius={0.04} height={0.04} position={[0, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]} color={PALETTE.plastic} />
      </group>
    </Group>
  )
}

/** Bình nước Lavie úp ngược trên cây nóng lạnh */
export function WaterDispenser({ position, rotationY }: Placed) {
  return (
    <Group position={position} rotationY={rotationY}>
      <Box size={[0.32, 0.95, 0.32]} position={[0, 0.475, 0]} color={PALETTE.plastic} />
      <Box size={[0.03, 0.04, 0.02]} position={[-0.06, 0.62, 0.17]} color="#c8102e" shadow={false} />
      <Box size={[0.03, 0.04, 0.02]} position={[0.06, 0.62, 0.17]} color="#1f6fd1" shadow={false} />
      <Box size={[0.24, 0.02, 0.1]} position={[0, 0.5, 0.16]} color={PALETTE.metalDark} />
      <Cyl radius={0.14} height={0.4} position={[0, 1.15, 0]} color={PALETTE.water} transparent opacity={0.75} roughness={0.2} />
      <Cyl radius={0.08} radiusBottom={0.14} height={0.08} position={[0, 0.97, 0]} color={PALETTE.water} transparent opacity={0.75} />
      <Cyl radius={0.06} height={0.03} position={[0, 1.36, 0]} color="#1f6fd1" />
    </Group>
  )
}

export function Printer({ position, rotationY, jammed = false }: Placed & { jammed?: boolean }) {
  return (
    <Group position={position} rotationY={rotationY}>
      <Box size={[0.6, 0.5, 0.5]} position={[0, 0.25, 0]} color="#d9d6cf" />
      <Box size={[0.6, 0.35, 0.5]} position={[0, 0.68, 0]} color="#c7c3ba" />
      <Box size={[0.5, 0.02, 0.22]} position={[0, 0.87, 0.18]} rotation={[-0.25, 0, 0]} color={PALETTE.paper} />
      <Box size={[0.08, 0.04, 0.02]} position={[0.2, 0.78, 0.26]} color={jammed ? PALETTE.stamp : '#7dffb0'} emissive={jammed ? PALETTE.stamp : '#7dffb0'} shadow={false} />
      {jammed && <Box size={[0.3, 0.01, 0.2]} position={[0.05, 0.56, 0.32]} rotation={[0.6, 0.2, 0]} color={PALETTE.paper} />}
    </Group>
  )
}

/** Tủ server có đèn nháy */
export function ServerRack({ position, rotationY, alarm = false }: Placed & { alarm?: boolean }) {
  const leds = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (!leds.current) return
    const t = clock.getElapsedTime()
    leds.current.children.forEach((child, i) => {
      const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial
      const on = alarm ? Math.sin(t * 8) > 0 : Math.sin(t * (2 + (i % 5)) + i * 1.7) > -0.2
      mat.emissiveIntensity = on ? 1.4 : 0.1
    })
  })
  const ledColor = alarm ? PALETTE.stamp : '#7dffb0'
  return (
    <Group position={position} rotationY={rotationY}>
      <Box size={[0.7, 2.0, 0.8]} position={[0, 1.0, 0]} color="#2c2f33" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <Box key={`u${i}`} size={[0.6, 0.18, 0.02]} position={[0, 0.35 + i * 0.22, 0.41]} color="#3b3f45" shadow={false} />
      ))}
      <group ref={leds}>
        {Array.from({ length: 14 }).map((_, i) => (
          <mesh key={i} position={[-0.22 + (i % 2) * 0.06, 0.38 + Math.floor(i / 2) * 0.22, 0.425]}>
            <boxGeometry args={[0.03, 0.03, 0.01]} />
            <meshStandardMaterial color={ledColor} emissive={ledColor} emissiveIntensity={1} />
          </mesh>
        ))}
      </group>
    </Group>
  )
}

/** Cây kim tiền trong chậu sứ */
export function Plant({ position, scale = 1 }: { position: Vec3; scale?: number }) {
  const leaves = [
    [0.05, 0.55, 0.02, 0.3],
    [-0.08, 0.6, 0.05, -0.4],
    [0.02, 0.72, -0.06, 0.1],
    [0.1, 0.48, -0.05, 0.7],
    [-0.04, 0.8, 0.03, -0.2],
  ]
  return (
    <group position={position} scale={scale}>
      <Cyl radius={0.16} radiusBottom={0.12} height={0.3} position={[0, 0.15, 0]} color={PALETTE.pot} />
      {leaves.map(([x, y, z, r], i) => (
        <group key={i} position={[x, y, z]} rotation={[0, 0, r]}>
          <Cyl radius={0.012} height={0.5} position={[0, -0.12, 0]} color={PALETTE.plantDark} shadow={false} />
          <Ball radius={0.09} position={[0, 0.14, 0]} scale={[0.55, 1.4, 0.25]} color={i % 2 ? PALETTE.plant : PALETTE.plantDark} />
        </group>
      ))}
    </group>
  )
}

/** Cửa sổ nhôm kính có rèm lá dọc — gắn trên mặt tường (mặt trước hướng +Z cục bộ) */
export function BlindsWindow({ position, rotationY, width = 2.4, night = false }: Placed & { width?: number; night?: boolean }) {
  const slats = Math.round(width / 0.11)
  return (
    <Group position={position} rotationY={rotationY}>
      <Box size={[width + 0.12, 1.5, 0.06]} position={[0, 0, 0]} color="#c9cdd0" metalness={0.3} />
      <mesh position={[0, 0, 0.035]}>
        <planeGeometry args={[width, 1.38]} />
        <meshStandardMaterial
          color={night ? '#1d2a44' : '#f4e3b8'}
          emissive={night ? '#26375a' : '#ffe7b0'}
          emissiveIntensity={night ? 0.5 : 0.9}
        />
      </mesh>
      {Array.from({ length: slats }).map((_, i) => (
        <Box
          key={i}
          size={[0.09, 1.34, 0.008]}
          position={[-width / 2 + 0.06 + i * 0.11, 0.0, 0.07]}
          rotation={[0, 0.9, 0]}
          color="#e8e2d0"
          shadow={false}
        />
      ))}
      <Box size={[width + 0.12, 0.08, 0.1]} position={[0, 0.72, 0.08]} color="#d8d2c0" />
    </Group>
  )
}

/** Đèn tuýp huỳnh quang gắn tường — chập chờn khi stress cao */
export function TubeLight({ position, rotationY, flicker = false, on = true }: Placed & { flicker?: boolean; on?: boolean }) {
  const mat = useRef<THREE.MeshStandardMaterial>(null)
  useFrame(({ clock }) => {
    if (!mat.current) return
    if (!on) {
      mat.current.emissiveIntensity = 0.05
      return
    }
    if (!flicker) {
      mat.current.emissiveIntensity = 1.2
      return
    }
    const t = clock.getElapsedTime()
    const n = Math.sin(t * 37) * Math.sin(t * 11.3) + Math.sin(t * 3.1)
    mat.current.emissiveIntensity = n > 1.1 ? 0.1 : 1.2
  })
  return (
    <Group position={position} rotationY={rotationY}>
      <Box size={[1.2, 0.08, 0.1]} position={[0, 0, 0]} color={PALETTE.plastic} />
      <mesh position={[0, -0.03, 0.04]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.025, 0.025, 1.1, 8]} />
        <meshStandardMaterial ref={mat} color="#f4fbff" emissive="#e8f6ff" emissiveIntensity={1.2} />
      </mesh>
    </Group>
  )
}

/** Bảng trắng treo tường */
export function Whiteboard({ position, rotationY }: Placed) {
  const tex = useMemo(() => whiteboardTexture(), [])
  return (
    <Group position={position} rotationY={rotationY}>
      <Box size={[2.0, 1.25, 0.04]} position={[0, 0, 0]} color={PALETTE.metal} metalness={0.4} />
      <mesh position={[0, 0, 0.022]}>
        <planeGeometry args={[1.92, 1.17]} />
        <meshStandardMaterial map={tex} roughness={0.5} />
      </mesh>
      <Box size={[1.4, 0.04, 0.08]} position={[0, -0.66, 0.04]} color={PALETTE.metal} />
    </Group>
  )
}

export function CompanySign({ position, rotationY }: Placed) {
  const tex = useMemo(() => companySignTexture(), [])
  return (
    <Group position={position} rotationY={rotationY}>
      <Box size={[2.1, 0.55, 0.05]} position={[0, 0, 0]} color={PALETTE.woodDark} />
      <mesh position={[0, 0, 0.027]}>
        <planeGeometry args={[2.0, 0.5]} />
        <meshStandardMaterial map={tex} roughness={0.6} />
      </mesh>
    </Group>
  )
}

/** Tủ hồ sơ sắt 4 ngăn */
export function FilingCabinet({ position, rotationY }: Placed) {
  return (
    <Group position={position} rotationY={rotationY}>
      <Box size={[0.48, 1.3, 0.6]} position={[0, 0.65, 0]} color="#8f9a8c" metalness={0.3} roughness={0.6} />
      {[0, 1, 2, 3].map((i) => (
        <group key={i}>
          <Box size={[0.44, 0.005, 0.01]} position={[0, 0.32 * i + 0.32, 0.305]} color="#6e776b" shadow={false} />
          <Box size={[0.12, 0.025, 0.02]} position={[0, 0.32 * i + 0.18, 0.31]} color={PALETTE.metal} metalness={0.7} shadow={false} />
        </group>
      ))}
    </Group>
  )
}

export function Fridge({ position, rotationY }: Placed) {
  return (
    <Group position={position} rotationY={rotationY}>
      <Box size={[0.65, 1.7, 0.65]} position={[0, 0.85, 0]} color="#e9e6df" roughness={0.4} />
      <Box size={[0.64, 0.01, 0.01]} position={[0, 1.15, 0.33]} color="#b9b5ab" shadow={false} />
      <Box size={[0.03, 0.3, 0.03]} position={[0.26, 1.4, 0.34]} color={PALETTE.metal} metalness={0.6} />
      <Box size={[0.03, 0.4, 0.03]} position={[0.26, 0.8, 0.34]} color={PALETTE.metal} metalness={0.6} />
      <Box size={[0.12, 0.12, 0.005]} position={[-0.12, 1.45, 0.33]} color={PALETTE.note} shadow={false} />
      <Box size={[0.1, 0.1, 0.005]} position={[0.05, 1.3, 0.33]} rotation={[0, 0, 0.2]} color="#f4a7a0" shadow={false} />
    </Group>
  )
}

/** Quầy pantry: tủ bếp + ấm siêu tốc + lò vi sóng + mì tôm */
export function PantryCounter({ position, rotationY, length = 2.0 }: Placed & { length?: number }) {
  return (
    <Group position={position} rotationY={rotationY}>
      <Box size={[length, 0.86, 0.6]} position={[0, 0.43, 0]} color={PALETTE.wood} />
      <Box size={[length + 0.04, 0.04, 0.64]} position={[0, 0.88, 0]} color="#e3ddd0" />
      {/* lò vi sóng */}
      <Box size={[0.5, 0.3, 0.38]} position={[-length / 2 + 0.35, 1.05, -0.05]} color="#d9d6cf" />
      <Box size={[0.3, 0.22, 0.01]} position={[-length / 2 + 0.3, 1.05, 0.145]} color={PALETTE.black} shadow={false} />
      {/* ấm siêu tốc */}
      <Cyl radius={0.08} radiusBottom={0.1} height={0.22} position={[0.1, 1.01, 0]} color="#e9e6df" />
      {/* thùng mì */}
      <Box size={[0.4, 0.26, 0.3]} position={[length / 2 - 0.3, 1.03, 0]} color="#e2b33a" />
      <Box size={[0.36, 0.08, 0.005]} position={[length / 2 - 0.3, 1.05, 0.152]} color={PALETTE.stamp} shadow={false} />
    </Group>
  )
}

/** Cửa ra vào sơn xanh ngọc — mặt trước hướng +Z cục bộ */
export function Door({ position, rotationY, color = PALETTE.wallLower }: Placed & { color?: string }) {
  return (
    <Group position={position} rotationY={rotationY}>
      <Box size={[1.0, 2.15, 0.08]} position={[0, 1.075, 0]} color={PALETTE.woodDark} />
      <Box size={[0.86, 2.05, 0.06]} position={[0, 1.04, 0.02]} color={color} />
      <Box size={[0.6, 0.5, 0.01]} position={[0, 1.55, 0.055]} color="#a9c9cf" roughness={0.2} shadow={false} />
      <Cyl radius={0.03} height={0.12} position={[0.34, 1.0, 0.08]} rotation={[Math.PI / 2, 0, 0]} color="#d4b25a" metalness={0.7} roughness={0.3} />
    </Group>
  )
}

/** Vách ngăn phòng sếp: chân gỗ, trên là kính */
export function GlassPartition({ position, rotationY, length }: Placed & { length: number }) {
  return (
    <Group position={position} rotationY={rotationY}>
      <Box size={[length, 0.9, 0.08]} position={[0, 0.45, 0]} color={PALETTE.woodDark} />
      <Box size={[length, 1.3, 0.03]} position={[0, 1.55, 0]} color={PALETTE.glass} transparent opacity={0.32} roughness={0.1} shadow={false} />
      <Box size={[length, 0.06, 0.1]} position={[0, 2.22, 0]} color={PALETTE.woodDark} />
      <Box size={[0.06, 2.25, 0.1]} position={[-length / 2, 1.12, 0]} color={PALETTE.woodDark} />
      <Box size={[0.06, 2.25, 0.1]} position={[length / 2, 1.12, 0]} color={PALETTE.woodDark} />
    </Group>
  )
}

/** Dép tổ ong dưới gầm bàn — đặc sản văn phòng */
export function Slippers({ position, rotationY }: Placed) {
  return (
    <Group position={position} rotationY={rotationY}>
      <Box size={[0.1, 0.03, 0.25]} position={[-0.07, 0.015, 0]} rotation={[0, 0.15, 0]} color="#f2efe8" />
      <Box size={[0.1, 0.03, 0.25]} position={[0.08, 0.015, 0.03]} rotation={[0, -0.2, 0]} color="#f2efe8" />
      <Box size={[0.1, 0.02, 0.06]} position={[-0.07, 0.04, 0.06]} rotation={[0, 0.15, 0]} color="#2f6fb5" shadow={false} />
      <Box size={[0.1, 0.02, 0.06]} position={[0.08, 0.04, 0.09]} rotation={[0, -0.2, 0]} color="#2f6fb5" shadow={false} />
    </Group>
  )
}

/** Ổ cắm kéo dài + dây điện lằng nhằng dưới sàn */
export function PowerStrip({ position, rotationY, points }: Placed & { points: Vec3[] }) {
  const tube = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)))
    return new THREE.TubeGeometry(curve, 40, 0.012, 6, false)
  }, [points])
  return (
    <Group position={position} rotationY={rotationY}>
      <Box size={[0.36, 0.04, 0.07]} position={[0, 0.02, 0]} color={PALETTE.plastic} />
      <Box size={[0.02, 0.012, 0.03]} position={[0.14, 0.045, 0]} color={PALETTE.stamp} emissive={PALETTE.stamp} shadow={false} />
      <mesh geometry={tube} castShadow={false} receiveShadow>
        <meshStandardMaterial color="#1e1f22" roughness={0.6} />
      </mesh>
    </Group>
  )
}

/** Máy chấm công vân tay gắn tường */
export function TimeClock({ position, rotationY }: Placed) {
  return (
    <Group position={position} rotationY={rotationY}>
      <Box size={[0.22, 0.3, 0.08]} position={[0, 0, 0]} color="#2c2f33" />
      <Box size={[0.14, 0.07, 0.01]} position={[0, 0.07, 0.042]} color="#7dffb0" emissive="#3a9a6a" shadow={false} />
      <Box size={[0.07, 0.07, 0.02]} position={[0, -0.06, 0.045]} color="#5d7fa3" shadow={false} />
    </Group>
  )
}

export function Sofa({ position, rotationY }: Placed) {
  return (
    <Group position={position} rotationY={rotationY}>
      <Box size={[1.5, 0.4, 0.7]} position={[0, 0.25, 0]} color="#9c4f3a" />
      <Box size={[1.5, 0.5, 0.18]} position={[0, 0.55, -0.26]} color="#8a4432" />
      <Box size={[0.16, 0.55, 0.7]} position={[-0.75, 0.32, 0]} color="#8a4432" />
      <Box size={[0.16, 0.55, 0.7]} position={[0.75, 0.32, 0]} color="#8a4432" />
    </Group>
  )
}
