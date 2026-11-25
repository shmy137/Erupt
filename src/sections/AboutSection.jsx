import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import Section from '../components/Section'
import SectionLink from '../components/SectionLink'
import RevealText from '../components/RevealText'
import CountUp from '../components/CountUp'
import Icon from '../components/Icon'
import { board, ownerCardAssets } from '../data/board'
import { stats } from '../data/stats'

const Lanyard = lazy(() => import('../components/Lanyard'))



function LanyardFallback({ person }) {
  return (
    <div
      className={`board-lanyard__fallback board-lanyard__fallback--${person.tone}`}
      aria-hidden="true"
    >
      {person.initials}
    </div>
  )
}

function OwnerLanyard({ person, index }) {
  const ref = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    let timer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect()
          timer = window.setTimeout(() => setReady(true), index * 120)
        }
      },
      { rootMargin: '240px' },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
    }
  }, [index])

  return (
    <figure className="board-lanyard" ref={ref}>
      <div className="board-lanyard__stage">
        {ready ? (
          <Suspense fallback={<LanyardFallback person={person} />}>
            <Lanyard
              frontImage={person.frontImage}
              backImage={ownerCardAssets.backImage}
              strapImage={ownerCardAssets.strapImage}
              imageFit="cover"
              cardColor="#ffffff"
              finish="matte"
              cornerRadius={0.28}
              size={0.62}
              anchor="center"
              strapLength={0.48}
              strapWidth={0.5}
              metal="graphite"
              gravity={1}
              damping={0.9}
              elasticity={0.15}
              breeze={0}
              interactive={false}
              intro
            />
          </Suspense>
        ) : (
          <LanyardFallback person={person} />
        )}
      </div>
    </figure>
  )
}

export default function AboutSection() {
  return (
    <>
      <Section id="about">
        <div className="wrap split">
          <div className="split__left">
            <p className="eyebrow">
              <RevealText text="About ERUPT" />
            </p>
            <RevealText
              as="h2"
              className="h2"
              text="We built the agency we kept wishing existed."
            />
          </div>
          <div className="split__right" data-placeholder="true">
            <RevealText
              as="p"
              className="lead"
              text="ERUPT started with a simple frustration: good brands were being built in fragments. One vendor made the logo. Another ran the ads. A third shot the video. Nobody was responsible for the whole thing."
            />
            <RevealText
              as="p"
              className="body"
              text="So we built a group that keeps strategy, design, production and performance in one room. The same team that writes the plan makes the work and reads the numbers."
            />
            <RevealText
              as="p"
              className="body"
              text="Today we work with businesses in Kannur and across Kerala — new startups, established shops, clinics, restaurants, builders and brands ready for their next chapter."
            />
            <SectionLink className="text-link" section="work">
              See the work <Icon name="arrowUpRight" size={16} />
            </SectionLink>
          </div>
        </div>
      </Section>

      <Section tone="orange" className="stats">
        <div className="wrap">
          <div className="stats__grid">
            {stats.map((stat) => (
              <div
                className="stat"
                key={stat.label}
                data-placeholder={stat.assumed ? 'true' : undefined}
              >
                <CountUp className="stat__value" value={stat.value} />
                <RevealText as="span" className="stat__label" text={stat.label} />
              </div>
            ))}
          </div>
          <RevealText
            as="p"
            className="stats__note"
            text="Built in Kannur. Working wherever the brand needs to go."
          />
        </div>
      </Section>

    

      <Section tone="surface">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">
                <RevealText text="The board" />
              </p>
              <RevealText
                as="h2"
                className="h2"
                text="The people who own the outcome."
              />
            </div>
            <RevealText
              as="p"
              className="section-head__note"
              text="A small senior team, close to the work."
            />
          </div>

          <div className="board-lanyard-grid">
            {board.map((person, index) => (
              <OwnerLanyard key={person.name} person={person} index={index} />
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
