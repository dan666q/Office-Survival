# Office Survival 2.0: đi lại trong văn phòng, nhận quest, leo thang sự nghiệp

## Context

Đợt trước đã làm lại toàn bộ UI thành văn phòng 3D isometric (nhánh `feat/3d-office-ui`). Lối chơi thì vẫn như cũ: việc tự rơi xuống, người chơi đọc và chọn đáp án. Bạn thấy bản này **lặp lại, thiếu chiều sâu, hơi chán, và cảnh 3D chỉ để nhìn**.

**Bạn đã chốt:**
- Giữ ý tưởng công sở.
- Người chơi tự điều khiển nhân vật đi trong văn phòng để nhận quest và làm quest.
- Đi lại tự do không tốn thời gian. Đồng hồ chỉ chạy khi đã nhận quest. Làm đủ quest thì sang ngày mới.
- Quest càng đa dạng về lối chơi càng tốt.
- Có thể bỏ hệ chỉ số hiện tại (stress/energy/lương). Bạn giao cho tôi thiết kế cơ chế mới đủ lôi cuốn để giữ chân người chơi, trong đó làm hỏng quest phải có hậu quả như trừ tiền hoặc bị đuổi việc.
- Chiều sâu dài hạn gồm cả bốn thứ: thăng tiến sự nghiệp, quan hệ đồng nghiệp, cốt truyện nhiều kết thúc, nâng cấp góc bàn.

- **Đồ họa đổi sang 2D (chốt ngày 13/11):** tòa nhà văn phòng nhìn ngang theo kiểu mặt cắt, nhiều tầng, nhân vật đi trái/phải, lên xuống bằng thang máy hoặc cầu thang (kiểu *Tiny Tower*). Nét vẽ là **pixel art dựng hoàn toàn bằng code**. Cảnh 3D isometric của đợt trước bị bỏ.

Phần dưới đây là **đề xuất của tôi**. Chỗ nào bạn đã chốt thì ghi rõ.

## Tòa nhà mặt cắt (thay cho văn phòng 3D)

**Các tầng ở lớp 1, từ dưới lên:**

| Tầng | Nội dung | Điểm tương tác |
|---|---|---|
| **Trệt: Sảnh** | Cửa ra vào, máy chấm công, bác bảo vệ, cây ATM | Vào ca, ra về |
| **Tầng 1: Pantry** | Căn-tin, tủ lạnh, cây nước, **toilet** | Giải lao (pha mì, tán gẫu, trốn toilet), lấy đồ cho quest giao nhận |
| **Tầng 2: Phòng IT** (nghề của bạn) | Bàn của bạn, Độ Mixi, intern, PM, tủ server, máy in | Phần lớn quest |
| **Tầng 3: Ban giám đốc** | Phòng sếp, phòng HR, phòng họp | Việc của sếp, giao hồ sơ |
| **Sân thượng** | Ghế đá, quạt thông gió, view thành phố | Giải lao ít bị sếp bắt gặp nhất, nhưng phải đi xa nhất |

**Di chuyển:**
- Chạm vào người hoặc đồ vật thì nhân vật tự đi tới. Nếu khác tầng, nhân vật đi ra thang máy hoặc cầu thang, lên xuống rồi đi tiếp.
- Desktop dùng thêm được A/D hoặc phím mũi tên. Đứng ở thang thì W/S để lên xuống.
- **Thang máy** phải chờ 1–3 giây, có lúc đông người phải chờ chuyến sau. **Cầu thang** không phải chờ nhưng chậm hơn.
- Đi lại không làm đồng hồ trong ngày nhích, nhưng hạn chót của quest vẫn chạy bằng giây thật. Vì vậy chọn thang và chọn thứ tự đi trở thành một phần của việc tính toán.

**Mở rộng ở lớp 3:** 5 nghề còn lại trở thành **5 tầng mới của cùng tòa nhà** (kế toán, marketing, thiết kế, sàn bất động sản, quán cà phê của boy phố ở tầng trệt). Từ đó mở ra quest liên phòng ban, ví dụ mang hóa đơn xuống phòng kế toán tầng 4. Không cần dựng 6 văn phòng riêng.

**Hình ảnh pixel art:**
- Sprite 16×24 px cho người, 16 px cho đồ vật. Định nghĩa bằng mảng ký tự cộng bảng màu trong code, phóng nguyên lần (×3, ×4) cho sắc nét.
- Bảng màu giữ tông văn phòng Việt Nam ấm đã chốt: tường vàng kem, chân tường xanh ngọc, gạch đỏ-kem, đỏ con dấu, vàng giấy note.
- Mỗi tầng có cửa sổ nhìn ra phố. Bầu trời đổi màu theo đồng hồ trong ngày: sáng, trưa, chiều cam, tối (tăng ca). Có lớp nền nhà cao tầng di chuyển chậm (parallax).
- Mỗi đồng nghiệp có sprite riêng nhận ra ngay (áo vest đỏ cà vạt của sếp, tai nghe của Độ Mixi, tóc dài của PM). Nhân vật có 4 khung đi bộ, 2 khung đứng thở, cùng dáng cầm đồ, gục và ăn mừng.
- Lớp UI giấy tờ 2D hiện có (phiếu, HUD, Zalo, menu căn-tin) vẫn giữ nguyên, đặt chồng lên khung pixel.

## Mục tiêu, ngoài phạm vi, điều cấm

**Mục tiêu**
- Mỗi ngày chơi là một chuỗi quyết định có nhịp: nhận bao nhiêu việc, làm cái nào trước, có dám trốn việc không.
- Mỗi tuần kết thúc bằng một cú ngoặt: buổi đánh giá quyết định lên chức, giữ nguyên, bị cảnh cáo hay bị đuổi.
- Ván sau khác ván trước nhờ đồng nghiệp nhớ bạn, góc bàn đổi theo những gì đã mua, và mạch truyện rẽ nhánh.

**Ngoài phạm vi:** online, nhiều người chơi, lưu trữ trên server.

**Điều cấm**
- Phải đi bộ lặp lại quãng dài một cách vô nghĩa. Vì vậy văn phòng phải gọn và đường đi phải ngắn.
- Mini-game không chơi được trên điện thoại.
- Phải đọc hướng dẫn dài mới chơi được.
- Bất cứ thứ gì phá phong cách hình ảnh đã làm (đồ văn phòng phẩm, không "AI hóa").

## Vòng chơi một ngày

1. **08:00, đến công ty.** Nhân vật bước vào sảnh tầng trệt và chấm công. Trên đầu đồng nghiệp và đồ vật hiện giấy note "có việc". Có ba loại:
   - việc **bắt buộc** của sếp, màu đỏ;
   - việc **thường**, màu vàng;
   - việc **nhờ vả** của đồng nghiệp, màu xanh, không bắt buộc nhưng tăng thiện cảm.
2. **Chỉ tiêu ngày (KPI)** hiện trên HUD, ví dụ "Hôm nay: 4 việc, trong đó 2 việc của sếp". Đạt chỉ tiêu thì cửa ra về sáng đèn.
3. **Đi lại miễn phí.** Chạm vào người hoặc đồ vật để tự đi tới, kể cả khác tầng (xem phần "Tòa nhà mặt cắt"). Đi lại không làm đồng hồ trong ngày chạy.
4. **Nhận quest.** Quest vào **khay hồ sơ**, tối đa 3 việc cùng lúc. Mỗi quest có **hạn chót tính bằng giây thật** và bắt đầu chạy ngay khi nhận. Nhận nhiều thì làm nhanh hơn nhưng dễ trễ. Đây là chỗ cần tính toán.
5. **Đồng hồ trong ngày chỉ nhích khi có việc xảy ra.**
   - Mỗi quest mang một lượng "giờ công" (60–120 phút). Làm xong hay làm hỏng thì đồng hồ đều nhích lên đúng lượng đó. Giải lao +15 phút.
   - Chỉ tiêu khoảng 5 việc, vừa đủ lấp một ngày 08:00–17:30. Ôm việc nhờ vả hoặc giải lao nhiều thì dễ quá giờ.
   - Quá 17:30 mà chưa đủ chỉ tiêu thì bị **tăng ca bắt buộc**: mỗi việc làm thêm −10 tinh thần. Tăng ca kết thúc khi đạt chỉ tiêu.
6. **Sếp tự giao việc (bạn đã chốt).** Việc đỏ của sếp mà sau khoảng 40 giây thật vẫn chưa ai nhận thì sếp gọi tên, việc tự vào khay và đồng hồ của việc đó bắt đầu chạy. Đi lang thang vẫn được, nhưng không trốn mãi được. Khay đã đầy thì việc của sếp chen vào, việc nhờ vả bị đẩy ra và người nhờ giảm thiện cảm.
7. **Ra về:** chọn việc buổi tối (ngủ, nhậu, học thêm, làm thêm), giống bản cũ nhưng hiệu ứng theo chỉ số mới.

**Quyết định của tôi cho lớp 1** (sau khi người đọc độc lập rà):
- **Sau thứ Sáu:** hiện màn "Sống sót tuần 1" với KPI tuần. Người chơi có thể chơi tiếp tuần sau, khi đó biên bản về 0. Đánh giá và thăng chức làm ở lớp 2.
- **Quest tình huống chỉ hỏng khi hết giờ.** Đáp án nào cũng hợp lệ và áp hiệu ứng đã quy đổi. Việc đỏ của sếp lấy từ các sự kiện có `priority` là `critical` hoặc `high`.
- **Ví âm có hậu quả ngay ở lớp 1:**
  - cuối ngày ví âm: chủ nhà gọi đòi tiền, −20 tinh thần;
  - âm 3 ngày liền: xã hội đen "hỏi thăm", đến công ty muộn, +1 biên bản.

## Chỉ số mới (thay cho stress, energy, lương)

| Chỉ số | Ý nghĩa | Tăng khi | Giảm khi | Chạm đáy |
|---|---|---|---|---|
| **Tinh thần** (0–100) | Gộp stress và sức | Giải lao, ngủ, đồng nghiệp giúp | Ôm nhiều việc, việc khó, bị sếp mắng, tăng ca | **Burnout**: nghỉ ốm 1 ngày, mất ngày đó, bị trừ KPI tuần |
| **Ví** (đồng) | Lương, tiêu xài | Lương ngày, thưởng quest | **Phạt khi hỏng quest**, mua đồ | Âm ví thì phải vay nóng, sinh sự kiện xã hội đen đòi nợ |
| **Biên bản** (0–3) | Án kỷ luật trong tuần | Hỏng việc của sếp, bị bắt quả tang trốn việc | Reset mỗi tuần nếu đánh giá đạt | **3 biên bản là bị đuổi việc** (thua) |
| **KPI tuần** | Điểm thành tích | Hoàn thành quest, làm sớm, làm đẹp | Hỏng, trễ | Quyết định kết quả đánh giá cuối tuần |
| **Thiện cảm** (từng người, −3..+5) | Quan hệ | Giúp đỡ, chia đồ ăn, nói đỡ | Đổ lỗi, từ chối, hớt lẻo | Xem phần "Đồng nghiệp" |

**Hỏng quest** (hết giờ hoặc làm sai):
- Luôn bị trừ tiền theo độ khó.
- Việc của sếp thì thêm 1 biên bản.
- Việc nhờ vả thì người nhờ giảm thiện cảm.

## Các kiểu quest (đa dạng lối chơi)

Mỗi quest là một chuỗi **bước** ghép từ các loại sau. Tất cả chơi được bằng một ngón tay.

1. **Tình huống (lựa chọn):** tái dùng toàn bộ khoảng 165 sự kiện có sẵn. Hiệu ứng cũ được quy đổi sang chỉ số mới: stress và energy thành tinh thần, salary thành ví. Các cờ nghiệp quả (`has_hidden_error`…) giữ nguyên.
2. **Giao nhận:** đi tới A lấy đồ (nhân vật cầm đồ trên tay) rồi mang tới B. Ví dụ: lấy hồ sơ ở tủ sắt, mang vào phòng sếp.
3. **Gõ phím:** gõ đúng một câu hoặc một đoạn code trong thời gian giới hạn. Trên điện thoại thì chạm các khối chữ theo đúng thứ tự.
4. **Canh nhịp:** kim chạy qua lại, bấm khi kim vào vùng xanh, làm vài lần. Dùng cho sửa máy in, rót cà phê, deploy.
5. **Đối chiếu:** lật cặp hoặc ghép hóa đơn với số liệu khớp nhau. Hợp với kế toán, cũng dùng được ở chỗ khác.
6. **Họp (phản xạ):** ngồi trong phòng họp, thỉnh thoảng sếp "điểm danh". Phải bấm kịp để trả lời, ngủ gật là mất tinh thần.
7. **Né sếp (lén lút):** sếp đi tuần có vùng nhìn. Khi đang trốn việc (ví dụ mang trà sữa về chỗ) mà bị nhìn thấy là dính biên bản.
8. **Hỏi người (chuỗi):** cần thông tin của X, nhưng X đòi bạn làm giúp một việc nhỏ trước. Đây là chỗ thiện cảm có tác dụng.

**Lớp đầu làm 4 loại:** Tình huống, Giao nhận, Gõ phím, Canh nhịp. Bốn loại còn lại làm ở lớp sau.

## Giải lao (lúc rảnh)

Có các hoạt động như pha mì ở pantry, trốn toilet lướt TikTok, tán gẫu ở cây nước (đều ở tầng 1), hóng gió trên sân thượng.
- Mỗi lần **hồi tinh thần** và **đẩy đồng hồ trong ngày** lên 15 phút.
- Mức hồi: mì +15, toilet +10, tán gẫu +8. Sân thượng +20 nhưng xa nhất.
- Nếu sếp đang đi tuần gần đó thì có xác suất bị bắt quả tang (lớp 2). Sân thượng không bao giờ bị bắt.

## Đồng nghiệp

- Mỗi người có thiện cảm từ −3 đến +5, hiện bằng biểu cảm trên đầu khi lại gần.
- Thiện cảm cao:
  - họ giao việc nhẹ hơn;
  - thỉnh thoảng tự làm giúp một bước;
  - nói đỡ trong buổi đánh giá (+KPI);
  - ở cấp Trưởng nhóm trở lên, bạn **giao lại việc cho họ** được.
- Thiện cảm thấp:
  - họ đổ việc cho bạn;
  - hớt lẻo với sếp (+biên bản);
  - "vô tình" làm hỏng một bước trong quest.

## Sự nghiệp nhiều tuần

- **Một tuần gồm 5 ngày** (Thứ Hai đến Thứ Sáu). Thứ Bảy là sự kiện đặc biệt: tăng ca, team building, hoặc chương truyện.
- **Đánh giá cuối tuần** tính từ KPI, biên bản và lời nói đỡ của đồng nghiệp. Kết quả là một trong bốn:
  - lên chức;
  - giữ nguyên;
  - cảnh cáo (tuần sau chỉ tiêu cao hơn);
  - đuổi việc.
- **Cấp bậc:** Thực tập sinh → Nhân viên → Chuyên viên → Trưởng nhóm → Trưởng phòng. Mỗi cấp:
  - lương cao hơn;
  - quest khó hơn và nhiều kiểu hơn;
  - mở khóa thứ mới (giao việc, phòng riêng…).
- **Góc bàn:** dùng ví để mua đồ thật cho bàn. Đồ hiện thành sprite pixel trên bàn và giữ qua các tuần, mỗi món có một lợi ích:
  - bàn phím cơ: gõ phím thêm 20% thời gian;
  - ghế công thái học: tinh thần tụt chậm hơn;
  - cây kim tiền: +1 tinh thần mỗi giờ;
  - máy pha cà phê: giải lao tại bàn, không sợ sếp.

## Cốt truyện và kết thúc

- Mỗi nghề có **một mạch truyện kéo dài khoảng 4 tuần**, chia thành chương. Mỗi tuần có 1–2 quest truyện đặc biệt.
- Ví dụ mạch IT: "Dự án ngân hàng sắp go-live, có người cài cửa hậu".
- Lựa chọn trong mạch truyện, cùng cờ nghiệp quả, thiện cảm và cấp bậc, quyết định **kết thúc**. Một số kết thúc dự kiến:
  - lên Trưởng phòng;
  - được headhunt sang công ty khác;
  - khởi nghiệp với đồng nghiệp thân;
  - làm người tố giác;
  - bị đuổi;
  - burnout, về quê nuôi cá.
- **Sổ kết thúc** ghi lại các kết thúc đã mở. Đây là lý do để chơi lại.

## Kỹ thuật (quyết định của tôi)

**Giữ và tái dùng:**
- Phong cách UI: [src/ui/](src/ui/) gồm Sheet, EventSheet, ZaloPhone, CanteenMenu, ScreenPaper, icons và token màu trong [index.css](src/index.css).
- Danh bạ đồng nghiệp [contacts.ts](src/data/contacts.ts) (màu áo, kiểu tóc). Đây cũng là nguồn để sinh sprite.
- Bộ suy ra vị trí sự kiện [eventLocation.ts](src/scene/eventLocation.ts), chuyển sang `src/game/` vì không còn liên quan 3D.
- Dữ liệu sự kiện: [src/data/](src/data/).
- Âm thanh: [soundManager.ts](src/utils/soundManager.ts).

**Thay mới:**
- `src/store/careerStore.ts`: store Zustand mới dùng save key mới. Chứa chỉ số mới, khay quest, chỉ tiêu ngày, đồng hồ trong ngày, thiện cảm, cấp bậc, góc bàn, mạch truyện. Store cũ [gameStore.ts](src/store/gameStore.ts) vẫn để nguyên, chỉ thôi dùng.
- `src/game/quests/`:
  - định nghĩa quest = danh sách bước;
  - bộ sinh quest mỗi ngày theo cấp bậc, nghề và thiện cảm;
  - adapter biến `GameEvent` cũ thành quest "Tình huống" và quy đổi hiệu ứng.
- **Bỏ:** toàn bộ `src/scene/` (3D), các dependency `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`, và `StageHost.tsx`. Bundle giảm khoảng 260 KB gzip.
- **Bộ vẽ pixel `src/pixel/`:**
  - Một `<canvas>` toàn màn hình tắt làm mịn (`imageSmoothingEnabled = false`), độ phân giải logic cố định (ví dụ 320 px chiều cao mỗi khung nhìn), phóng nguyên lần theo màn hình.
  - Vòng `requestAnimationFrame`, vẽ theo thứ tự lớp: bầu trời và phố (parallax) → tường, sàn từng tầng → đồ vật → người → hiệu ứng.
  - Sprite viết dạng mảng chuỗi ký tự cộng bảng màu, dựng sẵn thành `ImageBitmap` khi tải. Sprite người sinh từ `CONTACTS` (màu áo, tóc, phụ kiện), nên thêm đồng nghiệp không cần vẽ tay.
- **Tòa nhà dạng dữ liệu** (`src/game/building/`): mỗi tầng có độ cao, dải x đi được, danh sách điểm tương tác (`AnchorId` + toạ độ x) và vị trí thang máy, cầu thang.
- **Di chuyển** (`src/game/building/route.ts`), không cần A*:
  - cùng tầng thì đi thẳng theo x;
  - khác tầng thì ghép đường "đi tới thang → chờ hoặc leo → đi tới đích";
  - chọn thang máy hay cầu thang theo tổng thời gian ước tính, người chơi có thể tự ép chọn.
- **Camera 2D:** bám nhân vật. Desktop thấy 2–3 tầng cùng lúc. Điện thoại thấy 1 tầng và nửa tầng kề.
- **Điểm chạm:** kiểm tra va chạm trên toạ độ canvas, vùng chạm của người và đồ vật nở rộng tối thiểu 44 px.
- **Ghim note và bong bóng chat:** dùng lại cơ chế DOM ghim theo toạ độ ([pins.ts](src/scene/pins.ts)), đổi phép chiếu 3D thành phép chiếu 2D đơn giản.
- **Mini-game:** mỗi loại là một component 2D trong `src/ui/minigames/` (TypingTask, TimingTask…), hiện trong khung giấy tờ.
- **Sếp đi tuần (lớp 2):** sếp đi dọc các tầng theo lịch, vùng nhìn vẽ thành dải sáng trước mặt.
- **Khi không hỗ trợ:** Canvas 2D chạy được ở mọi trình duyệt, nên bỏ luôn bản dự phòng không WebGL.

## Thứ tự làm (theo lớp, mỗi lớp chơi được)

1. **Lớp 1: một tuần chơi được.** Tòa nhà 5 tầng (sảnh, pantry, phòng IT, ban giám đốc, sân thượng) bằng pixel art, đi lại và thang máy/cầu thang, khay quest, đồng hồ trong ngày, chỉ tiêu, bốn chỉ số mới, 4 kiểu quest, giải lao, hỏng quest thì phạt hoặc dính biên bản, 5 ngày một tuần, đủ 3 biên bản là thua. **Dừng để bạn chơi thử.**
2. **Lớp 2: chiều sâu.** Thiện cảm đồng nghiệp, đánh giá cuối tuần, cấp bậc qua nhiều tuần, góc bàn giữ lại, sếp đi tuần và kiểu quest "Né sếp".
3. **Lớp 3: nội dung.** Mạch truyện IT và các kết thúc, các kiểu quest còn lại (Đối chiếu, Họp, Hỏi người), rồi đến 5 tầng nghề khác cùng quest liên phòng ban.

**Trước lớp 1, làm một bản nháp vứt đi (spike) khoảng nửa ngày:** 2 tầng pixel, một nhân vật đi lại và đi thang máy, một đồng nghiệp có note. Mục đích là để bạn duyệt nét pixel và cảm giác di chuyển trước khi viết lại kế hoạch chi tiết. Spike không có test và không giữ code.

## Phần để người làm tự quyết

- Con số cân bằng cụ thể: mức phạt, thời gian quest, tốc độ tụt tinh thần.
- Bố cục đồ vật và vị trí x của từng điểm tương tác trên mỗi tầng.
- Chi tiết từng sprite pixel, trong khuôn bảng màu đã chốt.
- Câu chữ của các quest mới.
- Hình dạng từng mini-game.

## Kiểm tra (cho lớp 1)

- `npx tsc -b`, `npm run build` pass, và `eslint` không có lỗi mới.
- Unit test cho logic thuần: ghép đường đi giữa các tầng (thang máy hay cầu thang), sinh quest, quy đổi sự kiện cũ, tính phạt và biên bản, cách đồng hồ ngày nhích lên.
- Playwright với Chrome có sẵn (như đợt trước), ở 1440×900 và 390×844:
  - đi từ sảnh lên phòng IT bằng thang máy, rồi bằng cầu thang;
  - nhận quest giao nhận và làm xong;
  - làm một quest gõ phím và một quest canh nhịp;
  - cố tình để hỏng một việc của sếp và thấy biên bản tăng;
  - đạt chỉ tiêu, ra về, sang ngày mới;
  - đủ 3 biên bản thì bị đuổi việc.
  - Suốt quá trình không có lỗi console.
- Bot tự chơi trọn 1 tuần để chắc vòng ngày và tuần không kẹt.
- Đo khung hình: canvas giữ ổn 60 fps khi bật CPU throttle 4×, ảnh chụp pixel sắc nét (không bị nhòe do co giãn lẻ).

## Ảnh hưởng tới việc đã làm

- **Kế hoạch triển khai chi tiết** [docs/superpowers/plans/2026-10-21-office-quest-layer1.md](docs/superpowers/plans/2026-10-21-office-quest-layer1.md) sẽ được **viết lại sau spike**:
  - Task 1, 2 và 7 (A*, vật cản 3D, nhân vật 3D) được thay bằng tòa nhà dữ liệu, đường đi giữa các tầng và bộ vẽ pixel.
  - Task 3–6 và 8–10 giữ gần như nguyên.
- **Cảnh 3D trên nhánh `feat/3d-office-ui`:** đề xuất commit một lần làm mốc lưu trữ trước khi xóa, để còn quay lại được. Chỉ làm khi bạn đồng ý commit.
