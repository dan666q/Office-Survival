import type { GameEvent } from '../../types/event.types'

export const IT_EVENTS: GameEvent[] = [
  {
    id: 'it_production_down',
    title: 'Production sập rồi anh ơi 💀',
    description: 'Alert đỏ rực. Khách hàng đang gọi. PM nhắn tin liên tục. Slack nổ tung.',
    priority: 'critical',
    professions: ['it'],
    timeSlots: ['afternoon', 'end_of_day'],
    actions: [
      {
        id: 'fix_now',
        label: '🔧 Fix ngay',
        effects: [
          { stat: 'energy', value: -25, reason: 'Làm gấp không kịp thở' },
          { stat: 'bugCount', value: -1, reason: 'Bug fixed' },
          { stat: 'reputation', value: +15, reason: 'Hero of the day' },
        ],
        feedMessage: 'Bạn fix production lúc 5:03 PM. Team vỗ tay. Sếp gật đầu. 👏',
      },
      {
        id: 'blame_backend',
        label: '😇 Đổ lỗi backend',
        effects: [
          { stat: 'stress', value: -8, reason: 'Nhẹ người tạm thời' },
          { stat: 'reputation', value: -20, reason: 'Backend team ghét bạn' },
        ],
        chainEvents: [{ eventId: 'it_team_drama', delay: 3000 }],
        feedMessage: 'Bạn blame backend. Backend blame lại bạn. Drama bắt đầu. 💀',
      },
      {
        id: 'rollback',
        label: '⏪ Rollback',
        effects: [
          { stat: 'stress', value: +5, reason: 'Rollback không bao giờ suôn sẻ' },
          { stat: 'reputation', value: -5, reason: 'Không fix được, phải rollback' },
          { stat: 'bugCount', value: +1, reason: 'Bug vẫn còn đó, chỉ là hoãn lại' },
        ],
        feedMessage: 'Rollback thành công. Bug vẫn còn đó. Hẹn gặp lại ngày mai. 🫡',
      },
    ],
  },
  {
    id: 'it_pm_meeting',
    title: 'PM tạo "Quick Sync" 2 tiếng',
    description: 'Calendar invite vừa xuất hiện. Required attendance. Không có agenda. Tất nhiên.',
    priority: 'high',
    professions: ['it'],
    actions: [
      {
        id: 'attend',
        label: '📅 Tham gia cho lành',
        effects: [
          { stat: 'energy', value: -25, reason: '2 tiếng ngồi nghe không hiểu gì' },
          { stat: 'stress', value: +15, reason: 'Meeting không có điểm dừng' },
          { stat: 'reputation', value: +5, reason: 'Ít nhất bạn có mặt' },
        ],
        feedMessage: 'Meeting kết thúc sau 2 tiếng 17 phút. Action item: tạo thêm meeting. 🙃',
      },
      {
        id: 'fake_busy',
        label: '🤫 Fake bận',
        effects: [
          { stat: 'stress', value: -10, reason: 'Tránh được meeting' },
          { stat: 'reputation', value: -10, reason: 'PM không vui' },
        ],
        feedMessage: 'Bạn set status "In a meeting". Ironically. 😅',
      },
      {
        id: 'send_summary',
        label: '📝 Xin tóm tắt sau',
        effects: [
          { stat: 'energy', value: -5, reason: 'Chỉ mất công gửi email' },
          { stat: 'reputation', value: -5, reason: 'Hơi thất lễ nhưng chấp nhận được' },
        ],
        feedMessage: 'Bạn xin meeting notes. Notes gửi về: "Đã thảo luận các vấn đề quan trọng." 🙄',
      },
    ],
  },
  {
    id: 'it_intern_push',
    title: 'Intern push thẳng lên main 😱',
    description: '"Em tưởng branch này là dev ạ." Code review là gì? Intern không biết.',
    priority: 'critical',
    professions: ['it'],
    actions: [
      {
        id: 'fix_intern',
        label: '🔧 Tự fix luôn',
        effects: [
          { stat: 'energy', value: -20, reason: 'Fix code của người khác tốn gấp đôi' },
          { stat: 'bugCount', value: -1, reason: 'Damage control thành công' },
          { stat: 'reputation', value: +10, reason: 'Xử lý chuyên nghiệp' },
        ],
        feedMessage: 'Bạn revert, fix, push lại. Intern học được bài học. Có lẽ vậy. 😤',
      },
      {
        id: 'scold_intern',
        label: '😤 Mắng intern',
        effects: [
          { stat: 'stress', value: -5, reason: 'Nhẹ người' },
          { stat: 'reputation', value: -10, reason: 'Team thấy bạn hơi quá' },
          { stat: 'bugCount', value: +1, reason: 'Bug vẫn còn đó' },
        ],
        feedMessage: 'Intern khóc. Bug vẫn còn. Bạn vẫn phải fix. Lose-lose. 😬',
      },
      {
        id: 'pair_debug',
        label: '👨‍💻 Ngồi debug cùng',
        effects: [
          { stat: 'energy', value: -15, reason: 'Tốn thời gian nhưng đáng' },
          { stat: 'reputation', value: +15, reason: 'Mentor tốt, team ấn tượng' },
          { stat: 'bugCount', value: -1, reason: 'Fix được và intern hiểu tại sao' },
        ],
        feedMessage: 'Pair programming với intern 45 phút. Bug fixed. Intern hiểu ra. Win-win. 🤝',
      },
    ],
  },
  {
    id: 'it_code_review',
    title: 'PR chờ review 3 ngày rồi',
    description: 'Bạn ping 3 lần. Seen. Không reply. Feature bị block. Deadline ngày mai.',
    priority: 'high',
    professions: ['it'],
    actions: [
      {
        id: 'ping_again',
        label: '📢 Ping lần 4',
        effects: [
          { stat: 'stress', value: +10, reason: 'Bực bội chờ đợi' },
          { stat: 'reputation', value: -5, reason: 'Hơi annoying rồi đó' },
        ],
        feedMessage: '"Bạn có thể review PR #247 không ạ? 🙏" Lần này chắc được. Chắc vậy.',
      },
      {
        id: 'self_approve',
        label: '✅ Tự approve',
        effects: [
          { stat: 'stress', value: -10, reason: 'Xong việc rồi' },
          { stat: 'reputation', value: -15, reason: 'Không ai được làm vậy' },
          { stat: 'bugCount', value: +2, reason: 'Merge code chưa được review' },
        ],
        feedMessage: 'Bạn tự approve PR của mình. Bold move. Rất bold. 😬',
      },
      {
        id: 'ask_lead',
        label: '👋 Hỏi team lead',
        effects: [
          { stat: 'energy', value: -5, reason: 'Leo thang vấn đề' },
          { stat: 'reputation', value: +5, reason: 'Biết cách escalate đúng lúc' },
        ],
        feedMessage: 'Team lead assign reviewer khác. PR được review sau 20 phút. Đơn giản vậy thôi. 😅',
      },
    ],
  },
  {
    id: 'it_estimate_wrong',
    title: 'Sếp hỏi: "cái này fix bao lâu?"',
    description: 'Bạn nhìn vào đống code legacy 5 năm không ai dám đụng. Sếp đang chờ.',
    priority: 'medium',
    professions: ['it'],
    actions: [
      {
        id: 'honest',
        label: '😅 Nói thật: 2 tuần',
        effects: [
          { stat: 'stress', value: +5, reason: 'Sếp không vui' },
          { stat: 'reputation', value: +10, reason: 'Ít nhất bạn thành thật' },
        ],
        feedMessage: 'Sếp thở dài. "Không có cách nào nhanh hơn không?" Có. Nhưng không tốt. 🙃',
      },
      {
        id: 'lie_estimate',
        label: '🤥 Nói: 2 ngày',
        effects: [
          { stat: 'stress', value: +20, reason: 'Tự đào hố cho mình' },
          { stat: 'reputation', value: -10, reason: 'Deadline trượt thì sao?' },
        ],
        chainEvents: [{ eventId: 'it_deadline_missed', delay: 5000 }],
        feedMessage: 'Sếp vui. Bạn không vui. Deadline 2 ngày nữa. Code chưa bắt đầu. 💀',
      },
      {
        id: 'negotiate',
        label: '🤝 Thương lượng: 1 tuần',
        effects: [
          { stat: 'stress', value: +5, reason: 'Vẫn hơi gấp' },
          { stat: 'reputation', value: +5, reason: 'Chuyên nghiệp' },
          { stat: 'energy', value: -10, reason: 'Phải làm nhanh hơn bình thường' },
        ],
        feedMessage: 'Deal 1 tuần. Khả thi nếu không có gì bất ngờ xảy ra. Sẽ có. 😌',
      },
    ],
  },
  {
    id: 'it_deploy_friday',
    title: 'Team muốn deploy vào chiều thứ Sáu',
    description: '"Nhanh thôi, chỉ là hotfix nhỏ." Câu nói nguy hiểm nhất trong nghề dev.',
    priority: 'critical',
    professions: ['it'],
    timeSlots: ['afternoon', 'end_of_day'],
    actions: [
      {
        id: 'deploy',
        label: '🚀 Deploy thôi',
        effects: [
          { stat: 'stress', value: +20, reason: 'Hồi hộp chờ xem có sập không' },
          { stat: 'salary', value: +500000, reason: 'Hoàn thành task' },
        ],
        chainEvents: [{ eventId: 'it_production_down', delay: 4000 }],
        feedMessage: 'Deploy xong. Mọi thứ xanh. 5 phút sau... alert đỏ. 💀',
      },
      {
        id: 'refuse_deploy',
        label: '🙅 Không, thứ Hai đi',
        effects: [
          { stat: 'stress', value: -15, reason: 'Tránh được rủi ro cuối tuần' },
          { stat: 'reputation', value: -5, reason: 'PM hơi khó chịu' },
        ],
        feedMessage: 'Bạn từ chối deploy thứ Sáu. Đây là quyết định đúng đắn nhất tuần này. 🧘',
      },
      {
        id: 'test_first',
        label: '🧪 Test thêm 30 phút',
        effects: [
          { stat: 'energy', value: -15, reason: 'Làm thêm 30 phút cuối ngày' },
          { stat: 'stress', value: +5, reason: 'Vẫn hồi hộp' },
          { stat: 'reputation', value: +10, reason: 'Cẩn thận là đúng' },
          { stat: 'salary', value: +300000, reason: 'Task done' },
        ],
        feedMessage: 'Test thêm. Deploy thành công. Không có alert. Hiếm lắm. 🎉',
      },
    ],
  },
  {
    id: 'it_wifi_down',
    title: 'WiFi công ty chập chờn',
    description: 'Standup 10 phút nữa. Video call. Micro của bạn lag. Internet 2G.',
    priority: 'medium',
    professions: ['it'],
    actions: [
      {
        id: 'hotspot',
        label: '📱 Bật hotspot',
        effects: [
          { stat: 'energy', value: -5, reason: 'Mất công chuyển sang hotspot' },
          { stat: 'salary', value: -50000, reason: 'Tốn data cá nhân' },
        ],
        feedMessage: 'Hotspot bật. Standup diễn ra bình thường. Data cá nhân: -500MB. 📱',
      },
      {
        id: 'skip_standup',
        label: '🙈 "Mạng em yếu quá"',
        effects: [
          { stat: 'stress', value: -5, reason: 'Tránh được standup' },
          { stat: 'reputation', value: -5, reason: 'Mọi người biết bạn đang né' },
        ],
        feedMessage: '"Mạng em yếu quá anh ơi." Câu thần chú của dân WFH. 🙏',
      },
      {
        id: 'report_it',
        label: '📞 Báo IT support',
        effects: [
          { stat: 'stress', value: +5, reason: 'Phải chờ IT xử lý' },
          { stat: 'reputation', value: +5, reason: 'Xử lý đúng quy trình' },
        ],
        feedMessage: 'IT support: "Em thử tắt bật router chưa?" Bạn không có quyền đụng router. 😑',
      },
    ],
  },
  {
    id: 'it_legacy_code',
    title: 'Nhận task fix bug trong code legacy',
    description: 'File này viết năm 2017. Không có comment. Người viết đã nghỉ việc. Chúc may mắn.',
    priority: 'high',
    professions: ['it'],
    actions: [
      {
        id: 'refactor',
        label: '🏗️ Refactor luôn',
        effects: [
          { stat: 'energy', value: -30, reason: 'Refactor legacy code = địa ngục' },
          { stat: 'reputation', value: +20, reason: 'Dọn dẹp technical debt' },
          { stat: 'bugCount', value: -2, reason: 'Fix được nhiều bug cùng lúc' },
        ],
        feedMessage: 'Refactor xong sau 4 tiếng. Code sạch hơn. Bạn già thêm 5 tuổi. 🧓',
      },
      {
        id: 'patch_only',
        label: '🩹 Patch tạm thôi',
        effects: [
          { stat: 'energy', value: -10, reason: 'Nhanh hơn nhưng không bền' },
          { stat: 'bugCount', value: +1, reason: 'Technical debt tăng' },
          { stat: 'reputation', value: -5, reason: 'Code review sẽ không vui' },
        ],
        feedMessage: 'Patch xong. Tạm thời ổn. Người sau sẽ nguyền rủa bạn. Kệ. 🤷',
      },
      {
        id: 'ask_author',
        label: '🔍 Tìm người viết',
        effects: [
          { stat: 'energy', value: -5, reason: 'Mất công truy tìm' },
          { stat: 'stress', value: +10, reason: 'Người đó đã nghỉ việc 2 năm trước' },
        ],
        feedMessage: 'Git blame hiện tên Nguyễn Văn A. LinkedIn: "Currently at Google." Thôi rồi. 😭',
      },
    ],
  },
  {
    id: 'it_requirements_change',
    title: 'Khách hàng đổi yêu cầu lần 5',
    description: '"Chỉ thay đổi nhỏ thôi." — Redesign toàn bộ UI. Feature mới. Deadline giữ nguyên.',
    priority: 'critical',
    professions: ['it'],
    actions: [
      {
        id: 'accept',
        label: '😭 OK em làm',
        effects: [
          { stat: 'stress', value: +25, reason: 'Làm lại từ đầu' },
          { stat: 'energy', value: -20, reason: 'Tinh thần xuống dốc' },
          { stat: 'salary', value: +200000, reason: 'Thêm scope, thêm tiền? Không, giữ nguyên giá.' },
        ],
        feedMessage: '"OK em." Hai từ phá hủy cả sprint. Bạn bắt đầu làm lại từ đầu. 💀',
      },
      {
        id: 'negotiate_scope',
        label: '📋 Thương lượng scope',
        effects: [
          { stat: 'stress', value: +5, reason: 'Cuộc trò chuyện khó' },
          { stat: 'reputation', value: +15, reason: 'Xử lý chuyên nghiệp' },
          { stat: 'energy', value: -5, reason: 'Tốn công giải thích' },
        ],
        feedMessage: 'Bạn giải thích impact. Khách hàng hiểu. Scope được điều chỉnh. Hiếm lắm đó. 👏',
      },
      {
        id: 'escalate_pm',
        label: '📢 Báo PM xử lý',
        effects: [
          { stat: 'stress', value: -10, reason: 'Không phải việc của bạn nữa' },
          { stat: 'reputation', value: +5, reason: 'Escalate đúng người' },
        ],
        feedMessage: 'PM nhận task. PM họp với khách hàng 3 tiếng. Scope vẫn thay đổi. Nhưng không phải lỗi bạn. 🤷',
      },
    ],
  },
  {
    id: 'it_laptop_battery',
    title: 'Laptop còn 2% pin',
    description: 'Sạc để ở nhà. Không ai có sạc cùng loại. Đang trong giờ làm việc.',
    priority: 'medium',
    professions: ['it'],
    actions: [
      {
        id: 'borrow_charger',
        label: '🙏 Đi mượn sạc',
        effects: [
          { stat: 'energy', value: -5, reason: 'Đi hỏi từng người' },
          { stat: 'reputation', value: +5, reason: 'Mọi người sẵn sàng giúp' },
        ],
        feedMessage: 'Bạn hỏi 7 người. Người thứ 7 có sạc đúng loại. Bạn nợ họ một ly cà phê. ☕',
      },
      {
        id: 'work_fast',
        label: '⚡ Làm nhanh trước khi tắt',
        effects: [
          { stat: 'stress', value: +15, reason: 'Race condition với pin laptop' },
          { stat: 'energy', value: -15, reason: 'Làm gấp' },
          { stat: 'reputation', value: +10, reason: 'Hoàn thành task' },
        ],
        feedMessage: 'Bạn commit code lúc 1%. Pin chết ngay sau đó. Heroic. 🦸',
      },
      {
        id: 'go_home',
        label: '🏃 Về nhà lấy sạc',
        effects: [
          { stat: 'energy', value: -10, reason: 'Đi về mất 30 phút' },
          { stat: 'stress', value: -10, reason: 'Ít nhất có sạc rồi' },
          { stat: 'reputation', value: -10, reason: 'Vắng mặt 1 tiếng' },
        ],
        feedMessage: 'Về nhà lấy sạc. Đi 30 phút. Về 30 phút. Miss standup. Xứng đáng không? 🤔',
      },
    ],
  },
  {
    id: 'it_boss_message',
    title: 'Sếp nhắn: "em online không?"',
    description: 'Tin nhắn lúc 10pm. Bạn đang xem Netflix. Mà thôi.',
    priority: 'high',
    professions: ['it'],
    timeSlots: ['end_of_day', 'overtime'],
    actions: [
      {
        id: 'reply_yes',
        label: '📱 "Em đây ạ"',
        effects: [
          { stat: 'stress', value: +15, reason: 'Biết mình sẽ phải làm việc tối nay' },
          { stat: 'energy', value: -10, reason: 'Tối không được nghỉ' },
          { stat: 'reputation', value: +10, reason: 'Sếp tin tưởng' },
        ],
        feedMessage: '"Em đây ạ." Sếp assign task khẩn. Netflix phải chờ. 😔',
      },
      {
        id: 'seen_no_reply',
        label: '👀 Seen không reply',
        effects: [
          { stat: 'stress', value: +10, reason: 'Lo lắng hậu quả' },
          { stat: 'energy', value: +5, reason: 'Ít nhất được nghỉ tối nay' },
          { stat: 'reputation', value: -15, reason: 'Sếp biết bạn seen rồi' },
        ],
        feedMessage: 'Seen lúc 10:03pm. Không reply. Sếp thấy online indicator. Ngày mai sẽ căng. 💀',
      },
      {
        id: 'reply_busy',
        label: '🙏 "Em đang bận ạ"',
        effects: [
          { stat: 'stress', value: +5, reason: 'Hơi căng khi nói với sếp' },
          { stat: 'energy', value: +3, reason: 'Được nghỉ một phần' },
          { stat: 'reputation', value: -5, reason: 'Sếp hơi khó chịu' },
        ],
        feedMessage: '"Em đang bận ạ." Sếp: "OK em." Bạn không biết OK theo nghĩa nào. 😬',
      },
    ],
  },
  {
    id: 'it_team_drama',
    title: 'Drama nội bộ team dev',
    description: 'Ai đó comment code review rất thẳng thắn. Bây giờ cả team im lặng trên Slack.',
    priority: 'medium',
    professions: ['it'],
    actions: [
      {
        id: 'stay_neutral',
        label: '🧘 Không dính vào',
        effects: [
          { stat: 'stress', value: -5, reason: 'Không phải việc của mình' },
          { stat: 'reputation', value: -5, reason: 'Hơi vô cảm với team' },
        ],
        feedMessage: 'Bạn tiếp tục code. Drama tự xử lý. Hoặc không. Kệ thôi. 🎧',
      },
      {
        id: 'mediate',
        label: '🤝 Hoà giải',
        effects: [
          { stat: 'energy', value: -15, reason: 'Emotional labor tốn sức' },
          { stat: 'reputation', value: +20, reason: 'Team leader thật sự' },
          { stat: 'stress', value: +5, reason: 'Căng thẳng khi làm trung gian' },
        ],
        feedMessage: 'Bạn tổ chức 1-1 với cả hai bên. Drama nguội dần. Bạn kiệt sức. Nhưng team ổn. 🕊️',
      },
      {
        id: 'add_fuel',
        label: '🔥 Comment thêm vào',
        effects: [
          { stat: 'stress', value: +20, reason: 'Drama leo thang' },
          { stat: 'reputation', value: -15, reason: 'Bạn làm mọi thứ tệ hơn' },
        ],
        chainEvents: [{ eventId: 'it_team_drama', delay: 5000 }],
        feedMessage: 'Bạn comment thêm vào. Drama tăng level. Slack nổ tung. Sếp vào cuộc. 🔥',
      },
    ],
  },
  {
    id: 'it_deadline_missed',
    title: 'Deadline hôm nay. Code chưa xong.',
    description: 'Còn 2 tiếng. Còn 40% feature. Toán học không ủng hộ bạn lúc này.',
    priority: 'critical',
    professions: ['it'],
    actions: [
      {
        id: 'crunch',
        label: '⚡ Crunch hết sức',
        effects: [
          { stat: 'energy', value: -35, reason: 'Làm việc cường độ cao' },
          { stat: 'stress', value: +20, reason: 'Áp lực cực độ' },
          { stat: 'reputation', value: +10, reason: 'Kịp deadline' },
          { stat: 'salary', value: +500000, reason: 'Bonus nhỏ' },
        ],
        feedMessage: 'Crunch 2 tiếng không nghỉ. Done lúc 5:58 PM. Tay run. Nhưng xong. 💪',
      },
      {
        id: 'request_extension',
        label: '🙏 Xin gia hạn',
        effects: [
          { stat: 'stress', value: -10, reason: 'Bớt áp lực' },
          { stat: 'reputation', value: -10, reason: 'Miss deadline là miss deadline' },
        ],
        feedMessage: 'PM cho gia hạn đến sáng mai. Bạn làm đến 11pm. Cuộc sống dev. 🌙',
      },
      {
        id: 'ship_incomplete',
        label: '🚢 Ship feature chưa xong',
        effects: [
          { stat: 'stress', value: -5, reason: 'Đã ship rồi' },
          { stat: 'reputation', value: -20, reason: 'Feature lỗi đầy' },
          { stat: 'bugCount', value: +3, reason: 'Ship code chưa test' },
        ],
        feedMessage: 'Shipped. QA tìm thấy 7 bug trong 10 phút. Personal record. 🏆',
      },
    ],
  },
  {
    id: 'it_stackoverflow_block',
    title: 'Stack Overflow bị block bởi IT',
    description: 'Policy mới. "Security reasons." Bạn đang cần fix bug. Không có StackOverflow. Không có gì cả.',
    priority: 'high',
    professions: ['it'],
    actions: [
      {
        id: 'use_vpn',
        label: '🔓 Dùng VPN',
        effects: [
          { stat: 'stress', value: -10, reason: 'Vào được rồi' },
          { stat: 'reputation', value: -10, reason: 'Vi phạm IT policy' },
        ],
        feedMessage: 'VPN bật. StackOverflow mở. Câu trả lời từ năm 2014 nhưng vẫn dùng được. 🔓',
      },
      {
        id: 'ask_chatgpt',
        label: '🤖 Hỏi ChatGPT',
        effects: [
          { stat: 'energy', value: -5, reason: 'Phải giải thích context dài' },
          { stat: 'bugCount', value: -1, reason: 'AI trả lời được' },
        ],
        feedMessage: 'ChatGPT cho code. Code chạy. Bạn không hiểu tại sao. Nhưng chạy là được. 🤖',
      },
      {
        id: 'ask_colleague',
        label: '👥 Hỏi đồng nghiệp',
        effects: [
          { stat: 'energy', value: -10, reason: 'Interrupt người khác' },
          { stat: 'reputation', value: +5, reason: 'Collaboration tốt' },
          { stat: 'bugCount', value: -1, reason: 'Đồng nghiệp biết câu trả lời' },
        ],
        feedMessage: 'Senior dev giải thích. Bạn gật đầu. Bạn chưa hiểu hết. Nhưng bug fixed. 👍',
      },
    ],
  },
  {
    id: 'it_unit_test',
    title: 'Unit test pass local, fail trên CI',
    description: 'Works on my machine™. CI đỏ rực. Bạn không biết tại sao.',
    priority: 'high',
    professions: ['it'],
    actions: [
      {
        id: 'debug_ci',
        label: '🔍 Debug CI',
        effects: [
          { stat: 'energy', value: -20, reason: 'CI debugging là ác mộng' },
          { stat: 'bugCount', value: -1, reason: 'Tìm ra nguyên nhân' },
          { stat: 'reputation', value: +10, reason: 'Xử lý triệt để' },
        ],
        feedMessage: 'Environment variable thiếu trên CI. 2 tiếng debug. 1 dòng fix. Dev life. 😤',
      },
      {
        id: 'skip_test',
        label: '🙈 Skip test tạm',
        effects: [
          { stat: 'stress', value: -5, reason: 'Unblock pipeline' },
          { stat: 'bugCount', value: +2, reason: 'Technical debt tăng' },
          { stat: 'reputation', value: -15, reason: 'Skip test là không ổn' },
        ],
        feedMessage: '`it.skip()`. CI xanh. Lương tâm đỏ. 💀',
      },
      {
        id: 'blame_devops',
        label: '😤 Blame DevOps',
        effects: [
          { stat: 'stress', value: -5, reason: 'Đổ cho người khác rồi' },
          { stat: 'reputation', value: -10, reason: 'DevOps không vui' },
        ],
        feedMessage: 'DevOps kiểm tra. CI config ổn. Lỗi ở code bạn. Awkward. 😬',
      },
    ],
  },
  {
    id: 'it_new_framework',
    title: 'Sếp muốn migrate sang framework mới',
    description: '"Bên kia dùng rồi, mình phải theo." Codebase 3 năm. Migration 6 tháng. Timeline: 2 tháng.',
    priority: 'high',
    professions: ['it'],
    actions: [
      {
        id: 'agree',
        label: '😅 OK sếp, em làm',
        effects: [
          { stat: 'stress', value: +20, reason: 'Khối lượng công việc khổng lồ' },
          { stat: 'energy', value: -15, reason: 'Áp lực dài hạn' },
          { stat: 'salary', value: +1000000, reason: 'Được tăng lương vì nhận task khó' },
        ],
        feedMessage: '"Em làm được." Bạn chưa chắc. Nhưng đã nói rồi. 💪',
      },
      {
        id: 'propose_plan',
        label: '📋 Đề xuất kế hoạch thực tế',
        effects: [
          { stat: 'energy', value: -10, reason: 'Làm proposal mất thời gian' },
          { stat: 'reputation', value: +20, reason: 'Tư duy kỹ thuật tốt' },
          { stat: 'stress', value: -5, reason: 'Kế hoạch rõ ràng hơn' },
        ],
        feedMessage: 'Bạn present roadmap 6 tháng với risk assessment. Sếp ấn tượng. Timeline được điều chỉnh. 📊',
      },
      {
        id: 'question_why',
        label: '🤔 Hỏi tại sao cần migrate',
        effects: [
          { stat: 'reputation', value: +10, reason: 'Câu hỏi đúng' },
          { stat: 'stress', value: -10, reason: 'Có thể không cần migrate' },
        ],
        feedMessage: 'Sau 30 phút thảo luận: không cần migrate. Vấn đề thật sự là thiếu documentation. 🤦',
      },
    ],
  },
]