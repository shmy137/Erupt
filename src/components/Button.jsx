import { Link } from 'react-router-dom'
import Icon from './Icon'

export default function Button({
  to,
  href,
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  ...props
}) {
  const classes = `btn btn--${variant} btn--${size}${className ? ` ${className}` : ''}`
  const inner = (
    <>
      <span>{children}</span>
      {icon ? <Icon name={icon} size={18} className="btn__icon" /> : null}
    </>
  )

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
    <button className={classes} type="button" {...props}>
      {inner}
    </button>
  )
}
