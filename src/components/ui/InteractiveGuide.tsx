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
            🎯 1. Mục Tiêu Sinh Tồn
          </h3>
          <p className="text-zinc-300 text-xs leading-relaxed">
            Bạn sẽ đóng vai một nhân viên văn phòng đi làm từ <strong className="text-white">Thứ Hai đến Thứ Bảy</strong>.
            Mỗi ngày sẽ có hàng tá drama và sự cố ập đến. Mục tiêu duy nhất của bạn là:
            <span className="text-yellow-300 font-bold"> Sống sót qua 6 ngày làm việc </span> mà không bị <strong>Burnout (Kiệt quệ tinh thần)</strong> hay <strong>Kiệt sức (Cạn kiệt thể lực)</strong>.
          </p>
        </div>

        {/* 📊 PHẦN 2: BẬC THẦY CHỈ SỐ */}
        <div className="space-y-3">
          <h3 className="font-extrabold text-white text-sm flex items-center gap-1.5 border-b border-white/5 pb-1.5">
            📊 2. Quản Lý Ba Chỉ Số Sống Còn
          </h3>
          <p className="text-zinc-400 text-[11px] leading-relaxed">
            Trò chơi theo dõi chặt chẽ ba chỉ số của bạn. Nếu bất kỳ chỉ số nào chạm ngưỡng nguy hiểm, bạn sẽ thua cuộc ngay lập tức:
          </p>

          <div className="space-y-2.5">
            {/* Stress */}
            <div className="bg-red-500/5 border border-red-500/15 rounded-xl p-3.5 space-y-1">
              <div className="flex justify-between text-xs font-bold text-red-400">
                <span>😤 Stress (Căng thẳng)</span>
                <span>Nguy hiểm: đạt 100% 💀</span>
              </div>
              <p className="text-zinc-300 text-xs leading-relaxed">
                Tăng khi gặp deadline gấp, sếp ép chỉ số, bị trôi thời gian (timeout) hoặc chọn các phương án lách luật rủi ro.
                <span className="text-red-300/90 font-medium"> Khi Stress đạt từ 80% trở lên, màn hình sẽ nháy đỏ liên tục và nhạc nền sẽ chuyển sang tiết tấu dồn dập kịch tính báo động đỏ.</span>
              </p>
            </div>

            {/* Energy */}
            <div className="bg-yellow-500/5 border border-yellow-500/15 rounded-xl p-3.5 space-y-1">
              <div className="flex justify-between text-xs font-bold text-yellow-400">
                <span>⚡ Energy (Thể lực)</span>
                <span>Nguy hiểm: về 0% 😴</span>
              </div>
              <p className="text-zinc-300 text-xs leading-relaxed">
                Hao hụt dần qua từng khung giờ làm việc mệt mỏi trong ngày và khi làm thêm ngoài giờ (OT).
                Nếu thể lực về <span className="text-yellow-200/90 font-medium">0%</span>, nhân vật của bạn sẽ gục ngã trên bàn làm việc và trò chơi kết thúc. Bạn phải ngủ đủ giấc vào ban đêm để sạc lại năng lượng.
              </p>
            </div>

            {/* Salary */}
            <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-3.5 space-y-1">
              <div className="flex justify-between text-xs font-bold text-emerald-400">
                <span>💰 Salary (Lương tích lũy)</span>
                <span>Dùng để cứu cánh 🛒</span>
              </div>
              <p className="text-zinc-300 text-xs leading-relaxed">
                Cộng dồn sau mỗi ngày làm việc thành công hoặc làm thêm giờ (OT).
                Số tiền này cực kỳ quan trọng, dùng để mua đồ ăn uống hồi phục chỉ số tại <strong className="text-white">Căn-tin Cứu Mạng</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* 🕐 PHẦN 3: LUỒNG 24 GIỜ CÔNG SỞ */}
        <div className="space-y-3">
          <h3 className="font-extrabold text-white text-sm flex items-center gap-1.5 border-b border-white/5 pb-1.5">
            🕐 3. Một Ngày Làm Việc Diễn Ra Thế Nào?
          </h3>
          <p className="text-zinc-400 text-[11px]">
            Đi qua 4 khung giờ trong ngày làm việc với các cơ chế đặc trưng:
          </p>

          <div className="relative border-l border-zinc-800 pl-4.5 ml-2.5 space-y-5 py-1">
            {/* Sáng */}
            <div className="relative">
              <span className="absolute -left-[27px] top-0 w-4.5 h-4.5 rounded-full bg-cyan-400/20 border border-cyan-400 flex items-center justify-center text-[10px]">🌅</span>
              <h4 className="font-extrabold text-xs text-white">08:00 → 12:00 | Ca Sáng: Vào Việc & Timer Gấp Rút</h4>
              <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                Các sự kiện bắt đầu xuất hiện. Mỗi sự kiện có một <strong className="text-cyan-300">Đồng hồ đếm ngược (Timer)</strong>.
                Bạn phải nhanh tay click chọn phương án xử lý trước khi hết giờ!
                Nếu để hết giờ, game tự xử lý và phạt cực nặng: <span className="text-red-400 font-semibold">Stress +25%, Energy -15%, Lương -200k</span>.
              </p>
            </div>

            {/* Trưa */}
            <div className="relative">
              <span className="absolute -left-[27px] top-0 w-4.5 h-4.5 rounded-full bg-yellow-400/20 border border-yellow-400 flex items-center justify-center text-[10px]">🍱</span>
              <h4 className="font-extrabold text-xs text-white">12:00 → 13:00 | Giờ Nghỉ Trưa: Mở Khóa Shop Cứu Mạng</h4>
              <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                Sự kiện tạm dừng. Bạn được nghỉ ngơi và truy cập <strong className="text-emerald-400">Căn-tin Cứu Mạng</strong>.
                Dùng tiền lương tích lũy để mua cơm văn phòng, cà phê sữa đá hoặc sinh tố hồi máu.
                Giới hạn mua <span className="text-yellow-300 font-bold">tối đa 2 món</span> mỗi ngày!
              </p>
            </div>

            {/* Chiều */}
            <div className="relative">
              <span className="absolute -left-[27px] top-0 w-4.5 h-4.5 rounded-full bg-purple-400/20 border border-purple-400 flex items-center justify-center text-[10px]">🌆</span>
              <h4 className="font-extrabold text-xs text-white">13:00 → 17:00 | Ca Chiều: Giai Đoạn Quá Tải</h4>
              <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                Sự kiện ập đến dồn dập hơn. Cảnh báo: <span className="text-purple-300 font-bold">Có thể xuất hiện 2 sự kiện khẩn cấp cùng lúc!</span>
                Hãy giữ bình tĩnh và ưu tiên click xử lý sự kiện có thời gian đếm ngược ngắn hơn trước.
              </p>
            </div>

            {/* Đêm */}
            <div className="relative">
              <span className="absolute -left-[27px] top-0 w-4.5 h-4.5 rounded-full bg-pink-400/20 border border-pink-400 flex items-center justify-center text-[10px]">🌙</span>
              <h4 className="font-extrabold text-xs text-white">Sau 17:00 | Đêm Muộn: Chọn Hoạt Động Nghỉ Ngơi</h4>
              <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                Bạn trở về nhà và phải chọn 1 trong 3 hoạt động để hồi phục sức khỏe cho ngày mai:
              </p>
              <div className="mt-2 space-y-1.5 text-[11px] text-zinc-300 bg-zinc-950 p-3 rounded-xl border border-white/5">
                <p>😴 <strong>Ngủ sớm (Miễn phí):</strong> Hồi 45 Energy, giảm 25 Stress. Lựa chọn an toàn nhất.</p>
                <p>🍻 <strong>Đi nhậu (Mất 150kđ):</strong> Hồi 10 Energy, giảm 20 Stress. Bị khóa nếu Stress &gt;= 85% hoặc ví không đủ tiền. Có tỷ lệ bị đau đầu mệt mỏi vào sáng mai.</p>
                <p>💼 <strong>Làm OT (Nhận thêm 250kđ):</strong> Mất 15 Energy, tăng 25 Stress. Bị khóa nếu Energy &lt;= 25 hoặc Stress &gt;= 80%.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 🔗 PHẦN 4: HỆ THỐNG CỜ ẨN & HẬU QUẢ NỐI TIẾP */}
        <div className="bg-purple-950/20 border border-purple-500/25 rounded-2xl p-4.5 space-y-2">
          <h3 className="font-extrabold text-purple-300 text-sm flex items-center gap-1.5">
            🔗 4. Nghiệp Quả Công Sở (Hệ Thống Cờ Trạng Thái)
          </h3>
          <p className="text-zinc-300 text-xs leading-relaxed">
            Các quyết định của bạn mang tính kết nối cốt truyện sâu sắc. Việc chọn phương án dễ dãi hoặc lách quy định ngày hôm nay sẽ âm thầm để lại một <strong>Cờ Trạng Thái (Flag)</strong> gây hậu quả nặng nề về sau:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-[11px] text-zinc-400">
            <div className="bg-zinc-950 p-2.5 rounded-lg border border-white/5">
              <strong className="text-red-400">💀 Lỗi Tiềm Ẩn (has_hidden_error)</strong>
              <p className="mt-1 leading-relaxed">Sinh ra khi bạn "xào nấu" chi phí, làm láo Excel. Cuối tuần đoàn thanh tra Thuế ghé thăm sẽ truy thu phạt nặng!</p>
            </div>
            <div className="bg-zinc-950 p-2.5 rounded-lg border border-white/5">
              <strong className="text-orange-400">🕵️ Lệch Sổ Sách (audit_discrepancy)</strong>
              <p className="mt-1 leading-relaxed">Xuất hiện khi bạn chuyển khoản nhầm nhưng giấu nhẹm đi. Kiểm toán nội bộ sờ gáy sẽ phạt trừ lương vì thiếu trung thực!</p>
            </div>
          </div>
        </div>

        {/* 💡 PHẦN 5: BÍ KÍP BỎ TÚI CỦA SẾP */}
        <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-4">
          <h3 className="font-extrabold text-yellow-300 text-sm mb-2.5 flex items-center gap-1.5">
            💡 5. Bí Kíp Sống Sót Từ Đồng Nghiệp Đi Trước
          </h3>
          <ul className="space-y-2 text-xs text-zinc-300">
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 shrink-0">✔</span>
              <span><strong>Tích lũy Energy đầu tuần:</strong> Thứ Hai, Thứ Ba game khá dễ thở. Hãy cố gắng hồi đầy Energy và giữ Stress thấp nhất để chuẩn bị cho "bão tố" dồn dập vào Thứ Năm đến Thứ Bảy.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 shrink-0">✔</span>
              <span><strong>Không lười biếng giờ trưa:</strong> Dù tiếc tiền lương tích lũy, hãy luôn ghé Shop mua cơm hoặc nước uống nếu Stress vượt quá 70%. Giữ chỉ số an toàn là ưu tiên số một.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 shrink-0">✔</span>
              <span><strong>Cân nhắc kỹ trước khi OT:</strong> OT cày thêm tiền rất tốt, nhưng nếu Stress của bạn đang mấp mé 70%, việc làm thêm giờ ban đêm có thể khiến bạn Burnout ngay trong giấc ngủ.</span>
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
