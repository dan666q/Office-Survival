import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGameStore } from "../../store/gameStore";

interface Contact {
  name: string;
  avatar: string;
  color: string;
}

export const CONTACTS: Record<string, Contact> = {
  sep: { name: "Sếp Messi 👑", avatar: "🐐", color: "text-red-400" },
  pm: { name: "PM Jisoo 🌸", avatar: "💃", color: "text-pink-400" },
  hr: { name: "HR J97 🎸", avatar: "🎶", color: "text-amber-400" },
  intern: { name: "Intern CR7 ⚡", avatar: "⚽", color: "text-emerald-400" },
  cto: { name: "CTO Elon Musk 🚀", avatar: "👽", color: "text-purple-400" },
  mkt: { name: "Sơn Tùng M-TP 🎤", avatar: "🌟", color: "text-yellow-400" },
  design: { name: "Lisa Designer 🎨", avatar: "💅", color: "text-teal-400" },
  ba: { name: "Negav BA 💍", avatar: "💍", color: "text-orange-400" },
  sales: { name: "Hieuthuhai Sales 👑", avatar: "🌹", color: "text-sky-400" },
  it_dev: { name: "Độ Mixi IT 🖥️", avatar: "🖥️", color: "text-zinc-400" },
  accounting: { name: "Pháo Kế Toán 🎤", avatar: "🎤", color: "text-red-300" },
  seo: { name: "Dương Lâm SEO 🤡", avatar: "🤡", color: "text-cyan-300" },
  legal: { name: "Trấn Thành Pháp Chế 😭", avatar: "😭", color: "text-indigo-400" },
  admin: { name: "ViruSs Admin 🖥️", avatar: "🖥️", color: "text-pink-300" },
  self: { name: "Tôi 🧑‍💻", avatar: "👨‍💻", color: "text-cyan-400" },
};

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

export function parseFeedEntry(entry: { id: string; message: string; timestamp: string; type: "success" | "danger" | "warning" | "info" }): MockMessage[] {
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

export default function LeftPanel() {
  const feedLog = useGameStore((s) => s.feedLog);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll xuống khi có feed mới
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [feedLog.length]);

  // Biến đổi các dòng log hệ thống thành các cuộc hội thoại chat Zalo
  const displayMessages: MockMessage[] = [];
  feedLog.forEach((entry) => {
    const messages = parseFeedEntry(entry);
    displayMessages.push(...messages);
  });

  return (
    <div className="flex flex-col h-full min-h-0 bg-[#161a23]">
      
      {/* 🔵 Solid Blue Zalo Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#0068ff] text-white flex-shrink-0 shadow-md">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold font-sans tracking-wide truncate">
              Văn phòng Bão Táp 🔥 (15)
            </span>
            <span className="text-[9px] opacity-85 font-sans leading-none mt-0.5">
              Sếp Messi, PM Jisoo, HR J97, Độ Mixi, ViruSs, Pháo, Negav...
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm shrink-0">
          <span className="cursor-default opacity-80 hover:opacity-100 transition-opacity">📞</span>
          <span className="cursor-default opacity-80 hover:opacity-100 transition-opacity">📹</span>
          <span className="cursor-default opacity-80 hover:opacity-100 transition-opacity font-bold font-mono">🔍</span>
          <span className="cursor-default opacity-85 hover:opacity-100 transition-opacity font-bold">☰</span>
        </div>
      </div>

      {/* Zalo Chat History Viewport */}
      <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-3 scrollbar-thin">
        {feedLog.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-2 opacity-50">
            <span className="text-xl">💬</span>
            <p className="text-[10px] font-sans text-zinc-500">Chưa có tin nhắn trong nhóm...</p>
          </div>
        )}

        <AnimatePresence initial={false}>
          {displayMessages.map((msg) => {
            if (msg.isInfo) {
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="flex justify-center my-1"
                >
                  <span className="text-[9px] text-zinc-400 bg-zinc-900/60 border border-zinc-800/80 px-2.5 py-1 rounded-full font-sans tracking-wide text-center">
                    📢 {msg.message}
                  </span>
                </motion.div>
              );
            }

            if (msg.isSelf) {
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: 15, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="flex justify-end gap-2 my-1 pl-10"
                >
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] text-cyan-400 font-bold mb-0.5">{CONTACTS.self.name}</span>
                    <div className="bg-[#1c354e] text-sky-100 border border-[#2b4c6f] rounded-[18px] rounded-tr-none px-3.5 py-2 text-xs leading-relaxed shadow-sm">
                      <p className="break-words font-sans">{msg.message}</p>
                      <span className="text-[8px] opacity-45 mt-1 block text-right font-mono">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                  <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center text-xs self-start shrink-0 font-sans shadow select-none">
                    {CONTACTS.self.avatar}
                  </span>
                </motion.div>
              );
            }

            // Other contacts (Messi, Jisoo, J97, CR7)
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: -15, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="flex justify-start gap-2 my-1 pr-10"
              >
                <span className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs self-start shrink-0 font-sans shadow select-none">
                  {msg.sender.avatar}
                </span>
                <div className="flex flex-col items-start">
                  <span className={`text-[9px] font-bold mb-0.5 ${msg.sender.color}`}>{msg.sender.name}</span>
                  <div className={`
                    rounded-[18px] rounded-tl-none px-3.5 py-2 text-xs leading-relaxed shadow-sm border bg-[#20242e] border-zinc-800
                    ${
                      msg.type === "danger"
                        ? "text-red-200 border-red-500/20 bg-red-950/15"
                        : msg.type === "warning"
                        ? "text-amber-200 border-amber-500/20 bg-amber-950/15"
                        : "text-zinc-200"
                    }
                  `}>
                    <p className="break-words font-sans">{msg.message}</p>
                    <span className="text-[8px] opacity-45 mt-1 block font-mono">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* Zalo Input Box at the Bottom */}
      <div className="border-t border-zinc-855 bg-zinc-900/40 p-2 flex items-center gap-2 flex-shrink-0">
        <span className="text-zinc-500 text-sm cursor-default hover:text-zinc-300 ml-1">📎</span>
        <div className="flex-1 rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-sans py-0.5">
            <span>Nhập tin nhắn...</span>
            <span className="w-1.5 h-3 bg-cyan-400 animate-pulse rounded-sm" />
          </div>
          <span className="text-xs cursor-default">😊</span>
        </div>
        <button className="w-6 h-6 rounded-full bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-[10px] active:scale-95 transition-all mr-1">
          ➤
        </button>
      </div>
    </div>
  );
}
