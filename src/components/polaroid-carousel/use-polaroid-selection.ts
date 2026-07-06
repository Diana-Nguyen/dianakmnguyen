import { useCallback, useEffect, useState } from 'react'
import type { EmblaCarouselType } from 'embla-carousel'

/** First slide index of the current page (snap index × slides per page). */
export function getPageStartIndex(emblaApi: EmblaCarouselType, perPage: number) {
  return emblaApi.selectedScrollSnap() * perPage
}

export function usePolaroidSelection(
  emblaApi: EmblaCarouselType | undefined,
  perPage: number,
) {
  const [pageStartIndex, setPageStartIndex] = useState(0)
  const [selectedPage, setSelectedPage] = useState(0)
  const [ready, setReady] = useState(false)

  const syncSelection = useCallback(() => {
    if (!emblaApi) return
    const snap = emblaApi.selectedScrollSnap()
    setSelectedPage(snap)
    setPageStartIndex(snap * perPage)
  }, [emblaApi, perPage])

  useEffect(() => {
    if (!emblaApi) return

    const frame = requestAnimationFrame(() => {
      syncSelection()
      setReady(true)
    })

    const events = ['select', 'scroll', 'settle', 'reInit'] as const
    events.forEach((event) => emblaApi.on(event, syncSelection))

    return () => {
      cancelAnimationFrame(frame)
      events.forEach((event) => emblaApi.off(event, syncSelection))
    }
  }, [emblaApi, syncSelection])

  return { pageStartIndex, selectedPage, ready, syncSelection }
}
