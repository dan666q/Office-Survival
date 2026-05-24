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
      name: 'Excel thần thánh',
      description: 'Template xịn với macro tự động. Công việc 3 tiếng giờ còn 30 phút.',
      cost: 400000,
      icon: '📗',
      duration: 'day',
      effects: [
        { stat: 'energy', value: 20 },
        { stat: 'stress', value: -15 },
      ],
    },
    {
      id: 'may_tinh_bo_tui',
      name: 'Máy tính Casio',
      description: 'Không bao giờ lag. Không bao giờ crash. Pin dùng 10 năm. Huyền thoại.',
      cost: 200000,
      icon: '🔢',
      duration: 'permanent',
      effects: [
        { stat: 'stress', value: -10 },
        { stat: 'energy', value: 5 },
      ],
    },
    {
      id: 'ca_phe_den',
      name: 'Cà phê đen đặc',
      description: 'Không đường. Không sữa. Chỉ có caffeine và sự tuyệt vọng.',
      cost: 100000,
      icon: '⚫',
      duration: 'timeslot',
      effects: [
        { stat: 'energy', value: 25 },
        { stat: 'stress', value: 8 },
      ],
    },
    {
      id: 'ke_toan_truong_review',
      name: 'Kế toán trưởng review',
      description: 'Sếp kế toán check lại trước khi nộp. Lỗi giảm 90%.',
      cost: 500000,
      icon: '👨‍💼',
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
        },
        {
          id: 'refuse_optimize',
          label: '🙅 Từ chối khéo vì rủi ro kiểm toán rất cao',
          effects: [
            { stat: 'stress', value: +20 },
            { stat: 'salary', value: -100000 },
          ],
          feedMessage: 'Bạn kiên quyết từ chối và cảnh báo rủi ro pháp lý. Sếp sa sầm nét mặt, hủy đề xuất và đánh giá bạn "thiếu linh hoạt trong xử lý công việc". 😭',
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
        },
        {
          id: 'trigger_inspection',
          label: '🎲 Kệ đi, số liệu thế nào cứ nộp thế đó',
          effects: [
            { stat: 'stress', value: +10 },
          ],
          setFlags: { tax_audit_triggered: true },
          feedMessage: 'Bạn phó mặc cho số phận, nộp toàn bộ tài liệu hiện có. Đoàn thanh tra bắt đầu cắm chốt tại phòng họp rà soát từng dòng. 😰',
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
        },
        {
          id: 'accept_tax_penalty',
          label: '😔 Chấp nhận biên bản phạt hành chính thuế',
          effects: [
            { stat: 'salary', value: -300000 },
            { stat: 'stress', value: +25 },
          ],
          feedMessage: 'Công ty bị lập biên bản phạt 300k điểm lương. Sếp tổng cực kỳ nổi giận, lôi bạn ra khiển trách nặng nề trước cuộc họp ban giám đốc. 💀',
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
        },
        {
          id: 'shift_blame_bank',
          label: '💻 Đổ lỗi hoàn toàn do hệ thống Internet Banking của ngân hàng',
          effects: [
            { stat: 'stress', value: +20 },
            { stat: 'salary', value: -250000 },
          ],
          feedMessage: 'Bạn đổ lỗi cho ngân hàng. Tuy nhiên kiểm toán yêu cầu đối chiếu log giao dịch và phát hiện bạn nói dối. Bạn bị phạt nặng vì thiếu trung thực. 💀',
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
        },
        {
          id: 'chill_pantry',
          label: '☕ Kệ đi, đi pha cà phê ăn bánh tán gẫu',
          effects: [
            { stat: 'energy', value: +15 },
            { stat: 'stress', value: -10 },
          ],
          feedMessage: 'Bạn chọn nghỉ ngơi. Sổ sách vẫn còn bề bộn lỗi tiềm ẩn nhưng tinh thần sảng khoái hẳn. 🍰',
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
        },
        {
          id: 'report_discrepancy',
          label: '📢 Báo cáo kế toán trưởng lập biên bản chênh lệch',
          effects: [
            { stat: 'stress', value: +15 },
            { stat: 'energy', value: -10 },
          ],
          feedMessage: 'Bạn lập biên bản chênh lệch quỹ. Kế toán trưởng rà soát camera, phát hiện thủ quỹ lấy tiền chi tạm ứng mà quên ghi sổ. 😮‍💨',
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
        },
        {
          id: 'reject_petty_cash',
          label: '🙅 Từ chối thẳng thừng vì sai quy định tiếp khách',
          effects: [
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn từ chối duyệt chi vì sai khung giờ và thiếu biên bản tiếp khách. Trưởng phòng Sales tức giận bỏ đi và dọa sẽ khiếu nại lên sếp tổng. ⚔️',
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
        },
        {
          id: 'ask_external_expert',
          label: '👥 Chi 100k mua khóa học/hỏi chuyên gia ngoài giải thích hộ',
          effects: [
            { stat: 'salary', value: -100000 },
            { stat: 'energy', value: -5 },
          ],
          feedMessage: 'Bạn gọi cho người bạn làm ở công ty kiểm toán Big4 nhờ tóm tắt trong 10 phút. Hiểu bài nhanh chóng, tiết kiệm rất nhiều thời gian gặm nhấm thông tư. 🤝',
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
        },
        {
          id: 'rush_payroll',
          label: '⚡ Chạy tự động macro rồi gửi lệnh thanh toán luôn',
          effects: [
            { stat: 'energy', value: -10 },
          ],
          feedMessage: 'Bạn cho chạy nhanh macro rồi ký chuyển lương để kịp giờ tan tầm. Nhân viên nhận lương đúng hẹn nhưng trong lòng bạn vẫn lo nơm nớp sợ tính sai. 😮‍💨',
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
        },
        {
          id: 'argue_with_client_acct',
          label: '🗣️ Gọi điện cãi lý với bên kế toán khách hàng vì lỗi quá nhỏ',
          effects: [
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn tranh cãi gay gắt nhưng đối tác kiên quyết không nhận. Bạn buộc phải cúi đầu đi hủy và làm lại từ đầu trong bực dọc. 😭',
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
        },
        {
          id: 'write_off_discrepancy',
          label: '🩹 Hạch toán luôn vào chi phí khác cho nhanh gọn (Mẹo lười)',
          effects: [
            { stat: 'stress', value: -10 },
          ],
          setFlags: { has_hidden_error: true },
          feedMessage: 'Bạn hạch toán càn vào tài khoản 642 cho nhanh để kịp về. Sổ khớp ngay lập tức nhưng đây là hành vi kế toán không chuẩn chỉ. 🤫',
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
        },
        {
          id: 'defend_aggressively',
          label: '🗣️ Khẳng định chi phí này đã được sếp tổng duyệt từ trước',
          effects: [
            { stat: 'stress', value: +20 },
          ],
          setFlags: { audit_discrepancy: true },
          feedMessage: 'Kiểm toán ghi nhận ý kiến nhưng quyết định gạt chi phí này ra khỏi chi phí hợp lý khi tính thuế. Công ty bị truy thu thuế doanh nghiệp nặng. 💀',
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
        },
        {
          id: 'call_misa_support',
          label: '📞 Gọi tổng đài hỗ trợ kỹ thuật của Misa (Chờ đợi)',
          effects: [
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Tổng đài liên tục báo bận do ngày cao điểm. Bạn phải ngồi chờ mất nửa ngày không thể làm việc gì liên quan đến sổ sách. 😭',
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
        },
        {
          id: 'give_up_and_sleep',
          label: '🛌 Kệ đi, mai nộp muộn giải trình sau',
          effects: [
            { stat: 'stress', value: +20 },
            { stat: 'salary', value: -150000 },
          ],
          feedMessage: 'Sáng hôm sau nộp được ngay nhưng hệ thống ghi nhận muộn 8 tiếng. Công ty bị phạt chậm nộp 150k. Sếp khiển trách nặng nề vì thiếu chủ động. 💀',
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
        },
        {
          id: 'reject_advance_regulation',
          label: '🙅 Từ chối thẳng vì sai quy trình và hệ thống không cho phép',
          effects: [
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn kiên quyết từ chối theo đúng quy chế. Nhân viên buồn bã bỏ đi. Bạn giữ vững kỷ luật kế toán nhưng trong lòng có chút áy náy. 🧘',
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
        },
        {
          id: 'confess_to_boss_lost',
          label: '😔 Dũng cảm thừa nhận làm mất với sếp tổng',
          effects: [
            { stat: 'stress', value: +25 },
            { stat: 'salary', value: -200000 },
          ],
          feedMessage: 'Bạn nhận lỗi với sếp. Sếp mắng bạn một trận lôi đình vì làm việc cẩu thả và phạt bạn trừ 200k điểm lương. 💀',
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
        },
        {
          id: 'pay_old_rate_adjust_later',
          label: '🩹 Cứ tính theo mức cũ rồi sang tháng sau làm quyết toán bù trừ',
          effects: [
            { stat: 'stress', value: +10 },
          ],
          setFlags: { has_hidden_error: true },
          feedMessage: 'Bạn quyết định giữ nguyên bảng lương cũ để chuyển khoản cho nhanh. Bạn trút được việc hôm nay nhưng nợ một đống sổ sách bù trừ tháng sau. 🤫',
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
        },
        {
          id: 'type_values_hardcode',
          label: '⚡ Copy cứng số liệu (Paste Values) đè lên công thức cho nhanh',
          effects: [
            { stat: 'energy', value: -10 },
          ],
          setFlags: { has_hidden_error: true },
          feedMessage: 'Bạn copy đè số cứng vào. Nhanh gọn nhưng file mất đi tính tự động liên kết. Nếu bên Sales cập nhật lại số, file của bạn sẽ bị sai lệch. ⚠️',
        },
      ],
    },
    {
      id: 'kt_new_1',
      title: 'Có thông tư thuế mới ban hành ảnh trực tiếp đến báo cáo quý 🔄',
      description: 'Tổng cục Thuế ban hành thông tư mới hướng dẫn kê khai hóa đơn điện tử đầu vào có hiệu lực ngay lập tức. Toàn bộ sổ sách quý này cần rà soát lại.',
      priority: 'high',
      professions: ['ke_toan'],
      actions: [
        {
          id: 'kt_new_1_a',
          label: '⏱️ Dành cả buổi chiều nghiên cứu và cập nhật biểu mẫu kê khai',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn nghiên cứu kỹ văn bản mới và điều chỉnh biểu mẫu. Số liệu quý hoàn toàn chuẩn chỉnh pháp lý. 👏',
        },
        {
          id: 'kt_new_1_b',
          label: '🩹 Cứ làm theo thông tư cũ, có gì quyết toán cuối năm sửa sau',
          effects: [
            { stat: 'stress', value: +15 },
          ],
          setFlags: { tax_risk: true },
          feedMessage: 'Bạn tặc lưỡi chọn phương án cũ cho nhanh. Stress tăng nhẹ vì lo sợ bị kiểm toán phạt sau này. 🤫',
        },
      ],
    },
    {
      id: 'kt_new_2',
      title: 'Quỹ tiền mặt lẻ bị lệch 200k sau khi thủ quỹ mua đồ pantry 💸',
      description: 'Thủ quỹ đi mua trà, bánh ngọt cho pantry công ty về bàn giao sổ sách nhưng khi kiểm tra két thực tế phát hiện hụt mất 200k không rõ lý do.',
      priority: 'medium',
      professions: ['ke_toan'],
      actions: [
        {
          id: 'kt_new_2_a',
          label: '🔍 Bắt thủ quỹ ngồi rà soát đếm lại hóa đơn siêu thị từng mặt hàng',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Sau 30 phút rà soát, phát hiện siêu thị tính nhầm tiền 1 mặt hàng đắt đỏ. Thủ quỹ chạy đi lấy lại tiền thành công. 😮‍💨',
        },
        {
          id: 'kt_new_2_b',
          label: '💸 Tự bỏ 200k tiền túi bù vào két cho khớp sổ sách nhanh gọn',
          effects: [
            { stat: 'salary', value: -20000 },
            { stat: 'stress', value: -5 },
          ],
          feedMessage: 'Bạn chi 20k điểm lương (tương đương 200k thực tế) bù vào cho khớp số. Sổ sách cân ngay lập tức mà không tốn công tranh cãi. 💸',
        },
      ],
    },
    {
      id: 'kt_new_3',
      title: 'Đối tác trả lại hóa đơn đỏ vì viết tắt chữ "Phường" thành "P." 📝',
      description: 'Kế toán đối tác cực kỳ khó tính gửi trả lại hóa đơn giá trị gia tăng trị giá 200 triệu vì địa chỉ viết tắt chữ "Phường" thành chữ "P.".',
      priority: 'medium',
      professions: ['ke_toan'],
      actions: [
        {
          id: 'kt_new_3_a',
          label: '🛠️ Làm thủ tục thu hồi hóa đơn cũ và xuất hóa đơn mới thay thế',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Bạn kiên nhẫn làm biên bản hủy và xuất lại bản mới. Đối tác hài lòng duyệt thanh toán ngay lập tức. 👍',
        },
        {
          id: 'kt_new_3_b',
          label: '🗣️ Gọi điện đôi co gay gắt giải thích "P." và "Phường" là một',
          effects: [
            { stat: 'stress', value: +20 },
          ],
          feedMessage: 'Bạn tranh luận căng thẳng. Bên kia giận dỗi đóng băng khoản thanh toán làm công ty bị trễ dòng tiền, sếp khiển trách bạn. ⚔️',
        },
      ],
    },
    {
      id: 'kt_new_4',
      title: 'Kiểm toán bất ngờ yêu cầu chứng từ 3 năm trước trong 2 tiếng 🚨',
      description: 'Đoàn kiểm toán thuế đang kiểm tra hồ sơ và bất ngờ yêu cầu bạn lục lại toàn bộ chứng từ chi phí tiếp khách từ 3 năm trước. Hạn chót chỉ có 2 tiếng.',
      priority: 'critical',
      professions: ['ke_toan'],
      actions: [
        {
          id: 'kt_new_4_a',
          label: '🏃 Xuống kho lưu trữ ẩm thấp lục tìm điên cuồng',
          effects: [
            { stat: 'energy', value: -25 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn cắm đầu lục kho bụi bặm. May mắn tìm thấy đúng thùng hồ sơ năm đó bàn giao đầy đủ cho đoàn. 😮‍💨',
        },
        {
          id: 'kt_new_4_b',
          label: '🤐 Trình bày lý do hồ sơ cũ đã được lưu kho trung tâm cần 1 ngày để trích xuất',
          effects: [
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn khéo léo thương lượng trì hoãn thành công. Đoàn kiểm toán đồng ý gia hạn sang sáng mai giúp bạn dễ thở hơn. 🧘',
        },
      ],
    },
    {
      id: 'kt_new_5',
      title: 'Sếp lớn mang hóa đơn tiếp khách karaoke không hợp lệ về thanh toán 🎤',
      description: 'Sếp tổng đi tiếp khách mang về một hóa đơn karaoke dịch vụ mờ mịt trị giá 15 triệu, yêu cầu bạn đưa vào chi phí hợp lý của doanh nghiệp để được khấu trừ.',
      priority: 'high',
      professions: ['ke_toan'],
      actions: [
        {
          id: 'kt_new_5_a',
          label: '🛠️ Khéo léo hạch toán chuyển sang chi phí hội nghị/khách hàng',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn khéo léo làm hồ sơ đi kèm biến hóa đơn đó thành chi phí hợp lệ. Sếp gật gù hài lòng vì bạn biết linh động công việc. 🤫',
        },
        {
          id: 'kt_new_5_b',
          label: '🙅 Từ chối thẳng thừng vì hóa đơn không đủ điều kiện pháp lý',
          effects: [
            { stat: 'stress', value: +20 },
            { stat: 'salary', value: -100000 },
          ],
          feedMessage: 'Bạn nhận lỗi với sếp. Sếp mắng bạn một trận lôi đình vì làm việc cẩu thả và phạt bạn trừ 100k điểm lương. 💀',
        },
      ],
    },
    {
      id: 'kt_new_6',
      title: 'Bản quyền phần mềm Misa hết hạn đúng ngày quyết toán tháng 🔒',
      description: 'Hôm nay là hạn cuối nộp báo cáo thuế tháng. Vừa mở phần mềm Misa lên thì báo lỗi: "Bản quyền đã hết hạn, vui lòng gia hạn để tiếp tục nhập liệu".',
      priority: 'critical',
      professions: ['ke_toan'],
      actions: [
        {
          id: 'kt_new_6_a',
          label: '📞 Gọi khẩn cấp cho đại lý Misa gia hạn cấp tốc và xin key tạm',
          effects: [
            { stat: 'energy', value: -10 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Học hỗ trợ cấp key thử nghiệm dùng tạm 3 ngày giúp bạn kịp nhập liệu hoàn thành báo cáo thuế đúng giờ. 😮‍💨',
        },
        {
          id: 'kt_new_6_b',
          label: '💻 Tự export dữ liệu thô sang Excel tự cộng tay tính toán báo cáo',
          effects: [
            { stat: 'energy', value: -30 },
            { stat: 'stress', value: +20 },
          ],
          feedMessage: 'Bạn thức đêm cộng tay số liệu trên Excel khổng lồ. Mệt rã rời thân xác. Trình Excel của bạn tăng lên. 👨‍💻',
        },
      ],
    },
    {
      id: 'kt_new_7',
      title: 'Nhân viên mới nằng nặc đòi ứng lương trước thời hạn 💵',
      description: 'Một cậu nhân viên thử việc mới vào được 1 tuần chạy đến khóc lóc trình bày hoàn cảnh khó khăn, xin bạn duyệt tạm ứng trước 3 triệu lương.',
      priority: 'low',
      professions: ['ke_toan'],
      actions: [
        {
          id: 'kt_new_7_a',
          label: '📝 Hướng dẫn cậu ấy viết đơn xin duyệt ngoại lệ trình sếp ký',
          effects: [
            { stat: 'energy', value: -10 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Đơn được duyệt. Bạn làm thủ tục chi tiền. Cậu nhân viên biết ơn bạn rối rít. 🤝',
        },
        {
          id: 'kt_new_7_b',
          label: '🙅 Từ chối thẳng theo đúng quy chế công ty (Thử việc không được ứng)',
          effects: [
            { stat: 'stress', value: -5 },
          ],
          feedMessage: 'Bạn lạnh lùng từ chối theo nguyên tắc. Cậu ấy buồn bã đi ra. Bạn giữ vững quy chế và không tốn công làm giấy tờ phụ. 🧘',
        },
      ],
    },
    {
      id: 'kt_new_8',
      title: 'Hệ thống Internet Banking ngân hàng bị lỗi treo giao dịch 📉',
      description: 'Đang thực hiện chuyển khoản lương loạt cho nhân sự thì hệ thống Techcombank Business bị lỗi, giao dịch ở trạng thái "Đang xử lý" treo cứng suốt 3 tiếng.',
      priority: 'high',
      professions: ['ke_toan'],
      actions: [
        {
          id: 'kt_new_8_a',
          label: '📞 Gọi ngay cho hotline nhân viên hỗ trợ doanh nghiệp của ngân hàng',
          effects: [
            { stat: 'energy', value: -10 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Họ ghi nhận tra soát khẩn cấp và đẩy lệnh đi thủ công giúp bạn sau 1 tiếng. Lương nhân viên đã về tài khoản. 😮‍💨',
        },
        {
          id: 'kt_new_8_b',
          label: '🧘 Đợi hệ thống tự giải quyết và viết mail báo cáo sếp',
          effects: [
            { stat: 'stress', value: -5 },
          ],
          feedMessage: 'Bạn viết mail giải thích lỗi kỹ thuật của ngân hàng gửi sếp và nhân viên. Mọi người thông cảm kiên nhẫn chờ đợi. 🧘',
        },
      ],
    },
    {
      id: 'kt_new_9',
      title: 'Phát hiện kế toán cũ nộp trễ tiền Bảo hiểm xã hội bị phạt lãi 🔒',
      description: 'Nhận được thông báo từ BHXH quận: Do doanh nghiệp nộp chậm tiền BHXH của 2 tháng trước nên phát sinh khoản phạt chậm nộp 1.5 triệu đồng.',
      priority: 'high',
      professions: ['ke_toan'],
      actions: [
        {
          id: 'kt_new_9_a',
          label: '💸 Làm thủ tục chi tiền nộp phạt ngay tránh phát sinh thêm lãi',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'salary', value: -15000 },
          ],
          feedMessage: 'Bạn xử lý nộp phạt dứt điểm 1.5 triệu (tương đương 15k điểm lương) để sổ sách sạch sẽ, sẵn sàng giải trình với sếp. 💸',
        },
        {
          id: 'kt_new_9_b',
          label: '📝 Soạn văn bản giải trình khiếu nại đổ lỗi do lỗi hệ thống BHXH',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn viết công văn giải trình khéo léo gỡ tội. Cơ quan BHXH đồng ý giảm nhẹ một phần khoản phạt cho doanh nghiệp. 👏',
        },
      ],
    },
    {
      id: 'kt_new_10',
      title: 'Excel bị crash bất ngờ mất sạch bảng báo cáo thuế chưa lưu 😭',
      description: 'Đang cắm đầu làm báo cáo tài chính quý cực kỳ phức tạp suốt cả buổi chiều thì bỗng nhiên màn hình Excel đơ cứng và báo lỗi "Excel has stopped working". Bạn chưa bấm Save!',
      priority: 'critical',
      professions: ['ke_toan'],
      actions: [
        {
          id: 'kt_new_10_a',
          label: '📂 Mở Document Recovery mò mẫm tìm lại file AutoRecover',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Trời thương! File AutoRecover lưu trữ phiên bản 10 phút trước. Bạn chỉ mất một chút công sức làm lại đoạn ngắn. 😮‍💨',
        },
        {
          id: 'kt_new_10_b',
          label: '😭 Khóc thét và bắt đầu gõ lại toàn bộ báo cáo từ đầu',
          effects: [
            { stat: 'energy', value: -30 },
            { stat: 'stress', value: +20 },
          ],
          feedMessage: 'Không có file phục hồi! Bạn phải gõ điên cuồng lại toàn bộ số liệu báo cáo suốt tối muộn. Mệt rã rời thân xác. 😭',
        },
      ],
    },
  ],
}

export default keToanPack
