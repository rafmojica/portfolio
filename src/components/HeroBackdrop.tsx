import scrollBg from '../assets/scroll-bg.png'
import rafa_hero from '../assets/rafa_hero.png'

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
                fontSize: 'clamp(38px, 5.4vw, 66px)',
                lineHeight: 1.04,
                letterSpacing: '.5px',
                background: 'linear-gradient(180deg, #4a4266 6%, #322c46 52%, #241c38 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                filter: 'drop-shadow(0 1px 0 rgba(255,255,255,.5)) drop-shadow(0 3px 7px rgba(40,28,60,.28))',
              }}
            >
              Rafa&nbsp;Mojica
            </h1>
            <div
              style={{
                marginTop: 22,
                fontFamily: "'Cinzel', serif",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                color: '#6c6685',
              }}
            >
              Aspiring Full-Stack Engineer
            </div>
            <p
              style={{
                margin: '14px 0 0',
                maxWidth: 400,
                fontSize: 'clamp(16px, 1.8vw, 18px)',
                lineHeight: 1.6,
                color: '#433c5b',
                textWrap: 'pretty' as React.CSSProperties['textWrap'],
              }}
            >
              Electrical Engineering & Computer Sciences <br></br>at{' '}
              <span className="ucb-highlight">UC&nbsp;Berkeley</span>
            </p>
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
