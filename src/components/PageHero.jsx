export default function PageHero({ eyebrow, title, lead, children }) {
  return (
    <section className="page-hero">
      <div className="wrap page-hero__inner">
        <div className="page-hero__text">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1 className="h1">{title}</h1>
          {lead ? <p className="lead">{lead}</p> : null}
          {children}
        </div>
        <div className="page-hero__meta" aria-hidden="true">
          <span className="page-hero__index">ERUPT</span>
          <span className="page-hero__rule" />
          <span className="page-hero__place">KANNUR · KERALA</span>
        </div>
      </div>
    </section>
  )
}
