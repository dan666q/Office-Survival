# Office Survival 2.0, Lớp 1: đi lại, nhận quest, một tuần chơi được

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Thay lối chơi "việc tự rơi xuống, chọn đáp án" bằng lối chơi mới: người chơi tự đi trong văn phòng IT 3D, nhận quest từ đồng nghiệp, làm quest qua 4 kiểu (tình huống, giao nhận, gõ phím, canh nhịp), chạy theo chỉ số mới (tinh thần, ví, biên bản, KPI). Một tuần 5 ngày, đủ 3 biên bản thì bị đuổi việc.

**Architecture:**
- **Logic thuần (không React):** nằm trong `src/game/`, gồm tìm đường, luật chơi, sinh quest. Mọi phần này đều có unit test bằng vitest.
- **Trạng thái:** một store Zustand mới, `careerStore`, chỉ gọi các hàm luật thuần.
- **Cảnh 3D:** tái dùng `OfficeStage` + `ItOffice` có sẵn, thêm nhân vật người chơi đi theo đường A*.
- **UI 2D:** tái dùng phong cách giấy tờ trong `src/ui/`.
- Store cũ `gameStore.ts` để nguyên, chỉ còn được dùng làm nguồn dữ liệu (`getEventsForProfession`, `PROFESSIONS_CONFIG`).

**Tech Stack:** React 19, TypeScript 6, Vite 8, Zustand 5 (persist), three 0.186.1, @react-three/fiber 9.8.2, @react-three/drei 10.7.9, Tailwind 4, framer-motion 12. Thêm mới vitest 5.0.5 để test.

**Spec:** `docs/superpowers/specs/2026-10-21-office-quest-design.md`

## Global Constraints

- Chỉ làm Lớp 1 của spec. Thiện cảm, đánh giá tuần, thăng chức, góc bàn, sếp đi tuần, cốt truyện và 5 văn phòng khác thuộc lớp sau. Không làm trước.
- Đi lại không làm đồng hồ trong ngày nhích. Đồng hồ chỉ nhích khi quest xong hoặc hỏng (theo `workMinutes` của quest) và khi giải lao (+15 phút).
- Khay quest chứa tối đa 3 việc. Riêng việc của sếp được chen vào khay đầy: đẩy một việc nhờ vả ra ngoài, nếu không có việc nhờ vả nào thì cho khay vượt lên 4.
- Việc đỏ (của sếp) chưa ai nhận sau 40 giây thật thì tự vào khay.
- Ngày làm việc 08:00–17:30. Chỉ tiêu: 5 việc xong, trong đó ít nhất 2 việc của sếp. Quá 17:30 mà chưa đủ chỉ tiêu thì tăng ca: mỗi việc xong trong tăng ca −10 tinh thần.
- Hỏng quest: luôn trừ ví và −10 tinh thần. Việc của sếp thì thêm 1 biên bản.
- 3 biên bản là bị đuổi việc. Biên bản về 0 khi sang tuần mới.
- Ví âm lúc hết ngày: −20 tinh thần. Âm 3 ngày liên tiếp: +1 biên bản.
- Tinh thần về 0 là burnout: kết thúc ngày ngay, không lương ngày đó, KPI tuần −20, sáng hôm sau tinh thần = 50.
- Quest tình huống chỉ hỏng khi hết giờ. Việc đỏ của sếp lấy từ sự kiện có `priority` là `critical` hoặc `high`.
- Một tuần 5 ngày, thứ Hai đến thứ Sáu. Sau thứ Sáu hiện màn "Sống sót tuần N" và cho chơi tiếp tuần sau.
- Mini-game phải chơi được bằng một ngón tay (điện thoại 390×844) lẫn bằng chuột/bàn phím.
- Giữ phong cách hình ảnh đã làm: giấy tờ văn phòng, token màu trong `src/index.css`, không emoji làm icon, không gradient tím hay kính mờ.
- Save key mới: `song-sot-cong-so-career`.
- **Bước commit chỉ chạy khi người dùng đồng ý commit.** Mặc định dừng ở `git add`.

## Review Focus

1. **Bấm vào đồ vật/người khi đang đi dở đường:** đường đi mới thay đường cũ, không có hai lần "tới nơi" chồng nhau. *Test ở Task 7: `retarget mid-walk only arrives once`.*
2. **Reload trang khi đang có quest trong khay:** quest vẫn còn, hạn chót tính lại từ lúc tải lại (như bản cũ), không văng lỗi. *Test ở Task 5: `rehydrate keeps tray and resets deadlines`.*
3. **Chạm vào ô bị chặn (bàn, tường) hoặc ngoài sàn:** nhân vật đi tới ô trống gần nhất, không đứng im, không đi xuyên đồ. *Test ở Task 2: `findPath to blocked cell goes to nearest free cell`.*
4. **Quest có bước ở chỗ khác chỗ người giao:** điểm neo của bước hiện tại phải được đánh dấu rõ trên cảnh, nếu không người chơi lạc. *Test ở Task 6: `resolveInteraction returns current step at its anchor only`.*
5. **Sếp tự giao việc đúng lúc khay đầy toàn việc không phải nhờ vả:** khay vượt lên 4, không mất việc của sếp. *Test ở Task 4: `boss auto-assign overflows tray when no favor to evict`.*

---

## File Structure

```
src/game/nav/grid.ts             lưới ô 0,5 m, vật cản, A*, ô trống gần nhất
src/game/career/types.ts         kiểu dữ liệu: Quest, QuestStep, CareerStats, DayState…
src/game/career/rules.ts         luật thuần: nhận/xong/hỏng quest, đồng hồ, chỉ tiêu, cuối ngày, tuần, tick director
src/game/quests/convertEvent.ts  GameEvent cũ → quest "tình huống"
src/game/quests/itTemplates.ts   quest IT viết tay: giao nhận, gõ phím, canh nhịp
src/game/quests/generator.ts     sinh danh sách quest đầu ngày
src/store/careerStore.ts         store Zustand persist, gọi luật thuần
src/store/playerStore.ts         vị trí/đường đi của nhân vật (không lưu)
src/hooks/useQuestDirector.ts    vòng tick: hạn chót, sếp tự giao, tụt tinh thần
src/scene/rooms/layouts.ts       (sửa) thêm vật cản, điểm sinh, anchor 'water'
src/scene/characters/Person.tsx  (sửa) thêm dáng đi và cầm đồ
src/scene/characters/PlayerAvatar.tsx  nhân vật người chơi đi theo đường
src/scene/OfficeStage.tsx        (sửa) camera bám người chơi, bấm sàn để đi
src/scene/rooms/ItOffice.tsx     (sửa) ghế người chơi trống khi đang đi, anchor water bấm được
src/ui/career/CareerHud.tsx      HUD: tinh thần, ví, biên bản, KPI, chỉ tiêu, đồng hồ
src/ui/career/QuestTray.tsx      khay quest + gợi ý bước kế tiếp
src/ui/career/InteractionSheet.tsx  bảng khi tới một điểm neo: nhận việc / làm bước / giải lao
src/ui/minigames/ChoiceTask.tsx  tình huống (chuyển từ EventSheet)
src/ui/minigames/TypingTask.tsx
src/ui/minigames/TimingTask.tsx
src/screens/career/WorkScreen.tsx, EveningScreen.tsx, WeekEndScreen.tsx, FiredScreen.tsx
src/StageHost.tsx, src/App.tsx, src/screens/ProfessionScreen.tsx  (sửa) chuyển sang luồng career
```

---

### Task 1: Bộ test + tìm đường A*

**Files:**
- Modify: `package.json` (thêm `"test": "vitest run"`, devDependency `vitest@5.0.5` cài với `--save-exact`)
- Create: `src/game/nav/grid.ts`
- Test: `src/game/nav/grid.test.ts`

**Interfaces:**
- Produces:
  ```ts
  export type Vec2 = [number, number]            // [x, z] toạ độ thế giới (m)
  export interface Rect { x0: number; z0: number; x1: number; z1: number }
  export interface NavGrid { cell: number; cols: number; rows: number; originX: number; originZ: number; blocked: Uint8Array }
  export function buildGrid(size: [number, number], obstacles: Rect[], cell?: number /*=0.5*/): NavGrid  // sàn căn giữa gốc toạ độ
  export function worldToCell(g: NavGrid, p: Vec2): [number, number]
  export function cellToWorld(g: NavGrid, c: [number, number]): Vec2      // tâm ô
  export function nearestFreeCell(g: NavGrid, p: Vec2): [number, number]
  export function findPath(g: NavGrid, from: Vec2, to: Vec2): Vec2[]      // gồm điểm cuối; [] nếu không tới được
  ```

- [ ] **Step 1: Cài vitest, thêm script `test`.** Chạy `npm i -D --save-exact vitest@5.0.5`. Test viết bằng `import { describe, it, expect } from 'vitest'`, môi trường node, không cần file config.
- [ ] **Step 2: Viết test thất bại** `grid.test.ts`:
  - `buildGrid marks obstacle cells blocked`: sàn 4×4, vật cản `{x0:-1,z0:-1,x1:1,z1:1}`; ô chứa (0,0) bị chặn, ô chứa (1.75,1.75) trống.
  - `findPath goes around obstacle`: cùng lưới, đi từ (-1.75,0) tới (1.75,0). Đường không rỗng, phần tử cuối nằm trong 0,25 m quanh đích, không điểm nào rơi vào ô bị chặn.
  - `findPath to blocked cell goes to nearest free cell`: đích (0,0) bị chặn; đường kết thúc ở một ô trống kề vật cản.
  - `findPath from==to returns single point`.
  - `findPath unreachable returns []`: vật cản chắn ngang toàn bộ chiều rộng sàn.
- [ ] **Step 3: Chạy `npm test`.** Kỳ vọng: FAIL, module chưa tồn tại.
- [ ] **Step 4: Cài đặt `grid.ts`.**
  - A* trên 8 hướng, chi phí chéo √2, không cắt góc qua hai ô bị chặn.
  - Heuristic octile.
  - Đích bị chặn thì thay bằng `nearestFreeCell` (BFS tỏa ra từ ô đích).
  - Làm mượt đường bằng cách bỏ điểm thừa khi đoạn thẳng nối hai điểm không cắt ô chặn (kiểm tra bằng lấy mẫu từng 0,25 m).
- [ ] **Step 5: Chạy `npm test`.** Kỳ vọng: 5 test PASS.
- [ ] **Step 6: `git add package.json package-lock.json src/game/nav`** (commit nếu được phép: `feat(nav): lưới A* cho di chuyển trong văn phòng`).

### Task 2: Vật cản và điểm neo của văn phòng IT

**Files:**
- Modify: `src/scene/rooms/layouts.ts` (thêm vào `RoomLayout`: `obstacles: Rect[]`, `spawn: Vec2`, `exit: Vec2`; thêm anchor `water`)
- Modify: `src/scene/eventLocation.ts` (thêm `'water'` vào `AnchorId`)
- Test: `src/scene/rooms/layouts.test.ts`

**Interfaces:**
- Consumes: `buildGrid`, `findPath`, `nearestFreeCell` (Task 1).
- Produces:
  - `RoomLayout.obstacles`, `RoomLayout.spawn` (cửa sau, `[-3.7, -3.8]`), `RoomLayout.exit` (trùng `spawn`);
  - `export function standPoint(layout: RoomLayout, anchor: AnchorId): Vec2`, tức ô trống gần chân điểm neo nhất, chiếu xuống sàn bằng toạ độ `[x, z]` của anchor;
  - `export function getNavGrid(layout: RoomLayout): NavGrid`, có cache theo `layout.id`.

- [ ] **Step 1: Viết test thất bại** `layouts.test.ts`:
  - `every anchor stand point is reachable from spawn`: với mỗi anchor của `IT_LAYOUT`, `findPath(grid, spawn, standPoint(...))` không rỗng.
  - `stand point is within 1.6 m of its anchor`.
  - `spawn and exit are free cells`.
- [ ] **Step 2: Chạy `npm test`.** Kỳ vọng FAIL.
- [ ] **Step 3: Thêm vật cản** lấy theo toạ độ đồ đạc trong `src/scene/rooms/ItOffice.tsx`:
  - Bàn làm việc xoay `Math.PI/2` tại `(px, pz)` chiếm `x: px-0.4..px+0.95, z: pz-0.8..pz+0.8`.
  - Bàn sếp `(4.55,-3.45)` xoay `π` chiếm `x: 3.75..5.35, z: -4.5..-3.0`.
  - Vách phòng sếp: `x 3.0..3.1, z -4.5..-1.6` và `z -1.65..-1.55, x 3.0..4.8`. Chừa lối cửa ở `x 4.9..5.9`.
  - Dải tủ, máy in, cây nước, pantry sát tường trái: `x -6..-5.0`.
  - Tủ server: `x -6..-5.1, z -4.5..-3.5`.
  - Chậu cây, tủ hồ sơ `(4.9,0.6)`, quạt cây `(1.75,2.55)`: mỗi món một hình vuông 0,5 m.
  - Thêm anchor `water: [-5.62, 1.6, 1.55]`.
- [ ] **Step 4: Chạy `npm test`.** Kỳ vọng PASS. Nếu anchor nào không tới được thì sửa vật cản, không sửa test.
- [ ] **Step 5: `git add`** (commit: `feat(layout): vật cản và điểm đứng cho văn phòng IT`).

### Task 3: Kiểu dữ liệu và luật chơi thuần

**Files:**
- Create: `src/game/career/types.ts`, `src/game/career/rules.ts`
- Test: `src/game/career/rules.test.ts`

**Interfaces:**
- Produces (`types.ts`):
  ```ts
  export type QuestKind = 'boss' | 'normal' | 'favor'
  export type StepKind = 'talk' | 'pickup' | 'deliver' | 'typing' | 'timing' | 'choice'
  export interface QuestStep { kind: StepKind; at: AnchorId; label: string; item?: string; text?: string /*typing*/; hits?: number /*timing*/; eventId?: string /*choice*/ }
  export interface Quest { id: string; kind: QuestKind; giver: AnchorId; title: string; brief: string; steps: QuestStep[]; deadlineSec: number; workMinutes: number; reward: { kpi: number; wallet: number }; penalty: { wallet: number } }
  export interface ActiveQuest { quest: Quest; stepIndex: number; acceptedAt: number /*ms, performance.now*/ }
  export interface CareerStats { morale: number; wallet: number; strikes: number; kpi: number }
  export interface DayState { week: number; dayIndex: number /*0..4*/; clock: number /*phút từ 0h, bắt đầu 480*/; offers: Quest[]; offeredAt: Record<string, number>; tray: ActiveQuest[]; done: number; bossDone: number; overtime: boolean; negativeDays: number }
  export type Outcome = { type: 'none' } | { type: 'fired' } | { type: 'burnout' } | { type: 'day_complete' }
  ```
- Produces (`rules.ts`), mọi hàm đều thuần và trả về state mới:
  ```ts
  export const QUOTA_TOTAL = 5, QUOTA_BOSS = 2, TRAY_LIMIT = 3, DAY_END = 1050, DAY_START = 480, BOSS_AUTO_SEC = 40
  export function acceptQuest(s: CareerSnapshot, questId: string, now: number): CareerSnapshot
  export function advanceStep(s: CareerSnapshot, questId: string): { state: CareerSnapshot; completed: boolean; outcome: Outcome }
  export function failQuest(s: CareerSnapshot, questId: string): { state: CareerSnapshot; outcome: Outcome }
  export function takeBreak(s: CareerSnapshot, kind: 'noodles' | 'chat'): CareerSnapshot      // +15 phút; mì +15 tinh thần, tán gẫu +8
  export function directorTick(s: CareerSnapshot, now: number, deadlineOf: (q: ActiveQuest) => number): { state: CareerSnapshot; failed: string[]; autoAssigned: string[]; outcome: Outcome }
  export function quotaMet(d: DayState): boolean
  export function endDay(s: CareerSnapshot, dailySalary: number): CareerSnapshot              // lương, xử lý ví âm
  export function applyEvening(s: CareerSnapshot, choice: 'sleep' | 'beer' | 'study' | 'side_job', rng: () => number): CareerSnapshot
  export function startNextWeek(s: CareerSnapshot): CareerSnapshot
  export type CareerSnapshot = { stats: CareerStats; day: DayState; flags: Record<string, boolean> }
  ```
- Con số (người làm không được đổi, nằm trong spec hoặc chốt ở đây):
  - Tinh thần đầu tuần 80.
  - Nhận việc −3 tinh thần.
  - Mỗi 10 giây thật khi khay có từ 2 việc trở lên: −1 tinh thần.
  - Hỏng việc: ví trừ `penalty.wallet` (boss 200.000, thường 100.000, nhờ vả 50.000), −10 tinh thần; việc của sếp thêm 1 biên bản.
  - Xong việc: cộng `reward` (KPI: boss 15, thường 10, nhờ vả 5). Xong khi còn hơn 50% thời gian thì thưởng thêm 50.000.
  - Tối, theo lựa chọn:
    - `sleep`: +35 tinh thần.
    - `beer`: +50 tinh thần, −150.000. Có 30% khả năng `flags.hangover`: sáng mai −10.
    - `study`: +5 KPI, −10 tinh thần.
    - `side_job`: +250.000, −20 tinh thần.
  - Tinh thần kẹp trong 0..100.

- [ ] **Step 1: Viết test thất bại** `rules.test.ts`:
  - `accept moves offer to tray and costs 3 morale`
  - `tray limit 3 rejects 4th normal quest` (state không đổi)
  - `advanceStep on last step completes: done+1, clock += workMinutes, reward applied`
  - `boss completion increments bossDone`
  - `fail boss quest: wallet -200000, morale -10, strikes +1, clock += workMinutes`
  - `third strike returns outcome fired`
  - `morale reaching 0 returns outcome burnout`
  - `overtime: completing after 17:30 without quota costs extra 10 morale`
  - `quota needs 5 total and 2 boss` (5 việc thường thì `quotaMet` = false)
  - `directorTick fails quest past deadline`
  - `directorTick auto-assigns boss offer after 40s`
  - `boss auto-assign evicts a favor when tray full`
  - `boss auto-assign overflows tray when no favor to evict` (khay thành 4)
  - `endDay negative wallet: morale -20; third consecutive day adds a strike`
  - `startNextWeek resets strikes, kpi, dayIndex, keeps wallet`
  - `takeBreak advances clock 15 minutes`
- [ ] **Step 2: Chạy `npm test`.** Kỳ vọng FAIL.
- [ ] **Step 3: Cài đặt `types.ts` và `rules.ts`.**
- [ ] **Step 4: Chạy `npm test`.** Kỳ vọng PASS.
- [ ] **Step 5: `git add`** (commit: `feat(career): luật chơi thuần cho ngày làm việc`).

### Task 4: Sinh quest: quy đổi sự kiện cũ và quest IT viết tay

**Files:**
- Create: `src/game/quests/convertEvent.ts`, `src/game/quests/itTemplates.ts`, `src/game/quests/generator.ts`
- Test: `src/game/quests/quests.test.ts`

**Interfaces:**
- Consumes: `Quest` (Task 3); `resolveEventAnchor`, `AnchorId` (`src/scene/eventLocation.ts`); `getEventsForProfession` (`src/store/professionRegistry.ts`); `IT_LAYOUT` (Task 2).
- Produces:
  ```ts
  export function eventToQuest(e: GameEvent, anchors: ReadonlySet<AnchorId>): Quest
  // kind = 'boss' khi priority là critical|high, ngược lại 'normal'; giver = resolveEventAnchor(e, anchors)
  // steps = [{ kind:'choice', at: giver, eventId: e.id, label: 'Xử lý' }]; deadlineSec 25; workMinutes 60
  export function convertEffects(effects: StatEffect[]): { morale: number; wallet: number }
  // morale = round(-0.6*stress + 0.6*energy); wallet = salary
  export const IT_TEMPLATES: Quest[]          // tối thiểu 7 quest, xem Step 3
  export function generateDay(opts: { profession: string; dayIndex: number; week: number; rng: () => number; usedEventIds: string[] }): Quest[]
  // 2 boss + 3 normal + 2 favor; ít nhất 3 quest không phải 'choice'; id duy nhất theo ngày
  ```

- [ ] **Step 1: Viết test thất bại:**
  - `eventToQuest marks critical/high as boss`
  - `convertEffects maps stress/energy/salary` (stress +20, energy −20 → morale −24; salary −50000 → wallet −50000)
  - `every template step anchor exists in IT_LAYOUT`
  - `templates cover typing, timing and pickup/deliver`
  - `generateDay returns 7 quests with 2 boss, unique ids, ≥3 non-choice`
  - `generateDay is deterministic for the same rng seed`
- [ ] **Step 2: Chạy `npm test`.** Kỳ vọng FAIL.
- [ ] **Step 3: Viết `IT_TEMPLATES`.** Câu chữ tiếng Việt châm biếm, giữ giọng của data cũ.
  1. "In báo cáo tuần cho sếp" (boss): `typing@computer` ("Báo cáo tuần: tiến độ 80%, rủi ro thấp") → `timing@printer` (3 lần) → `deliver@boss`.
  2. "Hotfix lỗi đăng nhập" (boss): `typing@computer` (`if (!user) return redirect('/login')`) → `talk@pm`.
  3. "Khởi động lại server staging" (normal, giao bởi `cto`): `timing@server` (4 lần) → `talk@cto`.
  4. "Photo hợp đồng thử việc" (normal, giao bởi `hr`): `timing@printer` (2 lần) → `deliver@hr`.
  5. "Viết mô tả task cho intern" (normal, giao bởi `pm`): `typing@computer` → `deliver@intern`.
  6. "Pha mì giúp Độ Mixi" (favor, giao bởi `it_dev`): `pickup@canteen` (item "mì ly") → `deliver@it_dev`.
  7. "Rót nước cho intern" (favor, giao bởi `intern`): `pickup@water` (item "ly nước") → `deliver@intern`.

  Mỗi template có `deadlineSec` từ 45 đến 70 và `workMinutes` từ 75 đến 120.

  Generator lấy quest boss và normal trộn giữa template và sự kiện quy đổi, bỏ các sự kiện đã nằm trong `usedEventIds`.
- [ ] **Step 4: Chạy `npm test`.** Kỳ vọng PASS.
- [ ] **Step 5: `git add`** (commit: `feat(quests): quy đổi sự kiện và quest IT`).

### Task 5: careerStore

**Files:**
- Create: `src/store/careerStore.ts`
- Test: `src/store/careerStore.test.ts`

**Interfaces:**
- Consumes: mọi thứ trong `rules.ts` (Task 3), `generateDay` (Task 4), `PROFESSIONS_CONFIG`, `DIFFICULTY_CONFIGS`, `useTimerStore` (`src/game/timers.ts`), `soundManager`.
- Produces:
  ```ts
  type CareerScreen = 'title' | 'setup' | 'work' | 'evening' | 'week_end' | 'fired'
  interface CareerStore extends CareerSnapshot {
    screen: CareerScreen; profession: string | null; difficulty: DifficultyLevel; usedEventIds: string[]; lastNotice: string | null
    goTo(screen: CareerScreen): void
    startCareer(profession: string, difficulty: DifficultyLevel): void   // tuần 1, ngày 0, generateDay, screen 'work'
    accept(questId: string): void
    performStep(questId: string): void                                   // gọi advanceStep, xử lý outcome
    chooseInEvent(questId: string, actionId: string): void               // áp convertEffects + setFlags rồi performStep
    takeBreak(kind: 'noodles' | 'chat'): void
    tick(now: number): void                                              // gọi directorTick
    leaveWork(): void                                                    // chỉ khi quotaMet: endDay → 'evening'
    chooseEvening(choice: 'sleep' | 'beer' | 'study' | 'side_job'): void // sang ngày mới hoặc 'week_end' sau ngày thứ 5
    continueNextWeek(): void
    quit(): void                                                         // về 'title'
  }
  export const useCareerStore: UseBoundStore<StoreApi<CareerStore>>
  export function questDeadlineMs(a: ActiveQuest, difficulty: DifficultyLevel): number
  // = acceptedAt + deadlineSec*1000*timerMultiplier
  ```
- `persist` với name `song-sot-cong-so-career`, `version: 1`. Khi rehydrate thì đặt lại `acceptedAt = performance.now()` cho mọi quest trong khay, và đặt lại `offeredAt` về hiện tại.
- Outcome `fired` → `screen: 'fired'`.
- Outcome `burnout` → ghi `lastNotice` "Burnout, nghỉ ốm", không lương, KPI −20, `screen: 'evening'`, sáng mai tinh thần 50.

- [ ] **Step 1: Viết test thất bại:**
  - `startCareer creates day with 7 offers and screen work`
  - `accept + performStep through a template quest completes it`
  - `chooseInEvent applies converted effects and flags`
  - `leaveWork is ignored until quota met`
  - `fifth evening goes to week_end; continueNextWeek resets strikes`
  - `three boss failures lead to screen fired`
  - `rehydrate keeps tray and resets deadlines`: gọi `useCareerStore.persist.rehydrate()` với storage giả, kiểm tra `acceptedAt` ≥ thời điểm bắt đầu test.
- [ ] **Step 2: Chạy `npm test`.** Kỳ vọng FAIL.
- [ ] **Step 3: Cài đặt store.** Storage của persist dùng `createJSONStorage(() => localStorage)`. Trong test thì thay bằng một Map giả, bằng cách gán `globalThis.localStorage` trước khi import.
- [ ] **Step 4: Chạy `npm test`.** Kỳ vọng PASS.
- [ ] **Step 5: `git add`** (commit: `feat(store): careerStore cho lối chơi quest`).

### Task 6: Tương tác tại điểm neo và quest director

**Files:**
- Create: `src/game/career/interaction.ts`, `src/hooks/useQuestDirector.ts`
- Test: `src/game/career/interaction.test.ts`

**Interfaces:**
- Consumes: `CareerSnapshot`, `Quest` (Task 3), `useCareerStore` (Task 5).
- Produces:
  ```ts
  export interface InteractionOptions { steps: { questId: string; step: QuestStep }[]; offers: Quest[]; breakKind: 'noodles' | 'chat' | null }
  export function resolveInteraction(s: CareerSnapshot, anchor: AnchorId, carrying: string | null): InteractionOptions
  // steps: quest trong khay có bước hiện tại `at === anchor` (bước 'deliver' cần đang cầm đúng item)
  // offers: quest chưa nhận có giver === anchor; breakKind: canteen → 'noodles', water → 'chat'
  export function anchorMarkers(s: CareerSnapshot): Map<AnchorId, 'boss' | 'normal' | 'favor' | 'step'>   // để vẽ note trên cảnh
  export function carriedItem(s: CareerSnapshot): string | null   // item của bước 'pickup' đã xong mà chưa 'deliver'
  export function useQuestDirector(): void   // setInterval 250 ms gọi useCareerStore.getState().tick(performance.now()) khi screen === 'work'
  ```

- [ ] **Step 1: Viết test thất bại:**
  - `resolveInteraction returns current step at its anchor only`: quest 3 bước đang ở bước 2 (máy in); trả về khi anchor là `printer`, không trả về khi là `computer`.
  - `deliver step requires carried item`
  - `offers listed at giver anchor`
  - `canteen and water offer breaks`
  - `anchorMarkers prefers step marker over offer`
- [ ] **Step 2: Chạy `npm test`.** Kỳ vọng FAIL.
- [ ] **Step 3: Cài đặt** `interaction.ts` và `useQuestDirector.ts` (hook mỏng, không có logic riêng).
- [ ] **Step 4: Chạy `npm test`.** Kỳ vọng PASS.
- [ ] **Step 5: `git add`** (commit: `feat(career): tương tác điểm neo và director`).

### Task 7: Nhân vật người chơi đi trong cảnh 3D

**Files:**
- Create: `src/store/playerStore.ts`, `src/scene/characters/PlayerAvatar.tsx`
- Modify: `src/scene/characters/Person.tsx` (thêm prop `walking?: boolean`, `carrying?: boolean`)
- Modify: `src/scene/OfficeStage.tsx` (camera bám `followTarget`; mặt sàn bắt `onPointerDown`/click và gửi điểm chạm lên)
- Modify: `src/scene/rooms/ItOffice.tsx` (ghế người chơi trống khi `mode === 'work'`; bấm được cây nước → anchor `water`)
- Test: `src/store/playerStore.test.ts`

**Interfaces:**
- Consumes: `findPath`, `getNavGrid`, `standPoint` (Task 1, 2).
- Produces:
  ```ts
  interface PlayerStore { pos: Vec2; heading: number; path: Vec2[]; goal: AnchorId | null; arrived: { anchor: AnchorId; seq: number } | null
    walkTo(point: Vec2): void                 // goal = null
    walkToAnchor(anchor: AnchorId): void      // path tới standPoint, goal = anchor
    step(dt: number): void                    // tốc độ 3 m/s; hết path và có goal → arrived = { anchor, seq: seq+1 }, goal = null
    reset(spawn: Vec2): void }
  export const usePlayerStore
  ```
- `PlayerAvatar` gọi `step(dt)` trong `useFrame` và vẽ `Person` (contact `self`, pose `stand`) tại `pos`, xoay theo `heading`, có `walking` khi `path.length > 0`, có `carrying` khi `carriedItem` khác null.
- Camera bám nhân vật: thêm vào `StageProps` prop `follow?: boolean`. Khi bật, `CameraRig` lấy target là vị trí người chơi (đọc `usePlayerStore.getState()` trong `useFrame`), giữ zoom tổng quan × 1,35, vẫn tôn trọng `focusInset`.

- [ ] **Step 1: Viết test thất bại** `playerStore.test.ts`:
  - `walkToAnchor then step until arrival sets arrived once`
  - `retarget mid-walk only arrives once` (đổi `walkToAnchor` giữa đường; `seq` chỉ tăng 1, `anchor` là đích mới)
  - `walkTo floor point never sets arrived`
- [ ] **Step 2: Chạy `npm test`.** Kỳ vọng FAIL.
- [ ] **Step 3: Cài đặt** `playerStore`, `PlayerAvatar`, và các sửa đổi ở `Person`, `OfficeStage`, `ItOffice`.
  - Dáng đi: hai chân lắc theo `sin(t*10)` ±0,5 rad, tay lắc ngược pha.
  - Cầm đồ: hai tay đưa ra trước `rotation.x = -1.2` và một hộp 0,2 m trước ngực.
- [ ] **Step 4: Chạy `npm test && npx tsc -b && npx eslint src/scene src/store`.** Kỳ vọng: PASS, không lỗi.
- [ ] **Step 5: `git add`** (commit: `feat(scene): nhân vật người chơi đi lại bằng A*`).

### Task 8: UI làm việc: HUD, khay, bảng tương tác, 3 mini-game

**Files:**
- Create: `src/ui/career/CareerHud.tsx`, `src/ui/career/QuestTray.tsx`, `src/ui/career/InteractionSheet.tsx`
- Create: `src/ui/minigames/ChoiceTask.tsx`, `src/ui/minigames/TypingTask.tsx`, `src/ui/minigames/TimingTask.tsx`
- Modify: `src/ui/ScenePins.tsx` (`EventPins` nhận `markers: Map<AnchorId, 'boss'|'normal'|'favor'|'step'>` thay cho danh sách event; note đỏ, vàng, xanh, hoặc mũi tên "Tới đây")
- Test: `src/ui/minigames/typing.test.ts` (logic so khớp thuần, tách ra `src/ui/minigames/typingLogic.ts`)

**Interfaces:**
- Consumes: `useCareerStore` (Task 5), `resolveInteraction`, `anchorMarkers`, `carriedItem` (Task 6), `usePlayerStore` (Task 7), `Sheet`, `CountdownRing` (`src/ui/`).
- Produces:
  ```ts
  // typingLogic.ts
  export function typingProgress(target: string, typed: string): { correct: number; done: boolean; error: boolean }   // so khớp theo ký tự, có dấu tiếng Việt, bỏ qua khác biệt NFC/NFD
  export function chunkForTap(target: string): string[]   // tách theo từ để chạm theo thứ tự trên điện thoại
  // components
  <TypingTask text onDone onCancel />   // desktop: ô gõ; điện thoại (useIsMobile): các khối từ bị xáo, chạm đúng thứ tự
  <TimingTask hits onDone onCancel />   // kim chạy qua lại 1,2 giây/lượt; vùng xanh rộng 22%; bấm hoặc nhấn Space; trượt thì lùi 1 nấc, không hỏng ngay
  <ChoiceTask event onChoose onCancel /> // nội dung lấy từ EventSheet hiện có
  <InteractionSheet anchor onClose />   // liệt kê offers (nút "Nhận việc"), steps (nút làm bước, mở mini-game), giải lao
  <QuestTray />                         // tối đa 4 phiếu: tiêu đề, bước kế tiếp "Tới: Máy in", vòng hạn chót; chạm thì walkToAnchor bước kế tiếp
  <CareerHud />                         // ngày + đồng hồ (HH:MM từ day.clock), chỉ tiêu "3/5 · sếp 1/2", tinh thần, ví, biên bản (3 ô dấu đỏ), KPI
  ```
- Đồng hồ hạn chót trong khay dùng `questDeadlineMs` (Task 5), đếm ngược bằng `performance.now()`.

- [ ] **Step 1: Viết test thất bại** `typing.test.ts`:
  - `typingProgress counts correct prefix`
  - `typingProgress flags error on wrong char`
  - `typingProgress treats NFC and NFD as equal` (`'Báo'` dạng NFC và NFD)
  - `chunkForTap splits on spaces keeping punctuation`
- [ ] **Step 2: Chạy `npm test`.** Kỳ vọng FAIL.
- [ ] **Step 3: Cài đặt** `typingLogic.ts` và các component. Phong cách: `paper`, `btn-ink`, `stamp`, `hand`, token màu có sẵn, không dùng emoji.
- [ ] **Step 4: Chạy `npm test && npx tsc -b && npx eslint src/ui`.** Kỳ vọng: PASS, không lỗi.
- [ ] **Step 5: `git add`** (commit: `feat(ui): HUD, khay quest, bảng tương tác và mini-game`).

### Task 9: Màn hình và luồng app

**Files:**
- Create: `src/screens/career/WorkScreen.tsx`, `EveningScreen.tsx`, `WeekEndScreen.tsx`, `FiredScreen.tsx`
- Modify: `src/App.tsx` (định tuyến theo `useCareerStore.screen`)
- Modify: `src/StageHost.tsx` (lấy dữ liệu từ career thay vì `gameStore`)
- Modify: `src/screens/StartScreen.tsx` (nút vào ca gọi `goTo('setup')`)
- Modify: `src/screens/ProfessionScreen.tsx` (ký hợp đồng gọi `startCareer`)
- Delete: `src/screens/GameScreen.tsx`, `DailySummaryScreen.tsx`, `DayTransitionScreen.tsx`, `GameOverScreen.tsx`, `VictoryScreen.tsx`, `src/hooks/useEventDirector.ts`, `src/ui/EventTray.tsx`, `src/ui/Hud.tsx`, `src/ui/EventSheet.tsx` (nội dung đã chuyển sang `ChoiceTask`)

**Interfaces:**
- Consumes: mọi thứ từ Task 5–8.
- `WorkScreen`:
  - gọi `useQuestDirector()`;
  - khi `usePlayerStore.arrived.seq` đổi thì mở `InteractionSheet` cho anchor đó;
  - hiện nút "Về nhà" ở `exit` khi `quotaMet`; bấm thì đi tới cửa rồi gọi `leaveWork`;
  - hiện thông báo dạng giấy khi sếp tự giao việc, khi dính biên bản, khi bước sang tăng ca.
- `StageHost` ở màn `work`:
  - truyền `follow: true`, `alerts` = các anchor trong `anchorMarkers`;
  - `onAnchor` = `usePlayerStore.walkToAnchor`;
  - bấm sàn gọi `walkTo`.
- `EveningScreen`: phiếu chấm công trong ngày (việc xong, việc hỏng, lương, ví, tinh thần, `lastNotice`) cùng 4 lựa chọn tối.
- `WeekEndScreen`: "Sống sót tuần N" với KPI, ví và nút "Làm tiếp tuần sau".
- `FiredScreen`: quyết định thôi việc (giữ phong cách `GameOverScreen` cũ), lý do "3 biên bản".

- [ ] **Step 1: Cài đặt các màn hình và định tuyến.** Xóa các file cũ đã liệt kê.
- [ ] **Step 2: Chạy `npx tsc -b && npx eslint . && npm run build && npm test`.**
  - Kỳ vọng: tsc và build pass, test pass.
  - Lỗi eslint chỉ còn trong `src/store/gameStore.ts`, `src/store/professionRegistry.ts`, `src/utils/soundManager.ts` (có từ trước).
  - Bundle chính không chứa `WebGLRenderer`: chạy `grep -c WebGLRenderer dist/assets/index-*.js` ra 0.
- [ ] **Step 3: `git add -A`** (commit: `feat: chuyển app sang lối chơi quest`).

### Task 10: Kiểm tra end-to-end bằng trình duyệt

**Files:**
- Script ngoài project (scratchpad): `drive-career.mjs` dùng `playwright-core` + `channel: 'chrome'`, với các cờ `--enable-unsafe-swiftshader --use-angle=swiftshader --ignore-gpu-blocklist` như đợt trước.

- [ ] **Step 1:** `npx vite --port 5179 --strictPort` chạy nền.
- [ ] **Step 2:** Script, ở cả 1440×900 và 390×844. Mỗi bước có ảnh chụp và kiểm tra trạng thái đọc từ localStorage `song-sot-cong-so-career`:
  - xóa save rồi vào ca (IT, Thực tập sinh);
  - bấm vào một điểm trên sàn và thấy `playerStore.pos` thay đổi (đọc qua `window.__player`, chỉ gắn khi `import.meta.env.DEV`);
  - nhận quest "Pha mì giúp Độ Mixi": tới pantry lấy mì, giao cho Độ Mixi, `done` tăng 1;
  - làm một quest gõ phím: desktop gõ chuỗi, mobile chạm khối;
  - làm một quest canh nhịp: bấm Space hoặc chạm khi kim ở vùng xanh, dùng `window.__timing` (DEV) để đọc vị trí kim;
  - để một quest của sếp hết giờ và thấy `strikes` tăng 1;
  - thấy `console --errors` rỗng.
- [ ] **Step 3: Bot chơi trọn tuần.** Bot đọc save để chọn anchor kế tiếp, làm hết bước, ra về khi đủ chỉ tiêu, chọn `sleep`. Kỳ vọng: tới `week_end` hoặc `fired` trong vòng 15 phút, không kẹt ở trạng thái nào quá 60 giây, không có lỗi console.
- [ ] **Step 4:** Xem lại ảnh chụp: không có emoji làm icon, ghim không bị HUD che, mini-game vừa màn 390 px.
- [ ] **Step 5:** Tắt dev server và báo kết quả cho người dùng. Lớp 1 dừng ở đây để người dùng chơi thử.
