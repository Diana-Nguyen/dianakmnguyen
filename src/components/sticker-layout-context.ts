import { createContext } from 'react'
import type { StickerLayoutMode } from './Sticker'

export interface StickerLayoutContextValue {
  mode: StickerLayoutMode
  setMode: (mode: StickerLayoutMode) => void
}

export const StickerLayoutContext = createContext<StickerLayoutContextValue | undefined>(
  undefined,
)
