import { Link } from 'react-router-dom'
import Wordmark from './Wordmark'
import Icon from './Icon'
import SectionLink from './SectionLink'
import { site } from '../data/site'
import { services } from '../data/services'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
            <Wordmark inverse />
            <p className="footer__tagline">
              360° creative and digital marketing from Kannur, Kerala.
            </p>
          </div>

          <div className="footer__cols">
            <div className="footer__col">
              <p className="footer__label">Explore</p>
              {site.nav.map((item) => {
                if (item.label === 'Contact') {
                  return (
                    <Link key={item.section} to="/contact">
                      {item.label}
                    </Link>
                  )
                }
                return (
                  <SectionLink key={item.section} section={item.section}>
                    {item.label}
                  </SectionLink>
                )
              })}
            </div>
            <div className="footer__col">
              <p className="footer__label">Services</p>
              {services.map((service) => (
                <Link key={service.id} to={`/services/${service.id}`}>
                  {service.title}
                </Link>
              ))}
            </div>
            <div className="footer__col">
              <p className="footer__label">Contact</p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={site.phoneHref}>{site.phone}</a>
              <a href={site.mapUrl} target="_blank" rel="noopener noreferrer">
                {site.address.line1}
              </a>
              <a href={site.mapUrl} target="_blank" rel="noopener noreferrer">
                {site.address.line2}
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} {site.fullName}. All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <Link to="/contact">Start a project</Link>
            <button
              type="button"
              className="footer__top-btn"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Back to top <Icon name="arrowUpRight" size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
