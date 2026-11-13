export default function Section({ id, tone = 'default', className = '', children, ...props }) {
  return (
    <section
      id={id}
      className={`section section--${tone}${className ? ` ${className}` : ''}`}
      {...props}
    >
      {children}
    </section>
  )
}
