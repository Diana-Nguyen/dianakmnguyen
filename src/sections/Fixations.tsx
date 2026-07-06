import { site } from '../data/site'
import { stickers } from '../data/stickers-data'
import { SectionShell } from '../components/SectionShell'
import { DisplayHeading } from '../components/DisplayHeading'
import { PolaroidCarousel } from '../components/PolaroidCarousel'
import { StickerField } from '../components/StickerField'
import { useStickerLayout } from '../components/useStickerLayout'
import './sections.css'

export function Fixations() {
  const carouselLabel = site.sideQuestsIntro.replace(/^\(|\)$/g, '')
  const { mode: stickerMode } = useStickerLayout()

  return (
    <SectionShell
      id="side-quests"
      variant="deep"
      labelledBy="side-quests-heading"
      compact
    >
      {stickerMode !== 'tidy' ? (
        <StickerField
          section="side-quests"
          sectionId="side-quests"
          stickers={stickers}
          layoutMode={stickerMode}
        />
      ) : null}
      <div className="section-inner side-quests__inner">
        <header className="side-quests__header">
          <DisplayHeading
            id="side-quests-heading"
            before="side"
            emphasis="quests"
          />
          <p className="mono-label side-quests__intro">{site.sideQuestsIntro}</p>
        </header>
        <PolaroidCarousel
          label={carouselLabel}
          className="side-quests__carousel"
        />
      </div>
    </SectionShell>
  )
}
