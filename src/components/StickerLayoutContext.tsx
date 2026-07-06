import { useState, type ReactNode } from 'react'
import type { StickerLayoutMode } from './Sticker'
import { StickerLayoutContext } from './sticker-layout-context'

export function StickerLayoutProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<StickerLayoutMode>('mess')

  return (
    <StickerLayoutContext.Provider value={{ mode, setMode }}>
      {children}
    </StickerLayoutContext.Provider>
  )
}
