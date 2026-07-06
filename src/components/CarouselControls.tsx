import './CarouselControls.css'

interface CarouselControlsProps {
  index: number
  slideLabels: string[]
  onPrev: () => void
  onNext: () => void
  onSelect: (index: number) => void
  dotsLabel?: string
  variant?: 'light' | 'dark'
  compact?: boolean
}

export function CarouselControls({
  index,
  slideLabels,
  onPrev,
  onNext,
  onSelect,
  dotsLabel = 'Choose slide',
  variant = 'light',
  compact = false,
}: CarouselControlsProps) {
  return (
    <div
      className={[
        'carousel-controls',
        variant === 'dark' ? 'carousel-controls--on-dark' : '',
        compact ? 'carousel-controls--compact' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        type="button"
        className="carousel-controls__nav"
        onClick={onPrev}
        aria-label="Previous slide"
      >
        Prev
      </button>
      <div className="carousel-controls__dots" role="tablist" aria-label={dotsLabel}>
        {slideLabels.map((label, i) => (
          <button
            key={label + i}
            type="button"
            role="tab"
            className="carousel-controls__dot"
            aria-selected={i === index}
            aria-label={label}
            onClick={() => onSelect(i)}
          />
        ))}
      </div>
      <button
        type="button"
        className="carousel-controls__nav"
        onClick={onNext}
        aria-label="Next slide"
      >
        Next
      </button>
    </div>
  )
}
