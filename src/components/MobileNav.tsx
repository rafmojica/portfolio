import { useEffect, useState } from 'react'
import charBackdropImg from '../assets/char_backdrop.png'

const LINKS = [
  { label: 'Home',       href: '#home',     key: 'home' },
  { label: 'About',      href: '#about',    key: 'about' },
  { label: 'Tech Stack', href: '#tech',     key: 'tech' },
  { label: 'Projects',   href: '#projects', key: 'projects' },
  { label: 'Contact',    href: '#contact',  key: 'contact' },
]

// Replaces the desktop top HUD + card hand on phones: a fixed hamburger that toggles a
// slide-out panel. The active link tracks the section currently filling the viewport.
export function MobileNav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  // Scrollspy — highlight whichever section owns the most of the viewport.
  useEffect(() => {
    const els = LINKS
      .map(l => document.getElementById(l.key))
      .filter((el): el is HTMLElement => el != null)
    if (!els.length) return

    const ratios = new Map<string, number>()
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0))
        let best = ''
        let bestRatio = 0
        ratios.forEach((r, id) => {
          if (r > bestRatio) { bestRatio = r; best = id }
        })
        if (best) setActive(best)
      },
      { threshold: [0.2, 0.4, 0.6, 0.8] },
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Lock the page behind the open panel so touch-scroll doesn't leak through the backdrop.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  return (
    <div style={{ fontFamily: "'Kreon', serif" }}>
      {/* Hamburger trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Menu"
        aria-expanded={open}
        style={{
          position: 'fixed',
          top: 14,
          right: 14,
          zIndex: 120,
          width: 46,
          height: 46,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 5,
          border: '1px solid rgba(243,196,90,.5)',
          borderRadius: 8,
          background: 'rgba(11,11,14,.72)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          boxShadow: '0 6px 18px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.06)',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        <span style={{ display: 'block', width: 20, height: 2, borderRadius: 2, background: '#f3c45a', transition: 'transform .25s ease, opacity .25s ease', transform: open ? 'translateY(7px) rotate(45deg)' : 'none' }} />
        <span style={{ display: 'block', width: 20, height: 2, borderRadius: 2, background: '#f3c45a', transition: 'opacity .2s ease', opacity: open ? 0 : 1 }} />
        <span style={{ display: 'block', width: 20, height: 2, borderRadius: 2, background: '#f3c45a', transition: 'transform .25s ease, opacity .25s ease', transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
      </button>

      {/* Dim backdrop */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 110,
          background: 'rgba(5,5,8,.62)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity .3s ease',
        }}
      />

      {/* Slide-out panel */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 115,
          width: 'min(78vw, 300px)',
          background: 'linear-gradient(158deg, rgba(30,56,66,.98), rgba(14,20,26,.99))',
          borderLeft: '1px solid rgba(243,196,90,.28)',
          boxShadow: '-18px 0 48px rgba(0,0,0,.6)',
          transform: open ? 'translateX(0)' : 'translateX(105%)',
          transition: 'transform .32s cubic-bezier(.16,1,.3,1)',
          display: 'flex',
          flexDirection: 'column',
          padding: '74px 22px 28px',
        }}
      >
        {/* Header crest */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 6px 18px', marginBottom: 10, borderBottom: '1px solid rgba(150,190,200,.16)' }}>
          <div style={{
            width: 38,
            height: 38,
            backgroundImage: `url('${charBackdropImg}')`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ font: "700 14px 'Cinzel', serif", color: '#cfe3e8', textShadow: '0 1px 2px rgba(0,0,0,.7)' }}>RM</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ font: "700 15px 'Cinzel', serif", letterSpacing: '1.4px', color: '#f3c45a' }}>RAFA</span>
            <span style={{ font: "500 10px 'Cinzel', serif", letterSpacing: '1.5px', color: '#7fb0b8' }}>MENU</span>
          </div>
        </div>

        {LINKS.map(l => {
          const on = l.key === active
          return (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={on ? undefined : 'm-nav-link'}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 16px',
                marginBottom: 6,
                borderRadius: 6,
                border: `1px solid ${on ? 'rgba(243,196,90,.55)' : 'rgba(150,190,200,.2)'}`,
                background: on ? 'rgba(243,196,90,.12)' : 'rgba(8,16,20,.4)',
                font: "700 15px 'Cinzel', serif",
                letterSpacing: '1px',
                color: on ? '#f3c45a' : '#dfeaec',
                textDecoration: 'none',
                textShadow: '0 1px 2px rgba(0,0,0,.6)',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: on ? '#f3c45a' : 'rgba(150,190,200,.35)', flex: 'none' }} />
              {l.label}
            </a>
          )
        })}

        <div style={{ flex: 1 }} />
        <div style={{ textAlign: 'center', font: "500 11px 'Kreon', serif", letterSpacing: '1px', color: '#5f7a80', paddingTop: 14 }}>
          The climb continues.
        </div>
      </nav>
    </div>
  )
}
