import { useEffect, useState } from 'react'

import mapBgImg from '../assets/map_bg.png'
import markerImg from '../assets/marker.png'
import popupImg from '../assets/popup.png'

const GLOW_BOSS = true
const SHOW_MARKER = true

// Compact presentation: the hand-placed 640×800 node coordinates stay intact —
// the whole parchment block (bg + canvas + its breathing room) scales down as one
// unit, same trick as the chest stage. In-map fonts are bumped up so they still
// read at the rendered size.
const MAP_W = 920
const MAP_PAD_TOP = 64
const MAP_PAD_BOTTOM = 96
const MAP_H = MAP_PAD_TOP + 800 + MAP_PAD_BOTTOM
// Same responsive scaling as TechStackSection.
const calcMapScale = () => Math.min(0.9, Math.max(0.75, window.innerWidth / 2133))

interface Project {
  floor: string
  name: string
  blurb: string
  x: number
  y: number
  dir: 'row' | 'row-reverse'
  align: 'left' | 'right'
  desc: string
  tech: string[]
  repo: string
  demo: string
  screenshot?: string
}

// TODO: replace lorem placeholders with real project data + screenshots
const PROJECTS: Project[] = [
  {
    floor: 'FLOOR 1 · MONSTER', name: 'Project One', blurb: 'Lorem ipsum dolor sit amet.',
    x: 250, y: 640, dir: 'row', align: 'left',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, quis nostrud exercitation ullamco.',
    tech: ['Lorem', 'Ipsum', 'Dolor'], repo: '#', demo: '#',
  },
  {
    floor: 'FLOOR 2 · ELITE', name: 'Project Two', blurb: 'Consectetur adipiscing elit.',
    x: 430, y: 450, dir: 'row-reverse', align: 'right',
    desc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
    tech: ['Sit', 'Amet', 'Elit'], repo: '#', demo: '#',
  },
  {
    floor: 'FLOOR 3 · CAMPFIRE', name: 'Project Three', blurb: 'Sed do eiusmod tempor.',
    x: 170, y: 260, dir: 'row', align: 'left',
    desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
    tech: ['Tempor', 'Magna'], repo: '#', demo: '#',
  },
  {
    floor: 'BOSS · FLAGSHIP', name: 'Project Four', blurb: 'Magna aliqua ut enim.',
    x: 320, y: 82, dir: 'row', align: 'left',
    desc: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    tech: ['Culpa', 'Officia', 'Anim'], repo: '#', demo: '#',
  },
]

export function ProjectsSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const sel = openIdx == null ? null : PROJECTS[openIdx]

  const [mapScale, setMapScale] = useState(calcMapScale)
  useEffect(() => {
    const onResize = () => setMapScale(calcMapScale())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (openIdx == null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIdx(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openIdx])

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      overflow: 'hidden',
      fontFamily: "'Kreon', serif",
      background: 'linear-gradient(180deg, #121217 0%, #0f0f13 55%, #0b0b0e 100%)',
      padding: '56px 24px 24px',
    }}>

      {/* Bottom vignette */}
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
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', marginBottom: 22 }}>
        <div style={{ font: "600 13px 'Cinzel', serif", letterSpacing: '5px', color: '#8b7fb8' }}>
          THE&nbsp;CLIMB&nbsp;SO&nbsp;FAR
        </div>
        <h1 style={{
          margin: '8px 0 0',
          font: "800 clamp(32px,4.5vw,50px) 'Cinzel', serif",
          lineHeight: 1,
          letterSpacing: '1px',
          background: 'linear-gradient(180deg, #f7efd9 8%, #e2d5b0 50%, #bfae83 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          filter: 'drop-shadow(0 3px 0 rgba(20,16,34,.8)) drop-shadow(0 6px 12px rgba(0,0,0,.6))',
        }}>
          Projects
        </h1>
        <div style={{ width: 160, height: 3, margin: '12px auto 0', background: 'linear-gradient(90deg, transparent, #8b7fb8, transparent)' }} />
        <p style={{ margin: '10px auto 0', maxWidth: 420, fontSize: 16, lineHeight: 1.5, color: '#9d97b5', textWrap: 'pretty' }}>
          Every floor is a project. Inspect a node to read the tale.
        </p>
      </div>

      {/* Parchment map — scaled footprint; inside it the original 920-wide coordinate space, untouched */}
      <div style={{ position: 'relative', zIndex: 2, width: MAP_W * mapScale, height: MAP_H * mapScale, maxWidth: '100%', margin: '0 auto' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: MAP_W, padding: `${MAP_PAD_TOP}px 0 ${MAP_PAD_BOTTOM}px`, transform: `scale(${mapScale})`, transformOrigin: 'top left' }}>
        <img
          src={mapBgImg}
          alt=""
          draggable={false}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            filter: 'drop-shadow(0 30px 60px rgba(0,0,0,.55))',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
        {/* 640×800 map canvas */}
        <div style={{ position: 'relative', width: 640, maxWidth: '100%', height: 800, margin: '0 auto' }}>

          {/* Dotted climbing path */}
          <svg viewBox="0 0 640 800" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <path
              d="M 250 742 Q 244 690 250 652 Q 340 560 430 462 Q 310 355 176 272 Q 235 160 318 84"
              fill="none"
              stroke="rgba(74,66,102,.45)"
              strokeWidth={5}
              strokeLinecap="round"
              strokeDasharray="1 16"
            />
          </svg>

          {/* YOU ARE HERE marker */}
          {SHOW_MARKER && (
            <div style={{ position: 'absolute', left: 250, top: 758, transform: 'translate(-50%, 0)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
              <img src={markerImg} alt="" draggable={false} style={{ width: 34, height: 'auto', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,.6))' }} />
              <span style={{ font: "600 13px 'Cinzel', serif", letterSpacing: '2px', color: '#6c6685' }}>YOU&nbsp;ARE&nbsp;HERE</span>
            </div>
          )}

          {/* Project nodes */}
          {PROJECTS.map((p, i) => (
            <div key={p.name} style={{
              position: 'absolute',
              left: p.x,
              top: p.y,
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: p.dir,
              alignItems: 'center',
              gap: 14,
            }}>
              {/* Screenshot frame */}
              <div
                className="proj-frame"
                onClick={() => setOpenIdx(i)}
                style={{
                  position: 'relative',
                  flex: 'none',
                  padding: 7,
                  background: 'linear-gradient(150deg, #1c1c22, #141419)',
                  border: '1px solid rgba(255,255,255,.10)',
                  borderRadius: 12,
                  boxShadow: '0 18px 44px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.05)',
                  cursor: 'pointer',
                }}
              >
                {GLOW_BOSS && i === PROJECTS.length - 1 && (
                  <span style={{
                    position: 'absolute',
                    inset: -6,
                    borderRadius: 14,
                    border: '2px solid rgba(74,66,102,.7)',
                    animation: 'bossPing 2.2s ease-out infinite',
                    pointerEvents: 'none',
                  }} />
                )}
                {p.screenshot ? (
                  <img
                    src={p.screenshot}
                    alt={p.name}
                    draggable={false}
                    style={{ display: 'block', width: 200, height: 125, borderRadius: 7, objectFit: 'cover', userSelect: 'none' }}
                  />
                ) : (
                  // Screenshot placeholder — swap for <img> once real captures exist
                  <div style={{
                    width: 200,
                    height: 125,
                    borderRadius: 7,
                    background: 'linear-gradient(135deg, rgba(40,38,52,.7), rgba(18,17,24,.85))',
                    border: '1px dashed rgba(155,145,190,.22)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(155,145,190,.35)',
                    fontSize: 15,
                    letterSpacing: '.5px',
                  }}>
                    screenshot
                  </div>
                )}
              </div>

              {/* Name + blurb */}
              <div onClick={() => setOpenIdx(i)} style={{ width: 200, flex: 'none', cursor: 'pointer', textAlign: p.align }}>
                <div style={{ font: "700 24px 'Cinzel', serif", color: '#322c46', textShadow: '0 1px 0 rgba(255,255,255,.3)' }}>
                  {p.name}
                </div>
                <div style={{ marginTop: 3, fontSize: 17, color: '#5a5470' }}>
                  {p.blurb}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* Detail popup */}
      {sel != null && (
        <>
          {/* zIndex clears the fixed hero card layer (z 100) */}
          <div
            onClick={() => setOpenIdx(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(5,5,8,.72)', backdropFilter: 'blur(2px)' }}
          />
          <div style={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 201,
            width: 480,
            maxWidth: '92vw',
            background: `url('${popupImg}') center/100% 100% no-repeat`,
            padding: '58px 54px 62px',
            animation: 'popIn .22s ease-out',
            filter: 'drop-shadow(0 30px 60px rgba(0,0,0,.7))',
          }}>
            <button
              className="proj-close"
              onClick={() => setOpenIdx(null)}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: 38,
                right: 42,
                width: 34,
                height: 34,
                border: '1px solid rgba(236,222,194,.35)',
                borderRadius: 4,
                background: 'rgba(20,14,10,.35)',
                color: '#ecdec2',
                font: "700 15px 'Kreon', serif",
                cursor: 'pointer',
              }}
            >
              ✕
            </button>

            <div>
              <div style={{ font: "600 11px 'Cinzel', serif", letterSpacing: '2.5px', color: '#c9a15e' }}>
                {sel.floor}
              </div>
              <h3 style={{ margin: '2px 0 0', font: "700 26px 'Cinzel', serif", color: '#f0dfae', textShadow: '0 2px 3px rgba(0,0,0,.6)' }}>
                {sel.name}
              </h3>
            </div>

            <div style={{ width: '100%', height: 1, margin: '18px 0', background: 'linear-gradient(90deg, transparent, rgba(236,222,194,.4), transparent)' }} />

            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: '#ecdec2', textWrap: 'pretty' }}>
              {sel.desc}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 18 }}>
              {sel.tech.map(t => (
                <span key={t} style={{
                  font: "600 12px 'Kreon', serif",
                  color: '#ecdec2',
                  padding: '5px 12px',
                  border: '1px solid rgba(236,222,194,.4)',
                  borderRadius: 16,
                  background: 'rgba(236,222,194,.08)',
                }}>
                  {t}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 26 }}>
              <a
                className="proj-btn-github"
                href={sel.repo}
                target="_blank"
                rel="noreferrer"
                style={{
                  flex: 1,
                  textAlign: 'center',
                  font: "700 12px 'Cinzel', serif",
                  letterSpacing: '1.5px',
                  color: '#f0dfae',
                  textDecoration: 'none',
                  padding: '11px 0',
                  border: '1px solid rgba(240,223,174,.5)',
                  borderRadius: 4,
                  background: 'rgba(240,223,174,.1)',
                }}
              >
                GITHUB
              </a>
              <a
                className="proj-btn-demo"
                href={sel.demo}
                target="_blank"
                rel="noreferrer"
                style={{
                  flex: 1,
                  textAlign: 'center',
                  font: "700 12px 'Cinzel', serif",
                  letterSpacing: '1.5px',
                  color: '#ecdec2',
                  textDecoration: 'none',
                  padding: '11px 0',
                  border: '1px solid rgba(236,222,194,.3)',
                  borderRadius: 4,
                  background: 'rgba(20,14,10,.3)',
                }}
              >
                LIVE&nbsp;DEMO
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
