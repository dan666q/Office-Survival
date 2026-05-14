import type { GameEvent } from '../../types/event.types'

export const SEO_EVENTS: GameEvent[] = [
  {
    id: 'seo_ghost_client',
    title: 'Khách hỏi giá xong... biến mất 👻',
    description: 'Chat 30 phút. Hỏi đủ thứ. "Anh cần suy nghĩ thêm." Seen. Block.',
    priority: 'high',
    professions: ['seo_bds'],
    actions: [
      {
        id: 'follow_up',
        label: '📱 Follow up lần 2',
        effects: [
          { stat: 'stress', value: +5, reason: 'Hy vọng mong manh' },
          { stat: 'energy', value: -5, reason: 'Tốn công theo dõi' },
        ],
        feedMessage: 'Nhắn lần 2. Delivered. Không seen. Thôi rồi. 👻',
      },
      {
        id: 'move_on',
        label: '🚶 Next lead thôi',
        effects: [
          { stat: 'stress', value: -10, reason: 'Không lãng phí thêm năng lượng' },
          { stat: 'reputation', value: +5, reason: 'Biết khi nào nên dừng' },
        ],
        feedMessage: 'Mark as lost. Chuyển sang lead tiếp theo. Đây là đúng. 💪',
      },
      {
        id: 'send_zalo',
        label: '📲 Nhắn Zalo dự phòng',
        effects: [
          { stat: 'stress', value: +5, reason: 'Aggressive một chút' },
          { stat: 'reputation', value: -5, reason: 'Hơi spam' },
          { stat: 'salary', value: +200000, reason: 'Khách reply! Còn tiềm năng.' },
        ],
        feedMessage: 'Zalo: "Anh ơi em có căn mới phù hợp hơn nè." Khách reply.奇跡. 🎉',
      },
    ],
  },
  {
    id: 'seo_fake_lead',
    title: 'Lead mới! Số điện thoại sai.',
    description: 'Form đăng ký vừa vào. Tên: Nguyễn Văn A. SĐT: 0123456789. Địa chỉ: abc.',
    priority: 'medium',
    professions: ['seo_bds'],
    actions: [
      {
        id: 'call_anyway',
        label: '📞 Gọi thử xem',
        effects: [
          { stat: 'energy', value: -5, reason: 'Mất công gọi số không có thật' },
          { stat: 'stress', value: +5, reason: 'Lại lead rác' },
        ],
        feedMessage: '"Thuê bao quý khách vừa gọi..." Lead rác. Lần thứ 7 hôm nay. 😤',
      },
      {
        id: 'mark_junk',
        label: '🗑️ Mark spam, bỏ qua',
        effects: [
          { stat: 'stress', value: -5, reason: 'Không lãng phí thời gian' },
          { stat: 'reputation', value: +5, reason: 'Làm việc hiệu quả' },
        ],
        feedMessage: 'Mark junk. CRM clean hơn. Cảm giác tốt. 🧹',
      },
      {
        id: 'report_source',
        label: '📊 Báo cáo nguồn lead tệ',
        effects: [
          { stat: 'energy', value: -10, reason: 'Làm report mất thời gian' },
          { stat: 'reputation', value: +15, reason: 'Cải thiện quy trình cho cả team' },
        ],
        feedMessage: 'Bạn báo cáo: 60% lead từ nguồn này là rác. Sếp điều chỉnh budget marketing. 📈',
      },
    ],
  },
  {
    id: 'seo_boss_pressure',
    title: 'Sếp: "Tháng này chốt bao nhiêu deal rồi?"',
    description: 'Họp tuần. Sếp nhìn thẳng vào mắt bạn. Câu hỏi kinh dị nhất trong nghề sales.',
    priority: 'critical',
    professions: ['seo_bds'],
    timeSlots: ['morning', 'morning_start'],
    actions: [
      {
        id: 'honest_zero',
        label: '😅 "Chưa có ạ sếp"',
        effects: [
          { stat: 'stress', value: +20, reason: 'Sếp không vui' },
          { stat: 'reputation', value: -10, reason: 'Kết quả chưa tốt' },
          { stat: 'energy', value: -10, reason: 'Tinh thần xuống' },
        ],
        feedMessage: '"Chưa có ạ." Sếp thở dài dài. Im lặng 5 giây. "Em cần hỗ trợ gì không?" 😰',
      },
      {
        id: 'show_pipeline',
        label: '📋 Show pipeline tiềm năng',
        effects: [
          { stat: 'stress', value: +5, reason: 'Áp lực chứng minh' },
          { stat: 'reputation', value: +10, reason: 'Có kế hoạch rõ ràng' },
        ],
        feedMessage: 'Bạn show 5 lead đang nurture. Sếp gật đầu. "Em theo dõi sát nha." Được rồi. 📊',
      },
      {
        id: 'blame_market',
        label: '📉 "Thị trường đang khó ạ"',
        effects: [
          { stat: 'stress', value: -5, reason: 'Đổ cho yếu tố ngoài rồi' },
          { stat: 'reputation', value: -15, reason: 'Sếp nghe câu này 100 lần rồi' },
        ],
        feedMessage: 'Sếp: "Thị trường khó nhưng anh Hùng vẫn chốt 3 deal đó em." 💀',
      },
    ],
  },
  {
    id: 'seo_price_negotiation',
    title: 'Khách trả giá thấp hơn 30%',
    description: '"Anh chỉ có ngần đó thôi em." Căn hộ 3 tỷ, anh offer 2.1 tỷ. Thẳng thắn thật.',
    priority: 'high',
    professions: ['seo_bds'],
    actions: [
      {
        id: 'hold_price',
        label: '💪 Giữ giá',
        effects: [
          { stat: 'stress', value: +10, reason: 'Căng thẳng đàm phán' },
          { stat: 'reputation', value: +5, reason: 'Chuyên nghiệp, không bán phá giá' },
        ],
        feedMessage: 'Bạn giữ giá. Khách suy nghĩ. 2 ngày sau khách đồng ý. Kiên nhẫn thắng. 💪',
      },
      {
        id: 'negotiate_middle',
        label: '🤝 Đề xuất 2.5 tỷ',
        effects: [
          { stat: 'stress', value: -5, reason: 'Tìm được điểm chung' },
          { stat: 'salary', value: +3000000, reason: 'Hoa hồng deal!' },
          { stat: 'reputation', value: +15, reason: 'Chốt deal thành công' },
        ],
        feedMessage: 'Deal 2.5 tỷ. Cả hai bên happy. Hoa hồng về tài khoản. Cuộc sống tươi đẹp. 🎉',
      },
      {
        id: 'lose_deal',
        label: '🚶 Không đồng ý, để khách đi',
        effects: [
          { stat: 'stress', value: -5, reason: 'Thôi kệ' },
          { stat: 'reputation', value: -5, reason: 'Miss deal' },
          { stat: 'energy', value: +5, reason: 'Không phí thêm công sức' },
        ],
        feedMessage: 'Khách đi. 3 ngày sau khách quay lại. Giá cũ. Đôi khi buông bỏ là đúng. 🧘',
      },
    ],
  },
  {
    id: 'seo_site_visit',
    title: 'Khách muốn xem nhà lúc 7am',
    description: '"Em ơi anh chỉ rảnh sáng sớm thôi." 7am. Thứ Bảy. Căn hộ cách nhà bạn 20km.',
    priority: 'medium',
    professions: ['seo_bds'],
    actions: [
      {
        id: 'agree_7am',
        label: '😴 OK anh, em có mặt',
        effects: [
          { stat: 'energy', value: -25, reason: 'Dậy sớm, đi xa' },
          { stat: 'reputation', value: +15, reason: 'Tận tâm với khách' },
          { stat: 'stress', value: +5, reason: 'Hơi mệt' },
        ],
        feedMessage: 'Bạn có mặt lúc 6:55am. Khách đến lúc 7:35am. "Anh bị kẹt xe." Tất nhiên rồi. ☕',
      },
      {
        id: 'negotiate_time',
        label: '⏰ Đề xuất 9am',
        effects: [
          { stat: 'stress', value: -5, reason: 'Giờ hợp lý hơn' },
          { stat: 'energy', value: -10, reason: 'Vẫn phải đi sớm' },
          { stat: 'reputation', value: +5, reason: 'Chuyên nghiệp' },
        ],
        feedMessage: 'Khách đồng ý 9am. Mọi thứ diễn ra bình thường. Nhà khách thích. Đang xem xét. 🏠',
      },
      {
        id: 'send_colleague',
        label: '👥 Nhờ đồng nghiệp đi thay',
        effects: [
          { stat: 'energy', value: +10, reason: 'Được ngủ thêm' },
          { stat: 'reputation', value: -10, reason: 'Khách hơi thất vọng' },
          { stat: 'stress', value: -10, reason: 'Không phải lo nữa' },
        ],
        feedMessage: 'Đồng nghiệp đi thay. Khách hỏi bạn đâu. Awkward. Nhưng bạn đã ngủ đủ giấc. 😴',
      },
    ],
  },
  {
    id: 'seo_competitor',
    title: 'Khách đang xem nhà với agency khác',
    description: 'Khách vừa mention họ đang compare với "bên kia có giá tốt hơn." Áp lực.',
    priority: 'high',
    professions: ['seo_bds'],
    actions: [
      {
        id: 'highlight_value',
        label: '💎 Nhấn mạnh giá trị',
        effects: [
          { stat: 'energy', value: -10, reason: 'Phải thuyết phục kỹ hơn' },
          { stat: 'reputation', value: +10, reason: 'Tư vấn chuyên nghiệp' },
          { stat: 'salary', value: +1000000, reason: 'Chốt được deal khó' },
        ],
        feedMessage: 'Bạn so sánh chi tiết: vị trí, tiện ích, pháp lý. Khách chọn bạn. Giá không phải tất cả. 💎',
      },
      {
        id: 'lower_price',
        label: '💰 Đề xuất giảm giá',
        effects: [
          { stat: 'stress', value: +5, reason: 'Phải xin phép chủ nhà' },
          { stat: 'salary', value: +500000, reason: 'Deal nhỏ hơn nhưng có deal' },
          { stat: 'reputation', value: -5, reason: 'Bán phá giá không tốt cho thị trường' },
        ],
        feedMessage: 'Giảm 5%. Khách chốt. Hoa hồng ít hơn. Nhưng có còn hơn không. 🤷',
      },
      {
        id: 'let_go',
        label: '🙏 Chúc khách may mắn',
        effects: [
          { stat: 'stress', value: -15, reason: 'Không cạnh tranh vô ích' },
          { stat: 'reputation', value: +10, reason: 'Chuyên nghiệp và graceful' },
        ],
        feedMessage: '"Chúc anh chị tìm được nhà ưng ý." Khách ấn tượng. 1 tuần sau khách giới thiệu bạn cho người quen. 🌟',
      },
    ],
  },
  {
    id: 'seo_legal_issue',
    title: 'Sổ đỏ của căn nhà đang thế chấp ngân hàng',
    description: 'Khách sắp đặt cọc. Bạn vừa phát hiện sổ đỏ đang thế chấp. Chủ nhà không đề cập.',
    priority: 'critical',
    professions: ['seo_bds'],
    actions: [
      {
        id: 'tell_client',
        label: '💯 Nói thật với khách',
        effects: [
          { stat: 'stress', value: +5, reason: 'Deal có thể vỡ' },
          { stat: 'reputation', value: +25, reason: 'Tư vấn trung thực, bảo vệ khách' },
          { stat: 'salary', value: -500000, reason: 'Có thể mất deal này' },
        ],
        feedMessage: 'Bạn nói thật. Khách cảm ơn. Deal hoãn lại. Khách tin tưởng bạn dài hạn. 🤝',
      },
      {
        id: 'hide_info',
        label: '🤐 Kệ, cứ ký hợp đồng',
        effects: [
          { stat: 'stress', value: +30, reason: 'Rủi ro pháp lý rất cao' },
          { stat: 'salary', value: +2000000, reason: 'Hoa hồng ngắn hạn' },
          { stat: 'reputation', value: -40, reason: 'Nếu bị phát hiện, xong nghiệp' },
        ],
        chainEvents: [{ eventId: 'seo_legal_issue', delay: 5000 }],
        feedMessage: 'Hợp đồng ký. Hoa hồng vào túi. 2 tuần sau khách phát hiện. Luật sư vào cuộc. 💀',
      },
      {
        id: 'check_with_owner',
        label: '📞 Hỏi thẳng chủ nhà',
        effects: [
          { stat: 'energy', value: -10, reason: 'Cuộc trò chuyện khó xử' },
          { stat: 'reputation', value: +15, reason: 'Xử lý đúng quy trình' },
          { stat: 'stress', value: +5, reason: 'Không biết chủ nhà phản ứng thế nào' },
        ],
        feedMessage: 'Chủ nhà confirm đang thế chấp nhưng sắp tất toán. Deal hoãn 2 tuần. Mọi thứ OK. ✅',
      },
    ],
  },
  {
    id: 'seo_social_media',
    title: 'Sếp bắt đăng 5 bài Facebook/ngày',
    description: '"Phải đẩy mạnh digital marketing." Bạn không biết viết content. Nhưng quota là quota.',
    priority: 'medium',
    professions: ['seo_bds'],
    actions: [
      {
        id: 'write_quality',
        label: '✍️ Viết content chất lượng',
        effects: [
          { stat: 'energy', value: -20, reason: 'Content tốt cần thời gian' },
          { stat: 'reputation', value: +15, reason: 'Brand cá nhân tốt' },
          { stat: 'salary', value: +500000, reason: 'Lead từ social media' },
        ],
        feedMessage: 'Bài viết về "5 điều cần kiểm tra trước khi mua nhà" viral nhẹ. 47 share. 3 lead mới. 📱',
      },
      {
        id: 'copy_paste',
        label: '📋 Copy từ Google',
        effects: [
          { stat: 'stress', value: -5, reason: 'Nhanh xong quota' },
          { stat: 'reputation', value: -10, reason: 'Content không có giá trị' },
        ],
        feedMessage: 'Copy paste xong. 5 bài đăng. 0 reach. 0 interaction. Thuật toán biết hết. 📉',
      },
      {
        id: 'use_ai',
        label: '🤖 Dùng ChatGPT viết',
        effects: [
          { stat: 'energy', value: -5, reason: 'Cần edit lại cho tự nhiên' },
          { stat: 'reputation', value: +5, reason: 'Nội dung tạm ổn' },
          { stat: 'salary', value: +200000, reason: 'Có lead nhỏ' },
        ],
        feedMessage: 'AI viết, bạn edit nhẹ. Decent content. 1 lead hỏi thêm thông tin. Tạm được. 🤖',
      },
    ],
  },
  {
    id: 'seo_market_down',
    title: 'Thị trường BĐS đóng băng tháng này',
    description: 'Tin tức trên báo. Khách hàng lo ngại. Không ai muốn mua. Quota vẫn giữ nguyên.',
    priority: 'critical',
    professions: ['seo_bds'],
    actions: [
      {
        id: 'pivot_rental',
        label: '🔄 Chuyển sang cho thuê',
        effects: [
          { stat: 'stress', value: -10, reason: 'Tìm được hướng mới' },
          { stat: 'salary', value: +1000000, reason: 'Rental commission' },
          { stat: 'reputation', value: +10, reason: 'Linh hoạt thích nghi' },
        ],
        feedMessage: 'Pivot sang rental market. 3 hợp đồng cho thuê tháng này. Ít hơn mua bán nhưng ổn định. 🏠',
      },
      {
        id: 'nurture_leads',
        label: '📱 Nurture lead cũ',
        effects: [
          { stat: 'energy', value: -10, reason: 'Gọi điện nhiều' },
          { stat: 'reputation', value: +10, reason: 'Duy trì quan hệ khách hàng' },
          { stat: 'salary', value: +500000, reason: 'Lead cũ ready mua lại' },
        ],
        feedMessage: 'Gọi lại 20 lead cũ. 2 người ready. Thị trường khó nhưng vẫn có người cần nhà. 📞',
      },
      {
        id: 'complain',
        label: '😤 Kêu ca với đồng nghiệp',
        effects: [
          { stat: 'stress', value: -5, reason: 'Ít nhất có người nghe' },
          { stat: 'reputation', value: -10, reason: 'Tiêu cực ảnh hưởng team' },
          { stat: 'energy', value: -5, reason: 'Lãng phí thời gian' },
        ],
        feedMessage: 'Kêu ca 30 phút. Đồng nghiệp đồng cảm. Thị trường vẫn đóng băng. Không thay đổi gì. 🤷',
      },
    ],
  },
  {
    id: 'seo_referral',
    title: 'Khách cũ giới thiệu khách mới!',
    description: 'Tin nhắn: "Em ơi, anh giới thiệu bạn anh cần mua nhà, em tư vấn giúp nha." Cơ hội vàng.',
    priority: 'low',
    professions: ['seo_bds'],
    actions: [
      {
        id: 'call_immediately',
        label: '📞 Gọi ngay',
        effects: [
          { stat: 'energy', value: -5, reason: 'Nhưng xứng đáng' },
          { stat: 'reputation', value: +15, reason: 'Phản hồi nhanh = chuyên nghiệp' },
          { stat: 'salary', value: +2000000, reason: 'Deal từ referral thường chốt nhanh' },
        ],
        feedMessage: 'Gọi ngay. Tư vấn 45 phút. Hẹn xem nhà cuối tuần. Referral là gold. 🌟',
      },
      {
        id: 'schedule_later',
        label: '📅 Hẹn gặp hôm sau',
        effects: [
          { stat: 'stress', value: -5, reason: 'Không vội' },
          { stat: 'reputation', value: +5, reason: 'Vẫn ổn' },
          { stat: 'salary', value: +1000000, reason: 'Deal chậm hơn nhưng vẫn có' },
        ],
        feedMessage: 'Hẹn hôm sau. Khách vẫn chờ. Deal diễn ra bình thường sau 1 tuần. 👍',
      },
      {
        id: 'thank_referrer',
        label: '🎁 Cảm ơn khách cũ trước',
        effects: [
          { stat: 'reputation', value: +20, reason: 'Biết ơn = loyalty lâu dài' },
          { stat: 'energy', value: -5, reason: 'Mua quà cảm ơn' },
          { stat: 'salary', value: +1500000, reason: 'Deal từ referral' },
        ],
        feedMessage: 'Gửi hoa quả cảm ơn khách cũ. Khách mới thấy vậy ấn tượng. Chốt deal. Referral thứ 2 đang đến. 🎁',
      },
    ],
  },
  {
    id: 'seo_quota_end_month',
    title: 'Cuối tháng, quota còn thiếu 1 deal',
    description: '3 ngày nữa hết tháng. 1 deal nữa là đủ quota. Bonus đang chờ. Áp lực đỉnh điểm.',
    priority: 'critical',
    professions: ['seo_bds'],
    timeSlots: ['afternoon', 'end_of_day'],
    actions: [
      {
        id: 'push_all_leads',
        label: '⚡ Push tất cả lead đang có',
        effects: [
          { stat: 'energy', value: -30, reason: 'Gọi điện không nghỉ' },
          { stat: 'stress', value: +15, reason: 'Áp lực cực độ' },
          { stat: 'salary', value: +5000000, reason: 'Quota đạt! Bonus!' },
          { stat: 'reputation', value: +10, reason: 'Đạt target' },
        ],
        feedMessage: 'Gọi 15 người trong 3 tiếng. 1 người chốt. Quota đạt. Bonus vào túi. Tay run nhưng mặt cười. 💰',
      },
      {
        id: 'accept_miss',
        label: '😔 Chấp nhận miss quota',
        effects: [
          { stat: 'stress', value: -20, reason: 'Bỏ áp lực xuống' },
          { stat: 'reputation', value: -15, reason: 'Miss quota tháng này' },
          { stat: 'salary', value: -1000000, reason: 'Không có bonus' },
        ],
        feedMessage: 'Miss quota. Không có bonus. Nhưng bạn còn năng lượng cho tháng sau. Đôi khi vậy là đúng. 🧘',
      },
      {
        id: 'ask_for_help',
        label: '🤝 Nhờ đồng nghiệp chia lead',
        effects: [
          { stat: 'stress', value: -5, reason: 'Bớt một mình chiến đấu' },
          { stat: 'reputation', value: +5, reason: 'Teamwork' },
          { stat: 'salary', value: +2000000, reason: 'Chia hoa hồng, vẫn có deal' },
        ],
        feedMessage: 'Đồng nghiệp chia lead. Split commission. Deal chốt. Ít hơn nhưng đủ quota. 🤝',
      },
    ],
  },
]