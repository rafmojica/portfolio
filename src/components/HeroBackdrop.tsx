import scrollBg from '../assets/scroll-bg.png'

export function HeroBackdrop() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #121217 0%, #0f0f13 55%, #0b0b0e 100%)',
        fontFamily: "'Rubik', sans-serif",
      }}
    >
      {/* Bottom fade — darkens the lower area for the card hand to read against */}
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

      {/* Hero row */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 48,
          maxWidth: 1180,
          margin: '0 auto',
          padding: '96px 56px 380px',
          pointerEvents: 'none',
        }}
      >
        {/* Left: name on scroll */}
        <div style={{ position: 'relative', flex: '0 0 auto', width: 560 }}>
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
              padding: '18px 36px 0px 90px',
              textAlign: 'left',
            }}
          >
            <h1
              style={{
                margin: 0,
                fontWeight: 600,
                fontSize: 'clamp(44px, 6.6vw, 70px)',
                lineHeight: 1.02,
                letterSpacing: -1,
                color: '#322c46',
              }}
            >
              Rafa&nbsp;Mojica
            </h1>
            <div
              style={{
                marginTop: 22,
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: '.4px',
                color: '#6c6685',
              }}
            >
              aspiring full-stack engineer
            </div>
            <p
              style={{
                margin: '12px 0 0',
                maxWidth: 400,
                fontSize: 'clamp(16px, 1.8vw, 18px)',
                lineHeight: 1.55,
                color: '#433c5b',
                textWrap: 'pretty' as React.CSSProperties['textWrap'],
              }}
            >
              I'm studying Electrical Engineering and Computer Sciences at UC&nbsp;Berkeley.
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
            <div
              style={{
                width: 380,
                height: 300,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #1a1a20, #111115)',
                border: '1px dashed rgba(255,255,255,.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,.18)',
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: '.5px',
              }}
            >
              photo
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
