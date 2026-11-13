import PageMeta from '../components/PageMeta'
import Button from '../components/Button'

export default function NotFound() {
  return (
    <>
      <PageMeta
        title="Page not found — ERUPT"
        description="This page does not exist. Head back to ERUPT."
      />
      <section className="not-found">
        <div className="wrap not-found__inner">
          <p className="eyebrow">404</p>
          <h1 className="h1">This page did not make the cut.</h1>
          <p className="lead">
            The link is broken or the page has moved. The good stuff is still here.
          </p>
          <div className="hero__actions">
            <Button to="/" variant="primary" icon="arrow">
              Back home
            </Button>
            <Button to="/contact" variant="ghost" icon="arrowUpRight">
              Start a project
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
