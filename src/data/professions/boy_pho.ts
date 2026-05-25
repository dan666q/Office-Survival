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
      chatReplies: [
        {
          "senderId": "intern",
          "message": "Đại ca nẹt pô giòn giã vcl! SIUUUU! 🛵⚡"
        },
        {
          "senderId": "sep",
          "message": "Dắt xe Wave độ pô đi lượn phố cổ mát mẻ cưng ơi, sếp Messi duyệt! 🐐🏆"
        }
      ],
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
      chatReplies: [
        {
          "senderId": "sales",
          "message": "Đm xích bạc leng keng ngầu đét! Tối đi quẩy Bar là hết nước chấm nha đại ca! 🍻"
        },
        {
          "senderId": "hr",
          "message": "Thời trang đường phố này làm cả văn phòng trầm trồ nể phục thực sự 😂🎸"
        }
      ],
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
      chatReplies: [
        {
          "senderId": "sep",
          "message": "Chào anh lớn ạ! Dây chuyền to bản thế kia sếp Messi nhìn thấy cũng phải nể 3 phần! 🐐🏆"
        },
        {
          "senderId": "ba",
          "message": "Đúng là trâm anh thế phiệt, đeo xích vàng 9999 đi làm vì đam mê hihi 💍"
        }
      ],
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
      chatReplies: [
        {
          "senderId": "admin",
          "message": "Bật Vinahouse xập xình biến pantry thành sàn quẩy cực mạnh, căng đét cưng ơi! 🖥️🕺"
        },
        {
          "senderId": "intern",
          "message": "Bass đập tức ngực múa quạt bung nóc nhà luôn đại ca ơi, SIUUUU! ⚽⚡"
        }
      ],
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
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Cưng ơi ngủ ngon giấc chứ? Sếp gửi voucher 500k tẩm bổ ăn trưa nè hihi 🌸"
            },
            {
              "senderId": "intern",
              "message": "Đại ca ngủ đến 10h sếp còn tặng voucher, đúng là làm bố thiên hạ cmnl SIUUUU! 🛵"
            }
          ]
        },
        {
          id: 'bp_wake_late_b',
          label: '😎 "Bố em bảo hôm nay cho em nghỉ đi lượn phố"',
          effects: [
            { stat: 'energy', value: +30 },
            { stat: 'salary', value: +1000000 },
          ],
          feedMessage: 'Sếp nghe nhắc tới bố bạn liền dạ vâng rối rít, chuyển khoản nóng 1 triệu tiền thưởng chuyên cần khuyến khích bạn đi làm lại. 🛵',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Dạ vâng anh lớn cứ đi lượn phố thoải mái, sếp ting ting 1 triệu chuyên cần khích lệ ạ! 👑"
            },
            {
              "senderId": "hr",
              "message": "Đi làm vì đam mê có khác, sếp dạ vâng rối rít thấy cưng xỉu 😂🎸"
            }
          ]
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
          chatReplies: [
            {
              "senderId": "pm",
              "message": "Cày cuốc báo cáo thay đại ca xong rồi ạ, lướt TikTok vui vẻ nha anh lớn 🌸"
            },
            {
              "senderId": "sales",
              "message": "Đm ủy quyền đỉnh chóp, sếp khen năng lực quản lý xuất sắc luôn, nể vcl 😂"
            }
          ]
        },
        {
          id: 'bp_deadline_miss_b',
          label: '💸 "Anh làm đi mai em mời cả team đi ăn lẩu 10 triệu"',
          effects: [
            { stat: 'energy', value: +15 },
            { stat: 'salary', value: +2000000 },
          ],
          feedMessage: 'PM sướng rơn ngồi làm báo cáo hoàn hảo khớp từng đồng xu. Sếp khen ngợi tinh thần gắn kết tập thể của bạn và thưởng lớn 2 triệu. 💸',
          chatReplies: [
            {
              "senderId": "pm",
              "message": "Báo cáo khớp từng đồng xu luôn đại ca! Lẩu 10 triệu mai triển luôn nhé SIUUUU! 🍲"
            },
            {
              "senderId": "admin",
              "message": "Đúng là trâm anh thế phiệt, bao cả team lẩu 10 triệu thì PM cày thay là chuẩn bài 🤫"
            }
          ]
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
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Giọng sếp truyền cảm thế cơ à, tặng cưng voucher Highland tỉnh táo nhé! ☕"
            },
            {
              "senderId": "design",
              "message": "Ngủ ngáy o o trước mặt sếp tổng mà được khen biết cảm thụ âm thanh nghệ thuật, ảo thật đấy 😂"
            }
          ]
        },
        {
          id: 'bp_meeting_sleep_b',
          label: '🛌 Ngủ dậy thấy sếp tổng đang nhẹ nhàng đắp chăn cho mình',
          effects: [
            { stat: 'energy', value: +30 },
            { stat: 'salary', value: +1000000 },
          ],
          feedMessage: 'Sếp tổng sợ bạn bị lạnh điều hòa nên đắp chăn ấm áp cho bạn ngủ tiếp. Cuộc họp kết thúc trong bầu không khí ấm cúng, thưởng bạn 1 triệu. 🧘',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Sợ máy lạnh làm cưng lạnh thôi, ngủ tiếp đi em yêu, sếp thưởng nóng 1 triệu nha 🧘"
            },
            {
              "senderId": "it_dev",
              "message": "Đắp chăn ấm áp trong phòng họp sếp tổng gác tay ngủ tiếp, đẳng cấp vũ trụ cmnl 💀"
            }
          ]
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
          chatReplies: [
            {
              "senderId": "admin",
              "message": "Vinahouse xập xình đèn laser bay lắc pantry căng đét cưng ơi, múa quạt bung nóc! 🕺"
            },
            {
              "senderId": "hr",
              "message": "Chiến thần khuấy động văn hóa doanh nghiệp của năm là đây chứ đâu, quẩy lên em ơi 🎸"
            }
          ]
        },
        {
          id: 'bp_pantry_party_b',
          label: '🍻 Mời sếp tổng vào làm một ly bia hơi cùng nhảy Vinahouse',
          effects: [
            { stat: 'energy', value: +25 },
            { stat: 'salary', value: +2000000 },
          ],
          feedMessage: 'Sếp tổng cởi caravat nhảy cực sung cùng bạn. Mọi khoảng cách cấp bậc biến mất. Bạn nhận ngay quyết định thăng chức làm Trợ lý sếp tổng. 💸',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Nhảy cực sung cùng anh lớn nhé! Quyết định bổ nhiệm trợ lý sếp tổng duyệt ngay ting ting! 🐐🏆"
            },
            {
              "senderId": "sales",
              "message": "Cởi caravat quẩy Vinahouse cùng sếp tổng, khoảng cách cấp bậc bay màu luôn, đỉnh chóp 🍻"
            }
          ]
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
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Cưng khen sếp mát lòng mát dạ ghê, chuột mạ vàng lướt web giải trí bao mượt nhé! 🐐"
            },
            {
              "senderId": "it_dev",
              "message": "Đù chuột Magic Mouse mạ vàng để lướt web giải trí, đúng là phú quý giàu sang 🖥"
            }
          ]
        },
        {
          id: 'bp_mouse_broken_b',
          label: '😎 Bảo sếp mua luôn cả chiếc MacBook Pro M3 Max mới tinh',
          effects: [
            { stat: 'energy', value: +20 },
            { stat: 'salary', value: +5000000 },
          ],
          feedMessage: 'Sếp vâng lệnh duyệt mua ngay MacBook Pro 90 triệu cho bạn chơi game mượt mà. Nhập kho lương thêm 5 triệu điểm thưởng nóng. 💸',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Duyệt mua ngay MacBook Pro M3 Max 90 triệu cho cưng chơi game giải trí không lag giật ạ! 👑"
            },
            {
              "senderId": "design",
              "message": "MacBook Pro M3 Max để chơi game mượt mà, sếp mua dâng tận bàn, cưng chiều hết nấc 💅"
            }
          ]
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
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Dạ chào Chủ Tịch Hội Đồng Quản Trị mới! Cả công ty xin kính cẩn nghiêng mình ạ! 🐐🏆"
            },
            {
              "senderId": "intern",
              "message": "Em lỡ dại đổ vấy cho đại ca, xin tha mạng đừng sa thải em tội nghiệp hu hu 😭"
            }
          ]
        },
        {
          id: 'bp_intern_fault_b',
          label: '🛵 Tặng intern chiếc Wave Alpha làm quà xin lỗi thay cho sếp',
          effects: [
            { stat: 'energy', value: +30 },
            { stat: 'salary', value: +5000000 },
          ],
          feedMessage: 'Intern khóc ròng cảm động, quỳ sụp xuống nhận lỗi với sếp là tự tay làm hỏng chứ bạn không liên quan. Sếp khen bạn nhân hậu vô song. 🤝',
          chatReplies: [
            {
              "senderId": "intern",
              "message": "Cảm ơn đại ca tặng Wave Alpha xịn xò! Em tự nhận lỗi xóa database ngay ạ, cảm động phát khóc 😭"
            },
            {
              "senderId": "hr",
              "message": "Hành xử nhân hậu vô song, tặng cả xe Wave Alpha để intern nhận tội hộ, nể phục sát đất! 🎸"
            }
          ]
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
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Đm bố chuyển khoản nóng 10 tỷ bù két trong 5 phút! Tiền tiêu vặt của đại ca khủng khiếp vcl 💵"
            },
            {
              "senderId": "legal",
              "message": "Đoàn kiểm toán gật gù khen công ty minh bạch, tiền nong sòng phẳng giàu sang số 1 cưng ơi ⚖️"
            }
          ]
        },
        {
          id: 'bp_audit_discrepancy_b',
          label: '🤐 Bảo đoàn kiểm toán tự viết lại số mới cho khớp sổ sách',
          effects: [
            { stat: 'energy', value: +30 },
            { stat: 'salary', value: +10000000 },
          ],
          feedMessage: 'Đoàn kiểm toán vui vẻ sửa lại báo cáo tài chính hoàn hảo khớp từng con số lẻ. Công ty thoát án phạt hoàn hảo, sếp thưởng lớn 10 triệu. 📈',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Thoát án phạt kiểm toán xuất sắc quá cưng ơi, sếp thưởng nóng 10 triệu nhé! 🐐"
            },
            {
              "senderId": "accounting",
              "message": "Đoàn kiểm toán vui vẻ sửa lại báo cáo khớp từng con số lẻ, phép thuật Winx biến hình thực sự 😂"
            }
          ]
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
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Bố đại ca xuống tiền mua đứt dự án làm tài sản cá nhân luôn! Đối tác VIP quỳ lạy câm nín cmnl 👑"
            },
            {
              "senderId": "sales",
              "message": "Đẳng cấp trâm anh thế phiệt, đối tác ký tiếp hợp đồng trọn đời run bần bật nể sợ 🍻"
            }
          ]
        },
        {
          id: 'bp_vip_client_b',
          label: '🛥️ Mời khách đi ăn tối ngắm hoàng hôn trên du thuyền triệu đô',
          effects: [
            { stat: 'energy', value: +30 },
            { stat: 'salary', value: +8000000 },
          ],
          feedMessage: 'Chuyến du thuyền đắt đỏ làm khách hàng sướng rơn, quên sạch mọi lời phàn nàn và chốt mua thêm 3 căn biệt thự nữa. Deal khủng chốt hạ! 💸',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Đi du thuyền triệu đô ngắm hoàng hôn chốt deal 3 căn biệt thự, hoa hồng nổ ting ting phê vcl! 🌹"
            },
            {
              "senderId": "pm",
              "message": "Khách hàng sướng rơn quên sạch mọi lời phàn nàn, cưng chăm sóc khách VIP đỉnh chóp xỉu 🌸"
            }
          ]
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
          chatReplies: [
            {
              "senderId": "design",
              "message": "Đm tặng khách 5 tỷ tiêu vặt xong khách quỳ sụp khen logo là kiệt tác nghệ thuật thế kỷ, ảo diệu vcl 😂"
            },
            {
              "senderId": "pm",
              "message": "Đúng là sức mạnh của đồng tiền, logo phèn thế nào khách cũng khen sang chảnh hết nấc 🌸"
            }
          ]
        },
        {
          id: 'bp_logo_ugly_b',
          label: '🛍️ Đóng máy Figma đi mua sắm xả stress tiêu tiền bố mẹ',
          effects: [
            { stat: 'energy', value: +30 },
            { stat: 'salary', value: +5000000 },
          ],
          feedMessage: 'Bạn xách túi hiệu đi shopping. Đầu óc thảnh thơi thoải mái cực kỳ. Khách hàng sợ mất lòng bạn nên tự động duyệt logo bản gốc khen đẹp. 🧘',
          chatReplies: [
            {
              "senderId": "design",
              "message": "Đóng máy đi shopping xả stress tiền bố mẹ sướng thân, khách sợ mất lòng tự duyệt logo bản gốc luôn 💅"
            },
            {
              "senderId": "hr",
              "message": "Tâm bất biến giữa dòng đời vạn biến, đi mua sắm hiệu hiệu tự nhiên qua ải thành công 😂"
            }
          ]
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
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Đấng cứu thế công sở đây rồi! Resort 5 sao Phú Quốc cả tuần sếp duyệt ngay nâng cúp! 🐐🏆"
            },
            {
              "senderId": "admin",
              "message": "Đang lo OT thứ Bảy tự dưng được đi nghỉ dưỡng Phú Quốc free, đại ca vạn tuế vạn vạn tuế! 🙌"
            }
          ]
        },
        {
          id: 'bp_overtime_mandatory_b',
          label: '🛵 Bảo sếp hôm nay em bận đi Wave Alpha lượn phố cổ',
          effects: [
            { stat: 'energy', value: +30 },
            { stat: 'salary', value: +10000000 },
          ],
          feedMessage: 'Sếp vâng dạ cúi đầu tiễn bạn ra cổng. Bạn vi vu lượn phố hít thở khí trời trong lành thoải mái cực kỳ. Lương thưởng vẫn chuyển đủ 10 triệu. 🛵',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Dạ vâng anh lớn cứ đi vi vu lượn phố cổ hít thở khí trời ạ, lương thưởng vẫn chuyển đủ 10 triệu 🛵"
            },
            {
              "senderId": "hr",
              "message": "Lượn phố cổ Wave Alpha sếp cúi đầu tiễn cổng, phong thái boy phố làm bố mãi đỉnh 😂"
            }
          ]
        },
      ],
    },
  ],
}

export default boyPhoPack
