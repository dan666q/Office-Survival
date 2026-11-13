// src/ui/Sheet.tsx
// Khung chứa bảng nổi: desktop trượt từ phải vào, điện thoại trượt từ dưới lên.
// Không có nền mờ — cảnh văn phòng phía sau vẫn nhìn thấy.

import { useEffect, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from './hooks'

export const SHEET_WIDTH = 440
export const MOBILE_SHEET_RATIO = 0.62

interface SheetProps {
  onClose: () => void
  children: ReactNode
  /** Desktop: rộng hơn cho bảng cần chỗ (Zalo hẹp, sổ tay rộng) */
  width?: number
  label: string
  tilt?: number
}

export function Sheet({ onClose, children, width = SHEET_WIDTH, label, tilt = -0.6 }: SheetProps) {
  const mobile = useIsMobile()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (mobile) {
    return (
      <motion.section
        role="dialog"
        aria-label={label}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 380, damping: 36 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.6 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 90 || info.velocity.y > 600) onClose()
        }}
        className="fixed inset-x-0 bottom-0 z-40 flex flex-col"
        style={{ maxHeight: `${MOBILE_SHEET_RATIO * 100}dvh` }}
      >
        <div className="paper flex min-h-0 flex-1 flex-col rounded-t-xl">
          <div className="flex justify-center pt-2 pb-1">
            <span className="h-1.5 w-10 rounded-full bg-paper-line" />
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">{children}</div>
        </div>
      </motion.section>
    )
  }

  return (
    <motion.section
      role="dialog"
      aria-label={label}
      initial={{ x: width + 40, rotate: 2 }}
      animate={{ x: 0, rotate: tilt }}
      exit={{ x: width + 40, rotate: 3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-20 right-5 bottom-5 z-40 flex"
      style={{ width }}
    >
      <div className="paper flex min-h-0 flex-1 flex-col rounded-sm">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-5">{children}</div>
      </div>
    </motion.section>
  )
}

export function CloseButton({ onClick, label = 'Đóng' }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="-mr-2 rounded p-2 text-ink-soft transition-colors hover:bg-paper-shade hover:text-ink"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </button>
  )
}
