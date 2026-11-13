import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Wordmark from './Wordmark'
import Button from './Button'
import Icon from './Icon'
import { site } from '../data/site'

export default function Nav() {
  const [menuPath, setMenuPath] = useState(null)
  const location = useLocation()
  const open = menuPath === location.pathname

  const toggleMenu = () => {
    setMenuPath((current) => (current === location.pathname ? null : location.pathname))
  }

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuPath(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="nav">
        <div className="wrap nav__inner">
          <Wordmark />
          <nav className="nav__links" aria-label="Main">
            {site.nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav__link${isActive ? ' is-active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="nav__actions">
            <Button to={site.cta.to} variant="primary" size="sm">
              {site.cta.label}
            </Button>
            <button
              className="nav__toggle"
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={toggleMenu}
            >
              <Icon name={open ? 'close' : 'menu'} size={22} />
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div id="mobile-menu" className="mobile-menu">
          <div className="wrap mobile-menu__inner">
            <nav aria-label="Mobile">
              {site.nav.map((item, index) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="mobile-menu__link"
                  onClick={() => setMenuPath(null)}
                >
                  <span className="mobile-menu__num">0{index + 1}</span>
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="mobile-menu__foot">
              <Button
                to={site.cta.to}
                variant="inverse"
                icon="arrow"
                onClick={() => setMenuPath(null)}
              >
                {site.cta.label}
              </Button>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={site.phoneHref}>{site.phone}</a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
