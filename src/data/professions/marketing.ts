// src/data/professions/marketing.ts
import type { ProfessionPack } from '../../types/game.types'

export const marketingPack: ProfessionPack = {
  config: {
    id: 'marketing',
    name: 'Marketing',
    emoji: '📣',
    tagline: 'Kinh phí tiền tỷ, KPI vô biên. Làm màu là phụ, cúng tiền chạy ads cho Mark Zuckerberg là chính.',
    difficulty: 'Trung bình',
    enemy: 'Thuật toán Facebook thay đổi, sếp đòi viral 0 đồng, KPI lead rác từ sales chửi bới',
    startingStats: {
      stress: 20,
      energy: 85,
      salary: 500000,
    },
    dailySalary: 450000,
  },
  buffs: [
    {
      id: 'bm_agency_voi',
      name: 'Tài khoản BM Agency Voi Cổ',
      description: 'Tài khoản Business Manager cổ của đại lý lớn. Miễn nhiễm với các đợt quét bão quét tài khoản quảng cáo của Facebook.',
      cost: 450000,
      icon: '🐘',
      chatReplies: [
        {
          "senderId": "mkt",
          "message": "Lên camp bằng BM Agency Voi Cổ bao mượt, chấp cả bão quét tài khoản của anh Mark xoăn luôn! 🐘🔥"
        },
        {
          "senderId": "sep",
          "message": "Ads chạy trơn tru thế này sếp Messi nhìn bảng dashboard duyệt ngân sách sướng tê người 🐐"
        }
      ],
      duration: 'permanent',
      effects: [
        { stat: 'stress', value: -15 },
        { stat: 'energy', value: 10 },
      ],
    },
    {
      id: 'tra_sua_full_topping',
      name: 'Trà sữa Matcha 3 tầng Full Topping XL',
      description: 'Liều thuốc giảm stress tức thì của dân marketer. Lượng đường cực cao giúp bơm máu lên não nghĩ kịch bản viral.',
      cost: 150000,
      icon: '🧋',
      chatReplies: [
        {
          "senderId": "mkt",
          "message": "Bơm ngay ly trà sữa full topping size XL ngập đường, đầu óc nảy số ý tưởng vù vù 🧋📈"
        },
        {
          "senderId": "intern",
          "message": "Huhu cho em xin ké một hớp trân châu đen dai giòn sần sật với chị ơi 🥺"
        }
      ],
      duration: 'timeslot',
      effects: [
        { stat: 'energy', value: 30 },
        { stat: 'stress', value: -20 },
      ],
    },
    {
      id: 'kich_ban_seeding_drama',
      name: 'Kịch bản Seeding Drama Triệu View',
      description: 'Tập tài liệu seeding định cao tạo scandal giả thu hút dư luận tò mò. Đảm bảo viral mà không tốn xu ads nào.',
      cost: 250000,
      icon: '🎭',
      chatReplies: [
        {
          "senderId": "mkt",
          "message": "Tung kịch bản drama gây tò mò kích thích dư luận, viral tự nhiên không tốn 1 đồng xu ads 🎭🔥"
        },
        {
          "senderId": "sales",
          "message": "Drama này làm hotline sales nổ chuông liên tục, chốt đơn mỏi cả tay luôn đại ca ơi! 🍻"
        }
      ],
      duration: 'day',
      effects: [
        { stat: 'stress', value: -10 },
        { stat: 'energy', value: 15 },
      ],
    },
    {
      id: 'freepik_premium_key',
      name: 'Tài khoản Premium Freepik & Shutterstock',
      description: 'Tải tài nguyên thiết kế không giới hạn. Tiết kiệm 3 tiếng đồng hồ đi tìm ảnh stock miễn phí hoặc xóa watermark.',
      cost: 250000,
      icon: '🔑',
      chatReplies: [
        {
          "senderId": "mkt",
          "message": "Có acc Premium Freepik kéo ảnh vector mượt mà đỡ tốn thời gian đi xóa logo Shutterstock phèn chúa 🔑🎨"
        },
        {
          "senderId": "design",
          "message": "Ui đại gia marketing mua acc xịn thế, cho Designer tụi em dùng chung với nha yêu thế 👨‍🎨"
        }
      ],
      duration: 'permanent',
      effects: [
        { stat: 'stress', value: -10 },
        { stat: 'energy', value: 10 },
      ],
    },
  ],
  events: [
    {
      id: 'mkt_fb_die_ad',
      title: 'Tài khoản quảng cáo Facebook Ads bị khóa vô cớ 💀',
      description: 'Sáng ra mở máy thấy bảng điều khiển Ads Manager hiện dòng chữ đỏ chót: "Tài khoản của bạn bị hạn chế quảng cáo do vi phạm chính sách". Toàn bộ chiến dịch đang chạy bị dừng đột ngột.',
      priority: 'critical',
      professions: ['marketing'],
      actions: [
        {
          id: 'appeal_wait',
          label: '✍️ Gửi kháng nghị kèm CCCD chụp nghiêng và chờ đợi',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn gửi ảnh CCCD kháng nghị lên đội ngũ hỗ trợ của Facebook. Bạn phải ngồi đợi trong vô vọng khi chiến dịch bị đóng băng. 😮‍💨',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Gửi kháng nghị chụp CCCD nghiêng 45 độ chờ anh Mark duyệt mệt mỏi vcl m ơi 😮‍💨"
            },
            {
              "senderId": "sep",
              "message": "Không chạy ads được là rớt lead quý này, sếp đứng ngồi không yên rồi đấy 🐐🚨"
            }
          ]
        },
        {
          id: 'rent_agency_camp',
          label: '🐘 Thuê tài khoản lách bão của Agency (Tốn chi phí)',
          effects: [
            { stat: 'energy', value: -5 },
            { stat: 'stress', value: -10 },
            { stat: 'salary', value: -150000 },
          ],
          feedMessage: 'Bạn chi 150k điểm lương thuê tài khoản Agency lách bão. Chiến dịch được set lại và hoạt động trơn tru ngay sau 30 phút. 😎',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Thuê tài khoản Agency lách bão chạy lại ads mượt mà chỉ sau 30 phút, tiền đi trước là tiền khôn 🐘🔥"
            },
            {
              "senderId": "sales",
              "message": "Đúng là đại gia marketing, chốt lead về đều đều sales cảm ơn nha cưng 🍻"
            }
          ]
        },
      ],
    },
    {
      id: 'mkt_viral_0_dong',
      title: 'Sếp bắt lên kịch bản TikTok viral 0 đồng đạt triệu view 📉',
      description: 'Sếp gọi bạn vào họp: "Bên mình không có ngân sách truyền thông nhưng anh muốn có video TikTok đạt triệu view, mang tính giáo dục sâu sắc mà vẫn hài hước viral nhé em."',
      priority: 'high',
      professions: ['marketing'],
      actions: [
        {
          id: 'overact_drama',
          label: '🎭 Lên kịch bản drama giật gân, chủ tịch giả nghèo và cái kết',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn thức đêm viết kịch bản "Chủ tịch giả làm bảo vệ thử lòng nhân viên". Video lên xu hướng đạt 1.5 triệu view, sếp cười hỷ hả khen bạn tài ba. 🎭',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Lên kịch bản drama chủ tịch giả nghèo đạt 1.5 triệu view, đúng gu dân mạng VN luôn 😂🔥"
            },
            {
              "senderId": "sep",
              "message": "Video viral triệu view 0 đồng đỉnh chóp, sếp Messi duyệt thưởng nóng cuối tháng nhé! 🐐🏆"
            }
          ]
        },
        {
          id: 'dance_trend',
          label: '💃 Bắt chước điệu nhảy hot trend Tik Tok uốn éo',
          effects: [
            { stat: 'energy', value: -10 },
            { stat: 'stress', value: +20 },
          ],
          feedMessage: 'Bạn kéo các bạn intern ra uốn éo nhảy theo trend. Video chỉ đạt 200 lượt xem, còn bị đồng nghiệp cũ phát hiện vào trêu chọc làm bạn quê độ đỏ mặt. 😭',
          chatReplies: [
            {
              "senderId": "intern",
              "message": "Uốn éo nhảy trend TikTok mỏi rã rời đạt 200 view, quê độ vcl anh chị ơi 😂"
            },
            {
              "senderId": "design",
              "message": "Đm thấy video nhảy nhảy trên Tik Tok phèn chúa luôn m ơi, đồng nghiệp cũ thả haha đầy kìa 💅"
            }
          ]
        },
      ],
    },
    {
      id: 'mkt_lead_trash',
      title: 'Data lead mang về toàn số rác, Sales chửi bới ầm ĩ 🤬',
      description: 'Bạn chạy ads mang về 200 lead số điện thoại. Tuy nhiên đội Sales phản ánh là gọi điện toàn thuê bao, số ảo, hoặc người ta bảo nhầm máy. Trưởng phòng Sales nhắn tin chửi bới bạn lãng phí ngân sách.',
      priority: 'high',
      professions: ['marketing'],
      actions: [
        {
          id: 'optimize_targeting',
          label: '🔍 Rà soát target, chỉnh sửa lại phễu lọc khách hàng',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn cặm cụi xem lại target nhóm đối tượng, loại bỏ các tệp rác. Chất lượng lead sau đó tăng rõ rệt, Sales im lặng làm việc. 📈',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Chỉnh lại phễu lọc khách hàng loại bỏ tệp rác, lead chất lượng hẳn sales hết càm ràm 📈"
            },
            {
              "senderId": "sales",
              "message": "Lead đợt này chất lượng gọi chốt mỏi tay, cảm ơn anh em marketing tinh tế 🍻"
            }
          ]
        },
        {
          id: 'fight_sales',
          label: '🗣️ Cãi tay đôi: "Do kỹ năng chốt sales của các anh quá kém!"',
          effects: [
            { stat: 'stress', value: +25 },
            { stat: 'energy', value: -10 },
          ],
          feedMessage: 'Bạn cãi nhau nảy lửa với Sales trên group chat chung. Bầu không khí công ty căng thẳng tột độ. Sếp tổng can ngăn và phạt cả hai bên vì gây mất đoàn kết nội bộ. 💀',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Kêu kỹ năng sales kém à? Chạy ads toàn lead rác người già trẻ em gọi chốt bằng niềm tin à? 🤬"
            },
            {
              "senderId": "hr",
              "message": "Cãi nhau ầm ĩ group chung làm sếp cọc lôi ra phạt hết chuyên cần rồi kìa, thôi nhịn đi m 🎸"
            }
          ]
        },
      ],
    },
    {
      id: 'mkt_typo_banner',
      title: 'Banner sự kiện lớn in sai lỗi chính tả nghiêm trọng 😱',
      description: 'Sự kiện ra mắt sản phẩm mới có sự tham gia của 200 đối tác lớn chuẩn bị bắt đầu. Bạn bàng hoàng phát hiện banner Backdrop chính in sai chữ "Chuyên nghiệp" thành "Chuyên nghiệt".',
      priority: 'critical',
      professions: ['marketing'],
      actions: [
        {
          id: 'quick_patch',
          label: '🩹 Dán đè sticker chữ sửa lỗi (Chữa cháy nhanh)',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn nhanh trí cho in decal chữ "ệp" rồi dán khéo đè lên chữ "ệt". Khách mời không ai phát hiện ra. Một cú thoát hiểm hú vía! 😮‍âm',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Dán decal chữ ệp đè chữ ệt chữa cháy nhanh gọn lẹ, hú vía cmnl 😮‍💨"
            },
            {
              "senderId": "design",
              "message": "Trời ơi in ấn sai sót may dán đè sticker kịp, Designer hú hồn chim én luôn á 👨‍🎨"
            }
          ]
        },
        {
          id: 'reprint_express',
          label: '🖨️ Yêu cầu nhà in in gấp giao siêu tốc (Tốn phí lớn)',
          effects: [
            { stat: 'energy', value: -10 },
            { stat: 'salary', value: -200000 },
          ],
          feedMessage: 'Bạn chi 200k điểm lương yêu cầu nhà in giao hỏa tốc banner mới trong 45 phút. Banner hoàn hảo được căng lên kịp lúc đón khách. Sếp khen bạn xử lý khủng hoảng chuyên nghiệp. 👑',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Chi 200k in hỏa tốc banner mới giao siêu tốc kịp đón khách VIP, chuẩn chỉ đẳng cấp! 🖨️👑"
            },
            {
              "senderId": "sep",
              "message": "Xử lý khủng hoảng chuyên nghiệp sếp Messi duyệt ngay không tiếc lời khen ngợi 🐐🏆"
            }
          ]
        },
      ],
    },
    {
      id: 'mkt_kols_drama',
      title: 'KOL đại diện thương hiệu dính phốt đạo lý chấn động 🚨',
      description: 'KOL chính của chiến dịch trị giá hàng trăm triệu vừa bị phanh phui phốt "ngoại tình giật chồng" và "nói đạo lý gia tạo" trên MXH. Cộng đồng mạng đang tràn vào fanpage công ty đòi tẩy chay sản phẩm.',
      priority: 'critical',
      professions: ['marketing'],
      actions: [
        {
          id: 'terminate_contract',
          label: '⚖️ Đơn phương chấm dứt hợp đồng, phát thông cáo xin lỗi',
          effects: [
            { stat: 'energy', value: -25 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn nhanh chóng soạn thông cáo báo chí đơn phương hủy hợp đồng với KOL dính phốt và xin lỗi khách hàng. Khủng hoảng lắng xuống, dư luận khen ngợi phản ứng nhanh nhạy của thương hiệu. 💪',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Đơn phương hủy hợp đồng KOL dính phốt, đăng thông cáo xin lỗi xoa dịu dư luận kịp thời! 💪"
            },
            {
              "senderId": "legal",
              "message": "Pháp chế vào cuộc hỗ trợ giấy tờ hủy hợp đồng phạt đền bù chuẩn chỉnh nha cưng ⚖️"
            }
          ]
        },
        {
          id: 'ignore_drama',
          label: '🤐 Khóa bình luận fanpage, âm thầm đợi bão drama qua đi',
          effects: [
            { stat: 'stress', value: +30 },
            { stat: 'salary', value: -150000 },
          ],
          feedMessage: 'Bạn chọn cách im lặng và khóa bình luận page. Khách hàng phẫn nộ đánh giá 1 sao fanpage và rớt mạnh doanh thu tuần này. Bạn bị trừ lương vì phản ứng chậm chạp. 💀',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Page bị vote 1 sao rớt doanh thu sếp Messi điên máu cọc cằn cả ngày hôm nay rồi đấy 🐐🚨"
            },
            {
              "senderId": "mkt",
              "message": "Im lặng khóa comment đợi bão qua đi cơ mà bị trừ mất 150k điểm lương xót ví quá 😭"
            }
          ]
        },
      ],
    },
    {
      id: 'mkt_budget_burn',
      title: 'Lỡ tay setup ngân sách ngày thành ngân sách trọn đời 💸',
      description: 'Lúc 11h đêm, do buồn ngủ, bạn setup ngân sách quảng cáo 5 triệu/ngày thành 50 triệu trọn đời. Sáng hôm sau mở máy thấy tài khoản đã cắn sạch 50 triệu chỉ trong một đêm mà không ra được lead nào.',
      priority: 'critical',
      professions: ['marketing'],
      actions: [
        {
          id: 'cook_reports',
          label: '✍️ "Xào nấu" báo cáo, đổ lỗi cho thuật toán phân phối lỗi',
          effects: [
            { stat: 'stress', value: +20 },
            { stat: 'energy', value: -10 },
          ],
          setFlags: { mkt_hidden_error: true },
          feedMessage: 'Bạn viết giải trình đổ lỗi cho Facebook phân phối bất thường "phá thuật toán". Sếp tin tưởng ký duyệt, nhưng bạn luôn lo sợ phòng kế toán rà soát hóa đơn thẻ ngân hàng. 🤫',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Xào nấu báo cáo đổ lỗi cho thuật toán FB lỗi, trót lọt qua ải sếp cơ mà lo run rẩy 🤫"
            },
            {
              "senderId": "accounting",
              "message": "Ủa thẻ cắn 50 triệu hóa đơn lạ nha, kế toán chuẩn bị rà soát kỹ đối chiếu sổ sách đó m ơi ⚖️"
            }
          ]
        },
        {
          id: 'confess_mistake',
          label: '😔 Tự thú nhận sai sót với sếp và cam kết khắc phục',
          effects: [
            { stat: 'stress', value: +25 },
            { stat: 'salary', value: -250000 },
          ],
          feedMessage: 'Bạn dũng cảm nhận lỗi. Sếp mắng bạn một trận tơi bời và phạt trừ 250k điểm lương, nhưng khen ngợi tính trung thực của bạn và cho cơ hội làm lại. 😮‍💨',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Dũng cảm nhận lỗi bị sếp mắng tơi bời phạt 250k lương, xót xa cơ mà nhẹ lòng 😮‍💨"
            },
            {
              "senderId": "sep",
              "message": "Trung thực nhận lỗi sếp Messi phạt nhẹ răn đe thôi, lần sau phải kiểm tra kỹ nút ngân sách nhé 🐐"
            }
          ]
        },
      ],
    },
    {
      id: 'mkt_competitor_copy',
      title: 'Đối thủ copy y hệt content campaign rồi chạy ads đè lên 🤺',
      description: 'Bạn vừa lên một bài viết content góc nhìn độc lạ thu hút lượng tương tác cực lớn. Chỉ sau 2 tiếng, đối thủ trực tiếp copy y nguyên chữ và ảnh, chạy ads ngân sách lớn hơn đè trực tiếp lên fanpage của bạn.',
      priority: 'medium',
      professions: ['marketing'],
      actions: [
        {
          id: 'report_copyright',
          label: '⚖️ Báo cáo bản quyền Facebook và đăng bài bóc phốt đối thủ',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn gửi report lên FB và đăng bài bóc phốt đối thủ đạo nhái. Cộng đồng mạng vào ủng hộ nhiệt tình, bài post bóc phốt của bạn lại đạt thêm triệu view tự nhiên. 📈',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Đăng bài bóc phốt đối thủ đạo nhái được dân mạng ủng hộ đạt triệu view tự nhiên, slay! 💅🔥"
            },
            {
              "senderId": "design",
              "message": "Haha bài bóc phốt hot rần rần luôn, đối thủ nhục nhã phải gỡ bài rồi kìa m ơi 😂"
            }
          ]
        },
        {
          id: 'write_better_content',
          label: '✍️ Bỏ qua, lập tức viết bài content mới đỉnh cao hơn nữa',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: -5 },
          ],
          feedMessage: 'Bạn coi đó là sự thừa nhận tài năng. Bạn viết ngay bài viết mới sáng tạo hơn hẳn khiến đối thủ hít khói không thể sao chép kịp. Sếp đánh giá cao phong thái đỉnh cao của bạn. 😎',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Viết ngay bài mới đỉnh cao hơn hẳn cho đối thủ hít khói, phong thái đỉnh cao tự tin 😎"
            },
            {
              "senderId": "pm",
              "message": "Đúng là cây viết vàng của làng marketing, đẳng cấp sáng tạo vcl cưng ơi 🌸"
            }
          ]
        },
      ],
    },
    {
      id: 'mkt_trend_hijack',
      title: 'Bắt trend muộn bị cộng đồng mạng chê phèn nhạt nhẽo 🤢',
      description: 'Một trào lưu hài hước đang cực hot trên MXH. Sếp ép bạn phải bắt trend ngay cho sản phẩm. Bạn vội vàng thiết kế ảnh bắt trend đăng lên fanpage.',
      priority: 'low',
      professions: ['marketing'],
      actions: [
        {
          id: 'remove_post',
          label: '🗑️ Gỡ bài ngay lập tức để tránh ảnh hưởng thương hiệu',
          effects: [
            { stat: 'energy', value: -10 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Nhận thấy phản ứng tiêu cực từ bình luận chê phèn, nhạt nhẽo, bạn gỡ bài chỉ sau 10 phút. Thiệt hại được hạn chế tối đa. 😮‍💨',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Thấy bình luận chê phèn là gỡ bài ngay sau 10 phút, né gạch đá kịp lúc 😮‍💨"
            },
            {
              "senderId": "intern",
              "message": "Huhu trend qua từ tuần trước sếp bắt làm may gỡ nhanh không ăn gạch đủ xây nhà 😂"
            }
          ]
        },
        {
          id: 'turn_into_self_deprecation',
          label: '🤡 Tự chế giễu bản thân "Nhạt nhẽo bắt trend muộn"',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: -10 },
          ],
          feedMessage: 'Bạn ghim bình luận tự giễu: "Kế hoạch bắt trend tuần trước nhưng nay admin mới duyệt bài". Dân mạng thích thú trước sự tự hủy đáng yêu này và thả tim rần rần. 🤡',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Ghim cmt tự giễu bắt trend muộn admin duyệt trễ, dân mạng lại thả tim khen đáng yêu 😂🤡"
            },
            {
              "senderId": "hr",
              "message": "Xử lý truyền thông tự hủy đáng yêu thế này làm sếp cũng bật cười khen tinh tế đó m 🎸"
            }
          ]
        },
      ],
    },
    {
      id: 'mkt_audit_report',
      title: 'Sếp bắt làm báo cáo nghiệm thu ROI chiến dịch cuối tháng 📊',
      description: 'Sếp tổng yêu cầu bạn trình bày báo cáo chi tiết về hiệu quả sử dụng 100 triệu ngân sách quảng cáo tháng này: "Chứng minh cho anh xem từng đồng chi tiêu mang lại bao nhiêu doanh thu nhé em."',
      priority: 'high',
      professions: ['marketing'],
      actions: [
        {
          id: 'crunch_numbers',
          label: '📊 Ngồi cày số liệu Google Analytics, lập biểu đồ chuẩn chỉ',
          effects: [
            { stat: 'energy', value: -25 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn thức đêm gom số liệu từ GA4, Ads Manager dựng biểu đồ ROI tăng trưởng rõ rệt. Sếp gật gù khen bạn làm việc khoa học, tăng duyệt ngân sách tháng sau lên 150 triệu. 📈',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Thức đêm gom data dựng slide ROI tăng trưởng khoa học, sếp tăng ngân sách tháng sau luôn! 📈🔥"
            },
            {
              "senderId": "sep",
              "message": "Báo cáo rõ ràng rành mạch thế này sếp Messi cực kỳ an tâm duyệt tiền chạy ads tiếp nhé 🐐"
            }
          ]
        },
        {
          id: 'fake_roi',
          label: '🩹 Bốc thuốc phóng đại số lượng tiếp cận (Reach) cho lung linh',
          effects: [
            { stat: 'energy', value: -5 },
            { stat: 'stress', value: -10 },
          ],
          setFlags: { fake_report_made: true },
          feedMessage: 'Bạn bốc thuốc làm đẹp số Reach, Impression hàng triệu lượt để che lấp lượng chuyển đổi đơn hàng lẹt đẹt. Báo cáo nhìn siêu lộng lẫy nhưng trống rỗng thực tế. 🤫',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Bốc thuốc số Reach, Impression triệu lượt nhìn lung linh lừa sếp qua ải nhanh gọn lẹ 🤫"
            },
            {
              "senderId": "accounting",
              "message": "Ủa Reach triệu lượt mà doanh thu khớp tài khoản ngân hàng lẹt đẹt thế m, coi chừng sếp rà soát sau nha ⚖️"
            }
          ]
        },
      ],
    },
    {
      id: 'mkt_intern_spill',
      title: 'Intern lỡ tay đăng ảnh dìm hàng sếp tổng lên Fanpage triệu view 😱',
      description: 'Cậu intern marketing nhầm lẫn giữa tài khoản cá nhân và trang fanpage công ty, lỡ tay đăng bức ảnh sếp tổng đang gặm đùi gà ngủ gật hớ hênh kèm caption bựa bỉ.',
      priority: 'critical',
      professions: ['marketing'],
      actions: [
        {
          id: 'intern_fired',
          label: '🙅 Sa thải intern lập tức để làm gương và gỡ bài',
          effects: [
            { stat: 'energy', value: -10 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn lập tức gỡ ảnh sau 2 phút và làm thủ tục chấm dứt hợp đồng với intern. Sự việc được dập tắt nhanh chóng nhưng khiến bạn mang tiếng ác độc với đội ngũ. 😭',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Gỡ bài sau 2 phút sa thải intern làm gương, dứt khoát cứu nguy page cơ mà hơi buồn 😭"
            },
            {
              "senderId": "intern",
              "message": "Huhu em lỡ tay thôi mà chị đuổi việc em tội nghiệp quá em biết đi đâu về đâu bây giờ 😭"
            }
          ]
        },
        {
          id: 'turn_into_meme',
          label: '🍗 Biến ảnh dìm thành mini-game "Đoán món sếp thích - Nhận voucher"',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: -15 },
            { stat: 'salary', value: +200000 },
          ],
          feedMessage: 'Bạn nhanh trí biến bức ảnh dìm thành mini-game vui nhộn. Sếp tổng thấy phản ứng đáng yêu của cộng đồng mạng nên vui vẻ bỏ qua lỗi, còn thưởng nóng cho bạn 200k điểm lương. 🍗👑',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Hahaha mini-game đoán món sếp thích vui vẻ đấy! Sếp Messi thưởng nóng 200k điểm lương nhé! 🐐🍗"
            },
            {
              "senderId": "mkt",
              "message": "Biến ảnh dìm thành mini-game tương tác viral cực mạnh, sếp còn thưởng tiền, đúng là đi đỉnh cao truyền thông! 👑"
            }
          ]
        },
      ],
    },
    // New Events 11-30 to match serious professions (Total 30 events)
    {
      id: 'mkt_pixel_lost',
      title: 'Hệ thống báo mất dữ liệu Pixel Facebook 3 năm tích lũy 💀',
      description: 'Mark Zuckerberg lại bão quét khiến tài khoản quảng cáo chứa Pixel doanh nghiệp của bạn bay màu hoàn toàn. 3 năm thu thập hành vi khách hàng, tệp khách cũ biến mất trong một nốt nhạc.',
      priority: 'critical',
      professions: ['marketing'],
      actions: [
        {
          id: 'rebuild_pixel',
          label: '⚙️ Tạo pixel mới, cài đặt lại tệp từ đầu (Cày cuốc)',
          effects: [
            { stat: 'energy', value: -25 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn bắt đầu thiết lập pixel mới, đi nhờ IT gắn mã tag manager lại từ đầu. Thuật toán phân phối ads chạy ngáo ngơ như người mất hồn vì thiếu dữ liệu. 😮‍💨',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Cài lại pixel mới tốn công sức vcl, quảng cáo phân phối ngáo ngơ chán chẳng buồn nói 😮‍💨"
            },
            {
              "senderId": "it_dev",
              "message": "Đã hỗ trợ gắn thẻ GTM siêu tốc rồi nha cưng, ráng cày cuốc nuôi lại pixel nhé 🖥️"
            }
          ]
        },
        {
          id: 'buy_back_account',
          label: '🐘 Chi tiền mua VIA cổ kháng nghị giữ pixel',
          effects: [
            { stat: 'energy', value: -5 },
            { stat: 'salary', value: -200000 },
          ],
          feedMessage: 'Bạn chi 200k mua tài khoản VIA cổ kháng nghị thành công. Tài khoản quảng cáo được nhả, giữ nguyên pixel 3 năm quý giá. Cả phòng thở phào nhẹ nhõm. 😎',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Bỏ 200k mua VIA cổ kháng nghị giật lại được pixel 3 năm thành công, đỉnh chóp! 🐘🔥"
            },
            {
              "senderId": "sep",
              "message": "Giữ được pixel là cứu cánh dòng doanh thu tháng này rồi, sếp Messi rất hài lòng 🐐"
            }
          ]
        }
      ]
    },
    {
      id: 'mkt_google_ban',
      title: 'Tài khoản Google Merchant Center bị khóa vì "Thông tin sai lệch" 🚨',
      description: 'Sản phẩm chủ lực đang chạy Google Shopping Ads bỗng bị khóa sạch do Google quét lỗi "Mô tả sản phẩm quá phóng đại, không trung thực".',
      priority: 'high',
      professions: ['marketing'],
      actions: [
        {
          id: 'rewrite_gmc',
          label: '✍️ Sửa lại mô tả sản phẩm cực kỳ khiêm tốn rồi kháng nghị',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn gỡ bỏ mọi tính từ "Tốt nhất", "Số 1", sửa lại mô tả siêu mộc mạc và gửi kháng nghị. Google duyệt lại sau 3 ngày nhưng lượng click giảm hẳn do content bớt giật gân. 📈',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Sửa mô tả mộc mạc khiêm tốn gỡ chữ số 1 thế giới để Google thả acc, an toàn cơ mà bớt nhiệt 😮‍💨"
            },
            {
              "senderId": "sales",
              "message": "Hèn chi hôm nay Google Shopping Ads đứt làm sales gọi chốt thưa hẳn m ơi 😂"
            }
          ]
        },
        {
          id: 'rent_gmc_account',
          label: '💸 Đi thuê tài khoản GMC Whitelist của Agency lớn',
          effects: [
            { stat: 'energy', value: -5 },
            { stat: 'salary', value: -150000 },
            { stat: 'stress', value: -10 },
          ],
          feedMessage: 'Bạn chi 150k thuê tài khoản Whitelist của Agency để lách luật. Ads Shopping hoạt động trở lại bình thường và tiếp tục bùng nổ doanh số. 😎',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Thuê acc GMC Whitelist chạy lại vù vù, chấp cả robot quét của Google luôn 🐘📈"
            },
            {
              "senderId": "sep",
              "message": "Shopping ads hoạt động lại xuất sắc quá em yêu, sếp ting ting khao trà sữa nha 🧋"
            }
          ]
        }
      ]
    },
    {
      id: 'mkt_copywriter_rage',
      title: 'Copywriter dỗi sếp vì sửa bài 7 lần, đình công phút chót 🤐',
      description: 'Sếp bắt sửa bài đăng Mega Sale đến lần thứ 7 khiến bạn Copywriter cọc điên, tắt máy khóa Zalo bỏ về. Bài viết cần đăng gấp lúc 20h tối nay vẫn trống trơn.',
      priority: 'medium',
      professions: ['marketing'],
      actions: [
        {
          id: 'self_write',
          label: '✍️ Tự nhảy vào viết thay và tinh chỉnh kịch bản',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn tự gõ bàn phím viết content theo ý sếp. Sếp ký duyệt nhanh, nhưng bạn mệt bã người và mỏi nhừ khớp ngón tay. 😮‍💨',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Tự viết thay copywriter mệt mỏi vcl, cơ mà bài viết kịp lên sóng êm đẹp 😮‍💨"
            },
            {
              "senderId": "hr",
              "message": "Đúng là đa tài đa nghệ, marketer viết content đỉnh chóp thay luôn cưng 🎸"
            }
          ]
        },
        {
          id: 'buy_copywriter_boba',
          label: '🧋 Ting ting khao ly trà sữa dỗ dành copywriter viết tiếp',
          effects: [
            { stat: 'energy', value: -5 },
            { stat: 'salary', value: -50000 },
            { stat: 'stress', value: -10 },
          ],
          feedMessage: 'Bạn ting ting 50k điểm lương mua ly trà sữa full topping gửi qua tận nhà dỗ dành. Copywriter vui vẻ mở máy viết bài hoàn hảo gửi lại cho bạn chỉ sau 15 phút. 🤝',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Tốn 50k trà sữa làm hòa dỗ dành copywriter viết bài siêu tốc, chiến thuật đắc nhân tâm 🧋"
            },
            {
              "senderId": "design",
              "message": "Haha ly trà sữa xoa dịu quả đầu cọc cằn của copywriter đỉnh thật sự m ơi 😂"
            }
          ]
        }
      ]
    },
    {
      id: 'mkt_bad_review_spam',
      title: 'Đối thủ chạy tool spam 1000 đánh giá 1 sao fanpage 🤬',
      description: 'Fanpage công ty bỗng bị ngập trong 1000 đánh giá 1 sao ảo với nội dung bôi nhọ: "Sản phẩm hôi thối, dịch vụ lừa đảo, nhân viên thái độ giang hồ". Điểm đánh giá trang tụt thảm hại.',
      priority: 'critical',
      professions: ['marketing'],
      actions: [
        {
          id: 'lock_reviews',
          label: '🤐 Tắt tính năng đánh giá trang và kháng nghị Facebook',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn tạm thời tắt tính năng review để cắt đuôi tool spam và gửi báo cáo bản quyền lên FB. Điểm xấu được khóa lại, nhưng khách mới vào thắc mắc sao không xem được review. 😮‍💨',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Tắt đánh giá fanpage báo cáo FB chặn tool spam, giải pháp tình thế an toàn 😮‍💨"
            },
            {
              "senderId": "legal",
              "message": "Đang làm việc với luật sư thu thập chứng cứ đối thủ bôi nhọ cạnh tranh không lành mạnh đây ⚖️"
            }
          ]
        },
        {
          id: 'turn_into_marketing_hook',
          label: '🤡 Đăng bài chế ảnh hài hước biến phốt thành trò cười viral',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: -15 },
            { stat: 'salary', value: +150000 },
          ],
          feedMessage: 'Bạn đăng ảnh chụp màn hình review ảo kèm lời nhắn: "Cảm ơn đối thủ đã tài trợ 1000 bình luận giúp page tăng tương tác cực mạnh". Dân mạng thả tim rần rần, kéo nhau vào đánh giá 5 sao giải cứu công ty. 🤡🏆',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Biến 1000 review rác thành chiến dịch truyền thông giải cứu, tương tác tăng kỷ lục luôn! 🤡🔥"
            },
            {
              "senderId": "sep",
              "message": "Quá xuất sắc! Doanh số tăng vọt nhờ vụ phốt này, sếp Messi ting ting 150k thưởng nóng 🐐🏆"
            }
          ]
        }
      ]
    },
    {
      id: 'mkt_seeding_exposed',
      title: 'Kịch bản seeding drama bị bóc phốt dùng chung 1 IP 😱',
      description: 'Đội marketing lập 20 nick ảo cãi nhau tạo drama trong nhóm kín đểPR sản phẩm. Vô tình bị admin group phát hiện trùng địa chỉ IP mạng văn phòng, đăng bài bóc phốt công ty lừa dối dư luận.',
      priority: 'high',
      professions: ['marketing'],
      actions: [
        {
          id: 'admit_blunder',
          label: '🙇 Đăng bài xin lỗi chân thành, thừa nhận lỗi của đội ngũ',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn viết bài nhận lỗi do áp lực KPI của team nên làm liều. Sự chân thành giúp dư luận nguôi giận, tuy nhiên hình ảnh thương hiệu bị ảnh hưởng nhẹ. 😮‍💨',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Chân thành xin lỗi nhận trách nhiệm xoa dịu dư luận, bài học xương máu về seeding phèn 😭"
            },
            {
              "senderId": "hr",
              "message": "Lên bài xin lỗi kịp lúc tránh khủng hoảng lan rộng, ráng vượt qua nha em 🎸"
            }
          ]
        },
        {
          id: 'blame_agency_seeding',
          label: '🎭 Đổ lỗi hoàn toàn do Agency ngoài tự ý làm bậy',
          effects: [
            { stat: 'stress', value: +20 },
            { stat: 'salary', value: -100000 },
          ],
          feedMessage: 'Bạn đổ lỗi cho "bên thứ ba tự ý chạy seeding bẩn không thông qua duyệt". Dư luận bớt chửi công ty nhưng bạn bị trừ 100k điểm lương vì thiếu giám sát Agency. 💀',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Thiếu giám sát Agency ngoài để xảy ra phốt bôi nhọ, sếp Messi phạt trừ 100k răn đe 🐐"
            },
            {
              "senderId": "mkt",
              "message": "Đổ lỗi Agency thoát phốt lớn cơ mà ví tiền bị tổn thương sâu sắc quá hihi 😭"
            }
          ]
        }
      ]
    },
    {
      id: 'mkt_tiktok_shop_block',
      title: 'TikTok Shop bị khóa giỏ hàng do lỗi "Vận chuyển chậm" 💀',
      description: 'Đơn hàng nổ dồn dập sau phiên livestream của KOL khiến kho bị quá tải, đóng gói không kịp. Robot TikTok Shop tự động khóa giỏ hàng của bạn do vi phạm tỷ lệ vận chuyển trễ hạn.',
      priority: 'critical',
      professions: ['marketing'],
      actions: [
        {
          id: 'pack_overtime',
          label: '📦 Kéo toàn bộ team marketing xuống kho đóng hàng đêm (OT)',
          effects: [
            { stat: 'energy', value: -30 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn cùng các intern xuống kho dán băng keo đóng hàng thâu đêm. Toàn bộ đơn hàng được giải phóng kịp hạn, TikTok mở lại giỏ hàng ngay sau đó. 📦💪',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Đóng gói hàng thâu đêm mỏi rã vai cơ mà cứu nguy giỏ hàng TikTok Shop thành công! 📦💪"
            },
            {
              "senderId": "intern",
              "message": "Dán băng keo rộp cả tay đại ca ơi, may có pizza đêm sếp tiếp tế cứu đói 🍕"
            }
          ]
        },
        {
          id: 'hire_outsourced_ship',
          label: '💸 Chi tiền thuê đội đóng gói ngoài xử lý thần tốc',
          effects: [
            { stat: 'energy', value: -5 },
            { stat: 'salary', value: -200000 },
          ],
          feedMessage: 'Bạn chi 200k điểm lương thuê đội dịch vụ kho ngoài xử lý. Đóng gói hoàn tất trong 3 tiếng, giỏ hàng được mở lại mượt mà không tốn giọt mồ hôi nào. 😎',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Thuê đội ngoài đóng gói siêu tốc, giải quyết khủng hoảng cực nhàn nhã bằng tiền 💸"
            },
            {
              "senderId": "sep",
              "message": "Đúng là tư duy quản lý xuất sắc! Sếp Messi duyệt chi phí này ngay lập tức 🐐🏆"
            }
          ]
        }
      ]
    },
    {
      id: 'mkt_landing_page_die',
      title: 'Landing Page sập đúng ngày chạy chiến dịch Mega Sale 🚨',
      description: 'Lúc 12h trưa - giờ vàng Mega Sale mở bán, do lượng truy cập tăng vọt từ quảng cáo, máy chủ Landing Page bị quá tải và sập hoàn toàn, hiện lỗi 502 Bad Gateway.',
      priority: 'critical',
      professions: ['marketing'],
      actions: [
        {
          id: 'call_it_upgrade',
          label: '💻 Hối thúc IT Dev nâng cấp băng thông server gấp',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn liên tục gọi điện giục giã IT Dev nâng cấp máy chủ. Landing page hoạt động lại sau 45 phút, nhưng đã bỏ lỡ mất lượng lớn khách hàng giờ vàng. 😮‍💨',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "IT Dev nâng cấp băng thông xong rồi cơ mà trôi mất 45 phút vàng tiếc vcl m ơi 😭"
            },
            {
              "senderId": "it_dev",
              "message": "Huhu server gồng gánh cả vạn user sập là bình thường, đã scale up lên cấu hình max rồi nha 🖥️"
            }
          ]
        },
        {
          id: 'redirect_zalo',
          label: '💬 Chuyển hướng traffic chạy thẳng vào Chatbot Zalo',
          effects: [
            { stat: 'energy', value: -10 },
            { stat: 'stress', value: -5 },
            { stat: 'salary', value: +150000 },
          ],
          feedMessage: 'Bạn nhanh trí đổi link nút quảng cáo trỏ thẳng về Chatbot Zalo / Messenger. Khách hàng nhắn tin trực tiếp và chốt đơn ầm ầm qua chat, doanh số tăng vọt bất ngờ! 👑💸',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Chuyển hướng quảng cáo về Chatbot Zalo chốt đơn mỏi tay luôn, cú bẻ lái đi vào lòng đất! 👑💸"
            },
            {
              "senderId": "sales",
              "message": "Chatbot nổ inbox liên tục chốt đơn sướng tê người đại ca ơi, marketing quá đỉnh 🍻"
            }
          ]
        }
      ]
    },
    {
      id: 'mkt_wrong_voucher',
      title: 'Tạo nhầm voucher giảm giá 90% thay vì 9% 😱',
      description: 'Khi setup mã giảm giá Mega Sale trên website, do bất cẩn gõ thừa số 0, bạn tạo nhầm mã giảm giá 90%. Hàng trăm đơn hàng giá trị lớn bị khách giật với giá rẻ như cho chỉ sau 5 phút phát tán.',
      priority: 'critical',
      professions: ['marketing'],
      actions: [
        {
          id: 'cancel_orders',
          label: '❌ Khóa mã ngay lập tức, gọi điện xin lỗi hủy đơn',
          effects: [
            { stat: 'energy', value: -25 },
            { stat: 'stress', value: +20 },
          ],
          feedMessage: 'Bạn khóa mã lập tức và kéo các intern gọi điện năn nỉ khách hàng thông cảm hủy đơn do lỗi hệ thống. Đa số đồng ý nhưng bạn bị chửi bới mệt mỏi cả ngày. 😮‍💨',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Khóa mã gọi điện xin lỗi hủy đơn mệt mỏi bã người, tai nạn nghề nghiệp kinh hoàng 😭"
            },
            {
              "senderId": "hr",
              "message": "Huhu may phát hiện kịp chứ không đền bù đơn hàng sập tiệm cmnl m ơi 🎸"
            }
          ]
        },
        {
          id: 'accept_loss',
          label: '💸 Chấp nhận giao hàng bù lỗ để giữ uy tín thương hiệu',
          effects: [
            { stat: 'stress', value: +25 },
            { stat: 'salary', value: -300000 },
          ],
          feedMessage: 'Bạn đề xuất sếp giao hàng chịu lỗ để làm chiến dịch "Marketer hào phóng tặng quà". Thương hiệu nổi đình nổi đám vì độ uy tín, nhưng bạn bị trừ 300k điểm lương để bù đắp ngân quỹ. 💀',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Quyết định giao hàng chịu lỗ đổi lấy uy tín thương hiệu rất táo bạo! Phạt nhẹ cưng 300k răn đe nhé 🐐🏆"
            },
            {
              "senderId": "mkt",
              "message": "Được cả cõi mạng khen ngợi thương hiệu uy tín số 1 cơ mà ví tiền bay màu 300k khóc ròng 😭"
            }
          ]
        }
      ]
    },
    {
      id: 'mkt_pr_typo',
      title: 'Bài viết PR báo lớn viết sai tên Sếp Tổng thành từ nhạy cảm 😱',
      description: 'Bài viết PR chi phí 30 triệu đăng trên trang chủ báo lớn. Bạn tá hỏa phát hiện tên Sếp Tổng "Lê Minh Thành" bị gõ nhầm thành "Lê Minh Thạnh" rồi tệ hơn là "Lê Minh Thọc".',
      priority: 'critical',
      professions: ['marketing'],
      actions: [
        {
          id: 'edit_pr_fast',
          label: '📞 Gọi điện gấp cho phóng viên chỉnh sửa nội dung bài',
          effects: [
            { stat: 'energy', value: -10 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn tức tốc liên hệ phóng viên chỉnh lại tên sếp sau 5 phút. May mắn sếp tổng chưa kịp đọc bài báo. Một pha thoát hiểm hú vía! 😮‍💨',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Giục phóng viên sửa bài siêu tốc, sếp chưa kịp đọc báo, thoát nạn thần kỳ 😮‍💨"
            },
            {
              "senderId": "design",
              "message": "Ôi viết sai tên sếp thảm họa thế may sửa kịp không là ăn chửi ngập đầu luôn m ơi 😂"
            }
          ]
        },
        {
          id: 'bribe_journalist',
          label: '💸 Gửi phong bì bồi dưỡng biên tập viên sửa bài lập tức',
          effects: [
            { stat: 'energy', value: -5 },
            { stat: 'salary', value: -100000 },
          ],
          feedMessage: 'Bạn ting ting 100k điểm lương gửi biên tập viên sửa bài khẩn cấp và ẩn bài báo cũ khỏi Google tìm kiếm. Tên sếp được chuẩn hóa đẹp đẽ, sếp hài lòng khen bạn tận tâm. 👑',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Bỏ 100k nhờ BTV sửa bài chuẩn chỉ giấu nhẹm lỗi lầm, an tâm tuyệt đối 👑"
            },
            {
              "senderId": "sep",
              "message": "Bài báo PR viết hay và trang trọng lắm, sếp Messi rất tự hào nha cưng 🐐"
            }
          ]
        }
      ]
    },
    {
      id: 'mkt_newsletter_spam',
      title: 'Email marketing chúc mừng sinh nhật gửi nhầm toàn bộ data 🤢',
      description: 'Do thao tác nhầm lẫn nhóm đối tượng trên Mailchimp, bạn lỡ tay gửi email "Chúc mừng sinh nhật nhận voucher 500k" cho toàn bộ 50.000 khách hàng trong hệ thống vào... đúng ngày xá tội vong nhân.',
      priority: 'high',
      professions: ['marketing'],
      actions: [
        {
          id: 'honest_apology',
          label: '📧 Gửi ngay email đính chính xin lỗi lỗi kỹ thuật',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn nhanh chóng soạn email xin lỗi do hệ thống gặp sự cố kỹ thuật. Khách hàng thông cảm và cười xòa trước sự nhầm lẫn ngớ ngẩn này. 😮‍💨',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Gửi email xin lỗi do hệ thống ngáo ngơ, may khách hàng vui vẻ bỏ qua lỗi lầm 😮‍💨"
            },
            {
              "senderId": "hr",
              "message": "Nhầm lẫn ngớ ngẩn ghê cơ mà xử lý xin lỗi chân thành là chuẩn rồi m ơi 🎸"
            }
          ]
        },
        {
          id: 'convert_into_general_gift',
          label: '🎁 Tuyên bố tặng voucher 500k cho tất cả mọi người',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: -10 },
            { stat: 'salary', value: -200000 },
          ],
          feedMessage: 'Bạn bẻ lái tuyên bố: "Vì hôm nay là ngày đặc biệt nên tất cả mọi người đều được nhận quà sinh nhật". Sếp tổng khen ngợi ý tưởng chuyển bại thành thắng, nhưng trừ bạn 200k điểm lương vì thâm hụt ngân sách. 💸',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Ý tưởng bẻ lái làm chiến dịch tặng quà toàn dân rất thông minh! Trừ nhẹ 200k chuyên cần nhé cưng 🐐🏆"
            },
            {
              "senderId": "mkt",
              "message": "Chiến dịch tặng quà toàn dân tương tác nổ tung nóc cơ mà ví em đau đớn quá sếp ơi 😭"
            }
          ]
        }
      ]
    },
    {
      id: 'mkt_spying_leak',
      title: 'Nghi vấn rò rỉ ý tưởng campaign tuyệt mật cho đối thủ 😱',
      description: 'Concept thiết kế chiến dịch Mega Sale sắp tới của công ty bạn vừa họp xong hôm trước, hôm sau đối thủ trực tiếp đã tung teaser y hệt 99% đè lên sản phẩm của bạn.',
      priority: 'critical',
      professions: ['marketing'],
      actions: [
        {
          id: 'pivot_campaign',
          label: '🔄 Lập tức họp khẩn, thay đổi hoàn toàn concept mới',
          effects: [
            { stat: 'energy', value: -25 },
            { stat: 'stress', value: +20 },
          ],
          feedMessage: 'Bạn tổ chức họp khẩn thâu đêm nghĩ ra concept hoàn toàn mới độc lạ hơn hẳn. Đồi hỏi nỗ lực cực lớn của team nhưng giúp chiến dịch giữ tính bảo mật. 😮‍💨',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Họp khẩn nghĩ concept mới thâu đêm rã rời cơ mà bảo mật tuyệt đối, chiến đấu tiếp! 💪"
            },
            {
              "senderId": "design",
              "message": "Làm lại layout thiết kế mệt phờ râu trê luôn m ơi, ráng lên vì chiến thắng chung 😂"
            }
          ]
        },
        {
          id: 'expose_competitor_steal',
          label: '🗣️ Đăng bài tố đối thủ gián điệp, tung bằng chứng slide họp',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn đăng bài bóc phốt đối thủ ăn cắp chất xám kèm ảnh chụp slide họp đóng dấu tuyệt mật. Dân mạng phẫn nộ tẩy chay đối thủ, thương hiệu của bạn được ủng hộ nhiệt tình. 📈🔥',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Đăng bài tố đối thủ ăn cắp chất xám, bằng chứng rõ ràng làm cõi mạng phẫn nộ tẩy chay cmnl! 📈🔥"
            },
            {
              "senderId": "sep",
              "message": "Xử lý truyền thông tấn công tuyệt vời, sếp Messi duyệt ngay phần thưởng danh dự! 🐐🏆"
            }
          ]
        }
      ]
    },
    {
      id: 'mkt_kol_chao',
      title: 'KOL chảnh chó đòi nâng cấp phòng khách sạn 5 sao phút chót 🤬',
      description: 'Ngay trước giờ diễn ra sự kiện ra mắt sản phẩm mới, KOL đại diện thương hiệu dọa bùng show nếu không được nâng cấp phòng khách sạn lên hạng Suite 5 sao và xe đưa đón hạng Thương gia.',
      priority: 'high',
      professions: ['marketing'],
      actions: [
        {
          id: 'negotiate_kol',
          label: '🗣️ Đứng ra thương lượng cứng rắn, đem điều khoản phạt hợp đồng ra dọa',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn cứng rắn lôi điều khoản đền bù hợp đồng gấp 5 lần ra dọa. KOL sợ hãi xuống nước xin lỗi và lên sân khấu biểu diễn đúng giờ, cống hiến show diễn bùng nổ. 😎',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Cứng rắn đem điều khoản phạt đền bù ra dọa làm KOL cụp đuôi lên biểu diễn đúng giờ, slay! 💅"
            },
            {
              "senderId": "legal",
              "message": "Soạn hợp đồng chặt chẽ có ích ghê cưng ơi, pháp chế luôn đồng hành bảo vệ công ty ⚖️"
            }
          ]
        },
        {
          id: 'pay_upgrade_kol',
          label: '💸 Chi 100k điểm lương nâng cấp dịch vụ chiều lòng KOL',
          effects: [
            { stat: 'energy', value: -5 },
            { stat: 'salary', value: -100000 },
            { stat: 'stress', value: -10 },
          ],
          feedMessage: 'Bạn chi 100k điểm lương chiều lòng nâng cấp phòng cho KOL. Sự kiện diễn ra suôn sẻ, KOL vui vẻ đăng bài khen ngợi công ty chu đáo chuyên nghiệp. 👑',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Chi 100k nâng phòng dĩ hòa vi quý, KOL đăng bài khen ngợi công ty chu đáo chuyên nghiệp 👑"
            },
            {
              "senderId": "sep",
              "message": "Sự kiện thành công rực rỡ là tốt rồi, sếp Messi duyệt chi phí này ngay 🐐🏆"
            }
          ]
        }
      ]
    },
    {
      id: 'mkt_microsite_hack',
      title: 'Trò chơi minigame trên web bị người chơi hack lấy sạch quà 💀',
      description: 'Lỗ hổng bảo mật trong minigame "Quay số trúng iPhone 15" bị các hacker phát hiện. Họ dùng tool tự động quay trúng sạch 100 phần quà giá trị lớn chỉ trong 10 phút mở link.',
      priority: 'critical',
      professions: ['marketing'],
      actions: [
        {
          id: 'suspend_game',
          label: '❌ Tạm ngưng game lập tức, phát thông báo rà soát hệ thống',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn ngắt kết nối game lập tức, đăng bài xin lỗi và hủy bỏ các kết quả quay thưởng ảo do hack. Hacker tức tối chửi bới nhưng tài sản công ty được bảo toàn. 😮‍💨',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Tạm dừng game lọc kết quả ảo do hack, bảo vệ quỹ quà tặng thành công 😮‍💨"
            },
            {
              "senderId": "it_dev",
              "message": "Đã vá xong lỗ hổng bảo mật API rồi nha cưng, lỗi do dev sơ suất tí hihi 🖥️"
            }
          ]
        },
        {
          id: 'compensate_vouchers',
          label: '🎁 Đổi quà lớn thành voucher giảm giá cho toàn bộ người chơi',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'salary', value: -150000 },
          ],
          feedMessage: 'Bạn quyết định hủy kết quả cũ, đổi 100 chiếc iPhone thành hàng nghìn voucher giảm giá 50k tặng toàn bộ người chơi thực tế. Khách hàng hoan hỷ ủng hộ vì cách xử lý nhân văn, sếp khen ngợi. 📈',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Đổi quà iPhone thành voucher giảm giá tặng toàn dân, xử lý khủng hoảng nhân văn được khen ngợi 📈"
            },
            {
              "senderId": "sep",
              "message": "Xử lý khôn khéo biến nguy thành an xuất sắc quá cưng ơi, sếp Messi thưởng nóng! 🐐🏆"
            }
          ]
        }
      ]
    },
    {
      id: 'mkt_ugc_cringe',
      title: 'Chiến dịch UGC bị biến tướng thành trào lưu chế giễu 🤢',
      description: 'Chiến dịch khuyến khích người dùng đăng ảnh tự sướng cùng sản phẩm bị các antifan biến tướng thành trào lưu photoshop ảnh dìm bôi nhọ thương hiệu trên các group cộng đồng.',
      priority: 'high',
      professions: ['marketing'],
      actions: [
        {
          id: 'report_remove_ugc',
          label: '🗑️ Yêu cầu gỡ bỏ các ảnh bôi nhọ bản quyền sản phẩm',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn liên hệ các admin group yêu cầu gỡ bài bôi nhọ bản quyền. Trào lưu chế giễu nguội đi nhanh chóng nhưng khiến team marketing tốn nhiều công sức dọn dẹp. 😮‍💨',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Nhờ admin gỡ ảnh bôi nhọ bản quyền dọn dẹp mệt mỏi vcl m ơi 😮‍💨"
            },
            {
              "senderId": "legal",
              "message": "Gửi công văn bản quyền pháp lý yêu cầu gỡ bài xử lý cực kỳ chặt chẽ nha cưng ⚖️"
            }
          ]
        },
        {
          id: 'hijack_cringe_meme',
          label: '🤡 Tự chế ảnh dìm hài hước hơn nữa để hòa mình cùng trend',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: -10 },
            { stat: 'salary', value: +200000 },
          ],
          feedMessage: 'Marketer đỉnh cao! Bạn tự đăng bộ ảnh meme dìm sản phẩm đáng yêu cực bựa. Antifan "tắt điện" hoàn toàn vì không thể chế giễu một thương hiệu tự hủy vui nhộn như vậy. Campaign lật ngược thế cờ viral khủng khiếp! 🤡🏆',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Tự chế ảnh dìm sản phẩm siêu bựa làm antifan tắt điện cmnl, viral bung nóc nhà! 🤡🔥"
            },
            {
              "senderId": "sep",
              "message": "Marketer thiên tài! Bẻ lái trend chế giễu xuất sắc sếp Messi thưởng nóng 200k điểm lương! 🐐🏆"
            }
          ]
        }
      ]
    },
    {
      id: 'mkt_sponsorship_scam',
      title: 'Tài trợ sự kiện sinh viên bị chèn ép logo bé như hạt cát 📉',
      description: 'Công ty chi 50 triệu tài trợ kim cương cho sự kiện ca nhạc sinh viên trường đại học lớn. Khi đến nơi xem backdrop, bạn bàng hoàng thấy logo công ty bị xếp bé tí hin như hạt cát ở xó dưới góc khuất.',
      priority: 'medium',
      professions: ['marketing'],
      actions: [
        {
          id: 'force_reprint_backdrop',
          label: '🗣️ Ép ban tổ chức dán đè logo to hoặc in lại backdrop ngay',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn làm việc căng rắn, dọa rút tài trợ và phạt hợp đồng. Ban tổ chức sợ hãi phải in hỏa tốc decal logo khổng lồ dán đè lên vị trí trung tâm trang trọng nhất. 😎',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Ép BTC dán logo to oạch đè lên trung tâm backdrop, phong thái nhà tài trợ quyền lực! 😎"
            },
            {
              "senderId": "sales",
              "message": "Logo to chà bá ở trung tâm nhìn uy tín hẳn, sinh viên check in rần rần chốt lead sướng 🍻"
            }
          ]
        },
        {
          id: 'hijack_offline_activation',
          label: '🎁 Phát voucher tận tay sinh viên tại quầy booth sự kiện',
          effects: [
            { stat: 'energy', value: -25 },
            { stat: 'stress', value: -5 },
            { stat: 'salary', value: +150000 },
          ],
          feedMessage: 'Mặc kệ logo trên backdrop, bạn tổ chức minigame phát voucher tận tay 500 sinh viên tại quầy booth. Lượng sinh viên vây quanh booth đông nghịt, chiến dịch thành công rực rỡ vượt mong đợi! 📈🏆',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Tổ chức minigame phát voucher booth đông nghịt sinh viên, thu về cả rổ lead chất lượng! 🏆"
            },
            {
              "senderId": "sep",
              "message": "Quyết định chuyển hướng offline activation quá xuất sắc, sếp Messi thưởng nóng 150k! 🐐🏆"
            }
          ]
        }
      ]
    },
    {
      id: 'mkt_cpm_inflation',
      title: 'Giá thầu CPM quảng cáo tăng phi mã ngày Black Friday 💸',
      description: 'Bước vào tuần lễ Black Friday, các thương hiệu lớn vung tiền tranh giành thầu quảng cáo khiến giá thầu CPM tăng gấp 4 lần. Tài khoản ads của bạn cắn tiền nhanh như máy đốt tiền nhưng không ra lead.',
      priority: 'high',
      professions: ['marketing'],
      actions: [
        {
          id: 'slash_ad_budget',
          label: '📉 Giảm 70% ngân sách ads, tập trung seeding group miễn phí',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn cắn răng tắt bớt camp ads đắt đỏ, dồn sức viết content seeding thủ công trong các hội nhóm. Tốn nhiều công sức gõ phím cơ mà giữ được ngân sách an toàn. 😮‍💨',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Tắt ads đắt đỏ đi seeding group thủ công mệt mỏi tí cơ mà đỡ bị bão thầu đốt tiền 😮‍💨"
            },
            {
              "senderId": "accounting",
              "message": "Kế toán cảm ơn nha cưng, cắt giảm chi phí ads đúng ngày bão thầu đỡ thâm hụt quỹ ⚖️"
            }
          ]
        },
        {
          id: 'focus_retargeting',
          label: '🎯 Tắt target mới, dồn toàn lực chạy ads bám đuôi khách cũ',
          effects: [
            { stat: 'energy', value: -10 },
            { stat: 'stress', value: -5 },
            { stat: 'salary', value: +200000 },
          ],
          feedMessage: 'Quyết định thiên tài! Bạn dồn tiền chạy ads bám đuôi (retargeting) những khách hàng đã ghé xem giỏ hàng tuần trước. Tỷ lệ chuyển đổi nổ tung nóc, doanh số chốt ầm ầm chi phí siêu rẻ! 🎯📈',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Dồn ads bám đuôi khách cũ chốt đơn ầm ầm chi phí rẻ bèo, né bão thầu thành công rực rỡ! 🎯📈"
            },
            {
              "senderId": "sep",
              "message": "Marketer tư duy chiến thuật đỉnh chóp vcl, sếp Messi khao cả team bữa buffet lẩu 5 sao! 🐐🏆"
            }
          ]
        }
      ]
    },
    {
      id: 'mkt_plagiarism_accused',
      title: 'Bị Designer nước ngoài tố đạo nhái thiết kế banner 😱',
      description: 'Một Designer tự do nổi tiếng tại Pháp đăng bài lên Behance tố cáo banner sản phẩm mới của công ty bạn "đạo nhái trắng trợn" tác phẩm nghệ thuật của anh ấy không xin phép, đòi kiện công ty.',
      priority: 'high',
      professions: ['marketing'],
      actions: [
        {
          id: 'redesign_quietly',
          label: '🎨 Gỡ banner cũ âm thầm, thiết kế layout mới thay thế',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn nhanh chóng gỡ toàn bộ banner dính phốt và phối hợp cùng Designer làm lại banner mới từ đầu. Sự việc lắng xuống trong im lặng, tránh được khủng hoảng pháp lý lớn. 😮‍💨',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Gỡ banner cũ thay layout mới âm thầm dập phốt, Designer cày thâu đêm ráng chịu nhé 😮‍💨"
            },
            {
              "senderId": "design",
              "message": "Huhu vẽ lại banner thâu đêm rụng hết tóc Designer rồi m ơi, lần sau check nguồn kỹ giùm cái 👨‍🎨"
            }
          ]
        },
        {
          id: 'buy_license_apologize',
          label: '💸 Ting ting mua bản quyền tác quyền chính chủ giải quyết',
          effects: [
            { stat: 'energy', value: -5 },
            { stat: 'salary', value: -150000 },
          ],
          feedMessage: 'Bạn chi 150k điểm lương liên hệ mua bản quyền chính chủ từ tác giả Pháp và đăng bài cảm ơn sự truyền cảm hứng của anh ấy. Tác giả gỡ bài bóc phốt, còn khen ngợi công ty bạn cư xử sòng phẳng chuyên nghiệp. 👑⚖️',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Bỏ 100k mua bản quyền chính chủ dập phốt văn minh, tác giả khen ngợi sòng phẳng chuyên nghiệp! 👑"
            },
            {
              "senderId": "sep",
              "message": "Hành xử văn minh bảo vệ uy tín công ty tuyệt vời, sếp Messi duyệt chi phí ngay 🐐"
            }
          ]
        }
      ]
    },
    {
      id: 'mkt_kol_unboxing_hate',
      title: 'Hot TikToker unboxing chê sản phẩm thậm tệ dìm hàng 📉',
      description: 'Reviewer triệu follow vừa lên video unboxing sản phẩm mới của công ty bạn với giọng điệu mỉa mai, chê bai bao bì phèn chúa, chất lượng dùng như hạch để câu view bẩn. Video đạt 500k view chỉ sau 3 tiếng.',
      priority: 'critical',
      professions: ['marketing'],
      actions: [
        {
          id: 'report_bullying',
          label: '⚖️ Gửi gậy report TikTok hành vi bắt nạt, bôi nhọ sai sự thật',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn gửi bằng chứng kiểm định chất lượng lên TikTok report hành vi bôi nhọ sai sự thật. Video bị gỡ sau 6 tiếng, khủng hoảng truyền thông được giải quyết nhanh gọn. 😮‍💨',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Gửi gậy report TikTok hạ gục video bôi nhọ sai sự thật sau 6 tiếng, dập phốt nhanh gọn! 😮‍💨"
            },
            {
              "senderId": "legal",
              "message": "Giấy chứng nhận kiểm định chất lượng đầy đủ pháp lý hỗ trợ report bao sạch cưng ơi ⚖️"
            }
          ]
        },
        {
          id: 'make_reaction_video',
          label: '🤡 Quay video phản biện đáng yêu tiếp thu cải tiến bao bì',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: -10 },
            { stat: 'salary', value: +150000 },
          ],
          feedMessage: 'Bạn đóng vai sếp tổng quay video phản biện đáng yêu ghi nhận đóng góp về bao bì phèn chúa và tặng anh ấy bộ sản phẩm cải tiến. Dân mạng khen ngợi thương hiệu cầu tiến văn minh, view tăng chóng mặt chốt lead ầm ầm! 🤡🏆',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Quay video phản biện tiếp thu cầu tiến làm dân mạng thả tim rần rần khen văn minh! 🏆"
            },
            {
              "senderId": "sep",
              "message": "Sếp tổng đóng video đáng yêu quá trời được khen ngợi, thưởng nóng cưng 150k nhé! 🐐🏆"
            }
          ]
        }
      ]
    },
    {
      id: 'mkt_legal_warning',
      title: 'Pháp chế tuýt còi banner quảng cáo dùng từ nhạy cảm 🚨',
      description: 'Banner quảng cáo sắp được treo ngoài phố lớn bị phòng pháp chế bắt gỡ khẩn cấp vì dùng các từ "Số 1", "Tốt nhất thế giới", "Độc quyền" vi phạm nghiêm trọng Luật Quảng cáo Việt Nam.',
      priority: 'high',
      professions: ['marketing'],
      actions: [
        {
          id: 'change_wording',
          label: '✍️ Sửa từ ngữ thành bựa vui vẻ lách luật quảng cáo',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn nhanh trí sửa từ "Tốt nhất thế giới" thành "Được sếp Messi khen ngon nhì thế giới". Content lách luật bựa bỉ làm người đi đường bật cười thích thú, viral tự nhiên cực mạnh! 📈🤡',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Sửa content thành sếp Messi khen ngon nhì thế giới lách luật bựa vui nhộn, dân mạng khen tinh tế 😂"
            },
            {
              "senderId": "design",
              "message": "Layout sửa chữ siêu nhanh font chữ viền neon bắt mắt, Designer duyệt! 👨‍🎨"
            }
          ]
        },
        {
          id: 'obey_legal',
          label: '⚙️ Tuân thủ pháp chế, sửa từ mộc mạc chuẩn mực',
          effects: [
            { stat: 'energy', value: -10 },
            { stat: 'stress', value: -5 },
          ],
          feedMessage: 'Bạn tuân thủ pháp chế, sửa từ ngữ thành "Chất lượng uy tín chuẩn mực". Banner an toàn tuyệt đối không lo bị phạt hành chính nhưng content hơi nhạt nhẽo. 😮‍💨',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Sửa content mộc mạc chuẩn mực tuân thủ pháp chế an toàn tuyệt đối không lo phạt 😮‍💨"
            },
            {
              "senderId": "legal",
              "message": "Pháp chế chấm điểm 10 điểm an toàn nhé cưng, làm việc tuân thủ pháp luật ngủ ngon giấc ⚖️"
            }
          ]
        }
      ]
    },
    {
      id: 'mkt_post_merge_error',
      title: 'Đăng nhầm ảnh dìm sếp tổng đang chửi bậy lên Fanpage triệu view 😱',
      description: 'Trong cơn say ngủ gật lúc 14h chiều, do chuyển nhầm tab tài khoản cá nhân, bạn lỡ tay đăng bức ảnh chụp màn hình sếp tổng đang nhắn tin chửi bậy trong nhóm nội bộ lên fanpage triệu view kèm caption bựa.',
      priority: 'critical',
      professions: ['marketing'],
      actions: [
        {
          id: 'delete_hide',
          label: '🗑️ Xóa bài ngay lập tức, block toàn bộ các tài khoản comment ảnh',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +20 },
          ],
          feedMessage: 'Bạn phát hiện và xóa bài sau 60 giây. Bạn cuống cuồng block toàn bộ các tài khoản chụp lại màn hình châm chọc. Thiệt hại được giấu kín nhưng sếp tổng vẫn biết tin qua chim lợn báo cáo. 💀',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Xóa bài block nick châm chọc giấu nhẹm lỗi lầm, cơ mà sếp vẫn biết tin run bần bật 💀"
            },
            {
              "senderId": "sep",
              "message": "Ủa cái ảnh sếp nhắn tin cộc cằn rò rỉ đâu ra vậy m, sếp đang rà soát chim lợn báo cáo đó 🐐🚨"
            }
          ]
        },
        {
          id: 'convert_into_transparent_campaign',
          label: '🤡 Đính chính: "Sếp cộc cằn vì trăn trở muốn tăng lương cho nhân viên"',
          effects: [
            { stat: 'energy', value: -25 },
            { stat: 'stress', value: -15 },
            { stat: 'salary', value: +250000 },
          ],
          feedMessage: 'Bậc thầy truyền thông! Bạn lên bài đính chính: "Sếp tổng cộc cằn vì trăn trở làm sao tăng lương cho nhân sự Mega Sale". Dân mạng tung hô sếp tổng là Đấng cứu thế nhân từ, sếp thích thú khao bạn 250k thưởng nóng! 🤡🏆',
          chatReplies: [
            {
              "senderId": "mkt",
              "message": "Đính chính sếp cộc cằn vì trăn trở tăng lương nhân sự, bẻ lái làm sếp Messi sướng nở hoa! 😂🏆"
            },
            {
              "senderId": "hr",
              "message": "Đúng là phép thuật biến hình truyền thông! Sếp sướng nở hoa khao thưởng nóng luôn, nể thực sự! 🎸"
            }
          ]
        }
      ]
    }
  ],
}

export default marketingPack
