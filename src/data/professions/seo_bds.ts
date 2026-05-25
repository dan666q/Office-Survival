// src/data/professions/seo_bds.ts
import type { ProfessionPack } from '../../types/game.types'

export const seoBdsPack: ProfessionPack = {
  config: {
    id: 'seo_bds',
    name: 'Sales BĐS',
    emoji: '🏠',
    tagline: 'Khách hàng là thượng đế. Cho đến khi họ seen tin nhắn và block bạn.',
    difficulty: 'Trung bình',
    enemy: 'Khách ảo, leads rác, cướp khách từ đồng nghiệp, áp lực chốt số cuối tháng',
    startingStats: {
      stress: 20,
      energy: 85,
      salary: 500000,
    },
    dailySalary: 420000,
  },
  buffs: [
    {
      id: 'chot_deal',
      name: 'Data VIP Quận 2',
      description: 'Danh sách số điện thoại của giới tài phiệt quan tâm biệt thự ven sông và penthouse 20 tỷ.',
      cost: 300000,
      icon: '📞',
      chatReplies: [
        {
          "senderId": "sales",
          "message": "Data VIP giới tài phiệt quan tâm penthouse 20 tỷ, leads nét căng gọi điện chốt cọc vèo vèo! 📞"
        },
        {
          "senderId": "pm",
          "message": "Có data ngon thế chốt deal Penthouse ting ting hoa hồng nổ tài khoản sớm nha cưng 🌸"
        }
      ],
      duration: 'day',
      effects: [
        { stat: 'stress', value: -15 },
        { stat: 'energy', value: 10 },
      ],
    },
    {
      id: 'crm_pro',
      name: 'Vòng phong thủy đắc lộc',
      description: 'Vòng chuỗi trầm hương tự nhiên xua đuổi leads rác, thu hút vận may và tăng tỷ lệ chốt hợp đồng.',
      cost: 550000,
      icon: '🔮',
      chatReplies: [
        {
          "senderId": "sales",
          "message": "Chuỗi trầm hương tự nhiên xua đuổi leads rác, thu hút vận may chốt deal thần tốc 🔮"
        },
        {
          "senderId": "ba",
          "message": "Đeo vòng phong thủy trầm hương tâm linh đắc lộc chốt hợp đồng nhanh như chớp hihi 💍"
        }
      ],
      duration: 'permanent',
      effects: [
        { stat: 'energy', value: 15 },
        { stat: 'stress', value: -15 },
      ],
    },
    {
      id: 'sales_script',
      name: 'Khóa học chốt deal thần tốc',
      description: 'Bí kíp thao túng tâm lý khách hàng từ các diễn giả triệu đô. Nói câu nào thấm câu đó.',
      cost: 350000,
      icon: '🎓',
      chatReplies: [
        {
          "senderId": "sales",
          "message": "Bí kíp thao túng tâm lý khách hàng từ diễn giả triệu đô, nói câu nào thấm câu đó! 🎓"
        },
        {
          "senderId": "sep",
          "message": "Học chốt deal siêu tốc xong đi oanh tạc khách hàng mang doanh thu về nâng cúp cùng anh nhé! 🐐🏆"
        }
      ],
      duration: 'permanent',
      effects: [
        { stat: 'stress', value: -15 },
        { stat: 'energy', value: 10 },
      ],
    },
    {
      id: 'hot_listing',
      name: 'Liên minh Cò đất địa phương',
      description: 'Mạng lưới cộng tác viên thân thiết tuồn nguồn hàng ngộp giá rẻ bất ngờ trước khi lên sàn.',
      cost: 850000,
      icon: '🤝',
      chatReplies: [
        {
          "senderId": "sales",
          "message": "Mạng lưới cộng tác viên tuồn nguồn hàng ngộp giá rẻ bất ngờ trước khi lên sàn, đỉnh chóp! 🤝"
        },
        {
          "senderId": "cto",
          "message": "Logic gom nguồn hàng ngộp này bá đạo vcl, giàu sang phú quý tới cản đéo kịp m ơi 🚀👽"
        }
      ],
      duration: 'permanent',
      effects: [
        { stat: 'stress', value: -20 },
        { stat: 'energy', value: 20 },
      ],
    },
  ],
  events: [
    {
      id: 'seo_vip_lead',
      title: 'Đột phá! Phát hiện lead VIP đăng ký mua Penthouse 20 tỷ 💎',
      description: 'Hệ thống CRM báo có một số điện thoại đuôi ngũ quý 9 đăng ký quan tâm căn Penthouse góc hướng sông Sài Gòn trị giá 20 tỷ đồng.',
      priority: 'high',
      professions: ['seo_bds'],
            actions: [
        {
          id: 'call_vip_now',
          label: '📞 Gọi ngay lập tức với giọng ngọt ngào',
          effects: [
            { stat: 'energy', value: -10 },
            { stat: 'stress', value: +5 },
          ],
          setFlags: { vip_client_found: true },
          feedMessage: 'Bạn bấm máy gọi ngay. Đầu dây bên kia là một đại gia thực sự, giọng nói trầm ấm hẹn chiều nay nói chuyện chi tiết. 💎',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Alo chốt cuộc hẹn xem nhà chiều nay thành công, tay nghề sales đỉnh vcl! 📞🌹"
            },
            {
              "senderId": "pm",
              "message": "Cưng gọi điện ngọt ngào đại gia nghe xong gật đầu cái rụp, uy tín xỉu 🌸"
            }
          ]
        },
        {
          id: 'study_project_first',
          label: '📖 Nghiên cứu kỹ thông số căn hộ trước khi gọi',
          effects: [
            { stat: 'energy', value: -15 },
          ],
          setFlags: { vip_client_found: true, client_impressed: true },
          feedMessage: 'Bạn dành 30 phút rà soát pháp lý, sơ đồ bố trí Penthouse rồi mới gọi điện. Đại gia cực kỳ ấn tượng vì kiến thức chuyên sâu của bạn. 📈',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Nghiên cứu kỹ pháp lý sơ đồ Penthouse thuyết phục đại gia nể phục kiến thức chuyên sâu 📈"
            },
            {
              "senderId": "cto",
              "message": "Logic đỉnh vcl, kiến thức chuyên sâu thế này đại gia gật đầu ký cọc nhanh như chớp 🚀"
            }
          ]
        },
      ],
    },
    {
      id: 'seo_competitor_steal',
      title: 'Đồng nghiệp bàn bên rình rập cướp khách VIP ⚔️',
      description: 'Hùng - sales kỳ cựu ngồi bên cạnh cứ dòm ngó màn hình của bạn và cố tình hỏi han: "Có khách Penthouse ngon thế em, cần anh đi cùng tư vấn hỗ trợ không?"',
      priority: 'high',
      professions: ['seo_bds'],
            requirements: {
        flags: { vip_client_found: true },
      },
      actions: [
        {
          id: 'decline_politely',
          label: '🙅 Từ chối khéo: "Dạ khách này em tự lo được ạ"',
          effects: [
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Bạn từ chối thẳng thắn. Hùng bĩu môi bỏ đi nhưng trong lòng đang ngấm ngầm tìm cách liên hệ riêng với khách của bạn. ⚔️',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Từ chối thằng Hùng cướp khách thẳng thừng, cơ mà coi chừng nó lén liên hệ riêng nha m ⚔️"
            },
            {
              "senderId": "pm",
              "message": "Hùng sales cựu mặt dày vcl tự dưng nhảy vào đòi chia khách, cưng từ chối khéo là đúng 🌸"
            }
          ]
        },
        {
          id: 'share_commission',
          label: '🤝 Đề xuất cùng hợp tác chia hoa hồng 50-50 để chắc ăn',
          effects: [
            { stat: 'stress', value: -10 },
            { stat: 'salary', value: -100000 },
          ],
          feedMessage: 'Hùng cười hớn hở đồng ý ngay, cam kết dùng uy tín lâu năm để hỗ trợ chốt deal. Hoa hồng tương lai bị chia đôi, nhưng rủi ro mất khách giảm hẳn. 🤝',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Đề xuất hợp tác 50-50 chắc ăn Hùng chốt deal vèo vèo, chia đôi hoa hồng xót ví vcl 🤝"
            },
            {
              "senderId": "hr",
              "message": "Mất 100k hoa hồng cơ mà an toàn chốt deal 20 tỷ, sòng phẳng giàu sang nha em 🎸"
            }
          ]
        },
      ],
    },
    {
      id: 'seo_site_visit_penthouse',
      title: 'Đưa đại gia đi thị sát Penthouse thực tế 🏢',
      description: 'Đại gia đến dự án bằng chiếc xe siêu sang Mercedes Maybach. Bạn phải trực tiếp mở khóa dẫn khách lên tầng 40 ngắm cảnh sông.',
      priority: 'critical',
      professions: ['seo_bds'],
            requirements: {
        flags: { vip_client_found: true },
      },
      actions: [
        {
          id: 'passionate_tour',
          label: '🗣️ Thuyết trình nhiệt huyết về phong thủy đỉnh cao',
          effects: [
            { stat: 'energy', value: -25 },
            { stat: 'stress', value: +10 },
          ],
          setFlags: { deal_pending: true },
          feedMessage: 'Bạn nói liên tục 1 tiếng về thế tựa sơn hướng thủy của căn hộ. Khách rất ưng ý, gật gù bảo sẽ ra quyết định đặt cọc sớm. 🏢',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Thuyết trình phong thủy hướng sông thế tựa sơn cực sung, đại gia gật gù bảo cọc sớm! 🏢"
            },
            {
              "senderId": "ba",
              "message": "Thế tựa sơn hướng thủy nghe lãng mạn phong thủy đỉnh chóp, chốt cọc nhanh cưng ơi 💍"
            }
          ]
        },
        {
          id: 'silent_luxury',
          label: '🧘 Lẳng lặng đi bên cạnh, chỉ trả lời khi được hỏi (Style sang trọng)',
          effects: [
            { stat: 'energy', value: -10 },
          ],
          setFlags: { deal_pending: true },
          feedMessage: 'Lối tư vấn tinh tế, không chèo kéo làm khách rất hài lòng. Khách hẹn ngày mai đưa phu nhân đến xem lần cuối trước khi ký. 🧘',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Tư vấn tinh tế đi bên cạnh style sang trọng đại gia cực kỳ ưng ý hẹn mai ký hợp đồng 🧘"
            },
            {
              "senderId": "pm",
              "message": "Phong cách tư vấn sang trọng đẳng cấp không chèo kéo làm khách nể phục xỉu 🌸"
            }
          ]
        },
      ],
    },
    {
      id: 'seo_close_deal_penthouse',
      title: 'THỜI KHẮC VÀNG: Ký hợp đồng mua bán Penthouse! ✍️',
      description: 'Khách hàng VIP đã đồng ý ký hợp đồng. Trưởng phòng và giám đốc kinh doanh đang vây quanh chuẩn bị sâm-panh chúc mừng.',
      priority: 'critical',
      professions: ['seo_bds'],
            requirements: {
        flags: { deal_pending: true },
      },
      actions: [
        {
          id: 'sign_full_deal',
          label: '💰 Chốt deal thành công mỹ mãn! (Nhận hoa hồng khủng)',
          effects: [
            { stat: 'salary', value: +900000 },
            { stat: 'stress', value: -30 },
            { stat: 'energy', value: +20 },
          ],
          setFlags: { vip_client_found: false, deal_pending: false },
          feedMessage: 'Bút sa gà chết. Deal 20 tỷ thành công rực rỡ! Tài khoản của bạn nổ +900k tiền hoa hồng nóng. Cả văn phòng trầm trồ ngưỡng mộ bạn! 🎉',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Chốt deal 20 tỷ Penthouse thành công rực rỡ! Thưởng nóng 900k ting ting nâng cúp! 🐐🏆"
            },
            {
              "senderId": "sales",
              "message": "Hoa hồng 900k nổ tài khoản cả văn phòng quỳ lạy tôn sùng chiến thần sales cmnl! 🎉🌹"
            }
          ]
        },
      ],
    },
    {
      id: 'seo_ghost_client',
      title: 'Khách hỏi giá cặn kẽ rồi biến mất không dấu vết 👻',
      description: 'Bạn dành 40 phút chat Zalo tư vấn đầy đủ hình ảnh, bảng giá, tiến độ thanh toán cho một khách hàng cực kỳ tiềm năng. Xong khách thả tim rồi im lặng.',
      priority: 'medium',
      professions: ['seo_bds'],
            actions: [
        {
          id: 'call_back_gently',
          label: '📱 Nhắn tin nhẹ nhàng follow up lần 2',
          effects: [
            { stat: 'stress', value: +5 },
            { stat: 'energy', value: -5 },
          ],
          feedMessage: 'Tin nhắn đã nhận nhưng không thấy trả lời. Bạn bị đưa vào trạng thái "seen" kinh điển của nghề sales. 👻',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Seen không rep kinh điển của khách ảo, follow up lần 2 vẫn bặt vô âm tín buồn vcl 👻"
            },
            {
              "senderId": "pm",
              "message": "Hic khách thả tim xong im lặng làm cưng mừng hụt thương ghê chèn 😭"
            }
          ]
        },
        {
          id: 'next_lead',
          label: '🗑️ Chuyển ngay sang khách hàng khác, đỡ tốn thời gian',
          effects: [
            { stat: 'stress', value: -10 },
          ],
          feedMessage: 'Bạn nhanh chóng bỏ qua khách ảo để tập trung gọi lead mới. Tinh thần thép của một chiến thần sales thực thụ. 💪',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Bỏ qua khách ảo chuyển lead mới nhanh gọn lẹ, tinh thần thép chiến thần sales! 💪"
            },
            {
              "senderId": "ba",
              "message": "Quá đúng, thời gian là vàng bạc đâm đầu vào mấy khách ảo chỉ tốn công thôi hihi 💍"
            }
          ]
        },
      ],
    },
    {
      id: 'seo_fake_lead',
      title: 'Marketing bàn giao danh sách toàn "Lead rác" 🗑️',
      description: 'Nhận 20 leads từ chiến dịch chạy quảng cáo Facebook. Số đầu tiên gọi đến là một cụ già 80 tuổi nói nhầm máy, số thứ hai là học sinh cấp 2 đăng ký đùa.',
      priority: 'high',
      professions: ['seo_bds'],
            actions: [
        {
          id: 'call_all_anyway',
          label: '📞 Kiên trì bấm máy gọi hết cả 20 số (Tìm ngọc trong đá)',
          effects: [
            { stat: 'energy', value: -25 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Gọi hết 20 số, tai ù đi. Cuối cùng tìm được 1 khách có nhu cầu thực sự muốn đi xem dự án cuối tuần này. Kỳ tích xuất hiện! 🌟',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Kiên trì gọi 20 số rác lọc được 1 khách nét đi xem dự án, kỳ tích tìm ngọc trong đá! 🌟"
            },
            {
              "senderId": "intern",
              "message": "Đai ca kiên trì vcl gọi hết 20 số ù tai luôn, bái phục bái phục, SIUUUU! ⚡"
            }
          ]
        },
        {
          id: 'complain_marketing',
          label: '😤 Sang đập bàn phàn nàn với team Marketing',
          effects: [
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Bạn phản ánh chất lượng leads tệ. Team Marketing hứa tối ưu lại tệp đối tượng chạy quảng cáo cho chuẩn xác hơn. 📈',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Sang đập bàn mắng team Marketing chạy lead rác, bắt tối ưu tệp đối tượng ngay 😤"
            },
            {
              "senderId": "pm",
              "message": "Marketing hứa tối ưu lại tệp rồi cưng ơi, cãi nhau nhẹ nhàng dĩ hòa vi quý nha 🌸"
            }
          ]
        },
      ],
    },
    {
      id: 'seo_boss_pressure',
      title: 'Sếp bắt toàn bộ team Sales đi phát tờ rơi ngã tư 🥵',
      description: '"Thị trường đang chậm, tất cả nhân sự phải xuống đường phát tờ rơi dự án đất nền ở ngã tư lúc 11h30 trưa nắng gắt để tìm khách hàng."',
      priority: 'critical',
      professions: ['seo_bds'],
            actions: [
        {
          id: 'go_flyering',
          label: '🏃 Chấp hành nghiêm chỉnh, đội nắng phát tờ rơi',
          effects: [
            { stat: 'energy', value: -30 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: '1 tiếng đứng phát tờ rơi dưới cái nắng 38 độ khiến bạn rã rời, da đen sạm. Thu về được 2 số điện thoại quan tâm. 🥵',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Đứng ngã tư 38 độ phát tờ rơi rã rời da đen sạm thu được 2 số điện thoại, mệt vcl 🥵"
            },
            {
              "senderId": "intern",
              "message": "Đội nắng phát tờ rơi cực khổ ghê đại ca ơi, thương còng lưng luôn á 😭"
            }
          ]
        },
        {
          id: 'fake_sick_decline',
          label: '🙋 Xin phép trốn vì đau đầu/bận hẹn khách VIP gọi điện',
          effects: [
            { stat: 'stress', value: +15 },
            { stat: 'salary', value: -50000 },
          ],
          feedMessage: 'Bạn xin ở lại văn phòng trực hotline. Sếp nhíu mày không vui vẻ lắm nhưng không làm gì được bạn. 🤐',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Trốn phát tờ rơi ở lại trực hotline sếp nhìn nhíu mày trừ 50k lương chuyên cần nhé 🐐"
            },
            {
              "senderId": "sales",
              "message": "Trốn phát tờ rơi ở lại văn phòng mát mẻ cơ mà sếp ghim cọc điên rồi nha m 😂"
            }
          ]
        },
      ],
    },
    {
      id: 'seo_livestream_land',
      title: 'Chiến dịch Livestream bán đất nền tỉnh đột xuất 🎥',
      description: 'Sếp đặt chân máy quay trước mặt bạn: "Em lên sóng livestream TikTok giới thiệu dự án đất nền Bình Phước ngay nhé, đang có voucher giảm 100 triệu."',
      priority: 'medium',
      professions: ['seo_bds'],
            actions: [
        {
          id: 'live_confidently',
          label: '🎤 Lên sóng chém gió tự tin như chuyên gia',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +5 },
            { stat: 'salary', value: +80000 },
          ],
          feedMessage: 'Bạn chém gió cực sung trên live. 500 người xem đồng thời, thu về 5 leads nóng chất lượng và được sếp thưởng nóng 80k vì độ tự tin. 🎤',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Livestream TikTok chém gió như chuyên gia thu 5 leads nóng thưởng nóng 80k ting ting! 🎤"
            },
            {
              "senderId": "pm",
              "message": "Trời ơi cưng nói trên live lưu loát tự tin xỉu, thả tim bắn tim mỏi tay luôn 🌸"
            }
          ]
        },
        {
          id: 'live_shyly',
          label: '🥺 Ngượng ngùng cầm kịch bản đọc vấp váp',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn nói năng lắp bắp, mắt nhìn liên tục vào kịch bản. Mọi người thả icon haha liên tục. Buổi live kết thúc thất bại. 🥺',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Nói lắp bắp cầm kịch bản đọc vấp váp khán giả thả icon haha đầy màn hình nhục vcl 🥺"
            },
            {
              "senderId": "intern",
              "message": "Buổi live đầu hơi rén tí thôi đại ca ơi, lần sau múa quạt bung nóc là leads về ngay ⚡"
            }
          ]
        },
      ],
    },
    {
      id: 'seo_price_negotiation',
      title: 'Khách hàng đòi bớt 3% hoa hồng cá nhân để ký cọc 💸',
      description: '"Bên agency khác họ hứa cắt lại cho anh 2% hoa hồng của sales đấy em. Em cắt lại cho anh 3% thì anh ký cọc luôn bây giờ."',
      priority: 'high',
      professions: ['seo_bds'],
            actions: [
        {
          id: 'accept_cut_commission',
          label: '💸 Đồng ý cắt hoa hồng để chốt nhanh lấy số lượng',
          effects: [
            { stat: 'salary', value: -150000 },
            { stat: 'stress', value: -10 },
          ],
          feedMessage: 'Chấp nhận mất một phần hoa hồng cá nhân để chốt hợp đồng. Deal hoàn thành, có số báo cáo sếp nhưng lòng đau nhói vì ví vơi đi. 💸',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Đồng ý cắt 3% hoa hồng chốt nhanh lấy số, chốt được deal cơ mà ví vơi đi đau lòng vcl 💸"
            },
            {
              "senderId": "accounting",
              "message": "Chốt được deal báo cáo sếp cơ mà hoa hồng bị trừ 150k ting ting hụt ví xót xa ghê 💵"
            }
          ]
        },
        {
          id: 'firm_no_cut',
          label: '💪 Kiên quyết từ chối và nhấn mạnh dịch vụ hậu mãi đẳng cấp',
          effects: [
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn thẳng thắn từ chối hạ giá trị bản thân. Khách hàng im lặng suy nghĩ rồi bất ngờ đồng ý ký vì tôn trọng sự chuyên nghiệp của bạn. Cú lội ngược dòng đỉnh cao! 🧘',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Từ chối cắt máu hoa hồng nhấn mạnh dịch vụ đẳng cấp khách nể ký cọc luôn, thần thái! 🧘"
            },
            {
              "senderId": "pm",
              "message": "Cú lội ngược dòng đỉnh cao thuyết phục xỉu luôn cưng ơi, giữ nguyên hoa hồng trọn vẹn 🌸"
            }
          ]
        },
      ],
    },
    {
      id: 'seo_referral_gold',
      title: 'VẬN MAY ĐẾN: Khách hàng cũ giới thiệu người quen mua nhà 🌟',
      description: 'Chị Lan - khách hàng mua nhà năm ngoái gọi điện: "Em ơi, sếp chị đang muốn tìm mua một căn biệt thự nghỉ dưỡng ven biển Nha Trang, em tư vấn nhé."',
      priority: 'low',
      professions: ['seo_bds'],
            actions: [
        {
          id: 'call_referral_now',
          label: '📞 Bấm máy tư vấn tận tâm ngay lập tức',
          effects: [
            { stat: 'energy', value: -10 },
            { stat: 'stress', value: -15 },
            { stat: 'salary', value: +100000 },
          ],
          feedMessage: 'Với tệp khách giới thiệu, tỷ lệ chốt cực kỳ cao. Khách hàng mới nhanh chóng chốt cọc sau 30 phút tư vấn qua điện thoại. Nhận thưởng nóng. 🌟',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Khách cũ giới thiệu chốt cọc biệt thự Nha Trang sau 30 phút điện thoại, ting ting thưởng nóng! 🌟"
            },
            {
              "senderId": "pm",
              "message": "Uy tín tạo niềm tin có khác, khách tự động chốt cọc nhanh như chớp cưng ơi 🌸"
            }
          ]
        },
        {
          id: 'send_gift_first',
          label: '🎁 Gửi giỏ hoa quả cảm ơn chị Lan trước rồi mới gọi khách mới',
          effects: [
            { stat: 'salary', value: -50000 },
            { stat: 'stress', value: -20 },
          ],
          feedMessage: 'Hành động tinh tế của bạn khiến chị Lan rất vui lòng. Chị chủ động gọi điện nói đỡ giúp bạn một tiếng với sếp chị, giúp việc tư vấn sau đó cực kỳ thuận lợi. 🎁',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Gửi giỏ trái cây 50k cảm ơn chị Lan trước, chị nói đỡ giúp chốt deal biệt thự mượt mà 🎁"
            },
            {
              "senderId": "hr",
              "message": "Hành động tinh tế quá em ơi, chăm sóc khách hàng cũ thế này bảo sao khách giới thiệu hoài 🎸"
            }
          ]
        },
      ],
    },
    {
      id: 'seo_land_dispute',
      title: 'Dự án đất nền tỉnh bị tranh chấp ranh giới ⚔️',
      description: 'Lúc đang tư vấn cho nhóm khách đầu tư, bỗng một nhóm người dân bản địa mang băng rôn kéo đến tranh chấp đất đai ngay tại cổng dự án đất nền.',
      priority: 'critical',
      professions: ['seo_bds'],
            actions: [
        {
          id: 'guide_client_inside',
          label: '🚶 Nhanh chóng đưa khách vào nhà mẫu tránh ồn ào',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn nhanh trí đưa khách vào phòng VIP đóng kín cửa, bật nhạc nhẹ và tiếp tục tư vấn thuyết phục. Khách bớt lo lắng và tiếp tục nghe bạn chia sẻ. 😮‍💨',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Đưa khách vào nhà mẫu đóng kín cửa bật nhạc nhẹ tư vấn thuyết phục tiếp tục chốt cọc 😮‍💨"
            },
            {
              "senderId": "pm",
              "message": "Nhanh trí xử lý tình huống quá chèn ơi, khách bớt lo lắng nghe tư vấn ngon lành 🌸"
            }
          ]
        },
        {
          id: 'defend_project_legality',
          label: '🗣️ Đứng ra giải thích luật pháp và giấy tờ quy hoạch với khách',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Bạn show toàn bộ giấy tờ phê duyệt 1/500 đã được công chứng. Khách hàng cực kỳ an tâm trước tính pháp lý sạch của dự án. 👏',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Show quyết định phê duyệt 1/500 công chứng đập tan lo ngại quy hoạch, pháp lý sạch 100%! 👏"
            },
            {
              "senderId": "legal",
              "message": "Trình giấy tờ quy hoạch chuẩn chỉ thế này khách an tâm xuống tiền đéo sợ tranh chấp ⚖️"
            }
          ]
        },
      ],
    },
    {
      id: 'seo_interest_rates_surge',
      title: 'Ngân hàng đột ngột tăng lãi suất cho vay lên 15%! 💸',
      description: 'Ngân hàng liên kết dự án gửi thông báo điều chỉnh lãi suất cho vay mua nhà tăng từ 11% lên 15%/năm. Khách hàng của bạn lo ngại áp lực trả nợ lớn và đòi rút cọc.',
      priority: 'critical',
      professions: ['seo_bds'],
            actions: [
        {
          id: 'recalculate_debt_plan',
          label: '📊 Ngồi tính lại bài toán tài chính tối ưu dòng tiền cho khách',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn đưa ra phương án trả nợ theo niên kim giảm dần và giãn thời hạn vay lên 25 năm. Khách hàng thấy chi phí hàng tháng vẫn trong tầm kiểm soát nên đồng ý không rút cọc. 🧘',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Tính toán lại niên kim giảm dần giãn nợ 25 năm khách an tâm giữ cọc không rút, giỏi! 🧘"
            },
            {
              "senderId": "accounting",
              "message": "Bảng tính dòng tiền trả nợ quá tối ưu thuyết phục, nghiệp vụ sales đỉnh cao vcl 👍"
            }
          ]
        },
        {
          id: 'offer_developer_subsidy',
          label: '🤝 Đề xuất chủ đầu tư chiết khấu thêm 2% để bù lãi suất',
          effects: [
            { stat: 'stress', value: -5 },
            { stat: 'salary', value: -50000 },
          ],
          feedMessage: 'Chủ đầu tư đồng ý bù chiết khấu cho khách. Deal được giữ vững nhưng hoa hồng tháng này của bạn bị khấu trừ bớt 50k. 💸',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Chủ đầu tư đồng ý chiết khấu thêm 2% bù lãi suất cơ mà hoa hồng m bị khấu trừ 50k nhé 🐐"
            },
            {
              "senderId": "sales",
              "message": "Giữ được deal cơ mà hụt ví 50k điểm hoa hồng xót xa quá m ơi 😭"
            }
          ]
        },
      ],
    },
    {
      id: 'seo_secret_shopper',
      title: 'Phát hiện khách hàng là sales đối thủ đi dò la thông tin 🕵️‍♂️',
      description: 'Khách hàng liên tục hỏi sâu về chiết khấu ngầm và kịch bản sales của bạn. Bạn check Zalo thì phát hiện ảnh avatar của họ mặc đồng phục agency đối thủ.',
      priority: 'high',
      professions: ['seo_bds'],
            actions: [
        {
          id: 'play_along_professional',
          label: '🧘 Vờ như không biết, tư vấn đúng khung chuẩn công ty',
          effects: [
            { stat: 'energy', value: -10 },
          ],
          feedMessage: 'Bạn trả lời cực kỳ chuẩn mực, giữ kín toàn bộ bí mật nội bộ công ty. Đối thủ không khai thác được gì và đành rút lui. 🧘',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Vờ như không biết tư vấn đúng khung chuẩn giữ kín bí mật nội bộ, đối thủ rút lui 🧘"
            },
            {
              "senderId": "pm",
              "message": "Tỉnh táo vcl phát hiện avatar đối thủ kịp thời tư vấn chuẩn chỉ đéo bị lộ bài 🌸"
            }
          ]
        },
        {
          id: 'call_out_tactfully',
          label: '👉 Nói bóng gió khéo léo để họ tự rút lui trong lịch sự',
          effects: [
            { stat: 'stress', value: -5 },
          ],
          feedMessage: 'Bạn mỉm cười: "Bên em luôn hỗ trợ đồng nghiệp sàn bạn nhiệt tình ạ." Sales đối thủ giật mình ngượng ngùng cáo lui ngay lập tức. 😄',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Nói bóng gió 'hỗ trợ đồng nghiệp sàn bạn nhiệt tình' đối thủ giật mình ngượng ngùng cáo lui cmnl 😂"
            },
            {
              "senderId": "intern",
              "message": "Đại ca khịa khéo đỉnh vcl, sales đối thủ mặt đỏ bừng rút lui nhanh như một cơn gió, SIUUU! ⚡"
            }
          ]
        },
      ],
    },
    {
      id: 'seo_commission_delayed',
      title: 'Công ty trễ hạn thanh toán hoa hồng tháng trước 💸',
      description: 'Đến ngày nhận hoa hồng của deal lớn tháng trước nhưng kế toán trưởng báo dòng tiền tổng của tập đoàn đang bị nghẽn, hẹn chậm trả 15 ngày.',
      priority: 'high',
      professions: ['seo_bds'],
            actions: [
        {
          id: 'wait_patiently',
          label: '🧘 Chấp nhận chờ đợi, tập trung tìm kiếm khách mới',
          effects: [
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn kiên nhẫn. 15 ngày sau hoa hồng về ví đầy đủ kèm theo 5% lãi chậm trả. Rất xứng đáng! 💸',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Kiên nhẫn chờ 15 ngày hoa hồng về ví nhận thêm 5% lãi chậm trả sướng vcl cưng ơi 💸"
            },
            {
              "senderId": "accounting",
              "message": "Dòng tiền thông suốt giải ngân hoa hồng kèm lãi đầy đủ ting ting về ví kế toán chuyển ngay 💵"
            }
          ]
        },
        {
          id: 'demand_boss_advance',
          label: '😤 Lên gặp Giám đốc xin tạm ứng trước một phần hoa hồng',
          effects: [
            { stat: 'stress', value: +15 },
            { stat: 'salary', value: +50000 },
          ],
          feedMessage: 'Giám đốc đồng ý tạm ứng trước 50k điểm cho bạn để giải quyết chi tiêu sinh hoạt. Bạn bớt căng thẳng ví tiền. 😮‍💨',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Duyệt tạm ứng trước 50k điểm hoa hồng giải quyết chi tiêu sinh hoạt kịp thời nhé! 🐐"
            },
            {
              "senderId": "sales",
              "message": "Lên gặp trực tiếp sếp xin ứng nóng 50k giải cứu chiếc ví trống rỗng, uy tín vcl 😮‍💨"
            }
          ]
        },
      ],
    },
    {
      id: 'seo_client_divorce',
      title: 'Cặp vợ chồng khách đòi hủy mua biệt thự vì ly hôn 💔',
      description: 'Lúc chuẩn bị ra phòng công chứng, hai vợ chồng khách hàng cãi nhau nảy lửa ngay tại sảnh dự án và tuyên bố: "Không mua bán gì hết, ly hôn!"',
      priority: 'critical',
      professions: ['seo_bds'],
            actions: [
        {
          id: 'talk_to_husband_private',
          label: '🗣️ Gặp riêng người chồng, gợi ý mua làm tài sản riêng',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +10 },
          ],
          setFlags: { deal_pending: true },
          feedMessage: 'Bạn thuyết phục người chồng mua làm tài sản riêng sau ly hôn để đầu tư sinh lời. Anh ấy gật đầu đồng ý ký hợp đồng đứng tên một mình. Xuất sắc! 🏢',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Gặp riêng chồng thuyết phục mua làm tài sản riêng đầu tư chốt deal đứng tên một mình, đỉnh! 🏢"
            },
            {
              "senderId": "pm",
              "message": "Trời đất chốt deal đứng tên chồng riêng lẻ sau ly hôn, cưng thao túng tâm lý đỉnh thực sự 🌸"
            }
          ]
        },
        {
          id: 'refund_deposit_politely',
          label: '🙅 Hỗ trợ làm thủ tục hoàn cọc lịch sự cho cả hai',
          effects: [
            { stat: 'stress', value: -10 },
          ],
          feedMessage: 'Bạn vui vẻ giúp đỡ họ làm thủ tục hủy. Hai người cảm kích sự tử tế của bạn, hứa sau khi phân chia tài sản xong sẽ quay lại mua riêng. 🤝',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Làm thủ tục hoàn cọc lịch sự khách cảm kích hứa chia tài sản xong quay lại mua riêng 🤝"
            },
            {
              "senderId": "hr",
              "message": "Tử tế chu đáo thế này khách nhớ mãi luôn em ơi, làm nghề sales có tâm có tầm là đây 🎸"
            }
          ]
        },
      ],
    },
    {
      id: 'seo_fake_booking',
      title: 'Khách hàng gửi ảnh photoshop biên lai chuyển khoản đặt cọc giả 😱',
      description: 'Khách gửi ảnh giao dịch chuyển khoản cọc 50 triệu và giục bạn khóa căn gấp. Kế toán công ty check tài khoản 15 phút vẫn chưa thấy tiền nổi.',
      priority: 'critical',
      professions: ['seo_bds'],
            actions: [
        {
          id: 'wait_acct_confirmation',
          label: '🛑 Kiên quyết giữ căn nhưng không ký biên nhận khi chưa thấy tiền nổi',
          effects: [
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn kiên quyết chờ kế toán báo có tiền. Sau 1 tiếng khách thú nhận là ngân hàng bị lỗi giao dịch thật và chuyển lại tiền chuẩn. Hú vía! 😮‍💨',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Đợi tiền nổi tài khoản mới giữ căn là chuẩn chỉ, phòng tránh lừa đảo photoshop cọc ảo 👍"
            },
            {
              "senderId": "sales",
              "message": "Khách thú nhận lỗi giao dịch thật và chuyển khoản chuẩn cọc 50 triệu, hú vía cmnl 😮‍💨"
            }
          ]
        },
        {
          id: 'lock_unit_trust',
          label: '🎲 Tin tưởng khách, ký biên nhận đặt cọc trước',
          effects: [
            { stat: 'stress', value: +25 },
            { stat: 'salary', value: -150000 },
          ],
          feedMessage: 'Bạn ký. Hóa ra khách dùng phần mềm fake biên lai ngân hàng để giữ chỗ ảo nhằm cướp căn đầu cơ. Công ty bị tổn thất lớn và phạt bạn 150k. 💀',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Tin cọc giả giữ chỗ ảo bị khách cướp căn đầu cơ phạt trừ nặng 150k lương kỷ luật nhé! 🐐🚨"
            },
            {
              "senderId": "accounting",
              "message": "Đã cảnh báo chưa nổi tiền đéo được ký biên nhận cọc rồi mà, bị lừa cọc ảo phạt lương đau xót cmnl 💀"
            }
          ]
        },
      ],
    },
    {
      id: 'seo_car_broke',
      title: 'Xe bị xịt lốp giữa đường khi đang đi đón khách VIP 🛵',
      description: 'Cách giờ hẹn đón khách VIP đi xem biệt thự 15 phút, chiếc xe máy của bạn đột ngột bị dập lốp/xịt hơi giữa đường nắng gắt.',
      priority: 'high',
      professions: ['seo_bds'],
            actions: [
        {
          id: 'book_grab_car_guest',
          label: '🚕 Chi 100k book GrabCar hạng sang đến đón khách thay mình (Tốn tiền)',
          effects: [
            { stat: 'salary', value: -100000 },
            { stat: 'stress', value: -10 },
          ],
          feedMessage: 'Khách VIP được xe sang đón chu đáo rất hài lòng. Bạn bắt xe ôm chạy đến dự án sau. Khách cực kỳ đánh giá cao sự chuyên nghiệp của bạn. 👏',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Bỏ 100k book GrabCar hạng sang đón khách chu đáo, khách đánh giá chuyên nghiệp chấm 10 điểm! 👏"
            },
            {
              "senderId": "pm",
              "message": "Chiêu GrabCar hạng sang đón khách VIP đỉnh xỉu cưng ơi, khách thích mê chốt cọc luôn kìa 🌸"
            }
          ]
        },
        {
          id: 'call_guest_apologize',
          label: '📞 Gọi điện xin lỗi khách và hẹn trễ 20 phút',
          effects: [
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Khách tỏ vẻ khó chịu vì bị trễ giờ làm việc quan trọng khác. Cuộc gặp diễn ra trong bầu không khí lạnh nhạt, tỷ lệ chốt giảm mạnh. 😭',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Hẹn trễ 20 phút khách tỏ ra khó chịu lỡ việc quan trọng, tỷ lệ chốt deal tụt dốc thê thảm 😭"
            },
            {
              "senderId": "hr",
              "message": "Hic lỡ giờ hẹn của đại gia là mất điểm nặng nề luôn á em ơi, tiếc ghê 🎸"
            }
          ]
        },
      ],
    },
    {
      id: 'seo_client_backout',
      title: 'Khách đòi rút cọc vì tin đồn chủ đầu tư nợ nần trên mạng 📱',
      description: 'Một bài viết không rõ nguồn gốc trên Facebook đồn thổi chủ đầu tư dự án đang bị siết nợ ngân hàng. Khách hàng của bạn hoảng loạn gọi điện đòi rút cọc gấp.',
      priority: 'critical',
      professions: ['seo_bds'],
            actions: [
        {
          id: 'show_audit_reports',
          label: '📄 Gửi báo cáo tài chính kiểm toán và tiến độ xây dựng thực tế',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Bạn gửi hình ảnh camera công trường đang tấp nập thi công và văn bản phủ nhận tin đồn của ngân hàng bảo lãnh. Khách an tâm tiếp tục giữ cọc. 😮‍💨',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Gửi báo cáo kiểm toán tiến độ xây dựng thực tế dập tắt tin đồn nhảm nhí, khách yên tâm giữ cọc 😮‍💨"
            },
            {
              "senderId": "legal",
              "message": "Trình văn bản ngân hàng bảo lãnh phủ nhận tin đồn chuẩn chỉ, pháp lý dự án vững như bàn thạch ⚖️"
            }
          ]
        },
        {
          id: 'invite_site_visit',
          label: '🚶 Mời khách lên công trường xem trực tiếp tiến độ đổ bê tông',
          effects: [
            { stat: 'energy', value: -20 },
          ],
          feedMessage: 'Khách tận mắt thấy tòa nhà đang lên tầng 15 cực nhanh. Mọi tin đồn nhảm nhí trên mạng xã hội tan biến hoàn toàn. 🧘',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Mời khách xem công trường tấp nập lên tầng 15, tin đồn nhảm tự bay màu cọc giữ vững! 🧘"
            },
            {
              "senderId": "intern",
              "message": "Mắt thấy tai nghe công trình xây dựng ầm ầm thế này đố ai dám đồn bậy bạ nữa, SIUUU! ⚡"
            }
          ]
        },
      ],
    },
    {
      id: 'seo_monopoly_deal',
      title: 'Chủ nhà ký gửi độc quyền căn nhà mặt phố giá rẻ bất ngờ 🏠',
      description: 'Một chủ nhà cần tiền gấp ký gửi độc quyền cho bạn căn nhà mặt tiền quận 3 giá chỉ bằng 70% giá thị trường. Cả sàn sales đang dòm ngó cướp nguồn hàng.',
      priority: 'high',
      professions: ['seo_bds'],
            actions: [
        {
          id: 'call_investors_immediately',
          label: '📞 Gọi ngay cho top 3 nhà đầu tư ruột của bạn',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'salary', value: +200000 },
          ],
          feedMessage: 'Nhà đầu tư ruột xuống tiền cọc ngay lập tức không cần đắn đo. Bạn chốt deal độc quyền trong vòng 20 phút. Nhận thưởng nóng siêu tốc! 💸',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Gọi ngay top 3 nhà đầu tư cọc 500 triệu chốt deal độc quyền trong 20 phút thưởng nóng 200k! 💸"
            },
            {
              "senderId": "sep",
              "message": "Chốt deal độc quyền siêu tốc cọc 500 triệu thưởng nóng 200k nâng cúp ăn mừng thôi! 🐐🏆"
            }
          ]
        },
        {
          id: 'post_fb_public',
          label: '🌐 Đăng công khai lên các hội nhóm Facebook để tìm khách nét',
          effects: [
            { stat: 'energy', value: -10 },
          ],
          feedMessage: 'Bài viết nhận được hàng trăm bình luận, nhưng đa số là sales khác giả danh vào cướp nguồn hàng. Bạn mất nhiều thời gian lọc khách. 😮‍💨',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Đăng facebook công khai bị sales đối thủ vào giả danh phá cướp mất nguồn hàng độc quyền 😭"
            },
            {
              "senderId": "intern",
              "message": "Đăng public dễ bị cướp nguồn hàng lắm đại ca ơi, lọc khách mỏi cả mắt ù cả tai 😰"
            }
          ]
        },
      ],
    },
    {
      id: 'seo_overtime_training',
      title: 'Sếp bắt cả đội Sales ở lại học thuộc lòng dự án đối thủ ⏰',
      description: 'Lúc 17h00 tan ca, sếp đứng dậy: "Hôm nay đối thủ ra hàng dự án mới bên cạnh, cả đội ở lại đến 20h00 học thuộc lòng bảng so sánh chi tiết nhé."',
      priority: 'medium',
      professions: ['seo_bds'],
            actions: [
        {
          id: 'stay_study_competitor',
          label: '⚡ Chấp nhận ở lại cày bảng so sánh cùng sếp',
          effects: [
            { stat: 'energy', value: -25 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn nắm chắc ưu nhược điểm của đối thủ. Ngày hôm sau tư vấn dìm đối thủ nâng dự án mình cực kỳ mượt mà thuyết phục khách. 👏',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Ở lại học thuộc dự án đối thủ tư vấn dìm đối thủ nâng dự án mình cực kỳ mượt mà thuyết phục 👏"
            },
            {
              "senderId": "pm",
              "message": "Chịu khó học hỏi thế hôm sau chốt deal vèo vèo khách nghe xong gật gù liên tục nha cưng 🌸"
            }
          ]
        },
        {
          id: 'escape_training_early',
          label: '🏃 Lẻn về sớm với lý do bận hẹn tư vấn khách trực tiếp',
          effects: [
            { stat: 'stress', value: +15 },
            { stat: 'salary', value: -30000 },
          ],
          feedMessage: 'Bạn trốn về sớm. Sếp ghi nhận sự vắng mặt và đánh giá bạn thiếu tinh thần chiến đấu tập thể. Bị trừ 30k điểm chuyên cần. 😭',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Trốn học về sớm bị trừ 30k điểm chuyên cần kỷ luật nhé! Thiếu tinh thần đồng đội 🐐"
            },
            {
              "senderId": "hr",
              "message": "Huhu trốn về sớm bị sếp ghim trừ lương 30k xót xa quá em ơi 🎸"
            }
          ]
        },
      ],
    },
    {
      id: 'seo_new_1',
      title: 'Hồ sơ vay ngân hàng của khách chốt biệt thự bị đánh giá nợ xấu CIC 😱',
      description: 'Khách hàng cực kỳ hào hứng xuống cọc mua căn biệt thự 15 tỷ. Đến khâu làm hồ sơ vay vốn, ngân hàng báo phát hiện khách hàng có nợ xấu nhóm 3 trên hệ thống CIC.',
      priority: 'critical',
      professions: ['seo_bds'],
      actions: [
        {
          id: 'seo_new_1_a',
          label: '🏦 Liên hệ các chi nhánh ngân hàng nhỏ đề xuất phương án xử lý ngoại lệ',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn vất vả chạy vạy tìm kiếm quan hệ. Ngân hàng cổ phần nhỏ đồng ý giải ngân theo phương án bảo lãnh tài sản khác. Deal được cứu sống! 😮‍💨',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Chạy vạy tìm ngân hàng nhỏ giải ngân ngoại lệ cứu sống deal biệt thự 15 tỷ thành công, đỉnh! 😮‍💨"
            },
            {
              "senderId": "pm",
              "message": "Cưng linh hoạt gõ cửa ngân hàng cứu nguy cọc biệt thự xuất sắc quá chèn ơi 🌸"
            }
          ]
        },
        {
          id: 'seo_new_1_b',
          label: '🚶 Thuyết phục khách chuyển đổi sang phương án thanh toán bằng vốn tự có',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Khách hàng đồng ý huy động thêm tiền từ người thân để đóng theo tiến độ tự có. Quá xuất sắc! 🧘',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Thuyết phục khách huy động vốn tự có đóng theo tiến độ tự có thành công rực rỡ, quá đỉnh! 🧘"
            },
            {
              "senderId": "accounting",
              "message": "Khách tự có tiền mặt thanh toán đéo cần ngân hàng giải ngân, kế toán khoái nhất cái này 👍"
            }
          ]
        },
      ],
    },
    {
      id: 'seo_new_2',
      title: 'Sales đối thủ lén tiếp cận khách VIP của bạn tại quán cafe ⚔️',
      description: 'Trong lúc bạn chạy đi lấy thêm tài liệu dự án, một sales của sàn đối thủ lén ngồi vào bàn tư vấn và chào mời khách hàng của bạn mức chiết khấu cắt máu cực cao.',
      priority: 'high',
      professions: ['seo_bds'],
      actions: [
        {
          id: 'seo_new_2_a',
          label: '🗣️ Quay lại bàn tư vấn tự tin, khéo léo khẳng định uy tín dịch vụ của mình',
          effects: [
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn thể hiện phong thái chuyên nghiệp, chỉ ra rủi ro khi mua qua sàn không chính thống. Khách hàng tin tưởng và từ chối lời mời của sales kia. 👏',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Tự tin tư vấn chỉ ra rủi ro mua sàn lậu khách tin tưởng từ chối sales cắt máu kia luôn, đẳng cấp! 👏"
            },
            {
              "senderId": "pm",
              "message": "Trời ơi phong thái chuyên nghiệp xịn sò đập tan trò cắt máu bẩn của đối thủ nha cưng 🌸"
            }
          ]
        },
        {
          id: 'seo_new_2_b',
          label: '🙅 Quát mắng đuổi sales đối thủ đi trực tiếp bảo vệ quyền lợi',
          effects: [
            { stat: 'stress', value: +20 },
            { stat: 'salary', value: -50000 },
          ],
          feedMessage: 'Bạn lớn tiếng cự cãi làm náo loạn quán cafe. Khách VIP cảm thấy phiền phức và khó chịu vì sự thiếu chuyên nghiệp của cả hai, quyết định ra về sớm. 😭',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Cãi cọ lớn tiếng quán cafe làm mất hình ảnh công ty khách bỏ về hoãn cọc phạt trừ 50k nhé! 🐐"
            },
            {
              "senderId": "sales",
              "message": "Mất bình tĩnh quát mắng đối thủ làm khách sợ bỏ về luôn kìa, dại dột vcl m ơi 😂"
            }
          ]
        },
      ],
    },
    {
      id: 'seo_new_3',
      title: 'Báo chí đưa tin đồn thất thiệt pháp lý dự án đất nền đang bán 📉',
      description: 'Một trang tin mạng đăng bài nghi vấn về pháp lý và quy hoạch của khu đất nền mà bạn đang mở bán rầm rộ khiến hàng loạt khách gọi điện thoại chất vấn dồn dập.',
      priority: 'high',
      professions: ['seo_bds'],
      actions: [
        {
          id: 'seo_new_3_a',
          label: '📄 Gửi ngay văn bản quyết định phê duyệt 1/500 chính thức cho khách',
          effects: [
            { stat: 'energy', value: -15 },
          ],
          feedMessage: 'Giấy tờ pháp lý chuẩn chỉ đập tan tin đồn thất thiệt. Khách hàng hoàn toàn yên tâm và không còn lo lắng nữa. 🧘',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Gửi ngay quyết định phê duyệt 1/500 chính thức dập tắt tin đồn, khách an tâm đéo sợ quy hoạch 🧘"
            },
            {
              "senderId": "legal",
              "message": "Hồ sơ pháp lý 1/500 chuẩn chỉ gửi phát một là khách câm nín tin tưởng cọc ngay ⚖️"
            }
          ]
        },
        {
          id: 'seo_new_3_b',
          label: '🩹 Bày tỏ quan điểm trấn an khách hàng chung chung chờ thông cáo chính thức',
          effects: [
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Khách hàng bán tín bán nghi, tâm lý dao động làm hoãn lại lịch ký hợp đồng chuyển nhượng tuần này. 😰',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Tư vấn chung chung làm khách dao động hoãn lịch ký hợp đồng cọc tuần này, lo lắng ghê 😰"
            },
            {
              "senderId": "pm",
              "message": "Hic khách hoang mang hoãn ký cọc rồi cưng ơi, tin đồn thất thiệt độc hại quá 😭"
            }
          ]
        },
      ],
    },
    {
      id: 'seo_new_4',
      title: 'Ngân hàng bảo lãnh tăng lãi suất vay mua nhà đột biến 🔥',
      description: 'Lãi suất ưu đãi năm đầu tiên tăng vọt 2% do chính sách thắt chặt tiền tệ. Khách hàng vay mua nhà hoang mang đòi hủy cọc rút tiền vì sợ không gánh nổi nợ.',
      priority: 'critical',
      professions: ['seo_bds'],
      actions: [
        {
          id: 'seo_new_4_a',
          label: '📊 Ngồi tính toán lại bảng dòng tiền trả nợ chi tiết theo phương án mới',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn chỉ ra mức tăng thực tế mỗi tháng không quá cao và đề xuất kéo dài kỳ hạn vay. Khách đồng ý ký tiếp hợp đồng. 😮‍💨',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Tính lại dòng tiền trả nợ niên kim giảm dần khách thấy chi phí trong tầm kiểm soát ký tiếp cọc 😮‍💨"
            },
            {
              "senderId": "accounting",
              "message": "Bảng tính dòng tiền trả nợ quá tối ưu thuyết phục, nghiệp vụ sales đỉnh cao vcl 👍"
            }
          ]
        },
        {
          id: 'seo_new_4_b',
          label: '🤝 Đề xuất chủ đầu tư hỗ trợ giãn tiến độ đóng tiền không cần vay',
          effects: [
            { stat: 'energy', value: -15 },
          ],
          feedMessage: 'Chủ đầu tư đồng ý áp dụng gói giãn tiến độ đặc biệt cho khách hàng của bạn. Deal được bảo toàn hoàn hảo. 🧘',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Đề xuất giãn tiến độ đóng tiền không vay ngân hàng được chủ đầu tư duyệt gói đặc biệt, slay! 🧘"
            },
            {
              "senderId": "pm",
              "message": "Chủ đầu tư ưu ái duyệt gói giãn đóng tiền giữ vững deal biệt thự xuất sắc quá cưng ơi 🌸"
            }
          ]
        },
      ],
    },
    {
      id: 'seo_new_5',
      title: 'Công ty chậm thanh toán tiền hoa hồng tháng trước 💸',
      description: 'Sếp gửi thông báo dòng tiền công ty đang bị kẹt nên tiền hoa hồng các giao dịch tháng trước sẽ bị chậm chi trả khoảng 2 tháng.',
      priority: 'high',
      professions: ['seo_bds'],
      actions: [
        {
          id: 'seo_new_5_a',
          label: '🧘 Kiên nhẫn chấp nhận quy chế dòng tiền của doanh nghiệp',
          effects: [
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn vui vẻ đồng ý cống hiến. Sếp đánh giá cao sự trung thành và tinh thần đồng hành cùng công ty của bạn. 🤝',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Kiên nhẫn chấp nhận đồng hành sếp đánh giá cao tinh thần trung thành cống hiến 🤝"
            },
            {
              "senderId": "hr",
              "message": "Biết chia sẻ khó khăn dòng tiền với doanh nghiệp thế này sếp Messi quý lắm em ơi 🎸"
            }
          ]
        },
        {
          id: 'seo_new_5_b',
          label: '🗣️ Lên gặp trực tiếp Trưởng phòng Sales đòi ứng trước một phần hoa hồng',
          effects: [
            { stat: 'stress', value: +15 },
            { stat: 'salary', value: +50000 },
          ],
          feedMessage: 'Bạn giải trình hoàn cảnh khó khăn thành công. Trưởng phòng ký duyệt cho bạn ứng trước 50k điểm hoa hồng cấp tốc để tiêu dùng. 💸',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Đã ký duyệt cho ứng nóng 50k điểm hoa hồng chi tiêu sinh hoạt kịp thời nhé em yêu! 🐐🏆"
            },
            {
              "senderId": "sales",
              "message": "Lên xin ứng nóng 50k điểm hoa hồng thành công giải cứu chiếc ví lép kẹp, sướng vcl 💸"
            }
          ]
        },
      ],
    },
    {
      id: 'seo_new_6',
      title: 'Xe ô tô bị hỏng đúng lúc chuẩn bị đi đón khách VIP xem dự án 🚗',
      description: 'Chỉ còn 30 phút là đến giờ hẹn đón khách VIP đi xem biệt thự mẫu cách thành phố 30km. Xe ô tô của bạn bất ngờ đề không nổ do hỏng ắc quy.',
      priority: 'high',
      professions: ['seo_bds'],
      actions: [
        {
          id: 'seo_new_6_a',
          label: '📲 Đặt ngay Grab Car Premium đón khách và chịu toàn bộ chi phí (Tốn tiền)',
          effects: [
            { stat: 'salary', value: -50000 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Khách VIP được phục vụ chu đáo bằng xe sang xịn mịn. Họ đánh giá cực cao sự chuyên nghiệp và chu đáo của bạn. 👍',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Đặt ngay Grab Car Premium đón khách VIP sang xịn khách thích mê chấm 10 điểm chu đáo! 👍"
            },
            {
              "senderId": "pm",
              "message": "Cưng chu đáo hết nấc bỏ tiền túi book Grab VIP đón khách, khách cưng chốt cọc biệt thự luôn nha 🌸"
            }
          ]
        },
        {
          id: 'seo_new_6_b',
          label: '📞 Gọi điện xin lỗi khách báo hoãn lịch hẹn đón',
          effects: [
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Khách hàng tỏ ra không hài lòng vì bị lỡ kế hoạch cuối tuần. Tỷ lệ chốt giao dịch bị ảnh hưởng nặng nề. 😭',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Gọi hoãn lịch hẹn làm đại gia bực mình lỡ việc, deal biệt thự coi như đi tong cmnl 😭"
            },
            {
              "senderId": "hr",
              "message": "Lỡ hẹn đón khách VIP là mất điểm trầm trọng, chia buồn cùng em 🎸"
            }
          ]
        },
      ],
    },
    {
      id: 'seo_new_7',
      title: 'Khách hàng cãi vã đòi hủy giao dịch cọc mua nhà phút chót ⚔️',
      description: 'Lúc chuẩn bị đặt bút ký hợp đồng mua bán, hai vợ chồng khách hàng xảy ra mâu thuẫn cãi vã to tiếng về việc ai sẽ đứng tên sổ đỏ, đòi hủy giao dịch ra về.',
      priority: 'high',
      professions: ['seo_bds'],
      actions: [
        {
          id: 'seo_new_7_a',
          label: '🗣️ Khéo léo đứng ra làm trung gian hòa giải tư vấn đứng tên đồng sở hữu cả hai',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Giải pháp đồng sở hữu tháo gỡ nút thắt hoàn hảo! Hai vợ chồng vui vẻ ký tên vào hợp đồng chốt deal thành công mỹ mãn. 👏',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Hòa giải tư vấn đứng tên đồng sở hữu cả hai vợ chồng gật đầu ký tên chốt deal oanh tạc! 👏"
            },
            {
              "senderId": "pm",
              "message": "Cắt đứt mâu thuẫn gia đình đứng tên đồng sở hữu quá khéo léo luôn chèn ơi 🌸"
            }
          ]
        },
        {
          id: 'seo_new_7_b',
          label: '🧘 Im lặng đứng ngoài không can thiệp vào chuyện nội bộ gia đình họ',
          effects: [
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Cuộc tranh cãi không có lối thoát. Hai vợ chồng tức giận đùng đùng bỏ về không ký tá gì cả, giao dịch bị đóng băng vô thời hạn. 😭',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Im lặng đứng ngoài cãi nhau đéo có lối thoát vợ chồng bỏ về không ký tá gì cọc đóng băng 😭"
            },
            {
              "senderId": "intern",
              "message": "Nhìn hai vợ chồng cãi lộn trung nóc nhà mẫu mà đéo ai can thiệp mất luôn deal tiếc vcl 😰"
            }
          ]
        },
      ],
    },
    {
      id: 'seo_new_8',
      title: 'Chạy Facebook Ads thu về toàn số ảo và spam phá đám 📉',
      description: 'Bạn chi 2 triệu chạy quảng cáo tìm khách mua đất nền. Sáng ra kiểm tra nhận được 10 số điện thoại liên hệ nhưng gọi điện toàn thuê bao ảo hoặc số rác.',
      priority: 'medium',
      professions: ['seo_bds'],
      actions: [
        {
          id: 'seo_new_8_a',
          label: '🔍 Kiên nhẫn lọc lại target nhân khẩu học điều chỉnh tệp đối tượng quảng cáo',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Bạn tối ưu lại tệp khách hàng. Hôm sau bắt đầu thu về những số điện thoại có nhu cầu thực tế tốt hơn nhiều. 🧘',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Kiên nhẫn lọc lại target nhân khẩu học hôm sau thu leads nét căng chất lượng hơn hẳn 🧘"
            },
            {
              "senderId": "pm",
              "message": "Lọc lại đối tượng target fb ads đúng chuẩn luôn cưng ơi, leads nét chạy vèo vèo 🌸"
            }
          ]
        },
        {
          id: 'seo_new_8_b',
          label: '🙅 Tắt chiến dịch quảng cáo ngay lập tức để bảo toàn ngân sách',
          effects: [
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn dừng quảng cáo. An toàn ngân sách nhưng bạn mất đi kênh tiếp cận khách hàng tiềm năng chính trong tuần này. 🔒',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Tắt fb ads bảo toàn ngân sách cơ mà mất luôn kênh tiếp cận khách hàng tiềm năng chính 🔒"
            },
            {
              "senderId": "intern",
              "message": "Tắt ads an toàn ví cơ mà tuần này đéo có leads đi gọi rồi đại ca ơi 😭"
            }
          ]
        },
      ],
    },
    {
      id: 'seo_new_9',
      title: 'Căn nhà phố quận 3 ký gửi độc quyền giá rẻ bất ngờ 🏠',
      description: 'Một chủ nhà cần tiền đi định cư nước ngoài ký gửi độc quyền cho bạn căn nhà mặt tiền quận 3 giá chỉ bằng 70% thị trường. Bắt cọc chồng tiền trong ngày.',
      priority: 'high',
      professions: ['seo_bds'],
      actions: [
        {
          id: 'seo_new_9_a',
          label: '📲 Gọi điện trực tiếp ngay cho top 3 nhà đầu tư thân thiết nhất',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'salary', value: +200000 },
          ],
          feedMessage: 'Nhà đầu tư ruột xuống tiền cọc 500 triệu ngay lập tức không cần suy nghĩ. Bạn chốt deal độc quyền siêu nhanh, nhận hoa hồng khủng! 💸',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Chốt deal độc quyền siêu tốc cọc 500 triệu thưởng nóng 200k nâng cúp ăn mừng thôi! 🐐🏆"
            },
            {
              "senderId": "sales",
              "message": "Nhà đầu tư ruột xuống tiền cọc 500 triệu ngay lập tức hoa hồng nổ ting ting cực khủng! 💸"
            }
          ]
        },
        {
          id: 'seo_new_9_b',
          label: '🌐 Đăng công khai lên các hội nhóm BĐS Facebook để tìm khách lẻ',
          effects: [
            { stat: 'energy', value: -10 },
          ],
          feedMessage: 'Bài viết nhận được hàng trăm bình luận, nhưng đa số là sales đối thủ vào dò la cướp nguồn hàng. Bạn mất nhiều thời gian lọc tin. 😮‍💨',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Đăng facebook công khai bị sales đối thủ vào giả danh phá cướp mất nguồn hàng độc quyền 😭"
            },
            {
              "senderId": "legal",
              "message": "Post public nhà phố quận 3 bị cướp mất độc quyền rồi, tiếc ngẩn ngơ luôn m ơi ⚖️"
            }
          ]
        },
      ],
    },
    {
      id: 'seo_new_10',
      title: 'Công ty bắt Sales trực gian hàng hội chợ suốt ngày Chủ Nhật không lương ⏰',
      description: 'Sếp thông báo: "Chủ Nhật tuần này công ty tham gia hội chợ triển lãm BĐS, toàn bộ đội Sales phải có mặt trực từ 8h sáng đến 21h đêm." Không có tiền hỗ trợ OT.',
      priority: 'high',
      professions: ['seo_bds'],
      actions: [
        {
          id: 'seo_new_10_a',
          label: '⚡ Chấp nhận đi trực nhiệt tình tìm kiếm cơ hội tiếp cận khách mới',
          effects: [
            { stat: 'energy', value: -30 },
            { stat: 'stress', value: +15 },
            { stat: 'salary', value: +100000 },
          ],
          feedMessage: 'Bạn đứng trực mỏi rã rời chân tay suốt cả ngày. May mắn tiếp cận được 2 khách hàng cực kỳ tiềm năng hứa hẹn chốt cọc tuần sau. 👍',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Trực hội chợ rã rời chân tay tiếp cận được 2 khách tiềm năng hứa chốt cọc tuần sau, tuyệt! 👍"
            },
            {
              "senderId": "pm",
              "message": "Chịu khó đứng trực hội chợ cả ngày trời gặt hái leads tiềm năng, cưng siêng năng số 1 🌸"
            }
          ]
        },
        {
          id: 'seo_new_10_b',
          label: '🩹 Báo bận lý do gia đình có giỗ xin phép vắng mặt',
          effects: [
            { stat: 'stress', value: -10 },
            { stat: 'salary', value: -30000 },
          ],
          feedMessage: 'Bạn được nghỉ ngơi thoải mái ngày Chủ Nhật ở nhà. Tuy nhiên sếp ghi nhận sự thiếu nhiệt tình và trừ điểm chuyên cần của bạn. 🤫',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Báo bận trốn trực hội chợ bị trừ 30k điểm chuyên cần kỷ luật răn đe nhé! 🐐"
            },
            {
              "senderId": "hr",
              "message": "Nghỉ ngơi Chủ Nhật sướng thân cơ mà bị sếp Messi ghim trừ lương 30k điểm chuyên cần kìa m 😂"
            }
          ]
        },
      ],
    },
  ],
}

export default seoBdsPack
