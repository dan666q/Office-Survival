// src/scene/textures.ts
// Texture vẽ bằng canvas 2D — không cần file ảnh

import * as THREE from 'three'
import { PALETTE } from './palette'

function makeCanvas(w: number, h: number) {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  return { canvas, ctx }
}

function toTexture(canvas: HTMLCanvasElement, repeat?: [number, number]) {
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  if (repeat) {
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(repeat[0], repeat[1])
  }
  return tex
}

const cache = new Map<string, THREE.Texture>()
function cached(key: string, build: () => THREE.Texture) {
  let t = cache.get(key)
  if (!t) {
    t = build()
    cache.set(key, t)
  }
  return t
}

/** Gạch men caro 2 màu, có ron vữa và vết ố nhẹ */
export function floorTileTexture(repeatX: number, repeatY: number) {
  return cached(`floor-${repeatX}-${repeatY}`, () => {
    const size = 256
    const { canvas, ctx } = makeCanvas(size, size)
    const half = size / 2
    const cells: [number, number, string][] = [
      [0, 0, PALETTE.tileA],
      [half, 0, PALETTE.tileB],
      [0, half, PALETTE.tileB],
      [half, half, PALETTE.tileA],
    ]
    for (const [x, y, c] of cells) {
      ctx.fillStyle = c
      ctx.fillRect(x, y, half, half)
    }
    // vết ố — giả ngẫu nhiên cố định
    let seed = 7
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
    for (let i = 0; i < 70; i++) {
      ctx.fillStyle = `rgba(90,60,30,${0.02 + rnd() * 0.04})`
      ctx.beginPath()
      ctx.arc(rnd() * size, rnd() * size, 2 + rnd() * 10, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.strokeStyle = 'rgba(120,100,80,0.55)'
    ctx.lineWidth = 3
    ctx.strokeRect(0, 0, half, half)
    ctx.strokeRect(half, 0, half, half)
    ctx.strokeRect(0, half, half, half)
    ctx.strokeRect(half, half, half, half)
    return toTexture(canvas, [repeatX, repeatY])
  })
}

/** Màn hình đầy code — mỗi seed ra một màn khác */
export function codeScreenTexture(seed: number, tone: 'code' | 'chart' | 'mail' = 'code') {
  return cached(`screen-${seed}-${tone}`, () => {
    const { canvas, ctx } = makeCanvas(256, 160)
    ctx.fillStyle = PALETTE.screen
    ctx.fillRect(0, 0, 256, 160)
    let s = seed * 9301 + 49297
    const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280)
    if (tone === 'code') {
      const colors = ['#9fd8c6', '#f6d55c', '#f4a7a0', '#cfd8dc', '#8fb3ff']
      for (let y = 10; y < 155; y += 10) {
        let x = 10 + Math.floor(rnd() * 4) * 12
        while (x < 240 && rnd() > 0.15) {
          const w = 10 + rnd() * 40
          ctx.fillStyle = colors[Math.floor(rnd() * colors.length)]
          ctx.globalAlpha = 0.85
          ctx.fillRect(x, y, w, 4)
          x += w + 6
        }
      }
    } else if (tone === 'chart') {
      ctx.fillStyle = '#f2efe8'
      ctx.fillRect(0, 0, 256, 160)
      for (let i = 0; i < 8; i++) {
        const h = 20 + rnd() * 110
        ctx.fillStyle = i % 3 === 0 ? PALETTE.stamp : '#4f8a77'
        ctx.fillRect(20 + i * 28, 150 - h, 18, h)
      }
    } else {
      ctx.fillStyle = '#f2efe8'
      ctx.fillRect(0, 0, 256, 160)
      ctx.fillStyle = '#0a68d8'
      ctx.fillRect(0, 0, 256, 18)
      for (let y = 30; y < 150; y += 16) {
        ctx.fillStyle = '#c9c2b4'
        ctx.fillRect(12, y, 60 + rnd() * 160, 6)
      }
    }
    ctx.globalAlpha = 1
    return toTexture(canvas)
  })
}

/** Bảng trắng với chữ viết tay về sprint */
export function whiteboardTexture() {
  return cached('whiteboard', () => {
    const { canvas, ctx } = makeCanvas(512, 320)
    ctx.fillStyle = '#f7f7f2'
    ctx.fillRect(0, 0, 512, 320)
    ctx.font = '34px "Patrick Hand", cursive'
    ctx.fillStyle = PALETTE.pen
    ctx.fillText('SPRINT 42 — CỐ LÊN!!!', 24, 48)
    ctx.font = '26px "Patrick Hand", cursive'
    ctx.fillStyle = '#2a251e'
    const lines = ['- fix bug login (lần 3)', '- deploy thứ 6?? KHÔNG', '- họp retro 4h chiều', '- ai ăn bánh của chị Hà?']
    lines.forEach((l, i) => ctx.fillText(l, 30, 100 + i * 44))
    ctx.strokeStyle = PALETTE.stamp
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.ellipse(360, 160, 70, 28, -0.1, 0, Math.PI * 2)
    ctx.stroke()
    ctx.fillStyle = PALETTE.stamp
    ctx.font = '28px "Patrick Hand", cursive'
    ctx.fillText('deadline', 312, 168)
    // ghi chú dán
    ctx.fillStyle = PALETTE.note
    ctx.fillRect(400, 220, 80, 70)
    ctx.fillStyle = '#2a251e'
    ctx.font = '20px "Patrick Hand", cursive'
    ctx.fillText('gọi KH', 412, 260)
    return toTexture(canvas)
  })
}

/** Biển tên công ty */
export function companySignTexture() {
  return cached('sign', () => {
    const { canvas, ctx } = makeCanvas(512, 128)
    ctx.fillStyle = PALETTE.stamp
    ctx.fillRect(0, 0, 512, 128)
    ctx.strokeStyle = '#f6d55c'
    ctx.lineWidth = 6
    ctx.strokeRect(10, 10, 492, 108)
    ctx.fillStyle = '#f6d55c'
    ctx.textAlign = 'center'
    ctx.font = '700 40px "Be Vietnam Pro", sans-serif'
    ctx.fillText('CÔNG TY TNHH', 256, 56)
    ctx.font = '800 42px "Be Vietnam Pro", sans-serif'
    ctx.fillText('SỐNG SÓT CÔNG SỞ', 256, 102)
    return toTexture(canvas)
  })
}

/** Lịch bloc: số ngày to, thứ trong tuần. Không cache — đổi theo ngày. */
export function drawCalendar(ctx: CanvasRenderingContext2D, dayNumber: string, weekday: string) {
  ctx.fillStyle = PALETTE.paper
  ctx.fillRect(0, 0, 256, 320)
  ctx.fillStyle = PALETTE.stamp
  ctx.fillRect(0, 0, 256, 60)
  ctx.fillStyle = PALETTE.paper
  ctx.textAlign = 'center'
  ctx.font = '700 30px "Be Vietnam Pro", sans-serif'
  ctx.fillText('THÁNG 10', 128, 42)
  ctx.fillStyle = weekday === 'Thứ Bảy' ? PALETTE.stamp : '#2a251e'
  ctx.font = '800 150px "Be Vietnam Pro", sans-serif'
  ctx.fillText(dayNumber, 128, 220)
  ctx.font = '600 34px "Be Vietnam Pro", sans-serif'
  ctx.fillText(weekday, 128, 280)
}

export function createDynamicTexture(w: number, h: number) {
  const { canvas, ctx } = makeCanvas(w, h)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return { canvas, ctx, tex }
}
