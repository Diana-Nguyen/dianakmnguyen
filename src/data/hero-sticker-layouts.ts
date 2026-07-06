export type StickerTidyPosition = { x: number; y: number; rotation: number }

export type StickerTidyLayout = Record<string, StickerTidyPosition>

/** All stickers gathered into the hero — used when "Tidy up" is active */
export const HERO_TIDY_LAYOUT: StickerTidyLayout = {
  'pompom-hero': { x: 6, y: 10, rotation: -4 },
  'tama-hero': { x: 22, y: 10, rotation: 3 },
  'camera-hero': { x: 38, y: 10, rotation: 0 },
  'pkmn-hero': { x: 54, y: 10, rotation: 4 },
  'dnd-hero': { x: 70, y: 10, rotation: -3 },
  'fish-hero': { x: 86, y: 10, rotation: -2 },
  'react-about': { x: 6, y: 28, rotation: -3 },
  'adobe-about': { x: 22, y: 28, rotation: 2 },
  'figma-about': { x: 38, y: 28, rotation: -4 },
  'unity-work': { x: 54, y: 28, rotation: -3 },
  'blender-work': { x: 70, y: 28, rotation: 2 },
  'vscode-work': { x: 86, y: 28, rotation: -2 },
  'markers-side-quests': { x: 18, y: 46, rotation: -2 },
  'gamer-side-quests': { x: 50, y: 46, rotation: 3 },
  'nmixx-side-quests': { x: 82, y: 46, rotation: -4 },
}
