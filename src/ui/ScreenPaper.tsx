// src/ui/ScreenPaper.tsx
// Khung giấy cho các màn ngoài lúc chơi (bắt đầu, chọn nghề, tổng kết...).
// Desktop: tờ giấy đặt bên trái, văn phòng 3D lộ ra bên phải. Điện thoại: tờ giấy trượt từ dưới lên.

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

export function Tape({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`absolute h-6 w-20 bg-[#e9dcb8]/80 shadow-sm ${className}`} />
}

export function ScreenPaper({
  children,
  width = 460,
  tilt = -1,
  side = 'left',
}: {
  children: ReactNode
  width?: number
  tilt?: number
  side?: 'left' | 'right'
}) {
  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-30 flex max-h-[72dvh] md:inset-y-0 md:max-h-none md:items-center ${
        side === 'left' ? 'md:right-auto md:left-8' : 'md:right-8 md:left-auto'
      }`}
    >
      <motion.div
        initial={{ y: 60, opacity: 0, rotate: tilt * 2 }}
        animate={{ y: 0, opacity: 1, rotate: tilt }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        className="paper pointer-events-auto relative flex max-h-full w-full flex-col rounded-t-lg md:max-h-[calc(100dvh-4rem)] md:rounded-sm"
        style={{ maxWidth: width }}
      >
        <Tape className="-top-3 left-8 -rotate-6 hidden md:block" />
        <Tape className="-top-3 right-8 rotate-3 hidden md:block" />
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:px-8 md:py-7">
          {children}
        </div>
      </motion.div>
    </div>
  )
}
