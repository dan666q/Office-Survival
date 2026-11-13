// src/ui/Handbook.tsx
// Sổ tay nhân viên mới — thay cho "Cẩm nang" cũ. Số liệu lấy đúng theo code hiện tại.

import { useState } from 'react'
import { DIFFICULTY_CONFIGS } from '../data'
import { Sheet, CloseButton } from './Sheet'
import { TIMEOUT_ENERGY, TIMEOUT_SALARY, TIMEOUT_STRESS, LUNCH_BUFF_LIMIT } from '../store/gameHelpers'
import { formatMoneyShort } from './format'

const TABS = ['Luật', 'Một ngày', 'Cấp bậc', 'Mẹo'] as const
type Tab = (typeof TABS)[number]

function pct(mult: number) {
  const d = Math.round((mult - 1) * 100)
  return d === 0 ? 'như gốc' : `${d > 0 ? '+' : ''}${d}%`
}

export function Handbook({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<Tab>('Luật')
  return (
    <Sheet onClose={onClose} label="Sổ tay nhân viên mới" width={520} tilt={0.4}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-ink-soft">Tài liệu nội bộ · không mang ra ngoài</p>
          <h2 className="text-2xl font-extrabold text-ink">Sổ tay nhân viên mới</h2>
        </div>
        <CloseButton onClick={onClose} />
      </div>

      <nav className="mt-4 flex gap-1 border-b-2 border-ink" aria-label="Mục lục">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`-mb-0.5 rounded-t-md border-2 px-3 py-1.5 text-sm font-bold ${
              tab === t ? 'border-ink border-b-paper bg-paper text-ink' : 'border-transparent text-ink-soft hover:text-ink'
            }`}
          >
            {t}
          </button>
        ))}
      </nav>

      <div className="space-y-4 pt-4 text-[15px] leading-relaxed text-ink">
        {tab === 'Luật' && (
          <>
            <p>
              Bạn đi làm từ <b>Thứ Hai đến Thứ Bảy</b>. Việc của bạn chỉ có một: sống sót đến hết ca thứ Bảy.
            </p>
            <ul className="space-y-2">
              <li>
                <b>Stress</b> chạm 100% là burnout, nghỉ việc. Stress tăng khi bị dí deadline, khi chọn sai, khi để việc quá hạn.
              </li>
              <li>
                <b>Sức</b> về 0% là gục tại bàn. Mỗi khung giờ trôi qua lại hao một ít, cuối tuần hao nhanh hơn.
              </li>
              <li>
                <b>Ví</b> cộng lương cuối mỗi ngày, dùng để gọi đồ ăn ở căn-tin hoặc đi nhậu giải sầu.
              </li>
            </ul>
            <p className="hand text-lg text-pen">Việc đến sẽ hiện thành giấy note trên đầu đồng nghiệp hoặc đồ vật. Bấm vào để xử lý.</p>
            <p>
              Mỗi phiếu việc có đồng hồ đếm ngược. Để quá hạn là bị phạt: +{TIMEOUT_STRESS} stress, {TIMEOUT_ENERGY} sức,{' '}
              {formatMoneyShort(TIMEOUT_SALARY)}. Quá hạn hai lần liền thì phạt nặng gấp rưỡi và sếp sẽ gọi lên.
            </p>
            <p>
              Một số lựa chọn "cho qua" sẽ để lại hậu quả. Đến cuối tuần, thanh tra hoặc kiểm toán có thể ghé thăm.
            </p>
          </>
        )}

        {tab === 'Một ngày' && (
          <ol className="space-y-3">
            <li>
              <b>08:00 – 12:00 · Vào ca, buổi sáng.</b> Việc đến từng cái một. Từ thứ Năm, có thể nhiều việc ập tới cùng lúc.
            </li>
            <li>
              <b>12:00 – 13:00 · Nghỉ trưa.</b> Không có việc. Mở căn-tin gọi tối đa {LUNCH_BUFF_LIMIT} món. Bấm "Vào ca chiều" khi xong.
            </li>
            <li>
              <b>13:00 – 19:00 · Buổi chiều, tan ca.</b> Dồn dập nhất trong ngày.
            </li>
            <li>
              <b>19:00 · Tăng ca.</b> Ở lại xử lý thêm, hoặc bấm "Về nhà" để nghỉ sớm.
            </li>
            <li>
              <b>Buổi tối.</b> Chọn một trong ba:
              <ul className="mt-1 ml-4 list-disc space-y-1">
                <li>Ngủ sớm: +45 sức, −25 stress. Miễn phí.</li>
                <li>Đi nhậu: +5 sức, −45 stress, tốn 150k. 30% sáng mai có drama (+10 stress).</li>
                <li>Làm thêm ở nhà: −15 sức, +25 stress, thêm 250k.</li>
              </ul>
            </li>
          </ol>
        )}

        {tab === 'Cấp bậc' && (
          <div className="space-y-3">
            {DIFFICULTY_CONFIGS.map((d) => (
              <div key={d.id} className="border-l-4 border-ink pl-3">
                <p className="font-bold">{d.name}</p>
                <p className="text-sm text-ink-soft">
                  Thời gian xử lý {pct(d.timerMultiplier)} · stress nhận {pct(d.stressMultiplier)} · hao sức {pct(d.energyMultiplier)} · giá căn-tin{' '}
                  {pct(d.buffCostMultiplier)} · phạt quá hạn {pct(d.penaltyMultiplier)} · ví đầu tuần{' '}
                  {d.startingSalaryOffset >= 0 ? '+' : ''}
                  {formatMoneyShort(d.startingSalaryOffset)}
                </p>
              </div>
            ))}
          </div>
        )}

        {tab === 'Mẹo' && (
          <ul className="space-y-2">
            <li>Đầu tuần còn dễ thở. Ngủ sớm để sạc đầy sức trước khi thứ Năm – thứ Bảy ập đến.</li>
            <li>Stress trên 70% thì đừng tiếc tiền trà sữa.</li>
            <li>Đang stress cao thì đừng làm thêm buổi tối. Có khi burnout ngay sáng hôm sau.</li>
            <li>Đóng phiếu việc không dừng đồng hồ. Việc khẩn cứ xử lý trước.</li>
            <li>Kéo để nhìn quanh văn phòng, cuộn hoặc chụm hai ngón để phóng to.</li>
          </ul>
        )}
      </div>
    </Sheet>
  )
}
