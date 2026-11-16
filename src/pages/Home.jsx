import { useEffect } from 'react'
import PageMeta from '../components/PageMeta'
import Section from '../components/Section'
import Button from '../components/Button'
import Icon from '../components/Icon'
import SectionLink from '../components/SectionLink'
import Diagram360 from '../components/Diagram360'
import HighlightText from '../components/HighlightText'
import ServicesSection from '../sections/ServicesSection'
import WorkSection from '../sections/WorkSection'
import ContactSection from '../sections/ContactSection'
import { consumePendingSection, scrollToSection } from '../lib/sectionScroll'
import { pageMeta, site } from '../data/site'
import { services } from '../data/services'
import { stats } from '../data/stats'
import { process } from '../data/process'

const heroChips = ['Branding', 'Social', 'Video', 'Web', 'Print', 'Ads', 'Startup']

export default function Home() {
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const section = consumePendingSection()
      if (section) scrollToSection(section)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <>
      <PageMeta {...pageMeta.home} />

      <section className="hero">
        <div className="wrap hero__inner">
          <div className="hero__text">
            <p className="eyebrow">Creative + digital · Kannur, Kerala</p>
            <h1 className="hero__title">
              One team for <span className="text-accent">every side</span> of your brand.
            </h1>
            <p className="lead hero__lead">
              ERUPT is a 360° creative and digital marketing group. We plan, design,
              produce and run the whole brand — from the first logo to the last ad.
            </p>
            <div className="hero__actions">
              <Button to={site.cta.to} variant="primary" icon="arrow">
                {site.cta.label}
              </Button>
              <Button section="work" variant="ghost" icon="arrowUpRight">
                See the work
              </Button>
            </div>
            <ul className="hero__chips" aria-label="What we do">
              {heroChips.map((chip) => (
                <li key={chip}>{chip}</li>
              ))}
            </ul>
          </div>

          <div className="hero__board" aria-hidden="true">
            <div className="hero-board">
              <div className="hero-board__top">
                <span className="mono">The 360°</span>
                <span className="hero-board__dot" />
              </div>
              <span className="hero-board__big">360°</span>
              <div className="hero-board__rows">
                {services.map((service) => (
                  <div className="hero-board__row" key={service.id}>
                    <span className="mono">{service.number}</span>
                    <span>{service.title}</span>
                  </div>
                ))}
              </div>
              <div className="hero-board__foot">
                <span>ERUPT</span>
                <span className="mono">KANNUR · KERALA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section className="intro">
        <div className="wrap split">
          <div className="split__left">
            <p className="eyebrow">The problem</p>
            <h2 className="h2">
              Most brands are built in pieces. A logo here, a reel there, ads
              somewhere else.
            </h2>
          </div>
          <div className="split__right">
            <p className="lead">
              The pieces rarely add up. The story drifts, the look breaks and
              nobody owns the whole picture.
            </p>
            <p className="body">
              ERUPT fixes that by keeping strategy, design, production and
              performance in one room. One brief, one standard, one team that
              sees the brand from every angle.
            </p>
            <SectionLink className="text-link" section="about">
              How we work <Icon name="arrowUpRight" size={16} />
            </SectionLink>
          </div>
        </div>
      </Section>

                
        <ServicesSection />

      <Section tone="dark" id="the-360">
        <div className="wrap split split--wide">
          <div className="split__left">
            <p className="eyebrow">The 360°</p>
            <h2 className="h2 h2--inverse">The whole brand, in one system.</h2>
            <HighlightText
              className="highlight-text--inverse"
              text="One team plans the whole brand, makes the content, runs the ads, builds the site and prints the hoarding."
              highlight={['one', 'team', 'whole', 'brand']}
            />
            <ul className="dot-list dot-list--inverse">
              <li>No handoffs between agencies.</li>
              <li>No gaps between the story and the spend.</li>
              <li>No guessing what the numbers mean.</li>
            </ul>
          </div>
          <div className="split__right">
            <Diagram360 />
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
                <span className="stat__value">{stat.value}</span>
                <span className="stat__label">{stat.label}</span>
              </div>
            ))}
          </div>
          <p className="stats__note">
            Built in Kannur. Working wherever the brand needs to go.
          </p>
        </div>
      </Section>

      <WorkSection />

      <Section tone="surface" id="process">
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

      <ContactSection />
    </>
  )
}
