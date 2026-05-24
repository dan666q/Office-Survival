// src/data/professions/boy_pho.ts
import type { ProfessionPack } from '../../types/game.types'

export const boyPhoPack: ProfessionPack = {
  config: {
    id: 'boy_pho',
    name: 'Boy phố làm bố',
    emoji: '😎',
    tagline: 'Đi làm vì đam mê, tiêu tiền của bố mẹ. Deadline là cái gì thế?',
    difficulty: 'Dễ',
    enemy: 'Không sếp nào dám động vào, chỉ sợ hết xăng Wave Alpha',
    startingStats: {
      stress: 0,
      energy: 100,
      salary: 5000000,
    },
    dailySalary: 10000000,
  },
  buffs: [
    {
      id: 'sh_mode',
      name: 'Wave Alpha kiểng độ pô',
      description: 'Pô giòn giã nẹt vang phố. Lạng lách vượt mọi kẹt xe để đến công ty chấm công lúc... 11h trưa.',
      cost: 500000,
      icon: '🛵',
      duration: 'permanent',
      effects: [
        { stat: 'stress', value: -10 },
        { stat: 'energy', value: 10 },
      ],
    },
    {
      id: 'neon_cap',
      name: 'Quần rách gối & Xích bạc',
      description: 'Thời trang đường phố cực ngầu, xích bạc đeo hông leng keng tăng 200% tự tin khi họp báo cáo.',
      cost: 150000,
      icon: '👖',
      duration: 'permanent',
      effects: [
        { stat: 'stress', value: -20 },
        { stat: 'energy', value: 5 },
      ],
    },
    {
      id: 'golden_card',
      name: 'Xích vàng 9999 bản to',
      description: 'Bố mẹ sắm cho sợi dây chuyền to bản. Thể hiện đẳng cấp trâm anh thế phiệt, sếp thấy phải nể 3 phần.',
      cost: 1000000,
      icon: '⛓️',
      duration: 'permanent',
      effects: [
        { stat: 'stress', value: -50 },
        { stat: 'energy', value: 50 },
      ],
    },
    {
      id: 'boba_unlimited',
      name: 'Loa kéo JBL cực trầm',
      description: 'Mang loa kéo vào pantry bật Vinahouse xập xình, biến văn phòng thành sàn diễn xả stress cực mạnh.',
      cost: 200000,
      icon: '🔊',
      duration: 'day',
      effects: [
        { stat: 'stress', value: -15 },
        { stat: 'energy', value: 15 },
      ],
    },
  ],
  events: [
    {
      id: 'bp_wake_late',
      title: 'Ngủ dậy muộn lúc 10h sáng sếp gọi điện hỏi thăm 😴',
      description: 'Bạn ngủ nướng đến tận 10h sáng mới thèm mở mắt. Sếp gọi điện thoại rung bần bật trên giường hỏi thăm xem bạn ngủ có ngon giấc không.',
      priority: 'low',
      professions: ['boy_pho'],
      actions: [
        {
          id: 'bp_wake_late_a',
          label: '😴 "Dạ em ngủ quên sếp ơi" (Sếp tặng quà)',
          effects: [
            { stat: 'energy', value: +20 },
            { stat: 'salary', value: +500000 },
          ],
          feedMessage: 'Sếp vâng dạ bảo bạn cứ nghỉ ngơi thoải mái, rồi gửi tặng voucher ăn trưa 500k để bạn tẩm bổ sức khỏe. 😎',
        },
        {
          id: 'bp_wake_late_b',
          label: '😎 "Bố em bảo hôm nay cho em nghỉ đi lượn phố"',
          effects: [
            { stat: 'energy', value: +30 },
            { stat: 'salary', value: +1000000 },
          ],
          feedMessage: 'Sếp nghe nhắc tới bố bạn liền dạ vâng rối rít, chuyển khoản nóng 1 triệu tiền thưởng chuyên cần khuyến khích bạn đi làm lại. 🛵',
        },
      ],
    },
    {
      id: 'bp_deadline_miss',
      title: 'Trễ deadline báo cáo quý sếp tự nhảy vào làm hộ 📊',
      description: 'Hạn nộp báo cáo doanh số đã qua 3 ngày. Bạn vẫn thong thả ngồi chơi game. PM rón rén đi đến bàn làm việc hỏi xem có cần anh ấy làm hộ không.',
      priority: 'medium',
      professions: ['boy_pho'],
      actions: [
        {
          id: 'bp_deadline_miss_a',
          label: '🤝 "Nhờ anh làm hộ nhé, em bận lướt TikTok"',
          effects: [
            { stat: 'energy', value: +10 },
            { stat: 'salary', value: +500000 },
          ],
          feedMessage: 'PM gật đầu lia lịa ngồi cày cuốc báo cáo thay bạn suốt cả buổi trưa. Sếp ký duyệt đánh giá bạn có kỹ năng ủy quyền xuất sắc. 👏',
        },
        {
          id: 'bp_deadline_miss_b',
          label: '💸 "Anh làm đi mai em mời cả team đi ăn lẩu 10 triệu"',
          effects: [
            { stat: 'energy', value: +15 },
            { stat: 'salary', value: +2000000 },
          ],
          feedMessage: 'PM sướng rơn ngồi làm báo cáo hoàn hảo khớp từng đồng xu. Sếp khen ngợi tinh thần gắn kết tập thể của bạn và thưởng lớn 2 triệu. 💸',
        },
      ],
    },
    {
      id: 'bp_meeting_sleep',
      title: 'Ngủ gục ngáy o o trong cuộc họp sếp tổng 😴',
      description: 'Cuộc họp hội đồng quản trị căng thẳng kéo dài 2 tiếng. Bạn ngồi ghế VIP ngủ gục ngáy vang cả phòng họp trước mặt sếp tổng.',
      priority: 'high',
      professions: ['boy_pho'],
      actions: [
        {
          id: 'bp_meeting_sleep_a',
          label: '🥱 "Sếp nói giọng truyền cảm quá em ngủ quên mất"',
          effects: [
            { stat: 'energy', value: +25 },
            { stat: 'salary', value: +500000 },
          ],
          feedMessage: 'Sếp tổng cười hỷ hả khen bạn biết cảm thụ âm thanh nghệ thuật, rồi tặng bạn voucher cafe Highland tỉnh táo. ☕',
        },
        {
          id: 'bp_meeting_sleep_b',
          label: '🛌 Ngủ dậy thấy sếp tổng đang nhẹ nhàng đắp chăn cho mình',
          effects: [
            { stat: 'energy', value: +30 },
            { stat: 'salary', value: +1000000 },
          ],
          feedMessage: 'Sếp tổng sợ bạn bị lạnh điều hòa nên đắp chăn ấm áp cho bạn ngủ tiếp. Cuộc họp kết thúc trong bầu không khí ấm cúng, thưởng bạn 1 triệu. 🧘',
        },
      ],
    },
    {
      id: 'bp_pantry_party',
      title: 'Biến pantry thành sàn nhảy xập xình lúc 14h chiều 🎶',
      description: 'Bạn thấy buồn chán nên mang loa kéo JBL công suất lớn vào pantry bật nhạc sàn bass đập tức ngực, kéo cả văn phòng vào quẩy tưng bừng lúc đang giờ làm.',
      priority: 'medium',
      professions: ['boy_pho'],
      actions: [
        {
          id: 'bp_pantry_party_a',
          label: '🎶 Bật đèn laser quẩy lắc giật điên cuồng cùng đồng nghiệp',
          effects: [
            { stat: 'energy', value: +20 },
            { stat: 'salary', value: +1000000 },
          ],
          feedMessage: 'Cả văn phòng được xả stress cực mạnh. Sếp đánh giá bạn là nhân tố khuấy động văn hóa doanh nghiệp xuất sắc nhất năm, thưởng nóng 1 triệu. 🕺',
        },
        {
          id: 'bp_pantry_party_b',
          label: '🍻 Mời sếp tổng vào làm một ly bia hơi cùng nhảy Vinahouse',
          effects: [
            { stat: 'energy', value: +25 },
            { stat: 'salary', value: +2000000 },
          ],
          feedMessage: 'Sếp tổng cởi caravat nhảy cực sung cùng bạn. Mọi khoảng cách cấp bậc biến mất. Bạn nhận ngay quyết định thăng chức làm Trợ lý sếp tổng. 💸',
        },
      ],
    },
    {
      id: 'bp_mouse_broken',
      title: 'Chuột làm việc bị hỏng sếp mua tặng ngay Magic Mouse mạ vàng 🖥️',
      description: 'Chuột máy tính của bạn bị đơ nút cuộn. Bạn thở dài chán nản. Sếp thấy vậy liền tức tốc chạy ra ngoài tiệm Apple tậu ngay chuột mạ vàng về dâng tận bàn.',
      priority: 'low',
      professions: ['boy_pho'],
      actions: [
        {
          id: 'bp_mouse_broken_a',
          label: '🖥️ Nhận chuột và khen sếp biết chọn đồ công nghệ',
          effects: [
            { stat: 'energy', value: +10 },
            { stat: 'salary', value: +2000000 },
          ],
          feedMessage: 'Chuột dùng siêu mượt. Hiệu suất lướt web giải trí của bạn tăng vọt. Sếp hoan hỷ vì được bạn khen ngợi tài năng chọn đồ. 🖥️',
        },
        {
          id: 'bp_mouse_broken_b',
          label: '😎 Bảo sếp mua luôn cả chiếc MacBook Pro M3 Max mới tinh',
          effects: [
            { stat: 'energy', value: +20 },
            { stat: 'salary', value: +5000000 },
          ],
          feedMessage: 'Sếp vâng lệnh duyệt mua ngay MacBook Pro 90 triệu cho bạn chơi game mượt mà. Nhập kho lương thêm 5 triệu điểm thưởng nóng. 💸',
        },
      ],
    },
    {
      id: 'bp_intern_fault',
      title: 'Intern làm hỏng code rồi đổ vấy tội lỗi cho bạn 😱',
      description: 'Cậu intern lỡ tay xóa sạch database rồi lên Slack khóc lóc báo sếp là do bạn chỉ đạo làm thế. Sếp tổng nghe tin liền hớt hải chạy vào văn phòng.',
      priority: 'critical',
      professions: ['boy_pho'],
      actions: [
        {
          id: 'bp_intern_fault_a',
          label: '😎 Gọi điện bảo bố mua lại luôn cả công ty để sa thải intern',
          effects: [
            { stat: 'energy', value: +50 },
            { stat: 'salary', value: +10000000 },
          ],
          feedMessage: 'Bố bạn chuyển khoản mua đứt công ty sau 5 phút. Bạn trở thành Chủ tịch Hội đồng quản trị mới. Cả văn phòng quỳ lạy cung phụng bạn. 👑',
        },
        {
          id: 'bp_intern_fault_b',
          label: '🛵 Tặng intern chiếc Wave Alpha làm quà xin lỗi thay cho sếp',
          effects: [
            { stat: 'energy', value: +30 },
            { stat: 'salary', value: +5000000 },
          ],
          feedMessage: 'Intern khóc ròng cảm động, quỳ sụp xuống nhận lỗi với sếp là tự tay làm hỏng chứ bạn không liên quan. Sếp khen bạn nhân hậu vô song. 🤝',
        },
      ],
    },
    {
      id: 'bp_audit_discrepancy',
      title: 'Lệch sổ sách kế toán hẳn 10 tỷ đồng trong két 💸',
      description: 'Khi kiểm toán quỹ phát hiện dòng tiền thu chi công ty bị lệch hụt mất 10 tỷ đồng không rõ nguyên nhân. Đoàn kiểm tra đứng ngồi không yên.',
      priority: 'critical',
      professions: ['boy_pho'],
      actions: [
        {
          id: 'bp_audit_discrepancy_a',
          label: '📲 Alo bố chuyển khoản nhanh 10 tỷ bù đắp két sắt',
          effects: [
            { stat: 'energy', value: +40 },
            { stat: 'salary', value: +20000000 },
          ],
          feedMessage: 'Bố bạn chuyển khoản ngay lập tức kèm lời nhắn: "Tiền tiêu vặt của con hôm nay". Két sắt đầy ắp tiền, đoàn kiểm toán gật gù khen bạn minh bạch. 💸',
        },
        {
          id: 'bp_audit_discrepancy_b',
          label: '🤐 Bảo đoàn kiểm toán tự viết lại số mới cho khớp sổ sách',
          effects: [
            { stat: 'energy', value: +30 },
            { stat: 'salary', value: +10000000 },
          ],
          feedMessage: 'Đoàn kiểm toán vui vẻ sửa lại báo cáo tài chính hoàn hảo khớp từng con số lẻ. Công ty thoát án phạt hoàn hảo, sếp thưởng lớn 10 triệu. 📈',
        },
      ],
    },
    {
      id: 'bp_vip_client',
      title: 'Khách hàng VIP chê bai chất lượng dịch vụ dự án 📉',
      description: 'Đối tác lớn đi tham quan dự án và lên tiếng phàn nàn chất lượng xây dựng không đẳng cấp như quảng cáo, đòi hủy toàn bộ cọc rút tiền.',
      priority: 'high',
      professions: ['boy_pho'],
      actions: [
        {
          id: 'bp_vip_client_a',
          label: '📲 Gọi điện bảo bố mua luôn cả dự án đó tặng đối tác câm nín',
          effects: [
            { stat: 'energy', value: +50 },
            { stat: 'salary', value: +15000000 },
          ],
          feedMessage: 'Bố bạn xuống tiền mua đứt toàn bộ dự án làm tài sản cá nhân. Đối tác VIP há hốc mồm cung kính xin lỗi và ký tiếp hợp đồng trọn đời. 👑',
        },
        {
          id: 'bp_vip_client_b',
          label: '🛥️ Mời khách đi ăn tối ngắm hoàng hôn trên du thuyền triệu đô',
          effects: [
            { stat: 'energy', value: +30 },
            { stat: 'salary', value: +8000000 },
          ],
          feedMessage: 'Chuyến du thuyền đắt đỏ làm khách hàng sướng rơn, quên sạch mọi lời phàn nàn và chốt mua thêm 3 căn biệt thự nữa. Deal khủng chốt hạ! 💸',
        },
      ],
    },
    {
      id: 'bp_logo_ugly',
      title: 'Khách hàng chê logo thiết kế xấu tệ hại không sang trọng 🎨',
      description: 'Khách hàng xem bản phác thảo logo của bạn phán một câu: "Xấu quá em ơi, logo gì nhìn phèn thế này." Bạn mỉm cười nhẹ nhàng.',
      priority: 'high',
      professions: ['boy_pho'],
      actions: [
        {
          id: 'bp_logo_ugly_a',
          label: '💸 Bảo khách xấu thì tự vẽ đi rồi tặng khách 5 tỷ tiêu vặt',
          effects: [
            { stat: 'energy', value: +40 },
            { stat: 'salary', value: +12000000 },
          ],
          feedMessage: 'Khách hàng nhận 5 tỷ liền quỳ sụp khen logo của bạn là kiệt tác nghệ thuật thế kỷ, đem treo trang trọng giữa sảnh chính công ty họ. 🎨',
        },
        {
          id: 'bp_logo_ugly_b',
          label: '🛍️ Đóng máy Figma đi mua sắm xả stress tiêu tiền bố mẹ',
          effects: [
            { stat: 'energy', value: +30 },
            { stat: 'salary', value: +5000000 },
          ],
          feedMessage: 'Bạn xách túi hiệu đi shopping. Đầu óc thảnh thơi thoải mái cực kỳ. Khách hàng sợ mất lòng bạn nên tự động duyệt logo bản gốc khen đẹp. 🧘',
        },
      ],
    },
    {
      id: 'bp_overtime_mandatory',
      title: 'Sếp yêu cầu ở lại làm thêm giờ thứ Bảy dồn dập ⏰',
      description: 'Chiều thứ Sáu sếp đứng lên: "Ngày mai thứ Bảy cả công ty ở lại tăng ca xử lý deadline dồn dập nhé." Bạn khẽ tặc lưỡi.',
      priority: 'high',
      professions: ['boy_pho'],
      actions: [
        {
          id: 'bp_overtime_mandatory_a',
          label: '🌴 Bao trọn gói cả công ty đi nghỉ mát resort 5 sao Phú Quốc thay vì OT',
          effects: [
            { stat: 'energy', value: +50 },
            { stat: 'salary', value: +25000000 },
          ],
          feedMessage: 'Cả công ty được đi nghỉ dưỡng Phú Quốc free cực kỳ sung sướng. Sếp tôn sùng bạn làm Đấng cứu thế công sở. Nhận thưởng danh dự cực khủng! 👑',
        },
        {
          id: 'bp_overtime_mandatory_b',
          label: '🛵 Bảo sếp hôm nay em bận đi Wave Alpha lượn phố cổ',
          effects: [
            { stat: 'energy', value: +30 },
            { stat: 'salary', value: +10000000 },
          ],
          feedMessage: 'Sếp vâng dạ cúi đầu tiễn bạn ra cổng. Bạn vi vu lượn phố hít thở khí trời trong lành thoải mái cực kỳ. Lương thưởng vẫn chuyển đủ 10 triệu. 🛵',
        },
      ],
    },
  ],
}

export default boyPhoPack
