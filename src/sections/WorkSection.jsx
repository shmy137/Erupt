import Section from '../components/Section'
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack'
import RevealText from '../components/RevealText'
import { showcase } from '../data/showcase'

export default function WorkSection() {
  return (
    <Section id="work" className="section--work-stack">
      <div className="wrap work-stack__head">
        <div className="section-head">
          <div>
            <p className="eyebrow">
              <RevealText text="Work & capabilities" />
            </p>
            <RevealText
              as="h2"
              className="h2"
              text="What we build, when the whole brand is in scope."
            />
          </div>
          <RevealText
            as="p"
            className="section-head__note"
            text="A capability showcase, not a client list. Each piece is a system we can build for you."
          />
        </div>
      </div>

      <ScrollStack
        className="work-scroll-stack"
        useWindowScroll
        smoothScroll={false}
        itemDistance={200}
        itemStackDistance={0}
        stackPosition="26%"
        itemScale={0}
        baseScale={1}
        dimAmount={0}
        holdDistance={240}
      >
        {showcase.map((item, index) => (
          <ScrollStackItem
            key={item.slug}
            itemClassName={`work-card${index === showcase.length - 1 ? ' work-card--last' : ''}`}
          >
            <div className="work-card__media">
              <img
                className="work-card__image"
                src={item.image}
                alt={item.imageAlt || item.title}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
            <div className="work-card__content">
              <span className="mono work-card__num">{item.number}</span>
              <h3 className="work-card__title">{item.title}</h3>
              <p className="work-card__text">{item.text}</p>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </Section>
  )
}
