// src/screens/StartScreen.tsx
// 7 giờ sáng, văn phòng còn vắng. Tờ "Giấy báo nhận việc" dán trên bàn.

import { AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { soundManager } from '../utils/soundManager'
import { ScreenPaper } from '../ui/ScreenPaper'
import { Handbook } from '../ui/Handbook'
import { useUiStore } from '../ui/uiStore'
import { ArrowIcon, BookIcon } from '../ui/icons'

export default function StartScreen() {
  const goToScreen = useGameStore((s) => s.goToScreen)
  const achievements = useGameStore((s) => s.achievements)
  const panel = useUiStore((s) => s.panel)
  const openPanel = useUiStore((s) => s.openPanel)
  const closeAll = useUiStore((s) => s.closeAll)

  return (
    <>
      <ScreenPaper>
        <p className="text-sm font-semibold text-ink-soft">Công ty TNHH Sống Sót Công Sở · Giấy báo nhận việc</p>
        <h1 className="mt-3 text-5xl leading-[0.95] font-extrabold tracking-tight text-ink md:text-6xl">
          Sống Sót
          <br />
          Công Sở
        </h1>
        <p className="mt-4 max-w-sm text-base leading-relaxed text-ink">
          Sáu ngày làm việc. Một văn phòng. Sếp, PM, intern và cái máy in kẹt giấy đều đang chờ bạn.
        </p>
        <p className="mt-2 text-base text-ink">
          Giữ <b>stress</b> dưới 100% và <b>sức</b> trên 0% đến hết ca thứ Bảy.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <button
            type="button"
            className="btn-ink btn-stamp text-lg"
            onClick={() => {
              soundManager.playClick()
              goToScreen('profession')
            }}
          >
            Chấm công vào ca <ArrowIcon size={20} />
          </button>
          <button
            type="button"
            className="btn-ink"
            onClick={() => {
              soundManager.playClick()
              openPanel('handbook')
            }}
          >
            <BookIcon size={20} /> Sổ tay nhân viên
          </button>
        </div>

        <p className="hand mt-8 -rotate-1 text-xl text-pen">
          Đi làm vui vẻ nha! — HR
          {achievements.length > 0 && <span className="block text-base text-ink-soft">(Bạn đã có {achievements.length}/10 giấy khen)</span>}
        </p>
      </ScreenPaper>

      <AnimatePresence>{panel === 'handbook' && <Handbook key="handbook" onClose={closeAll} />}</AnimatePresence>
    </>
  )
}
