import Section from '../components/Section'
import SectionLink from '../components/SectionLink'
import Icon from '../components/Icon'
import { values } from '../data/values'
import { board } from '../data/board'

const mission =
  'To give every brand one team, one plan and the full 360° of creative and digital firepower.'
const vision = 'To make Kannur a launchpad for brands that compete far beyond it.'

export default function AboutSection() {
  return (
    <>
      <Section id="about">
        <div className="wrap split">
          <div className="split__left">
            <p className="eyebrow">About ERUPT</p>
            <h2 className="h2">We built the agency we kept wishing existed.</h2>
          </div>
          <div className="split__right" data-placeholder="true">
            <p className="lead">
              ERUPT started with a simple frustration: good brands were being built
              in fragments. One vendor made the logo. Another ran the ads. A third
              shot the video. Nobody was responsible for the whole thing.
            </p>
            <p className="body">
              So we built a group that keeps strategy, design, production and
              performance in one room. The same team that writes the plan makes the
              work and reads the numbers.
            </p>
            <p className="body">
              Today we work with businesses in Kannur and across Kerala — new
              startups, established shops, clinics, restaurants, builders and brands
              ready for their next chapter.
            </p>
            <SectionLink className="text-link" section="work">
              See the work <Icon name="arrowUpRight" size={16} />
            </SectionLink>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <div className="wrap">
          <div className="mission-grid" data-placeholder="true">
            <div className="mission-block mission-block--orange">
              <p className="eyebrow">Mission</p>
              <p className="mission-block__text">{mission}</p>
            </div>
            <div className="mission-block mission-block--dark">
              <p className="eyebrow">Vision</p>
              <p className="mission-block__text">{vision}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">What we stand on</p>
              <h2 className="h2">Five values. No posters on the wall.</h2>
            </div>
            <p className="section-head__note">
              These are the rules we use when the work gets hard.
            </p>
          </div>

          <div className="values-list">
            {values.map((value) => (
              <div className="value-row" key={value.number}>
                <span className="mono">{value.number}</span>
                <h3 className="value-row__title">{value.title}</h3>
                <p className="value-row__text">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">The board</p>
              <h2 className="h2">The people who own the outcome.</h2>
            </div>
            <p className="section-head__note">
              A small senior team, close to the work.
            </p>
          </div>

          <div className="board-grid">
            {board.map((person) => (
              <article className="board-card" key={person.name} data-placeholder="true">
                <div
                  className={`board-card__portrait board-card__portrait--${person.tone}`}
                  aria-hidden="true"
                >
                  {person.initials}
                </div>
                <div className="board-card__body">
                  <h3 className="board-card__name">{person.name}</h3>
                  <p className="board-card__role">{person.role}</p>
                  <p className="board-card__bio">{person.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
