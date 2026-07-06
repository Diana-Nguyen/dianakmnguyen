import { useCallback, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { aboutPreviews } from '../data/about-previews'
import { CarouselControls } from './CarouselControls'
import './PreviewCarousel.css'

export type { PreviewSlide } from '../data/about-previews'

const slides = aboutPreviews

export function PreviewCarousel() {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const slide = slides[index]

  const goTo = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length)
  }, [])

  return (
    <div className="preview-carousel">
      <div
        className="preview-carousel__mockup"
        role="group"
        aria-roledescription="carousel"
        aria-label="Preview"
      >
        <div className="preview-carousel__chrome" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        <div
          className={[
            'preview-carousel__screen',
            `preview-carousel__screen--${slide.accent}`,
            slide.src ? 'preview-carousel__screen--has-image' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-live={reduceMotion ? 'polite' : 'off'}
        >
          {slide.src ? (
            <img
              className="preview-carousel__img"
              src={slide.src}
              alt={slide.alt ?? slide.title}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="preview-carousel__ui-lines" aria-hidden>
              <span />
              <span />
              <span className="preview-carousel__ui-lines--short" />
            </div>
          )}
          <div className="preview-carousel__caption">
            <p className="preview-carousel__slide-title">{slide.title}</p>
            <p className="mono-label preview-carousel__slide-sub">{slide.subtitle}</p>
          </div>
        </div>
      </div>

      <CarouselControls
        index={index}
        slideLabels={slides.map((s) => s.title)}
        onPrev={() => goTo(index - 1)}
        onNext={() => goTo(index + 1)}
        onSelect={goTo}
        dotsLabel="Choose preview"
      />
    </div>
  )
}
