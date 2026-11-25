import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const DURATION = 1600

function parseValue(value) {
  const match = String(value).match(/^(\d+)(.*)$/)
  if (!match) return { target: 0, suffix: String(value) }
  return { target: Number(match[1]), suffix: match[2] }
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

export default function CountUp({ value, className = '' }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { target, suffix } = parseValue(value)
  const [display, setDisplay] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (reduce) return undefined

    const node = ref.current
    if (!node) return undefined

    let frame
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true
        observer.disconnect()

        const start = performance.now()
        const tick = (now) => {
          const t = Math.min((now - start) / DURATION, 1)
          setDisplay(Math.round(easeOutCubic(t) * target))
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { rootMargin: '0px 0px -80px 0px', threshold: 0.4 },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [reduce, target])

  const shown = reduce ? target : display

  return (
    <span ref={ref} className={className} aria-label={String(value)}>
      {shown}
      {suffix}
    </span>
  )
}
