import type { ProfessionPack } from '../../types/game.types'

export const itPack: ProfessionPack = {
  config: {
    id: 'it',
    name: 'IT Dev',
    emoji: '💻',
    tagline: 'Bug không tự fix. Nhưng bạn cũng không muốn fix lúc 5pm.',
    difficulty: 'Trung bình',
    enemy: 'Bug, deadline, PM phi lý, intern nguy hiểm',
    startingStats: {
      stress: 20,
      energy: 100,
      salary: 500000,
    },
    dailySalary: 682000,
  },
  buffs: [
    {
      id: 'stackoverflow',
      name: 'Stack Overflow Premium',
      description: 'Không còn bị chặn. Câu trả lời từ năm 2012 vẫn còn dùng được.',
      cost: 400000,
      icon: '🔓',
      duration: 'day',
      effects: [
        { stat: 'energy', value: 15 },
        { stat: 'stress', value: -10 },
      ],
    },
    {
      id: 'dark_mode',
      name: 'Dark Mode + Theme xịn',
      description: 'Placebo hay không không quan trọng. Cảm giác pro hơn là thật.',
      cost: 150000,
      icon: '🌙',
      duration: 'day',
      effects: [
        { stat: 'stress', value: -10 },
        { stat: 'energy', value: 10 },
      ],
    },
    {
      id: 'dual_monitor',
      name: '2 màn hình',
      description: 'IDE một bên. Documentation một bên. Năng suất tăng 200%.',
      cost: 600000,
      icon: '🖥️',
      duration: 'day',
      effects: [
        { stat: 'energy', value: 20 },
        { stat: 'stress', value: -10 },
      ],
    },
    {
      id: 'chatgpt_pro',
      name: 'ChatGPT Pro',
      description: 'Pair programmer không bao giờ ngủ. Không phán xét. Không nghỉ lễ.',
      cost: 500000,
      icon: '🤖',
      duration: 'day',
      effects: [
        { stat: 'energy', value: 20 },
        { stat: 'stress', value: -15 },
      ],
    },
  ],
  events: [
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
            { stat: 'energy', value: -25 },
          ],
          feedMessage: 'Bạn fix production lúc 5:03 PM. Team vỗ tay. Sếp gật đầu. 👏',
        },
        {
          id: 'blame_backend',
          label: '😇 Đổ lỗi backend',
          effects: [
            { stat: 'stress', value: -8 },
            { stat: 'salary', value: -100000 },
          ],
          chainEvents: [{ eventId: 'it_team_drama', delay: 3000 }],
          feedMessage: 'Bạn blame backend. Backend blame lại bạn. Drama bắt đầu. 💀',
        },
        {
          id: 'rollback',
          label: '⏪ Rollback',
          effects: [
            { stat: 'stress', value: +5 },
            { stat: 'salary', value: -50000 },
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
            { stat: 'energy', value: -25 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Meeting kết thúc sau 2 tiếng 17 phút. Action item: tạo thêm meeting. 🙃',
        },
        {
          id: 'fake_busy',
          label: '🤫 Fake bận',
          effects: [
            { stat: 'stress', value: -10 },
            { stat: 'salary', value: -50000 },
          ],
          feedMessage: 'Bạn set status "In a meeting". Ironically. 😅',
        },
        {
          id: 'send_summary',
          label: '📝 Xin tóm tắt sau',
          effects: [
            { stat: 'energy', value: -5 },
            { stat: 'stress', value: +5 },
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
            { stat: 'energy', value: -20 },
          ],
          feedMessage: 'Bạn revert, fix, push lại. Intern học được bài học. Có lẽ vậy. 😤',
        },
        {
          id: 'scold_intern',
          label: '😤 Mắng intern',
          effects: [
            { stat: 'stress', value: -5 },
            { stat: 'salary', value: -100000 },
          ],
          feedMessage: 'Intern khóc. Bug vẫn còn. Bạn vẫn phải fix. Lose-lose. 😬',
        },
        {
          id: 'pair_debug',
          label: '👨‍💻 Ngồi debug cùng',
          effects: [
            { stat: 'energy', value: -15 },
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
            { stat: 'stress', value: +10 },
          ],
          feedMessage: '"Bạn có thể review PR #247 không ạ? 🙏" Lần này chắc được. Chắc vậy.',
        },
        {
          id: 'self_approve',
          label: '✅ Tự approve',
          effects: [
            { stat: 'stress', value: -10 },
            { stat: 'salary', value: -150000 },
          ],
          feedMessage: 'Bạn tự approve PR của mình. Bold move. Rất bold. 😬',
        },
        {
          id: 'ask_lead',
          label: '👋 Hỏi team lead',
          effects: [
            { stat: 'energy', value: -5 },
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
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Sếp thở dài. "Không có cách nào nhanh hơn không?" Có. Nhưng không tốt. 🙃',
        },
        {
          id: 'lie_estimate',
          label: '🤥 Nói: 2 ngày',
          effects: [
            { stat: 'stress', value: +20 },
            { stat: 'salary', value: -200000 },
          ],
          chainEvents: [{ eventId: 'it_deadline_missed', delay: 5000 }],
          feedMessage: 'Sếp vui. Bạn không vui. Deadline 2 ngày nữa. Code chưa bắt đầu. 💀',
        },
        {
          id: 'negotiate',
          label: '🤝 Thương lượng: 1 tuần',
          effects: [
            { stat: 'stress', value: +5 },
            { stat: 'energy', value: -10 },
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
            { stat: 'stress', value: +20 },
          ],
          chainEvents: [{ eventId: 'it_production_down', delay: 4000 }],
          feedMessage: 'Deploy xong. Mọi thứ xanh. 5 phút sau... alert đỏ. 💀',
        },
        {
          id: 'refuse_deploy',
          label: '🙅 Không, thứ Hai đi',
          effects: [
            { stat: 'stress', value: -15 },
            { stat: 'salary', value: -50000 },
          ],
          feedMessage: 'Bạn từ chối deploy thứ Sáu. Đây là quyết định đúng đắn nhất tuần này. 🧘',
        },
        {
          id: 'test_first',
          label: '🧪 Test thêm 30 phút',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +5 },
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
            { stat: 'energy', value: -5 },
            { stat: 'salary', value: -30000 },
          ],
          feedMessage: 'Hotspot bật. Standup diễn ra bình thường. Data cá nhân: -500MB. 📱',
        },
        {
          id: 'skip_standup',
          label: '🙈 "Mạng em yếu quá"',
          effects: [
            { stat: 'stress', value: -5 },
            { stat: 'salary', value: -50000 },
          ],
          feedMessage: '"Mạng em yếu quá anh ơi." Câu thần chú của dân WFH. 🙏',
        },
        {
          id: 'report_it',
          label: '📞 Báo IT support',
          effects: [
            { stat: 'stress', value: +5 },
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
            { stat: 'energy', value: -30 },
          ],
          feedMessage: 'Refactor xong sau 4 tiếng. Code sạch hơn. Bạn già thêm 5 tuổi. 🧓',
        },
        {
          id: 'patch_only',
          label: '🩹 Patch tạm thôi',
          effects: [
            { stat: 'energy', value: -10 },
            { stat: 'salary', value: -50000 },
          ],
          feedMessage: 'Patch xong. Tạm thời ổn. Người sau sẽ nguyền rủa bạn. Kệ. 🤷',
        },
        {
          id: 'ask_author',
          label: '🔍 Tìm người viết',
          effects: [
            { stat: 'energy', value: -5 },
            { stat: 'stress', value: +10 },
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
            { stat: 'stress', value: +25 },
            { stat: 'energy', value: -20 },
            { stat: 'salary', value: -100000 },
          ],
          feedMessage: '"OK em." Hai từ phá hủy cả sprint. Bạn bắt đầu làm lại từ đầu. 💀',
        },
        {
          id: 'negotiate_scope',
          label: '📋 Thương lượng scope',
          effects: [
            { stat: 'stress', value: +5 },
            { stat: 'energy', value: -5 },
          ],
          feedMessage: 'Bạn giải thích impact. Khách hàng hiểu. Scope được điều chỉnh. Hiếm lắm đó. 👏',
        },
        {
          id: 'escalate_pm',
          label: '📢 Báo PM xử lý',
          effects: [
            { stat: 'stress', value: -10 },
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
            { stat: 'energy', value: -5 },
            { stat: 'salary', value: -30000 },
          ],
          feedMessage: 'Bạn hỏi 7 người. Người thứ 7 có sạc đúng loại. Bạn nợ họ một ly cà phê. ☕',
        },
        {
          id: 'work_fast',
          label: '⚡ Làm nhanh trước khi tắt',
          effects: [
            { stat: 'stress', value: +15 },
            { stat: 'energy', value: -15 },
          ],
          feedMessage: 'Bạn commit code lúc 1%. Pin chết ngay sau đó. Heroic. 🦸',
        },
        {
          id: 'go_home',
          label: '🏃 Về nhà lấy sạc',
          effects: [
            { stat: 'energy', value: -10 },
            { stat: 'stress', value: -10 },
            { stat: 'salary', value: -80000 },
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
            { stat: 'stress', value: +15 },
            { stat: 'energy', value: -10 },
          ],
          feedMessage: '"Em đây ạ." Sếp assign task khẩn. Netflix phải chờ. 😔',
        },
        {
          id: 'seen_no_reply',
          label: '👀 Seen không reply',
          effects: [
            { stat: 'stress', value: +10 },
            { stat: 'energy', value: +5 },
            { stat: 'salary', value: -150000 },
          ],
          feedMessage: 'Seen lúc 10:03pm. Không reply. Sếp thấy online indicator. Ngày mai sẽ căng. 💀',
        },
        {
          id: 'reply_busy',
          label: '🙏 "Em đang bận ạ"',
          effects: [
            { stat: 'stress', value: +5 },
            { stat: 'energy', value: +3 },
            { stat: 'salary', value: -50000 },
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
            { stat: 'stress', value: -5 },
            { stat: 'salary', value: -30000 },
          ],
          feedMessage: 'Bạn tiếp tục code. Drama tự xử lý. Hoặc không. Kệ thôi. 🎧',
        },
        {
          id: 'mediate',
          label: '🤝 Hoà giải',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Bạn tổ chức 1-1 với cả hai bên. Drama nguội dần. Bạn kiệt sức. Nhưng team ổn. 🕊️',
        },
        {
          id: 'add_fuel',
          label: '🔥 Comment thêm vào',
          effects: [
            { stat: 'stress', value: +20 },
            { stat: 'salary', value: -200000 },
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
            { stat: 'energy', value: -35 },
            { stat: 'stress', value: +20 },
          ],
          feedMessage: 'Crunch 2 tiếng không nghỉ. Done lúc 5:58 PM. Tay run. Nhưng xong. 💪',
        },
        {
          id: 'request_extension',
          label: '🙏 Xin gia hạn',
          effects: [
            { stat: 'stress', value: -10 },
            { stat: 'salary', value: -100000 },
          ],
          feedMessage: 'PM cho gia hạn đến sáng mai. Bạn làm đến 11pm. Cuộc sống dev. 🌙',
        },
        {
          id: 'ship_incomplete',
          label: '🚢 Ship feature chưa xong',
          effects: [
            { stat: 'stress', value: -5 },
            { stat: 'salary', value: -200000 },
          ],
          feedMessage: 'Shipped. QA tìm thấy 7 bug trong 10 phút. Personal record. 🏆',
        },
      ],
    },
    {
      id: 'it_stackoverflow_block',
      title: 'Stack Overflow bị block bởi IT',
      description: 'Policy mới. "Security reasons." Bạn đang cần fix bug. Không có StackOverflow.',
      priority: 'high',
      professions: ['it'],
      actions: [
        {
          id: 'use_vpn',
          label: '🔓 Dùng VPN',
          effects: [
            { stat: 'stress', value: -10 },
            { stat: 'salary', value: -50000 },
          ],
          feedMessage: 'VPN bật. StackOverflow mở. Câu trả lời từ năm 2014 nhưng vẫn dùng được. 🔓',
        },
        {
          id: 'ask_chatgpt',
          label: '🤖 Hỏi ChatGPT',
          effects: [
            { stat: 'energy', value: -5 },
          ],
          feedMessage: 'ChatGPT cho code. Code chạy. Bạn không hiểu tại sao. Nhưng chạy là được. 🤖',
        },
        {
          id: 'ask_colleague',
          label: '👥 Hỏi đồng nghiệp',
          effects: [
            { stat: 'energy', value: -10 },
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
            { stat: 'energy', value: -20 },
          ],
          feedMessage: 'Environment variable thiếu trên CI. 2 tiếng debug. 1 dòng fix. Dev life. 😤',
        },
        {
          id: 'skip_test',
          label: '🙈 Skip test tạm',
          effects: [
            { stat: 'stress', value: -5 },
            { stat: 'salary', value: -150000 },
          ],
          feedMessage: '`it.skip()`. CI xanh. Lương tâm đỏ. 💀',
        },
        {
          id: 'blame_devops',
          label: '😤 Blame DevOps',
          effects: [
            { stat: 'stress', value: -5 },
            { stat: 'salary', value: -100000 },
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
            { stat: 'stress', value: +20 },
            { stat: 'energy', value: -15 },
          ],
          feedMessage: '"Em làm được." Bạn chưa chắc. Nhưng đã nói rồi. 💪',
        },
        {
          id: 'propose_plan',
          label: '📋 Đề xuất kế hoạch thực tế',
          effects: [
            { stat: 'energy', value: -10 },
            { stat: 'stress', value: -5 },
          ],
          feedMessage: 'Bạn present roadmap 6 tháng với risk assessment. Sếp ấn tượng. Timeline được điều chỉnh. 📊',
        },
        {
          id: 'question_why',
          label: '🤔 Hỏi tại sao cần migrate',
          effects: [
            { stat: 'stress', value: -10 },
          ],
          feedMessage: 'Sau 30 phút thảo luận: không cần migrate. Vấn đề thật sự là thiếu documentation. 🤦',
        },
      ],
    },
  ],
}

export default itPack
