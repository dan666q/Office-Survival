// SPIKE 2D — bản nháp vứt đi. Không test, không giữ code.
// Tòa nhà mặt cắt pixel art: 2 tầng, thang máy, cầu thang, một quest giao nhận.

const C = {
  wall: '#efe3c8', wallShade: '#e2d3b2', mint: '#7fb7a4', mintDark: '#4f8a77',
  tileA: '#efe6d2', tileB: '#b5543a', wood: '#8a5f3f', woodDark: '#5a3c27',
  desk: '#d8c3a0', deskEdge: '#9c7a52', metal: '#9aa0a6', metalDark: '#5c6268',
  black: '#26282b', screen: '#1b2a33', glow: '#9fd8c6', ink: '#2a251e',
  stamp: '#c8102e', note: '#f6d55c', paper: '#fbf7ee', skin: '#e8b98f', skinShade: '#d9a274',
  pants: '#3b3f4a', shoe: '#2a2420', slab: '#8d8579', slabDark: '#6f675c', facade: '#a5664b', facadeDark: '#7d4b37',
  water: '#a8d4ec', waterDark: '#5b9cc6', plant: '#4f7d3a', plantDark: '#355a26', pot: '#c47a4a',
}

const CONTACTS = {
  self: { name: 'Bạn', shirt: '#1f3a93', hair: '#1d1712', look: 'plain' },
  it_dev: { name: 'Độ Mixi IT', shirt: '#55606e', hair: '#1d1712', look: 'headset' },
  intern: { name: 'Intern CR7', shirt: '#5f9e6e', hair: '#2b1f15', look: 'plain' },
  pm: { name: 'PM Jisoo', shirt: '#d9707f', hair: '#1d1712', look: 'longhair' },
  admin: { name: 'ViruSs Admin', shirt: '#c96f9b', hair: '#1d1712', look: 'glasses' },
}

// ===================== HÌNH HỌC TÒA NHÀ =====================
const FH = 84 // chiều cao một tầng
const SLAB = 6
const ELEV = { x0: 8, x1: 40, cx: 24 }
const STAIR = { x0: 280, x1: 312 }
const ROOM = { x0: 40, x1: 280 }
const FLOORS = ['Tầng 1 · Pantry', 'Tầng 2 · Phòng IT']
const surface = (f) => -f * FH // y mặt sàn của tầng f (y hướng xuống)
const WALK_MIN = 16, WALK_MAX = 304
const SPEED = 52 // px/giây

// ===================== CANVAS & TỶ LỆ =====================
const canvas = document.getElementById('c')
const ctx = canvas.getContext('2d')
const view = document.createElement('canvas')
const v = view.getContext('2d')
let scale = 3, viewW = 320, viewH = 200, dpr = 1

function resize() {
  dpr = window.devicePixelRatio || 1
  const devW = Math.round(innerWidth * dpr)
  const devH = Math.round(innerHeight * dpr)
  canvas.width = devW
  canvas.height = devH
  if (innerWidth < 600) scale = Math.max(2, Math.floor(devW / 190))
  else scale = Math.max(2, Math.min(12, Math.floor(Math.min(devW / 380, devH / 236))))
  viewW = Math.ceil(devW / scale)
  viewH = Math.ceil(devH / scale)
  view.width = viewW
  view.height = viewH
}
addEventListener('resize', resize)
resize()

// ===================== SPRITE NGƯỜI (dựng bằng code) =====================
const spriteCache = new Map()
function personSprite(contact, pose, frame, carry) {
  const key = `${contact.shirt}|${contact.look}|${pose}|${frame}|${carry}`
  if (spriteCache.has(key)) return spriteCache.get(key)
  const s = document.createElement('canvas')
  s.width = 16
  s.height = 24
  const g = s.getContext('2d')
  const px = (x, y, w, h, c) => { g.fillStyle = c; g.fillRect(x, y, w, h) }
  const breathe = pose === 'idle' && frame === 1 ? 1 : 0
  const hy = breathe // đầu hạ 1px khi thở

  // chân
  if (pose === 'sit') {
    px(6, 17, 7, 2, C.pants)
    px(11, 19, 2, 4, C.pants)
    px(11, 23, 3, 1, C.shoe)
  } else {
    const swing = pose === 'walk' ? [0, 2, 0, -2][frame] : 0
    px(6 + swing, 18, 2, 5, C.pants) // chân trước
    px(8 - swing, 18, 2, 5, '#33363f') // chân sau
    px(6 + swing, 23, 3, 1, C.shoe)
    px(8 - swing, 23, 3, 1, C.shoe)
  }
  // thân áo
  const shirtDark = shade(contact.shirt, -0.18)
  px(5, 11 + hy, 7, 7 - hy, contact.shirt)
  px(5, 17, 7, 1, shirtDark)
  if (contact.look === 'vest') {
    px(9, 11 + hy, 2, 3, '#f2efe8')
    px(9, 12 + hy, 1, 4, C.stamp)
  }
  // tay
  if (carry) {
    px(9, 13 + hy, 5, 2, shirtDark)
    px(13, 13 + hy, 1, 2, C.skin)
    px(11, 10 + hy, 5, 4, '#e2b33a') // ly mì
    px(11, 10 + hy, 5, 1, C.stamp)
  } else if (pose === 'sit') {
    px(9, 13 + hy, 4, 2, shirtDark)
    px(13, 13 + hy, 1, 2, C.skin)
  } else {
    const arm = pose === 'walk' ? [0, -1, 0, 1][frame] : 0
    px(7 + arm, 12 + hy, 2, 5, shirtDark)
    px(7 + arm, 17, 2, 1, C.skin)
  }
  // cổ + đầu (nhìn nghiêng sang phải)
  px(7, 10 + hy, 3, 1, C.skinShade)
  px(5, 2 + hy, 8, 8, C.skin)
  px(12, 5 + hy, 1, 2, C.skin) // mũi
  px(10, 5 + hy, 1, 1, C.ink) // mắt
  px(10, 8 + hy, 2, 1, C.skinShade) // miệng
  // tóc theo kiểu
  const h = contact.hair
  if (contact.look === 'cap') {
    px(5, 1 + hy, 8, 3, contact.shirt)
    px(11, 3 + hy, 4, 1, contact.shirt)
  } else {
    px(5, 1 + hy, 8, 2, h)
    px(5, 3 + hy, 2, 3, h)
    if (contact.look === 'longhair') px(4, 3 + hy, 3, 9, h)
    if (contact.look === 'bun') px(4, 0 + hy, 3, 2, h)
  }
  if (contact.look === 'headset') {
    px(5, 0 + hy, 8, 1, C.black)
    px(6, 4 + hy, 2, 3, C.black)
    px(8, 8 + hy, 3, 1, C.black)
  }
  if (contact.look === 'glasses') {
    px(8, 5 + hy, 4, 1, C.black)
    px(9, 5 + hy, 2, 1, '#cfe3f0')
  }
  spriteCache.set(key, s)
  return s
}

function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16)
  const f = (c) => Math.max(0, Math.min(255, Math.round(c + c * amt)))
  return `rgb(${f(n >> 16)},${f((n >> 8) & 255)},${f(n & 255)})`
}

// font chữ số 3x5 cho bảng số tầng
const DIGITS = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001001001', '111101111101111', '111101111001111']
function digit(g, n, x, y, c) {
  g.fillStyle = c
  const d = DIGITS[n]
  for (let i = 0; i < 15; i++) if (d[i] === '1') g.fillRect(x + (i % 3), y + Math.floor(i / 3), 1, 1)
}

// ===================== THỜI GIAN TRONG NGÀY =====================
const TIMES = {
  'Sáng': { top: '#9cc9e6', bottom: '#f4e6c4', city: '#b7c4cc', cityNear: '#9fb0b9', tint: null, night: false },
  'Trưa': { top: '#6fb2e8', bottom: '#e8f2f2', city: '#aebfc9', cityNear: '#93a6b1', tint: null, night: false },
  'Chiều': { top: '#e8925a', bottom: '#f7d690', city: '#b9907a', cityNear: '#9a7566', tint: 'rgba(255,150,60,0.10)', night: false },
  'Tối': { top: '#151a33', bottom: '#3b3556', city: '#262a44', cityNear: '#1d2036', tint: 'rgba(16,20,56,0.45)', night: true },
}
let timeKey = 'Sáng'
const timeBox = document.getElementById('time')
for (const k of Object.keys(TIMES)) {
  const b = document.createElement('button')
  b.textContent = k
  b.onclick = () => { timeKey = k; syncTimeButtons() }
  timeBox.appendChild(b)
}
function syncTimeButtons() { for (const b of timeBox.children) b.setAttribute('aria-pressed', String(b.textContent === timeKey)) }
syncTimeButtons()

// ===================== ĐỐI TƯỢNG TƯƠNG TÁC =====================
const NPCS = [
  { id: 'it_dev', floor: 1, x: 132, contact: CONTACTS.it_dev, seated: true },
  { id: 'intern', floor: 1, x: 182, contact: CONTACTS.intern, seated: true },
  { id: 'admin', floor: 0, x: 214, contact: CONTACTS.admin, seated: false, facing: -1 },
]
const OBJECTS = [
  { id: 'counter', floor: 0, x0: 52, x1: 104, standX: 96, label: 'Quầy pantry' },
  { id: 'water', floor: 0, x0: 150, x1: 162, standX: 146, label: 'Cây nước' },
  { id: 'toilet', floor: 0, x0: 248, x1: 270, standX: 244, label: 'Toilet' },
  { id: 'printer', floor: 1, x0: 248, x1: 268, standX: 242, label: 'Máy in' },
  { id: 'server', floor: 1, x0: 214, x1: 232, standX: 208, label: 'Tủ server' },
]

// quest nháp: Độ Mixi nhờ pha mì
const quest = { stage: 'offer' } // offer → fetch → deliver → done

// ===================== NGƯỜI CHƠI & ĐƯỜNG ĐI =====================
const player = { floor: 1, x: 70, facing: 1, mode: 'idle', t: 0, plan: [], goal: null, carry: false, hidden: false, y: surface(1) }

const elevator = { floor: 1, y: surface(1), state: 'idle', doors: 0, timer: 0, target: null, rider: false }

function planRoute(toFloor, toX) {
  const segs = []
  if (toFloor === player.floor) {
    segs.push({ type: 'walk', x: toX })
    return { segs, via: null }
  }
  const dF = Math.abs(toFloor - player.floor)
  const elevCost = Math.abs(player.x - ELEV.cx) / SPEED + 2 + dF * 1.1 + 0.8 + Math.abs(ELEV.cx - toX) / SPEED
  const goingUp = toFloor > player.floor
  const stairIn = goingUp ? STAIR.x0 + 4 : STAIR.x1 - 4
  const stairOut = goingUp ? STAIR.x1 - 4 : STAIR.x0 + 4
  const stairCost = Math.abs(player.x - stairIn) / SPEED + dF * 2.2 + Math.abs(stairOut - toX) / SPEED
  if (elevCost <= stairCost) {
    segs.push({ type: 'walk', x: ELEV.cx }, { type: 'elevator', to: toFloor }, { type: 'walk', x: toX })
    return { segs, via: 'elevator' }
  }
  let f = player.floor
  segs.push({ type: 'walk', x: stairIn })
  while (f !== toFloor) {
    const next = f + (goingUp ? 1 : -1)
    segs.push({ type: 'stairs', from: f, to: next })
    f = next
  }
  segs.push({ type: 'walk', x: toX })
  return { segs, via: 'stairs' }
}

function goTo(floor, x, goal = null) {
  if (player.mode === 'elevator' || player.mode === 'stairs') {
    // đang trên thang: đổi đích sau khi ra khỏi thang
    player.pendingGoal = { floor, x, goal }
    return
  }
  const { segs, via } = planRoute(floor, Math.max(WALK_MIN, Math.min(WALK_MAX, x)))
  player.plan = segs
  player.goal = goal
  hideBubble()
  setStatus(via === 'elevator' ? 'Ra thang máy…' : via === 'stairs' ? 'Đi cầu thang cho nhanh' : '')
  nextSeg()
}

function nextSeg() {
  const seg = player.plan.shift()
  if (!seg) {
    player.mode = 'idle'
    if (player.pendingGoal) {
      const p = player.pendingGoal
      player.pendingGoal = null
      goTo(p.floor, p.x, p.goal)
      return
    }
    setStatus('')
    if (player.goal) arrive(player.goal)
    player.goal = null
    return
  }
  player.seg = seg
  if (seg.type === 'walk') player.mode = 'walk'
  if (seg.type === 'stairs') {
    player.mode = 'stairs'
    player.t = 0
  }
  if (seg.type === 'elevator') {
    player.mode = 'elevator'
    elevator.target = seg.to
    elevator.rider = false
    // thang đang ở tầng khác hoặc đang bận: phải chờ
    elevator.state = 'waiting'
    elevator.timer = 0.8 + Math.random() * 1.6
    setStatus(`Chờ thang máy… (thang đang ở tầng ${elevator.floor + 1})`)
  }
}

// ===================== CẬP NHẬT =====================
function update(dt) {
  const seg = player.seg
  if (player.mode === 'walk' && seg) {
    const d = seg.x - player.x
    if (Math.abs(d) < 0.8) {
      player.x = seg.x
      nextSeg()
    } else {
      player.facing = Math.sign(d)
      player.x += Math.sign(d) * Math.min(Math.abs(d), SPEED * dt)
    }
  }
  if (player.mode === 'stairs' && seg) {
    player.t += dt / 2.2
    const up = seg.to > seg.from
    const t = Math.min(1, player.t)
    player.x = up ? STAIR.x0 + 4 + (STAIR.x1 - STAIR.x0 - 8) * t : STAIR.x1 - 4 - (STAIR.x1 - STAIR.x0 - 8) * t
    player.y = surface(seg.from) + (surface(seg.to) - surface(seg.from)) * t
    player.facing = up ? 1 : -1
    if (t >= 1) {
      player.floor = seg.to
      player.y = surface(seg.to)
      nextSeg()
    }
  } else if (player.mode !== 'elevator') {
    player.y = surface(player.floor)
  }

  // thang máy
  const e = elevator
  if (e.state === 'waiting') {
    e.timer -= dt
    // thang chạy về tầng người chơi
    const ty = surface(player.floor)
    e.y += Math.sign(ty - e.y) * Math.min(Math.abs(ty - e.y), (FH / 1.1) * dt)
    if (e.timer <= 0 && Math.abs(ty - e.y) < 0.5) {
      e.floor = player.floor
      e.state = 'opening'
      setStatus('Ting! Thang tới.')
    }
  } else if (e.state === 'opening') {
    e.doors = Math.min(1, e.doors + dt * 3)
    if (e.doors >= 1) {
      if (!e.rider && player.mode === 'elevator') {
        e.rider = true
        player.hidden = true
        e.state = 'closing'
      } else {
        // tới nơi, người chơi bước ra
        player.hidden = false
        e.rider = false
        e.state = 'closingEmpty'
        player.floor = e.floor
        player.y = surface(e.floor)
        nextSeg()
      }
    }
  } else if (e.state === 'closing' || e.state === 'closingEmpty') {
    e.doors = Math.max(0, e.doors - dt * 3)
    if (e.doors <= 0) {
      if (e.state === 'closing') {
        e.state = 'moving'
        setStatus(`Thang đang lên tầng ${e.target + 1}…`)
      } else e.state = 'idle'
    }
  } else if (e.state === 'moving') {
    const ty = surface(e.target)
    e.y += Math.sign(ty - e.y) * Math.min(Math.abs(ty - e.y), (FH / 1.1) * dt)
    if (Math.abs(ty - e.y) < 0.5) {
      e.y = ty
      e.floor = e.target
      e.state = 'opening'
    }
  }

  // phím
  if (player.mode === 'idle' || player.mode === 'walk') {
    const dir = (keys.has('d') || keys.has('arrowright') ? 1 : 0) - (keys.has('a') || keys.has('arrowleft') ? 1 : 0)
    if (dir !== 0) {
      player.plan = []
      player.goal = null
      player.mode = 'idle'
      player.facing = dir
      player.x = Math.max(WALK_MIN, Math.min(WALK_MAX, player.x + dir * SPEED * dt))
      player.walkingByKey = true
    } else player.walkingByKey = false
  }
}

const keys = new Set()
addEventListener('keydown', (ev) => {
  const k = ev.key.toLowerCase()
  keys.add(k)
  const nearElev = Math.abs(player.x - ELEV.cx) < 10 && player.mode !== 'elevator'
  if ((k === 'w' || k === 'arrowup') && nearElev && player.floor < FLOORS.length - 1) goTo(player.floor + 1, player.x)
  if ((k === 's' || k === 'arrowdown') && nearElev && player.floor > 0) goTo(player.floor - 1, player.x)
})
addEventListener('keyup', (ev) => keys.delete(ev.key.toLowerCase()))

// ===================== TƯƠNG TÁC =====================
const bubble = document.getElementById('bubble')
const status = document.getElementById('status')
let bubbleAnchor = null
function setStatus(t) { status.textContent = t; status.style.display = t ? 'block' : 'none' }
function showBubble(name, text, floor, x) {
  bubble.innerHTML = `<small>${name}</small>${text}`
  bubble.style.display = 'block'
  bubbleAnchor = { floor, x }
}
function hideBubble() { bubble.style.display = 'none'; bubbleAnchor = null }

function arrive(goal) {
  if (goal.type === 'npc') {
    const n = goal.npc
    player.facing = Math.sign(n.x - player.x) || 1
    if (n.id === 'it_dev') {
      if (quest.stage === 'offer') {
        quest.stage = 'fetch'
        showBubble(n.contact.name, 'Ê, xuống pantry pha giúp ly mì với, đói không code nổi. Cảm ơn trước!', n.floor, n.x)
      } else if (quest.stage === 'deliver' && player.carry) {
        quest.stage = 'done'
        player.carry = false
        showBubble(n.contact.name, 'Đỉnh! Mai có bug gì cứ để anh. (+thiện cảm)', n.floor, n.x)
      } else if (quest.stage === 'done') {
        showBubble(n.contact.name, 'Đang húp mì, đừng làm phiền.', n.floor, n.x)
      } else {
        showBubble(n.contact.name, 'Mì đâu rồi em?', n.floor, n.x)
      }
    } else if (n.id === 'intern') {
      showBubble(n.contact.name, 'Anh ơi, git push --force là gì ạ? Em lỡ bấm rồi…', n.floor, n.x)
    } else {
      showBubble(n.contact.name, 'Ủa xuống tám chuyện hả? Hóng drama tầng 3 chưa?', n.floor, n.x)
    }
  } else if (goal.type === 'obj') {
    const o = goal.obj
    if (o.id === 'counter' && quest.stage === 'fetch') {
      quest.stage = 'deliver'
      player.carry = true
      showBubble('Pantry', 'Đã pha xong ly mì. Mang lên cho Độ Mixi ở tầng 2.', o.floor, (o.x0 + o.x1) / 2)
    } else if (o.id === 'water') showBubble('Cây nước', 'Tán gẫu 15 phút. Tinh thần +8.', o.floor, (o.x0 + o.x1) / 2)
    else if (o.id === 'toilet') showBubble('Toilet', 'Trốn toilet lướt TikTok. Tinh thần +10, đừng để sếp biết.', o.floor, (o.x0 + o.x1) / 2)
    else showBubble(o.label, 'Không có việc ở đây.', o.floor, (o.x0 + o.x1) / 2)
  }
}

function screenToWorld(cx, cy) {
  return { x: (cx * dpr) / scale + cam.x, y: (cy * dpr) / scale + cam.y }
}
function worldToScreen(x, y) {
  return { x: ((x - cam.x) * scale) / dpr, y: ((y - cam.y) * scale) / dpr }
}
function floorAtY(y) {
  for (let f = 0; f < FLOORS.length; f++) if (y <= surface(f) + SLAB && y > surface(f) - FH + SLAB) return f
  return null
}

canvas.addEventListener('pointerdown', (ev) => {
  const w = screenToWorld(ev.clientX, ev.clientY)
  const f = floorAtY(w.y)
  if (f === null) return
  // vùng chạm nở rộng (≥ 44px màn hình)
  const pad = Math.max(6, 22 / (scale / dpr))
  for (const n of NPCS) {
    if (n.floor === f && Math.abs(w.x - n.x) < 8 + pad && w.y > surface(f) - 30 - pad) {
      goTo(f, n.x + (n.seated ? -14 : -14 * (n.facing ?? 1)), { type: 'npc', npc: n })
      return
    }
  }
  for (const o of OBJECTS) {
    if (o.floor === f && w.x > o.x0 - pad && w.x < o.x1 + pad) {
      goTo(f, o.standX, { type: 'obj', obj: o })
      return
    }
  }
  goTo(f, w.x)
})

// ===================== VẼ =====================
const cam = { x: 0, y: -FH * 2 }
let tGlobal = 0

function drawSkyAndCity(T) {
  const grd = v.createLinearGradient(0, 0, 0, viewH)
  grd.addColorStop(0, T.top)
  grd.addColorStop(1, T.bottom)
  v.fillStyle = grd
  v.fillRect(0, 0, viewW, viewH)
  // phố xa (parallax 0.3) và gần (0.6) — các khối nhà cao tầng
  const layers = [
    { k: 0.3, color: T.city, base: 40, seed: 3, w: 26 },
    { k: 0.6, color: T.cityNear, base: 20, seed: 9, w: 34 },
  ]
  for (const L of layers) {
    let s = L.seed
    const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280)
    const ox = -cam.x * L.k
    for (let i = -6; i < 30; i++) {
      const bx = Math.floor(i * L.w + ox) % (L.w * 30)
      const h = 60 + rnd() * 120
      const gy = Math.floor(-cam.y * L.k * 0.4 + viewH * 0.55 + L.base)
      v.fillStyle = L.color
      v.fillRect(bx, gy - h, L.w - 3, h + 400)
      if (T.night) {
        v.fillStyle = 'rgba(255,214,120,0.75)'
        for (let wy = gy - h + 6; wy < gy + 200; wy += 8) for (let wx = bx + 3; wx < bx + L.w - 6; wx += 6) if (rnd() > 0.62) v.fillRect(wx, wy, 2, 3)
      }
    }
  }
}

function W(x, y, w, h, c) { v.fillStyle = c; v.fillRect(Math.round(x - cam.x), Math.round(y - cam.y), w, h) }

function drawWindow(x0, x1, top, bottom, T) {
  // khoảng cửa sổ: vẽ lại bầu trời + phố bên trong (đã có ở nền) bằng cách để trống tường
  W(x0 - 2, top - 2, x1 - x0 + 4, 2, C.metal)
  W(x0 - 2, bottom, x1 - x0 + 4, 3, C.metal)
  W(x0 - 2, top, 2, bottom - top, C.metal)
  W(x1, top, 2, bottom - top, C.metal)
  W(Math.round((x0 + x1) / 2) - 1, top, 2, bottom - top, C.metal)
  // rèm lá dọc kéo một nửa
  for (let x = x0; x < x0 + (x1 - x0) * 0.35; x += 4) W(x, top, 3, bottom - top, T.night ? '#bdb6a2' : '#e8e2d0')
}

function drawFloor(f, T) {
  const y = surface(f)
  const top = y - FH + SLAB
  // tường (để lỗ cửa sổ)
  const windows = f === 0 ? [[112, 146], [170, 236]] : [[52, 112], [150, 206]]
  const wallTop = top
  const wallH = y - wallTop
  // vẽ tường thành các dải quanh cửa sổ
  const winTop = top + 12
  const winBottom = top + 40
  W(ROOM.x0, wallTop, ROOM.x1 - ROOM.x0, winTop - wallTop, C.wall)
  W(ROOM.x0, winBottom + 3, ROOM.x1 - ROOM.x0, y - winBottom - 3, C.wall)
  let cursor = ROOM.x0
  for (const [a, b] of windows) {
    W(cursor, winTop, a - 2 - cursor, winBottom + 3 - winTop, C.wall)
    cursor = b + 2
  }
  W(cursor, winTop, ROOM.x1 - cursor, winBottom + 3 - winTop, C.wall)
  // chân tường xanh ngọc + nẹp
  W(ROOM.x0, y - 16, ROOM.x1 - ROOM.x0, 16, C.mint)
  W(ROOM.x0, y - 17, ROOM.x1 - ROOM.x0, 1, C.mintDark)
  for (const [a, b] of windows) drawWindow(a, b, winTop, winBottom, T)
  // sàn gạch caro
  for (let x = ROOM.x0; x < STAIR.x1; x += 8) W(x, y - 2, 8, 2, ((x / 8) | 0) % 2 ? C.tileB : C.tileA)
  // đèn tuýp trần
  for (const lx of [80, 190]) {
    W(lx, top, 24, 2, '#f4fbff')
    if (T.night) {
      v.fillStyle = 'rgba(232,246,255,0.10)'
      v.beginPath()
      v.moveTo(lx - cam.x, top + 2 - cam.y)
      v.lineTo(lx + 24 - cam.x, top + 2 - cam.y)
      v.lineTo(lx + 48 - cam.x, y - cam.y)
      v.lineTo(lx - 24 - cam.x, y - cam.y)
      v.fill()
    }
  }
  // giếng thang máy (cắt ngang thấy được cabin)
  W(ELEV.x0, top, ELEV.x1 - ELEV.x0, FH - SLAB, '#4a4540')
  W(ELEV.x0 + 2, top, 1, FH - SLAB, '#6b655c')
  W(ELEV.x1 - 3, top, 1, FH - SLAB, '#6b655c')
  // khung cửa thang + bảng số tầng
  W(ELEV.x0 - 2, y - 40, 2, 40, C.metal)
  W(ELEV.x1, y - 40, 2, 40, C.metal)
  W(ELEV.cx - 6, y - 48, 12, 7, C.black)
  digit(v, elevator.floor + 1, Math.round(ELEV.cx - 1 - cam.x), Math.round(y - 47 - cam.y), '#ff8a5c')
  // cầu thang zigzag (mặt cắt)
  W(STAIR.x0, top, STAIR.x1 - STAIR.x0, FH - SLAB, '#d9c9a6')
  for (let i = 0; i < 12; i++) W(STAIR.x0 + 4 + i * 2, y - 2 - i * 6.5, 6, 2, C.woodDark)
  W(STAIR.x0, top, 1, FH - SLAB, C.wallShade)
  // tên tầng: biển nhỏ cạnh cửa thang
  W(ELEV.x1 + 2, top + 2, 9, 9, C.paper)
  W(ELEV.x1 + 2, top + 2, 9, 2, C.stamp)
  digit(v, f + 1, Math.round(ELEV.x1 + 5 - cam.x), Math.round(top + 5 - cam.y), C.ink)
  // sàn bê tông dưới
  W(ELEV.x0 - 6, y, STAIR.x1 - ELEV.x0 + 12, SLAB, C.slab)
  W(ELEV.x0 - 6, y + SLAB - 1, STAIR.x1 - ELEV.x0 + 12, 1, C.slabDark)

  if (f === 0) drawPantry(y)
  else drawIt(y, T)
}

function drawPantry(y) {
  // quầy + lò vi sóng + thùng mì
  W(52, y - 16, 52, 14, C.wood)
  W(50, y - 18, 56, 2, '#e3ddd0')
  W(56, y - 28, 16, 10, '#d9d6cf')
  W(58, y - 26, 9, 6, C.black)
  W(80, y - 26, 12, 8, '#e2b33a')
  W(80, y - 24, 12, 2, C.stamp)
  if (quest.stage === 'fetch') W(96, y - 24, 6, 6, Math.floor(tGlobal * 3) % 2 ? C.note : '#fff3a8') // nhấp nháy chỗ cần tới
  // tủ lạnh
  W(124, y - 40, 18, 38, '#e9e6df')
  W(124, y - 26, 18, 1, '#b9b5ab')
  W(139, y - 36, 1, 7, C.metal)
  W(127, y - 36, 4, 4, C.note)
  // cây nước Lavie
  W(150, y - 26, 12, 24, '#f2efe8')
  W(151, y - 40, 10, 14, C.water)
  W(152, y - 40, 8, 1, C.waterDark)
  W(152, y - 18, 3, 2, C.stamp)
  W(157, y - 18, 3, 2, '#1f6fd1')
  // bàn ăn + ghế nhựa đỏ
  W(184, y - 14, 30, 2, C.desk)
  W(186, y - 12, 2, 10, C.deskEdge)
  W(210, y - 12, 2, 10, C.deskEdge)
  W(176, y - 9, 6, 2, C.stamp)
  W(177, y - 7, 1, 5, C.stamp)
  W(218, y - 9, 6, 2, C.stamp)
  W(223, y - 7, 1, 5, C.stamp)
  // cửa toilet
  W(248, y - 34, 22, 32, C.mintDark)
  W(250, y - 32, 18, 28, C.mint)
  W(254, y - 28, 10, 6, C.paper)
  W(256, y - 27, 2, 4, '#1f6fd1')
  W(260, y - 27, 2, 4, C.stamp)
  W(265, y - 18, 2, 2, '#d4b25a')
  // chậu cây
  W(108, y - 8, 6, 6, C.pot)
  W(106, y - 18, 3, 10, C.plant)
  W(111, y - 20, 3, 12, C.plantDark)
  W(113, y - 16, 3, 8, C.plant)
}

function drawIt(y, T) {
  const desk = (x, seed) => {
    W(x, y - 16, 32, 2, C.desk)
    W(x, y - 14, 32, 1, C.deskEdge)
    W(x + 1, y - 13, 2, 11, C.deskEdge)
    W(x + 29, y - 13, 2, 11, C.deskEdge)
    // màn hình (quay về bên trái — phía người ngồi)
    W(x + 14, y - 30, 14, 10, C.black)
    W(x + 15, y - 29, 12, 8, C.screen)
    const line = Math.floor(tGlobal * 4 + seed) % 6
    for (let i = 0; i < 4; i++) W(x + 16, y - 28 + i * 2, 3 + ((i + line + seed) % 4) * 2, 1, i === line % 4 ? C.note : C.glow)
    W(x + 20, y - 20, 2, 4, C.black)
    W(x + 10, y - 17, 6, 1, '#3a3d42') // bàn phím
    W(x + 4, y - 19, 3, 3, '#f2efe8') // cốc
  }
  const chair = (x) => {
    W(x, y - 11, 9, 2, C.black)
    W(x, y - 22, 2, 11, C.black)
    W(x + 4, y - 9, 1, 6, C.metalDark)
    W(x + 1, y - 3, 7, 1, C.metalDark)
  }
  // bàn của bạn (trống khi bạn đi)
  desk(80, 1)
  chair(66)
  desk(140, 4)
  chair(126)
  desk(190, 7)
  chair(176)
  // tủ server
  W(214, y - 46, 18, 44, '#2c2f33')
  for (let i = 0; i < 6; i++) {
    W(216, y - 43 + i * 7, 14, 5, '#3b3f45')
    W(218, y - 42 + i * 7, 2, 1, Math.sin(tGlobal * (2 + i) + i) > 0 ? '#7dffb0' : '#22442f')
  }
  // máy in
  W(248, y - 20, 20, 18, '#d9d6cf')
  W(248, y - 26, 20, 6, '#c7c3ba')
  W(250, y - 28, 14, 2, C.paper)
  W(263, y - 22, 3, 1, '#7dffb0')
  // bảng trắng
  W(117, y - 62, 28, 16, C.metal)
  W(118, y - 61, 26, 14, '#f7f7f2')
  W(120, y - 58, 14, 1, '#1f3a93')
  W(120, y - 55, 20, 1, C.ink)
  W(120, y - 52, 10, 1, C.stamp)
  W(136, y - 54, 6, 5, C.note)
  // đồng hồ treo tường
  W(240, y - 62, 9, 9, C.ink)
  W(241, y - 61, 7, 7, C.paper)
  W(244, y - 60, 1, 3, C.ink)
  W(244, y - 58, 2, 1, C.stamp)
  if (T.night) W(150, y - 30, 12, 8, 'rgba(159,216,198,0.25)')
}

function drawPerson(contact, x, y, pose, frame, facing, carry) {
  const s = personSprite(contact, pose, frame, carry)
  const sx = Math.round(x - cam.x)
  const sy = Math.round(y - 24 - cam.y)
  if (facing < 0) {
    v.save()
    v.scale(-1, 1)
    v.drawImage(s, -sx - 8, sy)
    v.restore()
  } else v.drawImage(s, sx - 8, sy)
}

function drawNote(x, y, color) {
  const bob = Math.round(Math.sin(tGlobal * 4) * 1.5)
  W(x - 5, y - 44 + bob, 10, 9, color)
  W(x - 5, y - 44 + bob, 10, 1, shade(color, -0.2))
  W(x - 1, y - 46 + bob, 2, 2, C.stamp) // đinh ghim
  W(x - 3, y - 41 + bob, 6, 1, C.ink)
  W(x - 3, y - 39 + bob, 4, 1, C.ink)
}

function drawBuildingShell() {
  const roof = surface(FLOORS.length) + SLAB
  // tường hai bên hông, mái, bồn nước inox
  W(ELEV.x0 - 8, roof - 8, 4, -roof + 8 + SLAB, C.facadeDark)
  W(STAIR.x1 + 4, roof - 8, 4, -roof + 8 + SLAB, C.facadeDark)
  W(ELEV.x0 - 6, roof - 6, STAIR.x1 - ELEV.x0 + 12, 6, C.facade)
  W(ELEV.x0 - 6, roof - 8, STAIR.x1 - ELEV.x0 + 12, 2, C.facadeDark)
  W(250, roof - 26, 28, 18, '#c9ced3')
  W(250, roof - 26, 28, 2, '#e6e9ec')
  W(256, roof - 8, 2, 2, C.metalDark)
  W(270, roof - 8, 2, 2, C.metalDark)
  // biển công ty trên mái
  W(70, roof - 22, 120, 14, C.stamp)
  W(72, roof - 20, 116, 10, '#e0263f')
  for (let i = 0; i < 14; i++) W(78 + i * 8, roof - 17, 5, 4, C.note)
  W(90, roof - 8, 2, 2, C.metalDark)
  W(170, roof - 8, 2, 2, C.metalDark)
  // vỉa hè + đường
  W(-400, SLAB, 1200, 6, '#b8b0a2')
  W(-400, SLAB + 6, 1200, 40, '#4a4744')
  for (let x = -400; x < 800; x += 24) W(x, SLAB + 24, 12, 2, '#d8d3c8')
  W(-400, SLAB + 46, 1200, 4, '#b8b0a2')
  W(-400, SLAB + 50, 1200, 600, '#2f2b27')
  // xe Wave đậu trước cửa
  W(-30, SLAB - 10, 22, 6, '#c8102e')
  W(-34, SLAB - 6, 7, 7, C.black)
  W(-12, SLAB - 6, 7, 7, C.black)
  W(-26, SLAB - 14, 6, 4, C.black)
}

function render() {
  const T = TIMES[timeKey]
  // camera bám người chơi
  const targetX = player.x - viewW / 2
  const minX = -60, maxX = STAIR.x1 + 60 - viewW
  const tx = viewW > STAIR.x1 - ELEV.x0 + 120 ? (ELEV.x0 + STAIR.x1) / 2 - viewW / 2 : Math.max(minX, Math.min(maxX, targetX))
  const followY = player.hidden ? elevator.y : player.y
  const floorMid = followY - FH / 2
  const buildingMid = (surface(FLOORS.length) + SLAB + 40) / 2
  const ty = viewH > FH * FLOORS.length + 120 ? buildingMid - viewH / 2 : floorMid - viewH * 0.55
  cam.x += (tx - cam.x) * 0.12
  cam.y += (ty - cam.y) * 0.12

  drawSkyAndCity(T)
  drawBuildingShell()
  for (let f = 0; f < FLOORS.length; f++) drawFloor(f, T)

  // cabin thang máy
  const e = elevator
  W(ELEV.x0 + 4, e.y - 38, ELEV.x1 - ELEV.x0 - 8, 38, '#c8b98f')
  W(ELEV.x0 + 4, e.y - 38, ELEV.x1 - ELEV.x0 - 8, 2, '#fff1c2')
  const roofY = surface(FLOORS.length) + SLAB
  W(ELEV.x0 + 6, roofY, 1, e.y - 38 - roofY, '#2b2723') // cáp
  W(ELEV.x1 - 7, roofY, 1, e.y - 38 - roofY, '#2b2723')
  if (e.rider) drawPerson(CONTACTS.self, ELEV.cx, e.y - 1, 'idle', Math.floor(tGlobal * 1.6) % 2, 1, player.carry)
  // cửa thang ở tầng thang đang đỗ
  for (let f = 0; f < FLOORS.length; f++) {
    const y = surface(f)
    const open = f === e.floor && Math.abs(e.y - y) < 1 ? e.doors : 0
    const half = 10 * (1 - open)
    W(ELEV.cx - 10, y - 38, half, 36, '#a7adb3')
    W(ELEV.cx + 10 - half, y - 38, half, 36, '#a7adb3')
    if (half > 1) W(ELEV.cx - 1, y - 38, 1, 36, '#7d8389')
  }

  // NPC
  for (const n of NPCS) {
    const y = surface(n.floor)
    drawPerson(n.contact, n.x, y - (n.seated ? 0 : 0), n.seated ? 'sit' : 'idle', Math.floor(tGlobal * 1.6 + n.x) % 2, n.facing ?? 1, false)
    if (n.id === 'it_dev' && (quest.stage === 'offer' || quest.stage === 'deliver')) drawNote(n.x, y, quest.stage === 'offer' ? '#b8d8a8' : C.note)
  }

  // người chơi
  if (!player.hidden) {
    const moving = player.mode === 'walk' || player.mode === 'stairs' || player.walkingByKey
    const frame = moving ? Math.floor(tGlobal * 8) % 4 : Math.floor(tGlobal * 1.6) % 2
    drawPerson(CONTACTS.self, player.x, player.y, moving ? 'walk' : 'idle', frame, player.facing, player.carry)
    // mũi tên nhỏ trên đầu người chơi
    W(player.x - 1, player.y - 30 + Math.round(Math.sin(tGlobal * 5)), 3, 2, C.stamp)
    W(player.x, player.y - 28 + Math.round(Math.sin(tGlobal * 5)), 1, 1, C.stamp)
  }

  // ánh sáng theo giờ
  if (T.tint) {
    v.fillStyle = T.tint
    v.fillRect(0, 0, viewW, viewH)
  }
  if (T.night) {
    // cửa sổ sáng đèn trong tòa nhà vào ban đêm (vẽ đè lại một lớp sáng nhẹ)
    for (let f = 0; f < FLOORS.length; f++) {
      const y = surface(f)
      v.fillStyle = 'rgba(255,240,200,0.10)'
      v.fillRect(Math.round(ROOM.x0 - cam.x), Math.round(y - FH + SLAB - cam.y), ROOM.x1 - ROOM.x0, FH - SLAB)
    }
  }

  // phóng nguyên lần ra màn hình
  ctx.imageSmoothingEnabled = false
  ctx.drawImage(view, 0, 0, viewW * scale, viewH * scale)

  // bong bóng theo nhân vật
  if (bubbleAnchor) {
    const p = worldToScreen(bubbleAnchor.x, surface(bubbleAnchor.floor) - 34)
    bubble.style.left = `${p.x}px`
    bubble.style.top = `${p.y}px`
  }
}

let last = performance.now()
function loop(now) {
  const dt = Math.min(0.05, (now - last) / 1000)
  last = now
  tGlobal += dt
  update(dt)
  render()
  requestAnimationFrame(loop)
}
requestAnimationFrame(loop)

// cho script kiểm thử đọc trạng thái
window.__spike = { player, elevator, quest, goTo, NPCS, OBJECTS, surface }
