import { useId } from 'react'

interface WaveDividerProps {
  /** Front-wave fill — set to the background of the section BELOW so the wave pours into it.
   *  A flat color for sections with a uniform top edge; pass `{ from, to }` when the section
   *  below opens with a horizontal radial (bright center, dark corners) so the wave's bottom
   *  edge mirrors it — `from` is the center color, `to` the edge color. */
  fill: string | { from: string; to: string }
  /** Container backdrop behind the SVG's transparent crest — set to the background of the
   *  section ABOVE so the top of the wave blends up into it (otherwise the body color shows). */
  bg: string
  /** Flip vertically so the crest points up, for a section that needs the wave rising. */
  flip?: boolean
  /** Rendered band height in px. The waves squish to fit (preserveAspectRatio="none"). */
  height?: number
}

// Layered wave seam between page sections. Inlined (not an <img>) so the green accent
// dots can pulse-glow and the front wave can take the next section's color per boundary.
// The band is a block in normal flow, so its transparent top reveals its OWN background,
// not the section above — hence `bg` (section above) up top and `fill` (section below) down low.
// Static twin lives at /assets/wave-divider.svg (see README).
export function WaveDivider({ fill, bg, flip = false, height = 110 }: WaveDividerProps) {
  // A gradient fill needs a <defs> entry; give it a doc-unique id so multiple dividers don't collide.
  const gradId = 'waveFront-' + useId().replace(/:/g, '')
  const frontFill = typeof fill === 'string' ? fill : `url(#${gradId})`
  return (
    <div
      aria-hidden
      style={{
        width: '100%',
        height,
        lineHeight: 0,
        background: bg,
        transform: flip ? 'scaleY(-1)' : undefined,
        pointerEvents: 'none',
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 140"
        preserveAspectRatio="none"
        role="img"
        aria-label="Section divider wave"
        style={{ display: 'block' }}
      >
        {typeof fill !== 'string' && (
          <defs>
            {/* Mirrored across the width so the wave's bottom edge is bright at center and
                darkens toward both corners, matching a radial-topped section below. */}
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={fill.to} />
              <stop offset="50%" stopColor={fill.from} />
              <stop offset="100%" stopColor={fill.to} />
            </linearGradient>
          </defs>
        )}
        <path
          d="M0 70 C150 20 300 20 450 60 C600 100 750 110 900 70 C1020 38 1120 40 1200 64 L1200 140 L0 140 Z"
          fill="#241a2e"
          opacity=".8"
        />
        <path
          d="M0 92 C160 50 320 46 480 82 C640 118 800 120 960 88 C1060 68 1140 68 1200 84 L1200 140 L0 140 Z"
          fill="#141019"
        />
        <path
          d="M0 108 C180 76 360 74 540 100 C720 126 900 128 1060 106 C1120 98 1170 98 1200 104 L1200 140 L0 140 Z"
          fill={frontFill}
        />
        <path
          d="M0 92 C160 50 320 46 480 82 C640 118 800 120 960 88 C1060 68 1140 68 1200 84"
          fill="none"
          stroke="#e2c665"
          strokeWidth="2.5"
          opacity=".9"
        />
        <circle className="wave-dot" cx="480" cy="82" r="4" fill="#a8ef3e" />
        <circle className="wave-dot wave-dot-2" cx="960" cy="88" r="4" fill="#a8ef3e" />
      </svg>
    </div>
  )
}
