import { useEffect, useRef, useCallback, useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

import homeImg from '../assets/home.png'
import aboutImg from '../assets/about.png'
import techImg from '../assets/tech-stack.png'
import projectsImg from '../assets/projects.png'
import contactImg from '../assets/contact.png'
import drawDeckImg from '../assets/draw-deck.png'
import discardDeckImg from '../assets/discard-deck.png'
import countBadgeImg from '../assets/count-badge.png'

const CARDS = [
  { name: 'Home',       href: '#home',     img: homeImg },
  { name: 'About',      href: '#about',    img: aboutImg },
  { name: 'Tech Stack', href: '#tech',     img: techImg },
  { name: 'Projects',   href: '#projects', img: projectsImg },
  { name: 'Contact',    href: '#contact',  img: contactImg },
] as const

type CardName = (typeof CARDS)[number]['name']

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const CARD_W = 220
const CARD_H = Math.round((CARD_W * 654) / 512) // 255
const CARD_BASE = -40
const HOVER_SHIFT = 48
const PILE_W = 50
const PILE_LEFT = 24
const PILE_CENTER = PILE_LEFT + PILE_W / 2

interface CardLayout {
  name: string
  href: string
  img: string
  cw: number
  ch: number
  base: number
  anchorLeft: number
  x: number
  arcY: number
  rot: number
  shift: number
  z: number
  inHand: boolean
}

function computeLayout(
  containerW: number,
  drawn: number,
  played: CardName[],
  hovered: CardName | null,
): { cards: CardLayout[]; cx: number; pileCenter: number } {
  const spacing = Math.min(106, Math.max(82, containerW / 12))
  const cx = containerW / 2
  const anchorLeft = Math.round(cx - CARD_W / 2)
  const dealt = CARDS.slice(0, drawn)
  const hand = dealt.filter(c => !played.includes(c.name))
  const m = hand.length
  const slot: Partial<Record<CardName, number>> = {}
  hand.forEach((c, i) => { slot[c.name] = i })
  const hoverSlot = hovered != null ? slot[hovered] : undefined

  const cards: CardLayout[] = dealt.map(c => {
    const slotIdx = slot[c.name]
    const inHand = slotIdx !== undefined
    let x = 0, arcY = 0, rot = 0, shift = 0
    if (inHand && slotIdx !== undefined) {
      const off = slotIdx - (m - 1) / 2
      x = Math.round(off * spacing)
      rot = off * 6
      arcY = Math.round(off * off * 15)
      if (hoverSlot !== undefined && slotIdx !== hoverSlot) {
        shift = slotIdx < hoverSlot ? -HOVER_SHIFT : HOVER_SHIFT
      }
    }
    const z = CARDS.findIndex(cc => cc.name === c.name) + 1
    return { ...c, cw: CARD_W, ch: CARD_H, base: CARD_BASE, anchorLeft, x, arcY, rot, shift, z, inHand }
  })

  return { cards, cx, pileCenter: PILE_CENTER }
}

// ---- Card component ----

interface CardProps {
  cd: CardLayout
  fromX: number
  containerW: number
  containerH: number
  onPlay: (name: string) => void
  onDiscard: (name: string) => void
  onHover: (name: string | null) => void
}

function Card({ cd, fromX, containerW, containerH, onPlay, onDiscard, onHover }: CardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{
    px: number; py: number; sx: number; sy: number
    tx: number; ty: number; pid: number; raf: number
  } | null>(null)
  const mounted = useRef(false)
  const status = useRef<'idle' | 'hover' | 'dragging' | 'played' | 'discarding'>('idle')

  const mvX = useMotionValue(fromX)
  const mvY = useMotionValue(0)
  const shiftX = useMotionValue(0)
  const rot = useMotionValue(0)
  const tilt = useMotionValue(0)
  const scale = useMotionValue(1)
  const opacity = useMotionValue(1)
  const rotate = useTransform([rot, tilt], (v: number[]) => v[0] + v[1])
  const x = useTransform([mvX, shiftX], (v: number[]) => v[0] + v[1])
  const [z, setZ] = useState(cd.z)

  const busy = () => {
    const s = status.current
    return s === 'dragging' || s === 'hover' || s === 'played' || s === 'discarding'
  }

  // Deal-in on first mount; re-center when the fan layout changes.
  // Motion values (mvX, mvY, rot, scale, opacity) and refs (mounted) are stable —
  // intentionally omitted from deps.
  useEffect(() => {
    if (busy()) return
    const first = !mounted.current
    if (first) {
      const spring = { type: 'spring' as const, stiffness: 52, damping: 14, mass: 1.2 }
      animate(mvX, cd.x, spring)
      animate(mvY, cd.arcY, spring)
      animate(rot, cd.rot, spring)
      mounted.current = true
    } else {
      animate(mvX, cd.x, { duration: 0.9, ease: EASE })
      animate(mvY, cd.arcY, { duration: 0.9, ease: EASE })
      animate(rot, cd.rot, { duration: 0.9, ease: EASE })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cd.x, cd.arcY, cd.rot])

  // Ease aside when a neighbor is hovered; additive so it never fights the
  // fan/drag animations on mvX.
  useEffect(() => {
    animate(shiftX, cd.shift, { duration: 0.45, ease: EASE })
  }, [cd.shift, shiftX])

  const onEnter = () => {
    if (status.current !== 'idle') return
    status.current = 'hover'
    onHover(cd.name)
    setZ(50)
    mvX.stop(); mvY.stop(); rot.stop(); scale.stop()
    mvY.set(-18); rot.set(0); tilt.set(0); scale.set(1.3)
  }

  const onLeave = () => {
    if (status.current !== 'hover') return
    status.current = 'idle'
    onHover(null)
    setZ(cd.z)
    animate(mvY, cd.arcY, { duration: 0.75, ease: EASE })
    animate(rot, cd.rot, { duration: 0.75, ease: EASE })
    animate(scale, 1, { duration: 0.75, ease: EASE })
  }

  // Head-first plunge into the discard pile (bottom-right).
  const dive = useCallback(() => {
    status.current = 'discarding'
    if (ref.current) ref.current.style.transformOrigin = '50% 0%'
    const xDis = containerW - 79 - cd.anchorLeft - cd.cw / 2
    const yDis = cd.base + cd.ch - 130
    const curX = mvX.get(), curY = mvY.get()
    const midX = (curX + xDis) / 2 + 30
    const midY = Math.min(curY, yDis) - 150
    const arc = { duration: 0.72, ease: [0.42, 0, 0.32, 1] as [number, number, number, number] }
    animate(mvX, [curX, midX, xDis], arc)
    animate(mvY, [curY, midY, yDis], arc)
    animate(rot, [rot.get(), 30, 64], { duration: 0.72, ease: 'easeIn' })
    animate(tilt, 0, { duration: 0.2 })
    animate(scale, [scale.get(), 0.62, 0.14], {
      duration: 0.72,
      ease: [0.5, 0, 0.7, 1] as [number, number, number, number],
    })
    animate(opacity, [1, 1, 0], { duration: 0.72, times: [0, 0.8, 1], ease: 'easeIn' }).then(() => {
      onDiscard(cd.name)
    })
  }, [containerW, cd, mvX, mvY, rot, tilt, scale, opacity, onDiscard])

  const onPointerDown = (e: React.PointerEvent) => {
    const s = status.current
    if (s !== 'idle' && s !== 'hover') return
    e.preventDefault()
    try { ref.current?.setPointerCapture(e.pointerId) } catch (_) { /* ignore */ }
    status.current = 'dragging'
    onHover(null)
    setZ(80)
    mvX.stop(); mvY.stop(); rot.stop(); scale.stop()
    animate(scale, 1.12, { duration: 0.12, ease: EASE })
    animate(rot, 0, { duration: 0.12, ease: EASE })
    const d = {
      px: e.clientX, py: e.clientY,
      sx: mvX.get(), sy: mvY.get(),
      tx: mvX.get(), ty: mvY.get(),
      pid: e.pointerId, raf: 0,
    }
    dragRef.current = d
    const loop = () => {
      const dd = dragRef.current; if (!dd) return
      const cx = mvX.get(), cy = mvY.get()
      const nx = cx + (dd.tx - cx) * 0.2
      const ny = cy + (dd.ty - cy) * 0.2
      mvX.set(nx); mvY.set(ny)
      tilt.set(Math.max(-22, Math.min(22, (nx - cx) * 1.1)))
      dd.raf = requestAnimationFrame(loop)
    }
    d.raf = requestAnimationFrame(loop)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current
    if (!d || status.current !== 'dragging') return
    d.tx = d.sx + (e.clientX - d.px)
    d.ty = d.sy + (e.clientY - d.py)
  }

  const onPointerUp = (e: React.PointerEvent) => {
    const d = dragRef.current; if (!d) return
    cancelAnimationFrame(d.raf)
    try { ref.current?.releasePointerCapture(d.pid) } catch (_) { /* ignore */ }
    animate(tilt, 0, { duration: 0.3, ease: EASE })
    const releaseY = e.clientY
    dragRef.current = null
    const isPlayed = releaseY < (containerH || window.innerHeight) * 0.66
    if (isPlayed) {
      status.current = 'played'
      setZ(80)
      onPlay(cd.name)
      animate(scale, 1.0, { duration: 0.15, ease: EASE })
      try { window.location.hash = cd.href } catch (_) { /* ignore */ }
      setTimeout(dive, 430)
    } else {
      status.current = 'idle'
      setZ(cd.z)
      animate(mvX, cd.x, { type: 'spring', stiffness: 210, damping: 18, mass: 1.1 })
      animate(mvY, cd.arcY, { type: 'spring', stiffness: 210, damping: 18, mass: 1.1 })
      animate(rot, cd.rot, { duration: 0.25, ease: EASE })
      animate(scale, 1, { duration: 0.2, ease: EASE })
    }
  }

  return (
    <motion.div
      ref={ref}
      draggable={false}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: 'absolute',
        left: cd.anchorLeft + 'px',
        bottom: cd.base + 'px',
        width: cd.cw + 'px',
        height: cd.ch + 'px',
        transformOrigin: 'bottom center',
        x,
        y: mvY,
        rotate,
        scale,
        opacity,
        zIndex: z,
        cursor: 'grab',
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        pointerEvents: 'auto',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, filter: 'drop-shadow(0 18px 30px rgba(0,0,0,.55))' }}>
        <img
          src={cd.img}
          alt={cd.name}
          draggable={false}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
      </div>
    </motion.div>
  )
}

// ---- Hero Section ----

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [drawn, setDrawn] = useState(0)
  const [played, setPlayed] = useState<CardName[]>([])
  const [hovered, setHovered] = useState<CardName | null>(null)
  const [discardPile, setDiscardPile] = useState<CardName[]>([])
  const [gen, setGen] = useState<Record<string, number>>({})
  const playedRef = useRef<CardName[]>([])
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight })
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    timersRef.current = CARDS.map((_, i) =>
      setTimeout(() => setDrawn(d => Math.min(CARDS.length, d + 1)), 300 + i * 120)
    )
    return () => { timersRef.current.forEach(clearTimeout) }
  }, [])

  // Playing a card recalls the previously played one: dropping it from
  // `played` puts it back in the hand, and bumping its generation remounts it
  // so it deals in from the left like the opening draw.
  const onPlay = useCallback((name: string) => {
    const card = name as CardName
    const returning = playedRef.current.filter(n => n !== card)
    playedRef.current = [card]
    setPlayed([card])
    if (returning.length) {
      setGen(g => {
        const next = { ...g }
        returning.forEach(n => { next[n] = (next[n] ?? 0) + 1 })
        return next
      })
      setDiscardPile(d => d.filter(n => !returning.includes(n)))
    }
    setHovered(h => (h === name ? null : h))
  }, [])

  const onDiscard = useCallback((name: string) => {
    const card = name as CardName
    // A card recalled to the hand mid-dive still resolves its animation —
    // don't let it land in the pile.
    if (!playedRef.current.includes(card)) return
    setDiscardPile(d => (d.includes(card) ? d : [...d, card]))
  }, [])

  const onHover = useCallback((name: string | null) => {
    setHovered(name as CardName | null)
  }, [])

  const { cards } = computeLayout(size.w || 1280, drawn, played, hovered)
  const fromX = -(size.w / 2 + CARD_W)

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        fontFamily: "'Cinzel', serif",
        zIndex: 100,
      }}
    >
      {/* Draw pile — bottom-left */}
      <div style={{ position: 'absolute', left: '20px', bottom: '16px', width: '50px', pointerEvents: 'auto' }}>
        <img
          src={drawDeckImg}
          alt="Draw pile"
          draggable={false}
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            filter: 'drop-shadow(0 8px 16px rgba(0,0,0,.5))',
            userSelect: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '-10px',
            bottom: '-8px',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `url('${countBadgeImg}') center/contain no-repeat`,
            filter: 'drop-shadow(0 3px 6px rgba(0,0,0,.5))',
          }}
        >
          <span
            style={{
              font: "800 12px 'Cinzel', serif",
              color: '#fff',
              textShadow: '0 1px 2px rgba(0,0,0,.55)',
              transform: 'translateY(-1px)',
              display: 'block',
            }}
          >
            {CARDS.length - drawn}
          </span>
        </div>
      </div>

      {/* Discard pile — bottom-right */}
      <div style={{ position: 'absolute', right: '20px', bottom: '16px', width: '50px', pointerEvents: 'auto' }}>
        <img
          src={discardDeckImg}
          alt="Discard pile"
          draggable={false}
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            filter: 'drop-shadow(0 8px 16px rgba(0,0,0,.5))',
            userSelect: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '-10px',
            bottom: '-8px',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `url('${countBadgeImg}') center/contain no-repeat`,
            filter: 'drop-shadow(0 3px 6px rgba(0,0,0,.5))',
          }}
        >
          <span
            style={{
              font: "800 12px 'Cinzel', serif",
              color: '#fff',
              textShadow: '0 1px 2px rgba(0,0,0,.55)',
              transform: 'translateY(-1px)',
              display: 'block',
            }}
          >
            {discardPile.length}
          </span>
        </div>
      </div>

      {/* Hand */}
      {size.w > 0 &&
        cards.map(cd => (
          <Card
            key={`${cd.name}-${gen[cd.name] ?? 0}`}
            cd={cd}
            fromX={fromX}
            containerW={size.w}
            containerH={size.h}
            onPlay={onPlay}
            onDiscard={onDiscard}
            onHover={onHover}
          />
        ))}
    </div>
  )
}
