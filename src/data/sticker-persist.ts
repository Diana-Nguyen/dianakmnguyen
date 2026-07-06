/** Bump when default mess positions change — invalidates saved drag offsets. */
export const STICKER_PERSIST_VERSION = 'v6'

export function stickerPersistKey(section: string): string {
  return `diana-stickers-${STICKER_PERSIST_VERSION}-${section}`
}

export function loadStickerOffsets(
  key: string,
): Record<string, { x: number; y: number }> {
  try {
    return JSON.parse(localStorage.getItem(key) ?? '{}') as Record<
      string,
      { x: number; y: number }
    >
  } catch {
    return {}
  }
}
