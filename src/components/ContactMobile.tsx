import bgImg from '../assets/overgrowth_rest_site_bg.png'
import fireImg from '../assets/overgrowth_rest_site_fire.png'
import lLogImg from '../assets/overgrowth_rest_site_l_log.png'
import lLogShadowImg from '../assets/overgrowth_rest_site_l_log_shadow.png'
import rLogImg from '../assets/overgrowth_rest_site_r_log.png'
import rLogShadowImg from '../assets/overgrowth_rest_site_r_log_shadow.png'
import contactCardImg from '../assets/option_contact.png'
import linkedinCardImg from '../assets/option_linkedin.png'

const EMAIL = 'rafamojica@berkeley.edu'
const LINKEDIN_URL = 'https://www.linkedin.com/in/rafa-mojica/'

// Mobile "rest site": the same campfire cluster scaled down, with the two option cards
// stacked/wrapped beneath a smaller prompt.
export function ContactMobile() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      overflow: 'hidden',
      background: '#050604',
      fontFamily: "'Kreon', serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '84px 18px 0',
    }}>
      {/* Background image */}
      <img
        src={bgImg}
        alt=""
        draggable={false}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center bottom', zIndex: 0, pointerEvents: 'none' }}
      />

      {/* Campfire scene (scaled cluster) */}
      <div style={{ position: 'absolute', left: '50%', top: '72%', transform: 'translate(-50%, -50%) scale(.62)', transformOrigin: 'center', zIndex: 1, pointerEvents: 'none' }}>
        {/* Green light pool */}
        <div className="contact-fire-glow" style={{ position: 'absolute', left: '50%', top: '40%', width: 900, height: 520, transform: 'translate(-50%, -50%)', background: 'radial-gradient(ellipse at center, rgba(140,190,40,.28) 0%, rgba(110,160,30,.14) 35%, rgba(80,120,20,.05) 60%, transparent 75%)' }} />

        {/* Logs */}
        <img src={lLogShadowImg} alt="" draggable={false} style={{ position: 'absolute', right: 205, top: -68, width: 345, opacity: .55 }} />
        <img src={lLogImg} alt="" draggable={false} style={{ position: 'absolute', right: 165, top: -90, width: 345 }} />
        <img src={rLogShadowImg} alt="" draggable={false} style={{ position: 'absolute', left: 215, top: -120, width: 348, opacity: .55 }} />
        <img src={rLogImg} alt="" draggable={false} style={{ position: 'absolute', left: 175, top: -130, width: 348 }} />

        {/* Flame group */}
        <div style={{ position: 'relative', width: 220, height: 146 }}>
          <div className="contact-flame-flicker" style={{ position: 'absolute', left: '50%', bottom: 95, width: 58, height: 145, transform: 'translateX(-50%)', transformOrigin: '50% 100%', background: 'linear-gradient(180deg, rgba(158,227,47,0) 0%, rgba(158,227,47,.35) 30%, #7ed82c 62%, #a8ef3e 100%)', borderRadius: '50% 50% 46% 46% / 88% 88% 22% 22%', filter: 'blur(1px) drop-shadow(0 0 18px rgba(150,230,60,.75)) drop-shadow(0 0 46px rgba(120,200,40,.4))' }} />
          <div className="contact-flame-inner" style={{ position: 'absolute', left: '50%', bottom: 95, width: 28, height: 78, transform: 'translateX(-50%)', transformOrigin: '50% 100%', background: 'linear-gradient(180deg, rgba(240,255,170,0) 0%, #eaffa0 55%, #f6ffd0 100%)', borderRadius: '50% 50% 42% 42% / 85% 85% 25% 25%', filter: 'blur(1px)' }} />

          <div className="contact-ember-1" style={{ position: 'absolute', left: '48%', bottom: 200, width: 5, height: 5, borderRadius: '50%', background: '#d8f24a', boxShadow: '0 0 8px #d8f24a' }} />
          <div className="contact-ember-2" style={{ position: 'absolute', left: '55%', bottom: 185, width: 4, height: 4, borderRadius: '50%', background: '#a8ef3e', boxShadow: '0 0 6px #a8ef3e' }} />
          <div className="contact-ember-3" style={{ position: 'absolute', left: '42%', bottom: 190, width: 3, height: 3, borderRadius: '50%', background: '#eaffa0', boxShadow: '0 0 6px #eaffa0' }} />

          <img src={fireImg} alt="" draggable={false} style={{ position: 'absolute', left: 0, bottom: 0, width: 220 }} />
        </div>
      </div>

      {/* Vignette */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'radial-gradient(ellipse 80% 60% at 50% 70%, transparent 38%, rgba(4,5,3,.55) 76%, rgba(4,5,3,.92) 100%)' }} />

      {/* Prompt */}
      <h1 style={{ position: 'relative', zIndex: 2, margin: '0 0 36px', textAlign: 'center', fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: 'clamp(24px, 7vw, 34px)', letterSpacing: '1px', color: '#f2e9d4', textShadow: '0 3px 8px rgba(0,0,0,.8)' }}>
        What shall I do?
      </h1>

      {/* Option cards */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', gap: 22, flexWrap: 'wrap', justifyContent: 'center' }}>
        <a
          href={`mailto:${EMAIL}`}
          className="m-rest-opt"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, cursor: 'pointer', textDecoration: 'none' }}
        >
          <div className="contact-bob-1" style={{ position: 'relative', width: 150, height: 99, borderRadius: 6 }}>
            <img src={contactCardImg} alt="Contact" draggable={false} style={{ display: 'block', width: '100%', height: '100%', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,.6))' }} />
          </div>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 18, fontWeight: 700, letterSpacing: '1px', color: '#e2c665', textShadow: '0 2px 4px rgba(0,0,0,.8)' }}>
            Contact
          </div>
        </a>

        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="m-rest-opt"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, cursor: 'pointer', textDecoration: 'none' }}
        >
          <div className="contact-bob-2" style={{ position: 'relative', width: 150, height: 99, borderRadius: 6 }}>
            <img src={linkedinCardImg} alt="LinkedIn" draggable={false} style={{ display: 'block', width: '100%', height: '100%', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,.6))' }} />
          </div>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 18, fontWeight: 700, letterSpacing: '1px', color: '#e2c665', textShadow: '0 2px 4px rgba(0,0,0,.8)' }}>
            LinkedIn
          </div>
        </a>
      </div>
    </div>
  )
}
