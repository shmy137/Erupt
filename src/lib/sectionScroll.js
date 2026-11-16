let pendingSection = null

export function setPendingSection(section) {
  pendingSection = section
}

export function consumePendingSection() {
  const section = pendingSection
  pendingSection = null
  return section
}

export function scrollToSection(section) {
  const target = document.getElementById(section)
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
