import { Link, useParams } from 'react-router-dom'
import PageMeta from '../components/PageMeta'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import Button from '../components/Button'
import Icon from '../components/Icon'
import SectionLink from '../components/SectionLink'
import CTASection from '../components/CTASection'
import RevealText from '../components/RevealText'
import NotFound from './NotFound'
import { services } from '../data/services'

export default function ServiceDetail() {
  const { id } = useParams()
  const service = services.find((item) => item.id === id)

  if (!service) return <NotFound />

  const related = services.filter((item) => item.id !== service.id)

  return (
    <>
      <PageMeta title={`${service.title} — ERUPT`} description={service.description} />

      <PageHero
        eyebrow={`Services · ${service.number}`}
        title={service.title}
        lead={service.description}
      >
        <div className="hero__actions">
          <Button to="/contact" variant="primary" icon="arrow">
            Start a project
          </Button>
          <Button section="services" variant="ghost" icon="arrowUpRight">
            All services
          </Button>
        </div>
      </PageHero>

      <Section>
        <div className="wrap">
          <SectionLink className="text-link detail-back" section="services">
            <Icon name="arrow" size={16} /> Back to services
          </SectionLink>

          <article className="service-block detail-block">
            <div className="service-block__intro">
              <div className="service-block__meta">
                <span className="mono">{service.number}</span>
                <span className="service-block__icon">
                  <Icon name={service.icon} size={22} />
                </span>
              </div>
              <RevealText as="h2" className="h2" text="What this service covers." />
              <RevealText as="p" className="lead" text={service.short} />
              <RevealText
                as="p"
                className="body"
                text="Every engagement is scoped to the brand. We start with the problem, agree the deliverables and keep strategy, design and production in one room."
              />
              <Button to="/contact" variant="ghost" size="sm" icon="arrow">
                Start a project
              </Button>
            </div>

            <div className="detail-list-wrap">
              <p className="eyebrow">
                <RevealText text="Deliverables" />
              </p>
              <ul className="service-block__list">
                {service.items.map((item) => (
                  <li key={item}>
                    <Icon name="check" size={16} />
                    <span>{item}</span>
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
              <p className="eyebrow">
                <RevealText text="Other service lines" />
              </p>
              <RevealText
                as="h2"
                className="h2"
                text="The brand rarely needs just one."
              />
            </div>
            <RevealText
              as="p"
              className="section-head__note"
              text="Most projects touch two or three service lines. Here is the rest of the 360°."
            />
          </div>

          <div className="service-grid">
            {related.map((item) => (
              <Link className="service-card" to={`/services/${item.id}`} key={item.id}>
                <div className="service-card__top">
                  <span className="mono">{item.number}</span>
                  <Icon name={item.icon} size={22} />
                </div>
                <RevealText
                  as="h3"
                  className="service-card__title"
                  text={item.title}
                />
                <RevealText
                  as="p"
                  className="service-card__text"
                  text={item.short}
                />
                <span className="service-card__more">
                  Explore <Icon name="arrowUpRight" size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Section>

     

      <CTASection
        eyebrow={`${service.title} · Next step`}
        title="Tell us what the brand needs to do."
        text="Send the brief or the problem. We will come back with a scope for this service line and the pieces around it."
      />
    </>
  )
}
