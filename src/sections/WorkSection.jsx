import { useEffect } from 'react'
import Section from '../components/Section'
import Button from '../components/Button'
import { showcase } from '../data/showcase'



export default function WorkSection() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll('.work-stack__item'))
    let raf = 0

    const update = () => {
      raf = 0
      const vh = window.innerHeight || 1
      items.forEach((item) => {
        const rect = item.getBoundingClientRect()
        const progress = Math.min(Math.max(1 - Math.abs(rect.top) / vh, 0), 1)
        const imageScale = 1.12 - progress * 0.12
        const contentY = (1 - progress) * 24
        item.style.setProperty('--image-scale', imageScale.toFixed(4))
        item.style.setProperty('--content-y', `${contentY.toFixed(2)}px`)
      })
    }

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <Section id="work" className="section--work-stack">
        <div className="wrap work-stack__head">
          <div className="section-head">
            <div>
              <p className="eyebrow">Work & capabilities</p>
              <h2 className="h2">What we build, when the whole brand is in scope.</h2>
            </div>
            <p className="section-head__note">
              A capability showcase, not a client list. Each piece is a system we can
              build for you.
            </p>
          </div>
        </div>

        <div className="work-stack">
          {showcase.map((item, index) => (
            <article
              className="work-stack__item"
              key={item.slug}
              style={{ '--i': index }}
            >
              <div className="work-stack__media">
                <img
                  className="work-stack__image"
                  src={item.image}
                  alt={item.imageAlt || item.title}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>
              <div className="work-stack__content">
                <span className="mono work-stack__num">{item.number}</span>
                <h3 className="work-stack__title">{item.title}</h3>
                <p className="work-stack__text">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

    
    </>
  )
}
