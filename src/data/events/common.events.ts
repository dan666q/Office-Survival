// src/data/events/common.events.ts
import type { GameEvent } from '../../types/event.types'

export const COMMON_EVENTS: GameEvent[] = [
  {
    id: 'com_coffee_machine_broken',
    title: 'Máy pha cà phê của văn phòng bị hỏng 💀',
    description: 'Một buổi sáng kinh hoàng. Máy pha cà phê espresso xịn của công ty báo lỗi "Error 404". Cả văn phòng nháo nhác, vật vờ như zombie.',
    priority: 'high',
    professions: [],
        actions: [
      {
        id: 'order_delivery',
        label: '☕ Đặt Highlands giao gấp (Tốn tiền)',
        effects: [
          { stat: 'salary', value: -50000 },
          { stat: 'energy', value: 20 },
          { stat: 'stress', value: -10 },
        ],
        feedMessage: 'Chi 50k đặt Highlands giao tới. Vừa nhấp một ngụm, linh hồn bạn như được tái sinh. Sẵn sàng chiến đấu. ☕',
      },
      {
        id: 'drink_tap_water',
        label: '🚰 Uống nước lọc cầm hơi',
        effects: [
          { stat: 'energy', value: -15 },
          { stat: 'stress', value: +15 },
        ],
        feedMessage: 'Uống ly nước lọc nhạt nhẽo. Cơn buồn ngủ ập đến đè nặng hai mí mắt. Stress tăng vọt vì thiếu caffeine. 😴',
      },
      {
        id: 'steal_colleague_tea',
        label: '🍵 Pha trộm trà sâm dứa của đồng nghiệp',
        effects: [
          { stat: 'energy', value: 5 },
          { stat: 'stress', value: -5 },
        ],
        feedMessage: 'Pha lén gói trà sâm dứa của chị đồng nghiệp bàn bên. Vị hơi lạ nhưng có chút đường cứu vớt cả buổi sáng. 🍵',
      },
    ],
  },
  {
    id: 'com_office_gossip',
    title: 'Drama căng đét trong pantry 🤫',
    description: 'Đang vào pantry rửa cốc, bạn vô tình nghe thấy hai đồng nghiệp đang thì thầm kể xấu sếp tổng và hé lộ tin đồn cắt giảm nhân sự quý này.',
    priority: 'medium',
    professions: [],
        actions: [
      {
        id: 'join_gossip',
        label: '🤫 Ghé tai hóng cùng và chêm vài câu',
        effects: [
          { stat: 'stress', value: -20 },
          { stat: 'energy', value: -5 },
        ],
        setFlags: { gossip_spread: true },
        feedMessage: 'Bạn hóng drama quên cả thời gian. Stress giảm hẳn vì được hít drama bổ phổi. Nhưng cờ thị phi đã được cắm. 🤫',
      },
      {
        id: 'leave_quietly',
        label: '🎧 Đeo tai nghe lẳng lặng đi ra',
        effects: [
          { stat: 'stress', value: -5 },
        ],
        feedMessage: 'Đeo tai nghe, vờ như không biết gì và bước đi. Tránh xa thị phi là liều thuốc bổ cho tâm hồn. 🧘',
      },
    ],
  },
  {
    id: 'com_gossip_backlash',
    title: 'Sếp triệu tập hỏi cung chuyện tin đồn 😰',
    description: 'Tin đồn trong pantry hôm trước đã truyền đến tai sếp. Sếp gọi bạn vào phòng họp, khóa cửa lại và nhìn bạn đăm đăm hỏi: "Anh/chị có biết ai tung tin đồn nhảm không?"',
    priority: 'critical',
    professions: [],
        requirements: {
      flags: { gossip_spread: true },
    },
    actions: [
      {
        id: 'blame_someone',
        label: '👉 Khai thật tên người kể hôm trước',
        effects: [
          { stat: 'stress', value: +20 },
          { stat: 'salary', value: -100000 },
        ],
        setFlags: { gossip_spread: false, betrayer_tag: true },
        feedMessage: 'Bạn khai tên hai đồng nghiệp hôm trước. Sếp gật đầu hài lòng nhưng tin đồn bạn là kẻ mách lẻo bắt đầu lan rộng. 😰',
      },
      {
        id: 'deny_everything',
        label: '🤐 "Em chỉ vào rửa cái cốc thôi sếp"',
        effects: [
          { stat: 'stress', value: +10 },
          { stat: 'energy', value: -10 },
        ],
        feedMessage: 'Bạn chối phăng. Sếp nhìn nghi ngờ nhưng không làm gì được. Cuộc thẩm vấn kết thúc trong bầu không khí ngột ngạt. 🤐',
      },
    ],
  },
  {
    id: 'com_lunch_thief',
    title: 'Hộp cơm trưa trong tủ lạnh biến mất! 🍱',
    description: 'Đến giờ ăn trưa, bạn hồ hởi mở tủ lạnh công ty ra thì phát hiện hộp thịt kho trứng tự mang đi làm đã... bay màu. Ai đó đã ăn trộm cơm trưa của bạn.',
    priority: 'high',
    professions: [],
    timeSlots: ['lunch'],
    actions: [
      {
        id: 'buy_expensive_lunch',
        label: '🍕 Gọi pizza ăn bù cho bõ tức (Tốn tiền)',
        effects: [
          { stat: 'salary', value: -120000 },
          { stat: 'stress', value: -15 },
          { stat: 'energy', value: 25 },
        ],
        feedMessage: 'Bực mình chi 120k đặt pizza. Ăn no nê ngon lành, quên đi nỗi buồn mất hộp cơm. 🍕',
      },
      {
        id: 'starve_and_angry',
        label: '😤 Nhịn ăn trưa để đi điều tra kẻ trộm',
        effects: [
          { stat: 'energy', value: -25 },
          { stat: 'stress', value: +20 },
        ],
        feedMessage: 'Bạn nhịn ăn, đi check camera và hỏi han. Kết quả: sếp phòng bên ăn nhầm do hộp giống nhau. Vừa đói vừa bực không làm gì được. 😤',
      },
      {
        id: 'eat_instant_noodles',
        label: '🍜 Ăn tạm gói mì tôm hảo hảo của công ty',
        effects: [
          { stat: 'energy', value: 10 },
          { stat: 'stress', value: +5 },
        ],
        feedMessage: 'Ăn gói mì tôm túc tắc qua bữa. Người nóng bừng, ruột cồn cào nhưng ít ra cũng có cái bỏ bụng. 🍜',
      },
    ],
  },
  {
    id: 'com_internet_slow',
    title: 'Mạng Wi-Fi văn phòng bỗng dưng rùa bò 🐢',
    description: 'Cáp quang biển lại đứt, hoặc ai đó đang kéo torrent. Mạng công ty lag đến mức load cái mail mất 5 phút. Bạn đang có báo cáo khẩn cần gửi.',
    priority: 'high',
    professions: [],
        actions: [
      {
        id: 'use_3g_hotspot',
        label: '📱 Phát 4G từ điện thoại cá nhân (Tốn data)',
        effects: [
          { stat: 'salary', value: -20000 },
          { stat: 'energy', value: -5 },
        ],
        feedMessage: 'Phát 4G cá nhân. Mạng căng đét, gửi báo cáo vèo vèo. Tài khoản điện thoại bay mất 20k tiền dung lượng. 📱',
      },
      {
        id: 'blame_it_support',
        label: '📞 Gọi réo IT support lên fix mạng',
        effects: [
          { stat: 'stress', value: +10 },
        ],
        feedMessage: 'IT lên kiểm tra: "Hệ thống bình thường, em thử tắt bật lại Wi-Fi xem." Bạn làm theo, mạng vẫn rùa bò. Cực kỳ ức chế. 😤',
      },
      {
        id: 'go_drink_water',
        label: '🧘 Kệ mạng lag, đi uống nước dạo văn phòng',
        effects: [
          { stat: 'stress', value: -10 },
          { stat: 'energy', value: +10 },
        ],
        feedMessage: 'Tận dụng thời cơ mạng lag để đứng lên đi dạo, uống nước, buôn chuyện. Mạng lag đôi khi lại là một món quà. 🧘',
      },
    ],
  },
  {
    id: 'com_ceo_visit',
    title: 'Sếp tổng đi thị sát văn phòng đột xuất! 👑',
    description: 'Tiếng bước chân dồn dập kèm theo bầu không khí im lặng đáng sợ lan tỏa. Sếp tổng (CEO) cùng dàn lãnh đạo đang đi rảo bước kiểm tra từng góc làm việc.',
    priority: 'critical',
    professions: [],
        actions: [
      {
        id: 'fake_work_hard',
        label: '👨‍💻 Gõ phím liên tục, vờ mặt cực kỳ căng thẳng',
        effects: [
          { stat: 'energy', value: -10 },
          { stat: 'stress', value: +10 },
        ],
        feedMessage: 'Bạn gõ cọc cọc như đang code/nhập số điên cuồng. Sếp tổng đi qua gật đầu tán thưởng thái độ tập trung. Hú vía. 😅',
      },
      {
        id: 'ask_smart_question',
        label: '🙋 Đứng lên chào và hỏi sếp tổng một câu vĩ mô',
        effects: [
          { stat: 'stress', value: +20 },
          { stat: 'salary', value: +150000 },
        ],
        feedMessage: 'Bạn hỏi về định hướng chuyển đổi số của công ty. Sếp tổng khựng lại, cười tươi và khen bạn có tầm nhìn trước toàn bộ văn phòng. Lên điểm cực mạnh. 📈',
      },
      {
        id: 'hide_in_toilet',
        label: '🏃 Trốn ngay vào nhà vệ sinh 15 phút',
        effects: [
          { stat: 'stress', value: -5 },
          { stat: 'energy', value: +5 },
        ],
        feedMessage: 'Ôm điện thoại trốn vào toilet. Khi bạn ra ngoài, sếp tổng đã đi sang tầng khác. An toàn là trên hết. 🚽',
      },
    ],
  },
  {
    id: 'com_birthday_fund',
    title: 'HR đi thu quỹ sinh nhật cho người lạ 💸',
    description: 'Chị HR cầm chiếc hộp giấy đi gõ cửa từng bàn: "Đến lượt đóng quỹ sinh nhật cho anh Nam phòng Vận hành nhé em, mỗi người 50k nhé." Bạn thậm chí còn không biết anh Nam đó trông như thế nào.',
    priority: 'low',
    professions: [],
        actions: [
      {
        id: 'pay_happily',
        label: '💸 Đóng luôn 50k cho nhanh gọn',
        effects: [
          { stat: 'salary', value: -50000 },
          { stat: 'stress', value: -5 },
        ],
        feedMessage: 'Chi 50k đóng quỹ. HR cười tươi ghi nhận. Bạn được yên thân tiếp tục làm việc. 💸',
      },
      {
        id: 'decline_politely',
        label: '🙅 Từ chối khéo: "Em hết tiền mặt rồi chị ơi"',
        effects: [
          { stat: 'stress', value: +15 },
        ],
        feedMessage: 'Bạn từ chối đóng. HR nhíu mày thở dài: "Vậy để chị quét mã Momo nhé." Bạn ngậm ngùi chuyển khoản Momo. Chạy trời không khỏi nắng. 😰',
      },
    ],
  },
  {
    id: 'com_ac_leak',
    title: 'Điều hòa văn phòng rỉ nước ngay trên đầu 💧',
    description: 'Mùa hè nắng nóng, cục lạnh điều hòa hoạt động quá công suất bắt đầu rỉ nước "tóc tóc" ngay sát chiếc máy tính đắt tiền và tập tài liệu của bạn.',
    priority: 'medium',
    professions: [],
        actions: [
      {
        id: 'report_admin',
        label: '📞 Báo hành chính nhân sự lên sửa gấp',
        effects: [
          { stat: 'energy', value: -10 },
          { stat: 'stress', value: +5 },
        ],
        feedMessage: 'Báo Admin. 30 phút sau có người mang xô nhựa tới hứng tạm nước và hẹn hôm sau sửa. Bạn phải dịch bàn làm việc sang bên. 🪣',
      },
      {
        id: 'move_desk_quietly',
        label: '🚶 Tự động di chuyển bàn ra góc khác lánh nạn',
        effects: [
          { stat: 'energy', value: -15 },
        ],
        feedMessage: 'Tự khênh bàn ghế, máy móc lùi lại 1 mét. Mệt đứt hơi nhưng bảo vệ an toàn cho thiết bị của mình. 💪',
      },
    ],
  },
  {
    id: 'com_printer_jam',
    title: 'Máy in kẹt giấy lúc cần in tài liệu gấp 📄',
    description: 'Sắp họp duyệt ngân sách/thiết kế, bạn chạy ra máy in chung để in tài liệu thì máy in kêu "kẹt kẹt" và báo lỗi kẹt giấy đỏ lòm. Không có tài liệu không họp được.',
    priority: 'high',
    professions: [],
        actions: [
      {
        id: 'fix_printer_yourself',
        label: '🛠️ Tự mở máy in, rút tờ giấy kẹt ra',
        effects: [
          { stat: 'energy', value: -15 },
          { stat: 'stress', value: +5 },
        ],
        feedMessage: 'Bạn tự cạy khay mực, giật mạnh tờ giấy kẹt. Mực đen bám đầy tay nhưng máy in hoạt động lại. Tài liệu được in kịp giờ họp! 🛠️',
      },
      {
        id: 'call_admin_support',
        label: '📞 Gọi chị Admin lên xử lý hộ',
        effects: [
          { stat: 'stress', value: +10 },
        ],
        setFlags: { printer_broken: true },
        feedMessage: 'Admin báo: "Chờ chị gọi thợ, máy này kẹt nặng rồi." Bạn không có tài liệu giấy đi họp, bị sếp phê bình chuẩn bị thiếu chu đáo. 💀',
      },
    ],
  },
  {
    id: 'com_free_boba',
    title: 'Đồng nghiệp khao trà sữa chiều free! 🥤',
    description: 'Chị đồng nghiệp bàn bên chốt được deal/deploy thành công quyết định order 10 ly trà sữa Gong Cha khao cả phòng. Cơ hội nạp đường cuối ngày.',
    priority: 'low',
    professions: [],
        actions: [
      {
        id: 'drink_boba_full',
        label: '🥤 Uống cạn ly trà sữa trân châu đường đen',
        effects: [
          { stat: 'energy', value: 30 },
          { stat: 'stress', value: +10 },
        ],
        feedMessage: 'Uống ly trà sữa ngọt lịm. Năng lượng hồi sinh cực mạnh. Tuy nhiên sau 30 phút, lượng đường sụt giảm đột ngột (sugar crash) khiến bạn lờ đờ, đau đầu. 😵‍💫',
      },
      {
        id: 'decline_diet',
        label: '🙅 Từ chối vì đang ăn kiêng giảm cân',
        effects: [
          { stat: 'stress', value: -5 },
          { stat: 'energy', value: -5 },
        ],
        feedMessage: 'Bạn kiên quyết từ chối. Lương tâm thanh thản, eo thon gọn. Nhưng nhìn mọi người uống bạn cũng hơi thèm thèm. 🧘',
      },
    ],
  },
  {
    id: 'com_company_audit_training',
    title: 'Sếp bắt tham gia tập huấn phòng cháy chữa cháy đột xuất 🚒',
    description: 'Hành chính nhân sự phát loa thông báo: "Tất cả nhân viên di chuyển xuống sân chung để tham gia buổi diễn tập PCCC bắt buộc kéo dài 2 tiếng."',
    priority: 'medium',
    professions: [],
        actions: [
      {
        id: 'attend_training_actively',
        label: '🚒 Nghiêm túc diễn tập, bê bình chữa cháy dập lửa thực tế',
        effects: [
          { stat: 'energy', value: -20 },
          { stat: 'stress', value: -5 },
        ],
        feedMessage: 'Bạn nhiệt tình ôm bình bột dập lửa. Người ám đầy khói và mồ hôi nhưng được sếp khen có tinh thần trách nhiệm tập thể. 🚒',
      },
      {
        id: 'hide_in_cafe',
        label: '🏃 Lẻn ra quán cà phê dưới sảnh ngồi lánh nạn (Tốn tiền)',
        effects: [
          { stat: 'salary', value: -40000 },
          { stat: 'energy', value: +15 },
          { stat: 'stress', value: -10 },
        ],
        feedMessage: 'Bạn giả vờ đi vệ sinh rồi lẻn thẳng ra quán Highlands ngồi máy lạnh uống trà đào. Vừa sướng thân vừa tránh được nắng nóng. ☕',
      },
    ],
  },
  {
    id: 'com_fridge_cleaning',
    title: 'Hành chính tổng vệ sinh tủ lạnh Pantry công ty 🧹',
    description: 'HR dán thông báo khẩn: "16h00 chiều nay tủ lạnh sẽ được dọn dẹp sạch sẽ. Toàn bộ thực phẩm, hộp nhựa không ghi tên sẽ bị vứt thẳng vào sọt rác."',
    priority: 'low',
    professions: [],
        actions: [
      {
        id: 'label_box',
        label: '📝 Chạy ngay vào dán băng keo ghi tên mình lên hộp',
        effects: [
          { stat: 'energy', value: -5 },
        ],
        feedMessage: 'Bạn nhanh chân dán nhãn tên to đùng lên hộp hoa quả. Đồ ăn của bạn được an toàn qua đợt càn quét. 🍍',
      },
      {
        id: 'ignore_fridge',
        label: '🙈 Kệ đi, trong đó làm gì có đồ của mình',
        effects: [
          { stat: 'stress', value: -5 },
        ],
        feedMessage: 'Bạn phớt lờ thông báo. Buổi chiều đi qua thấy tủ lạnh sạch bóng, trống trơn láng o. Đỡ mùi hẳn. 🧘',
      },
    ],
  },
  {
    id: 'com_heavy_rain_leak',
    title: 'Mưa giông bão giật làm dột cửa kính văn phòng ⛈️',
    description: 'Một cơn giông lớn đổ bộ vào thành phố. Gió giật mạnh làm nước mưa tạt qua khe hở cửa kính dột tong tong thẳng vào khu vực bàn làm việc của bạn.',
    priority: 'high',
    professions: [],
        actions: [
      {
        id: 'towel_shield',
        label: '🛡️ Lấy khăn lau và giấy vệ sinh đắp đê ngăn nước',
        effects: [
          { stat: 'energy', value: -15 },
          { stat: 'stress', value: +5 },
        ],
        feedMessage: 'Bạn đắp một con đê bằng khăn lau và giấy. Đê thấm đẫm nước mưa nhưng bảo vệ được máy tính không bị chập điện. 🌧️',
      },
      {
        id: 'ask_admin_relocate',
        label: '🚶 Ôm laptop sang khu vực bàn trống khác lánh nạn',
        effects: [
          { stat: 'energy', value: -10 },
        ],
        feedMessage: 'Bạn dứt khoát rút sạc ôm máy sang dãy bàn của phòng Marketing lánh nạn. Mặc kệ góc bàn cũ ngập trong nước. 🧘',
      },
    ],
  },
  {
    id: 'com_colleague_resigns',
    title: 'Đồng nghiệp ngồi cạnh nộp đơn xin nghỉ việc đột ngột 😭',
    description: 'Đồng nghiệp thân thiết nhất của bạn vừa được duyệt đơn nghỉ việc, họ thu dọn đồ đạc và bàn giao lại cho bạn một folder tài liệu cực kỳ lộn xộn.',
    priority: 'high',
    professions: [],
        actions: [
      {
        id: 'farewell_lunch',
        label: '🍕 Rủ đi ăn trưa chia tay bùi ngùi (Tốn tiền)',
        effects: [
          { stat: 'salary', value: -100000 },
          { stat: 'stress', value: -15 },
          { stat: 'energy', value: +10 },
        ],
        feedMessage: 'Hai người đi ăn pizza nói chuyện tương lai ấm áp. Bạn chúc họ may mắn và nhận được lời hứa sẽ giới thiệu cơ hội tốt cho bạn về sau. 🤝',
      },
      {
        id: 'reject_messy_handover',
        label: '🙅 Yêu cầu họ phải sắp xếp lại folder ngăn nắp mới nhận',
        effects: [
          { stat: 'stress', value: +10 },
        ],
        feedMessage: 'Bạn thẳng thắn từ chối nhận đống lộn xộn. Họ hơi buồn nhưng cũng hiểu và dành 1 tiếng để phân loại gọn gàng trước khi bàn giao. 📂',
      },
    ],
  },
  {
    id: 'com_company_party_fund',
    title: 'Đóng quỹ liên hoan ăn uống cuối tháng 🍻',
    description: 'Trưởng ban công đoàn gõ thước lên bàn: "Cuối tuần này cả phòng đi ăn lẩu nướng buffet nhé mọi người, mỗi người đóng trước 300k quỹ liên hoan ạ."',
    priority: 'low',
    professions: [],
        actions: [
      {
        id: 'pay_party_happily',
        label: '💸 Đóng tiền ngay để đi ăn nhậu xả stress',
        effects: [
          { stat: 'salary', value: -300000 },
          { stat: 'stress', value: -15 },
          { stat: 'energy', value: +10 },
        ],
        feedMessage: 'Chi 300k đóng quỹ. Tinh thần phấn chấn hướng tới buổi tối cuối tuần ăn uống tẹt ga cùng mọi người. 🍻',
      },
      {
        id: 'decline_party_saving',
        label: '🙅 Từ chối khéo: "Cuối tuần em phải về quê có việc ạ"',
        effects: [
          { stat: 'stress', value: +10 },
        ],
        feedMessage: 'Bạn từ chối tham gia. Tiết kiệm được 300k tiền mặt nhưng bầu không khí có chút gượng gạo nhẹ. 🧘',
      },
    ],
  },
]

