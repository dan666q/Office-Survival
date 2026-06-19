# 🎮 OFFICE SURVIVAL — Game Design Document

================================================================================
# 🇬🇧 ENGLISH VERSION
================================================================================

## 1. OVERVIEW

**Genre:** Survival / Decision-making / Narrative / RPG Lite  
**Platform:** Web (React + TypeScript)  
**Goal:** Survive 6 working days (Monday → Saturday) by managing Stress (must not reach 100%) and Energy (must not drop to 0%).  
**Tone:** Humorous, satirical take on the Vietnamese corporate office environment, simulating department drama.  
**UI Style:** Corporate SaaS Dashboard — Players feel as though they are using actual office software, complete with simulated chat logs (Slack/Zalo style) and system logs.

---

## 2. SCREEN FLOW

```
Start Screen (difficulty selection)
    ↓
Choose Profession (IT Dev / Sales BĐS / Accounting / Marketing / Designer / City Boy)
    ↓
Game Screen (core gameplay)
    ↓ each day
Daily Summary (rest choices)
    ↓
Day Transition Screen
    ↓ after Saturday
Victory Screen
         or
Game Over Screen (at any time if stress >= 100% or energy <= 0%)
```

### 2.1 Start Screen
- Logo + game tagline.
- Difficulty level selector (Thực tập sinh / Intern, Nhân viên / Junior, Lão làng / Senior, Hủy diệt / CEO).
- "Start Workweek" button or "Continue" button if a save exists (Auto-save via LocalStorage).

### 2.2 Choose Profession Screen
- 6 rich career choices.
- Displays starting stats, main enemy, daily salary, humorous tagline, and recommended difficulty rating for each career.

### 2.3 Game Screen (3-Column Dashboard Layout)
- **Topbar:** Displays the current day, timeslot, Stress bar, Energy bar, Accumulated Salary, and settings.
- **Timeslot bar:** Displays progress through the day's timeslots.
- **Left panel (Jira-style):** Active event card list. Supports up to 3 concurrent events on higher difficulties.
- **Center panel (Live Feed):** Simulates terminal logs and Zalo/Slack chat threads from the boss, colleagues, or clients with interactive chat replies.
- **Right panel (Buffs & Shop):** Shows active buffs (Permanent / Temporary) and the GrabFood lunch shop (opens only during lunch slot to buy up to 2 buffs).

### 2.4 Daily Summary
- Appears after the last timeslot of each day.
- Stats breakdown: salary earned today, total events handled, and current health status.
- Rest choices (Sleep / Beer / Overtime) that affect starting stats for the next morning.

### 2.5 Day Transition Screen
- Brief transition screen showing day-specific titles (e.g., *Thứ Sáu Deploy*, *Sprint Planning Địa Ngục*).

### 2.6 Game Over Screen
- Specific reason for losing (Burnout / Energy depleted / Arrested by C03 police for tax evasion or A05 police for cyber crimes based on risky event choices in Accounting/IT).
- Final week statistics: days survived, total events handled, salary earned.

### 2.7 Victory Screen
- Appears after surviving through Saturday.
- Displays all unlocked Achievements.

---

## 3. DETAILED GAMEPLAY

### 3.1 One-Day Structure

Each working day is divided into 6 timeslots:

| Timeslot | System Code | Activity | Notes |
|---|---|---|---|
| 08:00 – 09:00 | `morning_start` | Shift Start | Soft start, fewer events |
| 09:00 – 12:00 | `morning` | Morning | Core events begin to spawn |
| 12:00 – 13:00 | `lunch` | Lunch | GrabFood shop opens (buy up to 2 buffs), no events, no energy drain |
| 13:00 – 17:00 | `afternoon` | Afternoon | High event frequency and major office dramas |
| 17:00 – 19:00 | `end_of_day` | Shift End | Wrap-up events, late meetings |
| 19:00+ | `overtime` | Overtime | High pressure, heavy energy drain. Can click "Go Home" to skip |

### 3.2 Event System

Each timeslot draws random events from a pool combining Common Events and Profession-specific Events.

**Structure of an Event:**
- Title, description, and priority level (`low`, `medium`, `high`, `critical`).
- Countdown Timer (seconds) to handle the event.
- When the timer runs out (Timeout): A heavy default penalty is applied: Stress +25, Energy -15, Salary -200,000 (scaled by difficulty multipliers).
- Consecutive Timeout Penalty: Failing twice or more in a row multiplies the penalty by 1.5x and automatically injects an urgent boss meeting/escalation event at the front of the queue.

**RPG Mechanics & Risks:**
- Events and actions can have requirements based on stats or flags set by previous choices (e.g., *intern_cried*, *has_hidden_error*, *team_hates_you*).
- Risky/dishonest choices (e.g., fudging tax records, installing cracked software, bribery) might solve immediate problems and gain salary, but raise flags that trigger audit inspections or police arrests down the line.

### 3.3 Difficulty Configurations

The game implements 4 difficulty levels:

| Configuration | Intern (`intern`) | Junior (`junior`) | Senior (`senior`) | CEO (`ceo`) |
|---|---|---|---|---|
| **Emoji** | 👶 | 🧑‍💻 | 🧙‍♂️ | 💀 |
| **Description** | Low pressure, cheap buffs, high starting salary offset. | Standard experience, moderate pacing. | Base difficulty and pacing of the game. | Debt-ridden, intense boss pressure. One error is fatal. |
| **Timer Multiplier** | 1.5x | 1.2x | 1.0x | 0.8x |
| **Stress Multiplier** | 0.7x | 0.9x | 1.0x | 1.25x |
| **Energy Multiplier** | 0.7x | 0.9x | 1.0x | 1.2x |
| **Starting Salary Offset**| +200,000 | +100,000 | +0 | -150,000 |
| **Buff Cost Multiplier** | 0.8x | 0.9x | 1.0x | 1.3x |
| **Timeout Penalty Mult.** | 0.5x | 0.8x | 1.0x | 1.5x |

### 3.4 Stats System

The game manages 3 core stats:
1. **Stress:** Range 0-100%. Game Over if stress reaches 100% (Burnout).
2. **Energy:** Range 0-100%. Game Over if energy reaches 0% (Physical collapse).
3. **Salary:** The cash currently in hand to purchase recovery buffs at the GrabFood shop. Increases via daily salary, achievement rewards, and wise decisions. Decreased by shop purchases or disciplinary fines.

*Note:* Stats do NOT reset between days; they carry over to the next morning.

---

## 4. SIX PROFESSIONS

### 4.1 IT Dev (💻)
- **Tagline:** Code running is a miracle. But the boss wants it done on schedule anyway.
- **Difficulty:** Hard
- **Enemies:** Production bugs, pushing PMs, boss calling at 10 PM, dangerous interns.
- **Starting Stats:** Stress 45, Energy 70, Salary 500,000. Daily Salary: 580,000.
- **Special Events:** Legacy code migration, Intern force pushing to main, database deadlock, SSL expiration, Copilot-generated bug.

### 4.2 Sales BĐS / Real Estate Sales (🏠)
- **Tagline:** Clients are gods. Until they read your messages and block you.
- **Difficulty:** Medium
- **Enemies:** Ghost leads, spam lists, colleagues stealing clients, end-of-month sales quotas.
- **Starting Stats:** Stress 20, Energy 85, Salary 500,000. Daily Salary: 420,000.
- **Special Events:** Penthouse 20 billion lead, colleagues poaching clients, distribution of flyers under hot sun, client asking for commission kickbacks, divorcing couple canceling housing contract.

### 4.3 Accounting (📊)
- **Tagline:** Numbers never lie. Except when the boss or Excel demands they do.
- **Difficulty:** Hard
- **Enemies:** #REF! errors, surprise audits, boss demanding ledger alterations.
- **Starting Stats:** Stress 40, Energy 70, Salary 500,000. Daily Salary: 450,000.
- **Special Events:** 50MB Excel file crash, boss demanding tax evasion tricks, duplicate bank transfer, tax inspection, ledger discrepancies.

### 4.4 Marketing (📣)
- **Tagline:** Million-dollar budgets, infinite KPIs. Looking busy is key, burning ad dollars for Zuckerberg is mandatory.
- **Difficulty:** Medium
- **Enemies:** Facebook ad algorithm updates, boss demanding zero-budget viral videos, Sales screaming about spam leads.
- **Starting Stats:** Stress 20, Energy 85, Salary 500,000. Daily Salary: 450,000.
- **Special Events:** Suspended Facebook Ads accounts, viral TikTok dance failures, typos on backdrop banners, KOL spokesperson scandals, setting lifetime budget instead of daily budget.

### 4.5 Designer (🎨)
- **Tagline:** Design is the art of communication. But the client wants a "bigger, glowing logo".
- **Difficulty:** Medium
- **Enemies:** Figma crashes, endless feedbacks, feng-shui logo adjustments, font licensing lawsuits.
- **Starting Stats:** Stress 25, Energy 85, Salary 500,000. Daily Salary: 480,000.
- **Special Events:** Non-feng-shui colors feedback, glowing karaoke logo request, Figma Out of Memory errors, font copyright notifications, RGB/CMYK printing mismatch, Behance portfolio NDA leaks.

### 4.6 City Boy / "Boy phố làm bố" (😎)
- **Tagline:** Working for fun, spending parents' money. What is a deadline?
- **Difficulty:** Easy (God Mode)
- **Enemies:** None (no boss dares to touch you), only running out of gas for the custom Wave Alpha.
- **Starting Stats:** Stress 0, Energy 100, Salary 5,000,000. Daily Salary: 10,000,000.
- **Special Events:** Waking up at 10 AM (boss sends voucher), late report (PM does it for you), sleeping during executive meeting (boss tucks you in), calling dad to buy out the project.

---

## 5. BUFF SYSTEM (GRABFOOD SHOP)

During the `lunch` slot, players can purchase up to 2 buffs from the shop:

| Buff | Icon | Base Cost | Effect | Duration |
|---|---|---|---|---|
| **Highlands Phin Sữa Đá** | ☕ | 150,000 | Energy +25, Stress +5 | Immediate / 1 Timeslot |
| **Cơm tấm sườn bì chả** | 🍱 | 300,000 | Energy +35, Stress -10 | Immediate / 1 Timeslot |
| **Dầu gió xanh Thiên Thảo**| 🧴 | 500,000 | Energy +10, Stress -15 | Permanent for the week |
| **Cả hộp Salonpas dán lưng**| 🩹 | 900,000 | Energy +25, Stress -30 | Permanent for the week |
| **Trà sữa KOI Thé** | 🥤 | 650,000 | Energy +10, Stress -35 | Immediate / 1 Timeslot |
| **Bò Húc Thái** | 🐂 | 150,000 | Energy +30, Stress +15 | Immediate / 1 Timeslot |

*Note:* In addition to these common buffs, each profession dynamically loads its own unique buffs (e.g., *Claude Code Premium* for IT, *Data VIP District 2* for Sales, *Wacom Intuos Pro* for Designer).

---

## 6. DAILY SUMMARY — OVERNIGHT REST

At the end of each day, players select one of three rest options:

1. **Sleep Early:**
   - **Effects:** Energy +45, Stress -25, Cost: 0.
   - **Evaluation:** Safe, reliable way to recover physical stats.
2. **Beer with Colleagues:**
   - **Effects:** Energy +5, Stress -45, Salary -150,000.
   - **Evaluation:** Massive stress relief but costs money, with a 30% chance of next-morning drama (+10 stress).
3. **Overtime at Home:**
   - **Effects:** Energy -15, Stress +25, Salary +250,000.
   - **Evaluation:** Great for earning money but drains physical stats. If current stress > 70%, adds an extra +10 stress penalty due to burnout overload.

---

## 7. ACHIEVEMENTS

The system tracks and automatically unlocks 10 achievements:

| Achievement Name | Icon | Condition | Reward |
|---|---|---|---|
| **Sống sót qua Thứ Hai Kinh Hoàng** | 💪 | Survived Monday. | +300k Salary, -10% Stress |
| **Vương giả công sở** | 🏆 | Completed the full week (survived Saturday). | +1M Salary, -30% Stress, +20% Energy |
| **Tâm bất biến giữa dòng đời vạn biến**| 🧘 | Keep Stress below 30%. | +200k Salary, +10% Energy |
| **Triệu phú công sở** | 💰 | Accumulate 3,000,000 or more in Salary. | -15% Stress, +20% Energy |
| **Chiến thần "Dạ vâng sếp"** | 🤝 | Agree to boss/client requests 10 times. | +400k Salary, +15% Stress |
| **Tràn trề sinh lực văn phòng** | ⚡ | Keep Energy above 80%. | +150k Salary, -10% Stress |
| **Chiến binh làm thêm xuyên màn đêm** | 🌙 | Choose Overtime during overnight rest. | +200k Salary, +10% Energy |
| **Vượt qua cửa tử burnout** | 🔥 | Continue working when Stress is >= 90%. | +500k Salary, +30% Energy, -20% Stress |
| **Người tiêu dùng thông thái** | 🛒 | Successfully purchased a buff from the shop. | -15% Stress, +10% Energy |
| **Người của hòa bình** | 🕊 | Refuse to listen to pantry gossip. | +100k Salary, -20% Stress |

---

## 8. UI ANIMATIONS & EFFECTS

- **Extreme Stress (> 80%):** Shakes the dashboard UI slightly.
- **Critical Stress (> 90%):** Blinks a red border around the screen.
- **Low Energy (< 20%):** Fades screen opacity to simulate drowsiness.
- **Action Feedbacks:** Choosing a safe option flashes green, while risky choices trigger a red danger flash with Success/Danger audio cues via `soundManager`.

---

## 9. TECH STACK

- **UI Framework:** React 18
- **Language:** TypeScript
- **Styling:** Vanilla CSS / Tailwind CSS v4
- **State Management:** Zustand (with `zustand/persist` for LocalStorage autosaves)
- **Audio System:** Custom `soundManager` playing type sounds, warnings, and success cues.

---

## 10. DIRECTORY STRUCTURE

```
src/
├── main.tsx                      # App entry point
├── App.tsx                       # Main screen routing
├── App.css                       # Global styles
├── index.css                     # Tailwind / CSS base
│
├── types/                        # Type interfaces
│   ├── game.types.ts             # GameStats, DaySummary, FeedEntry, Buff
│   ├── event.types.ts            # GameEvent, Action, StatEffect, ChatReply
│   └── config.types.ts           # DayConfig, TimeSlotConfig
│
├── store/                        # State stores
│   ├── gameStore.ts              # Core Zustand store & interactive logic
│   ├── gameHelpers.ts            # Helper functions for random events, time
│   └── professionRegistry.ts     # Registry for dynamically loaded professions
│
├── data/                         # Static game configurations
│   ├── buffs.data.ts             # GrabFood shop buffs list
│   ├── days.config.ts            # 6 days config (Monday -> Saturday)
│   ├── difficulty.config.ts      # 4 difficulty levels config
│   ├── events/
│   │   └── common.events.ts      # Shared events pool
│   └── professions/              # Career configs & specific events
│       ├── boy_pho.ts
│       ├── designer.ts
│       ├── it.ts
│       ├── ke_toan.ts
│       ├── marketing.ts
│       └── seo_bds.ts
│
├── screens/                      # Screen views
│   ├── StartScreen.tsx
│   ├── ProfessionScreen.tsx
│   ├── GameScreen.tsx
│   ├── DayTransitionScreen.tsx
│   ├── DailySummaryScreen.tsx
│   ├── GameOverScreen.tsx
│   └── VictoryScreen.tsx
│
├── components/
│   ├── layout/                   # GameScreen panels
│   │   ├── TopBar.tsx
│   │   ├── TimeSlotBar.tsx
│   │   ├── LeftPanel.tsx
│   │   ├── CenterPanel.tsx
│   │   ├── RightPanel.tsx
│   │   ├── MobileEventSlot.tsx
│   │   └── SystemSettingsPanel.tsx
│   ├── event/                    # Event cards
│   │   ├── EventCard.tsx
│   │   └── EventTimer.tsx
│   └── ui/                       # Reusable UI primitives
│       ├── Button.tsx
│       ├── Badge.tsx
│       └── InteractiveGuide.tsx   # Tutorial guide
│
└── utils/                        # Utility scripts
    ├── statCalculator.ts         # Math for stat updates
    ├── eventSelector.ts          # Event filters
    ├── soundManager.ts           # Sound effects manager
    └── achievementChecker.ts     # Condition checks for achievements
```

---

## 11. MAIN DATA STRUCTURES

### GameStats
```typescript
interface GameStats {
  stress: number   // 0–100, Game Over if >= 100
  energy: number   // 0–100, Game Over if <= 0
  salary: number   // Current cash to spend in shop
}
```

### GameEvent
```typescript
interface GameEvent {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  professions: string[]
  timeSlots?: TimeSlot[]
  actions: Action[]
  requirements?: Requirements
}
```

### Action
```typescript
interface Action {
  id: string
  label: string
  effects: StatEffect[]
  chainEvents?: ChainEvent[]
  feedMessage: string
  requirements?: Omit<Requirements, 'days'>
  setFlags?: Record<string, boolean>
  chatReplies?: ChatReply[]
}
```

================================================================================
# 🇻🇳 VIETNAMESE VERSION
================================================================================

## 1. TỔNG QUAN

**Thể loại:** Survival / Decision-making / Narrative / RPG Lite  
**Platform:** Web (React + TypeScript)  
**Mục tiêu:** Sống sót qua 6 ngày làm việc (Thứ 2 → Thứ 7) bằng cách quản lý chỉ số Stress (không để chạm 100%) và Energy (không để chạm 0%).  
**Tone:** Hài hước, châm biếm sâu sắc môi trường công sở Việt Nam, mô phỏng sinh động drama phòng ban.  
**UI Style:** Corporate SaaS Dashboard — Người chơi có cảm giác như đang sử dụng một phần mềm làm việc thực tế với các thông báo hệ thống, tin nhắn Slack/Zalo giả lập.

---

## 2. FLOW MÀN HÌNH

```
Start Screen (chọn độ khó)
    ↓
Chọn nghề (IT Dev / Sales BĐS / Kế Toán / Marketing / Designer / Boy phố làm bố)
    ↓
Game Screen (core gameplay)
    ↓ mỗi ngày
Daily Summary (chọn cách nghỉ ngơi)
    ↓
Day Transition Screen
    ↓ qua hết Thứ 7
Victory Screen
         hoặc
Game Over Screen (khi stress >= 100% hoặc energy <= 0%)
```

### 2.1 Start Screen
- Logo + tagline của trò chơi.
- Lựa chọn độ khó (Thực tập sinh, Nhân viên, Lão làng, Hủy diệt).
- Nút "Bắt đầu tuần làm việc" hoặc "Tiếp tục" nếu có lưu game (Auto-save qua LocalStorage).

### 2.2 Màn hình chọn nghề
- 6 lựa chọn nghề nghiệp phong phú.
- Hiển thị thông số khởi đầu, kẻ thù chính, daily salary, tagline hài hước và độ khó khuyến nghị của từng nghề.

### 2.3 Game Screen (3 cột chuẩn Dashboard)
- **Topbar:** Hiển thị ngày hiện tại, khung giờ, Stress bar, Energy bar, Điểm tích lũy lương (Salary), và nút reset/cài đặt.
- **Timeslot bar:** Hiển thị tiến trình các khung giờ làm việc trong ngày.
- **Left panel (Jira-style):** Danh sách thẻ sự kiện (Event cards) đang diễn ra. Hỗ trợ tối đa 3 sự kiện đồng thời ở các độ khó cao.
- **Center panel (Live Feed):** Mô phỏng terminal log và luồng chat Zalo/Slack từ sếp, đồng nghiệp hoặc khách hàng với các tin nhắn tương tác (Chat Replies).
- **Right panel (Buffs & Shop):** Hiển thị các Buff đang kích hoạt (Permanent / Temporary) và Shop đồ ăn uống GrabFood mở trong giờ ăn trưa.

### 2.4 Daily Summary
- Hiện ra khi hết khung giờ làm việc cuối cùng trong ngày.
- Thống kê chi tiết: số tiền lương tích lũy trong ngày, số sự kiện đã xử lý, và các chỉ số sức khỏe hiện tại.
- Lựa chọn cách nghỉ ngơi qua đêm (Sleep / Beer / Overtime) ảnh hưởng trực tiếp đến stats sáng hôm sau.

### 2.5 Day Transition Screen
- Màn hình chuyển tiếp ngày mới ngắn gọn, hiển thị tiêu đề ngày đầy kịch tính (ví dụ: *Thứ Sáu Deploy*, *Sprint Planning Địa Ngục*).

### 2.6 Game Over Screen
- Lý do thua cuộc cụ thể (Burnout hoàn toàn / Kiệt sức gục ngã tại bàn làm việc / Bị công an kinh tế C03 hoặc công an mạng A05 bế đi do các event vi phạm pháp luật).
- Thống kê kết quả tuần: ngày sống sót, số sự kiện đã xử lý, lương tích lũy.

### 2.7 Victory Screen
- Xuất hiện khi vượt qua hết ngày Thứ 7.
- Tổng kết toàn bộ thành tựu (Achievements) đã mở khóa.

---

## 3. GAMEPLAY CHI TIẾT

### 3.1 Cấu trúc một ngày làm việc

Mỗi ngày được chia làm 6 khung giờ (Timeslots):

| Khung giờ | Mã hệ thống | Tác vụ chính | Ghi chú |
|---|---|---|---|
| 08:00 – 09:00 | `morning_start` | Vào ca | Khởi động ngày mới, ít sự kiện |
| 09:00 – 12:00 | `morning` | Buổi sáng | Các sự kiện chính bắt đầu xuất hiện |
| 12:00 – 13:00 | `lunch` | Ăn trưa | Mở shop GrabFood mua tối đa 2 buffs hồi phục, không có sự kiện |
| 13:00 – 17:00 | `afternoon` | Buổi chiều | Tần suất sự kiện cao, nhiều drama lớn |
| 17:00 – 19:00 | `end_of_day` | Tan ca | Các sự kiện chốt ngày, họp đột xuất |
| 19:00+ | `overtime` | Overtime | Áp lực cao, tiêu hao nhiều năng lượng, có thể chọn bấm Về nhà sớm để skip |

### 3.2 Event System (Hệ thống Sự kiện)

Mỗi khung giờ sẽ rút ngẫu nhiên các sự kiện phù hợp từ kho sự kiện chung (Common Events) và kho sự kiện riêng của nghề (Profession-specific Events).

**Cấu trúc một Event:**
- Tiêu đề, mô tả sự kiện, mức độ ưu tiên (`low`, `medium`, `high`, `critical`).
- Hạn giờ (Countdown Timer): Đếm ước thời gian xử lý sự kiện (giây).
- Khi hết giờ (Timeout): Áp dụng hình phạt mặc định nặng: Stress +25, Energy -15, Salary -200,000 (các trị số gốc sẽ nhân theo hệ số độ khó).
- Phạt Timeout liên tiếp: Nếu để trượt giờ từ 2 lần liên tiếp, hình phạt nhân 1.5 lần và hệ thống tự động đẩy sự kiện sếp nhắn tin khẩn cấp/truy cứu trách nhiệm vào hàng đợi.

**RPG Mechanics & Rủi ro:**
- Sự kiện và lựa chọn (Action) có thể yêu cầu điều kiện stats hoặc cắm cờ (Flags) từ các hành động trước đó (ví dụ: *intern_cried*, *has_hidden_error*, *team_hates_you*).
- Lựa chọn mạo hiểm/gian dối (ví dụ: xào nấu báo cáo, crack phần mềm, hối lộ) có thể trót lọt mang lại nhiều tiền nhưng cắm cờ rủi ro kích hoạt thanh tra thuế/công an điều tra ở các sự kiện sau.

### 3.3 Hệ thống Độ khó (Difficulty Configurations)

Hệ thống cung cấp 4 mức độ khó được cấu hình chi tiết:

| Cấu hình | Thực tập sinh (`intern`) | Nhân viên (`junior`) | Lão làng (`senior`) | Hủy diệt (`ceo`) |
|---|---|---|---|---|
| **Emoji đại diện** | 👶 | 🧑‍💻 | 🧙‍♂️ | 💀 |
| **Mô tả ngắn** | Ít áp lực, buff rẻ, lương khởi điểm cao. | Trải nghiệm tiêu chuẩn, nhịp độ vừa phải. | Áp lực và tốc độ gốc của game. | Nợ nần bủa vây, một lỗi là bay màu. |
| **Hệ số thời gian** | 1.5x | 1.2x | 1.0x | 0.8x |
| **Hệ số tăng Stress** | 0.7x | 0.9x | 1.0x | 1.25x |
| **Hệ số giảm Energy** | 0.7x | 0.9x | 1.0x | 1.2x |
| **Lương bù khởi điểm** | +200,000 | +100,000 | +0 | -150,000 |
| **Hệ số giá Buff shop** | 0.8x | 0.9x | 1.0x | 1.3x |
| **Hệ số phạt Timeout** | 0.5x | 0.8x | 1.0x | 1.5x |

### 3.4 Stats System (Hệ thống Chỉ số)

Trò chơi quản lý 3 chỉ số sinh tồn cốt lõi:
1. **Stress (Căng thẳng):** Phạm vi 0–100%. Thua cuộc ngay lập tức khi stress chạm 100% (Game Over do Burnout). Tăng lên khi gặp áp lực, deadline, và giảm đi khi giải trí, nghỉ ngơi.
2. **Energy (Năng lượng):** Phạm vi 0–100%. Thua cuộc ngay lập tức khi energy chạm 0% (Game Over do kiệt sức ngủ gục). Giảm dần qua mỗi khung giờ làm việc theo cấu hình ngày.
3. **Salary (Lương tích lũy):** Số tiền hiện có để mua các Buff hồi phục tại Shop GrabFood. Tích lũy qua lương ngày của nghề, phần thưởng thành tựu, các quyết định khôn ngoan, hoặc bị khấu trừ do lỗi phạt chuyên cần.

*Lưu ý:* Các chỉ số KHÔNG tự động reset khi qua ngày mới mà được mang nguyên sang hôm sau.

---

## 4. SÁU NGHỀ NGHIỆP

### 4.1 IT Dev (💻)
- **Tagline:** Code chạy được là phép màu. Nhưng sếp lại muốn chạy đúng tiến độ.
- **Độ khó:** Khó
- **Kẻ thù:** Bug production, PM hối thúc, sếp gọi lúc 10pm, intern nguy hiểm.
- **Stats khởi đầu:** Stress 45, Energy 70, Salary 500,000. Lương ngày: 580,000.
- **Sự kiện đặc trưng:** Migrate sang framework mới, Intern force push nát nhánh main, database deadlock, SSL hết hạn, Copilot sinh bug.

### 4.2 Sales BĐS (🏠)
- **Tagline:** Khách hàng là thượng đế. Cho đến khi họ seen tin nhắn và block bạn.
- **Độ khó:** Trung bình
- **Kẻ thù:** Khách ảo, leads rác, cướp khách từ đồng nghiệp, áp lực chốt số cuối tháng.
- **Stats khởi đầu:** Stress 20, Energy 85, Salary 500,000. Lương ngày: 420,000.
- **Sự kiện đặc trưng:** Phát hiện lead Penthouse 20 tỷ, đồng nghiệp rình cướp khách, phát tờ rơi ngã tư, khách đòi cắt hoa hồng, vợ chồng ly hôn hủy mua nhà.

### 4.3 Kế Toán (📊)
- **Tagline:** Số liệu không bao giờ sai. Chỉ có sếp hoặc Excel bắt nó phải sai.
- **Độ khó:** Khó
- **Kẻ thù:** Lỗi #REF!, kiểm toán thuế đột xuất, sếp muốn xào nấu số liệu.
- **Stats khởi đầu:** Stress 40, Energy 70, Salary 500,000. Lương ngày: 450,000.
- **Sự kiện đặc trưng:** Excel 50MB crash xanh màn hình, sếp ép né thuế, chuyển khoản nhầm 2 lần cho đối tác, Cục Thuế thanh tra, quỹ hụt tiền mặt.

### 4.4 Marketing (📣)
- **Tagline:** Kinh phí tiền tỷ, KPI vô biên. Làm màu là phụ, cúng tiền chạy ads cho Mark Zuckerberg là chính.
- **Độ khó:** Trung bình
- **Kẻ thù:** Thuật toán Facebook thay đổi, sếp đòi viral 0 đồng, KPI lead rác từ sales chửi bới.
- **Stats khởi đầu:** Stress 20, Energy 85, Salary 500,000. Lương ngày: 450,000.
- **Sự kiện đặc trưng:** Tài khoản ads bị khóa, video TikTok triệu view uốn éo, banner sai lỗi chính tả, KOL đại diện dính phốt ngoại tình, setup nhầm ngân sách trọn đời.

### 4.5 Designer (🎨)
- **Tagline:** Thiết kế là nghệ thuật truyền tải thông điệp. Nhưng khách lại muốn "logo to hơn và phát sáng".
- **Độ khó:** Trung bình
- **Kẻ thù:** Figma crash, feedback vô tận, logo đổi màu phong thủy, lỗi bản quyền font.
- **Stats khởi đầu:** Stress 25, Energy 85, Salary 500,000. Lương ngày: 480,000.
- **Sự kiện đặc trưng:** Logo không hợp mệnh phong thủy, logo phát sáng neon, Figma báo Out of Memory, rắc rối bản quyền font chữ, RGB/CMYK lệch màu, leak thiết kế Behance.

### 4.6 Boy phố làm bố (😎)
- **Tagline:** Đi làm vì đam mê, tiêu tiền của bố mẹ. Deadline là cái gì thế?
- **Độ khó:** Dễ (God Mode)
- **Kẻ thù:** Không sếp nào dám động vào, chỉ sợ hết xăng Wave Alpha.
- **Stats khởi đầu:** Stress 0, Energy 100, Salary 5,000,000. Lương ngày: 10,000,000.
- **Sự kiện đặc trưng:** Ngủ dậy trễ sếp tặng quà tẩm bổ, trễ báo cáo PM làm hộ, ngủ gục họp sếp tổng đắp chăn cho ngủ tiếp, alo bố mua đứt dự án đối tác câm nín, chuyển khoản 10 tỷ bù quỹ.

---

## 5. BUFF SYSTEM (CỬA HÀNG CỨU MẠNG)

Vào giờ ăn trưa (`lunch`), người chơi có thể vào shop GrabFood mua tối đa 2 buffs để phục hồi sức khỏe:

| Buff | Biểu tượng | Giá gốc | Hiệu ứng | Thời gian tác dụng |
|---|---|---|---|---|
| **Highlands Phin Sữa Đá** | ☕ | 150,000 | Energy +25, Stress +5 | Tức thời / 1 Khung giờ |
| **Cơm tấm sườn bì chả** | 🍱 | 300,000 | Energy +35, Stress -10 | Tức thời / 1 Khung giờ |
| **Dầu gió xanh Thiên Thảo** | 🧴 | 500,000 | Energy +10, Stress -15 | Vĩnh viễn suốt tuần |
| **Cả hộp Salonpas dán lưng** | 🩹 | 900,000 | Energy +25, Stress -30 | Vĩnh viễn suốt tuần |
| **Trà sữa KOI Thé** | 🥤 | 650,000 | Energy +10, Stress -35 | Tức thời / 1 Khung giờ |
| **Bò Húc Thái** | 🐂 | 150,000 | Energy +30, Stress +15 | Tức thời / 1 Khung giờ |

*Lưu ý:* Ngoài các buff chung trên, mỗi nghề nghiệp khi khởi chạy sẽ tự động load các Buff độc quyền riêng biệt từ cấu hình pack nghề nghiệp (ví dụ: *Claude Code Premium* của IT, *Data VIP Quận 2* của Sales BĐS, *Wacom Intuos Pro* của Designer).

---

## 6. DAILY SUMMARY — NGHỈ QUA ĐÊM

Cuối mỗi ngày, người chơi chọn 1 trong 3 cách nghỉ ngơi trước khi bước sang ngày tiếp theo:

1. **Ngủ sớm (Sleep):**
   - **Hiệu ứng:** Energy +45, Stress -25, Lương -0.
   - **Đánh giá:** An toàn, phục hồi sức khỏe thể chất tốt.
2. **Uống bia với đồng nghiệp (Beer):**
   - **Hiệu ứng:** Energy +5, Stress -45, Lương -150,000.
   - **Đánh giá:** Xả stress cực mạnh nhưng tốn tiền, có 30% tỷ lệ phát sinh drama nhức đầu vào sáng ngày hôm sau (+10 stress).
3. **Làm thêm ở nhà (Overtime):**
   - **Hiệu ứng:** Energy -15, Stress +25, Lương +250,000.
   - **Đánh giá:** Cày tiền lương hiệu quả nhưng suy kiệt năng lượng. Nếu Stress hiện tại đang > 70% thì bị cộng thêm hình phạt phụ +10 Stress do quá tải tâm lý.

---

## 7. ACHIEVEMENTS (THÀNH TỰU)

Hệ thống ghi nhận và tự động mở khóa 10 thành tựu cùng phần thưởng đi kèm:

| Tên thành tựu | Biểu tượng | Mô tả điều kiện mở khóa | Phần thưởng |
|---|---|---|---|
| **Sống sót qua Thứ Hai Kinh Hoàng** | 💪 | Vượt qua ngày làm việc Thứ Hai đầu tiên. | +300k Lương, -10% Stress |
| **Vương giả công sở** | 🏆 | Hoàn thành xuất sắc tuần làm việc (sống sót qua Thứ Bảy). | +1M Lương, -30% Stress, +20% Energy |
| **Tâm bất biến giữa dòng đời vạn biến** | 🧘 | Giữ chỉ số Stress ở mức an toàn dưới 30%. | +200k Lương, +10% Energy |
| **Triệu phú công sở** | 💰 | Tích lũy tổng điểm lương đạt từ 3,000,000 trở lên. | -15% Stress, +20% Energy |
| **Chiến thần "Dạ vâng sếp"** | 🤝 | Đồng ý làm theo yêu cầu sếp/khách hàng 10 lần. | +400k Lương, +15% Stress |
| **Tràn trề sinh lực văn phòng** | ⚡ | Giữ sức khỏe thể chất dồi dào trên 80% Energy. | +150k Lương, -10% Stress |
| **Chiến binh làm thêm xuyên màn đêm** | 🌙 | Chọn làm thêm làm việc Overtime vào buổi tối. | +200k Lương, +10% Energy |
| **Vượt qua cửa tử burnout** | 🔥 | Tiếp tục làm việc khi Stress chạm ngưỡng nguy kịch (>= 90%). | +500k Lương, +30% Energy, -20% Stress |
| **Người tiêu dùng thông thái** | 🛒 | Mua thành công đồ uống/đồ ăn buff trong Shop. | -15% Stress, +10% Energy |
| **Người của hòa bình** | 🕊️ | Từ chối tham gia hóng chuyện drama trong pantry. | +100k Lương, -20% Stress |

---

## 8. UI ANIMATIONS & EFFECTS

- **Stress cực hạn (> 80%):** Rung lắc nhẹ toàn bộ khung dashboard để tạo cảm giác hồi hộp căng thẳng.
- **Stress nguy kịch (> 90%):** Màn hình đổi viền đỏ và nhấp nháy liên tục báo hiệu nguy hiểm.
- **Energy thấp (< 20%):** Màn hình mờ dần (Opacify) mô phỏng cơn buồn ngủ kéo đến.
- **Giao dịch hành động:** Khi chọn Action tốt hiện nháy xanh lá (Glow xanh thành công), hành động rủi ro cao/phạt hiện nháy đỏ (Flash danger) đi kèm âm thanh Danger/Success đặc trưng của `soundManager`.

---

## 9. TECH STACK (CÔNG NGHỆ CHÍNH)

- **UI Framework:** React 18
- **Language:** TypeScript
- **Styling & Theme:** Vanilla CSS / Tailwind CSS v4
- **State Management:** Zustand (có tích hợp `zustand/persist` tự động lưu trữ tiến trình vào LocalStorage)
- **Audio System:** Custom `soundManager` phát nhạc hiệu, tiếng tạch tạch gõ phím, cảnh báo danger, success tương tác sinh động.

---

## 10. CẤU TRÚC THƯ MỤC THỰC TẾ

```
src/
├── main.tsx                      # Entry point ứng dụng
├── App.tsx                       # Quản lý định tuyến màn hình chính
├── App.css                       # Global styles
├── index.css                     # Tailwind / CSS base
│
├── types/                        # Interfaces dùng chung
│   ├── game.types.ts             # GameStats, DaySummary, FeedEntry, Buff
│   ├── event.types.ts            # GameEvent, Action, StatEffect, ChatReply
│   └── config.types.ts           # DayConfig, TimeSlotConfig
│
├── store/                        # Quản lý game state
│   ├── gameStore.ts              # Zustand store chính & core logic tương tác
│   ├── gameHelpers.ts            # Hàm phụ trợ, random event, thời gian
│   └── professionRegistry.ts     # Đăng ký và nạp động các pack nghề nghiệp
│
├── data/                         # Cấu hình dữ liệu game tĩnh
│   ├── buffs.data.ts             # Danh sách 6 buff chung của shop
│   ├── days.config.ts            # Cấu hình 6 ngày làm việc (Thứ 2 -> Thứ 7)
│   ├── difficulty.config.ts      # Định nghĩa 4 mức độ khó của game
│   ├── events/
│   │   └── common.events.ts      # Pool sự kiện chung cho tất cả các nghề
│   └── professions/              # Cấu hình & sự kiện độc quyền của 6 nghề
│       ├── boy_pho.ts
│       ├── designer.ts
│       ├── it.ts
│       ├── ke_toan.ts
│       ├── marketing.ts
│       └── seo_bds.ts
│
├── screens/                      # Các view màn hình chính
│   ├── StartScreen.tsx
│   ├── ProfessionScreen.tsx
│   ├── GameScreen.tsx
│   ├── DayTransitionScreen.tsx
│   ├── DailySummaryScreen.tsx
│   ├── GameOverScreen.tsx
│   └── VictoryScreen.tsx
│
├── components/
│   ├── layout/                   # Các panel hiển thị trong GameScreen
│   │   ├── TopBar.tsx
│   │   ├── TimeSlotBar.tsx
│   │   ├── LeftPanel.tsx
│   │   ├── CenterPanel.tsx
│   │   ├── RightPanel.tsx
│   │   ├── MobileEventSlot.tsx
│   │   └── SystemSettingsPanel.tsx
│   ├── event/                    # Khối hiển thị sự kiện
│   │   ├── EventCard.tsx
│   │   └── EventTimer.tsx
│   └── ui/                       # UI component tái sử dụng
│       ├── Button.tsx
│       ├── Badge.tsx
│       └── InteractiveGuide.tsx   # Hướng dẫn tân thủ
│
└── utils/                        # Các helper thuần túy
    ├── statCalculator.ts         # Tính toán giá trị stat thay đổi
    ├── eventSelector.ts          # Bộ chọn lọc sự kiện
    ├── soundManager.ts           # Quản lý âm thanh hiệu ứng toàn game
    └── achievementChecker.ts     # Kiểm tra điều kiện mở khóa thành tựu
```

---

## 11. CẤU TRÚC DỮ LIỆU ĐỊNH NGHĨA

### GameStats
```typescript
interface GameStats {
  stress: number   // 0–100, thua khi >= 100
  energy: number   // 0–100, thua khi <= 0
  salary: number   // lương tích lũy và tiêu dùng
}
```

### GameEvent
```typescript
interface GameEvent {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  professions: string[]
  timeSlots?: TimeSlot[]
  actions: Action[]
  requirements?: Requirements
}
```

### Action
```typescript
interface Action {
  id: string
  label: string
  effects: StatEffect[]
  chainEvents?: ChainEvent[]
  feedMessage: string
  requirements?: Omit<Requirements, 'days'>
  setFlags?: Record<string, boolean>
  chatReplies?: ChatReply[]
}
```
