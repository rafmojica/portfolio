interface Floor {
  floor: string
  name: string
  desc: string
  tech: string[]
  repo: string
  demo: string
  accent: string
  border: string
  ribbonBg: string
  boss?: boolean
}

// The desktop climb-map doesn't shrink to a readable size on phones, so it becomes a vertical
// scroll of full-width "floor" cards. Content mirrors the desktop ProjectsSection.
const FLOORS: Floor[] = [
  {
    floor: 'BOSS · FLAGSHIP', name: 'Project Four',
    desc: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    tech: ['Culpa', 'Officia', 'Anim'], repo: '#', demo: '#',
    accent: '#e2c665', border: 'rgba(226,198,101,.45)', ribbonBg: 'rgba(58,48,20,.55)', boss: true,
  },
  {
    floor: 'FLOOR 3 · CAMPFIRE', name: 'Project Three',
    desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
    tech: ['Tempor', 'Magna'], repo: '#', demo: '#',
    accent: '#a8ef3e', border: 'rgba(120,160,60,.35)', ribbonBg: 'rgba(34,46,26,.5)',
  },
  {
    floor: 'FLOOR 2 · ELITE', name: 'Project Two',
    desc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
    tech: ['Sit', 'Amet', 'Elit'], repo: '#', demo: '#',
    accent: '#c0a0e0', border: 'rgba(120,90,160,.35)', ribbonBg: 'rgba(46,32,66,.5)',
  },
  {
    floor: 'FLOOR 1 · MONSTER', name: 'Project One',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, quis nostrud exercitation ullamco.',
    tech: ['Lorem', 'Ipsum', 'Dolor'], repo: '#', demo: '#',
    accent: '#c98a8a', border: 'rgba(150,90,90,.35)', ribbonBg: 'rgba(60,30,34,.5)',
  },
]

// Diamond gem node, tinted per floor — stands in for the map's node markers.
function GemNode({ color, glow }: { color: string; glow?: boolean }) {
  return (
    <svg width="34" height="34" viewBox="0 0 46 46" className={glow ? 'm-node-glow' : undefined} style={{ display: 'block' }}>
      <rect x="10" y="10" width="26" height="26" rx="3" transform="rotate(45 23 23)" fill="#101408" stroke={color} strokeWidth="2.5" />
      <rect x="16.5" y="16.5" width="13" height="13" rx="2" transform="rotate(45 23 23)" fill={color} opacity="0.85" />
    </svg>
  )
}

export function ProjectsMobile() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      overflow: 'hidden',
      fontFamily: "'Kreon', serif",
      background: 'linear-gradient(180deg, #121217 0%, #0f0f13 55%, #0b0b0e 100%)',
      padding: '76px 18px 72px',
    }}>

      {/* Bottom vignette */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '30%', background: 'linear-gradient(to top, rgba(8,8,11,.85), transparent)', pointerEvents: 'none' }} />

      {/* Heading */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', marginBottom: 30 }}>
        <div style={{ font: "600 11px 'Cinzel', serif", letterSpacing: '4px', color: '#8b7fb8' }}>
          THE CLIMB SO FAR
        </div>
        <h1 style={{
          margin: '8px 0 0',
          font: "800 clamp(38px,11vw,56px) 'Cinzel', serif",
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
        <div style={{ width: 130, height: 3, margin: '14px auto 0', background: 'linear-gradient(90deg, transparent, #8b7fb8, transparent)' }} />
        <p style={{ margin: '12px auto 0', maxWidth: 300, fontSize: 15, lineHeight: 1.55, color: '#9d97b5', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>
          Every floor is a project. Scroll to climb the Spire, one battle at a time.
        </p>
      </div>

      {/* Vertical floor stack */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 26, maxWidth: 440, margin: '0 auto' }}>
        {FLOORS.map(p => (
          <div key={p.name} style={{
            position: 'relative',
            background: 'linear-gradient(160deg, rgba(30,28,42,.96), rgba(18,17,26,.98))',
            border: `1px solid ${p.border}`,
            borderRadius: 12,
            boxShadow: '0 18px 42px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.05)',
            overflow: 'hidden',
          }}>

            {/* Floor ribbon */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', background: p.ribbonBg, borderBottom: '1px solid rgba(255,255,255,.06)' }}>
              <div style={{ position: 'relative', width: 38, height: 38, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {p.boss && (
                  <span className="m-boss-ping" style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: '2px solid rgba(226,198,101,.7)', pointerEvents: 'none' }} />
                )}
                <GemNode color={p.accent} glow={p.boss} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ font: "600 10px 'Cinzel', serif", letterSpacing: '2.5px', color: p.accent }}>{p.floor}</div>
                <div style={{ font: "700 20px 'Cinzel', serif", color: '#f0e6cf', textShadow: '0 2px 3px rgba(0,0,0,.6)', lineHeight: 1.1 }}>{p.name}</div>
              </div>
            </div>

            {/* Screenshot */}
            <div style={{ padding: '14px 14px 0' }}>
              <div style={{ position: 'relative', padding: 7, background: 'linear-gradient(150deg, #15141c, #0f0e15)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 10 }}>
                <div style={{
                  width: '100%',
                  height: 190,
                  borderRadius: 6,
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
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: '16px 18px 20px' }}>
              <p style={{ margin: '0 0 14px', fontSize: 15, lineHeight: 1.6, color: '#d7cfe0', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>
                {p.desc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                {p.tech.map(t => (
                  <span key={t} style={{ font: "600 12px 'Kreon', serif", color: '#ecdec2', padding: '5px 12px', border: '1px solid rgba(226,198,101,.4)', borderRadius: 16, background: 'rgba(226,198,101,.08)' }}>
                    {t}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <a
                  className="proj-btn-github"
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                  style={{ flex: 1, textAlign: 'center', font: "700 12px 'Cinzel', serif", letterSpacing: '1.5px', color: '#f0dfae', textDecoration: 'none', padding: '11px 0', border: '1px solid rgba(240,223,174,.5)', borderRadius: 6, background: 'rgba(240,223,174,.1)' }}
                >
                  GITHUB
                </a>
                <a
                  className="proj-btn-demo"
                  href={p.demo}
                  target="_blank"
                  rel="noreferrer"
                  style={{ flex: 1, textAlign: 'center', font: "700 12px 'Cinzel', serif", letterSpacing: '1.5px', color: '#ecdec2', textDecoration: 'none', padding: '11px 0', border: '1px solid rgba(236,222,194,.28)', borderRadius: 6, background: 'rgba(20,18,26,.5)' }}
                >
                  LIVE&nbsp;DEMO
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
