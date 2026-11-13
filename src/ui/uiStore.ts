// src/ui/uiStore.ts
// Trạng thái giao diện (không lưu): sự kiện đang mở, bảng nào đang hiện.

import { create } from 'zustand'

export type Panel = 'zalo' | 'canteen' | 'settings' | 'handbook' | null

interface UiState {
  focusedEventId: string | null
  panel: Panel
  /** Nghề đang xem thử ở màn chọn nghề — để cảnh 3D đổi văn phòng theo */
  previewProfession: string | null
  focusEvent: (id: string | null) => void
  openPanel: (panel: Panel) => void
  closeAll: () => void
  setPreviewProfession: (id: string | null) => void
}

export const useUiStore = create<UiState>()((set) => ({
  focusedEventId: null,
  panel: null,
  previewProfession: null,
  setPreviewProfession: (id) => set({ previewProfession: id }),
  focusEvent: (id) => set({ focusedEventId: id, panel: null }),
  openPanel: (panel) => set({ panel, focusedEventId: null }),
  closeAll: () => set({ panel: null, focusedEventId: null }),
}))
