// SPIKE HOẠT HÌNH 2D — bản nháp vứt đi. Không test, không giữ code.
// Tòa nhà mặt cắt, nhân vật có khung xương, chơi hoàn toàn bằng chuột/chạm.

// ============ BẢNG MÀU (đất, ấm, có chủ ý — viền là màu tối của chính vật) ============
const P = {
  ink: '#3b2a20', cream: '#fff6e6',
  wall: '#f3e5c8', wallStripe: 'rgba(150,110,70,0.05)', dado: '#8fbcae', dadoRail: '#5f9184',
  tileA: '#efe2c8', tileB: '#c9654a', slab: '#d8cbb6', slabDark: '#a8987f',
  facade: '#c0674c', facadeDark: '#8e4634', roof: '#7a3c2c',
  wood: '#a8754d', woodLight: '#d9b98c', steel: '#b9bec2', steelDark: '#868c92',
  screen: '#22343b', glow: '#9ee0c9', plant: '#5b8f4a', plantDark: '#3e6b34', pot: '#cf8253',
  skin: '#f0c49a', skinShade: '#d9a274', blush: 'rgba(224,83,61,0.28)',
  pants: '#3d4352', shoe: '#2d2420', tomato: '#e0533d', mustard: '#f2b33d', teal: '#3f8f86',
}

const PEOPLE = {
  self: { name: 'Bạn', shirt: '#2f5fa8', hair: '#2a1d16', look: 'plain' },
  it_dev: { name: 'Độ Mixi', shirt: '#5c6675', hair: '#1e1612', look: 'headset' },
  intern: { name: 'Intern CR7', shirt: '#5c9e6b', hair: '#3a2618', look: 'spiky' },
  admin: { name: 'Chị ViruSs', shirt: '#cf6f9e', hair: '#2a1d16', look: 'longhair' },
}

function darken(hex, amt = 0.45) {
  const n = parseInt(hex.slice(1), 16)
  const f = (c) => Math.round(c * (1 - amt))
  return `rgb(${f(n >> 16)},${f((n >> 8) & 255)},${f(n & 255)})`
}

// ============ HÌNH HỌC ============
const FH = 260, SLAB = 20
const ELEV = { x0: 40, x1: 140, cx: 90 }
const STAIR = { x0: 820, x1: 920 }
const ROOM = { x0: 140, x1: 820 }
const NFLOORS = 2
const FLOOR_NAMES = ['Tầng 1 · Pantry', 'Tầng 2 · Phòng IT']
const surface = (f) => -f * FH
const ceiling = (f) => surface(f) - FH + SLAB
const WALK_MIN = 60, WALK_MAX = 905
const SPEED = 170

// ============ CANVAS ============
const canvas = document.getElementById('c')
const ctx = canvas.getContext('2d')
let dpr = 1, zoom = 1, mobile = false
const cam = { x: 0, y: -300 }
function resize() {
  dpr = Math.min(2, window.devicePixelRatio || 1)
  canvas.width = Math.round(innerWidth * dpr)
  canvas.height = Math.round(innerHeight * dpr)
  mobile = innerWidth < 700
  zoom = mobile ? Math.max(0.62, Math.min(1.25, innerWidth / 470)) : Math.min(innerWidth / 1060, (innerHeight - 140) / (NFLOORS * FH + 230))
}
addEventListener('resize', resize)
resize()

const rr = (x, y, w, h, r) => {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
}
function fs(fill, stroke = darken(fill), lw = 3) {
  ctx.fillStyle = fill
  ctx.fill()
  if (stroke) {
    ctx.strokeStyle = stroke
    ctx.lineWidth = lw
    ctx.lineJoin = 'round'
    ctx.stroke()
  }
}
function circle(x, y, r) {
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
}
function shadow(x, y, rx, a = 0.18) {
  ctx.fillStyle = `rgba(70,45,25,${a})`
  ctx.beginPath()
  ctx.ellipse(x, y, rx, rx * 0.22, 0, 0, Math.PI * 2)
  ctx.fill()
}
// nét có viền: vẽ nét dày màu viền rồi nét mảnh màu chính
function limb(x1, y1, x2, y2, w, color) {
  ctx.lineCap = 'round'
  ctx.strokeStyle = darken(color, 0.5)
  ctx.lineWidth = w + 5
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
  ctx.strokeStyle = color
  ctx.lineWidth = w
  ctx.stroke()
}

// ============ THỜI GIAN TRONG NGÀY ============
const TIMES = {
  'Sáng': { top: '#9fd0e3', bottom: '#fbe8c6', far: '#c9d6d9', mid: '#aac0c4', near: '#8da5a9', beam: 'rgba(255,236,190,0.22)', tint: null, night: false, sun: '#fff1c4', sunY: 0.25 },
  'Trưa': { top: '#79c0e6', bottom: '#e6f3f1', far: '#c3d3d8', mid: '#a4bcc3', near: '#86a0a7', beam: 'rgba(255,255,235,0.18)', tint: null, night: false, sun: '#ffffff', sunY: 0.1 },
  'Chiều': { top: '#ee9f66', bottom: '#fbd99a', far: '#d8a988', mid: '#c18b70', near: '#a06d58', beam: 'rgba(255,170,90,0.26)', tint: 'rgba(255,140,60,0.07)', night: false, sun: '#ffe0a0', sunY: 0.45 },
  'Tối': { top: '#1c2440', bottom: '#433f62', far: '#353b5a', mid: '#2a2f4a', near: '#20243a', beam: null, tint: 'rgba(18,22,58,0.42)', night: true, sun: '#f4f0dc', sunY: 0.18 },
}
let timeKey = 'Sáng'
const timebar = document.getElementById('timebar')
for (const k of Object.keys(TIMES)) {
  const b = document.createElement('button')
  b.textContent = k
  b.onclick = () => {
    timeKey = k
    for (const x of timebar.children) x.setAttribute('aria-pressed', String(x.textContent === k))
    document.querySelector('#clock .time').textContent = { 'Sáng': '09:24', 'Trưa': '12:10', 'Chiều': '16:40', 'Tối': '20:05' }[k]
  }
  timebar.appendChild(b)
}
timebar.children[0].setAttribute('aria-pressed', 'true')

// ============ NHÂN VẬT ============
function makePerson(id, floor, x, opts = {}) {
  return { id, look: PEOPLE[id], floor, x, y: surface(floor), facing: opts.facing ?? 1, pose: opts.pose ?? 'stand', act: opts.act ?? null, vx: 0, phase: Math.random() * 6, blink: 2 + Math.random() * 3, blinkT: 0, hair: 0, mood: opts.mood ?? 'ok', carry: false, alert: false, wave: 0, hidden: false }
}
const player = makePerson('self', 1, 250)
const npcs = [
  makePerson('it_dev', 1, 400, { pose: 'sit', act: 'type' }),
  makePerson('intern', 1, 572, { pose: 'sit', act: 'phone' }),
  makePerson('admin', 0, 660, { facing: -1, act: 'sip' }),
]
npcs[0].alert = true

function drawPerson(p, t) {
  if (p.hidden) return
  const L = p.look
  const moving = Math.abs(p.vx) > 5
  const walkSpeed = Math.min(1, Math.abs(p.vx) / SPEED)
  const ph = p.phase
  const sit = p.pose === 'sit'
  // squash & stretch + nhún khi đi
  const bob = moving ? -Math.abs(Math.sin(ph)) * 6 * walkSpeed : Math.sin(t * 2 + p.x) * 1.2
  const squash = moving ? 1 + Math.cos(ph * 2) * 0.035 * walkSpeed : 1 + Math.sin(t * 2 + p.x) * 0.012
  const lean = moving ? 0.08 * walkSpeed : 0

  ctx.save()
  ctx.translate(p.x, p.y)
  if (!sit) shadow(0, 0, 26)
  ctx.scale(p.facing, 1)

  const hipY = sit ? -44 : -46
  // chân
  if (sit) {
    limb(-2, hipY, 26, hipY + 2, 12, L === PEOPLE.self ? P.pants : P.pants)
    limb(26, hipY + 2, 28, -6, 11, P.pants)
    rr(22, -9, 18, 9, 4)
    fs(P.shoe)
  } else {
    const a = moving ? Math.sin(ph) * 0.55 * walkSpeed : 0
    for (const [s, col] of [[-1, darken(P.pants, 0.18)], [1, P.pants]]) {
      const ang = a * s
      const fx = Math.sin(ang) * 40
      const fy = hipY + Math.cos(ang) * 42 - (moving && Math.sin(ph * s) > 0 ? Math.sin(ph * s) * 5 : 0)
      limb(0, hipY, fx, fy, 12, col)
      rr(fx - 6, fy - 4, 18, 9, 4)
      fs(P.shoe)
    }
  }

  ctx.translate(0, bob)
  ctx.rotate(lean)
  ctx.scale(1 / squash, squash)

  // tay sau
  const armSwing = moving ? -Math.sin(ph) * 0.6 * walkSpeed : 0
  const shoulderY = -76
  const armBack = () => {
    let ang = sit ? -1.1 : armSwing + 0.1
    if (p.act === 'type') ang = -1.25 + Math.sin(t * 14 + 1) * 0.08
    const bx = -2 + Math.sin(-ang) * 30, by = shoulderY + Math.cos(ang) * 30
    limb(-2, shoulderY, bx, by, 9, darken(L.shirt, 0.15))
  }
  armBack()

  // thân hình hạt đậu
  rr(-18, -86, 36, 46, 17)
  fs(L.shirt, darken(L.shirt, 0.5))
  // nếp áo
  ctx.strokeStyle = darken(L.shirt, 0.22)
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(4, -78)
  ctx.quadraticCurveTo(8, -62, 4, -46)
  ctx.stroke()

  // đầu
  const headY = -104
  const hairLag = p.hair
  // tóc sau (tóc dài có quán tính)
  if (L.look === 'longhair') {
    ctx.save()
    ctx.translate(-6, headY - 4)
    ctx.rotate(hairLag * 0.6)
    rr(-16, -6, 22, 46, 10)
    fs(L.hair)
    ctx.restore()
  }
  circle(2, headY, 22)
  fs(P.skin, darken(P.skin, 0.45))
  circle(-10, headY + 2, 5) // tai
  fs(P.skinShade, darken(P.skin, 0.45), 2.5)
  // tóc trên
  ctx.save()
  ctx.beginPath()
  if (L.look === 'spiky') {
    ctx.moveTo(-20, headY - 2)
    for (let i = 0; i < 6; i++) ctx.lineTo(-18 + i * 7, headY - 26 - (i % 2) * 8 + hairLag * 10)
    ctx.lineTo(22, headY - 8)
    ctx.quadraticCurveTo(4, headY - 16, -20, headY - 2)
  } else {
    ctx.moveTo(-21, headY + 2)
    ctx.quadraticCurveTo(-20, headY - 26, 4, headY - 24)
    ctx.quadraticCurveTo(24, headY - 22, 24, headY - 6)
    ctx.quadraticCurveTo(10, headY - 14 + hairLag * 6, -8, headY - 10)
    ctx.quadraticCurveTo(-14, headY - 6, -21, headY + 2)
  }
  fs(L.hair, darken(L.hair, 0.4))
  ctx.restore()
  if (L.look === 'headset') {
    ctx.strokeStyle = '#2b2b30'
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.arc(2, headY, 25, Math.PI * 1.05, Math.PI * 1.95)
    ctx.stroke()
    rr(-14, headY - 8, 10, 16, 4)
    fs('#3a3a42', '#1c1c20', 2.5)
    ctx.strokeStyle = '#2b2b30'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(-8, headY + 6)
    ctx.quadraticCurveTo(0, headY + 20, 12, headY + 16)
    ctx.stroke()
  }

  // mặt: mắt chớp, lông mày theo tâm trạng, má hồng
  p.blinkT -= 1 / 60
  const blinking = p.blinkT < 0 && p.blinkT > -0.12
  if (p.blinkT < -0.12) p.blinkT = p.blink + Math.random() * 3
  const eyeH = blinking ? 0.6 : 4.2
  ctx.fillStyle = P.ink
  for (const ex of [8, 17]) {
    ctx.beginPath()
    ctx.ellipse(ex, headY - 2, 2.6, eyeH, 0, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.strokeStyle = darken(L.hair, 0.2)
  ctx.lineWidth = 2.6
  ctx.lineCap = 'round'
  const browTilt = p.mood === 'stress' ? 3 : p.mood === 'happy' ? -2 : 0
  ctx.beginPath()
  ctx.moveTo(5, headY - 10 - browTilt)
  ctx.lineTo(11, headY - 11 + browTilt)
  ctx.moveTo(14, headY - 11 + browTilt)
  ctx.lineTo(20, headY - 10 - browTilt)
  ctx.stroke()
  circle(19, headY + 7, 4)
  ctx.fillStyle = P.blush
  ctx.fill()
  ctx.strokeStyle = darken(P.skin, 0.5)
  ctx.lineWidth = 2.4
  ctx.beginPath()
  if (p.mood === 'happy') ctx.arc(13, headY + 7, 5, 0.15 * Math.PI, 0.85 * Math.PI)
  else ctx.arc(13, headY + 12, 4, 1.2 * Math.PI, 1.8 * Math.PI)
  ctx.stroke()

  // cà vạt / chi tiết áo
  if (L.look === 'vest') {
    rr(2, -84, 6, 22, 2)
    fs(P.tomato)
  }

  // tay trước (sau thân và đầu để đè lên)
  let ang = sit ? -1.15 : -armSwing + 0.1
  if (p.act === 'type') ang = -1.2 + Math.sin(t * 14) * 0.08
  if (p.act === 'phone') ang = -2.1
  if (p.act === 'sip') ang = -1.9 + Math.sin(t * 1.3) * 0.25
  if (p.carry) ang = -1.45
  if (p.wave > 0) ang = -2.7 + Math.sin(t * 12) * 0.35
  const fx = 4 + Math.sin(-ang) * 30
  const fy = shoulderY + Math.cos(ang) * 30
  limb(4, shoulderY, fx, fy, 9, L.shirt)
  circle(fx, fy, 6)
  fs(P.skin, darken(P.skin, 0.45), 2.5)
  if (p.act === 'phone') {
    rr(fx - 5, fy - 14, 11, 18, 3)
    fs('#2b2b30', '#151518', 2)
    rr(fx - 3, fy - 12, 7, 13, 2)
    fs('#9ee0c9', null)
  }
  if (p.act === 'sip') {
    rr(fx - 4, fy - 12, 10, 13, 3)
    fs('#ffffff', P.steelDark, 2.5)
  }
  if (p.carry) {
    // ly mì cầm trên tay, bốc khói
    ctx.save()
    ctx.translate(fx + 6, fy - 6)
    ctx.beginPath()
    ctx.moveTo(-10, -14)
    ctx.lineTo(10, -14)
    ctx.lineTo(7, 6)
    ctx.lineTo(-7, 6)
    ctx.closePath()
    fs('#f4f0e6', '#9a8f7c', 2.5)
    rr(-10, -8, 20, 6, 2)
    fs(P.tomato, null)
    ctx.restore()
  }
  ctx.restore()
}

// ============ ĐỒ VẬT & TƯƠNG TÁC ============
const OBJECTS = [
  { id: 'counter', floor: 0, x0: 160, x1: 330, standX: 300, label: 'Quầy pantry' },
  { id: 'water', floor: 0, x0: 430, x1: 470, standX: 412, label: 'Cây nước' },
  { id: 'toilet', floor: 0, x0: 730, x1: 800, standX: 712, label: 'Toilet' },
  { id: 'printer', floor: 1, x0: 745, x1: 800, standX: 728, label: 'Máy in' },
  { id: 'server', floor: 1, x0: 668, x1: 722, standX: 652, label: 'Tủ server' },
  { id: 'mydesk', floor: 1, x0: 200, x1: 300, standX: 196, label: 'Bàn của bạn' },
]
const quest = { stage: 'offer' } // offer → fetch → deliver → done
let morale = 72, wallet = 500

// ============ ĐƯỜNG ĐI (thang máy / cầu thang) ============
const elevator = { y: surface(1), floor: 1, state: 'idle', doors: 0, timer: 0, target: 1, rider: false, bounce: 0 }

function planRoute(toFloor, toX) {
  if (toFloor === player.floor) return { segs: [{ type: 'walk', x: toX }], via: null }
  const dF = Math.abs(toFloor - player.floor)
  const up = toFloor > player.floor
  const elevCost = Math.abs(player.x - ELEV.cx) / SPEED + 2.2 + dF * 1.2 + Math.abs(ELEV.cx - toX) / SPEED
  const sIn = up ? STAIR.x0 + 14 : STAIR.x1 - 14
  const sOut = up ? STAIR.x1 - 14 : STAIR.x0 + 14
  const stairCost = Math.abs(player.x - sIn) / SPEED + dF * 2.0 + Math.abs(sOut - toX) / SPEED
  if (elevCost <= stairCost) return { segs: [{ type: 'walk', x: ELEV.cx }, { type: 'elevator', to: toFloor }, { type: 'walk', x: toX }], via: 'elevator' }
  const segs = [{ type: 'walk', x: sIn }]
  for (let f = player.floor; f !== toFloor; f += up ? 1 : -1) segs.push({ type: 'stairs', from: f, to: f + (up ? 1 : -1) })
  segs.push({ type: 'walk', x: toX })
  return { segs, via: 'stairs' }
}

const route = { segs: [], seg: null, goal: null, pending: null, t: 0 }
let marker = null

function goTo(floor, x, goal = null) {
  x = Math.max(WALK_MIN, Math.min(WALK_MAX, x))
  marker = { floor, x, t: 0 }
  if (route.seg && (route.seg.type === 'elevator' || route.seg.type === 'stairs')) {
    route.pending = { floor, x, goal }
    return
  }
  const { segs, via } = planRoute(floor, x)
  route.segs = segs
  route.goal = goal
  hideActions()
  hideBubble()
  setObjectiveHint(via === 'elevator' ? 'Ra thang máy…' : via === 'stairs' ? 'Đi cầu thang cho nhanh' : null)
  nextSeg()
}

function nextSeg() {
  route.seg = route.segs.shift() || null
  const s = route.seg
  if (!s) {
    player.vx = 0
    if (route.pending) {
      const p = route.pending
      route.pending = null
      goTo(p.floor, p.x, p.goal)
      return
    }
    setObjectiveHint(null)
    marker = null
    const g = route.goal
    route.goal = null
    if (g) arrive(g)
    return
  }
  if (s.type === 'stairs') route.t = 0
  if (s.type === 'elevator') {
    elevator.state = 'called'
    elevator.timer = 0.6 + Math.random() * 1.4
    elevator.target = s.to
    setObjectiveHint(`Chờ thang máy… (thang đang ở tầng ${elevator.floor + 1})`)
  }
}

function update(dt, t) {
  const s = route.seg
  player.vx *= 0.8
  if (s && s.type === 'walk') {
    const d = s.x - player.x
    if (Math.abs(d) < 2) {
      player.x = s.x
      nextSeg()
    } else {
      player.facing = Math.sign(d)
      const v = Math.sign(d) * Math.min(SPEED, Math.abs(d) * 6)
      player.vx = v
      player.x += v * dt
    }
  }
  if (s && s.type === 'stairs') {
    route.t += dt / 2.0
    const k = Math.min(1, route.t)
    const up = s.to > s.from
    const xa = up ? STAIR.x0 + 14 : STAIR.x1 - 14
    const xb = up ? STAIR.x1 - 14 : STAIR.x0 + 14
    player.x = xa + (xb - xa) * k
    player.y = surface(s.from) + (surface(s.to) - surface(s.from)) * k
    player.facing = Math.sign(xb - xa)
    player.vx = player.facing * SPEED * 0.6
    if (k >= 1) {
      player.floor = s.to
      nextSeg()
    }
  } else if (!(s && s.type === 'elevator')) player.y = surface(player.floor)

  // thang máy
  const e = elevator
  const moveCab = (ty) => {
    const d = ty - e.y
    e.y += Math.sign(d) * Math.min(Math.abs(d), (FH / 1.2) * dt)
    return Math.abs(ty - e.y) < 0.5
  }
  if (e.state === 'called') {
    e.timer -= dt
    if (moveCab(surface(player.floor)) && e.timer <= 0) {
      e.floor = player.floor
      e.state = 'open_pickup'
      setObjectiveHint('Ting! Thang tới.')
    }
  } else if (e.state === 'open_pickup' || e.state === 'open_drop') {
    e.doors = Math.min(1, e.doors + dt * 2.6)
    if (e.doors >= 1) {
      if (e.state === 'open_pickup') {
        // bước vào cabin
        player.x += (ELEV.cx - player.x) * 0.3
        e.rider = true
        player.hidden = true
        e.state = 'close_ride'
      } else {
        player.hidden = false
        e.rider = false
        player.floor = e.floor
        player.y = surface(e.floor)
        e.state = 'close_idle'
        nextSeg()
      }
    }
  } else if (e.state === 'close_ride' || e.state === 'close_idle') {
    e.doors = Math.max(0, e.doors - dt * 2.6)
    if (e.doors <= 0) {
      e.bounce = 1
      if (e.state === 'close_ride') {
        e.state = 'ride'
        setObjectiveHint(`Thang đang ${e.target > e.floor ? 'lên' : 'xuống'} tầng ${e.target + 1}…`)
      } else e.state = 'idle'
    }
  } else if (e.state === 'ride') {
    if (moveCab(surface(e.target))) {
      e.floor = e.target
      e.bounce = 1
      e.state = 'open_drop'
    }
  }
  e.bounce = Math.max(0, e.bounce - dt * 3)

  // chu kỳ bước + quán tính tóc
  for (const p of [player, ...npcs]) {
    if (Math.abs(p.vx) > 5) {
      const before = Math.sin(p.phase)
      p.phase += dt * 11
      if (Math.sign(Math.sin(p.phase)) !== Math.sign(before) && p.floor === player.floor) dust(p.x - p.facing * 6, p.y)
    }
    p.hair += (-p.vx * 0.004 * p.facing - p.hair) * 0.12
    p.wave = Math.max(0, p.wave - dt)
  }
  // Độ Mixi vẫy khi có việc cho bạn
  const dev = npcs[0]
  if (dev.alert && Math.sin(t * 1.4) > 0.75) dev.wave = 0.3

  // hạt
  for (const q of particles) {
    q.life -= dt
    q.x += q.vx * dt
    q.y += q.vy * dt
  }
  particles = particles.filter((q) => q.life > 0)
  if (player.carry && Math.random() < 0.3) particles.push({ kind: 'steam', x: player.x + player.facing * 34 + (Math.random() - 0.5) * 8, y: player.y - 96, vx: (Math.random() - 0.5) * 8, vy: -26, life: 1.1, max: 1.1, r: 4 })
  if (Math.random() < 0.02) particles.push({ kind: 'steam', x: 300 + Math.random() * 10, y: surface(0) - 110, vx: 2, vy: -20, life: 1.4, max: 1.4, r: 4 }) // ấm nước pantry

  // cuộc sống ngoài phố
  bike.x += bike.v * dt
  if (bike.x > 1600) {
    bike.x = -900 - Math.random() * 1200
    bike.color = ['#e0533d', '#3f8f86', '#f2b33d', '#2f5fa8'][Math.floor(Math.random() * 4)]
  }
  for (const b of birds) {
    b.x += b.v * dt
    if (b.x > 1700) {
      b.x = -800 - Math.random() * 600
      b.y = -700 - Math.random() * 200
    }
  }
}

let particles = []
function dust(x, y) {
  for (let i = 0; i < 3; i++) particles.push({ kind: 'dust', x, y: y - 2, vx: (Math.random() - 0.5) * 40, vy: -10 - Math.random() * 14, life: 0.5, max: 0.5, r: 3 + Math.random() * 3 })
}
const bike = { x: -600, v: 230, color: '#e0533d' }
const birds = [
  { x: -300, y: -760, v: 60 },
  { x: -340, y: -740, v: 60 },
  { x: 400, y: -820, v: 45 },
]

// ============ UI DOM ============
const $ = (id) => document.getElementById(id)
const bubble = $('bubble'), hover = $('hover'), actions = $('actions')
let bubbleAt = null, bubbleSpring = { s: 0, v: 0 }
function showBubble(name, text, floor, x, headY = 130) {
  bubble.innerHTML = `<b>${name}</b>${text}`
  bubbleAt = { floor, x, headY }
  bubbleSpring = { s: 0.4, v: 0 }
}
function hideBubble() { bubbleAt = null }
function showActions(list) {
  actions.innerHTML = ''
  for (const a of list) {
    const b = document.createElement('button')
    b.className = `btn ${a.style ?? ''}`
    b.textContent = a.label
    b.onclick = () => a.run()
    actions.appendChild(b)
  }
  actions.style.display = list.length ? 'flex' : 'none'
}
function hideActions() { actions.style.display = 'none' }
let hint = null
function setObjectiveHint(h) {
  hint = h
  renderObjective()
}
function renderObjective() {
  const o = {
    offer: ['Ghé chỗ Độ Mixi', 'Anh ấy đang vẫy bạn ở tầng 2'],
    fetch: ['Pha mì cho Độ Mixi', 'Xuống quầy pantry ở tầng 1'],
    deliver: ['Mang mì lên cho Độ Mixi', 'Tầng 2 · đừng để nguội'],
    done: ['Rảnh tay rồi', 'Thử cây nước hoặc toilet ở tầng 1'],
  }[quest.stage]
  $('objTitle').textContent = o[0]
  $('objSub').textContent = hint ?? o[1]
  $('objGo').style.display = quest.stage === 'done' ? 'none' : ''
}
$('objGo').onclick = () => {
  if (quest.stage === 'fetch') goTo(0, OBJECTS[0].standX, { obj: OBJECTS[0] })
  else goTo(1, npcs[0].x - 44, { npc: npcs[0] })
}
function floatText(text, floor, x) {
  const s = worldToScreen(x, surface(floor) - 150)
  const el = document.createElement('div')
  el.className = 'float'
  el.textContent = text
  el.style.left = `${s.x}px`
  el.style.top = `${s.y}px`
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 1500)
}
function setStats() {
  $('morale').querySelector('.meter i').style.width = `${morale}%`
  $('wallet').querySelector('.v').textContent = `${wallet}k`
}

function arrive(g) {
  if (g.npc) {
    const n = g.npc
    player.facing = Math.sign(n.x - player.x) || 1
    if (n.id === 'it_dev') {
      if (quest.stage === 'offer') {
        showBubble(n.look.name, 'Ê, đói không code nổi. Xuống pantry pha giúp anh ly mì được không?', n.floor, n.x)
        showActions([
          { label: 'Ok, để em', run: () => { quest.stage = 'fetch'; npcs[0].alert = false; hideActions(); showBubble(n.look.name, 'Đỉnh! Mì ở quầy tầng 1 nhé.', n.floor, n.x); renderObjective() } },
          { label: 'Bận lắm', style: 'ghost', run: () => { hideActions(); showBubble(n.look.name, 'Thôi được… (buồn)', n.floor, n.x) } },
        ])
      } else if (quest.stage === 'deliver') {
        showBubble(n.look.name, 'Mì đây rồi! Cứu một mạng người.', n.floor, n.x)
        showActions([{ label: 'Đưa ly mì', style: 'teal', run: () => { quest.stage = 'done'; player.carry = false; hideActions(); showBubble(n.look.name, 'Mai có bug gì cứ để anh lo.', n.floor, n.x); floatText('+1 thiện cảm', n.floor, n.x); morale = Math.min(100, morale + 5); setStats(); renderObjective(); player.mood = 'happy' } }])
      } else if (quest.stage === 'done') showBubble(n.look.name, 'Đang húp mì. Đừng nói chuyện deadline.', n.floor, n.x)
      else showBubble(n.look.name, 'Mì đâu rồi em ơi?', n.floor, n.x)
    } else if (n.id === 'intern') showBubble(n.look.name, 'Anh ơi… git push --force là gì ạ? Em lỡ bấm rồi.', n.floor, n.x)
    else showBubble(n.look.name, 'Xuống uống nước hả? Hóng drama tầng 3 chưa?', n.floor, n.x)
  } else if (g.obj) {
    const o = g.obj
    const cx = (o.x0 + o.x1) / 2
    if (o.id === 'counter') {
      if (quest.stage === 'fetch') {
        showBubble('Pantry', 'Nước sôi rồi. Ba phút là có mì.', o.floor, cx, 175)
        showActions([{ label: 'Pha mì', run: () => { quest.stage = 'deliver'; player.carry = true; hideActions(); hideBubble(); renderObjective() } }])
      } else showBubble('Pantry', 'Thùng mì còn đầy. Lương thì không.', o.floor, cx, 175)
    } else if (o.id === 'water') {
      showActions([{ label: 'Tán gẫu (+8 tinh thần)', style: 'teal', run: () => { hideActions(); morale = Math.min(100, morale + 8); setStats(); floatText('+8 tinh thần', o.floor, cx) } }])
    } else if (o.id === 'toilet') {
      showActions([{ label: 'Trốn vào lướt TikTok (+10)', style: 'teal', run: () => { hideActions(); morale = Math.min(100, morale + 10); setStats(); floatText('+10 tinh thần', o.floor, cx) } }])
    } else showBubble(o.label, 'Không có việc ở đây. Tạm thời.', o.floor, cx, 175)
  }
}

// ============ CHUỘT / CHẠM ============
function screenToWorld(x, y) { return { x: x / zoom + cam.x, y: y / zoom + cam.y } }
function worldToScreen(x, y) { return { x: (x - cam.x) * zoom, y: (y - cam.y) * zoom } }
function floorAt(y) {
  for (let f = 0; f < NFLOORS; f++) if (y <= surface(f) + SLAB && y > ceiling(f)) return f
  return null
}
function hitTest(w) {
  const f = floorAt(w.y)
  if (f === null) return null
  const pad = 30 / zoom
  for (const n of npcs) if (n.floor === f && Math.abs(w.x - n.x) < 26 + pad / 2 && w.y > surface(f) - 135) return { npc: n, f }
  for (const o of OBJECTS) if (o.floor === f && w.x > o.x0 - pad / 2 && w.x < o.x1 + pad / 2) return { obj: o, f }
  return { floor: f }
}
let ripple = null
let down = null
canvas.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY } })
canvas.addEventListener('pointerup', (e) => {
  if (!down || Math.hypot(e.clientX - down.x, e.clientY - down.y) > 12) return
  const w = screenToWorld(e.clientX, e.clientY)
  const h = hitTest(w)
  if (!h) return
  ripple = { x: w.x, y: surface(h.f ?? h.floor), t: 0 }
  if (h.npc) goTo(h.f, h.npc.x - (h.npc.facing ?? 1) * 50, { npc: h.npc })
  else if (h.obj) goTo(h.f, h.obj.standX, { obj: h.obj })
  else goTo(h.floor, w.x)
})
canvas.addEventListener('pointermove', (e) => {
  if (e.pointerType !== 'mouse') return
  const h = hitTest(screenToWorld(e.clientX, e.clientY))
  const label = h?.npc ? `${h.npc.look.name}${h.npc.alert ? ' · có việc' : ''}` : h?.obj ? h.obj.label : null
  canvas.style.cursor = label ? 'pointer' : h ? 'crosshair' : 'default'
  hover.style.opacity = label ? '1' : '0'
  if (label) {
    hover.textContent = label
    hover.style.left = `${e.clientX}px`
    hover.style.top = `${e.clientY - 14}px`
  }
})

// ============ VẼ MÔI TRƯỜNG ============
// đường chân trời dựng một lần
function makeSkyline(seed, n, wmin, wmax, hmin, hmax) {
  let s = seed
  const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280)
  const out = []
  let x = -1400
  for (let i = 0; i < n; i++) {
    const w = wmin + r() * (wmax - wmin)
    out.push({ x, w, h: hmin + r() * (hmax - hmin), roof: r(), lights: Array.from({ length: 40 }, () => r() > 0.6) })
    x += w + 8 + r() * 20
  }
  return out
}
const skyline = [
  { k: 0.2, color: 'far', data: makeSkyline(4, 40, 80, 160, 250, 620) },
  { k: 0.45, color: 'mid', data: makeSkyline(11, 34, 90, 180, 160, 460) },
]
const clouds = [
  { x: -300, y: -820, s: 1.2 }, { x: 500, y: -900, s: 0.9 }, { x: 1200, y: -760, s: 1.1 },
]

function drawSky(T, t) {
  const vw = innerWidth / zoom, vh = innerHeight / zoom
  const g = ctx.createLinearGradient(0, cam.y, 0, cam.y + vh)
  g.addColorStop(0, T.top)
  g.addColorStop(1, T.bottom)
  ctx.fillStyle = g
  ctx.fillRect(cam.x - 10, cam.y - 10, vw + 20, vh + 20)
  // mặt trời / trăng
  circle(cam.x + vw * 0.78, cam.y + vh * T.sunY, T.night ? 26 : 44)
  ctx.fillStyle = T.sun
  ctx.fill()
  if (!T.night) {
    circle(cam.x + vw * 0.78, cam.y + vh * T.sunY, 70)
    ctx.fillStyle = 'rgba(255,240,200,0.25)'
    ctx.fill()
  }
  // mây
  for (const c of clouds) {
    const x = cam.x * 0.85 + ((c.x + t * 8 * c.s) % 2400) - 600
    ctx.fillStyle = T.night ? 'rgba(90,96,130,0.5)' : 'rgba(255,255,255,0.85)'
    for (const [dx, dy, r] of [[0, 0, 34], [34, -12, 40], [72, 0, 32], [36, 10, 30]]) {
      circle(x + dx * c.s, c.y + dy * c.s, r * c.s)
      ctx.fill()
    }
  }
  // chim
  ctx.strokeStyle = T.night ? 'rgba(200,200,230,0.4)' : 'rgba(59,42,32,0.55)'
  ctx.lineWidth = 2.5
  for (const b of birds) {
    const flap = Math.sin(t * 9 + b.x) * 6
    ctx.beginPath()
    ctx.moveTo(b.x - 9, b.y - flap)
    ctx.quadraticCurveTo(b.x - 4, b.y - 4, b.x, b.y)
    ctx.quadraticCurveTo(b.x + 4, b.y - 4, b.x + 9, b.y - flap)
    ctx.stroke()
  }
  // các lớp nhà cao tầng (xa nhạt dần theo không khí)
  for (const L of skyline) {
    const ox = cam.x * L.k
    ctx.fillStyle = T[L.color]
    for (const b of L.data) {
      const x = b.x + ox
      ctx.beginPath()
      ctx.roundRect(x, 20 - b.h, b.w, b.h + 20, [6, 6, 0, 0])
      ctx.fill()
      if (b.roof > 0.6) ctx.fillRect(x + b.w * 0.4, 20 - b.h - 26, 4, 26)
      if (T.night) {
        ctx.fillStyle = 'rgba(255,210,130,0.7)'
        let i = 0
        for (let wy = 20 - b.h + 18; wy < 0; wy += 26) for (let wx = x + 12; wx < x + b.w - 16; wx += 22) if (b.lights[i++ % 40]) ctx.fillRect(wx, wy, 8, 11)
        ctx.fillStyle = T[L.color]
      }
    }
  }
}

function drawStreet(T, t) {
  const vw = innerWidth / zoom
  // vỉa hè
  ctx.fillStyle = '#d9cdb8'
  ctx.fillRect(cam.x - 20, SLAB - 2, vw + 40, 26)
  ctx.fillStyle = '#b9ab92'
  ctx.fillRect(cam.x - 20, SLAB + 22, vw + 40, 6)
  // đường nhựa
  ctx.fillStyle = '#5a5450'
  ctx.fillRect(cam.x - 20, SLAB + 28, vw + 40, 120)
  ctx.fillStyle = '#efe6d2'
  for (let x = Math.floor((cam.x - 40) / 90) * 90; x < cam.x + vw + 40; x += 90) ctx.fillRect(x, SLAB + 86, 46, 5)
  ctx.fillStyle = '#3a3330'
  ctx.fillRect(cam.x - 20, SLAB + 148, vw + 40, 800)
  // cây bàng + cột đèn trên vỉa hè
  for (const tx of [-180, 1080, 1420]) {
    const sway = Math.sin(t * 1.3 + tx) * 4
    rr(tx - 8, -150, 16, 152, 6)
    fs('#7a5236')
    for (const [dx, dy, r] of [[0, -170, 62], [-48, -140, 44], [46, -138, 46]]) {
      circle(tx + dx + sway, dy, r)
      fs(T.night ? '#2f4a33' : '#5b8f4a', T.night ? '#1e3122' : '#3e6b34', 3)
    }
  }
  for (const lx of [-40, 1220]) {
    rr(lx - 4, -230, 8, 232, 3)
    fs('#4c4f55')
    rr(lx - 4, -236, 40, 10, 4)
    fs('#4c4f55')
    if (T.night) {
      ctx.fillStyle = 'rgba(255,214,140,0.22)'
      ctx.beginPath()
      ctx.moveTo(lx + 22, -226)
      ctx.lineTo(lx + 90, SLAB + 20)
      ctx.lineTo(lx - 46, SLAB + 20)
      ctx.fill()
    }
  }
  // xe Wave chạy ngang có người lái
  const bx = bike.x, by = SLAB + 70
  const wob = Math.sin(t * 20) * 1
  for (const wx of [-30, 34]) {
    circle(bx + wx, by + 22, 15)
    fs('#2b2b30', '#151518', 3)
    circle(bx + wx, by + 22, 5)
    fs(P.steel, null)
  }
  rr(bx - 34, by - 4 + wob, 72, 22, 10)
  fs(bike.color)
  limb(bx - 2, by - 30 + wob, bx + 2, by - 4 + wob, 14, '#3d4352')
  rr(bx - 14, by - 62 + wob, 26, 34, 12)
  fs('#e8dcc4')
  circle(bx + 2, by - 72 + wob, 15)
  fs(bike.color)
  rr(bx + 4, by - 78 + wob, 14, 8, 3)
  fs('#2b2b30', null)
}

function drawBuilding(T, t) {
  const top = surface(NFLOORS) + SLAB
  // tường bao + mái
  rr(ELEV.x0 - 26, top - 30, STAIR.x1 - ELEV.x0 + 52, -top + 30 + SLAB + 4, 10)
  fs(P.facade, P.facadeDark, 4)
  // bồn nước inox, ăng-ten, biển công ty
  rr(700, top - 120, 120, 86, 30)
  fs('#d4d8dc', '#8d949b', 4)
  rr(694, top - 92, 132, 10, 4)
  fs('#b9bec2', '#8d949b', 3)
  for (const lx of [714, 800]) {
    rr(lx, top - 36, 8, 10, 2)
    fs('#8d949b', null)
  }
  ctx.strokeStyle = '#5a5450'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.moveTo(600, top - 30)
  ctx.lineTo(600, top - 140)
  ctx.moveTo(586, top - 120)
  ctx.lineTo(614, top - 120)
  ctx.stroke()
  rr(200, top - 96, 340, 62, 14)
  fs(P.tomato, P.tomatoDark ?? '#a83826', 4)
  ctx.fillStyle = T.night ? '#fff4c0' : '#fff6e6'
  ctx.font = '900 34px "Be Vietnam Pro"'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  if (T.night) {
    ctx.shadowColor = 'rgba(255,220,120,0.9)'
    ctx.shadowBlur = 18
  }
  ctx.fillText('SỐNG SÓT CÔNG SỞ', 370, top - 64)
  ctx.shadowBlur = 0
  for (const lx of [230, 510]) {
    rr(lx, top - 34, 8, 8, 2)
    fs('#5a5450', null)
  }
}

function drawWindow(x0, x1, y0, y1, T, t) {
  const w = x1 - x0, h = y1 - y0
  // bên trong khung: bầu trời + nhà xa (vẽ lại trong vùng cắt)
  ctx.save()
  rr(x0, y0, w, h, 10)
  ctx.clip()
  const g = ctx.createLinearGradient(0, y0, 0, y1)
  g.addColorStop(0, T.top)
  g.addColorStop(1, T.bottom)
  ctx.fillStyle = g
  ctx.fillRect(x0, y0, w, h)
  ctx.fillStyle = T.near
  for (let i = 0; i < 6; i++) {
    const bx = x0 + ((i * 53 + cam.x * 0.3) % (w + 60)) - 30
    ctx.fillRect(bx, y0 + 40 + (i % 3) * 18, 40, h)
    if (T.night) {
      ctx.fillStyle = 'rgba(255,210,130,0.75)'
      for (let wy = y0 + 50 + (i % 3) * 18; wy < y1; wy += 18) ctx.fillRect(bx + 8, wy, 6, 8)
      ctx.fillStyle = T.near
    }
  }
  ctx.restore()
  // khung nhôm + rèm
  rr(x0, y0, w, h, 10)
  ctx.strokeStyle = '#9c968b'
  ctx.lineWidth = 7
  ctx.stroke()
  ctx.fillStyle = '#9c968b'
  ctx.fillRect(x0 + w / 2 - 3, y0, 6, h)
  ctx.fillStyle = T.night ? 'rgba(210,200,180,0.85)' : 'rgba(240,232,214,0.92)'
  for (let x = x0 + 6; x < x0 + w * 0.32; x += 12) {
    rr(x, y0 + 4, 9, h - 8, 3)
    ctx.fill()
  }
}

function lightBeam(x0, x1, y0, floorY, T) {
  if (!T.beam) return
  ctx.fillStyle = T.beam
  ctx.beginPath()
  ctx.moveTo(x0, y0)
  ctx.lineTo(x1, y0)
  ctx.lineTo(x1 + 120, floorY)
  ctx.lineTo(x0 + 60, floorY)
  ctx.closePath()
  ctx.fill()
}

function drawFloorShell(f, T, t) {
  const s = surface(f), c = ceiling(f)
  // tường + giấy dán tường sọc mờ
  ctx.fillStyle = P.wall
  ctx.fillRect(ROOM.x0, c, ROOM.x1 - ROOM.x0, s - c)
  ctx.fillStyle = P.wallStripe
  for (let x = ROOM.x0; x < ROOM.x1; x += 24) ctx.fillRect(x, c, 10, s - c)
  // chân tường xanh ngọc + nẹp
  ctx.fillStyle = P.dado
  ctx.fillRect(ROOM.x0, s - 64, ROOM.x1 - ROOM.x0, 64)
  ctx.fillStyle = P.dadoRail
  ctx.fillRect(ROOM.x0, s - 68, ROOM.x1 - ROOM.x0, 6)
  // sàn gạch caro nhìn nghiêng
  for (let x = ROOM.x0; x < STAIR.x1; x += 28) {
    ctx.fillStyle = ((x / 28) | 0) % 2 ? P.tileB : P.tileA
    ctx.fillRect(x, s - 10, 28, 10)
  }
  // trần + đèn tuýp
  ctx.fillStyle = 'rgba(80,60,40,0.08)'
  ctx.fillRect(ROOM.x0, c, ROOM.x1 - ROOM.x0, 14)
  for (const lx of [300, 620]) {
    rr(lx - 44, c + 2, 88, 10, 5)
    fs(T.night ? '#fffbe8' : '#f4f1ea', '#b9b2a5', 2.5)
    if (T.night) {
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      ctx.fillStyle = 'rgba(255,236,190,0.10)'
      ctx.beginPath()
      ctx.moveTo(lx - 40, c + 12)
      ctx.lineTo(lx + 40, c + 12)
      ctx.lineTo(lx + 150, s)
      ctx.lineTo(lx - 150, s)
      ctx.fill()
      ctx.restore()
    }
  }
  // giếng thang máy (mặt cắt)
  ctx.fillStyle = '#4b403a'
  ctx.fillRect(ELEV.x0, c, ELEV.x1 - ELEV.x0, s - c)
  ctx.fillStyle = '#5d5149'
  ctx.fillRect(ELEV.x0 + 10, c, 4, s - c)
  ctx.fillRect(ELEV.x1 - 14, c, 4, s - c)
  // cầu thang
  ctx.fillStyle = '#e8d6b4'
  ctx.fillRect(STAIR.x0, c, STAIR.x1 - STAIR.x0, s - c)
  ctx.fillStyle = 'rgba(80,60,40,0.12)'
  ctx.fillRect(STAIR.x0, c, 6, s - c)
  // bản thang chéo + bậc
  ctx.beginPath()
  ctx.moveTo(STAIR.x0 + 4, s)
  ctx.lineTo(STAIR.x1 - 4, c + 4)
  ctx.lineTo(STAIR.x1 - 4, c + 30)
  ctx.lineTo(STAIR.x0 + 30, s)
  ctx.closePath()
  fs(P.wood, darken(P.wood, 0.45), 3)
  ctx.strokeStyle = darken(P.wood, 0.3)
  ctx.lineWidth = 2
  for (let i = 1; i < 12; i++) {
    const k = i / 12
    const x = STAIR.x0 + 4 + (STAIR.x1 - STAIR.x0 - 8) * k
    const y = s - (s - c - 4) * k
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + 14, y)
    ctx.stroke()
  }
  ctx.strokeStyle = '#6f675c'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.moveTo(STAIR.x0 + 4, s - 60)
  ctx.lineTo(STAIR.x1 - 4, c - 56)
  ctx.stroke()
  // sàn bê tông
  rr(ELEV.x0 - 16, s, STAIR.x1 - ELEV.x0 + 32, SLAB, 4)
  fs(P.slab, P.slabDark, 3)
  // biển tên tầng
  rr(ROOM.x0 + 14, c + 26, 118, 30, 8)
  fs(P.cream, P.ink, 2.5)
  ctx.fillStyle = P.ink
  ctx.font = '800 15px "Be Vietnam Pro"'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  ctx.fillText(FLOOR_NAMES[f].split(' · ')[1], ROOM.x0 + 44, c + 41)
  circle(ROOM.x0 + 30, c + 41, 10)
  fs(P.tomato, null)
  ctx.fillStyle = '#fff'
  ctx.textAlign = 'center'
  ctx.fillText(String(f + 1), ROOM.x0 + 30, c + 42)
}

function desk(x, s, seed, t, withChair = true, occupied = false) {
  if (withChair) {
    // ghế xoay
    rr(x - 70, s - 74, 12, 60, 6)
    fs('#3a3a42', '#1f1f24', 2.5)
    rr(x - 76, s - 50, 46, 10, 5)
    fs('#3a3a42', '#1f1f24', 2.5)
    ctx.fillStyle = '#5c6268'
    ctx.fillRect(x - 56, s - 40, 6, 30)
    rr(x - 74, s - 12, 42, 6, 3)
    fs('#5c6268', null)
  }
  shadow(x + 40, s, 70, 0.12)
  // mặt bàn + chân
  rr(x - 20, s - 76, 130, 12, 5)
  fs(P.woodLight, darken(P.woodLight, 0.4), 3)
  rr(x - 14, s - 64, 8, 62, 3)
  fs(P.wood, darken(P.wood, 0.4), 2.5)
  rr(x + 96, s - 64, 8, 62, 3)
  fs(P.wood, darken(P.wood, 0.4), 2.5)
  // màn hình quay về phía người ngồi
  rr(x + 30, s - 136, 64, 46, 8)
  fs('#2b2b30', '#151518', 3)
  rr(x + 36, s - 130, 52, 34, 4)
  fs(P.screen, null)
  const line = Math.floor(t * 3 + seed) % 5
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = i === line ? P.mustard : P.glow
    ctx.fillRect(x + 40, s - 126 + i * 6, 10 + ((i * 7 + seed * 3 + line) % 28), 3)
  }
  rr(x + 56, s - 90, 12, 14, 3)
  fs('#2b2b30', '#151518', 2.5)
  rr(x + 10, s - 82, 34, 6, 3)
  fs('#4a4d55', '#2b2b30', 2) // bàn phím
  rr(x + 100, s - 92, 14, 16, 4)
  fs(seed % 2 ? '#fff6e6' : P.mustard, P.ink, 2.5) // cốc
}

function drawIT(T, t) {
  const s = surface(1), c = ceiling(1)
  drawWindow(190, 330, c + 66, c + 150, T, t)
  drawWindow(450, 590, c + 66, c + 150, T, t)
  lightBeam(190, 330, c + 150, s, T)
  lightBeam(450, 590, c + 150, s, T)
  // bảng trắng
  rr(350, c + 72, 82, 60, 6)
  fs('#fbfbf6', '#8d949b', 4)
  ctx.strokeStyle = '#2f5fa8'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(360, c + 88)
  ctx.lineTo(404, c + 88)
  ctx.moveTo(360, c + 100)
  ctx.lineTo(392, c + 100)
  ctx.stroke()
  ctx.strokeStyle = P.tomato
  ctx.beginPath()
  ctx.ellipse(408, c + 112, 16, 8, -0.1, 0, Math.PI * 2)
  ctx.stroke()
  rr(410, c + 76, 18, 16, 2)
  fs(P.mustard, null)
  // đồng hồ tường chạy thật
  circle(640, c + 96, 22)
  fs('#fff6e6', P.ink, 4)
  ctx.strokeStyle = P.ink
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(640, c + 96)
  ctx.lineTo(640 + Math.sin(t * 0.05) * 12, c + 96 - Math.cos(t * 0.05) * 12)
  ctx.moveTo(640, c + 96)
  ctx.lineTo(640 + Math.sin(t * 0.6) * 17, c + 96 - Math.cos(t * 0.6) * 17)
  ctx.stroke()
  // bàn làm việc (bàn của bạn trống ghế)
  desk(250, s, 1, t)
  desk(445, s, 4, t)
  desk(617, s, 7, t)
  // tủ server LED nháy
  shadow(695, s, 34, 0.14)
  rr(668, s - 200, 54, 198, 6)
  fs('#33363c', '#16181b', 3)
  for (let i = 0; i < 8; i++) {
    rr(674, s - 192 + i * 23, 42, 17, 3)
    fs('#43474e', null)
    circle(682, s - 184 + i * 23, 3)
    ctx.fillStyle = Math.sin(t * (2 + i) + i * 1.7) > 0 ? '#7dffb0' : '#244a35'
    ctx.fill()
  }
  // máy in
  shadow(772, s, 34, 0.14)
  rr(745, s - 70, 56, 68, 8)
  fs('#e3e0d8', '#9a958b', 3)
  rr(745, s - 92, 56, 24, 6)
  fs('#cfcbc1', '#9a958b', 3)
  rr(754, s - 100, 38, 10, 2)
  fs('#ffffff', '#9a958b', 2)
  circle(790, s - 80, 3)
  ctx.fillStyle = '#7dffb0'
  ctx.fill()
  // cây kim tiền
  plant(162, s, t)
}

function plant(x, s, t) {
  shadow(x, s, 22, 0.14)
  ctx.beginPath()
  ctx.moveTo(x - 18, s - 40)
  ctx.lineTo(x + 18, s - 40)
  ctx.lineTo(x + 13, s)
  ctx.lineTo(x - 13, s)
  ctx.closePath()
  fs(P.pot, darken(P.pot, 0.45), 3)
  for (let i = 0; i < 5; i++) {
    const a = -1.2 + i * 0.6 + Math.sin(t * 1.5 + i) * 0.06
    ctx.save()
    ctx.translate(x, s - 40)
    ctx.rotate(a)
    ctx.beginPath()
    ctx.ellipse(0, -34, 9, 26, 0, 0, Math.PI * 2)
    fs(i % 2 ? P.plant : P.plantDark, darken(P.plantDark, 0.3), 2.5)
    ctx.restore()
  }
}

function drawPantry(T, t) {
  const s = surface(0), c = ceiling(0)
  drawWindow(170, 330, c + 60, c + 140, T, t)
  drawWindow(500, 640, c + 60, c + 140, T, t)
  lightBeam(170, 330, c + 140, s, T)
  lightBeam(500, 640, c + 140, s, T)
  // quầy bếp + lò vi sóng + thùng mì + ấm siêu tốc
  shadow(245, s, 100, 0.12)
  rr(160, s - 82, 172, 80, 6)
  fs(P.wood, darken(P.wood, 0.45), 3)
  rr(156, s - 90, 180, 12, 5)
  fs('#efe9dc', '#a89f8c', 3)
  for (const dx of [178, 238, 298]) {
    rr(dx, s - 70, 4, 18, 2)
    fs('#6b4a32', null)
  }
  rr(170, s - 140, 64, 50, 8)
  fs('#e3e0d8', '#9a958b', 3)
  rr(178, s - 132, 38, 34, 4)
  fs('#2b2b30', null)
  rr(244, s - 128, 46, 38, 4)
  fs(P.mustard, darken(P.mustard, 0.45), 3)
  rr(244, s - 116, 46, 10, 0)
  fs(P.tomato, null)
  rr(296, s - 124, 26, 34, 10)
  fs('#f4f1ea', '#9a958b', 3)
  if (quest.stage === 'fetch') {
    // vòng sáng nhắc chỗ cần tới
    circle(265, s - 160, 14 + Math.sin(t * 5) * 3)
    fs(P.mustard, P.ink, 3)
    ctx.fillStyle = P.ink
    ctx.font = '900 18px "Be Vietnam Pro"'
    ctx.textAlign = 'center'
    ctx.fillText('!', 265, s - 159)
  }
  // tủ lạnh có nam châm
  shadow(380, s, 34, 0.14)
  rr(352, s - 176, 58, 174, 10)
  fs('#f1eee7', '#a8a296', 3)
  ctx.fillStyle = '#a8a296'
  ctx.fillRect(352, s - 112, 58, 3)
  rr(398, s - 160, 5, 32, 2)
  fs('#a8a296', null)
  rr(362, s - 166, 16, 14, 2)
  fs(P.mustard, null)
  rr(382, s - 150, 12, 12, 2)
  fs('#f4a7a0', null)
  // cây nước Lavie
  shadow(450, s, 26, 0.14)
  rr(430, s - 120, 40, 118, 8)
  fs('#f4f1ea', '#a8a296', 3)
  rr(434, s - 170, 32, 50, 12)
  fs('rgba(150,205,235,0.85)', '#5b9cc6', 3)
  rr(440, s - 176, 20, 8, 3)
  fs('#2f6fb5', null)
  circle(442, s - 96, 4)
  fs(P.tomato, null)
  circle(458, s - 96, 4)
  fs('#2f6fb5', null)
  if (Math.sin(t * 2.3) > 0.97) particles.push({ kind: 'bubble', x: 450, y: s - 128, vx: 0, vy: -30, life: 0.8, max: 0.8, r: 3 })
  // bàn ăn + ghế nhựa đỏ
  shadow(560, s, 70, 0.12)
  rr(510, s - 70, 104, 10, 5)
  fs(P.woodLight, darken(P.woodLight, 0.4), 3)
  rr(520, s - 60, 7, 58, 3)
  fs(P.wood, null)
  rr(597, s - 60, 7, 58, 3)
  fs(P.wood, null)
  for (const sx of [490, 620]) {
    rr(sx, s - 42, 32, 8, 3)
    fs(P.tomato, darken(P.tomato, 0.45), 2.5)
    ctx.strokeStyle = darken(P.tomato, 0.2)
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(sx + 4, s - 34)
    ctx.lineTo(sx, s)
    ctx.moveTo(sx + 28, s - 34)
    ctx.lineTo(sx + 32, s)
    ctx.stroke()
  }
  // cửa toilet
  rr(730, s - 184, 70, 182, 6)
  fs('#4f8a77', '#2f5a4d', 4)
  rr(740, s - 174, 50, 164, 4)
  fs(P.dado, '#5f9184', 2.5)
  rr(748, s - 160, 34, 22, 4)
  fs(P.cream, P.ink, 2)
  ctx.fillStyle = '#2f6fb5'
  circle(758, s - 152, 3)
  ctx.fill()
  ctx.fillRect(756, s - 149, 4, 8)
  ctx.fillStyle = P.tomato
  circle(772, s - 152, 3)
  ctx.fill()
  ctx.beginPath()
  ctx.moveTo(772, s - 149)
  ctx.lineTo(776, s - 141)
  ctx.lineTo(768, s - 141)
  ctx.fill()
  circle(786, s - 92, 4)
  fs('#d4b25a', '#8a6f2c', 2)
  plant(342, s, t)
}

function drawElevator(T) {
  const e = elevator
  // cáp
  ctx.fillStyle = '#2b2622'
  const roofY = surface(NFLOORS) + SLAB
  ctx.fillRect(ELEV.x0 + 30, roofY, 3, e.y - 150 - roofY)
  ctx.fillRect(ELEV.x1 - 33, roofY, 3, e.y - 150 - roofY)
  // cabin (nảy nhẹ khi dừng)
  const bounce = Math.sin(e.bounce * Math.PI * 3) * e.bounce * 3
  rr(ELEV.x0 + 8, e.y - 152 + bounce, ELEV.x1 - ELEV.x0 - 16, 150, 8)
  fs('#e9c98e', '#8f6c3c', 3)
  rr(ELEV.x0 + 16, e.y - 144 + bounce, ELEV.x1 - ELEV.x0 - 32, 10, 4)
  fs('#fff3cf', null)
  if (e.rider) {
    const ghost = { ...player, hidden: false, x: ELEV.cx, y: e.y + bounce, vx: 0, facing: 1 }
    drawPerson(ghost, tNow)
  }
  // cửa + bảng số mỗi tầng
  for (let f = 0; f < NFLOORS; f++) {
    const s = surface(f)
    const here = Math.abs(e.y - s) < 1
    const open = here ? e.doors : 0
    const half = 38 * (1 - easeOut(open))
    rr(ELEV.cx - 44, s - 164, 88, 162, 6)
    ctx.strokeStyle = P.steelDark
    ctx.lineWidth = 6
    ctx.stroke()
    ctx.fillStyle = '#c6cacd'
    ctx.fillRect(ELEV.cx - 40, s - 160, half, 158)
    ctx.fillRect(ELEV.cx + 40 - half, s - 160, half, 158)
    ctx.fillStyle = P.steelDark
    if (half > 2) {
      ctx.fillRect(ELEV.cx - 40 + half - 2, s - 160, 2, 158)
      ctx.fillRect(ELEV.cx + 40 - half, s - 160, 2, 158)
    }
    rr(ELEV.cx - 22, s - 196, 44, 24, 6)
    fs('#2b2622', '#151210', 2.5)
    ctx.fillStyle = '#ffae5c'
    ctx.font = '800 16px "Be Vietnam Pro"'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const moving = e.state === 'ride' || e.state === 'called'
    ctx.fillText(`${moving ? (e.target > e.floor || (e.state === 'called' && surface(player.floor) < e.y) ? '▲' : '▼') : ''}${e.floor + 1}`, ELEV.cx, s - 183)
  }
}

const easeOut = (x) => 1 - Math.pow(1 - x, 3)

function drawParticles() {
  for (const q of particles) {
    const a = q.life / q.max
    if (q.kind === 'dust') ctx.fillStyle = `rgba(190,170,140,${a * 0.7})`
    else if (q.kind === 'bubble') ctx.fillStyle = `rgba(255,255,255,${a})`
    else ctx.fillStyle = `rgba(255,255,255,${a * 0.6})`
    circle(q.x, q.y, q.r * (q.kind === 'steam' ? 2 - a : 1))
    ctx.fill()
  }
}

function drawMarker(t) {
  if (ripple) {
    ripple.t += 1 / 60
    const k = ripple.t / 0.5
    if (k > 1) ripple = null
    else {
      ctx.strokeStyle = `rgba(63,143,134,${1 - k})`
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.ellipse(ripple.x, ripple.y - 2, 10 + k * 40, (10 + k * 40) * 0.25, 0, 0, Math.PI * 2)
      ctx.stroke()
    }
  }
  if (marker) {
    const s = surface(marker.floor)
    const y = s - 26 - Math.abs(Math.sin(t * 5)) * 10
    ctx.beginPath()
    ctx.moveTo(marker.x - 11, y - 14)
    ctx.lineTo(marker.x + 11, y - 14)
    ctx.lineTo(marker.x, y)
    ctx.closePath()
    fs(P.teal, darken(P.teal, 0.5), 3)
  }
}

function drawAlert(n, t) {
  if (!n.alert) return
  const s = surface(n.floor)
  const y = s - 170 + Math.sin(t * 4) * 4
  rr(n.x - 15, y - 30, 30, 30, 10)
  fs(P.mustard, P.ink, 3)
  ctx.fillStyle = P.ink
  ctx.font = '900 20px "Be Vietnam Pro"'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('!', n.x, y - 14)
  ctx.beginPath()
  ctx.moveTo(n.x - 6, y)
  ctx.lineTo(n.x + 6, y)
  ctx.lineTo(n.x, y + 8)
  fs(P.mustard, P.ink, 3)
}

// ============ CAMERA ============
function updateCamera() {
  const vw = innerWidth / zoom, vh = innerHeight / zoom
  const dock = (mobile ? 150 : 120) / zoom
  let tx, ty
  if (!mobile) {
    tx = (ELEV.x0 + STAIR.x1) / 2 - vw / 2
    const topY = surface(NFLOORS) - 150
    const botY = SLAB + 70
    ty = (topY + botY) / 2 - (vh - dock) / 2 - 10 / zoom
  } else {
    const fy = player.hidden ? elevator.y : player.y
    tx = player.x + player.facing * 40 - vw / 2
    tx = Math.max(ELEV.x0 - 60, Math.min(STAIR.x1 + 60 - vw, tx))
    // sàn tầng đang đứng nằm ở ~3/4 vùng nhìn, thấy được tầng trên
    ty = fy - (vh - dock) * 0.8
  }
  cam.x += (tx - cam.x) * 0.1
  cam.y += (ty - cam.y) * 0.1
}

// ============ VÒNG LẶP ============
let tNow = 0
let last = performance.now()
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000)
  last = now
  tNow += dt
  const T = TIMES[timeKey]
  update(dt, tNow)
  updateCamera()

  ctx.setTransform(dpr * zoom, 0, 0, dpr * zoom, -cam.x * dpr * zoom, -cam.y * dpr * zoom)
  drawSky(T, tNow)
  drawStreet(T, tNow)
  drawBuilding(T, tNow)
  for (let f = 0; f < NFLOORS; f++) drawFloorShell(f, T, tNow)
  drawPantry(T, tNow)
  drawIT(T, tNow)
  drawElevator(T)
  // người: NPC rồi người chơi
  for (const n of npcs) drawPerson(n, tNow)
  // ghế/bàn đè lên chân người ngồi
  for (const n of npcs) if (n.pose === 'sit') {
    const s = surface(n.floor)
    rr(n.x + 25, s - 76, 120, 12, 5)
    fs(P.woodLight, darken(P.woodLight, 0.4), 3)
  }
  drawPerson(player, tNow)
  drawParticles()
  for (const n of npcs) drawAlert(n, tNow)
  drawMarker(tNow)
  if (T.tint) {
    ctx.fillStyle = T.tint
    ctx.fillRect(cam.x - 10, cam.y - 10, innerWidth / zoom + 20, innerHeight / zoom + 20)
  }
  if (T.night) {
    // ánh đèn trong nhà ấm hơn ngoài trời
    ctx.save()
    ctx.globalCompositeOperation = 'lighter'
    ctx.fillStyle = 'rgba(255,200,130,0.07)'
    for (let f = 0; f < NFLOORS; f++) ctx.fillRect(ROOM.x0, ceiling(f), ROOM.x1 - ROOM.x0, FH - SLAB)
    ctx.restore()
  }

  // bong bóng thoại bật lò xo
  if (bubbleAt) {
    bubbleSpring.v += (1 - bubbleSpring.s) * 0.25
    bubbleSpring.v *= 0.72
    bubbleSpring.s += bubbleSpring.v
    const p = worldToScreen(bubbleAt.x, surface(bubbleAt.floor) - bubbleAt.headY - 14)
    const w = bubble.offsetWidth
    const x = Math.max(w / 2 + 8, Math.min(innerWidth - w / 2 - 8, p.x))
    bubble.style.opacity = '1'
    bubble.style.transform = `translate(${x - w / 2}px, ${p.y - bubble.offsetHeight}px) scale(${bubbleSpring.s})`
  } else bubble.style.opacity = '0'

  requestAnimationFrame(frame)
}
renderObjective()
setStats()
document.fonts.ready.then(() => requestAnimationFrame(frame))

window.__toon = { player, npcs, OBJECTS, quest, goTo, elevator, surface }
