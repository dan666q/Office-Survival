import type { ProfessionPack } from '../../types/game.types'

export const seoBdsPack: ProfessionPack = {
  config: {
    id: 'seo_bds',
    name: 'Sales BĐS',
    emoji: '🏠',
    tagline: 'Khách nào cũng tiềm năng. Cho đến khi họ block bạn.',
    difficulty: 'Khó',
    enemy: 'Khách ảo, leads rác, sếp thúc chốt deal',
    startingStats: {
      stress: 30,
      energy: 90,
      salary: 500000,
    },
    dailySalary: 364000,
  },
  buffs: [
    {
      id: 'chot_deal',
      name: 'Kịch bản chốt deal',
      description: '47 câu trả lời cho mọi objection của khách hàng.',
      cost: 500000,
      icon: '📋',
      duration: 'day',
      effects: [
        { stat: 'stress', value: -15 },
        { stat: 'energy', value: 10 },
      ],
    },
    {
      id: 'crm_pro',
      name: 'CRM xịn',
      description: 'Quản lý lead bài bản. Không còn quên follow up.',
      cost: 600000,
      icon: '📊',
      duration: 'day',
      effects: [
        { stat: 'energy', value: 15 },
        { stat: 'stress', value: -15 },
      ],
    },
    {
      id: 'sales_script',
      name: 'Sales script pro',
      description: 'Mỗi cuộc gọi đều có kịch bản. Không còn ấp úng khi khách hỏi khó.',
      cost: 350000,
      icon: '📝',
      duration: 'day',
      effects: [
        { stat: 'stress', value: -15 },
        { stat: 'energy', value: 10 },
      ],
    },
    {
      id: 'hot_listing',
      name: 'Listing hot tay',
      description: 'Căn nhà đẹp, giá tốt, pháp lý sạch. Khách xếp hàng.',
      cost: 1000000,
      icon: '🏠',
      duration: 'day',
      effects: [
        { stat: 'stress', value: -20 },
        { stat: 'energy', value: 20 },
      ],
    },
  ],
  events: [
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
            { stat: 'stress', value: +5 },
            { stat: 'energy', value: -5 },
          ],
          feedMessage: 'Nhắn lần 2. Delivered. Không seen. Thôi rồi. 👻',
        },
        {
          id: 'move_on',
          label: '🚶 Next lead thôi',
          effects: [
            { stat: 'stress', value: -10 },
          ],
          feedMessage: 'Mark as lost. Chuyển sang lead tiếp theo. Đây là đúng. 💪',
        },
        {
          id: 'send_zalo',
          label: '📲 Nhắn Zalo dự phòng',
          effects: [
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Zalo: "Anh ơi em có căn mới phù hợp hơn nè." Khách reply. Kỳ tích. 🎉',
        },
      ],
    },
    {
      id: 'seo_fake_lead',
      title: 'Lead mới! Số điện thoại sai.',
      description: 'Form đăng ký vừa vào. Tên: Nguyễn Văn A. SĐT: 0123456789.',
      priority: 'medium',
      professions: ['seo_bds'],
      actions: [
        {
          id: 'call_anyway',
          label: '📞 Gọi thử xem',
          effects: [
            { stat: 'energy', value: -5 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: '"Thuê bao quý khách vừa gọi..." Lead rác. Lần thứ 7 hôm nay. 😤',
        },
        {
          id: 'mark_junk',
          label: '🗑️ Mark spam, bỏ qua',
          effects: [
            { stat: 'stress', value: -5 },
          ],
          feedMessage: 'Mark junk. CRM clean hơn. Cảm giác tốt. 🧹',
        },
        {
          id: 'report_source',
          label: '📊 Báo cáo nguồn lead tệ',
          effects: [
            { stat: 'energy', value: -10 },
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
            { stat: 'stress', value: +20 },
            { stat: 'energy', value: -10 },
            { stat: 'salary', value: -100000 },
          ],
          feedMessage: '"Chưa có ạ." Sếp thở dài dài. Im lặng 5 giây. "Em cần hỗ trợ gì không?" 😰',
        },
        {
          id: 'show_pipeline',
          label: '📋 Show pipeline tiềm năng',
          effects: [
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Bạn show 5 lead đang nurture. Sếp gật đầu. "Em theo dõi sát nha." Được rồi. 📊',
        },
        {
          id: 'blame_market',
          label: '📉 "Thị trường đang khó ạ"',
          effects: [
            { stat: 'stress', value: -5 },
            { stat: 'salary', value: -150000 },
          ],
          feedMessage: 'Sếp: "Thị trường khó nhưng anh Hùng vẫn chốt 3 deal đó em." 💀',
        },
      ],
    },
    {
      id: 'seo_price_negotiation',
      title: 'Khách trả giá thấp hơn 30%',
      description: '"Anh chỉ có ngần đó thôi em." Căn hộ 3 tỷ, anh offer 2.1 tỷ.',
      priority: 'high',
      professions: ['seo_bds'],
      actions: [
        {
          id: 'hold_price',
          label: '💪 Giữ giá',
          effects: [
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn giữ giá. Khách suy nghĩ. 2 ngày sau khách đồng ý. Kiên nhẫn thắng. 💪',
        },
        {
          id: 'negotiate_middle',
          label: '🤝 Đề xuất giá trung gian',
          effects: [
            { stat: 'stress', value: -5 },
          ],
          feedMessage: 'Deal thành công. Cả hai bên happy. Hoa hồng về tài khoản. 🎉',
        },
        {
          id: 'lose_deal',
          label: '🚶 Để khách đi',
          effects: [
            { stat: 'stress', value: -5 },
            { stat: 'energy', value: +5 },
          ],
          feedMessage: 'Khách đi. 3 ngày sau khách quay lại. Giá cũ. Đôi khi buông bỏ là đúng. 🧘',
        },
      ],
    },
    {
      id: 'seo_site_visit',
      title: 'Khách muốn xem nhà lúc 7am',
      description: '"Em ơi anh chỉ rảnh sáng sớm thôi." 7am. Thứ Bảy. Cách nhà bạn 20km.',
      priority: 'medium',
      professions: ['seo_bds'],
      actions: [
        {
          id: 'agree_7am',
          label: '😴 OK anh, em có mặt',
          effects: [
            { stat: 'energy', value: -25 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Bạn có mặt lúc 6:55am. Khách đến lúc 7:35am. "Anh bị kẹt xe." Tất nhiên rồi. ☕',
        },
        {
          id: 'negotiate_time',
          label: '⏰ Đề xuất 9am',
          effects: [
            { stat: 'stress', value: -5 },
            { stat: 'energy', value: -10 },
          ],
          feedMessage: 'Khách đồng ý 9am. Mọi thứ diễn ra bình thường. Nhà khách thích. Đang xem xét. 🏠',
        },
        {
          id: 'send_colleague',
          label: '👥 Nhờ đồng nghiệp đi thay',
          effects: [
            { stat: 'energy', value: +10 },
            { stat: 'salary', value: -100000 },
          ],
          feedMessage: 'Đồng nghiệp đi thay. Khách hỏi bạn đâu. Awkward. Nhưng bạn đã ngủ đủ giấc. 😴',
        },
      ],
    },
    {
      id: 'seo_competitor',
      title: 'Khách đang xem nhà với agency khác',
      description: 'Khách vừa mention họ đang compare với "bên kia có giá tốt hơn."',
      priority: 'high',
      professions: ['seo_bds'],
      actions: [
        {
          id: 'highlight_value',
          label: '💎 Nhấn mạnh giá trị',
          effects: [
            { stat: 'energy', value: -10 },
          ],
          feedMessage: 'Bạn so sánh chi tiết. Khách chọn bạn. Giá không phải tất cả. 💎',
        },
        {
          id: 'lower_price',
          label: '💰 Đề xuất giảm giá',
          effects: [
            { stat: 'stress', value: +5 },
            { stat: 'salary', value: -200000 },
          ],
          feedMessage: 'Giảm 5%. Khách chốt. Hoa hồng ít hơn. Nhưng có còn hơn không. 🤷',
        },
        {
          id: 'let_go',
          label: '🙏 Chúc khách may mắn',
          effects: [
            { stat: 'stress', value: -15 },
          ],
          feedMessage: '"Chúc anh chị tìm được nhà ưng ý." 1 tuần sau khách giới thiệu bạn cho người quen. 🌟',
        },
      ],
    },
    {
      id: 'seo_legal_issue',
      title: 'Sổ đỏ của căn nhà đang thế chấp ngân hàng',
      description: 'Khách sắp đặt cọc. Bạn vừa phát hiện sổ đỏ đang thế chấp.',
      priority: 'critical',
      professions: ['seo_bds'],
      actions: [
        {
          id: 'tell_client',
          label: '💯 Nói thật với khách',
          effects: [
            { stat: 'stress', value: +5 },
            { stat: 'salary', value: -200000 },
          ],
          feedMessage: 'Bạn nói thật. Khách cảm ơn. Deal hoãn lại. Khách tin tưởng bạn dài hạn. 🤝',
        },
        {
          id: 'hide_info',
          label: '🤐 Kệ, cứ ký hợp đồng',
          effects: [
            { stat: 'stress', value: +30 },
            { stat: 'salary', value: -500000 },
          ],
          chainEvents: [{ eventId: 'seo_legal_issue', delay: 5000 }],
          feedMessage: 'Hợp đồng ký. 2 tuần sau khách phát hiện. Luật sư vào cuộc. 💀',
        },
        {
          id: 'check_with_owner',
          label: '📞 Hỏi thẳng chủ nhà',
          effects: [
            { stat: 'energy', value: -10 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Chủ nhà confirm sắp tất toán. Deal hoãn 2 tuần. Mọi thứ OK. ✅',
        },
      ],
    },
    {
      id: 'seo_social_media',
      title: 'Sếp bắt đăng 5 bài Facebook/ngày',
      description: '"Phải đẩy mạnh digital marketing." Bạn không biết viết content.',
      priority: 'medium',
      professions: ['seo_bds'],
      actions: [
        {
          id: 'write_quality',
          label: '✍️ Viết content chất lượng',
          effects: [
            { stat: 'energy', value: -20 },
          ],
          feedMessage: 'Bài viết viral nhẹ. 47 share. 3 lead mới. 📱',
        },
        {
          id: 'copy_paste',
          label: '📋 Copy từ Google',
          effects: [
            { stat: 'stress', value: -5 },
            { stat: 'salary', value: -50000 },
          ],
          feedMessage: 'Copy paste xong. 5 bài đăng. 0 reach. Thuật toán biết hết. 📉',
        },
        {
          id: 'use_ai',
          label: '🤖 Dùng ChatGPT viết',
          effects: [
            { stat: 'energy', value: -5 },
          ],
          feedMessage: 'AI viết, bạn edit nhẹ. 1 lead hỏi thêm thông tin. Tạm được. 🤖',
        },
      ],
    },
    {
      id: 'seo_market_down',
      title: 'Thị trường BĐS đóng băng tháng này',
      description: 'Tin tức trên báo. Khách hàng lo ngại. Quota vẫn giữ nguyên.',
      priority: 'critical',
      professions: ['seo_bds'],
      actions: [
        {
          id: 'pivot_rental',
          label: '🔄 Chuyển sang cho thuê',
          effects: [
            { stat: 'stress', value: -10 },
          ],
          feedMessage: '3 hợp đồng cho thuê tháng này. Ít hơn mua bán nhưng ổn định. 🏠',
        },
        {
          id: 'nurture_leads',
          label: '📱 Nurture lead cũ',
          effects: [
            { stat: 'energy', value: -10 },
          ],
          feedMessage: 'Gọi lại 20 lead cũ. 2 người ready. Thị trường khó nhưng vẫn có người cần nhà. 📞',
        },
        {
          id: 'complain',
          label: '😤 Kêu ca với đồng nghiệp',
          effects: [
            { stat: 'stress', value: -5 },
            { stat: 'energy', value: -5 },
            { stat: 'salary', value: -100000 },
          ],
          feedMessage: 'Kêu ca 30 phút. Đồng cảm. Thị trường vẫn đóng băng. Không thay đổi gì. 🤷',
        },
      ],
    },
    {
      id: 'seo_referral',
      title: 'Khách cũ giới thiệu khách mới!',
      description: '"Em ơi, anh giới thiệu bạn anh cần mua nhà." Cơ hội vàng.',
      priority: 'low',
      professions: ['seo_bds'],
      actions: [
        {
          id: 'call_immediately',
          label: '📞 Gọi ngay',
          effects: [
            { stat: 'energy', value: -5 },
          ],
          feedMessage: 'Gọi ngay. Tư vấn 45 phút. Hẹn xem nhà cuối tuần. Referral là gold. 🌟',
        },
        {
          id: 'schedule_later',
          label: '📅 Hẹn gặp hôm sau',
          effects: [
            { stat: 'stress', value: -5 },
          ],
          feedMessage: 'Hẹn hôm sau. Deal diễn ra bình thường sau 1 tuần. 👍',
        },
        {
          id: 'thank_referrer',
          label: '🎁 Cảm ơn khách cũ trước',
          effects: [
            { stat: 'energy', value: -5 },
          ],
          feedMessage: 'Gửi hoa quả cảm ơn. Khách mới ấn tượng. Chốt deal. Referral thứ 2 đang đến. 🎁',
        },
      ],
    },
    {
      id: 'seo_quota_end_month',
      title: 'Cuối tháng, quota còn thiếu 1 deal',
      description: '3 ngày nữa hết tháng. Bonus đang chờ. Áp lực đỉnh điểm.',
      priority: 'critical',
      professions: ['seo_bds'],
      timeSlots: ['afternoon', 'end_of_day'],
      actions: [
        {
          id: 'push_all_leads',
          label: '⚡ Push tất cả lead đang có',
          effects: [
            { stat: 'energy', value: -30 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Gọi 15 người trong 3 tiếng. 1 người chốt. Quota đạt. Bonus vào túi. 💰',
        },
        {
          id: 'accept_miss',
          label: '😔 Chấp nhận miss quota',
          effects: [
            { stat: 'stress', value: -20 },
            { stat: 'salary', value: -500000 },
          ],
          feedMessage: 'Miss quota. Không có bonus. Nhưng bạn còn năng lượng cho tháng sau. 🧘',
        },
        {
          id: 'ask_for_help',
          label: '🤝 Nhờ đồng nghiệp chia lead',
          effects: [
            { stat: 'stress', value: -5 },
            { stat: 'salary', value: -150000 },
          ],
          feedMessage: 'Đồng nghiệp chia lead. Split commission. Đủ quota. 🤝',
        },
      ],
    },
  ],
}

export default seoBdsPack
