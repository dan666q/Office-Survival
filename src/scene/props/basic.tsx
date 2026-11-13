// src/scene/props/basic.tsx
// Khối hình cơ bản để dựng đồ vật — mọi thứ trong văn phòng ghép từ đây

import type { ReactNode } from 'react'
import type { ThreeElements } from '@react-three/fiber'

export type Vec3 = [number, number, number]

interface BoxProps {
  size: Vec3
  position?: Vec3
  rotation?: Vec3
  color: string
  roughness?: number
  metalness?: number
  emissive?: string
  emissiveIntensity?: number
  shadow?: boolean
  transparent?: boolean
  opacity?: number
  map?: ThreeElements['meshStandardMaterial']['map']
}

export function Box({
  size,
  position,
  rotation,
  color,
  roughness = 0.85,
  metalness = 0,
  emissive,
  emissiveIntensity = 1,
  shadow = true,
  transparent,
  opacity,
  map,
}: BoxProps) {
  return (
    <mesh position={position} rotation={rotation} castShadow={shadow} receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        roughness={roughness}
        metalness={metalness}
        emissive={emissive ?? '#000000'}
        emissiveIntensity={emissive ? emissiveIntensity : 0}
        transparent={transparent}
        opacity={opacity}
        map={map}
      />
    </mesh>
  )
}

interface CylProps {
  radius: number
  radiusBottom?: number
  height: number
  position?: Vec3
  rotation?: Vec3
  color: string
  segments?: number
  roughness?: number
  metalness?: number
  shadow?: boolean
  emissive?: string
  transparent?: boolean
  opacity?: number
}

export function Cyl({
  radius,
  radiusBottom,
  height,
  position,
  rotation,
  color,
  segments = 16,
  roughness = 0.8,
  metalness = 0,
  shadow = true,
  emissive,
  transparent,
  opacity,
}: CylProps) {
  return (
    <mesh position={position} rotation={rotation} castShadow={shadow} receiveShadow>
      <cylinderGeometry args={[radius, radiusBottom ?? radius, height, segments]} />
      <meshStandardMaterial
        color={color}
        roughness={roughness}
        metalness={metalness}
        emissive={emissive ?? '#000000'}
        emissiveIntensity={emissive ? 1 : 0}
        transparent={transparent}
        opacity={opacity}
      />
    </mesh>
  )
}

interface SphereProps {
  radius: number
  position?: Vec3
  scale?: Vec3
  color: string
  roughness?: number
  shadow?: boolean
}

export function Ball({ radius, position, scale, color, roughness = 0.8, shadow = true }: SphereProps) {
  return (
    <mesh position={position} scale={scale} castShadow={shadow}>
      <sphereGeometry args={[radius, 16, 12]} />
      <meshStandardMaterial color={color} roughness={roughness} />
    </mesh>
  )
}

export function Group({
  position,
  rotationY = 0,
  scale,
  children,
}: {
  position?: Vec3
  rotationY?: number
  scale?: number
  children: ReactNode
}) {
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {children}
    </group>
  )
}
