// src/screens/VictoryScreen.tsx
// Hết ca thứ Bảy. Cả phòng ăn mừng, bạn nhận giấy khen.

import { useGameStore } from '../store/gameStore'
import { PROFESSIONS_CONFIG } from '../store/professionRegistry'
import { ACHIEVEMENTS } from '../utils/achievementChecker'
import { soundManager } from '../utils/soundManager'
import { ScreenPaper } from '../ui/ScreenPaper'
import { formatEffect, formatMoney, stripEmoji } from '../ui/format'

export default function VictoryScreen() {
  const profession = useGameStore((s) => s.profession)
  const difficulty = useGameStore((s) => s.difficulty)
  const stats = useGameStore((s) => s.stats)
  const achievements = useGameStore((s) => s.achievements)
  const startGame = useGameStore((s) => s.startGame)
  const restartGame = useGameStore((s) => s.restartGame)
  const goToScreen = useGameStore((s) => s.goToScreen)
  const prof = PROFESSIONS_CONFIG.find((p) => p.id === profession)

  return (
    <ScreenPaper width={520} tilt={-0.5}>
      <div className="border-4 border-double border-stamp p-4 md:p-6">
        <p className="text-center text-sm font-bold text-stamp">CÔNG TY TNHH SỐNG SÓT CÔNG SỞ</p>
        <h1 className="mt-2 text-center text-4xl font-extrabold text-stamp md:text-5xl">GIẤY KHEN</h1>
        <p className="mt-3 text-center text-[15px] leading-relaxed text-ink">
          Tặng nhân viên vị trí <b>{prof ? stripEmoji(prof.name) : ''}</b>
          <br />
          đã sống sót trọn vẹn sáu ngày làm việc, từ Thứ Hai đến hết ca Thứ Bảy.
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2 border-y-2 border-ink py-3 text-center text-sm">
          <div>
            <p className="text-ink-soft">Stress</p>
            <p className="font-mono text-lg font-bold">{stats.stress}%</p>
          </div>
          <div>
            <p className="text-ink-soft">Sức</p>
            <p className="font-mono text-lg font-bold">{stats.energy}%</p>
          </div>
          <div>
            <p className="text-ink-soft">Ví</p>
            <p className="font-mono text-lg font-bold">{formatMoney(stats.salary)}</p>
          </div>
        </div>

        <p className="mt-4 text-sm font-bold text-ink">Thành tích đã đạt ({achievements.length}/10)</p>
        <ul className="mt-1 space-y-1.5">
          {achievements.length === 0 && <li className="text-sm text-ink-soft">Chưa có. Tuần sau cố lên.</li>}
          {achievements.map((id) => {
            const a = ACHIEVEMENTS.find((x) => x.id === id)
            if (!a) return null
            return (
              <li key={id} className="text-sm leading-snug">
                <b>{a.label}</b>
                {a.rewards && <span className="hand ml-1 text-base text-pen">({a.rewards.map((r) => formatEffect(r.stat, r.value)).join(', ')})</span>}
              </li>
            )
          })}
        </ul>

        <div className="mt-5 flex items-end justify-between">
          <p className="hand text-xl text-pen">Thứ Bảy, 25 tháng 10</p>
          <span className="stamp text-lg text-stamp">GIÁM ĐỐC</span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          className="btn-ink btn-stamp"
          onClick={() => {
            soundManager.playClick()
            if (profession) startGame(profession, difficulty)
          }}
        >
          Làm thêm tuần nữa
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
          Đổi nghề
        </button>
      </div>
    </ScreenPaper>
  )
}
