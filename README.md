# 👔 Office Survival (Sống Sót Công Sở)
**Office Survival** là một ứng dụng nhập vai mô phỏng dưới dạng văn bản (Text-based RPG/Roguelike) nhằm tái hiện lại môi trường và nhịp sống công sở hiện đại với các yếu tố châm biếm và thực tế. Người chơi sẽ hóa thân vào các chức vụ công sở khác nhau để đối mặt với các áp lực công việc, thời hạn hoàn thành (deadline) và các sự kiện ứng xử văn phòng hàng ngày.

---
https://office-survival-247.vercel.app/
---
## 🛠️ 1. Tech Stack

Dự án được xây dựng dựa trên các công nghệ hiện đại nhằm tối ưu hóa hiệu năng, tính tương thích trên thiết bị di động và đảm bảo tính toàn vẹn của dữ liệu:

*   **Core**: [React 19](https://react.dev/) kết hợp với [TypeScript](https://www.typescriptlang.org/) strict type check, đảm bảo an toàn kiểu dữ liệu cho toàn bộ cấu hình hệ thống.
*   **Build Tool**: [Vite 8](https://vite.dev/) tối ưu hóa tốc độ Hot Module Replacement (HMR) trong môi trường phát triển và hiệu suất đóng gói production bundle.
*   **Styling**: [TailwindCSS](https://tailwindcss.com/) phục vụ thiết kế giao diện responsive linh hoạt cho cả Desktop Grid và thiết bị di động.
*   **Animations**: [Framer Motion](https://www.framer.com/motion/) xử lý chuyển động mượt mà cho các thành phần UI (tab chuyển đổi nghề nghiệp, bong bóng tin nhắn hội thoại nhóm, các ô sự kiện dạng email).
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand) tích hợp middleware `persist`, tự động đồng bộ hóa và lưu trữ trạng thái trò chơi trực tiếp vào LocalStorage.
*   **Audio**: Hệ thống quản lý âm thanh HTML5 Audio đóng gói trong tệp tin `soundManager.ts` nhằm tăng cường trải nghiệm tương tác trực quan.

---

## 📈 2. Kiến trúc Logic & Cơ chế Gameplay

Dòng thời gian trong trò chơi kéo dài từ **Thứ Hai** đến **Thứ Bảy**. Mục tiêu của người chơi là duy trì các chỉ số sinh tồn ở ngưỡng an toàn để hoàn thành tuần làm việc.

### A. Phân bổ Thời gian & Khung giờ (Shifts & Time Slots)
Một ngày làm việc được phân chia thành 6 khung giờ cố định:
1.  `morning_start` (09:00 - 11:00): Bắt đầu ngày làm việc.
2.  `morning` (11:00 - 12:00): Ca làm việc sáng.
3.  `lunch` (12:00 - 13:30): Thời gian nghỉ trưa, mua sắm bổ trợ (Buffs) tại Căn-tin.
4.  `afternoon` (13:30 - 15:30): Ca làm việc chiều.
5.  `end_of_day` (15:30 - 17:30): Giao ban cuối ngày và tổng kết công việc.
6.  `overtime` (17:30 - 20:00): Ca làm thêm ban đêm tùy chọn (gia tăng tích lũy tài chính nhưng ảnh hưởng tiêu cực đến thể trạng).

### B. Chỉ số Sinh tồn cốt lõi (Core Stats)
Trạng thái của nhân vật được quyết định bởi ba chỉ số chính:
*   **Stress (Áp lực tâm lý - từ 0% đến 100%)**: Nếu Stress chạm mức tối đa `100%`, nhân vật sẽ rơi vào trạng thái kiệt quệ tâm lý (Burnout) dẫn đến Game Over.
*   **Energy (Năng lượng thể chất - từ 0% đến 100%)**: Nếu Energy suy giảm về mức tối thiểu `0%`, nhân vật sẽ kiệt sức thể xác dẫn đến Game Over.
*   **Salary (Tài chính tích lũy)**: Điểm số tài chính dùng để thanh toán phí ship hỏa tốc, giải quyết hậu quả của các sự kiện sai phạm hoặc đầu tư các nâng cấp tại Căn-tin.

### C. Cơ chế Tiêu hao Năng lượng Thụ động (Passive Energy Drain)
Lượng năng lượng tiêu hao thụ động tăng dần qua từng ngày làm việc (Thứ Hai áp dụng hệ số 1.0; tăng dần đến Thứ Bảy áp dụng hệ số 1.5):
*   **Thứ Bảy**: Tổng lượng tiêu hao thụ động mặc định trong ngày đạt **117 Energy** (vượt quá mức năng lượng tối đa 100). Đây là điểm nút thắt toán học bắt buộc người chơi phải đầu tư chiến thuật vào các vật phẩm phục hồi lâu dài (permanent buffs) hoặc nghỉ ngơi hợp lý để sống sót.

### D. Hệ thống Buff Căn-tin & Mua sắm khẩn cấp (Emergency Grab Delivery)
*   **Mua sắm ca trưa**: Người chơi có thể lựa chọn tối đa **2 vật phẩm** bổ trợ mỗi ngày.
*   **Phân loại thời gian hiệu lực (Durations)**:
    1.  `timeslot`: Hiệu ứng hồi phục lập tức tại thời điểm mua, biến mất khi chuyển sang khung giờ làm việc tiếp theo.
    2.  `day`: Hiệu ứng hồi phục lập tức và duy trì một lượng passive nhỏ ở mỗi lượt chuyển ca cho đến hết ngày hiện tại.
    3.  `permanent`: Hiệu ứng hồi phục lập tức và duy trì passive cố định qua từng ca làm việc xuyên suốt cả tuần (Bàn phím cơ, Ghế công thái học, Casio FX-580).
*   **Ship Hỏa Tốc Lén Lút**: Cơ chế cứu cánh khẩn cấp ngoài giờ ăn trưa. Cho phép mua sắm tại mọi khung giờ khác với mức giá nhân hệ số **2.0x** và chịu phạt trực tiếp **+10 Stress** (lo ngại bị phát hiện). Giới hạn 1 lần/ngày.

### E. Chuỗi Sự kiện Nghiệp Quả (Karma Chain Events)
Hệ thống sử dụng cơ chế cờ trạng thái (`flags`) để ghi nhận các quyết định mang tính rủi ro hoặc sai phạm của người chơi:
*   Ví dụ: các cờ `has_hidden_error` (giấu lỗi báo cáo), `audit_discrepancy` (lệch số liệu kế toán), `mkt_hidden_error` (lỗi kỹ thuật chiến dịch quảng cáo).
*   Các sự kiện cuối tuần sử dụng các cờ này làm điều kiện tiên quyết (`requirements.flags`) để kích hoạt chuỗi sự kiện nghiệp quả nặng nề (thanh tra thuế đột xuất, cảnh sát kinh tế triệu tập, sập máy chủ hệ thống).

### F. Hệ thống Thành tựu (Achievements)
Hệ thống tích hợp 10 thành tựu đặc trưng (Chiến thần dạ vâng sếp, Tâm bất biến giữa dòng đời vạn biến, Chiến binh làm thêm xuyên màn đêm...). Mỗi thành tựu khi mở khóa sẽ tự động kích hoạt hàm `applyStatEffects` để phát thưởng trực tiếp vào chỉ số tài chính, hồi sức hoặc giải tỏa áp lực cho người chơi.

### G. Hệ thống Cấp bậc Độ khó (Difficulty Levels - Ranks) [Phiên Bản v1.1]
Trò chơi tích hợp 4 cấp bậc công sở (phù hợp với khả năng xử lý deadline của người chơi), thay đổi trực quan các hệ số toán học của gameplay:
*   **Thực tập sinh (Intern - Dễ)**: 
    *   Tăng hệ số thời gian đọc timer sự kiện: **1.5x** (tăng thêm 50% thời gian phản xạ).
    *   Giảm áp lực Stress nhận từ các quyết định: **-30%** (hệ số x0.7).
    *   Giảm hao hụt thể lực thụ động mỗi ca làm: **-30%** (hệ số x0.7).
    *   Thưởng thêm **+200,000đ** lương khởi điểm (được gia đình chu cấp).
    *   Cơm nước tại Căn-tin được chiết khấu rẻ hơn: **-20%** (hệ số x0.8).
    *   Hình phạt khi để cạn hết thời gian (timeout) giảm nhẹ một nửa (hệ số x0.5).
*   **Nhân viên chính thức (Junior - Trung bình)**:
    *   Tăng nhẹ thời gian phản xạ: **1.2x** (dễ thở hơn một chút so với mặc định).
    *   Giảm 10% Stress nhận và hao hụt thể lực (hệ số x0.9).
    *   Cộng thêm **+100,000đ** lương khởi điểm, Căn-tin giảm giá 10% (hệ số x0.9).
    *   Hình phạt khi timeout giảm nhẹ 20% (hệ số x0.8).
*   **Lão làng gánh team (Senior - Khó)**:
    *   *Đây là độ khó mặc định của game.*
    *   Tất cả các hệ số toán học nhân và phạt đều áp dụng mặc định ở mức **1.0x**.
*   **Kẻ hủy diệt deadline (CEO/Executive - Ác mộng)**:
    *   Rút ngắn thời gian phản xạ timer sự kiện: **-20%** (hệ số x0.8 - nhịp độ nhanh dồn dập).
    *   Tăng Stress nhận thêm **+25%** (hệ số x1.25).
    *   Thể lực hao hụt thụ động nhanh hơn **+20%** (hệ số x1.2).
    *   Khởi đầu ví âm nợ thẻ tín dụng: **-150,000đ** từ ví 500k mặc định.
    *   Lạm phát phong cách sống tăng giá vật phẩm Căn-tin: **+30%** (hệ số x1.3).
    *   Hình phạt khi đứng hình (timeout) tăng gấp rưỡi: **1.5x** hình phạt mặc định.

### H. Menu Cài Đặt Hệ Thống & Tắt Tiếng (System Settings & Audio Controls) [Phiên Bản v1.1]
*   **Bảng Điều Khiển Responsive**: Được tích hợp dạng Pill Badge `⚙️ Hệ thống` căn dọc hoàn hảo ở thanh TopBar (giao diện Desktop) và dạng **Tab thứ 3** di động trên Bottom Navigation nằm cạnh Zalo (giao diện Mobile).
*   **Quản lý Âm thanh**: Tích hợp công tắc bật/tắt toàn bộ hiệu ứng SFX và nhạc nền BGM, đồng bộ và ghi nhớ trực tiếp vào `localStorage` của trình duyệt.
*   **Nộp Đơn Xin Nghỉ Việc (Hard Reset)**: Nút bấm duy nhất trong vùng an toàn Danger Zone giúp xóa sạch toàn bộ `localStorage` của game (bao gồm tiến trình tuần làm việc hiện tại và kho Achievements đã đạt được) và reload lại trang để bắt đầu cuộc đời mới từ một trang giấy trắng.

---

## 📂 3. Cấu trúc Thư mục Dự án (Project Architecture)

Mã nguồn dự án được tổ chức theo kiến trúc modular, phân tách độc lập giữa máy trạng thái (State Machine), thành phần hiển thị (UI Components) và các gói dữ liệu nội dung (Content Packs):

```
Office-Survival/
├── src/
│   ├── components/            # Thành phần giao diện dùng chung
│   │   ├── layout/            # LeftPanel (Zalo Chat), RightPanel (Stats/Buffs), CenterPanel (Email Event)
│   │   └── ui/                # InteractiveGuide (Cẩm nang công sở), ProgressBars
│   │
│   ├── data/                  # Cấu hình dữ liệu nội dung trò chơi
│   │   ├── events/            # common.events.ts (Các sự kiện công sở dùng chung cho mọi nghề)
│   │   ├── professions/       # Các file cấu hình độc lập của 6 nghề nghiệp (it, ke_toan, designer, seo_bds, marketing, boy_pho)
│   │   └── buffs.data.ts      # Dữ liệu Buff chung tại Căn-tin
│   │
│   ├── screens/               # Các màn hình chính theo vòng đời ứng dụng
│   │   ├── StartScreen.tsx        # Màn hình bắt đầu (Menu chính)
│   │   ├── ProfessionScreen.tsx   # Màn hình chọn nghề (Giao diện mobile hỗ trợ Tab Slider)
│   │   ├── GameScreen.tsx         # Màn hình chơi game chính
│   │   ├── DailySummaryScreen.tsx # Màn hình tổng kết ca tối và lựa chọn nghỉ ngơi
│   │   ├── DayTransitionScreen.tsx# Màn hình hiệu ứng chuyển ngày
│   │   ├── GameOverScreen.tsx     # Màn hình kết thúc game do kiệt sức/sa thái
│   │   └── VictoryScreen.tsx      # Màn hình chiến thắng khi hoàn thành tuần làm việc
│   │
│   ├── store/                 # Quản lý trạng thái và logic tính toán toán học
│   │   ├── gameStore.ts           # Zustand store - Máy trạng thái trung tâm quản lý logic game
│   │   ├── gameHelpers.ts         # Tiện ích sinh sự kiện ngẫu nhiên (randomEvents) & ràng buộc chỉ số
│   │   └── professionRegistry.ts  # Trình nạp động Vite glob loader tự động liên kết các pack nghề mới
│   │
│   ├── types/                 # Định nghĩa kiểu dữ liệu tĩnh TypeScript
│   │   ├── game.types.ts          # Mô hình dữ liệu Buff, Stats, History, DayConfig
│   │   └── event.types.ts         # Mô hình dữ liệu ChatReply, Action, GameEvent, Requirements
│   │
│   └── utils/                 # Tiện ích hỗ trợ hệ thống
│       ├── achievementChecker.ts  # Logic kiểm tra điều kiện mở khóa thành tựu
│       ├── soundManager.ts        # Quản lý phát âm thanh hiệu ứng tương tác
│       └── statCalculator.ts      # Tiện ích định dạng hiển thị tiền tệ
│
├── eslint.config.js           # Cấu hình Linter kiểm soát chất lượng code
├── tsconfig.json              # Ràng buộc biên dịch TypeScript nghiêm ngặt
└── package.json               # Định nghĩa thư viện phụ thuộc và scripts
```

---

## ⚡ 4. Hướng dẫn Chạy Dự án (Developer Guide)

Thực hiện các bước sau để khởi chạy dự án trong môi trường phát triển local:

1.  **Cài đặt các thư viện phụ thuộc**:
    ```bash
    npm install
    ```
2.  **Khởi chạy máy chủ phát triển (Development Server)**:
    ```bash
    npm run dev
    ```
3.  **Xác minh biên dịch TypeScript & Đóng gói Production Bundle**:
    ```bash
    npm run build
    ```
    *Lệnh này thực hiện quét toàn bộ TypeScript để đảm bảo tính an toàn về mặt kiểu dữ liệu và thực hiện tối ưu hóa, đóng gói bundle chạy ổn định trên môi trường sản phẩm.*

---

