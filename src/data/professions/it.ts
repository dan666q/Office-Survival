// src/data/professions/it.ts
import type { ProfessionPack } from '../../types/game.types'

export const itPack: ProfessionPack = {
  config: {
    id: 'it',
    name: 'IT Dev',
    emoji: '💻',
    tagline: 'Code chạy được là phép màu. Nhưng sếp lại muốn chạy đúng tiến độ.',
    difficulty: 'Khó',
    enemy: 'Bug production, PM hối thúc, sếp gọi lúc 10pm, intern nguy hiểm',
    startingStats: {
      stress: 45,
      energy: 70,
      salary: 500000,
    },
    dailySalary: 580000,
  },
  buffs: [
    {
      id: 'stackoverflow',
      name: 'Claude Code Premium',
      description: 'Đăng ký gói Claude Code xịn nhất. Gõ một dòng prompt tự viết, tự debug, tự deploy. Dev ngồi lướt Shopee cả ngày.',
      cost: 350000,
      icon: '🤖',
      chatReplies: [
        {
          "senderId": "it_dev",
          "message": "Đăng ký Claude Code Premium gõ 1 dòng prompt tự code tự debug, ngồi lướt Shopee cả ngày sướng vcl! 😂"
        },
        {
          "senderId": "cto",
          "message": "AI viết code giùm rồi thì tối đi nhậu thôi, siêng năng làm gì tầm này 🚀👽"
        }
      ],
      duration: 'day',
      effects: [
        { stat: 'energy', value: 20 },
        { stat: 'stress', value: -15 },
      ],
    },
    {
      id: 'dark_mode',
      name: 'Bàn phím cơ Custom 75%',
      description: 'Switch linear lubed mượt mà, keycap PBT profile Cherry. Tiếng gõ clack clack giòn giã át tiếng sếp cằn nhằn.',
      cost: 300000,
      icon: '⌨️',
      chatReplies: [
        {
          "senderId": "it_dev",
          "message": "Switch linear lubed gõ clack clack giòn giã đi vào lòng đất át tiếng sếp cằn nhằn cmnl! ⌨️"
        },
        {
          "senderId": "pm",
          "message": "Gõ phím cơ kêu to điếc cả tai cưng ơi, cơ mà âm thanh nghe bánh cuốn ghê 🌸"
        }
      ],
      duration: 'permanent',
      effects: [
        { stat: 'stress', value: -10 },
        { stat: 'energy', value: 10 },
      ],
    },
    {
      id: 'dual_monitor',
      name: 'Màn hình cong UltraWide 34"',
      description: 'Độ phân giải 2K siêu rộng. Vừa cày phim, vừa lướt mạng, vừa để một góc code nhỏ không sợ ai dòm ngó.',
      cost: 550000,
      icon: '🖥️',
      chatReplies: [
        {
          "senderId": "it_dev",
          "message": "Màn hình cong 2K siêu rộng cày phim lướt mạng code cùng lúc bao phê không sợ ai dòm ngó 🖥️"
        },
        {
          "senderId": "ba",
          "message": "Màn hình to đùng thế kia nhìn sướng con mắt vcl, sòng phẳng giàu sang! 💍"
        }
      ],
      duration: 'permanent',
      effects: [
        { stat: 'energy', value: 20 },
        { stat: 'stress', value: -10 },
      ],
    },
    {
      id: 'chatgpt_pro',
      name: 'Herman Miller Embody',
      description: 'Chiếc ghế công thái học đắt đỏ cứu rỗi chiếc cột sống đang thét gào. Ngồi 12 tiếng không đau lưng, sẵn sàng OT xuyên đêm.',
      cost: 800000,
      icon: '💺',
      chatReplies: [
        {
          "senderId": "it_dev",
          "message": "Chiếc ghế công thái học đắt đỏ cứu rỗi chiếc cột sống đang thét gào, sẵn sàng OT xuyên đêm 💺"
        },
        {
          "senderId": "hr",
          "message": "Ghế Herman Miller 40 củ ngồi 12 tiếng không đau lưng, phòng IT chịu chơi xỉu 🎸"
        }
      ],
      duration: 'permanent',
      effects: [
        { stat: 'energy', value: 15 },
        { stat: 'stress', value: -20 },
      ],
    },
  ],
  events: [
    {
      id: 'it_new_framework',
      title: 'Sếp muốn migrate toàn bộ hệ thống sang Framework mới 🚀',
      description: 'Họp đầu tuần. Sếp đọc báo mạng thấy công nghệ mới hot quá: "Hệ thống mình phải migrate sang AI-driven Framework này ngay nhé em, deadline 2 tuần."',
      priority: 'high',
      professions: ['it'],
      actions: [
        {
          id: 'agree_migrate',
          label: '😅 "Dạ vâng sếp, để em làm thử" (Tốn năng lượng)',
          effects: [
            { stat: 'stress', value: +20 },
            { stat: 'energy', value: -20 },
          ],
          setFlags: { migrated_legacy: true },
          feedMessage: 'Bạn đồng ý. Hệ thống legacy khổng lồ bắt đầu bị mổ xẻ. Stress tăng vọt vì quá phức tạp. 🚀',
          chatReplies: [
            {
              "senderId": "cto",
              "message": "Migrate sang AI-driven Framework đi em, thời đại AI rồi ai xài đồ cổ nữa! 🚀👽"
            },
            {
              "senderId": "it_dev",
              "message": "Đm legacy code khổng lồ migrate 2 tuần sập chắc luôn, cúng cụ trước đi m 😂"
            }
          ]
        },
        {
          id: 'refuse_migrate',
          label: '🙅 Phản bác kịch liệt, trình bày rủi ro',
          effects: [
            { stat: 'stress', value: -10 },
            { stat: 'salary', value: -50000 },
          ],
          feedMessage: 'Bạn đưa ra 20 lý do hệ thống sẽ sập nếu migrate gấp. Sếp gật gù hủy bỏ ý định nhưng hơi phật ý. 🧘',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Hủy migrate rồi nhé cả nhà, nghe phân tích rủi ro sập server tui cũng sợ xỉu 🐐"
            },
            {
              "senderId": "pm",
              "message": "May quá đỡ phải chạy deadline vắt chân lên cổ, cưng phân tích thuyết phục xỉu 🌸"
            }
          ]
        },
      ],
    },
    {
      id: 'it_intern_push',
      title: 'Intern push code lỗi thẳng lên nhánh main 😱',
      description: 'Alert đỏ rực trên GitHub. Nhánh main bị tàn phá. Intern lắp bắp: "Em tưởng nhánh dev ạ, em lỡ tay force push...".',
      priority: 'critical',
      professions: ['it'],
      actions: [
        {
          id: 'scold_intern',
          label: '😤 Mắng intern một trận lôi đình',
          effects: [
            { stat: 'stress', value: -10 },
            { stat: 'salary', value: -80000 },
          ],
          setFlags: { intern_cried: true },
          feedMessage: 'Bạn quát intern trước mặt cả văn phòng. Intern rơm rớm nước mắt xin nghỉ việc. Bầu không khí team chùng xuống. 😤',
          chatReplies: [
            {
              "senderId": "intern",
              "message": "Hu hu anh quát em trước mặt cả team làm em khóc ròng rã xin nghỉ việc luôn 😭⚽"
            },
            {
              "senderId": "hr",
              "message": "Mới đi làm chưa biết gì mà cưng quát tụi nhỏ thế tội nghiệp ghê á 🎸"
            }
          ]
        },
        {
          id: 'debug_together',
          label: '👨‍💻 Bình tĩnh cùng intern ngồi revert và debug',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn hướng dẫn intern cách sửa lỗi. Bug được giải quyết sau 45 phút. Intern ngưỡng mộ bạn sát đất. 🤝',
          chatReplies: [
            {
              "senderId": "intern",
              "message": "Đại ca đỉnh vcl! Chỉ dạy tận tình giúp em revert nhánh main, thần tượng của lòng em! SIUUUU! ⚡"
            },
            {
              "senderId": "it_dev",
              "message": "Dạy thế này intern nó nể sát đất, vừa có thêm đệ tử gánh tạ vừa giữ được team hòa thuận 👍"
            }
          ]
        },
      ],
    },
    {
      id: 'it_team_drama',
      title: 'Drama nội bộ: Dev team chia phe cãi nhau ⚔️',
      description: 'Trong kênh chat ẩn của team dev, cuộc cãi vã bùng nổ về phong cách code và ai chịu trách nhiệm cho lỗi của intern hôm trước.',
      priority: 'high',
      professions: ['it'],
      requirements: {
        flags: { intern_cried: true },
      },
      actions: [
        {
          id: 'add_fuel',
          label: '🔥 Tranh luận gay gắt bảo vệ quan điểm của mình',
          effects: [
            { stat: 'stress', value: +25 },
            { stat: 'energy', value: -15 },
          ],
          setFlags: { team_hates_you: true },
          feedMessage: 'Bạn tranh cãi kịch liệt. Bầu không khí trong team cực kỳ căng thẳng. Mọi người bắt đầu cô lập bạn trên Slack. ⚔️',
          chatReplies: [
            {
              "senderId": "it_dev",
              "message": "Tranh cãi nảy lửa bảo vệ quan điểm, cả team dev chia phe đấu đá nhìn vui mắt vcl 😂"
            },
            {
              "senderId": "pm",
              "message": "Hic team dev drama ghê quá, tui vô chat mà rén đéo dám thở luôn á chèn 😭"
            }
          ]
        },
        {
          id: 'stay_neutral',
          label: '🧘 Im lặng, tắt thông báo đi ngủ trưa',
          effects: [
            { stat: 'stress', value: -10 },
          ],
          feedMessage: 'Bạn chọn cách phớt lờ. Kệ họ cãi nhau, code của mình chạy được là được rồi. 🧘',
          chatReplies: [
            {
              "senderId": "it_dev",
              "message": "Tắt thông báo đi ngủ trưa là chân lý, code chạy được là được rồi cãi nhau làm đéo gì 🧘"
            },
            {
              "senderId": "ba",
              "message": "Thần thái vcl, đúng là bậc thầy sinh tồn công sở hihi 💍"
            }
          ]
        },
      ],
    },
    {
      id: 'it_boss_message',
      title: 'Sếp nhắn tin lúc 10h đêm hỏi tiến độ 😰',
      description: 'Điện thoại rung bần bật trên bàn. Tin nhắn từ sếp: "Em ơi hệ thống migrate sao rồi? Anh nghe đồn nội bộ team dev đang có drama lục đục đúng không?"',
      priority: 'critical',
      professions: ['it'],
      requirements: {
        flags: { team_hates_you: true },
      },
      actions: [
        {
          id: 'apologize',
          label: '😅 Xin lỗi sếp và hứa mai sẽ giải quyết',
          effects: [
            { stat: 'stress', value: +15 },
            { stat: 'energy', value: -10 },
          ],
          feedMessage: 'Bạn xin lỗi sếp, hứa ngày mai sẽ tổ chức họp hòa giải. Đêm nay mất ngủ suy nghĩ. 😰',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Ghi nhận lời xin lỗi nha em, mai lên họp hòa giải drama team dev rồi báo cáo nhé 🐐"
            },
            {
              "senderId": "it_dev",
              "message": "Đêm hôm 10h sếp còn nhắn tin hỏi tiến độ, đúng là kiếp dev bạc bẽo cọc điên 😭"
            }
          ]
        },
        {
          id: 'explain_truth',
          label: '🤐 Trình bày thật tâm, đề xuất sa thải kẻ gây drama',
          effects: [
            { stat: 'stress', value: +10 },
            { stat: 'salary', value: -150000 },
          ],
          feedMessage: 'Bạn giải thích tường tận. Sếp ghi nhận nhưng đánh giá bạn thiếu kỹ năng quản lý nhân sự và teamwork. 💀',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Ghi nhận báo cáo thật tâm, cơ mà kỹ năng quản lý team của bạn còn non lắm nhé 🐐"
            },
            {
              "senderId": "hr",
              "message": "Huhu sếp Messi đánh giá thiếu kỹ năng quản lý rồi kìa, căng thẳng ghê 🎸"
            }
          ]
        },
      ],
    },
    {
      id: 'it_production_down',
      title: 'Hệ thống Production sập hoàn toàn lúc 16h45! 🚨',
      description: 'Hàng ngàn yêu cầu lỗi. Khách hàng khiếu nại réo liên tục. Kênh Telegram alert của DevOps nổ tung. Chỉ còn 15 phút là hết giờ làm.',
      priority: 'critical',
      professions: ['it'],
      actions: [
        {
          id: 'fix_now',
          label: '🔧 Nhảy vào fix khẩn cấp (Hao tổn năng lượng)',
          effects: [
            { stat: 'energy', value: -30 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn cắm đầu debug điên cuồng. Sau 1 tiếng mò mẫm, bạn phát hiện ra lỗi syntax do deploy gấp. Hệ thống chạy lại bình thường. 👏',
          chatReplies: [
            {
              "senderId": "cto",
              "message": "Xử lý khẩn cấp xong trong 1 tiếng cứu nguy production, m xứng đáng làm Tech Lead! 🚀👽"
            },
            {
              "senderId": "it_dev",
              "message": "Cắm đầu debug 16h45 mém tí là đi tong cái cuối tuần rồi, nể thực sự 👍"
            }
          ]
        },
        {
          id: 'blame_devops',
          label: '😇 Đổ lỗi do hạ tầng DevOps lag',
          effects: [
            { stat: 'stress', value: -10 },
            { stat: 'salary', value: -50000 },
          ],
          chainEvents: [{ eventId: 'it_team_drama', delay: 2000 }],
          feedMessage: 'Bạn thanh minh lỗi do server AWS lag chứ code bạn chuẩn. DevOps nhảy vào cãi nhau tay đôi với bạn. 💀',
          chatReplies: [
            {
              "senderId": "admin",
              "message": "Ủa alo, đổ lỗi DevOps lag xong hai bên chửi nhau ỏm tỏi trên Slack kìa mọi người ơi 😂"
            },
            {
              "senderId": "it_dev",
              "message": "Đm DevOps bảo code m lỗi syntax rõ ràng chứ server AWS đéo có tội gì nha m 😂"
            }
          ]
        },
      ],
    },
    {
      id: 'it_deploy_friday',
      title: 'Đồng nghiệp gạ deploy hotfix vào chiều thứ Sáu 🚀',
      description: 'Lúc 16h30 Thứ Sáu, đồng nghiệp năn nỉ: "Deploy nốt cái hotfix nhỏ này đi em, nhanh lắm mất 2 phút thôi để cuối tuần sếp không réo."',
      priority: 'critical',
      professions: ['it'],
      actions: [
        {
          id: 'deploy',
          label: '🚀 Deploy luôn cho sướng, cuối tuần đi chơi',
          effects: [
            { stat: 'stress', value: +20 },
          ],
          chainEvents: [{ eventId: 'it_production_down', delay: 3000 }],
          feedMessage: 'Bấm nút Deploy. Màn hình báo thành công. Bạn tắt máy ra về. 5 phút sau... điện thoại sếp gọi cháy máy. 💀',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Deploy chiều thứ Sáu sập server rồi em ơi, alo lên fix gấp cho sếp nheee! 🐐🚨"
            },
            {
              "senderId": "it_dev",
              "message": "Rule số 1 của dev: ĐÉO DEPLOY THỨ SÁU! M liều vcl và cái kết đắng lòng cmnl 😂"
            }
          ]
        },
        {
          id: 'refuse_deploy',
          label: '🙅 Kiên quyết từ chối: "Để thứ Hai đi anh"',
          effects: [
            { stat: 'stress', value: -15 },
            { stat: 'salary', value: -20000 },
          ],
          feedMessage: 'Bạn khóa nhánh, từ chối deploy chiều thứ Sáu. Quyết định sáng suốt nhất tuần cứu rỗi ngày nghỉ của bạn. 🧘',
          chatReplies: [
            {
              "senderId": "it_dev",
              "message": "Khóa nhánh đi về đi m ơi, thứ Sáu đòi deploy chỉ có nước khóc thét cuối tuần thôi 🧘"
            },
            {
              "senderId": "pm",
              "message": "Quyết định sáng suốt cứu rỗi cả team, cuối tuần đi nhậu thảnh thơi thôi cả nhà ơi 🌸"
            }
          ]
        },
      ],
    },
    {
      id: 'it_estimate_wrong',
      title: 'Sếp hỏi tiến độ: "Cái này fix bao lâu em?" ⏰',
      description: 'Bạn đang đối mặt với đoạn code legacy rối rắm viết từ 7 năm trước. Sếp đứng ngay sau lưng khoanh tay chờ câu trả lời.',
      priority: 'medium',
      professions: ['it'],
      actions: [
        {
          id: 'honest_estimate',
          label: '😅 Ước lượng thật lòng: Cần ít nhất 2 tuần',
          effects: [
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Sếp nhíu mày thở dài thất vọng: "Sao lâu thế em? Bên kia họ bảo chỉ cần 2 ngày...". 😰',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Ước lượng thật lòng 2 tuần lâu quá em ơi, bên đối thủ họ bảo 2 ngày xong kìa 🐐"
            },
            {
              "senderId": "it_dev",
              "message": "Legacy code 7 năm trước rối như tơ vò, báo 2 tuần là còn nhanh á sếp ơi 😭"
            }
          ]
        },
        {
          id: 'lie_estimate',
          label: '🤥 Hứa lèo: "Dạ 2 ngày nữa xong sếp ơi"',
          effects: [
            { stat: 'stress', value: +20 },
            { stat: 'salary', value: -100000 },
          ],
          chainEvents: [{ eventId: 'it_deadline_missed', delay: 4000 }],
          feedMessage: 'Sếp cười tươi gật đầu bỏ đi. Bạn run rẩy quay lại nhìn đống legacy code không biết bắt đầu từ đâu. 💀',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Tuyệt vời, 2 ngày nữa sếp chờ bản demo xịn mịn của em nha! 🐐🏆"
            },
            {
              "senderId": "it_dev",
              "message": "Hứa lèo 2 ngày xong đống legacy code này là m tự đào hố chôn m rồi con ơi 😂"
            }
          ]
        },
      ],
    },
    {
      id: 'it_deadline_missed',
      title: 'Deadline sếp giao đã đến! Code chưa xong 😭',
      description: 'Đã quá hạn 2 ngày mà tính năng mới vẫn lỗi be bét. PM đang đứng canh ở bàn đòi demo sản phẩm.',
      priority: 'critical',
      professions: ['it'],
      requirements: {
        stats: [{ stat: 'stress', op: 'gte', value: 50 }],
      },
      actions: [
        {
          id: 'crunch_time',
          label: '⚡ Xin OT xuyên đêm để làm cho xong (Mất sức)',
          effects: [
            { stat: 'energy', value: -35 },
            { stat: 'stress', value: +20 },
          ],
          feedMessage: 'Bạn thức đến 3h sáng tại văn phòng để gõ code. Tính năng tạm chạy được nhưng bạn rã rời như xác không hồn. 💀',
          chatReplies: [
            {
              "senderId": "pm",
              "message": "Cưng thức đến 3h sáng cày code nhìn xơ xác như xác sống thương quá chèn ơi 😭"
            },
            {
              "senderId": "it_dev",
              "message": "OT xuyên đêm cứu deadline gánh còng cả cột sống, nể thực sự 👍"
            }
          ]
        },
        {
          id: 'admit_failure',
          label: '😔 Chấp nhận phạt, xin lùi deadline',
          effects: [
            { stat: 'stress', value: -10 },
            { stat: 'salary', value: -150000 },
          ],
          feedMessage: 'Bạn thừa nhận không kịp tiến độ. Sếp phê bình gay gắt và trừ 150k điểm chuyên cần/kỷ luật của bạn. 😔',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Trễ deadline là bị phạt trừ 150k điểm chuyên cần nhé, kỷ luật là sức mạnh! 🐐"
            },
            {
              "senderId": "hr",
              "message": "Trừ 150k lương đau lòng ghê, lần sau ước lượng chuẩn hơn nha em 🎸"
            }
          ]
        },
      ],
    },
    {
      id: 'it_code_review',
      title: 'Đồng nghiệp cắm 27 comment chê bai PR của bạn 📝',
      description: 'Pull Request của bạn bị đồng nghiệp senior vào bắt lỗi lặt vặt từ dấu phẩy đến cách đặt tên biến. PR bị block không merge được.',
      priority: 'medium',
      professions: ['it'],
      actions: [
        {
          id: 'fix_all',
          label: '🔧 Cúi đầu sửa hết theo ý họ',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Sửa lại toàn bộ 27 comment mất nguyên một buổi chiều. Code đẹp hơn thật nhưng mệt phờ. 🔧',
          chatReplies: [
            {
              "senderId": "it_dev",
              "message": "Cúi đầu sửa hết 27 comment mất nguyên buổi chiều, code đẹp mượt mà rồi nha 👍"
            },
            {
              "senderId": "pm",
              "message": "Chịu khó sửa đổi thế này là tốt, cưng ngoan ngoãn số 1 phòng dev 🌸"
            }
          ]
        },
        {
          id: 'argue_pr',
          label: '🗣️ Tranh luận gay gắt bảo vệ code của mình',
          effects: [
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn viết comment tranh cãi học thuật tay đôi. Cuộc chiến không hồi kết bùng nổ trên GitHub. 😤',
          chatReplies: [
            {
              "senderId": "it_dev",
              "message": "Tranh cãi học thuật nảy lửa trên PR nhìn căng thẳng vcl, không ai chịu nhường ai 😂"
            },
            {
              "senderId": "cto",
              "message": "Code cãi nhau tay đôi thế này bao giờ mới merge được hử hai ông tướng? 👽"
            }
          ]
        },
      ],
    },
    {
      id: 'it_legacy_code',
      title: 'Được giao task sửa bug trong file "Legacy" không ai dám đụng 🧓',
      description: 'File code dài 4000 dòng, viết bởi một senior đã nghỉ việc từ 5 năm trước. Không một dòng comment giải thích.',
      priority: 'high',
      professions: ['it'],
      actions: [
        {
          id: 'refactor_legacy',
          label: '🏗️ Liều lĩnh refactor viết lại đoạn code lỗi',
          effects: [
            { stat: 'energy', value: -30 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn dũng cảm refactor. Lỗi được giải quyết nhưng bạn mất ngủ vì sợ ảnh hưởng đến các module khác. 🧓',
          chatReplies: [
            {
              "senderId": "it_dev",
              "message": "Liều lĩnh refactor class 4000 dòng chạy ngon lành luôn, m đúng là chiến thần! 👍"
            },
            {
              "senderId": "cto",
              "message": "Refactor dũng cảm vcl, tôi thích tinh thần dọn rác hệ thống này của bạn 🚀"
            }
          ]
        },
        {
          id: 'patch_temporary',
          label: '🩹 Chỉ vá tạm bằng vài dòng check null (Patch work)',
          effects: [
            { stat: 'energy', value: -10 },
            { stat: 'salary', value: -30000 },
          ],
          feedMessage: 'Bạn chèn vài dòng check điều kiện tạm bợ. Bug biến mất tạm thời. Bạn thở phào mặc kệ hậu quả về sau. 🩹',
          chatReplies: [
            {
              "senderId": "it_dev",
              "message": "Chèn vài dòng check null vá tạm bợ đúng chất lười của dev, cái gì chưa sập cứ để đó 😂"
            },
            {
              "senderId": "pm",
              "message": "Hết bug là được rồi cưng ơi, nhanh gọn lẹ đi ăn trưa thôi nè 🌸"
            }
          ]
        },
      ],
    },
    {
      id: 'it_requirements_change',
      title: 'Yêu cầu từ khách hàng thay đổi phút chót 🔄',
      description: '"Bên anh muốn đổi tí giao diện và logic này thôi, đơn giản mà em." — Thực chất là thay đổi 80% kiến trúc dữ liệu.',
      priority: 'critical',
      professions: ['it'],
      actions: [
        {
          id: 'accept_change',
          label: '😭 "Vâng ạ..." (Chấp nhận đau thương)',
          effects: [
            { stat: 'stress', value: +25 },
            { stat: 'energy', value: -20 },
            { stat: 'salary', value: -50000 },
          ],
          feedMessage: 'Bạn bấm bụng chấp nhận. Toàn bộ code viết suốt 3 ngày qua bị ném thẳng vào sọt rác. 😭',
          chatReplies: [
            {
              "senderId": "pm",
              "message": "Huhu code 3 ngày ném sọt rác đổi logic mới, thương cưng còng lưng thực sự 😭"
            },
            {
              "senderId": "it_dev",
              "message": "Đm khách hàng quay xe phút chót làm dev khóc thét, kiếp làm thuê cay đắng vcl 😡"
            }
          ]
        },
        {
          id: 'negotiate_scope',
          label: '📊 Tổ chức họp, đề xuất tăng giá trị hợp đồng/lùi hạn',
          effects: [
            { stat: 'energy', value: -10 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Bạn thuyết phục thành công khách hàng hiểu độ phức tạp. Dự án được gia hạn thêm 1 tuần. Thành công đàm phán! 📊',
          chatReplies: [
            {
              "senderId": "pm",
              "message": "Đàm phán lùi hạn 1 tuần thành công, cưng đỉnh của chóp luôn á chèn ơi! 🌸"
            },
            {
              "senderId": "sales",
              "message": "Đỉnh quá bạn ơi, khách hàng gật gù đồng ý luôn, đỡ cực cho cả team 🌹"
            }
          ]
        },
      ],
    },
    {
      id: 'it_database_lock',
      title: 'Database production bị deadlock nghẽn mạng! 🚨',
      description: 'Hệ thống báo động đỏ. Do lượng truy cập tăng đột biến, database bị rơi vào trạng thái deadlock khiến mọi truy vấn cập nhật giỏ hàng đều báo lỗi Timeout.',
      priority: 'critical',
      professions: ['it'],
      actions: [
        {
          id: 'kill_sessions',
          label: '⚡ SSH vào server, kiểm tra và kill bớt các sessions treo',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn nhanh chóng trace PID và kill các session bị block. Database hoạt động mượt mà trở lại. 👏',
          chatReplies: [
            {
              "senderId": "cto",
              "message": "Trace PID và kill session treo nhanh như chớp, cứu nguy database ngoạn mục vcl! 🚀"
            },
            {
              "senderId": "it_dev",
              "message": "Xử lý chuẩn chỉ chuyên nghiệp, hệ thống mượt mà trở lại ngay 👍"
            }
          ]
        },
        {
          id: 'restart_db_server',
          label: '🎲 Liều mình restart thẳng service database (Tác động mạnh)',
          effects: [
            { stat: 'energy', value: -10 },
            { stat: 'stress', value: +25 },
            { stat: 'salary', value: -80000 },
          ],
          feedMessage: 'Bạn khởi động lại service. Lỗi deadlock hết ngay nhưng làm mất mát khoảng 10 giao dịch của khách hàng. Sếp khiển trách vì xử lý cẩu thả. 💀',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Restart thẳng tay làm mất 10 giao dịch của khách kìa, phạt khiển trách 80k nhé! 🐐"
            },
            {
              "senderId": "it_dev",
              "message": "Liều mạng restart DB server làm mất data giao dịch, quả này ăn gạch là phải 😂"
            }
          ]
        },
      ],
    },
    {
      id: 'it_scam_email',
      title: 'Email giả danh sếp tổng đòi cung cấp mã bảo mật Git 🔒',
      description: 'Hòm thư công ty nhận được email từ địa chỉ cực giống sếp tổng yêu cầu bạn gửi ngay mã bảo mật hai lớp (2FA) của kho code Git để sếp duyệt code.',
      priority: 'high',
      professions: ['it'],
      actions: [
        {
          id: 'report_security_it',
          label: '🛡️ Báo cáo ngay lên bộ phận an ninh mạng của công ty',
          effects: [
            { stat: 'energy', value: -5 },
            { stat: 'stress', value: -10 },
          ],
          feedMessage: 'Bộ phận an ninh xác nhận đây là email lừa đảo (phishing). Bạn được tuyên dương trước toàn công ty vì nâng cao tinh thần cảnh giác. 🏅',
          chatReplies: [
            {
              "senderId": "legal",
              "message": "Tinh thần cảnh giác bảo mật tuyệt vời, được tuyên dương toàn công ty luôn nhé! ⚖️"
            },
            {
              "senderId": "it_dev",
              "message": "Email phishing tinh vi vcl, suýt tí nữa là dâng code cho hacker rồi 👏"
            }
          ]
        },
        {
          id: 'send_code_directly',
          label: '🙋 Gửi luôn mã bảo mật không cần nghi ngờ sếp',
          effects: [
            { stat: 'stress', value: +25 },
            { stat: 'salary', value: -200000 },
          ],
          feedMessage: 'Bạn gửi mã. 10 phút sau, hacker xâm nhập xóa sạch kho code repo. Công ty mất nguyên 1 ngày khôi phục backup. Bạn bị kỷ luật cực kỳ nặng. 💀',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Hacker xóa sạch kho code repo làm công ty mất cả ngày khôi phục kìa, phạt nặng 200k! 🐐🚨"
            },
            {
              "senderId": "it_dev",
              "message": "Gửi luôn 2FA cho hacker thì lạy m sư phụ cmnl, ngây thơ vcl 😭"
            }
          ]
        },
      ],
    },
    {
      id: 'it_ssl_expired',
      title: 'Chứng chỉ bảo mật SSL hết hạn đột xuất lúc sáng sớm 💀',
      description: 'Khách hàng liên tục réo: "Tại sao website công ty truy cập lại hiện cảnh báo nguy hiểm đỏ lòm, không thể thanh toán được thế này?"',
      priority: 'critical',
      professions: ['it'],
      actions: [
        {
          id: 'renew_ssl_immediately',
          label: '🛠️ Cấu hình renew gấp chứng chỉ Let\'s Encrypt miễn phí',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Bạn gõ lệnh terminal gia hạn SSL trong 10 phút. Trình duyệt hết cảnh báo đỏ, web hoạt động trơn tru trở lại. 😮‍💨',
          chatReplies: [
            {
              "senderId": "it_dev",
              "message": "Gia hạn Let's Encrypt trong 10 phút terminal đỉnh vcl, hết cảnh báo đỏ lòm rồi 👍"
            },
            {
              "senderId": "pm",
              "message": "Hên quá khách truy cập thanh toán lại bình thường rồi cưng ơi, uy tín xỉu 🌸"
            }
          ]
        },
        {
          id: 'buy_paid_ssl',
          label: '💸 Đề xuất duyệt chi 100k mua gói SSL trả phí tự động (Tốn tiền)',
          effects: [
            { stat: 'salary', value: -100000 },
            { stat: 'stress', value: -10 },
          ],
          feedMessage: 'Bạn chi tiền mua gói tự động gia hạn. Hệ thống tự động cài đặt sau 15 phút. Khỏe thân, không phải lo nghĩ nữa. 💸',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Đã duyệt chi 100k mua SSL trả phí tự động (trừ 100k lương), khỏe thân đỡ phải cấu hình tay! 🐐"
            },
            {
              "senderId": "it_dev",
              "message": "Xài bản trả phí tự động gia hạn là ngon nhất, đỡ nhức đầu lo hết hạn ✨"
            }
          ]
        },
      ],
    },
    {
      id: 'it_ai_copilot_bug',
      title: 'Hậu quả của việc quá tin tưởng AI GitHub Copilot 🤖',
      description: 'Lúc viết tính năng tính toán dòng tiền, do lười bạn tab tab đồng ý toàn bộ code do AI Copilot gợi ý và nhấn merge thẳng lên nhánh main.',
      priority: 'high',
      professions: ['it'],
      actions: [
        {
          id: 'write_unit_tests',
          label: '👨‍💻 Viết Unit Test kỹ càng để rà soát lỗi của AI',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Unit test chạy lỗi đỏ rực. Bạn phát hiện AI tính sai logic giảm trừ phần trăm. May mắn sửa lại kịp thời. 😮‍💨',
          chatReplies: [
            {
              "senderId": "it_dev",
              "message": "Unit test đỏ lòm phát hiện AI tính sai logic giảm trừ, hú vía m ơi! 👏"
            },
            {
              "senderId": "cto",
              "message": "Good job, AI chỉ hỗ trợ thôi chứ tin 100% là bán nhà đấy nhé 👍"
            }
          ]
        },
        {
          id: 'trust_copilot_completely',
          label: '🎲 Tin hoàn toàn vào AI, tắt log ra ngoài uống cà phê',
          effects: [
            { stat: 'energy', value: +10 },
          ],
          setFlags: { migrated_legacy: true },
          feedMessage: 'Bạn mặc kệ. 1 tiếng sau kế toán trưởng la toáng lên vì lương nhân viên bị nhân đôi trên hệ thống. Một phen hỗn loạn. 💀',
          chatReplies: [
            {
              "senderId": "accounting",
              "message": "Đm AI Copilot nhân đôi lương toàn công ty kìa, kế toán khóc thét nãy giờ cứu tui! 😭💵"
            },
            {
              "senderId": "sep",
              "message": "Tắt log đi uống cafe để AI phá nát hệ thống lương, tôi cạn lời với bạn 🐐"
            }
          ]
        },
      ],
    },
    {
      id: 'it_hardware_blue_screen',
      title: 'Màn hình xanh chết chóc (BSOD) mất sạch code chưa lưu! 🖥️',
      description: 'Đang gõ hăng say 300 dòng logic phức tạp chưa bấm lưu thì chiếc máy tính Windows đột ngột đứng hình, phát ra tiếng tạch rồi hiện màn hình xanh lè.',
      priority: 'critical',
      professions: ['it'],
      actions: [
        {
          id: 'clean_ram_yourself',
          label: '🛠️ Tự tháo vỏ cây, vệ sinh RAM và khởi động lại',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Tự lau chân RAM cắm lại. Máy lên bình thường, Git auto-save cứu được 90% dòng code. May mắn vô cùng! 🛠️',
          chatReplies: [
            {
              "senderId": "it_dev",
              "message": "Tự tháo RAM vệ sinh cắm lại chạy ngon ơ, đúng chất thợ sửa máy chuyên nghiệp 👍"
            },
            {
              "senderId": "intern",
              "message": "Git auto-save cứu được 90% code, đại ca ăn ở tốt quá trời luôn ✨"
            }
          ]
        },
        {
          id: 'escalate_it_support',
          label: '📞 Gọi IT Support của công ty mang máy khác sang',
          effects: [
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'IT Support báo: "Chờ em cài win lại mất 2 tiếng sếp nhé." Bạn mất sạch đống code chưa lưu, phải gõ lại từ đầu trong ức chế. 😭',
          chatReplies: [
            {
              "senderId": "it_dev",
              "message": "Đợi IT cài win lại mất 2 tiếng mất sạch code gõ lại từ đầu trầm cảm cmnl 😭"
            },
            {
              "senderId": "admin",
              "message": "Hic chia buồn nha, lần sau nhớ Ctrl + S liên tục nha m ơi 😰"
            }
          ]
        },
      ],
    },
    {
      id: 'it_refactor_overtime',
      title: 'Lỡ tay refactor module lõi làm hỏng hệ thống kiểm thử 💀',
      description: 'Muốn dọn dẹp code cho đẹp mắt, bạn ngứa tay cấu trúc lại class chính. Kết quả: Toàn bộ CI/CD báo lỗi đỏ lè, dự án bị block không cho ai push code.',
      priority: 'critical',
      professions: ['it'],
      actions: [
        {
          id: 'stay_ot_restore',
          label: '⚡ Chấp nhận ở lại OT cày đêm khôi phục code gốc',
          effects: [
            { stat: 'energy', value: -30 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn thức đêm cùng DevOps rà soát sửa lại từng module. Hệ thống xanh trở lại lúc 20h30. Cả đội thở phào nhẹ nhõm. 😮‍💨',
          chatReplies: [
            {
              "senderId": "it_dev",
              "message": "Thức đêm cùng DevOps sửa xong CI/CD xanh trở lại lúc 20h30, vất vả vcl 😮‍💨"
            },
            {
              "senderId": "pm",
              "message": "Hệ thống hoạt động lại bình thường rồi, cảm ơn cả team đã OT cứu nguy nha 🌸"
            }
          ]
        },
        {
          id: 'git_revert_force',
          label: '🗑️ Bấm nút Force Revert toàn bộ nhánh của mình trên Git',
          effects: [
            { stat: 'stress', value: +10 },
            { stat: 'salary', value: -50000 },
          ],
          feedMessage: 'Bạn xóa sạch công sức refactor của mình hôm nay để đưa nhánh về ban đầu. Code chạy lại được nhưng phí phạm cả ngày làm việc. 😔',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Force Revert xóa sạch code refactor, phạt nhẹ 50k điểm chuyên cần vì phí cả ngày làm nhé! 🐐"
            },
            {
              "senderId": "it_dev",
              "message": "Phí hoài cả ngày gõ code refactor xong phải revert sạch sành sanh, đau lòng vcl 😭"
            }
          ]
        },
      ],
    },
    {
      id: 'it_git_conflict',
      title: 'Cơn ác mộng Git Conflict khổng lồ với 140 files! ⚔️',
      description: 'Khi gõ lệnh `git pull origin dev`, màn hình Git báo conflict đỏ ngầu tại 140 files do team khác vừa merge một tính năng lớn đè lên code của bạn.',
      priority: 'high',
      professions: ['it'],
      actions: [
        {
          id: 'resolve_conflicts_manually',
          label: '👨‍💻 Bình tĩnh mở VS Code ngồi giải quyết conflict từng file',
          effects: [
            { stat: 'energy', value: -25 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn kiên nhẫn xem từng dòng khác biệt. Sau 2 tiếng căng mắt so sánh, code được merge sạch sẽ an toàn. 🧘',
          chatReplies: [
            {
              "senderId": "it_dev",
              "message": "Kiên nhẫn ngồi giải quyết conflict 140 files trong 2 tiếng, m đúng là thánh nhẫn nại! 🧘"
            },
            {
              "senderId": "pm",
              "message": "Merge an toàn sạch sẽ rồi cưng ơi, cưng làm việc kỹ lưỡng số 1 🌸"
            }
          ]
        },
        {
          id: 'override_force_git',
          label: '🎲 Chọn ghi đè code mình lên code đối thủ (Đầy mạo hiểm)',
          effects: [
            { stat: 'stress', value: +20 },
            { stat: 'salary', value: -100000 },
          ],
          feedMessage: 'Bạn đè code mình lên. Code bạn chạy được, nhưng làm hỏng toàn bộ tính năng thanh toán của team kia. Họ tức giận lôi bạn lên sếp tổng xử lý. 💀',
          chatReplies: [
            {
              "senderId": "sales",
              "message": "Đm ghi đè code làm hỏng hệ thống thanh toán bên tui rồi, khách chửi um sùm kìa m ơi! 😡"
            },
            {
              "senderId": "sep",
              "message": "Gây họa cho team khác rồi bị lôi lên sếp tổng xử lý kìa, phạt nặng răn đe nhé! 🐐🚨"
            }
          ]
        },
      ],
    },
    {
      id: 'it_coffee_spill',
      title: 'Lỡ tay làm đổ nước ngọt lên bàn phím của đồng nghiệp 🥤',
      description: 'Lúc vươn vai mệt mỏi, bạn vô tình gạt tay làm đổ lon Coca đầy nước thẳng vào chiếc bàn phím cơ đắt tiền trị giá 3 triệu của bạn senior ngồi bên cạnh.',
      priority: 'medium',
      professions: ['it'],
      actions: [
        {
          id: 'compensate_keyboard',
          label: '💸 Đền tiền mua bàn phím mới chịu trách nhiệm (Tốn tiền)',
          effects: [
            { stat: 'salary', value: -300000 },
            { stat: 'stress', value: -10 },
          ],
          feedMessage: 'Bạn xin lỗi chân thành và chuyển khoản 300k hỗ trợ chi phí mua phím mới. Senior vui vẻ bỏ qua, tình cảm anh em team dev khăng khít hơn. 🤝',
          chatReplies: [
            {
              "senderId": "it_dev",
              "message": "Đền 300k mua phím mới tình cảm anh em lại khăng khít, sòng phẳng giàu sang vcl 🤝"
            },
            {
              "senderId": "pm",
              "message": "Cưng hành xử văn minh lịch sự xỉu luôn á, 10 điểm không có nhưng 🌸"
            }
          ]
        },
        {
          id: 'dry_with_paper',
          label: '🧻 Vội vàng rút phím lau giấy vờ như không có gì hỏng',
          effects: [
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn lau tạm nước. Nhưng nước ngọt ngấm vào mạch làm liệt phím liệt nút. Senior phát hiện ra và tỏ ra cực kỳ lạnh nhạt, ghét bỏ bạn. ⚔️',
          chatReplies: [
            {
              "senderId": "it_dev",
              "message": "Lau giấy qua loa làm liệt phím bị senior phát hiện lạnh nhạt ghét bỏ cmnl, dại vcl m ơi 😂"
            },
            {
              "senderId": "hr",
              "message": "Mối quan hệ đồng nghiệp rạn nứt vì chiếc bàn phím, buồn ghê chèn 🎸"
            }
          ]
        },
      ],
    },
    {
      id: 'it_password_expire',
      title: 'Tài khoản nội bộ AD bị khóa do quên mật khẩu cũ 🔒',
      description: 'Hệ thống ép đổi mật khẩu Windows công ty định kỳ. Bạn đổi bừa một mật khẩu dài loằng ngoằng, sáng nay đến công ty không thể gõ trúng mật khẩu để login.',
      priority: 'low',
      professions: ['it'],
      actions: [
        {
          id: 'call_it_desk',
          label: '📞 Cầm điện thoại gọi IT helpdesk xin reset mật khẩu',
          effects: [
            { stat: 'energy', value: -5 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'IT Support bắt bạn đọc mã số nhân viên rồi hỗ trợ reset về mật khẩu mặc định sau 15 phút. Bạn đăng nhập lại thành công. 😮‍💨',
          chatReplies: [
            {
              "senderId": "admin",
              "message": "Gọi IT helpdesk reset mật khẩu sau 15 phút login ngon lành, nhanh gọn lẹ 👍"
            },
            {
              "senderId": "it_dev",
              "message": "Đổi pass dài loằng ngoằng chi cho quên rồi phải nhờ reset hả ông tướng 😂"
            }
          ]
        },
        {
          id: 'try_passwords',
          label: '🔑 Cố gắng gõ thử các mật khẩu hay dùng liên tục',
          effects: [
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn gõ sai quá 5 lần. Tài khoản bị khóa cứng hoàn toàn trong 2 tiếng tiếp theo. Bạn phải ngồi chơi xơi nước chịu phạt. 😭',
          chatReplies: [
            {
              "senderId": "it_dev",
              "message": "Gõ sai 5 lần khóa tài khoản 2 tiếng ngồi chơi xơi nước, quả báo lười gọi helpdesk cmnl 😂"
            },
            {
              "senderId": "pm",
              "message": "Hic bị khóa máy ngồi chơi chịu phạt luôn, thương cưng ghê 😭"
            }
          ]
        },
      ],
    },
    {
      id: 'it_new_1',
      title: 'Deploy production thất bại lúc 17h30 thứ Sáu 🚨',
      description: 'Chỉ còn 30 phút là cuối tuần. Bạn nhấp chuột deploy bản cập nhật cuối cùng trong tuần và... server lăn ra sập, mọi thanh toán bị lỗi.',
      priority: 'critical',
      professions: ['it'],
      actions: [
        {
          id: 'it_new_1_a',
          label: '🔧 Ở lại qua đêm cùng team DevOps để tìm lỗi',
          effects: [
            { stat: 'energy', value: -30 },
            { stat: 'stress', value: +20 },
            { stat: 'salary', value: +150000 },
          ],
          feedMessage: 'Bạn cùng đồng đội thức đến 11h đêm để tìm lỗi syntax và hotfix thành công. Mọi thứ được cứu vãn. 😮‍💨',
          chatReplies: [
            {
              "senderId": "pm",
              "message": "Thức đến 11h đêm cùng DevOps tìm ra lỗi syntax cứu nguy hệ thống, thưởng 150k ting ting! 🌸"
            },
            {
              "senderId": "it_dev",
              "message": "Cuối tuần gánh tạ còng lưng cùng team DevOps, chiến thần cứu thế cmnl 👍"
            }
          ]
        },
        {
          id: 'it_new_1_b',
          label: '🏃 Revert code ngay lập tức và đi về nhà',
          effects: [
            { stat: 'stress', value: +10 },
            { stat: 'energy', value: -10 },
          ],
          feedMessage: 'Bạn nhanh tay revert phiên bản cũ để chạy an toàn, giải quyết sau vào thứ Hai. Cuối tuần tạm yên ổn. 🧘',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Revert code chạy an toàn để thứ Hai tính tiếp, cuối tuần yên ổn, chúc cả nhà nghỉ vui! 🐐"
            },
            {
              "senderId": "it_dev",
              "message": "Nhanh trí revert đi về, dẹp deadline qua một bên tận hưởng cuối tuần đi m ơi 🧘"
            }
          ]
        },
      ],
    },
    {
      id: 'it_new_2',
      title: 'Scrum Master đòi cập nhật Jira chi tiết từng giờ 📋',
      description: 'Scrum Master gửi tin nhắn nhắc nhở: "Em ơi cập nhật log time cho task trên Jira đi nhé, sếp tổng đang kiểm tra chi tiết công việc của từng người đó."',
      priority: 'low',
      professions: ['it'],
      actions: [
        {
          id: 'it_new_2_a',
          label: '⏱️ Dành 30 phút ngồi điền báo cáo chi li chi tiết',
          effects: [
            { stat: 'energy', value: -10 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Bạn hoàn thành bảng Jira đẹp đẽ như mơ. Scrum Master hài lòng khen ngợi sự hợp tác của bạn. 👍',
          chatReplies: [
            {
              "senderId": "pm",
              "message": "Cập nhật Jira chi tiết đẹp như mơ, Scrum Master hài lòng khen ngợi cưng lắm đó 🌸"
            },
            {
              "senderId": "it_dev",
              "message": "Dành 30 phút điền báo cáo chi li đối phó sếp tổng, nể độ siêng năng nha 👍"
            }
          ]
        },
        {
          id: 'it_new_2_b',
          label: '🙅 Khai báo bừa số giờ làm việc cho qua chuyện',
          effects: [
            { stat: 'stress', value: +10 },
          ],
          setFlags: { jira_faked: true },
          feedMessage: 'Bạn điền đại số giờ. PM nghi ngờ vì thấy số liệu quá tròn trịa và không hợp lý nhưng không có bằng chứng. 🤫',
          chatReplies: [
            {
              "senderId": "pm",
              "message": "Khai báo bừa số giờ Jira cho qua chuyện bị Scrum Master nghi ngờ rồi kìa cưng ơi 😂"
            },
            {
              "senderId": "it_dev",
              "message": "Log time Jira ảo lòi 8 tiếng tròn trịa, mẹo này dev nào chả xài haha 🤫"
            }
          ]
        },
      ],
    },
    {
      id: 'it_new_3',
      title: 'Đồng nghiệp từ chối duyệt PR bắt refactor lại logic ⚔️',
      description: 'Bạn tạo PR cho tính năng mới cực kỳ tâm huyết. Senior trong team vào review và từ chối merge, để lại 15 comment yêu cầu refactor toàn bộ logic.',
      priority: 'high',
      professions: ['it'],
      actions: [
        {
          id: 'it_new_3_a',
          label: '🛠️ Kiên nhẫn sửa đổi code theo ý kiến của Senior',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Bạn kiên trì tối ưu hóa code. PR được chấp thuận. Code sạch đẹp và an toàn hơn nhiều. 🧘',
          chatReplies: [
            {
              "senderId": "it_dev",
              "message": "Kiên trì sửa code theo ý Senior, PR được merge sạch đẹp an toàn vcl, 10 điểm! 🧘"
            },
            {
              "senderId": "pm",
              "message": "Chịu khó học hỏi tối ưu code thế này sếp Messi ưng lắm đó nha cưng 🌸"
            }
          ]
        },
        {
          id: 'it_new_3_b',
          label: '🗣️ Nhắn tin tranh luận gay gắt bảo vệ quan điểm cá nhân',
          effects: [
            { stat: 'stress', value: +20 },
          ],
          setFlags: { senior_irritated: true },
          feedMessage: 'Bạn tranh luận nảy lửa trên Slack. Senior phớt lờ không thèm duyệt PR nữa, làm tiến độ của bạn bị nghẽn lại. ⚔️',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Tranh cãi nảy lửa trên Slack làm senior dỗi không duyệt PR nữa, tiến độ nghẽn rồi kìa 🐐"
            },
            {
              "senderId": "it_dev",
              "message": "Đấm nhau tay đôi trên Slack xong PR bị block vô thời hạn, cọc điên thực sự 😂"
            }
          ]
        },
      ],
    },
    {
      id: 'it_new_4',
      title: 'Phát hiện thư viện bên thứ ba đang dùng có lỗ hổng bảo mật cực kỳ nguy hiểm 😱',
      description: 'Hệ thống quét bảo mật báo động: Một thư viện mã nguồn mở quan trọng mà hệ thống thanh toán đang sử dụng có lỗ hổng zero-day nguy hiểm có thể bị hacker khai thác.',
      priority: 'critical',
      professions: ['it'],
      actions: [
        {
          id: 'it_new_4_a',
          label: '🔒 Ngay lập tức nghiên cứu nâng cấp thư viện lên bản vá mới nhất',
          effects: [
            { stat: 'energy', value: -25 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn thức trưa nghiên cứu nâng cấp thư viện. Hệ thống vượt qua bài test an toàn tuyệt đối. PM thở phào nhẹ nhõm. 🔒',
          chatReplies: [
            {
              "senderId": "cto",
              "message": "Nghiên cứu nâng cấp lên bản vá bảo mật thành công, hệ thống an toàn tuyệt đối! 🚀👽"
            },
            {
              "senderId": "pm",
              "message": "Tuyệt vời cưng ơi, Tech Lead bên đối tác nghe tin cũng phải nể cưng vài phần 🌸"
            }
          ]
        },
        {
          id: 'it_new_4_b',
          label: '🩹 Dán tạm một vài đoạn filter chặn request nguy hiểm để mai sửa',
          effects: [
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn viết một đoạn regex filter đơn giản. Nhanh gọn nhưng không triệt để. Bạn vẫn lo thon thót ngộ nhỡ hacker tấn công. 😰',
          chatReplies: [
            {
              "senderId": "it_dev",
              "message": "Viết regex filter chặn tạm bợ lỡ hacker lách qua được là toang đấy m ơi 😰"
            },
            {
              "senderId": "legal",
              "message": "Dán vá tạm bợ thế này vẫn lo thon thót ngộ nhỡ dính đòn tấn công bảo mật ⚖️"
            }
          ]
        },
      ],
    },
    {
      id: 'it_new_5',
      title: 'Máy điều hòa phòng server bị hỏng nhiệt độ tăng vọt 🔥',
      description: 'Hệ thống báo động phòng server hú vang: Nhiệt độ vượt ngưỡng 40 độ do điều hòa trung tâm bị hỏng. Phòng IT báo phải mất 2 tiếng mới có thợ sửa.',
      priority: 'high',
      professions: ['it'],
      actions: [
        {
          id: 'it_new_5_a',
          label: '🏃 Chạy đi bê quạt điện cá nhân vào phòng server thổi tạm',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn cật lực bê 3 cái quạt công suất lớn chạy liên tục cứu hỏa phòng server. Nhiệt độ hạ xuống mức an toàn tạm thời. 🥵',
          chatReplies: [
            {
              "senderId": "it_dev",
              "message": "Bê 3 cái quạt thổi cứu hỏa phòng server mệt phờ râu trê, dũng cảm cứu nguy vcl 🥵"
            },
            {
              "senderId": "admin",
              "message": "Bê quạt chạy phăm phăm cứu server nhìn ngầu đét luôn m ơi, 10 điểm cứu hộ! ✨"
            }
          ]
        },
        {
          id: 'it_new_5_b',
          label: '🖥️ Chủ động tắt bớt các server test/staging để giảm tải tỏa nhiệt',
          effects: [
            { stat: 'energy', value: -10 },
            { stat: 'salary', value: -50000 },
          ],
          feedMessage: 'Bạn tắt các máy chủ phụ. Nhiệt độ giảm nhẹ nhưng làm gián đoạn công việc của cả đội QA và Tester khiến họ tức tối cằn nhằn. 😤',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Tắt server test/staging làm gián đoạn QA/Tester cằn nhằn kìa, phạt trừ 50k lương nhé! 🐐"
            },
            {
              "senderId": "it_dev",
              "message": "QA đang cọc điên vì mất server test đéo làm việc được kìa m ơi, ảo thật đấy 😂"
            }
          ]
        },
      ],
    },
    {
      id: 'it_new_6',
      title: 'Hệ thống CI/CD bị nghẽn không thể deploy test 📉',
      description: 'Hệ thống CI/CD bị đơ nghẽn hàng đợi (queue) do quá nhiều người push code cùng lúc. Team test đang thúc giục bạn giao bản build thử nghiệm gấp.',
      priority: 'medium',
      professions: ['it'],
      actions: [
        {
          id: 'it_new_6_a',
          label: '🛠️ Tự động build file chạy cục bộ và gửi trực tiếp cho QA qua Telegram',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Bạn tự build trên máy cá nhân rồi gửi file trực tiếp. QA có hàng test ngay lập tức nhưng quy trình bảo mật bị vi phạm nhẹ. 🤫',
          chatReplies: [
            {
              "senderId": "it_dev",
              "message": "Tự build file chạy gửi trực tiếp cho QA qua Telegram nhanh gọn lẹ, lách luật xíu 🤫"
            },
            {
              "senderId": "pm",
              "message": "QA nhận được hàng test ngay mừng húm, cưng linh hoạt xử lý xịn xò 🌸"
            }
          ]
        },
        {
          id: 'it_new_6_b',
          label: '🧘 Kiên nhẫn chờ hệ thống giải quyết queue tự động',
          effects: [
            { stat: 'stress', value: -5 },
          ],
          feedMessage: 'Bạn thong thả đi pha cafe. 30 phút sau queue tự động thông suốt, code tự động deploy mượt mà. Đôi khi im lặng là vàng. 🧘',
          chatReplies: [
            {
              "senderId": "it_dev",
              "message": "Thong thả đi pha cafe chờ queue tự động thông suốt, đúng phong thái ung dung 🧘"
            },
            {
              "senderId": "ba",
              "message": "Đôi khi im lặng chờ đợi là vàng, đỡ mất công build tay mệt mỏi hihi 💍"
            }
          ]
        },
      ],
    },
    {
      id: 'it_new_7',
      title: 'Đối tác bất ngờ thay đổi cấu trúc API không thông báo 🔄',
      description: 'Cổng thanh toán điện tử của đối tác đột ngột thay đổi cấu trúc dữ liệu JSON trả về khiến hệ thống mua sắm của công ty bạn báo lỗi 500 hàng loạt.',
      priority: 'critical',
      professions: ['it'],
      actions: [
        {
          id: 'it_new_7_a',
          label: '📲 Gọi điện trực tiếp cho Tech Lead bên đối tác chất vấn',
          effects: [
            { stat: 'energy', value: -10 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn gọi điện làm việc căng thẳng. Đối tác thừa nhận sai sót do deploy lỗi và khẩn cấp revert lại API cũ cho bạn. 👏',
          chatReplies: [
            {
              "senderId": "it_dev",
              "message": "Gọi điện chất vấn bắt Tech Lead đối tác revert API cũ ngay lập tức, uy quyền vcl! 👏"
            },
            {
              "senderId": "pm",
              "message": "Đàm phán căng thẳng bắt đối tác nhận sai và sửa lỗi cực kỳ nhanh trí 🌸"
            }
          ]
        },
        {
          id: 'it_new_7_b',
          label: '🛠️ Tự viết thêm adapter xử lý tương thích cả 2 chuẩn API mới cũ',
          effects: [
            { stat: 'energy', value: -25 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Bạn nhanh chóng viết thêm lớp mapping tương thích. Hệ thống hoạt động trở lại bình thường mà không cần chờ đối tác sửa lỗi. 👍',
          chatReplies: [
            {
              "senderId": "it_dev",
              "message": "Tự viết adapter tương thích 2 chuẩn API mới cũ đỉnh vcl, đéo cần chờ đối tác sửa 👍"
            },
            {
              "senderId": "cto",
              "message": "Adapter xử lý mượt mà, kỹ năng code của bạn ngày càng bá đạo rồi đó 🚀"
            }
          ]
        },
      ],
    },
    {
      id: 'it_new_8',
      title: 'Công ty tổ chức Hackathon cuối tuần bắt buộc tham gia 🏆',
      description: 'Sếp gửi thông báo: "Cuối tuần này công ty tổ chức giải Hackathon để tìm kiếm ý tưởng sản phẩm mới, toàn bộ nhân sự Dev phải có mặt tham gia nhé."',
      priority: 'medium',
      professions: ['it'],
      actions: [
        {
          id: 'it_new_8_a',
          label: '🏆 Nhiệt tình tham gia làm nhóm trưởng, quyết tâm giật giải',
          effects: [
            { stat: 'energy', value: -30 },
            { stat: 'stress', value: +15 },
            { stat: 'salary', value: +200000 },
          ],
          feedMessage: 'Bạn thức trọn 2 ngày cuối tuần viết sản phẩm và xuất sắc đoạt giải Nhì. Nhận thưởng nóng 200k và sự tán dương của ban giám đốc. 🏆',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Thức 2 ngày đoạt giải Nhì Hackathon xuất sắc! Thưởng nóng 200k ting ting! 🐐🏆"
            },
            {
              "senderId": "pm",
              "message": "Nhóm trưởng uy tín giật giải oanh tạc Hackathon luôn chèn ơi, ngưỡng mộ xỉu 🌸"
            }
          ]
        },
        {
          id: 'it_new_8_b',
          label: '🩹 Báo ốm đột xuất xin phép không tham gia',
          effects: [
            { stat: 'stress', value: -10 },
            { stat: 'salary', value: -30000 },
          ],
          feedMessage: 'Bạn trốn giải thành công để ngủ nướng ở nhà. Tuy nhiên sếp ghi nhận sự vắng mặt và trừ nhẹ điểm chuyên cần. 🤫',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Báo ốm trốn giải ngủ nướng bị trừ 30k điểm chuyên cần kỷ luật răn đe nhé! 🐐"
            },
            {
              "senderId": "hr",
              "message": "Trốn Hackathon thành công để ngủ nướng ở nhà, sướng thân nhưng bị trừ lương nha 😂"
            }
          ]
        },
      ],
    },
    {
      id: 'it_new_9',
      title: 'Nhiệm vụ refactor class Java dài 5000 dòng từ 8 năm trước 💀',
      description: 'PM giao cho bạn nhiệm vụ: "Em refactor lại class xử lý logic khuyến mãi này nhé, nó dài quá khó bảo trì." Bạn mở code ra thấy hàng trăm cấu trúc if-else lồng nhau từ thời cổ đại.',
      priority: 'high',
      professions: ['it'],
      actions: [
        {
          id: 'it_new_9_a',
          label: '🔧 Dành cả ngày phân tích viết lại sạch đẹp bằng Design Pattern',
          effects: [
            { stat: 'energy', value: -25 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn viết lại logic cực kỳ gọn gàng chuyên nghiệp bằng Strategy Pattern. Cả team trầm trồ kính phục khả năng của bạn. 🧘',
          chatReplies: [
            {
              "senderId": "it_dev",
              "message": "Dùng Strategy Pattern refactor class 5000 dòng sạch đẹp, cả team trầm trồ kính phục! 🧘"
            },
            {
              "senderId": "cto",
              "message": "Refactor code sạch sẽ chuẩn mực thế này đọc sướng cả mắt, m giỏi lắm 🚀👽"
            }
          ]
        },
        {
          id: 'it_new_9_b',
          label: '🩹 Sửa đúng chỗ bug cần rồi đóng file lại ngay lập tức',
          effects: [
            { stat: 'energy', value: -5 },
          ],
          feedMessage: 'Quy tắc vàng: Cái gì không hỏng thì đừng sửa. Bạn sửa đúng 1 dòng bị lỗi rồi tắt file đi ăn trưa. Rất khôn ngoan. 🤫',
          chatReplies: [
            {
              "senderId": "it_dev",
              "message": "Quy tắc vàng: Cái gì đéo hỏng thì đừng sửa! Vá đúng 1 dòng bị lỗi rồi đi ăn trưa, khôn ngoan vcl 🤫"
            },
            {
              "senderId": "pm",
              "message": "Sửa nhanh gọn lẹ hết bug đi ăn trưa vui vẻ, cưng biết chọn cách tối ưu ghê 🌸"
            }
          ]
        },
      ],
    },
    {
      id: 'it_new_10',
      title: 'Sếp nhờ sửa gấp lỗi hệ thống lúc 23h đêm không tính OT 🌙',
      description: 'Sếp nhắn tin riêng: "Em ơi khách VIP báo lỗi không mua hàng được, em rảnh online xem hộ anh một chút nhé, gấp lắm." Giao dịch này không có trong log OT chính thức.',
      priority: 'high',
      professions: ['it'],
      actions: [
        {
          id: 'it_new_10_a',
          label: '🤝 Online fix khẩn cấp hỗ trợ sếp nhiệt tình',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn nhanh chóng tìm ra lỗi và sửa xong sau 15 phút. Sếp cực kỳ cảm kích và hứa sẽ ưu ái bạn trong kỳ review tới. 🤝',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Online fix lỗi khẩn cấp lúc 23h đêm hỗ trợ nhiệt tình, sếp ghi nhận và sẽ ưu ái nhé! 🐐🏆"
            },
            {
              "senderId": "pm",
              "message": "Thương cưng quá đêm hôm còn online cứu nguy sếp, đúng là nhân viên ưu tú 🌸"
            }
          ]
        },
        {
          id: 'it_new_10_b',
          label: '😴 Vờ như đã ngủ say, tắt thông báo điện thoại đi ngủ tiếp',
          effects: [
            { stat: 'stress', value: -5 },
          ],
          feedMessage: 'Bạn tắt mạng đi ngủ. Sáng hôm sau tỉnh dậy báo tin nhắn: "Dạ tối qua em ngủ say quá không check máy kịp." Sếp không thể trách bạn được. 😴',
          chatReplies: [
            {
              "senderId": "sep",
              "message": "Vờ ngủ say tắt máy đi ngủ tiếp sáng ra xin lỗi, khôn khéo vcl sếp đéo trách được 😂"
            },
            {
              "senderId": "it_dev",
              "message": "Tắt mạng đi ngủ là chuẩn bài, đêm hôm 23h đéo có OT tội gì cày m ơi 😴"
            }
          ]
        },
      ],
    },
  ],
}

export default itPack
