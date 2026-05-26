// src/components/ui/InteractiveGuide.tsx

import { soundManager } from "../../utils/soundManager";

interface InteractiveGuideProps {
  onClose: () => void;
}

export default function InteractiveGuide({ onClose }: InteractiveGuideProps) {
  return (
    <div className="w-full max-w-2xl bg-[#13161f] border border-white/10 rounded-3xl shadow-2xl relative max-h-[92vh] flex flex-col overflow-hidden">

      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#13161f]/95 backdrop-blur-sm border-b border-white/5 px-5 sm:px-7 pt-5 sm:pt-6 pb-3 flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            📖 <span className="text-cyan-400">Cẩm Nang Sinh Tồn</span> Công Sở
          </h2>
          <p className="text-[10px] text-zinc-400 mt-0.5">Hướng dẫn chi tiết "chỉ tay cầm chơi luôn"</p>
        </div>
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full w-8 h-8 flex items-center justify-center text-sm transition-colors shrink-0"
        >
          ✕
        </button>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-5 space-y-6 scrollbar-thin scrollbar-thumb-zinc-800">

        {/* 🎯 PHẦN 1: MỤC TIÊU TỐI THƯỢNG */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-4.5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.12),transparent_60%)] pointer-events-none" />
          <h3 className="font-extrabold text-cyan-300 text-sm mb-2 flex items-center gap-1.5">
            🎯 1. Đừng Để Sếp "Cook" Bạn!
          </h3>
          <p className="text-zinc-300 text-xs leading-relaxed">
            Bạn sẽ hóa thân thành kiếp làm thuê đi cày từ <strong className="text-white">Thứ Hai đến Thứ Bảy</strong> (Thứ Bảy còn phải tăng ca, khóc thét!). 
            Hàng tá deadline và drama công sở từ sếp Messi, PM Jisoo sẽ ập vào mặt.
            Nhiệm vụ duy nhất: <span className="text-yellow-300 font-bold"> Sống sót qua 6 ngày gánh tạ </span> mà không bị <strong>Burnout (Stress đạt 100%)</strong> hay <strong>Kiệt sức (Energy về 0%)</strong>.
          </p>
        </div>

        {/* 📊 PHẦN 2: BẬC THẦY CHỈ SỐ */}
        <div className="space-y-3">
          <h3 className="font-extrabold text-white text-sm flex items-center gap-1.5 border-b border-white/5 pb-1.5">
            📊 2. Ba Chỉ Số Sống Còn (Đọc Vị Stats)
          </h3>
          <p className="text-zinc-400 text-[11px] leading-relaxed">
            Hãy theo dõi sát sao 3 thanh trạng thái cực kỳ nhạy cảm này. Bất kỳ thanh nào chạm ngưỡng báo động là bạn bay màu cmnl:
          </p>

          <div className="space-y-2.5">
            {/* Stress */}
            <div className="bg-red-500/5 border border-red-500/15 rounded-xl p-3.5 space-y-1">
              <div className="flex justify-between text-xs font-bold text-red-400">
                <span>😤 Stress (Trầm cảm cực đại)</span>
                <span>Nguy hiểm: đạt 100% 💀</span>
              </div>
              <p className="text-zinc-300 text-xs leading-relaxed">
                Tăng khi bị sếp dí deadline, leak code, dột điều hòa, hay để thời gian đếm ngược (timer) chạy hết.
                <span className="text-red-300/90 font-medium"> Khi Stress vượt quá 80%, màn hình sẽ nháy đỏ liên tục kèm nhạc nền "trốn nợ" giật gân, báo hiệu bạn sắp nộp đơn xin nghỉ việc!</span>
              </p>
            </div>

            {/* Energy */}
            <div className="bg-yellow-500/5 border border-yellow-500/15 rounded-xl p-3.5 space-y-1">
              <div className="flex justify-between text-xs font-bold text-yellow-400">
                <span>⚡ Energy (Pin thể lực)</span>
                <span>Nguy hiểm: về 0% 😴</span>
              </div>
              <p className="text-zinc-300 text-xs leading-relaxed">
                Hao hụt dần qua từng khung giờ làm việc và khi làm thêm đêm (OT).
                Nếu thể lực về <span className="text-yellow-200/90 font-medium">0%</span>, nhân vật sẽ ngất xỉu ngay tại bàn. Hãy nhớ ngủ sớm vào ban đêm để sạc pin nhé!
              </p>
            </div>

            {/* Salary */}
            <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-3.5 space-y-1">
              <div className="flex justify-between text-xs font-bold text-emerald-400">
                <span>💰 Salary (Ví lương lũy kế)</span>
                <span>Ting ting cứu nét 🛒</span>
              </div>
              <p className="text-zinc-300 text-xs leading-relaxed">
                Cộng dồn sau mỗi ngày sống sót hoặc làm thêm đêm.
                Lương cực kỳ quan trọng, dùng để đặt trà sữa, cơm trưa giải nghiệp tại <strong className="text-white">Căn-tin Cứu Mạng</strong> vào giờ nghỉ trưa.
              </p>
            </div>
          </div>
        </div>

        {/* 🕐 PHẦN 3: LUỒNG 4 KHUNG GIỜ */}
        <div className="space-y-3">
          <h3 className="font-extrabold text-white text-sm flex items-center gap-1.5 border-b border-white/5 pb-1.5">
            🕐 3. Một Ngày Gánh Tạ Diễn Ra Thế Nào?
          </h3>
          <p className="text-zinc-400 text-[11px]">
            Đi qua 4 khung giờ trong ngày làm việc với các cơ chế đặc trưng:
          </p>

          <div className="relative border-l border-zinc-800 pl-4.5 ml-2.5 space-y-5 py-1">
            {/* Sáng */}
            <div className="relative">
              <span className="absolute -left-[27px] top-0 w-4.5 h-4.5 rounded-full bg-cyan-400/20 border border-cyan-400 flex items-center justify-center text-[10px]">🌅</span>
              <h4 className="font-extrabold text-xs text-white">08:00 → 12:00 | Ca Sáng: Bão Deadline & Timer Điên Cuồng</h4>
              <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                Các sự kiện ập đến kèm theo **Đồng hồ đếm ngược (Timer)**.
                Bạn phải nhanh tay chọn nhanh phương án xử lý trước khi hết giờ!
                Nếu để timer về 0 (đứng hình), PM sẽ báo cáo lên sếp và bạn ăn phạt combo cực thốn: <span className="text-red-400 font-semibold">Stress +25%, Energy -15%, Lương -200k</span>.
              </p>
            </div>

            {/* Trưa */}
            <div className="relative">
              <span className="absolute -left-[27px] top-0 w-4.5 h-4.5 rounded-full bg-yellow-400/20 border border-yellow-400 flex items-center justify-center text-[10px]">🍱</span>
              <h4 className="font-extrabold text-xs text-white">12:00 → 13:00 | Giờ Nghỉ Trưa: Trà Sữa Giải Nghiệp</h4>
              <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                Mọi sự kiện tạm dừng. Bạn được mở khóa truy cập **Căn-tin Cứu Mạng** để đặt GrabFood.
                Dùng tiền lương tích lũy để mua cơm gà, trà sữa trân châu hoặc nước ngọt để bơm lại máu.
                **Giới hạn:** Chỉ được mua <span className="text-yellow-300 font-bold">tối đa 2 món</span> mỗi ngày nên hãy cân nhắc nhé!
              </p>
            </div>

            {/* Chiều */}
            <div className="relative">
              <span className="absolute -left-[27px] top-0 w-4.5 h-4.5 rounded-full bg-purple-400/20 border border-purple-400 flex items-center justify-center text-[10px]">🌆</span>
              <h4 className="font-extrabold text-xs text-white">13:00 → 17:00 | Ca Chiều: Giai Đoạn Đột Quỵ</h4>
              <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                Sự kiện ập đến dồn dập và khét lẹt hơn. Cảnh báo: <span className="text-purple-300 font-bold">Có thể xuất hiện 2 sự kiện khẩn cấp cùng một lúc!</span>
                Hãy bình tĩnh và ưu tiên click xử lý sự kiện có thời gian đếm ngược ngắn hơn trước.
              </p>
            </div>

            {/* Đêm */}
            <div className="relative">
              <span className="absolute -left-[27px] top-0 w-4.5 h-4.5 rounded-full bg-pink-400/20 border border-pink-400 flex items-center justify-center text-[10px]">🌙</span>
              <h4 className="font-extrabold text-xs text-white">Sau 17:00 | Tối Muộn: Chọn Hoạt Động Xả Hơi</h4>
              <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                Bạn trở về nhà và phải chọn 1 trong 3 hoạt động để chuẩn bị chỉ số cho ngày mai:
              </p>
              <div className="mt-2 space-y-1.5 text-[11px] text-zinc-300 bg-zinc-950 p-3 rounded-xl border border-white/5">
                <p>😴 <strong>Ngủ sớm (Free):</strong> Hồi 45 Energy, giảm 25 Stress. Lựa chọn "ngoan xinh yêu" và an toàn nhất.</p>
                <p>🍻 <strong>Đi nhậu (Mất 150kđ):</strong> Hồi 10 Energy, giảm 20 Stress (Ví &gt;= 150k, Stress &lt; 95%, Energy &gt;= 15). Đi quẩy sướng thân nhưng có tỷ lệ bị đau đầu làm sếp ghim sáng mai.</p>
                <p>💼 <strong>Làm OT (Nhận thêm 250kđ):</strong> Nhận thêm lương nhưng mất 15 Energy, tăng 25 Stress (Energy &gt;= 30, Stress &lt; 80). Cày tiền gánh tạ cực căng!</p>
              </div>
            </div>
          </div>
        </div>

        {/* 🎭 PHẦN 4: HỆ THỐNG CẤP BẬC (CHỌN ĐỘ KHÓ) */}
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-4.5 space-y-2">
          <h3 className="font-extrabold text-yellow-300 text-sm flex items-center gap-1.5">
            🎭 4. Chọn Cấp Bậc Văn Phòng (Tùy Chỉnh Độ Khó)
          </h3>
          <p className="text-zinc-300 text-xs leading-relaxed">
            Trước khi nhận việc, bạn có thể lựa chọn 1 trong 4 cấp bậc công sở (phù hợp với bản lĩnh gánh tạ của bạn):
          </p>
          <div className="space-y-2 mt-2 text-[11px]">
            <div className="bg-zinc-950 p-2.5 rounded-lg border border-white/5">
              <strong className="text-emerald-400">👶 Thực tập sinh (Intern - Dễ):</strong>
              <p className="text-zinc-400 mt-0.5">Thời gian đọc sự kiện thong thả (+50%), giảm 30% Stress nhận và thể lực tiêu hao. Được gia đình trợ cấp +200k lương khởi điểm, trà sữa tại Căn-tin giảm giá 20%, hình phạt timeout cực nhẹ.</p>
            </div>
            <div className="bg-zinc-950 p-2.5 rounded-lg border border-white/5">
              <strong className="text-cyan-400">👨‍💼 Nhân viên chính thức (Junior - Trung bình):</strong>
              <p className="text-zinc-400 mt-0.5">Dễ thở hơn bản gốc với thời gian đọc tăng 20%, giảm nhẹ 10% Stress & Energy tiêu hao. Được trợ cấp +100k lương khởi điểm và Căn-tin giảm giá 10%.</p>
            </div>
            <div className="bg-zinc-950 p-2.5 rounded-lg border border-white/5">
              <strong className="text-yellow-400">🔥 Lão làng gánh team (Senior - Khó):</strong>
              <p className="text-zinc-400 mt-0.5">Trải nghiệm nguyên bản cốt lõi của trò chơi. Mọi hệ số đều mặc định x1.0, đòi hỏi sự tính toán tài chính và thể trạng sát sao.</p>
            </div>
            <div className="bg-zinc-950 p-2.5 rounded-lg border border-white/5">
              <strong className="text-red-400">🤯 Kẻ hủy diệt deadline (CEO/Executive - Siêu Khó):</strong>
              <p className="text-zinc-400 mt-0.5">Ác mộng thực sự! Thời gian đếm ngược rút ngắn 20%, stress nhận tăng 25%, kiệt sức nhanh hơn 20%. Khởi đầu nợ thẻ tín dụng (-150kđ), trà sữa lạm phát tăng 30% giá, đứng hình bị phạt gấp rưỡi!</p>
            </div>
          </div>
        </div>

        {/* ⚙️ PHẦN 5: MENU CÀI ĐẶT HỆ THỐNG */}
        <div className="bg-zinc-950/40 border border-zinc-800 rounded-2xl p-4.5 space-y-2">
          <h3 className="font-extrabold text-cyan-400 text-sm flex items-center gap-1.5">
            ⚙️ 5. Menu Hệ Thống (Cài Đặt Linh Hoạt)
          </h3>
          <p className="text-zinc-300 text-xs leading-relaxed">
            Trong khi đang chơi, bạn có thể dễ dàng quản lý hệ thống bằng cách nhấp chọn nút <strong className="text-white">⚙️ Hệ thống</strong> (ở góc phải máy tính hoặc Tab 3 di động) để điều chỉnh nhạc nền (Bật/Tắt âm thanh) hoặc **Nộp Đơn Xin Nghỉ Việc (Hard Reset)** xóa sạch dữ liệu bắt đầu lại cuộc đời:
          </p>
          <div className="mt-2 space-y-1.5 text-[11px] text-zinc-400">
            <p>🔊 <strong>Bật/Tắt âm thanh:</strong> Công tắc tắt/bật toàn bộ nhạc nền BGM và các hiệu ứng âm thanh click/danger giải nghiệp, ghi nhớ tự động vào trình duyệt.</p>
            <p>📄 <strong>Nộp đơn xin nghỉ việc:</strong> Tính năng **Hard Reset** giúp bạn xóa sạch toàn bộ tiến trình chơi và Achievements đã đạt để bắt đầu lại cuộc đời mới hoàn toàn.</p>
          </div>
        </div>

        {/* 🔗 PHẦN 6: NGHIỆP QUẢ CÔNG SỞ */}
        <div className="bg-purple-950/20 border border-purple-500/25 rounded-2xl p-4.5 space-y-2">
          <h3 className="font-extrabold text-purple-300 text-sm flex items-center gap-1.5">
            🔗 6. Nghiệp Quả Công Sở (Cờ Trạng Thái)
          </h3>
          <p className="text-zinc-300 text-xs leading-relaxed">
            Các quyết định cẩu thả của bạn sẽ âm thầm để lại **Nghiệp Quả (Flag)** rình rập gây hậu quả nặng nề ở các sự kiện sau:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-[11px] text-zinc-400">
            <div className="bg-zinc-950 p-2.5 rounded-lg border border-white/5">
              <strong className="text-red-400">💀 Lỗi Tiềm Ẩn (has_hidden_error)</strong>
              <p className="mt-1 leading-relaxed">Sinh ra khi bạn xào nấu số liệu, code ẩu cho qua chuyện. Cuối tuần đoàn thanh tra Thuế ghé thăm sẽ truy thu phạt sập tiệm!</p>
            </div>
            <div className="bg-zinc-950 p-2.5 rounded-lg border border-white/5">
              <strong className="text-orange-400">🕵️ Lệch Sổ Sách (audit_discrepancy)</strong>
              <p className="mt-1 leading-relaxed">Xuất hiện khi chuyển nhầm tiền công quỹ mà giấu nhẹm đi. Kiểm toán nội bộ sờ gáy phạt lương đau đớn vì thiếu trung thực!</p>
            </div>
          </div>
        </div>

        {/* 💡 PHẦN 7: BÍ KÍP SỐNG DAI CỦA SENIOR */}
        <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-4">
          <h3 className="font-extrabold text-yellow-300 text-sm mb-2.5 flex items-center gap-1.5">
            💡 7. Bí Kíp Sống Sót Từ Người Đi Trước
          </h3>
          <ul className="space-y-2 text-xs text-zinc-300">
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 shrink-0">✔</span>
              <span><strong>Sạc đầy pin đầu tuần:</strong> Thứ Hai, Thứ Ba game khá dễ thở. Tranh thủ ngủ sớm hồi đầy 100% Energy chuẩn bị gánh tạ dồn dập vào Thứ Năm đến Thứ Bảy.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 shrink-0">✔</span>
              <span><strong>Đừng tiếc tiền trà sữa:</strong> Nếu Stress vượt quá 70%, hãy ghé Shop GrabFood mua ngay một cốc trà sữa hoặc đĩa cơm văn phòng để hạ nhiệt. Đừng để chết vì tiếc tiền nhé!</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 shrink-0">✔</span>
              <span><strong>Cân nhắc kỹ trước khi OT:</strong> OT cày thêm tiền rất tốt, nhưng nếu Stress đang ở mức báo động (&gt;70%), làm OT ban đêm có thể khiến bạn burnout cmnl trong giấc ngủ và cook game ngay sáng hôm sau.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* CTA Footer Button */}
      <div className="sticky bottom-0 bg-[#13161f]/95 backdrop-blur-sm border-t border-white/5 px-5 sm:px-7 py-4 shrink-0">
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="w-full h-11 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-black text-sm sm:text-base active:scale-95 transition-all shadow-lg shadow-cyan-500/10"
        >
          Đã hiểu rõ quy tắc, Chiến Thôi! 🎮
        </button>
      </div>
    </div>
  );
}
