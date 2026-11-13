import PageMeta from '../components/PageMeta'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import Button from '../components/Button'
import Icon from '../components/Icon'
import CTASection from '../components/CTASection'
import { pageMeta, site } from '../data/site'
import { services } from '../data/services'

export default function Services() {
  return (
    <>
      <PageMeta {...pageMeta.services} />

      <PageHero
        eyebrow="Services"
        title="Everything the brand needs. Nothing it doesn't."
        lead="Seven service lines that work as one system. Start with one, or hand us the whole 360°."
      >
        <div className="hero__actions">
          <Button to={site.cta.to} variant="primary" icon="arrow">
            {site.cta.label}
          </Button>
        </div>
      </PageHero>

      <nav className="jump-nav" aria-label="Services">
        <div className="wrap jump-nav__inner">
          {services.map((service) => (
            <a className="jump-nav__link" href={`#${service.id}`} key={service.id}>
              <span className="mono">{service.number}</span>
              <span>{service.title}</span>
            </a>
          ))}
        </div>
      </nav>

      <Section>
        <div className="wrap">
          {services.map((service) => (
            <article className="service-block" id={service.id} key={service.id}>
              <div className="service-block__intro">
                <div className="service-block__meta">
                  <span className="mono">{service.number}</span>
                  <span className="service-block__icon">
                    <Icon name={service.icon} size={22} />
                  </span>
                </div>
                <h2 className="h2">{service.title}</h2>
                <p className="lead">{service.description}</p>
                <p className="body">{service.short}</p>
                <Button to={site.cta.to} variant="ghost" size="sm" icon="arrow">
                  Start a project
                </Button>
              </div>

              <ul className="service-block__list">
                {service.items.map((item) => (
                  <li key={item}>
                    <Icon name="check" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <CTASection
        eyebrow="Not sure which line you need?"
        title="Start with the problem. We will map the services."
        text="Most projects touch two or three service lines. Tell us the goal and we will tell you what the work actually needs."
      />
    </>
  )
}
