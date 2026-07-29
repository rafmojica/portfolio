import scrollBg from '../assets/scroll-bg.png'

// Mobile landing: the desktop draggable card fan is dropped; a centered portrait over the
// engraved name scroll carries the hero instead.
export function HomeMobile() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #121217 0%, #0f0f13 55%, #0b0b0e 100%)',
      fontFamily: "'Kreon', serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 58,
      padding: '88px 22px 72px',
    }}>

      {/* Ambience */}
      <div style={{ position: 'absolute', left: '50%', top: '36%', width: 340, height: 340, transform: 'translate(-50%, -50%)', background: 'radial-gradient(closest-side, rgba(226,198,101,.12), transparent 70%)', pointerEvents: 'none' }} />
      <div className="m-home-ember" style={{ position: 'absolute', left: '22%', bottom: 120, width: 4, height: 4, borderRadius: '50%', background: '#e2c665', boxShadow: '0 0 8px #e2c665', animationDuration: '6s', animationDelay: '.4s', pointerEvents: 'none' }} />
      <div className="m-home-ember" style={{ position: 'absolute', left: '74%', bottom: 150, width: 3, height: 3, borderRadius: '50%', background: '#a8ef3e', boxShadow: '0 0 6px #a8ef3e', animationDuration: '7.4s', animationDelay: '2.1s', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '40%', background: 'linear-gradient(to top, rgba(8,8,11,.85), transparent)', pointerEvents: 'none' }} />

      {/* Portrait */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        padding: 8,
        background: 'linear-gradient(150deg, #1c1c22, #141419)',
        border: '1px solid rgba(255,255,255,.10)',
        borderRadius: 16,
        boxShadow: '0 20px 50px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.05)',
      }}>
        <div style={{
          width: 'min(78vw, 300px)',
          height: 'min(62vw, 236px)',
          borderRadius: 9,
          background: 'linear-gradient(135deg, #1a1a20, #111115)',
          border: '1px dashed rgba(255,255,255,.10)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255,255,255,.2)',
          fontSize: 13,
          letterSpacing: '.5px',
        }}>
          photo
        </div>
      </div>

      {/* Name on scroll */}
      <div style={{ position: 'relative', zIndex: 2, width: 'min(92vw, 360px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={scrollBg}
          alt=""
          draggable={false}
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '118%', height: 'auto', pointerEvents: 'none', userSelect: 'none', filter: 'drop-shadow(0 16px 32px rgba(0,0,0,.55))' }}
        />
        <div style={{ position: 'relative', zIndex: 1, padding: '26px 34px', textAlign: 'center' }}>
          <h1 style={{
            margin: 0,
            fontFamily: "'Cinzel', serif",
            fontWeight: 700,
            fontSize: 'clamp(30px, 9vw, 42px)',
            lineHeight: 1.04,
            letterSpacing: '.5px',
            background: 'linear-gradient(180deg, #4a4266 6%, #322c46 52%, #241c38 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            filter: 'drop-shadow(0 1px 0 rgba(255,255,255,.5))',
          }}>
            Rafa&nbsp;Mojica
          </h1>
          <div style={{ marginTop: 12, fontFamily: "'Cinzel', serif", fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#6c6685' }}>
            Aspiring Full-Stack Engineer
          </div>
          <p style={{ margin: '10px auto 0', maxWidth: 250, fontSize: 14, lineHeight: 1.55, color: '#433c5b', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>
            I'm studying Electrical Engineering and Computer Sciences at UC&nbsp;Berkeley.
          </p>
        </div>
      </div>
    </div>
  )
}
