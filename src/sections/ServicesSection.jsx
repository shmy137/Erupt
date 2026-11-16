import { Link } from 'react-router-dom'
import Section from '../components/Section'
import Button from '../components/Button'
import Icon from '../components/Icon'
import { services } from '../data/services'

export default function ServicesSection() {
  return (
    <Section tone="surface" id="services">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow">What we do</p>
            <h2 className="h2">Seven service lines. One connected team.</h2>
          </div>
          <p className="section-head__note">
            Pick a line to see the full scope, or hand us the whole 360°.
          </p>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <Link
              className="service-card"
              to={`/services/${service.id}`}
              key={service.id}
            >
              <div className="service-card__top">
                <span className="mono">{service.number}</span>
                <Icon name={service.icon} size={22} />
              </div>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__text">{service.short}</p>
              <span className="service-card__more">
                Explore <Icon name="arrowUpRight" size={14} />
              </span>
            </Link>
          ))}

          <div className="service-card service-card--cta">
            <p className="mono">Not sure where to start?</p>
            <h3 className="service-card__title">Tell us the goal. We will map the route.</h3>
            <Button to="/contact" variant="dark" size="sm" icon="arrow">
              Talk to us
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}
