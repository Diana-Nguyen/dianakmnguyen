import { useEffect, useState } from 'react'

export function getCarouselPerPage() {
  if (typeof window === 'undefined') return 1
  if (window.matchMedia('(min-width: 900px)').matches) return 3
  if (window.matchMedia('(min-width: 520px)').matches) return 2
  return 1
}

export function useCarouselPerPage() {
  const [perPage, setPerPage] = useState(getCarouselPerPage)

  useEffect(() => {
    const update = () => setPerPage(getCarouselPerPage())
    const queries = [
      window.matchMedia('(min-width: 900px)'),
      window.matchMedia('(min-width: 520px)'),
    ]
    queries.forEach((mq) => mq.addEventListener('change', update))
    return () => queries.forEach((mq) => mq.removeEventListener('change', update))
  }, [])

  return perPage
}
