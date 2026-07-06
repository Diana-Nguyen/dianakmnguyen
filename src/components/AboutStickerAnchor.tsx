import { useMemo } from 'react'
import { loadStickerOffsets, stickerPersistKey } from '../data/sticker-persist'
import type { StickerConfig } from '../data/types'
import { Sticker } from './Sticker'

interface AboutStickerAnchorProps {
  sticker: StickerConfig
  anchorClassName: string
}

export function AboutStickerAnchor({
  sticker,
  anchorClassName,
}: AboutStickerAnchorProps) {
  const persistKey = stickerPersistKey('about')
  const saved = useMemo(() => loadStickerOffsets(persistKey), [persistKey])

  return (
    <div
      className={['about__sticker-anchor', anchorClassName].join(' ')}
      style={{ zIndex: sticker.zIndex ?? 1 }}
    >
      <Sticker
        sticker={sticker}
        persistKey={persistKey}
        initialPosition={saved[sticker.id] ?? { x: sticker.x, y: sticker.y }}
        anchored
      />
    </div>
  )
}
