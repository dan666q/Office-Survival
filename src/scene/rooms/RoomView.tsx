// src/scene/rooms/RoomView.tsx
// Chọn văn phòng 3D theo nghề (chỉ OfficeStage dùng — nằm trong chunk lazy-load).
// Nghề chưa có phòng riêng tạm dùng văn phòng IT.

import type { RoomState } from './types'
import ItOfficeRoom from './ItOffice'

export function RoomView({ professionId, ...state }: RoomState & { professionId: string | null }) {
  switch (professionId) {
    default:
      return <ItOfficeRoom {...state} />
  }
}
