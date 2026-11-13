// src/scene/props/buffMap.ts
// Buff nào hiện thành đồ vật gì trên bàn người chơi

export type ItemKind = 'iced_coffee' | 'rice_box' | 'green_oil' | 'patch_box' | 'milk_tea' | 'energy_can' | 'bag'

export const BUFF_ITEM: Record<string, ItemKind> = {
  ca_phe_sua_da: 'iced_coffee',
  com_trua_xin: 'rice_box',
  dau_gio_xanh_thien_thao: 'green_oil',
  salonpas_dan_lung: 'patch_box',
  tra_sua_koi_the: 'milk_tea',
  tra_sua_full_topping: 'milk_tea',
  nuoc_tang_luc: 'energy_can',
}

/** Buff thay đổi chính bàn làm việc thay vì đặt thêm đồ */
export const DESK_UPGRADES = {
  keyboard: 'dark_mode',
  wideMonitor: 'dual_monitor',
  premiumChair: 'chatgpt_pro',
} as const

export const UPGRADE_IDS = new Set<string>(Object.values(DESK_UPGRADES))
