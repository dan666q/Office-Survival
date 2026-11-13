// src/ui/Countdown.tsx
// Vòng đếm ngược vẽ như nét bút đỏ khoanh tròn

import { useRemaining } from './hooks'

export function CountdownRing({ eventId, size = 46, showSeconds = true }: { eventId: string; size?: number; showSeconds?: boolean }) {
  const { seconds, ratio } = useRemaining(eventId)
  const r = size / 2 - 4
  const c = 2 * Math.PI * r
  const urgent = ratio < 0.3
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} role="timer" aria-label={`Còn ${Math.ceil(seconds)} giây`}>
      <svg width={size} height={size} className={urgent ? 'animate-pulse' : undefined}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-paper-line)" strokeWidth={3} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={urgent ? 'var(--color-stamp)' : 'var(--color-pen)'}
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - ratio)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      {showSeconds && (
        <span
          className={`absolute inset-0 flex items-center justify-center font-mono font-bold ${urgent ? 'text-stamp' : 'text-ink'}`}
          style={{ fontSize: size * 0.32 }}
        >
          {Math.ceil(seconds)}
        </span>
      )}
    </div>
  )
}
