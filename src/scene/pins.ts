// src/scene/pins.ts
// Ghim DOM bám theo toạ độ 3D. Phần tử DOM (giấy note, bong bóng chat) tự đăng ký,
// PinTracker trong Canvas chiếu toạ độ ra màn hình mỗi khung hình và gán transform trực tiếp
// — không re-render React mỗi frame. Ghim nằm ngoài khung nhìn bị kẹp vào mép và đánh dấu data-off.

import type { Vec3 } from './props/basic'

export interface PinEntry {
  el: HTMLElement
  world: Vec3
  /** Ghim có được kẹp vào mép màn hình khi nằm ngoài khung không (bong bóng chat thì không) */
  clampToEdge: boolean
}

export const pinRegistry = new Map<string, PinEntry>()

/** Vùng màn hình bị HUD che (px) — ghim không được chui vào đây */
export const pinSafeArea = { top: 72, bottom: 96, left: 16, right: 16 }

export function registerPin(key: string, entry: PinEntry) {
  pinRegistry.set(key, entry)
  return () => {
    if (pinRegistry.get(key)?.el === entry.el) pinRegistry.delete(key)
  }
}
