// src/data/professions/ke_toan.ts
import type { ProfessionPack } from '../../types/game.types'

export const keToanPack: ProfessionPack = {
  config: {
    id: 'ke_toan',
    name: 'Kế Toán',
    emoji: '📊',
    tagline: 'Số liệu không bao giờ sai. Chỉ có sếp hoặc Excel bắt nó phải sai.',
    difficulty: 'Trung bình',
    enemy: 'Lỗi #REF!, kiểm toán thuế đột xuất, sếp muốn xào nấu số liệu',
    startingStats: {
      stress: 30,
      energy: 90,
      salary: 500000,
    },
    dailySalary: 480000,
  },
  buffs: [
    {
      id: 'excel_than_thanh',
      name: 'Excel VIP Macro Auto-Fill',
      description: 'Bộ macro VBA thần thánh tự động điền báo cáo tài chính và xào nấu số liệu chỉ bằng một click chuột.',
      cost: 400000,
      icon: '📗',
      chatReplies: [
        {
          "senderId": "accounting",
          "message": "Bộ macro VBA thần thánh điền báo cáo tài chính xào nấu số liệu chỉ bằng 1 click, đỉnh chóp! 📗⚖️"
        },
        {
          "senderId": "sep",
          "message": "Macro auto-fill nhanh gọn lẹ thế này sếp Messi duyệt báo cáo mỏi tay luôn em ơi 🐐"
        }
      ],
      duration: 'day',
      effects: [
        { stat: 'energy', value: 20 },
        { stat: 'stress', value: -15 },
      ],
    },
    {
      id: 'may_tinh_bo_tui',
      name: 'Máy tính Casio FX-580',
      description: 'Huyền thoại máy tính cầm tay. Bấm phím giòn giã siêu tốc độ, tính toán chi phí chuẩn xác đến từng đồng xu lẻ.',
      cost: 200000,
      icon: '🔢',
      chatReplies: [
        {
          "senderId": "accounting",
          "message": "Casio FX-580 huyền thoại bấm phím siêu tốc độ tính toán chi phí chuẩn xác từng đồng xu lẻ 🔢"
        },
        {
          "senderId": "sales",
          "message": "Tiếng bấm Casio tạch tạch tạch nhanh như súng máy nghe sợ vcl m ơi 😂"
        }
      ],
      duration: 'permanent',
      effects: [
        { stat: 'stress', value: -10 },
        { stat: 'energy', value: 5 },
      ],
    },
    {
      id: 'ca_phe_den',
      name: 'Bảng cân đối kế toán cân bằng',
      description: 'Nợ và Có cân bằng hoàn hảo đến từng số lẻ mà không cần ép số. Cảm giác thỏa mãn quét sạch stress.',
      cost: 300000,
      icon: '⚖️',
      chatReplies: [
        {
          "senderId": "accounting",
          "message": "Nợ và Có cân bằng hoàn hảo đến từng số lẻ mà không cần ép số, thỏa mãn xả stress cực mạnh! ⚖️"
        },
        {
          "senderId": "pm",
          "message": "Sổ sách kế toán cân đối khớp 100% sướng quá chèn ơi, kế toán uy tín số 1 🌸"
        }
      ],
      duration: 'day',
      effects: [
        { stat: 'energy', value: 10 },
        { stat: 'stress', value: -20 },
      ],
    },
    {
      id: 'ke_toan_truong_review',
      name: 'Hóa đơn đỏ hợp lệ 100%',
      description: 'Xấp hóa đơn đỏ chuẩn chỉ đầy đủ mã số thuế và chữ ký số. Miễn nhiễm hoàn toàn với các cuộc thanh tra Thuế.',
      cost: 500000,
      icon: '📄',
      chatReplies: [
        {
          "senderId": "accounting",
          "message": "Xấp hóa đơn đỏ chuẩn chỉ đầy đủ chữ ký số, miễn nhiễm hoàn toàn với thanh tra Thuế! 📄⚖️"
        },
        {
          "senderId": "legal",
          "message": "Hồ sơ hóa đơn đỏ hợp lệ 100% thế này pháp chế tụi e ngủ ngon đéo lo kiện tụng ⚖️"
        }
      ],
      duration: 'timeslot',
      effects: [
        { stat: 'stress', value: -20 },
        { stat: 'energy', value: 15 },
      ],
    },
  ],
  events: [
    {
      id: 'kt_excel_crash',
      title: 'Báo cáo tài chính bị lỗi #REF! hàng loạt 💀',
      description: 'Đang mở file Excel báo cáo năm nặng 50MB thì máy báo "Not Responding" rồi tự crash. Khi mở lại, toàn bộ cột tổng doanh thu hiện chữ #REF! đỏ lòm.',
      priority: 'critical',
      professions: ['ke_toan'],
            actions: [
        {
          id: 'rebuild_formulas',
          label: '🔍 Tự gõ và dựng lại công thức từng ô',
          effects: [
            { stat: 'energy', value: -25 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn kiên nhẫn rà soát và dựng lại công thức. Đau mắt, mỏi vai nhưng số liệu đã chuẩn xác trở lại. 📈',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Kiên nhẫn gõ dựng lại công thức Excel khớp từng số lẻ, nể độ chịu khó nha! ⚖️"
            },
            {
              "senderId": "sep",
              "message": "Báo cáo tài chính chuẩn xác trở lại, sếp Messi duyệt ngay không lăn tăn 🐐"
            }
          ]
        },
        {
          id: 'use_old_estimate',
          label: '🩹 Copy đè số ước tính từ file cũ (Nhanh gọn)',
          effects: [
            { stat: 'energy', value: -5 },
            { stat: 'stress', value: -10 },
          ],
          setFlags: { has_hidden_error: true },
          feedMessage: 'Bạn copy đè số ước tính của tháng trước vào cho nhanh để kịp gửi. File chạy trơn tru, nhưng chứa một lỗ hổng số liệu lớn. 🤫',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Copy đè số cũ cho nhanh kịp gửi, file chạy trơn tru cơ mà chứa lỗ hổng lớn nha m 🤫"
            },
            {
              "senderId": "ba",
              "message": "Nhanh gọn lẹ đối phó sếp là giỏi, cơ mà sau kiểm toán bới ra là mệt mỏi hihi 💍"
            }
          ]
        },
      ],
    },
    {
      id: 'kt_boss_pressure',
      title: 'Sếp tổng yêu cầu "tối ưu hóa" số liệu chi phí 💸',
      description: 'Sếp gọi bạn vào phòng, nhỏ nhẹ: "Em xem thế nào gạt bớt doanh thu quý này sang quý sau, với chế thêm ít hóa đơn tiếp khách để giảm thuế thu nhập doanh nghiệp nhé."',
      priority: 'high',
      professions: ['ke_toan'],
            actions: [
        {
          id: 'agree_optimize',
          label: '🤝 "Dạ để em xào nấu lại" (Chiều lòng sếp)',
          effects: [
            { stat: 'stress', value: +15 },
            { stat: 'salary', value: +150000 },
          ],
          setFlags: { has_hidden_error: true, boss_pleased: true },
          feedMessage: 'Bạn đồng ý làm theo ý sếp. Sếp cười tươi rút ví khao bạn bữa trưa và hứa tăng thưởng. Nhưng bạn biết mình vừa dấn thân vào con đường mạo hiểm. 💀',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Đã khao bữa trưa vui vẻ và hứa tăng thưởng vì độ linh hoạt xử lý số liệu nhé! 🐐🏆"
            },
            {
              "senderId": "accounting",
              "message": "Xào nấu số liệu chiều lòng sếp Messi, sướng trước mắt cơ mà run sau lưng cmnl 💀"
            }
          ]
        },
        {
          id: 'refuse_optimize',
          label: '🙅 Từ chối khéo vì rủi ro kiểm toán rất cao',
          effects: [
            { stat: 'stress', value: +20 },
            { stat: 'salary', value: -100000 },
          ],
          feedMessage: 'Bạn kiên quyết từ chối và cảnh báo rủi ro pháp lý. Sếp sa sầm nét mặt, hủy đề xuất và đánh giá bạn "thiếu linh hoạt trong xử lý công việc". 😭',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Từ chối vì rủi ro kiểm toán là chuẩn bài, giữ vững đạo đức nghề nghiệp, slay! 💅"
            },
            {
              "senderId": "sep",
              "message": "Từ chối thẳng mặt sếp làm sếp sa sầm mặt đánh giá thiếu linh hoạt rồi kìa 🐐"
            }
          ]
        },
      ],
    },
    {
      id: 'kt_double_payment',
      title: 'Chuyển khoản nhầm hai lần tiền cho nhà cung cấp 😱',
      description: 'Lúc duyệt lệnh chuyển tiền cuối ngày, do hệ thống ngân hàng bị lag, bạn vô tình click đúp khiến công ty chuyển khoản 2 lần số tiền 200 triệu cho bên đối tác.',
      priority: 'critical',
      professions: ['ke_toan'],
            actions: [
        {
          id: 'report_immediately',
          label: '📞 Gọi điện thương lượng đòi tiền ngay lập tức',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn lập tức gọi đối tác xin hoàn tiền. Đối tác đồng ý trả lại nhưng quy trình kế toán của họ mất 3 ngày. Bạn phải viết giải trình gửi sếp kế toán trưởng. 😮‍💨',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Gọi đòi tiền đối tác ngay lập tức, viết giải trình mệt mỏi tí cơ mà an toàn sổ sách 😮‍💨"
            },
            {
              "senderId": "pm",
              "message": "Hic chuyển nhầm 200 triệu hú vía chèn ơi, may thương lượng đòi lại được 🌸"
            }
          ]
        },
        {
          id: 'hide_double_payment',
          label: '🤐 Im lặng, tự làm bút toán cấn trừ công nợ sau',
          effects: [
            { stat: 'stress', value: +25 },
            { stat: 'energy', value: -10 },
          ],
          setFlags: { audit_discrepancy: true },
          feedMessage: 'Bạn quyết định giữ im lặng, định cấn trừ vào đợt thanh toán sau của họ. Một khoản chênh lệch lớn phát sinh trên sổ quỹ chưa được giải quyết. 🤫',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Im lặng tự cấn trừ công nợ sau, khoản chênh lệch to đùng treo lơ lửng lo vcl 🤫"
            },
            {
              "senderId": "legal",
              "message": "Giấu lỗi chuyển nhầm 200 triệu kiểm toán sờ gáy là ăn biên bản phạt nặng lắm á nha ⚖️"
            }
          ]
        },
      ],
    },
    {
      id: 'kt_audit_surprise',
      title: 'Cục Thuế gửi thông báo thanh tra đột xuất! 🚨',
      description: 'Đoàn kiểm tra thuế thông báo sẽ đến làm việc tại văn phòng vào sáng mai để rà soát toàn bộ hóa đơn đầu vào đầu ra của công ty.',
      priority: 'critical',
      professions: ['ke_toan'],
            actions: [
        {
          id: 'stay_overtime_audit',
          label: '⚡ Xin ở lại OT rà soát toàn bộ sổ sách (Mệt mỏi)',
          effects: [
            { stat: 'energy', value: -30 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn thức đêm kiểm tra lại toàn bộ hóa đơn chứng từ. Tìm ra một vài lỗi nhỏ và sửa kịp thời trước khi đoàn thanh tra đến. 💪',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "OT rà soát hóa đơn sửa lỗi kịp thời trước khi thanh tra đến, vất vả mà uy tín vcl! 💪"
            },
            {
              "senderId": "pm",
              "message": "Thức đêm rà soát cứu nguy công ty 1 bàn thua trông thấy, giỏi xỉu cưng ơi 🌸"
            }
          ]
        },
        {
          id: 'trigger_inspection',
          label: '🎲 Kệ đi, số liệu thế nào cứ nộp thế đó',
          effects: [
            { stat: 'stress', value: +10 },
          ],
          setFlags: { tax_audit_triggered: true },
          feedMessage: 'Bạn phó mặc cho số phận, nộp toàn bộ tài liệu hiện có. Đoàn thanh tra bắt đầu cắm chốt tại phòng họp rà soát từng dòng. 😰',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Kệ đi nộp đại số liệu thanh tra cắm chốt rà soát từng dòng run bần bật cmnl 😰"
            },
            {
              "senderId": "sep",
              "message": "Thanh tra Thuế đang lục tung phòng họp kìa, lo lắng sốt vó cả văn phòng rồi 🐐🚨"
            }
          ]
        },
      ],
    },
    {
      id: 'kt_tax_inspector_visit',
      title: 'Thanh tra thuế phát hiện sai phạm hóa đơn 👮‍♂️',
      description: 'Thanh tra gõ thước lên bàn: "Tại sao công ty có một loạt hóa đơn ăn uống, tiếp khách khống trị giá hàng chục triệu không có chứng từ đính kèm?"',
      priority: 'critical',
      professions: ['ke_toan'],
            requirements: {
        flags: { has_hidden_error: true, tax_audit_triggered: true },
      },
      actions: [
        {
          id: 'bribe_inspector',
          label: '💸 "Lót tay" phong bì giải quyết êm thấm (Tốn rất nhiều tiền)',
          effects: [
            { stat: 'salary', value: -400000 },
            { stat: 'stress', value: -15 },
          ],
          setFlags: { has_hidden_error: false, tax_audit_triggered: false },
          feedMessage: 'Bạn cắn răng trích ngân quỹ/tiền túi 400k bỏ phong bì gửi riêng đoàn thanh tra. Họ gật gù bỏ qua lỗi và kết luận hồ sơ sạch sẽ. 🤫',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Trích 400k lót tay phong bì giải quyết êm thấm hồ sơ sạch đẹp, tiền đi trước là tiền khôn 🤫"
            },
            {
              "senderId": "sales",
              "message": "Đỉnh quá bạn ơi, xử lý khủng hoảng nhanh gọn lẹ, sòng phẳng giàu sang! 🍻"
            }
          ]
        },
        {
          id: 'accept_tax_penalty',
          label: '😔 Chấp nhận biên bản phạt hành chính thuế',
          effects: [
            { stat: 'salary', value: -300000 },
            { stat: 'stress', value: +25 },
          ],
          feedMessage: 'Công ty bị lập biên bản phạt 300k điểm lương. Sếp tổng cực kỳ nổi giận, lôi bạn ra khiển trách nặng nề trước cuộc họp ban giám đốc. 💀',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Bị phạt 300k điểm lương làm sếp Messi nổi giận khiển trách nặng nề trước ban giám đốc kìa! 🐐🚨"
            },
            {
              "senderId": "hr",
              "message": "Huhu bị phạt thuế nặng quá làm sếp cọc điên luôn, chia buồn nha em 🎸"
            }
          ]
        },
      ],
    },
    {
      id: 'kt_audit_verdict',
      title: 'Kiểm toán nội bộ sờ gáy khoản chênh lệch quỹ 🕵️‍♂️',
      description: 'Kiểm toán phát hiện khoản chênh lệch 200 triệu chuyển khoản nhầm hôm trước chưa được ghi nhận vào sổ sách đúng quy trình kế toán.',
      priority: 'critical',
      professions: ['ke_toan'],
            requirements: {
        flags: { audit_discrepancy: true },
      },
      actions: [
        {
          id: 'admit_write_explanation',
          label: '✍️ Thừa nhận sai sót, viết bản giải trình chi tiết',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +15 },
            { stat: 'salary', value: -150000 },
          ],
          setFlags: { audit_discrepancy: false },
          feedMessage: 'Bạn nhận lỗi, giải thích rõ phương án cấn trừ công nợ. Sếp kế toán phạt bạn 150k vì không báo cáo kịp thời nhưng vụ việc được khép lại. 😮‍',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Nhận lỗi viết giải trình bị phạt 150k điểm chuyên cần, xót ví cơ mà êm xuôi câu chuyện 😮‍💨"
            },
            {
              "senderId": "pm",
              "message": "Thôi nhận lỗi sửa sai là ngoan ngoãn rồi, lần sau cẩn thận hơn nha cưng 🌸"
            }
          ]
        },
        {
          id: 'shift_blame_bank',
          label: '💻 Đổ lỗi hoàn toàn do hệ thống Internet Banking của ngân hàng',
          effects: [
            { stat: 'stress', value: +20 },
            { stat: 'salary', value: -250000 },
          ],
          feedMessage: 'Bạn đổ lỗi cho ngân hàng. Tuy nhiên kiểm toán yêu cầu đối chiếu log giao dịch và phát hiện bạn nói dối. Bạn bị phạt nặng vì thiếu trung thực. 💀',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Đổ lỗi ngân hàng bị kiểm toán vạch trần nói dối phạt 250k, nhục vcl m ơi 💀"
            },
            {
              "senderId": "sep",
              "message": "Thiếu trung thực trong kế toán là sếp Messi ghét nhất đó nha, phạt nặng răn đe! 🐐"
            }
          ]
        },
      ],
    },
    {
      id: 'kt_reconcile_books',
      title: 'Cơ hội dọn dẹp và chuẩn hóa sổ sách 🧹',
      description: 'Chiều nay công việc có chút giãn ra. Đây là thời điểm tốt để bạn rà soát lại các khoản chi phí treo và đối chiếu số dư tiền mặt.',
      priority: 'low',
      professions: ['ke_toan'],
            actions: [
        {
          id: 'do_reconciliation',
          label: '🧹 Dành 2 tiếng đối chiếu chi tiết (Tốn năng lượng)',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: -15 },
          ],
          setFlags: { has_hidden_error: false },
          feedMessage: 'Bạn dọn dẹp sạch sẽ các sai sót nhỏ trong sổ sách. Cảm giác trút bỏ gánh nặng, không còn sợ kiểm toán nữa. 🧘',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Dọn dẹp sạch sẽ sai sót sổ sách hết sợ kiểm toán, trút bỏ gánh nặng sướng vcl 🧘"
            },
            {
              "senderId": "pm",
              "message": "Chăm chỉ chuẩn hóa sổ sách quá trời, cưng chu đáo số 1 phòng kế toán 🌸"
            }
          ]
        },
        {
          id: 'chill_pantry',
          label: '☕ Kệ đi, đi pha cà phê ăn bánh tán gẫu',
          effects: [
            { stat: 'energy', value: +15 },
            { stat: 'stress', value: -10 },
          ],
          feedMessage: 'Bạn chọn nghỉ ngơi. Sổ sách vẫn còn bề bộn lỗi tiềm ẩn nhưng tinh thần sảng khoái hẳn. 🍰',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Kệ mẹ sổ sách đi ăn bánh uống cafe tán gẫu, chill chill trước tính sau 🍰"
            },
            {
              "senderId": "ba",
              "message": "Đi ăn bánh uống nước xả stress là chân ái cuộc đời mà hihi 💍"
            }
          ]
        },
      ],
    },
    {
      id: 'kt_cash_discrepancy',
      title: 'Quỹ tiền mặt tại két văn phòng hụt mất 1 triệu 💸',
      description: 'Cuối ngày kiểm kê két sắt quỹ tiền mặt công ty, bạn phát hiện số tiền thực tế ít hơn sổ sách kế toán đúng 1.000.000 đồng.',
      priority: 'high',
      professions: ['ke_toan'],
            actions: [
        {
          id: 'pay_out_of_pocket',
          label: '💸 Tự bỏ tiền túi đền vào cho khớp két (Tốn tiền)',
          effects: [
            { stat: 'salary', value: -150000 },
            { stat: 'stress', value: -5 },
          ],
          feedMessage: 'Bạn tự rút ví bù vào két sắt. Két khớp số liệu ngay lập tức. Đau ví nhưng giữ được danh dự nghề nghiệp sạch sẽ. 💸',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Tự rút ví đền 1 triệu cho khớp két giữ danh dự nghề nghiệp sạch sẽ, xót xa vcl 💸"
            },
            {
              "senderId": "hr",
              "message": "Mất tiền túi đền két xót ví ghê chèn, đúng là đạo đức nghề nghiệp cao cả 🎸"
            }
          ]
        },
        {
          id: 'report_discrepancy',
          label: '📢 Báo cáo kế toán trưởng lập biên bản chênh lệch',
          effects: [
            { stat: 'stress', value: +15 },
            { stat: 'energy', value: -10 },
          ],
          feedMessage: 'Bạn lập biên bản chênh lệch quỹ. Kế toán trưởng rà soát camera, phát hiện thủ quỹ lấy tiền chi tạm ứng mà quên ghi sổ. 😮‍💨',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Lập biên bản chênh lệch phát hiện thủ quỹ lấy tạm ứng quên ghi sổ, xử lý chuẩn bài 😮‍💨"
            },
            {
              "senderId": "admin",
              "message": "May quá trích xuất camera ra thủ quỹ lấy tiền chứ không phải m mất nha m 👍"
            }
          ]
        },
      ],
    },
    {
      id: 'kt_petty_cash_dispute',
      title: 'Trưởng phòng Sales đòi thanh toán chi phí tiếp khách "lạ" 🍷',
      description: 'Trưởng phòng Sales mang đến hóa đơn ăn uống karaoke trị giá 5 triệu lúc 11 giờ đêm Chủ Nhật: "Bên anh đi tiếp khách hàng VIP Bất Động Sản, em duyệt chi gấp giùm anh nhé."',
      priority: 'medium',
      professions: ['ke_toan'],
            actions: [
        {
          id: 'approve_petty_cash',
          label: '✍️ Ký duyệt chi luôn cho giữ quan hệ phòng ban',
          effects: [
            { stat: 'stress', value: -5 },
            { stat: 'energy', value: -5 },
          ],
          setFlags: { has_hidden_error: true },
          feedMessage: 'Bạn ký duyệt chi. Trưởng phòng Sales vui vẻ bắt tay cám ơn. Tuy nhiên, hóa đơn karaoke nhạy cảm này có thể bị gạt bỏ khi quyết toán thuế. ⚠️',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Ký duyệt chi 5 triệu karaoke nhanh gọn lẹ, anh em Sales mãi iu phòng kế toán! 🌹🍻"
            },
            {
              "senderId": "accounting",
              "message": "Duyệt chi hóa đơn nhạy cảm này thuế nó gạt ra lúc quyết toán là m ăn hành nha m ⚠️"
            }
          ]
        },
        {
          id: 'reject_petty_cash',
          label: '🙅 Từ chối thẳng thừng vì sai quy định tiếp khách',
          effects: [
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn từ chối duyệt chi vì sai khung giờ và thiếu biên bản tiếp khách. Trưởng phòng Sales tức giận bỏ đi và dọa sẽ khiếu nại lên sếp tổng. ⚔️',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Từ chối duyệt chi karaoke làm Trưởng phòng Sales dọa khiếu nại lên sếp tổng kìa m ơi 😡"
            },
            {
              "senderId": "accounting",
              "message": "Từ chối thẳng thừng vì sai quy trình quy chế là chuẩn bài, đéo sợ bố con thằng nào 👍"
            }
          ]
        },
      ],
    },
    {
      id: 'kt_new_regulation',
      title: 'Tổng Cục Thuế thay đổi cách hạch toán hóa đơn điện tử 📄',
      description: 'Một thông tư mới ban hành yêu cầu thay đổi hoàn toàn cách khai báo mã số thuế của hóa đơn điện tử, có hiệu lực ngay trong kỳ báo cáo này.',
      priority: 'high',
      professions: ['ke_toan'],
            actions: [
        {
          id: 'study_regulation',
          label: '📖 Dành nguyên buổi sáng nghiên cứu kỹ thông tư mới',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Bạn đọc thông suốt 50 trang tài liệu hướng dẫn. Hạch toán chính xác tuyệt đối, tránh được rủi ro phạt sau này. 📝',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Dành cả buổi nghiên cứu 50 trang thông tư hạch toán chuẩn chỉnh tránh rủi ro, đỉnh! 📝"
            },
            {
              "senderId": "pm",
              "message": "Chăm chỉ nghiên cứu luật thuế mới xuất sắc xỉu nha cưng 🌸"
            }
          ]
        },
        {
          id: 'ask_external_expert',
          label: '👥 Chi 100k mua khóa học/hỏi chuyên gia ngoài giải thích hộ',
          effects: [
            { stat: 'salary', value: -100000 },
            { stat: 'energy', value: -5 },
          ],
          feedMessage: 'Bạn gọi cho người bạn làm ở công ty kiểm toán Big4 nhờ tóm tắt trong 10 phút. Hiểu bài nhanh chóng, tiết kiệm rất nhiều thời gian gặm nhấm thông tư. 🤝',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Bỏ 100k hỏi bạn Big4 tóm tắt 10 phút thông suốt thông tư, đầu tư thông minh vcl 🤝"
            },
            {
              "senderId": "sales",
              "message": "Đỉnh quá, bỏ tiền mua chất xám tiết kiệm thời gian gặm nhấm thông tư phèn phèn 🌹"
            }
          ]
        },
      ],
    },
    {
      id: 'kt_payroll_day',
      title: 'Ngày tính lương toàn công ty bận rộn 💸',
      description: 'Hôm nay là mùng 5. Bạn phải hoàn thành bảng lương cho 80 nhân sự bao gồm cả tính toán bảo hiểm xã hội, thuế thu nhập cá nhân và các khoản giảm trừ.',
      priority: 'high',
      professions: ['ke_toan'],
            actions: [
        {
          id: 'double_check_payroll',
          label: '👨‍💻 Kiểm tra 3 lần bảng tính trước khi chuyển khoản',
          effects: [
            { stat: 'energy', value: -25 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn tỉ mỉ kiểm tra chéo từng dòng. Phát hiện ra 3 trường hợp bị tính trùng ngày phép. Lương chuyển đi khớp 100% không một lời than phiền. 👏',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Kiểm tra 3 lần bảng lương phát hiện tính trùng phép, cả công ty nhận lương chuẩn đét! 👏"
            },
            {
              "senderId": "pm",
              "message": "Cả công ty nhận lương đúng hạn khớp 100% đéo ai than phiền, cưng xuất sắc 🌸"
            }
          ]
        },
        {
          id: 'rush_payroll',
          label: '⚡ Chạy tự động macro rồi gửi lệnh thanh toán luôn',
          effects: [
            { stat: 'energy', value: -10 },
          ],
          feedMessage: 'Bạn cho chạy nhanh macro rồi ký chuyển lương để kịp giờ tan tầm. Nhân viên nhận lương đúng hẹn nhưng trong lòng bạn vẫn lo nơm nớp sợ tính sai. 😮‍💨',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Đã nhận lương ting ting đúng giờ tan tầm rồi, sướng quá cả nhà ơi nâng cúp! 🐐🏆"
            },
            {
              "senderId": "accounting",
              "message": "Chạy nhanh macro để kịp giờ về lòng lo nơm nớp sợ tính sai bảo hiểm thuế TNCN 😰"
            }
          ]
        },
      ],
    },
    {
      id: 'kt_invoice_rejected',
      title: 'Hóa đơn đỏ bị khách hàng trả lại vì sai một ký tự 📄',
      description: 'Hóa đơn giá trị gia tăng trị giá 100 triệu bị kế toán bên khách hàng gửi trả lại vì phát hiện địa chỉ công ty họ bị thiếu dấu chấm ở tên quận.',
      priority: 'medium',
      professions: ['ke_toan'],
            actions: [
        {
          id: 'cancel_reissue_invoice',
          label: '🛠️ Lập biên bản hủy hóa đơn cũ, xuất hóa đơn mới thay thế',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Bạn thực hiện quy trình hủy và xuất hóa đơn mới theo đúng quy định. Khách hàng nhận được bản đúng và duyệt chi tiền nhanh chóng. 😮‍💨',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Hủy hóa đơn cũ xuất cái mới chuẩn chỉ nhanh gọn, khách duyệt chi tiền vèo vèo 😮‍💨"
            },
            {
              "senderId": "pm",
              "message": "Làm thủ tục thay thế chuẩn quy định nhanh nhẹn xịn sò quá cưng ơi 🌸"
            }
          ]
        },
        {
          id: 'argue_with_client_acct',
          label: '🗣️ Gọi điện cãi lý với bên kế toán khách hàng vì lỗi quá nhỏ',
          effects: [
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn tranh cãi gay gắt nhưng đối tác kiên quyết không nhận. Bạn buộc phải cúi đầu đi hủy và làm lại từ đầu trong bực dọc. 😭',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Cãi nhau vì lỗi dấu chấm quận xong vẫn phải cúi đầu đi hủy làm lại từ đầu cọc điên cmnl 😭"
            },
            {
              "senderId": "sales",
              "message": "Huhu cãi lý với kế toán đối tác làm chậm tiến độ thanh toán của sales kìa m ơi 😭"
            }
          ]
        },
      ],
    },
    {
      id: 'kt_bank_reconciliation_fail',
      title: 'Đối chiếu sao kê ngân hàng cuối tháng bị lệch đúng 5 đồng! 💸',
      description: 'Sao kê ngân hàng và sổ sách kế toán của bạn không khớp nhau. Số tiền lệch cực kỳ nhỏ: đúng 5 đồng Việt Nam, làm bảng cân đối kế toán báo lỗi đỏ.',
      priority: 'high',
      professions: ['ke_toan'],
            actions: [
        {
          id: 'trace_reconciliation_manually',
          label: '🔍 Rà soát thủ công hàng ngàn giao dịch để tìm ra giao dịch làm tròn',
          effects: [
            { stat: 'energy', value: -25 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Sau 2 tiếng căng mắt rà soát, bạn phát hiện ra một giao dịch ngoại tệ bị ngân hàng làm tròn số lẻ. Bạn điều chỉnh bút toán khớp 100%. 🧘',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Rà soát thủ công hàng ngàn giao dịch phát hiện lệch 5 đồng do làm tròn ngoại tệ, nể thực sự! 🧘"
            },
            {
              "senderId": "pm",
              "message": "Căng mắt rà soát vì 5 đồng để khớp sổ 100%, đúng là kế toán ưu tú của năm 🌸"
            }
          ]
        },
        {
          id: 'write_off_discrepancy',
          label: '🩹 Hạch toán luôn vào chi phí khác cho nhanh gọn (Mẹo lười)',
          effects: [
            { stat: 'stress', value: -10 },
          ],
          setFlags: { has_hidden_error: true },
          feedMessage: 'Bạn hạch toán càn vào tài khoản 642 cho nhanh để kịp về. Sổ khớp ngay lập tức nhưng đây là hành vi kế toán không chuẩn chỉ. 🤫',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Hạch toán bừa vào chi phí khác cho khớp sổ đi về, mẹo lười kinh điển kế toán 🤫"
            },
            {
              "senderId": "sep",
              "message": "Sổ sách khớp rồi đi về thôi em ơi, 5 đồng cào bừa vào chi phí khác cũng được haha 🐐"
            }
          ]
        },
      ],
    },
    {
      id: 'kt_auditor_interrogation',
      title: 'Kiểm toán hỏi vặn vẹo về công tác phí của ban giám đốc 🕵️‍♂️',
      description: 'Kiểm toán viên độc lập chỉ vào một tập hóa đơn tiếp khách ở nước ngoài của sếp tổng: "Chứng từ này thiếu quyết định cử đi công tác và lịch trình chi tiết, đề nghị giải trình."',
      priority: 'critical',
      professions: ['ke_toan'],
            actions: [
        {
          id: 'prepare_supporting_docs',
          label: '📂 Chạy đi bổ sung quyết định công tác và ký duyệt bổ sung',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn nhờ HR ký gấp quyết định và trình sếp ký duyệt lịch trình. Hồ sơ được bổ sung đầy đủ, kiểm toán viên gật gù chấp thuận chi phí hợp lệ. 😮‍💨',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Bổ sung quyết định công tác và ký duyệt gấp, hồ sơ sạch đẹp kiểm toán gật gù ngay 😮‍💨"
            },
            {
              "senderId": "hr",
              "message": "May nhờ HR ký gấp quyết định bổ sung chứng từ kịp thời, cứu sếp 1 bàn thua trông thấy 🎸"
            }
          ]
        },
        {
          id: 'defend_aggressively',
          label: '🗣️ Khẳng định chi phí này đã được sếp tổng duyệt từ trước',
          effects: [
            { stat: 'stress', value: +20 },
          ],
          setFlags: { audit_discrepancy: true },
          feedMessage: 'Kiểm toán ghi nhận ý kiến nhưng quyết định gạt chi phí này ra khỏi chi phí hợp lý khi tính thuế. Công ty bị truy thu thuế doanh nghiệp nặng. 💀',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Bị kiểm toán gạt chi phí làm công ty bị truy thu thuế nặng kìa, sếp tổng cọc điên cmnl! 🐐🚨"
            },
            {
              "senderId": "accounting",
              "message": "Cãi cùn với kiểm toán xong bị gạt chi phí truy thu thuế nặng, quả này ăn hành to rồi 💀"
            }
          ]
        },
      ],
    },
    {
      id: 'kt_software_update_fail',
      title: 'Phần mềm kế toán Misa tự động cập nhật bị lỗi đơ 💻',
      description: 'Mở phần mềm lên để nhập liệu hóa đơn thì Misa báo update phiên bản mới. Update chạy đến 99% thì bị đơ cứng, không thể mở lại cơ sở dữ liệu.',
      priority: 'high',
      professions: ['ke_toan'],
            actions: [
        {
          id: 'restore_misa_backup',
          label: '🛠️ Gỡ cài đặt Misa, cài lại bản cũ và import file backup',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Bạn tự tay cài đặt lại và khôi phục từ bản backup tự động tối hôm qua. Dữ liệu được bảo toàn nguyên vẹn, phần mềm chạy lại mượt mà. 🛠️',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Gỡ Misa cài lại restore file backup tối qua chạy mượt mà dữ liệu nguyên vẹn, đỉnh! 🛠️"
            },
            {
              "senderId": "it_dev",
              "message": "Trình IT của kế toán thế này là cướp việc của tụi e rồi, tự cài đặt mượt vcl 👍"
            }
          ]
        },
        {
          id: 'call_misa_support',
          label: '📞 Gọi tổng đài hỗ trợ kỹ thuật của Misa (Chờ đợi)',
          effects: [
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Tổng đài liên tục báo bận do ngày cao điểm. Bạn phải ngồi chờ mất nửa ngày không thể làm việc gì liên quan đến sổ sách. 😭',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Tổng đài Misa báo bận liên tục ngày cao điểm ngồi chờ mất nửa ngày đéo làm được gì 😭"
            },
            {
              "senderId": "pm",
              "message": "Hic phòng kế toán hôm nay tê liệt vì lỗi phần mềm rồi, thương cưng ghê 😭"
            }
          ]
        },
      ],
    },
    {
      id: 'kt_late_payment_penalty',
      title: 'Nghẽn mạng Tổng cục Thuế lúc sát giờ nộp tờ khai 🚨',
      description: 'Hiện tại là 23h55 hạn cuối nộp tờ khai quý. Trang web gdt.gov.vn bị nghẽn mạng nghiêm trọng do hàng vạn doanh nghiệp đang cùng nộp tờ khai.',
      priority: 'critical',
      professions: ['ke_toan'],
            actions: [
        {
          id: 'keep_refreshing_page',
          label: '⚡ Kiên trì F5 trang web và thử lại liên tục đến khi được',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn kiên trì bấm nộp liên tục. Lúc 23h59 hệ thống báo nộp thành công! Bạn thở phào nhẹ nhõm, thoát án phạt trễ hạn. 😮‍💨',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Kiên trì F5 nộp thành công lúc 23h59 thoát án phạt chậm nộp, hú vía cmnl! 😮‍💨"
            },
            {
              "senderId": "pm",
              "message": "Trời ơi 23h59 nộp tờ khai thành công nghẹt thở hơn xem chung kết Cúp C1 luôn á chèn 😂"
            }
          ]
        },
        {
          id: 'give_up_and_sleep',
          label: '🛌 Kệ đi, mai nộp muộn giải trình sau',
          effects: [
            { stat: 'stress', value: +20 },
            { stat: 'salary', value: -150000 },
          ],
          feedMessage: 'Sáng hôm sau nộp được ngay nhưng hệ thống ghi nhận muộn 8 tiếng. Công ty bị phạt chậm nộp 150k. Sếp khiển trách nặng nề vì thiếu chủ động. 💀',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Nộp muộn 8 tiếng bị phạt 150k làm sếp Messi cằn nhằn khiển trách cọc điên kìa 🐐"
            },
            {
              "senderId": "hr",
              "message": "Trừ 150k lương chậm nộp tờ khai xót ví quá em ơi, lần sau đừng ngủ sớm thế nha 😂"
            }
          ]
        },
      ],
    },
    {
      id: 'kt_salary_advance',
      title: 'Nhân sự xin tạm ứng lương đột xuất ngoài quy chế 💸',
      description: 'Một nhân viên phòng vận hành chạy vào khóc lóc xin tạm ứng trước 5 triệu tiền lương vì gia đình có việc khẩn cấp, tuy nhiên quy định công ty không cho phép ứng lương trước ngày 15.',
      priority: 'medium',
      professions: ['ke_toan'],
            actions: [
        {
          id: 'approve_advance_exception',
          label: '✍️ Trình sếp tổng ký duyệt ngoại lệ khẩn cấp',
          effects: [
            { stat: 'energy', value: -10 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Sếp gật đầu đồng ý ký ngoại lệ vì tình huống nhân đạo. Nhân viên vô cùng biết ơn bạn, danh tiếng phòng kế toán được nâng cao. 🤝',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Trình sếp duyệt ngoại lệ khẩn cấp giúp đỡ nhân viên, phòng kế toán ấm áp tình người 🤝"
            },
            {
              "senderId": "hr",
              "message": "Nhân sự vô cùng biết ơn bạn vì sự nhân văn hỗ trợ kịp thời lúc gia đình hoạn nạn 🎸"
            }
          ]
        },
        {
          id: 'reject_advance_regulation',
          label: '🙅 Từ chối thẳng vì sai quy trình và hệ thống không cho phép',
          effects: [
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn kiên quyết từ chối theo đúng quy chế. Nhân viên buồn bã bỏ đi. Bạn giữ vững kỷ luật kế toán nhưng trong lòng có chút áy náy. 🧘',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Từ chối thẳng thừng theo đúng quy chế kỷ luật sắt đá kế toán, áy náy nhẹ 🧘"
            },
            {
              "senderId": "ba",
              "message": "Giữ vững kỷ luật quy trình là an toàn nhất cho m rồi, dĩ hòa vi quý hihi 💍"
            }
          ]
        },
      ],
    },
    {
      id: 'kt_lost_receipt',
      title: 'Rắc rối lớn: Làm mất hóa đơn tiếp khách VIP của sếp tổng 😱',
      description: 'Bạn tìm khắp nơi nhưng không thấy hóa đơn ăn uống trị giá 10 triệu của sếp tổng tiếp khách nước ngoài tuần trước. Hóa đơn này sếp đưa trực tiếp cho bạn.',
      priority: 'critical',
      professions: ['ke_toan'],
            actions: [
        {
          id: 'contact_restaurant_copy',
          label: '📞 Liên hệ nhà hàng xin xuất lại bản sao hóa đơn liên 2',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +10 },
            { stat: 'salary', value: -50000 },
          ],
          feedMessage: 'Nhà hàng đồng ý hỗ trợ trích lục sao kê và xuất lại bản sao, nhưng bắt bạn đóng phí dịch vụ 50k tiền mặt. Hóa đơn được cứu vớt! 😮‍💨',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Bỏ 50k xin trích lục hóa đơn liên 2 cứu sếp 1 bàn thua trông thấy, thông minh vcl 😮‍💨"
            },
            {
              "senderId": "sep",
              "message": "Hên quá trích lục được hóa đơn bản sao 10 triệu, sếp Messi khen nức nở nha! 🐐🏆"
            }
          ]
        },
        {
          id: 'confess_to_boss_lost',
          label: '😔 Dũng cảm thừa nhận làm mất với sếp tổng',
          effects: [
            { stat: 'stress', value: +25 },
            { stat: 'salary', value: -200000 },
          ],
          feedMessage: 'Bạn nhận lỗi với sếp. Sếp mắng bạn một trận lôi đình vì làm việc cẩu thả và phạt bạn trừ 200k điểm lương. 💀',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Làm mất hóa đơn sếp đưa tận tay phạt trừ 200k điểm lương tội cẩu thả nhé! 🐐🚨"
            },
            {
              "senderId": "hr",
              "message": "Sếp nổi trận lôi đình trừ lương 200k xót xa quá em ơi, rút kinh nghiệm nha 🎸"
            }
          ]
        },
      ],
    },
    {
      id: 'kt_tax_calculation_change',
      title: 'Thay đổi mức giảm trừ gia cảnh thuế TNCN phút chót 🔄',
      description: 'Tổng cục Thuế vừa thông qua nghị quyết mới điều chỉnh mức giảm trừ gia cảnh cá nhân tăng lên. Bảng lương tháng này phải được tính toán lại toàn bộ.',
      priority: 'high',
      professions: ['ke_toan'],
            actions: [
        {
          id: 'recalc_taxes_manually',
          label: '👨‍💻 Cắm đầu viết lại công thức tính thuế TNCN trên Excel',
          effects: [
            { stat: 'energy', value: -25 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn cẩn thận update bảng tính Excel theo thông tư mới. Mọi nhân viên đều được giảm nhẹ tiền thuế và hoan nghênh bạn. 👏',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Cắm đầu sửa công thức Excel tính lại thuế TNCN chuẩn đét nhân viên hoan nghênh nức nở 👏"
            },
            {
              "senderId": "pm",
              "message": "Cả công ty được giảm nhẹ tiền thuế tháng này thích ghê chèn, kế toán uy tín xỉu 🌸"
            }
          ]
        },
        {
          id: 'pay_old_rate_adjust_later',
          label: '🩹 Cứ tính theo mức cũ rồi sang tháng sau làm quyết toán bù trừ',
          effects: [
            { stat: 'stress', value: +10 },
          ],
          setFlags: { has_hidden_error: true },
          feedMessage: 'Bạn quyết định giữ nguyên bảng lương cũ để chuyển khoản cho nhanh. Bạn trút được việc hôm nay nhưng nợ một đống sổ sách bù trừ tháng sau. 🤫',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Tính theo mức cũ chuyển khoản cho nhanh để nợ đống sổ sách quyết toán tháng sau, lười vcl 🤫"
            },
            {
              "senderId": "sep",
              "message": "Thôi chuyển lương nhanh gọn cho cả nhà nâng cúp rồi tháng sau quyết toán bù trừ cũng được em 🐐"
            }
          ]
        },
      ],
    },
    {
      id: 'kt_excel_link_broken',
      title: 'Đứt liên kết dữ liệu giữa các file Excel báo cáo (Broken Links) 💀',
      description: 'Khi tổng hợp số liệu, các file Excel báo cáo doanh thu từ phòng Sales và chi phí phòng Marketing bị lỗi liên kết ngoài làm bảng cân đối lệch hẳn.',
      priority: 'high',
      professions: ['ke_toan'],
            actions: [
        {
          id: 'relink_excel_manually',
          label: '🛠️ Mở chức năng Edit Links, trỏ tay lại đường dẫn chuẩn',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Bạn trỏ lại toàn bộ link file gốc. Số liệu tự động cập nhật khớp từng đồng xu. Báo cáo hoàn hảo sẵn sàng trình sếp. 🛠️',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Trỏ lại đường dẫn chuẩn Edit Links số liệu tự cập nhật khớp từng đồng xu, đỉnh! 🛠️"
            },
            {
              "senderId": "pm",
              "message": "Báo cáo hoàn hảo sẵn sàng trình sếp rồi cưng ơi, cưng làm việc cẩn thận quá 🌸"
            }
          ]
        },
        {
          id: 'type_values_hardcode',
          label: '⚡ Copy cứng số liệu (Paste Values) đè lên công thức cho nhanh',
          effects: [
            { stat: 'energy', value: -10 },
          ],
          setFlags: { has_hidden_error: true },
          feedMessage: 'Bạn copy đè số cứng vào. Nhanh gọn nhưng file mất đi tính tự động liên kết. Nếu bên Sales cập nhật lại số, file của bạn sẽ bị sai lệch. ⚠️',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Hardcode copy đè số cứng mất tính liên kết tự động, Sales cập nhật số mới là m lệch sổ nha ⚠️"
            },
            {
              "senderId": "it_dev",
              "message": "Đúng là lười biếng hardcode phá nát công thức Excel huyền thoại, cẩn thận ăn hành m ơi 😂"
            }
          ]
        },
      ],
    },
    {
      id: 'kt_ar_aging_90days',
      title: 'Công nợ phải thu (AR) quá hạn 90 ngày — khách hàng bặt vô âm tín 📬',
      description: 'Khi lọc báo cáo AR Aging, bạn phát hiện một khách hàng doanh nghiệp lớn đang nợ 450 triệu đã quá hạn thanh toán 90 ngày và không trả lời cuộc gọi, email nào.',
      priority: 'critical',
      professions: ['ke_toan'],
      actions: [
        {
          id: 'kt_ar_aging_a',
          label: '📞 Lập bộ phận thu hồi nợ chính thức, gửi thông báo nợ quá hạn có ký xác nhận',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn gửi công văn đòi nợ chính thức có dấu đỏ. Khách hàng cuối cùng phản hồi và cam kết thanh toán theo lịch trả góp. AR Aging report sạch dần. 📬',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Gửi công văn đòi nợ có dấu đỏ khách cam kết trả góp ngay, AR Aging report sạch đẹp 📬"
            },
            {
              "senderId": "sales",
              "message": "Đòi nợ 450 triệu quá hạn thành công cứu nguy dòng tiền phòng sales luôn, đỉnh chóp bạn ơi 🌹"
            }
          ]
        },
        {
          id: 'kt_ar_aging_b',
          label: '🩹 Trích lập dự phòng nợ khó đòi 100% để đẩy chi phí giảm thuế TNDN',
          effects: [
            { stat: 'stress', value: +20 },
            { stat: 'salary', value: -100000 },
          ],
          setFlags: { audit_discrepancy: true },
          feedMessage: 'Bạn trích lập dự phòng toàn bộ khoản nợ. Chi phí quý tăng vọt, sếp tổng choáng khi nhìn P&L và gọi bạn vào giải trình ngay lập tức. 💸',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Trích lập dự phòng làm P&L quý này âm nặng gọi lên giải trình gấp nhé! 🐐🚨"
            },
            {
              "senderId": "accounting",
              "message": "Đẩy chi phí giảm thuế TNDN nhưng sếp tổng nhìn P&L cọc điên lôi lên phòng mắng kìa 💀"
            }
          ]
        },
      ],
    },
    {
      id: 'kt_ap_duplicate_payment',
      title: 'Phát hiện thanh toán trùng (Duplicate AP Payment) cho nhà cung cấp 💸',
      description: 'Khi đối chiếu sổ AP cuối tháng, bạn phát hiện một invoice 180 triệu của nhà cung cấp đã bị xử lý thanh toán 2 lần vào 2 ngày khác nhau do lỗi nhập liệu trùng mã invoice.',
      priority: 'critical',
      professions: ['ke_toan'],
      actions: [
        {
          id: 'kt_ap_dup_a',
          label: '📞 Liên hệ ngay nhà cung cấp yêu cầu hoàn trả khoản thanh toán thừa',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Nhà cung cấp xác nhận nhận thừa tiền và đồng ý cấn trừ vào invoice lần sau. Bạn lập bút toán điều chỉnh AP, số liệu cân bằng trở lại. 😮‍💨',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Đòi hoàn tiền thừa cấn trừ invoice sau thành công, lập bút toán điều chỉnh AP chuẩn 😮‍💨"
            },
            {
              "senderId": "pm",
              "message": "May quá đòi lại được 180 triệu thanh toán thừa nhanh gọn lẹ, cưng uy tín xỉu 🌸"
            }
          ]
        },
        {
          id: 'kt_ap_dup_b',
          label: '🤐 Để im đó, tháng sau nhà cung cấp sẽ tự phát hiện rồi báo lại',
          effects: [
            { stat: 'stress', value: +25 },
          ],
          setFlags: { audit_discrepancy: true },
          feedMessage: 'Bạn bỏ qua. 3 tuần sau kiểm toán nội bộ cắt ra con số chênh lệch 180 triệu khi đối chiếu AP Ledger và hỏi tại sao không có biên bản xử lý. 💀',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Giấu lỗi để im tháng sau kiểm toán nội bộ cắt chênh lệch 180 triệu hỏi thăm run bần bật cmnl 💀"
            },
            {
              "senderId": "legal",
              "message": "Không báo cáo biên bản xử lý thanh toán trùng bị kiểm toán sờ gáy ăn hành ngập mặt nha ⚖️"
            }
          ]
        },
      ],
    },
    {
      id: 'kt_vat_refund_rejected',
      title: 'Cục Thuế từ chối khấu trừ VAT đầu vào của lô hàng nhập khẩu 🚫',
      description: 'Hồ sơ hoàn thuế VAT 120 triệu bị cơ quan thuế trả về với lý do: "Hóa đơn đầu vào không đúng mã số thuế người bán, không đủ điều kiện khấu trừ theo Thông tư 219."',
      priority: 'critical',
      professions: ['ke_toan'],
      actions: [
        {
          id: 'kt_vat_a',
          label: '📂 Liên hệ nhà cung cấp yêu cầu xuất lại hóa đơn đúng thông tin, bổ sung hồ sơ',
          effects: [
            { stat: 'energy', value: -25 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Nhà cung cấp xác nhận sai và xuất hóa đơn thay thế. Bạn nộp lại bộ hồ sơ hoàn thuế. Cơ quan thuế chấp nhận sau 2 tuần. 🧾',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Liên hệ đổi hóa đơn nộp lại hồ sơ hoàn thuế VAT 120 triệu thành công sau 2 tuần, giỏi! 🧾"
            },
            {
              "senderId": "pm",
              "message": "Cơ quan thuế chấp nhận hoàn thuế rồi cưng ơi, lấy lại 120 triệu xuất sắc luôn 🌸"
            }
          ]
        },
        {
          id: 'kt_vat_b',
          label: '🩹 Bỏ qua khoản VAT đó, hạch toán vào chi phí không được khấu trừ',
          effects: [
            { stat: 'salary', value: -120000 },
            { stat: 'stress', value: -10 },
          ],
          feedMessage: 'Bạn hạch toán 120 triệu vào chi phí không hợp lệ. Thuế TNDN tăng lên, sếp bực bội nhưng không muốn chạy thủ tục hành chính dài dòng. 💸',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Hạch toán chi phí không hợp lệ làm chịu phạt tăng thuế nhưng sếp duyệt cho qua chuyện 🐐"
            },
            {
              "senderId": "accounting",
              "message": "Trừ 120k điểm lương xót ví quá m ơi, hạch toán càn chi phí không được khấu trừ phèn ghê 😂"
            }
          ]
        },
      ],
    },
    {
      id: 'kt_pl_report_pressure',
      title: 'Sếp yêu cầu điều chỉnh P&L trước khi trình cổ đông 📊',
      description: '"Doanh thu quý này nhìn yếu quá, em chuyển một phần doanh thu quý sau lên quý này và đẩy chi phí marketing xuống đi, anh cần con số đẹp cho hội đồng cổ đông tuần tới."',
      priority: 'high',
      professions: ['ke_toan'],
      actions: [
        {
          id: 'kt_pl_a',
          label: '📊 Từ chối thẳng và trình bày rủi ro pháp lý gian lận báo cáo tài chính',
          effects: [
            { stat: 'stress', value: +25 },
            { stat: 'salary', value: -150000 },
          ],
          feedMessage: 'Bạn từ chối thẳng thắng và trình bày rõ rủi ro vi phạm Luật Kế toán. Sếp tức giận nhưng quyết định không ép thêm sau khi bạn đề cập "hậu quả pháp lý". Uy tín bạn tụt trong mắt sếp. 📊',
          chatReplies: [
            {
              "senderId": "legal",
              "message": "Từ chối thẳng thừng rủi ro gian nận báo cáo tài chính là chuẩn luật kế toán, an toàn tuyệt đối ⚖️"
            },
            {
              "senderId": "sep",
              "message": "Sếp hơi phật ý vì từ chối làm số đẹp cơ mà tránh được hậu quả pháp lý nghiêm trọng 🐐"
            }
          ]
        },
        {
          id: 'kt_pl_b',
          label: '🤝 "Tối ưu hóa" nhẹ nhàng bằng cách thay đổi timing ghi nhận doanh thu',
          effects: [
            { stat: 'stress', value: +15 },
            { stat: 'salary', value: +200000 },
          ],
          setFlags: { has_hidden_error: true, boss_pleased: true },
          feedMessage: 'Bạn khéo léo điều chỉnh timing ghi nhận doanh thu hợp đồng dài hạn. P&L trông đẹp hơn. Sếp thưởng nóng 200k nhưng nếu bị kiểm toán bới ra thì bạn chịu hoàn toàn. 💀',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Timing ghi nhận doanh thu xuất sắc báo cáo P&L đẹp đẽ thưởng nóng 200k nâng cúp nha! 🐐🏆"
            },
            {
              "senderId": "accounting",
              "message": "Nhận 200k thưởng nóng nhưng kiểm toán độc lập bới ra timing doanh thu lệch là m ăn hành to 💀"
            }
          ]
        },
      ],
    },
    {
      id: 'kt_cashflow_crisis',
      title: 'Báo cáo Cash Flow tháng này âm nặng — sếp hoảng loạn 📉',
      description: 'Bạn vừa hoàn thành báo cáo Lưu chuyển tiền tệ: Operating Cash Flow âm 800 triệu do khách hàng trả chậm trong khi AP phải trả đúng hạn. Sếp tổng đang hỏi nguyên nhân.',
      priority: 'critical',
      professions: ['ke_toan'],
      actions: [
        {
          id: 'kt_cf_a',
          label: '📋 Phân tích chi tiết nguyên nhân và đề xuất kế hoạch tăng tốc thu hồi AR',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn lập bảng phân tích AR Aging kèm kế hoạch thu hồi nợ chi tiết theo từng khách hàng. Sếp bình tĩnh lại và giao bạn dẫn đầu nhóm thu hồi nợ. 📊',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Lập bảng phân tích AR Aging kế hoạch thu hồi nợ chi tiết làm sếp bình tĩnh khen ngợi ngay 🐐"
            },
            {
              "senderId": "sales",
              "message": "Kế hoạch thu hồi nợ chi tiết gánh còng gáy sales luôn, anh em sales phối hợp nhiệt tình 🌹"
            }
          ]
        },
        {
          id: 'kt_cf_b',
          label: '🩹 Đề xuất vay ngắn hạn ngân hàng để bù đắp thiếu hụt tiền mặt tạm thời',
          effects: [
            { stat: 'stress', value: +20 },
            { stat: 'salary', value: -150000 },
          ],
          feedMessage: 'Sếp đồng ý vay vốn ngắn hạn lãi suất cao. Tiền về đủ trả AP nhưng lãi vay phát sinh thêm 150k điểm lương bào mòn lợi nhuận quý. 💸',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Duyệt vay ngắn hạn bù tiền mặt cơ mà lãi vay bào mòn lợi nhuận trừ 150k lương nhé 🐐"
            },
            {
              "senderId": "accounting",
              "message": "Vay ngân hàng lãi suất cao bị trừ 150k điểm lương xót ví, cơ mà tiền mặt đủ trả AP 😮‍💨"
            }
          ]
        },
      ],
    },
    {
      id: 'kt_month_end_close',
      title: 'Deadline đóng sổ cuối tháng — dữ liệu từ các phòng ban chưa về đủ 🕐',
      description: 'Hôm nay 31/tháng, 17h là deadline close sổ để lập báo cáo nội bộ. Phòng Sales chưa nộp bảng doanh thu tuần cuối, phòng Vận hành chưa xác nhận chi phí logistics.',
      priority: 'critical',
      professions: ['ke_toan'],
      actions: [
        {
          id: 'kt_close_a',
          label: '⚡ Gọi điện thẳng cho trưởng các phòng yêu cầu nộp số liệu khẩn trong 30 phút',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +20 },
          ],
          feedMessage: 'Bạn làm già lên mạnh mẽ. Dữ liệu về đủ lúc 16h55. Bạn đóng sổ kịp deadline chỉ nhỉnh hơn 5 phút. Căng thẳng tột độ nhưng chính xác. ⏱️',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Đòi nợ số liệu gắt gao close sổ kịp deadline lúc 16h55 nghẹt thở vcl cưng ơi ⏱️"
            },
            {
              "senderId": "pm",
              "message": "Căng thẳng tột độ cơ mà close sổ chính xác kịp giờ nộp sếp tổng, cưng đỉnh chóp 🌸"
            }
          ]
        },
        {
          id: 'kt_close_b',
          label: '📐 Dùng Accrual — tự ước tính chi phí chưa về bằng số liệu tháng trước',
          effects: [
            { stat: 'stress', value: +5 },
            { stat: 'energy', value: -10 },
          ],
          setFlags: { has_hidden_error: true },
          feedMessage: 'Bạn áp dụng accrual accounting để ước tính. Báo cáo đóng đúng hạn nhưng số liệu ước tính sẽ cần điều chỉnh khi thực tế về, có thể gây lệch báo cáo tháng sau. 🤫',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Accrual ước tính chi phí cho nhanh tháng sau lệch số lại ngồi sửa còng cả gáy cmnl 🤫"
            },
            {
              "senderId": "sales",
              "message": "May quá sales nộp muộn được kế toán accrual gánh hộ, iu phòng kế toán xỉu 🌹"
            }
          ]
        },
      ],
    },
    {
      id: 'kt_ap_vendor_threat',
      title: 'Nhà cung cấp nguyên vật liệu dọa ngừng giao hàng vì AP quá hạn 60 ngày ⚠️',
      description: '"Nếu không thanh toán 300 triệu công nợ quá hạn trong 24 giờ, chúng tôi sẽ tạm dừng toàn bộ hợp đồng cung cấp." — Email vừa bắn vào inbox lúc 8h sáng.',
      priority: 'critical',
      professions: ['ke_toan'],
      actions: [
        {
          id: 'kt_ap_vendor_a',
          label: '💸 Xử lý khẩn cấp lệnh thanh toán AP ngay hôm nay, trình sếp duyệt nhanh',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn chạy nước rút trình sếp duyệt lệnh chi. Tiền chuyển đi lúc 14h. Nhà cung cấp xác nhận tiếp tục giao hàng. Công ty tránh được đứt chuỗi cung ứng. ✅',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Trình sếp duyệt lệnh chi 300 triệu khẩn cấp lúc 14h tránh đứt chuỗi cung ứng, giỏi! ✅"
            },
            {
              "senderId": "pm",
              "message": "Hên quá chuyển khoản kịp thời nhà cung cấp tiếp tục giao hàng cứu nguy sản xuất 🌸"
            }
          ]
        },
        {
          id: 'kt_ap_vendor_b',
          label: '🗣️ Thương lượng gia hạn thêm 15 ngày bằng cách cam kết trả lãi chậm nộp',
          effects: [
            { stat: 'stress', value: +15 },
            { stat: 'salary', value: -80000 },
          ],
          feedMessage: 'Bạn khéo léo thương lượng gia hạn thêm 15 ngày với điều kiện trả thêm 2% lãi chậm nộp. Nhà cung cấp đồng ý. Bạn có thêm thời gian nhưng tốn 80k điểm lương tiền lãi. 😮‍💨',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Thương lượng gia hạn thêm 15 ngày tốn 80k điểm lương tiền lãi chậm nộp chậm chi 😮‍💨"
            },
            {
              "senderId": "sales",
              "message": "May quá gia hạn thành công hàng vẫn về đều đặn, đỡ lo đứt nguồn hàng 🌹"
            }
          ]
        },
      ],
    },
    {
      id: 'kt_tndn_finalization',
      title: 'Quyết toán thuế TNDN — phát hiện chi phí không hợp lệ 3 tỷ đồng 🔍',
      description: 'Khi rà soát hồ sơ quyết toán thuế Thu nhập doanh nghiệp, bạn phát hiện 3 tỷ chi phí tiếp khách, quảng cáo bị vượt trần 15% và không có đủ chứng từ theo quy định.',
      priority: 'critical',
      professions: ['ke_toan'],
      actions: [
        {
          id: 'kt_tndn_a',
          label: '📂 Loại bỏ đúng phần chi phí vượt trần, tính lại thuế TNDN phải nộp',
          effects: [
            { stat: 'energy', value: -25 },
            { stat: 'salary', value: -200000 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn điều chỉnh lại chính xác theo quy định. Thuế TNDN phải nộp thêm, công ty tốn thêm 200k điểm lương. Nhưng hồ sơ minh bạch, tránh được rủi ro phạt gấp đôi sau kiểm tra. 📊',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Loại bỏ chi phí vượt trần đóng thêm thuế tránh phạt nặng sau này, hồ sơ minh bạch 👍"
            },
            {
              "senderId": "sep",
              "message": "Đóng thêm thuế trừ 200k lương nha em cơ mà hồ sơ sạch sẽ thanh tra đéo bới lông tìm vết được 🐐"
            }
          ]
        },
        {
          id: 'kt_tndn_b',
          label: '🩹 Phân bổ lại chi phí vào các mục khác để lách trần 15%',
          effects: [
            { stat: 'stress', value: +25 },
          ],
          setFlags: { has_hidden_error: true, tax_audit_triggered: true },
          feedMessage: 'Bạn phân bổ lại chi phí sang tài khoản khác. Tạm thời qua mặt được. Nhưng nếu cơ quan thuế yêu cầu đối chiếu chi tiết tài khoản này, rủi ro rất lớn. 💀',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Phân bổ lách trần 3 tỷ rủi ro thanh tra Thuế bới ra phạt gấp đôi run cầm cập cmnl 💀"
            },
            {
              "senderId": "legal",
              "message": "Trời đất lách chi phí tiếp khách 3 tỷ thanh tra thuế sờ gáy là đi tong cả sự nghiệp nha ⚖️"
            }
          ]
        },
      ],
    },
    {
      id: 'kt_intercompany_mismatch',
      title: 'Giao dịch nội bộ (Intercompany) không khớp giữa công ty mẹ và con 🔄',
      description: 'Khi hợp nhất báo cáo tài chính tập đoàn, số dư Intercompany giữa công ty mẹ và công ty con lệch nhau 250 triệu. Cả hai bên đều khẳng định số liệu của mình là đúng.',
      priority: 'high',
      professions: ['ke_toan'],
      actions: [
        {
          id: 'kt_ic_a',
          label: '🔍 Tổ chức họp đối chiếu số liệu trực tiếp với kế toán công ty con',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Sau 2 tiếng đối chiếu từng giao dịch, phát hiện công ty con ghi nhận một khoản phí dịch vụ nội bộ sai kỳ kế toán. Bút toán điều chỉnh được thực hiện, số liệu khớp hoàn toàn. ✅',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Đối chiếu trực tiếp phát hiện công ty con ghi sai kỳ kế toán sửa khớp 100%, chuyên nghiệp! ✅"
            },
            {
              "senderId": "pm",
              "message": "Khớp số intercompany hoàn hảo rồi cưng ơi, cưng làm việc kỹ lưỡng số 1 🌸"
            }
          ]
        },
        {
          id: 'kt_ic_b',
          label: '🩹 Ghi chú khoản lệch vào mục "Chênh lệch đang xử lý" và đẩy sang tháng sau',
          effects: [
            { stat: 'stress', value: +20 },
          ],
          setFlags: { audit_discrepancy: true },
          feedMessage: 'Bạn để đó trong mục tạm thời. Kiểm toán độc lập phát hiện khoản "chênh lệch đang xử lý" 250 triệu này và đặt câu hỏi rất khó chịu trong buổi meeting. 😰',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Đẩy chênh lệch sang tháng sau bị kiểm toán đặt câu hỏi khó chịu meeting câm nín cmnl 😰"
            },
            {
              "senderId": "sep",
              "message": "Để chênh lệch intercompany 250 triệu lơ lửng kiểm toán sờ gáy hỏi han ú ớ vậy em 🐐"
            }
          ]
        },
      ],
    },
    {
      id: 'kt_tncn_wrong_pid',
      title: 'Phát hiện sai mã số thuế TNCN của 12 nhân viên — kê khai đã nộp 😱',
      description: 'Khi đối chiếu với cơ quan thuế, bạn phát hiện 12 nhân viên đã đăng ký mã số thuế cá nhân sai hoặc chưa kích hoạt, toàn bộ số tiền thuế TNCN khấu trừ đã nộp bị treo chờ xử lý.',
      priority: 'high',
      professions: ['ke_toan'],
      actions: [
        {
          id: 'kt_tncn_a',
          label: '📋 Thu thập lại toàn bộ MST đúng của 12 nhân viên và nộp điều chỉnh tờ khai',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn kiên nhẫn thu thập MST chính xác từ từng người và làm hồ sơ điều chỉnh. Cơ quan thuế xác nhận xử lý xong sau 5 ngày làm việc. Sổ sách thuế sạch đẹp. 📋',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Thu thập lại MST đúng nộp tờ khai điều chỉnh cơ quan thuế xử lý sạch đẹp sau 5 ngày 📋"
            },
            {
              "senderId": "hr",
              "message": "Kế toán kiên nhẫn thu thập sửa MST cho nhân sự chu đáo quá trời luôn, iu ghê 🎸"
            }
          ]
        },
        {
          id: 'kt_tncn_b',
          label: '⏳ Gửi email nhắc nhở nhân viên tự đi cập nhật MST với cơ quan thuế',
          effects: [
            { stat: 'stress', value: +10 },
          ],
          setFlags: { has_hidden_error: true },
          feedMessage: 'Bạn đẩy việc về cho nhân viên. Nhiều người bận quên không đi. Khoản thuế TNCN treo tiếp tục tích lũy qua các tháng và bắt đầu gây vấn đề khi quyết toán cuối năm. 🤫',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Đẩy việc cập nhật MST cho nhân viên tự làm họ quên mất tích lũy treo nợ cuối năm ăn hành 🤫"
            },
            {
              "senderId": "hr",
              "message": "Nhân sự bận rộn quên đi cập nhật MST làm cuối năm quyết toán thuế TNCN lỗi tùm lum cưng ơi 😂"
            }
          ]
        },
      ],
    },
  ],
}

export default keToanPack
