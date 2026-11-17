import { Fragment, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { buildTimeline } from '../lib/revealTimeline'

const Y_FROM = 16
const DEFAULT_OFFSET = ['start 0.92', 'end 0.78']

function RevealWord({ word, start, end, progress, isLast }) {
  const reveal = useTransform(progress, [start, end], [0, 1], { clamp: true })
  const y = useTransform(reveal, [0, 1], [Y_FROM, 0])

  return (
    <Fragment>
      <motion.span className="reveal-word" style={{ opacity: reveal, y }}>
        {word}
      </motion.span>
      {isLast ? null : ' '}
    </Fragment>
  )
}

function AnimatedText({ as: Tag, text, className, offset }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset })
  const words = buildTimeline(text)

  return (
    <Tag ref={ref} className={`reveal-text${className ? ` ${className}` : ''}`}>
      {words.map((entry, index) => (
        <RevealWord
          key={`${entry.word}-${index}`}
          word={entry.word}
          start={entry.start}
          end={entry.end}
          progress={scrollYProgress}
          isLast={index === words.length - 1}
        />
      ))}
    </Tag>
  )
}

export default function RevealText({
  as: Tag = 'span',
  text,
  className = '',
  offset = DEFAULT_OFFSET,
}) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [active, setActive] = useState(false)

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
      <Tag ref={ref} className={className}>
        {text}
      </Tag>
    )
  }

  return (
    <AnimatedText as={Tag} text={text} className={className} offset={offset} />
  )
}
