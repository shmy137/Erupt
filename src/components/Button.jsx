import { Link } from 'react-router-dom'
import Icon from './Icon'
import useSectionNavigate from '../hooks/useSectionNavigate'

export default function Button({
  to,
  href,
  section,
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  onClick,
  ...props
}) {
  const goToSection = useSectionNavigate()
  const classes = `btn btn--${variant} btn--${size}${className ? ` ${className}` : ''}`
  const inner = (
    <>
      <span>{children}</span>
      {icon ? <Icon name={icon} size={18} className="btn__icon" /> : null}
    </>
  )

  if (section) {
    const handleClick = (event) => {
      onClick?.(event)
      if (!event.defaultPrevented) goToSection(section)
    }

    return (
      <button className={classes} type="button" onClick={handleClick} {...props}>
        {inner}
      </button>
    )
  }

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        {inner}
      </Link>
    )
  }

  if (href) {
    const external = /^https?:\/\//.test(href)
    return (
      <a
        className={classes}
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {inner}
      </a>
    )
  }

  return (
    <button className={classes} type="button" onClick={onClick} {...props}>
      {inner}
    </button>
  )
}
