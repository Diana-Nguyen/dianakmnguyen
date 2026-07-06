import { site } from '../data/site'
import { stickers } from '../data/stickers-data'
import { HERO_TIDY_LAYOUT } from '../data/hero-sticker-layouts'
import { SectionShell } from '../components/SectionShell'
import { DisplayHeading } from '../components/DisplayHeading'
import { StickerField } from '../components/StickerField'
import { useStickerLayout } from '../components/useStickerLayout'
import './sections.css'

export function Hero() {
  const { mode: stickerMode, setMode: setStickerMode } = useStickerLayout()

  return (
    <SectionShell id="hero" variant="cream" labelledBy="hero-heading">
      <StickerField
        section="hero"
        sectionId="hero"
        stickers={stickers}
        layoutMode={stickerMode}
        tidyPositions={HERO_TIDY_LAYOUT}
        tidyGatherAll
      />
      <div className="section-inner hero__layout">
        <div className="hero__content">
          <div className="hero__title-wrap">
            <DisplayHeading
              id="hero-heading"
              as="h1"
              before="welcome to my"
              emphasis="brain"
            />
            <p className="hero__meta">
              {site.name} · {site.title} · {site.location}
            </p>
          </div>
          <div className="hero__footer">
            <p className="mono-label hero__subtitle">{site.heroSubtitle}</p>
            <div className="hero__sticker-controls-wrap">
              <p className="hero__sticker-hint mono-label" role="note">
                {site.heroStickerHint}
              </p>
              <div
                className="hero__sticker-controls"
                role="group"
                aria-label="Sticker layout"
              >
              <button
                type="button"
                className="hero__sticker-btn"
                aria-pressed={stickerMode === 'tidy'}
                onClick={() => setStickerMode('tidy')}
              >
                Tidy up
              </button>
              <button
                type="button"
                className="hero__sticker-btn"
                aria-pressed={stickerMode === 'mess'}
                onClick={() => setStickerMode('mess')}
              >
                Mess mode
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
