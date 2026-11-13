import { Link } from 'react-router-dom'

export default function Wordmark({ to = '/', inverse = false, compact = false }) {
  return (
    <Link
      className={`wordmark${inverse ? ' wordmark--inverse' : ''}${compact ? ' wordmark--compact' : ''}`}
      to={to}
      aria-label="ERUPT home"
    >
      <span className="wordmark__mark" aria-hidden="true" />
      <span className="wordmark__text">ERUPT</span>
    </Link>
  )
}
