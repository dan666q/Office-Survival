// src/ui/SettingsSheet.tsx
// Tờ "Bảng điều khiển": hồ sơ đang chơi, công tắc âm thanh, đơn xin nghỉ việc (xóa dữ liệu).

import { useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { PROFESSIONS_CONFIG } from '../store/professionRegistry'
import { DIFFICULTY_CONFIGS } from '../data'
import { soundManager } from '../utils/soundManager'
import { Sheet, CloseButton } from './Sheet'
import { DAY_LABELS, SLOT_LABELS } from './format'
import { SoundIcon } from './icons'

const SAVE_KEYS = ['song-sot-cong-so-save', 'song-sot-cong-so-mute']

export function SettingsPanelBody({ onClose }: { onClose?: () => void }) {
  const profession = useGameStore((s) => s.profession)
  const difficulty = useGameStore((s) => s.difficulty)
  const currentDay = useGameStore((s) => s.currentDay)
  const slot = useGameStore((s) => s.currentTimeSlot)
  const achievements = useGameStore((s) => s.achievements)
  const [muted, setMuted] = useState(soundManager.getMuteState())
  const [confirming, setConfirming] = useState(false)

  const prof = PROFESSIONS_CONFIG.find((p) => p.id === profession)
  const diff = DIFFICULTY_CONFIGS.find((d) => d.id === difficulty)

  const toggleMute = () => {
    const next = soundManager.toggleMute()
    setMuted(next)
    soundManager.playClick()
  }

  const resign = () => {
    soundManager.playClick()
    SAVE_KEYS.forEach((k) => localStorage.removeItem(k))
    window.location.reload()
  }

  return (
    <div>
      <div className="flex items-start justify-between">
        <h2 className="text-2xl font-extrabold text-ink">Hệ thống</h2>
        {onClose && <CloseButton onClick={onClose} />}
      </div>

      {prof && (
        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 border-y-2 border-ink py-3 text-sm">
          <dt className="text-ink-soft">Vị trí</dt>
          <dd className="font-semibold">{prof.name}</dd>
          <dt className="text-ink-soft">Cấp bậc</dt>
          <dd className="font-semibold">{diff?.name}</dd>
          {currentDay && (
            <>
              <dt className="text-ink-soft">Hôm nay</dt>
              <dd className="font-semibold">
                {DAY_LABELS[currentDay]}
                {slot ? ` · ${SLOT_LABELS[slot]}` : ''}
              </dd>
            </>
          )}
          <dt className="text-ink-soft">Thành tích</dt>
          <dd className="font-semibold">{achievements.length}/10 giấy khen</dd>
        </dl>
      )}

      <button type="button" onClick={toggleMute} className="mt-5 flex w-full items-center gap-3 text-left" role="switch" aria-checked={!muted}>
        {/* công tắc đèn kiểu cũ */}
        <span className="relative flex h-12 w-8 shrink-0 justify-center rounded-md border-2 border-ink bg-paper-shade">
          <span className={`absolute h-5 w-5 rounded-sm border-2 border-ink transition-all ${muted ? 'bottom-1 bg-ink-faint' : 'top-1 bg-mint'}`} />
        </span>
        <span className="flex-1">
          <span className="flex items-center gap-2 font-bold text-ink">
            <SoundIcon muted={muted} size={18} /> Âm thanh {muted ? 'đang tắt' : 'đang bật'}
          </span>
          <span className="text-sm text-ink-soft">Nhạc nền và tiếng bấm. Trình duyệt sẽ nhớ lựa chọn này.</span>
        </span>
      </button>

      <div className="mt-8 border-2 border-dashed border-stamp p-4">
        <p className="font-bold text-stamp">Đơn xin nghỉ việc</p>
        <p className="mt-1 text-sm text-ink-soft">Xóa sạch tuần làm việc đang dở và toàn bộ giấy khen. Không hoàn tác được.</p>
        {confirming ? (
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className="btn-ink btn-stamp text-sm" onClick={resign}>
              Ký đơn, nghỉ luôn
            </button>
            <button type="button" className="btn-ink text-sm" onClick={() => setConfirming(false)}>
              Thôi, làm tiếp
            </button>
          </div>
        ) : (
          <button type="button" className="btn-ink mt-3 text-sm" onClick={() => setConfirming(true)}>
            Viết đơn…
          </button>
        )}
      </div>
    </div>
  )
}

export function SettingsSheet({ onClose }: { onClose: () => void }) {
  return (
    <Sheet onClose={onClose} label="Hệ thống" width={400}>
      <SettingsPanelBody onClose={onClose} />
    </Sheet>
  )
}
