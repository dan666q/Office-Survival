// src/scene/props/wallDisplays.tsx
// Lịch bloc và đồng hồ treo tường — hiển thị ngày/giờ trong game ngay trên tường

import { useEffect, useMemo } from 'react'
import { Box, Cyl, Group, type Vec3 } from './basic'
import { PALETTE } from '../palette'
import { createDynamicTexture, drawCalendar } from '../textures'

export function WallCalendar({ position, rotationY, dayNumber, weekday }: { position: Vec3; rotationY?: number; dayNumber: string; weekday: string }) {
  const tex = useMemo(() => {
    const { ctx, tex: t } = createDynamicTexture(256, 320)
    drawCalendar(ctx, dayNumber, weekday)
    t.needsUpdate = true
    return t
  }, [dayNumber, weekday])
  useEffect(() => () => tex.dispose(), [tex])
  return (
    <Group position={position} rotationY={rotationY}>
      <Box size={[0.5, 0.66, 0.03]} position={[0, 0, 0]} color={PALETTE.woodDark} />
      <mesh position={[0, -0.02, 0.017]}>
        <planeGeometry args={[0.44, 0.55]} />
        <meshStandardMaterial map={tex} roughness={0.9} />
      </mesh>
      {/* tờ lịch xé dở phía dưới */}
      <Box size={[0.42, 0.04, 0.005]} position={[0, -0.3, 0.02]} color={PALETTE.paper} shadow={false} />
    </Group>
  )
}

export function WallClock({ position, rotationY, time }: { position: Vec3; rotationY?: number; time: string }) {
  const [h, m] = time.split(':').map(Number)
  const minuteAngle = -((m || 0) / 60) * Math.PI * 2
  const hourAngle = -(((h || 0) % 12) / 12 + (m || 0) / 720) * Math.PI * 2
  return (
    <Group position={position} rotationY={rotationY}>
      <Cyl radius={0.26} height={0.05} rotation={[Math.PI / 2, 0, 0]} color="#2a251e" segments={28} />
      <Cyl radius={0.23} height={0.052} rotation={[Math.PI / 2, 0, 0]} color={PALETTE.paper} segments={28} shadow={false} />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2
        return <Box key={i} size={[0.012, i % 3 === 0 ? 0.045 : 0.025, 0.01]} position={[Math.sin(a) * 0.19, Math.cos(a) * 0.19, 0.03]} rotation={[0, 0, -a]} color="#2a251e" shadow={false} />
      })}
      <group rotation={[0, 0, hourAngle]} position={[0, 0, 0.035]}>
        <Box size={[0.02, 0.12, 0.008]} position={[0, 0.055, 0]} color="#2a251e" shadow={false} />
      </group>
      <group rotation={[0, 0, minuteAngle]} position={[0, 0, 0.04]}>
        <Box size={[0.014, 0.18, 0.008]} position={[0, 0.085, 0]} color={PALETTE.stamp} shadow={false} />
      </group>
    </Group>
  )
}
