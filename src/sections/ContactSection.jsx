import { Link } from 'react-router-dom'
import Section from '../components/Section'
import Icon from '../components/Icon'
import { site } from '../data/site'

export default function ContactSection() {
  return (
    <Section className="connect">
      <div className="wrap connect__inner">
        <div className="connect__text">
          <h2 className="connect__title">
            Got an Interesting Project?
          </h2>
          <h2 className="connect__title connect__accent">Let's Connect.</h2>
          <div className="connect__pill">
            <a href={site.phoneHref} className="connect__pill__link">
              <Icon name="phone" size={16} /> Call now
            </a>
            <a href={`mailto:${site.email}`} className="connect__pill__link">
              <Icon name="mail" size={16} /> Mail us
            </a>
            <a href={site.socials.behance} target="_blank" rel="noopener noreferrer" className="connect__pill__link connect__pill__icon">
              <Icon name="behance" size={18} />
            </a>
            <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="connect__pill__link connect__pill__icon">
              <Icon name="linkedin" size={18} />
            </a>
            <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="connect__pill__link connect__pill__icon">
              <Icon name="instagram" size={18} />
            </a>
            <a href={site.socials.dribbble} target="_blank" rel="noopener noreferrer" className="connect__pill__link connect__pill__icon">
              <Icon name="dribbble" size={18} />
            </a>
          </div>
        </div>
        <Link to="/contact" className="connect__arrow">
          <div className="connect__circle">
            <Icon name="arrowUpRight" size={24} />
          </div>
        </Link>
      </div>
    </Section>
  )
}
