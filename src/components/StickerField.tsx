import { useMemo, useRef } from 'react'
import { loadStickerOffsets, stickerPersistKey } from '../data/sticker-persist'
import type { StickerConfig } from '../data/types'
import { Sticker, type StickerLayoutMode } from './Sticker'
import './StickerField.css'

interface StickerFieldProps {
  section: StickerConfig['section']
  sectionId: string
  stickers: StickerConfig[]
  layoutMode?: StickerLayoutMode
  tidyPositions?: Record<string, { x: number; y: number; rotation: number }>
  /** In tidy mode, render every sticker with a tidy position in this field */
  tidyGatherAll?: boolean
}

export function StickerField({
  section,
  sectionId,
  stickers,
  layoutMode = 'mess',
  tidyPositions,
  tidyGatherAll = false,
}: StickerFieldProps) {
  const isTidyGather = layoutMode === 'tidy' && tidyGatherAll && tidyPositions

  const filtered = useMemo(() => {
    if (isTidyGather) {
      return stickers.filter((s) => tidyPositions[s.id])
    }
    return stickers.filter((s) => s.section === section)
  }, [stickers, section, isTidyGather, tidyPositions])

  const containerRef = useRef<HTMLDivElement>(null)
  const savedBySection = useMemo(() => {
    const sections = new Set(filtered.map((s) => s.section))
    const saved: Record<string, Record<string, { x: number; y: number }>> = {}
    for (const sec of sections) {
      saved[sec] = loadStickerOffsets(stickerPersistKey(sec))
    }
    return saved
  }, [filtered])

  return (
    <div
      ref={containerRef}
      id={`${sectionId}-stickers`}
      className="sticker-field"
      aria-hidden={filtered.every((s) => s.decorative || !s.alt)}
    >
      {filtered.map((sticker) => {
        const persistKey = stickerPersistKey(sticker.section)
        const saved = savedBySection[sticker.section]?.[sticker.id]
        return (
          <Sticker
            key={sticker.id}
            sticker={sticker}
            persistKey={persistKey}
            layoutMode={layoutMode}
            tidyPosition={tidyPositions?.[sticker.id]}
            initialPosition={saved}
            dragContainerRef={containerRef}
          />
        )
      })}
    </div>
  )
}
