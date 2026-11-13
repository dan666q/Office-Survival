// src/scene/rooms/ItOffice.tsx
// Văn phòng IT: sàn startup thuê lại — cụm bàn dev, tủ server ù ù, phòng sếp vách kính, góc pantry.

import { CONTACTS, type Contact } from '../../data/contacts'
import { Person } from '../characters/Person'
import { Box, Group } from '../props/basic'
import {
  BlindsWindow,
  StandingFan,
  CompanySign,
  Door,
  FilingCabinet,
  Fridge,
  GlassPartition,
  PantryCounter,
  PaperStack,
  Plant,
  PowerStrip,
  Printer,
  ServerRack,
  Slippers,
  TimeClock,
  TubeLight,
  WaterDispenser,
  Whiteboard,
} from '../props/furniture'
import { WallCalendar, WallClock } from '../props/wallDisplays'
import { DeskBuffItems } from '../props/buffItems'
import { DESK_UPGRADES } from '../props/buffMap'
import { Clickable, RoomShell, Workstation } from './shared'
import type { RoomState } from './types'
import type { AnchorId } from '../eventLocation'
import { PALETTE } from '../palette'

const SHIPPER: Contact = { ...CONTACTS.intern, id: 'self', name: 'Shipper', shirt: '#2f9e5a', hair: '#1d1712', look: 'cap' }

export default function ItOfficeRoom(state: RoomState) {
  const { mode, alerts, onAnchor, stress, energy, buffIds, slot, playerMood } = state
  const working = mode !== 'empty'
  const night = slot === 'overtime' || mode === 'evening'
  const sel = (a: AnchorId) => (onAnchor ? () => onAnchor(a) : undefined)
  const has = (a: AnchorId) => alerts.has(a)

  // Đồng nghiệp về bớt khi tăng ca
  const present = (id: string) => working && (!night || id === 'it_dev' || id === 'sep')

  return (
    <RoomShell width={12} depth={9}>
      {/* ===== Tường sau ===== */}
      <Door position={[-3.7, 0, -4.48]} />
      <TimeClock position={[-2.95, 1.35, -4.46]} />
      <CompanySign position={[-1.9, 2.4, -4.47]} />
      <BlindsWindow position={[0.5, 1.65, -4.47]} width={2.2} night={night} />
      <WallClock position={[2.35, 2.25, -4.46]} time={state.clock} />
      <WallCalendar position={[2.35, 1.45, -4.46]} dayNumber={state.dayNumber} weekday={state.weekday} />
      <TubeLight position={[-1.2, 2.75, -4.43]} flicker={stress >= 80} on />
      <TubeLight position={[1.9, 2.75, -4.43]} flicker={stress >= 80 && stress < 90} on />

      {/* ===== Tường trái ===== */}
      <Clickable onSelect={sel('server')}>
        <ServerRack position={[-5.5, 0, -3.95]} rotationY={Math.PI / 2} alarm={has('server')} />
      </Clickable>
      <FilingCabinet position={[-5.66, 0, -2.45]} rotationY={Math.PI / 2} />
      <Clickable onSelect={sel('printer')}>
        <Printer position={[-5.6, 0, -1.4]} rotationY={Math.PI / 2} jammed={has('printer')} />
      </Clickable>
      <Whiteboard position={[-5.97, 1.65, 0.3]} rotationY={Math.PI / 2} />
      <TubeLight position={[-5.95, 2.75, 2.2]} rotationY={Math.PI / 2} flicker={stress >= 85} on />
      <WaterDispenser position={[-5.62, 0, 1.55]} rotationY={Math.PI / 2} />

      {/* ===== Góc pantry / căn-tin ===== */}
      <Clickable onSelect={sel('canteen')}>
        <Fridge position={[-5.55, 0, 2.45]} rotationY={Math.PI / 2} />
        <PantryCounter position={[-5.62, 0, 3.75]} rotationY={Math.PI / 2} length={1.4} />
        {slot === 'lunch' && working && (
          <group>
            <Person contact={SHIPPER} position={[-4.55, 0, 3.55]} rotationY={-Math.PI / 2 + 0.4} pose="stand" alert={has('canteen')} />
            <Box size={[0.42, 0.42, 0.42]} position={[-4.15, 0.21, 3.85]} color="#2f9e5a" />
          </group>
        )}
      </Clickable>

      {/* ===== Phòng sếp (góc sau phải) ===== */}
      <GlassPartition position={[3.05, 0, -3.05]} rotationY={Math.PI / 2} length={2.9} />
      <GlassPartition position={[3.9, 0, -1.6]} length={1.7} />
      <Door position={[5.4, 0, -1.6]} color={PALETTE.wood} />
      <Box size={[2.9, 0.01, 2.85]} position={[4.5, 0.008, -3.05]} color="#9a6b45" shadow={false} />
      <Workstation
        position={[4.55, 0, -3.45]}
        rotationY={Math.PI}
        person={present('sep') ? CONTACTS.sep : null}
        alert={has('boss')}
        onSelectPerson={sel('boss')}
        onSelectDesk={sel('boss')}
        seed={11}
        tone="chart"
        premiumChair
      />
      <Plant position={[5.6, 0, -4.1]} scale={1.2} />

      {/* ===== Cụm bàn dev ===== */}
      <Workstation
        position={[0.6, 0, -0.8]}
        rotationY={Math.PI / 2}
        person={present('it_dev') ? CONTACTS.it_dev : null}
        alert={has('it_dev')}
        onSelectPerson={sel('it_dev')}
        seed={3}
        monitors={2}
      />
      <Workstation
        position={[-2.6, 0, -0.8]}
        rotationY={Math.PI / 2}
        person={present('pm') ? CONTACTS.pm : null}
        alert={has('pm')}
        onSelectPerson={sel('pm')}
        seed={5}
        tone="mail"
      />
      <Workstation
        position={[-2.6, 0, 1.2]}
        rotationY={Math.PI / 2}
        person={present('intern') ? CONTACTS.intern : null}
        alert={has('intern')}
        onSelectPerson={sel('intern')}
        seed={8}
      />
      <Workstation
        position={[3.4, 0, 2.9]}
        rotationY={Math.PI / 2}
        person={present('hr') ? CONTACTS.hr : null}
        alert={has('hr')}
        onSelectPerson={sel('hr')}
        seed={9}
        tone="chart"
      />

      {/* ===== Bàn của bạn ===== */}
      <Workstation
        position={[0.6, 0, 1.2]}
        rotationY={Math.PI / 2}
        person={working ? CONTACTS.self : null}
        mood={playerMood}
        onSelectDesk={sel('computer')}
        seed={1}
        monitors={2}
        wideMonitor={buffIds.includes(DESK_UPGRADES.wideMonitor)}
        keyboardColor={buffIds.includes(DESK_UPGRADES.keyboard) ? '#c8102e' : undefined}
        premiumChair={buffIds.includes(DESK_UPGRADES.premiumChair)}
      >
        <DeskBuffItems buffIds={buffIds} />
        <group position={[-0.55, 0, -0.2]}>
          <PaperStack position={[0, 0, 0]} count={working ? Math.min(6, 1 + Math.floor(stress / 18)) : 1} />
        </group>
      </Workstation>
      {/* màn hình máy tính của bạn bấm được ngay cả khi không có người */}
      <Slippers position={[1.0, 0, 1.6]} rotationY={0.3} />
      <PowerStrip
        position={[0.2, 0, 2.1]}
        points={[
          [0, 0.01, 0],
          [0.3, 0.01, -0.3],
          [0.1, 0.01, -0.7],
          [-0.3, 0.01, -0.5],
          [-0.2, 0.01, -1.0],
        ]}
      />

      {/* ===== CTO đứng cạnh server ===== */}
      {present('cto') && (
        <Person contact={CONTACTS.cto} position={[-4.55, 0, -3.25]} rotationY={0.7} pose="stand" alert={has('cto')} onSelect={sel('cto')} />
      )}

      {/* ===== Trang trí ===== */}
      <Plant position={[-1.4, 0, -4.05]} />
      <Plant position={[5.55, 0, 4.0]} scale={1.3} />
      <Plant position={[2.6, 0, -0.2]} scale={0.9} />
      <StandingFan position={[1.75, 0, 2.55]} rotationY={-2.4} speed={4 + stress / 6} />
      <Group position={[4.9, 0, 0.6]}>
        <FilingCabinet position={[0, 0, 0]} rotationY={-Math.PI / 2} />
      </Group>
      {energy <= 25 && working && <Box size={[0.2, 0.01, 0.2]} position={[1.4, 0.005, 1.5]} color="#e8dcc0" shadow={false} />}
    </RoomShell>
  )
}
