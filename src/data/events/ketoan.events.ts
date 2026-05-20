import type { GameEvent } from '../../types/event.types'

export const KETOAN_EVENTS: GameEvent[] = [
  {
    id: 'kt_excel_crash',
    title: 'Excel báo lỗi #REF! toàn bộ file',
    description: 'File báo cáo tháng. 200 ô công thức. Tất cả đang hiện #REF!. Deadline 2 tiếng.',
    priority: 'critical',
    professions: ['ke_toan'],
    actions: [
      {
        id: 'debug_excel',
        label: '🔍 Trace lỗi từng ô',
        effects: [
          { stat: 'energy', value: -25 },
          { stat: 'stress', value: +10 },
          { stat: 'salary', value: +200000 },
        ],
        feedMessage: 'Tìm ra lỗi: ai đó xóa sheet nguồn. 45 phút debug. Fixed. Cà phê thứ 3 trong ngày. ☕',
      },
      {
        id: 'use_backup',
        label: '💾 Dùng file backup hôm qua',
        effects: [
          { stat: 'stress', value: -15 },
          { stat: 'energy', value: -10 },
          { stat: 'salary', value: +100000 },
        ],
        feedMessage: 'Backup ngày hôm qua. Nhập lại 1 ngày data. Tốn 1 tiếng. Nhưng xong. 💾',
      },
      {
        id: 'ask_it',
        label: '📞 Gọi IT support',
        effects: [
          { stat: 'stress', value: +5 },
          { stat: 'energy', value: -5 },
          { stat: 'salary', value: -50000 },
        ],
        feedMessage: 'IT: "Em thử tắt bật Excel chưa?" Bạn tắt bật. Lỗi vẫn còn. IT: "Để anh escalate." 😑',
      },
    ],
  },
  {
    id: 'kt_audit_surprise',
    title: 'Kiểm toán ghé thăm đột xuất',
    description: 'Không báo trước. Yêu cầu tất cả chứng từ Q3. Bạn cần 30 phút để tìm.',
    priority: 'critical',
    professions: ['ke_toan'],
    actions: [
      {
        id: 'stay_calm',
        label: '😌 Bình tĩnh, lấy từng cái',
        effects: [
          { stat: 'stress', value: +10 },
          { stat: 'energy', value: -15 },
          { stat: 'salary', value: +300000 },
        ],
        feedMessage: 'Bạn bình tĩnh, tìm đủ chứng từ trong 35 phút. Kiểm toán gật đầu. 👏',
      },
      {
        id: 'stall',
        label: '☕ Mời trà, câu giờ',
        effects: [
          { stat: 'stress', value: -5 },
          { stat: 'energy', value: -5 },
          { stat: 'salary', value: -50000 },
        ],
        feedMessage: 'Mời trà. Nói chuyện thời tiết 10 phút. Tìm được hồ sơ. Kiểm toán hơi khó chịu. 🍵',
      },
      {
        id: 'admit_unready',
        label: '😅 Xin chuẩn bị trước 1 tiếng',
        effects: [
          { stat: 'stress', value: +5 },
          { stat: 'energy', value: +5 },
          { stat: 'salary', value: -100000 },
        ],
        feedMessage: 'Xin 1 tiếng. Kiểm toán đồng ý. Bạn sắp xếp lại hồ sơ đàng hoàng. 📋',
      },
    ],
  },
  {
    id: 'kt_q4_report',
    title: 'Sếp cần báo cáo Q4 trong... 1 tiếng',
    description: 'Hiện tại là 4:30 PM. Báo cáo Q4 cần số liệu từ 5 phòng ban. Không phòng nào gửi đủ.',
    priority: 'critical',
    professions: ['ke_toan'],
    timeSlots: ['afternoon', 'end_of_day'],
    actions: [
      {
        id: 'call_all_depts',
        label: '📞 Gọi tất cả phòng ban',
        effects: [
          { stat: 'energy', value: -25 },
          { stat: 'stress', value: +15 },
          { stat: 'salary', value: +300000 },
        ],
        feedMessage: 'Gọi 5 phòng. 3 gửi ngay. 2 phòng mất 40 phút. Báo cáo xong lúc 5:28 PM. 😤',
      },
      {
        id: 'use_estimates',
        label: '📊 Dùng số ước tính tạm',
        effects: [
          { stat: 'stress', value: -10 },
          { stat: 'salary', value: -150000 },
        ],
        feedMessage: 'Dùng estimate. Báo cáo xong đúng giờ. Tuần sau phải làm lại với số chính xác. 🤫',
      },
      {
        id: 'push_back',
        label: '🙏 Xin gia hạn đến sáng mai',
        effects: [
          { stat: 'stress', value: -15 },
          { stat: 'energy', value: +5 },
          { stat: 'salary', value: -100000 },
        ],
        feedMessage: 'Sếp đồng ý sáng mai. Bạn làm cẩn thận buổi tối. Số liệu chính xác 100%. 👍',
      },
    ],
  },
  {
    id: 'kt_wrong_number',
    title: 'Sai số liệu trong báo cáo đã gửi sếp',
    description: 'Vừa phát hiện sai 1 con số. Báo cáo đã gửi 2 tiếng trước.',
    priority: 'critical',
    professions: ['ke_toan'],
    actions: [
      {
        id: 'recall_report',
        label: '📧 Gửi lại bản đúng ngay',
        effects: [
          { stat: 'stress', value: +5 },
          { stat: 'energy', value: -5 },
          { stat: 'salary', value: +100000 },
        ],
        feedMessage: '"Sếp ơi em vừa phát hiện sai số ở mục X, em gửi lại bản đúng ạ." Sếp: "OK em, cảm ơn." 😅',
      },
      {
        id: 'hope_unread',
        label: '🙏 Hy vọng sếp chưa đọc',
        effects: [
          { stat: 'stress', value: +20 },
          { stat: 'salary', value: -200000 },
        ],
        chainEvents: [{ eventId: 'kt_wrong_number', delay: 4000 }],
        feedMessage: 'Bạn chờ. Sếp email: "Em ơi số này có đúng không?" Sếp đọc rồi. 💀',
      },
      {
        id: 'minor_error',
        label: '😅 Lỗi nhỏ, kệ đi',
        effects: [
          { stat: 'stress', value: -5 },
          { stat: 'salary', value: -300000 },
        ],
        feedMessage: '"Sai nhỏ thôi." Sai nhỏ dẫn đến quyết định lớn sai. Kế toán không có "sai nhỏ". 😬',
      },
    ],
  },
  {
    id: 'kt_tax_deadline',
    title: 'Deadline nộp thuế VAT ngày mai',
    description: 'Hóa đơn từ 3 nhà cung cấp chưa về. Không có hóa đơn, không khai được thuế.',
    priority: 'critical',
    professions: ['ke_toan'],
    timeSlots: ['afternoon', 'end_of_day'],
    actions: [
      {
        id: 'chase_invoices',
        label: '📞 Gọi nhà cung cấp gấp',
        effects: [
          { stat: 'energy', value: -20 },
          { stat: 'stress', value: +10 },
          { stat: 'salary', value: +200000 },
        ],
        feedMessage: 'Gọi 3 nhà cung cấp. Hóa đơn về lúc 7pm. 😮‍💨',
      },
      {
        id: 'file_without',
        label: '📝 Khai tạm không có hóa đơn',
        effects: [
          { stat: 'stress', value: -5 },
          { stat: 'salary', value: -300000 },
        ],
        feedMessage: 'Khai tạm. Tháng sau phải bổ sung. Cục thuế có thể phạt. Rủi ro. ⚠️',
      },
      {
        id: 'request_extension',
        label: '📋 Xin gia hạn Cục thuế',
        effects: [
          { stat: 'stress', value: -10 },
          { stat: 'energy', value: -10 },
          { stat: 'salary', value: +100000 },
        ],
        feedMessage: 'Xin gia hạn 10 ngày. Cục thuế chấp thuận. Khai đúng hạn mới. ✅',
      },
    ],
  },
  {
    id: 'kt_payroll_error',
    title: 'Lương tháng này bị tính sai cho 5 người',
    description: 'Hệ thống lương báo lỗi sau khi đã chuyển khoản.',
    priority: 'critical',
    professions: ['ke_toan'],
    actions: [
      {
        id: 'fix_immediately',
        label: '⚡ Xử lý ngay hôm nay',
        effects: [
          { stat: 'energy', value: -30 },
          { stat: 'stress', value: +15 },
          { stat: 'salary', value: +300000 },
        ],
        feedMessage: 'Làm adjustment ngay. Xử lý đúng. Không ai vui nhưng được xử lý đúng. ✅',
      },
      {
        id: 'adjust_next_month',
        label: '📅 Bù trừ tháng sau',
        effects: [
          { stat: 'stress', value: -10 },
          { stat: 'energy', value: -5 },
          { stat: 'salary', value: -200000 },
        ],
        feedMessage: 'Thông báo bù trừ tháng sau. 2 người lương thấp hơn rất bức xúc. HR phải xử lý thêm. 😬',
      },
      {
        id: 'blame_system',
        label: '💻 Báo lỗi hệ thống',
        effects: [
          { stat: 'stress', value: -5 },
          { stat: 'salary', value: -300000 },
        ],
        feedMessage: '"Lỗi phần mềm ạ." HR: "Nhưng kế toán không kiểm tra trước khi chạy lương à?" Đúng. 😔',
      },
    ],
  },
  {
    id: 'kt_new_regulation',
    title: 'Thông tư mới ban hành, hiệu lực ngay',
    description: 'Thông tư 200 vừa có sửa đổi. Ảnh hưởng cách hạch toán. Bạn chưa kịp đọc.',
    priority: 'high',
    professions: ['ke_toan'],
    actions: [
      {
        id: 'read_now',
        label: '📖 Đọc ngay',
        effects: [
          { stat: 'energy', value: -20 },
          { stat: 'stress', value: +5 },
          { stat: 'salary', value: +200000 },
        ],
        feedMessage: 'Đọc xong. 47 trang. 3 điều khoản ảnh hưởng trực tiếp công việc. Ghi chú cẩn thận. 📝',
      },
      {
        id: 'ask_colleague',
        label: '👥 Hỏi đồng nghiệp kế toán',
        effects: [
          { stat: 'energy', value: -5 },
          { stat: 'stress', value: -5 },
          { stat: 'salary', value: +100000 },
        ],
        feedMessage: 'Đồng nghiệp đã đọc rồi. Giải thích 20 phút. Tiết kiệm 2 tiếng. 🤝',
      },
      {
        id: 'ignore_for_now',
        label: '🙈 Để sau đọc',
        effects: [
          { stat: 'stress', value: -5 },
          { stat: 'salary', value: -200000 },
        ],
        feedMessage: 'Đọc sau. Tuần sau kiểm toán hỏi về điều khoản mới. Bạn không biết. Không hay. 😬',
      },
    ],
  },
  {
    id: 'kt_cash_discrepancy',
    title: 'Quỹ tiền mặt lệch 500k',
    description: 'Kiểm quỹ cuối ngày. Sổ sách 10 triệu. Thực tế 9.5 triệu. Từ đâu?',
    priority: 'critical',
    professions: ['ke_toan'],
    timeSlots: ['end_of_day'],
    actions: [
      {
        id: 'recount',
        label: '🔢 Đếm lại cẩn thận',
        effects: [
          { stat: 'energy', value: -10 },
          { stat: 'stress', value: -10 },
          { stat: 'salary', value: +100000 },
        ],
        feedMessage: 'Đếm lại. Tờ 500k bị kẹp đôi. Tổng đúng rồi. Stress không đáng. 😌',
      },
      {
        id: 'trace_transactions',
        label: '📋 Trace từng giao dịch',
        effects: [
          { stat: 'energy', value: -20 },
          { stat: 'stress', value: +10 },
          { stat: 'salary', value: +200000 },
        ],
        feedMessage: 'Trace xong. Phiếu thu chiều qua nhập sai 500k. Fixed. Cả ngày vì 1 con số. 😤',
      },
      {
        id: 'report_to_manager',
        label: '📢 Báo sếp ngay',
        effects: [
          { stat: 'stress', value: +5 },
          { stat: 'energy', value: -5 },
          { stat: 'salary', value: +150000 },
        ],
        feedMessage: 'Báo sếp. Sếp cùng trace. Tìm ra nhập sai. "Lần sau phải kiểm tra double." Bài học. 📚',
      },
    ],
  },
  {
    id: 'kt_vendor_dispute',
    title: 'Nhà cung cấp khiếu nại công nợ sai',
    description: 'Nhà cung cấp gọi điện: "Chúng tôi ghi nhận bên bạn còn nợ 50 triệu."',
    priority: 'high',
    professions: ['ke_toan'],
    actions: [
      {
        id: 'reconcile',
        label: '📊 Đối chiếu công nợ',
        effects: [
          { stat: 'energy', value: -15 },
          { stat: 'stress', value: -5 },
          { stat: 'salary', value: +200000 },
        ],
        feedMessage: 'Đối chiếu từng hóa đơn. Phát hiện 1 hóa đơn chưa được ghi nhận. Xử lý ổn. 📋',
      },
      {
        id: 'dispute',
        label: '💪 Khẳng định số mình đúng',
        effects: [
          { stat: 'stress', value: +10 },
          { stat: 'salary', value: -100000 },
        ],
        feedMessage: '"Số của chúng tôi đúng." Sau 1 tiếng tranh luận phát hiện sai từ phía mình. Awkward. 😬',
      },
      {
        id: 'request_statement',
        label: '📄 Xin sao kê từ nhà cung cấp',
        effects: [
          { stat: 'energy', value: -5 },
          { stat: 'stress', value: -10 },
          { stat: 'salary', value: +150000 },
        ],
        feedMessage: 'Xin sao kê. So sánh chi tiết. Giải quyết trong 30 phút. Chuẩn chỉ. ✅',
      },
    ],
  },
  {
    id: 'kt_year_end',
    title: 'Sếp: "Báo cáo tài chính năm xong chưa?"',
    description: 'Hỏi vào ngày 28/12. Báo cáo năm cần đến cuối tháng 1 năm sau.',
    priority: 'high',
    professions: ['ke_toan'],
    actions: [
      {
        id: 'explain_timeline',
        label: '📅 Giải thích quy trình',
        effects: [
          { stat: 'energy', value: -10 },
          { stat: 'stress', value: -5 },
          { stat: 'salary', value: +100000 },
        ],
        feedMessage: 'Giải thích timeline. Sếp gật đầu. "OK em." 📚',
      },
      {
        id: 'show_progress',
        label: '📊 Show tiến độ hiện tại',
        effects: [
          { stat: 'energy', value: -5 },
          { stat: 'stress', value: -10 },
          { stat: 'salary', value: +150000 },
        ],
        feedMessage: 'Show checklist: 70% done. Sếp: "OK giỏi, cứ đúng tiến độ là được." 👍',
      },
      {
        id: 'promise_early',
        label: '😅 "Em cố xong trước 31/12 ạ"',
        effects: [
          { stat: 'stress', value: +25 },
          { stat: 'energy', value: -20 },
          { stat: 'salary', value: +200000 },
        ],
        feedMessage: 'Hứa xong 31/12. Cắm mặt làm đến 11pm các ngày. Xong đúng hạn. Tết không có hồn. 😭',
      },
    ],
  },
]