import useSectionNavigate from '../hooks/useSectionNavigate'

export default function SectionLink({
  section,
  className = '',
  onClick,
  children,
  ...props
}) {
  const goToSection = useSectionNavigate()

  const handleClick = (event) => {
    onClick?.(event)
    if (!event.defaultPrevented) goToSection(section)
  }

  return (
    <button
      type="button"
      className={`section-link${className ? ` ${className}` : ''}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}
