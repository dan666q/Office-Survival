// src/scene/props/buffItems.tsx
// Món đã mua ở căn-tin hiện ra thành đồ vật trên bàn người chơi

import { Box, Cyl } from './basic'
import { PALETTE } from '../palette'
import { BUFF_ITEM, UPGRADE_IDS, type ItemKind } from './buffMap'

function Item({ kind }: { kind: ItemKind }) {
  switch (kind) {
    case 'iced_coffee':
      return (
        <group>
          <Cyl radius={0.045} radiusBottom={0.035} height={0.15} position={[0, 0.075, 0]} color="#7a4a2a" transparent opacity={0.9} />
          <Cyl radius={0.047} height={0.01} position={[0, 0.155, 0]} color="#e9e6df" />
          <Cyl radius={0.006} height={0.12} position={[0.015, 0.2, 0]} color={PALETTE.stamp} />
        </group>
      )
    case 'milk_tea':
      return (
        <group>
          <Cyl radius={0.05} radiusBottom={0.04} height={0.18} position={[0, 0.09, 0]} color="#d8b58a" />
          <Cyl radius={0.04} height={0.03} position={[0, 0.02, 0]} color="#3a2416" />
          <Cyl radius={0.007} height={0.14} position={[0.01, 0.23, 0]} rotation={[0, 0, 0.15]} color="#2a251e" />
        </group>
      )
    case 'rice_box':
      return (
        <group>
          <Box size={[0.22, 0.07, 0.16]} position={[0, 0.035, 0]} color="#f6f3ea" />
          <Box size={[0.2, 0.01, 0.14]} position={[0, 0.075, 0]} color="#e7c48a" shadow={false} />
        </group>
      )
    case 'green_oil':
      return (
        <group>
          <Cyl radius={0.022} height={0.08} position={[0, 0.04, 0]} color="#2f8a3e" transparent opacity={0.85} />
          <Cyl radius={0.016} height={0.025} position={[0, 0.092, 0]} color="#c8102e" />
        </group>
      )
    case 'patch_box':
      return <Box size={[0.16, 0.04, 0.1]} position={[0, 0.02, 0]} color="#e8eef7" />
    case 'energy_can':
      return (
        <group>
          <Cyl radius={0.032} height={0.12} position={[0, 0.06, 0]} color="#d8a62a" metalness={0.5} roughness={0.4} />
          <Cyl radius={0.033} height={0.03} position={[0, 0.07, 0]} color={PALETTE.stamp} />
        </group>
      )
    default:
      return (
        <group>
          <Box size={[0.16, 0.2, 0.1]} position={[0, 0.1, 0]} color="#c9a46a" />
          <Box size={[0.16, 0.02, 0.1]} position={[0, 0.2, 0]} rotation={[0.3, 0, 0]} color="#b8935a" />
        </group>
      )
  }
}

/** Xếp các món dọc mép bàn (trục X cục bộ) */
export function DeskBuffItems({ buffIds }: { buffIds: string[] }) {
  const shown = buffIds.filter((id) => !UPGRADE_IDS.has(id)).slice(0, 6)
  return (
    <group>
      {shown.map((id, i) => (
        <group key={id} position={[-0.55 + i * 0.2, 0, 0.22]}>
          <Item kind={BUFF_ITEM[id] ?? 'bag'} />
        </group>
      ))}
    </group>
  )
}
