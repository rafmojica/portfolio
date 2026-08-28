import { useState, useEffect } from 'react'
import topBarImg from '../assets/top_bar.png'
import charBackdropImg from '../assets/char_backdrop.png'

const NAV_LINKS = [
  { label: 'Home',       href: '#home' },
  { label: 'About',      href: '#about' },
  { label: 'Tech Stack', href: '#tech' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
]

export function Navbar() {
  const [activeHash, setActiveHash] = useState(window.location.hash || '#home')

  useEffect(() => {
    const onHash = () => setActiveHash(window.location.hash || '#home')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 200,
      height: 62,
      backgroundImage: `url('${topBarImg}')`,
      backgroundSize: 'auto 100%',
      backgroundRepeat: 'repeat-x',
      backgroundPosition: 'top center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 26px 6px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <div style={{
          position: 'relative',
          width: 38,
          height: 38,
          backgroundImage: `url('${charBackdropImg}')`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{ font: "700 14px 'Cinzel', serif", color: '#cfe3e8', letterSpacing: '.5px', textShadow: '0 1px 2px rgba(0,0,0,.7)' }}>RM</span>
        </div>
        <span style={{ font: "600 13px 'Cinzel', serif", letterSpacing: '1.2px', color: '#dfeaec', textShadow: '0 1px 2px rgba(0,0,0,.6)' }}>RAFA</span>
      </div>

      <nav style={{ display: 'flex', alignItems: 'center', gap: 24, alignSelf: 'center', marginBottom: 6 }}>
        {NAV_LINKS.map(link => {
          const isActive = activeHash === link.href
          return (
            <a
              key={link.href}
              href={link.href}
              aria-current={isActive ? 'page' : undefined}
              className={`hud-nav-link${isActive ? ' is-active' : ''}`}
            >
              {link.label}
            </a>
          )
        })}
      </nav>
    </div>
  )
}
