import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Section from '../components/Section'
import Icon from '../components/Icon'
import { showcase } from '../data/showcase'

/*
  Sizing: 1u = (card width / 185). The whole carousel scales as one piece,
  matching the reference frame (820px wide, centre card 185px wide).
*/
const u = (n) => `calc(var(--w) * ${(n / 185).toFixed(5)})`

const wrap = (n, total) => {
  const half = total / 2
  return ((((n + half) % total) + total) % total) - half
}

/* |offset| -> [translateX in card widths, rotateY deg, scale] */
const SLOT = {
  0: [0, 0, 1],
  1: [1.077, 25, 1.1],
  2: [2.078, 45, 1.1],
  3: [3.0, 55, 1.1],
}

const arrowBtn =
  'grid place-items-center rounded-full border-0 bg-[#ebebe9] p-0 text-neutral-800 cursor-pointer ' +
  'transition-colors duration-200 hover:bg-[#dcdcd9]'

/*
  showcase items: { slug, title, text, image?, imageAlt?, bg?, ink? }
  - with `image`: photo card, white text over a dark overlay
  - without `image`: solid card using `bg` (CSS colour) and `ink` (text colour)
*/
export default function WorkSection() {
  const [{ active, prev: prevActive }, setCarousel] = useState({ active: 3, prev: 3 })
  const [paused, setPaused] = useState(false)
  const reducedMotion = useRef(false)
  const dragX = useRef(null)
  const total = showcase.length

  const setActive = (update) => {
    setCarousel((s) => {
      const next = typeof update === 'function' ? update(s.active) : update
      if (next === s.active) return s
      return { active: next, prev: s.active }
    })
  }

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    if (paused || reducedMotion.current) return
    const timer = setInterval(() => setActive((a) => (a + 1) % total), 3000)
    return () => clearInterval(timer)
  }, [paused, total])

  const go = (dir) => setActive((a) => (a + dir + total) % total)

  const onPointerDown = (e) => {
    dragX.current = e.clientX
  }
  const onPointerUp = (e) => {
    if (dragX.current == null) return
    const dx = e.clientX - dragX.current
    dragX.current = null
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
  }

  return (
    <Section
      id="work"
      className="overflow-hidden bg-[#f8f8f6] py-[clamp(72px,11vh,144px)]!"
    >
      <div
        className="w-full select-none font-['Inter',sans-serif] text-neutral-900"
        style={{ '--w': 'clamp(130px, 22.56vw, 400px)' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          setPaused(false)
          dragX.current = null
        }}
      >
        {/* label */}
        <div className="mx-auto w-[min(100%-var(--pad)*2,var(--wrap))]" style={{ marginBottom: u(10) }}>
          <p
            className="m-0 font-medium normal-case tracking-[-0.01em] text-neutral-900"
            style={{ fontSize: u(10.5) }}
          >
            Selected work
          </p>
        </div>

        {/* stage */}
        <div
          className="relative w-full cursor-grab touch-pan-y active:cursor-grabbing"
          style={{ height: u(300) }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          {showcase.map((item, index) => {
            const offset = wrap(index - active, total)
            const abs = Math.abs(offset)
            const sign = Math.sign(offset)
            const hidden = abs > 2
            const isCenter = offset === 0
            const [tx, rot, s] = SLOT[Math.min(abs, 3)]

            // a card that wraps from one side to the other should jump, not fly across
            const prevOffset = wrap(index - prevActive, total)
            const jumped = Math.abs(offset - prevOffset) > 2

            const hasImage = Boolean(item.image)
            const ink = hasImage ? '#fff' : item.ink || '#fff'

            return (
              <div
                key={item.slug}
                role="button"
                tabIndex={hidden ? -1 : 0}
                aria-label={item.title}
                aria-hidden={hidden}
                onClick={() => setActive(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActive(index)
                  }
                }}
                className={
                  'absolute overflow-hidden will-change-transform motion-reduce:transition-none ' +
                  (jumped
                    ? 'transition-none'
                    : 'transition-[transform,opacity] duration-[700ms] ease-[cubic-bezier(0.22,0.8,0.24,1)]')
                }
                style={{
                  left: '50%',
                  top: '50%',
                  width: 'var(--w)',
                  height: u(233),
                  marginLeft: 'calc(var(--w) / -2)',
                  marginTop: u(-116.5),
                  borderRadius: u(9),
                  background: hasImage ? '#555' : item.bg,
                  color: ink,
                  transform: `translateX(calc(var(--w) * ${sign * tx})) scale(${s}) perspective(calc(var(--w) * 3.4)) rotateY(${-sign * rot}deg)`,
                  opacity: hidden ? 0 : 1,
                  zIndex: 20 - abs * 2,
                  pointerEvents: hidden ? 'none' : 'auto',
                }}
              >
                {hasImage && (
                  <>
                    <img
                      className="pointer-events-none absolute inset-0 block h-full w-full select-none object-cover"
                      src={item.image}
                      alt={item.imageAlt || item.title}
                      loading={abs > 1 ? 'lazy' : 'eager'}
                      draggable="false"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-black/25" />
                  </>
                )}

                <div
                  className="pointer-events-none relative flex flex-col items-center text-center"
                  style={{ paddingTop: u(90) }}
                >
                  <h3
                    className="m-0 font-['Newsreader',serif] font-normal tracking-[-0.01em]"
                    style={{ fontSize: u(21), lineHeight: 1.1 }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="m-0 opacity-80"
                    style={{ fontSize: u(7), lineHeight: 1.45, marginTop: u(8), maxWidth: u(112) }}
                  >
                    {item.text}
                  </p>
                </div>

                <Link
                  to={`/work/${item.slug}`}
                  onClick={(e) => e.stopPropagation()}
                  tabIndex={hidden || !isCenter ? -1 : 0}
                  className="absolute left-1/2 flex -translate-x-1/2 items-center whitespace-nowrap rounded-full text-inherit no-underline backdrop-blur-sm transition-[filter] duration-200 hover:brightness-125"
                  style={{
                    bottom: u(15),
                    height: u(15),
                    paddingInline: u(9),
                    gap: u(4),
                    fontSize: u(6),
                    background: 'color-mix(in srgb, currentColor 18%, transparent)',
                  }}
                >
                  View case study
                  <Icon name="arrow" size={Math.max(6, 8)} />
                </Link>
              </div>
            )
          })}
        </div>

        {/* arrows */}
        <div className="flex justify-center" style={{ marginTop: u(14), gap: u(11) }}>
          <button
            type="button"
            className={arrowBtn}
            style={{ width: u(30), height: u(30) }}
            aria-label="Previous work"
            onClick={() => go(-1)}
          >
            <Icon name="arrow" size={14} className="rotate-180" />
          </button>
          <button
            type="button"
            className={arrowBtn}
            style={{ width: u(30), height: u(30) }}
            aria-label="Next work"
            onClick={() => go(1)}
          >
            <Icon name="arrow" size={14} />
          </button>
        </div>
      </div>
    </Section>
  )
}