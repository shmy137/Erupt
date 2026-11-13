import { useEffect, useRef, useState } from 'react'

const normalize = (word) => word.toLowerCase().replace(/[^a-z0-9]/g, '')

export default function HighlightText({ text, highlight = [], className = '' }) {
  const ref = useRef(null)
  const [lit, setLit] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const words = text.split(' ')
  const highlightSet = new Set(highlight.map(normalize))

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLit(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <p ref={ref} className={`highlight-text${lit ? ' is-lit' : ''}${className ? ` ${className}` : ''}`}>
      {words.map((word, index) => {
        const accent = highlightSet.has(normalize(word))
        return (
          <span
            key={`${word}-${index}`}
            className={`highlight-word${accent ? ' highlight-word--accent' : ''}`}
            style={{ transitionDelay: `${index * 32}ms` }}
          >
            {word}
            {index < words.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </p>
  )
}
