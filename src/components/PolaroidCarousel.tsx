import { useCallback, useEffect, useMemo, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { useReducedMotion } from 'framer-motion'
import { filmMemories as slides } from '../data/film-memories'
import type { PolaroidSlide } from '../data/types'
import { useCarouselPerPage } from '../hooks/useCarouselPerPage'
import { CarouselControls } from './CarouselControls'
import { getFrameState } from './polaroid-carousel/frame-state'
import { usePolaroidSelection } from './polaroid-carousel/use-polaroid-selection'
import './PolaroidCarousel.css'

export type { PolaroidSlide }

const SLIDE_COUNT = slides.length

interface PolaroidFrameProps {
  slide: PolaroidSlide
  state: ReturnType<typeof getFrameState>
}

function PolaroidFrame({ slide, state }: PolaroidFrameProps) {
  const isPeek = state === 'peek'

  return (
    <div
      className={[
        'polaroid-carousel__frame',
        'kraft-frame',
        `polaroid-carousel__frame--${slide.orientation}`,
        `polaroid-carousel__frame--${state}`,
      ].join(' ')}
      aria-hidden={isPeek ? true : undefined}
    >
      <div className="polaroid-carousel__media">
        <img
          src={slide.src}
          alt={isPeek ? '' : slide.label}
          className="polaroid-carousel__img"
          draggable={false}
        />
      </div>
      <p className="mono-label polaroid-carousel__caption">{slide.label}</p>
    </div>
  )
}

interface PolaroidCarouselProps {
  label?: string
  className?: string
}

export function PolaroidCarousel({
  label = 'Interests',
  className = '',
}: PolaroidCarouselProps) {
  const reduceMotion = useReducedMotion() ?? false
  const perPage = useCarouselPerPage()
  const pageCount = Math.max(1, Math.ceil(SLIDE_COUNT / perPage))

  const emblaOptions = useMemo(
    () => ({
      loop: true,
      align: 'center' as const,
      slidesToScroll: perPage,
      duration: reduceMotion ? 0 : 22,
    }),
    [perPage, reduceMotion],
  )

  const [viewportRef, emblaApi] = useEmblaCarousel(emblaOptions)
  const { pageStartIndex, selectedPage, ready } = usePolaroidSelection(
    emblaApi,
    perPage,
  )

  const perPageRef = useRef(perPage)

  useEffect(() => {
    if (!emblaApi || perPageRef.current === perPage) return

    const page = Math.min(pageCount - 1, Math.floor(pageStartIndex / perPage))
    perPageRef.current = perPage
    emblaApi.scrollTo(page, true)
  }, [emblaApi, perPage, pageCount, pageStartIndex])

  const scrollToPage = useCallback(
    (page: number) => {
      emblaApi?.scrollTo(page, reduceMotion)
    },
    [emblaApi, reduceMotion],
  )

  const goToPage = useCallback(
    (page: number) => {
      const target = ((page % pageCount) + pageCount) % pageCount
      scrollToPage(target)
    },
    [pageCount, scrollToPage],
  )

  const goPrev = useCallback(() => {
    emblaApi?.scrollPrev(reduceMotion)
  }, [emblaApi, reduceMotion])

  const goNext = useCallback(() => {
    emblaApi?.scrollNext(reduceMotion)
  }, [emblaApi, reduceMotion])

  const pageLabels = useMemo(
    () =>
      Array.from({ length: pageCount }, (_, page) => {
        const first = slides[page * perPage]
        return first?.label ?? `Page ${page + 1}`
      }),
    [pageCount, perPage],
  )

  return (
    <div
      className={['polaroid-carousel', className].filter(Boolean).join(' ')}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div
        ref={viewportRef}
        className={[
          'polaroid-carousel__viewport',
          ready ? 'polaroid-carousel__viewport--ready' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        data-per-page={perPage}
        aria-live={reduceMotion ? 'polite' : 'off'}
      >
        <div className="polaroid-carousel__track">
          {slides.map((slide, index) => (
            <div key={slide.id} className="polaroid-carousel__slide">
              <PolaroidFrame
                slide={slide}
                state={getFrameState(
                  index,
                  pageStartIndex,
                  perPage,
                  SLIDE_COUNT,
                )}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="polaroid-carousel__controls">
        <CarouselControls
          index={selectedPage}
          slideLabels={pageLabels}
          onPrev={goPrev}
          onNext={goNext}
          onSelect={goToPage}
          dotsLabel={`Choose ${label.toLowerCase()} page`}
          variant="dark"
          compact
        />
      </div>
    </div>
  )
}
