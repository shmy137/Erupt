import Button from './Button'
import Icon from './Icon'
import { site } from '../data/site'

export default function CTASection({
  eyebrow = 'Next step',
  title = 'Your next chapter should be loud.',
  text = 'Tell us what you are building. We will come back with a plan for the brand, the content and the channels.',
}) {
  return (
    <section className="section section--orange cta-band">
      <div className="wrap cta-band__inner">
        <div className="cta-band__text">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="h2">{title}</h2>
          <p className="lead">{text}</p>
        </div>
        <div className="cta-band__actions">
          <Button to={site.cta.to} variant="dark" icon="arrow">
            {site.cta.label}
          </Button>
          <a className="text-link text-link--dark" href={`mailto:${site.email}`}>
            Email the team <Icon name="arrowUpRight" size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
