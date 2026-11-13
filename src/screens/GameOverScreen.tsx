// src/screens/GameOverScreen.tsx
// Văn phòng tối om, bạn gục trên bàn. Tờ quyết định thôi việc có đóng dấu đỏ.

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { PROFESSIONS_CONFIG } from '../store/professionRegistry'
import { soundManager } from '../utils/soundManager'
import { ScreenPaper } from '../ui/ScreenPaper'
import { SettingsSheet } from '../ui/SettingsSheet'
import { useUiStore } from '../ui/uiStore'
import { formatMoney, stripEmoji } from '../ui/format'
import { GearIcon } from '../ui/icons'

export default function GameOverScreen() {
  const profession = useGameStore((s) => s.profession)
  const difficulty = useGameStore((s) => s.difficulty)
  const stats = useGameStore((s) => s.stats)
  const dayHistory = useGameStore((s) => s.dayHistory)
  const reason = useGameStore((s) => s.gameOverReason)
  const startGame = useGameStore((s) => s.startGame)
  const restartGame = useGameStore((s) => s.restartGame)
  const goToScreen = useGameStore((s) => s.goToScreen)
  const panel = useUiStore((s) => s.panel)
  const openPanel = useUiStore((s) => s.openPanel)
  const closeAll = useUiStore((s) => s.closeAll)

  const prof = PROFESSIONS_CONFIG.find((p) => p.id === profession)
  const burnout = stats.stress >= 100

  useEffect(() => {
    soundManager.playBurnout()
  }, [])
  useEffect(() => () => useUiStore.getState().closeAll(), [])

  return (
    <>
      <ScreenPaper width={480} tilt={1}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-ink-soft">Công ty TNHH Sống Sót Công Sở</p>
            <p className="text-xs text-ink-faint">Số: {String(dayHistory.length + 1).padStart(3, '0')}/QĐ-NS</p>
          </div>
          <button type="button" aria-label="Hệ thống" className="btn-ink !p-2" onClick={() => openPanel('settings')}>
            <GearIcon size={20} />
          </button>
        </div>

        <h1 className="mt-5 text-center text-2xl leading-tight font-extrabold text-ink md:text-3xl">QUYẾT ĐỊNH</h1>
        <p className="text-center font-semibold text-ink">V/v cho thôi việc đối với nhân viên {prof ? stripEmoji(prof.name) : ''}</p>

        <div className="relative mt-5 space-y-2 text-[15px] leading-relaxed text-ink">
          <p>
            <b>Lý do:</b> {reason ? stripEmoji(reason) : burnout ? 'Burnout.' : 'Kiệt sức.'}
          </p>
          <p>
            <b>Thời gian công tác:</b> {dayHistory.length}/6 ngày.
          </p>
          <p>
            <b>Tình trạng khi rời đi:</b> stress {stats.stress}%, sức {stats.energy}%, ví còn {formatMoney(stats.salary)}.
          </p>
          <p>
            <b>Khả năng quay lại:</b> {burnout ? 'Cần nghỉ dưỡng dài hạn trước đã.' : 'Ngủ một giấc là ổn. Chắc vậy.'}
          </p>

          <motion.span
            initial={{ scale: 2.2, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 0.9, rotate: -12 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 400, damping: 18 }}
            className="stamp absolute -bottom-14 right-2 text-2xl text-stamp"
          >
            ĐÃ DUYỆT
          </motion.span>
        </div>

        <div className="mt-20 flex flex-wrap gap-3">
          <button
            type="button"
            className="btn-ink btn-stamp"
            onClick={() => {
              soundManager.playClick()
              if (profession) startGame(profession, difficulty)
            }}
          >
            Xin làm lại vị trí cũ
          </button>
          <button
            type="button"
            className="btn-ink"
            onClick={() => {
              soundManager.playClick()
              restartGame()
              goToScreen('profession')
            }}
          >
            Nộp hồ sơ nơi khác
          </button>
        </div>
      </ScreenPaper>

      <AnimatePresence>{panel === 'settings' && <SettingsSheet key="settings" onClose={closeAll} />}</AnimatePresence>
    </>
  )
}
