// src/scene/rooms/layouts.ts
// Dữ liệu bố cục thuần (không import three.js) — UI 2D dùng file này để biết điểm neo nằm đâu,
// nhờ vậy bundle chính không kéo theo cả thư viện 3D.

import type { AnchorId } from '../eventLocation'

export type Vec3 = [number, number, number]

export interface RoomLayout {
  id: string
  name: string
  /** Kích thước sàn (x, z) để camera căn khung */
  size: [number, number]
  /** Vị trí ghim giấy note của từng điểm neo (toạ độ thế giới) */
  anchors: Partial<Record<AnchorId, Vec3>>
}

export const IT_LAYOUT: RoomLayout = {
  id: 'it',
  name: 'Văn phòng IT',
  size: [12, 9],
  anchors: {
    computer: [0.45, 1.75, 1.2],
    it_dev: [1.22, 2.0, -0.8],
    pm: [-1.98, 2.0, -0.8],
    intern: [-1.98, 2.0, 1.2],
    hr: [4.02, 2.0, 2.9],
    boss: [4.55, 2.05, -4.05],
    cto: [-4.55, 2.15, -3.25],
    server: [-5.5, 2.45, -3.95],
    printer: [-5.6, 1.45, -1.4],
    canteen: [-4.9, 1.9, 3.5],
  },
}

const LAYOUTS: Record<string, RoomLayout> = {
  it: IT_LAYOUT,
}

/** Nghề chưa có văn phòng riêng tạm dùng văn phòng IT */
export function getRoomLayout(professionId: string | null | undefined): RoomLayout {
  return (professionId && LAYOUTS[professionId]) || IT_LAYOUT
}

export function hasOwnRoom(professionId: string): boolean {
  return professionId in LAYOUTS
}
