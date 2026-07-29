interface WaveDividerProps {
  /** Front-wave fill — set to the background of the section BELOW so the wave pours into it. */
  fill: string
  /** Flip vertically so the crest points up, for a section that needs the wave rising. */
  flip?: boolean
  /** Rendered band height in px. The waves squish to fit (preserveAspectRatio="none"). */
  height?: number
}

// Layered wave seam between page sections. Inlined (not an <img>) so the green accent
// dots can pulse-glow and the front wave can take the next section's color per boundary.
// Static twin lives at /assets/wave-divider.svg (see README).
export function WaveDivider({ fill, flip = false, height = 110 }: WaveDividerProps) {
  return (
    <div
      aria-hidden
      style={{
        width: '100%',
        height,
        lineHeight: 0,
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
          fill={fill}
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
