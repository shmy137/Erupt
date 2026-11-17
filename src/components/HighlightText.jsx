import { Fragment, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { buildTimeline } from '../lib/revealTimeline'

const normalize = (word) => word.toLowerCase().replace(/[^a-z0-9]/g, '')

const DIM = 'rgba(255, 255, 255, 0.2)'
const LIT = 'rgba(255, 255, 255, 0.92)'
const ACCENT_DIM = 'rgba(240, 73, 37, 0.3)'
const ACCENT_LIT = '#f04925'
const OFFSET = ['start 0.9', 'end 0.72']

function HighlightWord({ word, start, end, progress, accent, isLast }) {
  const reveal = useTransform(progress, [start, end], [0, 1], { clamp: true })
  const color = useTransform(
    reveal,
    [0, 1],
    accent ? [ACCENT_DIM, ACCENT_LIT] : [DIM, LIT],
  )

  return (
    <Fragment>
      <motion.span
        className={`highlight-word${accent ? ' highlight-word--accent' : ''}`}
        style={{ color }}
      >
        {word}
      </motion.span>
      {isLast ? null : ' '}
    </Fragment>
  )
}

function AnimatedHighlight({ text, highlightSet, className }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: OFFSET })
  const words = buildTimeline(text)

  return (
    <p ref={ref} className={`highlight-text${className ? ` ${className}` : ''}`}>
      {words.map((entry, index) => (
        <HighlightWord
          key={`${entry.word}-${index}`}
          word={entry.word}
          start={entry.start}
          end={entry.end}
          progress={scrollYProgress}
          accent={highlightSet.has(normalize(entry.word))}
          isLast={index === words.length - 1}
        />
      ))}
    </p>
  )
}

function StaticHighlight({ text, highlightSet, className, innerRef }) {
  const words = buildTimeline(text)

  return (
    <p
      ref={innerRef}
      className={`highlight-text is-lit${className ? ` ${className}` : ''}`}
    >
      {words.map((entry, index) => {
        const accent = highlightSet.has(normalize(entry.word))
        return (
          <Fragment key={`${entry.word}-${index}`}>
            <span
              className={`highlight-word${accent ? ' highlight-word--accent' : ''}`}
            >
              {entry.word}
            </span>
            {index < words.length - 1 ? ' ' : null}
          </Fragment>
        )
      })}
    </p>
  )
}

export default function HighlightText({ text, highlight = [], className = '' }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [active, setActive] = useState(false)
  const highlightSet = new Set(highlight.map(normalize))

  useEffect(() => {
    if (reduce || active) return undefined
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { rootMargin: '240px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reduce, active])

  if (reduce || !active) {
    return (
      <StaticHighlight
        innerRef={ref}
        text={text}
        highlightSet={highlightSet}
        className={className}
      />
    )
  }

  return (
    <AnimatedHighlight
      text={text}
      highlightSet={highlightSet}
      className={className}
    />
  )
}
