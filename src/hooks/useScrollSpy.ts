import { useCallback, useEffect, useState } from 'react'

function hashSectionId(sectionIds: readonly string[]) {
  const hash = window.location.hash.replace('#', '')
  return sectionIds.includes(hash) ? hash : null
}

function pickActiveSection(sectionIds: readonly string[], offsetRatio = 0.2) {
  const offset = window.innerHeight * offsetRatio
  let active = sectionIds[0] ?? ''

  for (const id of sectionIds) {
    const el = document.getElementById(id)
    if (!el) continue
    if (el.getBoundingClientRect().top <= offset) {
      active = id
    }
  }

  return active
}

export function useScrollSpy(sectionIds: readonly string[], enabled = true) {
  const [activeId, setActiveId] = useState(() => {
    if (typeof window === 'undefined') return sectionIds[0] ?? ''
    return hashSectionId(sectionIds) ?? sectionIds[0] ?? ''
  })

  const updateFromScroll = useCallback(() => {
    setActiveId(pickActiveSection(sectionIds))
  }, [sectionIds])

  useEffect(() => {
    if (!enabled) return

    let mutationObserver: MutationObserver | null = null
    let raf = 0
    let started = false

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(updateFromScroll)
    }

    const onHashChange = () => {
      const fromHash = hashSectionId(sectionIds)
      if (fromHash) setActiveId(fromHash)
    }

    const start = () => {
      if (started) return
      const hasSections = sectionIds.some((id) => document.getElementById(id))
      if (!hasSections) return
      started = true

      updateFromScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)
      window.addEventListener('hashchange', onHashChange)
    }

    start()

    if (!started) {
      mutationObserver = new MutationObserver(() => {
        start()
        if (started) mutationObserver?.disconnect()
      })
      mutationObserver.observe(document.body, { childList: true, subtree: true })
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('hashchange', onHashChange)
      mutationObserver?.disconnect()
    }
  }, [enabled, sectionIds, updateFromScroll])

  return { activeId, setActiveId }
}
