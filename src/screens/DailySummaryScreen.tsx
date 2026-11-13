// src/screens/DailySummaryScreen.tsx
// Chạng vạng. Phiếu chấm công của ngày + chọn việc buổi tối.

import { useEffect, type ReactNode } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { soundManager } from '../utils/soundManager'
import { ScreenPaper } from '../ui/ScreenPaper'
import { ZaloPhone } from '../ui/ZaloPhone'
import { SettingsSheet } from '../ui/SettingsSheet'
import { useUiStore } from '../ui/uiStore'
import { DAY_LABELS, formatMoney } from '../ui/format'
import { BedIcon, BeerIcon, GearIcon, LaptopIcon, PhoneIcon } from '../ui/icons'

type RestChoice = 'sleep' | 'beer' | 'overtime'

const REST_OPTIONS: { id: RestChoice; title: string; note: string; effects: string; icon: ReactNode }[] = [
  { id: 'sleep', title: 'Ngủ sớm', note: 'An toàn nhất. Mai dậy còn người.', effects: '+45 sức · −25 stress · miễn phí', icon: <BedIcon size={28} /> },
  { id: 'beer', title: 'Đi nhậu giải sầu', note: 'Xả stress cực mạnh, 30% sáng mai có drama.', effects: '+5 sức · −45 stress · −150.000đ', icon: <BeerIcon size={28} /> },
  { id: 'overtime', title: 'Mở laptop làm thêm', note: 'Thêm tiền, bào sức. Stress cao thì phạt thêm.', effects: '−15 sức · +25 stress · +250.000đ', icon: <LaptopIcon size={28} /> },
]

export default function DailySummaryScreen() {
  const currentDay = useGameStore((s) => s.currentDay)
  const stats = useGameStore((s) => s.stats)
  const dayHistory = useGameStore((s) => s.dayHistory)
  const nextDay = useGameStore((s) => s.nextDay)
  const panel = useUiStore((s) => s.panel)
  const openPanel = useUiStore((s) => s.openPanel)
  const closeAll = useUiStore((s) => s.closeAll)
  const latest = dayHistory.at(-1)

  useEffect(() => {
    soundManager.playDayPass()
  }, [])
  useEffect(() => () => useUiStore.getState().closeAll(), [])

  // Điều kiện giữ nguyên như bản cũ
  const disabledReason = (id: RestChoice): string | null => {
    if (id === 'beer') {
      if (stats.energy < 15) return 'Cần ít nhất 15% sức'
      if (stats.stress >= 95) return 'Stress quá cao (≥ 95%)'
      if (stats.salary < 150000) return 'Không đủ 150.000đ'
    }
    if (id === 'overtime') {
      if (stats.energy < 30) return 'Cần ít nhất 30% sức'
      if (stats.stress >= 80) return 'Stress quá cao (≥ 80%)'
    }
    return null
  }

  return (
    <>
      <ScreenPaper width={500} tilt={-0.8}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-ink-soft">Phiếu chấm công</p>
            <h1 className="text-3xl font-extrabold text-ink">Hết {currentDay ? DAY_LABELS[currentDay] : 'ngày'}</h1>
          </div>
          <div className="flex gap-1">
            <button type="button" aria-label="Xem Zalo" className="btn-ink !p-2" onClick={() => openPanel('zalo')}>
              <PhoneIcon size={20} />
            </button>
            <button type="button" aria-label="Hệ thống" className="btn-ink !p-2" onClick={() => openPanel('settings')}>
              <GearIcon size={20} />
            </button>
          </div>
        </div>

        <table className="mt-4 w-full border-collapse text-sm">
          <tbody>
            {[
              ['Stress', `${stats.stress}%`, stats.stress >= 80],
              ['Sức', `${stats.energy}%`, stats.energy <= 20],
              ['Lương hôm nay', `+${formatMoney(latest?.salaryEarned ?? 0)}`, false],
              ['Ví hiện có', formatMoney(stats.salary), stats.salary <= 0],
              ['Việc đã xử lý', `${latest?.eventsHandled ?? 0}`, false],
            ].map(([label, value, bad]) => (
              <tr key={label as string} className="border-b border-paper-line">
                <td className="py-2 text-ink-soft">{label}</td>
                <td className={`py-2 text-right font-mono font-bold ${bad ? 'text-stamp' : 'text-ink'}`}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="hand mt-2 text-base text-stamp">Stress và sức mang nguyên sang ngày mai. Không có reset đâu.</p>

        <h2 className="mt-6 text-lg font-extrabold text-ink">Tối nay làm gì?</h2>
        <div className="mt-2 space-y-2">
          {REST_OPTIONS.map((o) => {
            const reason = disabledReason(o.id)
            return (
              <button
                key={o.id}
                type="button"
                disabled={!!reason}
                onClick={() => {
                  soundManager.playClick()
                  nextDay(o.id)
                }}
                className="group flex w-full items-center gap-4 rounded-md border-2 border-ink bg-paper px-3 py-3 text-left shadow-[3px_3px_0_var(--color-ink)] transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none"
              >
                <span className="text-ink">{o.icon}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-bold text-ink">{o.title}</span>
                  <span className="block text-sm text-ink-soft">{reason ?? o.note}</span>
                  <span className="hand block text-base text-pen">{o.effects}</span>
                </span>
              </button>
            )
          })}
        </div>
      </ScreenPaper>

      <AnimatePresence>
        {panel === 'zalo' && <ZaloPhone key="zalo" side="right" onClose={closeAll} />}
        {panel === 'settings' && <SettingsSheet key="settings" onClose={closeAll} />}
      </AnimatePresence>
    </>
  )
}
