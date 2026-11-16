import { Link, useParams } from 'react-router-dom'
import PageMeta from '../components/PageMeta'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import Button from '../components/Button'
import Icon from '../components/Icon'
import SectionLink from '../components/SectionLink'
import CTASection from '../components/CTASection'
import NotFound from './NotFound'
import { showcase } from '../data/showcase'
import { process } from '../data/process'

export default function WorkDetail() {
  const { slug } = useParams()
  const item = showcase.find((entry) => entry.slug === slug)

  if (!item) return <NotFound />

  const related = showcase.filter((entry) => entry.slug !== item.slug)

  return (
    <>
      <PageMeta title={`${item.title} — ERUPT`} description={item.description} />

      <PageHero
        eyebrow={`Work · ${item.number}`}
        title={item.title}
        lead={item.description}
      >
        <div className="hero__actions">
          <Button to="/contact" variant="primary" icon="arrow">
            Start a project
          </Button>
          <Button section="work" variant="ghost" icon="arrowUpRight">
            All capabilities
          </Button>
        </div>
      </PageHero>

      <Section>
        <div className="wrap">
          <SectionLink className="text-link detail-back" section="work">
            <Icon name="arrow" size={16} /> Back to work
          </SectionLink>

          <article className="service-block detail-block">
            <div className="service-block__intro">
              <div className="service-block__meta">
                <span className="mono">{item.number}</span>
                <span className="service-block__icon">
                  <Icon name="plus" size={22} />
                </span>
              </div>
              <h2 className="h2">What this capability covers.</h2>
              <p className="lead">{item.text}</p>
              <p className="body">
                This is a system we can build for the whole brand, not a one-off
                asset. We scope it around the goal, produce the work and keep it
                consistent across every channel it touches.
              </p>
              <ul className="work-tile__tags detail-tags">
                {item.items.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <Button to="/contact" variant="ghost" size="sm" icon="arrow">
                Start a project
              </Button>
            </div>

            <div className="detail-list-wrap">
              <p className="eyebrow">Included in the build</p>
              <ul className="service-block__list">
                {item.items.map((entry) => (
                  <li key={entry}>
                    <Icon name="check" size={16} />
                    <span>{entry}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </Section>

      <Section tone="surface">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">The rest of the 360°</p>
              <h2 className="h2">Build the piece. Or the whole system.</h2>
            </div>
            <p className="section-head__note">
              Every capability is designed to connect to the others.
            </p>
          </div>

          <div className="work-grid">
            {related.map((entry, index) => (
              <Link
                className={`work-tile work-tile--${entry.tone} work-tile--span-${index % 2 === 0 ? 'wide' : 'narrow'}`}
                to={`/work/${entry.slug}`}
                key={entry.slug}
              >
                <div className="work-tile__top">
                  <span className="mono">{entry.number}</span>
                  <Icon name="arrowUpRight" size={18} />
                </div>
                <h3 className="work-tile__title">{entry.title}</h3>
                <p className="work-tile__text">{entry.text}</p>
                <ul className="work-tile__tags">
                  {entry.items.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">How we work</p>
              <h2 className="h2">Four steps. No mystery.</h2>
            </div>
            <p className="section-head__note">
              Clear scope, visible progress, work that ships.
            </p>
          </div>

          <div className="process-grid">
            {process.map((step) => (
              <div className="process-step" key={step.number}>
                <span className="process-step__num">{step.number}</span>
                <h3 className="process-step__title">{step.title}</h3>
                <p className="process-step__text">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CTASection
        eyebrow={`${item.title} · Next step`}
        title="Have a goal for this part of the brand?"
        text="Tell us where it needs to go. We will map the scope for this capability and the pieces it connects to."
      />
    </>
  )
}
