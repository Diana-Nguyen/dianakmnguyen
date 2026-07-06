import { useContext } from 'react'
import { StickerLayoutContext } from './sticker-layout-context'

export function useStickerLayout() {
  const ctx = useContext(StickerLayoutContext)
  if (!ctx) {
    throw new Error('useStickerLayout must be used within StickerLayoutProvider')
  }
  return ctx
}
