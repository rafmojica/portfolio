import topBarImg from '../assets/top_bar.png'
import rewardPanelImg from '../assets/reward_panel.png'
import relicFrameImg from '../assets/relic_frame.png'
import iconMapImg from '../assets/icon_map.png'
import iconDeckImg from '../assets/icon_deck.png'
import iconFloorImg from '../assets/icon_floor.png'
import iconAscensionImg from '../assets/icon_ascension.png'

// Single-column "character inspect" — the desktop two-column plate/tale row stacked for phones.
export function AboutMobile() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      overflow: 'hidden',
      fontFamily: "'Kreon', serif",
      background: 'radial-gradient(140% 90% at 50% -6%, #23414c 0%, #162a32 42%, #0d1a20 78%, #091015 100%)',
      paddingBottom: 40,
    }}>

      {/* Atmosphere */}
      <div className="m-about-glow" style={{ position: 'absolute', top: '-4%', left: '50%', width: 420, height: 260, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(243,196,90,.16), transparent 70%)', filter: 'blur(6px)', pointerEvents: 'none' }} />
      <div className="m-about-ember" style={{ position: 'absolute', left: '20%', bottom: 100, width: 4, height: 4, borderRadius: '50%', background: '#f3c45a', boxShadow: '0 0 8px 2px rgba(243,196,90,.5)', animationDuration: '7s', animationDelay: '.4s', pointerEvents: 'none' }} />
      <div className="m-about-ember" style={{ position: 'absolute', left: '78%', bottom: 130, width: 4, height: 4, borderRadius: '50%', background: '#7fd0d8', boxShadow: '0 0 8px 2px rgba(127,208,216,.5)', animationDuration: '8.2s', animationDelay: '2.4s', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 3, padding: '30px 20px 0' }}>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 26 }}>
          <div style={{ font: "600 11px 'Cinzel', serif", letterSpacing: '4px', color: '#7fb0b8', marginBottom: 8 }}>
            CHARACTER&nbsp;&nbsp;INSPECT
          </div>
          <h1 style={{
            margin: 0,
            font: "800 clamp(42px,13vw,58px) 'Cinzel', serif",
            lineHeight: .98,
            letterSpacing: '1px',
            background: 'linear-gradient(180deg, #ffe6a0 6%, #f3c45a 48%, #d99a2c 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            filter: 'drop-shadow(0 3px 0 rgba(60,40,8,.55)) drop-shadow(0 6px 10px rgba(0,0,0,.55))',
          }}>
            About
          </h1>
          <div style={{ width: 130, height: 3, margin: '14px auto 0', background: 'linear-gradient(90deg, transparent, #f3c45a, transparent)', borderRadius: 2 }} />
        </div>

        {/* Character plate */}
        <div style={{
          position: 'relative',
          width: 'min(88vw, 340px)',
          margin: '0 auto 26px',
          backgroundImage: `url('${rewardPanelImg}')`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          padding: '28px 24px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          filter: 'drop-shadow(0 18px 38px rgba(0,0,0,.55))',
        }}>
          <div style={{ position: 'relative', width: 200, height: 200, marginBottom: 14 }}>
            <div style={{
              position: 'absolute',
              top: 16,
              left: 16,
              width: 168,
              height: 168,
              borderRadius: 6,
              background: 'linear-gradient(135deg, rgba(30,56,66,.7), rgba(10,24,32,.85))',
              border: '1px dashed rgba(150,190,200,.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(150,190,200,.25)',
              fontSize: 12,
              letterSpacing: '.5px',
            }}>
              portrait
            </div>
            <img src={relicFrameImg} alt="" draggable={false} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', userSelect: 'none' }} />
          </div>

          <h2 style={{ margin: 0, font: "700 26px 'Cinzel', serif", letterSpacing: '.5px', color: '#f4ead2', textShadow: '0 2px 4px rgba(0,0,0,.6)', textAlign: 'center' }}>
            Rafa&nbsp;Mojica
          </h2>
          <div style={{ marginTop: 5, font: "500 13px 'Kreon', serif", letterSpacing: '.4px', color: '#9fc0c6', textAlign: 'center' }}>
            EECS Initiate · UC Berkeley
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 7 }}>
            <img src={iconMapImg} alt="" draggable={false} style={{ width: 16, height: 16, objectFit: 'contain' }} />
            <span style={{ font: "500 12px 'Kreon', serif", color: '#cdb98f' }}>Berkeley, CA</span>
          </div>

          <div style={{ width: '100%', height: 1, margin: '18px 0 16px', background: 'linear-gradient(90deg, transparent, rgba(243,196,90,.4), transparent)' }} />

          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 13 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <img src={iconDeckImg} alt="" draggable={false} style={{ width: 28, height: 28, objectFit: 'contain', flexShrink: 0 }} />
              <div style={{ flex: 1, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <span style={{ font: "600 10px 'Cinzel', serif", letterSpacing: '1.5px', color: '#9fc0c6' }}>DECK SIZE</span>
                <span style={{ font: "700 15px 'Kreon', serif", color: '#e6eef0' }}>14 cards</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <img src={iconFloorImg} alt="" draggable={false} style={{ width: 28, height: 28, objectFit: 'contain', flexShrink: 0 }} />
              <div style={{ flex: 1, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <span style={{ font: "600 10px 'Cinzel', serif", letterSpacing: '1.5px', color: '#9fc0c6' }}>FLOOR</span>
                <span style={{ font: "700 15px 'Kreon', serif", color: '#e6eef0' }}>3 · Junior</span>
              </div>
            </div>
          </div>
        </div>

        {/* The tale */}
        <div style={{
          maxWidth: 560,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(162deg, rgba(30,56,66,.94), rgba(17,34,41,.96))',
          border: '1px solid rgba(150,190,200,.18)',
          borderRadius: 6,
          boxShadow: '0 18px 42px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.05)',
          padding: '28px 24px 26px',
        }}>
          <div style={{ font: "600 11px 'Cinzel', serif", letterSpacing: '3px', color: '#7fb0b8', marginBottom: 6 }}>
            THE TALE SO FAR
          </div>
          <div style={{ width: 48, height: 3, background: '#f3c45a', borderRadius: 2, marginBottom: 18 }} />

          <p style={{ margin: '0 0 16px', font: "400 16px/1.65 'Kreon', serif", color: '#e7dcc4', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>
            I'm Rafa — an Electrical Engineering &amp; Computer Sciences student at UC&nbsp;Berkeley, learning to build software the whole way down: from the database, through the logic, out to the last pixel on the screen.
          </p>
          <p style={{ margin: '0 0 18px', font: "400 16px/1.65 'Kreon', serif", color: '#cdbf9f', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>
            I treat every project like a fresh run up the Spire — pick up new tools as I find them, adapt to whatever the next floor throws my way, and keep climbing. Right now I'm deep in full-stack web development, turning rough ideas into things people can click, use, and enjoy.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Full-Stack', 'C · Python · JS', 'Always Climbing'].map(chip => (
              <span key={chip} style={{ font: "600 12px 'Kreon', serif", color: '#f4ead2', padding: '6px 13px', border: '1px solid rgba(243,196,90,.45)', borderRadius: 20, background: 'rgba(243,196,90,.08)' }}>
                {chip}
              </span>
            ))}
          </div>

          <div style={{ marginTop: 22, paddingTop: 16, borderTop: '1px solid rgba(150,190,200,.14)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={iconAscensionImg} alt="" draggable={false} style={{ width: 24, height: 24, objectFit: 'contain', flexShrink: 0 }} />
            <span style={{ font: "500 13px 'Kreon', serif", color: '#9fc0c6' }}>
              Currently seeking the next floor — internships &amp; collaborators welcome.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
