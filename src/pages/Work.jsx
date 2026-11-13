import PageMeta from '../components/PageMeta'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import Button from '../components/Button'
import Icon from '../components/Icon'
import CTASection from '../components/CTASection'
import { pageMeta, site } from '../data/site'
import { showcase } from '../data/showcase'

const ways = [
  {
    number: '01',
    title: 'Project',
    text: 'A defined scope with a start and an end: identity, website, film or campaign.',
  },
  {
    number: '02',
    title: 'Retainer',
    text: 'An ongoing content and performance partner for the brand.',
  },
  {
    number: '03',
    title: 'Launch',
    text: 'A complete startup package: registration, brand, website and the first campaign.',
  },
]

export default function Work() {
  return (
    <>
      <PageMeta {...pageMeta.work} />

      <PageHero
        eyebrow="Work & capabilities"
        title="What we build, when the whole brand is in scope."
        lead="A capability showcase, not a client list. Each tile is a system we can build for you."
      >
        <div className="hero__actions">
          <Button to={site.cta.to} variant="primary" icon="arrow">
            {site.cta.label}
          </Button>
        </div>
      </PageHero>

      <Section>
        <div className="wrap">
          <div className="work-grid work-grid--full" data-placeholder="true">
            {showcase.map((item, index) => (
              <article
                className={`work-tile work-tile--${item.tone} work-tile--span-${index % 2 === 0 ? 'wide' : 'narrow'}`}
                key={item.number}
              >
                <div className="work-tile__top">
                  <span className="mono">{item.number}</span>
                  <Icon name="plus" size={18} />
                </div>
                <h2 className="work-tile__title">{item.title}</h2>
                <p className="work-tile__text">{item.text}</p>
                <ul className="work-tile__tags">
                  {item.items.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Ways to work together</p>
              <h2 className="h2">Three ways in. One standard.</h2>
            </div>
            <p className="section-head__note">
              Pick the shape that fits the stage the brand is in.
            </p>
          </div>

          <div className="way-grid">
            {ways.map((way) => (
              <article className="way-card" key={way.number}>
                <span className="mono">{way.number}</span>
                <h3 className="way-card__title">{way.title}</h3>
                <p className="way-card__text">{way.text}</p>
                <Button to={site.cta.to} variant="ghost" size="sm" icon="arrow">
                  Start a project
                </Button>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <CTASection
        eyebrow="Have a brief?"
        title="Have a brief? Or just a hunch?"
        text="Send either. We will help you shape the next step, with a clear scope and no guesswork."
      />
    </>
  )
}
