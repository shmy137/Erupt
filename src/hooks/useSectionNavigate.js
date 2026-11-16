import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { scrollToSection, setPendingSection } from '../lib/sectionScroll'

export default function useSectionNavigate() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return useCallback(
    (section) => {
      if (pathname === '/') {
        window.requestAnimationFrame(() => scrollToSection(section))
        return
      }
      setPendingSection(section)
      navigate('/')
    },
    [pathname, navigate],
  )
}
