// src/ui/icons.tsx
// Icon vẽ tay nét đơn — không dùng emoji, không dùng bộ icon chung chung

import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Svg({ size = 22, children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  )
}

/** Nhiệt kế — level 0..1 tô mực đỏ */
export function ThermometerIcon({ level = 0, ...p }: IconProps & { level?: number }) {
  const h = 2 + Math.max(0, Math.min(1, level)) * 11
  return (
    <Svg {...p}>
      <path d="M10 14.5V4.5a2 2 0 0 1 4 0v10a4 4 0 1 1-4 0Z" />
      <rect x="11" y={15 - h} width="2" height={h} rx="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="17.6" r="2.2" fill="currentColor" stroke="none" />
    </Svg>
  )
}

/** Pin điện thoại — level 0..1 */
export function BatteryIcon({ level = 1, ...p }: IconProps & { level?: number }) {
  const w = Math.max(0, Math.min(1, level)) * 13
  return (
    <Svg {...p}>
      <rect x="2.5" y="7" width="17" height="10" rx="2" />
      <path d="M21.5 10.5v3" />
      {w > 0.3 && <rect x="4.5" y="9" width={w} height="6" rx="0.8" fill="currentColor" stroke="none" />}
    </Svg>
  )
}

export function CashIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="2.5" y="6.5" width="19" height="11" rx="1.5" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M6 9.5v5M18 9.5v5" />
    </Svg>
  )
}

export function PhoneIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.2" />
      <path d="M10.5 18.5h3" />
    </Svg>
  )
}

export function GearIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
    </Svg>
  )
}

export function CloseIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Svg>
  )
}

export function ArrowIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </Svg>
  )
}

export function BagIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M5 8h14l-1.2 12.5H6.2Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </Svg>
  )
}

export function HomeIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3.5 11.5 12 4l8.5 7.5" />
      <path d="M6 10v10h12V10" />
      <path d="M10 20v-5h4v5" />
    </Svg>
  )
}

export function BedIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3 18V7M3 14h18v4M21 14v-2.5a2.5 2.5 0 0 0-2.5-2.5H11v5" />
      <circle cx="7" cy="11" r="1.8" />
    </Svg>
  )
}

export function BeerIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M6 7h10v13H6Z" />
      <path d="M16 10h2.5a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5H16" />
      <path d="M6 7c0-2 1.5-3 3-3 1 0 1.5.6 2 .6s1-.6 2-.6c1.5 0 3 1 3 3" />
      <path d="M9.5 11v6M12.5 11v6" />
    </Svg>
  )
}

export function LaptopIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="4.5" y="5" width="15" height="10" rx="1" />
      <path d="M2.5 19h19l-2-4h-15Z" />
    </Svg>
  )
}

export function BookIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H19v14H5.5A1.5 1.5 0 0 0 4 19.5Z" />
      <path d="M4 19.5A1.5 1.5 0 0 0 5.5 21H19v-3" />
      <path d="M8.5 8h6" />
    </Svg>
  )
}

export function SoundIcon({ muted = false, ...p }: IconProps & { muted?: boolean }) {
  return (
    <Svg {...p}>
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4Z" />
      {muted ? <path d="M16 9.5l5 5M21 9.5l-5 5" /> : <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />}
    </Svg>
  )
}

export function TrayIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3 13.5 5.5 6h13l2.5 7.5V19H3Z" />
      <path d="M3 13.5h5l1.5 2h5l1.5-2h5" />
    </Svg>
  )
}

export function PinIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M9 3.5h6l-1 5 3 3H7l3-3Z" />
      <path d="M12 11.5V21" />
    </Svg>
  )
}

export function ClockIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Svg>
  )
}
