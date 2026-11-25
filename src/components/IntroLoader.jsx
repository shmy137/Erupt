import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './IntroLoader.css'

const FLAG = 'erupt-intro-seen'
// Wave ends ≈2.58s → orange fills → erupt on orange → doors wipe home.
const WOBBLE_AT = 2300
const WOBBLE_MS = 280
const FILL_AT = 2700
const LOGO_AT = 3300
const REVEAL_AT = 4600
const DONE_AT = 5400

// Slice bounds inside public/intro-erupt-letters.png (bbox crop 609×234).
const SPRITE_W = 609
const LETTER_SLICES = [
  { x: 0, w: 134 },
  { x: 152, w: 86 },
  { x: 254, w: 129 },
  { x: 400, w: 125 },
  { x: 529, w: 80 },
]

export default function IntroLoader() {
  // Single source of truth: the inline boot script in index.html adds
  // .intro-pending only when the intro should play this session.
  const [skip] = useState(
    () => !document.documentElement.classList.contains('intro-pending'),
  )
  const [logo, setLogo] = useState(false)
  const [filling, setFilling] = useState(false)
  const [revealing, setRevealing] = useState(false)
  const [wobbling, setWobbling] = useState(false)
  const [done, setDone] = useState(false)
  const scaleRef = useRef(null)
  const turbRef = useRef(null)

  useLayoutEffect(() => {
    if (skip) return undefined

    try {
      sessionStorage.setItem(FLAG, '1')
    } catch {
      /* storage unavailable — intro will simply play again next load */
    }

    const root = document.documentElement
    root.classList.add('intro-active', 'intro-lock')
    window.scrollTo({ top: 0, behavior: 'instant' })

    return () => {
      root.classList.remove('intro-active', 'intro-lock', 'intro-pending')
    }
  }, [skip])

  useEffect(() => {
    if (skip) return undefined

    let cancelled = false

    const wobbleOn = setTimeout(() => {
      if (cancelled) return
      setWobbling(true)
    }, WOBBLE_AT)

    const wobbleOff = setTimeout(() => {
      if (cancelled) return
      setWobbling(false)
    }, WOBBLE_AT + WOBBLE_MS)

    const fill = setTimeout(() => {
      if (cancelled) return
      setFilling(true)
    }, FILL_AT)

    const showLogo = setTimeout(() => {
      if (cancelled) return
      setLogo(true)
    }, LOGO_AT)

    const reveal = setTimeout(() => {
      if (cancelled) return
      // Orange page fully covers the screen — release the scroll lock and
      // hero animation gate so the home screen rises as the doors open.
      document.documentElement.classList.remove('intro-active', 'intro-pending')
      setRevealing(true)
    }, REVEAL_AT)

    const finish = setTimeout(() => {
      if (cancelled) return
      document.documentElement.classList.remove('intro-lock')
      setDone(true)
    }, DONE_AT)

    return () => {
      cancelled = true
      clearTimeout(wobbleOn)
      clearTimeout(wobbleOff)
      clearTimeout(showLogo)
      clearTimeout(fill)
      clearTimeout(reveal)
      clearTimeout(finish)
      document.documentElement.classList.remove(
        'intro-active',
        'intro-lock',
        'intro-pending',
      )
    }
  }, [skip])

  // Kick off the SMIL warp the same tick the filter class is applied.
  useLayoutEffect(() => {
    if (!wobbling) return
    for (const r of [scaleRef, turbRef]) {
      try {
        r.current?.beginElement?.()
      } catch {
        /* SMIL unavailable — line simply stays straight */
      }
    }
  }, [wobbling])

  if (skip || done) return null

  const rootClass = [
    'erupt-intro',
    logo && 'erupt-intro--logo',
    filling && 'erupt-intro--fill',
    revealing && 'erupt-intro--revealing',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={rootClass} aria-hidden="true">
      {revealing ? (
        <>
          <div className="erupt-intro__door erupt-intro__door--l" />
          <div className="erupt-intro__door erupt-intro__door--r" />
        </>
      ) : (
        <>
          <svg className="erupt-intro__warpsvg">
            <defs>
              <filter
                id="erupt-warp"
                x="-20%"
                y="-1500%"
                width="140%"
                height="3100%"
                colorInterpolationFilters="sRGB"
              >
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.006 0.018"
                  numOctaves="2"
                  seed="7"
                  result="noise"
                >
                  <animate
                    ref={turbRef}
                    begin="indefinite"
                    dur={`${WOBBLE_MS}ms`}
                    fill="freeze"
                    attributeName="baseFrequency"
                    keyTimes="0;0.2;0.45;0.7;0.9;1"
                    values="0.006 0.018;0.013 0.05;0.008 0.03;0.017 0.06;0.007 0.024;0.006 0.018"
                  />
                </feTurbulence>
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="0"
                  xChannelSelector="R"
                  yChannelSelector="G"
                >
                  <animate
                    ref={scaleRef}
                    begin="indefinite"
                    dur={`${WOBBLE_MS}ms`}
                    fill="freeze"
                    attributeName="scale"
                    keyTimes="0;0.1;0.32;0.52;0.72;0.9;1"
                    values="0;0;44;26;38;18;0"
                  />
                </feDisplacementMap>
              </filter>
            </defs>
          </svg>
          <div className="erupt-intro__dots" />
          <div
            className={
              wobbling
                ? 'erupt-intro__orb erupt-intro__orb--warp'
                : 'erupt-intro__orb'
            }
          />
          <div className="erupt-intro__logo">
            {LETTER_SLICES.map((slice, index) => {
              const left = (slice.x / SPRITE_W) * 100
              const width = (slice.w / SPRITE_W) * 100
              // % position aligns P% of image with P% of the letter box:
              // offset = P/100 * (elW - imgW) ⇒ P = x / (SPRITE_W - w) * 100
              const bgSizeX = (SPRITE_W / slice.w) * 100
              const bgPosX = (slice.x / (SPRITE_W - slice.w)) * 100
              return (
                <span
                  key={slice.x}
                  className="erupt-intro__logo-letter"
                  style={{
                    '--i': index,
                    left: `${left}%`,
                    width: `${width}%`,
                    backgroundSize: `${bgSizeX}% 100%`,
                    backgroundPosition: `${bgPosX}% 0`,
                  }}
                />
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
