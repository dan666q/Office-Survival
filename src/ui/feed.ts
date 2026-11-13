// src/ui/feed.ts
// Biến feedLog của store thành hội thoại nhóm Zalo (chuyển nguyên từ LeftPanel cũ)

import type { FeedEntry } from '../types/game.types'
import { CONTACTS, type Contact } from '../data/contacts'

export interface MockMessage {
  id: string;
  sender: Contact;
  message: string;
  timestamp: string;
  isSelf: boolean;
  isInfo: boolean;
  type: "success" | "danger" | "warning" | "info";
}

export function formatSelfMessage(rawMessage: string, id: string): string {
  const charCodeSum = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const selfPronouns = ["tui", "em", "mình", "tao", "t", "e"];
  const flavor = selfPronouns[charCodeSum % selfPronouns.length];
  
  let msg = rawMessage;
  
  // Chuyển đổi xưng hô từ ngôi thứ ba/thứ hai sang thứ nhất (Tôi/tui/em/tao)
  msg = msg.replace(/\bbạn\b/gi, flavor);
  msg = msg.replace(/\bcủa bạn\b/gi, `của ${flavor}`);
  msg = msg.replace(/\bbạn quyết định\b/gi, `${flavor} quyết định`);
  msg = msg.replace(/\bngười chơi\b/gi, flavor);
  msg = msg.replace(/\bbản thân\b/gi, flavor);
  
  // Làm cho nội dung hành động có hồn và người hơn
  msg = msg.replace(/Chi (\d+)k đặt Highlands giao tới/gi, `Đặt highlands $1k uống giải cứu linh hồn`);
  msg = msg.replace(/Chi (\d+)k đặt pizza/gi, `Đm bực mình đặt cái pizza $1k ăn ngập họng giải sầu`);
  msg = msg.replace(/Chi (\d+)k đóng quỹ/gi, `Ngậm ngùi chi $1k đóng quỹ cho yên thân`);
  msg = msg.replace(/Đeo tai nghe lẳng lặng đi ra/gi, `Đeo tai nghe né thị phi vcl, đi ra cho lành`);
  msg = msg.replace(/Uống ly nước lọc nhạt nhẽo/gi, `Đớp ly nước lọc nhạt nhẽo cmnl, đói mờ mắt`);
  msg = msg.replace(/Ăn gói mì tôm túc tắc/gi, `Đớp gói mì tôm hảo hảo qua bữa cứu rỗi cái dạ dày`);
  msg = msg.replace(/Bạn từ chối đóng/gi, `${flavor} bảo hết tiền mặt đéo đóng thế là bị dí Momo hãm vl`);
  msg = msg.replace(/Bạn chối phăng/gi, `${flavor} chối phăng đéo nhận, sếp nhìn nghi ngờ vl`);
  msg = msg.replace(/Trốn ngay vào nhà vệ sinh/gi, `Lẻn trốn vào toilet 15 phút ôm đt lướt tiktok haha`);
  
  const endings = [" á", " nha mọi người", " vcl", " rùi", " á chèn ơi", " đm", " vc", " á nè", " hihi"];
  const ending = endings[charCodeSum % endings.length];
  
  if (!msg.endsWith("😂") && !msg.endsWith("😭") && !msg.endsWith("💀") && !msg.endsWith("😤") && !msg.endsWith("☕") && !msg.endsWith("🍕") && !msg.endsWith("🍜") && !msg.endsWith("💸")) {
    msg = msg + ending;
  }
  
  return msg;
}

export function parseFeedEntry(entry: FeedEntry): MockMessage[] {
  const lowercase = entry.message.toLowerCase();
  const messages: MockMessage[] = [];

  // 1. SYSTEM ALERTS (Ca làm việc, Canteen purchases, Achievements)
  // Chỉ hiển thị thông báo căn giữa dạng viên thuốc màu xám (isInfo = true) cho:
  // - shift alerts (khung giờ, bắt đầu, hết giờ)
  // - canteen purchases (đã mua)
  // - achievements (achievement, nhận thưởng)
  const isCanteenPurchase = lowercase.includes("đã mua") && !lowercase.includes("không đủ tiền") && !lowercase.includes("mở trong");
  const isAchievement = lowercase.includes("achievement") || lowercase.includes("nhận thưởng");
  const isShiftAlert = lowercase.includes("khung giờ") || lowercase.includes("bắt đầu") || lowercase.includes("hết giờ") || lowercase.includes("bắt đầu. tiếp tục");

  if (isShiftAlert || isAchievement || isCanteenPurchase) {
    messages.push({
      id: entry.id,
      sender: CONTACTS.self, // Not used for info
      message: entry.message,
      timestamp: entry.timestamp,
      isSelf: false,
      isInfo: true,
      type: entry.type
    });

    // Bổ sung phản hồi ngộ nghĩnh sau khi mua hàng thành công
    if (isCanteenPurchase) {
      if (entry.chatReplies && entry.chatReplies.length > 0) {
        entry.chatReplies.forEach((reply, idx) => {
          messages.push({
            id: `${entry.id}-reply-${idx}`,
            sender: CONTACTS[reply.senderId] || CONTACTS.pm,
            message: reply.message,
            timestamp: entry.timestamp,
            isSelf: reply.senderId === 'self',
            isInfo: false,
            type: "info"
          });
        });
      } else {
        const charCodeSum = entry.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
        if (lowercase.includes("trà sữa") || lowercase.includes("highlands") || lowercase.includes("nước ngọt")) {
          const foodReplies = [
            { sender: CONTACTS.intern, message: "SIUUUUU! Highlands uống vào chạy deadline nhanh vcl sếp ơi! ⚡⚽" },
            { sender: CONTACTS.admin, message: "Trà sữa ngon quá cưng ơi! Quả này tui chấm 10/10 điểm reaction luôn hihi! 🖥️🥤" },
            { sender: CONTACTS.it_dev, message: "Đm lại nạp đường rồi, lát nữa có bug đéo fix đc là do sugar crash nha! 😂💻" }
          ];
          const rep = foodReplies[charCodeSum % foodReplies.length];
          messages.push({
            id: `${entry.id}-r1`,
            sender: rep.sender,
            message: rep.message,
            timestamp: entry.timestamp,
            isSelf: false,
            isInfo: false,
            type: "info"
          });
        } else {
          const foodReplies = [
            { sender: CONTACTS.hr, message: "Đớp đẫy bụng rồi lát hát tặng cả phòng một bài giải sầu nhé bạn ơi! 🎶🍱" },
            { sender: CONTACTS.ba, message: "Một ngụm trà sữa xoa dịu tâm hồn, giàu sang thế này tiêu vài trăm k GrabFood nhầm nhò gì e ơi! 💍🥤" },
            { sender: CONTACTS.sales, message: "Ăn trưa GrabFood ngon thế! Tiện thể chiều đi chốt khách khứa hộ tui luôn đi! 🌹🍱" }
          ];
          const rep = foodReplies[charCodeSum % foodReplies.length];
          messages.push({
            id: `${entry.id}-r1`,
            sender: rep.sender,
            message: rep.message,
            timestamp: entry.timestamp,
            isSelf: false,
            isInfo: false,
            type: "info"
          });
        }
      }
    }
    return messages;
  }

  // 2. TIMEOUT PENALTIES (Bị phạt do đứng hình)
  // Không hiện thông báo căn giữa! Đồng nghiệp tự nhảy vào chửi/than phiền cực lầy
  if (lowercase.includes("đứng hình") || lowercase.includes("escalate")) {
    const isConsecutive = lowercase.includes("lại đứng hình");
    
    // PM Jisoo báo cáo
    messages.push({
      id: `${entry.id}-pm`,
      sender: CONTACTS.pm,
      message: isConsecutive 
        ? "Đm lại đứng hình nữa rồi! Em bất lực phải báo lên sếp Messi sút bay màu giờ, căng vcl! 💀😰"
        : "Hic, đứng hình lâu quá rồi kìa cưng ơi! PM phải escalate lên sếp tổng đây, cứu mạng! 💀",
      timestamp: entry.timestamp,
      isSelf: false,
      isInfo: false,
      type: "danger"
    });

    // Sếp Messi mắng cực gắt chửi thề nhẹ
    messages.push({
      id: `${entry.id}-sep`,
      sender: CONTACTS.sep,
      message: "Đm làm ăn thế đéo nào đấy? Thiếu tính kỷ luật vcl! Thế này thì Ballon d'Or công sở cái gì? Trừ lương! 😡⚽",
      timestamp: entry.timestamp,
      isSelf: false,
      isInfo: false,
      type: "danger"
    });

    // Intern CR7 hoặc Độ Mixi IT phản hồi châm chọc
    const charCodeSum = entry.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    if (charCodeSum % 2 === 0) {
      messages.push({
        id: `${entry.id}-intern`,
        sender: CONTACTS.intern,
        message: "Hic, sếp đang cầm cúp vàng sút bóng ầm ầm ngoài hành lang kìa, né gấp kẻo ăn thẻ đỏ cmnl 😰⚽",
        timestamp: entry.timestamp,
        isSelf: false,
        isInfo: false,
        type: "warning"
      });
    } else {
      messages.push({
        id: `${entry.id}-it`,
        sender: CONTACTS.it_dev,
        message: "Đm quả đứng hình này ảo thật đấy, IT đéo fix nổi quả kỷ luật sắt của sếp rồi, chia buồn! 😂🖥️",
        timestamp: entry.timestamp,
        isSelf: false,
        isInfo: false,
        type: "warning"
      });
    }
    return messages;
  }

  // 3. SHOP WARNINGS & DAY START NOTICES (Hết tiền, chưa ăn trưa, tối qua uống nhiều...)
  // Chuyển hoàn toàn thành bong bóng chat từ đồng nghiệp
  if (lowercase.includes("shop chỉ mở") || lowercase.includes("đủ 2 món") || lowercase.includes("không đủ tiền") || lowercase.includes("tối qua uống")) {
    if (lowercase.includes("shop chỉ mở")) {
      messages.push({
        id: entry.id,
        sender: CONTACTS.hr,
        message: "Này ơi, shop GrabFood cứu mạng chỉ mở lúc ăn trưa thôi nha. Tập trung làm việc đi sếp đang đi tuần kìa! 🔒🎸",
        timestamp: entry.timestamp,
        isSelf: false,
        isInfo: false,
        type: "warning"
      });
    } else if (lowercase.includes("đủ 2 món")) {
      messages.push({
        id: entry.id,
        sender: CONTACTS.pm,
        message: "Ủa ăn gì nhiều thế bé ơi! Đã mua đủ 2 món rồi, nghỉ ngơi ăn uống đi thôi! 😄🌸",
        timestamp: entry.timestamp,
        isSelf: false,
        isInfo: false,
        type: "warning"
      });
    } else if (lowercase.includes("không đủ tiền")) {
      messages.push({
        id: entry.id,
        sender: CONTACTS.intern,
        message: "Hic, ví xẹp lép rồi anh ơi, đéo đủ tiền mua đâu. Cày OT tiếp đi thôi! 💸⚽",
        timestamp: entry.timestamp,
        isSelf: false,
        isInfo: false,
        type: "warning"
      });
    } else if (lowercase.includes("tối qua uống")) {
      messages.push({
        id: entry.id,
        sender: CONTACTS.hr,
        message: "Ủa tối qua đi quẩy quăng cả người hay sao mà sáng nay đồng nghiệp nhìn đắm đuối thế kia? 👀 Chừa nha!",
        timestamp: entry.timestamp,
        isSelf: false,
        isInfo: false,
        type: "warning"
      });
    }
    return messages;
  }

  // 4. EVENT CHOICES (Lựa chọn đáp án của người chơi)
  // Bong bóng chat Tôi gửi
  const formattedMessage = formatSelfMessage(entry.message, entry.id);
  messages.push({
    id: entry.id,
    sender: CONTACTS.self,
    message: formattedMessage,
    timestamp: entry.timestamp,
    isSelf: true,
    isInfo: false,
    type: entry.type
  });

  // Nếu có kịch bản chat Zép Lào được đính kèm từ action choice:
  if (entry.chatReplies && entry.chatReplies.length > 0) {
    entry.chatReplies.forEach((reply, idx) => {
      messages.push({
        id: `${entry.id}-reply-${idx}`,
        sender: CONTACTS[reply.senderId] || CONTACTS.pm,
        message: reply.message,
        timestamp: entry.timestamp,
        isSelf: reply.senderId === 'self',
        isInfo: false,
        type: "info"
      });
    });
    return messages; // Bỏ qua phần phân tích từ khóa ngẫu nhiên
  }

  // Đồng nghiệp phản hồi siêu hài hước dựa trên từ khóa sự kiện
  const charCodeSum = entry.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  if (lowercase.includes("code") || lowercase.includes("it") || lowercase.includes("server") || lowercase.includes("lỗi") || lowercase.includes("bug") || lowercase.includes("máy in") || lowercase.includes("giấy")) {
    const replies = [
      { sender: CONTACTS.it_dev, message: "Đm ảo thật đấy! Tự sửa máy/fix bug thế này IT tụi e chuẩn bị mất việc cmnl! 😂🖥️" },
      { sender: CONTACTS.cto, message: "Giải pháp công nghệ đỉnh đấy đm! Sang SpaceX làm dự án cấy chip Neuralink ko e, bao giàu! 🚀👽" },
      { sender: CONTACTS.intern, message: "SIUUUU! Anh gánh còng lưng quả này out trình vcl! Em nể phục sát đất! ⚡⚽" }
    ];
    const rep = replies[charCodeSum % replies.length];
    messages.push({
      id: `${entry.id}-reply`,
      sender: rep.sender,
      message: rep.message,
      timestamp: entry.timestamp,
      isSelf: false,
      isInfo: false,
      type: "info"
    });
  } else if (lowercase.includes("sổ sách") || lowercase.includes("thuế") || lowercase.includes("kế toán") || lowercase.includes("hóa đơn") || lowercase.includes("tiền") || lowercase.includes("tài chính") || lowercase.includes("quỹ") || lowercase.includes("lương")) {
    const replies = [
      { sender: CONTACTS.accounting, message: "Đm tiền nong sòng phẳng nha mấy đứa! Rapper đi làm kế toán thì tiền bạc cũng phải chuẩn từng con chữ, bùng tiền quỹ là t bắn rap diss đó nhe! 🎤💵" },
      { sender: CONTACTS.sep, message: "Quyết định tài chính chuẩn vcl! Số liệu đẹp như đường kiến tạo của tôi ở chung kết World Cup vậy! 🏆 Goat!" },
      { sender: CONTACTS.sales, message: "Sòng phẳng vcl! Đi làm vì tiền chứ đam mê gì tầm này, tối làm vài ly ăn mừng đi tui bao! 🌹🍻" }
    ];
    const rep = replies[charCodeSum % replies.length];
    messages.push({
      id: `${entry.id}-reply`,
      sender: rep.sender,
      message: rep.message,
      timestamp: entry.timestamp,
      isSelf: false,
      isInfo: false,
      type: "info"
    });
  } else if (lowercase.includes("drama") || lowercase.includes("gossip") || lowercase.includes("nói xấu") || lowercase.includes("bàn tán") || lowercase.includes("thị phi") || lowercase.includes("hóng")) {
    const replies = [
      { sender: CONTACTS.hr, message: "Đm drama gì căng đét thế? Kể nhanh t nghe coi, lót dép hóng sụm cả hông rồi nè! 🍿🎸" },
      { sender: CONTACTS.admin, message: "Ủa drama hả? Hóng với hihi, pantry công ty mình chưa bao giờ hết hot! 🎀✨" },
      { sender: CONTACTS.legal, message: "Hít drama mà em nghẹn ngào phát khóc luôn á mọi người, thị phi văn phòng cay đắng vcl! 😭⚖️" }
    ];
    const rep = replies[charCodeSum % replies.length];
    messages.push({
      id: `${entry.id}-reply`,
      sender: rep.sender,
      message: rep.message,
      timestamp: entry.timestamp,
      isSelf: false,
      isInfo: false,
      type: "info"
    });
  } else if (lowercase.includes("ăn") || lowercase.includes("uống") || lowercase.includes("trà sữa") || lowercase.includes("boba") || lowercase.includes("mì") || lowercase.includes("pizza") || lowercase.includes("hộp cơm")) {
    const replies = [
      { sender: CONTACTS.intern, message: "SIUUUU! Nạp đẫy mồm vào rồi chạy deadline nhanh như em chạy cánh luôn anh ơi! 🍕⚡" },
      { sender: CONTACTS.ba, message: "Logic đỉnh vcl! Đỉnh như bộ sưu tập nhẫn kim cương của tui vậy đó, đỉnh chóp! 💍💎" },
      { sender: CONTACTS.admin, message: "Ủa ủa cái gì thế này? Lát nữa mua hộ ViruSs ly trà sữa để tui làm video reaction đánh giá chất lượng coi nha, thèm mún xỉu! 🖥️🥤" }
    ];
    const rep = replies[charCodeSum % replies.length];
    messages.push({
      id: `${entry.id}-reply`,
      sender: rep.sender,
      message: rep.message,
      timestamp: entry.timestamp,
      isSelf: false,
      isInfo: false,
      type: "info"
    });
  } else if (lowercase.includes("họp") || lowercase.includes("sếp") || lowercase.includes("báo cáo") || lowercase.includes("trình bày") || lowercase.includes("slide")) {
    const replies = [
      { sender: CONTACTS.sep, message: "Phong thái đĩnh đạc nâng cúp! Báo cáo rất thuyết phục, tôi duyệt luôn! 👑 Goat!" },
      { sender: CONTACTS.pm, message: "Slide lung linh lấp lánh, trình bày mượt như vũ đạo Flower luôn nha cưng! 🌸✨" },
      { sender: CONTACTS.mkt, message: "Thần thái rất là Sky luôn nha! Tự tin tỏa sáng thế này đúng là không phải dạng vừa đâu! 🌟🎤" }
    ];
    const rep = replies[charCodeSum % replies.length];
    messages.push({
      id: `${entry.id}-reply`,
      sender: rep.sender,
      message: rep.message,
      timestamp: entry.timestamp,
      isSelf: false,
      isInfo: false,
      type: "info"
    });
  } else {
    // Phản hồi ngẫu nhiên mặc định cho tất cả các ngành nghề/sự kiện khác
    const randomPool = [
      { sender: CONTACTS.pm, message: "U là trời cưng xỉu! Làm việc slay vcl ra á, 10 điểm ko có nhưng nha! Mãi iu! 🌸❤️" },
      { sender: CONTACTS.hr, message: "Được của ló! Rất có tiềm năng làm idol giới trẻ văn phòng luôn thề! 👍🎸" },
      { sender: CONTACTS.intern, message: "SIUUUUUU! Đẳng cấp vcl! Nhìn anh chạy task mà em nể phục sát đất! ⚡⚽" },
      { sender: CONTACTS.cto, message: "Logic đỉnh vcl! Có muốn đổi lương tháng này sang Dogecoin ko e bao giàu luôn? 🐕👽" },
      { sender: CONTACTS.mkt, message: "Ấn tượng lắm nha cưng! Hãy cứ tự tin tỏa sáng vì em xứng đáng! 😉🎤" },
      { sender: CONTACTS.design, message: "Vibe sang xịn mịn vcl! Gu thẩm mỹ đỉnh cao thế này làm designer hợp hơn á! 💅🎨" },
      { sender: CONTACTS.ba, message: "Quá là đẳng cấp luôn nhe! Quyết định lẹ làng như cách tui sắm xế xịn vậy! 💍🚗" },
      { sender: CONTACTS.sales, message: "Nghe cuốn cực kỳ! Phong thái này đi chốt deal khách hàng chỉ có đổ đứ đừ thôi! 🌹" }
    ];
    
    const index1 = charCodeSum % randomPool.length;
    const index2 = (charCodeSum + 3) % randomPool.length;
    
    const rep1 = randomPool[index1];
    const rep2 = randomPool[index2 !== index1 ? index2 : (index2 + 1) % randomPool.length];
    
    messages.push({
      id: `${entry.id}-reply1`,
      sender: rep1.sender,
      message: rep1.message,
      timestamp: entry.timestamp,
      isSelf: false,
      isInfo: false,
      type: "info"
    });
    
    if (charCodeSum % 2 === 0) {
      messages.push({
        id: `${entry.id}-reply2`,
        sender: rep2.sender,
        message: rep2.message,
        timestamp: entry.timestamp,
        isSelf: false,
        isInfo: false,
        type: "info"
      });
    }
  }

  return messages;
}
