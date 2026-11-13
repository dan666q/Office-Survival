// src/scene/characters/Person.tsx
// Người low-poly: thân capsule, đầu tròn, phụ kiện nhận dạng theo từng đồng nghiệp.
// Hướng mặt là +Z cục bộ, gốc toạ độ ở sàn (dưới ghế nếu ngồi).

import { useRef, useState } from 'react'
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import type { Contact } from '../../data/contacts'
import { PALETTE } from '../palette'
import { Box, Ball, Cyl, type Vec3 } from '../props/basic'

export type Pose = 'sit' | 'stand'
export type Mood = 'normal' | 'slump' | 'panic' | 'cheer'

interface PersonProps {
  contact: Contact
  position: Vec3
  rotationY?: number
  pose?: Pose
  mood?: Mood
  /** Có việc cần bạn → vẫy tay, nhún đầu */
  alert?: boolean
  onSelect?: () => void
}

function Capsule({ radius, length, position, color, rotation }: { radius: number; length: number; position?: Vec3; color: string; rotation?: Vec3 }) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <capsuleGeometry args={[radius, length, 4, 10]} />
      <meshStandardMaterial color={color} roughness={0.85} />
    </mesh>
  )
}

function Hair({ contact }: { contact: Contact }) {
  const c = contact.hair
  switch (contact.look) {
    case 'longhair':
      return (
        <group>
          <Ball radius={0.17} position={[0, 0.04, -0.02]} scale={[1.02, 0.85, 1.02]} color={c} />
          <Box size={[0.3, 0.32, 0.12]} position={[0, -0.12, -0.1]} color={c} />
        </group>
      )
    case 'bun':
      return (
        <group>
          <Ball radius={0.165} position={[0, 0.045, -0.02]} scale={[1, 0.78, 1]} color={c} />
          <Ball radius={0.07} position={[0, 0.17, -0.08]} color={c} />
        </group>
      )
    case 'cap':
      return (
        <group>
          <Cyl radius={0.165} height={0.1} position={[0, 0.1, 0]} color={contact.shirt} />
          <Box size={[0.22, 0.02, 0.14]} position={[0, 0.06, 0.17]} color={contact.shirt} />
        </group>
      )
    default:
      return <Ball radius={0.165} position={[0, 0.05, -0.025]} scale={[1, 0.72, 1]} color={c} />
  }
}

function Accessory({ contact }: { contact: Contact }) {
  switch (contact.look) {
    case 'glasses':
      return (
        <group position={[0, 0.0, 0.15]}>
          <Box size={[0.07, 0.045, 0.012]} position={[-0.055, 0, 0]} color="#1b1b1b" shadow={false} />
          <Box size={[0.07, 0.045, 0.012]} position={[0.055, 0, 0]} color="#1b1b1b" shadow={false} />
          <Box size={[0.04, 0.01, 0.01]} position={[0, 0.01, 0]} color="#1b1b1b" shadow={false} />
        </group>
      )
    case 'headset':
      return (
        <group>
          <mesh position={[0, 0.03, 0]} rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.18, 0.015, 6, 16, Math.PI]} />
            <meshStandardMaterial color="#1b1b1b" />
          </mesh>
          <Box size={[0.04, 0.09, 0.08]} position={[-0.17, -0.01, 0]} color="#1b1b1b" />
          <Box size={[0.04, 0.09, 0.08]} position={[0.17, -0.01, 0]} color="#1b1b1b" />
        </group>
      )
    default:
      return null
  }
}

export function Person({ contact, position, rotationY = 0, pose = 'sit', mood = 'normal', alert = false, onSelect }: PersonProps) {
  const body = useRef<THREE.Group>(null)
  const head = useRef<THREE.Group>(null)
  const armL = useRef<THREE.Group>(null)
  const armR = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  // lệch pha theo vị trí để mọi người không thở/gõ phím đồng loạt
  const phase = position[0] * 1.7 + position[2] * 2.3

  const seated = pose === 'sit'
  const hipY = seated ? 0.5 : 0.62

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + phase
    if (!body.current || !head.current || !armL.current || !armR.current) return

    // thở
    body.current.scale.y = 1 + Math.sin(t * 2) * 0.012

    let bodyTilt = 0
    let headTilt = 0
    let headTurn = 0
    let lx = seated ? -1.15 : 0.05
    let rx = lx
    let lz = 0.08
    let rz = -0.08

    if (seated && mood === 'normal' && !alert) {
      // gõ phím
      lx += Math.sin(t * 14) * 0.05
      rx += Math.sin(t * 14 + 1.4) * 0.05
    }
    if (mood === 'slump') {
      bodyTilt = 0.55
      headTilt = 0.5
      lx = -1.4
      rx = -1.4
    }
    if (mood === 'panic') {
      lx = -2.7
      rx = -2.7
      lz = 0.5
      rz = -0.5
      headTurn = Math.sin(t * 9) * 0.15
    }
    if (mood === 'cheer') {
      lx = -2.9
      rx = -2.9
      lz = -0.3 + Math.sin(t * 8) * 0.15
      rz = 0.3 - Math.sin(t * 8) * 0.15
    }
    if (alert) {
      rx = -2.6
      rz = -0.35 + Math.sin(t * 9) * 0.35
      headTilt = Math.sin(t * 6) * 0.08
      body.current.position.y = hipY + Math.abs(Math.sin(t * 6)) * 0.03
    } else {
      body.current.position.y = hipY
    }

    body.current.rotation.x = THREE.MathUtils.lerp(body.current.rotation.x, bodyTilt, 0.1)
    head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, headTilt, 0.15)
    head.current.rotation.y = headTurn
    armL.current.rotation.x = THREE.MathUtils.lerp(armL.current.rotation.x, lx, 0.2)
    armR.current.rotation.x = THREE.MathUtils.lerp(armR.current.rotation.x, rx, 0.2)
    armL.current.rotation.z = THREE.MathUtils.lerp(armL.current.rotation.z, lz, 0.2)
    armR.current.rotation.z = THREE.MathUtils.lerp(armR.current.rotation.z, rz, 0.2)
  })

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    if (!onSelect || e.delta > 6) return
    e.stopPropagation()
    onSelect()
  }

  const trousers = '#3b3f4a'
  const shirt = contact.shirt

  return (
    <group
      position={position}
      rotation={[0, rotationY, 0]}
      scale={hovered && onSelect ? 1.05 : 1}
      onClick={handleClick}
      onPointerOver={(e) => {
        if (!onSelect) return
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        if (!onSelect) return
        setHovered(false)
        document.body.style.cursor = ''
      }}
    >
      {/* chân */}
      {seated ? (
        <group>
          <Box size={[0.13, 0.12, 0.42]} position={[-0.085, 0.52, 0.17]} color={trousers} />
          <Box size={[0.13, 0.12, 0.42]} position={[0.085, 0.52, 0.17]} color={trousers} />
          <Box size={[0.11, 0.44, 0.11]} position={[-0.085, 0.27, 0.36]} color={trousers} />
          <Box size={[0.11, 0.44, 0.11]} position={[0.085, 0.27, 0.36]} color={trousers} />
          <Box size={[0.12, 0.06, 0.18]} position={[-0.085, 0.03, 0.4]} color="#2a2420" />
          <Box size={[0.12, 0.06, 0.18]} position={[0.085, 0.03, 0.4]} color="#2a2420" />
        </group>
      ) : (
        <group>
          <Capsule radius={0.075} length={0.42} position={[-0.09, 0.33, 0]} color={trousers} />
          <Capsule radius={0.075} length={0.42} position={[0.09, 0.33, 0]} color={trousers} />
          <Box size={[0.12, 0.06, 0.2]} position={[-0.09, 0.03, 0.03]} color="#2a2420" />
          <Box size={[0.12, 0.06, 0.2]} position={[0.09, 0.03, 0.03]} color="#2a2420" />
        </group>
      )}

      {/* thân + đầu + tay — xoay quanh hông */}
      <group ref={body} position={[0, hipY, 0]}>
        <Capsule radius={0.17} length={0.26} position={[0, 0.34, 0]} color={shirt} />
        {contact.look === 'vest' && (
          <group>
            <Box size={[0.12, 0.2, 0.02]} position={[0, 0.45, 0.165]} rotation={[-0.1, 0, 0]} color="#f2efe8" shadow={false} />
            <Box size={[0.035, 0.17, 0.02]} position={[0, 0.43, 0.175]} rotation={[-0.1, 0, 0]} color={PALETTE.stamp} shadow={false} />
          </group>
        )}

        <group ref={armL} position={[-0.215, 0.5, 0]}>
          <Capsule radius={0.052} length={0.3} position={[0, -0.18, 0]} color={shirt} />
          <Ball radius={0.05} position={[0, -0.36, 0]} color={PALETTE.skin} />
        </group>
        <group ref={armR} position={[0.215, 0.5, 0]}>
          <Capsule radius={0.052} length={0.3} position={[0, -0.18, 0]} color={shirt} />
          <Ball radius={0.05} position={[0, -0.36, 0]} color={PALETTE.skin} />
        </group>

        <group ref={head} position={[0, 0.74, 0]}>
          <Cyl radius={0.06} height={0.08} position={[0, -0.13, 0]} color={PALETTE.skinShade} />
          <Ball radius={0.16} position={[0, 0, 0]} scale={[1, 1.06, 1]} color={PALETTE.skin} />
          <Box size={[0.03, 0.035, 0.01]} position={[-0.055, 0.0, 0.155]} color="#1b1b1b" shadow={false} />
          <Box size={[0.03, 0.035, 0.01]} position={[0.055, 0.0, 0.155]} color="#1b1b1b" shadow={false} />
          <Hair contact={contact} />
          <Accessory contact={contact} />
        </group>
      </group>
    </group>
  )
}
