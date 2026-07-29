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

export function ContactSection() {
  return (
    <div
      className="contact-section"
      style={{
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
        padding: '9vh 24px 0',
      }}
    >
      {/* Background image */}
      <img
        src={bgImg}
        alt=""
        draggable={false}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center bottom',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Campfire scene */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '74%',
          transform: 'translate(-50%, -50%) scale(var(--contact-scale, 1))',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        {/* Green light pool */}
        <div
          className="contact-fire-glow"
          style={{
            position: 'absolute',
            left: '50%',
            top: '40%',
            width: '900px',
            height: '520px',
            transform: 'translate(-50%, -50%)',
            background:
              'radial-gradient(ellipse at center, rgba(140,190,40,.28) 0%, rgba(110,160,30,.14) 35%, rgba(80,120,20,.05) 60%, transparent 75%)',
          }}
        />

        {/* Left log shadow */}
        <img
          src={lLogShadowImg}
          alt=""
          draggable={false}
          style={{
            position: 'absolute',
            right: '205px',
            top: '-68px',
            width: '345px',
            opacity: 0.55,
          }}
        />
        {/* Left log */}
        <img
          src={lLogImg}
          alt=""
          draggable={false}
          style={{
            position: 'absolute',
            right: '165px',
            top: '-90px',
            width: '345px',
          }}
        />

        {/* Right log shadow */}
        <img
          src={rLogShadowImg}
          alt=""
          draggable={false}
          style={{
            position: 'absolute',
            left: '215px',
            top: '-120px',
            width: '348px',
            opacity: 0.55,
          }}
        />
        {/* Right log */}
        <img
          src={rLogImg}
          alt=""
          draggable={false}
          style={{
            position: 'absolute',
            left: '175px',
            top: '-130px',
            width: '348px',
          }}
        />

        {/* Flame group */}
        <div style={{ position: 'relative', width: '220px', height: '146px' }}>
          {/* Outer flame */}
          <div
            className="contact-flame-flicker"
            style={{
              position: 'absolute',
              left: '50%',
              bottom: '95px',
              width: '58px',
              height: '145px',
              transform: 'translateX(-50%)',
              transformOrigin: '50% 100%',
              background:
                'linear-gradient(180deg, rgba(158,227,47,0) 0%, rgba(158,227,47,.35) 30%, #7ed82c 62%, #a8ef3e 100%)',
              borderRadius: '50% 50% 46% 46% / 88% 88% 22% 22%',
              filter:
                'blur(1px) drop-shadow(0 0 18px rgba(150,230,60,.75)) drop-shadow(0 0 46px rgba(120,200,40,.4))',
            }}
          />
          {/* Inner flame */}
          <div
            className="contact-flame-inner"
            style={{
              position: 'absolute',
              left: '50%',
              bottom: '95px',
              width: '28px',
              height: '78px',
              transform: 'translateX(-50%)',
              transformOrigin: '50% 100%',
              background:
                'linear-gradient(180deg, rgba(240,255,170,0) 0%, #eaffa0 55%, #f6ffd0 100%)',
              borderRadius: '50% 50% 42% 42% / 85% 85% 25% 25%',
              filter: 'blur(1px)',
            }}
          />

          {/* Embers */}
          <div
            className="contact-ember-1"
            style={{
              position: 'absolute',
              left: '48%',
              bottom: '200px',
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: '#d8f24a',
              boxShadow: '0 0 8px #d8f24a',
            }}
          />
          <div
            className="contact-ember-2"
            style={{
              position: 'absolute',
              left: '55%',
              bottom: '185px',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: '#a8ef3e',
              boxShadow: '0 0 6px #a8ef3e',
            }}
          />
          <div
            className="contact-ember-3"
            style={{
              position: 'absolute',
              left: '42%',
              bottom: '190px',
              width: '3px',
              height: '3px',
              borderRadius: '50%',
              background: '#eaffa0',
              boxShadow: '0 0 6px #eaffa0',
            }}
          />

          {/* Fire pit — rendered on top of flames */}
          <img
            src={fireImg}
            alt=""
            draggable={false}
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '220px',
            }}
          />
        </div>
      </div>

      {/* Bottom vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 70% 60% at 50% 72%, transparent 40%, rgba(4,5,3,.55) 78%, rgba(4,5,3,.9) 100%)',
        }}
      />

      {/* Heading */}
      <h1
        style={{
          position: 'relative',
          zIndex: 2,
          margin: '0 0 54px',
          fontFamily: "'Cinzel', serif",
          fontWeight: 700,
          fontSize: 'clamp(30px, 4vw, 44px)',
          letterSpacing: '1px',
          color: '#f2e9d4',
          textShadow: '0 3px 8px rgba(0,0,0,.8)',
        }}
      >
        What shall I do?
      </h1>

      {/* Option cards */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          gap: '72px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          transform: 'scale(var(--contact-scale, 1))',
        }}
      >
        {/* Contact card */}
        <a
          href={`mailto:${EMAIL}`}
          className="contact-card-link contact-card-gold"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
            cursor: 'pointer',
            textDecoration: 'none',
          }}
        >
          <div
            className="contact-card-frame contact-bob-1"
            style={{
              position: 'relative',
              width: '256px',
              height: '169px',
              borderRadius: '6px',
              border: '3px solid transparent',
            }}
          >
            <img
              src={contactCardImg}
              alt="Contact"
              draggable={false}
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,.6))',
              }}
            />
          </div>
          <div
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: '22px',
              fontWeight: 700,
              letterSpacing: '1px',
              color: '#e2c665',
              textShadow: '0 2px 4px rgba(0,0,0,.8)',
            }}
          >
            Contact
          </div>
        </a>

        {/* LinkedIn card */}
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card-link contact-card-blue"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
            cursor: 'pointer',
            textDecoration: 'none',
          }}
        >
          <div
            className="contact-card-frame contact-bob-2"
            style={{
              position: 'relative',
              width: '256px',
              height: '169px',
              borderRadius: '6px',
              border: '3px solid transparent',
            }}
          >
            <img
              src={linkedinCardImg}
              alt="LinkedIn"
              draggable={false}
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,.6))',
              }}
            />
          </div>
          <div
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: '22px',
              fontWeight: 700,
              letterSpacing: '1px',
              color: '#e2c665',
              textShadow: '0 2px 4px rgba(0,0,0,.8)',
            }}
          >
            LinkedIn
          </div>
        </a>
      </div>
    </div>
  )
}
