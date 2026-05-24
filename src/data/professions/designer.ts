// src/data/professions/designer.ts
import type { ProfessionPack } from '../../types/game.types'

export const designerPack: ProfessionPack = {
  config: {
    id: 'designer',
    name: 'Designer',
    emoji: '🎨',
    tagline: 'Thiết kế là nghệ thuật truyền tải thông điệp. Nhưng khách lại muốn "logo to hơn và phát sáng".',
    difficulty: 'Trung bình',
    enemy: 'Figma crash, feedback vô tận, logo đổi màu phong thủy, lỗi bản quyền font',
    startingStats: {
      stress: 30,
      energy: 90,
      salary: 500000,
    },
    dailySalary: 520000,
  },
  buffs: [
    {
      id: 'figma_pro',
      name: 'Adobe Creative Cloud',
      description: 'Gói Adobe bản quyền xịn nhất. Tha hồ vẽ Illustrator, Photoshop mượt mà không lo bị khóa, lỗi hay crash.',
      cost: 450000,
      icon: '🎨',
      duration: 'permanent',
      effects: [
        { stat: 'stress', value: -15 },
        { stat: 'energy', value: 10 },
      ],
    },
    {
      id: 'pinterest_premium',
      name: 'Freepik Premium',
      description: 'Tải vector, stock ảnh chất lượng cao không giới hạn. Ý tưởng dồi dào, tha hồ xào nấu thiết kế siêu tốc.',
      cost: 250000,
      icon: '📸',
      duration: 'permanent',
      effects: [
        { stat: 'energy', value: 15 },
        { stat: 'stress', value: -10 },
      ],
    },
    {
      id: 'drawing_tablet',
      name: 'Wacom Intuos Pro',
      description: 'Bút vẽ siêu nhạy, nét vẽ tay mượt mà. Tăng tốc độ phác thảo storyboard và minh họa nhân vật lên gấp 3.',
      cost: 600000,
      icon: '✍️',
      duration: 'permanent',
      effects: [
        { stat: 'energy', value: 20 },
        { stat: 'stress', value: -10 },
      ],
    },
    {
      id: 'color_wheel',
      name: 'Thuốc nhỏ mắt nhỏ gáy',
      description: 'Combo xoa dịu đôi mắt cận lồi và cái gáy đơ cứng sau 16 tiếng cày Figma liên tục. Nhỏ giọt tỉnh cả người.',
      cost: 150000,
      icon: '👁️',
      duration: 'day',
      effects: [
        { stat: 'stress', value: -15 },
        { stat: 'energy', value: 5 },
      ],
    },
  ],
  events: [
    {
      id: 'ds_logo_feedback',
      title: 'Khách hàng chê logo không hợp phong thủy 🎡',
      description: 'Khách hàng xem bản nháp logo: "Anh mệnh Kim, em thiết kế màu đỏ thế này là Hỏa khắc Kim, hỏng hết làm ăn của anh. Đổi màu gấp."',
      priority: 'high',
      professions: ['designer'],
            actions: [
        {
          id: 'change_color_fengshui',
          label: '🎨 Đổi sang màu vàng kim/trắng phong thủy',
          effects: [
            { stat: 'stress', value: +10 },
            { stat: 'energy', value: -15 },
          ],
          setFlags: { color_changed: true },
          feedMessage: 'Bạn bấm bụng đổi toàn bộ dải màu logo sang vàng ánh kim. Trông khá sến nhưng khách cười hỷ hả khen bạn tinh tế. 🤫',
        },
        {
          id: 'explain_color_theory',
          label: '🗣️ Trình bày lý thuyết màu sắc hiện đại để giữ nguyên tone đỏ',
          effects: [
            { stat: 'stress', value: +20 },
          ],
          feedMessage: 'Bạn gửi bài phân tích dài 3 trang về nhận diện thương hiệu hiện đại. Khách im lặng không phản hồi, không khí bắt đầu căng thẳng. ⚔️',
        },
      ],
    },
    {
      id: 'ds_logo_resize',
      title: 'Yêu cầu huyền thoại: "Làm logo to hơn và phát sáng" 🌟',
      description: 'Ý kiến từ phu nhân của sếp tổng: "Logo bé quá không ai nhìn thấy, em cho logo to gấp 3 lần lên giữa banner, rồi làm hiệu ứng phát sáng lấp lánh nhé."',
      priority: 'high',
      professions: ['designer'],
            actions: [
        {
          id: 'obey_resize',
          label: '👨‍🎨 Làm to logo và thêm viền neon phát sáng (Chấp nhận đau thương)',
          effects: [
            { stat: 'stress', value: +15 },
            { stat: 'energy', value: -10 },
          ],
          feedMessage: 'Bạn phóng to logo đè lên mặt nhân vật chính, thêm viền neon xanh vàng. Bức thiết kế trông như một thảm họa thẩm mỹ, nhưng sếp gật đầu khen đẹp. 😭',
        },
        {
          id: 'make_alternative',
          label: '🎨 Làm thêm 1 option tinh tế khác để đối chiếu thuyết phục',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Bạn kỳ công làm thêm 1 option tối giản sang trọng. Sau 30 phút đối chiếu thuyết phục, sếp đồng ý chọn phương án tinh tế. Thắng lợi nghệ thuật! 🧘',
        },
      ],
    },
    {
      id: 'ds_pm_urgency',
      title: 'PM đòi gấp 3 phương án banner trong 1 tiếng ⏰',
      description: 'Lúc 10h30 sáng, PM chạy xồng xộc vào bàn: "Em ơi bên khách hàng cần xem gấp 3 layout banner cho chiến dịch chiều nay, 11h30 gửi anh duyệt nha."',
      priority: 'critical',
      professions: ['designer'],
            actions: [
        {
          id: 'rush_3_options',
          label: '⚡ Vẽ nhanh bằng cách đổi background và vị trí text',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +10 },
          ],
          setFlags: { ds_deadline_approaching: true },
          feedMessage: 'Bạn dùng thủ thuật nhân bản, đổi vị trí trái phải, đổi hình nền. 3 option xong trong 45 phút. PM duyệt vội mang đi. 🤫',
        },
        {
          id: 'demand_realistic_deadline',
          label: '🙅 Từ chối thẳng: "Cần ít nhất 3 tiếng mới có sản phẩm chất lượng"',
          effects: [
            { stat: 'stress', value: +15 },
            { stat: 'salary', value: -50000 },
          ],
          feedMessage: 'Bạn từ chối làm ẩu. PM bực dọc báo cáo lên sếp. Bạn bị sếp nhắc nhở về "tốc độ đáp ứng công việc của phòng thiết kế". 😭',
        },
      ],
    },
    {
      id: 'ds_font_license',
      title: 'Rắc rối: Phát hiện font chữ trong banner chưa mua bản quyền 📄',
      description: 'Banner chiến dịch lớn vừa lên sóng thì bị một designer cộng đồng bóc phốt trên Facebook vì sử dụng font chữ trả phí chưa mua giấy phép thương mại.',
      priority: 'critical',
      professions: ['designer'],
            actions: [
        {
          id: 'buy_font_license',
          label: '💸 Tự bỏ tiền túi mua gói bản quyền font gấp (Tốn tiền)',
          effects: [
            { stat: 'salary', value: -200000 },
            { stat: 'stress', value: -10 },
          ],
          feedMessage: 'Bạn lập tức mua bản quyền font 200k để lấy invoice hợp lệ. Vụ phốt được giải quyết êm thấm, công ty thoát nạn bản quyền thương hiệu. 💸',
        },
        {
          id: 'replace_font_free',
          label: '🛠️ Gỡ banner xuống, thay bằng font Google Free rồi up lại',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn cắm đầu sửa font, xuất file lại và up đè lên hệ thống. Bài viết bị tụt tương tác do gỡ đi up lại. Sếp càu nhàu vì lỗi bất cẩn của bạn. 😮‍💨',
        },
      ],
    },
    {
      id: 'ds_render_crash',
      title: 'Figma báo "Out of Memory" và crash lúc 16h55 💀',
      description: 'Bạn đang xuất file in ấn banner khổ lớn 10 mét để gửi nhà in trước 17h. Figma bỗng đơ ra, báo đỏ lịm "Out of memory" rồi tự đóng ứng dụng.',
      priority: 'critical',
      professions: ['designer'],
            actions: [
        {
          id: 'reboot_optimize_figma',
          label: '💻 Khởi động lại máy, nén bớt hình ảnh rồi xuất lại',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Khởi động lại máy, dùng plugin nén dung lượng vector. Cuối cùng file cũng được xuất thành công lúc 17h10. Trễ hẹn nhà in một chút nhưng vẫn kịp. 😮‍💨',
        },
        {
          id: 'send_source_to_colleague',
          label: '👥 Share link Figma nhờ đồng nghiệp dùng máy xịn xuất hộ',
          effects: [
            { stat: 'stress', value: -5 },
            { stat: 'salary', value: -30000 },
          ],
          feedMessage: 'Nhờ chị đồng nghiệp dùng máy iMac xịn xuất file hộ. File ra vèo vèo. Bạn gửi kịp giờ và khao chị ấy cốc trà sữa 30k. 🥤',
        },
      ],
    },
    {
      id: 'ds_client_feedback_loop',
      title: 'Khách hàng lọt vào vòng lặp feedback vô tận 🔄',
      description: 'Xem xong bản thiết kế đổi màu hôm trước, khách hàng nhắn: "Em ơi ngắm đi ngắm lại anh thấy màu cũ tone đỏ vẫn đẹp hơn. Em đổi lại màu đỏ ban đầu nhé."',
      priority: 'high',
      professions: ['designer'],
            requirements: {
        flags: { color_changed: true },
      },
      actions: [
        {
          id: 'revert_to_original',
          label: '😭 Khóc thầm, nhấn Undo/mở file gốc copy lại',
          effects: [
            { stat: 'stress', value: +20 },
            { stat: 'energy', value: -10 },
          ],
          setFlags: { color_changed: false },
          feedMessage: 'Bạn bấm bụng revert lại bản cũ. Cảm giác bao nhiêu công sức sửa phong thủy hôm trước tan thành mây khói. 😭',
        },
        {
          id: 'explain_professional_opinion',
          label: '💪 Kiên quyết từ chối đổi qua đổi lại, bảo vệ bản hiện tại',
          effects: [
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn gửi mail trình bày rõ ràng: "Việc thay đổi liên tục sẽ làm trễ tiến độ ra mắt". Khách hàng giật mình đồng ý duyệt luôn bản hiện tại. Thần thái! 🧘',
        },
      ],
    },
    {
      id: 'ds_creative_block',
      title: 'Cơn ác mộng: Cạn kiệt ý tưởng sáng tạo (Creative Block) 🧠',
      description: 'Ngồi nhìn chằm chằm vào canvas trắng trên Figma suốt 1 tiếng đồng hồ mà đầu óc trống rỗng. Không biết vẽ gì, phối màu gì cho dự án mới.',
      priority: 'medium',
      professions: ['designer'],
            actions: [
        {
          id: 'browse_pinterest',
          label: '📌 Lên Behance/Pinterest "mượn ý tưởng" (Copy layout)',
          effects: [
            { stat: 'energy', value: -10 },
            { stat: 'stress', value: -10 },
          ],
          feedMessage: 'Bạn lướt Pinterest 30 phút, tìm thấy một concept của Nga khá hợp. Bạn xào nấu lại bố cục và bắt tay vào vẽ cực nhanh. 🤫',
        },
        {
          id: 'take_walk_pantry',
          label: '🚶 Rời bàn làm việc, đi dạo và uống nước lọc giải tỏa đầu óc',
          effects: [
            { stat: 'energy', value: +15 },
            { stat: 'stress', value: -15 },
          ],
          feedMessage: 'Đi bộ quanh văn phòng, hít thở sâu. Khi quay lại bàn, ý tưởng bất ngờ tuôn trào trong đầu bạn. Khoa học đã chứng minh đi dạo giúp sáng tạo! 🧘',
        },
      ],
    },
    {
      id: 'ds_banner_spec_change',
      title: 'Đổi kích thước banner phút chót (Spec Change) 🔄',
      description: 'Banner đã được duyệt, chuẩn bị lên bài chạy ads. Bỗng đại diện nhãn hàng nhắn: "Em ơi bên anh đổi kênh chạy ads, em đổi banner ngang 1920x1080 thành banner dọc 1080x1920 giùm anh nhé."',
      priority: 'critical',
      professions: ['designer'],
            actions: [
        {
          id: 'manual_rearrange',
          label: '🛠️ Sắp xếp thủ công lại bố cục text và hình ảnh cho cân đối',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn tỉ mỉ kéo dãn background, di chuyển text lên trên, căn lề lại. Bản dọc trông cũng rất bắt mắt. Gửi đi thành công. 🛠️',
        },
        {
          id: 'stretch_image_fast',
          label: '⚡ Bôi rộng hình, kéo dãn cưỡng bức cho khớp khung hình (Mẹo bẩn)',
          effects: [
            { stat: 'energy', value: -5 },
            { stat: 'stress', value: +5 },
            { stat: 'salary', value: -30000 },
          ],
          feedMessage: 'Bạn kéo dãn cưỡng bức khiến nhân vật trong banner trông hơi mập và méo. Khách phát hiện bắt đền, bạn phải sửa lại và bị phạt nhẹ 30k. 😭',
        },
      ],
    },
    {
      id: 'ds_portfolio_leak',
      title: 'Vô tình làm leak thiết kế dự án chưa ra mắt 😱',
      description: 'Để cập nhật portfolio cá nhân trên Behance, bạn vô tình đăng ảnh mockup của một dòng sản phẩm mới tinh của đối tác sắp ra mắt vào tuần sau.',
      priority: 'critical',
      professions: ['designer'],
            actions: [
        {
          id: 'delete_behance_fast',
          label: '⚡ Lập tức xóa bài viết Behance trong vòng 5 phút',
          effects: [
            { stat: 'stress', value: +15 },
            { stat: 'energy', value: -5 },
          ],
          feedMessage: 'Bạn hớt hải xóa bài đăng. May mắn là chưa ai kịp chụp màn hình. Một phen hú vía nhớ đời. 😮‍💨',
        },
        {
          id: 'apologize_client_ndas',
          label: '😔 Thừa nhận với sếp, gửi thư xin lỗi đối tác',
          effects: [
            { stat: 'stress', value: +25 },
            { stat: 'salary', value: -200000 },
          ],
          feedMessage: 'Bạn dũng cảm nhận lỗi. Đối tác yêu cầu ký cam kết không tái phạm, sếp trừ 200k điểm chuyên cần vì vi phạm bảo mật NDA. 💀',
        },
      ],
    },
    {
      id: 'ds_final_campaign_launch',
      title: 'CHIẾN DỊCH KHỞI TRANH: Banner phủ sóng mạng xã hội! 🚀',
      description: 'Đến giờ G. Banner thiết kế của bạn chính thức được hiển thị trên trang chủ và toàn bộ chiến dịch quảng cáo lớn của nhãn hàng.',
      priority: 'critical',
      professions: ['designer'],
            actions: [
        {
          id: 'launch_success_standard',
          label: '🎉 Banner lên sóng, nhận lời khen ngợi từ đối tác',
          effects: [
            { stat: 'salary', value: +250000 },
            { stat: 'stress', value: -20 },
            { stat: 'energy', value: +10 },
          ],
          requirements: {
            flags: { ds_deadline_approaching: false },
          },
          feedMessage: 'Mọi chi tiết sắc nét, bố cục hoàn hảo. Khách hàng nức nở khen ngợi thiết kế đẳng cấp. Hoa hồng +250k ting ting về ví! 🎉',
        },
        {
          id: 'launch_rushed_issues',
          label: '⚠️ Banner lên sóng nhưng bị lỗi lệch text nhẹ do làm vội',
          effects: [
            { stat: 'salary', value: +100000 },
            { stat: 'stress', value: +15 },
          ],
          requirements: {
            flags: { ds_deadline_approaching: true },
          },
          setFlags: { ds_deadline_approaching: false },
          feedMessage: 'Banner chạy kịp deadline nhưng do làm vội (3 option/1 tiếng), text bị lệch lề nhẹ trên một số màn hình mobile. Nhận hoa hồng ít hơn. 😮‍💨',
        },
      ],
    },
    {
      id: 'ds_rgb_cmyk_mixup',
      title: 'Xuất nhầm hệ màu in ấn CMYK sang RGB 💀',
      description: 'Lúc gửi file in ấn catalog giới thiệu sản phẩm mới cho nhà in, do sơ ý bạn quên không chuyển profile màu từ RGB sang CMYK. Nhà in vừa ship catalog mẫu đến: toàn bộ màu sắc bị xỉn, đen ngòm như bùn.',
      priority: 'critical',
      professions: ['designer'],
            actions: [
        {
          id: 'convert_reexport_cmyk',
          label: '🛠️ Mở Photoshop chỉnh lại hệ màu CMYK và xuất file in lại',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn cẩn thận căn chỉnh và xuất lại file CMYK chuẩn. Nhà in hỗ trợ in lại mẫu thử mới đẹp lung linh sắc nét. 😮‍💨',
        },
        {
          id: 'blame_printer_press',
          label: '🗣️ Đổ lỗi do nhà in sử dụng mực in chất lượng kém',
          effects: [
            { stat: 'stress', value: +15 },
            { stat: 'salary', value: -80000 },
          ],
          feedMessage: 'Bạn đổ lỗi cho nhà in. Tuy nhiên, họ gửi lại thông số file gốc của bạn ghi rõ hệ màu RGB. Sếp la bạn một trận vì lỗi sơ đẳng và trừ 80k tiền lương. 💀',
        },
      ],
    },
    {
      id: 'ds_plagiarism_claim',
      title: 'Poster chiến dịch bị đối thủ tố cáo đạo nhái ý tưởng ⚔️',
      description: 'Một email chính thức từ phòng pháp chế của công ty đối thủ gửi đến cáo buộc poster sự kiện mới của bạn đạo nhái hoàn toàn bố cục thiết kế độc quyền của họ.',
      priority: 'critical',
      professions: ['designer'],
            actions: [
        {
          id: 'redesign_poster_layout',
          label: '🎨 Cấp tốc thay đổi bố cục và màu sắc poster mới trong 2 tiếng',
          effects: [
            { stat: 'energy', value: -25 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn cấp tốc đổi layout sang phong cách tối giản. Poster mới nhìn thậm chí còn sang trọng và hiện đại hơn. Đối thủ đành im lặng rút đơn khiếu nại. 🧘',
        },
        {
          id: 'defend_design_inspiration',
          label: '🗣️ Viết thư phản bác, chứng minh đây chỉ là sự trùng hợp cảm hứng',
          effects: [
            { stat: 'stress', value: +20 },
          ],
          feedMessage: 'Pháp chế hai bên tranh cãi gay gắt. Sự việc kéo dài làm ảnh hưởng uy tín thương hiệu của công ty. Sếp tổng cực kỳ không vui với drama này. 💀',
        },
      ],
    },
    {
      id: 'ds_free_trial_expired',
      title: 'Bộ công cụ Adobe Creative Cloud hết hạn bản quyền! 🔒',
      description: 'Mở Illustrator lên vẽ vector thì màn hình báo: "Your free trial has expired." Sếp từ chối chi tiền mua bản quyền vì kinh phí eo hẹp: "Em tìm cách crack dùng tạm đi em."',
      priority: 'high',
      professions: ['designer'],
            actions: [
        {
          id: 'buy_personal_license',
          label: '💸 Tự bỏ tiền túi mua gói cá nhân giảm giá dành cho học sinh (Tốn tiền)',
          effects: [
            { stat: 'salary', value: -120000 },
            { stat: 'stress', value: -15 },
          ],
          feedMessage: 'Bạn chi 120k mua gói bản quyền cá nhân. Phần mềm chạy bản quyền chính hãng cực mượt, không lo dính virus từ các bản crack trôi nổi. 💸',
        },
        {
          id: 'use_free_figma_vector',
          label: '💻 Chuyển toàn bộ công việc vẽ vector sang Figma miễn phí',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn dùng công cụ pen tool của Figma để vẽ tạm. Hơi mất thời gian làm quen nhưng công việc vẫn hoàn thành đúng tiến độ không mất tiền. 🧘',
        },
      ],
    },
    {
      id: 'ds_monitor_color_imbalance',
      title: 'Màn hình Dell bị lệch màu: Máy mình cực đẹp, máy sếp xám xịt 🖥️',
      description: 'Bạn thiết kế tông màu pastel hồng cam cực kỳ trendy nhã nhặn. Nhưng sếp mở file trên máy sếp thì la toáng lên: "Sao màu xám xịt, tối tăm như đám ma thế này em?"',
      priority: 'high',
      professions: ['designer'],
            actions: [
        {
          id: 'calibrate_monitor',
          label: '🛠️ Mượn thiết bị Spyder để cân chỉnh lại màu sắc màn hình chuẩn',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: -10 },
          ],
          feedMessage: 'Sau khi cân chỉnh lại, màu sắc hiển thị đồng nhất trên các thiết bị. Sếp gật đầu đồng ý duyệt thiết kế. 🧘',
        },
        {
          id: 'adjust_color_for_boss',
          label: '🎨 Cố tình chỉnh màu rực rỡ lố bịch lên cho vừa mắt sếp',
          effects: [
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn tăng bão hòa màu cực mạnh làm thiết kế trông lòe loẹt. Sếp khen đẹp duyệt ngay, nhưng bạn cảm thấy lòng tự trọng nghệ thuật bị tổn thương. 😭',
        },
      ],
    },
    {
      id: 'ds_intern_messy_layers',
      title: 'Cơn ác mộng nhận file bàn giao từ Intern thiết kế 📂',
      description: 'Intern nghỉ việc bàn giao lại file Figma. Mở ra bạn muốn xỉu: Hàng ngàn layer không đặt tên (Group 24, Rectangle 142) chồng chéo lên nhau, không sử dụng auto layout.',
      priority: 'medium',
      professions: ['designer'],
            actions: [
        {
          id: 'reorganize_layers_manually',
          label: '🛠️ Dành 2 tiếng dọn dẹp, đặt tên lại layer và cài đặt auto layout',
          effects: [
            { stat: 'energy', value: -25 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'File thiết kế được dọn dẹp sạch sẽ chuẩn chỉ. Từ nay về sau chỉnh sửa kích thước hay nội dung cực kỳ nhanh chóng. Rất bõ công! 🛠️',
        },
        {
          id: 'edit_directly_messy',
          label: '⚡ Kệ đi, cứ click đúp chọn bừa layer để sửa trực tiếp',
          effects: [
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn sửa đè lên. Mỗi lần di chuyển một chữ là đống hình nền chạy loạn xạ. Cực kỳ ức chế và mệt mỏi đầu óc. 😭',
        },
      ],
    },
    {
      id: 'ds_stock_watermark',
      title: 'Lỗi tai hại: Banner truyền thông còn dính logo mờ Shutterstock 😱',
      description: 'Banner đã được duyệt và đăng lên fanpage có hàng vạn lượt theo dõi. Đột ngột sếp phát hiện ở góc dưới hình ảnh có dính mờ chữ "Shutterstock" do bạn quên chưa thay ảnh mua bản quyền.',
      priority: 'critical',
      professions: ['designer'],
            actions: [
        {
          id: 'buy_stock_replace',
          label: '💸 Trích quỹ mua ngay ảnh bản quyền xịn đè lên (Tốn tiền)',
          effects: [
            { stat: 'salary', value: -50000 },
            { stat: 'stress', value: -10 },
          ],
          feedMessage: 'Bạn mua ảnh bản quyền 50k rồi cập nhật nhanh file sạch lên fanpage. Khán giả chưa kịp phát hiện phốt bản quyền. An toàn! 😮‍💨',
        },
        {
          id: 'photoshop_clone_stamp',
          label: '🛠️ Dùng công cụ Clone Stamp bôi xóa thủ công chữ mờ (Mẹo bẩn)',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn bôi xóa chữ mờ. Tuy nhiên hình ảnh trông hơi nhòe nhoẹt. Khán giả vào comment bóc phốt xài hình lậu làm sếp giận tím mặt. 💀',
        },
      ],
    },
    {
      id: 'ds_client_font_ugly',
      title: 'Khách hàng kiên quyết bắt dùng font chữ thảm họa 🤮',
      description: 'Đối tác gửi phản hồi: "Anh thấy font chữ hiện tại cứng quá, em đổi toàn bộ tiêu đề thương hiệu sang font Comic Sans hoặc Thư Pháp cho nó mềm mại và gần gũi nhé."',
      priority: 'high',
      professions: ['designer'],
            actions: [
        {
          id: 'obey_ugly_font',
          label: '😭 Đồng ý đổi font theo ý khách (Chấp nhận đau đớn thẩm mỹ)',
          effects: [
            { stat: 'stress', value: +20 },
            { stat: 'energy', value: -10 },
          ],
          feedMessage: 'Bạn đổi sang font Comic Sans. Banner trông như thiết kế của học sinh tiểu học năm 2005. Khách cực kỳ ưng ý ký duyệt ngay. 😭',
        },
        {
          id: 'suggest_elegant_serif',
          label: '🎨 Đề xuất phương án font Serif lịch lãm làm trung gian',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: -5 },
          ],
          feedMessage: 'Bạn khéo léo chọn font chữ cổ điển có chân quý phái để đáp ứng độ "mềm" của khách nhưng vẫn giữ được độ sang trọng của thiết kế. Khách đồng ý gật đầu! 🧘',
        },
      ],
    },
    {
      id: 'ds_mouse_dead',
      title: 'Chuột Logitech làm việc bị lỗi double click liên tục 🖱️',
      description: 'Chiếc chuột yêu quý của bạn dở chứng, mỗi lần click chuột trái là nó tự động nhận thành double click khiến bạn không thể kéo thả đối tượng trên Figma.',
      priority: 'medium',
      professions: ['designer'],
            actions: [
        {
          id: 'buy_new_mouse',
          label: '💸 Đặt mua ngay chuột Logitech MX Master mới (Tốn tiền)',
          effects: [
            { stat: 'salary', value: -500000 },
            { stat: 'stress', value: -15 },
            { stat: 'energy', value: +10 },
          ],
          feedMessage: 'Chi 500k tậu chuột xịn chuyên nghiệp. Kéo thả mượt mà như lướt trên băng, hiệu suất thiết kế tăng vọt. Đáng đồng tiền bát gạo! 💸',
        },
        {
          id: 'use_trackpad_temp',
          label: '💻 Cố gắng gồng mình dùng trackpad bàn phím laptop để thiết kế',
          effects: [
            { stat: 'energy', value: -25 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Vẽ vector bằng trackpad là cực hình. Ngón tay bạn mỏi nhừ, trỏ chuột lệch liên tục làm tiến độ chậm hẳn. Cực kỳ ức chế. 😭',
        },
      ],
    },
    {
      id: 'ds_moodboard_rejected',
      title: 'Bản Moodboard định hướng thương hiệu bị bác bỏ hoàn toàn 💔',
      description: 'Bạn dành 2 ngày xây dựng moodboard màu sắc và phong cách hình ảnh cho nhãn hàng mới. Đại diện thương hiệu xem qua phán một câu xanh rờn: "Thiếu cảm xúc em ơi, làm lại toàn bộ đi."',
      priority: 'critical',
      professions: ['designer'],
            actions: [
        {
          id: 'interview_client_deep',
          label: '🗣️ Tổ chức họp sâu, hỏi cặn kẽ 10 câu hỏi để tìm đúng ý khách',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Bạn khai thác kỹ và phát hiện họ thích phong cách Retro thập niên 90. Bản làm lại tiếp theo trúng phóc ý đồ của họ. 👏',
        },
        {
          id: 'redo_blindly_pinterest',
          label: '🎲 Làm đại 1 bản rực rỡ khác lấy từ Pinterest đắp vào',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +20 },
          ],
          feedMessage: 'Bạn vẽ bừa bản mới. Khách lại tiếp tục chê và đòi sửa tiếp. Bạn lọt sâu vào vòng xoáy sửa đổi không lối thoát. 💀',
        },
      ],
    },
    {
      id: 'ds_compress_quality',
      title: 'Sếp ép nén chất lượng ảnh banner xuống dưới 100KB 📉',
      description: '"Website chạy chậm quá, em nén ảnh banner trang chủ xuống dưới 100KB giùm anh nhé." Thiết kế của bạn nén xuống dung lượng đó trông nhạt nhòa, vỡ hạt lem nhem.',
      priority: 'low',
      professions: ['designer'],
            actions: [
        {
          id: 'convert_to_webp_quality',
          label: '🛠️ Chuyển đổi định dạng sang WebP nén không mất chi tiết',
          effects: [
            { stat: 'energy', value: -10 },
          ],
          feedMessage: 'WebP cứu cánh! Dung lượng chỉ còn 85KB nhưng hình ảnh sắc nét tuyệt đối. Sếp và IT đều tấm tắc khen trình độ kỹ thuật của bạn. 🧘',
        },
        {
          id: 'save_jpg_low_quality',
          label: '🩹 Cứ save đại JPG chất lượng 20% gửi sếp cho xong',
          effects: [
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn xuất ảnh chất lượng thấp. Ảnh tải nhanh thật nhưng trông nhòe nhoẹt bôi bác làm khách hàng phàn nàn web thiếu chuyên nghiệp. 😮‍💨',
        },
      ],
    },
    {
      id: 'ds_new_1',
      title: 'In thử poster ra hệ màu bị lệch trầm trọng (CMYK vs RGB) 🎨',
      description: 'Bạn gửi file thiết kế poster cho nhà in. Khi nhận bản in thử, bạn tá hỏa phát hiện màu sắc bị xỉn màu, xám xịt do lỡ xuất file bằng hệ màu RGB thay vì CMYK.',
      priority: 'high',
      professions: ['designer'],
      actions: [
        {
          id: 'ds_new_1_a',
          label: '🛠️ Cẩn thận mở file gốc convert toàn bộ asset sang CMYK và re-export',
          effects: [
            { stat: 'energy', value: -20 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Bạn kiên nhẫn chuyển đổi từng màu sắc. Bản in lại chuẩn màu sắc nét tuyệt đối. PM khen ngợi sự cẩn thận của bạn. 🧘',
        },
        {
          id: 'ds_new_1_b',
          label: '🗣️ Đổ lỗi do máy in của nhà in bị lệch màu để thoái thác trách nhiệm',
          effects: [
            { stat: 'stress', value: +15 },
            { stat: 'salary', value: -50000 },
          ],
          feedMessage: 'Bạn cãi chày cãi cối. Nhưng nhà in gửi bằng chứng file gốc của bạn là RGB. Sếp bực mình trừ lương phạt bạn 50k lỗi cẩu thả. 😭',
        },
      ],
    },
    {
      id: 'ds_new_2',
      title: 'Đối thủ gửi thư cảnh cáo bản quyền font chữ đang dùng 😱',
      description: 'Một email pháp lý gửi đến công ty: Chiến dịch banner truyền thông mới của bạn đang sử dụng một font chữ độc quyền chưa mua bản quyền thương mại.',
      priority: 'critical',
      professions: ['designer'],
      actions: [
        {
          id: 'ds_new_2_a',
          label: '🔒 Ngay lập tức thay thế font chữ đó bằng font Google Fonts miễn phí tương tự',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn nhanh chóng chỉnh sửa toàn bộ 20 banner thay font mới. Vụ việc được dàn xếp êm đẹp trước khi bị phạt nặng. 🔒',
        },
        {
          id: 'ds_new_2_b',
          label: '💸 Thuyết phục sếp duyệt ngân sách mua bản quyền font chữ đó gấp',
          effects: [
            { stat: 'salary', value: -100000 },
          ],
          feedMessage: 'Sếp đồng ý duyệt mua bản quyền 1 triệu (trừ 100k điểm lương). File thiết kế được giữ nguyên phong cách tuyệt đẹp ban đầu. 💸',
        },
      ],
    },
    {
      id: 'ds_new_3',
      title: 'Bản quyền phần mềm Adobe Creative Cloud hết hạn đột xuất 🔒',
      description: 'Vừa mở Illustrator lên để vẽ tiếp mockup thì phần mềm báo khóa: "Thời hạn dùng thử đã hết". Sếp bảo: "Kinh phí eo hẹp, em tự tìm bản crack dùng tạm đi nhé."',
      priority: 'high',
      professions: ['designer'],
      actions: [
        {
          id: 'ds_new_3_a',
          label: '💻 Tự bỏ tiền túi mua gói cá nhân dùng để đảm bảo tiến độ và an toàn',
          effects: [
            { stat: 'salary', value: -150000 },
            { stat: 'stress', value: -10 },
          ],
          feedMessage: 'Bạn tự mua gói cá nhân 1.5 triệu (tương đương 150k điểm lương). Phần mềm bản quyền mượt mà, không lo virus hay lỗi bảo mật. 💸',
        },
        {
          id: 'ds_new_3_b',
          label: '🛠️ Tìm bản crack trên mạng cài vào máy công ty',
          effects: [
            { stat: 'energy', value: -25 },
            { stat: 'stress', value: +15 },
          ],
          setFlags: { crack_installed: true },
          feedMessage: 'Bạn loay hoay cài bản crack suốt cả buổi trưa. Phần mềm chạy được nhưng máy giật lag liên tục và có nguy cơ nhiễm malware. 😰',
        },
      ],
    },
    {
      id: 'ds_new_4',
      title: 'Nhận file thiết kế từ intern với hàng nghìn layer không đặt tên 💀',
      description: 'Intern bàn giao file Photoshop thiết kế brochure để bạn sửa đổi. Bạn mở file ra thấy choáng váng: 2000 layer chồng chéo đặt tên "Layer 1", "Layer 2 Copy", "Group 5"...',
      priority: 'medium',
      professions: ['designer'],
      actions: [
        {
          id: 'ds_new_4_a',
          label: '🔧 Kiên nhẫn ngồi dọn dẹp, đặt tên và nhóm các layer ngăn nắp',
          effects: [
            { stat: 'energy', value: -25 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Bạn dọn dẹp file sạch sẽ chuyên nghiệp. Việc sửa đổi sau đó cực kỳ nhanh chóng và file được lưu trữ chuẩn mực. 🧘',
        },
        {
          id: 'ds_new_4_b',
          label: '🙅 Quát mắng intern, bắt họ tự ngồi dọn dẹp và đặt tên lại file',
          effects: [
            { stat: 'stress', value: +10 },
          ],
          setFlags: { intern_hates_you: true },
          feedMessage: 'Bạn mắng intern một trận. Họ khóc lóc ngồi dọn dẹp lại file. File được sửa nhưng quan hệ đồng nghiệp rạn nứt nghiêm trọng. 😤',
        },
      ],
    },
    {
      id: 'ds_new_5',
      title: 'Màn hình iMac thiết kế bị xuống màu hiển thị sai màu nặng 📉',
      description: 'Khi xem thử thiết kế trên điện thoại, bạn giật mình nhận ra màu sắc rực rỡ trên iMac hóa ra lại cực kỳ nhạt nhòa, vỡ hạt trên màn hình di động do màn hình bị lệch màu.',
      priority: 'high',
      professions: ['designer'],
      actions: [
        {
          id: 'ds_new_5_a',
          label: '🛠️ Mượn thiết bị cân màu Spyder Pro tự cân chỉnh lại màn hình',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Màn hình iMac được phục hồi hiển thị chuẩn xác 100% sRGB. Bạn tự tin thiết kế không lo bị lệch màu nữa. 🧘',
        },
        {
          id: 'ds_new_5_b',
          label: '🩹 Cứ xuất file rồi dùng mắt thường ước lượng bù trừ màu sắc',
          effects: [
            { stat: 'energy', value: -10 },
            { stat: 'stress', value: +15 },
          ],
          feedMessage: 'Bạn mò mẫm tự đoán màu. Khách hàng phàn nàn màu sắc trông rất kỳ quặc, buộc bạn phải sửa đi sửa lại nhiều lần. 😰',
        },
      ],
    },
    {
      id: 'ds_new_6',
      title: 'Khách hàng bắt buộc sử dụng font chữ Comic Sans cho brand sang trọng 🤮',
      description: 'Khách hàng xem brochure mỹ phẩm cao cấp phán một câu: "Anh thấy font chữ này cứng quá, em đổi toàn bộ tiêu đề sang font Comic Sans cho nó mềm mại, thân thiện nhé."',
      priority: 'critical',
      professions: ['designer'],
      actions: [
        {
          id: 'ds_new_6_a',
          label: '🎨 Cắn răng chiều khách đổi sang Comic Sans cho xong deadline',
          effects: [
            { stat: 'stress', value: +25 },
            { stat: 'energy', value: -10 },
          ],
          feedMessage: 'Brochure mỹ phẩm cao cấp trông như sách tập tô của trẻ mẫu giáo. Bạn xấu hổ không dám đưa thiết kế này vào portfolio cá nhân. 🤮',
        },
        {
          id: 'ds_new_6_b',
          label: '🗣️ Kiên quyết trình bày lý thuyết thiết kế giữ vững lập trường chuyên môn',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn gửi 3 phương án font serif sang trọng thay thế khác. Khách hàng bị thuyết phục bởi sự chuyên nghiệp của bạn và từ bỏ ý định. 👏',
        },
      ],
    },
    {
      id: 'ds_new_7',
      title: 'Cảm biến chuột Wacom bị loạn giật lag liên tục lúc vẽ storyboard ✍️',
      description: 'Đang gấp rút vẽ storyboard cho dự án phim quảng cáo thì bảng vẽ Wacom báo lỗi driver làm nét vẽ bị răng cưa, giật lag liên tục không thể đi nét mượt.',
      priority: 'high',
      professions: ['designer'],
      actions: [
        {
          id: 'ds_new_7_a',
          label: '⚙️ Gỡ sạch driver cũ cài đặt lại phiên bản driver Wacom cũ ổn định',
          effects: [
            { stat: 'energy', value: -15 },
            { stat: 'stress', value: +5 },
          ],
          feedMessage: 'Driver cũ hoạt động hoàn hảo! Nét vẽ tay mượt mà trơn tru như lướt trên giấy. Bảng storyboard hoàn thành xuất sắc đúng giờ. 😮‍💨',
        },
        {
          id: 'ds_new_7_b',
          label: '💻 Chuyển sang vẽ tạm bằng phím chuột thường siêu tốn công',
          effects: [
            { stat: 'energy', value: -30 },
            { stat: 'stress', value: +20 },
          ],
          feedMessage: 'Dung chuột thường vẽ tay storyboard cực kỳ mệt mỏi và xấu xí. Cổ tay bạn mỏi nhừ, stress tăng vọt vì tiến độ rùa bò. 😭',
        },
      ],
    },
    {
      id: 'ds_new_8',
      title: 'PM yêu cầu làm thêm 5 option thiết kế hoàn toàn khác nhau trong 2 tiếng ⏰',
      description: 'Họp khẩn: PM bảo khách hàng muốn xem thêm nhiều hướng định vị hình ảnh khác nhau: "Em làm gấp cho anh 5 option thiết kế hoàn toàn khác nhau để 3h chiều mang đi họp nhé."',
      priority: 'high',
      professions: ['designer'],
      actions: [
        {
          id: 'ds_new_8_a',
          label: '⚡ Điên cuồng làm việc tốc độ cao, xào nấu template có sẵn',
          effects: [
            { stat: 'energy', value: -30 },
            { stat: 'stress', value: +15 },
            { stat: 'salary', value: +100000 },
          ],
          feedMessage: 'Bạn cắm đầu xào nấu stock ra 5 bản phối cảnh đa dạng cực nhanh. PM mang đi họp chốt được ngay lập tức, thưởng nóng bạn 100k! 💸',
        },
        {
          id: 'ds_new_8_b',
          label: '🙅 Từ chối khéo léo, phân tích thời gian làm 5 bản chất lượng là bất khả thi',
          effects: [
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Bạn thuyết phục PM chỉ nên tập trung tối ưu hóa 2 option tốt nhất hiện tại. PM gật gù đồng ý, bạn thoát được đống việc quá tải. 🧘',
        },
      ],
    },
    {
      id: 'ds_new_9',
      title: 'Khách dọa kiện vì đăng sản phẩm thiết kế lên Behance trước ngày ra mắt 🤫',
      description: 'Bạn tự hào đăng sản phẩm thiết kế bao bì cực đẹp lên portfolio cá nhân Behance. Khách hàng phát hiện ra gọi điện giận dữ dọa kiện vì vi phạm thỏa thuận NDA bảo mật thông tin.',
      priority: 'critical',
      professions: ['designer'],
      actions: [
        {
          id: 'ds_new_9_a',
          label: '🔒 Ngay lập tức ẩn/xóa dự án trên Behance và gửi lời xin lỗi chân thành',
          effects: [
            { stat: 'stress', value: +15 },
            { stat: 'energy', value: -5 },
          ],
          feedMessage: 'Bạn xử lý khủng hoảng cấp tốc. Khách nguôi giận và chấp nhận lời xin lỗi chân thành, rút lại lời đe dọa pháp lý. 😮‍💨',
        },
        {
          id: 'ds_new_9_b',
          label: '🗣️ Viết mail lập luận đây chỉ là sản phẩm portfolio cá nhân phi thương mại',
          effects: [
            { stat: 'stress', value: +30 },
            { stat: 'salary', value: -150000 },
          ],
          feedMessage: 'Bạn cự cãi cứng nhắc. Khách hàng chính thức gửi công văn phạt vi phạm hợp đồng bảo mật lên sếp tổng, bạn bị phạt trừ lương 150k. 💀',
        },
      ],
    },
    {
      id: 'ds_new_10',
      title: 'Sếp ép nén dung lượng banner xuống dưới 100KB khiến ảnh vỡ nát 📉',
      description: 'Sếp nhắn: "Website tải chậm quá em ơi, em nén ảnh banner trang chủ xuống dưới 100KB giúp anh." Việc nén xuống dung lượng đó làm banner vỡ hạt nát bét.',
      priority: 'low',
      professions: ['designer'],
      actions: [
        {
          id: 'ds_new_10_a',
          label: '🛠️ Chuyển đổi định dạng sang WebP nén thông minh không giảm chất lượng',
          effects: [
            { stat: 'energy', value: -10 },
          ],
          feedMessage: 'Giải pháp tuyệt vời! File WebP chỉ có 85KB nhưng sắc nét hoàn hảo. Cả sếp và đội IT đều khen ngợi trình độ của bạn. 🧘',
        },
        {
          id: 'ds_new_10_b',
          label: '🩹 Lưu ảnh JPG chất lượng 10% gửi sếp cho xong chuyện',
          effects: [
            { stat: 'stress', value: +10 },
          ],
          feedMessage: 'Ảnh siêu nhẹ thật nhưng trông nhòe nhoẹt bôi bác khiến khách hàng phàn nàn web thiếu chuyên nghiệp. Sếp cằn nhằn bạn sau đó. 😮‍💨',
        },
      ],
    },
  ],
}

export default designerPack
