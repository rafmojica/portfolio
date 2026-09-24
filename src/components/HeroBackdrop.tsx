import scrollBg from '../assets/scroll-bg.png'
import rafa_hero from '../assets/rafa_hero.png'

const metaLabelStyle = {
  fontFamily: "'Cinzel', serif",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '2px',
  textTransform: 'uppercase' as const,
  color: '#4a4266',
}

const metaValueStyle = {
  fontSize: 19,
  lineHeight: 1.3,
  color: '#433c5b',
}

export function HeroBackdrop() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #121217 0%, #0f0f13 55%, #0b0b0e 100%)',
        fontFamily: "'Kreon', serif",
      }}
    >
      {/* Bottom fade */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '46%',
          background: 'linear-gradient(to top, rgba(8,8,11,.85), transparent)',
          pointerEvents: 'none',
        }}
      />

      {/* Hero row — collapses to a column once the name scroll and photo frame
          no longer both fit at their fixed widths (see .hero-row media query) */}
      <div
        className="hero-row"
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          maxWidth: 1180,
          margin: '0 auto',
          padding: '124px 56px 380px',
          pointerEvents: 'none',
        }}
      >
        {/* Left: name on scroll */}
        <div className="hero-name-card" style={{ position: 'relative', flex: '0 0 auto', width: 560 }}>
          <img
            src={scrollBg}
            alt=""
            draggable={false}
            style={{
              position: 'absolute',
              top: '50%',
              left: -12,
              transform: 'translateY(-50%)',
              width: 600,
              height: 'auto',
              pointerEvents: 'none',
              userSelect: 'none',
              filter: 'drop-shadow(0 22px 44px rgba(0,0,0,.55))',
            }}
          />
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              padding: '18px 36px 22px 60px',
              textAlign: 'left',
            }}
          >
            <h1
              style={{
                margin: 0,
                fontFamily: "'Cinzel', serif",
                fontWeight: 700,
                fontSize: 'clamp(36px, 5vw, 60px)',
                lineHeight: 1,
                letterSpacing: '.5px',
                background: 'linear-gradient(180deg, #4a4266 6%, #322c46 52%, #241c38 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                filter: 'drop-shadow(0 1px 0 rgba(255,255,255,.55)) drop-shadow(0 3px 7px rgba(40,28,60,.28))',
              }}
            >
              Rafa&nbsp;Mojica
            </h1>
            <div
              style={{
                marginTop: 14,
                fontFamily: "'Cinzel', serif",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#5f5980',
              }}
            >
              Aspiring Full-Stack Engineer
            </div>
            <div
              style={{
                marginTop: 26,
                height: 1,
                background: 'linear-gradient(90deg, rgba(90,82,120,.5), rgba(90,82,120,.12))',
              }}
            />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '84px minmax(0, 1fr)',
                rowGap: 14,
                columnGap: 20,
                alignItems: 'baseline',
                marginTop: 22,
              }}
            >
              <span style={metaLabelStyle}>Study</span>
              <span style={metaValueStyle}>Electrical Engineering &amp; Computer Sciences</span>

              <span style={metaLabelStyle}>School</span>
              <a
                href="https://www.berkeley.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="ucb-plaque"
                style={{
                  justifySelf: 'start',
                  display: 'inline-block',
                  fontFamily: "'Cinzel', serif",
                  fontWeight: 700,
                  fontSize: 20,
                  letterSpacing: '.6px',
                  color: '#003262',
                  background: 'rgba(0,50,98,.10)',
                  border: '1px solid rgba(0,50,98,.16)',
                  borderRadius: 4,
                  padding: '3px 10px',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,.22)',
                  textDecoration: 'none',
                  pointerEvents: 'auto',
                  cursor: 'pointer',
                }}
              >
                UC&nbsp;Berkeley
              </a>

              <span style={metaLabelStyle}>Class of</span>
              <span style={metaValueStyle}>2027</span>
            </div>
          </div>
        </div>

        {/* Right: photo frame */}
        <div style={{ flex: '0 0 auto', pointerEvents: 'auto' }}>
          <div
            style={{
              padding: 10,
              background: 'linear-gradient(150deg, #1c1c22, #141419)',
              border: '1px solid rgba(255,255,255,.10)',
              borderRadius: 18,
              boxShadow: '0 24px 60px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.05)',
            }}
          >
            <img
              src={rafa_hero}
              alt="Rafa Mojica"
              draggable={false}
              style={{
                display: 'block',
                width: 380,
                height: 300,
                borderRadius: 10,
                objectFit: 'cover',
                userSelect: 'none',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
