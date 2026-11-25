import { useEffect } from 'react'
import PageMeta from '../components/PageMeta'
import Section from '../components/Section'
import Button from '../components/Button'
import Icon from '../components/Icon'
import SectionLink from '../components/SectionLink'
import Diagram360 from '../components/Diagram360'
import HighlightText from '../components/HighlightText'
import RevealText from '../components/RevealText'
import AboutSection from '../sections/AboutSection'
import WorkSection from '../sections/WorkSection'
import ContactSection from '../sections/ContactSection'
import { consumePendingSection, scrollToSection } from '../lib/sectionScroll'
import { pageMeta, site } from '../data/site'
import { services } from '../data/services'

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

      <div className="home-flow">
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
              <p className="eyebrow">
                <RevealText text="The problem" />
              </p>
              <RevealText
                as="h2"
                className="h2"
                text="Most brands are built in pieces. A logo here, a reel there, ads somewhere else."
              />
            </div>
            <div className="split__right">
              <RevealText
                as="p"
                className="lead"
                text="The pieces rarely add up. The story drifts, the look breaks and nobody owns the whole picture."
              />
              <RevealText
                as="p"
                className="body"
                text="ERUPT fixes that by keeping strategy, design, production and performance in one room. One brief, one standard, one team that sees the brand from every angle."
              />
              <SectionLink className="text-link" section="about">
                How we work <Icon name="arrowUpRight" size={16} />
              </SectionLink>
            </div>
          </div>
        </Section>

        <AboutSection />


        <Section tone="dark" id="services">
          <div className="wrap split split--wide">
            <div className="split__left">
              <p className="eyebrow">
                <RevealText text="Services" />
              </p>
              <RevealText
                as="h2"
                className="h2 h2--inverse"
                text="The whole brand, in one system."
              />
              <HighlightText
                className="highlight-text--inverse"
                text="One team plans the whole brand, makes the content, runs the ads, builds the site and prints the hoarding."
                highlight={['one', 'team', 'whole', 'brand']}
              />
             
            </div>
            <div className="split__right">
              <Diagram360 />
            </div>
          </div>
        </Section>

        <WorkSection />
      </div>

      <div id="contact" className="home-reveal">
        <ContactSection />
      </div>
    </>
  )
}
