import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToAnchor } from '../utils/scrollToAnchor'

export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const frame = requestAnimationFrame(() => {
        scrollToAnchor(hash)
      })
      return () => cancelAnimationFrame(frame)
    }

    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
