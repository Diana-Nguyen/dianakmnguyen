import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../data/site'
import { stickers } from '../data/stickers-data'
import { SectionShell } from '../components/SectionShell'
import { DisplayHeading } from '../components/DisplayHeading'
import { PreviewCarousel } from '../components/PreviewCarousel'
import { AboutStickerAnchor } from '../components/AboutStickerAnchor'
import { useStickerLayout } from '../components/useStickerLayout'
import './sections.css'

export function About() {
  const { mode: stickerMode } = useStickerLayout()

  const aboutStickers = useMemo(
    () => stickers.filter((s) => s.section === 'about'),
    [],
  )
  const reactSticker = aboutStickers.find((s) => s.id === 'react-about')
  const adobeSticker = aboutStickers.find((s) => s.id === 'adobe-about')
  const figmaSticker = aboutStickers.find((s) => s.id === 'figma-about')

  const isTidy = stickerMode === 'tidy'

  return (
    <SectionShell id="about" variant="about" labelledBy="about-heading">
      <div className="section-inner about__grid">
        <div className="about__intro">
          <DisplayHeading
            id="about-heading"
            before="about"
            emphasis="me"
          />
          {site.about.bio.map((paragraph) => (
            <p key={paragraph} className="about__bio">
              {paragraph}
            </p>
          ))}
          {!isTidy && reactSticker ? (
            <AboutStickerAnchor
              sticker={reactSticker}
              anchorClassName="about__sticker-anchor--react"
            />
          ) : null}
          {!isTidy && adobeSticker ? (
            <AboutStickerAnchor
              sticker={adobeSticker}
              anchorClassName="about__sticker-anchor--adobe"
            />
          ) : null}
        </div>
        <ul className="about__credentials">
          {site.about.credentials.map((item) => (
            <li key={item}>{item}</li>
          ))}
          <li>
            <Link to="/experience" className="about__credentials-link">
              {site.about.viewExperience} →
            </Link>
          </li>
        </ul>
        <div className="about__previews">
          <p className="mono-label about__preview-label">{site.about.previewLabel}</p>
          <PreviewCarousel />
          {!isTidy && figmaSticker ? (
            <AboutStickerAnchor
              sticker={figmaSticker}
              anchorClassName="about__sticker-anchor--figma"
            />
          ) : null}
        </div>
      </div>
    </SectionShell>
  )
}
