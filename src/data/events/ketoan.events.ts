import type { GameEvent } from '../../types/event.types'

export const KETOAN_EVENTS: GameEvent[] = [
  {
    id: 'kt_excel_crash',
    title: 'Excel báo lỗi #REF! toàn bộ file',
    description: 'File báo cáo tháng. 200 ô công thức. Tất cả đang hiện #REF!. Deadline 2 tiếng nữa.',
    priority: 'critical',
    professions: ['ke_toan'],
    actions: [
      {
        id: 'debug_excel',
        label: '🔍 Trace lỗi từng ô',
        effects: [
          { stat: 'energy', value: -25, reason: 'Debug Excel là cực hình' },
          { stat: 'stress', value: +10, reason: 'Mất thời gian' },
          { stat: 'reputation', value: +15, reason: 'Fix được là giỏi' },
        ],
        feedMessage: 'Tìm ra lỗi: ai đó xóa sheet nguồn. 45 phút debug. Fixed. Cà phê thứ 3 trong ngày. ☕',
      },
      {
        id: 'use_backup',
        label: '💾 Dùng file backup hôm qua',
        effects: [
          { stat: 'stress', value: -15, reason: 'Có backup là có tất cả' },
          { stat: 'energy', value: -10, reason: 'Nhập lại dữ liệu hôm nay' },
          { stat: 'reputation', value: +5, reason: 'Biết cách backup là chuyên nghiệp' },
        ],
        feedMessage: 'Backup ngày hôm qua. Nhập lại 1 ngày data. Tốn 1 tiếng. Nhưng xong. Backup is king. 💾',
      },
      {
        id: 'ask_it',
        label: '📞 Gọi IT support',
        effects: [
          { stat: 'stress', value: +5, reason: 'IT không hiểu Excel chuyên sâu' },
          { stat: 'energy', value: -5, reason: 'Mất thời gian giải thích' },
          { stat: 'reputation', value: -5, reason: 'IT không giúp được gì' },
        ],
        feedMessage: 'IT: "Em thử tắt bật Excel chưa?" Bạn tắt bật. Lỗi vẫn còn. IT: "Để anh escalate." 😑',
      },
    ],
  },
  {
    id: 'kt_audit_surprise',
    title: 'Kiểm toán ghé thăm đột xuất',
    description: 'Không báo trước. Yêu cầu tất cả chứng từ Q3. Bạn cần 30 phút để tìm. Họ cần ngay.',
    priority: 'critical',
    professions: ['ke_toan'],
    actions: [
      {
        id: 'stay_calm',
        label: '😌 Bình tĩnh, lấy từng cái',
        effects: [
          { stat: 'stress', value: +10, reason: 'Áp lực khi bị kiểm tra' },
          { stat: 'reputation', value: +20, reason: 'Xử lý chuyên nghiệp dưới áp lực' },
          { stat: 'energy', value: -15, reason: 'Tốn sức tìm kiếm nhanh' },
        ],
        feedMessage: 'Bạn bình tĩnh, tìm đủ chứng từ trong 35 phút. Kiểm toán gật đầu. "Hệ thống lưu trữ tốt." 👏',
      },
      {
        id: 'stall',
        label: '☕ Mời trà, câu giờ',
        effects: [
          { stat: 'stress', value: -5, reason: 'Mua thêm thời gian' },
          { stat: 'energy', value: -5, reason: 'Chạy đi tìm hồ sơ' },
          { stat: 'reputation', value: -5, reason: 'Kiểm toán nhận ra bạn đang delay' },
        ],
        feedMessage: 'Mời trà. Nói chuyện thời tiết 10 phút. Tìm được hồ sơ. Kiểm toán hơi khó chịu nhưng chấp nhận. 🍵',
      },
      {
        id: 'admit_unready',
        label: '😅 Xin chuẩn bị trước 1 tiếng',
        effects: [
          { stat: 'stress', value: +5, reason: 'Xấu hổ một chút' },
          { stat: 'reputation', value: -10, reason: 'Không sẵn sàng cho audit' },
          { stat: 'energy', value: +5, reason: 'Có thời gian chuẩn bị đàng hoàng' },
        ],
        feedMessage: 'Xin 1 tiếng. Kiểm toán đồng ý. Bạn sắp xếp lại hồ sơ. Lần sau phải có checklist chuẩn bị. 📋',
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
          { stat: 'energy', value: -25, reason: 'Gọi điện liên tục' },
          { stat: 'stress', value: +15, reason: 'Đuổi số liệu từ mọi người' },
          { stat: 'reputation', value: +15, reason: 'Hoàn thành dù khó' },
        ],
        feedMessage: 'Gọi 5 phòng. 3 gửi ngay. 2 phòng mất 40 phút. Báo cáo xong lúc 5:28 PM. 😤',
      },
      {
        id: 'use_estimates',
        label: '📊 Dùng số ước tính tạm',
        effects: [
          { stat: 'stress', value: -10, reason: 'Xong nhanh' },
          { stat: 'reputation', value: -15, reason: 'Số liệu không chính xác' },
          { stat: 'bugCount', value: +2, reason: 'Số sai cần sửa sau' },
        ],
        feedMessage: 'Dùng estimate. Báo cáo xong đúng giờ. Sếp happy. Tuần sau phải làm lại với số chính xác. 🤫',
      },
      {
        id: 'push_back',
        label: '🙏 Xin gia hạn đến sáng mai',
        effects: [
          { stat: 'stress', value: -15, reason: 'Bớt áp lực' },
          { stat: 'reputation', value: -5, reason: 'Sếp hơi khó chịu' },
          { stat: 'energy', value: +5, reason: 'Không phải rush' },
        ],
        feedMessage: 'Sếp đồng ý sáng mai. Bạn làm cẩn thận buổi tối. Số liệu chính xác 100%. Đáng hơn. 👍',
      },
    ],
  },
  {
    id: 'kt_wrong_number',
    title: 'Sai số liệu trong báo cáo đã gửi sếp',
    description: 'Vừa phát hiện sai 1 con số. Báo cáo đã gửi 2 tiếng trước. Sếp chưa đọc. Có lẽ vậy.',
    priority: 'critical',
    professions: ['ke_toan'],
    actions: [
      {
        id: 'recall_report',
        label: '📧 Gửi lại bản đúng ngay',
        effects: [
          { stat: 'stress', value: +5, reason: 'Xấu hổ nhưng đúng đắn' },
          { stat: 'reputation', value: +10, reason: 'Trung thực, chủ động sửa lỗi' },
          { stat: 'energy', value: -5, reason: 'Phải giải thích' },
        ],
        feedMessage: '"Sếp ơi em vừa phát hiện sai số ở mục X, em gửi lại bản đúng ạ." Sếp: "OK em, cảm ơn." 😅',
      },
      {
        id: 'hope_unread',
        label: '🙏 Hy vọng sếp chưa đọc',
        effects: [
          { stat: 'stress', value: +20, reason: 'Lo lắng chờ đợi' },
          { stat: 'reputation', value: -20, reason: 'Nếu sếp đọc rồi thì xong' },
        ],
        chainEvents: [{ eventId: 'kt_wrong_number', delay: 4000 }],
        feedMessage: 'Bạn chờ. Sếp email: "Em ơi số này có đúng không?" Sếp đọc rồi. 💀',
      },
      {
        id: 'minor_error',
        label: '😅 Lỗi nhỏ, kệ đi',
        effects: [
          { stat: 'stress', value: -5, reason: 'Tự an ủi' },
          { stat: 'reputation', value: -15, reason: 'Báo cáo sai là không chấp nhận được' },
          { stat: 'bugCount', value: +2, reason: 'Số liệu sai lan sang báo cáo khác' },
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
          { stat: 'energy', value: -20, reason: 'Đuổi hóa đơn rất mệt' },
          { stat: 'stress', value: +10, reason: 'Racing deadline' },
          { stat: 'reputation', value: +15, reason: 'Xử lý được vấn đề' },
        ],
        feedMessage: 'Gọi 3 nhà cung cấp. 2 gửi ngay. 1 phải email và gọi thêm 2 lần. Hóa đơn về lúc 7pm. 😮‍💨',
      },
      {
        id: 'file_without',
        label: '📝 Khai tạm không có hóa đơn',
        effects: [
          { stat: 'stress', value: -5, reason: 'Xong việc trước' },
          { stat: 'reputation', value: -15, reason: 'Khai thuế không đủ chứng từ là rủi ro' },
          { stat: 'bugCount', value: +3, reason: 'Phải amend sau' },
        ],
        feedMessage: 'Khai tạm. Tháng sau phải bổ sung. Cục thuế có thể phạt nếu phát hiện. Rủi ro. ⚠️',
      },
      {
        id: 'request_extension',
        label: '📋 Xin gia hạn Cục thuế',
        effects: [
          { stat: 'stress', value: -10, reason: 'Bớt áp lực' },
          { stat: 'energy', value: -10, reason: 'Làm hồ sơ xin gia hạn' },
          { stat: 'reputation', value: +5, reason: 'Làm đúng quy trình' },
        ],
        feedMessage: 'Xin gia hạn 10 ngày. Cục thuế chấp thuận. Hóa đơn về kịp. Khai đúng hạn mới. ✅',
      },
    ],
  },
  {
    id: 'kt_payroll_error',
    title: 'Lương tháng này bị tính sai cho 5 người',
    description: 'Hệ thống lương báo lỗi sau khi đã chuyển khoản. 3 người lương cao hơn, 2 người thấp hơn.',
    priority: 'critical',
    professions: ['ke_toan'],
    actions: [
      {
        id: 'fix_immediately',
        label: '⚡ Xử lý ngay hôm nay',
        effects: [
          { stat: 'energy', value: -30, reason: 'Xử lý payroll error rất phức tạp' },
          { stat: 'reputation', value: +20, reason: 'Responsive và có trách nhiệm' },
          { stat: 'stress', value: +15, reason: 'Nhiều thủ tục phức tạp' },
        ],
        feedMessage: 'Làm adjustment ngay. 2 người nhận thêm phải hoàn lại. Không ai vui nhưng được xử lý đúng. ✅',
      },
      {
        id: 'adjust_next_month',
        label: '📅 Bù trừ tháng sau',
        effects: [
          { stat: 'stress', value: -10, reason: 'Đơn giản hơn' },
          { stat: 'reputation', value: -10, reason: 'Nhân viên không hài lòng chờ đợi' },
          { stat: 'energy', value: -5, reason: 'Phải giải thích với mọi người' },
        ],
        feedMessage: 'Thông báo bù trừ tháng sau. 2 người lương thấp hơn rất bức xúc. HR phải xử lý thêm. 😬',
      },
      {
        id: 'blame_system',
        label: '💻 Báo lỗi hệ thống',
        effects: [
          { stat: 'stress', value: -5, reason: 'Đổ cho phần mềm rồi' },
          { stat: 'reputation', value: -20, reason: 'Kế toán phải kiểm tra trước khi chạy lương' },
        ],
        feedMessage: '"Lỗi phần mềm ạ." HR: "Nhưng kế toán không kiểm tra trước khi chuyển khoản à?" Đúng. 😔',
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
          { stat: 'energy', value: -20, reason: 'Thông tư dài và khó' },
          { stat: 'reputation', value: +20, reason: 'Cập nhật kiến thức chuyên môn' },
          { stat: 'stress', value: +5, reason: 'Nhiều thay đổi cần implement' },
        ],
        feedMessage: 'Đọc xong. 47 trang. 3 điều khoản ảnh hưởng trực tiếp công việc. Ghi chú cẩn thận. 📝',
      },
      {
        id: 'ask_colleague',
        label: '👥 Hỏi đồng nghiệp kế toán',
        effects: [
          { stat: 'energy', value: -5, reason: 'Nhanh hơn' },
          { stat: 'reputation', value: +5, reason: 'Học hỏi từ người khác' },
          { stat: 'stress', value: -5, reason: 'Không phải tự xử lý một mình' },
        ],
        feedMessage: 'Đồng nghiệp đã đọc rồi. Giải thích 20 phút. Bạn hiểu điểm chính. Tiết kiệm 2 tiếng. 🤝',
      },
      {
        id: 'ignore_for_now',
        label: '🙈 Để sau đọc',
        effects: [
          { stat: 'stress', value: -5, reason: 'Đẩy việc xuống' },
          { stat: 'reputation', value: -10, reason: 'Không cập nhật quy định' },
          { stat: 'bugCount', value: +2, reason: 'Hạch toán sai theo quy định mới' },
        ],
        feedMessage: 'Đọc sau. Tuần sau kiểm toán hỏi về điều khoản mới. Bạn không biết. Không hay. 😬',
      },
    ],
  },
  {
    id: 'kt_cash_discrepancy',
    title: 'Quỹ tiền mặt lệch 500k',
    description: 'Kiểm quỹ cuối ngày. Sổ sách 10 triệu. Thực tế 9.5 triệu. Lệch 500k. Từ đâu?',
    priority: 'critical',
    professions: ['ke_toan'],
    timeSlots: ['end_of_day'],
    actions: [
      {
        id: 'recount',
        label: '🔢 Đếm lại cẩn thận',
        effects: [
          { stat: 'energy', value: -10, reason: 'Đếm đi đếm lại' },
          { stat: 'stress', value: -10, reason: 'Thường thì đếm nhầm' },
          { stat: 'reputation', value: +10, reason: 'Cẩn thận, không vội kết luận' },
        ],
        feedMessage: 'Đếm lại. Tờ 500k bị kẹp đôi. Tổng đúng rồi. Stress không đáng. Nhưng vẫn phải đếm. 😌',
      },
      {
        id: 'trace_transactions',
        label: '📋 Trace từng giao dịch',
        effects: [
          { stat: 'energy', value: -20, reason: 'Trace từng dòng mất thời gian' },
          { stat: 'stress', value: +10, reason: 'Lo lắng tìm không ra' },
          { stat: 'reputation', value: +15, reason: 'Xử lý đúng quy trình' },
        ],
        feedMessage: 'Trace xong. Phiếu thu chiều qua nhập sai 500k. Fixed. Quỹ khớp. Cả ngày vì 1 con số. 😤',
      },
      {
        id: 'report_to_manager',
        label: '📢 Báo sếp ngay',
        effects: [
          { stat: 'stress', value: +5, reason: 'Sếp sẽ hỏi nguyên nhân' },
          { stat: 'reputation', value: +10, reason: 'Minh bạch là đúng' },
          { stat: 'energy', value: -5, reason: 'Phải giải thích' },
        ],
        feedMessage: 'Báo sếp. Sếp cùng trace. Tìm ra nhập sai. "Lần sau phải kiểm tra double." Bài học. 📚',
      },
    ],
  },
  {
    id: 'kt_vendor_dispute',
    title: 'Nhà cung cấp khiếu nại công nợ sai',
    description: 'Nhà cung cấp gọi điện: "Chúng tôi ghi nhận bên bạn còn nợ 50 triệu. Sổ sách bạn ghi khác?"',
    priority: 'high',
    professions: ['ke_toan'],
    actions: [
      {
        id: 'reconcile',
        label: '📊 Đối chiếu công nợ',
        effects: [
          { stat: 'energy', value: -15, reason: 'Đối chiếu từng dòng' },
          { stat: 'reputation', value: +15, reason: 'Xử lý đúng quy trình' },
          { stat: 'stress', value: -5, reason: 'Có quy trình rõ ràng' },
        ],
        feedMessage: 'Đối chiếu từng hóa đơn. Phát hiện 1 hóa đơn chưa được ghi nhận bên bạn. Sai từ phía mình. Xử lý ổn. 📋',
      },
      {
        id: 'dispute',
        label: '💪 Khẳng định số mình đúng',
        effects: [
          { stat: 'stress', value: +10, reason: 'Tranh luận căng thẳng' },
          { stat: 'reputation', value: -10, reason: 'Có thể đang sai mà không biết' },
        ],
        feedMessage: '"Số của chúng tôi đúng." Sau 1 tiếng tranh luận phát hiện sai từ phía mình. Awkward meeting. 😬',
      },
      {
        id: 'request_statement',
        label: '📄 Xin sao kê từ nhà cung cấp',
        effects: [
          { stat: 'energy', value: -5, reason: 'Chờ tài liệu' },
          { stat: 'reputation', value: +10, reason: 'Làm đúng quy trình' },
          { stat: 'stress', value: -10, reason: 'Có căn cứ để đối chiếu' },
        ],
        feedMessage: 'Xin sao kê. So sánh chi tiết. Tìm ra điểm sai khác. Giải quyết trong 30 phút. Chuẩn chỉ. ✅',
      },
    ],
  },
  {
    id: 'kt_year_end',
    title: 'Sếp: "Báo cáo tài chính năm xong chưa?"',
    description: 'Hỏi vào ngày 28/12. Báo cáo năm cần đến cuối tháng 1 năm sau. Sếp hiểu không?',
    priority: 'high',
    professions: ['ke_toan'],
    actions: [
      {
        id: 'explain_timeline',
        label: '📅 Giải thích quy trình',
        effects: [
          { stat: 'energy', value: -10, reason: 'Giải thích không phải lần đầu' },
          { stat: 'reputation', value: +10, reason: 'Minh bạch về timeline' },
          { stat: 'stress', value: -5, reason: 'Sếp hiểu rồi' },
        ],
        feedMessage: 'Giải thích: cần đóng sổ kế toán 31/12, kiểm tra, lập báo cáo, deadline 31/1. Sếp gật đầu. "OK em." 📚',
      },
      {
        id: 'show_progress',
        label: '📊 Show tiến độ hiện tại',
        effects: [
          { stat: 'reputation', value: +15, reason: 'Sếp thấy bạn đang làm việc' },
          { stat: 'stress', value: -10, reason: 'Sếp yên tâm hơn' },
          { stat: 'energy', value: -5, reason: 'Chuẩn bị report tiến độ' },
        ],
        feedMessage: 'Show checklist: 70% done. Sếp: "OK giỏi, cứ đúng tiến độ là được." Được rồi. 👍',
      },
      {
        id: 'promise_early',
        label: '😅 "Em cố xong trước 31/12 ạ"',
        effects: [
          { stat: 'stress', value: +25, reason: 'Tự tạo áp lực không cần thiết' },
          { stat: 'reputation', value: -5, reason: 'Hứa không thực tế' },
          { stat: 'energy', value: -20, reason: 'Phải OT cả tuần cuối năm' },
        ],
        feedMessage: 'Hứa xong 31/12. Cắm mặt làm đến 11pm các ngày. Xong đúng hạn. Tết không có hồn. 😭',
      },
    ],
  },
]