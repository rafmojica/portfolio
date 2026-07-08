import { useCallback, useEffect, useRef, useState } from 'react'
import chestBaseImg from '../assets/chest/half/base.png'
import chestGlowImg from '../assets/chest/half/glow.png'
import bannerImg from '../assets/ancient_banner.png'
import f01 from '../assets/chest/half/f01.png'
import f02 from '../assets/chest/half/f02.png'
import f03 from '../assets/chest/half/f03.png'
import f04 from '../assets/chest/half/f04.png'
import f05 from '../assets/chest/half/f05.png'
import f06 from '../assets/chest/half/f06.png'
import f07 from '../assets/chest/half/f07.png'
import f08 from '../assets/chest/half/f08.png'
import f09 from '../assets/chest/half/f09.png'
import f10 from '../assets/chest/half/f10.png'
import f11 from '../assets/chest/half/f11.png'

// Playback order. The closed frame (z 3) draws in front of the base so the box rim is hidden;
// every other frame draws behind the base (z 1) so the lid hinges from the back rim.
// f11's resting spot is hand-tuned; frames 2–10 blend linearly from the closed frame (which must
// stay registered to the base) into it, so re-tuning f11 means re-spreading the delta here.
const FRAME_DEFS = [
  { src: f01, left: 150, top: 345, width: 499, z: 3 },
  { src: f04, left: 152, top: 340, width: 495, z: 3 },
  { src: f05, left: 157, top: 332, width: 489, z: 3 },
  { src: f06, left: 159, top: 315, width: 484, z: 3 },
  { src: f07, left: 172, top: 279, width: 482, z: 1 },
  { src: f08, left: 181, top: 258, width: 476, z: 1 },
  { src: f09, left: 188, top: 240, width: 473, z: 1 },
  { src: f02, left: 206, top: 220, width: 456, z: 1 },
  { src: f03, left: 215, top: 205, width: 441, z: 1 },
  { src: f10, left: 235, top: 195, width: 428, z: 1 },
  { src: f11, left: 228, top: 200, width: 432, z: 1 },
]

const LAST_FRAME = FRAME_DEFS.length - 1
const CLOSE_SPEED_MS = 42

// Compact presentation: the hand-registered 800×780 coordinate space stays intact —
// the whole stage is shifted up (cropping dead space above the banner) and scaled down as one unit.
const STAGE_W = 800
const STAGE_H = 680
const STAGE_SHIFT = 70
const STAGE_SCALE = 0.7

// x/y are the landing spots (top-left of each 92px hit box), two rows above the chest
const TECHS: { name: string; slug: string; aura: 'gold' | 'blue' | null; x: number; y: number }[] = [
  { name: 'React',      slug: 'react',      aura: 'gold', x: 270, y: 200 },
  { name: 'JavaScript', slug: 'javascript', aura: 'gold', x: 400, y: 200 },
  { name: 'Python',     slug: 'python',     aura: 'gold', x: 530, y: 200 },
  { name: 'TypeScript', slug: 'typescript', aura: 'blue', x: 205, y: 315 },
  { name: 'Java',       slug: 'java',       aura: 'blue', x: 335, y: 315 },
  { name: 'Git',        slug: 'git',        aura: null,   x: 465, y: 315 },
  { name: 'Node.js',    slug: 'nodejs',     aura: null,   x: 595, y: 315 },
]

// stage point the icons fly out of / return to
const MOUTH = { x: 400, y: 460 }

const iconUrl = (slug: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-original.svg`

export function TechStackSection({ autoOpen = false, openSpeedMs = 70 }: { autoOpen?: boolean; openSpeedMs?: number } = {}) {
  const [frame, setFrame] = useState(0)
  const [open, setOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [iconsOut, setIconsOut] = useState(false)
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)

  const stageRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<number | undefined>(undefined)
  // mirrors of open/playing so interval + observer callbacks never read stale state
  const openRef = useRef(false)
  const playingRef = useRef(false)
  const autoPlayedRef = useRef(false)

  const openChest = useCallback(() => {
    const start = Date.now()
    playingRef.current = true
    setPlaying(true)
    window.clearInterval(timerRef.current)
    timerRef.current = window.setInterval(() => {
      // frame from elapsed time, not per-tick increments, so throttled background tabs stay correct
      const f = Math.min(LAST_FRAME, Math.floor((Date.now() - start) / openSpeedMs) + 1)
      if (f >= LAST_FRAME) {
        window.clearInterval(timerRef.current)
        playingRef.current = false
        openRef.current = true
        setFrame(LAST_FRAME)
        setPlaying(false)
        setOpen(true)
        setIconsOut(true)
      } else {
        setFrame(f)
      }
    }, openSpeedMs)
  }, [openSpeedMs])

  const closeChest = useCallback(() => {
    const from = LAST_FRAME // only reachable while fully open
    const start = Date.now()
    playingRef.current = true
    openRef.current = false
    setPlaying(true)
    setIconsOut(false)
    setOpen(false)
    window.clearInterval(timerRef.current)
    timerRef.current = window.setInterval(() => {
      const f = Math.max(0, from - Math.floor((Date.now() - start) / CLOSE_SPEED_MS) - 1)
      if (f <= 0) {
        window.clearInterval(timerRef.current)
        playingRef.current = false
        setFrame(0)
        setPlaying(false)
      } else {
        setFrame(f)
      }
    }, CLOSE_SPEED_MS)
  }, [])

  const toggleChest = () => {
    if (playingRef.current) return
    autoPlayedRef.current = true
    if (openRef.current) closeChest()
    else openChest()
  }

  useEffect(() => {
    if (!autoOpen) return
    const el = stageRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    let timeout: number | undefined
    const io = new IntersectionObserver(
      entries => {
        if (autoPlayedRef.current) return
        if (entries.some(e => e.isIntersecting)) {
          autoPlayedRef.current = true
          io.disconnect()
          timeout = window.setTimeout(() => {
            if (!openRef.current && !playingRef.current) openChest()
          }, 500)
        }
      },
      { threshold: 0.55 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      window.clearTimeout(timeout)
    }
  }, [autoOpen, openChest])

  useEffect(() => () => window.clearInterval(timerRef.current), [])

  const hintVisible = frame === 0 && !playing

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #121217 0%, #0f0f13 55%, #0b0b0e 100%)',
      fontFamily: "'Kreon', serif",
      padding: '56px 24px 48px',
    }}>

      {/* Bottom vignette (matches hero) */}
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '40%',
        background: 'linear-gradient(to top, rgba(8,8,11,.85), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Heading */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <div style={{ font: "600 13px 'Cinzel', serif", letterSpacing: '5px', color: '#8b7fb8' }}>
          languages
        </div>
        <h1 style={{
          margin: '8px 0 0',
          font: "800 clamp(32px,4.5vw,50px)/1 'Cinzel', serif",
          letterSpacing: '1px',
          background: 'linear-gradient(180deg, #f7efd9 8%, #e2d5b0 50%, #bfae83 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          filter: 'drop-shadow(0 3px 0 rgba(20,16,34,.8)) drop-shadow(0 6px 12px rgba(0,0,0,.6))',
        }}>
          Tech Stack
        </h1>
        <div style={{ width: 160, height: 3, margin: '12px auto 0', background: 'linear-gradient(90deg, transparent, #8b7fb8, transparent)' }} />
        <p style={{ margin: '10px auto 0', maxWidth: 420, fontSize: 16, lineHeight: 1.5, color: '#9d97b5', textWrap: 'pretty' }}>
          Every run fills the chest. These are the relics I climb with.
        </p>
      </div>

      {/* Chest stage — scaled footprint; inside it the original 800-wide coordinate space, untouched */}
      <div
        ref={stageRef}
        onClick={toggleChest}
        style={{
          position: 'relative',
          zIndex: 2,
          width: STAGE_W * STAGE_SCALE,
          height: STAGE_H * STAGE_SCALE,
          maxWidth: '100%',
          margin: '0 auto',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
      <div style={{ position: 'absolute', left: 0, top: 0, width: STAGE_W, height: STAGE_H, transform: `scale(${STAGE_SCALE})`, transformOrigin: 'top left' }}>
      <div style={{ position: 'absolute', left: 0, top: -STAGE_SHIFT, width: '100%', height: '100%' }}>

        {/* Banner hint — outer wrapper fades, inner wrapper bobs (opacity and animation must stay on separate elements) */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 96,
          marginLeft: -170,
          width: 340,
          zIndex: 5,
          pointerEvents: 'none',
          opacity: hintVisible ? 1 : 0,
          transition: 'opacity .5s ease',
        }}>
          <div style={{ position: 'relative', animation: 'hintBob 2.6s ease-in-out infinite' }}>
            <img
              src={bannerImg}
              alt=""
              draggable={false}
              style={{ display: 'block', width: '100%', height: 'auto', filter: 'drop-shadow(0 8px 18px rgba(0,0,0,.55))' }}
            />
            <div style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: '25%',
              textAlign: 'center',
              font: "700 17px 'Cinzel', serif",
              letterSpacing: '1px',
              color: '#ecdec2',
              textShadow: '0 2px 3px rgba(0,0,0,.55)',
            }}>
              Click to Open!
            </div>
          </div>
        </div>

        {/* Treasure glow from inside the box — wrapper fades, img pulses */}
        <div style={{
          position: 'absolute',
          left: 158,
          top: 240,
          width: 463,
          zIndex: 3,
          pointerEvents: 'none',
          opacity: frame >= 8 ? 0.75 : 0,
          transition: 'opacity .6s ease',
        }}>
          <img
            src={chestGlowImg}
            alt=""
            draggable={false}
            style={{ display: 'block', width: '100%', height: 'auto', mixBlendMode: 'screen', animation: 'glowPulse 2.4s ease-in-out infinite' }}
          />
        </div>

        {/* Lid frames — all mounted (preloads them), one visible at a time */}
        {FRAME_DEFS.map((f, i) => (
          <img
            key={f.src}
            src={f.src}
            alt=""
            draggable={false}
            style={{
              position: 'absolute',
              left: f.left,
              top: f.top,
              width: f.width,
              zIndex: f.z,
              display: i === frame ? 'block' : 'none',
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Chest base */}
        <img
          src={chestBaseImg}
          alt=""
          draggable={false}
          style={{ position: 'absolute', left: 4, top: 425, width: 792, zIndex: 2, pointerEvents: 'none' }}
        />

        {/* Tech relics — positioned at their landing spot; the hidden transform points back at the chest mouth */}
        {TECHS.map((t, i) => {
          const dx = MOUTH.x - t.x
          const dy = MOUTH.y - t.y
          const glowAnim = t.aura === 'gold' ? 'rareGlow' : t.aura === 'blue' ? 'uncommonGlow' : null
          return (
            <div
              key={t.slug}
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx(h => (h === i ? null : h))}
              style={{
                position: 'absolute',
                left: t.x,
                top: t.y,
                zIndex: 4,
                width: 92,
                opacity: iconsOut ? 1 : 0,
                transform: iconsOut
                  ? 'translate(-46px,-46px) scale(1)'
                  : `translate(${dx - 46}px,${dy - 46}px) scale(.12)`,
                transition: iconsOut
                  ? `transform .8s cubic-bezier(.22,1.35,.36,1) ${i * 80}ms, opacity .35s ease ${i * 80}ms`
                  : `transform .45s cubic-bezier(.5,0,.8,.4) ${i * 30}ms, opacity .3s ease ${120 + i * 30}ms`,
                pointerEvents: 'auto',
              }}
            >
              <div style={{ position: 'relative', width: 92, height: 92, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={iconUrl(t.slug)}
                  alt={t.name}
                  draggable={false}
                  style={{
                    width: 58,
                    height: 58,
                    filter: glowAnim ? 'none' : 'drop-shadow(0 3px 6px rgba(0,0,0,.6))',
                    animation: glowAnim ? `${glowAnim} 5s ease-in-out ${i * 0.7}s infinite` : 'none',
                  }}
                />
              </div>
              <div style={{
                marginTop: 4,
                textAlign: 'center',
                font: "600 13px 'Kreon', serif",
                letterSpacing: '.5px',
                color: '#ecdec2',
                textShadow: '0 2px 3px rgba(0,0,0,.7)',
                opacity: hoverIdx === i ? 1 : 0,
                transition: 'opacity .18s ease',
              }}>
                {t.name}
              </div>
            </div>
          )
        })}

      </div>
      </div>
      </div>

      {/* Replay hint */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        marginTop: 2,
        fontSize: 14,
        color: '#6c6685',
        opacity: open ? 1 : 0,
        transition: 'opacity .5s ease .8s',
      }}>
        Click the chest to close it back up.
      </div>

    </div>
  )
}
